var kin = (function () {
    var e = {};
    e.version = "1.2.0";
    function t() {
      for (var C = 0, I = new Array(256), E = 0; E != 256; ++E) C = E, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, I[E] = C;
      return typeof Int32Array < "u" ? new Int32Array(I) : I;
    }
    var n = t();
    function r(C) {
      var I = 0,
        E = 0,
        M = 0,
        T = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
      for (M = 0; M != 256; ++M) T[M] = C[M];
      for (M = 0; M != 256; ++M) for (E = C[M], I = 256 + M; I < 4096; I += 256) E = T[I] = E >>> 8 ^ C[E & 255];
      var P = [];
      for (M = 1; M != 16; ++M) P[M - 1] = typeof Int32Array < "u" && typeof T.subarray == "function" ? T.subarray(M * 256, M * 256 + 256) : T.slice(M * 256, M * 256 + 256);
      return P;
    }
    var a = r(n),
      i = a[0],
      o = a[1],
      s = a[2],
      l = a[3],
      d = a[4],
      u = a[5],
      h = a[6],
      p = a[7],
      m = a[8],
      f = a[9],
      y = a[10],
      b = a[11],
      v = a[12],
      _ = a[13],
      w = a[14];
    function k(C, I) {
      for (var E = I ^ -1, M = 0, T = C.length; M < T;) E = E >>> 8 ^ n[(E ^ C.charCodeAt(M++)) & 255];
      return ~E;
    }
    function A(C, I) {
      for (var E = I ^ -1, M = C.length - 15, T = 0; T < M;) E = w[C[T++] ^ E & 255] ^ _[C[T++] ^ E >> 8 & 255] ^ v[C[T++] ^ E >> 16 & 255] ^ b[C[T++] ^ E >>> 24] ^ y[C[T++]] ^ f[C[T++]] ^ m[C[T++]] ^ p[C[T++]] ^ h[C[T++]] ^ u[C[T++]] ^ d[C[T++]] ^ l[C[T++]] ^ s[C[T++]] ^ o[C[T++]] ^ i[C[T++]] ^ n[C[T++]];
      for (M += 15; T < M;) E = E >>> 8 ^ n[(E ^ C[T++]) & 255];
      return ~E;
    }
    function S(C, I) {
      for (var E = I ^ -1, M = 0, T = C.length, P = 0, R = 0; M < T;) P = C.charCodeAt(M++), P < 128 ? E = E >>> 8 ^ n[(E ^ P) & 255] : P < 2048 ? (E = E >>> 8 ^ n[(E ^ (192 | P >> 6 & 31)) & 255], E = E >>> 8 ^ n[(E ^ (128 | P & 63)) & 255]) : P >= 55296 && P < 57344 ? (P = (P & 1023) + 64, R = C.charCodeAt(M++) & 1023, E = E >>> 8 ^ n[(E ^ (240 | P >> 8 & 7)) & 255], E = E >>> 8 ^ n[(E ^ (128 | P >> 2 & 63)) & 255], E = E >>> 8 ^ n[(E ^ (128 | R >> 6 & 15 | (P & 3) << 4)) & 255], E = E >>> 8 ^ n[(E ^ (128 | R & 63)) & 255]) : (E = E >>> 8 ^ n[(E ^ (224 | P >> 12 & 15)) & 255], E = E >>> 8 ^ n[(E ^ (128 | P >> 6 & 63)) & 255], E = E >>> 8 ^ n[(E ^ (128 | P & 63)) & 255]);
      return ~E;
    }
    return e.table = n, e.bstr = k, e.buf = A, e.str = S, e;
  })(),
  Ds = (function () {
    var t = {};
    t.version = "1.2.2";
    function n(We, Ze) {
      for (var Ge = We.split("/"), Oe = Ze.split("/"), st = 0, vt = 0, Ht = Math.min(Ge.length, Oe.length); st < Ht; ++st) {
        if (vt = Ge[st].length - Oe[st].length) return vt;
        if (Ge[st] != Oe[st]) return Ge[st] < Oe[st] ? -1 : 1;
      }
      return Ge.length - Oe.length;
    }
    function r(We) {
      if (We.charAt(We.length - 1) == "/") return We.slice(0, -1).indexOf("/") === -1 ? We : r(We.slice(0, -1));
      var Ze = We.lastIndexOf("/");
      return Ze === -1 ? We : We.slice(0, Ze + 1);
    }
    function a(We) {
      if (We.charAt(We.length - 1) == "/") return a(We.slice(0, -1));
      var Ze = We.lastIndexOf("/");
      return Ze === -1 ? We : We.slice(Ze + 1);
    }
    function i(We, Ze) {
      typeof Ze == "string" && (Ze = new Date(Ze));
      var Ge = Ze.getHours();
      Ge = Ge << 6 | Ze.getMinutes(), Ge = Ge << 5 | Ze.getSeconds() >>> 1, We.write_shift(2, Ge);
      var Oe = Ze.getFullYear() - 1980;
      Oe = Oe << 4 | Ze.getMonth() + 1, Oe = Oe << 5 | Ze.getDate(), We.write_shift(2, Oe);
    }
    function o(We) {
      var Ze = We.read_shift(2) & 65535,
        Ge = We.read_shift(2) & 65535,
        Oe = new Date(),
        st = Ge & 31;
      Ge >>>= 5;
      var vt = Ge & 15;
      Ge >>>= 4, Oe.setMilliseconds(0), Oe.setFullYear(Ge + 1980), Oe.setMonth(vt - 1), Oe.setDate(st);
      var Ht = Ze & 31;
      Ze >>>= 5;
      var nn = Ze & 63;
      return Ze >>>= 6, Oe.setHours(Ze), Oe.setMinutes(nn), Oe.setSeconds(Ht << 1), Oe;
    }
    function s(We) {
      db(We, 0);
      for (var Ze = {}, Ge = 0; We.l <= We.length - 4;) {
        var Oe = We.read_shift(2),
          st = We.read_shift(2),
          vt = We.l + st,
          Ht = {};
        switch (Oe) {
          case 21589:
            Ge = We.read_shift(1), Ge & 1 && (Ht.mtime = We.read_shift(4)), st > 5 && (Ge & 2 && (Ht.atime = We.read_shift(4)), Ge & 4 && (Ht.ctime = We.read_shift(4))), Ht.mtime && (Ht.mt = new Date(Ht.mtime * 1e3));
            break;
          case 1:
            {
              var nn = We.read_shift(4),
                pt = We.read_shift(4);
              Ht.usz = pt * Math.pow(2, 32) + nn, nn = We.read_shift(4), pt = We.read_shift(4), Ht.csz = pt * Math.pow(2, 32) + nn;
            }
            break;
        }
        We.l = vt, Ze[Oe] = Ht;
      }
      return Ze;
    }
    var l;
    function d() {
      return l || (l = T7);
    }
    function u(We, Ze) {
      if (We[0] == 80 && We[1] == 75) return Re(We, Ze);
      if ((We[0] | 32) == 109 && (We[1] | 32) == 105) return Ye(We, Ze);
      if (We.length < 512) throw new Error("CFB file size " + We.length + " < 512");
      var Ge = 3,
        Oe = 512,
        st = 0,
        vt = 0,
        Ht = 0,
        nn = 0,
        pt = 0,
        lt = [],
        gt = We.slice(0, 512);
      db(gt, 0);
      var Ut = h(gt);
      switch (Ge = Ut[0], Ge) {
        case 3:
          Oe = 512;
          break;
        case 4:
          Oe = 4096;
          break;
        case 0:
          if (Ut[1] == 0) return Re(We, Ze);
        default:
          throw new Error("Major Version: Expected 3 or 4 saw " + Ge);
      }
      Oe !== 512 && (gt = We.slice(0, Oe), db(gt, 28));
      var _t = We.slice(0, Oe);
      p(gt, Ge);
      var At = gt.read_shift(4, "i");
      if (Ge === 3 && At !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + At);
      gt.l += 4, Ht = gt.read_shift(4, "i"), gt.l += 4, gt.chk("00100000", "Mini Stream Cutoff Size: "), nn = gt.read_shift(4, "i"), st = gt.read_shift(4, "i"), pt = gt.read_shift(4, "i"), vt = gt.read_shift(4, "i");
      for (var Yt = -1, qe = 0; qe < 109 && (Yt = gt.read_shift(4, "i"), !(Yt < 0)); ++qe) lt[qe] = Yt;
      var kt = m(We, Oe);
      b(pt, vt, kt, Oe, lt);
      var St = _(kt, Ht, lt, Oe);
      Ht < St.length && (St[Ht].name = "!Directory"), st > 0 && nn !== R && (St[nn].name = "!MiniFAT"), St[lt[0]].name = "!FAT", St.fat_addrs = lt, St.ssz = Oe;
      var hn = {},
        Qt = [],
        Ot = [],
        ln = [];
      w(Ht, St, kt, Qt, st, hn, Ot, nn), f(Ot, ln, Qt), Qt.shift();
      var Pn = {
        FileIndex: Ot,
        FullPaths: ln
      };
      return Ze && Ze.raw && (Pn.raw = {
        header: _t,
        sectors: kt
      }), Pn;
    }
    function h(We) {
      if (We[We.l] == 80 && We[We.l + 1] == 75) return [0, 0];
      We.chk(j, "Header Signature: "), We.l += 16;
      var Ze = We.read_shift(2, "u");
      return [We.read_shift(2, "u"), Ze];
    }
    function p(We, Ze) {
      var Ge = 9;
      switch (We.l += 2, Ge = We.read_shift(2)) {
        case 9:
          if (Ze != 3) throw new Error("Sector Shift: Expected 9 saw " + Ge);
          break;
        case 12:
          if (Ze != 4) throw new Error("Sector Shift: Expected 12 saw " + Ge);
          break;
        default:
          throw new Error("Sector Shift: Expected 9 or 12 saw " + Ge);
      }
      We.chk("0600", "Mini Sector Shift: "), We.chk("000000000000", "Reserved: ");
    }
    function m(We, Ze) {
      for (var Ge = Math.ceil(We.length / Ze) - 1, Oe = [], st = 1; st < Ge; ++st) Oe[st - 1] = We.slice(st * Ze, (st + 1) * Ze);
      return Oe[Ge - 1] = We.slice(Ge * Ze), Oe;
    }
    function f(We, Ze, Ge) {
      for (var Oe = 0, st = 0, vt = 0, Ht = 0, nn = 0, pt = Ge.length, lt = [], gt = []; Oe < pt; ++Oe) lt[Oe] = gt[Oe] = Oe, Ze[Oe] = Ge[Oe];
      for (; nn < gt.length; ++nn) Oe = gt[nn], st = We[Oe].L, vt = We[Oe].R, Ht = We[Oe].C, lt[Oe] === Oe && (st !== -1 && lt[st] !== st && (lt[Oe] = lt[st]), vt !== -1 && lt[vt] !== vt && (lt[Oe] = lt[vt])), Ht !== -1 && (lt[Ht] = Oe), st !== -1 && Oe != lt[Oe] && (lt[st] = lt[Oe], gt.lastIndexOf(st) < nn && gt.push(st)), vt !== -1 && Oe != lt[Oe] && (lt[vt] = lt[Oe], gt.lastIndexOf(vt) < nn && gt.push(vt));
      for (Oe = 1; Oe < pt; ++Oe) lt[Oe] === Oe && (vt !== -1 && lt[vt] !== vt ? lt[Oe] = lt[vt] : st !== -1 && lt[st] !== st && (lt[Oe] = lt[st]));
      for (Oe = 1; Oe < pt; ++Oe) if (We[Oe].type !== 0) {
        if (nn = Oe, nn != lt[nn]) do nn = lt[nn], Ze[Oe] = Ze[nn] + "/" + Ze[Oe]; while (nn !== 0 && lt[nn] !== -1 && nn != lt[nn]);
        lt[Oe] = -1;
      }
      for (Ze[0] += "/", Oe = 1; Oe < pt; ++Oe) We[Oe].type !== 2 && (Ze[Oe] += "/");
    }
    function y(We, Ze, Ge) {
      for (var Oe = We.start, st = We.size, vt = [], Ht = Oe; Ge && st > 0 && Ht >= 0;) vt.push(Ze.slice(Ht * P, Ht * P + P)), st -= P, Ht = wH(Ge, Ht * 4);
      return vt.length === 0 ? Ja(0) : k0(vt).slice(0, We.size);
    }
    function b(We, Ze, Ge, Oe, st) {
      var vt = R;
      if (We === R) {
        if (Ze !== 0) throw new Error("DIFAT chain shorter than expected");
      } else if (We !== -1) {
        var Ht = Ge[We],
          nn = (Oe >>> 2) - 1;
        if (!Ht) return;
        for (var pt = 0; pt < nn && (vt = wH(Ht, pt * 4)) !== R; ++pt) st.push(vt);
        Ze >= 1 && b(wH(Ht, Oe - 4), Ze - 1, Ge, Oe, st);
      }
    }
    function v(We, Ze, Ge, Oe, st) {
      var vt = [],
        Ht = [];
      st || (st = []);
      var nn = Oe - 1,
        pt = 0,
        lt = 0;
      for (pt = Ze; pt >= 0;) {
        st[pt] = !0, vt[vt.length] = pt, Ht.push(We[pt]);
        var gt = Ge[Math.floor(pt * 4 / Oe)];
        if (lt = pt * 4 & nn, Oe < 4 + lt) throw new Error("FAT boundary crossed: " + pt + " 4 " + Oe);
        if (!We[gt]) break;
        pt = wH(We[gt], lt);
      }
      return {
        nodes: vt,
        data: jin([Ht])
      };
    }
    function _(We, Ze, Ge, Oe) {
      var st = We.length,
        vt = [],
        Ht = [],
        nn = [],
        pt = [],
        lt = Oe - 1,
        gt = 0,
        Ut = 0,
        _t = 0,
        At = 0;
      for (gt = 0; gt < st; ++gt) if (nn = [], _t = gt + Ze, _t >= st && (_t -= st), !Ht[_t]) {
        pt = [];
        var Yt = [];
        for (Ut = _t; Ut >= 0;) {
          Yt[Ut] = !0, Ht[Ut] = !0, nn[nn.length] = Ut, pt.push(We[Ut]);
          var qe = Ge[Math.floor(Ut * 4 / Oe)];
          if (At = Ut * 4 & lt, Oe < 4 + At) throw new Error("FAT boundary crossed: " + Ut + " 4 " + Oe);
          if (!We[qe] || (Ut = wH(We[qe], At), Yt[Ut])) break;
        }
        vt[_t] = {
          nodes: nn,
          data: jin([pt])
        };
      }
      return vt;
    }
    function w(We, Ze, Ge, Oe, st, vt, Ht, nn) {
      for (var pt = 0, lt = Oe.length ? 2 : 0, gt = Ze[We].data, Ut = 0, _t = 0, At; Ut < gt.length; Ut += 128) {
        var Yt = gt.slice(Ut, Ut + 128);
        db(Yt, 64), _t = Yt.read_shift(2), At = FXe(Yt, 0, _t - lt), Oe.push(At);
        var qe = {
            name: At,
            type: Yt.read_shift(1),
            color: Yt.read_shift(1),
            L: Yt.read_shift(4, "i"),
            R: Yt.read_shift(4, "i"),
            C: Yt.read_shift(4, "i"),
            clsid: Yt.read_shift(16),
            state: Yt.read_shift(4, "i"),
            start: 0,
            size: 0
          },
          kt = Yt.read_shift(2) + Yt.read_shift(2) + Yt.read_shift(2) + Yt.read_shift(2);
        kt !== 0 && (qe.ct = k(Yt, Yt.l - 8));
        var St = Yt.read_shift(2) + Yt.read_shift(2) + Yt.read_shift(2) + Yt.read_shift(2);
        St !== 0 && (qe.mt = k(Yt, Yt.l - 8)), qe.start = Yt.read_shift(4, "i"), qe.size = Yt.read_shift(4, "i"), qe.size < 0 && qe.start < 0 && (qe.size = qe.type = 0, qe.start = R, qe.name = ""), qe.type === 5 ? (pt = qe.start, st > 0 && pt !== R && (Ze[pt].name = "!StreamData")) : qe.size >= 4096 ? (qe.storage = "fat", Ze[qe.start] === void 0 && (Ze[qe.start] = v(Ge, qe.start, Ze.fat_addrs, Ze.ssz)), Ze[qe.start].name = qe.name, qe.content = Ze[qe.start].data.slice(0, qe.size)) : (qe.storage = "minifat", qe.size < 0 ? qe.size = 0 : pt !== R && qe.start !== R && Ze[pt] && (qe.content = y(qe, Ze[pt].data, (Ze[nn] || {}).data))), qe.content && db(qe.content, 0), vt[At] = qe, Ht.push(qe);
      }
    }
    function k(We, Ze) {
      return new Date((Ev(We, Ze + 4) / 1e7 * Math.pow(2, 32) + Ev(We, Ze) / 1e7 - 11644473600) * 1e3);
    }
    function A(We, Ze) {
      return d(), u(l.readFileSync(We), Ze);
    }
    function S(We, Ze) {
      var Ge = Ze && Ze.type;
      switch (Ge || Uc && Buffer.isBuffer(We) && (Ge = "buffer"), Ge || "base64") {
        case "file":
          return A(We, Ze);
        case "base64":
          return u(I2(_3(We)), Ze);
        case "binary":
          return u(I2(We), Ze);
      }
      return u(We, Ze);
    }
    function C(We, Ze) {
      var Ge = Ze || {},
        Oe = Ge.root || "Root Entry";
      if (We.FullPaths || (We.FullPaths = []), We.FileIndex || (We.FileIndex = []), We.FullPaths.length !== We.FileIndex.length) throw new Error("inconsistent CFB structure");
      We.FullPaths.length === 0 && (We.FullPaths[0] = Oe + "/", We.FileIndex[0] = {
        name: Oe,
        type: 5
      }), Ge.CLSID && (We.FileIndex[0].clsid = Ge.CLSID), I(We);
    }
    function I(We) {
      var Ze = "Sh33tJ5";
      if (!Ds.find(We, "/" + Ze)) {
        var Ge = Ja(4);
        Ge[0] = 55, Ge[1] = Ge[3] = 50, Ge[2] = 54, We.FileIndex.push({
          name: Ze,
          type: 2,
          content: Ge,
          size: 4,
          L: 69,
          R: 69,
          C: 69
        }), We.FullPaths.push(We.FullPaths[0] + Ze), E(We);
      }
    }
    function E(We, Ze) {
      C(We);
      for (var Ge = !1, Oe = !1, st = We.FullPaths.length - 1; st >= 0; --st) {
        var vt = We.FileIndex[st];
        switch (vt.type) {
          case 0:
            Oe ? Ge = !0 : (We.FileIndex.pop(), We.FullPaths.pop());
            break;
          case 1:
          case 2:
          case 5:
            Oe = !0, isNaN(vt.R * vt.L * vt.C) && (Ge = !0), vt.R > -1 && vt.L > -1 && vt.R == vt.L && (Ge = !0);
            break;
          default:
            Ge = !0;
            break;
        }
      }
      if (!(!Ge && !Ze)) {
        var Ht = new Date(1987, 1, 19),
          nn = 0,
          pt = Object.create ? Object.create(null) : {},
          lt = [];
        for (st = 0; st < We.FullPaths.length; ++st) pt[We.FullPaths[st]] = !0, We.FileIndex[st].type !== 0 && lt.push([We.FullPaths[st], We.FileIndex[st]]);
        for (st = 0; st < lt.length; ++st) {
          var gt = r(lt[st][0]);
          for (Oe = pt[gt]; !Oe;) {
            for (; r(gt) && !pt[r(gt)];) gt = r(gt);
            lt.push([gt, {
              name: a(gt).replace("/", ""),
              type: 1,
              clsid: F,
              ct: Ht,
              mt: Ht,
              content: null
            }]), pt[gt] = !0, gt = r(lt[st][0]), Oe = pt[gt];
          }
        }
        for (lt.sort(function (At, Yt) {
          return n(At[0], Yt[0]);
        }), We.FullPaths = [], We.FileIndex = [], st = 0; st < lt.length; ++st) We.FullPaths[st] = lt[st][0], We.FileIndex[st] = lt[st][1];
        for (st = 0; st < lt.length; ++st) {
          var Ut = We.FileIndex[st],
            _t = We.FullPaths[st];
          if (Ut.name = a(_t).replace("/", ""), Ut.L = Ut.R = Ut.C = -(Ut.color = 1), Ut.size = Ut.content ? Ut.content.length : 0, Ut.start = 0, Ut.clsid = Ut.clsid || F, st === 0) Ut.C = lt.length > 1 ? 1 : -1, Ut.size = 0, Ut.type = 5;else if (_t.slice(-1) == "/") {
            for (nn = st + 1; nn < lt.length && r(We.FullPaths[nn]) != _t; ++nn);
            for (Ut.C = nn >= lt.length ? -1 : nn, nn = st + 1; nn < lt.length && r(We.FullPaths[nn]) != r(_t); ++nn);
            Ut.R = nn >= lt.length ? -1 : nn, Ut.type = 1;
          } else r(We.FullPaths[st + 1] || "") == r(_t) && (Ut.R = st + 1), Ut.type = 2;
        }
      }
    }
    function M(We, Ze) {
      var Ge = Ze || {};
      if (Ge.fileType == "mad") return Ce(We, Ge);
      switch (E(We), Ge.fileType) {
        case "zip":
          return rt(We, Ge);
      }
      var Oe = (function (At) {
          for (var Yt = 0, qe = 0, kt = 0; kt < At.FileIndex.length; ++kt) {
            var St = At.FileIndex[kt];
            if (St.content) {
              var hn = St.content.length;
              hn > 0 && (hn < 4096 ? Yt += hn + 63 >> 6 : qe += hn + 511 >> 9);
            }
          }
          for (var Qt = At.FullPaths.length + 3 >> 2, Ot = Yt + 7 >> 3, ln = Yt + 127 >> 7, Pn = Ot + qe + Qt + ln, rn = Pn + 127 >> 7, Yn = rn <= 109 ? 0 : Math.ceil((rn - 109) / 127); Pn + rn + Yn + 127 >> 7 > rn;) Yn = ++rn <= 109 ? 0 : Math.ceil((rn - 109) / 127);
          var Ct = [1, Yn, rn, ln, Qt, qe, Yt, 0];
          return At.FileIndex[0].size = Yt << 6, Ct[7] = (At.FileIndex[0].start = Ct[0] + Ct[1] + Ct[2] + Ct[3] + Ct[4] + Ct[5]) + (Ct[6] + 7 >> 3), Ct;
        })(We),
        st = Ja(Oe[7] << 9),
        vt = 0,
        Ht = 0;
      {
        for (vt = 0; vt < 8; ++vt) st.write_shift(1, B[vt]);
        for (vt = 0; vt < 8; ++vt) st.write_shift(2, 0);
        for (st.write_shift(2, 62), st.write_shift(2, 3), st.write_shift(2, 65534), st.write_shift(2, 9), st.write_shift(2, 6), vt = 0; vt < 3; ++vt) st.write_shift(2, 0);
        for (st.write_shift(4, 0), st.write_shift(4, Oe[2]), st.write_shift(4, Oe[0] + Oe[1] + Oe[2] + Oe[3] - 1), st.write_shift(4, 0), st.write_shift(4, 4096), st.write_shift(4, Oe[3] ? Oe[0] + Oe[1] + Oe[2] - 1 : R), st.write_shift(4, Oe[3]), st.write_shift(-4, Oe[1] ? Oe[0] - 1 : R), st.write_shift(4, Oe[1]), vt = 0; vt < 109; ++vt) st.write_shift(-4, vt < Oe[2] ? Oe[1] + vt : -1);
      }
      if (Oe[1]) for (Ht = 0; Ht < Oe[1]; ++Ht) {
        for (; vt < 236 + Ht * 127; ++vt) st.write_shift(-4, vt < Oe[2] ? Oe[1] + vt : -1);
        st.write_shift(-4, Ht === Oe[1] - 1 ? R : Ht + 1);
      }
      var nn = function (At) {
        for (Ht += At; vt < Ht - 1; ++vt) st.write_shift(-4, vt + 1);
        At && (++vt, st.write_shift(-4, R));
      };
      for (Ht = vt = 0, Ht += Oe[1]; vt < Ht; ++vt) st.write_shift(-4, N.DIFSECT);
      for (Ht += Oe[2]; vt < Ht; ++vt) st.write_shift(-4, N.FATSECT);
      nn(Oe[3]), nn(Oe[4]);
      for (var pt = 0, lt = 0, gt = We.FileIndex[0]; pt < We.FileIndex.length; ++pt) gt = We.FileIndex[pt], gt.content && (lt = gt.content.length, !(lt < 4096) && (gt.start = Ht, nn(lt + 511 >> 9)));
      for (nn(Oe[6] + 7 >> 3); st.l & 511;) st.write_shift(-4, N.ENDOFCHAIN);
      for (Ht = vt = 0, pt = 0; pt < We.FileIndex.length; ++pt) gt = We.FileIndex[pt], gt.content && (lt = gt.content.length, !(!lt || lt >= 4096) && (gt.start = Ht, nn(lt + 63 >> 6)));
      for (; st.l & 511;) st.write_shift(-4, N.ENDOFCHAIN);
      for (vt = 0; vt < Oe[4] << 2; ++vt) {
        var Ut = We.FullPaths[vt];
        if (!Ut || Ut.length === 0) {
          for (pt = 0; pt < 17; ++pt) st.write_shift(4, 0);
          for (pt = 0; pt < 3; ++pt) st.write_shift(4, -1);
          for (pt = 0; pt < 12; ++pt) st.write_shift(4, 0);
          continue;
        }
        gt = We.FileIndex[vt], vt === 0 && (gt.start = gt.size ? gt.start - 1 : R);
        var _t = vt === 0 && Ge.root || gt.name;
        if (_t.length > 31 && (console.error("Name " + _t + " will be truncated to " + _t.slice(0, 31)), _t = _t.slice(0, 31)), lt = 2 * (_t.length + 1), st.write_shift(64, _t, "utf16le"), st.write_shift(2, lt), st.write_shift(1, gt.type), st.write_shift(1, gt.color), st.write_shift(-4, gt.L), st.write_shift(-4, gt.R), st.write_shift(-4, gt.C), gt.clsid) st.write_shift(16, gt.clsid, "hex");else for (pt = 0; pt < 4; ++pt) st.write_shift(4, 0);
        st.write_shift(4, gt.state || 0), st.write_shift(4, 0), st.write_shift(4, 0), st.write_shift(4, 0), st.write_shift(4, 0), st.write_shift(4, gt.start), st.write_shift(4, gt.size), st.write_shift(4, 0);
      }
      for (vt = 1; vt < We.FileIndex.length; ++vt) if (gt = We.FileIndex[vt], gt.size >= 4096) if (st.l = gt.start + 1 << 9, Uc && Buffer.isBuffer(gt.content)) gt.content.copy(st, st.l, 0, gt.size), st.l += gt.size + 511 & -512;else {
        for (pt = 0; pt < gt.size; ++pt) st.write_shift(1, gt.content[pt]);
        for (; pt & 511; ++pt) st.write_shift(1, 0);
      }
      for (vt = 1; vt < We.FileIndex.length; ++vt) if (gt = We.FileIndex[vt], gt.size > 0 && gt.size < 4096) if (Uc && Buffer.isBuffer(gt.content)) gt.content.copy(st, st.l, 0, gt.size), st.l += gt.size + 63 & -64;else {
        for (pt = 0; pt < gt.size; ++pt) st.write_shift(1, gt.content[pt]);
        for (; pt & 63; ++pt) st.write_shift(1, 0);
      }
      if (Uc) st.l = st.length;else for (; st.l < st.length;) st.write_shift(1, 0);
      return st;
    }
    function T(We, Ze) {
      var Ge = We.FullPaths.map(function (pt) {
          return pt.toUpperCase();
        }),
        Oe = Ge.map(function (pt) {
          var lt = pt.split("/");
          return lt[lt.length - (pt.slice(-1) == "/" ? 2 : 1)];
        }),
        st = !1;
      Ze.charCodeAt(0) === 47 ? (st = !0, Ze = Ge[0].slice(0, -1) + Ze) : st = Ze.indexOf("/") !== -1;
      var vt = Ze.toUpperCase(),
        Ht = st === !0 ? Ge.indexOf(vt) : Oe.indexOf(vt);
      if (Ht !== -1) return We.FileIndex[Ht];
      var nn = !vt.match(Q0e);
      for (vt = vt.replace(n_, ""), nn && (vt = vt.replace(Q0e, "!")), Ht = 0; Ht < Ge.length; ++Ht) if ((nn ? Ge[Ht].replace(Q0e, "!") : Ge[Ht]).replace(n_, "") == vt || (nn ? Oe[Ht].replace(Q0e, "!") : Oe[Ht]).replace(n_, "") == vt) return We.FileIndex[Ht];
      return null;
    }
    var P = 64,
      R = -2,
      j = "d0cf11e0a1b11ae1",
      B = [208, 207, 17, 224, 161, 177, 26, 225],
      F = "00000000000000000000000000000000",
      N = {
        MAXREGSECT: -6,
        DIFSECT: -4,
        FATSECT: -3,
        ENDOFCHAIN: R,
        FREESECT: -1,
        HEADER_SIGNATURE: j,
        HEADER_MINOR_VERSION: "3e00",
        MAXREGSID: -6,
        NOSTREAM: -1,
        HEADER_CLSID: F,
        EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
      };
    function G(We, Ze, Ge) {
      d();
      var Oe = M(We, Ge);
      l.writeFileSync(Ze, Oe);
    }
    function z(We) {
      for (var Ze = new Array(We.length), Ge = 0; Ge < We.length; ++Ge) Ze[Ge] = String.fromCharCode(We[Ge]);
      return Ze.join("");
    }
    function V(We, Ze) {
      var Ge = M(We, Ze);
      switch (Ze && Ze.type || "buffer") {
        case "file":
          return d(), l.writeFileSync(Ze.filename, Ge), Ge;
        case "binary":
          return typeof Ge == "string" ? Ge : z(Ge);
        case "base64":
          return Uze(typeof Ge == "string" ? Ge : z(Ge));
        case "buffer":
          if (Uc) return Buffer.isBuffer(Ge) ? Ge : g9(Ge);
        case "array":
          return typeof Ge == "string" ? I2(Ge) : Ge;
      }
      return Ge;
    }
    var O;
    function L(We) {
      try {
        var Ze = We.InflateRaw,
          Ge = new Ze();
        if (Ge._processChunk(new Uint8Array([3, 0]), Ge._finishFlushFlag), Ge.bytesRead) O = We;else throw new Error("zlib does not expose bytesRead");
      } catch (Oe) {
        console.error("cannot use native zlib: " + (Oe.message || Oe));
      }
    }
    function D(We, Ze) {
      if (!O) return Fe(We, Ze);
      var Ge = O.InflateRaw,
        Oe = new Ge(),
        st = Oe._processChunk(We.slice(We.l), Oe._finishFlushFlag);
      return We.l += Oe.bytesRead, st;
    }
    function U(We) {
      return O ? O.deflateRawSync(We) : ge(We);
    }
    var H = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      Y = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258],
      K = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    function W(We) {
      var Ze = (We << 1 | We << 11) & 139536 | (We << 5 | We << 15) & 558144;
      return (Ze >> 16 | Ze >> 8 | Ze) & 255;
    }
    for (var Q = typeof Uint8Array < "u", q = Q ? new Uint8Array(256) : [], ne = 0; ne < 256; ++ne) q[ne] = W(ne);
    function de(We, Ze) {
      var Ge = q[We & 255];
      return Ze <= 8 ? Ge >>> 8 - Ze : (Ge = Ge << 8 | q[We >> 8 & 255], Ze <= 16 ? Ge >>> 16 - Ze : (Ge = Ge << 8 | q[We >> 16 & 255], Ge >>> 24 - Ze));
    }
    function le(We, Ze) {
      var Ge = Ze & 7,
        Oe = Ze >>> 3;
      return (We[Oe] | (Ge <= 6 ? 0 : We[Oe + 1] << 8)) >>> Ge & 3;
    }
    function J(We, Ze) {
      var Ge = Ze & 7,
        Oe = Ze >>> 3;
      return (We[Oe] | (Ge <= 5 ? 0 : We[Oe + 1] << 8)) >>> Ge & 7;
    }
    function pe(We, Ze) {
      var Ge = Ze & 7,
        Oe = Ze >>> 3;
      return (We[Oe] | (Ge <= 4 ? 0 : We[Oe + 1] << 8)) >>> Ge & 15;
    }
    function ce(We, Ze) {
      var Ge = Ze & 7,
        Oe = Ze >>> 3;
      return (We[Oe] | (Ge <= 3 ? 0 : We[Oe + 1] << 8)) >>> Ge & 31;
    }
    function we(We, Ze) {
      var Ge = Ze & 7,
        Oe = Ze >>> 3;
      return (We[Oe] | (Ge <= 1 ? 0 : We[Oe + 1] << 8)) >>> Ge & 127;
    }
    function X(We, Ze, Ge) {
      var Oe = Ze & 7,
        st = Ze >>> 3,
        vt = (1 << Ge) - 1,
        Ht = We[st] >>> Oe;
      return Ge < 8 - Oe || (Ht |= We[st + 1] << 8 - Oe, Ge < 16 - Oe) || (Ht |= We[st + 2] << 16 - Oe, Ge < 24 - Oe) || (Ht |= We[st + 3] << 24 - Oe), Ht & vt;
    }
    function Z(We, Ze, Ge) {
      var Oe = Ze & 7,
        st = Ze >>> 3;
      return Oe <= 5 ? We[st] |= (Ge & 7) << Oe : (We[st] |= Ge << Oe & 255, We[st + 1] = (Ge & 7) >> 8 - Oe), Ze + 3;
    }
    function re(We, Ze, Ge) {
      var Oe = Ze & 7,
        st = Ze >>> 3;
      return Ge = (Ge & 1) << Oe, We[st] |= Ge, Ze + 1;
    }
    function fe(We, Ze, Ge) {
      var Oe = Ze & 7,
        st = Ze >>> 3;
      return Ge <<= Oe, We[st] |= Ge & 255, Ge >>>= 8, We[st + 1] = Ge, Ze + 8;
    }
    function ye(We, Ze, Ge) {
      var Oe = Ze & 7,
        st = Ze >>> 3;
      return Ge <<= Oe, We[st] |= Ge & 255, Ge >>>= 8, We[st + 1] = Ge & 255, We[st + 2] = Ge >>> 8, Ze + 16;
    }
    function ie(We, Ze) {
      var Ge = We.length,
        Oe = 2 * Ge > Ze ? 2 * Ge : Ze + 5,
        st = 0;
      if (Ge >= Ze) return We;
      if (Uc) {
        var vt = fin(Oe);
        if (We.copy) We.copy(vt);else for (; st < We.length; ++st) vt[st] = We[st];
        return vt;
      } else if (Q) {
        var Ht = new Uint8Array(Oe);
        if (Ht.set) Ht.set(We);else for (; st < Ge; ++st) Ht[st] = We[st];
        return Ht;
      }
      return We.length = Oe, We;
    }
    function ae(We) {
      for (var Ze = new Array(We), Ge = 0; Ge < We; ++Ge) Ze[Ge] = 0;
      return Ze;
    }
    function be(We, Ze, Ge) {
      var Oe = 1,
        st = 0,
        vt = 0,
        Ht = 0,
        nn = 0,
        pt = We.length,
        lt = Q ? new Uint16Array(32) : ae(32);
      for (vt = 0; vt < 32; ++vt) lt[vt] = 0;
      for (vt = pt; vt < Ge; ++vt) We[vt] = 0;
      pt = We.length;
      var gt = Q ? new Uint16Array(pt) : ae(pt);
      for (vt = 0; vt < pt; ++vt) lt[st = We[vt]]++, Oe < st && (Oe = st), gt[vt] = 0;
      for (lt[0] = 0, vt = 1; vt <= Oe; ++vt) lt[vt + 16] = nn = nn + lt[vt - 1] << 1;
      for (vt = 0; vt < pt; ++vt) nn = We[vt], nn != 0 && (gt[vt] = lt[nn + 16]++);
      var Ut = 0;
      for (vt = 0; vt < pt; ++vt) if (Ut = We[vt], Ut != 0) for (nn = de(gt[vt], Oe) >> Oe - Ut, Ht = (1 << Oe + 4 - Ut) - 1; Ht >= 0; --Ht) Ze[nn | Ht << Ut] = Ut & 15 | vt << 4;
      return Oe;
    }
    var Ee = Q ? new Uint16Array(512) : ae(512),
      xe = Q ? new Uint16Array(32) : ae(32);
    if (!Q) {
      for (var he = 0; he < 512; ++he) Ee[he] = 0;
      for (he = 0; he < 32; ++he) xe[he] = 0;
    }
    (function () {
      for (var We = [], Ze = 0; Ze < 32; Ze++) We.push(5);
      be(We, xe, 32);
      var Ge = [];
      for (Ze = 0; Ze <= 143; Ze++) Ge.push(8);
      for (; Ze <= 255; Ze++) Ge.push(9);
      for (; Ze <= 279; Ze++) Ge.push(7);
      for (; Ze <= 287; Ze++) Ge.push(8);
      be(Ge, Ee, 288);
    })();
    var ue = (function () {
      for (var Ze = Q ? new Uint8Array(32768) : [], Ge = 0, Oe = 0; Ge < K.length - 1; ++Ge) for (; Oe < K[Ge + 1]; ++Oe) Ze[Oe] = Ge;
      for (; Oe < 32768; ++Oe) Ze[Oe] = 29;
      var st = Q ? new Uint8Array(259) : [];
      for (Ge = 0, Oe = 0; Ge < Y.length - 1; ++Ge) for (; Oe < Y[Ge + 1]; ++Oe) st[Oe] = Ge;
      function vt(nn, pt) {
        for (var lt = 0; lt < nn.length;) {
          var gt = Math.min(65535, nn.length - lt),
            Ut = lt + gt == nn.length;
          for (pt.write_shift(1, +Ut), pt.write_shift(2, gt), pt.write_shift(2, ~gt & 65535); gt-- > 0;) pt[pt.l++] = nn[lt++];
        }
        return pt.l;
      }
      function Ht(nn, pt) {
        for (var lt = 0, gt = 0, Ut = Q ? new Uint16Array(32768) : []; gt < nn.length;) {
          var _t = Math.min(65535, nn.length - gt);
          if (_t < 10) {
            for (lt = Z(pt, lt, +(gt + _t == nn.length)), lt & 7 && (lt += 8 - (lt & 7)), pt.l = lt / 8 | 0, pt.write_shift(2, _t), pt.write_shift(2, ~_t & 65535); _t-- > 0;) pt[pt.l++] = nn[gt++];
            lt = pt.l * 8;
            continue;
          }
          lt = Z(pt, lt, +(gt + _t == nn.length) + 2);
          for (var At = 0; _t-- > 0;) {
            var Yt = nn[gt];
            At = (At << 5 ^ Yt) & 32767;
            var qe = -1,
              kt = 0;
            if ((qe = Ut[At]) && (qe |= gt & -32768, qe > gt && (qe -= 32768), qe < gt)) for (; nn[qe + kt] == nn[gt + kt] && kt < 250;) ++kt;
            if (kt > 2) {
              Yt = st[kt], Yt <= 22 ? lt = fe(pt, lt, q[Yt + 1] >> 1) - 1 : (fe(pt, lt, 3), lt += 5, fe(pt, lt, q[Yt - 23] >> 5), lt += 3);
              var St = Yt < 8 ? 0 : Yt - 4 >> 2;
              St > 0 && (ye(pt, lt, kt - Y[Yt]), lt += St), Yt = Ze[gt - qe], lt = fe(pt, lt, q[Yt] >> 3), lt -= 3;
              var hn = Yt < 4 ? 0 : Yt - 2 >> 1;
              hn > 0 && (ye(pt, lt, gt - qe - K[Yt]), lt += hn);
              for (var Qt = 0; Qt < kt; ++Qt) Ut[At] = gt & 32767, At = (At << 5 ^ nn[gt]) & 32767, ++gt;
              _t -= kt - 1;
            } else Yt <= 143 ? Yt = Yt + 48 : lt = re(pt, lt, 1), lt = fe(pt, lt, q[Yt]), Ut[At] = gt & 32767, ++gt;
          }
          lt = fe(pt, lt, 0) - 1;
        }
        return pt.l = (lt + 7) / 8 | 0, pt.l;
      }
      return function (pt, lt) {
        return pt.length < 8 ? vt(pt, lt) : Ht(pt, lt);
      };
    })();
    function ge(We) {
      var Ze = Ja(50 + Math.floor(We.length * 1.1)),
        Ge = ue(We, Ze);
      return Ze.slice(0, Ge);
    }
    var _e = Q ? new Uint16Array(32768) : ae(32768),
      ke = Q ? new Uint16Array(32768) : ae(32768),
      ve = Q ? new Uint16Array(128) : ae(128),
      Te = 1,
      Ne = 1;
    function me(We, Ze) {
      var Ge = ce(We, Ze) + 257;
      Ze += 5;
      var Oe = ce(We, Ze) + 1;
      Ze += 5;
      var st = pe(We, Ze) + 4;
      Ze += 4;
      for (var vt = 0, Ht = Q ? new Uint8Array(19) : ae(19), nn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], pt = 1, lt = Q ? new Uint8Array(8) : ae(8), gt = Q ? new Uint8Array(8) : ae(8), Ut = Ht.length, _t = 0; _t < st; ++_t) Ht[H[_t]] = vt = J(We, Ze), pt < vt && (pt = vt), lt[vt]++, Ze += 3;
      var At = 0;
      for (lt[0] = 0, _t = 1; _t <= pt; ++_t) gt[_t] = At = At + lt[_t - 1] << 1;
      for (_t = 0; _t < Ut; ++_t) (At = Ht[_t]) != 0 && (nn[_t] = gt[At]++);
      var Yt = 0;
      for (_t = 0; _t < Ut; ++_t) if (Yt = Ht[_t], Yt != 0) {
        At = q[nn[_t]] >> 8 - Yt;
        for (var qe = (1 << 7 - Yt) - 1; qe >= 0; --qe) ve[At | qe << Yt] = Yt & 7 | _t << 3;
      }
      var kt = [];
      for (pt = 1; kt.length < Ge + Oe;) switch (At = ve[we(We, Ze)], Ze += At & 7, At >>>= 3) {
        case 16:
          for (vt = 3 + le(We, Ze), Ze += 2, At = kt[kt.length - 1]; vt-- > 0;) kt.push(At);
          break;
        case 17:
          for (vt = 3 + J(We, Ze), Ze += 3; vt-- > 0;) kt.push(0);
          break;
        case 18:
          for (vt = 11 + we(We, Ze), Ze += 7; vt-- > 0;) kt.push(0);
          break;
        default:
          kt.push(At), pt < At && (pt = At);
          break;
      }
      var St = kt.slice(0, Ge),
        hn = kt.slice(Ge);
      for (_t = Ge; _t < 286; ++_t) St[_t] = 0;
      for (_t = Oe; _t < 30; ++_t) hn[_t] = 0;
      return Te = be(St, _e, 286), Ne = be(hn, ke, 30), Ze;
    }
    function Ae(We, Ze) {
      if (We[0] == 3 && !(We[1] & 3)) return [s$(Ze), 2];
      for (var Ge = 0, Oe = 0, st = fin(Ze || 1 << 18), vt = 0, Ht = st.length >>> 0, nn = 0, pt = 0; (Oe & 1) == 0;) {
        if (Oe = J(We, Ge), Ge += 3, Oe >>> 1) Oe >> 1 == 1 ? (nn = 9, pt = 5) : (Ge = me(We, Ge), nn = Te, pt = Ne);else {
          Ge & 7 && (Ge += 8 - (Ge & 7));
          var lt = We[Ge >>> 3] | We[(Ge >>> 3) + 1] << 8;
          if (Ge += 32, lt > 0) for (!Ze && Ht < vt + lt && (st = ie(st, vt + lt), Ht = st.length); lt-- > 0;) st[vt++] = We[Ge >>> 3], Ge += 8;
          continue;
        }
        for (;;) {
          !Ze && Ht < vt + 32767 && (st = ie(st, vt + 32767), Ht = st.length);
          var gt = X(We, Ge, nn),
            Ut = Oe >>> 1 == 1 ? Ee[gt] : _e[gt];
          if (Ge += Ut & 15, Ut >>>= 4, (Ut >>> 8 & 255) === 0) st[vt++] = Ut;else {
            if (Ut == 256) break;
            Ut -= 257;
            var _t = Ut < 8 ? 0 : Ut - 4 >> 2;
            _t > 5 && (_t = 0);
            var At = vt + Y[Ut];
            _t > 0 && (At += X(We, Ge, _t), Ge += _t), gt = X(We, Ge, pt), Ut = Oe >>> 1 == 1 ? xe[gt] : ke[gt], Ge += Ut & 15, Ut >>>= 4;
            var Yt = Ut < 4 ? 0 : Ut - 2 >> 1,
              qe = K[Ut];
            for (Yt > 0 && (qe += X(We, Ge, Yt), Ge += Yt), !Ze && Ht < At && (st = ie(st, At + 100), Ht = st.length); vt < At;) st[vt] = st[vt - qe], ++vt;
          }
        }
      }
      return Ze ? [st, Ge + 7 >>> 3] : [st.slice(0, vt), Ge + 7 >>> 3];
    }
    function Fe(We, Ze) {
      var Ge = We.slice(We.l || 0),
        Oe = Ae(Ge, Ze);
      return We.l += Oe[1], Oe[0];
    }
    function Me(We, Ze) {
      if (We) typeof console < "u" && console.error(Ze);else throw new Error(Ze);
    }
    function Re(We, Ze) {
      var Ge = We;
      db(Ge, 0);
      var Oe = [],
        st = [],
        vt = {
          FileIndex: Oe,
          FullPaths: st
        };
      C(vt, {
        root: Ze.root
      });
      for (var Ht = Ge.length - 4; (Ge[Ht] != 80 || Ge[Ht + 1] != 75 || Ge[Ht + 2] != 5 || Ge[Ht + 3] != 6) && Ht >= 0;) --Ht;
      Ge.l = Ht + 4, Ge.l += 4;
      var nn = Ge.read_shift(2);
      Ge.l += 6;
      var pt = Ge.read_shift(4);
      for (Ge.l = pt, Ht = 0; Ht < nn; ++Ht) {
        Ge.l += 20;
        var lt = Ge.read_shift(4),
          gt = Ge.read_shift(4),
          Ut = Ge.read_shift(2),
          _t = Ge.read_shift(2),
          At = Ge.read_shift(2);
        Ge.l += 8;
        var Yt = Ge.read_shift(4),
          qe = s(Ge.slice(Ge.l + Ut, Ge.l + Ut + _t));
        Ge.l += Ut + _t + At;
        var kt = Ge.l;
        Ge.l = Yt + 4, qe && qe[1] && ((qe[1] || {}).usz && (gt = qe[1].usz), (qe[1] || {}).csz && (lt = qe[1].csz)), $e(Ge, lt, gt, vt, qe), Ge.l = kt;
      }
      return vt;
    }
    function $e(We, Ze, Ge, Oe, st) {
      We.l += 2;
      var vt = We.read_shift(2),
        Ht = We.read_shift(2),
        nn = o(We);
      if (vt & 8257) throw new Error("Unsupported ZIP encryption");
      for (var pt = We.read_shift(4), lt = We.read_shift(4), gt = We.read_shift(4), Ut = We.read_shift(2), _t = We.read_shift(2), At = "", Yt = 0; Yt < Ut; ++Yt) At += String.fromCharCode(We[We.l++]);
      if (_t) {
        var qe = s(We.slice(We.l, We.l + _t));
        (qe[21589] || {}).mt && (nn = qe[21589].mt), (qe[1] || {}).usz && (gt = qe[1].usz), (qe[1] || {}).csz && (lt = qe[1].csz), st && ((st[21589] || {}).mt && (nn = st[21589].mt), (st[1] || {}).usz && (gt = st[1].usz), (st[1] || {}).csz && (lt = st[1].csz));
      }
      We.l += _t;
      var kt = We.slice(We.l, We.l + lt);
      switch (Ht) {
        case 8:
          kt = D(We, gt);
          break;
        case 0:
          We.l += lt;
          break;
        default:
          throw new Error("Unsupported ZIP Compression method " + Ht);
      }
      var St = !1;
      vt & 8 && (pt = We.read_shift(4), pt == 134695760 && (pt = We.read_shift(4), St = !0), lt = We.read_shift(4), gt = We.read_shift(4)), lt != Ze && Me(St, "Bad compressed size: " + Ze + " != " + lt), gt != Ge && Me(St, "Bad uncompressed size: " + Ge + " != " + gt), Ve(Oe, At, kt, {
        unsafe: !0,
        mt: nn
      });
    }
    function rt(We, Ze) {
      var Ge = Ze || {},
        Oe = [],
        st = [],
        vt = Ja(1),
        Ht = Ge.compression ? 8 : 0,
        nn = 0,
        pt = 0,
        lt = 0,
        gt = 0,
        Ut = 0,
        _t = We.FullPaths[0],
        At = _t,
        Yt = We.FileIndex[0],
        qe = [],
        kt = 0;
      for (pt = 1; pt < We.FullPaths.length; ++pt) if (At = We.FullPaths[pt].slice(_t.length), Yt = We.FileIndex[pt], !(!Yt.size || !Yt.content || Array.isArray(Yt.content) && Yt.content.length == 0 || At == "Sh33tJ5")) {
        var St = gt,
          hn = Ja(At.length);
        for (lt = 0; lt < At.length; ++lt) hn.write_shift(1, At.charCodeAt(lt) & 127);
        hn = hn.slice(0, hn.l), qe[Ut] = typeof Yt.content == "string" ? kin.bstr(Yt.content, 0) : kin.buf(Yt.content, 0);
        var Qt = typeof Yt.content == "string" ? I2(Yt.content) : Yt.content;
        Ht == 8 && (Qt = U(Qt)), vt = Ja(30), vt.write_shift(4, 67324752), vt.write_shift(2, 20), vt.write_shift(2, nn), vt.write_shift(2, Ht), Yt.mt ? i(vt, Yt.mt) : vt.write_shift(4, 0), vt.write_shift(-4, qe[Ut]), vt.write_shift(4, Qt.length), vt.write_shift(4, Yt.content.length), vt.write_shift(2, hn.length), vt.write_shift(2, 0), gt += vt.length, Oe.push(vt), gt += hn.length, Oe.push(hn), gt += Qt.length, Oe.push(Qt), vt = Ja(46), vt.write_shift(4, 33639248), vt.write_shift(2, 0), vt.write_shift(2, 20), vt.write_shift(2, nn), vt.write_shift(2, Ht), vt.write_shift(4, 0), vt.write_shift(-4, qe[Ut]), vt.write_shift(4, Qt.length), vt.write_shift(4, Yt.content.length), vt.write_shift(2, hn.length), vt.write_shift(2, 0), vt.write_shift(2, 0), vt.write_shift(2, 0), vt.write_shift(2, 0), vt.write_shift(4, 0), vt.write_shift(4, St), kt += vt.l, st.push(vt), kt += hn.length, st.push(hn), ++Ut;
      }
      return vt = Ja(22), vt.write_shift(4, 101010256), vt.write_shift(2, 0), vt.write_shift(2, 0), vt.write_shift(2, Ut), vt.write_shift(2, Ut), vt.write_shift(4, kt), vt.write_shift(4, gt), vt.write_shift(2, 0), k0([k0(Oe), k0(st), vt]);
    }
    var nt = {
      htm: "text/html",
      xml: "text/xml",
      gif: "image/gif",
      jpg: "image/jpeg",
      png: "image/png",
      mso: "application/x-mso",
      thmx: "application/vnd.ms-officetheme",
      sh33tj5: "application/octet-stream"
    };
    function ze(We, Ze) {
      if (We.ctype) return We.ctype;
      var Ge = We.name || "",
        Oe = Ge.match(/\.([^\.]+)$/);
      return Oe && nt[Oe[1]] || Ze && (Oe = (Ge = Ze).match(/[\.\\]([^\.\\])+$/), Oe && nt[Oe[1]]) ? nt[Oe[1]] : "application/octet-stream";
    }
    function Le(We) {
      for (var Ze = Uze(We), Ge = [], Oe = 0; Oe < Ze.length; Oe += 76) Ge.push(Ze.slice(Oe, Oe + 76));
      return Ge.join(`\r
`) + `\r
`;
    }
    function Ke(We) {
      var Ze = We.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function (lt) {
        var gt = lt.charCodeAt(0).toString(16).toUpperCase();
        return "=" + (gt.length == 1 ? "0" + gt : gt);
      });
      Ze = Ze.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), Ze.charAt(0) == `
` && (Ze = "=0D" + Ze.slice(1)), Ze = Ze.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
      for (var Ge = [], Oe = Ze.split(`\r
`), st = 0; st < Oe.length; ++st) {
        var vt = Oe[st];
        if (vt.length == 0) {
          Ge.push("");
          continue;
        }
        for (var Ht = 0; Ht < vt.length;) {
          var nn = 76,
            pt = vt.slice(Ht, Ht + nn);
          pt.charAt(nn - 1) == "=" ? nn-- : pt.charAt(nn - 2) == "=" ? nn -= 2 : pt.charAt(nn - 3) == "=" && (nn -= 3), pt = vt.slice(Ht, Ht + nn), Ht += nn, Ht < vt.length && (pt += "="), Ge.push(pt);
        }
      }
      return Ge.join(`\r
`);
    }
    function Xe(We) {
      for (var Ze = [], Ge = 0; Ge < We.length; ++Ge) {
        for (var Oe = We[Ge]; Ge <= We.length && Oe.charAt(Oe.length - 1) == "=";) Oe = Oe.slice(0, Oe.length - 1) + We[++Ge];
        Ze.push(Oe);
      }
      for (var st = 0; st < Ze.length; ++st) Ze[st] = Ze[st].replace(/[=][0-9A-Fa-f]{2}/g, function (vt) {
        return String.fromCharCode(parseInt(vt.slice(1), 16));
      });
      return I2(Ze.join(`\r
`));
    }
    function De(We, Ze, Ge) {
      for (var Oe = "", st = "", vt = "", Ht, nn = 0; nn < 10; ++nn) {
        var pt = Ze[nn];
        if (!pt || pt.match(/^\s*$/)) break;
        var lt = pt.match(/^([^:]*?):\s*([^\s].*)$/);
        if (lt) switch (lt[1].toLowerCase()) {
          case "content-location":
            Oe = lt[2].trim();
            break;
          case "content-type":
            vt = lt[2].trim();
            break;
          case "content-transfer-encoding":
            st = lt[2].trim();
            break;
        }
      }
      switch (++nn, st.toLowerCase()) {
        case "base64":
          Ht = I2(_3(Ze.slice(nn).join("")));
          break;
        case "quoted-printable":
          Ht = Xe(Ze.slice(nn));
          break;
        default:
          throw new Error("Unsupported Content-Transfer-Encoding " + st);
      }
      var gt = Ve(We, Oe.slice(Ge.length), Ht, {
        unsafe: !0
      });
      vt && (gt.ctype = vt);
    }
    function Ye(We, Ze) {
      if (z(We.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
      var Ge = Ze && Ze.root || "",
        Oe = (Uc && Buffer.isBuffer(We) ? We.toString("binary") : z(We)).split(`\r
`),
        st = 0,
        vt = "";
      for (st = 0; st < Oe.length; ++st) if (vt = Oe[st], !!/^Content-Location:/i.test(vt) && (vt = vt.slice(vt.indexOf("file")), Ge || (Ge = vt.slice(0, vt.lastIndexOf("/") + 1)), vt.slice(0, Ge.length) != Ge)) for (; Ge.length > 0 && (Ge = Ge.slice(0, Ge.length - 1), Ge = Ge.slice(0, Ge.lastIndexOf("/") + 1), vt.slice(0, Ge.length) != Ge););
      var Ht = (Oe[1] || "").match(/boundary="(.*?)"/);
      if (!Ht) throw new Error("MAD cannot find boundary");
      var nn = "--" + (Ht[1] || ""),
        pt = [],
        lt = [],
        gt = {
          FileIndex: pt,
          FullPaths: lt
        };
      C(gt);
      var Ut,
        _t = 0;
      for (st = 0; st < Oe.length; ++st) {
        var At = Oe[st];
        At !== nn && At !== nn + "--" || (_t++ && De(gt, Oe.slice(Ut, st), Ge), Ut = st);
      }
      return gt;
    }
    function Ce(We, Ze) {
      var Ge = Ze || {},
        Oe = Ge.boundary || "SheetJS";
      Oe = "------=" + Oe;
      for (var st = ["MIME-Version: 1.0", 'Content-Type: multipart/related; boundary="' + Oe.slice(2) + '"', "", "", ""], vt = We.FullPaths[0], Ht = vt, nn = We.FileIndex[0], pt = 1; pt < We.FullPaths.length; ++pt) if (Ht = We.FullPaths[pt].slice(vt.length), nn = We.FileIndex[pt], !(!nn.size || !nn.content || Ht == "Sh33tJ5")) {
        Ht = Ht.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function (kt) {
          return "_x" + kt.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function (kt) {
          return "_u" + kt.charCodeAt(0).toString(16) + "_";
        });
        for (var lt = nn.content, gt = Uc && Buffer.isBuffer(lt) ? lt.toString("binary") : z(lt), Ut = 0, _t = Math.min(1024, gt.length), At = 0, Yt = 0; Yt <= _t; ++Yt) (At = gt.charCodeAt(Yt)) >= 32 && At < 128 && ++Ut;
        var qe = Ut >= _t * 4 / 5;
        st.push(Oe), st.push("Content-Location: " + (Ge.root || "file:///C:/SheetJS/") + Ht), st.push("Content-Transfer-Encoding: " + (qe ? "quoted-printable" : "base64")), st.push("Content-Type: " + ze(nn, Ht)), st.push(""), st.push(qe ? Ke(gt) : Le(gt));
      }
      return st.push(Oe + `--\r
`), st.join(`\r
`);
    }
    function He(We) {
      var Ze = {};
      return C(Ze, We), Ze;
    }
    function Ve(We, Ze, Ge, Oe) {
      var st = Oe && Oe.unsafe;
      st || C(We);
      var vt = !st && Ds.find(We, Ze);
      if (!vt) {
        var Ht = We.FullPaths[0];
        Ze.slice(0, Ht.length) == Ht ? Ht = Ze : (Ht.slice(-1) != "/" && (Ht += "/"), Ht = (Ht + Ze).replace("//", "/")), vt = {
          name: a(Ze),
          type: 2
        }, We.FileIndex.push(vt), We.FullPaths.push(Ht), st || Ds.utils.cfb_gc(We);
      }
      return vt.content = Ge, vt.size = Ge ? Ge.length : 0, Oe && (Oe.CLSID && (vt.clsid = Oe.CLSID), Oe.mt && (vt.mt = Oe.mt), Oe.ct && (vt.ct = Oe.ct)), vt;
    }
    function it(We, Ze) {
      C(We);
      var Ge = Ds.find(We, Ze);
      if (Ge) {
        for (var Oe = 0; Oe < We.FileIndex.length; ++Oe) if (We.FileIndex[Oe] == Ge) return We.FileIndex.splice(Oe, 1), We.FullPaths.splice(Oe, 1), !0;
      }
      return !1;
    }
    function It(We, Ze, Ge) {
      C(We);
      var Oe = Ds.find(We, Ze);
      if (Oe) {
        for (var st = 0; st < We.FileIndex.length; ++st) if (We.FileIndex[st] == Oe) return We.FileIndex[st].name = a(Ge), We.FullPaths[st] = Ge, !0;
      }
      return !1;
    }
    function Ft(We) {
      E(We, !0);
    }
    return t.find = T, t.read = S, t.parse = u, t.write = V, t.writeFile = G, t.utils = {
      cfb_new: He,
      cfb_add: Ve,
      cfb_del: it,
      cfb_mov: It,
      cfb_gc: Ft,
      ReadShift: s1e,
      CheckField: Unr,
      prep_blob: db,
      bconcat: k0,
      use_zlib: L,
      _deflateRaw: ge,
      _inflateRaw: Fe,
      consts: N
    }, t;
  })(),
  T7;

function xnr(e) {
  T7 = e;
}

function Ain(e) {
  return typeof e == "string" ? xCe(e) : Array.isArray(e) ? lVa(e) : e;
}

function _Ce(e, t, n) {
  if (typeof T7 < "u" && T7.writeFileSync) return n ? T7.writeFileSync(e, t, n) : T7.writeFileSync(e, t);
  if (typeof Deno < "u") {
    if (n && typeof t == "string") switch (n) {
      case "utf8":
        t = new TextEncoder(n).encode(t);
        break;
      case "binary":
        t = xCe(t);
        break;
      default:
        throw new Error("Unsupported encoding " + n);
    }
    return Deno.writeFileSync(e, t);
  }
  var r = n == "utf8" ? CM(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(r, e);
  if (typeof Blob < "u") {
    var a = new Blob([Ain(r)], {
      type: "application/octet-stream"
    });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u") return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function") return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function () {
        URL.revokeObjectURL(i);
      }, 6e4), chrome.downloads.download({
        url: i,
        filename: e,
        saveAs: !0
      });
      var o = document.createElement("a");
      if (o.download != null) return o.download = e, o.href = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function () {
        URL.revokeObjectURL(i);
      }, 6e4), i;
    } else if (typeof URL < "u" && !URL.createObjectURL && typeof chrome == "object") {
      var s = "data:application/octet-stream;base64," + sVa(new Uint8Array(Ain(r)));
      return chrome.downloads.download({
        url: s,
        filename: e,
        saveAs: !0
      });
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var l = File(e);
    return l.open("w"), l.encoding = "binary", Array.isArray(t) && (t = GP(t)), l.write(t), l.close(), t;
  } catch (d) {
    if (!d.message || d.message.indexOf("onstruct") == -1) throw d;
  }
  throw new Error("cannot save file " + e);
}

function DVa(e) {
  if (typeof T7 < "u") return T7.readFileSync(e);
  if (typeof Deno < "u") return Deno.readFileSync(e);
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var t = File(e);
    t.open("r"), t.encoding = "binary";
    var n = t.read();
    return t.close(), n;
  } catch (r) {
    if (!r.message || r.message.indexOf("onstruct") == -1) throw r;
  }
  throw new Error("Cannot access file " + e);
}

function Gm(e) {
  for (var t = Object.keys(e), n = [], r = 0; r < t.length; ++r) Object.prototype.hasOwnProperty.call(e, t[r]) && n.push(t[r]);
  return n;
}

function Sin(e, t) {
  for (var n = [], r = Gm(e), a = 0; a !== r.length; ++a) n[e[r[a]][t]] == null && (n[e[r[a]][t]] = r[a]);
  return n;
}

function LXe(e) {
  for (var t = [], n = Gm(e), r = 0; r !== n.length; ++r) t[e[n[r]]] = n[r];
  return t;
}

function kCe(e) {
  for (var t = [], n = Gm(e), r = 0; r !== n.length; ++r) t[e[n[r]]] = parseInt(n[r], 10);
  return t;
}

function LVa(e) {
  for (var t = [], n = Gm(e), r = 0; r !== n.length; ++r) t[e[n[r]]] == null && (t[e[n[r]]] = []), t[e[n[r]]].push(n[r]);
  return t;
}

var _nr = Date.UTC(1899, 11, 30, 0, 0, 0),
  OVa = Date.UTC(1899, 11, 31, 0, 0, 0),
  BVa = Date.UTC(1904, 0, 1, 0, 0, 0);

function bg(e, t) {
  var n = e.getTime(),
    r = (n - _nr) / (1440 * 60 * 1e3);
  return t ? (r -= 1462, r < -1402 ? r - 1 : r) : r < 60 ? r - 1 : r;
}

function lj(e) {
  if (e >= 60 && e < 61) return e;
  var t = new Date();
  return t.setTime((e > 60 ? e : e + 1) * 24 * 60 * 60 * 1e3 + _nr), t;
}

function FVa(e) {
  var t = 0,
    n = 0,
    r = !1,
    a = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!a) throw new Error("|" + e + "| is not an ISO8601 Duration");
  for (var i = 1; i != a.length; ++i) if (a[i]) {
    switch (n = 1, i > 3 && (r = !0), a[i].slice(a[i].length - 1)) {
      case "Y":
        throw new Error("Unsupported ISO Duration Field: " + a[i].slice(a[i].length - 1));
      case "D":
        n *= 24;
      case "H":
        n *= 60;
      case "M":
        if (r) n *= 60;else throw new Error("Unsupported ISO Duration Field: M");
    }
    t += n * parseInt(a[i], 10);
  }
  return t;
}

var zVa = /^(\d+):(\d+)(:\d+)?(\.\d+)?$/,
  UVa = /^(\d+)-(\d+)-(\d+)$/,
  knr = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)?(\.\d+)?$/;

function Rf(e, t) {
  if (e instanceof Date) return e;
  var n = e.match(zVa);
  if (n) return new Date((t ? BVa : OVa) + ((parseInt(n[1], 10) * 60 + parseInt(n[2], 10)) * 60 + (n[3] ? parseInt(n[3].slice(1), 10) : 0)) * 1e3 + (n[4] ? parseInt((n[4] + "000").slice(1, 4), 10) : 0));
  if (n = e.match(UVa), n) return new Date(Date.UTC(+n[1], +n[2] - 1, +n[3], 0, 0, 0, 0));
  if (n = e.match(knr), n) return new Date(Date.UTC(+n[1], +n[2] - 1, +n[3], +n[4], +n[5], n[6] && parseInt(n[6].slice(1), 10) || 0, n[7] && parseInt((n[7] + "0000").slice(1, 4), 10) || 0));
  var r = new Date(e);
  return r;
}

function wJ(e, t) {
  if (Uc && Buffer.isBuffer(e)) {
    if (t && mke) {
      if (e[0] == 255 && e[1] == 254) return CM(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return CM(unr(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return CM(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return CM(new TextDecoder("utf-16be").decode(e.slice(2)));
    }
    var n = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function (i) {
      return n[i] || i;
    });
  } catch {}
  var r = [],
    a = 0;
  try {
    for (a = 0; a < e.length - 65536; a += 65536) r.push(String.fromCharCode.apply(0, e.slice(a, a + 65536)));
    r.push(String.fromCharCode.apply(0, e.slice(a)));
  } catch {
    try {
      for (; a < e.length - 16384; a += 16384) r.push(String.fromCharCode.apply(0, e.slice(a, a + 16384)));
      r.push(String.fromCharCode.apply(0, e.slice(a)));
    } catch {
      for (; a != e.length; ++a) r.push(String.fromCharCode(e[a]));
    }
  }
  return r.join("");
}

function qu(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = qu(e[n]));
  return t;
}

function Gd(e, t) {
  for (var n = ""; n.length < t;) n += e;
  return n;
}

function XS(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var n = 1,
    r = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
      return n *= 100, "";
    });
  return !isNaN(t = Number(r)) || (r = r.replace(/[(]([^()]*)[)]/, function (a, i) {
    return n = -n, i;
  }), !isNaN(t = Number(r))) ? t / n : t;
}

var $Va = /^(0?\d|1[0-2])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))\s+([ap])m?$/,
  GVa = /^([01]?\d|2[0-3])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))$/,
  VVa = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)(\.\d+)?[Z]?$/,
  HVa = new Date("6/9/69 00:00 UTC").valueOf() == -177984e5;

function WVa(e) {
  return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, e[7] == "p" ? 12 : 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), 0, 0, 0));
}

function qVa(e) {
  return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], 0, 0, 0));
}

var KVa = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function gke(e) {
  if (VVa.test(e)) return e.indexOf("Z") == -1 ? OXe(new Date(e)) : new Date(e);
  var t = e.toLowerCase(),
    n = t.replace(/\s+/g, " ").trim(),
    r = n.match($Va);
  if (r) return WVa(r);
  if (r = n.match(GVa), r) return qVa(r);
  if (r = n.match(knr), r) return new Date(Date.UTC(+r[1], +r[2] - 1, +r[3], +r[4], +r[5], r[6] && parseInt(r[6].slice(1), 10) || 0, r[7] && parseInt((r[7] + "0000").slice(1, 4), 10) || 0));
  var a = new Date(HVa && e.indexOf("UTC") == -1 ? e + " UTC" : e),
    i = new Date(NaN),
    o = a.getYear();
  a.getMonth();
  var s = a.getDate();
  if (isNaN(s)) return i;
  if (t.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (t = t.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), t.length > 3 && KVa.indexOf(t) == -1) return i;
  } else if (t.replace(/[ap]m?/, "").match(/[a-z]/)) return i;
  return o < 0 || o > 8099 || e.match(/[^-0-9:,\/\\\ ]/) ? i : a;
}

var QVa = (function () {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function (n, r, a) {
    if (e || typeof r == "string") return n.split(r);
    for (var i = n.split(r), o = [i[0]], s = 1; s < i.length; ++s) o.push(a), o.push(i[s]);
    return o;
  };
})();

function xJ(e) {
  return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
}

function OXe(e) {
  return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
}

function _Ot(e) {
  var t = e.slice(0, 1024),
    n = t.indexOf("<!DOCTYPE");
  if (n == -1) return e;
  var r = e.match(/<[\w]/);
  return r ? e.slice(0, n) + e.slice(r.index) : e;
}

function kOt(e, t, n) {
  for (var r = [], a = e.indexOf(t); a > -1;) {
    var i = e.indexOf(n, a + t.length);
    if (i == -1) break;
    r.push(e.slice(a, i + n.length)), a = e.indexOf(t, i + n.length);
  }
  return r.length > 0 ? r : null;
}

function ACe(e, t, n) {
  var r = [],
    a = 0,
    i = e.indexOf(t);
  if (i == -1) return e;
  for (; i > -1;) {
    r.push(e.slice(a, i));
    var o = e.indexOf(n, i + t.length);
    if (o == -1) break;
    (i = e.indexOf(t, a = o + n.length)) == -1 && r.push(e.slice(a));
  }
  return r.join("");
}

var YVa = {
  " ": 1,
  "	": 1,
  "\r": 1,
  "\n": 1,
  ">": 1
};

function NQ(e, t) {
  for (var n = e.indexOf("<" + t), r = t.length + 1, a = e.length; n >= 0 && n <= a - r && !YVa[e.charAt(n + r)];) n = e.indexOf("<" + t, n + 1);
  if (n === -1) return null;
  var i = e.indexOf(">", n + t.length);
  if (i === -1) return null;
  var o = "</" + t + ">",
    s = e.indexOf(o, i);
  return s == -1 ? null : [e.slice(n, s + o.length), e.slice(i + 1, s)];
}

var Mv = (function () {
    var e = {};
    return function (n, r) {
      var a = e[r];
      a || (e[r] = a = [new RegExp("<(?:\\w+:)?" + r + "\\b[^<>]*>", "g"), new RegExp("</(?:\\w+:)?" + r + ">", "g")]), a[0].lastIndex = a[1].lastIndex = 0;
      var i = a[0].exec(n);
      if (!i) return null;
      var o = i.index,
        s = a[0].lastIndex;
      if (a[1].lastIndex = a[0].lastIndex, i = a[1].exec(n), !i) return null;
      var l = i.index,
        d = a[1].lastIndex;
      return [n.slice(o, d), n.slice(s, l)];
    };
  })(),
  Anr = (function () {
    var e = {};
    return function (n, r) {
      var a = [],
        i = e[r];
      i || (e[r] = i = [new RegExp("<(?:\\w+:)?" + r + "\\b[^<>]*>", "g"), new RegExp("</(?:\\w+:)?" + r + ">", "g")]), i[0].lastIndex = i[1].lastIndex = 0;
      for (var o; o = i[0].exec(n);) {
        var s = o.index;
        if (i[1].lastIndex = i[0].lastIndex, o = i[1].exec(n), !o) return null;
        var l = i[1].lastIndex;
        a.push(n.slice(s, l)), i[0].lastIndex = i[1].lastIndex;
      }
      return a.length == 0 ? null : a;
    };
  })(),
  XVa = (function () {
    var e = {};
    return function (n, r) {
      var a = [],
        i = e[r];
      i || (e[r] = i = [new RegExp("<(?:\\w+:)?" + r + "\\b[^<>]*>", "g"), new RegExp("</(?:\\w+:)?" + r + ">", "g")]), i[0].lastIndex = i[1].lastIndex = 0;
      for (var o, s = 0, l = 0; o = i[0].exec(n);) {
        if (s = o.index, a.push(n.slice(l, s)), l = s, i[1].lastIndex = i[0].lastIndex, o = i[1].exec(n), !o) return null;
        l = i[1].lastIndex, i[0].lastIndex = i[1].lastIndex;
      }
      return a.push(n.slice(l)), a.length == 0 ? "" : a.join("");
    };
  })(),
  JVa = (function () {
    var e = {};
    return function (n, r) {
      var a = [],
        i = e[r];
      i || (e[r] = i = [new RegExp("<" + r + "\\b[^<>]*>", "ig"), new RegExp("</" + r + ">", "ig")]), i[0].lastIndex = i[1].lastIndex = 0;
      for (var o; o = i[0].exec(n);) {
        var s = o.index;
        if (i[1].lastIndex = i[0].lastIndex, o = i[1].exec(n), !o) return null;
        var l = i[1].lastIndex;
        a.push(n.slice(s, l)), i[0].lastIndex = i[1].lastIndex;
      }
      return a.length == 0 ? null : a;
    };
  })();

function Snr(e) {
  return e ? e.content && e.type ? wJ(e.content, !0) : e.data ? Fre(e.data) : e.asNodeBuffer && Uc ? Fre(e.asNodeBuffer().toString("binary")) : e.asBinary ? Fre(e.asBinary()) : e._data && e._data.getContent ? Fre(wJ(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}

function Inr(e) {
  if (!e) return null;
  if (e.data) return zze(e.data);
  if (e.asNodeBuffer && Uc) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? zze(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}

function ZVa(e) {
  return e && e.name.slice(-4) === ".bin" ? Inr(e) : Snr(e);
}

function b4(e, t) {
  for (var n = e.FullPaths || Gm(e.files), r = t.toLowerCase().replace(/[\/]/g, "\\"), a = r.replace(/\\/g, "/"), i = 0; i < n.length; ++i) {
    var o = n[i].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (r == o || a == o) return e.files ? e.files[n[i]] : e.FileIndex[i];
  }
  return null;
}

function AOt(e, t) {
  var n = b4(e, t);
  if (n == null) throw new Error("Cannot find file " + t + " in zip");
  return n;
}

function ny(e, t, n) {
  if (!n) return ZVa(AOt(e, t));
  if (!t) return null;
  try {
    return ny(e, t);
  } catch {
    return null;
  }
}

function T2(e, t, n) {
  if (!n) return Snr(AOt(e, t));
  if (!t) return null;
  try {
    return T2(e, t);
  } catch {
    return null;
  }
}

function eHa(e, t, n) {
  return Inr(AOt(e, t));
}

function Iin(e) {
  for (var t = e.FullPaths || Gm(e.files), n = [], r = 0; r < t.length; ++r) t[r].slice(-1) != "/" && n.push(t[r].replace(/^Root Entry[\/]/, ""));
  return n.sort();
}

function bc(e, t, n) {
  if (e.FullPaths) {
    if (Array.isArray(n) && typeof n[0] == "string" && (n = n.join("")), typeof n == "string") {
      var r;
      return Uc ? r = g9(n) : r = cVa(n), Ds.utils.cfb_add(e, t, r);
    }
    Ds.utils.cfb_add(e, t, n);
  } else e.file(t, n);
}

function SOt() {
  return Ds.utils.cfb_new();
}

function Cnr(e, t) {
  switch (t.type) {
    case "base64":
      return Ds.read(e, {
        type: "base64"
      });
    case "binary":
      return Ds.read(e, {
        type: "binary"
      });
    case "buffer":
    case "array":
      return Ds.read(e, {
        type: "buffer"
      });
  }
  throw new Error("Unrecognized type " + t.type);
}

function zre(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var n = t.split("/");
  t.slice(-1) != "/" && n.pop();
  for (var r = e.split("/"); r.length !== 0;) {
    var a = r.shift();
    a === ".." ? n.pop() : a !== "." && n.push(a);
  }
  return n.join("/");
}

var e0 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`,
  Enr = /\s([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,
  Cin = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?<>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'"<>\s=]+))*\s*[\/\?]?>/mg,
  tHa = /<[^<>]*>/g,
  mw = e0.match(Cin) ? Cin : tHa,
  nHa = /<\w*:/,
  rHa = /<(\/?)\w+:/;

function es(e, t, n) {
  for (var r = {}, a = 0, i = 0; a !== e.length && !((i = e.charCodeAt(a)) === 32 || i === 10 || i === 13); ++a);
  if (t || (r[0] = e.slice(0, a)), a === e.length) return r;
  var o = e.match(Enr),
    s = 0,
    l = "",
    d = 0,
    u = "",
    h = "",
    p = 1;
  if (o) for (d = 0; d != o.length; ++d) {
    for (h = o[d].slice(1), i = 0; i != h.length && h.charCodeAt(i) !== 61; ++i);
    for (u = h.slice(0, i).trim(); h.charCodeAt(i + 1) == 32;) ++i;
    for (p = (a = h.charCodeAt(i + 1)) == 34 || a == 39 ? 1 : 0, l = h.slice(i + 1 + p, h.length - p), s = 0; s != u.length && u.charCodeAt(s) !== 58; ++s);
    if (s === u.length) u.indexOf("_") > 0 && (u = u.slice(0, u.indexOf("_"))), r[u] = l, r[u.toLowerCase()] = l;else {
      var m = (s === 5 && u.slice(0, 5) === "xmlns" ? "xmlns" : "") + u.slice(s + 1);
      if (r[m] && u.slice(s - 3, s) == "ext") continue;
      r[m] = l, r[m.toLowerCase()] = l;
    }
  }
  return r;
}

function aHa(e, t, n) {
  for (var r = {}, a = 0, i = 0; a !== e.length && !((i = e.charCodeAt(a)) === 32 || i === 10 || i === 13); ++a);
  if (a === e.length) return r;
  var o = e.match(Enr),
    s = "",
    l = 0,
    d = "",
    u = "",
    h = 1;
  if (o) for (l = 0; l != o.length; ++l) {
    for (u = o[l].slice(1), i = 0; i != u.length && u.charCodeAt(i) !== 61; ++i);
    for (d = u.slice(0, i).trim(); u.charCodeAt(i + 1) == 32;) ++i;
    h = (a = u.charCodeAt(i + 1)) == 34 || a == 39 ? 1 : 0, s = u.slice(i + 1 + h, u.length - h), d.indexOf("_") > 0 && (d = d.slice(0, d.indexOf("_"))), r[d] = s, r[d.toLowerCase()] = s;
  }
  return r;
}

function fI(e) {
  return e.replace(rHa, "<$1");
}

var Tnr = {
    "&quot;": '"',
    "&apos;": "'",
    "&gt;": ">",
    "&lt;": "<",
    "&amp;": "&"
  },
  IOt = LXe(Tnr),
  jd = (function () {
    var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig,
      t = /_x([\da-fA-F]{4})_/ig;
    function n(r) {
      var a = r + "",
        i = a.indexOf("<![CDATA[");
      if (i == -1) return a.replace(e, function (s, l) {
        return Tnr[s] || String.fromCharCode(parseInt(l, s.indexOf("x") > -1 ? 16 : 10)) || s;
      }).replace(t, function (s, l) {
        return String.fromCharCode(parseInt(l, 16));
      });
      var o = a.indexOf("]]>");
      return n(a.slice(0, i)) + a.slice(i + 9, o) + n(a.slice(o + 3));
    }
    return function (a, i) {
      var o = n(a);
      return i ? o.replace(/\r\n/g, `
`) : o;
    };
  })(),
  COt = /[&<>'"]/g,
  iHa = /[\u0000-\u0008\u000b-\u001f\uFFFE-\uFFFF]/g;

function xc(e) {
  var t = e + "";
  return t.replace(COt, function (n) {
    return IOt[n];
  }).replace(iHa, function (n) {
    return "_x" + ("000" + n.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}

function Ein(e) {
  return xc(e).replace(/ /g, "_x0020_");
}

var Mnr = /[\u0000-\u001f]/g;

function o1e(e) {
  var t = e + "";
  return t.replace(COt, function (n) {
    return IOt[n];
  }).replace(/\n/g, "<br/>").replace(Mnr, function (n) {
    return "&#x" + ("000" + n.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}

function oHa(e) {
  var t = e + "";
  return t.replace(COt, function (n) {
    return IOt[n];
  }).replace(Mnr, function (n) {
    return "&#x" + n.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}

var Tin = (function () {
  var e = /&#(\d+);/g;
  function t(n, r) {
    return String.fromCharCode(parseInt(r, 10));
  }
  return function (r) {
    return r.replace(e, t);
  };
})();

function sHa(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}

function rh(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
      return !0;
    case 0:
    case !1:
    case "0":
    case "false":
      return !1;
  }
  return !1;
}

function Bit(e) {
  for (var t = "", n = 0, r = 0, a = 0, i = 0, o = 0, s = 0; n < e.length;) {
    if (r = e.charCodeAt(n++), r < 128) {
      t += String.fromCharCode(r);
      continue;
    }
    if (a = e.charCodeAt(n++), r > 191 && r < 224) {
      o = (r & 31) << 6, o |= a & 63, t += String.fromCharCode(o);
      continue;
    }
    if (i = e.charCodeAt(n++), r < 240) {
      t += String.fromCharCode((r & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    o = e.charCodeAt(n++), s = ((r & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | o & 63) - 65536, t += String.fromCharCode(55296 + (s >>> 10 & 1023)), t += String.fromCharCode(56320 + (s & 1023));
  }
  return t;
}

function Min(e) {
  var t = s$(2 * e.length),
    n,
    r,
    a = 1,
    i = 0,
    o = 0,
    s;
  for (r = 0; r < e.length; r += a) a = 1, (s = e.charCodeAt(r)) < 128 ? n = s : s < 224 ? (n = (s & 31) * 64 + (e.charCodeAt(r + 1) & 63), a = 2) : s < 240 ? (n = (s & 15) * 4096 + (e.charCodeAt(r + 1) & 63) * 64 + (e.charCodeAt(r + 2) & 63), a = 3) : (a = 4, n = (s & 7) * 262144 + (e.charCodeAt(r + 1) & 63) * 4096 + (e.charCodeAt(r + 2) & 63) * 64 + (e.charCodeAt(r + 3) & 63), n -= 65536, o = 55296 + (n >>> 10 & 1023), n = 56320 + (n & 1023)), o !== 0 && (t[i++] = o & 255, t[i++] = o >>> 8, o = 0), t[i++] = n % 256, t[i++] = n >>> 8;
  return t.slice(0, i).toString("ucs2");
}

function Pin(e) {
  return g9(e, "binary").toString("utf8");
}

var U6e = "foo bar bazâð£",
  Ch = Uc && (Pin(U6e) == Bit(U6e) && Pin || Min(U6e) == Bit(U6e) && Min) || Bit,
  CM = Uc ? function (e) {
    return g9(e, "utf8").toString("binary");
  } : function (e) {
    for (var t = [], n = 0, r = 0, a = 0; n < e.length;) switch (r = e.charCodeAt(n++), !0) {
      case r < 128:
        t.push(String.fromCharCode(r));
        break;
      case r < 2048:
        t.push(String.fromCharCode(192 + (r >> 6))), t.push(String.fromCharCode(128 + (r & 63)));
        break;
      case (r >= 55296 && r < 57344):
        r -= 55296, a = e.charCodeAt(n++) - 56320 + (r << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (r >> 12))), t.push(String.fromCharCode(128 + (r >> 6 & 63))), t.push(String.fromCharCode(128 + (r & 63)));
    }
    return t.join("");
  },
  Pnr = (function () {
    var e = [["nbsp", " "], ["middot", "·"], ["quot", '"'], ["apos", "'"], ["gt", ">"], ["lt", "<"], ["amp", "&"]].map(function (t) {
      return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
    });
    return function (n) {
      for (var r = n.replace(/^[\t\n\r ]+/, "").replace(/(^|[^\t\n\r ])[\t\n\r ]+$/, "$1").replace(/>\s+/g, ">").replace(/\b\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^<>]*>/g, ""), a = 0; a < e.length; ++a) r = r.replace(e[a][0], e[a][1]);
      return r;
    };
  })(),
  lHa = /<\/?(?:vt:)?variant>/g,
  cHa = /<(?:vt:)([^<"'>]*)>([\s\S]*)</;

function Rin(e, t) {
  var n = es(e),
    r = Anr(e, n.baseType) || [],
    a = [];
  if (r.length != n.size) {
    if (t.WTF) throw new Error("unexpected vector length " + r.length + " != " + n.size);
    return a;
  }
  return r.forEach(function (i) {
    var o = i.replace(lHa, "").match(cHa);
    o && a.push({
      v: Ch(o[2]),
      t: o[1]
    });
  }), a;
}

var Rnr = /(^\s|\s$|\n)/;

function z1(e, t) {
  return "<" + e + (t.match(Rnr) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}

function _J(e) {
  return Gm(e).map(function (t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}

function no(e, t, n) {
  return "<" + e + (n != null ? _J(n) : "") + (t != null ? (t.match(Rnr) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}

function Fwt(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (n) {
    if (t) throw n;
  }
  return "";
}

function dHa(e, t) {
  switch (typeof e) {
    case "string":
      var n = no("vt:lpwstr", xc(e));
      return n = n.replace(/&quot;/g, "_x0022_"), n;
    case "number":
      return no((e | 0) == e ? "vt:i4" : "vt:r8", xc(String(e)));
    case "boolean":
      return no("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return no("vt:filetime", Fwt(e));
  throw new Error("Unable to serialize " + e);
}

function BXe(e) {
  if (Uc && Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return Ch(GP(yOt(e)));
  throw new Error("Bad input format: expected Buffer or string");
}

var sy = /<([\/]?)([^\s?><!\/:"]*:|)([^\s?<>:\/"]+)(?:\s+[^<>=?"'\s]+="[^"]*?")*\s*[\/]?>/mg,
  fb = {
    CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
    EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    CT: "http://schemas.openxmlformats.org/package/2006/content-types",
    RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
    TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
    dc: "http://purl.org/dc/elements/1.1/",
    dcterms: "http://purl.org/dc/terms/",
    dcmitype: "http://purl.org/dc/dcmitype/",
    r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    xsi: "http://www.w3.org/2001/XMLSchema-instance",
    xsd: "http://www.w3.org/2001/XMLSchema"
  },
  HZ = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"],
  hb = {
    o: "urn:schemas-microsoft-com:office:office",
    x: "urn:schemas-microsoft-com:office:excel",
    ss: "urn:schemas-microsoft-com:office:spreadsheet",
    dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
    mv: "http://macVmlSchemaUri",
    v: "urn:schemas-microsoft-com:vml",
    html: "http://www.w3.org/TR/REC-html40"
  };

function uHa(e, t) {
  for (var n = 1 - 2 * (e[t + 7] >>> 7), r = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return r == 2047 ? a == 0 ? n * (1 / 0) : NaN : (r == 0 ? r = -1022 : (r -= 1023, a += Math.pow(2, 52)), n * Math.pow(2, r - 52) * a);
}

function hHa(e, t, n) {
  var r = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7,
    a = 0,
    i = 0,
    o = r ? -t : t;
  isFinite(o) ? o == 0 ? a = i = 0 : (a = Math.floor(Math.log(o) / Math.LN2), i = o * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var s = 0; s <= 5; ++s, i /= 256) e[n + s] = i & 255;
  e[n + 6] = (a & 15) << 4 | i & 15, e[n + 7] = a >> 4 | r;
}

var Nin = function (e) {
    for (var t = [], n = 10240, r = 0; r < e[0].length; ++r) if (e[0][r]) for (var a = 0, i = e[0][r].length; a < i; a += n) t.push.apply(t, e[0][r].slice(a, a + n));
    return t;
  },
  jin = Uc ? function (e) {
    return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function (t) {
      return Buffer.isBuffer(t) ? t : g9(t);
    })) : Nin(e);
  } : Nin,
  Din = function (e, t, n) {
    for (var r = [], a = t; a < n; a += 2) r.push(String.fromCharCode(M7(e, a)));
    return r.join("").replace(n_, "");
  },
  FXe = Uc ? function (e, t, n) {
    return !Buffer.isBuffer(e) || !mke ? Din(e, t, n) : e.toString("utf16le", t, n).replace(n_, "");
  } : Din,
  Lin = function (e, t, n) {
    for (var r = [], a = t; a < t + n; ++a) r.push(("0" + e[a].toString(16)).slice(-2));
    return r.join("");
  },
  Nnr = Uc ? function (e, t, n) {
    return Buffer.isBuffer(e) ? e.toString("hex", t, t + n) : Lin(e, t, n);
  } : Lin,
  Oin = function (e, t, n) {
    for (var r = [], a = t; a < n; a++) r.push(String.fromCharCode(Mne(e, a)));
    return r.join("");
  },
  wpe = Uc ? function (t, n, r) {
    return Buffer.isBuffer(t) ? t.toString("utf8", n, r) : Oin(t, n, r);
  } : Oin,
  jnr = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? wpe(e, t + 4, t + 4 + n - 1) : "";
  },
  EOt = jnr,
  Dnr = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? wpe(e, t + 4, t + 4 + n - 1) : "";
  },
  TOt = Dnr,
  Lnr = function (e, t) {
    var n = 2 * Ev(e, t);
    return n > 0 ? wpe(e, t + 4, t + 4 + n - 1) : "";
  },
  MOt = Lnr,
  Onr = function (t, n) {
    var r = Ev(t, n);
    return r > 0 ? FXe(t, n + 4, n + 4 + r) : "";
  },
  POt = Onr,
  Bnr = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? wpe(e, t + 4, t + 4 + n) : "";
  },
  ROt = Bnr,
  Fnr = function (e, t) {
    return uHa(e, t);
  },
  Wze = Fnr,
  NOt = function (t) {
    return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
  };

Uc && (EOt = function (t, n) {
  if (!Buffer.isBuffer(t)) return jnr(t, n);
  var r = t.readUInt32LE(n);
  return r > 0 ? t.toString("utf8", n + 4, n + 4 + r - 1) : "";
}, TOt = function (t, n) {
  if (!Buffer.isBuffer(t)) return Dnr(t, n);
  var r = t.readUInt32LE(n);
  return r > 0 ? t.toString("utf8", n + 4, n + 4 + r - 1) : "";
}, MOt = function (t, n) {
  if (!Buffer.isBuffer(t) || !mke) return Lnr(t, n);
  var r = 2 * t.readUInt32LE(n);
  return t.toString("utf16le", n + 4, n + 4 + r - 1);
}, POt = function (t, n) {
  if (!Buffer.isBuffer(t) || !mke) return Onr(t, n);
  var r = t.readUInt32LE(n);
  return t.toString("utf16le", n + 4, n + 4 + r);
}, ROt = function (t, n) {
  if (!Buffer.isBuffer(t)) return Bnr(t, n);
  var r = t.readUInt32LE(n);
  return t.toString("utf8", n + 4, n + 4 + r);
}, Wze = function (t, n) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(n) : Fnr(t, n);
}, NOt = function (t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});

function znr() {
  FXe = function (e, t, n) {
    return Rc.utils.decode(1200, e.slice(t, n)).replace(n_, "");
  }, wpe = function (e, t, n) {
    return Rc.utils.decode(65001, e.slice(t, n));
  }, EOt = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? Rc.utils.decode(bJ, e.slice(t + 4, t + 4 + n - 1)) : "";
  }, TOt = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? Rc.utils.decode(mb, e.slice(t + 4, t + 4 + n - 1)) : "";
  }, MOt = function (e, t) {
    var n = 2 * Ev(e, t);
    return n > 0 ? Rc.utils.decode(1200, e.slice(t + 4, t + 4 + n - 1)) : "";
  }, POt = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? Rc.utils.decode(1200, e.slice(t + 4, t + 4 + n)) : "";
  }, ROt = function (e, t) {
    var n = Ev(e, t);
    return n > 0 ? Rc.utils.decode(65001, e.slice(t + 4, t + 4 + n)) : "";
  };
}

typeof Rc < "u" && znr();

var Mne = function (e, t) {
    return e[t];
  },
  M7 = function (e, t) {
    return e[t + 1] * 256 + e[t];
  },
  pHa = function (e, t) {
    var n = e[t + 1] * 256 + e[t];
    return n < 32768 ? n : (65535 - n + 1) * -1;
  },
  Ev = function (e, t) {
    return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
  },
  wH = function (e, t) {
    return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
  },
  mHa = function (e, t) {
    return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
  };

function s1e(e, t) {
  var n = "",
    r,
    a,
    i = [],
    o,
    s,
    l,
    d;
  switch (t) {
    case "dbcs":
      if (d = this.l, Uc && Buffer.isBuffer(this) && mke) n = this.slice(this.l, this.l + 2 * e).toString("utf16le");else for (l = 0; l < e; ++l) n += String.fromCharCode(M7(this, d)), d += 2;
      e *= 2;
      break;
    case "utf8":
      n = wpe(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, n = FXe(this, this.l, this.l + e);
      break;
    case "wstr":
      if (typeof Rc < "u") n = Rc.utils.decode(mb, this.slice(this.l, this.l + 2 * e));else return s1e.call(this, e, "dbcs");
      e = 2 * e;
      break;
    case "lpstr-ansi":
      n = EOt(this, this.l), e = 4 + Ev(this, this.l);
      break;
    case "lpstr-cp":
      n = TOt(this, this.l), e = 4 + Ev(this, this.l);
      break;
    case "lpwstr":
      n = MOt(this, this.l), e = 4 + 2 * Ev(this, this.l);
      break;
    case "lpp4":
      e = 4 + Ev(this, this.l), n = POt(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Ev(this, this.l), n = ROt(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, n = ""; (o = Mne(this, this.l + e++)) !== 0;) i.push(K0e(o));
      n = i.join("");
      break;
    case "_wstr":
      for (e = 0, n = ""; (o = M7(this, this.l + e)) !== 0;) i.push(K0e(o)), e += 2;
      e += 2, n = i.join("");
      break;
    case "dbcs-cont":
      for (n = "", d = this.l, l = 0; l < e; ++l) {
        if (this.lens && this.lens.indexOf(d) !== -1) return o = Mne(this, d), this.l = d + 1, s = s1e.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont"), i.join("") + s;
        i.push(K0e(M7(this, d))), d += 2;
      }
      n = i.join(""), e *= 2;
      break;
    case "cpstr":
      if (typeof Rc < "u") {
        n = Rc.utils.decode(mb, this.slice(this.l, this.l + e));
        break;
      }
    case "sbcs-cont":
      for (n = "", d = this.l, l = 0; l != e; ++l) {
        if (this.lens && this.lens.indexOf(d) !== -1) return o = Mne(this, d), this.l = d + 1, s = s1e.call(this, e - l, o ? "dbcs-cont" : "sbcs-cont"), i.join("") + s;
        i.push(K0e(Mne(this, d))), d += 1;
      }
      n = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return r = Mne(this, this.l), this.l++, r;
        case 2:
          return r = (t === "i" ? pHa : M7)(this, this.l), this.l += 2, r;
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0 ? (r = (e > 0 ? wH : mHa)(this, this.l), this.l += 4, r) : (a = Ev(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f") return e == 8 ? a = Wze(this, this.l) : a = Wze([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          n = Nnr(this, this.l, e);
          break;
      }
  }
  return this.l += e, n;
}

var fHa = function (e, t, n) {
    e[n] = t & 255, e[n + 1] = t >>> 8 & 255, e[n + 2] = t >>> 16 & 255, e[n + 3] = t >>> 24 & 255;
  },
  gHa = function (e, t, n) {
    e[n] = t & 255, e[n + 1] = t >> 8 & 255, e[n + 2] = t >> 16 & 255, e[n + 3] = t >> 24 & 255;
  },
  yHa = function (e, t, n) {
    e[n] = t & 255, e[n + 1] = t >>> 8 & 255;
  };

function bHa(e, t, n) {
  var r = 0,
    a = 0;
  if (n === "dbcs") {
    for (a = 0; a != t.length; ++a) yHa(this, t.charCodeAt(a), this.l + 2 * a);
    r = 2 * t.length;
  } else if (n === "sbcs" || n == "cpstr") {
    if (typeof Rc < "u" && bJ == 874) {
      for (a = 0; a != t.length; ++a) {
        var i = Rc.utils.encode(bJ, t.charAt(a));
        this[this.l + a] = i[0];
      }
      r = t.length;
    } else if (typeof Rc < "u" && n == "cpstr") {
      if (i = Rc.utils.encode(mb, t), i.length == t.length) for (a = 0; a < t.length; ++a) i[a] == 0 && t.charCodeAt(a) != 0 && (i[a] = 95);
      if (i.length == 2 * t.length) for (a = 0; a < t.length; ++a) i[2 * a] == 0 && i[2 * a + 1] == 0 && t.charCodeAt(a) != 0 && (i[2 * a] = 95);
      for (a = 0; a < i.length; ++a) this[this.l + a] = i[a];
      r = i.length;
    } else {
      for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a) this[this.l + a] = t.charCodeAt(a) & 255;
      r = t.length;
    }
  } else if (n === "hex") {
    for (; a < e; ++a) this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (n === "utf16le") {
    var o = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < o;) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      r = 1, this[this.l] = t & 255;
      break;
    case 2:
      r = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      r = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      r = 4, fHa(this, t, this.l);
      break;
    case 8:
      if (r = 8, n === "f") {
        hHa(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      r = 4, gHa(this, t, this.l);
      break;
  }
  return this.l += r, this;
}

function Unr(e, t) {
  var n = Nnr(this, this.l, e.length >> 1);
  if (n !== e) throw new Error(t + "Expected " + e + " saw " + n);
  this.l += e.length >> 1;
}

function db(e, t) {
  e.l = t, e.read_shift = s1e, e.chk = Unr, e.write_shift = bHa;
}

function Rx(e, t) {
  e.l += t;
}

function Ja(e) {
  var t = s$(e);
  return db(t, 0), t;
}

function GD(e, t, n) {
  if (e) {
    var r, a, i;
    db(e, e.l || 0);
    for (var o = e.length, s = 0, l = 0; e.l < o;) {
      s = e.read_shift(1), s & 128 && (s = (s & 127) + ((e.read_shift(1) & 127) << 7));
      var d = kke[s] || kke[65535];
      for (r = e.read_shift(1), i = r & 127, a = 1; a < 4 && r & 128; ++a) i += ((r = e.read_shift(1)) & 127) << 7 * a;
      l = e.l + i;
      var u = d.f && d.f(e, i, n);
      if (e.l = l, t(u, d, s)) return;
    }
  }
}

function kx() {
  var e = [],
    t = Uc ? 16384 : 2048;
  Uc && Ja(t).copy;
  var n = function (u) {
      var h = Ja(u);
      return db(h, 0), h;
    },
    r = n(t),
    a = function () {
      r && (r.l && (r.length > r.l && (r = r.slice(0, r.l), r.l = r.length), r.length > 0 && e.push(r)), r = null);
    },
    i = function (u) {
      return r && u < r.length - r.l ? r : (a(), r = n(Math.max(u + 1, t)));
    },
    o = function () {
      return a(), k0(e);
    },
    s = function () {
      return a(), e;
    },
    l = function (u) {
      a(), r = u, r.l == null && (r.l = r.length), i(t);
    };
  return {
    next: i,
    push: l,
    end: o,
    _bufs: e,
    end2: s
  };
}

function Ei(e, t, n, r) {
  var a = +t,
    i;
  if (!isNaN(a)) {
    r || (r = kke[a].p || (n || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, r >= 128 && ++i, r >= 16384 && ++i, r >= 2097152 && ++i;
    var o = e.next(i);
    a <= 127 ? o.write_shift(1, a) : (o.write_shift(1, (a & 127) + 128), o.write_shift(1, a >> 7));
    for (var s = 0; s != 4; ++s) if (r >= 128) o.write_shift(1, (r & 127) + 128), r >>= 7;else {
      o.write_shift(1, r);
      break;
    }
    r > 0 && NOt(n) && e.push(n);
  }
}

function l1e(e, t, n) {
  var r = qu(e);
  if (t.s ? (r.cRel && (r.c += t.s.c), r.rRel && (r.r += t.s.r)) : (r.cRel && (r.c += t.c), r.rRel && (r.r += t.r)), !n || n.biff < 12) {
    for (; r.c >= 256;) r.c -= 256;
    for (; r.r >= 65536;) r.r -= 65536;
  }
  return r;
}

function Bin(e, t, n) {
  var r = qu(e);
  return r.s = l1e(r.s, t.s, n), r.e = l1e(r.e, t.s, n), r;
}

function c1e(e, t) {
  if (e.cRel && e.c < 0) for (e = qu(e); e.c < 0;) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0) for (e = qu(e); e.r < 0;) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var n = Xc(e);
  return !e.cRel && e.cRel != null && (n = xHa(n)), !e.rRel && e.rRel != null && (n = vHa(n)), n;
}

function Fit(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + ic(e.s.c) + ":" + (e.e.cRel ? "" : "$") + ic(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Jc(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Jc(e.e.r) : c1e(e.s, t.biff) + ":" + c1e(e.e, t.biff);
}

function jOt(e) {
  return parseInt(wHa(e), 10) - 1;
}

function Jc(e) {
  return "" + (e + 1);
}

function vHa(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}

function wHa(e) {
  return e.replace(/\$(\d+)$/, "$1");
}

function DOt(e) {
  for (var t = _Ha(e), n = 0, r = 0; r !== t.length; ++r) n = 26 * n + t.charCodeAt(r) - 64;
  return n - 1;
}

function ic(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}

function xHa(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}

function _Ha(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}

function kHa(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}

function Eh(e) {
  for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
    var a = e.charCodeAt(r);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (n = 26 * n + (a - 64));
  }
  return {
    c: n - 1,
    r: t - 1
  };
}

function Xc(e) {
  for (var t = e.c + 1, n = ""; t; t = (t - 1) / 26 | 0) n = String.fromCharCode((t - 1) % 26 + 65) + n;
  return n + (e.r + 1);
}

function Ty(e) {
  var t = e.indexOf(":");
  return t == -1 ? {
    s: Eh(e),
    e: Eh(e)
  } : {
    s: Eh(e.slice(0, t)),
    e: Eh(e.slice(t + 1))
  };
}

function Ac(e, t) {
  return typeof t > "u" || typeof t == "number" ? Ac(e.s, e.e) : (typeof e != "string" && (e = Xc(e)), typeof t != "string" && (t = Xc(t)), e == t ? e : e + ":" + t);
}

function Ede(e) {
  var t = Ty(e);
  return "$" + ic(t.s.c) + "$" + Jc(t.s.r) + ":$" + ic(t.e.c) + "$" + Jc(t.e.r);
}

function yke(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e.replace(/'/g, "''") + "'" : e;
}

function wd(e) {
  var t = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: 0
      }
    },
    n = 0,
    r = 0,
    a = 0,
    i = e.length;
  for (n = 0; r < i && !((a = e.charCodeAt(r) - 64) < 1 || a > 26); ++r) n = 26 * n + a;
  for (t.s.c = --n, n = 0; r < i && !((a = e.charCodeAt(r) - 48) < 0 || a > 9); ++r) n = 10 * n + a;
  if (t.s.r = --n, r === i || a != 10) return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++r, n = 0; r != i && !((a = e.charCodeAt(r) - 64) < 1 || a > 26); ++r) n = 26 * n + a;
  for (t.e.c = --n, n = 0; r != i && !((a = e.charCodeAt(r) - 48) < 0 || a > 9); ++r) n = 10 * n + a;
  return t.e.r = --n, t;
}

function Fin(e, t) {
  var n = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = Qk(e.z, n ? bg(t) : t);
  } catch {}
  try {
    return e.w = Qk((e.XF || {}).numFmtId || (n ? 14 : 0), n ? bg(t) : t);
  } catch {
    return "" + t;
  }
}

function VP(e, t, n) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && n && n.dateNF && (e.z = n.dateNF), e.t == "e" ? Mb[e.v] || e.v : t == null ? Fin(e, e.v) : Fin(e, t));
}

function mG(e, t) {
  var n = t && t.sheet ? t.sheet : "Sheet1",
    r = {};
  return r[n] = e, {
    SheetNames: [n],
    Sheets: r
  };
}

function AHa(e) {
  var t = {},
    n = e || {};
  return n.dense && (t["!data"] = []), t;
}

function $nr(e, t, n) {
  var r = n || {},
    a = e ? e["!data"] != null : r.dense,
    i = e || (a ? {
      "!data": []
    } : {});
  a && !i["!data"] && (i["!data"] = []);
  var o = 0,
    s = 0;
  if (i && r.origin != null) if (typeof r.origin == "number") o = r.origin;else {
    var l = typeof r.origin == "string" ? Eh(r.origin) : r.origin;
    o = l.r, s = l.c;
  }
  var d = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  if (i["!ref"]) {
    var u = wd(i["!ref"]);
    d.s.c = u.s.c, d.s.r = u.s.r, d.e.c = Math.max(d.e.c, u.e.c), d.e.r = Math.max(d.e.r, u.e.r), o == -1 && (d.e.r = o = i["!ref"] ? u.e.r + 1 : 0);
  } else d.s.c = d.e.c = d.s.r = d.e.r = 0;
  for (var h = [], p = !1, m = 0; m != t.length; ++m) if (t[m]) {
    if (!Array.isArray(t[m])) throw new Error("aoa_to_sheet expects an array of arrays");
    var f = o + m;
    a && (i["!data"][f] || (i["!data"][f] = []), h = i["!data"][f]);
    for (var y = t[m], b = 0; b != y.length; ++b) if (!(typeof y[b] > "u")) {
      var v = {
          v: y[b],
          t: ""
        },
        _ = s + b;
      if (d.s.r > f && (d.s.r = f), d.s.c > _ && (d.s.c = _), d.e.r < f && (d.e.r = f), d.e.c < _ && (d.e.c = _), p = !0, y[b] && typeof y[b] == "object" && !Array.isArray(y[b]) && !(y[b] instanceof Date)) v = y[b];else if (Array.isArray(v.v) && (v.f = y[b][1], v.v = v.v[0]), v.v === null) {
        if (v.f) v.t = "n";else if (r.nullError) v.t = "e", v.v = 0;else if (r.sheetStubs) v.t = "z";else continue;
      } else typeof v.v == "number" ? isFinite(v.v) ? v.t = "n" : isNaN(v.v) ? (v.t = "e", v.v = 15) : (v.t = "e", v.v = 7) : typeof v.v == "boolean" ? v.t = "b" : v.v instanceof Date ? (v.z = r.dateNF || Cs[14], r.UTC || (v.v = OXe(v.v)), r.cellDates ? (v.t = "d", v.w = Qk(v.z, bg(v.v, r.date1904))) : (v.t = "n", v.v = bg(v.v, r.date1904), v.w = Qk(v.z, v.v))) : v.t = "s";
      if (a) h[_] && h[_].z && (v.z = h[_].z), h[_] = v;else {
        var w = ic(_) + (f + 1);
        i[w] && i[w].z && (v.z = i[w].z), i[w] = v;
      }
    }
  }
  return p && d.s.c < 104e5 && (i["!ref"] = Ac(d)), i;
}

function xpe(e, t) {
  return $nr(null, e, t);
}

function SHa(e) {
  return e.read_shift(4, "i");
}

function zE(e, t) {
  return t || (t = Ja(4)), t.write_shift(4, e), t;
}

function Ax(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}

function kb(e, t) {
  var n = !1;
  return t == null && (n = !0, t = Ja(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), n ? t.slice(0, t.l) : t;
}

function IHa(e) {
  return {
    ich: e.read_shift(2),
    ifnt: e.read_shift(2)
  };
}

function CHa(e, t) {
  return t || (t = Ja(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}

function LOt(e, t) {
  var n = e.l,
    r = e.read_shift(1),
    a = Ax(e),
    i = [],
    o = {
      t: a,
      h: a
    };
  if ((r & 1) !== 0) {
    for (var s = e.read_shift(4), l = 0; l != s; ++l) i.push(IHa(e));
    o.r = i;
  } else o.r = [{
    ich: 0,
    ifnt: 0
  }];
  return e.l = n + t, o;
}

function EHa(e, t) {
  var n = !1;
  return t == null && (n = !0, t = Ja(15 + 4 * e.t.length)), t.write_shift(1, 0), kb(e.t, t), n ? t.slice(0, t.l) : t;
}

var THa = LOt;

function MHa(e, t) {
  var n = !1;
  return t == null && (n = !0, t = Ja(23 + 4 * e.t.length)), t.write_shift(1, 1), kb(e.t, t), t.write_shift(4, 1), CHa({}, t), n ? t.slice(0, t.l) : t;
}

function gI(e) {
  var t = e.read_shift(4),
    n = e.read_shift(2);
  return n += e.read_shift(1) << 16, e.l++, {
    c: t,
    iStyleRef: n
  };
}

function WZ(e, t) {
  return t == null && (t = Ja(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}

function qZ(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, {
    c: -1,
    iStyleRef: t
  };
}

function KZ(e, t) {
  return t == null && (t = Ja(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}

var PHa = Ax,
  Gnr = kb;

function zXe(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}

function bke(e, t) {
  var n = !1;
  return t == null && (n = !0, t = Ja(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), n ? t.slice(0, t.l) : t;
}

var RHa = Ax,
  zwt = zXe,
  OOt = bke;

function UXe(e) {
  var t = e.slice(e.l, e.l + 4),
    n = t[0] & 1,
    r = t[0] & 2;
  e.l += 4;
  var a = r === 0 ? Wze([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : wH(t, 0) >> 2;
  return n ? a / 100 : a;
}

function Vnr(e, t) {
  t == null && (t = Ja(4));
  var n = 0,
    r = 0,
    a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? r = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (r = 1, n = 1), r) t.write_shift(-4, ((n ? a : e) << 2) + (n + 2));else throw new Error("unsupported RkNumber " + e);
}

function Hnr(e) {
  var t = {
    s: {},
    e: {}
  };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}

function NHa(e, t) {
  return t || (t = Ja(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}

var QZ = Hnr,
  _pe = NHa;

function cx(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}

function kJ(e, t) {
  return (t || Ja(8)).write_shift(8, e, "f");
}

function jHa(e) {
  var t = {},
    n = e.read_shift(1),
    r = n >>> 1,
    a = e.read_shift(1),
    i = e.read_shift(2, "i"),
    o = e.read_shift(1),
    s = e.read_shift(1),
    l = e.read_shift(1);
  switch (e.l++, r) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var d = jQ[a];
      d && (t.rgb = wke(d));
      break;
    case 2:
      t.rgb = wke([o, s, l]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}

function qze(e, t) {
  if (t || (t = Ja(8)), !e || e.auto) return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var n = e.tint || 0;
  if (n > 0 ? n *= 32767 : n < 0 && (n *= 32768), t.write_shift(2, n), !e.rgb || e.theme != null) t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);else {
    var r = e.rgb || "FFFFFF";
    typeof r == "number" && (r = ("000000" + r.toString(16)).slice(-6)), t.write_shift(1, parseInt(r.slice(0, 2), 16)), t.write_shift(1, parseInt(r.slice(2, 4), 16)), t.write_shift(1, parseInt(r.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}

function DHa(e) {
  var t = e.read_shift(1);
  e.l++;
  var n = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return n;
}

function LHa(e, t) {
  t || (t = Ja(2));
  var n = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, n), t.write_shift(1, 0), t;
}

function Wnr(e, t) {
  var n = {
      2: "BITMAP",
      3: "METAFILEPICT",
      8: "DIB",
      14: "ENHMETAFILE"
    },
    r = e.read_shift(4);
  switch (r) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return n[e.read_shift(4)] || "";
  }
  if (r > 400) throw new Error("Unsupported Clipboard: " + r.toString(16));
  return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr");
}

function OHa(e) {
  return Wnr(e, 1);
}

function BHa(e) {
  return Wnr(e, 2);
}

var BOt = 2,
  rk = 3,
  $6e = 11,
  zin = 12,
  Kze = 19,
  G6e = 64,
  FHa = 65,
  zHa = 71,
  UHa = 4108,
  $Ha = 4126,
  wv = 80,
  qnr = 81,
  GHa = [wv, qnr],
  Uwt = {
    1: {
      n: "CodePage",
      t: BOt
    },
    2: {
      n: "Category",
      t: wv
    },
    3: {
      n: "PresentationFormat",
      t: wv
    },
    4: {
      n: "ByteCount",
      t: rk
    },
    5: {
      n: "LineCount",
      t: rk
    },
    6: {
      n: "ParagraphCount",
      t: rk
    },
    7: {
      n: "SlideCount",
      t: rk
    },
    8: {
      n: "NoteCount",
      t: rk
    },
    9: {
      n: "HiddenCount",
      t: rk
    },
    10: {
      n: "MultimediaClipCount",
      t: rk
    },
    11: {
      n: "ScaleCrop",
      t: $6e
    },
    12: {
      n: "HeadingPairs",
      t: UHa
    },
    13: {
      n: "TitlesOfParts",
      t: $Ha
    },
    14: {
      n: "Manager",
      t: wv
    },
    15: {
      n: "Company",
      t: wv
    },
    16: {
      n: "LinksUpToDate",
      t: $6e
    },
    17: {
      n: "CharacterCount",
      t: rk
    },
    19: {
      n: "SharedDoc",
      t: $6e
    },
    22: {
      n: "HyperlinksChanged",
      t: $6e
    },
    23: {
      n: "AppVersion",
      t: rk,
      p: "version"
    },
    24: {
      n: "DigSig",
      t: FHa
    },
    26: {
      n: "ContentType",
      t: wv
    },
    27: {
      n: "ContentStatus",
      t: wv
    },
    28: {
      n: "Language",
      t: wv
    },
    29: {
      n: "Version",
      t: wv
    },
    255: {},
    2147483648: {
      n: "Locale",
      t: Kze
    },
    2147483651: {
      n: "Behavior",
      t: Kze
    },
    1919054434: {}
  },
  $wt = {
    1: {
      n: "CodePage",
      t: BOt
    },
    2: {
      n: "Title",
      t: wv
    },
    3: {
      n: "Subject",
      t: wv
    },
    4: {
      n: "Author",
      t: wv
    },
    5: {
      n: "Keywords",
      t: wv
    },
    6: {
      n: "Comments",
      t: wv
    },
    7: {
      n: "Template",
      t: wv
    },
    8: {
      n: "LastAuthor",
      t: wv
    },
    9: {
      n: "RevNumber",
      t: wv
    },
    10: {
      n: "EditTime",
      t: G6e
    },
    11: {
      n: "LastPrinted",
      t: G6e
    },
    12: {
      n: "CreatedDate",
      t: G6e
    },
    13: {
      n: "ModifiedDate",
      t: G6e
    },
    14: {
      n: "PageCount",
      t: rk
    },
    15: {
      n: "WordCount",
      t: rk
    },
    16: {
      n: "CharCount",
      t: rk
    },
    17: {
      n: "Thumbnail",
      t: zHa
    },
    18: {
      n: "Application",
      t: wv
    },
    19: {
      n: "DocSecurity",
      t: rk
    },
    255: {},
    2147483648: {
      n: "Locale",
      t: Kze
    },
    2147483651: {
      n: "Behavior",
      t: Kze
    },
    1919054434: {}
  },
  Uin = {
    1: "US",
    2: "CA",
    3: "",
    7: "RU",
    20: "EG",
    30: "GR",
    31: "NL",
    32: "BE",
    33: "FR",
    34: "ES",
    36: "HU",
    39: "IT",
    41: "CH",
    43: "AT",
    44: "GB",
    45: "DK",
    46: "SE",
    47: "NO",
    48: "PL",
    49: "DE",
    52: "MX",
    55: "BR",
    61: "AU",
    64: "NZ",
    66: "TH",
    81: "JP",
    82: "KR",
    84: "VN",
    86: "CN",
    90: "TR",
    105: "JS",
    213: "DZ",
    216: "MA",
    218: "LY",
    351: "PT",
    354: "IS",
    358: "FI",
    420: "CZ",
    886: "TW",
    961: "LB",
    962: "JO",
    963: "SY",
    964: "IQ",
    965: "KW",
    966: "SA",
    971: "AE",
    972: "IL",
    974: "QA",
    981: "IR",
    65535: "US"
  },
  VHa = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];

function HHa(e) {
  return e.map(function (t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}

var WHa = HHa([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 0, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  jQ = qu(WHa),
  Mb = {
    0: "#NULL!",
    7: "#DIV/0!",
    15: "#VALUE!",
    23: "#REF!",
    29: "#NAME?",
    36: "#NUM!",
    42: "#N/A",
    43: "#GETTING_DATA",
    255: "#WTF?"
  },
  Lv = {
    "#NULL!": 0,
    "#DIV/0!": 7,
    "#VALUE!": 15,
    "#REF!": 23,
    "#NAME?": 29,
    "#NUM!": 36,
    "#N/A": 42,
    "#GETTING_DATA": 43,
    "#WTF?": 255
  },
  FOt = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"],
  Gwt = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
    "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
    "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
    "application/vnd.ms-excel.worksheet": "sheets",
    "application/vnd.ms-excel.binIndexWs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
    "application/vnd.ms-excel.chartsheet": "charts",
    "application/vnd.ms-excel.macrosheet+xml": "macros",
    "application/vnd.ms-excel.macrosheet": "macros",
    "application/vnd.ms-excel.intlmacrosheet": "TODO",
    "application/vnd.ms-excel.binIndexMs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
    "application/vnd.ms-excel.dialogsheet": "dialogs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
    "application/vnd.ms-excel.sharedStrings": "strs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
    "application/vnd.ms-excel.styles": "styles",
    "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
    "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
    "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
    "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
    "application/vnd.ms-excel.comments": "comments",
    "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
    "application/vnd.ms-excel.person+xml": "people",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
    "application/vnd.ms-excel.sheetMetadata": "metadata",
    "application/vnd.ms-excel.pivotTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
    "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
    "application/vnd.ms-office.chartstyle+xml": "TODO",
    "application/vnd.ms-office.chartex+xml": "TODO",
    "application/vnd.ms-excel.calcChain": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
    "application/vnd.ms-office.activeX": "TODO",
    "application/vnd.ms-office.activeX+xml": "TODO",
    "application/vnd.ms-excel.attachedToolbars": "TODO",
    "application/vnd.ms-excel.connections": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
    "application/vnd.ms-excel.externalLink": "links",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
    "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
    "application/vnd.ms-excel.pivotCacheRecords": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
    "application/vnd.ms-excel.queryTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
    "application/vnd.ms-excel.userNames": "TODO",
    "application/vnd.ms-excel.revisionHeaders": "TODO",
    "application/vnd.ms-excel.revisionLog": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
    "application/vnd.ms-excel.tableSingleCells": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
    "application/vnd.ms-excel.slicer": "TODO",
    "application/vnd.ms-excel.slicerCache": "TODO",
    "application/vnd.ms-excel.slicer+xml": "TODO",
    "application/vnd.ms-excel.slicerCache+xml": "TODO",
    "application/vnd.ms-excel.wsSortMap": "TODO",
    "application/vnd.ms-excel.table": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
    "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
    "application/vnd.ms-excel.Timeline+xml": "TODO",
    "application/vnd.ms-excel.TimelineCache+xml": "TODO",
    "application/vnd.ms-office.vbaProject": "vba",
    "application/vnd.ms-office.vbaProjectSignature": "TODO",
    "application/vnd.ms-office.volatileDependencies": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
    "application/vnd.ms-excel.controlproperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.model+data": "TODO",
    "application/vnd.ms-excel.Survey+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
    "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
    "application/vnd.openxmlformats-package.relationships+xml": "rels",
    "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
    "image/png": "TODO",
    sheet: "js"
  },
  V6e = {
    workbooks: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
      xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
      xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
      xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
    },
    strs: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
      xlsb: "application/vnd.ms-excel.sharedStrings"
    },
    comments: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
      xlsb: "application/vnd.ms-excel.comments"
    },
    sheets: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      xlsb: "application/vnd.ms-excel.worksheet"
    },
    charts: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
      xlsb: "application/vnd.ms-excel.chartsheet"
    },
    dialogs: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
      xlsb: "application/vnd.ms-excel.dialogsheet"
    },
    macros: {
      xlsx: "application/vnd.ms-excel.macrosheet+xml",
      xlsb: "application/vnd.ms-excel.macrosheet"
    },
    metadata: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
      xlsb: "application/vnd.ms-excel.sheetMetadata"
    },
    styles: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
      xlsb: "application/vnd.ms-excel.styles"
    }
  };

function zOt() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}

function qHa(e) {
  var t = zOt();
  if (!e || !e.match) return t;
  var n = {};
  if ((e.match(mw) || []).forEach(function (r) {
    var a = es(r);
    switch (a[0].replace(nHa, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        n[a.Extension.toLowerCase()] = a.ContentType;
        break;
      case "<Override":
        t[Gwt[a.ContentType]] !== void 0 && t[Gwt[a.ContentType]].push(a.PartName);
        break;
    }
  }), t.xmlns !== fb.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = n, delete t.calcchains, t;
}

function Knr(e, t, n) {
  var r = LVa(Gwt),
    a = [],
    i;
  a[a.length] = e0, a[a.length] = no("Types", null, {
    xmlns: fb.CT,
    "xmlns:xsd": fb.xsd,
    "xmlns:xsi": fb.xsi
  }), a = a.concat([["xml", "application/xml"], ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"], ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"], ["data", "application/vnd.openxmlformats-officedocument.model+data"], ["bmp", "image/bmp"], ["png", "image/png"], ["gif", "image/gif"], ["emf", "image/x-emf"], ["wmf", "image/x-wmf"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["tif", "image/tiff"], ["tiff", "image/tiff"], ["pdf", "application/pdf"], ["rels", "application/vnd.openxmlformats-package.relationships+xml"]].map(function (d) {
    return no("Default", null, {
      Extension: d[0],
      ContentType: d[1]
    });
  }));
  var o = function (d) {
      e[d] && e[d].length > 0 && (i = e[d][0], a[a.length] = no("Override", null, {
        PartName: (i[0] == "/" ? "" : "/") + i,
        ContentType: V6e[d][t.bookType] || V6e[d].xlsx
      }));
    },
    s = function (d) {
      (e[d] || []).forEach(function (u) {
        a[a.length] = no("Override", null, {
          PartName: (u[0] == "/" ? "" : "/") + u,
          ContentType: V6e[d][t.bookType] || V6e[d].xlsx
        });
      });
    },
    l = function (d) {
      (e[d] || []).forEach(function (u) {
        a[a.length] = no("Override", null, {
          PartName: (u[0] == "/" ? "" : "/") + u,
          ContentType: r[d][0]
        });
      });
    };
  return o("workbooks"), s("sheets"), s("charts"), l("themes"), ["strs", "styles"].forEach(o), ["coreprops", "extprops", "custprops"].forEach(l), l("vba"), l("comments"), l("threadedcomments"), l("drawings"), s("metadata"), l("people"), a.length > 2 && (a[a.length] = "</Types>", a[1] = a[1].replace("/>", ">")), a.join("");
}

var Kc = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  CONN: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};

function vke(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}

function d1e(e, t) {
  var n = {
    "!id": {}
  };
  if (!e) return n;
  t.charAt(0) !== "/" && (t = "/" + t);
  var r = {};
  return (e.match(mw) || []).forEach(function (a) {
    var i = es(a);
    if (i[0] === "<Relationship") {
      var o = {};
      o.Type = i.Type, o.Target = jd(i.Target), o.Id = i.Id, i.TargetMode && (o.TargetMode = i.TargetMode);
      var s = i.TargetMode === "External" ? i.Target : zre(i.Target, t);
      n[s] = o, r[i.Id] = o;
    }
  }), n["!id"] = r, n;
}

function Vie(e) {
  var t = [e0, no("Relationships", null, {
    xmlns: fb.RELS
  })];
  return Gm(e["!id"]).forEach(function (n) {
    t[t.length] = no("Relationship", null, e["!id"][n]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}

function Ju(e, t, n, r, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t);
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = r, a.Target = n, [Kc.HLINK, Kc.XPATH, Kc.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}

var KHa = "application/vnd.oasis.opendocument.spreadsheet";

function QHa(e, t) {
  for (var n = BXe(e), r, a; r = sy.exec(n);) switch (r[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (a = es(r[0], !1), a.path == "/" && a.type !== KHa) throw new Error("This OpenDocument is not a spreadsheet");
      break;
    case "encryption-data":
    case "algorithm":
    case "start-key-generation":
    case "key-derivation":
      throw new Error("Unsupported ODS Encryption");
    default:
      if (t && t.WTF) throw r;
  }
}

function YHa(e) {
  var t = [e0];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var n = 0; n < e.length; ++n) t.push('  <manifest:file-entry manifest:full-path="' + e[n][0] + '" manifest:media-type="' + e[n][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}

function $in(e, t, n) {
  return ['  <rdf:Description rdf:about="' + e + `">
`, '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (n || "odf") + "#" + t + `"/>
`, `  </rdf:Description>
`].join("");
}

function XHa(e, t) {
  return ['  <rdf:Description rdf:about="' + e + `">
`, '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`, `  </rdf:Description>
`].join("");
}

function JHa(e) {
  var t = [e0];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var n = 0; n != e.length; ++n) t.push($in(e[n][0], e[n][1])), t.push(XHa("", e[n][0]));
  return t.push($in("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}

function Qnr(e, t) {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + pke.version + "</meta:generator></office:meta></office:document-meta>";
}

var cj = [["cp:category", "Category"], ["cp:contentStatus", "ContentStatus"], ["cp:keywords", "Keywords"], ["cp:lastModifiedBy", "LastAuthor"], ["cp:lastPrinted", "LastPrinted"], ["cp:revision", "RevNumber"], ["cp:version", "Version"], ["dc:creator", "Author"], ["dc:description", "Comments"], ["dc:identifier", "Identifier"], ["dc:language", "Language"], ["dc:subject", "Subject"], ["dc:title", "Title"], ["dcterms:created", "CreatedDate", "date"], ["dcterms:modified", "ModifiedDate", "date"]];

function Ynr(e) {
  var t = {};
  e = Ch(e);
  for (var n = 0; n < cj.length; ++n) {
    var r = cj[n],
      a = NQ(e, r[0]);
    a != null && a.length > 0 && (t[r[1]] = jd(a[1])), r[2] === "date" && t[r[1]] && (t[r[1]] = Rf(t[r[1]]));
  }
  return t;
}

function zit(e, t, n, r, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = xc(t), r[r.length] = n ? no(e, t, n) : z1(e, t));
}

function Xnr(e, t) {
  var n = t || {},
    r = [e0, no("cp:coreProperties", null, {
      "xmlns:cp": fb.CORE_PROPS,
      "xmlns:dc": fb.dc,
      "xmlns:dcterms": fb.dcterms,
      "xmlns:dcmitype": fb.dcmitype,
      "xmlns:xsi": fb.xsi
    })],
    a = {};
  if (!e && !n.Props) return r.join("");
  e && (e.CreatedDate != null && zit("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Fwt(e.CreatedDate, n.WTF), {
    "xsi:type": "dcterms:W3CDTF"
  }, r, a), e.ModifiedDate != null && zit("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Fwt(e.ModifiedDate, n.WTF), {
    "xsi:type": "dcterms:W3CDTF"
  }, r, a));
  for (var i = 0; i != cj.length; ++i) {
    var o = cj[i],
      s = n.Props && n.Props[o[1]] != null ? n.Props[o[1]] : e ? e[o[1]] : null;
    s === !0 ? s = "1" : s === !1 ? s = "0" : typeof s == "number" && (s = String(s)), s != null && zit(o[0], s, null, r, a);
  }
  return r.length > 2 && (r[r.length] = "</cp:coreProperties>", r[1] = r[1].replace("/>", ">")), r.join("");
}

var DQ = [["Application", "Application", "string"], ["AppVersion", "AppVersion", "string"], ["Company", "Company", "string"], ["DocSecurity", "DocSecurity", "string"], ["Manager", "Manager", "string"], ["HyperlinksChanged", "HyperlinksChanged", "bool"], ["SharedDoc", "SharedDoc", "bool"], ["LinksUpToDate", "LinksUpToDate", "bool"], ["ScaleCrop", "ScaleCrop", "bool"], ["HeadingPairs", "HeadingPairs", "raw"], ["TitlesOfParts", "TitlesOfParts", "raw"]],
  Jnr = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];

function Znr(e, t, n, r) {
  var a = [];
  if (typeof e == "string") a = Rin(e, r);else for (var i = 0; i < e.length; ++i) a = a.concat(e[i].map(function (u) {
    return {
      v: u
    };
  }));
  var o = typeof t == "string" ? Rin(t, r).map(function (u) {
      return u.v;
    }) : t,
    s = 0,
    l = 0;
  if (o.length > 0) for (var d = 0; d !== a.length; d += 2) {
    switch (l = +a[d + 1].v, a[d].v) {
      case "Worksheets":
      case "工作表":
      case "Листы":
      case "أوراق العمل":
      case "ワークシート":
      case "גליונות עבודה":
      case "Arbeitsblätter":
      case "Çalışma Sayfaları":
      case "Feuilles de calcul":
      case "Fogli di lavoro":
      case "Folhas de cálculo":
      case "Planilhas":
      case "Regneark":
      case "Hojas de cálculo":
      case "Werkbladen":
        n.Worksheets = l, n.SheetNames = o.slice(s, s + l);
        break;
      case "Named Ranges":
      case "Rangos con nombre":
      case "名前付き一覧":
      case "Benannte Bereiche":
      case "Navngivne områder":
        n.NamedRanges = l, n.DefinedNames = o.slice(s, s + l);
        break;
      case "Charts":
      case "Diagramme":
        n.Chartsheets = l, n.ChartNames = o.slice(s, s + l);
        break;
    }
    s += l;
  }
}

function ZHa(e, t, n) {
  var r = {};
  return t || (t = {}), e = Ch(e), DQ.forEach(function (a) {
    var i = (Mv(e, a[0]) || [])[1];
    switch (a[2]) {
      case "string":
        i && (t[a[1]] = jd(i));
        break;
      case "bool":
        t[a[1]] = i === "true";
        break;
      case "raw":
        var o = NQ(e, a[0]);
        o && o.length > 0 && (r[a[1]] = o[1]);
        break;
    }
  }), r.HeadingPairs && r.TitlesOfParts && Znr(r.HeadingPairs, r.TitlesOfParts, t, n), t;
}

function err(e) {
  var t = [],
    n = no;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = e0, t[t.length] = no("Properties", null, {
    xmlns: fb.EXT_PROPS,
    "xmlns:vt": fb.vt
  }), DQ.forEach(function (r) {
    if (e[r[1]] !== void 0) {
      var a;
      switch (r[2]) {
        case "string":
          a = xc(String(e[r[1]]));
          break;
        case "bool":
          a = e[r[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = n(r[0], a));
    }
  }), t[t.length] = n("HeadingPairs", n("vt:vector", n("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + n("vt:variant", n("vt:i4", String(e.Worksheets))), {
    size: 2,
    baseType: "variant"
  })), t[t.length] = n("TitlesOfParts", n("vt:vector", e.SheetNames.map(function (r) {
    return "<vt:lpstr>" + xc(r) + "</vt:lpstr>";
  }).join(""), {
    size: e.Worksheets,
    baseType: "lpstr"
  })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}

var eWa = /<[^<>]+>[^<]*/g;

function tWa(e, t) {
  var n = {},
    r = "",
    a = e.match(eWa);
  if (a) for (var i = 0; i != a.length; ++i) {
    var o = a[i],
      s = es(o);
    switch (fI(s[0])) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        r = jd(s.name);
        break;
      case "</property>":
        r = null;
        break;
      default:
        if (o.indexOf("<vt:") === 0) {
          var l = o.split(">"),
            d = l[0].slice(4),
            u = l[1];
          switch (d) {
            case "lpstr":
            case "bstr":
            case "lpwstr":
              n[r] = jd(u);
              break;
            case "bool":
              n[r] = rh(u);
              break;
            case "i1":
            case "i2":
            case "i4":
            case "i8":
            case "int":
            case "uint":
              n[r] = parseInt(u, 10);
              break;
            case "r4":
            case "r8":
            case "decimal":
              n[r] = parseFloat(u);
              break;
            case "filetime":
            case "date":
              n[r] = Rf(u);
              break;
            case "cy":
            case "error":
              n[r] = jd(u);
              break;
            default:
              if (d.slice(-1) == "/") break;
              t.WTF && typeof console < "u" && console.warn("Unexpected", o, d, l);
          }
        } else if (o.slice(0, 2) !== "</") {
          if (t.WTF) throw new Error(o);
        }
    }
  }
  return n;
}

function trr(e) {
  var t = [e0, no("Properties", null, {
    xmlns: fb.CUST_PROPS,
    "xmlns:vt": fb.vt
  })];
  if (!e) return t.join("");
  var n = 1;
  return Gm(e).forEach(function (a) {
    ++n, t[t.length] = no("property", dHa(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: n,
      name: xc(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}

var Vwt = {
    Title: "Title",
    Subject: "Subject",
    Author: "Author",
    Keywords: "Keywords",
    Comments: "Description",
    LastAuthor: "LastAuthor",
    RevNumber: "Revision",
    Application: "AppName",
    LastPrinted: "LastPrinted",
    CreatedDate: "Created",
    ModifiedDate: "LastSaved",
    Category: "Category",
    Manager: "Manager",
    Company: "Company",
    AppVersion: "Version",
    ContentStatus: "ContentStatus",
    Identifier: "Identifier",
    Language: "Language"
  },
  Uit;

function nWa(e, t, n) {
  Uit || (Uit = LXe(Vwt)), t = Uit[t] || t, e[t] = n;
}

function rWa(e, t) {
  var n = [];
  return Gm(Vwt).map(function (r) {
    for (var a = 0; a < cj.length; ++a) if (cj[a][1] == r) return cj[a];
    for (a = 0; a < DQ.length; ++a) if (DQ[a][1] == r) return DQ[a];
    throw r;
  }).forEach(function (r) {
    if (e[r[1]] != null) {
      var a = t && t.Props && t.Props[r[1]] != null ? t.Props[r[1]] : e[r[1]];
      switch (r[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), n.push(z1(Vwt[r[1]] || r[1], a));
    }
  }), no("DocumentProperties", n.join(""), {
    xmlns: hb.o
  });
}

function aWa(e, t) {
  var n = ["Worksheets", "SheetNames"],
    r = "CustomDocumentProperties",
    a = [];
  return e && Gm(e).forEach(function (i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var o = 0; o < cj.length; ++o) if (i == cj[o][1]) return;
      for (o = 0; o < DQ.length; ++o) if (i == DQ[o][1]) return;
      for (o = 0; o < n.length; ++o) if (i == n[o]) return;
      var s = e[i],
        l = "string";
      typeof s == "number" ? (l = "float", s = String(s)) : s === !0 || s === !1 ? (l = "boolean", s = s ? "1" : "0") : s = String(s), a.push(no(Ein(i), s, {
        "dt:dt": l
      }));
    }
  }), t && Gm(t).forEach(function (i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var o = t[i],
        s = "string";
      typeof o == "number" ? (s = "float", o = String(o)) : o === !0 || o === !1 ? (s = "boolean", o = o ? "1" : "0") : o instanceof Date ? (s = "dateTime.tz", o = o.toISOString()) : o = String(o), a.push(no(Ein(i), o, {
        "dt:dt": s
      }));
    }
  }), "<" + r + ' xmlns="' + hb.o + '">' + a.join("") + "</" + r + ">";
}

function UOt(e) {
  var t = e.read_shift(4),
    n = e.read_shift(4);
  return new Date((n / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}

function iWa(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e,
    n = t.getTime() / 1e3 + 11644473600,
    r = n % Math.pow(2, 32),
    a = (n - r) / Math.pow(2, 32);
  r *= 1e7, a *= 1e7;
  var i = r / Math.pow(2, 32) | 0;
  i > 0 && (r = r % Math.pow(2, 32), a += i);
  var o = Ja(8);
  return o.write_shift(4, r), o.write_shift(4, a), o;
}

function oWa(e, t, n) {
  var r = e.l,
    a = e.read_shift(0, "lpstr-cp");
  if (n) for (; e.l - r & 3;) ++e.l;
  return a;
}

function sWa(e, t, n) {
  var r = e.read_shift(0, "lpwstr");
  return r;
}

function nrr(e, t, n) {
  return t === 31 ? sWa(e) : oWa(e, t, n);
}

function u1e(e, t, n) {
  return nrr(e, t, n === !1 ? 0 : 4);
}

function lWa(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return nrr(e, t, 0);
}

function cWa(e) {
  for (var t = e.read_shift(4), n = [], r = 0; r != t; ++r) {
    var a = e.l;
    n[r] = e.read_shift(0, "lpwstr").replace(n_, ""), e.l - a & 2 && (e.l += 2);
  }
  return n;
}

function dWa(e) {
  for (var t = e.read_shift(4), n = [], r = 0; r != t; ++r) n[r] = e.read_shift(0, "lpstr-cp").replace(n_, "");
  return n;
}

function uWa(e) {
  var t = e.l,
    n = Qze(e, qnr);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var r = Qze(e, rk);
  return [n, r];
}

function hWa(e) {
  for (var t = e.read_shift(4), n = [], r = 0; r < t / 2; ++r) n.push(uWa(e));
  return n;
}

function Gin(e, t) {
  for (var n = e.read_shift(4), r = {}, a = 0; a != n; ++a) {
    var i = e.read_shift(4),
      o = e.read_shift(4);
    r[i] = e.read_shift(o, t === 1200 ? "utf16le" : "utf8").replace(n_, "").replace(Q0e, "!"), t === 1200 && o % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), r;
}

function rrr(e) {
  var t = e.read_shift(4),
    n = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), n;
}

function pWa(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}

function Qze(e, t, n) {
  var r = e.read_shift(2),
    a,
    i = n || {};
  if (e.l += 2, t !== zin && r !== t && GHa.indexOf(t) === -1 && !((t & 65534) == 4126 && (r & 65534) == 4126)) throw new Error("Expected type " + t + " saw " + r);
  switch (t === zin ? r : t) {
    case 2:
      return a = e.read_shift(2, "i"), i.raw || (e.l += 2), a;
    case 3:
      return a = e.read_shift(4, "i"), a;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return a = e.read_shift(4), a;
    case 30:
      e.l += 4, val = u1e(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
      break;
    case 31:
      e.l += 4, val = u1e(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
      break;
    case 64:
      return UOt(e);
    case 65:
      return rrr(e);
    case 71:
      return pWa(e);
    case 80:
      return u1e(e, r, !i.raw).replace(n_, "");
    case 81:
      return lWa(e, r).replace(n_, "");
    case 4108:
      return hWa(e);
    case 4126:
    case 4127:
      return r == 4127 ? cWa(e) : dWa(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + r);
  }
}

function Vin(e, t) {
  var n = Ja(4),
    r = Ja(4);
  switch (n.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      r.write_shift(-4, t);
      break;
    case 5:
      r = Ja(8), r.write_shift(8, t, "f");
      break;
    case 11:
      r.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      r = iWa(t);
      break;
    case 31:
    case 80:
      for (r = Ja(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), r.write_shift(4, t.length + 1), r.write_shift(0, t, "dbcs"); r.l != r.length;) r.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return k0([n, r]);
}

function Hin(e, t) {
  var n = e.l,
    r = e.read_shift(4),
    a = e.read_shift(4),
    i = [],
    o = 0,
    s = 0,
    l = -1,
    d = {};
  for (o = 0; o != a; ++o) {
    var u = e.read_shift(4),
      h = e.read_shift(4);
    i[o] = [u, h + n];
  }
  i.sort(function (_, w) {
    return _[1] - w[1];
  });
  var p = {};
  for (o = 0; o != a; ++o) {
    if (e.l !== i[o][1]) {
      var m = !0;
      if (o > 0 && t) switch (t[i[o - 1][0]].t) {
        case 2:
          e.l + 2 === i[o][1] && (e.l += 2, m = !1);
          break;
        case 80:
          e.l <= i[o][1] && (e.l = i[o][1], m = !1);
          break;
        case 4108:
          e.l <= i[o][1] && (e.l = i[o][1], m = !1);
          break;
      }
      if ((!t || o == 0) && e.l <= i[o][1] && (m = !1, e.l = i[o][1]), m) throw new Error("Read Error: Expected address " + i[o][1] + " at " + e.l + " :" + o);
    }
    if (t) {
      if (i[o][0] == 0 && i.length > o + 1 && i[o][1] == i[o + 1][1]) continue;
      var f = t[i[o][0]];
      if (p[f.n] = Qze(e, f.t, {
        raw: !0
      }), f.p === "version" && (p[f.n] = String(p[f.n] >> 16) + "." + ("0000" + String(p[f.n] & 65535)).slice(-4)), f.n == "CodePage") switch (p[f.n]) {
        case 0:
          p[f.n] = 1252;
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          N5(s = p[f.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + p[f.n]);
      }
    } else if (i[o][0] === 1) {
      if (s = p.CodePage = Qze(e, BOt), N5(s), l !== -1) {
        var y = e.l;
        e.l = i[l][1], d = Gin(e, s), e.l = y;
      }
    } else if (i[o][0] === 0) {
      if (s === 0) {
        l = o, e.l = i[o + 1][1];
        continue;
      }
      d = Gin(e, s);
    } else {
      var b = d[i[o][0]],
        v;
      switch (e[e.l]) {
        case 65:
          e.l += 4, v = rrr(e);
          break;
        case 30:
          e.l += 4, v = u1e(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
          break;
        case 31:
          e.l += 4, v = u1e(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
          break;
        case 3:
          e.l += 4, v = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, v = e.read_shift(4);
          break;
        case 5:
          e.l += 4, v = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, v = m0(e, 4);
          break;
        case 64:
          e.l += 4, v = Rf(UOt(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      p[b] = v;
    }
  }
  return e.l = n + r, p;
}

var arr = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];

function mWa(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date) return 64;
      break;
  }
  return -1;
}

function Win(e, t, n) {
  var r = Ja(8),
    a = [],
    i = [],
    o = 8,
    s = 0,
    l = Ja(8),
    d = Ja(8);
  if (l.write_shift(4, 2), l.write_shift(4, 1200), d.write_shift(4, 1), i.push(l), a.push(d), o += 8 + l.length, !t) {
    d = Ja(8), d.write_shift(4, 0), a.unshift(d);
    var u = [Ja(4)];
    for (u[0].write_shift(4, e.length), s = 0; s < e.length; ++s) {
      var h = e[s][0];
      for (l = Ja(8 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), l.write_shift(4, s + 2), l.write_shift(4, h.length + 1), l.write_shift(0, h, "dbcs"); l.l != l.length;) l.write_shift(1, 0);
      u.push(l);
    }
    l = k0(u), i.unshift(l), o += 8 + l.length;
  }
  for (s = 0; s < e.length; ++s) if (!(t && !t[e[s][0]]) && !(arr.indexOf(e[s][0]) > -1 || Jnr.indexOf(e[s][0]) > -1) && e[s][1] != null) {
    var p = e[s][1],
      m = 0;
    if (t) {
      m = +t[e[s][0]];
      var f = n[m];
      if (f.p == "version" && typeof p == "string") {
        var y = p.split(".");
        p = (+y[0] << 16) + (+y[1] || 0);
      }
      l = Vin(f.t, p);
    } else {
      var b = mWa(p);
      b == -1 && (b = 31, p = String(p)), l = Vin(b, p);
    }
    i.push(l), d = Ja(8), d.write_shift(4, t ? m : 2 + s), a.push(d), o += 8 + l.length;
  }
  var v = 8 * (i.length + 1);
  for (s = 0; s < i.length; ++s) a[s].write_shift(4, v), v += i[s].length;
  return r.write_shift(4, o), r.write_shift(4, i.length), k0([r].concat(a).concat(i));
}

function qin(e, t, n) {
  var r = e.content;
  if (!r) return {};
  db(r, 0);
  var a,
    i,
    o,
    s,
    l = 0;
  r.chk("feff", "Byte Order: "), r.read_shift(2);
  var d = r.read_shift(4),
    u = r.read_shift(16);
  if (u !== Ds.utils.consts.HEADER_CLSID && u !== n) throw new Error("Bad PropertySet CLSID " + u);
  if (a = r.read_shift(4), a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
  if (i = r.read_shift(16), s = r.read_shift(4), a === 1 && s !== r.l) throw new Error("Length mismatch: " + s + " !== " + r.l);
  a === 2 && (o = r.read_shift(16), l = r.read_shift(4));
  var h = Hin(r, t),
    p = {
      SystemIdentifier: d
    };
  for (var m in h) p[m] = h[m];
  if (p.FMTID = i, a === 1) return p;
  if (l - r.l == 2 && (r.l += 2), r.l !== l) throw new Error("Length mismatch 2: " + r.l + " !== " + l);
  var f;
  try {
    f = Hin(r, null);
  } catch {}
  for (m in f) p[m] = f[m];
  return p.FMTID = [i, o], p;
}

function Kin(e, t, n, r, a, i) {
  var o = Ja(a ? 68 : 48),
    s = [o];
  o.write_shift(2, 65534), o.write_shift(2, 0), o.write_shift(4, 842412599), o.write_shift(16, Ds.utils.consts.HEADER_CLSID, "hex"), o.write_shift(4, a ? 2 : 1), o.write_shift(16, t, "hex"), o.write_shift(4, a ? 68 : 48);
  var l = Win(e, n, r);
  if (s.push(l), a) {
    var d = Win(a, null, null);
    o.write_shift(16, i, "hex"), o.write_shift(4, 68 + l.length), s.push(d);
  }
  return k0(s);
}

function LL(e, t) {
  return e.read_shift(t), null;
}

function fWa(e, t) {
  t || (t = Ja(e));
  for (var n = 0; n < e; ++n) t.write_shift(1, 0);
  return t;
}

function gWa(e, t, n) {
  for (var r = [], a = e.l + t; e.l < a;) r.push(n(e, a - e.l));
  if (a !== e.l) throw new Error("Slurp error");
  return r;
}

function m0(e, t) {
  return e.read_shift(t) === 1;
}

function Yw(e, t) {
  return t || (t = Ja(2)), t.write_shift(2, +!!e), t;
}

function Rg(e) {
  return e.read_shift(2, "u");
}

function V4(e, t) {
  return t || (t = Ja(2)), t.write_shift(2, e), t;
}

function irr(e, t) {
  return gWa(e, t, Rg);
}

function orr(e) {
  var t = e.read_shift(1),
    n = e.read_shift(1);
  return n === 1 ? t : t === 1;
}

function srr(e, t, n) {
  return n || (n = Ja(2)), n.write_shift(1, t == "e" ? +e : +!!e), n.write_shift(1, t == "e" ? 1 : 0), n;
}

function Tde(e, t, n) {
  var r = e.read_shift(n && n.biff >= 12 ? 2 : 1),
    a = "sbcs-cont",
    i = mb;
  if (n && n.biff >= 8 && (mb = 1200), !n || n.biff == 8) {
    var o = e.read_shift(1);
    o && (a = "dbcs-cont");
  } else n.biff == 12 && (a = "wstr");
  n.biff >= 2 && n.biff <= 5 && (a = "cpstr");
  var s = r ? e.read_shift(r, a) : "";
  return mb = i, s;
}

function yWa(e) {
  var t = mb;
  mb = 1200;
  var n = e.read_shift(2),
    r = e.read_shift(1),
    a = r & 4,
    i = r & 8,
    o = 1 + (r & 1),
    s = 0,
    l,
    d = {};
  i && (s = e.read_shift(2)), a && (l = e.read_shift(4));
  var u = o == 2 ? "dbcs-cont" : "sbcs-cont",
    h = n === 0 ? "" : e.read_shift(n, u);
  return i && (e.l += 4 * s), a && (e.l += l), d.t = h, i || (d.raw = "<t>" + d.t + "</t>", d.r = d.t), mb = t, d;
}

function bWa(e) {
  var t = e.t || "",
    n = Ja(3);
  n.write_shift(2, t.length), n.write_shift(1, 1);
  var r = Ja(2 * t.length);
  r.write_shift(2 * t.length, t, "utf16le");
  var a = [n, r];
  return k0(a);
}

function AJ(e, t, n) {
  var r;
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return e.read_shift(t, "cpstr");
    if (n.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? r = e.read_shift(t, "sbcs-cont") : r = e.read_shift(t, "dbcs-cont"), r;
}

function SCe(e, t, n) {
  var r = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return r === 0 ? (e.l++, "") : AJ(e, r, n);
}

function YZ(e, t, n) {
  if (n.biff > 5) return SCe(e, t, n);
  var r = e.read_shift(1);
  return r === 0 ? (e.l++, "") : e.read_shift(r, n.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}

function lrr(e, t, n) {
  return n || (n = Ja(3 + 2 * e.length)), n.write_shift(2, e.length), n.write_shift(1, 1), n.write_shift(31, e, "utf16le"), n;
}

function vWa(e) {
  var t = e.read_shift(1);
  e.l++;
  var n = e.read_shift(2);
  return e.l += 2, [t, n];
}

function wWa(e) {
  var t = e.read_shift(4),
    n = e.l,
    r = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (r = !0), e.l = n);
  var a = e.read_shift((r ? t - 24 : t) >> 1, "utf16le").replace(n_, "");
  return r && (e.l += 24), a;
}

function xWa(e) {
  for (var t = e.read_shift(2), n = ""; t-- > 0;) n += "../";
  var r = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var a = e.read_shift(4);
  if (a === 0) return n + r.replace(/\\/g, "/");
  var i = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var o = e.read_shift(i >> 1, "utf16le").replace(n_, "");
  return n + o;
}

function _Wa(e, t) {
  var n = e.read_shift(16);
  switch (n) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return wWa(e);
    case "0303000000000000c000000000000046":
      return xWa(e);
    default:
      throw new Error("Unsupported Moniker " + n);
  }
}

function H6e(e) {
  var t = e.read_shift(4),
    n = t > 0 ? e.read_shift(t, "utf16le").replace(n_, "") : "";
  return n;
}

function Qin(e, t) {
  t || (t = Ja(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var n = 0; n < e.length; ++n) t.write_shift(2, e.charCodeAt(n));
  return t.write_shift(2, 0), t;
}

function kWa(e, t) {
  var n = e.l + t,
    r = e.read_shift(4);
  if (r !== 2) throw new Error("Unrecognized streamVersion: " + r);
  var a = e.read_shift(2);
  e.l += 2;
  var i,
    o,
    s,
    l,
    d = "",
    u,
    h;
  a & 16 && (i = H6e(e, n - e.l)), a & 128 && (o = H6e(e, n - e.l)), (a & 257) === 257 && (s = H6e(e, n - e.l)), (a & 257) === 1 && (l = _Wa(e, n - e.l)), a & 8 && (d = H6e(e, n - e.l)), a & 32 && (u = e.read_shift(16)), a & 64 && (h = UOt(e)), e.l = n;
  var p = o || s || l || "";
  p && d && (p += "#" + d), p || (p = "#" + d), a & 2 && p.charAt(0) == "/" && p.charAt(1) != "/" && (p = "file://" + p);
  var m = {
    Target: p
  };
  return u && (m.guid = u), h && (m.time = h), i && (m.Tooltip = i), m;
}

function AWa(e) {
  var t = Ja(512),
    n = 0,
    r = e.Target;
  r.slice(0, 7) == "file://" && (r = r.slice(7));
  var a = r.indexOf("#"),
    i = a > -1 ? 31 : 23;
  switch (r.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, i);
  var o = [8, 6815827, 6619237, 4849780, 83];
  for (n = 0; n < o.length; ++n) t.write_shift(4, o[n]);
  if (i == 28) r = r.slice(1), Qin(r, t);else if (i & 2) {
    for (o = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), n = 0; n < o.length; ++n) t.write_shift(1, parseInt(o[n], 16));
    var s = a > -1 ? r.slice(0, a) : r;
    for (t.write_shift(4, 2 * (s.length + 1)), n = 0; n < s.length; ++n) t.write_shift(2, s.charCodeAt(n));
    t.write_shift(2, 0), i & 8 && Qin(a > -1 ? r.slice(a + 1) : "", t);
  } else {
    for (o = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), n = 0; n < o.length; ++n) t.write_shift(1, parseInt(o[n], 16));
    for (var l = 0; r.slice(l * 3, l * 3 + 3) == "../" || r.slice(l * 3, l * 3 + 3) == "..\\";) ++l;
    for (t.write_shift(2, l), t.write_shift(4, r.length - 3 * l + 1), n = 0; n < r.length - 3 * l; ++n) t.write_shift(1, r.charCodeAt(n + 3 * l) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), n = 0; n < 6; ++n) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}

function crr(e) {
  var t = e.read_shift(1),
    n = e.read_shift(1),
    r = e.read_shift(1),
    a = e.read_shift(1);
  return [t, n, r, a];
}

function drr(e, t) {
  var n = crr(e);
  return n[3] = 0, n;
}

function DT(e, t, n) {
  var r = e.read_shift(2),
    a = e.read_shift(2),
    i = {
      r,
      c: a,
      ixfe: 0
    };
  if (n && n.biff == 2 || t == 7) {
    var o = e.read_shift(1);
    i.ixfe = o & 63, e.l += 2;
  } else i.ixfe = e.read_shift(2);
  return i;
}

function SJ(e, t, n, r) {
  return r || (r = Ja(6)), r.write_shift(2, e), r.write_shift(2, t), r.write_shift(2, n || 0), r;
}

function SWa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2);
  return e.l += 8, {
    type: t,
    flags: n
  };
}

function IWa(e, t, n) {
  return t === 0 ? "" : YZ(e, t, n);
}

function CWa(e, t, n) {
  var r = n.biff > 8 ? 4 : 2,
    a = e.read_shift(r),
    i = e.read_shift(r, "i"),
    o = e.read_shift(r, "i");
  return [a, i, o];
}

function urr(e) {
  var t = e.read_shift(2),
    n = UXe(e);
  return [t, n];
}

function EWa(e, t, n) {
  e.l += 4, t -= 4;
  var r = e.l + t,
    a = Tde(e, t, n),
    i = e.read_shift(2);
  if (r -= e.l, i !== r) throw new Error("Malformed AddinUdf: padding = " + r + " != " + i);
  return e.l += i, a;
}

function $Xe(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(2),
    a = e.read_shift(2);
  return {
    s: {
      c: r,
      r: t
    },
    e: {
      c: a,
      r: n
    }
  };
}

function hrr(e, t) {
  return t || (t = Ja(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}

function prr(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(1),
    a = e.read_shift(1);
  return {
    s: {
      c: r,
      r: t
    },
    e: {
      c: a,
      r: n
    }
  };
}

var TWa = prr;

function mrr(e) {
  e.l += 4;
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(2);
  return e.l += 12, [n, t, r];
}

function MWa(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}

function PWa(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}

function Tw(e) {
  e.l += 2, e.l += e.read_shift(2);
}

var RWa = {
  0: Tw,
  4: Tw,
  5: Tw,
  6: Tw,
  7: PWa,
  8: Tw,
  9: Tw,
  10: Tw,
  11: Tw,
  12: Tw,
  13: MWa,
  14: Tw,
  15: Tw,
  16: Tw,
  17: Tw,
  18: Tw,
  19: Tw,
  20: Tw,
  21: mrr
};

function NWa(e, t) {
  for (var n = e.l + t, r = []; e.l < n;) {
    var a = e.read_shift(2);
    e.l -= 2;
    try {
      r[a] = RWa[a](e, n - e.l);
    } catch {
      return e.l = n, r;
    }
  }
  return e.l != n && (e.l = n), r;
}

function W6e(e, t) {
  var n = {
    BIFFVer: 0,
    dt: 0
  };
  switch (n.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (n.dt = e.read_shift(2), e.l -= 2), n.BIFFVer) {
    case 1536:
    case 1280:
    case 1024:
    case 768:
    case 512:
    case 2:
    case 7:
      break;
    default:
      if (t > 6) throw new Error("Unexpected BIFF Ver " + n.BIFFVer);
  }
  return e.read_shift(t), n;
}

function $Ot(e, t, n) {
  var r = 1536,
    a = 16;
  switch (n.bookType) {
    case "biff8":
      break;
    case "biff5":
      r = 1280, a = 8;
      break;
    case "biff4":
      r = 4, a = 6;
      break;
    case "biff3":
      r = 3, a = 6;
      break;
    case "biff2":
      r = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = Ja(a);
  return i.write_shift(2, r), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}

function jWa(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}

function DWa(e, t, n) {
  if (n.enc) return e.l += t, "";
  var r = e.l,
    a = YZ(e, 0, n);
  return e.read_shift(t + r - e.l), a;
}

function LWa(e, t) {
  var n = !t || t.biff == 8,
    r = Ja(n ? 112 : 54);
  for (r.write_shift(t.biff == 8 ? 2 : 1, 7), n && r.write_shift(1, 0), r.write_shift(4, 859007059), r.write_shift(4, 5458548 | (n ? 0 : 536870912)); r.l < r.length;) r.write_shift(1, n ? 0 : 32);
  return r;
}

function OWa(e, t, n) {
  var r = n && n.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return {
    fDialog: r & 16,
    fBelow: r & 64,
    fRight: r & 128
  };
}

function BWa(e, t, n) {
  var r = "";
  if (n.biff == 4) return r = Tde(e, 0, n), r.length === 0 && (r = "Sheet1"), {
    name: r
  };
  var a = e.read_shift(4),
    i = e.read_shift(1) & 3,
    o = e.read_shift(1);
  switch (o) {
    case 0:
      o = "Worksheet";
      break;
    case 1:
      o = "Macrosheet";
      break;
    case 2:
      o = "Chartsheet";
      break;
    case 6:
      o = "VBAModule";
      break;
  }
  return r = Tde(e, 0, n), r.length === 0 && (r = "Sheet1"), {
    pos: a,
    hs: i,
    dt: o,
    name: r
  };
}

function FWa(e, t) {
  var n = !t || t.biff >= 8 ? 2 : 1,
    r = Ja(8 + n * e.name.length);
  r.write_shift(4, e.pos), r.write_shift(1, e.hs || 0), r.write_shift(1, e.dt), r.write_shift(1, e.name.length), t.biff >= 8 && r.write_shift(1, 1), r.write_shift(n * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = r.slice(0, r.l);
  return a.l = r.l, a;
}

function zWa(e, t) {
  for (var n = e.l + t, r = e.read_shift(4), a = e.read_shift(4), i = [], o = 0; o != a && e.l < n; ++o) i.push(yWa(e));
  return i.Count = r, i.Unique = a, i;
}

function UWa(e, t) {
  var n = Ja(8);
  n.write_shift(4, e.Count), n.write_shift(4, e.Unique);
  for (var r = [], a = 0; a < e.length; ++a) r[a] = bWa(e[a]);
  var i = k0([n].concat(r));
  return i.parts = [n.length].concat(r.map(function (o) {
    return o.length;
  })), i;
}

function $Wa(e, t) {
  var n = {};
  return n.dsst = e.read_shift(2), e.l += t - 2, n;
}

function GWa(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var n = e.read_shift(2);
  e.l += 4;
  var r = e.read_shift(1);
  return e.l += 3, r & 7 && (t.level = r & 7), r & 32 && (t.hidden = !0), r & 64 && (t.hpt = n / 20), t;
}

function VWa(e) {
  var t = SWa(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var n = e.read_shift(4);
  return n !== 0;
}

function HWa(e) {
  return e.read_shift(2), e.read_shift(4);
}

function Yin(e, t, n) {
  var r = 0;
  n && n.biff == 2 || (r = e.read_shift(2));
  var a = e.read_shift(2);
  n && n.biff == 2 && (r = 1 - (a >> 15), a &= 32767);
  var i = {
    Unsynced: r & 1,
    DyZero: (r & 2) >> 1,
    ExAsc: (r & 4) >> 2,
    ExDsc: (r & 8) >> 3
  };
  return [i, a];
}

function WWa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(2),
    a = e.read_shift(2),
    i = e.read_shift(2),
    o = e.read_shift(2),
    s = e.read_shift(2),
    l = e.read_shift(2),
    d = e.read_shift(2);
  return {
    Pos: [t, n],
    Dim: [r, a],
    Flags: i,
    CurTab: o,
    FirstTab: s,
    Selected: l,
    TabRatio: d
  };
}

function qWa() {
  var e = Ja(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}

function KWa(e, t, n) {
  if (n && n.biff >= 2 && n.biff < 5) return {};
  var r = e.read_shift(2);
  return {
    RTL: r & 64
  };
}

function QWa(e) {
  var t = Ja(18),
    n = 1718;
  return e && e.RTL && (n |= 64), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}

function YWa() {}

function XWa(e, t, n) {
  var r = {
    dyHeight: e.read_shift(2),
    fl: e.read_shift(2)
  };
  switch (n && n.biff || 8) {
    case 2:
      break;
    case 3:
    case 4:
      e.l += 2;
      break;
    default:
      e.l += 10;
      break;
  }
  return r.name = Tde(e, 0, n), r;
}

function JWa(e, t) {
  var n = e.name || "Arial",
    r = t && t.biff == 5,
    a = r ? 15 + n.length : 16 + 2 * n.length,
    i = Ja(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, n.length), r || i.write_shift(1, 1), i.write_shift((r ? 1 : 2) * n.length, n, r ? "sbcs" : "utf16le"), i;
}

function ZWa(e, t, n) {
  var r = DT(e, t, n);
  return r.isst = e.read_shift(4), r;
}

function eqa(e, t, n, r) {
  var a = Ja(10);
  return SJ(e, t, r, a), a.write_shift(4, n), a;
}

function tqa(e, t, n) {
  n.biffguess && n.biff == 2 && (n.biff = 5);
  var r = e.l + t,
    a = DT(e, t, n),
    i = SCe(e, r - e.l, n);
  return a.val = i, a;
}

function nqa(e, t, n, r, a) {
  var i = !a || a.biff == 8,
    o = Ja(8 + +i + (1 + i) * n.length);
  return SJ(e, t, r, o), o.write_shift(2, n.length), i && o.write_shift(1, 1), o.write_shift((1 + i) * n.length, n, i ? "utf16le" : "sbcs"), o;
}

function rqa(e, t, n) {
  var r = e.read_shift(2),
    a = YZ(e, 0, n);
  return [r, a];
}

function aqa(e, t, n, r) {
  var a = n && n.biff == 5;
  r || (r = Ja(a ? 3 + t.length : 5 + 2 * t.length)), r.write_shift(2, e), r.write_shift(a ? 1 : 2, t.length), a || r.write_shift(1, 1), r.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = r.length > r.l ? r.slice(0, r.l) : r;
  return i.l == null && (i.l = i.length), i;
}

var iqa = YZ;

function oqa(e) {
  var t = Ja(1 + e.length);
  return t.write_shift(1, e.length), t.write_shift(e.length, e, "sbcs"), t;
}

function sqa(e) {
  var t = Ja(3 + e.length);
  return t.l += 2, t.write_shift(1, e.length), t.write_shift(e.length, e, "sbcs"), t;
}

function Xin(e, t, n) {
  var r = e.l + t,
    a = n.biff == 8 || !n.biff ? 4 : 2,
    i = e.read_shift(a),
    o = e.read_shift(a),
    s = e.read_shift(2),
    l = e.read_shift(2);
  return e.l = r, {
    s: {
      r: i,
      c: s
    },
    e: {
      r: o,
      c: l
    }
  };
}

function lqa(e, t) {
  var n = t.biff == 8 || !t.biff ? 4 : 2,
    r = Ja(2 * n + 6);
  return r.write_shift(n, e.s.r), r.write_shift(n, e.e.r + 1), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c + 1), r.write_shift(2, 0), r;
}

function cqa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = urr(e);
  return {
    r: t,
    c: n,
    ixfe: r[0],
    rknum: r[1]
  };
}

function dqa(e, t) {
  for (var n = e.l + t - 2, r = e.read_shift(2), a = e.read_shift(2), i = []; e.l < n;) i.push(urr(e));
  if (e.l !== n) throw new Error("MulRK read error");
  var o = e.read_shift(2);
  if (i.length != o - a + 1) throw new Error("MulRK length mismatch");
  return {
    r,
    c: a,
    C: o,
    rkrec: i
  };
}

function uqa(e, t) {
  for (var n = e.l + t - 2, r = e.read_shift(2), a = e.read_shift(2), i = []; e.l < n;) i.push(e.read_shift(2));
  if (e.l !== n) throw new Error("MulBlank read error");
  var o = e.read_shift(2);
  if (i.length != o - a + 1) throw new Error("MulBlank length mismatch");
  return {
    r,
    c: a,
    C: o,
    ixfe: i
  };
}

function hqa(e, t, n, r) {
  var a = {},
    i = e.read_shift(4),
    o = e.read_shift(4),
    s = e.read_shift(4),
    l = e.read_shift(2);
  return a.patternType = VHa[s >> 26], r.cellStyles && (a.alc = i & 7, a.fWrap = i >> 3 & 1, a.alcV = i >> 4 & 7, a.fJustLast = i >> 7 & 1, a.trot = i >> 8 & 255, a.cIndent = i >> 16 & 15, a.fShrinkToFit = i >> 20 & 1, a.iReadOrder = i >> 22 & 2, a.fAtrNum = i >> 26 & 1, a.fAtrFnt = i >> 27 & 1, a.fAtrAlc = i >> 28 & 1, a.fAtrBdr = i >> 29 & 1, a.fAtrPat = i >> 30 & 1, a.fAtrProt = i >> 31 & 1, a.dgLeft = o & 15, a.dgRight = o >> 4 & 15, a.dgTop = o >> 8 & 15, a.dgBottom = o >> 12 & 15, a.icvLeft = o >> 16 & 127, a.icvRight = o >> 23 & 127, a.grbitDiag = o >> 30 & 3, a.icvTop = s & 127, a.icvBottom = s >> 7 & 127, a.icvDiag = s >> 14 & 127, a.dgDiag = s >> 21 & 15, a.icvFore = l & 127, a.icvBack = l >> 7 & 127, a.fsxButton = l >> 14 & 1), a;
}

function pqa(e, t, n) {
  var r = {};
  return r.ifnt = e.read_shift(2), r.numFmtId = e.read_shift(2), r.flags = e.read_shift(2), r.fStyle = r.flags >> 2 & 1, t -= 6, r.data = hqa(e, t, r.fStyle, n), r;
}

function Jin(e, t, n, r) {
  var a = n && n.biff == 5;
  r || (r = Ja(a ? 16 : 20)), r.write_shift(2, 0), e.style ? (r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 65524)) : (r.write_shift(2, e.numFmtId || 0), r.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), r.write_shift(4, i), r.write_shift(4, 0), a || r.write_shift(4, 0), r.write_shift(2, 0), r;
}

function mqa(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), e.l++, t.flags = e.read_shift(1), t.numFmtId = t.flags & 63, t.flags >>= 6, t.fStyle = 0, t.data = {}, t;
}

function fqa(e) {
  var t = Ja(4);
  return t.l += 2, t.write_shift(1, e.numFmtId), t.l++, t;
}

function frr(e) {
  var t = Ja(12);
  return t.l++, t.write_shift(1, e.numFmtId), t.l += 10, t;
}

var gqa = frr;

function yqa(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}

function bqa(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}

function vqa(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}

function wqa(e) {
  var t = Ja(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}

function xqa(e, t, n) {
  var r = DT(e, 6, n),
    a = orr(e);
  return r.val = a, r.t = a === !0 || a === !1 ? "b" : "e", r;
}

function $it(e, t, n, r, a, i) {
  var o = Ja(8);
  return SJ(e, t, r, o), srr(n, i, o), o;
}

function _qa(e, t, n) {
  n.biffguess && n.biff == 2 && (n.biff = 5);
  var r = DT(e, 6, n),
    a = cx(e);
  return r.val = a, r;
}

function kqa(e, t, n, r) {
  var a = Ja(14);
  return SJ(e, t, r, a), kJ(n, a), a;
}

var Zin = IWa;

function Aqa(e, t, n) {
  var r = e.l + t,
    a = e.read_shift(2),
    i = e.read_shift(2);
  if (n.sbcch = i, i == 1025 || i == 14849) return [i, a];
  if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
  for (var o = AJ(e, i), s = []; r > e.l;) s.push(SCe(e));
  return [i, a, o, s];
}

function eon(e, t, n) {
  var r = e.read_shift(2),
    a,
    i = {
      fBuiltIn: r & 1,
      fWantAdvise: r >>> 1 & 1,
      fWantPict: r >>> 2 & 1,
      fOle: r >>> 3 & 1,
      fOleLink: r >>> 4 & 1,
      cf: r >>> 5 & 1023,
      fIcon: r >>> 15 & 1
    };
  return n.sbcch === 14849 && (a = EWa(e, t - 2, n)), i.body = a || e.read_shift(t - 2), typeof a == "string" && (i.Name = a), i;
}

function ton(e, t, n) {
  var r = e.l + t,
    a = e.read_shift(2),
    i = e.read_shift(1),
    o = e.read_shift(1),
    s = e.read_shift(n && n.biff == 2 ? 1 : 2),
    l = 0;
  (!n || n.biff >= 5) && (n.biff != 5 && (e.l += 2), l = e.read_shift(2), n.biff == 5 && (e.l += 2), e.l += 4);
  var d = AJ(e, o, n);
  a & 32 && (d = FOt[d.charCodeAt(0)]);
  var u = r - e.l;
  n && n.biff == 2 && --u;
  var h = r == e.l || s === 0 || !(u > 0) ? [] : BXa(e, u, n, s);
  return {
    chKey: i,
    Name: d,
    itab: l,
    rgce: h
  };
}

function grr(e, t, n) {
  if (n.biff < 8 || !(n.biff > 8) && t == e[e.l] + (e[e.l + 1] == 3 ? 1 : 0) + 1) return non(e, t, n);
  for (var r = [], a = e.l + t, i = e.read_shift(n.biff > 8 ? 4 : 2); i-- !== 0;) r.push(CWa(e, n.biff > 8 ? 12 : 6, n));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return r;
}

function non(e, t, n) {
  e[e.l + 1] == 3 && e[e.l]++;
  var r = Tde(e, t, n);
  return r.charCodeAt(0) == 3 ? r.slice(1) : r;
}

function Sqa(e, t, n) {
  if (n.biff < 8) {
    e.l += t;
    return;
  }
  var r = e.read_shift(2),
    a = e.read_shift(2),
    i = AJ(e, r, n),
    o = AJ(e, a, n);
  return [i, o];
}

function Iqa(e, t, n) {
  var r = prr(e);
  e.l++;
  var a = e.read_shift(1);
  return t -= 8, [FXa(e, t, n), a, r];
}

function ron(e, t, n) {
  var r = TWa(e);
  switch (n.biff) {
    case 2:
      e.l++, t -= 7;
      break;
    case 3:
    case 4:
      e.l += 2, t -= 8;
      break;
    default:
      e.l += 6, t -= 12;
  }
  return [r, LXa(e, t, n)];
}

function Cqa(e) {
  var t = e.read_shift(4) !== 0,
    n = e.read_shift(4) !== 0,
    r = e.read_shift(4);
  return [t, n, r];
}

function Eqa(e, t, n) {
  var r = e.read_shift(2),
    a = e.read_shift(2),
    i = e.read_shift(2),
    o = e.read_shift(2),
    s = YZ(e, 0, n);
  return [{
    r,
    c: a
  }, s, o, i];
}

function Tqa(e, t, n) {
  if (n && n.biff < 8) {
    var r = e.read_shift(2),
      a = e.read_shift(2);
    if (r == 65535 || r == -1) return;
    var i = e.read_shift(2),
      o = e.read_shift(Math.min(i, 2048), "cpstr");
    return [{
      r,
      c: a
    }, o];
  }
  return Eqa(e, t, n);
}

function Git(e, t, n, r) {
  var a = Ja(6 + (r || e.length));
  return a.write_shift(2, t), a.write_shift(2, n), a.write_shift(2, r || e.length), a.write_shift(e.length, e, "sbcs"), a;
}

function Mqa(e, t) {
  for (var n = [], r = e.read_shift(2); r--;) n.push($Xe(e));
  return n;
}

function Pqa(e) {
  var t = Ja(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var n = 0; n < e.length; ++n) hrr(e[n], t);
  return t;
}

function Rqa(e, t, n) {
  if (n && n.biff < 8) return jqa(e, t, n);
  var r = mrr(e),
    a = NWa(e, t - 22, r[1]);
  return {
    cmo: r,
    ft: a
  };
}

var Nqa = {
  8: function (e, t) {
    var n = e.l + t;
    e.l += 10;
    var r = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var a = e.read_shift(1);
    return e.l += a, e.l = n, {
      fmt: r
    };
  }
};

function jqa(e, t, n) {
  e.l += 4;
  var r = e.read_shift(2),
    a = e.read_shift(2),
    i = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var o = [];
  return o.push((Nqa[r] || Rx)(e, t, n)), {
    cmo: [a, r, i],
    ft: o
  };
}

function Dqa(e, t, n) {
  var r = e.l,
    a = "";
  try {
    e.l += 4;
    var i = (n.lastobj || {
        cmo: [0, 0]
      }).cmo[1],
      o;
    [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : o = vWa(e, 6, n);
    var s = e.read_shift(2);
    e.read_shift(2), Rg(e, 2);
    var l = e.read_shift(2);
    e.l += l;
    for (var d = 1; d < e.lens.length - 1; ++d) {
      if (e.l - r != e.lens[d]) throw new Error("TxO: bad continue record");
      var u = e[e.l],
        h = AJ(e, e.lens[d + 1] - e.lens[d] - 1);
      if (a += h, a.length >= (u ? s : 2 * s)) break;
    }
    if (a.length !== s && a.length !== s * 2) throw new Error("cchText: " + s + " != " + a.length);
    return e.l = r + t, {
      t: a
    };
  } catch {
    return e.l = r + t, {
      t: a
    };
  }
}

function Lqa(e, t) {
  var n = $Xe(e);
  e.l += 16;
  var r = kWa(e, t - 24);
  return [n, r];
}

function Oqa(e) {
  var t = Ja(24),
    n = Eh(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var r = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(r[a], 16));
  return k0([t, AWa(e[1])]);
}

function Bqa(e, t) {
  e.read_shift(2);
  var n = $Xe(e),
    r = e.read_shift((t - 10) / 2, "dbcs-cont");
  return r = r.replace(n_, ""), [n, r];
}

function Fqa(e) {
  var t = e[1].Tooltip,
    n = Ja(10 + 2 * (t.length + 1));
  n.write_shift(2, 2048);
  var r = Eh(e[0]);
  n.write_shift(2, r.r), n.write_shift(2, r.r), n.write_shift(2, r.c), n.write_shift(2, r.c);
  for (var a = 0; a < t.length; ++a) n.write_shift(2, t.charCodeAt(a));
  return n.write_shift(2, 0), n;
}

function zqa(e) {
  var t = [0, 0],
    n;
  return n = e.read_shift(2), t[0] = Uin[n] || n, n = e.read_shift(2), t[1] = Uin[n] || n, t;
}

function Uqa(e) {
  return e || (e = Ja(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}

function $qa(e) {
  for (var t = e.read_shift(2), n = []; t-- > 0;) n.push(drr(e));
  return n;
}

function Gqa(e) {
  for (var t = e.read_shift(2), n = []; t-- > 0;) n.push(drr(e));
  return n;
}

function Vqa(e) {
  e.l += 2;
  var t = {
    cxfs: 0,
    crc: 0
  };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}

function yrr(e, t, n) {
  if (!n.cellStyles) return Rx(e, t);
  var r = n && n.biff >= 12 ? 4 : 2,
    a = e.read_shift(r),
    i = e.read_shift(r),
    o = e.read_shift(r),
    s = e.read_shift(r),
    l = e.read_shift(2);
  r == 2 && (e.l += 2);
  var d = {
    s: a,
    e: i,
    w: o,
    ixfe: s,
    flags: l
  };
  return (n.biff >= 5 || !n.biff) && (d.level = l >> 8 & 7), d;
}

function Hqa(e, t) {
  var n = Ja(12);
  n.write_shift(2, t), n.write_shift(2, t), n.write_shift(2, e.width * 256), n.write_shift(2, 0);
  var r = 0;
  return e.hidden && (r |= 1), n.write_shift(1, r), r = e.level || 0, n.write_shift(1, r), n.write_shift(2, 0), n;
}

function Wqa(e, t) {
  var n = {};
  return t < 32 || (e.l += 16, n.header = cx(e), n.footer = cx(e), e.l += 2), n;
}

function qqa(e, t, n) {
  var r = {
    area: !1
  };
  if (n.biff != 5) return e.l += t, r;
  var a = e.read_shift(1);
  return e.l += 3, a & 16 && (r.area = !0), r;
}

function Kqa(e) {
  for (var t = Ja(2 * e), n = 0; n < e; ++n) t.write_shift(2, n + 1);
  return t;
}

var Qqa = DT,
  Yqa = irr,
  Xqa = SCe;

function Jqa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(4),
    a = {
      fmt: t,
      env: n,
      len: r,
      data: e.slice(e.l, e.l + r)
    };
  return e.l += r, a;
}

function ICe(e, t, n, r, a) {
  return e || (e = Ja(7)), e.write_shift(2, t), e.write_shift(2, n), e.write_shift(1, r || 0), e.write_shift(1, a || 0), e.write_shift(1, 0), e;
}

function Zqa(e, t, n) {
  n.biffguess && n.biff == 5 && (n.biff = 2);
  var r = DT(e, 7, n),
    a = YZ(e, t - 7, n);
  return r.t = "str", r.val = a, r;
}

function eKa(e, t, n) {
  var r = DT(e, 7, n),
    a = cx(e);
  return r.t = "n", r.val = a, r;
}

function tKa(e, t, n, r, a) {
  var i = Ja(15);
  return ICe(i, e, t, r || 0, a || 0), i.write_shift(8, n, "f"), i;
}

function nKa(e, t, n) {
  var r = DT(e, 7, n),
    a = e.read_shift(2);
  return r.t = "n", r.val = a, r;
}

function rKa(e, t, n, r, a) {
  var i = Ja(9);
  return ICe(i, e, t, r || 0, a || 0), i.write_shift(2, n), i;
}

function aKa(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}

function iKa(e, t, n) {
  var r = e.l + 7,
    a = DT(e, 6, n);
  e.l = r;
  var i = orr(e);
  return a.val = i, a.t = i === !0 || i === !1 ? "b" : "e", a;
}

function oKa(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}

function sKa(e, t, n) {
  var r = e.l + t,
    a = DT(e, 6, n),
    i = e.read_shift(2),
    o = AJ(e, i, n);
  return e.l = r, a.t = "str", a.val = o, a;
}

function lKa(e) {
  var t = e.read_shift(4),
    n = e.read_shift(1),
    r = e.read_shift(n, "sbcs");
  return r.length === 0 && (r = "Sheet1"), {
    flags: t,
    name: r
  };
}

var cKa = [2, 3, 48, 49, 131, 139, 140, 245],
  Hwt = (function () {
    var e = {
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127,
        8: 865,
        9: 437,
        10: 850,
        11: 437,
        13: 437,
        14: 850,
        15: 437,
        16: 850,
        17: 437,
        18: 850,
        19: 932,
        20: 850,
        21: 437,
        22: 850,
        23: 865,
        24: 437,
        25: 437,
        26: 850,
        27: 437,
        28: 863,
        29: 850,
        31: 852,
        34: 852,
        35: 852,
        36: 860,
        37: 850,
        38: 866,
        55: 850,
        64: 852,
        77: 936,
        78: 949,
        79: 950,
        80: 874,
        87: 1252,
        88: 1252,
        89: 1252,
        108: 863,
        134: 737,
        135: 852,
        136: 857,
        204: 1257,
        255: 16969
      },
      t = LXe({
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127
      });
    function n(s, l) {
      var d = [],
        u = s$(1);
      switch (l.type) {
        case "base64":
          u = I2(_3(s));
          break;
        case "binary":
          u = I2(s);
          break;
        case "buffer":
        case "array":
          u = s;
          break;
      }
      db(u, 0);
      var h = u.read_shift(1),
        p = !!(h & 136),
        m = !1,
        f = !1;
      switch (h) {
        case 2:
          break;
        case 3:
          break;
        case 48:
          m = !0, p = !0;
          break;
        case 49:
          m = !0, p = !0;
          break;
        case 131:
          break;
        case 139:
          break;
        case 140:
          f = !0;
          break;
        case 245:
          break;
        default:
          throw new Error("DBF Unsupported Version: " + h.toString(16));
      }
      var y = 0,
        b = 521;
      h == 2 && (y = u.read_shift(2)), u.l += 3, h != 2 && (y = u.read_shift(4)), y > 1048576 && (y = 1e6), h != 2 && (b = u.read_shift(2));
      var v = u.read_shift(2),
        _ = l.codepage || 1252;
      h != 2 && (u.l += 16, u.read_shift(1), u[u.l] !== 0 && (_ = e[u[u.l]]), u.l += 1, u.l += 2), f && (u.l += 36);
      for (var w = [], k = {}, A = Math.min(u.length, h == 2 ? 521 : b - 10 - (m ? 264 : 0)), S = f ? 32 : 11; u.l < A && u[u.l] != 13;) switch (k = {}, k.name = (typeof Rc < "u" ? Rc.utils.decode(_, u.slice(u.l, u.l + S)) : GP(u.slice(u.l, u.l + S))).replace(/[\u0000\r\n][\S\s]*$/g, ""), u.l += S, k.type = String.fromCharCode(u.read_shift(1)), h != 2 && !f && (k.offset = u.read_shift(4)), k.len = u.read_shift(1), h == 2 && (k.offset = u.read_shift(2)), k.dec = u.read_shift(1), k.name.length && w.push(k), h != 2 && (u.l += f ? 13 : 14), k.type) {
        case "B":
          (!m || k.len != 8) && l.WTF && console.log("Skipping " + k.name + ":" + k.type);
          break;
        case "G":
        case "P":
          l.WTF && console.log("Skipping " + k.name + ":" + k.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + k.type);
      }
      if (u[u.l] !== 13 && (u.l = b - 1), u.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + u.l + " " + u[u.l]);
      u.l = b;
      var C = 0,
        I = 0;
      for (d[0] = [], I = 0; I != w.length; ++I) d[0][I] = w[I].name;
      for (; y-- > 0;) {
        if (u[u.l] === 42) {
          u.l += v;
          continue;
        }
        for (++u.l, d[++C] = [], I = 0, I = 0; I != w.length; ++I) {
          var E = u.slice(u.l, u.l + w[I].len);
          u.l += w[I].len, db(E, 0);
          var M = typeof Rc < "u" ? Rc.utils.decode(_, E) : GP(E);
          switch (w[I].type) {
            case "C":
              M.trim().length && (d[C][I] = M.replace(/([^\s])\s+$/, "$1"));
              break;
            case "D":
              M.length === 8 ? (d[C][I] = new Date(Date.UTC(+M.slice(0, 4), +M.slice(4, 6) - 1, +M.slice(6, 8), 0, 0, 0, 0)), l && l.UTC || (d[C][I] = xJ(d[C][I]))) : d[C][I] = M;
              break;
            case "F":
              d[C][I] = parseFloat(M.trim());
              break;
            case "+":
            case "I":
              d[C][I] = f ? E.read_shift(-4, "i") ^ 2147483648 : E.read_shift(4, "i");
              break;
            case "L":
              switch (M.trim().toUpperCase()) {
                case "Y":
                case "T":
                  d[C][I] = !0;
                  break;
                case "N":
                case "F":
                  d[C][I] = !1;
                  break;
                case "":
                case "\0":
                case "?":
                  break;
                default:
                  throw new Error("DBF Unrecognized L:|" + M + "|");
              }
              break;
            case "M":
              if (!p) throw new Error("DBF Unexpected MEMO for type " + h.toString(16));
              d[C][I] = "##MEMO##" + (f ? parseInt(M.trim(), 10) : E.read_shift(4));
              break;
            case "N":
              M = M.replace(/\u0000/g, "").trim(), M && M != "." && (d[C][I] = +M || 0);
              break;
            case "@":
              d[C][I] = new Date(E.read_shift(-8, "f") - 621356832e5);
              break;
            case "T":
              {
                var T = E.read_shift(4),
                  P = E.read_shift(4);
                if (T == 0 && P == 0) break;
                d[C][I] = new Date((T - 2440588) * 864e5 + P), l && l.UTC || (d[C][I] = xJ(d[C][I]));
              }
              break;
            case "Y":
              d[C][I] = E.read_shift(4, "i") / 1e4 + E.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
              break;
            case "O":
              d[C][I] = -E.read_shift(-8, "f");
              break;
            case "B":
              if (m && w[I].len == 8) {
                d[C][I] = E.read_shift(8, "f");
                break;
              }
            case "G":
            case "P":
              E.l += w[I].len;
              break;
            case "0":
              if (w[I].name === "_NullFlags") break;
            default:
              throw new Error("DBF Unsupported data type " + w[I].type);
          }
        }
      }
      if (h != 2 && u.l < u.length && u[u.l++] != 26) throw new Error("DBF EOF Marker missing " + (u.l - 1) + " of " + u.length + " " + u[u.l - 1].toString(16));
      return l && l.sheetRows && (d = d.slice(0, l.sheetRows)), l.DBF = w, d;
    }
    function r(s, l) {
      var d = l || {};
      d.dateNF || (d.dateNF = "yyyymmdd");
      var u = xpe(n(s, d), d);
      return u["!cols"] = d.DBF.map(function (h) {
        return {
          wch: h.len,
          DBF: h
        };
      }), delete d.DBF, u;
    }
    function a(s, l) {
      try {
        var d = mG(r(s, l), l);
        return d.bookType = "dbf", d;
      } catch (u) {
        if (l && l.WTF) throw u;
      }
      return {
        SheetNames: [],
        Sheets: {}
      };
    }
    var i = {
      B: 8,
      C: 250,
      L: 1,
      D: 8,
      "?": 0,
      "": 0
    };
    function o(s, l) {
      if (!s["!ref"]) throw new Error("Cannot export empty sheet to DBF");
      var d = l || {},
        u = mb;
      if (+d.codepage >= 0 && N5(+d.codepage), d.type == "string") throw new Error("Cannot write DBF to JS string");
      var h = kx(),
        p = Ywt(s, {
          header: 1,
          raw: !0,
          cellDates: !0
        }),
        m = p[0],
        f = p.slice(1),
        y = s["!cols"] || [],
        b = 0,
        v = 0,
        _ = 0,
        w = 1;
      for (b = 0; b < m.length; ++b) {
        if (((y[b] || {}).DBF || {}).name) {
          m[b] = y[b].DBF.name, ++_;
          continue;
        }
        if (m[b] != null) {
          if (++_, typeof m[b] == "number" && (m[b] = m[b].toString(10)), typeof m[b] != "string") throw new Error("DBF Invalid column name " + m[b] + " |" + typeof m[b] + "|");
          if (m.indexOf(m[b]) !== b) {
            for (v = 0; v < 1024; ++v) if (m.indexOf(m[b] + "_" + v) == -1) {
              m[b] += "_" + v;
              break;
            }
          }
        }
      }
      var k = wd(s["!ref"]),
        A = [],
        S = [],
        C = [];
      for (b = 0; b <= k.e.c - k.s.c; ++b) {
        var I = "",
          E = "",
          M = 0,
          T = [];
        for (v = 0; v < f.length; ++v) f[v][b] != null && T.push(f[v][b]);
        if (T.length == 0 || m[b] == null) {
          A[b] = "?";
          continue;
        }
        for (v = 0; v < T.length; ++v) {
          switch (typeof T[v]) {
            case "number":
              E = "B";
              break;
            case "string":
              E = "C";
              break;
            case "boolean":
              E = "L";
              break;
            case "object":
              E = T[v] instanceof Date ? "D" : "C";
              break;
            default:
              E = "C";
          }
          M = Math.max(M, (typeof Rc < "u" && typeof T[v] == "string" ? Rc.utils.encode(bJ, T[v]) : String(T[v])).length), I = I && I != E ? "C" : E;
        }
        M > 250 && (M = 250), E = ((y[b] || {}).DBF || {}).type, E == "C" && y[b].DBF.len > M && (M = y[b].DBF.len), I == "B" && E == "N" && (I = "N", C[b] = y[b].DBF.dec, M = y[b].DBF.len), S[b] = I == "C" || E == "N" ? M : i[I] || 0, w += S[b], A[b] = I;
      }
      var P = h.next(32);
      for (P.write_shift(4, 318902576), P.write_shift(4, f.length), P.write_shift(2, 296 + 32 * _), P.write_shift(2, w), b = 0; b < 4; ++b) P.write_shift(4, 0);
      var R = +t[mb] || 3;
      for (P.write_shift(4, 0 | R << 8), e[R] != +d.codepage && (d.codepage && console.error("DBF Unsupported codepage " + mb + ", using 1252"), mb = 1252), b = 0, v = 0; b < m.length; ++b) if (m[b] != null) {
        var j = h.next(32),
          B = (m[b].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        j.write_shift(1, B, "sbcs"), j.write_shift(1, A[b] == "?" ? "C" : A[b], "sbcs"), j.write_shift(4, v), j.write_shift(1, S[b] || i[A[b]] || 0), j.write_shift(1, C[b] || 0), j.write_shift(1, 2), j.write_shift(4, 0), j.write_shift(1, 0), j.write_shift(4, 0), j.write_shift(4, 0), v += S[b] || i[A[b]] || 0;
      }
      var F = h.next(264);
      for (F.write_shift(4, 13), b = 0; b < 65; ++b) F.write_shift(4, 0);
      for (b = 0; b < f.length; ++b) {
        var N = h.next(w);
        for (N.write_shift(1, 0), v = 0; v < m.length; ++v) if (m[v] != null) switch (A[v]) {
          case "L":
            N.write_shift(1, f[b][v] == null ? 63 : f[b][v] ? 84 : 70);
            break;
          case "B":
            N.write_shift(8, f[b][v] || 0, "f");
            break;
          case "N":
            var G = "0";
            for (typeof f[b][v] == "number" && (G = f[b][v].toFixed(C[v] || 0)), G.length > S[v] && (G = G.slice(0, S[v])), _ = 0; _ < S[v] - G.length; ++_) N.write_shift(1, 32);
            N.write_shift(1, G, "sbcs");
            break;
          case "D":
            f[b][v] ? (N.write_shift(4, ("0000" + f[b][v].getFullYear()).slice(-4), "sbcs"), N.write_shift(2, ("00" + (f[b][v].getMonth() + 1)).slice(-2), "sbcs"), N.write_shift(2, ("00" + f[b][v].getDate()).slice(-2), "sbcs")) : N.write_shift(8, "00000000", "sbcs");
            break;
          case "C":
            var z = N.l,
              V = String(f[b][v] != null ? f[b][v] : "").slice(0, S[v]);
            for (N.write_shift(1, V, "cpstr"), z += S[v] - N.l, _ = 0; _ < z; ++_) N.write_shift(1, 32);
            break;
        }
      }
      return mb = u, h.next(1).write_shift(1, 26), h.end();
    }
    return {
      to_workbook: a,
      to_sheet: r,
      from_sheet: o
    };
  })(),
  brr = (function () {
    var e = {
        AA: "À",
        BA: "Á",
        CA: "Â",
        DA: 195,
        HA: "Ä",
        JA: 197,
        AE: "È",
        BE: "É",
        CE: "Ê",
        HE: "Ë",
        AI: "Ì",
        BI: "Í",
        CI: "Î",
        HI: "Ï",
        AO: "Ò",
        BO: "Ó",
        CO: "Ô",
        DO: 213,
        HO: "Ö",
        AU: "Ù",
        BU: "Ú",
        CU: "Û",
        HU: "Ü",
        Aa: "à",
        Ba: "á",
        Ca: "â",
        Da: 227,
        Ha: "ä",
        Ja: 229,
        Ae: "è",
        Be: "é",
        Ce: "ê",
        He: "ë",
        Ai: "ì",
        Bi: "í",
        Ci: "î",
        Hi: "ï",
        Ao: "ò",
        Bo: "ó",
        Co: "ô",
        Do: 245,
        Ho: "ö",
        Au: "ù",
        Bu: "ú",
        Cu: "û",
        Hu: "ü",
        KC: "Ç",
        Kc: "ç",
        q: "æ",
        z: "œ",
        a: "Æ",
        j: "Œ",
        DN: 209,
        Dn: 241,
        Hy: 255,
        S: 169,
        c: 170,
        R: 174,
        "B ": 180,
        0: 176,
        1: 177,
        2: 178,
        3: 179,
        5: 181,
        6: 182,
        7: 183,
        Q: 185,
        k: 186,
        b: 208,
        i: 216,
        l: 222,
        s: 240,
        y: 248,
        "!": 161,
        '"': 162,
        "#": 163,
        "(": 164,
        "%": 165,
        "'": 167,
        "H ": 168,
        "+": 171,
        ";": 187,
        "<": 188,
        "=": 189,
        ">": 190,
        "?": 191,
        "{": 223
      },
      t = new RegExp("\x1BN(" + Gm(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1").replace("{", "\\{") + "|\\|)", "gm");
    try {
      t = new RegExp("\x1BN(" + Gm(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm");
    } catch {}
    var n = function (m, f) {
        var y = e[f];
        return typeof y == "number" ? Bwt(y) : y;
      },
      r = function (m, f, y) {
        var b = f.charCodeAt(0) - 32 << 4 | y.charCodeAt(0) - 48;
        return b == 59 ? m : Bwt(b);
      };
    e["|"] = 254;
    var a = function (m) {
      return m.replace(/\n/g, "\x1B :").replace(/\r/g, "\x1B =");
    };
    function i(m, f) {
      switch (f.type) {
        case "base64":
          return o(_3(m), f);
        case "binary":
          return o(m, f);
        case "buffer":
          return o(Uc && Buffer.isBuffer(m) ? m.toString("binary") : GP(m), f);
        case "array":
          return o(wJ(m), f);
      }
      throw new Error("Unrecognized type " + f.type);
    }
    function o(m, f) {
      var y = m.split(/[\n\r]+/),
        b = -1,
        v = -1,
        _ = 0,
        w = 0,
        k = [],
        A = [],
        S = null,
        C = {},
        I = [],
        E = [],
        M = [],
        T = 0,
        P,
        R = {
          Workbook: {
            WBProps: {},
            Names: []
          }
        };
      for (+f.codepage >= 0 && N5(+f.codepage); _ !== y.length; ++_) {
        T = 0;
        var j = y[_].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, r).replace(t, n),
          B = j.replace(/;;/g, "\0").split(";").map(function (ne) {
            return ne.replace(/\u0000/g, ";");
          }),
          F = B[0],
          N;
        if (j.length > 0) switch (F) {
          case "ID":
            break;
          case "E":
            break;
          case "B":
            break;
          case "O":
            for (w = 1; w < B.length; ++w) switch (B[w].charAt(0)) {
              case "V":
                {
                  var G = parseInt(B[w].slice(1), 10);
                  G >= 1 && G <= 4 && (R.Workbook.WBProps.date1904 = !0);
                }
                break;
            }
            break;
          case "W":
            break;
          case "P":
            switch (B[1].charAt(0)) {
              case "P":
                A.push(j.slice(3).replace(/;;/g, ";"));
                break;
            }
            break;
          case "NN":
            {
              var z = {
                Sheet: 0
              };
              for (w = 1; w < B.length; ++w) switch (B[w].charAt(0)) {
                case "N":
                  z.Name = B[w].slice(1);
                  break;
                case "E":
                  z.Ref = (f && f.sheet || "Sheet1") + "!" + OQ(B[w].slice(1));
                  break;
              }
              R.Workbook.Names.push(z);
            }
            break;
          case "C":
            var V = !1,
              O = !1,
              L = !1,
              D = !1,
              U = -1,
              H = -1,
              Y = "",
              K = "z",
              W = "";
            for (w = 1; w < B.length; ++w) switch (B[w].charAt(0)) {
              case "A":
                W = B[w].slice(1);
                break;
              case "X":
                v = parseInt(B[w].slice(1), 10) - 1, O = !0;
                break;
              case "Y":
                for (b = parseInt(B[w].slice(1), 10) - 1, O || (v = 0), P = k.length; P <= b; ++P) k[P] = [];
                break;
              case "K":
                N = B[w].slice(1), N.charAt(0) === '"' ? (N = N.slice(1, N.length - 1), K = "s") : N === "TRUE" || N === "FALSE" ? (N = N === "TRUE", K = "b") : N.charAt(0) == "#" && Lv[N] != null ? (K = "e", N = Lv[N]) : isNaN(XS(N)) || (N = XS(N), K = "n", S !== null && k3(S) && f.cellDates && (N = lj(R.Workbook.WBProps.date1904 ? N + 1462 : N), K = typeof N == "number" ? "n" : "d")), typeof Rc < "u" && typeof N == "string" && (f || {}).type != "string" && (f || {}).codepage && (N = Rc.utils.decode(f.codepage, N)), V = !0;
                break;
              case "E":
                D = !0, Y = OQ(B[w].slice(1), {
                  r: b,
                  c: v
                });
                break;
              case "S":
                L = !0;
                break;
              case "G":
                break;
              case "R":
                U = parseInt(B[w].slice(1), 10) - 1;
                break;
              case "C":
                H = parseInt(B[w].slice(1), 10) - 1;
                break;
              default:
                if (f && f.WTF) throw new Error("SYLK bad record " + j);
            }
            if (V && (k[b][v] ? (k[b][v].t = K, k[b][v].v = N) : k[b][v] = {
              t: K,
              v: N
            }, S && (k[b][v].z = S), f.cellText !== !1 && S && (k[b][v].w = Qk(k[b][v].z, k[b][v].v, {
              date1904: R.Workbook.WBProps.date1904
            })), S = null), L) {
              if (D) throw new Error("SYLK shared formula cannot have own formula");
              var Q = U > -1 && k[U][H];
              if (!Q || !Q[1]) throw new Error("SYLK shared formula cannot find base");
              Y = Rrr(Q[1], {
                r: b - U,
                c: v - H
              });
            }
            Y && (k[b][v] ? k[b][v].f = Y : k[b][v] = {
              t: "n",
              f: Y
            }), W && (k[b][v] || (k[b][v] = {
              t: "z"
            }), k[b][v].c = [{
              a: "SheetJSYLK",
              t: W
            }]);
            break;
          case "F":
            var q = 0;
            for (w = 1; w < B.length; ++w) switch (B[w].charAt(0)) {
              case "X":
                v = parseInt(B[w].slice(1), 10) - 1, ++q;
                break;
              case "Y":
                for (b = parseInt(B[w].slice(1), 10) - 1, P = k.length; P <= b; ++P) k[P] = [];
                break;
              case "M":
                T = parseInt(B[w].slice(1), 10) / 20;
                break;
              case "F":
                break;
              case "G":
                break;
              case "P":
                S = A[parseInt(B[w].slice(1), 10)];
                break;
              case "S":
                break;
              case "D":
                break;
              case "N":
                break;
              case "W":
                for (M = B[w].slice(1).split(" "), P = parseInt(M[0], 10); P <= parseInt(M[1], 10); ++P) T = parseInt(M[2], 10), E[P - 1] = T === 0 ? {
                  hidden: !0
                } : {
                  wch: T
                };
                break;
              case "C":
                v = parseInt(B[w].slice(1), 10) - 1, E[v] || (E[v] = {});
                break;
              case "R":
                b = parseInt(B[w].slice(1), 10) - 1, I[b] || (I[b] = {}), T > 0 ? (I[b].hpt = T, I[b].hpx = Rde(T)) : T === 0 && (I[b].hidden = !0);
                break;
              default:
                if (f && f.WTF) throw new Error("SYLK bad record " + j);
            }
            q < 1 && (S = null);
            break;
          default:
            if (f && f.WTF) throw new Error("SYLK bad record " + j);
        }
      }
      return I.length > 0 && (C["!rows"] = I), E.length > 0 && (C["!cols"] = E), E.forEach(function (ne) {
        cD(ne);
      }), f && f.sheetRows && (k = k.slice(0, f.sheetRows)), [k, C, R];
    }
    function s(m, f) {
      var y = i(m, f),
        b = y[0],
        v = y[1],
        _ = y[2],
        w = qu(f);
      w.date1904 = (((_ || {}).Workbook || {}).WBProps || {}).date1904;
      var k = xpe(b, w);
      Gm(v).forEach(function (S) {
        k[S] = v[S];
      });
      var A = mG(k, f);
      return Gm(_).forEach(function (S) {
        A[S] = _[S];
      }), A.bookType = "sylk", A;
    }
    function l(m, f, y, b, v, _) {
      var w = "C;Y" + (y + 1) + ";X" + (b + 1) + ";K";
      switch (m.t) {
        case "n":
          w += isFinite(m.v) ? m.v || 0 : Mb[isNaN(m.v) ? 36 : 7], m.f && !m.F && (w += ";E" + CCe(m.f, {
            r: y,
            c: b
          }));
          break;
        case "b":
          w += m.v ? "TRUE" : "FALSE";
          break;
        case "e":
          w += m.w || Mb[m.v] || m.v;
          break;
        case "d":
          w += bg(Rf(m.v, _), _);
          break;
        case "s":
          w += '"' + (m.v == null ? "" : String(m.v)).replace(/"/g, "").replace(/;/g, ";;") + '"';
          break;
      }
      return w;
    }
    function d(m, f, y) {
      var b = "C;Y" + (f + 1) + ";X" + (y + 1) + ";A";
      return b += a(m.map(function (v) {
        return v.t;
      }).join("")), b;
    }
    function u(m, f) {
      f.forEach(function (y, b) {
        var v = "F;W" + (b + 1) + " " + (b + 1) + " ";
        y.hidden ? v += "0" : (typeof y.width == "number" && !y.wpx && (y.wpx = Pde(y.width)), typeof y.wpx == "number" && !y.wch && (y.wch = xke(y.wpx)), typeof y.wch == "number" && (v += Math.round(y.wch))), v.charAt(v.length - 1) != " " && m.push(v);
      });
    }
    function h(m, f) {
      f.forEach(function (y, b) {
        var v = "F;";
        y.hidden ? v += "M0;" : y.hpt ? v += "M" + 20 * y.hpt + ";" : y.hpx && (v += "M" + 20 * _ke(y.hpx) + ";"), v.length > 2 && m.push(v + "R" + (b + 1));
      });
    }
    function p(m, f, y) {
      f || (f = {}), f._formats = ["General"];
      var b = ["ID;PSheetJS;N;E"],
        v = [],
        _ = wd(m["!ref"] || "A1"),
        w,
        k = m["!data"] != null,
        A = `\r
`,
        S = (((y || {}).Workbook || {}).WBProps || {}).date1904,
        C = "General";
      b.push("P;PGeneral");
      var I = _.s.r,
        E = _.s.c,
        M = [];
      if (m["!ref"]) {
        for (I = _.s.r; I <= _.e.r; ++I) if (!(k && !m["!data"][I])) {
          for (M = [], E = _.s.c; E <= _.e.c; ++E) w = k ? m["!data"][I][E] : m[ic(E) + Jc(I)], !(!w || !w.c) && M.push(d(w.c, I, E));
          M.length && v.push(M.join(A));
        }
      }
      if (m["!ref"]) {
        for (I = _.s.r; I <= _.e.r; ++I) if (!(k && !m["!data"][I])) {
          for (M = [], E = _.s.c; E <= _.e.c; ++E) if (w = k ? m["!data"][I][E] : m[ic(E) + Jc(I)], !(!w || w.v == null && (!w.f || w.F))) {
            if ((w.z || (w.t == "d" ? Cs[14] : "General")) != C) {
              var T = f._formats.indexOf(w.z);
              T == -1 && (f._formats.push(w.z), T = f._formats.length - 1, b.push("P;P" + w.z.replace(/;/g, ";;"))), M.push("F;P" + T + ";Y" + (I + 1) + ";X" + (E + 1));
            }
            M.push(l(w, m, I, E, f, S));
          }
          v.push(M.join(A));
        }
      }
      return b.push("F;P0;DG0G8;M255"), m["!cols"] && u(b, m["!cols"]), m["!rows"] && h(b, m["!rows"]), m["!ref"] && b.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" ")), b.push("O;L;D;B" + (S ? ";V4" : "") + ";K47;G100 0.001"), delete f._formats, b.join(A) + A + v.join(A) + A + "E" + A;
    }
    return {
      to_workbook: s,
      from_sheet: p
    };
  })(),
  vrr = (function () {
    function e(s, l) {
      switch (l.type) {
        case "base64":
          return t(_3(s), l);
        case "binary":
          return t(s, l);
        case "buffer":
          return t(Uc && Buffer.isBuffer(s) ? s.toString("binary") : GP(s), l);
        case "array":
          return t(wJ(s), l);
      }
      throw new Error("Unrecognized type " + l.type);
    }
    function t(s, l) {
      for (var d = s.split(`
`), u = -1, h = -1, p = 0, m = []; p !== d.length; ++p) {
        if (d[p].trim() === "BOT") {
          m[++u] = [], h = 0;
          continue;
        }
        if (!(u < 0)) {
          var f = d[p].trim().split(","),
            y = f[0],
            b = f[1];
          ++p;
          for (var v = d[p] || ""; (v.match(/["]/g) || []).length & 1 && p < d.length - 1;) v += `
` + d[++p];
          switch (v = v.trim(), +y) {
            case -1:
              if (v === "BOT") {
                m[++u] = [], h = 0;
                continue;
              } else if (v !== "EOD") throw new Error("Unrecognized DIF special command " + v);
              break;
            case 0:
              v === "TRUE" ? m[u][h] = !0 : v === "FALSE" ? m[u][h] = !1 : isNaN(XS(b)) ? isNaN(gke(b).getDate()) ? m[u][h] = b : (m[u][h] = Rf(b), l && l.UTC || (m[u][h] = xJ(m[u][h]))) : m[u][h] = XS(b), ++h;
              break;
            case 1:
              v = v.slice(1, v.length - 1), v = v.replace(/""/g, '"'), v && v.match(/^=".*"$/) && (v = v.slice(2, -1)), m[u][h++] = v !== "" ? v : null;
              break;
          }
          if (v === "EOD") break;
        }
      }
      return l && l.sheetRows && (m = m.slice(0, l.sheetRows)), m;
    }
    function n(s, l) {
      return xpe(e(s, l), l);
    }
    function r(s, l) {
      var d = mG(n(s, l), l);
      return d.bookType = "dif", d;
    }
    function a(s, l) {
      return "0," + String(s) + `\r
` + l;
    }
    function i(s) {
      return `1,0\r
"` + s.replace(/"/g, '""') + '"';
    }
    function o(s) {
      if (!s["!ref"]) throw new Error("Cannot export empty sheet to DIF");
      for (var l = wd(s["!ref"]), d = s["!data"] != null, u = [`TABLE\r
0,1\r
"sheetjs"\r
`, `VECTORS\r
0,` + (l.e.r - l.s.r + 1) + `\r
""\r
`, `TUPLES\r
0,` + (l.e.c - l.s.c + 1) + `\r
""\r
`, `DATA\r
0,0\r
""\r
`], h = l.s.r; h <= l.e.r; ++h) {
        for (var p = d ? s["!data"][h] : [], m = `-1,0\r
BOT\r
`, f = l.s.c; f <= l.e.c; ++f) {
          var y = d ? p && p[f] : s[Xc({
            r: h,
            c: f
          })];
          if (y == null) {
            m += `1,0\r
""\r
`;
            continue;
          }
          switch (y.t) {
            case "n":
              y.w != null ? m += "0," + y.w + `\r
V` : y.v != null ? m += a(y.v, "V") : y.f != null && !y.F ? m += i("=" + y.f) : m += `1,0\r
""`;
              break;
            case "b":
              m += y.v ? a(1, "TRUE") : a(0, "FALSE");
              break;
            case "s":
              m += i(isNaN(+y.v) ? y.v : '="' + y.v + '"');
              break;
            case "d":
              y.w || (y.w = Qk(y.z || Cs[14], bg(Rf(y.v)))), m += a(y.w, "V");
              break;
            default:
              m += `1,0\r
""`;
          }
          m += `\r
`;
        }
        u.push(m);
      }
      return u.join("") + `-1,0\r
EOD`;
    }
    return {
      to_workbook: r,
      to_sheet: n,
      from_sheet: o
    };
  })(),
  wrr = (function () {
    function e(h) {
      return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
    }
    function t(h) {
      return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
    }
    function n(h, p) {
      for (var m = h.split(`
`), f = -1, y = -1, b = 0, v = []; b !== m.length; ++b) {
        var _ = m[b].trim().split(":");
        if (_[0] === "cell") {
          var w = Eh(_[1]);
          if (v.length <= w.r) for (f = v.length; f <= w.r; ++f) v[f] || (v[f] = []);
          switch (f = w.r, y = w.c, _[2]) {
            case "t":
              v[f][y] = e(_[3]);
              break;
            case "v":
              v[f][y] = +_[3];
              break;
            case "vtf":
              var k = _[_.length - 1];
            case "vtc":
              switch (_[3]) {
                case "nl":
                  v[f][y] = !!+_[4];
                  break;
                default:
                  v[f][y] = _[_.length - 1].charAt(0) == "#" ? {
                    t: "e",
                    v: Lv[_[_.length - 1]]
                  } : +_[4];
                  break;
              }
              _[2] == "vtf" && (v[f][y] = [v[f][y], k]);
          }
        }
      }
      return p && p.sheetRows && (v = v.slice(0, p.sheetRows)), v;
    }
    function r(h, p) {
      return xpe(n(h, p), p);
    }
    function a(h, p) {
      return mG(r(h, p), p);
    }
    var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join(`
`),
      o = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join(`
`) + `
`,
      s = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join(`
`),
      l = "--SocialCalcSpreadsheetControlSave--";
    function d(h) {
      if (!h || !h["!ref"]) return "";
      for (var p = [], m = [], f, y = "", b = Ty(h["!ref"]), v = h["!data"] != null, _ = b.s.r; _ <= b.e.r; ++_) for (var w = b.s.c; w <= b.e.c; ++w) if (y = Xc({
        r: _,
        c: w
      }), f = v ? (h["!data"][_] || [])[w] : h[y], !(!f || f.v == null || f.t === "z")) {
        switch (m = ["cell", y, "t"], f.t) {
          case "s":
            m.push(t(f.v));
            break;
          case "b":
            m[2] = "vt" + (f.f ? "f" : "c"), m[3] = "nl", m[4] = f.v ? "1" : "0", m[5] = t(f.f || (f.v ? "TRUE" : "FALSE"));
            break;
          case "d":
            var k = bg(Rf(f.v));
            m[2] = "vtc", m[3] = "nd", m[4] = "" + k, m[5] = f.w || Qk(f.z || Cs[14], k);
            break;
          case "n":
            isFinite(f.v) ? f.f ? (m[2] = "vtf", m[3] = "n", m[4] = f.v, m[5] = t(f.f)) : (m[2] = "v", m[3] = f.v) : (m[2] = "vt" + (f.f ? "f" : "c"), m[3] = "e" + Mb[isNaN(f.v) ? 36 : 7], m[4] = "0", m[5] = f.f || m[3].slice(1), m[6] = "e", m[7] = m[3].slice(1));
            break;
          case "e":
            continue;
        }
        p.push(m.join(":"));
      }
      return p.push("sheet:c:" + (b.e.c - b.s.c + 1) + ":r:" + (b.e.r - b.s.r + 1) + ":tvf:1"), p.push("valueformat:1:text-wiki"), p.join(`
`);
    }
    function u(h) {
      return [i, o, s, o, d(h), l].join(`
`);
    }
    return {
      to_workbook: a,
      to_sheet: r,
      from_sheet: u
    };
  })(),
  Mde = (function () {
    function e(u, h, p, m, f) {
      f.raw ? h[p][m] = u : u === "" || (u === "TRUE" ? h[p][m] = !0 : u === "FALSE" ? h[p][m] = !1 : isNaN(XS(u)) ? isNaN(gke(u).getDate()) ? u.charCodeAt(0) == 35 && Lv[u] != null ? h[p][m] = {
        t: "e",
        v: Lv[u],
        w: u
      } : h[p][m] = u : h[p][m] = Rf(u) : h[p][m] = XS(u));
    }
    function t(u, h) {
      var p = h || {},
        m = [];
      if (!u || u.length === 0) return m;
      for (var f = u.split(/[\r\n]/), y = f.length - 1; y >= 0 && f[y].length === 0;) --y;
      for (var b = 10, v = 0, _ = 0; _ <= y; ++_) v = f[_].indexOf(" "), v == -1 ? v = f[_].length : v++, b = Math.max(b, v);
      for (_ = 0; _ <= y; ++_) {
        m[_] = [];
        var w = 0;
        for (e(f[_].slice(0, b).trim(), m, _, w, p), w = 1; w <= (f[_].length - b) / 10 + 1; ++w) e(f[_].slice(b + (w - 1) * 10, b + w * 10).trim(), m, _, w, p);
      }
      return p.sheetRows && (m = m.slice(0, p.sheetRows)), m;
    }
    var n = {
        44: ",",
        9: "	",
        59: ";",
        124: "|"
      },
      r = {
        44: 3,
        9: 2,
        59: 1,
        124: 0
      };
    function a(u) {
      for (var h = {}, p = !1, m = 0, f = 0; m < u.length; ++m) (f = u.charCodeAt(m)) == 34 ? p = !p : !p && f in n && (h[f] = (h[f] || 0) + 1);
      f = [];
      for (m in h) Object.prototype.hasOwnProperty.call(h, m) && f.push([h[m], m]);
      if (!f.length) {
        h = r;
        for (m in h) Object.prototype.hasOwnProperty.call(h, m) && f.push([h[m], m]);
      }
      return f.sort(function (y, b) {
        return y[0] - b[0] || r[y[1]] - r[b[1]];
      }), n[f.pop()[1]] || 44;
    }
    function i(u, h) {
      var p = h || {},
        m = "",
        f = {};
      p.dense && (f["!data"] = []);
      var y = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: 0,
          r: 0
        }
      };
      u.slice(0, 4) == "sep=" ? u.charCodeAt(5) == 13 && u.charCodeAt(6) == 10 ? (m = u.charAt(4), u = u.slice(7)) : u.charCodeAt(5) == 13 || u.charCodeAt(5) == 10 ? (m = u.charAt(4), u = u.slice(6)) : m = a(u.slice(0, 1024)) : p && p.FS ? m = p.FS : m = a(u.slice(0, 1024));
      var b = 0,
        v = 0,
        _ = 0,
        w = 0,
        k = 0,
        A = m.charCodeAt(0),
        S = !1,
        C = 0,
        I = u.charCodeAt(0),
        E = p.dateNF != null ? RVa(p.dateNF) : null;
      function M() {
        var T = u.slice(w, k);
        T.slice(-1) == "\r" && (T = T.slice(0, -1));
        var P = {};
        if (T.charAt(0) == '"' && T.charAt(T.length - 1) == '"' && (T = T.slice(1, -1).replace(/""/g, '"')), p.cellText !== !1 && (P.w = T), T.length === 0) P.t = "z";else if (p.raw) P.t = "s", P.v = T;else if (T.trim().length === 0) P.t = "s", P.v = T;else if (T.charCodeAt(0) == 61) T.charCodeAt(1) == 34 && T.charCodeAt(T.length - 1) == 34 ? (P.t = "s", P.v = T.slice(2, -1).replace(/""/g, '"')) : _Ya(T) ? (P.t = "s", P.f = T.slice(1), P.v = T) : (P.t = "s", P.v = T);else if (T == "TRUE") P.t = "b", P.v = !0;else if (T == "FALSE") P.t = "b", P.v = !1;else if (!isNaN(_ = XS(T))) P.t = "n", P.v = _;else if (!isNaN((_ = gke(T)).getDate()) || E && T.match(E)) {
          if (P.z = p.dateNF || Cs[14], E && T.match(E)) {
            var R = NVa(T, p.dateNF, T.match(E) || []);
            _ = Rf(R), p && p.UTC === !1 && (_ = xJ(_));
          } else p && p.UTC === !1 ? _ = xJ(_) : p.cellText !== !1 && p.dateNF && (P.w = Qk(P.z, _));
          p.cellDates ? (P.t = "d", P.v = _) : (P.t = "n", P.v = bg(_)), p.cellNF || delete P.z;
        } else T.charCodeAt(0) == 35 && Lv[T] != null ? (P.t = "e", P.w = T, P.v = Lv[T]) : (P.t = "s", P.v = T);
        if (P.t == "z" || (p.dense ? (f["!data"][b] || (f["!data"][b] = []), f["!data"][b][v] = P) : f[Xc({
          c: v,
          r: b
        })] = P), w = k + 1, I = u.charCodeAt(w), y.e.c < v && (y.e.c = v), y.e.r < b && (y.e.r = b), C == A) ++v;else if (v = 0, ++b, p.sheetRows && p.sheetRows <= b) return !0;
      }
      e: for (; k < u.length; ++k) switch (C = u.charCodeAt(k)) {
        case 34:
          I === 34 && (S = !S);
          break;
        case 13:
          if (S) break;
          u.charCodeAt(k + 1) == 10 && ++k;
        case A:
        case 10:
          if (!S && M()) break e;
          break;
      }
      return k - w > 0 && M(), f["!ref"] = Ac(y), f;
    }
    function o(u, h) {
      return !(h && h.PRN) || h.FS || u.slice(0, 4) == "sep=" || u.indexOf("	") >= 0 || u.indexOf(",") >= 0 || u.indexOf(";") >= 0 ? i(u, h) : xpe(t(u, h), h);
    }
    function s(u, h) {
      var p = "",
        m = h.type == "string" ? [0, 0, 0, 0] : eBt(u, h);
      switch (h.type) {
        case "base64":
          p = _3(u);
          break;
        case "binary":
          p = u;
          break;
        case "buffer":
          h.codepage == 65001 ? p = u.toString("utf8") : h.codepage && typeof Rc < "u" ? p = Rc.utils.decode(h.codepage, u) : p = Uc && Buffer.isBuffer(u) ? u.toString("binary") : GP(u);
          break;
        case "array":
          p = wJ(u);
          break;
        case "string":
          p = u;
          break;
        default:
          throw new Error("Unrecognized type " + h.type);
      }
      return m[0] == 239 && m[1] == 187 && m[2] == 191 ? p = Ch(p.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? p = Ch(p) : h.type == "binary" && typeof Rc < "u" && h.codepage && (p = Rc.utils.decode(h.codepage, Rc.utils.encode(28591, p))), p.slice(0, 19) == "socialcalc:version:" ? wrr.to_sheet(h.type == "string" ? p : Ch(p), h) : o(p, h);
    }
    function l(u, h) {
      return mG(s(u, h), h);
    }
    function d(u) {
      var h = [];
      if (!u["!ref"]) return "";
      for (var p = wd(u["!ref"]), m, f = u["!data"] != null, y = p.s.r; y <= p.e.r; ++y) {
        for (var b = [], v = p.s.c; v <= p.e.c; ++v) {
          var _ = Xc({
            r: y,
            c: v
          });
          if (m = f ? (u["!data"][y] || [])[v] : u[_], !m || m.v == null) {
            b.push("          ");
            continue;
          }
          for (var w = (m.w || (VP(m), m.w) || "").slice(0, 10); w.length < 10;) w += " ";
          b.push(w + (v === 0 ? " " : ""));
        }
        h.push(b.join(""));
      }
      return h.join(`
`);
    }
    return {
      to_workbook: l,
      to_sheet: s,
      from_sheet: d
    };
  })();

function dKa(e, t) {
  var n = t || {},
    r = !!n.WTF;
  n.WTF = !0;
  try {
    var a = brr.to_workbook(e, n);
    return n.WTF = r, a;
  } catch (i) {
    if (n.WTF = r, i.message.indexOf("SYLK bad record ID") == -1 && r) throw i;
    return Mde.to_workbook(e, t);
  }
}

var LQ = (function () {
  function e(W, Q, q) {
    if (W) {
      db(W, W.l || 0);
      for (var ne = q.Enum || D; W.l < W.length;) {
        var de = W.read_shift(2),
          le = ne[de] || ne[65535],
          J = W.read_shift(2),
          pe = W.l + J,
          ce = le.f && le.f(W, J, q);
        if (W.l = pe, Q(ce, le, de)) return;
      }
    }
  }
  function t(W, Q) {
    switch (Q.type) {
      case "base64":
        return r(I2(_3(W)), Q);
      case "binary":
        return r(I2(W), Q);
      case "buffer":
      case "array":
        return r(W, Q);
    }
    throw "Unsupported type " + Q.type;
  }
  var n = ["mmmm", "dd-mmm-yyyy", "dd-mmm", "mmm-yyyy", "@", "mm/dd", "hh:mm:ss AM/PM", "hh:mm AM/PM", "mm/dd/yyyy", "mm/dd", "hh:mm:ss", "hh:mm"];
  function r(W, Q) {
    if (!W) return W;
    var q = Q || {},
      ne = {},
      de = "Sheet1",
      le = "",
      J = 0,
      pe = {},
      ce = [],
      we = [],
      X = [];
    q.dense && (X = ne["!data"] = []);
    var Z = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      },
      re = q.sheetRows || 0,
      fe = {};
    if (W[4] == 81 && W[5] == 80 && W[6] == 87) return K(W, Q);
    if (W[2] == 0 && (W[3] == 8 || W[3] == 9) && W.length >= 16 && W[14] == 5 && W[15] === 108) throw new Error("Unsupported Works 3 for Mac file");
    if (W[2] == 2) q.Enum = D, e(W, function (be, Ee, xe) {
      switch (xe) {
        case 0:
          q.vers = be, be >= 4096 && (q.qpro = !0);
          break;
        case 255:
          q.vers = be, q.works = !0;
          break;
        case 6:
          Z = be;
          break;
        case 204:
          be && (le = be);
          break;
        case 222:
          le = be;
          break;
        case 15:
        case 51:
          (!q.qpro && !q.works || xe == 51) && be[1].v.charCodeAt(0) < 48 && (be[1].v = be[1].v.slice(1)), (q.works || q.works2) && (be[1].v = be[1].v.replace(/\r\n/g, `
`));
        case 13:
        case 14:
        case 16:
          (be[2] & 112) == 112 && (be[2] & 15) > 1 && (be[2] & 15) < 15 && (be[1].z = q.dateNF || n[(be[2] & 15) - 1] || Cs[14], q.cellDates && (be[1].v = lj(be[1].v), be[1].t = typeof be[1].v == "number" ? "n" : "d")), q.qpro && be[3] > J && (ne["!ref"] = Ac(Z), pe[de] = ne, ce.push(de), ne = {}, q.dense && (X = ne["!data"] = []), Z = {
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: 0,
              c: 0
            }
          }, J = be[3], de = le || "Sheet" + (J + 1), le = "");
          var he = q.dense ? (X[be[0].r] || [])[be[0].c] : ne[Xc(be[0])];
          if (he) {
            he.t = be[1].t, he.v = be[1].v, be[1].z != null && (he.z = be[1].z), be[1].f != null && (he.f = be[1].f), fe = he;
            break;
          }
          q.dense ? (X[be[0].r] || (X[be[0].r] = []), X[be[0].r][be[0].c] = be[1]) : ne[Xc(be[0])] = be[1], fe = be[1];
          break;
        case 21509:
          q.works2 = !0;
          break;
        case 21506:
          be == 5281 && (fe.z = "hh:mm:ss", q.cellDates && fe.t == "n" && (fe.v = lj(fe.v), fe.t = typeof fe.v == "number" ? "n" : "d"));
          break;
      }
    }, q);else if (W[2] == 26 || W[2] == 14) q.Enum = U, W[2] == 14 && (q.qpro = !0, W.l = 0), e(W, function (be, Ee, xe) {
      switch (xe) {
        case 204:
          de = be;
          break;
        case 22:
          be[1].v.charCodeAt(0) < 48 && (be[1].v = be[1].v.slice(1)), be[1].v = be[1].v.replace(/\x0F./g, function (he) {
            return String.fromCharCode(he.charCodeAt(1) - 32);
          }).replace(/\r\n/g, `
`);
        case 23:
        case 24:
        case 25:
        case 37:
        case 39:
        case 40:
          if (be[3] > J && (ne["!ref"] = Ac(Z), pe[de] = ne, ce.push(de), ne = {}, q.dense && (X = ne["!data"] = []), Z = {
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: 0,
              c: 0
            }
          }, J = be[3], de = "Sheet" + (J + 1)), re > 0 && be[0].r >= re) break;
          q.dense ? (X[be[0].r] || (X[be[0].r] = []), X[be[0].r][be[0].c] = be[1]) : ne[Xc(be[0])] = be[1], Z.e.c < be[0].c && (Z.e.c = be[0].c), Z.e.r < be[0].r && (Z.e.r = be[0].r);
          break;
        case 27:
          be[14e3] && (we[be[14e3][0]] = be[14e3][1]);
          break;
        case 1537:
          we[be[0]] = be[1], be[0] == J && (de = be[1]);
          break;
      }
    }, q);else throw new Error("Unrecognized LOTUS BOF " + W[2]);
    if (ne["!ref"] = Ac(Z), pe[le || de] = ne, ce.push(le || de), !we.length) return {
      SheetNames: ce,
      Sheets: pe
    };
    for (var ye = {}, ie = [], ae = 0; ae < we.length; ++ae) pe[ce[ae]] ? (ie.push(we[ae] || ce[ae]), ye[we[ae]] = pe[we[ae]] || pe[ce[ae]]) : (ie.push(we[ae]), ye[we[ae]] = {
      "!ref": "A1"
    });
    return {
      SheetNames: ie,
      Sheets: ye
    };
  }
  function a(W, Q) {
    var q = Q || {};
    if (+q.codepage >= 0 && N5(+q.codepage), q.type == "string") throw new Error("Cannot write WK1 to JS string");
    var ne = kx();
    if (!W["!ref"]) throw new Error("Cannot export empty sheet to WK1");
    var de = wd(W["!ref"]),
      le = W["!data"] != null,
      J = [];
    Oi(ne, 0, o(1030)), Oi(ne, 6, d(de));
    for (var pe = Math.min(de.e.r, 8191), ce = de.s.c; ce <= de.e.c; ++ce) J[ce] = ic(ce);
    for (var we = de.s.r; we <= pe; ++we) {
      var X = Jc(we);
      for (ce = de.s.c; ce <= de.e.c; ++ce) {
        var Z = le ? (W["!data"][we] || [])[ce] : W[J[ce] + X];
        if (!(!Z || Z.t == "z")) switch (Z.t) {
          case "n":
            (Z.v | 0) == Z.v && Z.v >= -32768 && Z.v <= 32767 ? Oi(ne, 13, b(we, ce, Z)) : Oi(ne, 14, _(we, ce, Z));
            break;
          case "d":
            var re = bg(Z.v);
            (re | 0) == re && re >= -32768 && re <= 32767 ? Oi(ne, 13, b(we, ce, {
              v: re,
              z: Z.z || Cs[14]
            })) : Oi(ne, 14, _(we, ce, {
              v: re,
              z: Z.z || Cs[14]
            }));
            break;
          default:
            var fe = VP(Z);
            Oi(ne, 15, m(we, ce, fe.slice(0, 239)));
        }
      }
    }
    return Oi(ne, 1), ne.end();
  }
  function i(W, Q) {
    var q = Q || {};
    if (+q.codepage >= 0 && N5(+q.codepage), q.type == "string") throw new Error("Cannot write WK3 to JS string");
    var ne = kx();
    Oi(ne, 0, s(W));
    for (var de = 0, le = 0; de < W.SheetNames.length; ++de) (W.Sheets[W.SheetNames[de]] || {})["!ref"] && Oi(ne, 27, L(W.SheetNames[de], le++));
    var J = 0;
    for (de = 0; de < W.SheetNames.length; ++de) {
      var pe = W.Sheets[W.SheetNames[de]];
      if (!(!pe || !pe["!ref"])) {
        for (var ce = wd(pe["!ref"]), we = pe["!data"] != null, X = [], Z = Math.min(ce.e.r, 8191), re = ce.s.r; re <= Z; ++re) for (var fe = Jc(re), ye = ce.s.c; ye <= ce.e.c; ++ye) {
          re === ce.s.r && (X[ye] = ic(ye));
          var ie = X[ye] + fe,
            ae = we ? (pe["!data"][re] || [])[ye] : pe[ie];
          if (!(!ae || ae.t == "z")) if (ae.t == "n") Oi(ne, 23, R(re, ye, J, ae.v));else {
            var be = VP(ae);
            Oi(ne, 22, M(re, ye, J, be.slice(0, 239)));
          }
        }
        ++J;
      }
    }
    return Oi(ne, 1), ne.end();
  }
  function o(W) {
    var Q = Ja(2);
    return Q.write_shift(2, W), Q;
  }
  function s(W) {
    var Q = Ja(26);
    Q.write_shift(2, 4096), Q.write_shift(2, 4), Q.write_shift(4, 0);
    for (var q = 0, ne = 0, de = 0, le = 0; le < W.SheetNames.length; ++le) {
      var J = W.SheetNames[le],
        pe = W.Sheets[J];
      if (!(!pe || !pe["!ref"])) {
        ++de;
        var ce = Ty(pe["!ref"]);
        q < ce.e.r && (q = ce.e.r), ne < ce.e.c && (ne = ce.e.c);
      }
    }
    return q > 8191 && (q = 8191), Q.write_shift(2, q), Q.write_shift(1, de), Q.write_shift(1, ne), Q.write_shift(2, 0), Q.write_shift(2, 0), Q.write_shift(1, 1), Q.write_shift(1, 2), Q.write_shift(4, 0), Q.write_shift(4, 0), Q;
  }
  function l(W, Q, q) {
    var ne = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: 0
      }
    };
    return Q == 8 && q.qpro ? (ne.s.c = W.read_shift(1), W.l++, ne.s.r = W.read_shift(2), ne.e.c = W.read_shift(1), W.l++, ne.e.r = W.read_shift(2), ne) : (ne.s.c = W.read_shift(2), ne.s.r = W.read_shift(2), Q == 12 && q.qpro && (W.l += 2), ne.e.c = W.read_shift(2), ne.e.r = W.read_shift(2), Q == 12 && q.qpro && (W.l += 2), ne.s.c == 65535 && (ne.s.c = ne.e.c = ne.s.r = ne.e.r = 0), ne);
  }
  function d(W) {
    var Q = Ja(8);
    return Q.write_shift(2, W.s.c), Q.write_shift(2, W.s.r), Q.write_shift(2, W.e.c), Q.write_shift(2, W.e.r), Q;
  }
  function u(W, Q, q) {
    var ne = [{
      c: 0,
      r: 0
    }, {
      t: "n",
      v: 0
    }, 0, 0];
    return q.qpro && q.vers != 20768 ? (ne[0].c = W.read_shift(1), ne[3] = W.read_shift(1), ne[0].r = W.read_shift(2), W.l += 2) : q.works ? (ne[0].c = W.read_shift(2), ne[0].r = W.read_shift(2), ne[2] = W.read_shift(2)) : (ne[2] = W.read_shift(1), ne[0].c = W.read_shift(2), ne[0].r = W.read_shift(2)), ne;
  }
  function h(W) {
    return W.z && k3(W.z) ? 240 | (n.indexOf(W.z) + 1 || 2) : 255;
  }
  function p(W, Q, q) {
    var ne = W.l + Q,
      de = u(W, Q, q);
    if (de[1].t = "s", (q.vers & 65534) == 20768) {
      W.l++;
      var le = W.read_shift(1);
      return de[1].v = W.read_shift(le, "utf8"), de;
    }
    return q.qpro && W.l++, de[1].v = W.read_shift(ne - W.l, "cstr"), de;
  }
  function m(W, Q, q) {
    var ne = Ja(7 + q.length);
    ne.write_shift(1, 255), ne.write_shift(2, Q), ne.write_shift(2, W), ne.write_shift(1, 39);
    for (var de = 0; de < ne.length; ++de) {
      var le = q.charCodeAt(de);
      ne.write_shift(1, le >= 128 ? 95 : le);
    }
    return ne.write_shift(1, 0), ne;
  }
  function f(W, Q, q) {
    var ne = W.l + Q,
      de = u(W, Q, q);
    if (de[1].t = "s", q.vers == 20768) {
      var le = W.read_shift(1);
      return de[1].v = W.read_shift(le, "utf8"), de;
    }
    return de[1].v = W.read_shift(ne - W.l, "cstr"), de;
  }
  function y(W, Q, q) {
    var ne = u(W, Q, q);
    return ne[1].v = W.read_shift(2, "i"), ne;
  }
  function b(W, Q, q) {
    var ne = Ja(7);
    return ne.write_shift(1, h(q)), ne.write_shift(2, Q), ne.write_shift(2, W), ne.write_shift(2, q.v, "i"), ne;
  }
  function v(W, Q, q) {
    var ne = u(W, Q, q);
    return ne[1].v = W.read_shift(8, "f"), ne;
  }
  function _(W, Q, q) {
    var ne = Ja(13);
    return ne.write_shift(1, h(q)), ne.write_shift(2, Q), ne.write_shift(2, W), ne.write_shift(8, q.v, "f"), ne;
  }
  function w(W, Q, q) {
    var ne = W.l + Q,
      de = u(W, Q, q);
    if (de[1].v = W.read_shift(8, "f"), q.qpro) W.l = ne;else {
      var le = W.read_shift(2);
      C(W.slice(W.l, W.l + le), de), W.l += le;
    }
    return de;
  }
  function k(W, Q, q) {
    var ne = Q & 32768;
    return Q &= -32769, Q = (ne ? W : 0) + (Q >= 8192 ? Q - 16384 : Q), (ne ? "" : "$") + (q ? ic(Q) : Jc(Q));
  }
  var A = {
      31: ["NA", 0],
      33: ["ABS", 1],
      34: ["TRUNC", 1],
      35: ["SQRT", 1],
      36: ["LOG", 1],
      37: ["LN", 1],
      38: ["PI", 0],
      39: ["SIN", 1],
      40: ["COS", 1],
      41: ["TAN", 1],
      42: ["ATAN2", 2],
      43: ["ATAN", 1],
      44: ["ASIN", 1],
      45: ["ACOS", 1],
      46: ["EXP", 1],
      47: ["MOD", 2],
      49: ["ISNA", 1],
      50: ["ISERR", 1],
      51: ["FALSE", 0],
      52: ["TRUE", 0],
      53: ["RAND", 0],
      54: ["DATE", 3],
      63: ["ROUND", 2],
      64: ["TIME", 3],
      68: ["ISNUMBER", 1],
      69: ["ISTEXT", 1],
      70: ["LEN", 1],
      71: ["VALUE", 1],
      73: ["MID", 3],
      74: ["CHAR", 1],
      80: ["SUM", 69],
      81: ["AVERAGEA", 69],
      82: ["COUNTA", 69],
      83: ["MINA", 69],
      84: ["MAXA", 69],
      102: ["UPPER", 1],
      103: ["LOWER", 1],
      107: ["PROPER", 1],
      109: ["TRIM", 1],
      111: ["T", 1]
    },
    S = ["", "", "", "", "", "", "", "", "", "+", "-", "*", "/", "^", "=", "<>", "<=", ">=", "<", ">", "", "", "", "", "&", "", "", "", "", "", "", ""];
  function C(W, Q) {
    db(W, 0);
    for (var q = [], ne = 0, de = "", le = "", J = "", pe = ""; W.l < W.length;) {
      var ce = W[W.l++];
      switch (ce) {
        case 0:
          q.push(W.read_shift(8, "f"));
          break;
        case 1:
          le = k(Q[0].c, W.read_shift(2), !0), de = k(Q[0].r, W.read_shift(2), !1), q.push(le + de);
          break;
        case 2:
          {
            var we = k(Q[0].c, W.read_shift(2), !0),
              X = k(Q[0].r, W.read_shift(2), !1);
            le = k(Q[0].c, W.read_shift(2), !0), de = k(Q[0].r, W.read_shift(2), !1), q.push(we + X + ":" + le + de);
          }
          break;
        case 3:
          if (W.l < W.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          q.push("(" + q.pop() + ")");
          break;
        case 5:
          q.push(W.read_shift(2));
          break;
        case 6:
          {
            for (var Z = ""; ce = W[W.l++];) Z += String.fromCharCode(ce);
            q.push('"' + Z.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          q.push("-" + q.pop());
          break;
        case 23:
          q.push("+" + q.pop());
          break;
        case 22:
          q.push("NOT(" + q.pop() + ")");
          break;
        case 20:
        case 21:
          pe = q.pop(), J = q.pop(), q.push(["AND", "OR"][ce - 20] + "(" + J + "," + pe + ")");
          break;
        default:
          if (ce < 32 && S[ce]) pe = q.pop(), J = q.pop(), q.push(J + S[ce] + pe);else if (A[ce]) {
            if (ne = A[ce][1], ne == 69 && (ne = W[W.l++]), ne > q.length) {
              console.error("WK1 bad formula parse 0x" + ce.toString(16) + ":|" + q.join("|") + "|");
              return;
            }
            var re = q.slice(-ne);
            q.length -= ne, q.push(A[ce][0] + "(" + re.join(",") + ")");
          } else return ce <= 7 ? console.error("WK1 invalid opcode " + ce.toString(16)) : ce <= 24 ? console.error("WK1 unsupported op " + ce.toString(16)) : ce <= 30 ? console.error("WK1 invalid opcode " + ce.toString(16)) : ce <= 115 ? console.error("WK1 unsupported function opcode " + ce.toString(16)) : console.error("WK1 unrecognized opcode " + ce.toString(16));
      }
    }
    q.length == 1 ? Q[1].f = "" + q[0] : console.error("WK1 bad formula parse |" + q.join("|") + "|");
  }
  function I(W) {
    var Q = [{
      c: 0,
      r: 0
    }, {
      t: "n",
      v: 0
    }, 0];
    return Q[0].r = W.read_shift(2), Q[3] = W[W.l++], Q[0].c = W[W.l++], Q;
  }
  function E(W, Q) {
    var q = I(W);
    return q[1].t = "s", q[1].v = W.read_shift(Q - 4, "cstr"), q;
  }
  function M(W, Q, q, ne) {
    var de = Ja(6 + ne.length);
    de.write_shift(2, W), de.write_shift(1, q), de.write_shift(1, Q), de.write_shift(1, 39);
    for (var le = 0; le < ne.length; ++le) {
      var J = ne.charCodeAt(le);
      de.write_shift(1, J >= 128 ? 95 : J);
    }
    return de.write_shift(1, 0), de;
  }
  function T(W, Q) {
    var q = I(W);
    q[1].v = W.read_shift(2);
    var ne = q[1].v >> 1;
    if (q[1].v & 1) switch (ne & 7) {
      case 0:
        ne = (ne >> 3) * 5e3;
        break;
      case 1:
        ne = (ne >> 3) * 500;
        break;
      case 2:
        ne = (ne >> 3) / 20;
        break;
      case 3:
        ne = (ne >> 3) / 200;
        break;
      case 4:
        ne = (ne >> 3) / 2e3;
        break;
      case 5:
        ne = (ne >> 3) / 2e4;
        break;
      case 6:
        ne = (ne >> 3) / 16;
        break;
      case 7:
        ne = (ne >> 3) / 64;
        break;
    }
    return q[1].v = ne, q;
  }
  function P(W, Q) {
    var q = I(W),
      ne = W.read_shift(4),
      de = W.read_shift(4),
      le = W.read_shift(2);
    if (le == 65535) return ne === 0 && de === 3221225472 ? (q[1].t = "e", q[1].v = 15) : ne === 0 && de === 3489660928 ? (q[1].t = "e", q[1].v = 42) : q[1].v = 0, q;
    var J = le & 32768;
    return le = (le & 32767) - 16446, q[1].v = (1 - J * 2) * (de * Math.pow(2, le + 32) + ne * Math.pow(2, le)), q;
  }
  function R(W, Q, q, ne) {
    var de = Ja(14);
    if (de.write_shift(2, W), de.write_shift(1, q), de.write_shift(1, Q), ne == 0) return de.write_shift(4, 0), de.write_shift(4, 0), de.write_shift(2, 65535), de;
    var le = 0,
      J = 0,
      pe = 0,
      ce = 0;
    return ne < 0 && (le = 1, ne = -ne), J = Math.log2(ne) | 0, ne /= Math.pow(2, J - 31), ce = ne >>> 0, (ce & 2147483648) == 0 && (ne /= 2, ++J, ce = ne >>> 0), ne -= ce, ce |= 2147483648, ce >>>= 0, ne *= Math.pow(2, 32), pe = ne >>> 0, de.write_shift(4, pe), de.write_shift(4, ce), J += 16383 + (le ? 32768 : 0), de.write_shift(2, J), de;
  }
  function j(W, Q) {
    var q = P(W);
    return W.l += Q - 14, q;
  }
  function B(W, Q) {
    var q = I(W),
      ne = W.read_shift(4);
    return q[1].v = ne >> 6, q;
  }
  function F(W, Q) {
    var q = I(W),
      ne = W.read_shift(8, "f");
    return q[1].v = ne, q;
  }
  function N(W, Q) {
    var q = F(W);
    return W.l += Q - 12, q;
  }
  function G(W, Q) {
    return W[W.l + Q - 1] == 0 ? W.read_shift(Q, "cstr") : "";
  }
  function z(W, Q) {
    var q = W[W.l++];
    q > Q - 1 && (q = Q - 1);
    for (var ne = ""; ne.length < q;) ne += String.fromCharCode(W[W.l++]);
    return ne;
  }
  function V(W, Q, q) {
    if (!(!q.qpro || Q < 21)) {
      var ne = W.read_shift(1);
      W.l += 17, W.l += 1, W.l += 2;
      var de = W.read_shift(Q - 21, "cstr");
      return [ne, de];
    }
  }
  function O(W, Q) {
    for (var q = {}, ne = W.l + Q; W.l < ne;) {
      var de = W.read_shift(2);
      if (de == 14e3) {
        for (q[de] = [0, ""], q[de][0] = W.read_shift(2); W[W.l];) q[de][1] += String.fromCharCode(W[W.l]), W.l++;
        W.l++;
      }
    }
    return q;
  }
  function L(W, Q) {
    var q = Ja(5 + W.length);
    q.write_shift(2, 14e3), q.write_shift(2, Q);
    for (var ne = 0; ne < W.length; ++ne) {
      var de = W.charCodeAt(ne);
      q[q.l++] = de > 127 ? 95 : de;
    }
    return q[q.l++] = 0, q;
  }
  var D = {
      0: {
        n: "BOF",
        f: Rg
      },
      1: {
        n: "EOF"
      },
      2: {
        n: "CALCMODE"
      },
      3: {
        n: "CALCORDER"
      },
      4: {
        n: "SPLIT"
      },
      5: {
        n: "SYNC"
      },
      6: {
        n: "RANGE",
        f: l
      },
      7: {
        n: "WINDOW1"
      },
      8: {
        n: "COLW1"
      },
      9: {
        n: "WINTWO"
      },
      10: {
        n: "COLW2"
      },
      11: {
        n: "NAME"
      },
      12: {
        n: "BLANK"
      },
      13: {
        n: "INTEGER",
        f: y
      },
      14: {
        n: "NUMBER",
        f: v
      },
      15: {
        n: "LABEL",
        f: p
      },
      16: {
        n: "FORMULA",
        f: w
      },
      24: {
        n: "TABLE"
      },
      25: {
        n: "ORANGE"
      },
      26: {
        n: "PRANGE"
      },
      27: {
        n: "SRANGE"
      },
      28: {
        n: "FRANGE"
      },
      29: {
        n: "KRANGE1"
      },
      32: {
        n: "HRANGE"
      },
      35: {
        n: "KRANGE2"
      },
      36: {
        n: "PROTEC"
      },
      37: {
        n: "FOOTER"
      },
      38: {
        n: "HEADER"
      },
      39: {
        n: "SETUP"
      },
      40: {
        n: "MARGINS"
      },
      41: {
        n: "LABELFMT"
      },
      42: {
        n: "TITLES"
      },
      43: {
        n: "SHEETJS"
      },
      45: {
        n: "GRAPH"
      },
      46: {
        n: "NGRAPH"
      },
      47: {
        n: "CALCCOUNT"
      },
      48: {
        n: "UNFORMATTED"
      },
      49: {
        n: "CURSORW12"
      },
      50: {
        n: "WINDOW"
      },
      51: {
        n: "STRING",
        f
      },
      55: {
        n: "PASSWORD"
      },
      56: {
        n: "LOCKED"
      },
      60: {
        n: "QUERY"
      },
      61: {
        n: "QUERYNAME"
      },
      62: {
        n: "PRINT"
      },
      63: {
        n: "PRINTNAME"
      },
      64: {
        n: "GRAPH2"
      },
      65: {
        n: "GRAPHNAME"
      },
      66: {
        n: "ZOOM"
      },
      67: {
        n: "SYMSPLIT"
      },
      68: {
        n: "NSROWS"
      },
      69: {
        n: "NSCOLS"
      },
      70: {
        n: "RULER"
      },
      71: {
        n: "NNAME"
      },
      72: {
        n: "ACOMM"
      },
      73: {
        n: "AMACRO"
      },
      74: {
        n: "PARSE"
      },
      102: {
        n: "PRANGES??"
      },
      103: {
        n: "RRANGES??"
      },
      104: {
        n: "FNAME??"
      },
      105: {
        n: "MRANGES??"
      },
      204: {
        n: "SHEETNAMECS",
        f: G
      },
      222: {
        n: "SHEETNAMELP",
        f: z
      },
      255: {
        n: "BOF",
        f: Rg
      },
      21506: {
        n: "WKSNF",
        f: Rg
      },
      65535: {
        n: ""
      }
    },
    U = {
      0: {
        n: "BOF"
      },
      1: {
        n: "EOF"
      },
      2: {
        n: "PASSWORD"
      },
      3: {
        n: "CALCSET"
      },
      4: {
        n: "WINDOWSET"
      },
      5: {
        n: "SHEETCELLPTR"
      },
      6: {
        n: "SHEETLAYOUT"
      },
      7: {
        n: "COLUMNWIDTH"
      },
      8: {
        n: "HIDDENCOLUMN"
      },
      9: {
        n: "USERRANGE"
      },
      10: {
        n: "SYSTEMRANGE"
      },
      11: {
        n: "ZEROFORCE"
      },
      12: {
        n: "SORTKEYDIR"
      },
      13: {
        n: "FILESEAL"
      },
      14: {
        n: "DATAFILLNUMS"
      },
      15: {
        n: "PRINTMAIN"
      },
      16: {
        n: "PRINTSTRING"
      },
      17: {
        n: "GRAPHMAIN"
      },
      18: {
        n: "GRAPHSTRING"
      },
      19: {
        n: "??"
      },
      20: {
        n: "ERRCELL"
      },
      21: {
        n: "NACELL"
      },
      22: {
        n: "LABEL16",
        f: E
      },
      23: {
        n: "NUMBER17",
        f: P
      },
      24: {
        n: "NUMBER18",
        f: T
      },
      25: {
        n: "FORMULA19",
        f: j
      },
      26: {
        n: "FORMULA1A"
      },
      27: {
        n: "XFORMAT",
        f: O
      },
      28: {
        n: "DTLABELMISC"
      },
      29: {
        n: "DTLABELCELL"
      },
      30: {
        n: "GRAPHWINDOW"
      },
      31: {
        n: "CPA"
      },
      32: {
        n: "LPLAUTO"
      },
      33: {
        n: "QUERY"
      },
      34: {
        n: "HIDDENSHEET"
      },
      35: {
        n: "??"
      },
      37: {
        n: "NUMBER25",
        f: B
      },
      38: {
        n: "??"
      },
      39: {
        n: "NUMBER27",
        f: F
      },
      40: {
        n: "FORMULA28",
        f: N
      },
      142: {
        n: "??"
      },
      147: {
        n: "??"
      },
      150: {
        n: "??"
      },
      151: {
        n: "??"
      },
      152: {
        n: "??"
      },
      153: {
        n: "??"
      },
      154: {
        n: "??"
      },
      155: {
        n: "??"
      },
      156: {
        n: "??"
      },
      163: {
        n: "??"
      },
      174: {
        n: "??"
      },
      175: {
        n: "??"
      },
      176: {
        n: "??"
      },
      177: {
        n: "??"
      },
      184: {
        n: "??"
      },
      185: {
        n: "??"
      },
      186: {
        n: "??"
      },
      187: {
        n: "??"
      },
      188: {
        n: "??"
      },
      195: {
        n: "??"
      },
      201: {
        n: "??"
      },
      204: {
        n: "SHEETNAMECS",
        f: G
      },
      205: {
        n: "??"
      },
      206: {
        n: "??"
      },
      207: {
        n: "??"
      },
      208: {
        n: "??"
      },
      256: {
        n: "??"
      },
      259: {
        n: "??"
      },
      260: {
        n: "??"
      },
      261: {
        n: "??"
      },
      262: {
        n: "??"
      },
      263: {
        n: "??"
      },
      265: {
        n: "??"
      },
      266: {
        n: "??"
      },
      267: {
        n: "??"
      },
      268: {
        n: "??"
      },
      270: {
        n: "??"
      },
      271: {
        n: "??"
      },
      384: {
        n: "??"
      },
      389: {
        n: "??"
      },
      390: {
        n: "??"
      },
      393: {
        n: "??"
      },
      396: {
        n: "??"
      },
      512: {
        n: "??"
      },
      514: {
        n: "??"
      },
      513: {
        n: "??"
      },
      516: {
        n: "??"
      },
      517: {
        n: "??"
      },
      640: {
        n: "??"
      },
      641: {
        n: "??"
      },
      642: {
        n: "??"
      },
      643: {
        n: "??"
      },
      644: {
        n: "??"
      },
      645: {
        n: "??"
      },
      646: {
        n: "??"
      },
      647: {
        n: "??"
      },
      648: {
        n: "??"
      },
      658: {
        n: "??"
      },
      659: {
        n: "??"
      },
      660: {
        n: "??"
      },
      661: {
        n: "??"
      },
      662: {
        n: "??"
      },
      665: {
        n: "??"
      },
      666: {
        n: "??"
      },
      768: {
        n: "??"
      },
      772: {
        n: "??"
      },
      1537: {
        n: "SHEETINFOQP",
        f: V
      },
      1600: {
        n: "??"
      },
      1602: {
        n: "??"
      },
      1793: {
        n: "??"
      },
      1794: {
        n: "??"
      },
      1795: {
        n: "??"
      },
      1796: {
        n: "??"
      },
      1920: {
        n: "??"
      },
      2048: {
        n: "??"
      },
      2049: {
        n: "??"
      },
      2052: {
        n: "??"
      },
      2688: {
        n: "??"
      },
      10998: {
        n: "??"
      },
      12849: {
        n: "??"
      },
      28233: {
        n: "??"
      },
      28484: {
        n: "??"
      },
      65535: {
        n: ""
      }
    },
    H = {
      5: "dd-mmm-yy",
      6: "dd-mmm",
      7: "mmm-yy",
      8: "mm/dd/yy",
      10: "hh:mm:ss AM/PM",
      11: "hh:mm AM/PM",
      14: "dd-mmm-yyyy",
      15: "mmm-yyyy",
      34: "0.00",
      50: "0.00;[Red]0.00",
      66: "0.00;(0.00)",
      82: "0.00;[Red](0.00)",
      162: '"$"#,##0.00;\\("$"#,##0.00\\)',
      288: "0%",
      304: "0E+00",
      320: "# ?/?"
    };
  function Y(W) {
    var Q = W.read_shift(2),
      q = W.read_shift(1);
    if (q != 0) throw "unsupported QPW string type " + q.toString(16);
    return W.read_shift(Q, "sbcs-cont");
  }
  function K(W, Q) {
    db(W, 0);
    var q = Q || {},
      ne = {};
    q.dense && (ne["!data"] = []);
    var de = [],
      le = "",
      J = {
        s: {
          r: -1,
          c: -1
        },
        e: {
          r: -1,
          c: -1
        }
      },
      pe = 0,
      ce = 0,
      we = 0,
      X = 0,
      Z = {
        SheetNames: [],
        Sheets: {}
      },
      re = [];
    e: for (; W.l < W.length;) {
      var fe = W.read_shift(2),
        ye = W.read_shift(2),
        ie = W.slice(W.l, W.l + ye);
      switch (db(ie, 0), fe) {
        case 1:
          if (ie.read_shift(4) != 962023505) throw "Bad QPW9 BOF!";
          break;
        case 2:
          break e;
        case 8:
          break;
        case 10:
          for (var ae = ie.read_shift(4), be = (ie.length - ie.l) / ae | 0, Ee = 0; Ee < ae; ++Ee) {
            var xe = ie.l + be,
              he = {};
            ie.l += 2, he.numFmtId = ie.read_shift(2), H[he.numFmtId] && (he.z = H[he.numFmtId]), ie.l = xe, re.push(he);
          }
          break;
        case 1025:
          break;
        case 1026:
          break;
        case 1031:
          for (ie.l += 12; ie.l < ie.length;) pe = ie.read_shift(2), ce = ie.read_shift(1), de.push(ie.read_shift(pe, "cstr"));
          break;
        case 1032:
          break;
        case 1537:
          {
            var ue = ie.read_shift(2);
            ne = {}, q.dense && (ne["!data"] = []), J.s.c = ie.read_shift(2), J.e.c = ie.read_shift(2), J.s.r = ie.read_shift(4), J.e.r = ie.read_shift(4), ie.l += 4, ie.l + 2 < ie.length && (pe = ie.read_shift(2), ce = ie.read_shift(1), le = pe == 0 ? "" : ie.read_shift(pe, "cstr")), le || (le = ic(ue));
          }
          break;
        case 1538:
          {
            if (J.s.c > 255 || J.s.r > 999999) break;
            J.e.c < J.s.c && (J.e.c = J.s.c), J.e.r < J.s.r && (J.e.r = J.s.r), ne["!ref"] = Ac(J), NCe(Z, ne, le);
          }
          break;
        case 2561:
          we = ie.read_shift(2), J.e.c < we && (J.e.c = we), J.s.c > we && (J.s.c = we), X = ie.read_shift(4), J.s.r > X && (J.s.r = X), X = ie.read_shift(4), J.e.r < X && (J.e.r = X);
          break;
        case 3073:
          {
            X = ie.read_shift(4), pe = ie.read_shift(4), J.s.r > X && (J.s.r = X), J.e.r < X + pe - 1 && (J.e.r = X + pe - 1);
            for (var ge = ic(we); ie.l < ie.length;) {
              var _e = {
                  t: "z"
                },
                ke = ie.read_shift(1),
                ve = -1;
              ke & 128 && (ve = ie.read_shift(2));
              var Te = ke & 64 ? ie.read_shift(2) - 1 : 0;
              switch (ke & 31) {
                case 0:
                  break;
                case 1:
                  break;
                case 2:
                  _e = {
                    t: "n",
                    v: ie.read_shift(2)
                  };
                  break;
                case 3:
                  _e = {
                    t: "n",
                    v: ie.read_shift(2, "i")
                  };
                  break;
                case 4:
                  _e = {
                    t: "n",
                    v: UXe(ie)
                  };
                  break;
                case 5:
                  _e = {
                    t: "n",
                    v: ie.read_shift(8, "f")
                  };
                  break;
                case 7:
                  _e = {
                    t: "s",
                    v: de[ce = ie.read_shift(4) - 1]
                  };
                  break;
                case 8:
                  _e = {
                    t: "n",
                    v: ie.read_shift(8, "f")
                  }, ie.l += 2, ie.l += 4, isNaN(_e.v) && (_e = {
                    t: "e",
                    v: 15
                  });
                  break;
                default:
                  throw "Unrecognized QPW cell type " + (ke & 31);
              }
              ve != -1 && (re[ve - 1] || {}).z && (_e.z = re[ve - 1].z);
              var Ne = 0;
              if (ke & 32) switch (ke & 31) {
                case 2:
                  Ne = ie.read_shift(2);
                  break;
                case 3:
                  Ne = ie.read_shift(2, "i");
                  break;
                case 7:
                  Ne = ie.read_shift(2);
                  break;
                default:
                  throw "Unsupported delta for QPW cell type " + (ke & 31);
              }
              if (!(!q.sheetStubs && _e.t == "z")) {
                var me = qu(_e);
                _e.t == "n" && _e.z && k3(_e.z) && q.cellDates && (me.v = lj(_e.v), me.t = typeof me.v == "number" ? "n" : "d"), ne["!data"] != null ? (ne["!data"][X] || (ne["!data"][X] = []), ne["!data"][X][we] = me) : ne[ge + Jc(X)] = me;
              }
              for (++X, --pe; Te-- > 0 && pe >= 0;) {
                if (ke & 32) switch (ke & 31) {
                  case 2:
                    _e = {
                      t: "n",
                      v: _e.v + Ne & 65535
                    };
                    break;
                  case 3:
                    _e = {
                      t: "n",
                      v: _e.v + Ne & 65535
                    }, _e.v > 32767 && (_e.v -= 65536);
                    break;
                  case 7:
                    _e = {
                      t: "s",
                      v: de[ce = ce + Ne >>> 0]
                    };
                    break;
                  default:
                    throw "Cannot apply delta for QPW cell type " + (ke & 31);
                } else switch (ke & 31) {
                  case 1:
                    _e = {
                      t: "z"
                    };
                    break;
                  case 2:
                    _e = {
                      t: "n",
                      v: ie.read_shift(2)
                    };
                    break;
                  case 7:
                    _e = {
                      t: "s",
                      v: de[ce = ie.read_shift(4) - 1]
                    };
                    break;
                  default:
                    throw "Cannot apply repeat for QPW cell type " + (ke & 31);
                }
                !q.sheetStubs && _e.t == "z" || (ne["!data"] != null ? (ne["!data"][X] || (ne["!data"][X] = []), ne["!data"][X][we] = _e) : ne[ge + Jc(X)] = _e), ++X, --pe;
              }
            }
          }
          break;
        case 3074:
          {
            we = ie.read_shift(2), X = ie.read_shift(4);
            var Ae = Y(ie);
            ne["!data"] != null ? (ne["!data"][X] || (ne["!data"][X] = []), ne["!data"][X][we] = {
              t: "s",
              v: Ae
            }) : ne[ic(we) + Jc(X)] = {
              t: "s",
              v: Ae
            };
          }
          break;
      }
      W.l += ye;
    }
    return Z;
  }
  return {
    sheet_to_wk1: a,
    book_to_wk3: i,
    to_workbook: t
  };
})();

function uKa(e) {
  var t = {},
    n = e.match(mw),
    r = 0,
    a = !1;
  if (n) for (; r != n.length; ++r) {
    var i = es(n[r]);
    switch (i[0].replace(/<\w*:/g, "<")) {
      case "<condense":
        break;
      case "<extend":
        break;
      case "<shadow":
        if (!i.val) break;
      case "<shadow>":
      case "<shadow/>":
        t.shadow = 1;
        break;
      case "</shadow>":
        break;
      case "<charset":
        if (i.val == "1") break;
        t.cp = gOt[parseInt(i.val, 10)];
        break;
      case "<outline":
        if (!i.val) break;
      case "<outline>":
      case "<outline/>":
        t.outline = 1;
        break;
      case "</outline>":
        break;
      case "<rFont":
        t.name = i.val;
        break;
      case "<sz":
        t.sz = i.val;
        break;
      case "<strike":
        if (!i.val) break;
      case "<strike>":
      case "<strike/>":
        t.strike = 1;
        break;
      case "</strike>":
        break;
      case "<u":
        if (!i.val) break;
        switch (i.val) {
          case "double":
            t.uval = "double";
            break;
          case "singleAccounting":
            t.uval = "single-accounting";
            break;
          case "doubleAccounting":
            t.uval = "double-accounting";
            break;
        }
      case "<u>":
      case "<u/>":
        t.u = 1;
        break;
      case "</u>":
        break;
      case "<b":
        if (i.val == "0") break;
      case "<b>":
      case "<b/>":
        t.b = 1;
        break;
      case "</b>":
        break;
      case "<i":
        if (i.val == "0") break;
      case "<i>":
      case "<i/>":
        t.i = 1;
        break;
      case "</i>":
        break;
      case "<color":
        i.rgb && (t.color = i.rgb.slice(2, 8));
        break;
      case "<color>":
      case "<color/>":
      case "</color>":
        break;
      case "<family":
        t.family = i.val;
        break;
      case "<family>":
      case "<family/>":
      case "</family>":
        break;
      case "<vertAlign":
        t.valign = i.val;
        break;
      case "<vertAlign>":
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<scheme":
        break;
      case "<scheme>":
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (i[0].charCodeAt(1) !== 47 && !a) throw new Error("Unrecognized rich format " + i[0]);
    }
  }
  return t;
}

var hKa = (function () {
    function e(r) {
      var a = Mv(r, "t");
      if (!a) return {
        t: "s",
        v: ""
      };
      var i = {
          t: "s",
          v: jd(a[1])
        },
        o = Mv(r, "rPr");
      return o && (i.s = uKa(o[1])), i;
    }
    var t = /<(?:\w+:)?r>/g,
      n = /<\/(?:\w+:)?r>/;
    return function (a) {
      return a.replace(t, "").split(n).map(e).filter(function (i) {
        return i.v;
      });
    };
  })(),
  pKa = (function () {
    var t = /(\r\n|\n)/g;
    function n(a, i, o) {
      var s = [];
      a.u && s.push("text-decoration: underline;"), a.uval && s.push("text-underline-style:" + a.uval + ";"), a.sz && s.push("font-size:" + a.sz + "pt;"), a.outline && s.push("text-effect: outline;"), a.shadow && s.push("text-shadow: auto;"), i.push('<span style="' + s.join("") + '">'), a.b && (i.push("<b>"), o.push("</b>")), a.i && (i.push("<i>"), o.push("</i>")), a.strike && (i.push("<s>"), o.push("</s>"));
      var l = a.valign || "";
      return l == "superscript" || l == "super" ? l = "sup" : l == "subscript" && (l = "sub"), l != "" && (i.push("<" + l + ">"), o.push("</" + l + ">")), o.push("</span>"), a;
    }
    function r(a) {
      var i = [[], a.v, []];
      return a.v ? (a.s && n(a.s, i[0], i[2]), i[0].join("") + i[1].replace(t, "<br/>") + i[2].join("")) : "";
    }
    return function (i) {
      return i.map(r).join("");
    };
  })(),
  mKa = /<(?:\w+:)?t\b[^<>]*>([^<]*)<\/(?:\w+:)?t>/g,
  fKa = /<(?:\w+:)?r\b[^<>]*>/;

function GOt(e, t) {
  var n = t ? t.cellHTML : !0,
    r = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (r.t = jd(Ch(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""), !0), r.r = Ch(e), n && (r.h = o1e(r.t))) : e.match(fKa) && (r.r = Ch(e), r.t = jd(Ch((XVa(e, "rPh").match(mKa) || []).join("").replace(mw, "")), !0), n && (r.h = pKa(hKa(r.r)))), r) : {
    t: ""
  };
}

var gKa = /<(?:\w+:)?(?:si|sstItem)>/g,
  yKa = /<\/(?:\w+:)?(?:si|sstItem)>/;

function bKa(e, t) {
  var n = [],
    r = "";
  if (!e) return n;
  var a = Mv(e, "sst");
  if (a) {
    r = a[1].replace(gKa, "").split(yKa);
    for (var i = 0; i != r.length; ++i) {
      var o = GOt(r[i].trim(), t);
      o != null && (n[n.length] = o);
    }
    a = es(a[0].slice(0, a[0].indexOf(">"))), n.Count = a.count, n.Unique = a.uniqueCount;
  }
  return n;
}

var vKa = /^\s|\s$|[\t\n\r]/;

function wKa(e, t) {
  if (!t.bookSST) return "";
  var n = [e0];
  n[n.length] = no("sst", null, {
    xmlns: HZ[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var r = 0; r != e.length; ++r) if (e[r] != null) {
    var a = e[r],
      i = "<si>";
    a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), typeof a.t != "string" && (a.t = String(a.t)), a.t.match(vKa) && (i += ' xml:space="preserve"'), i += ">" + xc(a.t) + "</t>"), i += "</si>", n[n.length] = i;
  }
  return n.length > 2 && (n[n.length] = "</sst>", n[1] = n[1].replace("/>", ">")), n.join("");
}

function xKa(e) {
  return [e.read_shift(4), e.read_shift(4)];
}

function _Ka(e, t) {
  var n = [],
    r = !1;
  return GD(e, function (i, o, s) {
    switch (s) {
      case 159:
        n.Count = i[0], n.Unique = i[1];
        break;
      case 19:
        n.push(i);
        break;
      case 160:
        return !0;
      case 35:
        r = !0;
        break;
      case 36:
        r = !1;
        break;
      default:
        if (o.T, !r || t.WTF) throw new Error("Unexpected record 0x" + s.toString(16));
    }
  }), n;
}

function kKa(e, t) {
  return t || (t = Ja(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}

var AKa = EHa;

function SKa(e) {
  var t = kx();
  Ei(t, 159, kKa(e));
  for (var n = 0; n < e.length; ++n) Ei(t, 19, AKa(e[n]));
  return Ei(t, 160), t.end();
}

function xrr(e) {
  if (typeof Rc < "u") return Rc.utils.encode(bJ, e);
  for (var t = [], n = e.split(""), r = 0; r < n.length; ++r) t[r] = n[r].charCodeAt(0);
  return t;
}

function dj(e, t) {
  var n = {};
  return n.Major = e.read_shift(2), n.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), n;
}

function IKa(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = dj(e, 4), t.U = dj(e, 4), t.W = dj(e, 4), t;
}

function CKa(e) {
  for (var t = e.read_shift(4), n = e.l + t - 4, r = {}, a = e.read_shift(4), i = []; a-- > 0;) i.push({
    t: e.read_shift(4),
    v: e.read_shift(0, "lpp4")
  });
  if (r.name = e.read_shift(0, "lpp4"), r.comps = i, e.l != n) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + n);
  return r;
}

function EKa(e) {
  var t = [];
  e.l += 4;
  for (var n = e.read_shift(4); n-- > 0;) t.push(CKa(e));
  return t;
}

function TKa(e) {
  var t = [];
  e.l += 4;
  for (var n = e.read_shift(4); n-- > 0;) t.push(e.read_shift(0, "lpp4"));
  return t;
}

function MKa(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = dj(e, 4), t.U = dj(e, 4), t.W = dj(e, 4), t;
}

function PKa(e) {
  var t = MKa(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}

function _rr(e, t) {
  var n = e.l + t,
    r = {};
  r.Flags = e.read_shift(4) & 63, e.l += 4, r.AlgID = e.read_shift(4);
  var a = !1;
  switch (r.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      a = r.Flags == 36;
      break;
    case 26625:
      a = r.Flags == 4;
      break;
    case 0:
      a = r.Flags == 16 || r.Flags == 4 || r.Flags == 36;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + r.AlgID;
  }
  if (!a) throw new Error("Encryption Flags/AlgID mismatch");
  return r.AlgIDHash = e.read_shift(4), r.KeySize = e.read_shift(4), r.ProviderType = e.read_shift(4), e.l += 8, r.CSPName = e.read_shift(n - e.l >> 1, "utf16le"), e.l = n, r;
}

function krr(e, t) {
  var n = {},
    r = e.l + t;
  return e.l += 4, n.Salt = e.slice(e.l, e.l + 16), e.l += 16, n.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), n.VerifierHash = e.slice(e.l, r), e.l = r, n;
}

function RKa(e) {
  var t = dj(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, NKa(e)];
    case 3:
      return [t.Minor, jKa()];
    case 4:
      return [t.Minor, DKa(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}

function NKa(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var n = e.read_shift(4),
    r = _rr(e, n),
    a = krr(e, e.length - e.l);
  return {
    t: "Std",
    h: r,
    v: a
  };
}

function jKa() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}

function DKa(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var n = e.read_shift(e.length - e.l, "utf8"),
    r = {};
  return n.replace(mw, function (i) {
    var o = es(i);
    switch (fI(o[0])) {
      case "<?xml":
        break;
      case "<encryption":
      case "</encryption>":
        break;
      case "<keyData":
        t.forEach(function (s) {
          r[s] = o[s];
        });
        break;
      case "<dataIntegrity":
        r.encryptedHmacKey = o.encryptedHmacKey, r.encryptedHmacValue = o.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        r.encs = [];
        break;
      case "</keyEncryptors>":
        break;
      case "<keyEncryptor":
        r.uri = o.uri;
        break;
      case "</keyEncryptor>":
        break;
      case "<encryptedKey":
        r.encs.push(o);
        break;
      default:
        throw o[0];
    }
  }), r;
}

function LKa(e, t) {
  var n = {},
    r = n.EncryptionVersionInfo = dj(e, 4);
  if (t -= 4, r.Minor != 2) throw new Error("unrecognized minor version code: " + r.Minor);
  if (r.Major > 4 || r.Major < 2) throw new Error("unrecognized major version code: " + r.Major);
  n.Flags = e.read_shift(4), t -= 4;
  var a = e.read_shift(4);
  return t -= 4, n.EncryptionHeader = _rr(e, a), t -= a, n.EncryptionVerifier = krr(e, t), n;
}

function OKa(e) {
  var t = {},
    n = t.EncryptionVersionInfo = dj(e, 4);
  if (n.Major != 1 || n.Minor != 1) throw "unrecognized version code " + n.Major + " : " + n.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}

function VOt(e) {
  var t = 0,
    n,
    r = xrr(e),
    a = r.length + 1,
    i,
    o,
    s,
    l,
    d;
  for (n = s$(a), n[0] = r.length, i = 1; i != a; ++i) n[i] = r[i - 1];
  for (i = a - 1; i >= 0; --i) o = n[i], s = (t & 16384) === 0 ? 0 : 1, l = t << 1 & 32767, d = s | l, t = d ^ o;
  return t ^ 52811;
}

var Arr = (function () {
    var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0],
      t = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163],
      n = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628],
      r = function (o) {
        return (o / 2 | o * 128) & 255;
      },
      a = function (o, s) {
        return r(o ^ s);
      },
      i = function (o) {
        for (var s = t[o.length - 1], l = 104, d = o.length - 1; d >= 0; --d) for (var u = o[d], h = 0; h != 7; ++h) u & 64 && (s ^= n[l]), u *= 2, --l;
        return s;
      };
    return function (o) {
      for (var s = xrr(o), l = i(s), d = s.length, u = s$(16), h = 0; h != 16; ++h) u[h] = 0;
      var p, m, f;
      for ((d & 1) === 1 && (p = l >> 8, u[d] = a(e[0], p), --d, p = l & 255, m = s[s.length - 1], u[d] = a(m, p)); d > 0;) --d, p = l >> 8, u[d] = a(s[d], p), --d, p = l & 255, u[d] = a(s[d], p);
      for (d = 15, f = 15 - s.length; f > 0;) p = l >> 8, u[d] = a(e[f], p), --d, --f, p = l & 255, u[d] = a(s[d], p), --d, --f;
      return u;
    };
  })(),
  BKa = function (e, t, n, r, a) {
    a || (a = t), r || (r = Arr(e));
    var i, o;
    for (i = 0; i != t.length; ++i) o = t[i], o ^= r[n], o = (o >> 5 | o << 3) & 255, a[i] = o, ++n;
    return [a, n, r];
  },
  FKa = function (e) {
    var t = 0,
      n = Arr(e);
    return function (r) {
      var a = BKa("", r, t, n);
      return t = a[1], a[0];
    };
  };

function zKa(e, t, n, r) {
  var a = {
    key: Rg(e),
    verificationBytes: Rg(e)
  };
  return n.password && (a.verifier = VOt(n.password)), r.valid = a.verificationBytes === a.verifier, r.valid && (r.insitu = FKa(n.password)), a;
}

function UKa(e, t, n) {
  var r = n || {};
  return r.Info = e.read_shift(2), e.l -= 2, r.Info === 1 ? r.Data = OKa(e) : r.Data = LKa(e, t), r;
}

function $Ka(e, t, n) {
  var r = {
    Type: n.biff >= 8 ? e.read_shift(2) : 0
  };
  return r.Type ? UKa(e, t - 2, r) : zKa(e, n.biff >= 8 ? t : t - 2, n, r), r;
}

function GKa(e, t) {
  switch (t.type) {
    case "base64":
      return q6e(_3(e), t);
    case "binary":
      return q6e(e, t);
    case "buffer":
      return q6e(Uc && Buffer.isBuffer(e) ? e.toString("binary") : GP(e), t);
    case "array":
      return q6e(wJ(e), t);
  }
  throw new Error("Unrecognized type " + t.type);
}

function q6e(e, t) {
  var n = t || {},
    r = {},
    a = n.dense;
  a && (r["!data"] = []);
  var i = kOt(e, "\\trowd", "\\row");
  if (!i) throw new Error("RTF missing table");
  var o = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: i.length - 1
      }
    },
    s = [];
  return i.forEach(function (l, d) {
    a && (s = r["!data"][d] = []);
    for (var u = /\\[\w\-]+\b/g, h = 0, p, m = -1, f = []; (p = u.exec(l)) != null;) {
      var y = l.slice(h, u.lastIndex - p[0].length);
      switch (y.charCodeAt(0) == 32 && (y = y.slice(1)), y.length && f.push(y), p[0]) {
        case "\\cell":
          if (++m, f.length) {
            var b = {
              v: f.join(""),
              t: "s"
            };
            b.v == "TRUE" || b.v == "FALSE" ? (b.v = b.v == "TRUE", b.t = "b") : isNaN(XS(b.v)) ? Lv[b.v] != null && (b.t = "e", b.w = b.v, b.v = Lv[b.v]) : (b.t = "n", n.cellText !== !1 && (b.w = b.v), b.v = XS(b.v)), a ? s[m] = b : r[Xc({
              r: d,
              c: m
            })] = b;
          }
          f = [];
          break;
        case "\\par":
          f.push(`
`);
          break;
      }
      h = u.lastIndex;
    }
    m > o.e.c && (o.e.c = m);
  }), r["!ref"] = Ac(o), r;
}

function VKa(e, t) {
  var n = mG(GKa(e, t), t);
  return n.bookType = "rtf", n;
}

function HKa(e, t) {
  var n = ["{\\rtf1\\ansi"];
  if (!e["!ref"]) return n[0] + "}";
  for (var r = wd(e["!ref"]), a, i = e["!data"] != null, o = [], s = r.s.r; s <= r.e.r; ++s) {
    n.push("\\trowd\\trautofit1");
    for (var l = r.s.c; l <= r.e.c; ++l) n.push("\\cellx" + (l + 1));
    for (n.push("\\pard\\intbl"), i && (o = e["!data"][s] || []), l = r.s.c; l <= r.e.c; ++l) {
      var d = Xc({
        r: s,
        c: l
      });
      if (a = i ? o[l] : e[d], !a || a.v == null && (!a.f || a.F)) {
        n.push(" \\cell");
        continue;
      }
      n.push(" " + (a.w || (VP(a), a.w) || "").replace(/[\r\n]/g, "\\par ")), n.push("\\cell");
    }
    n.push("\\pard\\intbl\\row");
  }
  return n.join("") + "}";
}

function WKa(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}

function wke(e) {
  for (var t = 0, n = 1; t != 3; ++t) n = n * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return n.toString(16).toUpperCase().slice(1);
}

function qKa(e) {
  var t = e[0] / 255,
    n = e[1] / 255,
    r = e[2] / 255,
    a = Math.max(t, n, r),
    i = Math.min(t, n, r),
    o = a - i;
  if (o === 0) return [0, 0, t];
  var s = 0,
    l = 0,
    d = a + i;
  switch (l = o / (d > 1 ? 2 - d : d), a) {
    case t:
      s = ((n - r) / o + 6) % 6;
      break;
    case n:
      s = (r - t) / o + 2;
      break;
    case r:
      s = (t - n) / o + 4;
      break;
  }
  return [s / 6, l, d / 2];
}

function KKa(e) {
  var t = e[0],
    n = e[1],
    r = e[2],
    a = n * 2 * (r < .5 ? r : 1 - r),
    i = r - a / 2,
    o = [i, i, i],
    s = 6 * t,
    l;
  if (n !== 0) switch (s | 0) {
    case 0:
    case 6:
      l = a * s, o[0] += a, o[1] += l;
      break;
    case 1:
      l = a * (2 - s), o[0] += l, o[1] += a;
      break;
    case 2:
      l = a * (s - 2), o[1] += a, o[2] += l;
      break;
    case 3:
      l = a * (4 - s), o[1] += l, o[2] += a;
      break;
    case 4:
      l = a * (s - 4), o[2] += a, o[0] += l;
      break;
    case 5:
      l = a * (6 - s), o[2] += l, o[0] += a;
      break;
  }
  for (var d = 0; d != 3; ++d) o[d] = Math.round(o[d] * 255);
  return o;
}

function Yze(e, t) {
  if (t === 0) return e;
  var n = qKa(WKa(e));
  return t < 0 ? n[2] = n[2] * (1 + t) : n[2] = 1 - (1 - n[2]) * (1 - t), wke(KKa(n));
}

var Srr = 6,
  QKa = 15,
  YKa = 1,
  ix = Srr;

function Pde(e) {
  return Math.floor((e + Math.round(128 / ix) / 256) * ix);
}

function xke(e) {
  return Math.floor((e - 5) / ix * 100 + .5) / 100;
}

function Xze(e) {
  return Math.round((e * ix + 5) / ix * 256) / 256;
}

function Vit(e) {
  return Xze(xke(Pde(e)));
}

function HOt(e) {
  var t = Math.abs(e - Vit(e)),
    n = ix;
  if (t > .005) for (ix = YKa; ix < QKa; ++ix) Math.abs(e - Vit(e)) <= t && (t = Math.abs(e - Vit(e)), n = ix);
  ix = n;
}

function cD(e) {
  e.width ? (e.wpx = Pde(e.width), e.wch = xke(e.wpx), e.MDW = ix) : e.wpx ? (e.wch = xke(e.wpx), e.width = Xze(e.wch), e.MDW = ix) : typeof e.wch == "number" && (e.width = Xze(e.wch), e.wpx = Pde(e.width), e.MDW = ix), e.customWidth && delete e.customWidth;
}

var XKa = 96,
  Irr = XKa;

function _ke(e) {
  return e * 96 / Irr;
}

function Rde(e) {
  return e * Irr / 96;
}

var JKa = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};

function ZKa(e, t, n, r) {
  t.Borders = [];
  var a = {},
    i = !1;
  (e.match(mw) || []).forEach(function (o) {
    var s = es(o);
    switch (fI(s[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        a = {}, s.diagonalUp && (a.diagonalUp = rh(s.diagonalUp)), s.diagonalDown && (a.diagonalDown = rh(s.diagonalDown)), t.Borders.push(a);
        break;
      case "</border>":
        break;
      case "<left/>":
        break;
      case "<left":
      case "<left>":
        break;
      case "</left>":
        break;
      case "<right/>":
        break;
      case "<right":
      case "<right>":
        break;
      case "</right>":
        break;
      case "<top/>":
        break;
      case "<top":
      case "<top>":
        break;
      case "</top>":
        break;
      case "<bottom/>":
        break;
      case "<bottom":
      case "<bottom>":
        break;
      case "</bottom>":
        break;
      case "<diagonal":
      case "<diagonal>":
      case "<diagonal/>":
        break;
      case "</diagonal>":
        break;
      case "<horizontal":
      case "<horizontal>":
      case "<horizontal/>":
        break;
      case "</horizontal>":
        break;
      case "<vertical":
      case "<vertical>":
      case "<vertical/>":
        break;
      case "</vertical>":
        break;
      case "<start":
      case "<start>":
      case "<start/>":
        break;
      case "</start>":
        break;
      case "<end":
      case "<end>":
      case "<end/>":
        break;
      case "</end>":
        break;
      case "<color":
      case "<color>":
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (r && r.WTF && !i) throw new Error("unrecognized " + s[0] + " in borders");
    }
  });
}

function eQa(e, t, n, r) {
  t.Fills = [];
  var a = {},
    i = !1;
  (e.match(mw) || []).forEach(function (o) {
    var s = es(o);
    switch (fI(s[0])) {
      case "<fills":
      case "<fills>":
      case "</fills>":
        break;
      case "<fill>":
      case "<fill":
      case "<fill/>":
        a = {}, t.Fills.push(a);
        break;
      case "</fill>":
        break;
      case "<gradientFill>":
        break;
      case "<gradientFill":
      case "</gradientFill>":
        t.Fills.push(a), a = {};
        break;
      case "<patternFill":
      case "<patternFill>":
        s.patternType && (a.patternType = s.patternType);
        break;
      case "<patternFill/>":
      case "</patternFill>":
        break;
      case "<bgColor":
        a.bgColor || (a.bgColor = {}), s.indexed && (a.bgColor.indexed = parseInt(s.indexed, 10)), s.theme && (a.bgColor.theme = parseInt(s.theme, 10)), s.tint && (a.bgColor.tint = parseFloat(s.tint)), s.rgb && (a.bgColor.rgb = s.rgb.slice(-6));
        break;
      case "<bgColor/>":
      case "</bgColor>":
        break;
      case "<fgColor":
        a.fgColor || (a.fgColor = {}), s.theme && (a.fgColor.theme = parseInt(s.theme, 10)), s.tint && (a.fgColor.tint = parseFloat(s.tint)), s.rgb != null && (a.fgColor.rgb = s.rgb.slice(-6));
        break;
      case "<fgColor/>":
      case "</fgColor>":
        break;
      case "<stop":
      case "<stop/>":
        break;
      case "</stop>":
        break;
      case "<color":
      case "<color/>":
        break;
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (r && r.WTF && !i) throw new Error("unrecognized " + s[0] + " in fills");
    }
  });
}

function tQa(e, t, n, r) {
  t.Fonts = [];
  var a = {},
    i = !1;
  (e.match(mw) || []).forEach(function (o) {
    var s = es(o);
    switch (fI(s[0])) {
      case "<fonts":
      case "<fonts>":
      case "</fonts>":
        break;
      case "<font":
      case "<font>":
        break;
      case "</font>":
      case "<font/>":
        t.Fonts.push(a), a = {};
        break;
      case "<name":
        s.val && (a.name = Ch(s.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        a.bold = s.val ? rh(s.val) : 1;
        break;
      case "<b/>":
        a.bold = 1;
        break;
      case "</b>":
      case "</b":
        break;
      case "<i":
        a.italic = s.val ? rh(s.val) : 1;
        break;
      case "<i/>":
        a.italic = 1;
        break;
      case "</i>":
      case "</i":
        break;
      case "<u":
        switch (s.val) {
          case "none":
            a.underline = 0;
            break;
          case "single":
            a.underline = 1;
            break;
          case "double":
            a.underline = 2;
            break;
          case "singleAccounting":
            a.underline = 33;
            break;
          case "doubleAccounting":
            a.underline = 34;
            break;
        }
        break;
      case "<u/>":
        a.underline = 1;
        break;
      case "</u>":
      case "</u":
        break;
      case "<strike":
        a.strike = s.val ? rh(s.val) : 1;
        break;
      case "<strike/>":
        a.strike = 1;
        break;
      case "</strike>":
      case "</strike":
        break;
      case "<outline":
        a.outline = s.val ? rh(s.val) : 1;
        break;
      case "<outline/>":
        a.outline = 1;
        break;
      case "</outline>":
      case "</outline":
        break;
      case "<shadow":
        a.shadow = s.val ? rh(s.val) : 1;
        break;
      case "<shadow/>":
        a.shadow = 1;
        break;
      case "</shadow>":
      case "</shadow":
        break;
      case "<condense":
        a.condense = s.val ? rh(s.val) : 1;
        break;
      case "<condense/>":
        a.condense = 1;
        break;
      case "</condense>":
      case "</condense":
        break;
      case "<extend":
        a.extend = s.val ? rh(s.val) : 1;
        break;
      case "<extend/>":
        a.extend = 1;
        break;
      case "</extend>":
      case "</extend":
        break;
      case "<sz":
        s.val && (a.sz = +s.val);
        break;
      case "<sz/>":
      case "</sz>":
      case "</sz":
        break;
      case "<vertAlign":
        s.val && (a.vertAlign = s.val);
        break;
      case "<vertAlign/>":
      case "</vertAlign>":
      case "</vertAlign":
        break;
      case "<family":
        s.val && (a.family = parseInt(s.val, 10));
        break;
      case "<family/>":
      case "</family>":
      case "</family":
        break;
      case "<scheme":
        s.val && (a.scheme = s.val);
        break;
      case "<scheme/>":
      case "</scheme>":
      case "</scheme":
        break;
      case "<charset":
        if (s.val == "1") break;
        s.codepage = gOt[parseInt(s.val, 10)];
        break;
      case "<charset/>":
      case "</charset>":
      case "</charset":
        break;
      case "<color":
        if (a.color || (a.color = {}), s.auto && (a.color.auto = rh(s.auto)), s.rgb) a.color.rgb = s.rgb.slice(-6);else if (s.indexed) {
          a.color.index = parseInt(s.indexed, 10);
          var l = jQ[a.color.index];
          a.color.index == 81 && (l = jQ[1]), l || (l = jQ[1]), a.color.rgb = l[0].toString(16) + l[1].toString(16) + l[2].toString(16);
        } else s.theme && (a.color.theme = parseInt(s.theme, 10), s.tint && (a.color.tint = parseFloat(s.tint)), s.theme && n.themeElements && n.themeElements.clrScheme && (a.color.rgb = Yze(n.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0)));
        break;
      case "<color/>":
      case "</color>":
      case "</color":
        break;
      case "<AlternateContent":
        i = !0;
        break;
      case "</AlternateContent>":
      case "</AlternateContent":
        i = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (r && r.WTF && !i) throw new Error("unrecognized " + s[0] + " in fonts");
    }
  });
}

function nQa(e, t, n) {
  t.NumberFmt = [];
  for (var r = Gm(Cs), a = 0; a < r.length; ++a) t.NumberFmt[r[a]] = Cs[r[a]];
  var i = e.match(mw);
  if (i) for (a = 0; a < i.length; ++a) {
    var o = es(i[a]);
    switch (fI(o[0])) {
      case "<numFmts":
      case "</numFmts>":
      case "<numFmts/>":
      case "<numFmts>":
        break;
      case "<numFmt":
        {
          var s = jd(Ch(o.formatCode)),
            l = parseInt(o.numFmtId, 10);
          if (t.NumberFmt[l] = s, l > 0) {
            if (l > 392) {
              for (l = 392; l > 60 && t.NumberFmt[l] != null; --l);
              t.NumberFmt[l] = s;
            }
            Fz(s, l);
          }
        }
        break;
      case "</numFmt>":
        break;
      default:
        if (n.WTF) throw new Error("unrecognized " + o[0] + " in numFmts");
    }
  }
}

function rQa(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (n) {
    for (var r = n[0]; r <= n[1]; ++r) e[r] != null && (t[t.length] = no("numFmt", null, {
      numFmtId: r,
      formatCode: xc(e[r])
    }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = no("numFmts", null, {
    count: t.length - 2
  }).replace("/>", ">"), t.join(""));
}

var K6e = ["numFmtId", "fillId", "fontId", "borderId", "xfId"],
  Q6e = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

function aQa(e, t, n) {
  t.CellXf = [];
  var r,
    a = !1;
  (e.match(mw) || []).forEach(function (i) {
    var o = es(i),
      s = 0;
    switch (fI(o[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
      case "<xf>":
        for (r = o, delete r[0], s = 0; s < K6e.length; ++s) r[K6e[s]] && (r[K6e[s]] = parseInt(r[K6e[s]], 10));
        for (s = 0; s < Q6e.length; ++s) r[Q6e[s]] && (r[Q6e[s]] = rh(r[Q6e[s]]));
        if (t.NumberFmt && r.numFmtId > 392) {
          for (s = 392; s > 60; --s) if (t.NumberFmt[r.numFmtId] == t.NumberFmt[s]) {
            r.numFmtId = s;
            break;
          }
        }
        t.CellXf.push(r);
        break;
      case "</xf>":
        break;
      case "<alignment":
      case "<alignment/>":
      case "<alignment>":
        var l = {};
        o.vertical && (l.vertical = o.vertical), o.horizontal && (l.horizontal = o.horizontal), o.textRotation != null && (l.textRotation = o.textRotation), o.indent && (l.indent = o.indent), o.wrapText && (l.wrapText = rh(o.wrapText)), r.alignment = l;
        break;
      case "</alignment>":
        break;
      case "<protection":
      case "<protection>":
        break;
      case "</protection>":
      case "<protection/>":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        a = !0;
        break;
      case "</AlternateContent>":
        a = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (n && n.WTF && !a) throw new Error("unrecognized " + o[0] + " in cellXfs");
    }
  });
}

function iQa(e) {
  var t = [];
  return t[t.length] = no("cellXfs", null), e.forEach(function (n) {
    t[t.length] = no("xf", null, n);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = no("cellXfs", null, {
    count: t.length - 2
  }).replace("/>", ">"), t.join(""));
}

var oQa = (function () {
  return function (n, r, a) {
    var i = {};
    if (!n) return i;
    n = _Ot(ACe(n, "<!--", "-->"));
    var o;
    return (o = Mv(n, "numFmts")) && nQa(o[0], i, a), (o = Mv(n, "fonts")) && tQa(o[0], i, r, a), (o = Mv(n, "fills")) && eQa(o[0], i, r, a), (o = Mv(n, "borders")) && ZKa(o[0], i, r, a), (o = Mv(n, "cellXfs")) && aQa(o[0], i, a), i;
  };
})();

function sQa(e, t) {
  var n = [e0, no("styleSheet", null, {
      xmlns: HZ[0],
      "xmlns:vt": fb.vt
    })],
    r;
  return e.SSF && (r = rQa(e.SSF)) != null && (n[n.length] = r), n[n.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', n[n.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', n[n.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', n[n.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (r = iQa(t.cellXfs)) && (n[n.length] = r), n[n.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', n[n.length] = '<dxfs count="0"/>', n[n.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', n.length > 2 && (n[n.length] = "</styleSheet>", n[1] = n[1].replace("/>", ">")), n.join("");
}

function lQa(e, t) {
  var n = e.read_shift(2),
    r = Ax(e);
  return [n, r];
}

function cQa(e, t, n) {
  n || (n = Ja(6 + 4 * t.length)), n.write_shift(2, e), kb(t, n);
  var r = n.length > n.l ? n.slice(0, n.l) : n;
  return n.l == null && (n.l = n.length), r;
}

function dQa(e, t, n) {
  var r = {};
  r.sz = e.read_shift(2) / 20;
  var a = DHa(e);
  a.fItalic && (r.italic = 1), a.fCondense && (r.condense = 1), a.fExtend && (r.extend = 1), a.fShadow && (r.shadow = 1), a.fOutline && (r.outline = 1), a.fStrikeout && (r.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (r.bold = 1), e.read_shift(2)) {
    case 1:
      r.vertAlign = "superscript";
      break;
    case 2:
      r.vertAlign = "subscript";
      break;
  }
  var o = e.read_shift(1);
  o != 0 && (r.underline = o);
  var s = e.read_shift(1);
  s > 0 && (r.family = s);
  var l = e.read_shift(1);
  switch (l > 0 && (r.charset = l), e.l++, r.color = jHa(e), e.read_shift(1)) {
    case 1:
      r.scheme = "major";
      break;
    case 2:
      r.scheme = "minor";
      break;
  }
  return r.name = Ax(e), r;
}

function uQa(e, t) {
  t || (t = Ja(153)), t.write_shift(2, e.sz * 20), LHa(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var n = 0;
  e.vertAlign == "superscript" ? n = 1 : e.vertAlign == "subscript" && (n = 2), t.write_shift(2, n), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), qze(e.color, t);
  var r = 0;
  return r = 2, t.write_shift(1, r), kb(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}

var hQa = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"],
  Hit,
  pQa = Rx;

function aon(e, t) {
  t || (t = Ja(84)), Hit || (Hit = LXe(hQa));
  var n = Hit[e.patternType];
  n == null && (n = 40), t.write_shift(4, n);
  var r = 0;
  if (n != 40) for (qze({
    auto: 1
  }, t), qze({
    auto: 1
  }, t); r < 12; ++r) t.write_shift(4, 0);else {
    for (; r < 4; ++r) t.write_shift(4, 0);
    for (; r < 12; ++r) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}

function mQa(e, t) {
  var n = e.l + t,
    r = e.read_shift(2),
    a = e.read_shift(2);
  return e.l = n, {
    ixfe: r,
    numFmtId: a
  };
}

function Crr(e, t, n) {
  n || (n = Ja(16)), n.write_shift(2, t || 0), n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(1, 0), n.write_shift(1, 0);
  var r = 0;
  return n.write_shift(1, r), n.write_shift(1, 0), n.write_shift(1, 0), n.write_shift(1, 0), n;
}

function vfe(e, t) {
  return t || (t = Ja(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}

var fQa = Rx;

function gQa(e, t) {
  return t || (t = Ja(51)), t.write_shift(1, 0), vfe(null, t), vfe(null, t), vfe(null, t), vfe(null, t), vfe(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}

function yQa(e, t) {
  return t || (t = Ja(52)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), bke(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}

function bQa(e, t, n) {
  var r = Ja(2052);
  return r.write_shift(4, e), bke(t, r), bke(n, r), r.length > r.l ? r.slice(0, r.l) : r;
}

function vQa(e, t, n) {
  var r = {};
  r.NumberFmt = [];
  for (var a in Cs) r.NumberFmt[a] = Cs[a];
  r.CellXf = [], r.Fonts = [];
  var i = [],
    o = !1;
  return GD(e, function (l, d, u) {
    switch (u) {
      case 44:
        r.NumberFmt[l[0]] = l[1], Fz(l[1], l[0]);
        break;
      case 43:
        r.Fonts.push(l), l.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (l.color.rgb = Yze(t.themeElements.clrScheme[l.color.theme].rgb, l.color.tint || 0));
        break;
      case 1025:
        break;
      case 45:
        break;
      case 46:
        break;
      case 47:
        i[i.length - 1] == 617 && r.CellXf.push(l);
        break;
      case 48:
      case 507:
      case 572:
      case 475:
        break;
      case 1171:
      case 2102:
      case 1130:
      case 512:
      case 2095:
      case 3072:
        break;
      case 35:
        o = !0;
        break;
      case 36:
        o = !1;
        break;
      case 37:
        i.push(u), o = !0;
        break;
      case 38:
        i.pop(), o = !1;
        break;
      default:
        if (d.T > 0) i.push(u);else if (d.T < 0) i.pop();else if (!o || n.WTF && i[i.length - 1] != 37) throw new Error("Unexpected record 0x" + u.toString(16));
    }
  }), r;
}

function wQa(e, t) {
  if (t) {
    var n = 0;
    [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (r) {
      for (var a = r[0]; a <= r[1]; ++a) t[a] != null && ++n;
    }), n != 0 && (Ei(e, 615, zE(n)), [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (r) {
      for (var a = r[0]; a <= r[1]; ++a) t[a] != null && Ei(e, 44, cQa(a, t[a]));
    }), Ei(e, 616));
  }
}

function xQa(e) {
  var t = 1;
  Ei(e, 611, zE(t)), Ei(e, 43, uQa({
    sz: 12,
    color: {
      theme: 1
    },
    name: "Calibri",
    family: 2
  })), Ei(e, 612);
}

function _Qa(e) {
  var t = 2;
  Ei(e, 603, zE(t)), Ei(e, 45, aon({
    patternType: "none"
  })), Ei(e, 45, aon({
    patternType: "gray125"
  })), Ei(e, 604);
}

function kQa(e) {
  var t = 1;
  Ei(e, 613, zE(t)), Ei(e, 46, gQa()), Ei(e, 614);
}

function AQa(e) {
  var t = 1;
  Ei(e, 626, zE(t)), Ei(e, 47, Crr({
    numFmtId: 0
  }, 65535)), Ei(e, 627);
}

function SQa(e, t) {
  Ei(e, 617, zE(t.length)), t.forEach(function (n) {
    Ei(e, 47, Crr(n, 0));
  }), Ei(e, 618);
}

function IQa(e) {
  var t = 1;
  Ei(e, 619, zE(t)), Ei(e, 48, yQa({
    xfId: 0,
    name: "Normal"
  })), Ei(e, 620);
}

function CQa(e) {
  var t = 0;
  Ei(e, 505, zE(t)), Ei(e, 506);
}

function EQa(e) {
  var t = 0;
  Ei(e, 508, bQa(t, "TableStyleMedium9", "PivotStyleMedium4")), Ei(e, 509);
}

function TQa(e, t) {
  var n = kx();
  return Ei(n, 278), wQa(n, e.SSF), xQa(n), _Qa(n), kQa(n), AQa(n), SQa(n, t.cellXfs), IQa(n), CQa(n), EQa(n), Ei(n, 279), n.end();
}

var MQa = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>", "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"];

function PQa(e, t, n) {
  t.themeElements.clrScheme = [];
  var r = {};
  (e[0].match(mw) || []).forEach(function (a) {
    var i = es(a);
    switch (i[0]) {
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      case "<a:srgbClr":
        r.rgb = i.val;
        break;
      case "</a:srgbClr>":
        break;
      case "<a:sysClr":
        r.rgb = i.lastClr;
        break;
      case "</a:sysClr>":
        break;
      case "</a:dk1>":
      case "</a:lt1>":
      case "<a:dk1>":
      case "<a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[MQa.indexOf(i[0])] = r, r = {}) : r.name = i[0].slice(3, i[0].length - 1);
        break;
      default:
        if (n && n.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme");
    }
  });
}

function RQa(e, t, n) {
  t.themeElements = {};
  var r;
  if (!(r = NQ(e, "a:clrScheme"))) throw new Error("clrScheme not found in themeElements");
  if (PQa(r, t, n), !(r = NQ(e, "a:fontScheme"))) throw new Error("fontScheme not found in themeElements");
  if (!(r = NQ(e, "a:fmtScheme"))) throw new Error("fmtScheme not found in themeElements");
}

function Err(e, t) {
  (!e || e.length === 0) && (e = WOt());
  var n,
    r = {};
  if (!(n = NQ(e, "a:themeElements"))) throw new Error("themeElements not found in theme");
  return RQa(n[0], r, t), r.raw = e, r;
}

function WOt(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var n = [e0];
  return n[n.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', n[n.length] = "<a:themeElements>", n[n.length] = '<a:clrScheme name="Office">', n[n.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', n[n.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', n[n.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', n[n.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', n[n.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', n[n.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', n[n.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', n[n.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', n[n.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', n[n.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', n[n.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', n[n.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', n[n.length] = "</a:clrScheme>", n[n.length] = '<a:fontScheme name="Office">', n[n.length] = "<a:majorFont>", n[n.length] = '<a:latin typeface="Cambria"/>', n[n.length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', n[n.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', n[n.length] = '<a:font script="Hans" typeface="宋体"/>', n[n.length] = '<a:font script="Hant" typeface="新細明體"/>', n[n.length] = '<a:font script="Arab" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Thai" typeface="Tahoma"/>', n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>', n[n.length] = '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] = '<a:font script="Gujr" typeface="Shruti"/>', n[n.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', n[n.length] = '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>', n[n.length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] = '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n.length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] = '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] = '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] = '<a:font script="Viet" typeface="Times New Roman"/>', n[n.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] = '<a:font script="Geor" typeface="Sylfaen"/>', n[n.length] = "</a:majorFont>", n[n.length] = "<a:minorFont>", n[n.length] = '<a:latin typeface="Calibri"/>', n[n.length] = '<a:ea typeface=""/>', n[n.length] = '<a:cs typeface=""/>', n[n.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', n[n.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', n[n.length] = '<a:font script="Hans" typeface="宋体"/>', n[n.length] = '<a:font script="Hant" typeface="新細明體"/>', n[n.length] = '<a:font script="Arab" typeface="Arial"/>', n[n.length] = '<a:font script="Hebr" typeface="Arial"/>', n[n.length] = '<a:font script="Thai" typeface="Tahoma"/>', n[n.length] = '<a:font script="Ethi" typeface="Nyala"/>', n[n.length] = '<a:font script="Beng" typeface="Vrinda"/>', n[n.length] = '<a:font script="Gujr" typeface="Shruti"/>', n[n.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', n[n.length] = '<a:font script="Knda" typeface="Tunga"/>', n[n.length] = '<a:font script="Guru" typeface="Raavi"/>', n[n.length] = '<a:font script="Cans" typeface="Euphemia"/>', n[n.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', n[n.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', n[n.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', n[n.length] = '<a:font script="Thaa" typeface="MV Boli"/>', n[n.length] = '<a:font script="Deva" typeface="Mangal"/>', n[n.length] = '<a:font script="Telu" typeface="Gautami"/>', n[n.length] = '<a:font script="Taml" typeface="Latha"/>', n[n.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', n[n.length] = '<a:font script="Orya" typeface="Kalinga"/>', n[n.length] = '<a:font script="Mlym" typeface="Kartika"/>', n[n.length] = '<a:font script="Laoo" typeface="DokChampa"/>', n[n.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', n[n.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', n[n.length] = '<a:font script="Viet" typeface="Arial"/>', n[n.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', n[n.length] = '<a:font script="Geor" typeface="Sylfaen"/>', n[n.length] = "</a:minorFont>", n[n.length] = "</a:fontScheme>", n[n.length] = '<a:fmtScheme name="Office">', n[n.length] = "<a:fillStyleLst>", n[n.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="1"/>', n[n.length] = "</a:gradFill>", n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:lin ang="16200000" scaled="0"/>', n[n.length] = "</a:gradFill>", n[n.length] = "</a:fillStyleLst>", n[n.length] = "<a:lnStyleLst>", n[n.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', n[n.length] = "</a:lnStyleLst>", n[n.length] = "<a:effectStyleLst>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', n[n.length] = "</a:effectLst>", n[n.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', n[n.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', n[n.length] = "</a:effectStyle>", n[n.length] = "</a:effectStyleLst>", n[n.length] = "<a:bgFillStyleLst>", n[n.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', n[n.length] = "</a:gradFill>", n[n.length] = '<a:gradFill rotWithShape="1">', n[n.length] = "<a:gsLst>", n[n.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', n[n.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', n[n.length] = "</a:gsLst>", n[n.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', n[n.length] = "</a:gradFill>", n[n.length] = "</a:bgFillStyleLst>", n[n.length] = "</a:fmtScheme>", n[n.length] = "</a:themeElements>", n[n.length] = "<a:objectDefaults>", n[n.length] = "<a:spDef>", n[n.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', n[n.length] = "</a:spDef>", n[n.length] = "<a:lnDef>", n[n.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', n[n.length] = "</a:lnDef>", n[n.length] = "</a:objectDefaults>", n[n.length] = "<a:extraClrSchemeLst/>", n[n.length] = "</a:theme>", n.join("");
}

function NQa(e, t, n) {
  var r = e.l + t,
    a = e.read_shift(4);
  if (a !== 124226) {
    if (!n.cellStyles) {
      e.l = r;
      return;
    }
    var i = e.slice(e.l);
    e.l = r;
    var o;
    try {
      o = Cnr(i, {
        type: "array"
      });
    } catch {
      return;
    }
    var s = T2(o, "theme/theme/theme1.xml", !0);
    if (s) return Err(s, n);
  }
}

function jQa(e) {
  return e.read_shift(4);
}

function DQa(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = LQa(e, 4);
      break;
    case 2:
      t.xclrValue = crr(e);
      break;
    case 3:
      t.xclrValue = jQa(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}

function LQa(e, t) {
  return Rx(e, t);
}

function OQa(e, t) {
  return Rx(e, t);
}

function BQa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2) - 4,
    r = [t];
  switch (t) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      r[1] = DQa(e);
      break;
    case 6:
      r[1] = OQa(e, n);
      break;
    case 14:
    case 15:
      r[1] = e.read_shift(n === 1 ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + t + " " + n);
  }
  return r;
}

function FQa(e, t) {
  var n = e.l + t;
  e.l += 2;
  var r = e.read_shift(2);
  e.l += 2;
  for (var a = e.read_shift(2), i = []; a-- > 0;) i.push(BQa(e, n - e.l));
  return {
    ixfe: r,
    ext: i
  };
}

function zQa(e, t) {
  t.forEach(function (n) {
    n[0];
  });
}

function UQa(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ax(e)
  };
}

function $Qa(e) {
  var t = Ja(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), kb(e.name, t), t.slice(0, t.l);
}

function GQa(e) {
  for (var t = [], n = e.read_shift(4); n-- > 0;) t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}

function VQa(e) {
  var t = Ja(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var n = 0; n < e.length; ++n) t.write_shift(4, e[n][0]), t.write_shift(4, e[n][1]);
  return t;
}

function HQa(e, t) {
  var n = Ja(8 + 2 * t.length);
  return n.write_shift(4, e), kb(t, n), n.slice(0, n.l);
}

function WQa(e) {
  return e.l += 4, e.read_shift(4) != 0;
}

function qQa(e, t) {
  var n = Ja(8);
  return n.write_shift(4, e), n.write_shift(4, 1), n;
}

function KQa(e, t, n) {
  var r = {
      Types: [],
      Cell: [],
      Value: []
    },
    a = n || {},
    i = [],
    o = !1,
    s = 2;
  return GD(e, function (l, d, u) {
    switch (u) {
      case 335:
        r.Types.push({
          name: l.name
        });
        break;
      case 51:
        l.forEach(function (h) {
          s == 1 ? r.Cell.push({
            type: r.Types[h[0] - 1].name,
            index: h[1]
          }) : s == 0 && r.Value.push({
            type: r.Types[h[0] - 1].name,
            index: h[1]
          });
        });
        break;
      case 337:
        s = l ? 1 : 0;
        break;
      case 338:
        s = 2;
        break;
      case 35:
        i.push(u), o = !0;
        break;
      case 36:
        i.pop(), o = !1;
        break;
      default:
        if (!d.T) {
          if (!o || a.WTF && i[i.length - 1] != 35) throw new Error("Unexpected record 0x" + u.toString(16));
        }
    }
  }), r;
}

function QQa() {
  var e = kx();
  return Ei(e, 332), Ei(e, 334, zE(1)), Ei(e, 335, $Qa({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), Ei(e, 336), Ei(e, 339, HQa(1, "XLDAPR")), Ei(e, 52), Ei(e, 35, zE(514)), Ei(e, 4096, zE(0)), Ei(e, 4097, V4(1)), Ei(e, 36), Ei(e, 53), Ei(e, 340), Ei(e, 337, qQa(1)), Ei(e, 51, VQa([[1, 0]])), Ei(e, 338), Ei(e, 333), e.end();
}

function YQa(e, t, n) {
  var r = {
    Types: [],
    Cell: [],
    Value: []
  };
  if (!e) return r;
  var a = !1,
    i = 2,
    o;
  return e.replace(mw, function (s) {
    var l = es(s);
    switch (fI(l[0])) {
      case "<?xml":
        break;
      case "<metadata":
      case "</metadata>":
        break;
      case "<metadataTypes":
      case "</metadataTypes>":
        break;
      case "<metadataType":
        r.Types.push({
          name: l.name
        });
        break;
      case "</metadataType>":
        break;
      case "<futureMetadata":
        for (var d = 0; d < r.Types.length; ++d) r.Types[d].name == l.name && (o = r.Types[d]);
        break;
      case "</futureMetadata>":
        break;
      case "<bk>":
        break;
      case "</bk>":
        break;
      case "<rc":
        i == 1 ? r.Cell.push({
          type: r.Types[l.t - 1].name,
          index: +l.v
        }) : i == 0 && r.Value.push({
          type: r.Types[l.t - 1].name,
          index: +l.v
        });
        break;
      case "</rc>":
        break;
      case "<cellMetadata":
        i = 1;
        break;
      case "</cellMetadata>":
        i = 2;
        break;
      case "<valueMetadata":
        i = 0;
        break;
      case "</valueMetadata>":
        i = 2;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      case "<rvb":
        if (!o) break;
        o.offsets || (o.offsets = []), o.offsets.push(+l.i);
        break;
      default:
        if (!a && (n != null && n.WTF)) throw new Error("unrecognized " + l[0] + " in metadata");
    }
    return s;
  }), r;
}

function XQa() {
  var e = [e0];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}

function JQa(e) {
  var t = [];
  if (!e) return t;
  var n = 1;
  return (e.match(mw) || []).forEach(function (r) {
    var a = es(r);
    switch (a[0]) {
      case "<?xml":
        break;
      case "<calcChain":
      case "<calcChain>":
      case "</calcChain>":
        break;
      case "<c":
        delete a[0], a.i ? n = a.i : a.i = n, t.push(a);
        break;
    }
  }), t;
}

function ZQa(e) {
  var t = {};
  t.i = e.read_shift(4);
  var n = {};
  n.r = e.read_shift(4), n.c = e.read_shift(4), t.r = Xc(n);
  var r = e.read_shift(1);
  return r & 2 && (t.l = "1"), r & 8 && (t.a = "1"), t;
}

function eYa(e, t, n) {
  var r = [];
  return GD(e, function (i, o, s) {
    switch (s) {
      case 63:
        r.push(i);
        break;
      default:
        if (!o.T) throw new Error("Unexpected record 0x" + s.toString(16));
    }
  }), r;
}

function tYa(e, t, n, r) {
  if (!e) return e;
  var a = r || {},
    i = !1;
  GD(e, function (s, l, d) {
    switch (d) {
      case 359:
      case 363:
      case 364:
      case 366:
      case 367:
      case 368:
      case 369:
      case 370:
      case 371:
      case 472:
      case 577:
      case 578:
      case 579:
      case 580:
      case 581:
      case 582:
      case 583:
      case 584:
      case 585:
      case 586:
      case 587:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      default:
        if (!l.T) {
          if (!i || a.WTF) throw new Error("Unexpected record 0x" + d.toString(16));
        }
    }
  }, a);
}

function nYa(e, t) {
  if (!e) return "??";
  var n = (e.match(/<c:chart [^<>]*r:id="([^<>"]*)"/) || ["", ""])[1];
  return t["!id"][n].Target;
}

function rYa(e, t, n) {
  var r = 0;
  (Anr(e, "shape") || []).forEach(function (a) {
    var i = "",
      o = !0,
      s = -1,
      l = -1,
      d = -1;
    switch (a.replace(mw, function (h, p) {
      var m = es(h);
      switch (fI(m[0])) {
        case "<ClientData":
          m.ObjectType && (i = m.ObjectType);
          break;
        case "<Visible":
        case "<Visible/>":
          o = !1;
          break;
        case "<Row":
        case "<Row>":
          s = p + h.length;
          break;
        case "</Row>":
          l = +a.slice(s, p).trim();
          break;
        case "<Column":
        case "<Column>":
          s = p + h.length;
          break;
        case "</Column>":
          d = +a.slice(s, p).trim();
          break;
      }
      return "";
    }), i) {
      case "Note":
        var u = Cke(t, l >= 0 && d >= 0 ? Xc({
          r: l,
          c: d
        }) : n[r].ref);
        u.c && (u.c.hidden = o), ++r;
        break;
    }
  });
}

function Trr(e, t, n) {
  var r = [21600, 21600],
    a = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","),
    i = [no("xml", null, {
      "xmlns:v": hb.v,
      "xmlns:o": hb.o,
      "xmlns:x": hb.x,
      "xmlns:mv": hb.mv
    }).replace(/\/>/, ">"), no("o:shapelayout", no("o:idmap", null, {
      "v:ext": "edit",
      data: e
    }), {
      "v:ext": "edit"
    })],
    o = 65536 * e,
    s = t || [];
  return s.length > 0 && i.push(no("v:shapetype", [no("v:stroke", null, {
    joinstyle: "miter"
  }), no("v:path", null, {
    gradientshapeok: "t",
    "o:connecttype": "rect"
  })].join(""), {
    id: "_x0000_t202",
    coordsize: r.join(","),
    "o:spt": 202,
    path: a
  })), s.forEach(function (l) {
    ++o, i.push(aYa(l, o));
  }), i.push("</xml>"), i.join("");
}

function aYa(e, t, n) {
  var r = Eh(e[0]),
    a = {
      color2: "#BEFF82",
      type: "gradient"
    };
  a.type == "gradient" && (a.angle = "-180");
  var i = a.type == "gradient" ? no("o:fill", null, {
      type: "gradientUnscaled",
      "v:ext": "view"
    }) : null,
    o = no("v:fill", i, a),
    s = {
      on: "t",
      obscured: "t"
    };
  return ["<v:shape" + _J({
    id: "_x0000_s" + t,
    type: "#_x0000_t202",
    style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (e[1].hidden ? ";visibility:hidden" : ""),
    fillcolor: "#ECFAD4",
    strokecolor: "#edeaa1"
  }) + ">", o, no("v:shadow", null, s), no("v:path", null, {
    "o:connecttype": "none"
  }), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", z1("x:Anchor", [r.c + 1, 0, r.r + 1, 0, r.c + 3, 20, r.r + 5, 20].join(",")), z1("x:AutoFill", "False"), z1("x:Row", String(r.r)), z1("x:Column", String(r.c)), e[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"].join("");
}

function ion(e, t, n, r) {
  var a = e["!data"] != null,
    i;
  t.forEach(function (o) {
    var s = Eh(o.ref);
    if (!(s.r < 0 || s.c < 0)) {
      if (a ? (e["!data"][s.r] || (e["!data"][s.r] = []), i = e["!data"][s.r][s.c]) : i = e[o.ref], !i) {
        i = {
          t: "z"
        }, a ? e["!data"][s.r][s.c] = i : e[o.ref] = i;
        var l = wd(e["!ref"] || "BDWGO1000001:A1");
        l.s.r > s.r && (l.s.r = s.r), l.e.r < s.r && (l.e.r = s.r), l.s.c > s.c && (l.s.c = s.c), l.e.c < s.c && (l.e.c = s.c);
        var d = Ac(l);
        e["!ref"] = d;
      }
      i.c || (i.c = []);
      var u = {
        a: o.author,
        t: o.t,
        r: o.r,
        T: n
      };
      o.h && (u.h = o.h);
      for (var h = i.c.length - 1; h >= 0; --h) {
        if (!n && i.c[h].T) return;
        n && !i.c[h].T && i.c.splice(h, 1);
      }
      if (n && r) {
        for (h = 0; h < r.length; ++h) if (u.a == r[h].id) {
          u.a = r[h].name || u.a;
          break;
        }
      }
      i.c.push(u);
    }
  });
}

function iYa(e, t) {
  if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
  var n = [],
    r = [],
    a = Mv(e, "authors");
  a && a[1] && a[1].split(/<\/\w*:?author>/).forEach(function (o) {
    if (!(o === "" || o.trim() === "")) {
      var s = o.match(/<(?:\w+:)?author[^<>]*>(.*)/);
      s && n.push(s[1]);
    }
  });
  var i = Mv(e, "commentList");
  return i && i[1] && i[1].split(/<\/\w*:?comment>/).forEach(function (o) {
    if (!(o === "" || o.trim() === "")) {
      var s = o.match(/<(?:\w+:)?comment[^<>]*>/);
      if (s) {
        var l = es(s[0]),
          d = {
            author: l.authorId && n[l.authorId] || "sheetjsghost",
            ref: l.ref,
            guid: l.guid
          },
          u = Eh(l.ref);
        if (!(t.sheetRows && t.sheetRows <= u.r)) {
          var h = Mv(o, "text"),
            p = !!h && !!h[1] && GOt(h[1]) || {
              r: "",
              t: "",
              h: ""
            };
          d.r = p.r, p.r == "<t></t>" && (p.t = p.h = ""), d.t = (p.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (d.h = p.h), r.push(d);
        }
      }
    }
  }), r;
}

function oYa(e) {
  var t = [e0, no("comments", null, {
      xmlns: HZ[0]
    })],
    n = [];
  return t.push("<authors>"), e.forEach(function (r) {
    r[1].forEach(function (a) {
      var i = xc(a.a);
      n.indexOf(i) == -1 && (n.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && n.indexOf("tc=" + a.ID) == -1 && (n.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), n.length == 0 && (n.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function (r) {
    var a = 0,
      i = [],
      o = 0;
    if (r[1][0] && r[1][0].T && r[1][0].ID && (a = n.indexOf("tc=" + r[1][0].ID)), r[1].forEach(function (d) {
      d.a && (a = n.indexOf(xc(d.a))), d.T && ++o, i.push(d.t == null ? "" : xc(d.t));
    }), o === 0) r[1].forEach(function (d) {
      t.push('<comment ref="' + r[0] + '" authorId="' + n.indexOf(xc(d.a)) + '"><text>'), t.push(z1("t", d.t == null ? "" : xc(d.t))), t.push("</text></comment>");
    });else {
      r[1][0] && r[1][0].T && r[1][0].ID && (a = n.indexOf("tc=" + r[1][0].ID)), t.push('<comment ref="' + r[0] + '" authorId="' + a + '"><text>');
      for (var s = `Comment:
    ` + i[0] + `
`, l = 1; l < i.length; ++l) s += `Reply:
    ` + i[l] + `
`;
      t.push(z1("t", xc(s))), t.push("</text></comment>");
    }
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}

function sYa(e, t) {
  var n = [],
    r = !1,
    a = {},
    i = 0;
  return e.replace(mw, function (s, l) {
    var d = es(s);
    switch (fI(d[0])) {
      case "<?xml":
        break;
      case "<ThreadedComments":
        break;
      case "</ThreadedComments>":
        break;
      case "<threadedComment":
        a = {
          author: d.personId,
          guid: d.id,
          ref: d.ref,
          T: 1
        };
        break;
      case "</threadedComment>":
        a.t != null && n.push(a);
        break;
      case "<text>":
      case "<text":
        i = l + s.length;
        break;
      case "</text>":
        a.t = e.slice(i, l).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
        break;
      case "<mentions":
      case "<mentions>":
        r = !0;
        break;
      case "</mentions>":
        r = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        r = !0;
        break;
      case "</ext>":
        r = !1;
        break;
      default:
        if (!r && t.WTF) throw new Error("unrecognized " + d[0] + " in threaded comments");
    }
    return s;
  }), n;
}

function Mrr(e, t, n) {
  var r = [e0, no("ThreadedComments", null, {
    xmlns: fb.TCMNT
  }).replace(/[\/]>/, ">")];
  return e.forEach(function (a) {
    var i = "";
    (a[1] || []).forEach(function (o, s) {
      if (!o.T) {
        delete o.ID;
        return;
      }
      o.a && t.indexOf(o.a) == -1 && t.push(o.a);
      var l = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + n.tcid++).slice(-12) + "}"
      };
      s == 0 ? i = l.id : l.parentId = i, o.ID = l.id, o.a && (l.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(o.a)).slice(-12) + "}"), r.push(no("threadedComment", z1("text", o.t || ""), l));
    });
  }), r.push("</ThreadedComments>"), r.join("");
}

function lYa(e, t) {
  var n = [],
    r = !1;
  return e.replace(mw, function (i) {
    var o = es(i);
    switch (fI(o[0])) {
      case "<?xml":
        break;
      case "<personList":
        break;
      case "</personList>":
        break;
      case "<person":
        n.push({
          name: o.displayname,
          id: o.id
        });
        break;
      case "</person>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        r = !0;
        break;
      case "</ext>":
        r = !1;
        break;
      default:
        if (!r && t.WTF) throw new Error("unrecognized " + o[0] + " in threaded comments");
    }
    return i;
  }), n;
}

function Prr(e) {
  var t = [e0, no("personList", null, {
    xmlns: fb.TCMNT,
    "xmlns:x": HZ[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function (n, r) {
    t.push(no("person", null, {
      displayName: n,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + r).slice(-12) + "}",
      userId: n,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}

function cYa(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var n = QZ(e);
  return t.rfx = n.s, t.ref = Xc(n.s), e.l += 16, t;
}

function dYa(e, t) {
  return t == null && (t = Ja(36)), t.write_shift(4, e[1].iauthor), _pe(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}

var uYa = Ax;

function oon(e) {
  return kb(e.slice(0, 54));
}

function hYa(e, t) {
  var n = [],
    r = [],
    a = {},
    i = !1;
  return GD(e, function (s, l, d) {
    switch (d) {
      case 632:
        r.push(s);
        break;
      case 635:
        a = s;
        break;
      case 637:
        a.t = s.t, a.h = s.h, a.r = s.r;
        break;
      case 636:
        if (a.author = r[a.iauthor], delete a.iauthor, t.sheetRows && a.rfx && t.sheetRows <= a.rfx.r) break;
        a.t || (a.t = ""), delete a.rfx, n.push(a);
        break;
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!l.T) {
          if (!i || t.WTF) throw new Error("Unexpected record 0x" + d.toString(16));
        }
    }
  }), n;
}

function pYa(e) {
  var t = kx(),
    n = [];
  return Ei(t, 628), Ei(t, 630), e.forEach(function (r) {
    r[1].forEach(function (a) {
      n.indexOf(a.a) > -1 || (n.push(a.a.slice(0, 54)), Ei(t, 632, oon(a.a)), a.T && a.ID && n.indexOf("tc=" + a.ID) == -1 && (n.push("tc=" + a.ID), Ei(t, 632, oon("tc=" + a.ID))));
    });
  }), Ei(t, 631), Ei(t, 633), e.forEach(function (r) {
    r[1].forEach(function (a) {
      var i = -1;
      a.ID && (i = n.indexOf("tc=" + a.ID)), i == -1 && r[1][0].T && r[1][0].ID && (i = n.indexOf("tc=" + r[1][0].ID)), i == -1 && (i = n.indexOf(a.a)), a.iauthor = i;
      var o = {
        s: Eh(r[0]),
        e: Eh(r[0])
      };
      Ei(t, 635, dYa([o, a])), a.t && a.t.length > 0 && Ei(t, 637, MHa(a)), Ei(t, 636), delete a.iauthor;
    });
  }), Ei(t, 634), Ei(t, 629), t.end();
}

var mYa = "application/vnd.ms-office.vbaProject";

function fYa(e) {
  var t = Ds.utils.cfb_new({
    root: "R"
  });
  return e.FullPaths.forEach(function (n, r) {
    if (!(n.slice(-1) === "/" || !n.match(/_VBA_PROJECT_CUR/))) {
      var a = n.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      Ds.utils.cfb_add(t, a, e.FileIndex[r].content);
    }
  }), Ds.write(t);
}

function gYa(e, t) {
  t.FullPaths.forEach(function (n, r) {
    if (r != 0) {
      var a = n.replace(/^[\/]*[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Ds.utils.cfb_add(e, a, t.FileIndex[r].content);
    }
  });
}

var yYa = ["xlsb", "xlsm", "xlam", "biff8", "xla"];

function bYa() {
  return {
    "!type": "dialog"
  };
}

function vYa() {
  return {
    "!type": "dialog"
  };
}

function wYa() {
  return {
    "!type": "macro"
  };
}

function xYa() {
  return {
    "!type": "macro"
  };
}

var OQ = (function () {
    var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,
      t = {
        r: 0,
        c: 0
      };
    function n(r, a, i, o) {
      var s = !1,
        l = !1;
      i.length == 0 ? l = !0 : i.charAt(0) == "[" && (l = !0, i = i.slice(1, -1)), o.length == 0 ? s = !0 : o.charAt(0) == "[" && (s = !0, o = o.slice(1, -1));
      var d = i.length > 0 ? parseInt(i, 10) | 0 : 0,
        u = o.length > 0 ? parseInt(o, 10) | 0 : 0;
      return s ? u += t.c : --u, l ? d += t.r : --d, a + (s ? "" : "$") + ic(u) + (l ? "" : "$") + Jc(d);
    }
    return function (a, i) {
      return t = i, a.replace(e, n);
    };
  })(),
  GXe = /(^|[^._A-Z0-9])(\$?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])(\$?)(\d{1,7})(?![_.\(A-Za-z0-9])/g;

try {
  GXe = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
} catch {}

var CCe = (function () {
  return function (t, n) {
    return t.replace(GXe, function (r, a, i, o, s, l) {
      var d = DOt(o) - (i ? 0 : n.c),
        u = jOt(l) - (s ? 0 : n.r),
        h = s == "$" ? u + 1 : u == 0 ? "" : "[" + u + "]",
        p = i == "$" ? d + 1 : d == 0 ? "" : "[" + d + "]";
      return a + "R" + h + "C" + p;
    });
  };
})();

function Rrr(e, t) {
  return e.replace(GXe, function (n, r, a, i, o, s) {
    return r + (a == "$" ? a + i : ic(DOt(i) + t.c)) + (o == "$" ? o + s : Jc(jOt(s) + t.r));
  });
}

function son(e, t, n) {
  var r = Ty(t),
    a = r.s,
    i = Eh(n),
    o = {
      r: i.r - a.r,
      c: i.c - a.c
    };
  return Rrr(e, o);
}

function _Ya(e) {
  return e.length != 1;
}

function lon(e) {
  return e.replace(/_xlfn\./g, "");
}

function q0(e) {
  e.l += 1;
}

function l$(e, t) {
  var n = e.read_shift(2);
  return [n & 16383, n >> 14 & 1, n >> 15 & 1];
}

function Nrr(e, t, n) {
  var r = 2;
  if (n) {
    if (n.biff >= 2 && n.biff <= 5) return jrr(e);
    n.biff == 12 && (r = 4);
  }
  var a = e.read_shift(r),
    i = e.read_shift(r),
    o = l$(e),
    s = l$(e);
  return {
    s: {
      r: a,
      c: o[0],
      cRel: o[1],
      rRel: o[2]
    },
    e: {
      r: i,
      c: s[0],
      cRel: s[1],
      rRel: s[2]
    }
  };
}

function jrr(e) {
  var t = l$(e),
    n = l$(e),
    r = e.read_shift(1),
    a = e.read_shift(1);
  return {
    s: {
      r: t[0],
      c: r,
      cRel: t[1],
      rRel: t[2]
    },
    e: {
      r: n[0],
      c: a,
      cRel: n[1],
      rRel: n[2]
    }
  };
}

function kYa(e, t, n) {
  if (n.biff < 8) return jrr(e);
  var r = e.read_shift(n.biff == 12 ? 4 : 2),
    a = e.read_shift(n.biff == 12 ? 4 : 2),
    i = l$(e),
    o = l$(e);
  return {
    s: {
      r,
      c: i[0],
      cRel: i[1],
      rRel: i[2]
    },
    e: {
      r: a,
      c: o[0],
      cRel: o[1],
      rRel: o[2]
    }
  };
}

function Drr(e, t, n) {
  if (n && n.biff >= 2 && n.biff <= 5) return AYa(e);
  var r = e.read_shift(n && n.biff == 12 ? 4 : 2),
    a = l$(e);
  return {
    r,
    c: a[0],
    cRel: a[1],
    rRel: a[2]
  };
}

function AYa(e) {
  var t = l$(e),
    n = e.read_shift(1);
  return {
    r: t[0],
    c: n,
    cRel: t[1],
    rRel: t[2]
  };
}

function SYa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(2);
  return {
    r: t,
    c: n & 255,
    fQuoted: !!(n & 16384),
    cRel: n >> 15,
    rRel: n >> 15
  };
}

function IYa(e, t, n) {
  var r = n && n.biff ? n.biff : 8;
  if (r >= 2 && r <= 5) return CYa(e);
  var a = e.read_shift(r >= 12 ? 4 : 2),
    i = e.read_shift(2),
    o = (i & 16384) >> 14,
    s = (i & 32768) >> 15;
  if (i &= 16383, s == 1) for (; a > 524287;) a -= 1048576;
  if (o == 1) for (; i > 8191;) i = i - 16384;
  return {
    r: a,
    c: i,
    cRel: o,
    rRel: s
  };
}

function CYa(e) {
  var t = e.read_shift(2),
    n = e.read_shift(1),
    r = (t & 32768) >> 15,
    a = (t & 16384) >> 14;
  return t &= 16383, r == 1 && t >= 8192 && (t = t - 16384), a == 1 && n >= 128 && (n = n - 256), {
    r: t,
    c: n,
    cRel: a,
    rRel: r
  };
}

function EYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5,
    a = Nrr(e, n.biff >= 2 && n.biff <= 5 ? 6 : 8, n);
  return [r, a];
}

function TYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2, "i"),
    i = 8;
  if (n) switch (n.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var o = Nrr(e, i, n);
  return [r, a, o];
}

function MYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5;
  return e.l += n && n.biff > 8 ? 12 : n.biff < 8 ? 6 : 8, [r];
}

function PYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2),
    i = 8;
  if (n) switch (n.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [r, a];
}

function RYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5,
    a = kYa(e, t - 1, n);
  return [r, a];
}

function NYa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5;
  return e.l += n.biff == 2 ? 6 : n.biff == 12 ? 14 : 7, [r];
}

function con(e) {
  var t = e[e.l + 1] & 1,
    n = 1;
  return e.l += 4, [t, n];
}

function jYa(e, t, n) {
  e.l += 2;
  for (var r = e.read_shift(n && n.biff == 2 ? 1 : 2), a = [], i = 0; i <= r; ++i) a.push(e.read_shift(n && n.biff == 2 ? 1 : 2));
  return a;
}

function DYa(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}

function LYa(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}

function OYa(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}

function BYa(e, t, n) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += n && n.biff == 2 ? 3 : 4, [r];
}

function Lrr(e) {
  var t = e.read_shift(1),
    n = e.read_shift(1);
  return [t, n];
}

function FYa(e) {
  return e.read_shift(2), Lrr(e);
}

function zYa(e) {
  return e.read_shift(2), Lrr(e);
}

function UYa(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Drr(e, 0, n);
  return [r, a];
}

function $Ya(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = IYa(e, 0, n);
  return [r, a];
}

function GYa(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  n && n.biff == 5 && (e.l += 12);
  var i = Drr(e, 0, n);
  return [r, a, i];
}

function VYa(e, t, n) {
  var r = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(n && n.biff <= 3 ? 1 : 2);
  return [aJa[a], Frr[a], r];
}

function HYa(e, t, n) {
  var r = e[e.l++],
    a = e.read_shift(1),
    i = n && n.biff <= 3 ? [r == 88 ? -1 : 0, e.read_shift(1)] : WYa(e);
  return [a, (i[0] === 0 ? Frr : rJa)[i[1]]];
}

function WYa(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}

function qYa(e, t, n) {
  e.l += n && n.biff == 2 ? 3 : 4;
}

function KYa(e, t, n) {
  if (e.l++, n && n.biff == 12) return [e.read_shift(4, "i"), 0];
  var r = e.read_shift(2),
    a = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, a];
}

function QYa(e) {
  return e.l++, Mb[e.read_shift(1)];
}

function YYa(e) {
  return e.l++, e.read_shift(2);
}

function XYa(e) {
  return e.l++, e.read_shift(1) !== 0;
}

function JYa(e) {
  return e.l++, cx(e);
}

function ZYa(e, t, n) {
  return e.l++, Tde(e, t - 1, n);
}

function eXa(e, t) {
  var n = [e.read_shift(1)];
  if (t == 12) switch (n[0]) {
    case 2:
      n[0] = 4;
      break;
    case 4:
      n[0] = 16;
      break;
    case 0:
      n[0] = 1;
      break;
    case 1:
      n[0] = 2;
      break;
  }
  switch (n[0]) {
    case 4:
      n[1] = m0(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      n[1] = Mb[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      n[1] = cx(e);
      break;
    case 2:
      n[1] = YZ(e, 0, {
        biff: t > 0 && t < 8 ? 2 : t
      });
      break;
    default:
      throw new Error("Bad SerAr: " + n[0]);
  }
  return n;
}

function tXa(e, t, n) {
  for (var r = e.read_shift(n.biff == 12 ? 4 : 2), a = [], i = 0; i != r; ++i) a.push((n.biff == 12 ? QZ : $Xe)(e));
  return a;
}

function nXa(e, t, n) {
  var r = 0,
    a = 0;
  n.biff == 12 ? (r = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), r = 1 + e.read_shift(2)), n.biff >= 2 && n.biff < 8 && (--r, --a == 0 && (a = 256));
  for (var i = 0, o = []; i != r && (o[i] = []); ++i) for (var s = 0; s != a; ++s) o[i][s] = eXa(e, n.biff);
  return o;
}

function rXa(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3,
    a = !n || n.biff >= 8 ? 4 : 2,
    i = e.read_shift(a);
  switch (n.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [r, 0, i];
}

function aXa(e, t, n) {
  if (n.biff == 5) return iXa(e);
  var r = e.read_shift(1) >>> 5 & 3,
    a = e.read_shift(2),
    i = e.read_shift(4);
  return [r, a, i];
}

function iXa(e) {
  var t = e.read_shift(1) >>> 5 & 3,
    n = e.read_shift(2, "i");
  e.l += 8;
  var r = e.read_shift(2);
  return e.l += 12, [t, n, r];
}

function oXa(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3;
  e.l += n && n.biff == 2 ? 3 : 4;
  var a = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, a];
}

function sXa(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3,
    a = e.read_shift(n && n.biff == 2 ? 1 : 2);
  return [r, a];
}

function lXa(e, t, n) {
  var r = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, n.biff < 8 && e.l--, n.biff == 12 && (e.l += 2), [r];
}

function cXa(e, t, n) {
  var r = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2),
    i = 4;
  if (n) switch (n.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [r, a];
}

var dXa = Rx,
  uXa = Rx,
  hXa = Rx;

function ECe(e, t, n) {
  return e.l += 2, [SYa(e)];
}

function qOt(e) {
  return e.l += 6, [];
}

var pXa = ECe,
  mXa = qOt,
  fXa = qOt,
  gXa = ECe;

function Orr(e) {
  return e.l += 2, [Rg(e), e.read_shift(2) & 1];
}

var yXa = ECe,
  bXa = Orr,
  vXa = qOt,
  wXa = ECe,
  xXa = ECe,
  _Xa = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??", "??", "?Current"];

function kXa(e) {
  e.l += 2;
  var t = e.read_shift(2),
    n = e.read_shift(2),
    r = e.read_shift(4),
    a = e.read_shift(2),
    i = e.read_shift(2),
    o = _Xa[n >> 2 & 31];
  return {
    ixti: t,
    coltype: n & 3,
    rt: o,
    idx: r,
    c: a,
    C: i
  };
}

function AXa(e) {
  return e.l += 2, [e.read_shift(4)];
}

function SXa(e, t, n) {
  return e.l += 5, e.l += 2, e.l += n.biff == 2 ? 1 : 4, ["PTGSHEET"];
}

function IXa(e, t, n) {
  return e.l += n.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}

function CXa(e) {
  var t = e.read_shift(1) >>> 5 & 3,
    n = e.read_shift(2);
  return [t, n];
}

function EXa(e) {
  var t = e.read_shift(1) >>> 5 & 3,
    n = e.read_shift(2);
  return [t, n];
}

function TXa(e) {
  return e.l += 4, [0, 0];
}

var don = {
    1: {
      n: "PtgExp",
      f: KYa
    },
    2: {
      n: "PtgTbl",
      f: hXa
    },
    3: {
      n: "PtgAdd",
      f: q0
    },
    4: {
      n: "PtgSub",
      f: q0
    },
    5: {
      n: "PtgMul",
      f: q0
    },
    6: {
      n: "PtgDiv",
      f: q0
    },
    7: {
      n: "PtgPower",
      f: q0
    },
    8: {
      n: "PtgConcat",
      f: q0
    },
    9: {
      n: "PtgLt",
      f: q0
    },
    10: {
      n: "PtgLe",
      f: q0
    },
    11: {
      n: "PtgEq",
      f: q0
    },
    12: {
      n: "PtgGe",
      f: q0
    },
    13: {
      n: "PtgGt",
      f: q0
    },
    14: {
      n: "PtgNe",
      f: q0
    },
    15: {
      n: "PtgIsect",
      f: q0
    },
    16: {
      n: "PtgUnion",
      f: q0
    },
    17: {
      n: "PtgRange",
      f: q0
    },
    18: {
      n: "PtgUplus",
      f: q0
    },
    19: {
      n: "PtgUminus",
      f: q0
    },
    20: {
      n: "PtgPercent",
      f: q0
    },
    21: {
      n: "PtgParen",
      f: q0
    },
    22: {
      n: "PtgMissArg",
      f: q0
    },
    23: {
      n: "PtgStr",
      f: ZYa
    },
    26: {
      n: "PtgSheet",
      f: SXa
    },
    27: {
      n: "PtgEndSheet",
      f: IXa
    },
    28: {
      n: "PtgErr",
      f: QYa
    },
    29: {
      n: "PtgBool",
      f: XYa
    },
    30: {
      n: "PtgInt",
      f: YYa
    },
    31: {
      n: "PtgNum",
      f: JYa
    },
    32: {
      n: "PtgArray",
      f: NYa
    },
    33: {
      n: "PtgFunc",
      f: VYa
    },
    34: {
      n: "PtgFuncVar",
      f: HYa
    },
    35: {
      n: "PtgName",
      f: rXa
    },
    36: {
      n: "PtgRef",
      f: UYa
    },
    37: {
      n: "PtgArea",
      f: EYa
    },
    38: {
      n: "PtgMemArea",
      f: oXa
    },
    39: {
      n: "PtgMemErr",
      f: dXa
    },
    40: {
      n: "PtgMemNoMem",
      f: uXa
    },
    41: {
      n: "PtgMemFunc",
      f: sXa
    },
    42: {
      n: "PtgRefErr",
      f: lXa
    },
    43: {
      n: "PtgAreaErr",
      f: MYa
    },
    44: {
      n: "PtgRefN",
      f: $Ya
    },
    45: {
      n: "PtgAreaN",
      f: RYa
    },
    46: {
      n: "PtgMemAreaN",
      f: CXa
    },
    47: {
      n: "PtgMemNoMemN",
      f: EXa
    },
    57: {
      n: "PtgNameX",
      f: aXa
    },
    58: {
      n: "PtgRef3d",
      f: GYa
    },
    59: {
      n: "PtgArea3d",
      f: TYa
    },
    60: {
      n: "PtgRefErr3d",
      f: cXa
    },
    61: {
      n: "PtgAreaErr3d",
      f: PYa
    },
    255: {}
  },
  MXa = {
    64: 32,
    96: 32,
    65: 33,
    97: 33,
    66: 34,
    98: 34,
    67: 35,
    99: 35,
    68: 36,
    100: 36,
    69: 37,
    101: 37,
    70: 38,
    102: 38,
    71: 39,
    103: 39,
    72: 40,
    104: 40,
    73: 41,
    105: 41,
    74: 42,
    106: 42,
    75: 43,
    107: 43,
    76: 44,
    108: 44,
    77: 45,
    109: 45,
    78: 46,
    110: 46,
    79: 47,
    111: 47,
    88: 34,
    120: 34,
    89: 57,
    121: 57,
    90: 58,
    122: 58,
    91: 59,
    123: 59,
    92: 60,
    124: 60,
    93: 61,
    125: 61
  },
  PXa = {
    1: {
      n: "PtgElfLel",
      f: Orr
    },
    2: {
      n: "PtgElfRw",
      f: wXa
    },
    3: {
      n: "PtgElfCol",
      f: pXa
    },
    6: {
      n: "PtgElfRwV",
      f: xXa
    },
    7: {
      n: "PtgElfColV",
      f: gXa
    },
    10: {
      n: "PtgElfRadical",
      f: yXa
    },
    11: {
      n: "PtgElfRadicalS",
      f: vXa
    },
    13: {
      n: "PtgElfColS",
      f: mXa
    },
    15: {
      n: "PtgElfColSV",
      f: fXa
    },
    16: {
      n: "PtgElfRadicalLel",
      f: bXa
    },
    25: {
      n: "PtgList",
      f: kXa
    },
    29: {
      n: "PtgSxName",
      f: AXa
    },
    255: {}
  },
  RXa = {
    0: {
      n: "PtgAttrNoop",
      f: TXa
    },
    1: {
      n: "PtgAttrSemi",
      f: BYa
    },
    2: {
      n: "PtgAttrIf",
      f: LYa
    },
    4: {
      n: "PtgAttrChoose",
      f: jYa
    },
    8: {
      n: "PtgAttrGoto",
      f: DYa
    },
    16: {
      n: "PtgAttrSum",
      f: qYa
    },
    32: {
      n: "PtgAttrBaxcel",
      f: con
    },
    33: {
      n: "PtgAttrBaxcel",
      f: con
    },
    64: {
      n: "PtgAttrSpace",
      f: FYa
    },
    65: {
      n: "PtgAttrSpaceSemi",
      f: zYa
    },
    128: {
      n: "PtgAttrIfError",
      f: OYa
    },
    255: {}
  };

function TCe(e, t, n, r) {
  if (r.biff < 8) return Rx(e, t);
  for (var a = e.l + t, i = [], o = 0; o !== n.length; ++o) switch (n[o][0]) {
    case "PtgArray":
      n[o][1] = nXa(e, 0, r), i.push(n[o][1]);
      break;
    case "PtgMemArea":
      n[o][2] = tXa(e, n[o][1], r), i.push(n[o][2]);
      break;
    case "PtgExp":
      r && r.biff == 12 && (n[o][1][1] = e.read_shift(4), i.push(n[o][1]));
      break;
    case "PtgList":
    case "PtgElfRadicalS":
    case "PtgElfColS":
    case "PtgElfColSV":
      throw "Unsupported " + n[o][0];
  }
  return t = a - e.l, t !== 0 && i.push(Rx(e, t)), i;
}

function MCe(e, t, n) {
  for (var r = e.l + t, a, i, o = []; r != e.l;) t = r - e.l, i = e[e.l], a = don[i] || don[MXa[i]], (i === 24 || i === 25) && (a = (i === 24 ? PXa : RXa)[e[e.l + 1]]), !a || !a.f ? Rx(e, t) : o.push([a.n, a.f(e, t, n)]);
  return o;
}

function NXa(e) {
  for (var t = [], n = 0; n < e.length; ++n) {
    for (var r = e[n], a = [], i = 0; i < r.length; ++i) {
      var o = r[i];
      if (o) switch (o[0]) {
        case 2:
          a.push('"' + o[1].replace(/"/g, '""') + '"');
          break;
        default:
          a.push(o[1]);
      } else a.push("");
    }
    t.push(a.join(","));
  }
  return t.join(";");
}

var jXa = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};

function DXa(e, t) {
  var n = e.lastIndexOf("!"),
    r = t.lastIndexOf("!");
  return n == -1 && r == -1 ? e + ":" + t : n > 0 && r > 0 && e.slice(0, n).toLowerCase() == t.slice(0, r).toLowerCase() ? e + ":" + t.slice(r + 1) : (console.error("Cannot hydrate range", e, t), e + ":" + t);
}

function Brr(e, t, n) {
  if (!e) return "SH33TJSERR0";
  if (n.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var r = e.XTI[t];
  if (n.biff < 8) return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!r) return "SH33TJSERR1";
  var a = "";
  if (n.biff > 8) switch (e[r[0]][0]) {
    case 357:
      return a = r[1] == -1 ? "#REF" : e.SheetNames[r[1]], r[1] == r[2] ? a : a + ":" + e.SheetNames[r[2]];
    case 358:
      return n.SID != null ? e.SheetNames[n.SID] : "SH33TJSSAME" + e[r[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[r[0]][0];
  }
  switch (e[r[0]][0][0]) {
    case 1025:
      return a = r[1] == -1 ? "#REF" : e.SheetNames[r[1]] || "SH33TJSERR3", r[1] == r[2] ? a : a + ":" + e.SheetNames[r[2]];
    case 14849:
      return e[r[0]].slice(1).map(function (i) {
        return i.Name;
      }).join(";;");
    default:
      return e[r[0]][0][3] ? (a = r[1] == -1 ? "#REF" : e[r[0]][0][3][r[1]] || "SH33TJSERR4", r[1] == r[2] ? a : a + ":" + e[r[0]][0][3][r[2]]) : "SH33TJSERR2";
  }
}

function uon(e, t, n) {
  var r = Brr(e, t, n);
  return r == "#REF" ? r : yke(r, n);
}

function tx(e, t, n, r, a) {
  var i = a && a.biff || 8,
    o = {
      s: {
        c: 0,
        r: 0
      }
    },
    s = [],
    l,
    d,
    u,
    h = 0,
    p = 0,
    m,
    f = "";
  if (!e[0] || !e[0][0]) return "";
  for (var y = -1, b = "", v = 0, _ = e[0].length; v < _; ++v) {
    var w = e[0][v];
    switch (w[0]) {
      case "PtgUminus":
        s.push("-" + s.pop());
        break;
      case "PtgUplus":
        s.push("+" + s.pop());
        break;
      case "PtgPercent":
        s.push(s.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (l = s.pop(), d = s.pop(), y >= 0) {
          switch (e[0][y][1][0]) {
            case 0:
              b = Gd(" ", e[0][y][1][1]);
              break;
            case 1:
              b = Gd("\r", e[0][y][1][1]);
              break;
            default:
              if (b = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][y][1][0]);
          }
          d = d + b, y = -1;
        }
        s.push(d + jXa[w[0]] + l);
        break;
      case "PtgIsect":
        l = s.pop(), d = s.pop(), s.push(d + " " + l);
        break;
      case "PtgUnion":
        l = s.pop(), d = s.pop(), s.push(d + "," + l);
        break;
      case "PtgRange":
        l = s.pop(), d = s.pop(), s.push(DXa(d, l));
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        u = l1e(w[1][1], o, a), s.push(c1e(u, i));
        break;
      case "PtgRefN":
        u = n ? l1e(w[1][1], n, a) : w[1][1], s.push(c1e(u, i));
        break;
      case "PtgRef3d":
        h = w[1][1], u = l1e(w[1][2], o, a), f = uon(r, h, a), s.push(f + "!" + c1e(u, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var k = w[1][0],
          A = w[1][1];
        k || (k = 0), k &= 127;
        var S = k == 0 ? [] : s.slice(-k);
        s.length -= k, A === "User" && (A = S.shift()), s.push(A + "(" + S.join(",") + ")");
        break;
      case "PtgBool":
        s.push(w[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        s.push(w[1]);
        break;
      case "PtgNum":
        s.push(String(w[1]));
        break;
      case "PtgStr":
        s.push('"' + w[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        s.push(w[1]);
        break;
      case "PtgAreaN":
        m = Bin(w[1][1], n ? {
          s: n
        } : o, a), s.push(Fit(m, a));
        break;
      case "PtgArea":
        m = Bin(w[1][1], o, a), s.push(Fit(m, a));
        break;
      case "PtgArea3d":
        h = w[1][1], m = w[1][2], f = uon(r, h, a), s.push(f + "!" + Fit(m, a));
        break;
      case "PtgAttrSum":
        s.push("SUM(" + s.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        p = w[1][2];
        var C = (r.names || [])[p - 1] || (r[0] || [])[p],
          I = C ? C.Name : "SH33TJSNAME" + String(p);
        I && I.slice(0, 6) == "_xlfn." && !a.xlfn && (I = I.slice(6)), s.push(I);
        break;
      case "PtgNameX":
        var E = w[1][1];
        p = w[1][2];
        var M;
        if (a.biff <= 5) E < 0 && (E = -E), r[E] && (M = r[E][p]);else {
          var T = "";
          if (((r[E] || [])[0] || [])[0] == 14849 || (((r[E] || [])[0] || [])[0] == 1025 ? r[E][p] && r[E][p].itab > 0 && (T = r.SheetNames[r[E][p].itab - 1] + "!") : T = r.SheetNames[p - 1] + "!"), r[E] && r[E][p]) T += r[E][p].Name;else if (r[0] && r[0][p]) T += r[0][p].Name;else {
            var P = (Brr(r, E, a) || "").split(";;");
            P[p - 1] ? T = P[p - 1] : T += "SH33TJSERRX";
          }
          s.push(T);
          break;
        }
        M || (M = {
          Name: "SH33TJSERRY"
        }), s.push(M.Name);
        break;
      case "PtgParen":
        var R = "(",
          j = ")";
        if (y >= 0) {
          switch (b = "", e[0][y][1][0]) {
            case 2:
              R = Gd(" ", e[0][y][1][1]) + R;
              break;
            case 3:
              R = Gd("\r", e[0][y][1][1]) + R;
              break;
            case 4:
              j = Gd(" ", e[0][y][1][1]) + j;
              break;
            case 5:
              j = Gd("\r", e[0][y][1][1]) + j;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][y][1][0]);
          }
          y = -1;
        }
        s.push(R + s.pop() + j);
        break;
      case "PtgRefErr":
        s.push("#REF!");
        break;
      case "PtgRefErr3d":
        s.push("#REF!");
        break;
      case "PtgExp":
        u = {
          c: w[1][1],
          r: w[1][0]
        };
        var B = {
          c: n.c,
          r: n.r
        };
        if (r.sharedf[Xc(u)]) {
          var F = r.sharedf[Xc(u)];
          s.push(tx(F, o, B, r, a));
        } else {
          var N = !1;
          for (l = 0; l != r.arrayf.length; ++l) if (d = r.arrayf[l], !(u.c < d[0].s.c || u.c > d[0].e.c) && !(u.r < d[0].s.r || u.r > d[0].e.r)) {
            s.push(tx(d[1], o, B, r, a)), N = !0;
            break;
          }
          N || s.push(w[1]);
        }
        break;
      case "PtgArray":
        s.push("{" + NXa(w[1]) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        y = v;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        s.push("");
        break;
      case "PtgAreaErr":
        s.push("#REF!");
        break;
      case "PtgAreaErr3d":
        s.push("#REF!");
        break;
      case "PtgList":
        s.push("Table" + w[1].idx + "[#" + w[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(w));
      default:
        throw new Error("Unrecognized Formula Token: " + String(w));
    }
    var G = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && y >= 0 && G.indexOf(e[0][v][0]) == -1) {
      w = e[0][y];
      var z = !0;
      switch (w[1][0]) {
        case 4:
          z = !1;
        case 0:
          b = Gd(" ", w[1][1]);
          break;
        case 5:
          z = !1;
        case 1:
          b = Gd("\r", w[1][1]);
          break;
        default:
          if (b = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + w[1][0]);
      }
      s.push((z ? b : "") + s.pop() + (z ? "" : b)), y = -1;
    }
  }
  if (s.length > 1 && a.WTF) throw new Error("bad formula stack");
  return s[0] == "TRUE" ? !0 : s[0] == "FALSE" ? !1 : s[0];
}

function LXa(e, t, n) {
  var r = e.l + t,
    a = n.biff == 2 ? 1 : 2,
    i,
    o = e.read_shift(a);
  if (o == 65535) return [[], Rx(e, t - 2)];
  var s = MCe(e, o, n);
  return t !== o + a && (i = TCe(e, t - o - a, s, n)), e.l = r, [s, i];
}

function OXa(e, t, n) {
  var r = e.l + t,
    a = n.biff == 2 ? 1 : 2,
    i,
    o = e.read_shift(a);
  if (o == 65535) return [[], Rx(e, t - 2)];
  var s = MCe(e, o, n);
  return t !== o + a && (i = TCe(e, t - o - a, s, n)), e.l = r, [s, i];
}

function BXa(e, t, n, r) {
  var a = e.l + t,
    i = MCe(e, r, n),
    o;
  return a !== e.l && (o = TCe(e, a - e.l, i, n)), [i, o];
}

function FXa(e, t, n) {
  var r = e.l + t,
    a,
    i = e.read_shift(2),
    o = MCe(e, i, n);
  return i == 65535 ? [[], Rx(e, t - 2)] : (t !== i + 2 && (a = TCe(e, r - i - 2, o, n)), [o, a]);
}

function zXa(e) {
  var t;
  if (M7(e, e.l + 6) !== 65535) return [cx(e), "n"];
  switch (e[e.l]) {
    case 0:
      return e.l += 8, ["String", "s"];
    case 1:
      return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
    case 2:
      return t = e[e.l + 2], e.l += 8, [t, "e"];
    case 3:
      return e.l += 8, ["", "s"];
  }
  return [];
}

function UXa(e) {
  if (e == null) {
    var t = Ja(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return kJ(e);
  return kJ(0);
}

function Wit(e, t, n) {
  var r = e.l + t,
    a = DT(e, 6, n),
    i = zXa(e),
    o = e.read_shift(1);
  n.biff != 2 && (e.read_shift(1), n.biff >= 5 && e.read_shift(4));
  var s = OXa(e, r - e.l, n);
  return {
    cell: a,
    val: i[0],
    formula: s,
    shared: o >> 3 & 1,
    tt: i[1]
  };
}

function $Xa(e, t, n, r, a) {
  var i = SJ(t, n, a),
    o = UXa(e.v),
    s = Ja(6),
    l = 33;
  s.write_shift(2, l), s.write_shift(4, 0);
  for (var d = Ja(e.bf.length), u = 0; u < e.bf.length; ++u) d[u] = e.bf[u];
  var h = k0([i, o, s, d]);
  return h;
}

function VXe(e, t, n) {
  var r = e.read_shift(4),
    a = MCe(e, r, n),
    i = e.read_shift(4),
    o = i > 0 ? TCe(e, i, a, n) : null;
  return [a, o];
}

var GXa = VXe,
  HXe = VXe,
  VXa = VXe,
  HXa = VXe;

function hon(e) {
  if ((e | 0) == e && e < Math.pow(2, 16) && e >= 0) {
    var t = Ja(11);
    return t.write_shift(4, 3), t.write_shift(1, 30), t.write_shift(2, e), t.write_shift(4, 0), t;
  }
  var n = Ja(17);
  return n.write_shift(4, 11), n.write_shift(1, 31), n.write_shift(8, e), n.write_shift(4, 0), n;
}

function WXa(e) {
  var t = Ja(10);
  return t.write_shift(4, 2), t.write_shift(1, 28), t.write_shift(1, e), t.write_shift(4, 0), t;
}

function qXa(e) {
  var t = Ja(10);
  return t.write_shift(4, 2), t.write_shift(1, 29), t.write_shift(1, e ? 1 : 0), t.write_shift(4, 0), t;
}

function KXa(e) {
  var t = Ja(7);
  t.write_shift(4, 3 + 2 * e.length), t.write_shift(1, 23), t.write_shift(2, e.length);
  var n = Ja(2 * e.length);
  n.write_shift(2 * e.length, e, "utf16le");
  var r = Ja(4);
  return r.write_shift(4, 0), k0([t, n, r]);
}

function QXa(e) {
  var t = Eh(e),
    n = Ja(15);
  return n.write_shift(4, 7), n.write_shift(1, 36), n.write_shift(4, t.r), n.write_shift(2, t.c | (e.charAt(0) == "$" ? 0 : 1) << 14 | (e.match(/\$\d/) ? 0 : 1) << 15), n.write_shift(4, 0), n;
}

function YXa(e, t) {
  var n = e.lastIndexOf("!"),
    r = e.slice(0, n);
  e = e.slice(n + 1);
  var a = Eh(e);
  r.charAt(0) == "'" && (r = r.slice(1, -1).replace(/''/g, "'"));
  var i = Ja(17);
  return i.write_shift(4, 9), i.write_shift(1, 58), i.write_shift(2, 2 + t.SheetNames.map(function (o) {
    return o.toLowerCase();
  }).indexOf(r.toLowerCase())), i.write_shift(4, a.r), i.write_shift(2, a.c | (e.charAt(0) == "$" ? 0 : 1) << 14 | (e.match(/\$\d/) ? 0 : 1) << 15), i.write_shift(4, 0), i;
}

function XXa(e, t) {
  var n = e.lastIndexOf("!"),
    r = e.slice(0, n);
  e = e.slice(n + 1), r.charAt(0) == "'" && (r = r.slice(1, -1).replace(/''/g, "'"));
  var a = Ja(17);
  return a.write_shift(4, 9), a.write_shift(1, 60), a.write_shift(2, 2 + t.SheetNames.map(function (i) {
    return i.toLowerCase();
  }).indexOf(r.toLowerCase())), a.write_shift(4, 0), a.write_shift(2, 0), a.write_shift(4, 0), a;
}

function JXa(e) {
  var t = e.split(":"),
    n = t[0],
    r = Ja(23);
  r.write_shift(4, 15), n = t[0];
  var a = Eh(n);
  return r.write_shift(1, 36), r.write_shift(4, a.r), r.write_shift(2, a.c | (n.charAt(0) == "$" ? 0 : 1) << 14 | (n.match(/\$\d/) ? 0 : 1) << 15), r.write_shift(4, 0), n = t[1], a = Eh(n), r.write_shift(1, 36), r.write_shift(4, a.r), r.write_shift(2, a.c | (n.charAt(0) == "$" ? 0 : 1) << 14 | (n.match(/\$\d/) ? 0 : 1) << 15), r.write_shift(4, 0), r.write_shift(1, 17), r.write_shift(4, 0), r;
}

function ZXa(e, t) {
  var n = e.lastIndexOf("!"),
    r = e.slice(0, n);
  e = e.slice(n + 1), r.charAt(0) == "'" && (r = r.slice(1, -1).replace(/''/g, "'"));
  var a = e.split(":"),
    i = Ja(27);
  i.write_shift(4, 19);
  var o = a[0],
    s = Eh(o);
  return i.write_shift(1, 58), i.write_shift(2, 2 + t.SheetNames.map(function (l) {
    return l.toLowerCase();
  }).indexOf(r.toLowerCase())), i.write_shift(4, s.r), i.write_shift(2, s.c | (o.charAt(0) == "$" ? 0 : 1) << 14 | (o.match(/\$\d/) ? 0 : 1) << 15), o = a[1], s = Eh(o), i.write_shift(1, 58), i.write_shift(2, 2 + t.SheetNames.map(function (l) {
    return l.toLowerCase();
  }).indexOf(r.toLowerCase())), i.write_shift(4, s.r), i.write_shift(2, s.c | (o.charAt(0) == "$" ? 0 : 1) << 14 | (o.match(/\$\d/) ? 0 : 1) << 15), i.write_shift(1, 17), i.write_shift(4, 0), i;
}

function eJa(e, t) {
  var n = e.lastIndexOf("!"),
    r = e.slice(0, n);
  e = e.slice(n + 1), r.charAt(0) == "'" && (r = r.slice(1, -1).replace(/''/g, "'"));
  var a = Ty(e),
    i = Ja(23);
  return i.write_shift(4, 15), i.write_shift(1, 59), i.write_shift(2, 2 + t.SheetNames.map(function (o) {
    return o.toLowerCase();
  }).indexOf(r.toLowerCase())), i.write_shift(4, a.s.r), i.write_shift(4, a.e.r), i.write_shift(2, a.s.c), i.write_shift(2, a.e.c), i.write_shift(4, 0), i;
}

function tJa(e, t) {
  if (typeof e == "number") return hon(e);
  if (typeof e == "boolean") return qXa(e);
  if (/^#(DIV\/0!|GETTING_DATA|N\/A|NAME\?|NULL!|NUM!|REF!|VALUE!)$/.test(e)) return WXa(+Lv[e]);
  if (e.match(/^\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/)) return QXa(e);
  if (e.match(/^\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/)) return JXa(e);
  if (e.match(/^#REF!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/)) return eJa(e, t);
  if (e.match(/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/)) return YXa(e, t);
  if (e.match(/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5}):\$?(?:[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D]|[A-Z]{1,2})\$?(?:10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})$/)) return ZXa(e, t);
  if (/^(?:'[^\\\/?*\[\]:]*'|[^'][^\\\/?*\[\]:'`~!@#$%^()\-=+{}|;,<.>]*)!#REF!$/.test(e)) return XXa(e, t);
  if (/^".*"$/.test(e)) return KXa(e);
  if (/^[+-]\d+$/.test(e)) return hon(parseInt(e, 10));
  throw "Formula |" + e + "| not supported for XLSB";
}

var nJa = tJa,
  rJa = {
    0: "BEEP",
    1: "OPEN",
    2: "OPEN.LINKS",
    3: "CLOSE.ALL",
    4: "SAVE",
    5: "SAVE.AS",
    6: "FILE.DELETE",
    7: "PAGE.SETUP",
    8: "PRINT",
    9: "PRINTER.SETUP",
    10: "QUIT",
    11: "NEW.WINDOW",
    12: "ARRANGE.ALL",
    13: "WINDOW.SIZE",
    14: "WINDOW.MOVE",
    15: "FULL",
    16: "CLOSE",
    17: "RUN",
    22: "SET.PRINT.AREA",
    23: "SET.PRINT.TITLES",
    24: "SET.PAGE.BREAK",
    25: "REMOVE.PAGE.BREAK",
    26: "FONT",
    27: "DISPLAY",
    28: "PROTECT.DOCUMENT",
    29: "PRECISION",
    30: "A1.R1C1",
    31: "CALCULATE.NOW",
    32: "CALCULATION",
    34: "DATA.FIND",
    35: "EXTRACT",
    36: "DATA.DELETE",
    37: "SET.DATABASE",
    38: "SET.CRITERIA",
    39: "SORT",
    40: "DATA.SERIES",
    41: "TABLE",
    42: "FORMAT.NUMBER",
    43: "ALIGNMENT",
    44: "STYLE",
    45: "BORDER",
    46: "CELL.PROTECTION",
    47: "COLUMN.WIDTH",
    48: "UNDO",
    49: "CUT",
    50: "COPY",
    51: "PASTE",
    52: "CLEAR",
    53: "PASTE.SPECIAL",
    54: "EDIT.DELETE",
    55: "INSERT",
    56: "FILL.RIGHT",
    57: "FILL.DOWN",
    61: "DEFINE.NAME",
    62: "CREATE.NAMES",
    63: "FORMULA.GOTO",
    64: "FORMULA.FIND",
    65: "SELECT.LAST.CELL",
    66: "SHOW.ACTIVE.CELL",
    67: "GALLERY.AREA",
    68: "GALLERY.BAR",
    69: "GALLERY.COLUMN",
    70: "GALLERY.LINE",
    71: "GALLERY.PIE",
    72: "GALLERY.SCATTER",
    73: "COMBINATION",
    74: "PREFERRED",
    75: "ADD.OVERLAY",
    76: "GRIDLINES",
    77: "SET.PREFERRED",
    78: "AXES",
    79: "LEGEND",
    80: "ATTACH.TEXT",
    81: "ADD.ARROW",
    82: "SELECT.CHART",
    83: "SELECT.PLOT.AREA",
    84: "PATTERNS",
    85: "MAIN.CHART",
    86: "OVERLAY",
    87: "SCALE",
    88: "FORMAT.LEGEND",
    89: "FORMAT.TEXT",
    90: "EDIT.REPEAT",
    91: "PARSE",
    92: "JUSTIFY",
    93: "HIDE",
    94: "UNHIDE",
    95: "WORKSPACE",
    96: "FORMULA",
    97: "FORMULA.FILL",
    98: "FORMULA.ARRAY",
    99: "DATA.FIND.NEXT",
    100: "DATA.FIND.PREV",
    101: "FORMULA.FIND.NEXT",
    102: "FORMULA.FIND.PREV",
    103: "ACTIVATE",
    104: "ACTIVATE.NEXT",
    105: "ACTIVATE.PREV",
    106: "UNLOCKED.NEXT",
    107: "UNLOCKED.PREV",
    108: "COPY.PICTURE",
    109: "SELECT",
    110: "DELETE.NAME",
    111: "DELETE.FORMAT",
    112: "VLINE",
    113: "HLINE",
    114: "VPAGE",
    115: "HPAGE",
    116: "VSCROLL",
    117: "HSCROLL",
    118: "ALERT",
    119: "NEW",
    120: "CANCEL.COPY",
    121: "SHOW.CLIPBOARD",
    122: "MESSAGE",
    124: "PASTE.LINK",
    125: "APP.ACTIVATE",
    126: "DELETE.ARROW",
    127: "ROW.HEIGHT",
    128: "FORMAT.MOVE",
    129: "FORMAT.SIZE",
    130: "FORMULA.REPLACE",
    131: "SEND.KEYS",
    132: "SELECT.SPECIAL",
    133: "APPLY.NAMES",
    134: "REPLACE.FONT",
    135: "FREEZE.PANES",
    136: "SHOW.INFO",
    137: "SPLIT",
    138: "ON.WINDOW",
    139: "ON.DATA",
    140: "DISABLE.INPUT",
    142: "OUTLINE",
    143: "LIST.NAMES",
    144: "FILE.CLOSE",
    145: "SAVE.WORKBOOK",
    146: "DATA.FORM",
    147: "COPY.CHART",
    148: "ON.TIME",
    149: "WAIT",
    150: "FORMAT.FONT",
    151: "FILL.UP",
    152: "FILL.LEFT",
    153: "DELETE.OVERLAY",
    155: "SHORT.MENUS",
    159: "SET.UPDATE.STATUS",
    161: "COLOR.PALETTE",
    162: "DELETE.STYLE",
    163: "WINDOW.RESTORE",
    164: "WINDOW.MAXIMIZE",
    166: "CHANGE.LINK",
    167: "CALCULATE.DOCUMENT",
    168: "ON.KEY",
    169: "APP.RESTORE",
    170: "APP.MOVE",
    171: "APP.SIZE",
    172: "APP.MINIMIZE",
    173: "APP.MAXIMIZE",
    174: "BRING.TO.FRONT",
    175: "SEND.TO.BACK",
    185: "MAIN.CHART.TYPE",
    186: "OVERLAY.CHART.TYPE",
    187: "SELECT.END",
    188: "OPEN.MAIL",
    189: "SEND.MAIL",
    190: "STANDARD.FONT",
    191: "CONSOLIDATE",
    192: "SORT.SPECIAL",
    193: "GALLERY.3D.AREA",
    194: "GALLERY.3D.COLUMN",
    195: "GALLERY.3D.LINE",
    196: "GALLERY.3D.PIE",
    197: "VIEW.3D",
    198: "GOAL.SEEK",
    199: "WORKGROUP",
    200: "FILL.GROUP",
    201: "UPDATE.LINK",
    202: "PROMOTE",
    203: "DEMOTE",
    204: "SHOW.DETAIL",
    206: "UNGROUP",
    207: "OBJECT.PROPERTIES",
    208: "SAVE.NEW.OBJECT",
    209: "SHARE",
    210: "SHARE.NAME",
    211: "DUPLICATE",
    212: "APPLY.STYLE",
    213: "ASSIGN.TO.OBJECT",
    214: "OBJECT.PROTECTION",
    215: "HIDE.OBJECT",
    216: "SET.EXTRACT",
    217: "CREATE.PUBLISHER",
    218: "SUBSCRIBE.TO",
    219: "ATTRIBUTES",
    220: "SHOW.TOOLBAR",
    222: "PRINT.PREVIEW",
    223: "EDIT.COLOR",
    224: "SHOW.LEVELS",
    225: "FORMAT.MAIN",
    226: "FORMAT.OVERLAY",
    227: "ON.RECALC",
    228: "EDIT.SERIES",
    229: "DEFINE.STYLE",
    240: "LINE.PRINT",
    243: "ENTER.DATA",
    249: "GALLERY.RADAR",
    250: "MERGE.STYLES",
    251: "EDITION.OPTIONS",
    252: "PASTE.PICTURE",
    253: "PASTE.PICTURE.LINK",
    254: "SPELLING",
    256: "ZOOM",
    259: "INSERT.OBJECT",
    260: "WINDOW.MINIMIZE",
    265: "SOUND.NOTE",
    266: "SOUND.PLAY",
    267: "FORMAT.SHAPE",
    268: "EXTEND.POLYGON",
    269: "FORMAT.AUTO",
    272: "GALLERY.3D.BAR",
    273: "GALLERY.3D.SURFACE",
    274: "FILL.AUTO",
    276: "CUSTOMIZE.TOOLBAR",
    277: "ADD.TOOL",
    278: "EDIT.OBJECT",
    279: "ON.DOUBLECLICK",
    280: "ON.ENTRY",
    281: "WORKBOOK.ADD",
    282: "WORKBOOK.MOVE",
    283: "WORKBOOK.COPY",
    284: "WORKBOOK.OPTIONS",
    285: "SAVE.WORKSPACE",
    288: "CHART.WIZARD",
    289: "DELETE.TOOL",
    290: "MOVE.TOOL",
    291: "WORKBOOK.SELECT",
    292: "WORKBOOK.ACTIVATE",
    293: "ASSIGN.TO.TOOL",
    295: "COPY.TOOL",
    296: "RESET.TOOL",
    297: "CONSTRAIN.NUMERIC",
    298: "PASTE.TOOL",
    302: "WORKBOOK.NEW",
    305: "SCENARIO.CELLS",
    306: "SCENARIO.DELETE",
    307: "SCENARIO.ADD",
    308: "SCENARIO.EDIT",
    309: "SCENARIO.SHOW",
    310: "SCENARIO.SHOW.NEXT",
    311: "SCENARIO.SUMMARY",
    312: "PIVOT.TABLE.WIZARD",
    313: "PIVOT.FIELD.PROPERTIES",
    314: "PIVOT.FIELD",
    315: "PIVOT.ITEM",
    316: "PIVOT.ADD.FIELDS",
    318: "OPTIONS.CALCULATION",
    319: "OPTIONS.EDIT",
    320: "OPTIONS.VIEW",
    321: "ADDIN.MANAGER",
    322: "MENU.EDITOR",
    323: "ATTACH.TOOLBARS",
    324: "VBAActivate",
    325: "OPTIONS.CHART",
    328: "VBA.INSERT.FILE",
    330: "VBA.PROCEDURE.DEFINITION",
    336: "ROUTING.SLIP",
    338: "ROUTE.DOCUMENT",
    339: "MAIL.LOGON",
    342: "INSERT.PICTURE",
    343: "EDIT.TOOL",
    344: "GALLERY.DOUGHNUT",
    350: "CHART.TREND",
    352: "PIVOT.ITEM.PROPERTIES",
    354: "WORKBOOK.INSERT",
    355: "OPTIONS.TRANSITION",
    356: "OPTIONS.GENERAL",
    370: "FILTER.ADVANCED",
    373: "MAIL.ADD.MAILER",
    374: "MAIL.DELETE.MAILER",
    375: "MAIL.REPLY",
    376: "MAIL.REPLY.ALL",
    377: "MAIL.FORWARD",
    378: "MAIL.NEXT.LETTER",
    379: "DATA.LABEL",
    380: "INSERT.TITLE",
    381: "FONT.PROPERTIES",
    382: "MACRO.OPTIONS",
    383: "WORKBOOK.HIDE",
    384: "WORKBOOK.UNHIDE",
    385: "WORKBOOK.DELETE",
    386: "WORKBOOK.NAME",
    388: "GALLERY.CUSTOM",
    390: "ADD.CHART.AUTOFORMAT",
    391: "DELETE.CHART.AUTOFORMAT",
    392: "CHART.ADD.DATA",
    393: "AUTO.OUTLINE",
    394: "TAB.ORDER",
    395: "SHOW.DIALOG",
    396: "SELECT.ALL",
    397: "UNGROUP.SHEETS",
    398: "SUBTOTAL.CREATE",
    399: "SUBTOTAL.REMOVE",
    400: "RENAME.OBJECT",
    412: "WORKBOOK.SCROLL",
    413: "WORKBOOK.NEXT",
    414: "WORKBOOK.PREV",
    415: "WORKBOOK.TAB.SPLIT",
    416: "FULL.SCREEN",
    417: "WORKBOOK.PROTECT",
    420: "SCROLLBAR.PROPERTIES",
    421: "PIVOT.SHOW.PAGES",
    422: "TEXT.TO.COLUMNS",
    423: "FORMAT.CHARTTYPE",
    424: "LINK.FORMAT",
    425: "TRACER.DISPLAY",
    430: "TRACER.NAVIGATE",
    431: "TRACER.CLEAR",
    432: "TRACER.ERROR",
    433: "PIVOT.FIELD.GROUP",
    434: "PIVOT.FIELD.UNGROUP",
    435: "CHECKBOX.PROPERTIES",
    436: "LABEL.PROPERTIES",
    437: "LISTBOX.PROPERTIES",
    438: "EDITBOX.PROPERTIES",
    439: "PIVOT.REFRESH",
    440: "LINK.COMBO",
    441: "OPEN.TEXT",
    442: "HIDE.DIALOG",
    443: "SET.DIALOG.FOCUS",
    444: "ENABLE.OBJECT",
    445: "PUSHBUTTON.PROPERTIES",
    446: "SET.DIALOG.DEFAULT",
    447: "FILTER",
    448: "FILTER.SHOW.ALL",
    449: "CLEAR.OUTLINE",
    450: "FUNCTION.WIZARD",
    451: "ADD.LIST.ITEM",
    452: "SET.LIST.ITEM",
    453: "REMOVE.LIST.ITEM",
    454: "SELECT.LIST.ITEM",
    455: "SET.CONTROL.VALUE",
    456: "SAVE.COPY.AS",
    458: "OPTIONS.LISTS.ADD",
    459: "OPTIONS.LISTS.DELETE",
    460: "SERIES.AXES",
    461: "SERIES.X",
    462: "SERIES.Y",
    463: "ERRORBAR.X",
    464: "ERRORBAR.Y",
    465: "FORMAT.CHART",
    466: "SERIES.ORDER",
    467: "MAIL.LOGOFF",
    468: "CLEAR.ROUTING.SLIP",
    469: "APP.ACTIVATE.MICROSOFT",
    470: "MAIL.EDIT.MAILER",
    471: "ON.SHEET",
    472: "STANDARD.WIDTH",
    473: "SCENARIO.MERGE",
    474: "SUMMARY.INFO",
    475: "FIND.FILE",
    476: "ACTIVE.CELL.FONT",
    477: "ENABLE.TIPWIZARD",
    478: "VBA.MAKE.ADDIN",
    480: "INSERTDATATABLE",
    481: "WORKGROUP.OPTIONS",
    482: "MAIL.SEND.MAILER",
    485: "AUTOCORRECT",
    489: "POST.DOCUMENT",
    491: "PICKLIST",
    493: "VIEW.SHOW",
    494: "VIEW.DEFINE",
    495: "VIEW.DELETE",
    509: "SHEET.BACKGROUND",
    510: "INSERT.MAP.OBJECT",
    511: "OPTIONS.MENONO",
    517: "MSOCHECKS",
    518: "NORMAL",
    519: "LAYOUT",
    520: "RM.PRINT.AREA",
    521: "CLEAR.PRINT.AREA",
    522: "ADD.PRINT.AREA",
    523: "MOVE.BRK",
    545: "HIDECURR.NOTE",
    546: "HIDEALL.NOTES",
    547: "DELETE.NOTE",
    548: "TRAVERSE.NOTES",
    549: "ACTIVATE.NOTES",
    620: "PROTECT.REVISIONS",
    621: "UNPROTECT.REVISIONS",
    647: "OPTIONS.ME",
    653: "WEB.PUBLISH",
    667: "NEWWEBQUERY",
    673: "PIVOT.TABLE.CHART",
    753: "OPTIONS.SAVE",
    755: "OPTIONS.SPELL",
    808: "HIDEALL.INKANNOTS"
  },
  Frr = {
    0: "COUNT",
    1: "IF",
    2: "ISNA",
    3: "ISERROR",
    4: "SUM",
    5: "AVERAGE",
    6: "MIN",
    7: "MAX",
    8: "ROW",
    9: "COLUMN",
    10: "NA",
    11: "NPV",
    12: "STDEV",
    13: "DOLLAR",
    14: "FIXED",
    15: "SIN",
    16: "COS",
    17: "TAN",
    18: "ATAN",
    19: "PI",
    20: "SQRT",
    21: "EXP",
    22: "LN",
    23: "LOG10",
    24: "ABS",
    25: "INT",
    26: "SIGN",
    27: "ROUND",
    28: "LOOKUP",
    29: "INDEX",
    30: "REPT",
    31: "MID",
    32: "LEN",
    33: "VALUE",
    34: "TRUE",
    35: "FALSE",
    36: "AND",
    37: "OR",
    38: "NOT",
    39: "MOD",
    40: "DCOUNT",
    41: "DSUM",
    42: "DAVERAGE",
    43: "DMIN",
    44: "DMAX",
    45: "DSTDEV",
    46: "VAR",
    47: "DVAR",
    48: "TEXT",
    49: "LINEST",
    50: "TREND",
    51: "LOGEST",
    52: "GROWTH",
    53: "GOTO",
    54: "HALT",
    55: "RETURN",
    56: "PV",
    57: "FV",
    58: "NPER",
    59: "PMT",
    60: "RATE",
    61: "MIRR",
    62: "IRR",
    63: "RAND",
    64: "MATCH",
    65: "DATE",
    66: "TIME",
    67: "DAY",
    68: "MONTH",
    69: "YEAR",
    70: "WEEKDAY",
    71: "HOUR",
    72: "MINUTE",
    73: "SECOND",
    74: "NOW",
    75: "AREAS",
    76: "ROWS",
    77: "COLUMNS",
    78: "OFFSET",
    79: "ABSREF",
    80: "RELREF",
    81: "ARGUMENT",
    82: "SEARCH",
    83: "TRANSPOSE",
    84: "ERROR",
    85: "STEP",
    86: "TYPE",
    87: "ECHO",
    88: "SET.NAME",
    89: "CALLER",
    90: "DEREF",
    91: "WINDOWS",
    92: "SERIES",
    93: "DOCUMENTS",
    94: "ACTIVE.CELL",
    95: "SELECTION",
    96: "RESULT",
    97: "ATAN2",
    98: "ASIN",
    99: "ACOS",
    100: "CHOOSE",
    101: "HLOOKUP",
    102: "VLOOKUP",
    103: "LINKS",
    104: "INPUT",
    105: "ISREF",
    106: "GET.FORMULA",
    107: "GET.NAME",
    108: "SET.VALUE",
    109: "LOG",
    110: "EXEC",
    111: "CHAR",
    112: "LOWER",
    113: "UPPER",
    114: "PROPER",
    115: "LEFT",
    116: "RIGHT",
    117: "EXACT",
    118: "TRIM",
    119: "REPLACE",
    120: "SUBSTITUTE",
    121: "CODE",
    122: "NAMES",
    123: "DIRECTORY",
    124: "FIND",
    125: "CELL",
    126: "ISERR",
    127: "ISTEXT",
    128: "ISNUMBER",
    129: "ISBLANK",
    130: "T",
    131: "N",
    132: "FOPEN",
    133: "FCLOSE",
    134: "FSIZE",
    135: "FREADLN",
    136: "FREAD",
    137: "FWRITELN",
    138: "FWRITE",
    139: "FPOS",
    140: "DATEVALUE",
    141: "TIMEVALUE",
    142: "SLN",
    143: "SYD",
    144: "DDB",
    145: "GET.DEF",
    146: "REFTEXT",
    147: "TEXTREF",
    148: "INDIRECT",
    149: "REGISTER",
    150: "CALL",
    151: "ADD.BAR",
    152: "ADD.MENU",
    153: "ADD.COMMAND",
    154: "ENABLE.COMMAND",
    155: "CHECK.COMMAND",
    156: "RENAME.COMMAND",
    157: "SHOW.BAR",
    158: "DELETE.MENU",
    159: "DELETE.COMMAND",
    160: "GET.CHART.ITEM",
    161: "DIALOG.BOX",
    162: "CLEAN",
    163: "MDETERM",
    164: "MINVERSE",
    165: "MMULT",
    166: "FILES",
    167: "IPMT",
    168: "PPMT",
    169: "COUNTA",
    170: "CANCEL.KEY",
    171: "FOR",
    172: "WHILE",
    173: "BREAK",
    174: "NEXT",
    175: "INITIATE",
    176: "REQUEST",
    177: "POKE",
    178: "EXECUTE",
    179: "TERMINATE",
    180: "RESTART",
    181: "HELP",
    182: "GET.BAR",
    183: "PRODUCT",
    184: "FACT",
    185: "GET.CELL",
    186: "GET.WORKSPACE",
    187: "GET.WINDOW",
    188: "GET.DOCUMENT",
    189: "DPRODUCT",
    190: "ISNONTEXT",
    191: "GET.NOTE",
    192: "NOTE",
    193: "STDEVP",
    194: "VARP",
    195: "DSTDEVP",
    196: "DVARP",
    197: "TRUNC",
    198: "ISLOGICAL",
    199: "DCOUNTA",
    200: "DELETE.BAR",
    201: "UNREGISTER",
    204: "USDOLLAR",
    205: "FINDB",
    206: "SEARCHB",
    207: "REPLACEB",
    208: "LEFTB",
    209: "RIGHTB",
    210: "MIDB",
    211: "LENB",
    212: "ROUNDUP",
    213: "ROUNDDOWN",
    214: "ASC",
    215: "DBCS",
    216: "RANK",
    219: "ADDRESS",
    220: "DAYS360",
    221: "TODAY",
    222: "VDB",
    223: "ELSE",
    224: "ELSE.IF",
    225: "END.IF",
    226: "FOR.CELL",
    227: "MEDIAN",
    228: "SUMPRODUCT",
    229: "SINH",
    230: "COSH",
    231: "TANH",
    232: "ASINH",
    233: "ACOSH",
    234: "ATANH",
    235: "DGET",
    236: "CREATE.OBJECT",
    237: "VOLATILE",
    238: "LAST.ERROR",
    239: "CUSTOM.UNDO",
    240: "CUSTOM.REPEAT",
    241: "FORMULA.CONVERT",
    242: "GET.LINK.INFO",
    243: "TEXT.BOX",
    244: "INFO",
    245: "GROUP",
    246: "GET.OBJECT",
    247: "DB",
    248: "PAUSE",
    251: "RESUME",
    252: "FREQUENCY",
    253: "ADD.TOOLBAR",
    254: "DELETE.TOOLBAR",
    255: "User",
    256: "RESET.TOOLBAR",
    257: "EVALUATE",
    258: "GET.TOOLBAR",
    259: "GET.TOOL",
    260: "SPELLING.CHECK",
    261: "ERROR.TYPE",
    262: "APP.TITLE",
    263: "WINDOW.TITLE",
    264: "SAVE.TOOLBAR",
    265: "ENABLE.TOOL",
    266: "PRESS.TOOL",
    267: "REGISTER.ID",
    268: "GET.WORKBOOK",
    269: "AVEDEV",
    270: "BETADIST",
    271: "GAMMALN",
    272: "BETAINV",
    273: "BINOMDIST",
    274: "CHIDIST",
    275: "CHIINV",
    276: "COMBIN",
    277: "CONFIDENCE",
    278: "CRITBINOM",
    279: "EVEN",
    280: "EXPONDIST",
    281: "FDIST",
    282: "FINV",
    283: "FISHER",
    284: "FISHERINV",
    285: "FLOOR",
    286: "GAMMADIST",
    287: "GAMMAINV",
    288: "CEILING",
    289: "HYPGEOMDIST",
    290: "LOGNORMDIST",
    291: "LOGINV",
    292: "NEGBINOMDIST",
    293: "NORMDIST",
    294: "NORMSDIST",
    295: "NORMINV",
    296: "NORMSINV",
    297: "STANDARDIZE",
    298: "ODD",
    299: "PERMUT",
    300: "POISSON",
    301: "TDIST",
    302: "WEIBULL",
    303: "SUMXMY2",
    304: "SUMX2MY2",
    305: "SUMX2PY2",
    306: "CHITEST",
    307: "CORREL",
    308: "COVAR",
    309: "FORECAST",
    310: "FTEST",
    311: "INTERCEPT",
    312: "PEARSON",
    313: "RSQ",
    314: "STEYX",
    315: "SLOPE",
    316: "TTEST",
    317: "PROB",
    318: "DEVSQ",
    319: "GEOMEAN",
    320: "HARMEAN",
    321: "SUMSQ",
    322: "KURT",
    323: "SKEW",
    324: "ZTEST",
    325: "LARGE",
    326: "SMALL",
    327: "QUARTILE",
    328: "PERCENTILE",
    329: "PERCENTRANK",
    330: "MODE",
    331: "TRIMMEAN",
    332: "TINV",
    334: "MOVIE.COMMAND",
    335: "GET.MOVIE",
    336: "CONCATENATE",
    337: "POWER",
    338: "PIVOT.ADD.DATA",
    339: "GET.PIVOT.TABLE",
    340: "GET.PIVOT.FIELD",
    341: "GET.PIVOT.ITEM",
    342: "RADIANS",
    343: "DEGREES",
    344: "SUBTOTAL",
    345: "SUMIF",
    346: "COUNTIF",
    347: "COUNTBLANK",
    348: "SCENARIO.GET",
    349: "OPTIONS.LISTS.GET",
    350: "ISPMT",
    351: "DATEDIF",
    352: "DATESTRING",
    353: "NUMBERSTRING",
    354: "ROMAN",
    355: "OPEN.DIALOG",
    356: "SAVE.DIALOG",
    357: "VIEW.GET",
    358: "GETPIVOTDATA",
    359: "HYPERLINK",
    360: "PHONETIC",
    361: "AVERAGEA",
    362: "MAXA",
    363: "MINA",
    364: "STDEVPA",
    365: "VARPA",
    366: "STDEVA",
    367: "VARA",
    368: "BAHTTEXT",
    369: "THAIDAYOFWEEK",
    370: "THAIDIGIT",
    371: "THAIMONTHOFYEAR",
    372: "THAINUMSOUND",
    373: "THAINUMSTRING",
    374: "THAISTRINGLENGTH",
    375: "ISTHAIDIGIT",
    376: "ROUNDBAHTDOWN",
    377: "ROUNDBAHTUP",
    378: "THAIYEAR",
    379: "RTD",
    380: "CUBEVALUE",
    381: "CUBEMEMBER",
    382: "CUBEMEMBERPROPERTY",
    383: "CUBERANKEDMEMBER",
    384: "HEX2BIN",
    385: "HEX2DEC",
    386: "HEX2OCT",
    387: "DEC2BIN",
    388: "DEC2HEX",
    389: "DEC2OCT",
    390: "OCT2BIN",
    391: "OCT2HEX",
    392: "OCT2DEC",
    393: "BIN2DEC",
    394: "BIN2OCT",
    395: "BIN2HEX",
    396: "IMSUB",
    397: "IMDIV",
    398: "IMPOWER",
    399: "IMABS",
    400: "IMSQRT",
    401: "IMLN",
    402: "IMLOG2",
    403: "IMLOG10",
    404: "IMSIN",
    405: "IMCOS",
    406: "IMEXP",
    407: "IMARGUMENT",
    408: "IMCONJUGATE",
    409: "IMAGINARY",
    410: "IMREAL",
    411: "COMPLEX",
    412: "IMSUM",
    413: "IMPRODUCT",
    414: "SERIESSUM",
    415: "FACTDOUBLE",
    416: "SQRTPI",
    417: "QUOTIENT",
    418: "DELTA",
    419: "GESTEP",
    420: "ISEVEN",
    421: "ISODD",
    422: "MROUND",
    423: "ERF",
    424: "ERFC",
    425: "BESSELJ",
    426: "BESSELK",
    427: "BESSELY",
    428: "BESSELI",
    429: "XIRR",
    430: "XNPV",
    431: "PRICEMAT",
    432: "YIELDMAT",
    433: "INTRATE",
    434: "RECEIVED",
    435: "DISC",
    436: "PRICEDISC",
    437: "YIELDDISC",
    438: "TBILLEQ",
    439: "TBILLPRICE",
    440: "TBILLYIELD",
    441: "PRICE",
    442: "YIELD",
    443: "DOLLARDE",
    444: "DOLLARFR",
    445: "NOMINAL",
    446: "EFFECT",
    447: "CUMPRINC",
    448: "CUMIPMT",
    449: "EDATE",
    450: "EOMONTH",
    451: "YEARFRAC",
    452: "COUPDAYBS",
    453: "COUPDAYS",
    454: "COUPDAYSNC",
    455: "COUPNCD",
    456: "COUPNUM",
    457: "COUPPCD",
    458: "DURATION",
    459: "MDURATION",
    460: "ODDLPRICE",
    461: "ODDLYIELD",
    462: "ODDFPRICE",
    463: "ODDFYIELD",
    464: "RANDBETWEEN",
    465: "WEEKNUM",
    466: "AMORDEGRC",
    467: "AMORLINC",
    468: "CONVERT",
    724: "SHEETJS",
    469: "ACCRINT",
    470: "ACCRINTM",
    471: "WORKDAY",
    472: "NETWORKDAYS",
    473: "GCD",
    474: "MULTINOMIAL",
    475: "LCM",
    476: "FVSCHEDULE",
    477: "CUBEKPIMEMBER",
    478: "CUBESET",
    479: "CUBESETCOUNT",
    480: "IFERROR",
    481: "COUNTIFS",
    482: "SUMIFS",
    483: "AVERAGEIF",
    484: "AVERAGEIFS"
  },
  aJa = {
    2: 1,
    3: 1,
    10: 0,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 0,
    20: 1,
    21: 1,
    22: 1,
    23: 1,
    24: 1,
    25: 1,
    26: 1,
    27: 2,
    30: 2,
    31: 3,
    32: 1,
    33: 1,
    34: 0,
    35: 0,
    38: 1,
    39: 2,
    40: 3,
    41: 3,
    42: 3,
    43: 3,
    44: 3,
    45: 3,
    47: 3,
    48: 2,
    53: 1,
    61: 3,
    63: 0,
    65: 3,
    66: 3,
    67: 1,
    68: 1,
    69: 1,
    70: 1,
    71: 1,
    72: 1,
    73: 1,
    74: 0,
    75: 1,
    76: 1,
    77: 1,
    79: 2,
    80: 2,
    83: 1,
    85: 0,
    86: 1,
    89: 0,
    90: 1,
    94: 0,
    95: 0,
    97: 2,
    98: 1,
    99: 1,
    101: 3,
    102: 3,
    105: 1,
    106: 1,
    108: 2,
    111: 1,
    112: 1,
    113: 1,
    114: 1,
    117: 2,
    118: 1,
    119: 4,
    121: 1,
    126: 1,
    127: 1,
    128: 1,
    129: 1,
    130: 1,
    131: 1,
    133: 1,
    134: 1,
    135: 1,
    136: 2,
    137: 2,
    138: 2,
    140: 1,
    141: 1,
    142: 3,
    143: 4,
    144: 4,
    161: 1,
    162: 1,
    163: 1,
    164: 1,
    165: 2,
    172: 1,
    175: 2,
    176: 2,
    177: 3,
    178: 2,
    179: 1,
    184: 1,
    186: 1,
    189: 3,
    190: 1,
    195: 3,
    196: 3,
    197: 1,
    198: 1,
    199: 3,
    201: 1,
    207: 4,
    210: 3,
    211: 1,
    212: 2,
    213: 2,
    214: 1,
    215: 1,
    225: 0,
    229: 1,
    230: 1,
    231: 1,
    232: 1,
    233: 1,
    234: 1,
    235: 3,
    244: 1,
    247: 4,
    252: 2,
    257: 1,
    261: 1,
    271: 1,
    273: 4,
    274: 2,
    275: 2,
    276: 2,
    277: 3,
    278: 3,
    279: 1,
    280: 3,
    281: 3,
    282: 3,
    283: 1,
    284: 1,
    285: 2,
    286: 4,
    287: 3,
    288: 2,
    289: 4,
    290: 3,
    291: 3,
    292: 3,
    293: 4,
    294: 1,
    295: 3,
    296: 1,
    297: 3,
    298: 1,
    299: 2,
    300: 3,
    301: 3,
    302: 4,
    303: 2,
    304: 2,
    305: 2,
    306: 2,
    307: 2,
    308: 2,
    309: 3,
    310: 2,
    311: 2,
    312: 2,
    313: 2,
    314: 2,
    315: 2,
    316: 4,
    325: 2,
    326: 2,
    327: 2,
    328: 2,
    331: 2,
    332: 2,
    337: 2,
    342: 1,
    343: 1,
    346: 2,
    347: 1,
    350: 4,
    351: 3,
    352: 1,
    353: 2,
    360: 1,
    368: 1,
    369: 1,
    370: 1,
    371: 1,
    372: 1,
    373: 1,
    374: 1,
    375: 1,
    376: 1,
    377: 1,
    378: 1,
    382: 3,
    385: 1,
    392: 1,
    393: 1,
    396: 2,
    397: 2,
    398: 2,
    399: 1,
    400: 1,
    401: 1,
    402: 1,
    403: 1,
    404: 1,
    405: 1,
    406: 1,
    407: 1,
    408: 1,
    409: 1,
    410: 1,
    414: 4,
    415: 1,
    416: 1,
    417: 2,
    420: 1,
    421: 1,
    422: 2,
    424: 1,
    425: 2,
    426: 2,
    427: 2,
    428: 2,
    430: 3,
    438: 3,
    439: 3,
    440: 3,
    443: 2,
    444: 2,
    445: 2,
    446: 2,
    447: 6,
    448: 6,
    449: 2,
    450: 2,
    464: 2,
    468: 3,
    476: 2,
    479: 1,
    480: 2,
    65535: 0
  };

function pon(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function (t, n) {
    return n.replace(/\./g, "");
  }), e = e.replace(/\$'([^']|'')+'/g, function (t) {
    return t.slice(1);
  }), e = e.replace(/\$([^\]\. #$]+)/g, function (t, n) {
    return n.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? t : n;
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}

function iJa(e) {
  var t = "of:=" + e.replace(GXe, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}

function qit(e) {
  e = e.replace(/\$'([^']|'')+'/g, function (r) {
    return r.slice(1);
  }), e = e.replace(/\$([^\]\. #$]+)/g, function (r, a) {
    return a.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? r : a;
  });
  var t = e.split(":"),
    n = t[0].split(".")[0];
  return [n, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}

function zrr(e) {
  return e.replace(/!/, ".").replace(/:/, ":.");
}

var h1e = {},
  Hie = {},
  p1e = typeof Map < "u";

function KOt(e, t, n) {
  var r = 0,
    a = e.length;
  if (n) {
    if (p1e ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t)) {
      for (var i = p1e ? n.get(t) : n[t]; r < i.length; ++r) if (e[i[r]].t === t) return e.Count++, i[r];
    }
  } else for (; r < a; ++r) if (e[r].t === t) return e.Count++, r;
  return e[a] = {
    t
  }, e.Count++, e.Unique++, n && (p1e ? (n.has(t) || n.set(t, []), n.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(n, t) || (n[t] = []), n[t].push(a))), a;
}

function PCe(e, t) {
  var n = {
      min: e + 1,
      max: e + 1
    },
    r = -1;
  return t.MDW && (ix = t.MDW), t.width != null ? n.customWidth = 1 : t.wpx != null ? r = xke(t.wpx) : t.wch != null && (r = t.wch), r > -1 ? (n.width = Xze(r), n.customWidth = 1) : t.width != null && (n.width = t.width), t.hidden && (n.hidden = !0), t.level != null && (n.outlineLevel = n.level = t.level), n;
}

function BQ(e, t) {
  if (e) {
    var n = [.7, .7, .75, .75, .3, .3];
    t == "xlml" && (n = [1, 1, 1, 1, .5, .5]), e.left == null && (e.left = n[0]), e.right == null && (e.right = n[1]), e.top == null && (e.top = n[2]), e.bottom == null && (e.bottom = n[3]), e.header == null && (e.header = n[4]), e.footer == null && (e.footer = n[5]);
  }
}

function HP(e, t, n) {
  var r = n.revssf[t.z != null ? t.z : "General"],
    a = 60,
    i = e.length;
  if (r == null && n.ssf) {
    for (; a < 392; ++a) if (n.ssf[a] == null) {
      Fz(t.z, a), n.ssf[a] = t.z, n.revssf[t.z] = r = a;
      break;
    }
  }
  for (a = 0; a != i; ++a) if (e[a].numFmtId === r) return a;
  return e[i] = {
    numFmtId: r,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}

function Urr(e, t, n, r, a, i, o) {
  try {
    r.cellNF && (e.z = Cs[t]);
  } catch (l) {
    if (r.WTF) throw l;
  }
  if (!(e.t === "z" && !r.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = Rf(e.v)), (!r || r.cellText !== !1) && e.t !== "z") try {
      if (Cs[t] == null && Fz(PVa[t] || "General", t), e.t === "e") e.w = e.w || Mb[e.v];else if (t === 0) {
        if (e.t === "n") (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = fke(e.v);else if (e.t === "d") {
          var s = bg(e.v, !!o);
          (s | 0) === s ? e.w = s.toString(10) : e.w = fke(s);
        } else {
          if (e.v === void 0) return "";
          e.w = vJ(e.v, Hie);
        }
      } else e.t === "d" ? e.w = Qk(t, bg(e.v, !!o), Hie) : e.w = Qk(t, e.v, Hie);
    } catch (l) {
      if (r.WTF) throw l;
    }
    if (r.cellStyles && n != null) try {
      e.s = i.Fills[n], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = Yze(a.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), r.WTF && (e.s.fgColor.raw_rgb = a.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = Yze(a.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), r.WTF && (e.s.bgColor.raw_rgb = a.themeElements.clrScheme[e.s.bgColor.theme].rgb));
    } catch (l) {
      if (r.WTF && i.Fills) throw l;
    }
  }
}

function oJa(e, t, n) {
  if (e && e["!ref"]) {
    var r = wd(e["!ref"]);
    if (r.e.c < r.s.c || r.e.r < r.s.r) throw new Error("Bad range (" + n + "): " + e["!ref"]);
  }
}

function sJa(e, t) {
  var n = wd(t);
  n.s.r <= n.e.r && n.s.c <= n.e.c && n.s.r >= 0 && n.s.c >= 0 && (e["!ref"] = Ac(n));
}

var lJa = /<(?:\w+:)?mergeCell ref=["'][A-Z0-9:]+['"]\s*[\/]?>/g,
  cJa = /<(?:\w+:)?hyperlink [^<>]*>/mg,
  dJa = /"(\w*:\w*)"/,
  uJa = /<(?:\w+:)?col\b[^<>]*[\/]?>/g,
  hJa = /<(?:\w+:)?autoFilter[^>]*/g,
  pJa = /<(?:\w+:)?pageMargins[^<>]*\/>/g,
  $rr = /<(?:\w+:)?sheetPr\b[^<>]*?\/>/;

function mJa(e, t, n, r, a, i, o) {
  if (!e) return e;
  r || (r = {
    "!id": {}
  });
  var s = {};
  t.dense && (s["!data"] = []);
  var l = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    },
    d = "",
    u = "",
    h = Mv(e, "sheetData");
  h ? (d = e.slice(0, h.index), u = e.slice(h.index + h[0].length)) : d = u = e;
  var p = d.match($rr);
  p ? QOt(p[0], s, a, n) : (p = Mv(d, "sheetPr")) && gJa(p[0], p[1] || "", s, a, n);
  var m = (d.match(/<(?:\w*:)?dimension/) || {
    index: -1
  }).index;
  if (m > 0) {
    var f = d.slice(m, m + 50).match(dJa);
    f && !(t && t.nodim) && sJa(s, f[1]);
  }
  var y = Mv(d, "sheetViews");
  y && y[1] && TJa(y[1], a);
  var b = [];
  if (t.cellStyles) {
    var v = d.match(uJa);
    v && AJa(b, v);
  }
  h && RJa(h[1], s, t, l, i, o, a);
  var _ = u.match(hJa);
  _ && (s["!autofilter"] = IJa(_[0]));
  var w = [],
    k = u.match(lJa);
  if (k) for (m = 0; m != k.length; ++m) w[m] = wd(k[m].slice(k[m].indexOf("=") + 2));
  var A = u.match(cJa);
  A && xJa(s, A, r);
  var S = u.match(pJa);
  S && (s["!margins"] = _Ja(es(S[0])));
  var C;
  if ((C = u.match(/legacyDrawing r:id="(.*?)"/)) && (s["!legrel"] = C[1]), t && t.nodim && (l.s.c = l.s.r = 0), !s["!ref"] && l.e.c >= l.s.c && l.e.r >= l.s.r && (s["!ref"] = Ac(l)), t.sheetRows > 0 && s["!ref"]) {
    var I = wd(s["!ref"]);
    t.sheetRows <= +I.e.r && (I.e.r = t.sheetRows - 1, I.e.r > l.e.r && (I.e.r = l.e.r), I.e.r < I.s.r && (I.s.r = I.e.r), I.e.c > l.e.c && (I.e.c = l.e.c), I.e.c < I.s.c && (I.s.c = I.e.c), s["!fullref"] = s["!ref"], s["!ref"] = Ac(I));
  }
  return b.length > 0 && (s["!cols"] = b), w.length > 0 && (s["!merges"] = w), r["!id"][s["!legrel"]] && (s["!legdrawel"] = r["!id"][s["!legrel"]]), s;
}

function fJa(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', n = 0; n != e.length; ++n) t += '<mergeCell ref="' + Ac(e[n]) + '"/>';
  return t + "</mergeCells>";
}

function QOt(e, t, n, r) {
  var a = es(e);
  n.Sheets[r] || (n.Sheets[r] = {}), a.codeName && (n.Sheets[r].CodeName = jd(Ch(a.codeName)));
}

function gJa(e, t, n, r, a) {
  QOt(e.slice(0, e.indexOf(">")), n, r, a);
}

function yJa(e, t, n, r, a) {
  var i = !1,
    o = {},
    s = null;
  if (r.bookType !== "xlsx" && t.vbaraw) {
    var l = t.SheetNames[n];
    try {
      t.Workbook && (l = t.Workbook.Sheets[n].CodeName || l);
    } catch {}
    i = !0, o.codeName = CM(xc(l));
  }
  if (e && e["!outline"]) {
    var d = {
      summaryBelow: 1,
      summaryRight: 1
    };
    e["!outline"].above && (d.summaryBelow = 0), e["!outline"].left && (d.summaryRight = 0), s = (s || "") + no("outlinePr", null, d);
  }
  !i && !s || (a[a.length] = no("sheetPr", s, o));
}

var bJa = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"],
  vJa = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];

function wJa(e) {
  var t = {
    sheet: 1
  };
  return bJa.forEach(function (n) {
    e[n] != null && e[n] && (t[n] = "1");
  }), vJa.forEach(function (n) {
    e[n] != null && !e[n] && (t[n] = "0");
  }), e.password && (t.password = VOt(e.password).toString(16).toUpperCase()), no("sheetProtection", null, t);
}

function xJa(e, t, n) {
  for (var r = e["!data"] != null, a = 0; a != t.length; ++a) {
    var i = es(Ch(t[a]), !0);
    if (!i.ref) return;
    var o = ((n || {})["!id"] || [])[i.id];
    o ? (i.Target = o.Target, i.location && (i.Target += "#" + jd(i.location))) : (i.Target = "#" + jd(i.location), o = {
      Target: i.Target,
      TargetMode: "Internal"
    }), i.Rel = o, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
    for (var s = wd(i.ref), l = s.s.r; l <= s.e.r; ++l) for (var d = s.s.c; d <= s.e.c; ++d) {
      var u = ic(d) + Jc(l);
      r ? (e["!data"][l] || (e["!data"][l] = []), e["!data"][l][d] || (e["!data"][l][d] = {
        t: "z",
        v: void 0
      }), e["!data"][l][d].l = i) : (e[u] || (e[u] = {
        t: "z",
        v: void 0
      }), e[u].l = i);
    }
  }
}

function _Ja(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function (n) {
    e[n] && (t[n] = parseFloat(e[n]));
  }), t;
}

function kJa(e) {
  return BQ(e), no("pageMargins", null, e);
}

function AJa(e, t) {
  for (var n = !1, r = 0; r != t.length; ++r) {
    var a = es(t[r], !0);
    a.hidden && (a.hidden = rh(a.hidden));
    var i = parseInt(a.min, 10) - 1,
      o = parseInt(a.max, 10) - 1;
    for (a.outlineLevel && (a.level = +a.outlineLevel || 0), delete a.min, delete a.max, a.width = +a.width, !n && a.width && (n = !0, HOt(a.width)), cD(a); i <= o;) e[i++] = qu(a);
  }
}

function SJa(e, t) {
  for (var n = ["<cols>"], r, a = 0; a != t.length; ++a) (r = t[a]) && (n[n.length] = no("col", null, PCe(a, r)));
  return n[n.length] = "</cols>", n.join("");
}

function IJa(e) {
  var t = {
    ref: (e.match(/ref="([^"]*)"/) || [])[1]
  };
  return t;
}

function CJa(e, t, n, r) {
  var a = typeof e.ref == "string" ? e.ref : Ac(e.ref);
  n.Workbook || (n.Workbook = {
    Sheets: []
  }), n.Workbook.Names || (n.Workbook.Names = []);
  var i = n.Workbook.Names,
    o = Ty(a);
  o.s.r == o.e.r && (o.e.r = Ty(t["!ref"]).e.r, a = Ac(o));
  for (var s = 0; s < i.length; ++s) {
    var l = i[s];
    if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == r) {
      l.Ref = yke(n.SheetNames[r]) + "!" + Ede(a);
      break;
    }
  }
  return s == i.length && i.push({
    Name: "_xlnm._FilterDatabase",
    Sheet: r,
    Ref: "'" + n.SheetNames[r] + "'!" + a
  }), no("autoFilter", null, {
    ref: a
  });
}

var EJa = /<(?:\w:)?sheetView(?:[^<>a-z][^<>]*)?\/?>/g;

function TJa(e, t) {
  t.Views || (t.Views = [{}]), (e.match(EJa) || []).forEach(function (n, r) {
    var a = es(n);
    t.Views[r] || (t.Views[r] = {}), +a.zoomScale && (t.Views[r].zoom = +a.zoomScale), a.rightToLeft && rh(a.rightToLeft) && (t.Views[r].RTL = !0);
  });
}

function MJa(e, t, n, r) {
  var a = {
    workbookViewId: "0"
  };
  return (((r || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = r.Workbook.Views[0].RTL ? "1" : "0"), no("sheetViews", no("sheetView", null, a), {});
}

function PJa(e, t, n, r, a, i, o) {
  if (e.c && n["!comments"].push([t, e.c]), (e.v === void 0 || e.t === "z" && !(r || {}).sheetStubs) && typeof e.f != "string" && typeof e.z > "u") return "";
  var s = "",
    l = e.t,
    d = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      s = e.v ? "1" : "0";
      break;
    case "n":
      isNaN(e.v) ? (e.t = "e", s = Mb[e.v = 36]) : isFinite(e.v) ? s = "" + e.v : (e.t = "e", s = Mb[e.v = 7]);
      break;
    case "e":
      s = Mb[e.v];
      break;
    case "d":
      if (r && r.cellDates) {
        var u = Rf(e.v, o);
        s = u.toISOString(), u.getUTCFullYear() < 1900 && (s = s.slice(s.indexOf("T") + 1).replace("Z", ""));
      } else e = qu(e), e.t = "n", s = "" + (e.v = bg(Rf(e.v, o), o));
      typeof e.z > "u" && (e.z = Cs[14]);
      break;
    default:
      s = e.v;
      break;
  }
  var h = e.t == "z" || e.v == null ? "" : z1("v", xc(s)),
    p = {
      r: t
    },
    m = HP(r.cellXfs, e, r);
  switch (m !== 0 && (p.s = m), e.t) {
    case "n":
      break;
    case "d":
      p.t = "d";
      break;
    case "b":
      p.t = "b";
      break;
    case "e":
      p.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (r && r.bookSST) {
        h = z1("v", "" + KOt(r.Strings, e.v, r.revStrings)), p.t = "s";
        break;
      } else p.t = "str";
      break;
  }
  if (e.t != l && (e.t = l, e.v = d), typeof e.f == "string" && e.f) {
    var f = e.F && e.F.slice(0, t.length) == t ? {
      t: "array",
      ref: e.F
    } : null;
    h = no("f", xc(e.f), f) + (e.v != null ? h : "");
  }
  return e.l && (e.l.display = xc(s), n["!links"].push([t, e.l])), e.D && (p.cm = 1), no("c", h, p);
}

var RJa = (function () {
  var e = /<(?:\w+:)?c[ \/>]/,
    t = /<\/(?:\w+:)?row>/,
    n = /r=["']([^"']*)["']/,
    r = /ref=["']([^"']*)["']/;
  return function (i, o, s, l, d, u, h) {
    for (var p = 0, m = "", f = [], y = [], b = 0, v = 0, _ = 0, w = "", k, A, S = 0, C = 0, I, E, M = 0, T = 0, P = Array.isArray(u.CellXf), R, j = [], B = [], F = o["!data"] != null, N = [], G = {}, z = !1, V = !!s.sheetStubs, O = !!((h || {}).WBProps || {}).date1904, L = i.split(t), D = 0, U = L.length; D != U; ++D) {
      m = L[D].trim();
      var H = m.length;
      if (H !== 0) {
        var Y = 0;
        e: for (p = 0; p < H; ++p) switch (m[p]) {
          case ">":
            if (m[p - 1] != "/") {
              ++p;
              break e;
            }
            if (s && s.cellStyles) {
              if (A = es(m.slice(Y, p), !0), S = A.r != null ? parseInt(A.r, 10) : S + 1, C = -1, s.sheetRows && s.sheetRows < S) continue;
              G = {}, z = !1, A.ht && (z = !0, G.hpt = parseFloat(A.ht), G.hpx = Rde(G.hpt)), A.hidden && rh(A.hidden) && (z = !0, G.hidden = !0), A.outlineLevel != null && (z = !0, G.level = +A.outlineLevel), z && (N[S - 1] = G);
            }
            break;
          case "<":
            Y = p;
            break;
        }
        if (Y >= p) break;
        if (A = es(m.slice(Y, p), !0), S = A.r != null ? parseInt(A.r, 10) : S + 1, C = -1, !(s.sheetRows && s.sheetRows < S)) {
          s.nodim || (l.s.r > S - 1 && (l.s.r = S - 1), l.e.r < S - 1 && (l.e.r = S - 1)), s && s.cellStyles && (G = {}, z = !1, A.ht && (z = !0, G.hpt = parseFloat(A.ht), G.hpx = Rde(G.hpt)), A.hidden && rh(A.hidden) && (z = !0, G.hidden = !0), A.outlineLevel != null && (z = !0, G.level = +A.outlineLevel), z && (N[S - 1] = G)), f = m.slice(p).split(e);
          for (var K = 0; K != f.length && f[K].trim().charAt(0) == "<"; ++K);
          for (f = f.slice(K), p = 0; p != f.length; ++p) if (m = f[p].trim(), m.length !== 0) {
            if (y = m.match(n), b = p, v = 0, _ = 0, m = "<c " + (m.slice(0, 1) == "<" ? ">" : "") + m, y != null && y.length === 2) {
              for (b = 0, w = y[1], v = 0; v != w.length && !((_ = w.charCodeAt(v) - 64) < 1 || _ > 26); ++v) b = 26 * b + _;
              --b, C = b;
            } else ++C;
            for (v = 0; v != m.length && m.charCodeAt(v) !== 62; ++v);
            if (++v, A = es(m.slice(0, v), !0), A.r || (A.r = Xc({
              r: S - 1,
              c: C
            })), w = m.slice(v), k = {
              t: ""
            }, (y = Mv(w, "v")) != null && y[1] !== "" && (k.v = jd(y[1])), s.cellFormula) {
              if ((y = Mv(w, "f")) != null) {
                if (y[1] == "") y[0].indexOf('t="shared"') > -1 && (E = es(y[0]), B[E.si] && (k.f = son(B[E.si][1], B[E.si][2], A.r)));else if (k.f = jd(Ch(y[1]), !0), s.xlfn || (k.f = lon(k.f)), y[0].indexOf('t="array"') > -1) k.F = (w.match(r) || [])[1], k.F.indexOf(":") > -1 && j.push([wd(k.F), k.F]);else if (y[0].indexOf('t="shared"') > -1) {
                  E = es(y[0]);
                  var W = jd(Ch(y[1]));
                  s.xlfn || (W = lon(W)), B[parseInt(E.si, 10)] = [E, W, A.r];
                }
              } else (y = w.match(/<f[^<>]*\/>/)) && (E = es(y[0]), B[E.si] && (k.f = son(B[E.si][1], B[E.si][2], A.r)));
              var Q = Eh(A.r);
              for (v = 0; v < j.length; ++v) Q.r >= j[v][0].s.r && Q.r <= j[v][0].e.r && Q.c >= j[v][0].s.c && Q.c <= j[v][0].e.c && (k.F = j[v][1]);
            }
            if (A.t == null && k.v === void 0) {
              if (k.f || k.F) k.v = 0, k.t = "n";else if (V) k.t = "z";else continue;
            } else k.t = A.t || "n";
            switch (l.s.c > C && (l.s.c = C), l.e.c < C && (l.e.c = C), k.t) {
              case "n":
                if (k.v == "" || k.v == null) {
                  if (!V) continue;
                  k.t = "z";
                } else k.v = parseFloat(k.v);
                break;
              case "s":
                if (typeof k.v > "u") {
                  if (!V) continue;
                  k.t = "z";
                } else I = h1e[parseInt(k.v, 10)], k.v = I.t, k.r = I.r, s.cellHTML && (k.h = I.h);
                break;
              case "str":
                k.t = "s", k.v = k.v != null ? jd(Ch(k.v), !0) : "", s.cellHTML && (k.h = o1e(k.v));
                break;
              case "inlineStr":
                y = Mv(w, "is"), k.t = "s", y != null && (I = GOt(y[1])) ? (k.v = I.t, s.cellHTML && (k.h = I.h)) : k.v = "";
                break;
              case "b":
                k.v = rh(k.v);
                break;
              case "d":
                s.cellDates ? k.v = Rf(k.v, O) : (k.v = bg(Rf(k.v, O), O), k.t = "n");
                break;
              case "e":
                (!s || s.cellText !== !1) && (k.w = k.v), k.v = Lv[k.v];
                break;
            }
            if (M = T = 0, R = null, P && A.s !== void 0 && (R = u.CellXf[A.s], R != null && (R.numFmtId != null && (M = R.numFmtId), s.cellStyles && R.fillId != null && (T = R.fillId))), Urr(k, M, T, s, d, u, O), s.cellDates && P && k.t == "n" && k3(Cs[M]) && (k.v = lj(k.v + (O ? 1462 : 0)), k.t = typeof k.v == "number" ? "n" : "d"), A.cm && s.xlmeta) {
              var q = (s.xlmeta.Cell || [])[+A.cm - 1];
              q && q.type == "XLDAPR" && (k.D = !0);
            }
            var ne;
            s.nodim && (ne = Eh(A.r), l.s.r > ne.r && (l.s.r = ne.r), l.e.r < ne.r && (l.e.r = ne.r)), F ? (ne = Eh(A.r), o["!data"][ne.r] || (o["!data"][ne.r] = []), o["!data"][ne.r][ne.c] = k) : o[A.r] = k;
          }
        }
      }
    }
    N.length > 0 && (o["!rows"] = N);
  };
})();

function NJa(e, t, n, r) {
  var a = [],
    i = [],
    o = wd(e["!ref"]),
    s = "",
    l,
    d = "",
    u = [],
    h = 0,
    p = 0,
    m = e["!rows"],
    f = e["!data"] != null,
    y = f ? e["!data"] : [],
    b = {
      r: d
    },
    v,
    _ = -1,
    w = (((r || {}).Workbook || {}).WBProps || {}).date1904;
  for (p = o.s.c; p <= o.e.c; ++p) u[p] = ic(p);
  for (h = o.s.r; h <= o.e.r; ++h) {
    i = [], d = Jc(h);
    var k = f ? y[h] : [];
    for (p = o.s.c; p <= o.e.c; ++p) {
      l = u[p] + d;
      var A = f ? k[p] : e[l];
      A !== void 0 && (s = PJa(A, l, e, t, n, r, w)) != null && i.push(s);
    }
    (i.length > 0 || m && m[h]) && (b = {
      r: d
    }, m && m[h] && (v = m[h], v.hidden && (b.hidden = 1), _ = -1, v.hpx ? _ = _ke(v.hpx) : v.hpt && (_ = v.hpt), _ > -1 && (b.ht = _, b.customHeight = 1), v.level && (b.outlineLevel = v.level)), a[a.length] = no("row", i.join(""), b));
  }
  if (m) for (; h < m.length; ++h) m && m[h] && (b = {
    r: h + 1
  }, v = m[h], v.hidden && (b.hidden = 1), _ = -1, v.hpx ? _ = _ke(v.hpx) : v.hpt && (_ = v.hpt), _ > -1 && (b.ht = _, b.customHeight = 1), v.level && (b.outlineLevel = v.level), a[a.length] = no("row", "", b));
  return a.join("");
}

function jJa(e, t, n, r) {
  var a = [e0, no("worksheet", null, {
      xmlns: HZ[0],
      "xmlns:r": fb.r
    })],
    i = n.SheetNames[e],
    o = 0,
    s = "",
    l = n.Sheets[i];
  l == null && (l = {});
  var d = l["!ref"] || "A1",
    u = wd(d);
  if (u.e.c > 16383 || u.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + d + " exceeds format limit A1:XFD1048576");
    u.e.c = Math.min(u.e.c, 16383), u.e.r = Math.min(u.e.c, 1048575), d = Ac(u);
  }
  r || (r = {}), l["!comments"] = [];
  var h = [];
  yJa(l, n, e, t, a), a[a.length] = no("dimension", null, {
    ref: d
  }), a[a.length] = MJa(l, t, e, n), t.sheetFormat && (a[a.length] = no("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), l["!cols"] != null && l["!cols"].length > 0 && (a[a.length] = SJa(l, l["!cols"])), a[o = a.length] = "<sheetData/>", l["!links"] = [], l["!ref"] != null && (s = NJa(l, t, e, n), s.length > 0 && (a[a.length] = s)), a.length > o + 1 && (a[a.length] = "</sheetData>", a[o] = a[o].replace("/>", ">")), l["!protect"] && (a[a.length] = wJa(l["!protect"])), l["!autofilter"] != null && (a[a.length] = CJa(l["!autofilter"], l, n, e)), l["!merges"] != null && l["!merges"].length > 0 && (a[a.length] = fJa(l["!merges"]));
  var p = -1,
    m,
    f = -1;
  return l["!links"].length > 0 && (a[a.length] = "<hyperlinks>", l["!links"].forEach(function (y) {
    y[1].Target && (m = {
      ref: y[0]
    }, y[1].Target.charAt(0) != "#" && (f = Ju(r, -1, xc(y[1].Target).replace(/#[\s\S]*$/, ""), Kc.HLINK), m["r:id"] = "rId" + f), (p = y[1].Target.indexOf("#")) > -1 && (m.location = xc(y[1].Target.slice(p + 1))), y[1].Tooltip && (m.tooltip = xc(y[1].Tooltip)), m.display = y[1].display, a[a.length] = no("hyperlink", null, m));
  }), a[a.length] = "</hyperlinks>"), delete l["!links"], l["!margins"] != null && (a[a.length] = kJa(l["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = z1("ignoredErrors", no("ignoredError", null, {
    numberStoredAsText: 1,
    sqref: d
  }))), h.length > 0 && (f = Ju(r, -1, "../drawings/drawing" + (e + 1) + ".xml", Kc.DRAW), a[a.length] = no("drawing", null, {
    "r:id": "rId" + f
  }), l["!drawing"] = h), l["!comments"].length > 0 && (f = Ju(r, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Kc.VML), a[a.length] = no("legacyDrawing", null, {
    "r:id": "rId" + f
  }), l["!legacy"] = f), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("");
}

function DJa(e, t) {
  var n = {},
    r = e.l + t;
  n.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = r, i & 7 && (n.level = i & 7), i & 16 && (n.hidden = !0), i & 32 && (n.hpt = a / 20), n;
}

function LJa(e, t, n) {
  var r = Ja(145),
    a = (n["!rows"] || [])[e] || {};
  r.write_shift(4, e), r.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = _ke(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), r.write_shift(2, i), r.write_shift(1, 0);
  var o = 0;
  a.level && (o |= a.level), a.hidden && (o |= 16), (a.hpx || a.hpt) && (o |= 32), r.write_shift(1, o), r.write_shift(1, 0);
  var s = 0,
    l = r.l;
  r.l += 4;
  for (var d = {
      r: e,
      c: 0
    }, u = n["!data"] != null, h = 0; h < 16; ++h) if (!(t.s.c > h + 1 << 10 || t.e.c < h << 10)) {
    for (var p = -1, m = -1, f = h << 10; f < h + 1 << 10; ++f) {
      d.c = f;
      var y = u ? (n["!data"][d.r] || [])[d.c] : n[Xc(d)];
      y && (p < 0 && (p = f), m = f);
    }
    p < 0 || (++s, r.write_shift(4, p), r.write_shift(4, m));
  }
  var b = r.l;
  return r.l = l, r.write_shift(4, s), r.l = b, r.length > r.l ? r.slice(0, r.l) : r;
}

function OJa(e, t, n, r) {
  var a = LJa(r, n, t);
  (a.length > 17 || (t["!rows"] || [])[r]) && Ei(e, 0, a);
}

var BJa = QZ,
  FJa = _pe;

function zJa() {}

function UJa(e, t) {
  var n = {},
    r = e[e.l];
  return ++e.l, n.above = !(r & 64), n.left = !(r & 128), e.l += 18, n.name = PHa(e), n;
}

function $Ja(e, t, n) {
  n == null && (n = Ja(84 + 4 * e.length));
  var r = 192;
  t && (t.above && (r &= -65), t.left && (r &= -129)), n.write_shift(1, r);
  for (var a = 1; a < 3; ++a) n.write_shift(1, 0);
  return qze({
    auto: 1
  }, n), n.write_shift(-4, -1), n.write_shift(-4, -1), Gnr(e, n), n.slice(0, n.l);
}

function GJa(e) {
  var t = gI(e);
  return [t];
}

function VJa(e, t, n) {
  return n == null && (n = Ja(8)), WZ(t, n);
}

function HJa(e) {
  var t = qZ(e);
  return [t];
}

function WJa(e, t, n) {
  return n == null && (n = Ja(4)), KZ(t, n);
}

function qJa(e) {
  var t = gI(e),
    n = e.read_shift(1);
  return [t, n, "b"];
}

function KJa(e, t, n) {
  return n == null && (n = Ja(9)), WZ(t, n), n.write_shift(1, e.v ? 1 : 0), n;
}

function QJa(e) {
  var t = qZ(e),
    n = e.read_shift(1);
  return [t, n, "b"];
}

function YJa(e, t, n) {
  return n == null && (n = Ja(5)), KZ(t, n), n.write_shift(1, e.v ? 1 : 0), n;
}

function XJa(e) {
  var t = gI(e),
    n = e.read_shift(1);
  return [t, n, "e"];
}

function Kit(e, t, n) {
  return n == null && (n = Ja(9)), WZ(t, n), n.write_shift(1, e.v), n;
}

function JJa(e) {
  var t = qZ(e),
    n = e.read_shift(1);
  return [t, n, "e"];
}

function Qit(e, t, n) {
  return n == null && (n = Ja(8)), KZ(t, n), n.write_shift(1, e.v), n.write_shift(2, 0), n.write_shift(1, 0), n;
}

function ZJa(e) {
  var t = gI(e),
    n = e.read_shift(4);
  return [t, n, "s"];
}

function eZa(e, t, n) {
  return n == null && (n = Ja(12)), WZ(t, n), n.write_shift(4, t.v), n;
}

function tZa(e) {
  var t = qZ(e),
    n = e.read_shift(4);
  return [t, n, "s"];
}

function nZa(e, t, n) {
  return n == null && (n = Ja(8)), KZ(t, n), n.write_shift(4, t.v), n;
}

function rZa(e) {
  var t = gI(e),
    n = cx(e);
  return [t, n, "n"];
}

function aZa(e, t, n) {
  return n == null && (n = Ja(16)), WZ(t, n), kJ(e.v, n), n;
}

function Grr(e) {
  var t = qZ(e),
    n = cx(e);
  return [t, n, "n"];
}

function iZa(e, t, n) {
  return n == null && (n = Ja(12)), KZ(t, n), kJ(e.v, n), n;
}

function oZa(e) {
  var t = gI(e),
    n = UXe(e);
  return [t, n, "n"];
}

function sZa(e, t, n) {
  return n == null && (n = Ja(12)), WZ(t, n), Vnr(e.v, n), n;
}

function lZa(e) {
  var t = qZ(e),
    n = UXe(e);
  return [t, n, "n"];
}

function cZa(e, t, n) {
  return n == null && (n = Ja(8)), KZ(t, n), Vnr(e.v, n), n;
}

function dZa(e) {
  var t = gI(e),
    n = LOt(e);
  return [t, n, "is"];
}

function uZa(e) {
  var t = gI(e),
    n = Ax(e);
  return [t, n, "str"];
}

function hZa(e, t, n) {
  var r = e.v == null ? "" : String(e.v);
  return n == null && (n = Ja(12 + 4 * e.v.length)), WZ(t, n), kb(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}

function pZa(e) {
  var t = qZ(e),
    n = Ax(e);
  return [t, n, "str"];
}

function mZa(e, t, n) {
  var r = e.v == null ? "" : String(e.v);
  return n == null && (n = Ja(8 + 4 * r.length)), KZ(t, n), kb(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}

function fZa(e, t, n) {
  var r = e.l + t,
    a = gI(e);
  a.r = n["!row"];
  var i = e.read_shift(1),
    o = [a, i, "b"];
  if (n.cellFormula) {
    e.l += 2;
    var s = HXe(e, r - e.l, n);
    o[3] = tx(s, null, a, n.supbooks, n);
  } else e.l = r;
  return o;
}

function gZa(e, t, n) {
  var r = e.l + t,
    a = gI(e);
  a.r = n["!row"];
  var i = e.read_shift(1),
    o = [a, i, "e"];
  if (n.cellFormula) {
    e.l += 2;
    var s = HXe(e, r - e.l, n);
    o[3] = tx(s, null, a, n.supbooks, n);
  } else e.l = r;
  return o;
}

function yZa(e, t, n) {
  var r = e.l + t,
    a = gI(e);
  a.r = n["!row"];
  var i = cx(e),
    o = [a, i, "n"];
  if (n.cellFormula) {
    e.l += 2;
    var s = HXe(e, r - e.l, n);
    o[3] = tx(s, null, a, n.supbooks, n);
  } else e.l = r;
  return o;
}

function bZa(e, t, n) {
  var r = e.l + t,
    a = gI(e);
  a.r = n["!row"];
  var i = Ax(e),
    o = [a, i, "str"];
  if (n.cellFormula) {
    e.l += 2;
    var s = HXe(e, r - e.l, n);
    o[3] = tx(s, null, a, n.supbooks, n);
  } else e.l = r;
  return o;
}

var vZa = QZ,
  wZa = _pe;

function xZa(e, t) {
  return t == null && (t = Ja(4)), t.write_shift(4, e), t;
}

function _Za(e, t) {
  var n = e.l + t,
    r = QZ(e),
    a = zXe(e),
    i = Ax(e),
    o = Ax(e),
    s = Ax(e);
  e.l = n;
  var l = {
    rfx: r,
    relId: a,
    loc: i,
    display: s
  };
  return o && (l.Tooltip = o), l;
}

function kZa(e, t) {
  var n = Ja(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  _pe({
    s: Eh(e[0]),
    e: Eh(e[0])
  }, n), OOt("rId" + t, n);
  var r = e[1].Target.indexOf("#"),
    a = r == -1 ? "" : e[1].Target.slice(r + 1);
  return kb(a || "", n), kb(e[1].Tooltip || "", n), kb("", n), n.slice(0, n.l);
}

function AZa() {}

function SZa(e, t, n) {
  var r = e.l + t,
    a = Hnr(e),
    i = e.read_shift(1),
    o = [a];
  if (o[2] = i, n.cellFormula) {
    var s = GXa(e, r - e.l, n);
    o[1] = s;
  } else e.l = r;
  return o;
}

function IZa(e, t, n) {
  var r = e.l + t,
    a = QZ(e),
    i = [a];
  if (n.cellFormula) {
    var o = HXa(e, r - e.l, n);
    i[1] = o, e.l = r;
  } else e.l = r;
  return i;
}

function CZa(e, t, n) {
  n == null && (n = Ja(18));
  var r = PCe(e, t);
  n.write_shift(-4, e), n.write_shift(-4, e), n.write_shift(4, (r.width || 10) * 256), n.write_shift(4, 0);
  var a = 0;
  return t.hidden && (a |= 1), typeof r.width == "number" && (a |= 2), t.level && (a |= t.level << 8), n.write_shift(2, a), n;
}

var Vrr = ["left", "right", "top", "bottom", "header", "footer"];

function EZa(e) {
  var t = {};
  return Vrr.forEach(function (n) {
    t[n] = cx(e);
  }), t;
}

function TZa(e, t) {
  return t == null && (t = Ja(48)), BQ(e), Vrr.forEach(function (n) {
    kJ(e[n], t);
  }), t;
}

function MZa(e) {
  var t = e.read_shift(2);
  return e.l += 28, {
    RTL: t & 32
  };
}

function PZa(e, t, n) {
  n == null && (n = Ja(30));
  var r = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (r |= 32), n.write_shift(2, r), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(1, 0), n.write_shift(1, 0), n.write_shift(2, 0), n.write_shift(2, 100), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(2, 0), n.write_shift(4, 0), n;
}

function RZa(e) {
  var t = Ja(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), _pe(e, t), t;
}

function NZa(e, t) {
  return t == null && (t = Ja(66)), t.write_shift(2, e.password ? VOt(e.password) : 0), t.write_shift(4, 1), [["objects", !1], ["scenarios", !1], ["formatCells", !0], ["formatColumns", !0], ["formatRows", !0], ["insertColumns", !0], ["insertRows", !0], ["insertHyperlinks", !0], ["deleteColumns", !0], ["deleteRows", !0], ["selectLockedCells", !1], ["sort", !0], ["autoFilter", !0], ["pivotTables", !0], ["selectUnlockedCells", !1]].forEach(function (n) {
    n[1] ? t.write_shift(4, e[n[0]] != null && !e[n[0]] ? 1 : 0) : t.write_shift(4, e[n[0]] != null && e[n[0]] ? 0 : 1);
  }), t;
}

function jZa() {}

function DZa() {}

function LZa(e, t, n, r, a, i, o) {
  if (!e) return e;
  var s = t || {};
  r || (r = {
    "!id": {}
  });
  var l = {};
  s.dense && (l["!data"] = []);
  var d,
    u = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    },
    h = !1,
    p = !1,
    m,
    f,
    y,
    b,
    v,
    _,
    w,
    k,
    A,
    S = [];
  s.biff = 12, s["!row"] = 0;
  var C = 0,
    I = !1,
    E = [],
    M = {},
    T = s.supbooks || a.supbooks || [[]];
  if (T.sharedf = M, T.arrayf = E, T.SheetNames = a.SheetNames || a.Sheets.map(function (z) {
    return z.name;
  }), !s.supbooks && (s.supbooks = T, a.Names)) for (var P = 0; P < a.Names.length; ++P) T[0][P + 1] = a.Names[P];
  var R = [],
    j = [],
    B = !1;
  kke[16] = {
    n: "BrtShortReal",
    f: Grr
  };
  var F,
    N = 1462 * +!!((a || {}).WBProps || {}).date1904;
  if (GD(e, function (V, O, L) {
    if (!p) switch (L) {
      case 148:
        d = V;
        break;
      case 0:
        m = V, s.sheetRows && s.sheetRows <= m.r && (p = !0), k = Jc(b = m.r), s["!row"] = m.r, (V.hidden || V.hpt || V.level != null) && (V.hpt && (V.hpx = Rde(V.hpt)), j[V.r] = V);
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 62:
        switch (f = {
          t: V[2]
        }, V[2]) {
          case "n":
            f.v = V[1];
            break;
          case "s":
            w = h1e[V[1]], f.v = w.t, f.r = w.r;
            break;
          case "b":
            f.v = !!V[1];
            break;
          case "e":
            f.v = V[1], s.cellText !== !1 && (f.w = Mb[f.v]);
            break;
          case "str":
            f.t = "s", f.v = V[1];
            break;
          case "is":
            f.t = "s", f.v = V[1].t;
            break;
        }
        if ((y = o.CellXf[V[0].iStyleRef]) && Urr(f, y.numFmtId, null, s, i, o, N > 0), v = V[0].c == -1 ? v + 1 : V[0].c, s.dense ? (l["!data"][b] || (l["!data"][b] = []), l["!data"][b][v] = f) : l[ic(v) + k] = f, s.cellFormula) {
          for (I = !1, C = 0; C < E.length; ++C) {
            var D = E[C];
            m.r >= D[0].s.r && m.r <= D[0].e.r && v >= D[0].s.c && v <= D[0].e.c && (f.F = Ac(D[0]), I = !0);
          }
          !I && V.length > 3 && (f.f = V[3]);
        }
        if (u.s.r > m.r && (u.s.r = m.r), u.s.c > v && (u.s.c = v), u.e.r < m.r && (u.e.r = m.r), u.e.c < v && (u.e.c = v), s.cellDates && y && f.t == "n" && k3(Cs[y.numFmtId])) {
          var U = E6(f.v + N);
          U && (f.t = "d", f.v = new Date(Date.UTC(U.y, U.m - 1, U.d, U.H, U.M, U.S, U.u)));
        }
        F && (F.type == "XLDAPR" && (f.D = !0), F = void 0);
        break;
      case 1:
      case 12:
        if (!s.sheetStubs || h) break;
        f = {
          t: "z",
          v: void 0
        }, v = V[0].c == -1 ? v + 1 : V[0].c, s.dense ? (l["!data"][b] || (l["!data"][b] = []), l["!data"][b][v] = f) : l[ic(v) + k] = f, u.s.r > m.r && (u.s.r = m.r), u.s.c > v && (u.s.c = v), u.e.r < m.r && (u.e.r = m.r), u.e.c < v && (u.e.c = v), F && (F.type == "XLDAPR" && (f.D = !0), F = void 0);
        break;
      case 176:
        S.push(V);
        break;
      case 49:
        F = ((s.xlmeta || {}).Cell || [])[V - 1];
        break;
      case 494:
        var H = r["!id"][V.relId];
        for (H ? (V.Target = H.Target, V.loc && (V.Target += "#" + V.loc), V.Rel = H) : V.relId == "" && (V.Target = "#" + V.loc), b = V.rfx.s.r; b <= V.rfx.e.r; ++b) for (v = V.rfx.s.c; v <= V.rfx.e.c; ++v) s.dense ? (l["!data"][b] || (l["!data"][b] = []), l["!data"][b][v] || (l["!data"][b][v] = {
          t: "z",
          v: void 0
        }), l["!data"][b][v].l = V) : (_ = ic(v) + Jc(b), l[_] || (l[_] = {
          t: "z",
          v: void 0
        }), l[_].l = V);
        break;
      case 426:
        if (!s.cellFormula) break;
        E.push(V), A = s.dense ? l["!data"][b][v] : l[ic(v) + k], A.f = tx(V[1], u, {
          r: m.r,
          c: v
        }, T, s), A.F = Ac(V[0]);
        break;
      case 427:
        if (!s.cellFormula) break;
        M[Xc(V[0].s)] = V[1], A = s.dense ? l["!data"][b][v] : l[ic(v) + k], A.f = tx(V[1], u, {
          r: m.r,
          c: v
        }, T, s);
        break;
      case 60:
        if (!s.cellStyles) break;
        for (; V.e >= V.s;) R[V.e--] = {
          width: V.w / 256,
          hidden: !!(V.flags & 1),
          level: V.level
        }, B || (B = !0, HOt(V.w / 256)), cD(R[V.e + 1]);
        break;
      case 551:
        V && (l["!legrel"] = V);
        break;
      case 161:
        l["!autofilter"] = {
          ref: Ac(V)
        };
        break;
      case 476:
        l["!margins"] = V;
        break;
      case 147:
        a.Sheets[n] || (a.Sheets[n] = {}), V.name && (a.Sheets[n].CodeName = V.name), (V.above || V.left) && (l["!outline"] = {
          above: V.above,
          left: V.left
        });
        break;
      case 137:
        a.Views || (a.Views = [{}]), a.Views[0] || (a.Views[0] = {}), V.RTL && (a.Views[0].RTL = !0);
        break;
      case 485:
        break;
      case 64:
      case 1053:
        break;
      case 151:
        break;
      case 152:
      case 175:
      case 644:
      case 625:
      case 562:
      case 396:
      case 1112:
      case 1146:
      case 471:
      case 1050:
      case 649:
      case 1105:
      case 589:
      case 607:
      case 564:
      case 1055:
      case 168:
      case 174:
      case 1180:
      case 499:
      case 507:
      case 550:
      case 171:
      case 167:
      case 1177:
      case 169:
      case 1181:
      case 552:
      case 661:
      case 639:
      case 478:
      case 537:
      case 477:
      case 536:
      case 1103:
      case 680:
      case 1104:
      case 1024:
      case 663:
      case 535:
      case 678:
      case 504:
      case 1043:
      case 428:
      case 170:
      case 3072:
      case 50:
      case 2070:
      case 1045:
        break;
      case 35:
        h = !0;
        break;
      case 36:
        h = !1;
        break;
      case 37:
        h = !0;
        break;
      case 38:
        h = !1;
        break;
      default:
        if (!O.T) {
          if (!h || s.WTF) throw new Error("Unexpected record 0x" + L.toString(16));
        }
    }
  }, s), delete s.supbooks, delete s["!row"], !l["!ref"] && (u.s.r < 2e6 || d && (d.e.r > 0 || d.e.c > 0 || d.s.r > 0 || d.s.c > 0)) && (l["!ref"] = Ac(d || u)), s.sheetRows && l["!ref"]) {
    var G = wd(l["!ref"]);
    s.sheetRows <= +G.e.r && (G.e.r = s.sheetRows - 1, G.e.r > u.e.r && (G.e.r = u.e.r), G.e.r < G.s.r && (G.s.r = G.e.r), G.e.c > u.e.c && (G.e.c = u.e.c), G.e.c < G.s.c && (G.s.c = G.e.c), l["!fullref"] = l["!ref"], l["!ref"] = Ac(G));
  }
  return S.length > 0 && (l["!merges"] = S), R.length > 0 && (l["!cols"] = R), j.length > 0 && (l["!rows"] = j), r["!id"][l["!legrel"]] && (l["!legdrawel"] = r["!id"][l["!legrel"]]), l;
}

function OZa(e, t, n, r, a, i, o, s) {
  var l = {
    r: n,
    c: r
  };
  if (t.c && i["!comments"].push([Xc(l), t.c]), t.v === void 0) return !1;
  var d = "";
  switch (t.t) {
    case "b":
      d = t.v ? "1" : "0";
      break;
    case "d":
      t = qu(t), t.z = t.z || Cs[14], t.v = bg(Rf(t.v, s), s), t.t = "n";
      break;
    case "n":
    case "e":
      d = "" + t.v;
      break;
    default:
      d = t.v;
      break;
  }
  switch (l.s = HP(a.cellXfs, t, a), t.l && i["!links"].push([Xc(l), t.l]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (d = KOt(a.Strings, t.v == null ? "" : String(t.v), a.revStrings), l.t = "s", l.v = d, o ? Ei(e, 18, nZa(t, l)) : Ei(e, 7, eZa(t, l))) : (l.t = "str", o ? Ei(e, 17, mZa(t, l)) : Ei(e, 6, hZa(t, l))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? o ? Ei(e, 13, cZa(t, l)) : Ei(e, 2, sZa(t, l)) : isFinite(t.v) ? o ? Ei(e, 16, iZa(t, l)) : Ei(e, 5, aZa(t, l)) : (l.t = "e", isNaN(t.v) ? o ? Ei(e, 14, Qit({
        v: 36
      }, l)) : Ei(e, 3, Kit({
        v: 36
      }, l)) : o ? Ei(e, 14, Qit({
        v: 7
      }, l)) : Ei(e, 3, Kit({
        v: 7
      }, l))), !0;
    case "b":
      return l.t = "b", o ? Ei(e, 15, YJa(t, l)) : Ei(e, 4, KJa(t, l)), !0;
    case "e":
      return l.t = "e", o ? Ei(e, 14, Qit(t, l)) : Ei(e, 3, Kit(t, l)), !0;
  }
  return o ? Ei(e, 12, WJa(t, l)) : Ei(e, 1, VJa(t, l)), !0;
}

function BZa(e, t, n, r, a) {
  var i = wd(t["!ref"] || "A1"),
    o = "",
    s = [],
    l = (((a || {}).Workbook || {}).WBProps || {}).date1904;
  Ei(e, 145);
  var d = t["!data"] != null,
    u = d ? t["!data"][i.s.r] : [],
    h = i.e.r;
  t["!rows"] && (h = Math.max(i.e.r, t["!rows"].length - 1));
  for (var p = i.s.r; p <= h; ++p) if (o = Jc(p), d && (u = t["!data"][p]), OJa(e, t, i, p), !(d && !u)) {
    var m = !1;
    if (p <= i.e.r) for (var f = i.s.c; f <= i.e.c; ++f) {
      p === i.s.r && (s[f] = ic(f));
      var y = d ? u[f] : t[s[f] + o];
      if (!y) {
        m = !1;
        continue;
      }
      m = OZa(e, y, p, f, r, t, m, l);
    }
  }
  Ei(e, 146);
}

function FZa(e, t) {
  !t || !t["!merges"] || (Ei(e, 177, xZa(t["!merges"].length)), t["!merges"].forEach(function (n) {
    Ei(e, 176, wZa(n));
  }), Ei(e, 178));
}

function zZa(e, t) {
  !t || !t["!cols"] || (Ei(e, 390), t["!cols"].forEach(function (n, r) {
    n && Ei(e, 60, CZa(r, n));
  }), Ei(e, 391));
}

function UZa(e, t) {
  !t || !t["!ref"] || (Ei(e, 648), Ei(e, 649, RZa(wd(t["!ref"]))), Ei(e, 650));
}

function $Za(e, t, n) {
  t["!links"].forEach(function (r) {
    if (r[1].Target) {
      var a = Ju(n, -1, r[1].Target.replace(/#[\s\S]*$/, ""), Kc.HLINK);
      Ei(e, 494, kZa(r, a));
    }
  }), delete t["!links"];
}

function GZa(e, t, n, r) {
  if (t["!comments"].length > 0) {
    var a = Ju(r, -1, "../drawings/vmlDrawing" + (n + 1) + ".vml", Kc.VML);
    Ei(e, 551, OOt("rId" + a)), t["!legacy"] = a;
  }
}

function VZa(e, t, n, r) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"],
      i = typeof a.ref == "string" ? a.ref : Ac(a.ref);
    n.Workbook || (n.Workbook = {
      Sheets: []
    }), n.Workbook.Names || (n.Workbook.Names = []);
    var o = n.Workbook.Names,
      s = Ty(i);
    s.s.r == s.e.r && (s.e.r = Ty(t["!ref"]).e.r, i = Ac(s));
    for (var l = 0; l < o.length; ++l) {
      var d = o[l];
      if (d.Name == "_xlnm._FilterDatabase" && d.Sheet == r) {
        d.Ref = yke(n.SheetNames[r]) + "!" + Ede(i);
        break;
      }
    }
    l == o.length && o.push({
      Name: "_xlnm._FilterDatabase",
      Sheet: r,
      Ref: yke(n.SheetNames[r]) + "!" + Ede(i)
    }), Ei(e, 161, _pe(wd(i))), Ei(e, 162);
  }
}

function HZa(e, t, n) {
  Ei(e, 133), Ei(e, 137, PZa(t, n)), Ei(e, 138), Ei(e, 134);
}

function WZa(e, t) {
  t["!protect"] && Ei(e, 535, NZa(t["!protect"]));
}

function qZa(e, t, n, r) {
  var a = kx(),
    i = n.SheetNames[e],
    o = n.Sheets[i] || {},
    s = i;
  try {
    n && n.Workbook && (s = n.Workbook.Sheets[e].CodeName || s);
  } catch {}
  var l = wd(o["!ref"] || "A1");
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (o["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575);
  }
  return o["!links"] = [], o["!comments"] = [], Ei(a, 129), (n.vbaraw || o["!outline"]) && Ei(a, 147, $Ja(s, o["!outline"])), Ei(a, 148, FJa(l)), HZa(a, o, n.Workbook), zZa(a, o), BZa(a, o, e, t, n), WZa(a, o), VZa(a, o, n, e), FZa(a, o), $Za(a, o, r), o["!margins"] && Ei(a, 476, TZa(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && UZa(a, o), GZa(a, o, e, r), Ei(a, 130), a.end();
}

function KZa(e) {
  var t = [],
    n = e.match(/^<c:numCache>/),
    r;
  (e.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<])<\/c:v><\/c:pt>/mg) || []).forEach(function (i) {
    var o = i.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<]*)<\/c:v><\/c:pt>/);
    o && (t[+o[1]] = n ? +o[2] : o[2]);
  });
  var a = jd((NQ(e, "c:formatCode") || ["", "General"])[1]);
  return (kOt(e, "<c:f>", "</c:f>") || []).forEach(function (i) {
    r = i.replace(/<[^<>]*>/g, "");
  }), [t, a, r];
}

function QZa(e, t, n, r, a, i) {
  var o = i || {
    "!type": "chart"
  };
  if (!e) return i;
  var s = 0,
    l = 0,
    d = "A",
    u = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
  return (kOt(e, "<c:numCache>", "</c:numCache>") || []).forEach(function (h) {
    var p = KZa(h);
    u.s.r = u.s.c = 0, u.e.c = s, d = ic(s), p[0].forEach(function (m, f) {
      o["!data"] ? (o["!data"][f] || (o["!data"][f] = []), o["!data"][f][s] = {
        t: "n",
        v: m,
        z: p[1]
      }) : o[d + Jc(f)] = {
        t: "n",
        v: m,
        z: p[1]
      }, l = f;
    }), u.e.r < l && (u.e.r = l), ++s;
  }), s > 0 && (o["!ref"] = Ac(u)), o;
}

function YZa(e, t, n, r, a) {
  if (!e) return e;
  r || (r = {
    "!id": {}
  });
  var i = {
      "!type": "chart",
      "!drawel": null,
      "!rel": ""
    },
    o,
    s = e.match($rr);
  return s && QOt(s[0], i, a, n), (o = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = o[1]), r["!id"][i["!rel"]] && (i["!drawel"] = r["!id"][i["!rel"]]), i;
}

function XZa(e, t) {
  e.l += 10;
  var n = Ax(e);
  return {
    name: n
  };
}

function JZa(e, t, n, r, a) {
  if (!e) return e;
  r || (r = {
    "!id": {}
  });
  var i = {
      "!type": "chart",
      "!drawel": null,
      "!rel": ""
    },
    o = !1;
  return GD(e, function (l, d, u) {
    switch (u) {
      case 550:
        i["!rel"] = l;
        break;
      case 651:
        a.Sheets[n] || (a.Sheets[n] = {}), l.name && (a.Sheets[n].CodeName = l.name);
        break;
      case 562:
      case 652:
      case 669:
      case 679:
      case 551:
      case 552:
      case 476:
      case 3072:
        break;
      case 35:
        o = !0;
        break;
      case 36:
        o = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!(d.T > 0)) {
          if (!(d.T < 0)) {
            if (!o || t.WTF) throw new Error("Unexpected record 0x" + u.toString(16));
          }
        }
    }
  }, t), r["!id"][i["!rel"]] && (i["!drawel"] = r["!id"][i["!rel"]]), i;
}

var YOt = [["allowRefreshQuery", !1, "bool"], ["autoCompressPictures", !0, "bool"], ["backupFile", !1, "bool"], ["checkCompatibility", !1, "bool"], ["CodeName", ""], ["date1904", !1, "bool"], ["defaultThemeVersion", 0, "int"], ["filterPrivacy", !1, "bool"], ["hidePivotFieldList", !1, "bool"], ["promptedSolutions", !1, "bool"], ["publishItems", !1, "bool"], ["refreshAllConnections", !1, "bool"], ["saveExternalLinkValues", !0, "bool"], ["showBorderUnselectedTables", !0, "bool"], ["showInkAnnotation", !0, "bool"], ["showObjects", "all"], ["showPivotChartFilter", !1, "bool"], ["updateLinks", "userSet"]],
  ZZa = [["activeTab", 0, "int"], ["autoFilterDateGrouping", !0, "bool"], ["firstSheet", 0, "int"], ["minimized", !1, "bool"], ["showHorizontalScroll", !0, "bool"], ["showSheetTabs", !0, "bool"], ["showVerticalScroll", !0, "bool"], ["tabRatio", 600, "int"], ["visibility", "visible"]],
  eei = [],
  tei = [["calcCompleted", "true"], ["calcMode", "auto"], ["calcOnSave", "true"], ["concurrentCalc", "true"], ["fullCalcOnLoad", "false"], ["fullPrecision", "true"], ["iterate", "false"], ["iterateCount", "100"], ["iterateDelta", "0.001"], ["refMode", "A1"]];

function mon(e, t) {
  for (var n = 0; n != e.length; ++n) for (var r = e[n], a = 0; a != t.length; ++a) {
    var i = t[a];
    if (r[i[0]] == null) r[i[0]] = i[1];else switch (i[2]) {
      case "bool":
        typeof r[i[0]] == "string" && (r[i[0]] = rh(r[i[0]]));
        break;
      case "int":
        typeof r[i[0]] == "string" && (r[i[0]] = parseInt(r[i[0]], 10));
        break;
    }
  }
}

function fon(e, t) {
  for (var n = 0; n != t.length; ++n) {
    var r = t[n];
    if (e[r[0]] == null) e[r[0]] = r[1];else switch (r[2]) {
      case "bool":
        typeof e[r[0]] == "string" && (e[r[0]] = rh(e[r[0]]));
        break;
      case "int":
        typeof e[r[0]] == "string" && (e[r[0]] = parseInt(e[r[0]], 10));
        break;
    }
  }
}

function Hrr(e) {
  fon(e.WBProps, YOt), fon(e.CalcPr, tei), mon(e.WBView, ZZa), mon(e.Sheets, eei), Hie.date1904 = rh(e.WBProps.date1904);
}

function nei(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : rh(e.Workbook.WBProps.date1904) ? "true" : "false";
}

var rei = ":][*?/\\".split("");

function Wrr(e, t) {
  try {
    if (e == "") throw new Error("Sheet name cannot be blank");
    if (e.length > 31) throw new Error("Sheet name cannot exceed 31 chars");
    if (e.charCodeAt(0) == 39 || e.charCodeAt(e.length - 1) == 39) throw new Error("Sheet name cannot start or end with apostrophe (')");
    if (e.toLowerCase() == "history") throw new Error("Sheet name cannot be 'History'");
    rei.forEach(function (n) {
      if (e.indexOf(n) != -1) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
    });
  } catch (n) {
    throw n;
  }
  return !0;
}

function aei(e, t, n) {
  e.forEach(function (r, a) {
    Wrr(r);
    for (var i = 0; i < a; ++i) if (r == e[i]) throw new Error("Duplicate Sheet Name: " + r);
    if (n) {
      var o = t && t[a] && t[a].CodeName || r;
      if (o.charCodeAt(0) == 95 && o.length > 22) throw new Error("Bad Code Name: Worksheet" + o);
    }
  });
}

function qrr(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  aei(e.SheetNames, t, !!e.vbaraw);
  for (var n = 0; n < e.SheetNames.length; ++n) oJa(e.Sheets[e.SheetNames[n]], e.SheetNames[n], n);
  e.SheetNames.forEach(function (r, a) {
    var i = e.Sheets[r];
    if (!(!i || !i["!autofilter"])) {
      var o;
      e.Workbook || (e.Workbook = {}), e.Workbook.Names || (e.Workbook.Names = []), e.Workbook.Names.forEach(function (l) {
        l.Name == "_xlnm._FilterDatabase" && l.Sheet == a && (o = l);
      });
      var s = yke(r) + "!" + Ede(i["!autofilter"].ref);
      o ? o.Ref = s : e.Workbook.Names.push({
        Name: "_xlnm._FilterDatabase",
        Sheet: a,
        Ref: s
      });
    }
  });
}

var iei = /<\w+:workbook/;

function oei(e, t) {
  if (!e) throw new Error("Could not find file");
  var n = {
      AppVersion: {},
      WBProps: {},
      WBView: [],
      Sheets: [],
      CalcPr: {},
      Names: [],
      xmlns: ""
    },
    r = !1,
    a = "xmlns",
    i = {},
    o = 0;
  if (e.replace(mw, function (l, d) {
    var u = es(l);
    switch (fI(u[0])) {
      case "<?xml":
        break;
      case "<workbook":
        l.match(iei) && (a = "xmlns" + l.match(/<(\w+):/)[1]), n.xmlns = u[a];
        break;
      case "</workbook>":
        break;
      case "<fileVersion":
        delete u[0], n.AppVersion = u;
        break;
      case "<fileVersion/>":
      case "</fileVersion>":
        break;
      case "<fileSharing":
        break;
      case "<fileSharing/>":
        break;
      case "<workbookPr":
      case "<workbookPr/>":
        YOt.forEach(function (h) {
          if (u[h[0]] != null) switch (h[2]) {
            case "bool":
              n.WBProps[h[0]] = rh(u[h[0]]);
              break;
            case "int":
              n.WBProps[h[0]] = parseInt(u[h[0]], 10);
              break;
            default:
              n.WBProps[h[0]] = u[h[0]];
          }
        }), u.codeName && (n.WBProps.CodeName = Ch(u.codeName));
        break;
      case "</workbookPr>":
        break;
      case "<workbookProtection":
        break;
      case "<workbookProtection/>":
        break;
      case "<bookViews":
      case "<bookViews>":
      case "</bookViews>":
        break;
      case "<workbookView":
      case "<workbookView/>":
        delete u[0], n.WBView.push(u);
        break;
      case "</workbookView>":
        break;
      case "<sheets":
      case "<sheets>":
      case "</sheets>":
        break;
      case "<sheet":
        switch (u.state) {
          case "hidden":
            u.Hidden = 1;
            break;
          case "veryHidden":
            u.Hidden = 2;
            break;
          default:
            u.Hidden = 0;
        }
        delete u.state, u.name = jd(Ch(u.name)), delete u[0], n.Sheets.push(u);
        break;
      case "</sheet>":
        break;
      case "<functionGroups":
      case "<functionGroups/>":
        break;
      case "<functionGroup":
        break;
      case "<externalReferences":
      case "</externalReferences>":
      case "<externalReferences>":
        break;
      case "<externalReference":
        break;
      case "<definedNames/>":
        break;
      case "<definedNames>":
      case "<definedNames":
        r = !0;
        break;
      case "</definedNames>":
        r = !1;
        break;
      case "<definedName":
        i = {}, i.Name = Ch(u.name), u.comment && (i.Comment = u.comment), u.localSheetId && (i.Sheet = +u.localSheetId), rh(u.hidden || "0") && (i.Hidden = !0), o = d + l.length;
        break;
      case "</definedName>":
        i.Ref = jd(Ch(e.slice(o, d))), n.Names.push(i);
        break;
      case "<definedName/>":
        break;
      case "<calcPr":
        delete u[0], n.CalcPr = u;
        break;
      case "<calcPr/>":
        delete u[0], n.CalcPr = u;
        break;
      case "</calcPr>":
        break;
      case "<oleSize":
        break;
      case "<customWorkbookViews>":
      case "</customWorkbookViews>":
      case "<customWorkbookViews":
        break;
      case "<customWorkbookView":
      case "</customWorkbookView>":
        break;
      case "<pivotCaches>":
      case "</pivotCaches>":
      case "<pivotCaches":
        break;
      case "<pivotCache":
        break;
      case "<smartTagPr":
      case "<smartTagPr/>":
        break;
      case "<smartTagTypes":
      case "<smartTagTypes>":
      case "</smartTagTypes>":
        break;
      case "<smartTagType":
        break;
      case "<webPublishing":
      case "<webPublishing/>":
        break;
      case "<fileRecoveryPr":
      case "<fileRecoveryPr/>":
        break;
      case "<webPublishObjects>":
      case "<webPublishObjects":
      case "</webPublishObjects>":
        break;
      case "<webPublishObject":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        r = !0;
        break;
      case "</ext>":
        r = !1;
        break;
      case "<ArchID":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        r = !0;
        break;
      case "</AlternateContent>":
        r = !1;
        break;
      case "<revisionPtr":
        break;
      default:
        if (!r && t.WTF) throw new Error("unrecognized " + u[0] + " in workbook");
    }
    return l;
  }), HZ.indexOf(n.xmlns) === -1) throw new Error("Unknown Namespace: " + n.xmlns);
  return Hrr(n), n;
}

function sei(e) {
  var t = [e0];
  t[t.length] = no("workbook", null, {
    xmlns: HZ[0],
    "xmlns:r": fb.r
  });
  var n = e.Workbook && (e.Workbook.Names || []).length > 0,
    r = {
      codeName: "ThisWorkbook"
    };
  e.Workbook && e.Workbook.WBProps && (YOt.forEach(function (s) {
    e.Workbook.WBProps[s[0]] != null && e.Workbook.WBProps[s[0]] != s[1] && (r[s[0]] = e.Workbook.WBProps[s[0]]);
  }), e.Workbook.WBProps.CodeName && (r.codeName = e.Workbook.WBProps.CodeName, delete r.CodeName)), t[t.length] = no("workbookPr", null, r);
  var a = e.Workbook && e.Workbook.Sheets || [],
    i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i);
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var o = {
      name: xc(e.SheetNames[i].slice(0, 31))
    };
    if (o.sheetId = "" + (i + 1), o["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        o.state = "hidden";
        break;
      case 2:
        o.state = "veryHidden";
        break;
    }
    t[t.length] = no("sheet", null, o);
  }
  return t[t.length] = "</sheets>", n && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function (s) {
    var l = {
      name: s.Name
    };
    s.Comment && (l.comment = s.Comment), s.Sheet != null && (l.localSheetId = "" + s.Sheet), s.Hidden && (l.hidden = "1"), s.Ref && (t[t.length] = no("definedName", xc(s.Ref), l));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}

function lei(e, t) {
  var n = {};
  return n.Hidden = e.read_shift(4), n.iTabID = e.read_shift(4), n.strRelID = zwt(e), n.name = Ax(e), n;
}

function cei(e, t) {
  return t || (t = Ja(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), OOt(e.strRelID, t), kb(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}

function dei(e, t) {
  var n = {},
    r = e.read_shift(4);
  n.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Ax(e) : "";
  return a.length > 0 && (n.CodeName = a), n.autoCompressPictures = !!(r & 65536), n.backupFile = !!(r & 64), n.checkCompatibility = !!(r & 4096), n.date1904 = !!(r & 1), n.filterPrivacy = !!(r & 8), n.hidePivotFieldList = !!(r & 1024), n.promptedSolutions = !!(r & 16), n.publishItems = !!(r & 2048), n.refreshAllConnections = !!(r & 262144), n.saveExternalLinkValues = !!(r & 128), n.showBorderUnselectedTables = !!(r & 4), n.showInkAnnotation = !!(r & 32), n.showObjects = ["all", "placeholders", "none"][r >> 13 & 3], n.showPivotChartFilter = !!(r & 32768), n.updateLinks = ["userSet", "never", "always"][r >> 8 & 3], n;
}

function uei(e, t) {
  t || (t = Ja(72));
  var n = 0;
  return e && (e.date1904 && (n |= 1), e.filterPrivacy && (n |= 8)), t.write_shift(4, n), t.write_shift(4, 0), Gnr(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}

function hei(e, t) {
  var n = {};
  return e.read_shift(4), n.ArchID = e.read_shift(4), e.l += t - 8, n;
}

function pei(e, t, n) {
  var r = e.l + t,
    a = e.read_shift(4);
  e.l += 1;
  var i = e.read_shift(4),
    o = RHa(e),
    s,
    l = "";
  try {
    s = VXa(e, 0, n);
    try {
      l = zXe(e);
    } catch {}
  } catch {
    console.error("Could not parse defined name " + o);
  }
  a & 32 && (o = "_xlnm." + o), e.l = r;
  var d = {
    Name: o,
    Ptg: s,
    Flags: a
  };
  return i < 268435455 && (d.Sheet = i), l && (d.Comment = l), d;
}

function mei(e, t) {
  var n = Ja(9),
    r = 0,
    a = e.Name;
  FOt.indexOf(a) > -1 && (r |= 32, a = a.slice(6)), n.write_shift(4, r), n.write_shift(1, 0), n.write_shift(4, e.Sheet == null ? 4294967295 : e.Sheet);
  var i = [n, kb(a), nJa(e.Ref, t)];
  if (e.Comment) i.push(bke(e.Comment));else {
    var o = Ja(4);
    o.write_shift(4, 4294967295), i.push(o);
  }
  return k0(i);
}

function fei(e, t) {
  var n = {
      AppVersion: {},
      WBProps: {},
      WBView: [],
      Sheets: [],
      CalcPr: {},
      xmlns: ""
    },
    r = [],
    a = !1;
  t || (t = {}), t.biff = 12;
  var i = [],
    o = [[]];
  return o.SheetNames = [], o.XTI = [], kke[16] = {
    n: "BrtFRTArchID$",
    f: hei
  }, GD(e, function (l, d, u) {
    switch (u) {
      case 156:
        o.SheetNames.push(l.name), n.Sheets.push(l);
        break;
      case 153:
        n.WBProps = l;
        break;
      case 39:
        l.Sheet != null && (t.SID = l.Sheet), l.Ref = l.Ptg ? tx(l.Ptg, null, null, o, t) : "#REF!", delete t.SID, delete l.Ptg, i.push(l);
        break;
      case 1036:
        break;
      case 357:
      case 358:
      case 355:
      case 667:
        o[0].length ? o.push([u, l]) : o[0] = [u, l], o[o.length - 1].XTI = [];
        break;
      case 362:
        o.length === 0 && (o[0] = [], o[0].XTI = []), o[o.length - 1].XTI = o[o.length - 1].XTI.concat(l), o.XTI = o.XTI.concat(l);
        break;
      case 361:
        break;
      case 2071:
      case 158:
      case 143:
      case 664:
      case 353:
        break;
      case 3072:
      case 3073:
      case 534:
      case 677:
      case 157:
      case 610:
      case 2050:
      case 155:
      case 548:
      case 676:
      case 128:
      case 665:
      case 2128:
      case 2125:
      case 549:
      case 2053:
      case 596:
      case 2076:
      case 2075:
      case 2082:
      case 397:
      case 154:
      case 1117:
      case 553:
      case 2091:
        break;
      case 35:
        r.push(u), a = !0;
        break;
      case 36:
        r.pop(), a = !1;
        break;
      case 37:
        r.push(u), a = !0;
        break;
      case 38:
        r.pop(), a = !1;
        break;
      case 16:
        break;
      default:
        if (!d.T) {
          if (!a || t.WTF && r[r.length - 1] != 37 && r[r.length - 1] != 35) throw new Error("Unexpected record 0x" + u.toString(16));
        }
    }
  }, t), Hrr(n), n.Names = i, n.supbooks = o, n;
}

function gei(e, t) {
  Ei(e, 143);
  for (var n = 0; n != t.SheetNames.length; ++n) {
    var r = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[n] && t.Workbook.Sheets[n].Hidden || 0,
      a = {
        Hidden: r,
        iTabID: n + 1,
        strRelID: "rId" + (n + 1),
        name: t.SheetNames[n]
      };
    Ei(e, 156, cei(a));
  }
  Ei(e, 144);
}

function yei(e, t) {
  t || (t = Ja(127));
  for (var n = 0; n != 4; ++n) t.write_shift(4, 0);
  return kb("SheetJS", t), kb(pke.version, t), kb(pke.version, t), kb("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}

function bei(e, t) {
  t || (t = Ja(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var n = 120;
  return t.write_shift(1, n), t.length > t.l ? t.slice(0, t.l) : t;
}

function vei(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var n = t.Workbook.Sheets, r = 0, a = -1, i = -1; r < n.length; ++r) !n[r] || !n[r].Hidden && a == -1 ? a = r : n[r].Hidden == 1 && i == -1 && (i = r);
    i > a || (Ei(e, 135), Ei(e, 158, bei(a)), Ei(e, 136));
  }
}

function wei(e, t) {
  !t.Workbook || !t.Workbook.Names || t.Workbook.Names.forEach(function (n) {
    try {
      if (n.Flags & 14) return;
      Ei(e, 39, mei(n, t));
    } catch {
      console.error("Could not serialize defined name " + JSON.stringify(n));
    }
  });
}

function xei(e) {
  var t = e.SheetNames.length,
    n = Ja(12 * t + 28);
  n.write_shift(4, t + 2), n.write_shift(4, 0), n.write_shift(4, -2), n.write_shift(4, -2), n.write_shift(4, 0), n.write_shift(4, -1), n.write_shift(4, -1);
  for (var r = 0; r < t; ++r) n.write_shift(4, 0), n.write_shift(4, r), n.write_shift(4, r);
  return n;
}

function _ei(e, t) {
  Ei(e, 353), Ei(e, 357), Ei(e, 362, xei(t)), Ei(e, 354);
}

function kei(e, t) {
  var n = kx();
  return Ei(n, 131), Ei(n, 128, yei()), Ei(n, 153, uei(e.Workbook && e.Workbook.WBProps || null)), vei(n, e), gei(n, e), _ei(n, e), (e.Workbook || {}).Names && wei(n, e), Ei(n, 132), n.end();
}

function Aei(e, t, n) {
  return t.slice(-4) === ".bin" ? fei(e, n) : oei(e, n);
}

function Sei(e, t, n, r, a, i, o, s) {
  return t.slice(-4) === ".bin" ? LZa(e, r, n, a, i, o, s) : mJa(e, r, n, a, i, o, s);
}

function Iei(e, t, n, r, a, i, o, s) {
  return t.slice(-4) === ".bin" ? JZa(e, r, n, a, i) : YZa(e, r, n, a, i);
}

function Cei(e, t, n, r, a, i, o, s) {
  return t.slice(-4) === ".bin" ? wYa() : xYa();
}

function Eei(e, t, n, r, a, i, o, s) {
  return t.slice(-4) === ".bin" ? bYa() : vYa();
}

function Tei(e, t, n, r) {
  return t.slice(-4) === ".bin" ? vQa(e, n, r) : oQa(e, n, r);
}

function Mei(e, t, n) {
  return t.slice(-4) === ".bin" ? _Ka(e, n) : bKa(e, n);
}

function Pei(e, t, n) {
  return t.slice(-4) === ".bin" ? hYa(e, n) : iYa(e, n);
}

function Rei(e, t, n) {
  return t.slice(-4) === ".bin" ? eYa(e) : JQa(e);
}

function Nei(e, t, n, r) {
  return n.slice(-4) === ".bin" ? tYa(e, t, n, r) : void 0;
}

function jei(e, t, n) {
  return t.slice(-4) === ".bin" ? KQa(e, t, n) : YQa(e, t, n);
}

var Krr = /\b((?:\w+:)?[\w]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,
  Qrr = /\b((?:\w+:)?[\w]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;

function HI(e, t) {
  var n = e.split(/\s+/),
    r = [];
  if (r[0] = n[0], n.length === 1) return r;
  var a = e.match(Krr),
    i,
    o,
    s,
    l;
  if (a) for (l = 0; l != a.length; ++l) i = a[l].match(Qrr), (o = i[1].indexOf(":")) === -1 ? r[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + i[1].slice(6) : s = i[1].slice(o + 1), r[s] = i[2].slice(1, i[2].length - 1));
  return r;
}

function Dei(e) {
  var t = e.split(/\s+/),
    n = {};
  if (t.length === 1) return n;
  var r = e.match(Krr),
    a,
    i,
    o,
    s;
  if (r) for (s = 0; s != r.length; ++s) a = r[s].match(Qrr), (i = a[1].indexOf(":")) === -1 ? n[a[1]] = a[2].slice(1, a[2].length - 1) : (a[1].slice(0, 6) === "xmlns:" ? o = "xmlns" + a[1].slice(6) : o = a[1].slice(i + 1), n[o] = a[2].slice(1, a[2].length - 1));
  return n;
}

var m1e;

function Lei(e, t, n) {
  var r = m1e[e] || jd(e);
  return r === "General" ? vJ(t) : Qk(r, t, {
    date1904: !!n
  });
}

function Oei(e, t, n, r) {
  var a = r;
  switch ((n[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      a = rh(r);
      break;
    case "i2":
    case "int":
      a = parseInt(r, 10);
      break;
    case "r4":
    case "float":
      a = parseFloat(r);
      break;
    case "date":
    case "dateTime.tz":
      a = Rf(r);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + n[0]);
  }
  e[jd(t)] = a;
}

function Bei(e, t, n, r) {
  if (e.t !== "z") {
    if (!n || n.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Mb[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = fke(e.v) : e.w = vJ(e.v) : e.w = Lei(t || "General", e.v, r);
    } catch (o) {
      if (n.WTF) throw o;
    }
    try {
      var a = m1e[t] || t || "General";
      if (n.cellNF && (e.z = a), n.cellDates && e.t == "n" && k3(a)) {
        var i = E6(e.v + (r ? 1462 : 0));
        i && (e.t = "d", e.v = new Date(Date.UTC(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)));
      }
    } catch (o) {
      if (n.WTF) throw o;
    }
  }
}

function Fei(e, t, n) {
  if (n.cellStyles && t.Interior) {
    var r = t.Interior;
    r.Pattern && (r.patternType = JKa[r.Pattern] || r.Pattern);
  }
  e[t.ID] = t;
}

function zei(e, t, n, r, a, i, o, s, l, d, u) {
  var h = "General",
    p = r.StyleID,
    m = {};
  d = d || {};
  var f = [],
    y = 0;
  for (p === void 0 && s && (p = s.StyleID), p === void 0 && o && (p = o.StyleID); i[p] !== void 0;) {
    var b = i[p];
    if (b.nf && (h = b.nf), b.Interior && f.push(b.Interior), !b.Parent) break;
    p = b.Parent;
  }
  switch (n.Type) {
    case "Boolean":
      r.t = "b", r.v = rh(e);
      break;
    case "String":
      r.t = "s", r.r = Tin(jd(e)), r.v = e.indexOf("<") > -1 ? jd(t || e).replace(/<[^<>]*>/g, "") : r.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), r.v = bg(Rf(e, u), u), r.v !== r.v && (r.v = jd(e)), (!h || h == "General") && (h = "yyyy-mm-dd");
    case "Number":
      r.v === void 0 && (r.v = +e), r.t || (r.t = "n");
      break;
    case "Error":
      r.t = "e", r.v = Lv[e], d.cellText !== !1 && (r.w = e);
      break;
    default:
      e == "" && t == "" ? r.t = "z" : (r.t = "s", r.v = Tin(t || e));
      break;
  }
  if (Bei(r, h, d, u), d.cellFormula !== !1) if (r.Formula) {
    var v = jd(r.Formula);
    v.charCodeAt(0) == 61 && (v = v.slice(1)), r.f = OQ(v, a), delete r.Formula, r.ArrayRange == "RC" ? r.F = OQ("RC:RC", a) : r.ArrayRange && (r.F = OQ(r.ArrayRange, a), l.push([wd(r.F), r.F]));
  } else for (y = 0; y < l.length; ++y) a.r >= l[y][0].s.r && a.r <= l[y][0].e.r && a.c >= l[y][0].s.c && a.c <= l[y][0].e.c && (r.F = l[y][1]);
  d.cellStyles && (f.forEach(function (_) {
    !m.patternType && _.patternType && (m.patternType = _.patternType);
  }), r.s = m), r.StyleID !== void 0 && (r.ixfe = r.StyleID);
}

function Uei(e) {
  return FOt.indexOf("_xlnm." + e) > -1 ? "_xlnm." + e : e;
}

function $ei(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}

function Yit(e, t) {
  var n = t || {};
  VZ();
  var r = Fre(BXe(e));
  (n.type == "binary" || n.type == "array" || n.type == "base64") && (typeof Rc < "u" ? r = Rc.utils.decode(65001, zze(r)) : r = Ch(r));
  var a = r.slice(0, 1024).toLowerCase(),
    i = !1;
  if (a = a.replace(/".*?"/g, ""), (a.indexOf(">") & 1023) > Math.min(a.indexOf(",") & 1023, a.indexOf(";") & 1023)) {
    var o = qu(n);
    return o.type = "string", Mde.to_workbook(r, o);
  }
  if (a.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function (X) {
    a.indexOf("<" + X) >= 0 && (i = !0);
  }), i) return yti(r, n);
  m1e = {
    "General Number": "General",
    "General Date": Cs[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Cs[15],
    "Short Date": Cs[14],
    "Long Time": Cs[19],
    "Medium Time": Cs[18],
    "Short Time": Cs[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Cs[2],
    Standard: Cs[4],
    Percent: Cs[10],
    Scientific: Cs[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var s,
    l = [],
    d,
    u = {},
    h = [],
    p = {},
    m = "";
  n.dense && (p["!data"] = []);
  var f = {},
    y = {},
    b = HI('<Data ss:Type="String">'),
    v = 0,
    _ = 0,
    w = 0,
    k = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    },
    A = {},
    S = {},
    C = "",
    I = 0,
    E = [],
    M = {},
    T = {},
    P = 0,
    R = [],
    j = [],
    B = {},
    F = [],
    N,
    G = !1,
    z = [],
    V = [],
    O = {},
    L = 0,
    D = 0,
    U = {
      Sheets: [],
      WBProps: {
        date1904: !1
      }
    },
    H = {};
  sy.lastIndex = 0, r = ACe(r, "<!--", "-->");
  for (var Y = ""; s = sy.exec(r);) switch (s[3] = (Y = s[3]).toLowerCase()) {
    case "data":
      if (Y == "data") {
        if (s[1] === "/") {
          if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
        } else s[0].charAt(s[0].length - 2) !== "/" && l.push([s[3], !0]);
        break;
      }
      if (l[l.length - 1][1]) break;
      s[1] === "/" ? zei(r.slice(v, s.index), C, b, l[l.length - 1][0] == "comment" ? B : f, {
        c: _,
        r: w
      }, A, F[_], y, z, n, U.WBProps.date1904) : (C = "", b = HI(s[0]), v = s.index + s[0].length);
      break;
    case "cell":
      if (s[1] === "/") {
        if (j.length > 0 && (f.c = j), (!n.sheetRows || n.sheetRows > w) && f.v !== void 0 && (n.dense ? (p["!data"][w] || (p["!data"][w] = []), p["!data"][w][_] = f) : p[ic(_) + Jc(w)] = f), f.HRef && (f.l = {
          Target: jd(f.HRef)
        }, f.HRefScreenTip && (f.l.Tooltip = f.HRefScreenTip), delete f.HRef, delete f.HRefScreenTip), (f.MergeAcross || f.MergeDown) && (L = _ + (parseInt(f.MergeAcross, 10) | 0), D = w + (parseInt(f.MergeDown, 10) | 0), (L > _ || D > w) && E.push({
          s: {
            c: _,
            r: w
          },
          e: {
            c: L,
            r: D
          }
        })), !n.sheetStubs) f.MergeAcross ? _ = L + 1 : ++_;else if (f.MergeAcross || f.MergeDown) {
          for (var K = _; K <= L; ++K) for (var W = w; W <= D; ++W) (K > _ || W > w) && (n.dense ? (p["!data"][W] || (p["!data"][W] = []), p["!data"][W][K] = {
            t: "z"
          }) : p[ic(K) + Jc(W)] = {
            t: "z"
          });
          _ = L + 1;
        } else ++_;
      } else f = Dei(s[0]), f.Index && (_ = +f.Index - 1), _ < k.s.c && (k.s.c = _), _ > k.e.c && (k.e.c = _), s[0].slice(-2) === "/>" && ++_, j = [];
      break;
    case "row":
      s[1] === "/" || s[0].slice(-2) === "/>" ? (w < k.s.r && (k.s.r = w), w > k.e.r && (k.e.r = w), s[0].slice(-2) === "/>" && (y = HI(s[0]), y.Index && (w = +y.Index - 1)), _ = 0, ++w) : (y = HI(s[0]), y.Index && (w = +y.Index - 1), O = {}, (y.AutoFitHeight == "0" || y.Height) && (O.hpx = parseInt(y.Height, 10), O.hpt = _ke(O.hpx), V[w] = O), y.Hidden == "1" && (O.hidden = !0, V[w] = O));
      break;
    case "worksheet":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
        h.push(m), k.s.r <= k.e.r && k.s.c <= k.e.c && (p["!ref"] = Ac(k), n.sheetRows && n.sheetRows <= k.e.r && (p["!fullref"] = p["!ref"], k.e.r = n.sheetRows - 1, p["!ref"] = Ac(k))), E.length && (p["!merges"] = E), F.length > 0 && (p["!cols"] = F), V.length > 0 && (p["!rows"] = V), u[m] = p;
      } else k = {
        s: {
          r: 2e6,
          c: 2e6
        },
        e: {
          r: 0,
          c: 0
        }
      }, w = _ = 0, l.push([s[3], !1]), d = HI(s[0]), m = jd(d.Name), p = {}, n.dense && (p["!data"] = []), E = [], z = [], V = [], H = {
        name: m,
        Hidden: 0
      }, U.Sheets.push(H);
      break;
    case "table":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
      } else {
        if (s[0].slice(-2) == "/>") break;
        l.push([s[3], !1]), F = [], G = !1;
      }
      break;
    case "style":
      s[1] === "/" ? Fei(A, S, n) : S = HI(s[0]);
      break;
    case "numberformat":
      S.nf = jd(HI(s[0]).Format || "General"), m1e[S.nf] && (S.nf = m1e[S.nf]);
      for (var Q = 0; Q != 392 && Cs[Q] != S.nf; ++Q);
      if (Q == 392) {
        for (Q = 57; Q != 392; ++Q) if (Cs[Q] == null) {
          Fz(S.nf, Q);
          break;
        }
      }
      break;
    case "column":
      if (l[l.length - 1][0] !== "table" || s[1] === "/") break;
      if (N = HI(s[0]), N.Hidden && (N.hidden = !0, delete N.Hidden), N.Width && (N.wpx = parseInt(N.Width, 10)), !G && N.wpx > 10) {
        G = !0, ix = Srr;
        for (var q = 0; q < F.length; ++q) F[q] && cD(F[q]);
      }
      G && cD(N), F[N.Index - 1 || F.length] = N;
      for (var ne = 0; ne < +N.Span; ++ne) F[F.length] = qu(N);
      break;
    case "namedrange":
      if (s[1] === "/") break;
      U.Names || (U.Names = []);
      var de = es(s[0]),
        le = {
          Name: Uei(de.Name),
          Ref: OQ(de.RefersTo.slice(1), {
            r: 0,
            c: 0
          })
        };
      U.Sheets.length > 0 && (le.Sheet = U.Sheets.length - 1), U.Names.push(le);
      break;
    case "namedcell":
      break;
    case "b":
      break;
    case "i":
      break;
    case "u":
      break;
    case "s":
      break;
    case "em":
      break;
    case "h2":
      break;
    case "h3":
      break;
    case "sub":
      break;
    case "sup":
      break;
    case "span":
      break;
    case "alignment":
      break;
    case "borders":
      break;
    case "border":
      break;
    case "font":
      if (s[0].slice(-2) === "/>") break;
      s[1] === "/" ? C += r.slice(I, s.index) : I = s.index + s[0].length;
      break;
    case "interior":
      if (!n.cellStyles) break;
      S.Interior = HI(s[0]);
      break;
    case "protection":
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if (s[0].slice(-2) === "/>") break;
      s[1] === "/" ? nWa(M, Y, r.slice(P, s.index)) : P = s.index + s[0].length;
      break;
    case "paragraphs":
      break;
    case "styles":
    case "workbook":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
      } else l.push([s[3], !1]);
      break;
    case "comment":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
        $ei(B), j.push(B);
      } else l.push([s[3], !1]), d = HI(s[0]), rh(d.ShowAlways || "0") || (j.hidden = !0), B = {
        a: d.Author
      };
      break;
    case "autofilter":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
      } else if (s[0].charAt(s[0].length - 2) !== "/") {
        var J = HI(s[0]);
        p["!autofilter"] = {
          ref: OQ(J.Range).replace(/\$/g, "")
        }, l.push([s[3], !0]);
      }
      break;
    case "name":
      break;
    case "datavalidation":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
      } else s[0].charAt(s[0].length - 2) !== "/" && l.push([s[3], !0]);
      break;
    case "pixelsperinch":
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if (s[1] === "/") {
        if ((d = l.pop())[0] !== s[3]) throw new Error("Bad state: " + d.join("|"));
      } else s[0].charAt(s[0].length - 2) !== "/" && l.push([s[3], !0]);
      break;
    case "null":
      break;
    default:
      if (l.length == 0 && s[3] == "document" || l.length == 0 && s[3] == "uof") return von(r, n);
      var pe = !0;
      switch (l[l.length - 1][0]) {
        case "officedocumentsettings":
          switch (s[3]) {
            case "allowpng":
              break;
            case "removepersonalinformation":
              break;
            case "downloadcomponents":
              break;
            case "locationofcomponents":
              break;
            case "colors":
              break;
            case "color":
              break;
            case "index":
              break;
            case "rgb":
              break;
            case "targetscreensize":
              break;
            case "readonlyrecommended":
              break;
            default:
              pe = !1;
          }
          break;
        case "componentoptions":
          switch (s[3]) {
            case "toolbar":
              break;
            case "hideofficelogo":
              break;
            case "spreadsheetautofit":
              break;
            case "label":
              break;
            case "caption":
              break;
            case "maxheight":
              break;
            case "maxwidth":
              break;
            case "nextsheetnumber":
              break;
            default:
              pe = !1;
          }
          break;
        case "excelworkbook":
          switch (s[3]) {
            case "date1904":
              U.WBProps.date1904 = !0;
              break;
            case "hidehorizontalscrollbar":
              break;
            case "hideverticalscrollbar":
              break;
            case "hideworkbooktabs":
              break;
            case "windowheight":
              break;
            case "windowwidth":
              break;
            case "windowtopx":
              break;
            case "windowtopy":
              break;
            case "tabratio":
              break;
            case "protectstructure":
              break;
            case "protectwindow":
              break;
            case "protectwindows":
              break;
            case "activesheet":
              break;
            case "displayinknotes":
              break;
            case "firstvisiblesheet":
              break;
            case "supbook":
              break;
            case "sheetname":
              break;
            case "sheetindex":
              break;
            case "sheetindexfirst":
              break;
            case "sheetindexlast":
              break;
            case "dll":
              break;
            case "acceptlabelsinformulas":
              break;
            case "donotsavelinkvalues":
              break;
            case "iteration":
              break;
            case "maxiterations":
              break;
            case "maxchange":
              break;
            case "path":
              break;
            case "xct":
              break;
            case "count":
              break;
            case "selectedsheets":
              break;
            case "calculation":
              break;
            case "uncalced":
              break;
            case "startupprompt":
              break;
            case "crn":
              break;
            case "externname":
              break;
            case "formula":
              break;
            case "colfirst":
              break;
            case "collast":
              break;
            case "wantadvise":
              break;
            case "boolean":
              break;
            case "error":
              break;
            case "text":
              break;
            case "ole":
              break;
            case "noautorecover":
              break;
            case "publishobjects":
              break;
            case "donotcalculatebeforesave":
              break;
            case "number":
              break;
            case "refmoder1c1":
              break;
            case "embedsavesmarttags":
              break;
            default:
              pe = !1;
          }
          break;
        case "workbookoptions":
          switch (s[3]) {
            case "owcversion":
              break;
            case "height":
              break;
            case "width":
              break;
            default:
              pe = !1;
          }
          break;
        case "worksheetoptions":
          switch (s[3]) {
            case "visible":
              if (s[0].slice(-2) !== "/>") if (s[1] === "/") switch (r.slice(P, s.index)) {
                case "SheetHidden":
                  H.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  H.Hidden = 2;
                  break;
              } else P = s.index + s[0].length;
              break;
            case "header":
              p["!margins"] || BQ(p["!margins"] = {}, "xlml"), isNaN(+es(s[0]).Margin) || (p["!margins"].header = +es(s[0]).Margin);
              break;
            case "footer":
              p["!margins"] || BQ(p["!margins"] = {}, "xlml"), isNaN(+es(s[0]).Margin) || (p["!margins"].footer = +es(s[0]).Margin);
              break;
            case "pagemargins":
              var ce = es(s[0]);
              p["!margins"] || BQ(p["!margins"] = {}, "xlml"), isNaN(+ce.Top) || (p["!margins"].top = +ce.Top), isNaN(+ce.Left) || (p["!margins"].left = +ce.Left), isNaN(+ce.Right) || (p["!margins"].right = +ce.Right), isNaN(+ce.Bottom) || (p["!margins"].bottom = +ce.Bottom);
              break;
            case "displayrighttoleft":
              U.Views || (U.Views = []), U.Views[0] || (U.Views[0] = {}), U.Views[0].RTL = !0;
              break;
            case "freezepanes":
              break;
            case "frozennosplit":
              break;
            case "splithorizontal":
            case "splitvertical":
              break;
            case "donotdisplaygridlines":
              break;
            case "activerow":
              break;
            case "activecol":
              break;
            case "toprowbottompane":
              break;
            case "leftcolumnrightpane":
              break;
            case "unsynced":
              break;
            case "print":
              break;
            case "printerrors":
              break;
            case "panes":
              break;
            case "scale":
              break;
            case "pane":
              break;
            case "number":
              break;
            case "layout":
              break;
            case "pagesetup":
              break;
            case "selected":
              break;
            case "protectobjects":
              break;
            case "enableselection":
              break;
            case "protectscenarios":
              break;
            case "validprinterinfo":
              break;
            case "horizontalresolution":
              break;
            case "verticalresolution":
              break;
            case "numberofcopies":
              break;
            case "activepane":
              break;
            case "toprowvisible":
              break;
            case "leftcolumnvisible":
              break;
            case "fittopage":
              break;
            case "rangeselection":
              break;
            case "papersizeindex":
              break;
            case "pagelayoutzoom":
              break;
            case "pagebreakzoom":
              break;
            case "filteron":
              break;
            case "fitwidth":
              break;
            case "fitheight":
              break;
            case "commentslayout":
              break;
            case "zoom":
              break;
            case "lefttoright":
              break;
            case "gridlines":
              break;
            case "allowsort":
              break;
            case "allowfilter":
              break;
            case "allowinsertrows":
              break;
            case "allowdeleterows":
              break;
            case "allowinsertcols":
              break;
            case "allowdeletecols":
              break;
            case "allowinserthyperlinks":
              break;
            case "allowformatcells":
              break;
            case "allowsizecols":
              break;
            case "allowsizerows":
              break;
            case "nosummaryrowsbelowdetail":
              p["!outline"] || (p["!outline"] = {}), p["!outline"].above = !0;
              break;
            case "tabcolorindex":
              break;
            case "donotdisplayheadings":
              break;
            case "showpagelayoutzoom":
              break;
            case "nosummarycolumnsrightdetail":
              p["!outline"] || (p["!outline"] = {}), p["!outline"].left = !0;
              break;
            case "blackandwhite":
              break;
            case "donotdisplayzeros":
              break;
            case "displaypagebreak":
              break;
            case "rowcolheadings":
              break;
            case "donotdisplayoutline":
              break;
            case "noorientation":
              break;
            case "allowusepivottables":
              break;
            case "zeroheight":
              break;
            case "viewablerange":
              break;
            case "selection":
              break;
            case "protectcontents":
              break;
            default:
              pe = !1;
          }
          break;
        case "pivottable":
        case "pivotcache":
          switch (s[3]) {
            case "immediateitemsondrop":
              break;
            case "showpagemultipleitemlabel":
              break;
            case "compactrowindent":
              break;
            case "location":
              break;
            case "pivotfield":
              break;
            case "orientation":
              break;
            case "layoutform":
              break;
            case "layoutsubtotallocation":
              break;
            case "layoutcompactrow":
              break;
            case "position":
              break;
            case "pivotitem":
              break;
            case "datatype":
              break;
            case "datafield":
              break;
            case "sourcename":
              break;
            case "parentfield":
              break;
            case "ptlineitems":
              break;
            case "ptlineitem":
              break;
            case "countofsameitems":
              break;
            case "item":
              break;
            case "itemtype":
              break;
            case "ptsource":
              break;
            case "cacheindex":
              break;
            case "consolidationreference":
              break;
            case "filename":
              break;
            case "reference":
              break;
            case "nocolumngrand":
              break;
            case "norowgrand":
              break;
            case "blanklineafteritems":
              break;
            case "hidden":
              break;
            case "subtotal":
              break;
            case "basefield":
              break;
            case "mapchilditems":
              break;
            case "function":
              break;
            case "refreshonfileopen":
              break;
            case "printsettitles":
              break;
            case "mergelabels":
              break;
            case "defaultversion":
              break;
            case "refreshname":
              break;
            case "refreshdate":
              break;
            case "refreshdatecopy":
              break;
            case "versionlastrefresh":
              break;
            case "versionlastupdate":
              break;
            case "versionupdateablemin":
              break;
            case "versionrefreshablemin":
              break;
            case "calculation":
              break;
            default:
              pe = !1;
          }
          break;
        case "pagebreaks":
          switch (s[3]) {
            case "colbreaks":
              break;
            case "colbreak":
              break;
            case "rowbreaks":
              break;
            case "rowbreak":
              break;
            case "colstart":
              break;
            case "colend":
              break;
            case "rowend":
              break;
            default:
              pe = !1;
          }
          break;
        case "autofilter":
          switch (s[3]) {
            case "autofiltercolumn":
              break;
            case "autofiltercondition":
              break;
            case "autofilterand":
              break;
            case "autofilteror":
              break;
            default:
              pe = !1;
          }
          break;
        case "querytable":
          switch (s[3]) {
            case "id":
              break;
            case "autoformatfont":
              break;
            case "autoformatpattern":
              break;
            case "querysource":
              break;
            case "querytype":
              break;
            case "enableredirections":
              break;
            case "refreshedinxl9":
              break;
            case "urlstring":
              break;
            case "htmltables":
              break;
            case "connection":
              break;
            case "commandtext":
              break;
            case "refreshinfo":
              break;
            case "notitles":
              break;
            case "nextid":
              break;
            case "columninfo":
              break;
            case "overwritecells":
              break;
            case "donotpromptforfile":
              break;
            case "textwizardsettings":
              break;
            case "source":
              break;
            case "number":
              break;
            case "decimal":
              break;
            case "thousandseparator":
              break;
            case "trailingminusnumbers":
              break;
            case "formatsettings":
              break;
            case "fieldtype":
              break;
            case "delimiters":
              break;
            case "tab":
              break;
            case "comma":
              break;
            case "autoformatname":
              break;
            case "versionlastedit":
              break;
            case "versionlastrefresh":
              break;
            default:
              pe = !1;
          }
          break;
        case "datavalidation":
          switch (s[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            case "cellrangelist":
              break;
            default:
              pe = !1;
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (s[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "cellrangelist":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            default:
              pe = !1;
          }
          break;
        case "mapinfo":
        case "schema":
        case "data":
          switch (s[3]) {
            case "map":
              break;
            case "entry":
              break;
            case "range":
              break;
            case "xpath":
              break;
            case "field":
              break;
            case "xsdtype":
              break;
            case "filteron":
              break;
            case "aggregate":
              break;
            case "elementtype":
              break;
            case "attributetype":
              break;
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
              break;
            case "row":
              break;
            default:
              pe = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          pe = !1;
          break;
      }
      if (pe || s[3].match(/!\[CDATA/)) break;
      if (!l[l.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + l.join("|");
      if (l[l.length - 1][0] === "customdocumentproperties") {
        if (s[0].slice(-2) === "/>") break;
        s[1] === "/" ? Oei(T, Y, R, r.slice(P, s.index)) : (R = s, P = s.index + s[0].length);
        break;
      }
      if (n.WTF) throw "Unrecognized tag: " + s[3] + "|" + l.join("|");
  }
  var we = {};
  return !n.bookSheets && !n.bookProps && (we.Sheets = u), we.SheetNames = h, we.Workbook = U, we.SSF = qu(Cs), we.Props = M, we.Custprops = T, we.bookType = "xlml", we;
}

function Wwt(e, t) {
  switch (XOt(t = t || {}), t.type || "base64") {
    case "base64":
      return Yit(_3(e), t);
    case "binary":
    case "buffer":
    case "file":
      return Yit(e, t);
    case "array":
      return Yit(GP(e), t);
  }
}

function Yrr(e, t) {
  var n = [];
  return e.Props && n.push(rWa(e.Props, t)), e.Custprops && n.push(aWa(e.Props, e.Custprops)), n.join("");
}

function Xrr(e) {
  return (((e || {}).Workbook || {}).WBProps || {}).date1904 ? '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><Date1904/></ExcelWorkbook>' : "";
}

function Jrr(e, t) {
  var n = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function (r, a) {
    var i = [];
    i.push(no("NumberFormat", null, {
      "ss:Format": xc(Cs[r.numFmtId])
    }));
    var o = {
      "ss:ID": "s" + (21 + a)
    };
    n.push(no("Style", i.join(""), o));
  }), no("Styles", n.join(""));
}

function Zrr(e) {
  return no("NamedRange", null, {
    "ss:Name": e.Name.slice(0, 6) == "_xlnm." ? e.Name.slice(6) : e.Name,
    "ss:RefersTo": "=" + CCe(e.Ref, {
      r: 0,
      c: 0
    })
  });
}

function ear(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, n = [], r = 0; r < t.length; ++r) {
    var a = t[r];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || n.push(Zrr(a)));
  }
  return no("Names", n.join(""));
}

function tar(e, t, n, r) {
  if (!e || !((r || {}).Workbook || {}).Names) return "";
  for (var a = r.Workbook.Names, i = [], o = 0; o < a.length; ++o) {
    var s = a[o];
    s.Sheet == n && (s.Name.match(/^_xlfn\./) || i.push(Zrr(s)));
  }
  return i.join("");
}

function nar(e, t, n, r) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(no("Header", null, {
    "x:Margin": e["!margins"].header
  })), e["!margins"].footer && a.push(no("Footer", null, {
    "x:Margin": e["!margins"].footer
  })), a.push(no("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), r && r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[n]) if (r.Workbook.Sheets[n].Hidden) a.push(no("Visible", r.Workbook.Sheets[n].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));else {
    for (var i = 0; i < n && !(r.Workbook.Sheets[i] && !r.Workbook.Sheets[i].Hidden); ++i);
    i == n && a.push("<Selected/>");
  }
  return ((((r || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(z1("ProtectContents", "True")), e["!protect"].objects && a.push(z1("ProtectObjects", "True")), e["!protect"].scenarios && a.push(z1("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(z1("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(z1("EnableSelection", "UnlockedCells")), [["formatCells", "AllowFormatCells"], ["formatColumns", "AllowSizeCols"], ["formatRows", "AllowSizeRows"], ["insertColumns", "AllowInsertCols"], ["insertRows", "AllowInsertRows"], ["insertHyperlinks", "AllowInsertHyperlinks"], ["deleteColumns", "AllowDeleteCols"], ["deleteRows", "AllowDeleteRows"], ["sort", "AllowSort"], ["autoFilter", "AllowFilter"], ["pivotTables", "AllowUsePivotTables"]].forEach(function (o) {
    e["!protect"][o[0]] && a.push("<" + o[1] + "/>");
  })), a.length == 0 ? "" : no("WorksheetOptions", a.join(""), {
    xmlns: hb.x
  });
}

function Gei(e) {
  return e.map(function (t) {
    var n = sHa(t.t || ""),
      r = no("ss:Data", n, {
        xmlns: "http://www.w3.org/TR/REC-html40"
      }),
      a = {};
    return t.a && (a["ss:Author"] = t.a), e.hidden || (a["ss:ShowAlways"] = "1"), no("Comment", r, a);
  }).join("");
}

function rar(e, t, n, r, a, i, o) {
  if (!e || e.v == null && e.f == null) return "";
  var s = {};
  if (e.f && (s["ss:Formula"] = "=" + xc(CCe(e.f, o))), e.F && e.F.slice(0, t.length) == t) {
    var l = Eh(e.F.slice(t.length + 1));
    s["ss:ArrayRange"] = "RC:R" + (l.r == o.r ? "" : "[" + (l.r - o.r) + "]") + "C" + (l.c == o.c ? "" : "[" + (l.c - o.c) + "]");
  }
  if (e.l && e.l.Target && (s["ss:HRef"] = xc(e.l.Target), e.l.Tooltip && (s["x:HRefScreenTip"] = xc(e.l.Tooltip))), n["!merges"]) for (var d = n["!merges"], u = 0; u != d.length; ++u) d[u].s.c != o.c || d[u].s.r != o.r || (d[u].e.c > d[u].s.c && (s["ss:MergeAcross"] = d[u].e.c - d[u].s.c), d[u].e.r > d[u].s.r && (s["ss:MergeDown"] = d[u].e.r - d[u].s.r));
  var h = "",
    p = "";
  switch (e.t) {
    case "z":
      if (!r.sheetStubs) return "";
      break;
    case "n":
      isFinite(e.v) ? (h = "Number", p = String(e.v)) : (h = "Error", p = Mb[isNaN(e.v) ? 36 : 7]);
      break;
    case "b":
      h = "Boolean", p = e.v ? "1" : "0";
      break;
    case "e":
      h = "Error", p = Mb[e.v];
      break;
    case "d":
      h = "DateTime", p = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Cs[14]);
      break;
    case "s":
      h = "String", p = oHa(e.v || "");
      break;
  }
  var m = HP(r.cellXfs, e, r);
  s["ss:StyleID"] = "s" + (21 + m), s["ss:Index"] = o.c + 1;
  var f = e.v != null ? p : "",
    y = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + f + "</Data>";
  return (e.c || []).length > 0 && (y += Gei(e.c)), no("Cell", y, s);
}

function aar(e, t) {
  var n = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Rde(t.hpt)), t.hpx && (n += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (n += ' ss:Hidden="1"')), n + ">";
}

function Vei(e, t, n, r) {
  if (!e["!ref"]) return "";
  var a = wd(e["!ref"]),
    i = e["!merges"] || [],
    o = 0,
    s = [];
  e["!cols"] && e["!cols"].forEach(function (b, v) {
    cD(b);
    var _ = !!b.width,
      w = PCe(v, b),
      k = {
        "ss:Index": v + 1
      };
    _ && (k["ss:Width"] = Pde(w.width)), b.hidden && (k["ss:Hidden"] = "1"), s.push(no("Column", null, k));
  });
  for (var l = e["!data"] != null, d = {
      r: 0,
      c: 0
    }, u = a.s.r; u <= a.e.r; ++u) {
    var h = [aar(u, (e["!rows"] || [])[u])];
    d.r = u;
    for (var p = a.s.c; p <= a.e.c; ++p) {
      d.c = p;
      var m = !1;
      for (o = 0; o != i.length; ++o) if (!(i[o].s.c > p) && !(i[o].s.r > u) && !(i[o].e.c < p) && !(i[o].e.r < u)) {
        (i[o].s.c != p || i[o].s.r != u) && (m = !0);
        break;
      }
      if (!m) {
        var f = ic(p) + Jc(u),
          y = l ? (e["!data"][u] || [])[p] : e[f];
        h.push(rar(y, f, e, t, n, r, d));
      }
    }
    h.push("</Row>"), h.length > 2 && s.push(h.join(""));
  }
  return s.join("");
}

function Hei(e, t, n) {
  var r = [],
    a = n.SheetNames[e],
    i = n.Sheets[a],
    o = i ? tar(i, t, e, n) : "";
  return o.length > 0 && r.push("<Names>" + o + "</Names>"), o = i ? Vei(i, t, e, n) : "", o.length > 0 && r.push("<Table>" + o + "</Table>"), r.push(nar(i, t, e, n)), i && i["!autofilter"] && r.push('<AutoFilter x:Range="' + CCe(Ede(i["!autofilter"].ref), {
    r: 0,
    c: 0
  }) + '" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>'), r.join("");
}

function Wei(e, t) {
  t || (t = {}), e.SSF || (e.SSF = qu(Cs)), e.SSF && (VZ(), vpe(e.SSF), t.revssf = kCe(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], HP(t.cellXfs, {}, {
    revssf: {
      General: 0
    }
  }));
  var n = [];
  n.push(Yrr(e, t)), n.push(Xrr(e)), n.push(""), n.push(ear(e));
  for (var r = 0; r < e.SheetNames.length; ++r) n.push(no("Worksheet", Hei(r, t, e), {
    "ss:Name": xc(e.SheetNames[r])
  }));
  return n[2] = Jrr(e, t), e0 + no("Workbook", n.join(""), {
    xmlns: hb.ss,
    "xmlns:o": hb.o,
    "xmlns:x": hb.x,
    "xmlns:ss": hb.ss,
    "xmlns:dt": hb.dt,
    "xmlns:html": hb.html
  });
}

function qei(e) {
  var t = {},
    n = e.content;
  if (n.l = 28, t.AnsiUserType = n.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = OHa(n), n.length - n.l <= 4) return t;
  var r = n.read_shift(4);
  if (r == 0 || r > 40 || (n.l -= 4, t.Reserved1 = n.read_shift(0, "lpstr-ansi"), n.length - n.l <= 4) || (r = n.read_shift(4), r !== 1907505652) || (t.UnicodeClipboardFormat = BHa(n), r = n.read_shift(4), r == 0 || r > 40)) return t;
  n.l -= 4, t.Reserved2 = n.read_shift(0, "lpwstr");
}

var Kei = [60, 1084, 2066, 2165, 2175];

function Qei(e, t, n, r, a) {
  var i = r,
    o = [],
    s = n.slice(n.l, n.l + i);
  if (a && a.enc && a.enc.insitu && s.length > 0) switch (e) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
      break;
    case 133:
      break;
    default:
      a.enc.insitu(s);
  }
  o.push(s), n.l += i;
  for (var l = M7(n, n.l), d = qwt[l], u = 0; d != null && Kei.indexOf(l) > -1;) i = M7(n, n.l + 2), u = n.l + 4, l == 2066 ? u += 4 : (l == 2165 || l == 2175) && (u += 12), s = n.slice(u, n.l + 4 + i), o.push(s), n.l += 4 + i, d = qwt[l = M7(n, n.l)];
  var h = k0(o);
  db(h, 0);
  var p = 0;
  h.lens = [];
  for (var m = 0; m < o.length; ++m) h.lens.push(p), p += o[m].length;
  if (h.length < r) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + h.length + " < " + r;
  return t.f(h, h.length, a);
}

function f8(e, t, n) {
  if (e.t !== "z" && e.XF) {
    var r = 0;
    try {
      r = e.z || e.XF.numFmtId || 0, t.cellNF && e.z == null && (e.z = Cs[r]);
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Mb[e.v] : r === 0 || r == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = fke(e.v) : e.w = vJ(e.v) : e.w = Qk(r, e.v, {
        date1904: !!n,
        dateNF: t && t.dateNF
      });
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (t.cellDates && r && e.t == "n" && k3(Cs[r] || String(r))) {
      var a = E6(e.v + (n ? 1462 : 0));
      a && (e.t = "d", e.v = new Date(Date.UTC(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u)));
    }
  }
}

function Y6e(e, t, n) {
  return {
    v: e,
    ixfe: t,
    t: n
  };
}

function Yei(e, t) {
  var n = {
      opts: {}
    },
    r = {},
    a = {};
  t.dense && (a["!data"] = []);
  var i = {},
    o = {},
    s = null,
    l = [],
    d = "",
    u = {},
    h,
    p = "",
    m,
    f,
    y,
    b,
    v = {},
    _ = [],
    w,
    k,
    A = [],
    S = [],
    C = {
      Sheets: [],
      WBProps: {
        date1904: !1
      },
      Views: [{}]
    },
    I = {},
    E = !1,
    M = function (_e) {
      return _e < 8 ? jQ[_e] : _e < 64 && S[_e - 8] || jQ[_e];
    },
    T = function (_e, ke) {
      var ve = _e.XF.data;
      if (!(!ve || !ve.patternType || !ke || !ke.cellStyles)) {
        _e.s = {}, _e.s.patternType = ve.patternType;
        var Te;
        (Te = wke(M(ve.icvFore))) && (_e.s.fgColor = {
          rgb: Te
        }), (Te = wke(M(ve.icvBack))) && (_e.s.bgColor = {
          rgb: Te
        });
      }
    },
    P = function (_e, ke, ve) {
      if (!(!E && L > 1) && !(ve.sheetRows && _e.r >= ve.sheetRows)) {
        if (ve.cellStyles && ke.XF && ke.XF.data && T(ke, ve), delete ke.ixfe, delete ke.XF, h = _e, p = Xc(_e), (!o || !o.s || !o.e) && (o = {
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: 0,
            c: 0
          }
        }), _e.r < o.s.r && (o.s.r = _e.r), _e.c < o.s.c && (o.s.c = _e.c), _e.r + 1 > o.e.r && (o.e.r = _e.r + 1), _e.c + 1 > o.e.c && (o.e.c = _e.c + 1), ve.cellFormula && ke.f) {
          for (var Te = 0; Te < _.length; ++Te) if (!(_[Te][0].s.c > _e.c || _[Te][0].s.r > _e.r) && !(_[Te][0].e.c < _e.c || _[Te][0].e.r < _e.r)) {
            ke.F = Ac(_[Te][0]), (_[Te][0].s.c != _e.c || _[Te][0].s.r != _e.r) && delete ke.f, ke.f && (ke.f = "" + tx(_[Te][1], o, _e, V, R));
            break;
          }
        }
        ve.dense ? (a["!data"][_e.r] || (a["!data"][_e.r] = []), a["!data"][_e.r][_e.c] = ke) : a[p] = ke;
      }
    },
    R = {
      enc: !1,
      sbcch: 0,
      snames: [],
      sharedf: v,
      arrayf: _,
      rrtabid: [],
      lastuser: "",
      biff: 8,
      codepage: 0,
      winlocked: 0,
      cellStyles: !!t && !!t.cellStyles,
      WTF: !!t && !!t.wtf
    };
  t.password && (R.password = t.password);
  var j,
    B = [],
    F = [],
    N = [],
    G = [],
    z = !1,
    V = [];
  V.SheetNames = R.snames, V.sharedf = R.sharedf, V.arrayf = R.arrayf, V.names = [], V.XTI = [];
  var O = 0,
    L = 0,
    D = 0,
    U = [],
    H = [],
    Y;
  R.codepage = 1200, N5(1200);
  for (var K = !1; e.l < e.length - 1;) {
    var W = e.l,
      Q = e.read_shift(2);
    if (Q === 0 && O === 10) break;
    var q = e.l === e.length ? 0 : e.read_shift(2),
      ne = qwt[Q];
    if (L == 0 && [9, 521, 1033, 2057].indexOf(Q) == -1) break;
    if (ne && ne.f) {
      if (t.bookSheets && O === 133 && Q !== 133) break;
      if (O = Q, ne.r === 2 || ne.r == 12) {
        var de = e.read_shift(2);
        if (q -= 2, !R.enc && de !== Q && ((de & 255) << 8 | de >> 8) !== Q) throw new Error("rt mismatch: " + de + "!=" + Q);
        ne.r == 12 && (e.l += 10, q -= 10);
      }
      var le = {};
      if (Q === 10 ? le = ne.f(e, q, R) : le = Qei(Q, ne, e, q, R), L == 0 && [9, 521, 1033, 2057].indexOf(O) === -1) continue;
      switch (Q) {
        case 34:
          n.opts.Date1904 = C.WBProps.date1904 = le;
          break;
        case 134:
          n.opts.WriteProtect = !0;
          break;
        case 47:
          if (R.enc || (e.l = 0), R.enc = le, !t.password) throw new Error("File is password-protected");
          if (le.valid == null) throw new Error("Encryption scheme unsupported");
          if (!le.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          R.lastuser = le;
          break;
        case 66:
          var J = Number(le);
          switch (J) {
            case 21010:
              J = 1200;
              break;
            case 32768:
              J = 1e4;
              break;
            case 32769:
              J = 1252;
              break;
          }
          N5(R.codepage = J), K = !0;
          break;
        case 317:
          R.rrtabid = le;
          break;
        case 25:
          R.winlocked = le;
          break;
        case 439:
          n.opts.RefreshAll = le;
          break;
        case 12:
          n.opts.CalcCount = le;
          break;
        case 16:
          n.opts.CalcDelta = le;
          break;
        case 17:
          n.opts.CalcIter = le;
          break;
        case 13:
          n.opts.CalcMode = le;
          break;
        case 14:
          n.opts.CalcPrecision = le;
          break;
        case 95:
          n.opts.CalcSaveRecalc = le;
          break;
        case 15:
          R.CalcRefMode = le;
          break;
        case 2211:
          n.opts.FullCalc = le;
          break;
        case 129:
          le.fDialog && (a["!type"] = "dialog"), le.fBelow || ((a["!outline"] || (a["!outline"] = {})).above = !0), le.fRight || ((a["!outline"] || (a["!outline"] = {})).left = !0);
          break;
        case 67:
        case 579:
        case 1091:
        case 224:
          A.push(le);
          break;
        case 430:
          V.push([le]), V[V.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          V[V.length - 1].push(le);
          break;
        case 24:
        case 536:
          Y = {
            Name: le.Name,
            Ref: tx(le.rgce, o, null, V, R)
          }, le.itab > 0 && (Y.Sheet = le.itab - 1), V.names.push(Y), V[0] || (V[0] = [], V[0].XTI = []), V[V.length - 1].push(le), le.Name == "_xlnm._FilterDatabase" && le.itab > 0 && le.rgce && le.rgce[0] && le.rgce[0][0] && le.rgce[0][0][0] == "PtgArea3d" && (H[le.itab - 1] = {
            ref: Ac(le.rgce[0][0][1][2])
          });
          break;
        case 22:
          R.ExternCount = le;
          break;
        case 23:
          V.length == 0 && (V[0] = [], V[0].XTI = []), V[V.length - 1].XTI = V[V.length - 1].XTI.concat(le), V.XTI = V.XTI.concat(le);
          break;
        case 2196:
          if (R.biff < 8) break;
          Y != null && (Y.Comment = le[1]);
          break;
        case 18:
          a["!protect"] = le;
          break;
        case 19:
          le !== 0 && R.WTF && console.error("Password verifier: " + le);
          break;
        case 133:
          i[R.biff == 4 ? R.snames.length : le.pos] = le, R.snames.push(le.name);
          break;
        case 10:
          {
            if (--L ? !E : E) break;
            if (o.e) {
              if (o.e.r > 0 && o.e.c > 0) {
                if (o.e.r--, o.e.c--, a["!ref"] = Ac(o), t.sheetRows && t.sheetRows <= o.e.r) {
                  var pe = o.e.r;
                  o.e.r = t.sheetRows - 1, a["!fullref"] = a["!ref"], a["!ref"] = Ac(o), o.e.r = pe;
                }
                o.e.r++, o.e.c++;
              }
              B.length > 0 && (a["!merges"] = B), F.length > 0 && (a["!objects"] = F), N.length > 0 && (a["!cols"] = N), G.length > 0 && (a["!rows"] = G), C.Sheets.push(I);
            }
            d === "" ? u = a : r[d] = a, a = {}, t.dense && (a["!data"] = []);
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (R.biff === 8 && (R.biff = {
              9: 2,
              521: 3,
              1033: 4
            }[Q] || {
              512: 2,
              768: 3,
              1024: 4,
              1280: 5,
              1536: 8,
              2: 2,
              7: 2
            }[le.BIFFVer] || 8), R.biffguess = le.BIFFVer == 0, le.BIFFVer == 0 && le.dt == 4096 && (R.biff = 5, K = !0, N5(R.codepage = 28591)), R.biff == 4 && le.dt & 256 && (E = !0), R.biff == 8 && le.BIFFVer == 0 && le.dt == 16 && (R.biff = 2), L++ && !E) break;
            if (a = {}, t.dense && (a["!data"] = []), R.biff < 8 && !K && (K = !0, N5(R.codepage = t.codepage || 1252)), R.biff == 4 && E) d = (i[R.snames.indexOf(d) + 1] || {
              name: ""
            }).name;else if (R.biff < 5 || le.BIFFVer == 0 && le.dt == 4096) {
              d === "" && (d = "Sheet1"), o = {
                s: {
                  r: 0,
                  c: 0
                },
                e: {
                  r: 0,
                  c: 0
                }
              };
              var ce = {
                pos: e.l - q,
                name: d
              };
              i[ce.pos] = ce, R.snames.push(d);
            } else d = (i[W] || {
              name: ""
            }).name;
            le.dt == 32 && (a["!type"] = "chart"), le.dt == 64 && (a["!type"] = "macro"), B = [], F = [], R.arrayf = _ = [], N = [], G = [], z = !1, I = {
              Hidden: (i[W] || {
                hs: 0
              }).hs,
              name: d
            };
          }
          break;
        case 515:
        case 3:
        case 2:
          a["!type"] == "chart" && (t.dense ? (a["!data"][le.r] || [])[le.c] : a[ic(le.c) + Jc(le.r)]) && ++le.c, w = {
            ixfe: le.ixfe,
            XF: A[le.ixfe] || {},
            v: le.val,
            t: "n"
          }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t);
          break;
        case 5:
        case 517:
          w = {
            ixfe: le.ixfe,
            XF: A[le.ixfe],
            v: le.val,
            t: le.t
          }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t);
          break;
        case 638:
          w = {
            ixfe: le.ixfe,
            XF: A[le.ixfe],
            v: le.rknum,
            t: "n"
          }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t);
          break;
        case 189:
          for (var we = le.c; we <= le.C; ++we) {
            var X = le.rkrec[we - le.c][0];
            w = {
              ixfe: X,
              XF: A[X],
              v: le.rkrec[we - le.c][1],
              t: "n"
            }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
              c: we,
              r: le.r
            }, w, t);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (le.val == "String") {
              s = le;
              break;
            }
            if (w = Y6e(le.val, le.cell.ixfe, le.tt), w.XF = A[w.ixfe], t.cellFormula) {
              var Z = le.formula;
              if (Z && Z[0] && Z[0][0] && Z[0][0][0] == "PtgExp") {
                var re = Z[0][0][1][0],
                  fe = Z[0][0][1][1],
                  ye = Xc({
                    r: re,
                    c: fe
                  });
                v[ye] ? w.f = "" + tx(le.formula, o, le.cell, V, R) : w.F = ((t.dense ? (a["!data"][re] || [])[fe] : a[ye]) || {}).F;
              } else w.f = "" + tx(le.formula, o, le.cell, V, R);
            }
            D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P(le.cell, w, t), s = le;
          }
          break;
        case 7:
        case 519:
          if (s) s.val = le, w = Y6e(le, s.cell.ixfe, "s"), w.XF = A[w.ixfe], t.cellFormula && (w.f = "" + tx(s.formula, o, s.cell, V, R)), D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P(s.cell, w, t), s = null;else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            _.push(le);
            var ie = Xc(le[0].s);
            if (m = t.dense ? (a["!data"][le[0].s.r] || [])[le[0].s.c] : a[ie], t.cellFormula && m) {
              if (!s || !ie || !m) break;
              m.f = "" + tx(le[1], o, le[0], V, R), m.F = Ac(le[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (p) {
              if (!s) break;
              v[Xc(s.cell)] = le[0], m = t.dense ? (a["!data"][s.cell.r] || [])[s.cell.c] : a[Xc(s.cell)], (m || {}).f = "" + tx(le[0], o, h, V, R);
            }
          }
          break;
        case 253:
          w = Y6e(l[le.isst].t, le.ixfe, "s"), l[le.isst].h && (w.h = l[le.isst].h), w.XF = A[w.ixfe], D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t);
          break;
        case 513:
          t.sheetStubs && (w = {
            ixfe: le.ixfe,
            XF: A[le.ixfe],
            t: "z"
          }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t));
          break;
        case 190:
          if (t.sheetStubs) for (var ae = le.c; ae <= le.C; ++ae) {
            var be = le.ixfe[ae - le.c];
            w = {
              ixfe: be,
              XF: A[be],
              t: "z"
            }, D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
              c: ae,
              r: le.r
            }, w, t);
          }
          break;
        case 214:
        case 516:
        case 4:
          w = Y6e(le.val, le.ixfe, "s"), w.XF = A[w.ixfe], D > 0 && (w.z = w.XF && w.XF.numFmtId && U[w.XF.numFmtId] || U[w.ixfe >> 8 & 63]), f8(w, t, n.opts.Date1904), P({
            c: le.c,
            r: le.r
          }, w, t);
          break;
        case 0:
        case 512:
          L === 1 && (o = le);
          break;
        case 252:
          l = le;
          break;
        case 1054:
          if (R.biff >= 3 && R.biff <= 4) {
            U[D++] = le[1];
            for (var Ee = 0; Ee < D + 163 && Cs[Ee] != le[1]; ++Ee);
            Ee >= 163 && Fz(le[1], D + 163);
          } else Fz(le[1], le[0]);
          break;
        case 30:
          {
            U[D++] = le;
            for (var xe = 0; xe < D + 163 && Cs[xe] != le; ++xe);
            xe >= 163 && Fz(le, D + 163);
          }
          break;
        case 229:
          B = B.concat(le);
          break;
        case 93:
          F[le.cmo[0]] = R.lastobj = le;
          break;
        case 438:
          R.lastobj.TxO = le;
          break;
        case 127:
          R.lastobj.ImData = le;
          break;
        case 440:
          for (b = le[0].s.r; b <= le[0].e.r; ++b) for (y = le[0].s.c; y <= le[0].e.c; ++y) m = t.dense ? (a["!data"][b] || [])[y] : a[Xc({
            c: y,
            r: b
          })], m && (m.l = le[1]);
          break;
        case 2048:
          for (b = le[0].s.r; b <= le[0].e.r; ++b) for (y = le[0].s.c; y <= le[0].e.c; ++y) m = t.dense ? (a["!data"][b] || [])[y] : a[Xc({
            c: y,
            r: b
          })], m && m.l && (m.l.Tooltip = le[1]);
          break;
        case 28:
          {
            if (m = t.dense ? (a["!data"][le[0].r] || [])[le[0].c] : a[Xc(le[0])], m || (t.dense ? (a["!data"][le[0].r] || (a["!data"][le[0].r] = []), m = a["!data"][le[0].r][le[0].c] = {
              t: "z"
            }) : m = a[Xc(le[0])] = {
              t: "z"
            }, o.e.r = Math.max(o.e.r, le[0].r), o.s.r = Math.min(o.s.r, le[0].r), o.e.c = Math.max(o.e.c, le[0].c), o.s.c = Math.min(o.s.c, le[0].c)), m.c || (m.c = []), R.biff <= 5 && R.biff >= 2) f = {
              a: "SheetJ5",
              t: le[1]
            };else {
              var he = F[le[2]];
              f = {
                a: le[1],
                t: he.TxO.t
              }, le[3] != null && !(le[3] & 2) && (m.c.hidden = !0);
            }
            m.c.push(f);
          }
          break;
        case 2173:
          zQa(A[le.ixfe], le.ext);
          break;
        case 125:
          {
            if (!R.cellStyles) break;
            for (; le.e >= le.s;) N[le.e--] = {
              width: le.w / 256,
              level: le.level || 0,
              hidden: !!(le.flags & 1)
            }, z || (z = !0, HOt(le.w / 256)), cD(N[le.e + 1]);
          }
          break;
        case 520:
          {
            var ue = {};
            le.level != null && (G[le.r] = ue, ue.level = le.level), le.hidden && (G[le.r] = ue, ue.hidden = !0), le.hpt && (G[le.r] = ue, ue.hpt = le.hpt, ue.hpx = Rde(le.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          a["!margins"] || BQ(a["!margins"] = {}), a["!margins"][{
            38: "left",
            39: "right",
            40: "top",
            41: "bottom"
          }[Q]] = le;
          break;
        case 161:
          a["!margins"] || BQ(a["!margins"] = {}), a["!margins"].header = le.header, a["!margins"].footer = le.footer;
          break;
        case 574:
          le.RTL && (C.Views[0].RTL = !0);
          break;
        case 146:
          S = le;
          break;
        case 2198:
          j = le;
          break;
        case 140:
          k = le;
          break;
        case 442:
          d ? I.CodeName = le || I.name : C.WBProps.CodeName = le || "ThisWorkbook";
          break;
      }
    } else ne || console.error("Missing Info for XLS Record 0x" + Q.toString(16)), e.l += q;
  }
  return n.SheetNames = Gm(i).sort(function (ge, _e) {
    return Number(ge) - Number(_e);
  }).map(function (ge) {
    return i[ge].name;
  }), t.bookSheets || (n.Sheets = r), !n.SheetNames.length && u["!ref"] ? (n.SheetNames.push("Sheet1"), n.Sheets && (n.Sheets.Sheet1 = u)) : n.Preamble = u, n.Sheets && H.forEach(function (ge, _e) {
    n.Sheets[n.SheetNames[_e]]["!autofilter"] = ge;
  }), n.Strings = l, n.SSF = qu(Cs), R.enc && (n.Encryption = R.enc), j && (n.Themes = j), n.Metadata = {}, k !== void 0 && (n.Metadata.Country = k), V.names.length > 0 && (C.Names = V.names), n.Workbook = C, n;
}

var f1e = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};

function Xei(e, t, n) {
  var r = Ds.find(e, "/!DocumentSummaryInformation");
  if (r && r.size > 0) try {
    var a = qin(r, Uwt, f1e.DSI);
    for (var i in a) t[i] = a[i];
  } catch (d) {
    if (n.WTF) throw d;
  }
  var o = Ds.find(e, "/!SummaryInformation");
  if (o && o.size > 0) try {
    var s = qin(o, $wt, f1e.SI);
    for (var l in s) t[l] == null && (t[l] = s[l]);
  } catch (d) {
    if (n.WTF) throw d;
  }
  t.HeadingPairs && t.TitlesOfParts && (Znr(t.HeadingPairs, t.TitlesOfParts, t, n), delete t.HeadingPairs, delete t.TitlesOfParts);
}

function Jei(e, t) {
  var n = [],
    r = [],
    a = [],
    i = 0,
    o,
    s = Sin(Uwt, "n"),
    l = Sin($wt, "n");
  if (e.Props) for (o = Gm(e.Props), i = 0; i < o.length; ++i) (Object.prototype.hasOwnProperty.call(s, o[i]) ? n : Object.prototype.hasOwnProperty.call(l, o[i]) ? r : a).push([o[i], e.Props[o[i]]]);
  if (e.Custprops) for (o = Gm(e.Custprops), i = 0; i < o.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, o[i]) || (Object.prototype.hasOwnProperty.call(s, o[i]) ? n : Object.prototype.hasOwnProperty.call(l, o[i]) ? r : a).push([o[i], e.Custprops[o[i]]]);
  var d = [];
  for (i = 0; i < a.length; ++i) arr.indexOf(a[i][0]) > -1 || Jnr.indexOf(a[i][0]) > -1 || a[i][1] != null && d.push(a[i]);
  r.length && Ds.utils.cfb_add(t, "/SummaryInformation", Kin(r, f1e.SI, l, $wt)), (n.length || d.length) && Ds.utils.cfb_add(t, "/DocumentSummaryInformation", Kin(n, f1e.DSI, s, Uwt, d.length ? d : null, f1e.UDI));
}

function WXe(e, t) {
  t || (t = {}), XOt(t), DXe(), t.codepage && jXe(t.codepage);
  var n, r;
  if (e.FullPaths) {
    if (Ds.find(e, "/encryption")) throw new Error("File is password-protected");
    n = Ds.find(e, "!CompObj"), r = Ds.find(e, "/Workbook") || Ds.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = I2(_3(e));
        break;
      case "binary":
        e = I2(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    db(e, 0), r = {
      content: e
    };
  }
  var a, i;
  if (n && qei(n), t.bookProps && !t.bookSheets) a = {};else {
    var o = Uc ? "buffer" : "array";
    if (r && r.content) a = Yei(r.content, t);else if ((i = Ds.find(e, "PerfectOffice_MAIN")) && i.content) a = LQ.to_workbook(i.content, (t.type = o, t));else if ((i = Ds.find(e, "NativeContent_MAIN")) && i.content) a = LQ.to_workbook(i.content, (t.type = o, t));else throw (i = Ds.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && Ds.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (a.vbaraw = fYa(e));
  }
  var s = {};
  return e.FullPaths && Xei(e, s, t), a.Props = a.Custprops = s, t.bookFiles && (a.cfb = e), a;
}

function Zei(e, t) {
  var n = t || {},
    r = Ds.utils.cfb_new({
      root: "R"
    }),
    a = "/Workbook";
  switch (n.bookType || "xls") {
    case "xls":
      n.bookType = "biff8";
    case "xla":
      n.bookType || (n.bookType = "xla");
    case "biff8":
      a = "/Workbook", n.biff = 8;
      break;
    case "biff5":
      a = "/Book", n.biff = 5;
      break;
    default:
      throw new Error("invalid type " + n.bookType + " for XLS CFB");
  }
  return Ds.utils.cfb_add(r, a, oar(e, n)), n.biff == 8 && (e.Props || e.Custprops) && Jei(e, r), n.biff == 8 && e.vbaraw && gYa(r, Ds.read(e.vbaraw, {
    type: typeof e.vbaraw == "string" ? "binary" : "buffer"
  })), r;
}

var kke = {
    0: {
      f: DJa
    },
    1: {
      f: GJa
    },
    2: {
      f: oZa
    },
    3: {
      f: XJa
    },
    4: {
      f: qJa
    },
    5: {
      f: rZa
    },
    6: {
      f: uZa
    },
    7: {
      f: ZJa
    },
    8: {
      f: bZa
    },
    9: {
      f: yZa
    },
    10: {
      f: fZa
    },
    11: {
      f: gZa
    },
    12: {
      f: HJa
    },
    13: {
      f: lZa
    },
    14: {
      f: JJa
    },
    15: {
      f: QJa
    },
    16: {
      f: Grr
    },
    17: {
      f: pZa
    },
    18: {
      f: tZa
    },
    19: {
      f: LOt
    },
    20: {},
    21: {},
    22: {},
    23: {},
    24: {},
    25: {},
    26: {},
    27: {},
    28: {},
    29: {},
    30: {},
    31: {},
    32: {},
    33: {},
    34: {},
    35: {
      T: 1
    },
    36: {
      T: -1
    },
    37: {
      T: 1
    },
    38: {
      T: -1
    },
    39: {
      f: pei
    },
    40: {},
    42: {},
    43: {
      f: dQa
    },
    44: {
      f: lQa
    },
    45: {
      f: pQa
    },
    46: {
      f: fQa
    },
    47: {
      f: mQa
    },
    48: {},
    49: {
      f: SHa
    },
    50: {},
    51: {
      f: GQa
    },
    52: {
      T: 1
    },
    53: {
      T: -1
    },
    54: {
      T: 1
    },
    55: {
      T: -1
    },
    56: {
      T: 1
    },
    57: {
      T: -1
    },
    58: {},
    59: {},
    60: {
      f: yrr
    },
    62: {
      f: dZa
    },
    63: {
      f: ZQa
    },
    64: {
      f: jZa
    },
    65: {},
    66: {},
    67: {},
    68: {},
    69: {},
    70: {},
    128: {},
    129: {
      T: 1
    },
    130: {
      T: -1
    },
    131: {
      T: 1,
      f: Rx,
      p: 0
    },
    132: {
      T: -1
    },
    133: {
      T: 1
    },
    134: {
      T: -1
    },
    135: {
      T: 1
    },
    136: {
      T: -1
    },
    137: {
      T: 1,
      f: MZa
    },
    138: {
      T: -1
    },
    139: {
      T: 1
    },
    140: {
      T: -1
    },
    141: {
      T: 1
    },
    142: {
      T: -1
    },
    143: {
      T: 1
    },
    144: {
      T: -1
    },
    145: {
      T: 1
    },
    146: {
      T: -1
    },
    147: {
      f: UJa
    },
    148: {
      f: BJa,
      p: 16
    },
    151: {
      f: AZa
    },
    152: {},
    153: {
      f: dei
    },
    154: {},
    155: {},
    156: {
      f: lei
    },
    157: {},
    158: {},
    159: {
      T: 1,
      f: xKa
    },
    160: {
      T: -1
    },
    161: {
      T: 1,
      f: QZ
    },
    162: {
      T: -1
    },
    163: {
      T: 1
    },
    164: {
      T: -1
    },
    165: {
      T: 1
    },
    166: {
      T: -1
    },
    167: {},
    168: {},
    169: {},
    170: {},
    171: {},
    172: {
      T: 1
    },
    173: {
      T: -1
    },
    174: {},
    175: {},
    176: {
      f: vZa
    },
    177: {
      T: 1
    },
    178: {
      T: -1
    },
    179: {
      T: 1
    },
    180: {
      T: -1
    },
    181: {
      T: 1
    },
    182: {
      T: -1
    },
    183: {
      T: 1
    },
    184: {
      T: -1
    },
    185: {
      T: 1
    },
    186: {
      T: -1
    },
    187: {
      T: 1
    },
    188: {
      T: -1
    },
    189: {
      T: 1
    },
    190: {
      T: -1
    },
    191: {
      T: 1
    },
    192: {
      T: -1
    },
    193: {
      T: 1
    },
    194: {
      T: -1
    },
    195: {
      T: 1
    },
    196: {
      T: -1
    },
    197: {
      T: 1
    },
    198: {
      T: -1
    },
    199: {
      T: 1
    },
    200: {
      T: -1
    },
    201: {
      T: 1
    },
    202: {
      T: -1
    },
    203: {
      T: 1
    },
    204: {
      T: -1
    },
    205: {
      T: 1
    },
    206: {
      T: -1
    },
    207: {
      T: 1
    },
    208: {
      T: -1
    },
    209: {
      T: 1
    },
    210: {
      T: -1
    },
    211: {
      T: 1
    },
    212: {
      T: -1
    },
    213: {
      T: 1
    },
    214: {
      T: -1
    },
    215: {
      T: 1
    },
    216: {
      T: -1
    },
    217: {
      T: 1
    },
    218: {
      T: -1
    },
    219: {
      T: 1
    },
    220: {
      T: -1
    },
    221: {
      T: 1
    },
    222: {
      T: -1
    },
    223: {
      T: 1
    },
    224: {
      T: -1
    },
    225: {
      T: 1
    },
    226: {
      T: -1
    },
    227: {
      T: 1
    },
    228: {
      T: -1
    },
    229: {
      T: 1
    },
    230: {
      T: -1
    },
    231: {
      T: 1
    },
    232: {
      T: -1
    },
    233: {
      T: 1
    },
    234: {
      T: -1
    },
    235: {
      T: 1
    },
    236: {
      T: -1
    },
    237: {
      T: 1
    },
    238: {
      T: -1
    },
    239: {
      T: 1
    },
    240: {
      T: -1
    },
    241: {
      T: 1
    },
    242: {
      T: -1
    },
    243: {
      T: 1
    },
    244: {
      T: -1
    },
    245: {
      T: 1
    },
    246: {
      T: -1
    },
    247: {
      T: 1
    },
    248: {
      T: -1
    },
    249: {
      T: 1
    },
    250: {
      T: -1
    },
    251: {
      T: 1
    },
    252: {
      T: -1
    },
    253: {
      T: 1
    },
    254: {
      T: -1
    },
    255: {
      T: 1
    },
    256: {
      T: -1
    },
    257: {
      T: 1
    },
    258: {
      T: -1
    },
    259: {
      T: 1
    },
    260: {
      T: -1
    },
    261: {
      T: 1
    },
    262: {
      T: -1
    },
    263: {
      T: 1
    },
    264: {
      T: -1
    },
    265: {
      T: 1
    },
    266: {
      T: -1
    },
    267: {
      T: 1
    },
    268: {
      T: -1
    },
    269: {
      T: 1
    },
    270: {
      T: -1
    },
    271: {
      T: 1
    },
    272: {
      T: -1
    },
    273: {
      T: 1
    },
    274: {
      T: -1
    },
    275: {
      T: 1
    },
    276: {
      T: -1
    },
    277: {},
    278: {
      T: 1
    },
    279: {
      T: -1
    },
    280: {
      T: 1
    },
    281: {
      T: -1
    },
    282: {
      T: 1
    },
    283: {
      T: 1
    },
    284: {
      T: -1
    },
    285: {
      T: 1
    },
    286: {
      T: -1
    },
    287: {
      T: 1
    },
    288: {
      T: -1
    },
    289: {
      T: 1
    },
    290: {
      T: -1
    },
    291: {
      T: 1
    },
    292: {
      T: -1
    },
    293: {
      T: 1
    },
    294: {
      T: -1
    },
    295: {
      T: 1
    },
    296: {
      T: -1
    },
    297: {
      T: 1
    },
    298: {
      T: -1
    },
    299: {
      T: 1
    },
    300: {
      T: -1
    },
    301: {
      T: 1
    },
    302: {
      T: -1
    },
    303: {
      T: 1
    },
    304: {
      T: -1
    },
    305: {
      T: 1
    },
    306: {
      T: -1
    },
    307: {
      T: 1
    },
    308: {
      T: -1
    },
    309: {
      T: 1
    },
    310: {
      T: -1
    },
    311: {
      T: 1
    },
    312: {
      T: -1
    },
    313: {
      T: -1
    },
    314: {
      T: 1
    },
    315: {
      T: -1
    },
    316: {
      T: 1
    },
    317: {
      T: -1
    },
    318: {
      T: 1
    },
    319: {
      T: -1
    },
    320: {
      T: 1
    },
    321: {
      T: -1
    },
    322: {
      T: 1
    },
    323: {
      T: -1
    },
    324: {
      T: 1
    },
    325: {
      T: -1
    },
    326: {
      T: 1
    },
    327: {
      T: -1
    },
    328: {
      T: 1
    },
    329: {
      T: -1
    },
    330: {
      T: 1
    },
    331: {
      T: -1
    },
    332: {
      T: 1
    },
    333: {
      T: -1
    },
    334: {
      T: 1
    },
    335: {
      f: UQa
    },
    336: {
      T: -1
    },
    337: {
      f: WQa,
      T: 1
    },
    338: {
      T: -1
    },
    339: {
      T: 1
    },
    340: {
      T: -1
    },
    341: {
      T: 1
    },
    342: {
      T: -1
    },
    343: {
      T: 1
    },
    344: {
      T: -1
    },
    345: {
      T: 1
    },
    346: {
      T: -1
    },
    347: {
      T: 1
    },
    348: {
      T: -1
    },
    349: {
      T: 1
    },
    350: {
      T: -1
    },
    351: {},
    352: {},
    353: {
      T: 1
    },
    354: {
      T: -1
    },
    355: {
      f: zwt
    },
    357: {},
    358: {},
    359: {},
    360: {
      T: 1
    },
    361: {},
    362: {
      f: grr
    },
    363: {},
    364: {},
    366: {},
    367: {},
    368: {},
    369: {},
    370: {},
    371: {},
    372: {
      T: 1
    },
    373: {
      T: -1
    },
    374: {
      T: 1
    },
    375: {
      T: -1
    },
    376: {
      T: 1
    },
    377: {
      T: -1
    },
    378: {
      T: 1
    },
    379: {
      T: -1
    },
    380: {
      T: 1
    },
    381: {
      T: -1
    },
    382: {
      T: 1
    },
    383: {
      T: -1
    },
    384: {
      T: 1
    },
    385: {
      T: -1
    },
    386: {
      T: 1
    },
    387: {
      T: -1
    },
    388: {
      T: 1
    },
    389: {
      T: -1
    },
    390: {
      T: 1
    },
    391: {
      T: -1
    },
    392: {
      T: 1
    },
    393: {
      T: -1
    },
    394: {
      T: 1
    },
    395: {
      T: -1
    },
    396: {},
    397: {},
    398: {},
    399: {},
    400: {},
    401: {
      T: 1
    },
    403: {},
    404: {},
    405: {},
    406: {},
    407: {},
    408: {},
    409: {},
    410: {},
    411: {},
    412: {},
    413: {},
    414: {},
    415: {},
    416: {},
    417: {},
    418: {},
    419: {},
    420: {},
    421: {},
    422: {
      T: 1
    },
    423: {
      T: 1
    },
    424: {
      T: -1
    },
    425: {
      T: -1
    },
    426: {
      f: SZa
    },
    427: {
      f: IZa
    },
    428: {},
    429: {
      T: 1
    },
    430: {
      T: -1
    },
    431: {
      T: 1
    },
    432: {
      T: -1
    },
    433: {
      T: 1
    },
    434: {
      T: -1
    },
    435: {
      T: 1
    },
    436: {
      T: -1
    },
    437: {
      T: 1
    },
    438: {
      T: -1
    },
    439: {
      T: 1
    },
    440: {
      T: -1
    },
    441: {
      T: 1
    },
    442: {
      T: -1
    },
    443: {
      T: 1
    },
    444: {
      T: -1
    },
    445: {
      T: 1
    },
    446: {
      T: -1
    },
    447: {
      T: 1
    },
    448: {
      T: -1
    },
    449: {
      T: 1
    },
    450: {
      T: -1
    },
    451: {
      T: 1
    },
    452: {
      T: -1
    },
    453: {
      T: 1
    },
    454: {
      T: -1
    },
    455: {
      T: 1
    },
    456: {
      T: -1
    },
    457: {
      T: 1
    },
    458: {
      T: -1
    },
    459: {
      T: 1
    },
    460: {
      T: -1
    },
    461: {
      T: 1
    },
    462: {
      T: -1
    },
    463: {
      T: 1
    },
    464: {
      T: -1
    },
    465: {
      T: 1
    },
    466: {
      T: -1
    },
    467: {
      T: 1
    },
    468: {
      T: -1
    },
    469: {
      T: 1
    },
    470: {
      T: -1
    },
    471: {},
    472: {},
    473: {
      T: 1
    },
    474: {
      T: -1
    },
    475: {},
    476: {
      f: EZa
    },
    477: {},
    478: {},
    479: {
      T: 1
    },
    480: {
      T: -1
    },
    481: {
      T: 1
    },
    482: {
      T: -1
    },
    483: {
      T: 1
    },
    484: {
      T: -1
    },
    485: {
      f: zJa
    },
    486: {
      T: 1
    },
    487: {
      T: -1
    },
    488: {
      T: 1
    },
    489: {
      T: -1
    },
    490: {
      T: 1
    },
    491: {
      T: -1
    },
    492: {
      T: 1
    },
    493: {
      T: -1
    },
    494: {
      f: _Za
    },
    495: {
      T: 1
    },
    496: {
      T: -1
    },
    497: {
      T: 1
    },
    498: {
      T: -1
    },
    499: {},
    500: {
      T: 1
    },
    501: {
      T: -1
    },
    502: {
      T: 1
    },
    503: {
      T: -1
    },
    504: {},
    505: {
      T: 1
    },
    506: {
      T: -1
    },
    507: {},
    508: {
      T: 1
    },
    509: {
      T: -1
    },
    510: {
      T: 1
    },
    511: {
      T: -1
    },
    512: {},
    513: {},
    514: {
      T: 1
    },
    515: {
      T: -1
    },
    516: {
      T: 1
    },
    517: {
      T: -1
    },
    518: {
      T: 1
    },
    519: {
      T: -1
    },
    520: {
      T: 1
    },
    521: {
      T: -1
    },
    522: {},
    523: {},
    524: {},
    525: {},
    526: {},
    527: {},
    528: {
      T: 1
    },
    529: {
      T: -1
    },
    530: {
      T: 1
    },
    531: {
      T: -1
    },
    532: {
      T: 1
    },
    533: {
      T: -1
    },
    534: {},
    535: {},
    536: {},
    537: {},
    538: {
      T: 1
    },
    539: {
      T: -1
    },
    540: {
      T: 1
    },
    541: {
      T: -1
    },
    542: {
      T: 1
    },
    548: {},
    549: {},
    550: {
      f: zwt
    },
    551: {
      f: zXe
    },
    552: {},
    553: {},
    554: {
      T: 1
    },
    555: {
      T: -1
    },
    556: {
      T: 1
    },
    557: {
      T: -1
    },
    558: {
      T: 1
    },
    559: {
      T: -1
    },
    560: {
      T: 1
    },
    561: {
      T: -1
    },
    562: {},
    564: {},
    565: {
      T: 1
    },
    566: {
      T: -1
    },
    569: {
      T: 1
    },
    570: {
      T: -1
    },
    572: {},
    573: {
      T: 1
    },
    574: {
      T: -1
    },
    577: {},
    578: {},
    579: {},
    580: {},
    581: {},
    582: {},
    583: {},
    584: {},
    585: {},
    586: {},
    587: {},
    588: {
      T: -1
    },
    589: {},
    590: {
      T: 1
    },
    591: {
      T: -1
    },
    592: {
      T: 1
    },
    593: {
      T: -1
    },
    594: {
      T: 1
    },
    595: {
      T: -1
    },
    596: {},
    597: {
      T: 1
    },
    598: {
      T: -1
    },
    599: {
      T: 1
    },
    600: {
      T: -1
    },
    601: {
      T: 1
    },
    602: {
      T: -1
    },
    603: {
      T: 1
    },
    604: {
      T: -1
    },
    605: {
      T: 1
    },
    606: {
      T: -1
    },
    607: {},
    608: {
      T: 1
    },
    609: {
      T: -1
    },
    610: {},
    611: {
      T: 1
    },
    612: {
      T: -1
    },
    613: {
      T: 1
    },
    614: {
      T: -1
    },
    615: {
      T: 1
    },
    616: {
      T: -1
    },
    617: {
      T: 1
    },
    618: {
      T: -1
    },
    619: {
      T: 1
    },
    620: {
      T: -1
    },
    625: {},
    626: {
      T: 1
    },
    627: {
      T: -1
    },
    628: {
      T: 1
    },
    629: {
      T: -1
    },
    630: {
      T: 1
    },
    631: {
      T: -1
    },
    632: {
      f: uYa
    },
    633: {
      T: 1
    },
    634: {
      T: -1
    },
    635: {
      T: 1,
      f: cYa
    },
    636: {
      T: -1
    },
    637: {
      f: THa
    },
    638: {
      T: 1
    },
    639: {},
    640: {
      T: -1
    },
    641: {
      T: 1
    },
    642: {
      T: -1
    },
    643: {
      T: 1
    },
    644: {},
    645: {
      T: -1
    },
    646: {
      T: 1
    },
    648: {
      T: 1
    },
    649: {},
    650: {
      T: -1
    },
    651: {
      f: XZa
    },
    652: {},
    653: {
      T: 1
    },
    654: {
      T: -1
    },
    655: {
      T: 1
    },
    656: {
      T: -1
    },
    657: {
      T: 1
    },
    658: {
      T: -1
    },
    659: {},
    660: {
      T: 1
    },
    661: {},
    662: {
      T: -1
    },
    663: {},
    664: {
      T: 1
    },
    665: {},
    666: {
      T: -1
    },
    667: {},
    668: {},
    669: {},
    671: {
      T: 1
    },
    672: {
      T: -1
    },
    673: {
      T: 1
    },
    674: {
      T: -1
    },
    675: {},
    676: {},
    677: {},
    678: {},
    679: {},
    680: {},
    681: {},
    1024: {},
    1025: {},
    1026: {
      T: 1
    },
    1027: {
      T: -1
    },
    1028: {
      T: 1
    },
    1029: {
      T: -1
    },
    1030: {},
    1031: {
      T: 1
    },
    1032: {
      T: -1
    },
    1033: {
      T: 1
    },
    1034: {
      T: -1
    },
    1035: {},
    1036: {},
    1037: {},
    1038: {
      T: 1
    },
    1039: {
      T: -1
    },
    1040: {},
    1041: {
      T: 1
    },
    1042: {
      T: -1
    },
    1043: {},
    1044: {},
    1045: {},
    1046: {
      T: 1
    },
    1047: {
      T: -1
    },
    1048: {
      T: 1
    },
    1049: {
      T: -1
    },
    1050: {},
    1051: {
      T: 1
    },
    1052: {
      T: 1
    },
    1053: {
      f: DZa
    },
    1054: {
      T: 1
    },
    1055: {},
    1056: {
      T: 1
    },
    1057: {
      T: -1
    },
    1058: {
      T: 1
    },
    1059: {
      T: -1
    },
    1061: {},
    1062: {
      T: 1
    },
    1063: {
      T: -1
    },
    1064: {
      T: 1
    },
    1065: {
      T: -1
    },
    1066: {
      T: 1
    },
    1067: {
      T: -1
    },
    1068: {
      T: 1
    },
    1069: {
      T: -1
    },
    1070: {
      T: 1
    },
    1071: {
      T: -1
    },
    1072: {
      T: 1
    },
    1073: {
      T: -1
    },
    1075: {
      T: 1
    },
    1076: {
      T: -1
    },
    1077: {
      T: 1
    },
    1078: {
      T: -1
    },
    1079: {
      T: 1
    },
    1080: {
      T: -1
    },
    1081: {
      T: 1
    },
    1082: {
      T: -1
    },
    1083: {
      T: 1
    },
    1084: {
      T: -1
    },
    1085: {},
    1086: {
      T: 1
    },
    1087: {
      T: -1
    },
    1088: {
      T: 1
    },
    1089: {
      T: -1
    },
    1090: {
      T: 1
    },
    1091: {
      T: -1
    },
    1092: {
      T: 1
    },
    1093: {
      T: -1
    },
    1094: {
      T: 1
    },
    1095: {
      T: -1
    },
    1096: {},
    1097: {
      T: 1
    },
    1098: {},
    1099: {
      T: -1
    },
    1100: {
      T: 1
    },
    1101: {
      T: -1
    },
    1102: {},
    1103: {},
    1104: {},
    1105: {},
    1111: {},
    1112: {},
    1113: {
      T: 1
    },
    1114: {
      T: -1
    },
    1115: {
      T: 1
    },
    1116: {
      T: -1
    },
    1117: {},
    1118: {
      T: 1
    },
    1119: {
      T: -1
    },
    1120: {
      T: 1
    },
    1121: {
      T: -1
    },
    1122: {
      T: 1
    },
    1123: {
      T: -1
    },
    1124: {
      T: 1
    },
    1125: {
      T: -1
    },
    1126: {},
    1128: {
      T: 1
    },
    1129: {
      T: -1
    },
    1130: {},
    1131: {
      T: 1
    },
    1132: {
      T: -1
    },
    1133: {
      T: 1
    },
    1134: {
      T: -1
    },
    1135: {
      T: 1
    },
    1136: {
      T: -1
    },
    1137: {
      T: 1
    },
    1138: {
      T: -1
    },
    1139: {
      T: 1
    },
    1140: {
      T: -1
    },
    1141: {},
    1142: {
      T: 1
    },
    1143: {
      T: -1
    },
    1144: {
      T: 1
    },
    1145: {
      T: -1
    },
    1146: {},
    1147: {
      T: 1
    },
    1148: {
      T: -1
    },
    1149: {
      T: 1
    },
    1150: {
      T: -1
    },
    1152: {
      T: 1
    },
    1153: {
      T: -1
    },
    1154: {
      T: -1
    },
    1155: {
      T: -1
    },
    1156: {
      T: -1
    },
    1157: {
      T: 1
    },
    1158: {
      T: -1
    },
    1159: {
      T: 1
    },
    1160: {
      T: -1
    },
    1161: {
      T: 1
    },
    1162: {
      T: -1
    },
    1163: {
      T: 1
    },
    1164: {
      T: -1
    },
    1165: {
      T: 1
    },
    1166: {
      T: -1
    },
    1167: {
      T: 1
    },
    1168: {
      T: -1
    },
    1169: {
      T: 1
    },
    1170: {
      T: -1
    },
    1171: {},
    1172: {
      T: 1
    },
    1173: {
      T: -1
    },
    1177: {},
    1178: {
      T: 1
    },
    1180: {},
    1181: {},
    1182: {},
    2048: {
      T: 1
    },
    2049: {
      T: -1
    },
    2050: {},
    2051: {
      T: 1
    },
    2052: {
      T: -1
    },
    2053: {},
    2054: {},
    2055: {
      T: 1
    },
    2056: {
      T: -1
    },
    2057: {
      T: 1
    },
    2058: {
      T: -1
    },
    2060: {},
    2067: {},
    2068: {
      T: 1
    },
    2069: {
      T: -1
    },
    2070: {},
    2071: {},
    2072: {
      T: 1
    },
    2073: {
      T: -1
    },
    2075: {},
    2076: {},
    2077: {
      T: 1
    },
    2078: {
      T: -1
    },
    2079: {},
    2080: {
      T: 1
    },
    2081: {
      T: -1
    },
    2082: {},
    2083: {
      T: 1
    },
    2084: {
      T: -1
    },
    2085: {
      T: 1
    },
    2086: {
      T: -1
    },
    2087: {
      T: 1
    },
    2088: {
      T: -1
    },
    2089: {
      T: 1
    },
    2090: {
      T: -1
    },
    2091: {},
    2092: {},
    2093: {
      T: 1
    },
    2094: {
      T: -1
    },
    2095: {},
    2096: {
      T: 1
    },
    2097: {
      T: -1
    },
    2098: {
      T: 1
    },
    2099: {
      T: -1
    },
    2100: {
      T: 1
    },
    2101: {
      T: -1
    },
    2102: {},
    2103: {
      T: 1
    },
    2104: {
      T: -1
    },
    2105: {},
    2106: {
      T: 1
    },
    2107: {
      T: -1
    },
    2108: {},
    2109: {
      T: 1
    },
    2110: {
      T: -1
    },
    2111: {
      T: 1
    },
    2112: {
      T: -1
    },
    2113: {
      T: 1
    },
    2114: {
      T: -1
    },
    2115: {},
    2116: {},
    2117: {},
    2118: {
      T: 1
    },
    2119: {
      T: -1
    },
    2120: {},
    2121: {
      T: 1
    },
    2122: {
      T: -1
    },
    2123: {
      T: 1
    },
    2124: {
      T: -1
    },
    2125: {},
    2126: {
      T: 1
    },
    2127: {
      T: -1
    },
    2128: {},
    2129: {
      T: 1
    },
    2130: {
      T: -1
    },
    2131: {
      T: 1
    },
    2132: {
      T: -1
    },
    2133: {
      T: 1
    },
    2134: {},
    2135: {},
    2136: {},
    2137: {
      T: 1
    },
    2138: {
      T: -1
    },
    2139: {
      T: 1
    },
    2140: {
      T: -1
    },
    2141: {},
    3072: {},
    3073: {},
    4096: {
      T: 1
    },
    4097: {
      T: -1
    },
    5002: {
      T: 1
    },
    5003: {
      T: -1
    },
    5081: {
      T: 1
    },
    5082: {
      T: -1
    },
    5083: {},
    5084: {
      T: 1
    },
    5085: {
      T: -1
    },
    5086: {
      T: 1
    },
    5087: {
      T: -1
    },
    5088: {},
    5089: {},
    5090: {},
    5092: {
      T: 1
    },
    5093: {
      T: -1
    },
    5094: {},
    5095: {
      T: 1
    },
    5096: {
      T: -1
    },
    5097: {},
    5099: {},
    65535: {
      n: ""
    }
  },
  qwt = {
    6: {
      f: Wit
    },
    10: {
      f: LL
    },
    12: {
      f: Rg
    },
    13: {
      f: Rg
    },
    14: {
      f: m0
    },
    15: {
      f: m0
    },
    16: {
      f: cx
    },
    17: {
      f: m0
    },
    18: {
      f: m0
    },
    19: {
      f: Rg
    },
    20: {
      f: Zin
    },
    21: {
      f: Zin
    },
    23: {
      f: grr
    },
    24: {
      f: ton
    },
    25: {
      f: m0
    },
    26: {},
    27: {},
    28: {
      f: Tqa
    },
    29: {},
    34: {
      f: m0
    },
    35: {
      f: eon
    },
    38: {
      f: cx
    },
    39: {
      f: cx
    },
    40: {
      f: cx
    },
    41: {
      f: cx
    },
    42: {
      f: m0
    },
    43: {
      f: m0
    },
    47: {
      f: $Ka
    },
    49: {
      f: XWa
    },
    51: {
      f: Rg
    },
    60: {},
    61: {
      f: WWa
    },
    64: {
      f: m0
    },
    65: {
      f: YWa
    },
    66: {
      f: Rg
    },
    77: {},
    80: {},
    81: {},
    82: {},
    85: {
      f: Rg
    },
    89: {},
    90: {},
    91: {},
    92: {
      f: DWa
    },
    93: {
      f: Rqa
    },
    94: {},
    95: {
      f: m0
    },
    96: {},
    97: {},
    99: {
      f: m0
    },
    125: {
      f: yrr
    },
    128: {
      f: vqa
    },
    129: {
      f: OWa
    },
    130: {
      f: Rg
    },
    131: {
      f: m0
    },
    132: {
      f: m0
    },
    133: {
      f: BWa
    },
    134: {},
    140: {
      f: zqa
    },
    141: {
      f: Rg
    },
    144: {},
    146: {
      f: Gqa
    },
    151: {},
    152: {},
    153: {},
    154: {},
    155: {},
    156: {
      f: Rg
    },
    157: {},
    158: {},
    160: {
      f: Yqa
    },
    161: {
      f: Wqa
    },
    174: {},
    175: {},
    176: {},
    177: {},
    178: {},
    180: {},
    181: {},
    182: {},
    184: {},
    185: {},
    189: {
      f: dqa
    },
    190: {
      f: uqa
    },
    193: {
      f: LL
    },
    197: {},
    198: {},
    199: {},
    200: {},
    201: {},
    202: {
      f: m0
    },
    203: {},
    204: {},
    205: {},
    206: {},
    207: {},
    208: {},
    209: {},
    210: {},
    211: {},
    213: {},
    215: {},
    216: {},
    217: {},
    218: {
      f: Rg
    },
    220: {},
    221: {
      f: m0
    },
    222: {},
    224: {
      f: pqa
    },
    225: {
      f: jWa
    },
    226: {
      f: LL
    },
    227: {},
    229: {
      f: Mqa
    },
    233: {},
    235: {},
    236: {},
    237: {},
    239: {},
    240: {},
    241: {},
    242: {},
    244: {},
    245: {},
    246: {},
    247: {},
    248: {},
    249: {},
    251: {},
    252: {
      f: zWa
    },
    253: {
      f: ZWa
    },
    255: {
      f: $Wa
    },
    256: {},
    259: {},
    290: {},
    311: {},
    312: {},
    315: {},
    317: {
      f: irr
    },
    318: {},
    319: {},
    320: {},
    330: {},
    331: {},
    333: {},
    334: {},
    335: {},
    336: {},
    337: {},
    338: {},
    339: {},
    340: {},
    351: {},
    352: {
      f: m0
    },
    353: {
      f: LL
    },
    401: {},
    402: {},
    403: {},
    404: {},
    405: {},
    406: {},
    407: {},
    408: {},
    425: {},
    426: {},
    427: {},
    428: {},
    429: {},
    430: {
      f: Aqa
    },
    431: {
      f: m0
    },
    432: {},
    433: {},
    434: {},
    437: {},
    438: {
      f: Dqa
    },
    439: {
      f: m0
    },
    440: {
      f: Lqa
    },
    441: {},
    442: {
      f: SCe
    },
    443: {},
    444: {
      f: Rg
    },
    445: {},
    446: {},
    448: {
      f: LL
    },
    449: {
      f: HWa,
      r: 2
    },
    450: {
      f: LL
    },
    512: {
      f: Xin
    },
    513: {
      f: Qqa
    },
    515: {
      f: _qa
    },
    516: {
      f: tqa
    },
    517: {
      f: xqa
    },
    519: {
      f: Xqa
    },
    520: {
      f: GWa
    },
    523: {},
    545: {
      f: ron
    },
    549: {
      f: Yin
    },
    566: {},
    574: {
      f: KWa
    },
    638: {
      f: cqa
    },
    659: {},
    1048: {},
    1054: {
      f: rqa
    },
    1084: {},
    1212: {
      f: Iqa
    },
    2048: {
      f: Bqa
    },
    2049: {},
    2050: {},
    2051: {},
    2052: {},
    2053: {},
    2054: {},
    2055: {},
    2056: {},
    2057: {
      f: W6e
    },
    2058: {},
    2059: {},
    2060: {},
    2061: {},
    2062: {},
    2063: {},
    2064: {},
    2066: {},
    2067: {},
    2128: {},
    2129: {},
    2130: {},
    2131: {},
    2132: {},
    2133: {},
    2134: {},
    2135: {},
    2136: {},
    2137: {},
    2138: {},
    2146: {},
    2147: {
      r: 12
    },
    2148: {},
    2149: {},
    2150: {},
    2151: {
      f: LL
    },
    2152: {},
    2154: {},
    2155: {},
    2156: {},
    2161: {},
    2162: {},
    2164: {},
    2165: {},
    2166: {},
    2167: {},
    2168: {},
    2169: {},
    2170: {},
    2171: {},
    2172: {
      f: Vqa,
      r: 12
    },
    2173: {
      f: FQa,
      r: 12
    },
    2174: {},
    2175: {},
    2180: {},
    2181: {},
    2182: {},
    2183: {},
    2184: {},
    2185: {},
    2186: {},
    2187: {},
    2188: {
      f: m0,
      r: 12
    },
    2189: {},
    2190: {
      r: 12
    },
    2191: {},
    2192: {},
    2194: {},
    2195: {},
    2196: {
      f: Sqa,
      r: 12
    },
    2197: {},
    2198: {
      f: NQa,
      r: 12
    },
    2199: {},
    2200: {},
    2201: {},
    2202: {
      f: Cqa,
      r: 12
    },
    2203: {
      f: LL
    },
    2204: {},
    2205: {},
    2206: {},
    2207: {},
    2211: {
      f: VWa
    },
    2212: {},
    2213: {},
    2214: {},
    2215: {},
    4097: {},
    4098: {},
    4099: {},
    4102: {},
    4103: {},
    4105: {},
    4106: {},
    4107: {},
    4108: {},
    4109: {},
    4116: {},
    4117: {},
    4118: {},
    4119: {},
    4120: {},
    4121: {},
    4122: {},
    4123: {},
    4124: {},
    4125: {},
    4126: {},
    4127: {},
    4128: {},
    4129: {},
    4130: {},
    4132: {},
    4133: {},
    4134: {
      f: Rg
    },
    4135: {},
    4146: {},
    4147: {},
    4148: {},
    4149: {},
    4154: {},
    4156: {},
    4157: {},
    4158: {},
    4159: {},
    4160: {},
    4161: {},
    4163: {},
    4164: {
      f: qqa
    },
    4165: {},
    4166: {},
    4168: {},
    4170: {},
    4171: {},
    4174: {},
    4175: {},
    4176: {},
    4177: {},
    4187: {},
    4188: {
      f: $qa
    },
    4189: {},
    4191: {},
    4192: {},
    4193: {},
    4194: {},
    4195: {},
    4196: {},
    4197: {},
    4198: {},
    4199: {},
    4200: {},
    0: {
      f: Xin
    },
    1: {},
    2: {
      f: nKa
    },
    3: {
      f: eKa
    },
    4: {
      f: Zqa
    },
    5: {
      f: iKa
    },
    7: {
      f: aKa
    },
    8: {},
    9: {
      f: W6e
    },
    11: {},
    22: {
      f: Rg
    },
    30: {
      f: iqa
    },
    31: {},
    32: {},
    33: {
      f: ron
    },
    36: {},
    37: {
      f: Yin
    },
    50: {
      f: oKa
    },
    62: {},
    52: {},
    67: {
      f: mqa
    },
    68: {
      f: Rg
    },
    69: {},
    86: {},
    126: {},
    127: {
      f: Jqa
    },
    135: {},
    136: {},
    137: {},
    143: {
      f: lKa
    },
    145: {},
    148: {},
    149: {},
    150: {},
    169: {},
    171: {},
    188: {},
    191: {},
    192: {},
    194: {},
    195: {},
    214: {
      f: sKa
    },
    223: {},
    234: {},
    354: {},
    421: {},
    518: {
      f: Wit
    },
    521: {
      f: W6e
    },
    536: {
      f: ton
    },
    547: {
      f: eon
    },
    561: {},
    579: {
      f: yqa
    },
    1030: {
      f: Wit
    },
    1033: {
      f: W6e
    },
    1091: {
      f: bqa
    },
    2157: {},
    2163: {},
    2177: {},
    2240: {},
    2241: {},
    2242: {},
    2243: {},
    2244: {},
    2245: {},
    2246: {},
    2247: {},
    2248: {},
    2249: {},
    2250: {},
    2251: {},
    2262: {
      r: 12
    },
    101: {},
    102: {},
    105: {},
    106: {},
    107: {},
    109: {},
    112: {},
    114: {},
    29282: {}
  };

function Oi(e, t, n, r) {
  var a = t;
  if (!isNaN(a)) {
    var i = r || (n || []).length || 0,
      o = e.next(4);
    o.write_shift(2, a), o.write_shift(2, i), i > 0 && NOt(n) && e.push(n);
  }
}

function eti(e, t, n, r) {
  var a = (n || []).length || 0;
  if (a <= 8224) return Oi(e, t, n, a);
  var i = t;
  if (!isNaN(i)) {
    for (var o = n.parts || [], s = 0, l = 0, d = 0; d + (o[s] || 8224) <= 8224;) d += o[s] || 8224, s++;
    var u = e.next(4);
    for (u.write_shift(2, i), u.write_shift(2, d), e.push(n.slice(l, l + d)), l += d; l < a;) {
      for (u = e.next(4), u.write_shift(2, 60), d = 0; d + (o[s] || 8224) <= 8224;) d += o[s] || 8224, s++;
      u.write_shift(2, d), e.push(n.slice(l, l + d)), l += d;
    }
  }
}

function Xit(e, t, n, r) {
  var a = Ja(9);
  return ICe(a, e, t), srr(n, r || "b", a), a;
}

function tti(e, t, n) {
  var r = Ja(8 + 2 * n.length);
  return ICe(r, e, t), r.write_shift(1, n.length), r.write_shift(n.length, n, "sbcs"), r.l < r.length ? r.slice(0, r.l) : r;
}

function iar(e, t) {
  t.forEach(function (n) {
    var r = n[0].map(function (i) {
      return i.t;
    }).join("");
    if (r.length <= 2048) return Oi(e, 28, Git(r, n[1], n[2]));
    Oi(e, 28, Git(r.slice(0, 2048), n[1], n[2], r.length));
    for (var a = 2048; a < r.length; a += 2048) Oi(e, 28, Git(r.slice(a, Math.min(a + 2048, r.length)), -1, -1, Math.min(2048, r.length - a)));
  });
}

function nti(e, t, n, r, a, i) {
  var o = 0;
  t.z != null && (o = a._BIFF2FmtTable.indexOf(t.z), o == -1 && (a._BIFF2FmtTable.push(t.z), o = a._BIFF2FmtTable.length - 1));
  var s = 0;
  if (t.z != null) {
    for (; s < a.cellXfs.length && a.cellXfs[s].numFmtId != o; ++s);
    s == a.cellXfs.length && a.cellXfs.push({
      numFmtId: o
    });
  }
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var l = t.t == "d" ? bg(Rf(t.v, i), i) : t.v;
      a.biff == 2 && l == (l | 0) && l >= 0 && l < 65536 ? Oi(e, 2, rKa(n, r, l, s, o)) : isNaN(l) ? Oi(e, 5, Xit(n, r, 36, "e")) : isFinite(l) ? Oi(e, 3, tKa(n, r, l, s, o)) : Oi(e, 5, Xit(n, r, 7, "e"));
      return;
    case "b":
    case "e":
      Oi(e, 5, Xit(n, r, t.v, t.t));
      return;
    case "s":
    case "str":
      Oi(e, 4, tti(n, r, t.v == null ? "" : String(t.v).slice(0, 255)));
      return;
  }
  Oi(e, 1, ICe(null, n, r));
}

function rti(e, t, n, r, a) {
  var i = t["!data"] != null,
    o = wd(t["!ref"] || "A1"),
    s = "",
    l = [];
  if (o.e.c > 255 || o.e.r > 16383) {
    if (r.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    o.e.c = Math.min(o.e.c, 255), o.e.r = Math.min(o.e.r, 16383);
  }
  for (var d = (((a || {}).Workbook || {}).WBProps || {}).date1904, u = [], h = [], p = o.s.c; p <= o.e.c; ++p) l[p] = ic(p);
  for (var m = o.s.r; m <= o.e.r; ++m) for (i && (u = t["!data"][m] || []), s = Jc(m), p = o.s.c; p <= o.e.c; ++p) {
    var f = i ? u[p] : t[l[p] + s];
    f && (nti(e, f, m, p, r, d), f.c && h.push([f.c, m, p]));
  }
  iar(e, h);
}

function ati(e, t) {
  for (var n = t || {}, r = kx(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == n.sheet && (a = i);
  if (a == 0 && n.sheet && e.SheetNames[0] != n.sheet) throw new Error("Sheet not found: " + n.sheet);
  Oi(r, n.biff == 4 ? 1033 : n.biff == 3 ? 521 : 9, $Ot(e, 16, n)), ((e.Workbook || {}).WBProps || {}).date1904 && Oi(r, 34, Yw(!0)), n.cellXfs = [{
    numFmtId: 0
  }], n._BIFF2FmtTable = ["General"], n._Fonts = [];
  var o = kx();
  return rti(o, e.Sheets[e.SheetNames[a]], a, n, e), n._BIFF2FmtTable.forEach(function (s) {
    n.biff <= 3 ? Oi(r, 30, oqa(s)) : Oi(r, 1054, sqa(s));
  }), n.cellXfs.forEach(function (s) {
    switch (n.biff) {
      case 2:
        Oi(r, 67, fqa(s));
        break;
      case 3:
        Oi(r, 579, frr(s));
        break;
      case 4:
        Oi(r, 1091, gqa(s));
        break;
    }
  }), delete n._BIFF2FmtTable, delete n.cellXfs, delete n._Fonts, r.push(o.end()), Oi(r, 10), r.end();
}

var uC = 1,
  v4 = [];

function iti() {
  var e = Ja(82 + 8 * v4.length);
  e.write_shift(2, 15), e.write_shift(2, 61440), e.write_shift(4, 74 + 8 * v4.length);
  {
    e.write_shift(2, 0), e.write_shift(2, 61446), e.write_shift(4, 16 + 8 * v4.length);
    {
      e.write_shift(4, uC), e.write_shift(4, v4.length + 1);
      for (var t = 0, n = 0; n < v4.length; ++n) t += v4[n] && v4[n][1] || 0;
      e.write_shift(4, t), e.write_shift(4, v4.length);
    }
    v4.forEach(function (r) {
      e.write_shift(4, r[0]), e.write_shift(4, r[2]);
    });
  }
  return e.write_shift(2, 51), e.write_shift(2, 61451), e.write_shift(4, 18), e.write_shift(2, 191), e.write_shift(4, 524296), e.write_shift(2, 385), e.write_shift(4, 134217793), e.write_shift(2, 448), e.write_shift(4, 134217792), e.write_shift(2, 64), e.write_shift(2, 61726), e.write_shift(4, 16), e.write_shift(4, 134217741), e.write_shift(4, 134217740), e.write_shift(4, 134217751), e.write_shift(4, 268435703), e;
}

function oti(e, t) {
  var n = [],
    r = 0,
    a = kx(),
    i = uC,
    o;
  t.forEach(function (l, d) {
    var u = "",
      h = l[0].map(function (w) {
        return w.a && !u && (u = w.a), w.t;
      }).join("");
    ++uC;
    {
      var p = Ja(150);
      p.write_shift(2, 15), p.write_shift(2, 61444), p.write_shift(4, 150), p.write_shift(2, 3234), p.write_shift(2, 61450), p.write_shift(4, 8), p.write_shift(4, uC), p.write_shift(4, 2560), p.write_shift(2, 227), p.write_shift(2, 61451), p.write_shift(4, 84), p.write_shift(2, 128), p.write_shift(4, 0), p.write_shift(2, 139), p.write_shift(4, 2), p.write_shift(2, 191), p.write_shift(4, 524296), p.write_shift(2, 344), p.l += 4, p.write_shift(2, 385), p.write_shift(4, 134217808), p.write_shift(2, 387), p.write_shift(4, 134217808), p.write_shift(2, 389), p.write_shift(4, 268435700), p.write_shift(2, 447), p.write_shift(4, 1048592), p.write_shift(2, 448), p.write_shift(4, 134217809), p.write_shift(2, 451), p.write_shift(4, 268435700), p.write_shift(2, 513), p.write_shift(4, 134217809), p.write_shift(2, 515), p.write_shift(4, 268435700), p.write_shift(2, 575), p.write_shift(4, 196609), p.write_shift(2, 959), p.write_shift(4, 131072 | (l[0].hidden ? 2 : 0)), p.l += 2, p.write_shift(2, 61456), p.write_shift(4, 18), p.write_shift(2, 3), p.write_shift(2, l[2] + 2), p.l += 2, p.write_shift(2, l[1] + 1), p.l += 2, p.write_shift(2, l[2] + 4), p.l += 2, p.write_shift(2, l[1] + 5), p.l += 2, p.l += 2, p.write_shift(2, 61457), p.l += 4, p.l = 150, d == 0 ? o = p : Oi(a, 236, p);
    }
    r += 150;
    {
      var m = Ja(52);
      m.write_shift(2, 21), m.write_shift(2, 18), m.write_shift(2, 25), m.write_shift(2, uC), m.write_shift(2, 0), m.l = 22, m.write_shift(2, 13), m.write_shift(2, 22), m.write_shift(4, 1651663474), m.write_shift(4, 2503426821), m.write_shift(4, 2150634280), m.write_shift(4, 1768515844 + uC * 256), m.write_shift(2, 0), m.write_shift(4, 0), m.l += 4, Oi(a, 93, m);
    }
    {
      var f = Ja(8);
      f.l += 2, f.write_shift(2, 61453), f.l += 4, Oi(a, 236, f);
    }
    r += 8;
    {
      var y = Ja(18);
      y.write_shift(2, 18), y.l += 8, y.write_shift(2, h.length), y.write_shift(2, 16), y.l += 4, Oi(a, 438, y);
      {
        var b = Ja(1 + h.length);
        b.write_shift(1, 0), b.write_shift(h.length, h, "sbcs"), Oi(a, 60, b);
      }
      {
        var v = Ja(16);
        v.l += 8, v.write_shift(2, h.length), v.l += 6, Oi(a, 60, v);
      }
    }
    {
      var _ = Ja(12 + u.length);
      _.write_shift(2, l[1]), _.write_shift(2, l[2]), _.write_shift(2, 0 | (l[0].hidden ? 0 : 2)), _.write_shift(2, uC), _.write_shift(2, u.length), _.write_shift(1, 0), _.write_shift(u.length, u, "sbcs"), _.l++, n.push(_);
    }
  });
  {
    var s = Ja(80);
    s.write_shift(2, 15), s.write_shift(2, 61442), s.write_shift(4, r + s.length - 8), s.write_shift(2, 16), s.write_shift(2, 61448), s.write_shift(4, 8), s.write_shift(4, t.length + 1), s.write_shift(4, uC), s.write_shift(2, 15), s.write_shift(2, 61443), s.write_shift(4, r + 48), s.write_shift(2, 15), s.write_shift(2, 61444), s.write_shift(4, 40), s.write_shift(2, 1), s.write_shift(2, 61449), s.write_shift(4, 16), s.l += 16, s.write_shift(2, 2), s.write_shift(2, 61450), s.write_shift(4, 8), s.write_shift(4, i), s.write_shift(4, 5), Oi(e, 236, o ? k0([s, o]) : s);
  }
  e.push(a.end()), n.forEach(function (l) {
    Oi(e, 28, l);
  }), v4.push([i, t.length + 1, uC]), ++uC;
}

function sti(e, t, n) {
  Oi(e, 49, JWa({
    sz: 12,
    name: "Arial"
  }, n));
}

function lti(e, t, n) {
  t && [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (r) {
    for (var a = r[0]; a <= r[1]; ++a) t[a] != null && Oi(e, 1054, aqa(a, t[a], n));
  });
}

function cti(e, t) {
  var n = Ja(19);
  n.write_shift(4, 2151), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(2, 3), n.write_shift(1, 1), n.write_shift(4, 0), Oi(e, 2151, n), n = Ja(39), n.write_shift(4, 2152), n.write_shift(4, 0), n.write_shift(4, 0), n.write_shift(2, 3), n.write_shift(1, 0), n.write_shift(4, 0), n.write_shift(2, 1), n.write_shift(4, 4), n.write_shift(2, 0), hrr(wd(t["!ref"] || "A1"), n), n.write_shift(4, 4), Oi(e, 2152, n);
}

function dti(e, t) {
  for (var n = 0; n < 16; ++n) Oi(e, 224, Jin({
    numFmtId: 0,
    style: !0
  }, 0, t));
  t.cellXfs.forEach(function (r) {
    Oi(e, 224, Jin(r, 0, t));
  });
}

function uti(e, t) {
  for (var n = 0; n < t["!links"].length; ++n) {
    var r = t["!links"][n];
    Oi(e, 440, Oqa(r)), r[1].Tooltip && Oi(e, 2048, Fqa(r));
  }
  delete t["!links"];
}

function hti(e, t) {
  if (t) {
    var n = 0;
    t.forEach(function (r, a) {
      ++n <= 256 && r && Oi(e, 125, Hqa(PCe(a, r), a));
    });
  }
}

function pti(e, t, n, r, a, i) {
  var o = 16 + HP(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    Oi(e, 513, SJ(n, r, o));
    return;
  }
  if (t.bf) Oi(e, 6, $Xa(t, n, r, a, o));else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? bg(Rf(t.v, i), i) : t.v;
      isNaN(s) ? Oi(e, 517, $it(n, r, 36, o, a, "e")) : isFinite(s) ? Oi(e, 515, kqa(n, r, s, o)) : Oi(e, 517, $it(n, r, 7, o, a, "e"));
      break;
    case "b":
    case "e":
      Oi(e, 517, $it(n, r, t.v, o, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var l = KOt(a.Strings, t.v == null ? "" : String(t.v), a.revStrings);
        Oi(e, 253, eqa(n, r, l, o));
      } else Oi(e, 516, nqa(n, r, (t.v == null ? "" : String(t.v)).slice(0, 255), o, a));
      break;
    default:
      Oi(e, 513, SJ(n, r, o));
  }
}

function mti(e, t, n) {
  var r = kx(),
    a = n.SheetNames[e],
    i = n.Sheets[a] || {},
    o = (n || {}).Workbook || {},
    s = (o.Sheets || [])[e] || {},
    l = i["!data"] != null,
    d = t.biff == 8,
    u = "",
    h = [],
    p = wd(i["!ref"] || "A1"),
    m = d ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= m) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV" + m);
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.r, m - 1);
  }
  Oi(r, 2057, $Ot(n, 16, t)), Oi(r, 13, V4(1)), Oi(r, 12, V4(100)), Oi(r, 15, Yw(!0)), Oi(r, 17, Yw(!1)), Oi(r, 16, kJ(.001)), Oi(r, 95, Yw(!0)), Oi(r, 42, Yw(!1)), Oi(r, 43, Yw(!1)), Oi(r, 130, V4(1)), Oi(r, 128, wqa()), Oi(r, 131, Yw(!1)), Oi(r, 132, Yw(!1)), d && hti(r, i["!cols"]), Oi(r, 512, lqa(p, t));
  var f = (((n || {}).Workbook || {}).WBProps || {}).date1904;
  d && (i["!links"] = []);
  for (var y = p.s.c; y <= p.e.c; ++y) h[y] = ic(y);
  for (var b = [], v = [], _ = p.s.r; _ <= p.e.r; ++_) for (l && (v = i["!data"][_] || []), u = Jc(_), y = p.s.c; y <= p.e.c; ++y) {
    var w = l ? v[y] : i[h[y] + u];
    w && (pti(r, w, _, y, t, f), d && w.l && i["!links"].push([h[y] + u, w.l]), w.c && b.push([w.c, _, y]));
  }
  var k = s.CodeName || s.name || a;
  return d ? oti(r, b) : iar(r, b), d && Oi(r, 574, QWa((o.Views || [])[0])), d && (i["!merges"] || []).length && Oi(r, 229, Pqa(i["!merges"])), d && uti(r, i), Oi(r, 442, lrr(k)), d && cti(r, i), Oi(r, 10), r.end();
}

function fti(e, t, n) {
  var r = kx(),
    a = (e || {}).Workbook || {},
    i = a.Sheets || [],
    o = a.WBProps || {},
    s = n.biff == 8,
    l = n.biff == 5;
  if (Oi(r, 2057, $Ot(e, 5, n)), n.bookType == "xla" && Oi(r, 135), Oi(r, 225, s ? V4(1200) : null), Oi(r, 193, fWa(2)), l && Oi(r, 191), l && Oi(r, 192), Oi(r, 226), Oi(r, 92, LWa("SheetJS", n)), Oi(r, 66, V4(s ? 1200 : 1252)), s && Oi(r, 353, V4(0)), s && Oi(r, 448), Oi(r, 317, Kqa(e.SheetNames.length)), s && e.vbaraw && Oi(r, 211), s && e.vbaraw) {
    var d = o.CodeName || "ThisWorkbook";
    Oi(r, 442, lrr(d));
  }
  Oi(r, 156, V4(17)), Oi(r, 25, Yw(!1)), Oi(r, 18, Yw(!1)), Oi(r, 19, V4(0)), s && Oi(r, 431, Yw(!1)), s && Oi(r, 444, V4(0)), Oi(r, 61, qWa()), Oi(r, 64, Yw(!1)), Oi(r, 141, V4(0)), Oi(r, 34, Yw(nei(e) == "true")), Oi(r, 14, Yw(!0)), s && Oi(r, 439, Yw(!1)), Oi(r, 218, V4(0)), sti(r, e, n), lti(r, e.SSF, n), dti(r, n), s && Oi(r, 352, Yw(!1));
  var u = r.end(),
    h = kx();
  s && Oi(h, 140, Uqa()), s && v4.length && Oi(h, 235, iti()), s && n.Strings && eti(h, 252, UWa(n.Strings)), Oi(h, 10);
  var p = h.end(),
    m = kx(),
    f = 0,
    y = 0;
  for (y = 0; y < e.SheetNames.length; ++y) f += (s ? 12 : 11) + (s ? 2 : 1) * e.SheetNames[y].length;
  var b = u.length + f + p.length;
  for (y = 0; y < e.SheetNames.length; ++y) {
    var v = i[y] || {};
    Oi(m, 133, FWa({
      pos: b,
      hs: v.Hidden || 0,
      dt: 0,
      name: e.SheetNames[y]
    }, n)), b += t[y].length;
  }
  var _ = m.end();
  if (f != _.length) throw new Error("BS8 " + f + " != " + _.length);
  var w = [];
  return u.length && w.push(u), _.length && w.push(_), p.length && w.push(p), k0(w);
}

function gti(e, t) {
  var n = t || {},
    r = [];
  e && !e.SSF && (e.SSF = qu(Cs)), e && e.SSF && (VZ(), vpe(e.SSF), n.revssf = kCe(e.SSF), n.revssf[e.SSF[65535]] = 0, n.ssf = e.SSF), uC = 1, v4 = [], n.Strings = [], n.Strings.Count = 0, n.Strings.Unique = 0, JOt(n), n.cellXfs = [], HP(n.cellXfs, {}, {
    revssf: {
      General: 0
    }
  }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) r[r.length] = mti(a, n, e);
  return r.unshift(fti(e, r, n)), k0(r);
}

function oar(e, t) {
  for (var n = 0; n <= e.SheetNames.length; ++n) {
    var r = e.Sheets[e.SheetNames[n]];
    if (!(!r || !r["!ref"])) {
      var a = Ty(r["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[n] + "' extends beyond column IV (255).  Data may be lost."), a.e.r > 65535 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[n] + "' extends beyond row 65536.  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return gti(e, t);
    case 4:
    case 3:
    case 2:
      return ati(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}

function gon(e, t) {
  var n = t || {},
    r = n.dense != null ? n.dense : iVa,
    a = {};
  r && (a["!data"] = []), e = ACe(e, "<!--", "-->");
  var i = e.match(/<table/i);
  if (!i) throw new Error("Invalid HTML: could not find <table>");
  var o = e.match(/<\/table/i),
    s = i.index,
    l = o && o.index || e.length,
    d = QVa(e.slice(s, l), /(:?<tr[^<>]*>)/i, "<tr>"),
    u = -1,
    h = 0,
    p = 0,
    m = 0,
    f = {
      s: {
        r: 1e7,
        c: 1e7
      },
      e: {
        r: 0,
        c: 0
      }
    },
    y = [];
  for (s = 0; s < d.length; ++s) {
    var b = d[s].trim(),
      v = b.slice(0, 3).toLowerCase();
    if (v == "<tr") {
      if (++u, n.sheetRows && n.sheetRows <= u) {
        --u;
        break;
      }
      h = 0;
      continue;
    }
    if (!(v != "<td" && v != "<th")) {
      var _ = b.split(/<\/t[dh]>/i);
      for (l = 0; l < _.length; ++l) {
        var w = _[l].trim();
        if (w.match(/<t[dh]/i)) {
          for (var k = w, A = 0; k.charAt(0) == "<" && (A = k.indexOf(">")) > -1;) k = k.slice(A + 1);
          for (var S = 0; S < y.length; ++S) {
            var C = y[S];
            C.s.c == h && C.s.r < u && u <= C.e.r && (h = C.e.c + 1, S = -1);
          }
          var I = es(w.slice(0, w.indexOf(">")));
          m = I.colspan ? +I.colspan : 1, ((p = +I.rowspan) > 1 || m > 1) && y.push({
            s: {
              r: u,
              c: h
            },
            e: {
              r: u + (p || 1) - 1,
              c: h + m - 1
            }
          });
          var E = I.t || I["data-t"] || "";
          if (!k.length) {
            h += m;
            continue;
          }
          if (k = Pnr(k), f.s.r > u && (f.s.r = u), f.e.r < u && (f.e.r = u), f.s.c > h && (f.s.c = h), f.e.c < h && (f.e.c = h), !k.length) {
            h += m;
            continue;
          }
          var M = {
            t: "s",
            v: k
          };
          n.raw || !k.trim().length || E == "s" || (k === "TRUE" ? M = {
            t: "b",
            v: !0
          } : k === "FALSE" ? M = {
            t: "b",
            v: !1
          } : isNaN(XS(k)) ? isNaN(gke(k).getDate()) ? k.charCodeAt(0) == 35 && Lv[k] != null && (M.t = "e", M.w = k, M.v = Lv[k]) : (M = {
            t: "d",
            v: Rf(k)
          }, n.UTC === !1 && (M.v = xJ(M.v)), n.cellDates || (M = {
            t: "n",
            v: bg(M.v)
          }), M.z = n.dateNF || Cs[14]) : M = {
            t: "n",
            v: XS(k)
          }), M.cellText !== !1 && (M.w = k), r ? (a["!data"][u] || (a["!data"][u] = []), a["!data"][u][h] = M) : a[Xc({
            r: u,
            c: h
          })] = M, h += m;
        }
      }
    }
  }
  return a["!ref"] = Ac(f), y.length && (a["!merges"] = y), a;
}

function sar(e, t, n, r) {
  for (var a = e["!merges"] || [], i = [], o = {}, s = e["!data"] != null, l = t.s.c; l <= t.e.c; ++l) {
    for (var d = 0, u = 0, h = 0; h < a.length; ++h) if (!(a[h].s.r > n || a[h].s.c > l) && !(a[h].e.r < n || a[h].e.c < l)) {
      if (a[h].s.r < n || a[h].s.c < l) {
        d = -1;
        break;
      }
      d = a[h].e.r - a[h].s.r + 1, u = a[h].e.c - a[h].s.c + 1;
      break;
    }
    if (!(d < 0)) {
      var p = ic(l) + Jc(n),
        m = s ? (e["!data"][n] || [])[l] : e[p];
      m && m.t == "n" && m.v != null && !isFinite(m.v) && (isNaN(m.v) ? m = {
        t: "e",
        v: 36,
        w: Mb[36]
      } : m = {
        t: "e",
        v: 7,
        w: Mb[7]
      });
      var f = m && m.v != null && (m.h || o1e(m.w || (VP(m), m.w) || "")) || "";
      o = {}, d > 1 && (o.rowspan = d), u > 1 && (o.colspan = u), r.editable ? f = '<span contenteditable="true">' + f + "</span>" : m && (o["data-t"] = m && m.t || "z", m.v != null && (o["data-v"] = o1e(m.v instanceof Date ? m.v.toISOString() : m.v)), m.z != null && (o["data-z"] = m.z), m.l && (m.l.Target || "#").charAt(0) != "#" && (f = '<a href="' + o1e(m.l.Target) + '">' + f + "</a>")), o.id = (r.id || "sjs") + "-" + p, i.push(no("td", f, o));
    }
  }
  var y = "<tr>";
  return y + i.join("") + "</tr>";
}

var lar = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',
  car = "</body></html>";

function yti(e, t) {
  var n = JVa(e, "table");
  if (!n || n.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (n.length == 1) {
    var r = mG(gon(n[0], t), t);
    return r.bookType = "html", r;
  }
  var a = rBt();
  return n.forEach(function (i, o) {
    NCe(a, gon(i, t), "Sheet" + (o + 1));
  }), a.bookType = "html", a;
}

function dar(e, t, n) {
  var r = [];
  return r.join("") + "<table" + (n && n.id ? ' id="' + n.id + '"' : "") + ">";
}

function uar(e, t) {
  var n = t || {},
    r = n.header != null ? n.header : lar,
    a = n.footer != null ? n.footer : car,
    i = [r],
    o = Ty(e["!ref"] || "A1");
  if (i.push(dar(e, o, n)), e["!ref"]) for (var s = o.s.r; s <= o.e.r; ++s) i.push(sar(e, o, s, n));
  return i.push("</table>" + a), i.join("");
}

function har(e, t, n) {
  var r = t.rows;
  if (!r) throw "Unsupported origin when " + t.tagName + " is not a TABLE";
  var a = n || {},
    i = e["!data"] != null,
    o = 0,
    s = 0;
  if (a.origin != null) if (typeof a.origin == "number") o = a.origin;else {
    var l = typeof a.origin == "string" ? Eh(a.origin) : a.origin;
    o = l.r, s = l.c;
  }
  var d = Math.min(a.sheetRows || 1e7, r.length),
    u = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: o,
        c: s
      }
    };
  if (e["!ref"]) {
    var h = Ty(e["!ref"]);
    u.s.r = Math.min(u.s.r, h.s.r), u.s.c = Math.min(u.s.c, h.s.c), u.e.r = Math.max(u.e.r, h.e.r), u.e.c = Math.max(u.e.c, h.e.c), o == -1 && (u.e.r = o = h.e.r + 1);
  }
  var p = [],
    m = 0,
    f = e["!rows"] || (e["!rows"] = []),
    y = 0,
    b = 0,
    v = 0,
    _ = 0,
    w = 0,
    k = 0;
  for (e["!cols"] || (e["!cols"] = []); y < r.length && b < d; ++y) {
    var A = r[y];
    if (yon(A)) {
      if (a.display) continue;
      f[b] = {
        hidden: !0
      };
    }
    var S = A.cells;
    for (v = _ = 0; v < S.length; ++v) {
      var C = S[v];
      if (!(a.display && yon(C))) {
        var I = C.hasAttribute("data-v") ? C.getAttribute("data-v") : C.hasAttribute("v") ? C.getAttribute("v") : Pnr(C.innerHTML),
          E = C.getAttribute("data-z") || C.getAttribute("z");
        for (m = 0; m < p.length; ++m) {
          var M = p[m];
          M.s.c == _ + s && M.s.r < b + o && b + o <= M.e.r && (_ = M.e.c + 1 - s, m = -1);
        }
        k = +C.getAttribute("colspan") || 1, ((w = +C.getAttribute("rowspan") || 1) > 1 || k > 1) && p.push({
          s: {
            r: b + o,
            c: _ + s
          },
          e: {
            r: b + o + (w || 1) - 1,
            c: _ + s + (k || 1) - 1
          }
        });
        var T = {
            t: "s",
            v: I
          },
          P = C.getAttribute("data-t") || C.getAttribute("t") || "";
        I != null && (I.length == 0 ? T.t = P || "z" : a.raw || I.trim().length == 0 || P == "s" || (P == "e" && Mb[+I] ? T = {
          t: "e",
          v: +I,
          w: Mb[+I]
        } : I === "TRUE" ? T = {
          t: "b",
          v: !0
        } : I === "FALSE" ? T = {
          t: "b",
          v: !1
        } : isNaN(XS(I)) ? isNaN(gke(I).getDate()) ? I.charCodeAt(0) == 35 && Lv[I] != null && (T = {
          t: "e",
          v: Lv[I],
          w: I
        }) : (T = {
          t: "d",
          v: Rf(I)
        }, a.UTC && (T.v = OXe(T.v)), a.cellDates || (T = {
          t: "n",
          v: bg(T.v)
        }), T.z = a.dateNF || Cs[14]) : T = {
          t: "n",
          v: XS(I)
        })), T.z === void 0 && E != null && (T.z = E);
        var R = "",
          j = C.getElementsByTagName("A");
        if (j && j.length) for (var B = 0; B < j.length && !(j[B].hasAttribute("href") && (R = j[B].getAttribute("href"), R.charAt(0) != "#")); ++B);
        R && R.charAt(0) != "#" && R.slice(0, 11).toLowerCase() != "javascript:" && (T.l = {
          Target: R
        }), i ? (e["!data"][b + o] || (e["!data"][b + o] = []), e["!data"][b + o][_ + s] = T) : e[Xc({
          c: _ + s,
          r: b + o
        })] = T, u.e.c < _ + s && (u.e.c = _ + s), _ += k;
      }
    }
    ++b;
  }
  return p.length && (e["!merges"] = (e["!merges"] || []).concat(p)), u.e.r = Math.max(u.e.r, b - 1 + o), e["!ref"] = Ac(u), b >= d && (e["!fullref"] = Ac((u.e.r = r.length - y + b - 1 + o, u))), e;
}

function par(e, t) {
  var n = t || {},
    r = {};
  return n.dense && (r["!data"] = []), har(r, e, t);
}

function bti(e, t) {
  var n = mG(par(e, t), t);
  return n;
}

function yon(e) {
  var t = "",
    n = vti(e);
  return n && (t = n(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}

function vti(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}

function wti(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function (r, a) {
      return Array(parseInt(a, 10) + 1).join(" ");
    }).replace(/<text:tab[^<>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`),
    n = jd(t.replace(/<[^<>]*>/g, ""));
  return [n];
}

function mar(e, t, n) {
  var r = n || {},
    a = BXe(e);
  sy.lastIndex = 0, a = _Ot(ACe(a, "<!--", "-->"));
  for (var i, o, s = "", l = "", d, u = 0, h = -1, p = ""; i = sy.exec(a);) switch (i[3] = i[3].replace(/_[\s\S]*$/, "")) {
    case "number-style":
    case "currency-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
    case "text-style":
      i[1] === "/" ? (o["truncate-on-overflow"] == "false" && (s.match(/h/) ? s = s.replace(/h+/, "[$&]") : s.match(/m/) ? s = s.replace(/m+/, "[$&]") : s.match(/s/) && (s = s.replace(/s+/, "[$&]"))), r[o.name] = s, s = "") : i[0].charAt(i[0].length - 2) !== "/" && (s = "", o = es(i[0], !1));
      break;
    case "boolean-style":
      i[1] === "/" ? (r[o.name] = "General", s = "") : i[0].charAt(i[0].length - 2) !== "/" && (s = "", o = es(i[0], !1));
      break;
    case "boolean":
      s += "General";
      break;
    case "text":
      i[1] === "/" ? (p = a.slice(h, sy.lastIndex - i[0].length), p == "%" && o[0] == "<number:percentage-style" ? s += "%" : s += '"' + p.replace(/"/g, '""') + '"') : i[0].charAt(i[0].length - 2) !== "/" && (h = sy.lastIndex);
      break;
    case "day":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "d";
          break;
        case "long":
          s += "dd";
          break;
        default:
          s += "dd";
          break;
      }
      break;
    case "day-of-week":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "ddd";
          break;
        case "long":
          s += "dddd";
          break;
        default:
          s += "ddd";
          break;
      }
      break;
    case "era":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "ee";
          break;
        case "long":
          s += "eeee";
          break;
        default:
          s += "eeee";
          break;
      }
      break;
    case "hours":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "h";
          break;
        case "long":
          s += "hh";
          break;
        default:
          s += "hh";
          break;
      }
      break;
    case "minutes":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "m";
          break;
        case "long":
          s += "mm";
          break;
        default:
          s += "mm";
          break;
      }
      break;
    case "month":
      switch (d = es(i[0], !1), d.textual && (s += "mm"), d.style) {
        case "short":
          s += "m";
          break;
        case "long":
          s += "mm";
          break;
        default:
          s += "m";
          break;
      }
      break;
    case "seconds":
      {
        switch (d = es(i[0], !1), d.style) {
          case "short":
            s += "s";
            break;
          case "long":
            s += "ss";
            break;
          default:
            s += "ss";
            break;
        }
        d["decimal-places"] && (s += "." + Gd("0", +d["decimal-places"]));
      }
      break;
    case "year":
      switch (d = es(i[0], !1), d.style) {
        case "short":
          s += "yy";
          break;
        case "long":
          s += "yyyy";
          break;
        default:
          s += "yy";
          break;
      }
      break;
    case "am-pm":
      s += "AM/PM";
      break;
    case "week-of-year":
    case "quarter":
      console.error("Excel does not support ODS format token " + i[3]);
      break;
    case "fill-character":
      i[1] === "/" ? (p = a.slice(h, sy.lastIndex - i[0].length), s += '"' + p.replace(/"/g, '""') + '"*') : i[0].charAt(i[0].length - 2) !== "/" && (h = sy.lastIndex);
      break;
    case "scientific-number":
      d = es(i[0], !1), s += "0." + Gd("0", +d["min-decimal-places"] || +d["decimal-places"] || 2) + Gd("?", +d["decimal-places"] - +d["min-decimal-places"] || 0) + "E" + (rh(d["forced-exponent-sign"]) ? "+" : "") + Gd("0", +d["min-exponent-digits"] || 2);
      break;
    case "fraction":
      d = es(i[0], !1), +d["min-integer-digits"] ? s += Gd("0", +d["min-integer-digits"]) : s += "#", s += " ", s += Gd("?", +d["min-numerator-digits"] || 1), s += "/", +d["denominator-value"] ? s += d["denominator-value"] : s += Gd("?", +d["min-denominator-digits"] || 1);
      break;
    case "currency-symbol":
      i[1] === "/" ? s += '"' + a.slice(h, sy.lastIndex - i[0].length).replace(/"/g, '""') + '"' : i[0].charAt(i[0].length - 2) !== "/" ? h = sy.lastIndex : s += "$";
      break;
    case "text-properties":
      switch (d = es(i[0], !1), (d.color || "").toLowerCase().replace("#", "")) {
        case "ff0000":
        case "red":
          s = "[Red]" + s;
          break;
      }
      break;
    case "text-content":
      s += "@";
      break;
    case "map":
      d = es(i[0], !1), jd(d.condition) == "value()>=0" ? s = r[d["apply-style-name"]] + ";" + s : console.error("ODS number format may be incorrect: " + d.condition);
      break;
    case "number":
      if (i[1] === "/") break;
      d = es(i[0], !1), l = "", l += Gd("0", +d["min-integer-digits"] || 1), rh(d.grouping) && (l = E7(Gd("#", Math.max(0, 4 - l.length)) + l)), (+d["min-decimal-places"] || +d["decimal-places"]) && (l += "."), +d["min-decimal-places"] && (l += Gd("0", +d["min-decimal-places"] || 1)), +d["decimal-places"] - (+d["min-decimal-places"] || 0) && (l += Gd("0", +d["decimal-places"] - (+d["min-decimal-places"] || 0))), s += l;
      break;
    case "embedded-text":
      i[1] === "/" ? u == 0 ? s += '"' + a.slice(h, sy.lastIndex - i[0].length).replace(/"/g, '""') + '"' : s = s.slice(0, u) + '"' + a.slice(h, sy.lastIndex - i[0].length).replace(/"/g, '""') + '"' + s.slice(u) : i[0].charAt(i[0].length - 2) !== "/" && (h = sy.lastIndex, u = -+es(i[0], !1).position || 0);
      break;
  }
  return r;
}

function far(e, t, n) {
  var r = t || {},
    a = BXe(e),
    i = [],
    o,
    s,
    l,
    d = "",
    u = 0,
    h,
    p,
    m = {},
    f = [],
    y = {};
  r.dense && (y["!data"] = []);
  var b,
    v,
    _ = {
      value: ""
    },
    w = {},
    k = "",
    A = 0,
    S = "",
    C = 0,
    I = [],
    E = [],
    M = -1,
    T = -1,
    P = {
      s: {
        r: 1e6,
        c: 1e7
      },
      e: {
        r: 0,
        c: 0
      }
    },
    R = 0,
    j = n || {},
    B = {},
    F = [],
    N = {},
    G = 0,
    z = 0,
    V = [],
    O = 1,
    L = 1,
    D = [],
    U = {
      Names: [],
      WBProps: {}
    },
    H = {},
    Y = ["", ""],
    K = [],
    W = {},
    Q = "",
    q = 0,
    ne = !1,
    de = !1,
    le = 0;
  for (sy.lastIndex = 0, a = _Ot(ACe(a, "<!--", "-->")); b = sy.exec(a);) switch (b[3] = b[3].replace(/_[\s\S]*$/, "")) {
    case "table":
    case "工作表":
      b[1] === "/" ? (P.e.c >= P.s.c && P.e.r >= P.s.r ? y["!ref"] = Ac(P) : y["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= P.e.r && (y["!fullref"] = y["!ref"], P.e.r = r.sheetRows - 1, y["!ref"] = Ac(P)), F.length && (y["!merges"] = F), V.length && (y["!rows"] = V), h.name = h.名称 || h.name, typeof JSON < "u" && JSON.stringify(h), f.push(h.name), m[h.name] = y, de = !1) : b[0].charAt(b[0].length - 2) !== "/" && (h = es(b[0], !1), M = T = -1, P.s.r = P.s.c = 1e7, P.e.r = P.e.c = 0, y = {}, r.dense && (y["!data"] = []), F = [], V = [], de = !0);
      break;
    case "table-row-group":
      b[1] === "/" ? --R : ++R;
      break;
    case "table-row":
    case "行":
      if (b[1] === "/") {
        M += O, O = 1;
        break;
      }
      if (p = es(b[0], !1), p.行号 ? M = p.行号 - 1 : M == -1 && (M = 0), O = +p["number-rows-repeated"] || 1, O < 10) for (le = 0; le < O; ++le) R > 0 && (V[M + le] = {
        level: R
      });
      T = -1;
      break;
    case "covered-table-cell":
      if (b[1] !== "/") if (++T, _ = es(b[0], !1), L = parseInt(_["number-columns-repeated"] || "1", 10) || 1, r.sheetStubs) {
        for (; L-- > 0;) r.dense ? (y["!data"][M] || (y["!data"][M] = []), y["!data"][M][T] = {
          t: "z"
        }) : y[Xc({
          r: M,
          c: T
        })] = {
          t: "z"
        }, ++T;
        --T;
      } else T += L - 1;
      k = "", I = [];
      break;
    case "table-cell":
    case "数据":
      if (b[0].charAt(b[0].length - 2) === "/") ++T, _ = es(b[0], !1), L = parseInt(_["number-columns-repeated"] || "1", 10) || 1, v = {
        t: "z",
        v: null
      }, _.formula && r.cellFormula != !1 && (v.f = pon(jd(_.formula))), _["style-name"] && B[_["style-name"]] && (v.z = B[_["style-name"]]), (_.数据类型 || _["value-type"]) == "string" && (v.t = "s", v.v = jd(_["string-value"] || ""), r.dense ? (y["!data"][M] || (y["!data"][M] = []), y["!data"][M][T] = v) : y[ic(T) + Jc(M)] = v), T += L - 1;else if (b[1] !== "/") {
        ++T, k = S = "", A = C = 0, I = [], E = [], L = 1;
        var J = O ? M + O - 1 : M;
        if (T > P.e.c && (P.e.c = T), T < P.s.c && (P.s.c = T), M < P.s.r && (P.s.r = M), J > P.e.r && (P.e.r = J), _ = es(b[0], !1), w = aHa(b[0]), K = [], W = {}, v = {
          t: _.数据类型 || _["value-type"],
          v: null
        }, _["style-name"] && B[_["style-name"]] && (v.z = B[_["style-name"]]), r.cellFormula) if (_.formula && (_.formula = jd(_.formula)), _["number-matrix-columns-spanned"] && _["number-matrix-rows-spanned"] && (G = parseInt(_["number-matrix-rows-spanned"], 10) || 0, z = parseInt(_["number-matrix-columns-spanned"], 10) || 0, N = {
          s: {
            r: M,
            c: T
          },
          e: {
            r: M + G - 1,
            c: T + z - 1
          }
        }, v.F = Ac(N), D.push([N, v.F])), _.formula) v.f = pon(_.formula);else for (le = 0; le < D.length; ++le) M >= D[le][0].s.r && M <= D[le][0].e.r && T >= D[le][0].s.c && T <= D[le][0].e.c && (v.F = D[le][1]);
        switch ((_["number-columns-spanned"] || _["number-rows-spanned"]) && (G = parseInt(_["number-rows-spanned"] || "1", 10) || 1, z = parseInt(_["number-columns-spanned"] || "1", 10) || 1, G * z > 1 && (N = {
          s: {
            r: M,
            c: T
          },
          e: {
            r: M + G - 1,
            c: T + z - 1
          }
        }, F.push(N))), _["number-columns-repeated"] && (L = parseInt(_["number-columns-repeated"], 10)), v.t) {
          case "boolean":
            v.t = "b", v.v = rh(_["boolean-value"]) || +_["boolean-value"] >= 1;
            break;
          case "float":
            v.t = "n", v.v = parseFloat(_.value), r.cellDates && v.z && k3(v.z) && (v.v = lj(v.v + (U.WBProps.date1904 ? 1462 : 0)), v.t = typeof v.v == "number" ? "n" : "d");
            break;
          case "percentage":
            v.t = "n", v.v = parseFloat(_.value);
            break;
          case "currency":
            v.t = "n", v.v = parseFloat(_.value);
            break;
          case "date":
            v.t = "d", v.v = Rf(_["date-value"], U.WBProps.date1904), r.cellDates || (v.t = "n", v.v = bg(v.v, U.WBProps.date1904)), v.z || (v.z = "m/d/yy");
            break;
          case "time":
            v.t = "n", v.v = FVa(_["time-value"]) / 86400, r.cellDates && (v.v = lj(v.v), v.t = typeof v.v == "number" ? "n" : "d"), v.z || (v.z = "HH:MM:SS");
            break;
          case "number":
            v.t = "n", v.v = parseFloat(_.数据数值);
            break;
          default:
            if (v.t === "string" || v.t === "text" || !v.t) v.t = "s", _["string-value"] != null && (k = jd(_["string-value"]), I = []);else throw new Error("Unsupported value type " + v.t);
        }
      } else {
        if (ne = !1, w["calcext:value-type"] == "error" && Lv[k] != null && (v.t = "e", v.w = k, v.v = Lv[k]), v.t === "s" && (v.v = k || "", I.length && (v.R = I), ne = A == 0), H.Target && (v.l = H), K.length > 0 && (v.c = K, K = []), k && r.cellText !== !1 && (v.w = k), ne && (v.t = "z", delete v.v), (!ne || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= M)) for (var pe = 0; pe < O; ++pe) {
          if (L = parseInt(_["number-columns-repeated"] || "1", 10), r.dense) for (y["!data"][M + pe] || (y["!data"][M + pe] = []), y["!data"][M + pe][T] = pe == 0 ? v : qu(v); --L > 0;) y["!data"][M + pe][T + L] = qu(v);else for (y[Xc({
            r: M + pe,
            c: T
          })] = v; --L > 0;) y[Xc({
            r: M + pe,
            c: T + L
          })] = qu(v);
          P.e.c <= T && (P.e.c = T);
        }
        L = parseInt(_["number-columns-repeated"] || "1", 10), T += L - 1, L = 0, v = {}, k = "", I = [];
      }
      H = {};
      break;
    case "document":
    case "document-content":
    case "电子表格文档":
    case "spreadsheet":
    case "主体":
    case "scripts":
    case "styles":
    case "font-face-decls":
    case "master-styles":
      if (b[1] === "/") {
        if ((o = i.pop())[0] !== b[3]) throw "Bad state: " + o;
      } else b[0].charAt(b[0].length - 2) !== "/" && i.push([b[3], !0]);
      break;
    case "annotation":
      if (b[1] === "/") {
        if ((o = i.pop())[0] !== b[3]) throw "Bad state: " + o;
        W.t = k, I.length && (W.R = I), W.a = Q, K.push(W), k = S, A = C, I = E;
      } else if (b[0].charAt(b[0].length - 2) !== "/") {
        i.push([b[3], !1]);
        var ce = es(b[0], !0);
        ce.display && rh(ce.display) || (K.hidden = !0), S = k, C = A, E = I, k = "", A = 0, I = [];
      }
      Q = "", q = 0;
      break;
    case "creator":
      b[1] === "/" ? Q = a.slice(q, b.index) : q = b.index + b[0].length;
      break;
    case "meta":
    case "元数据":
    case "settings":
    case "config-item-set":
    case "config-item-map-indexed":
    case "config-item-map-entry":
    case "config-item-map-named":
    case "shapes":
    case "frame":
    case "text-box":
    case "image":
    case "data-pilot-tables":
    case "list-style":
    case "form":
    case "dde-links":
    case "event-listeners":
    case "chart":
      if (b[1] === "/") {
        if ((o = i.pop())[0] !== b[3]) throw "Bad state: " + o;
      } else b[0].charAt(b[0].length - 2) !== "/" && i.push([b[3], !1]);
      k = "", A = 0, I = [];
      break;
    case "scientific-number":
    case "currency-symbol":
    case "fill-character":
      break;
    case "text-style":
    case "boolean-style":
    case "number-style":
    case "currency-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
      if (b[1] === "/") {
        var we = sy.lastIndex;
        mar(a.slice(l, sy.lastIndex), t, j), sy.lastIndex = we;
      } else b[0].charAt(b[0].length - 2) !== "/" && (l = sy.lastIndex - b[0].length);
      break;
    case "script":
      break;
    case "libraries":
      break;
    case "automatic-styles":
      break;
    case "default-style":
    case "page-layout":
      break;
    case "style":
      {
        var X = es(b[0], !1);
        X.family == "table-cell" && j[X["data-style-name"]] && (B[X.name] = j[X["data-style-name"]]);
      }
      break;
    case "map":
      break;
    case "font-face":
      break;
    case "paragraph-properties":
      break;
    case "table-properties":
      break;
    case "table-column-properties":
      break;
    case "table-row-properties":
      break;
    case "table-cell-properties":
      break;
    case "number":
      break;
    case "fraction":
      break;
    case "day":
    case "month":
    case "year":
    case "era":
    case "day-of-week":
    case "week-of-year":
    case "quarter":
    case "hours":
    case "minutes":
    case "seconds":
    case "am-pm":
      break;
    case "boolean":
      break;
    case "text":
      if (b[0].slice(-2) === "/>") break;
      if (b[1] === "/") switch (i[i.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          d += a.slice(u, b.index);
          break;
      } else u = b.index + b[0].length;
      break;
    case "named-range":
      s = es(b[0], !1), Y = qit(s["cell-range-address"]);
      var Z = {
        Name: s.name,
        Ref: Y[0] + "!" + Y[1]
      };
      de && (Z.Sheet = f.length), U.Names.push(Z);
      break;
    case "text-content":
      break;
    case "text-properties":
      break;
    case "embedded-text":
      break;
    case "body":
    case "电子表格":
      break;
    case "forms":
      break;
    case "table-column":
      break;
    case "table-header-rows":
      break;
    case "table-rows":
      break;
    case "table-column-group":
      break;
    case "table-header-columns":
      break;
    case "table-columns":
      break;
    case "null-date":
      switch (s = es(b[0], !1), s["date-value"]) {
        case "1904-01-01":
          U.WBProps.date1904 = !0;
          break;
      }
      break;
    case "graphic-properties":
      break;
    case "calculation-settings":
      break;
    case "named-expressions":
      break;
    case "label-range":
      break;
    case "label-ranges":
      break;
    case "named-expression":
      break;
    case "sort":
      break;
    case "sort-by":
      break;
    case "sort-groups":
      break;
    case "tab":
      break;
    case "line-break":
      break;
    case "span":
      break;
    case "p":
    case "文本串":
      if (["master-styles"].indexOf(i[i.length - 1][0]) > -1) break;
      if (b[1] === "/" && (!_ || !_["string-value"])) {
        var re = wti(a.slice(A, b.index));
        k = (k.length > 0 ? k + `
` : "") + re[0];
      } else b[0].slice(-2) == "/>" ? k += `
` : (es(b[0], !1), A = b.index + b[0].length);
      break;
    case "s":
      break;
    case "database-range":
      if (b[1] === "/") break;
      try {
        Y = qit(es(b[0])["target-range-address"]), m[Y[0]]["!autofilter"] = {
          ref: Y[1]
        };
      } catch {}
      break;
    case "date":
      break;
    case "object":
      break;
    case "title":
    case "标题":
      break;
    case "desc":
      break;
    case "binary-data":
      break;
    case "table-source":
      break;
    case "scenario":
      break;
    case "iteration":
      break;
    case "content-validations":
      break;
    case "content-validation":
      break;
    case "help-message":
      break;
    case "error-message":
      break;
    case "database-ranges":
      break;
    case "filter":
      break;
    case "filter-and":
      break;
    case "filter-or":
      break;
    case "filter-condition":
      break;
    case "filter-set-item":
      break;
    case "list-level-style-bullet":
      break;
    case "list-level-style-number":
      break;
    case "list-level-properties":
      break;
    case "sender-firstname":
    case "sender-lastname":
    case "sender-initials":
    case "sender-title":
    case "sender-position":
    case "sender-email":
    case "sender-phone-private":
    case "sender-fax":
    case "sender-company":
    case "sender-phone-work":
    case "sender-street":
    case "sender-city":
    case "sender-postal-code":
    case "sender-country":
    case "sender-state-or-province":
    case "author-name":
    case "author-initials":
    case "chapter":
    case "file-name":
    case "template-name":
    case "sheet-name":
      break;
    case "event-listener":
      break;
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
      break;
    case "config-item":
      break;
    case "page-number":
      break;
    case "page-count":
      break;
    case "time":
      break;
    case "cell-range-source":
      break;
    case "detective":
      break;
    case "operation":
      break;
    case "highlighted-range":
      break;
    case "data-pilot-table":
    case "source-cell-range":
    case "source-service":
    case "data-pilot-field":
    case "data-pilot-level":
    case "data-pilot-subtotals":
    case "data-pilot-subtotal":
    case "data-pilot-members":
    case "data-pilot-member":
    case "data-pilot-display-info":
    case "data-pilot-sort-info":
    case "data-pilot-layout-info":
    case "data-pilot-field-reference":
    case "data-pilot-groups":
    case "data-pilot-group":
    case "data-pilot-group-member":
      break;
    case "rect":
      break;
    case "dde-connection-decls":
    case "dde-connection-decl":
    case "dde-link":
    case "dde-source":
      break;
    case "properties":
      break;
    case "property":
      break;
    case "a":
      if (b[1] !== "/") {
        if (H = es(b[0], !1), !H.href) break;
        H.Target = jd(H.href), delete H.href, H.Target.charAt(0) == "#" && H.Target.indexOf(".") > -1 ? (Y = qit(H.Target.slice(1)), H.Target = "#" + Y[0] + "!" + Y[1]) : H.Target.match(/^\.\.[\\\/]/) && (H.Target = H.Target.slice(3));
      }
      break;
    case "table-protection":
      break;
    case "data-pilot-grand-total":
      break;
    case "office-document-common-attrs":
      break;
    default:
      switch (b[2]) {
        case "dc:":
        case "calcext:":
        case "loext:":
        case "ooo:":
        case "chartooo:":
        case "draw:":
        case "style:":
        case "chart:":
        case "form:":
        case "uof:":
        case "表:":
        case "字:":
          break;
        default:
          if (r.WTF) throw new Error(b);
      }
  }
  var fe = {
    Sheets: m,
    SheetNames: f,
    Workbook: U
  };
  return r.bookSheets && delete fe.Sheets, fe;
}

function bon(e, t) {
  t = t || {}, b4(e, "META-INF/manifest.xml") && QHa(ny(e, "META-INF/manifest.xml"), t);
  var n = T2(e, "styles.xml"),
    r = n && mar(Ch(n)),
    a = T2(e, "content.xml");
  if (!a) throw new Error("Missing content.xml in ODS / UOF file");
  var i = far(Ch(a), t, r);
  return b4(e, "meta.xml") && (i.Props = Ynr(ny(e, "meta.xml"))), i.bookType = "ods", i;
}

function von(e, t) {
  var n = far(e, t);
  return n.bookType = "fods", n;
}

var xti = (function () {
  var e = ["<office:master-styles>", '<style:master-page style:name="mp1" style:page-layout-name="mp1">', "<style:header/>", '<style:header-left style:display="false"/>', "<style:footer/>", '<style:footer-left style:display="false"/>', "</style:master-page>", "</office:master-styles>"].join(""),
    t = "<office:document-styles " + _J({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "office:version": "1.2"
    }) + ">" + e + "</office:document-styles>";
  return function () {
    return e0 + t;
  };
})();

function _ti(e, t) {
  var n = "number",
    r = "",
    a = {
      "style:name": t
    },
    i = "",
    o = 0;
  e = e.replace(/"[$]"/g, "$");
  e: {
    if (e.indexOf(";") > -1 && (console.error("Unsupported ODS Style Map exported.  Using first branch of " + e), e = e.slice(0, e.indexOf(";"))), e == "@") {
      n = "text", r = "<number:text-content/>";
      break e;
    }
    if (e.indexOf(/\$/) > -1 && (n = "currency"), e[o] == '"') {
      for (i = ""; e[++o] != '"' || e[++o] == '"';) i += e[o];
      --o, e[o + 1] == "*" ? (o++, r += "<number:fill-character>" + xc(i.replace(/""/g, '"')) + "</number:fill-character>") : r += "<number:text>" + xc(i.replace(/""/g, '"')) + "</number:text>", e = e.slice(o + 1), o = 0;
    }
    var s = e.match(/# (\?+)\/(\?+)/);
    if (s) {
      r += no("number:fraction", null, {
        "number:min-integer-digits": 0,
        "number:min-numerator-digits": s[1].length,
        "number:max-denominator-value": Math.max(+s[1].replace(/./g, "9"), +s[2].replace(/./g, "9"))
      });
      break e;
    }
    if (s = e.match(/# (\?+)\/(\d+)/)) {
      r += no("number:fraction", null, {
        "number:min-integer-digits": 0,
        "number:min-numerator-digits": s[1].length,
        "number:denominator-value": +s[2]
      });
      break e;
    }
    if (s = e.match(/\b(\d+)(|\.\d+)%/)) {
      n = "percentage", r += no("number:number", null, {
        "number:decimal-places": s[2] && s.length - 1 || 0,
        "number:min-decimal-places": s[2] && s.length - 1 || 0,
        "number:min-integer-digits": s[1].length
      }) + "<number:text>%</number:text>";
      break e;
    }
    var l = !1;
    if (["y", "m", "d"].indexOf(e[0]) > -1) {
      n = "date";
      t: for (; o < e.length; ++o) switch (i = e[o].toLowerCase()) {
        case "h":
        case "s":
          l = !0, --o;
          break t;
        case "m":
          n: for (var d = o + 1; d < e.length; ++d) switch (e[d]) {
            case "y":
            case "d":
              break n;
            case "h":
            case "s":
              l = !0, --o;
              break t;
          }
        case "y":
        case "d":
          for (; (e[++o] || "").toLowerCase() == i[0];) i += i[0];
          switch (--o, i) {
            case "y":
            case "yy":
              r += "<number:year/>";
              break;
            case "yyy":
            case "yyyy":
              r += '<number:year number:style="long"/>';
              break;
            case "mmmmm":
              console.error("ODS has no equivalent of format |mmmmm|");
            case "m":
            case "mm":
            case "mmm":
            case "mmmm":
              r += '<number:month number:style="' + (i.length % 2 ? "short" : "long") + '" number:textual="' + (i.length >= 3 ? "true" : "false") + '"/>';
              break;
            case "d":
            case "dd":
              r += '<number:day number:style="' + (i.length % 2 ? "short" : "long") + '"/>';
              break;
            case "ddd":
            case "dddd":
              r += '<number:day-of-week number:style="' + (i.length % 2 ? "short" : "long") + '"/>';
              break;
          }
          break;
        case '"':
          for (; e[++o] != '"' || e[++o] == '"';) i += e[o];
          --o, r += "<number:text>" + xc(i.slice(1).replace(/""/g, '"')) + "</number:text>";
          break;
        case "\\":
          i = e[++o], r += "<number:text>" + xc(i) + "</number:text>";
          break;
        case "/":
        case ":":
          r += "<number:text>" + xc(i) + "</number:text>";
          break;
        default:
          console.error("unrecognized character " + i + " in ODF format " + e);
      }
      if (!l) break e;
      e = e.slice(o + 1), o = 0;
    }
    if (e.match(/^\[?[hms]/)) {
      for (n == "number" && (n = "time"), e.match(/\[/) && (e = e.replace(/[\[\]]/g, ""), a["number:truncate-on-overflow"] = "false"); o < e.length; ++o) switch (i = e[o].toLowerCase()) {
        case "h":
        case "m":
        case "s":
          for (; (e[++o] || "").toLowerCase() == i[0];) i += i[0];
          switch (--o, i) {
            case "h":
            case "hh":
              r += '<number:hours number:style="' + (i.length % 2 ? "short" : "long") + '"/>';
              break;
            case "m":
            case "mm":
              r += '<number:minutes number:style="' + (i.length % 2 ? "short" : "long") + '"/>';
              break;
            case "s":
            case "ss":
              if (e[o + 1] == ".") do i += e[o + 1], ++o; while (e[o + 1] == "0");
              r += '<number:seconds number:style="' + (i.match("ss") ? "long" : "short") + '"' + (i.match(/\./) ? ' number:decimal-places="' + (i.match(/0+/) || [""])[0].length + '"' : "") + "/>";
              break;
          }
          break;
        case '"':
          for (; e[++o] != '"' || e[++o] == '"';) i += e[o];
          --o, r += "<number:text>" + xc(i.slice(1).replace(/""/g, '"')) + "</number:text>";
          break;
        case "/":
        case ":":
          r += "<number:text>" + xc(i) + "</number:text>";
          break;
        case "a":
          if (e.slice(o, o + 3).toLowerCase() == "a/p") {
            r += "<number:am-pm/>", o += 2;
            break;
          }
          if (e.slice(o, o + 5).toLowerCase() == "am/pm") {
            r += "<number:am-pm/>", o += 4;
            break;
          }
        default:
          console.error("unrecognized character " + i + " in ODF format " + e);
      }
      break e;
    }
    if (e.indexOf(/\$/) > -1 && (n = "currency"), e[0] == "$" && (r += '<number:currency-symbol number:language="en" number:country="US">$</number:currency-symbol>', e = e.slice(1), o = 0), o = 0, e[o] == '"') {
      for (; e[++o] != '"' || e[++o] == '"';) i += e[o];
      --o, e[o + 1] == "*" ? (o++, r += "<number:fill-character>" + xc(i.replace(/""/g, '"')) + "</number:fill-character>") : r += "<number:text>" + xc(i.replace(/""/g, '"')) + "</number:text>", e = e.slice(o + 1), o = 0;
    }
    var u = e.match(/([#0][0#,]*)(\.[0#]*|)(E[+]?0*|)/i);
    if (!u || !u[0]) console.error("Could not find numeric part of " + e);else {
      var h = u[1].replace(/,/g, "");
      r += "<number:" + (u[3] ? "scientific-" : "") + 'number number:min-integer-digits="' + (h.indexOf("0") == -1 ? "0" : h.length - h.indexOf("0")) + '"' + (u[0].indexOf(",") > -1 ? ' number:grouping="true"' : "") + (u[2] && ' number:decimal-places="' + (u[2].length - 1) + '"' || ' number:decimal-places="0"') + (u[3] && u[3].indexOf("+") > -1 ? ' number:forced-exponent-sign="true"' : "") + (u[3] ? ' number:min-exponent-digits="' + u[3].match(/0+/)[0].length + '"' : "") + "></number:" + (u[3] ? "scientific-" : "") + "number>", o = u.index + u[0].length;
    }
    if (e[o] == '"') {
      for (i = ""; e[++o] != '"' || e[++o] == '"';) i += e[o];
      --o, r += "<number:text>" + xc(i.replace(/""/g, '"')) + "</number:text>";
    }
  }
  return r ? no("number:" + n + "-style", r, a) : (console.error("Could not generate ODS number format for |" + e + "|"), "");
}

function won(e, t, n) {
  for (var r = [], a = 0; a < e.length; ++a) {
    var i = e[a];
    i && i.Sheet == (n == -1 ? null : n) && r.push(i);
  }
  return r.length ? `      <table:named-expressions>
` + r.map(function (o) {
    var s = (n == -1 ? "$" : "") + zrr(o.Ref);
    return "        " + no("table:named-range", null, {
      "table:name": o.Name,
      "table:cell-range-address": s,
      "table:base-cell-address": s.replace(/[\.][^\.]*$/, ".$A$1")
    });
  }).join(`
`) + `
      </table:named-expressions>
` : "";
}

var xon = (function () {
  var e = function (a, i) {
      return xc(a).replace(/  +/g, function (o) {
        return '<text:s text:c="' + o.length + '"/>';
      }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
    },
    t = `          <table:table-cell />
`,
    n = function (a, i, o, s, l, d) {
      var u = [];
      u.push('      <table:table table:name="' + xc(i.SheetNames[o]) + `" table:style-name="ta1">
`);
      var h = 0,
        p = 0,
        m = Ty(a["!ref"] || "A1"),
        f = a["!merges"] || [],
        y = 0,
        b = a["!data"] != null;
      if (a["!cols"]) for (p = 0; p <= m.e.c; ++p) u.push("        <table:table-column" + (a["!cols"][p] ? ' table:style-name="co' + a["!cols"][p].ods + '"' : "") + `></table:table-column>
`);
      var v = "",
        _ = a["!rows"] || [];
      for (h = 0; h < m.s.r; ++h) v = _[h] ? ' table:style-name="ro' + _[h].ods + '"' : "", u.push("        <table:table-row" + v + `></table:table-row>
`);
      for (; h <= m.e.r; ++h) {
        for (v = _[h] ? ' table:style-name="ro' + _[h].ods + '"' : "", u.push("        <table:table-row" + v + `>
`), p = 0; p < m.s.c; ++p) u.push(t);
        for (; p <= m.e.c; ++p) {
          var w = !1,
            k = {},
            A = "";
          for (y = 0; y != f.length; ++y) if (!(f[y].s.c > p) && !(f[y].s.r > h) && !(f[y].e.c < p) && !(f[y].e.r < h)) {
            (f[y].s.c != p || f[y].s.r != h) && (w = !0), k["table:number-columns-spanned"] = f[y].e.c - f[y].s.c + 1, k["table:number-rows-spanned"] = f[y].e.r - f[y].s.r + 1;
            break;
          }
          if (w) {
            u.push(`          <table:covered-table-cell/>
`);
            continue;
          }
          var S = Xc({
              r: h,
              c: p
            }),
            C = b ? (a["!data"][h] || [])[p] : a[S];
          if (C && C.f && (k["table:formula"] = xc(iJa(C.f)), C.F && C.F.slice(0, S.length) == S)) {
            var I = Ty(C.F);
            k["table:number-matrix-columns-spanned"] = I.e.c - I.s.c + 1, k["table:number-matrix-rows-spanned"] = I.e.r - I.s.r + 1;
          }
          if (!C) {
            u.push(t);
            continue;
          }
          switch (C.t) {
            case "b":
              A = C.v ? "TRUE" : "FALSE", k["office:value-type"] = "boolean", k["office:boolean-value"] = C.v ? "true" : "false";
              break;
            case "n":
              isFinite(C.v) ? (A = C.w || String(C.v || 0), k["office:value-type"] = "float", k["office:value"] = C.v || 0) : (isNaN(C.v) ? (A = "#NUM!", k["table:formula"] = "of:=#NUM!") : (A = "#DIV/0!", k["table:formula"] = "of:=" + (C.v < 0 ? "-" : "") + "1/0"), k["office:string-value"] = "", k["office:value-type"] = "string", k["calcext:value-type"] = "error");
              break;
            case "s":
            case "str":
              A = C.v == null ? "" : C.v, k["office:value-type"] = "string";
              break;
            case "d":
              A = C.w || Rf(C.v, d).toISOString(), k["office:value-type"] = "date", k["office:date-value"] = Rf(C.v, d).toISOString(), k["table:style-name"] = "ce1";
              break;
            default:
              u.push(t);
              continue;
          }
          var E = e(A);
          if (C.l && C.l.Target) {
            var M = C.l.Target;
            M = M.charAt(0) == "#" ? "#" + zrr(M.slice(1)) : M, M.charAt(0) != "#" && !M.match(/^\w+:/) && (M = "../" + M), E = no("text:a", E, {
              "xlink:href": M.replace(/&/g, "&amp;")
            });
          }
          l[C.z] && (k["table:style-name"] = "ce" + l[C.z].slice(1));
          var T = no("text:p", E, {});
          if (C.c) {
            for (var P = "", R = "", j = {}, B = 0; B < C.c.length; ++B) !P && C.c[B].a && (P = C.c[B].a), R += "<text:p>" + e(C.c[B].t) + "</text:p>";
            C.c.hidden || (j["office:display"] = !0), T = no("office:annotation", R, j) + T;
          }
          u.push("          " + no("table:table-cell", T, k) + `
`);
        }
        u.push(`        </table:table-row>
`);
      }
      return (i.Workbook || {}).Names && u.push(won(i.Workbook.Names, i.SheetNames, o)), u.push(`      </table:table>
`), u.join("");
    },
    r = function (a, i) {
      a.push(` <office:automatic-styles>
`);
      var o = 0;
      i.SheetNames.map(function (u) {
        return i.Sheets[u];
      }).forEach(function (u) {
        if (u && u["!cols"]) {
          for (var h = 0; h < u["!cols"].length; ++h) if (u["!cols"][h]) {
            var p = u["!cols"][h];
            if (p.width == null && p.wpx == null && p.wch == null) continue;
            cD(p), p.ods = o;
            var m = u["!cols"][h].wpx + "px";
            a.push('  <style:style style:name="co' + o + `" style:family="table-column">
`), a.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + m + `"/>
`), a.push(`  </style:style>
`), ++o;
          }
        }
      });
      var s = 0;
      i.SheetNames.map(function (u) {
        return i.Sheets[u];
      }).forEach(function (u) {
        if (u && u["!rows"]) {
          for (var h = 0; h < u["!rows"].length; ++h) if (u["!rows"][h]) {
            u["!rows"][h].ods = s;
            var p = u["!rows"][h].hpx + "px";
            a.push('  <style:style style:name="ro' + s + `" style:family="table-row">
`), a.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + p + `"/>
`), a.push(`  </style:style>
`), ++s;
          }
        }
      }), a.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), a.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), a.push(`  </style:style>
`), a.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), a.push(`   <number:month number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:day number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:year/>
`), a.push(`  </number:date-style>
`);
      var l = {},
        d = 69;
      return i.SheetNames.map(function (u) {
        return i.Sheets[u];
      }).forEach(function (u) {
        if (u) {
          var h = u["!data"] != null;
          if (u["!ref"]) for (var p = Ty(u["!ref"]), m = 0; m <= p.e.r; ++m) for (var f = 0; f <= p.e.c; ++f) {
            var y = h ? (u["!data"][m] || [])[f] : u[Xc({
              r: m,
              c: f
            })];
            if (!(!y || !y.z || y.z.toLowerCase() == "general") && !l[y.z]) {
              var b = _ti(y.z, "N" + d);
              b && (l[y.z] = "N" + d, ++d, a.push(b + `
`));
            }
          }
        }
      }), a.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), Gm(l).forEach(function (u) {
        a.push('<style:style style:name="ce' + l[u].slice(1) + '" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="' + l[u] + `"/>
`);
      }), a.push(` </office:automatic-styles>
`), l;
    };
  return function (i, o) {
    var s = [e0],
      l = _J({
        "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
        "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
        "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
        "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
        "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xmlns:dc": "http://purl.org/dc/elements/1.1/",
        "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
        "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
        "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
        "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
        "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
        "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
        "xmlns:math": "http://www.w3.org/1998/Math/MathML",
        "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
        "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
        "xmlns:ooo": "http://openoffice.org/2004/office",
        "xmlns:ooow": "http://openoffice.org/2004/writer",
        "xmlns:oooc": "http://openoffice.org/2004/calc",
        "xmlns:dom": "http://www.w3.org/2001/xml-events",
        "xmlns:xforms": "http://www.w3.org/2002/xforms",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
        "xmlns:rpt": "http://openoffice.org/2005/report",
        "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
        "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
        "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
        "xmlns:tableooo": "http://openoffice.org/2009/table",
        "xmlns:drawooo": "http://openoffice.org/2010/draw",
        "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
        "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
        "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
        "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
        "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
        "office:version": "1.2"
      }),
      d = _J({
        "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
        "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
      });
    o.bookType == "fods" ? (s.push("<office:document" + l + d + `>
`), s.push(Qnr().replace(/<office:document-meta[^<>]*?>/, "").replace(/<\/office:document-meta>/, "") + `
`)) : s.push("<office:document-content" + l + `>
`);
    var u = r(s, i);
    s.push(`  <office:body>
`), s.push(`    <office:spreadsheet>
`), ((i.Workbook || {}).WBProps || {}).date1904 && s.push(`      <table:calculation-settings table:case-sensitive="false" table:search-criteria-must-apply-to-whole-cell="true" table:use-wildcards="true" table:use-regular-expressions="false" table:automatic-find-labels="false">
        <table:null-date table:date-value="1904-01-01"/>
      </table:calculation-settings>
`);
    for (var h = 0; h != i.SheetNames.length; ++h) s.push(n(i.Sheets[i.SheetNames[h]], i, h, o, u, ((i.Workbook || {}).WBProps || {}).date1904));
    return (i.Workbook || {}).Names && s.push(won(i.Workbook.Names, i.SheetNames, -1)), s.push(`    </office:spreadsheet>
`), s.push(`  </office:body>
`), o.bookType == "fods" ? s.push("</office:document>") : s.push("</office:document-content>"), s.join("");
  };
})();

function gar(e, t) {
  if (t.bookType == "fods") return xon(e, t);
  var n = SOt(),
    r = "",
    a = [],
    i = [];
  return r = "mimetype", bc(n, r, "application/vnd.oasis.opendocument.spreadsheet"), r = "content.xml", bc(n, r, xon(e, t)), a.push([r, "text/xml"]), i.push([r, "ContentFile"]), r = "styles.xml", bc(n, r, xti(e, t)), a.push([r, "text/xml"]), i.push([r, "StylesFile"]), r = "meta.xml", bc(n, r, e0 + Qnr()), a.push([r, "text/xml"]), i.push([r, "MetadataFile"]), r = "manifest.rdf", bc(n, r, JHa(i)), a.push([r, "application/rdf+xml"]), r = "META-INF/manifest.xml", bc(n, r, YHa(a)), n;
}

/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */var C0 = (function () {
  try {
    return typeof Uint8Array > "u" || typeof Uint8Array.prototype.subarray > "u" ? "slice" : typeof Buffer < "u" ? typeof Buffer.prototype.subarray > "u" ? "slice" : (typeof Buffer.from == "function" ? Buffer.from([72, 62]) : new Buffer([72, 62])) instanceof Uint8Array ? "subarray" : "slice" : "subarray";
  } catch {
    return "slice";
  }
})();

function dD(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}

function UE(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : Ch(GP(e));
}

function m2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : I2(CM(e));
}

function c$(e) {
  for (var t = 0, n = 0; n < e.length; ++n) t += e[n].length;
  var r = new Uint8Array(t),
    a = 0;
  for (n = 0; n < e.length; ++n) {
    var i = e[n],
      o = i.length;
    if (o < 250) for (var s = 0; s < o; ++s) r[a++] = i[s];else r.set(i, a), a += o;
  }
  return r;
}

function g1e(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}

function kti(e, t) {
  for (var n = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, r = e[t + 14] & 1, a = t + 13; a >= t; --a) r = r * 256 + e[a];
  return (e[t + 15] & 128 ? -r : r) * Math.pow(10, n - 6176);
}

function Ati(e, t, n) {
  var r = Math.floor(n == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(n))) + 6176 - 16,
    a = n / Math.pow(10, r - 6176);
  e[t + 15] |= r >> 7, e[t + 14] |= (r & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256) e[t + i] = a & 255;
  e[t + 15] |= n >= 0 ? 0 : 128;
}

function Ake(e, t) {
  var n = t.l,
    r = e[n] & 127;
  e: if (e[n++] >= 128 && (r |= (e[n] & 127) << 7, e[n++] < 128 || (r |= (e[n] & 127) << 14, e[n++] < 128) || (r |= (e[n] & 127) << 21, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 28), ++n, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 35), ++n, e[n++] < 128) || (r += (e[n] & 127) * Math.pow(2, 42), ++n, e[n++] < 128))) break e;
  return t.l = n, r;
}

function ys(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var n = 1;
  e: if (e > 127) {
    if (t[n - 1] |= 128, t[n] = e >> 7 & 127, ++n, e <= 16383 || (t[n - 1] |= 128, t[n] = e >> 14 & 127, ++n, e <= 2097151) || (t[n - 1] |= 128, t[n] = e >> 21 & 127, ++n, e <= 268435455) || (t[n - 1] |= 128, t[n] = e / 256 >>> 21 & 127, ++n, e <= 34359738367) || (t[n - 1] |= 128, t[n] = e / 65536 >>> 21 & 127, ++n, e <= 4398046511103)) break e;
    t[n - 1] |= 128, t[n] = e / 16777216 >>> 21 & 127, ++n;
  }
  return t[C0](0, n);
}

function yar(e) {
  for (var t = {
      l: 0
    }, n = []; t.l < e.length;) n.push(Ake(e, t));
  return n;
}

function bar(e) {
  return c$(e.map(function (t) {
    return ys(t);
  }));
}

function wc(e) {
  var t = 0,
    n = e[t] & 127;
  return e[t++] < 128 || (n |= (e[t] & 127) << 7, e[t++] < 128) || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n |= (e[t] & 15) << 28), n;
}

function uo(e) {
  for (var t = [], n = {
      l: 0
    }; n.l < e.length;) {
    var r = n.l,
      a = Ake(e, n),
      i = a & 7;
    a = a / 8 | 0;
    var o,
      s = n.l;
    switch (i) {
      case 0:
        {
          for (; e[s++] >= 128;);
          o = e[C0](n.l, s), n.l = s;
        }
        break;
      case 1:
        o = e[C0](s, s + 8), n.l = s + 8;
        break;
      case 2:
        {
          var l = Ake(e, n);
          o = e[C0](n.l, n.l + l), n.l += l;
        }
        break;
      case 5:
        o = e[C0](s, s + 4), n.l = s + 4;
        break;
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(r));
    }
    var d = {
      data: o,
      type: i
    };
    t[a] == null && (t[a] = []), t[a].push(d);
  }
  return t;
}

function Is(e) {
  var t = [];
  return e.forEach(function (n, r) {
    r != 0 && n.forEach(function (a) {
      a.data && (t.push(ys(r * 8 + a.type)), a.type == 2 && t.push(ys(a.data.length)), t.push(a.data));
    });
  }), c$(t);
}

function d$(e, t) {
  return (e == null ? void 0 : e.map(function (n) {
    return t(n.data);
  })) || [];
}

function Ske(e) {
  for (var t, n = [], r = {
      l: 0
    }; r.l < e.length;) {
    var a = Ake(e, r),
      i = uo(e[C0](r.l, r.l + a));
    r.l += a;
    var o = {
      id: wc(i[1][0].data),
      messages: []
    };
    i[2].forEach(function (s) {
      var l = uo(s.data),
        d = wc(l[3][0].data);
      o.messages.push({
        meta: l,
        data: e[C0](r.l, r.l + d)
      }), r.l += d;
    }), (t = i[3]) != null && t[0] && (o.merge = wc(i[3][0].data) >>> 0 > 0), n.push(o);
  }
  return n;
}

function Wie(e) {
  var t = [];
  return e.forEach(function (n) {
    var r = [[], [{
      data: ys(n.id),
      type: 0
    }], []];
    n.merge != null && (r[3] = [{
      data: ys(+!!n.merge),
      type: 0
    }]);
    var a = [];
    n.messages.forEach(function (o) {
      a.push(o.data), o.meta[3] = [{
        type: 0,
        data: ys(o.data.length)
      }], r[2].push({
        data: Is(o.meta),
        type: 2
      });
    });
    var i = Is(r);
    t.push(ys(i.length)), t.push(i), a.forEach(function (o) {
      return t.push(o);
    });
  }), c$(t);
}

function Sti(e, t) {
  if (e != 0) throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var n = {
      l: 0
    }, r = Ake(t, n), a = [], i = n.l; i < t.length;) {
    var o = t[i] & 3;
    if (o == 0) {
      var s = t[i++] >> 2;
      if (s < 60) ++s;else {
        var l = s - 59;
        s = t[i], l > 1 && (s |= t[i + 1] << 8), l > 2 && (s |= t[i + 2] << 16), l > 3 && (s |= t[i + 3] << 24), s >>>= 0, s++, i += l;
      }
      a.push(t[C0](i, i + s)), i += s;
      continue;
    } else {
      var d = 0,
        u = 0;
      if (o == 1 ? (u = (t[i] >> 2 & 7) + 4, d = (t[i++] & 224) << 3, d |= t[i++]) : (u = (t[i++] >> 2) + 1, o == 2 ? (d = t[i] | t[i + 1] << 8, i += 2) : (d = (t[i] | t[i + 1] << 8 | t[i + 2] << 16 | t[i + 3] << 24) >>> 0, i += 4)), d == 0) throw new Error("Invalid offset 0");
      for (var h = a.length - 1, p = d; h >= 0 && p >= a[h].length;) p -= a[h].length, --h;
      if (h < 0) if (p == 0) p = a[h = 0].length;else throw new Error("Invalid offset beyond length");
      if (u < p) a.push(a[h][C0](a[h].length - p, a[h].length - p + u));else {
        for (p > 0 && (a.push(a[h][C0](a[h].length - p)), u -= p), ++h; u >= a[h].length;) a.push(a[h]), u -= a[h].length, ++h;
        u && a.push(a[h][C0](0, u));
      }
      a.length > 25 && (a = [c$(a)]);
    }
  }
  for (var m = 0, f = 0; f < a.length; ++f) m += a[f].length;
  if (m != r) throw new Error("Unexpected length: ".concat(m, " != ").concat(r));
  return a;
}

function Ike(e) {
  Array.isArray(e) && (e = new Uint8Array(e));
  for (var t = [], n = 0; n < e.length;) {
    var r = e[n++],
      a = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
    n += 3, t.push.apply(t, Sti(r, e[C0](n, n + a))), n += a;
  }
  if (n !== e.length) throw new Error("data is not a valid framed stream!");
  return t.length == 1 ? t[0] : c$(t);
}

function qie(e) {
  for (var t = [], n = 0; n < e.length;) {
    var r = Math.min(e.length - n, 268435455),
      a = new Uint8Array(4);
    t.push(a);
    var i = ys(r),
      o = i.length;
    t.push(i), r <= 60 ? (o++, t.push(new Uint8Array([r - 1 << 2]))) : r <= 256 ? (o += 2, t.push(new Uint8Array([240, r - 1 & 255]))) : r <= 65536 ? (o += 3, t.push(new Uint8Array([244, r - 1 & 255, r - 1 >> 8 & 255]))) : r <= 16777216 ? (o += 4, t.push(new Uint8Array([248, r - 1 & 255, r - 1 >> 8 & 255, r - 1 >> 16 & 255]))) : r <= 4294967296 && (o += 5, t.push(new Uint8Array([252, r - 1 & 255, r - 1 >> 8 & 255, r - 1 >> 16 & 255, r - 1 >>> 24 & 255]))), t.push(e[C0](n, n + r)), o += r, a[0] = 0, a[1] = o & 255, a[2] = o >> 8 & 255, a[3] = o >> 16 & 255, n += r;
  }
  return c$(t);
}

var Iti = function () {
  return {
    sst: [],
    rsst: [],
    ofmt: [],
    nfmt: [],
    fmla: [],
    ferr: [],
    cmnt: []
  };
};

function war(e, t, n, r, a) {
  var i,
    o,
    s,
    l,
    d = t & 255,
    u = t >> 8,
    h = u >= 5 ? a : r;
  e: if (n & (u > 4 ? 8 : 4) && e.t == "n" && d == 7) {
    var p = (i = h[7]) != null && i[0] ? wc(h[7][0].data) : -1;
    if (p == -1) break e;
    var m = (o = h[15]) != null && o[0] ? wc(h[15][0].data) : -1,
      f = (s = h[16]) != null && s[0] ? wc(h[16][0].data) : -1,
      y = (l = h[40]) != null && l[0] ? wc(h[40][0].data) : -1,
      b = e.v,
      v = b;
    t: if (y) {
      if (b == 0) {
        m = f = 2;
        break t;
      }
      b >= 604800 ? m = 1 : b >= 86400 ? m = 2 : b >= 3600 ? m = 4 : b >= 60 ? m = 8 : b >= 1 ? m = 16 : m = 32, Math.floor(b) != b ? f = 32 : b % 60 ? f = 16 : b % 3600 ? f = 8 : b % 86400 ? f = 4 : b % 604800 && (f = 2), f < m && (f = m);
    }
    if (m == -1 || f == -1) break e;
    var _ = [],
      w = [];
    m == 1 && (v = b / 604800, f == 1 ? w.push('d"d"') : (v |= 0, b -= 604800 * v), _.push(v + (p == 2 ? " week" + (v == 1 ? "" : "s") : p == 1 ? "w" : ""))), m <= 2 && f >= 2 && (v = b / 86400, f > 2 && (v |= 0, b -= 86400 * v), w.push('d"d"'), _.push(v + (p == 2 ? " day" + (v == 1 ? "" : "s") : p == 1 ? "d" : ""))), m <= 4 && f >= 4 && (v = b / 3600, f > 4 && (v |= 0, b -= 3600 * v), w.push((m >= 4 ? "[h]" : "h") + '"h"'), _.push(v + (p == 2 ? " hour" + (v == 1 ? "" : "s") : p == 1 ? "h" : ""))), m <= 8 && f >= 8 && (v = b / 60, f > 8 && (v |= 0, b -= 60 * v), w.push((m >= 8 ? "[m]" : "m") + '"m"'), p == 0 ? _.push((m == 8 && f == 8 || v >= 10 ? "" : "0") + v) : _.push(v + (p == 2 ? " minute" + (v == 1 ? "" : "s") : p == 1 ? "m" : ""))), m <= 16 && f >= 16 && (v = b, f > 16 && (v |= 0, b -= v), w.push((m >= 16 ? "[s]" : "s") + '"s"'), p == 0 ? _.push((f == 16 && m == 16 || v >= 10 ? "" : "0") + v) : _.push(v + (p == 2 ? " second" + (v == 1 ? "" : "s") : p == 1 ? "s" : ""))), f >= 32 && (v = Math.round(1e3 * b), m < 32 && w.push('.000"ms"'), p == 0 ? _.push((v >= 100 ? "" : v >= 10 ? "0" : "00") + v) : _.push(v + (p == 2 ? " millisecond" + (v == 1 ? "" : "s") : p == 1 ? "ms" : ""))), e.w = _.join(p == 0 ? ":" : " "), e.z = w.join(p == 0 ? '":"' : " "), p == 0 && (e.w = e.w.replace(/:(\d\d\d)$/, ".$1"));
  }
}

function Cti(e, t, n, r) {
  var a = dD(e),
    i = a.getUint32(4, !0),
    o = -1,
    s = -1,
    l = -1,
    d = NaN,
    u = 0,
    h = new Date(Date.UTC(2001, 0, 1)),
    p = n > 1 ? 12 : 8;
  i & 2 && (l = a.getUint32(p, !0), p += 4), p += g1e(i & (n > 1 ? 3468 : 396)) * 4, i & 512 && (o = a.getUint32(p, !0), p += 4), p += g1e(i & (n > 1 ? 12288 : 4096)) * 4, i & 16 && (s = a.getUint32(p, !0), p += 4), i & 32 && (d = a.getFloat64(p, !0), p += 8), i & 64 && (h.setTime(h.getTime() + (u = a.getFloat64(p, !0)) * 1e3), p += 8), n > 1 && (i = a.getUint32(8, !0) >>> 16, i & 255 && (l == -1 && (l = a.getUint32(p, !0)), p += 4));
  var m,
    f = e[n >= 4 ? 1 : 2];
  switch (f) {
    case 0:
      return;
    case 2:
      m = {
        t: "n",
        v: d
      };
      break;
    case 3:
      m = {
        t: "s",
        v: t.sst[s]
      };
      break;
    case 5:
      r != null && r.cellDates ? m = {
        t: "d",
        v: h
      } : m = {
        t: "n",
        v: u / 86400 + 35430,
        z: Cs[14]
      };
      break;
    case 6:
      m = {
        t: "b",
        v: d > 0
      };
      break;
    case 7:
      m = {
        t: "n",
        v: d
      };
      break;
    case 8:
      m = {
        t: "e",
        v: 0
      };
      break;
    case 9:
      if (o > -1) {
        var y = t.rsst[o];
        m = {
          t: "s",
          v: y.v
        }, y.l && (m.l = {
          Target: y.l
        });
      } else throw new Error("Unsupported cell type ".concat(e[C0](0, 4)));
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[C0](0, 4)));
  }
  return l > -1 && war(m, f | n << 8, i, t.ofmt[l], t.nfmt[l]), f == 7 && (m.v /= 86400), m;
}

function Eti(e, t, n) {
  var r = dD(e);
  r.getUint32(4, !0);
  var a = r.getUint32(8, !0),
    i = 12,
    o = -1,
    s = -1,
    l = -1,
    d = NaN,
    u = NaN,
    h = 0,
    p = new Date(Date.UTC(2001, 0, 1));
  a & 1 && (d = kti(e, i), i += 16), a & 2 && (u = r.getFloat64(i, !0), i += 8), a & 4 && (p.setTime(p.getTime() + (h = r.getFloat64(i, !0)) * 1e3), i += 8), a & 8 && (s = r.getUint32(i, !0), i += 4), a & 16 && (o = r.getUint32(i, !0), i += 4), i += g1e(a & 480) * 4, a & 512 && (r.getUint32(i, !0), i += 4), i += g1e(a & 1024) * 4, a & 2048 && (r.getUint32(i, !0), i += 4);
  var m,
    f = e[1];
  switch (f) {
    case 0:
      m = {
        t: "z"
      };
      break;
    case 2:
      m = {
        t: "n",
        v: d
      };
      break;
    case 3:
      m = {
        t: "s",
        v: t.sst[s]
      };
      break;
    case 5:
      n != null && n.cellDates ? m = {
        t: "d",
        v: p
      } : m = {
        t: "n",
        v: h / 86400 + 35430,
        z: Cs[14]
      };
      break;
    case 6:
      m = {
        t: "b",
        v: u > 0
      };
      break;
    case 7:
      m = {
        t: "n",
        v: u
      };
      break;
    case 8:
      m = {
        t: "e",
        v: 0
      };
      break;
    case 9:
      if (o > -1) {
        var y = t.rsst[o];
        m = {
          t: "s",
          v: y.v
        }, y.l && (m.l = {
          Target: y.l
        });
      } else throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(a & 31, " : ").concat(e[C0](0, 4)));
      break;
    case 10:
      m = {
        t: "n",
        v: d
      };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(a & 31, " : ").concat(e[C0](0, 4)));
  }
  if (i += g1e(a & 4096) * 4, a & 516096 && (l == -1 && (l = r.getUint32(i, !0)), i += 4), a & 524288) {
    var b = r.getUint32(i, !0);
    i += 4, t.cmnt[b] && (m.c = Rti(t.cmnt[b]));
  }
  return l > -1 && war(m, f | 1280, a >> 13, t.ofmt[l], t.nfmt[l]), f == 7 && (m.v /= 86400), m;
}

function Jit(e, t) {
  var n = new Uint8Array(32),
    r = dD(n),
    a = 12,
    i = 0;
  switch (n[0] = 5, e.t) {
    case "n":
      if (e.z && k3(e.z)) {
        n[1] = 5, r.setFloat64(a, (lj(e.v + 1462).getTime() - Date.UTC(2001, 0, 1)) / 1e3, !0), i |= 4, a += 8;
        break;
      } else n[1] = 2, Ati(n, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      n[1] = 6, r.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      {
        var o = e.v == null ? "" : String(e.v);
        if (e.l) {
          var s = t.rsst.findIndex(function (d) {
            var u;
            return d.v == o && d.l == ((u = e.l) == null ? void 0 : u.Target);
          });
          s == -1 && (t.rsst[s = t.rsst.length] = {
            v: o,
            l: e.l.Target
          }), n[1] = 9, r.setUint32(a, s, !0), i |= 16, a += 4;
        } else {
          var l = t.sst.indexOf(o);
          l == -1 && (t.sst[l = t.sst.length] = o), n[1] = 3, r.setUint32(a, l, !0), i |= 8, a += 4;
        }
      }
      break;
    case "d":
      n[1] = 5, r.setFloat64(a, (e.v.getTime() - Date.UTC(2001, 0, 1)) / 1e3, !0), i |= 4, a += 8;
      break;
    case "z":
      n[1] = 0;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return e.c && (t.cmnt.push(Nti(e.c)), r.setUint32(a, t.cmnt.length - 1, !0), i |= 524288, a += 4), r.setUint32(8, i, !0), n[C0](0, a);
}

function Zit(e, t) {
  var n = new Uint8Array(32),
    r = dD(n),
    a = 12,
    i = 0,
    o = "";
  switch (n[0] = 4, e.t) {
    case "n":
      break;
    case "b":
      break;
    case "s":
      if (o = e.v == null ? "" : String(e.v), e.l) {
        var s = t.rsst.findIndex(function (d) {
          var u;
          return d.v == o && d.l == ((u = e.l) == null ? void 0 : u.Target);
        });
        s == -1 && (t.rsst[s = t.rsst.length] = {
          v: o,
          l: e.l.Target
        }), n[1] = 9, r.setUint32(a, s, !0), i |= 512, a += 4;
      }
      break;
    case "d":
      break;
    case "e":
      break;
    case "z":
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  switch (e.c && (r.setUint32(a, t.cmnt.length - 1, !0), i |= 4096, a += 4), e.t) {
    case "n":
      n[1] = 2, r.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      n[1] = 6, r.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (o = e.v == null ? "" : String(e.v), !e.l) {
        var l = t.sst.indexOf(o);
        l == -1 && (t.sst[l = t.sst.length] = o), n[1] = 3, r.setUint32(a, l, !0), i |= 16, a += 4;
      }
      break;
    case "d":
      n[1] = 5, r.setFloat64(a, (e.v.getTime() - Date.UTC(2001, 0, 1)) / 1e3, !0), i |= 64, a += 8;
      break;
    case "z":
      n[1] = 0;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return r.setUint32(8, i, !0), n[C0](0, a);
}

function Tti(e, t, n) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return Cti(e, t, e[0], n);
    case 5:
      return Eti(e, t, n);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}

function md(e) {
  var t = uo(e);
  return wc(t[1][0].data);
}

function Kw(e) {
  return Is([[], [{
    type: 0,
    data: ys(e)
  }]]);
}

function Vw(e, t) {
  var n,
    r = (n = e.messages[0].meta[5]) != null && n[0] ? yar(e.messages[0].meta[5][0].data) : [],
    a = r.indexOf(t);
  a == -1 && (r.push(t), e.messages[0].meta[5] = [{
    type: 2,
    data: bar(r)
  }]);
}

function bR(e, t) {
  var n,
    r = (n = e.messages[0].meta[5]) != null && n[0] ? yar(e.messages[0].meta[5][0].data) : [];
  e.messages[0].meta[5] = [{
    type: 2,
    data: bar(r.filter(function (a) {
      return a != t;
    }))
  }];
}

function XG(e, t) {
  var n = uo(t.data),
    r = wc(n[1][0].data),
    a = n[3],
    i = [];
  return (a || []).forEach(function (o) {
    var s,
      l,
      d = uo(o.data);
    if (d[1]) {
      var u = wc(d[1][0].data) >>> 0;
      switch (r) {
        case 1:
          i[u] = UE(d[3][0].data);
          break;
        case 8:
          {
            var h = e[md(d[9][0].data)][0],
              p = uo(h.data),
              m = e[md(p[1][0].data)][0],
              f = wc(m.meta[1][0].data);
            if (f != 2001) throw new Error("2000 unexpected reference to ".concat(f));
            var y = uo(m.data),
              b = {
                v: y[3].map(function (w) {
                  return UE(w.data);
                }).join("")
              };
            i[u] = b;
            e: if ((s = y == null ? void 0 : y[11]) != null && s[0]) {
              var v = (l = uo(y[11][0].data)) == null ? void 0 : l[1];
              if (!v) break e;
              v.forEach(function (w) {
                var k,
                  A,
                  S,
                  C = uo(w.data);
                if ((k = C[2]) != null && k[0]) {
                  var I = e[md((A = C[2]) == null ? void 0 : A[0].data)][0],
                    E = wc(I.meta[1][0].data);
                  switch (E) {
                    case 2032:
                      var M = uo(I.data);
                      (S = M == null ? void 0 : M[2]) != null && S[0] && !b.l && (b.l = UE(M[2][0].data));
                      break;
                    case 2039:
                      break;
                    default:
                      console.log("unrecognized ObjectAttribute type ".concat(E));
                  }
                }
              });
            }
          }
          break;
        case 2:
          i[u] = uo(d[6][0].data);
          break;
        case 3:
          i[u] = uo(d[5][0].data);
          break;
        case 10:
          {
            var _ = e[md(d[10][0].data)][0];
            i[u] = xar(e, _.data);
          }
          break;
        default:
          throw r;
      }
    }
  }), i;
}

function Mti(e, t) {
  var n,
    r,
    a,
    i,
    o,
    s,
    l,
    d,
    u,
    h,
    p,
    m,
    f,
    y,
    b = uo(e),
    v = wc(b[1][0].data) >>> 0,
    _ = wc(b[2][0].data) >>> 0,
    w = ((r = (n = b[8]) == null ? void 0 : n[0]) == null ? void 0 : r.data) && wc(b[8][0].data) > 0 || !1,
    k,
    A;
  if ((i = (a = b[7]) == null ? void 0 : a[0]) != null && i.data && t != 0) k = (s = (o = b[7]) == null ? void 0 : o[0]) == null ? void 0 : s.data, A = (d = (l = b[6]) == null ? void 0 : l[0]) == null ? void 0 : d.data;else if ((h = (u = b[4]) == null ? void 0 : u[0]) != null && h.data && t != 1) k = (m = (p = b[4]) == null ? void 0 : p[0]) == null ? void 0 : m.data, A = (y = (f = b[3]) == null ? void 0 : f[0]) == null ? void 0 : y.data;else throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var S = w ? 4 : 1, C = dD(k), I = [], E = 0; E < k.length / 2; ++E) {
    var M = C.getUint16(E * 2, !0);
    M < 65535 && I.push([E, M]);
  }
  if (I.length != _) throw "Expected ".concat(_, " cells, found ").concat(I.length);
  var T = [];
  for (E = 0; E < I.length - 1; ++E) T[I[E][0]] = A[C0](I[E][1] * S, I[E + 1][1] * S);
  return I.length >= 1 && (T[I[I.length - 1][0]] = A[C0](I[I.length - 1][1] * S)), {
    R: v,
    cells: T
  };
}

function Pti(e, t) {
  var n,
    r = uo(t.data),
    a = -1;
  (n = r == null ? void 0 : r[7]) != null && n[0] && (wc(r[7][0].data) >>> 0 ? a = 1 : a = 0);
  var i = d$(r[5], function (o) {
    return Mti(o, a);
  });
  return {
    nrows: wc(r[4][0].data) >>> 0,
    data: i.reduce(function (o, s) {
      return o[s.R] || (o[s.R] = []), s.cells.forEach(function (l, d) {
        if (o[s.R][d]) throw new Error("Duplicate cell r=".concat(s.R, " c=").concat(d));
        o[s.R][d] = l;
      }), o;
    }, [])
  };
}

function xar(e, t) {
  var n,
    r,
    a,
    i,
    o,
    s,
    l,
    d,
    u,
    h,
    p = {
      t: "",
      a: ""
    },
    m = uo(t);
  if ((r = (n = m == null ? void 0 : m[1]) == null ? void 0 : n[0]) != null && r.data && (p.t = UE((i = (a = m == null ? void 0 : m[1]) == null ? void 0 : a[0]) == null ? void 0 : i.data) || ""), (s = (o = m == null ? void 0 : m[3]) == null ? void 0 : o[0]) != null && s.data) {
    var f = e[md((d = (l = m == null ? void 0 : m[3]) == null ? void 0 : l[0]) == null ? void 0 : d.data)][0],
      y = uo(f.data);
    (h = (u = y[1]) == null ? void 0 : u[0]) != null && h.data && (p.a = UE(y[1][0].data));
  }
  return m != null && m[4] && (p.replies = [], m[4].forEach(function (b) {
    var v = e[md(b.data)][0];
    p.replies.push(xar(e, v.data));
  })), p;
}

function Rti(e) {
  var t = [];
  return t.push({
    t: e.t || "",
    a: e.a,
    T: e.replies && e.replies.length > 0
  }), e.replies && e.replies.forEach(function (n) {
    t.push({
      t: n.t || "",
      a: n.a,
      T: !0
    });
  }), t;
}

function Nti(e) {
  for (var t = {
      a: "",
      t: "",
      replies: []
    }, n = 0; n < e.length; ++n) n == 0 ? (t.a = e[n].a, t.t = e[n].t) : t.replies.push({
    a: e[n].a,
    t: e[n].t
  });
  return t;
}

function jti(e, t, n, r) {
  var a,
    i,
    o,
    s,
    l,
    d,
    u,
    h,
    p,
    m,
    f,
    y,
    b,
    v,
    _ = uo(t.data),
    w = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 0
      }
    };
  if (w.e.r = (wc(_[6][0].data) >>> 0) - 1, w.e.r < 0) throw new Error("Invalid row varint ".concat(_[6][0].data));
  if (w.e.c = (wc(_[7][0].data) >>> 0) - 1, w.e.c < 0) throw new Error("Invalid col varint ".concat(_[7][0].data));
  n["!ref"] = Ac(w);
  var k = n["!data"] != null,
    A = n,
    S = uo(_[4][0].data),
    C = Iti();
  (a = S[4]) != null && a[0] && (C.sst = XG(e, e[md(S[4][0].data)][0])), (i = S[6]) != null && i[0] && (C.fmla = XG(e, e[md(S[6][0].data)][0])), (o = S[11]) != null && o[0] && (C.ofmt = XG(e, e[md(S[11][0].data)][0])), (s = S[12]) != null && s[0] && (C.ferr = XG(e, e[md(S[12][0].data)][0])), (l = S[17]) != null && l[0] && (C.rsst = XG(e, e[md(S[17][0].data)][0])), (d = S[19]) != null && d[0] && (C.cmnt = XG(e, e[md(S[19][0].data)][0])), (u = S[22]) != null && u[0] && (C.nfmt = XG(e, e[md(S[22][0].data)][0]));
  var I = uo(S[3][0].data),
    E = 0;
  if (!((h = S[9]) != null && h[0])) throw "NUMBERS file missing row tree";
  var M = uo(S[9][0].data)[1].map(function (B) {
    return uo(B.data);
  });
  if (M.forEach(function (B) {
    E = wc(B[1][0].data);
    var F = wc(B[2][0].data),
      N = I[1][F];
    if (!N) throw "NUMBERS missing tile " + F;
    var G = uo(N.data),
      z = e[md(G[2][0].data)][0],
      V = wc(z.meta[1][0].data);
    if (V != 6002) throw new Error("6001 unexpected reference to ".concat(V));
    var O = Pti(e, z);
    O.data.forEach(function (L, D) {
      L.forEach(function (U, H) {
        var Y = Tti(U, C, r);
        Y && (k ? (A["!data"][E + D] || (A["!data"][E + D] = []), A["!data"][E + D][H] = Y) : n[ic(H) + Jc(E + D)] = Y);
      });
    }), E += O.nrows;
  }), (p = S[13]) != null && p[0]) {
    var T = e[md(S[13][0].data)][0],
      P = wc(T.meta[1][0].data);
    if (P != 6144) throw new Error("Expected merge type 6144, found ".concat(P));
    n["!merges"] = (m = uo(T.data)) == null ? void 0 : m[1].map(function (B) {
      var F = uo(B.data),
        N = dD(uo(F[1][0].data)[1][0].data),
        G = dD(uo(F[2][0].data)[1][0].data);
      return {
        s: {
          r: N.getUint16(0, !0),
          c: N.getUint16(2, !0)
        },
        e: {
          r: N.getUint16(0, !0) + G.getUint16(0, !0) - 1,
          c: N.getUint16(2, !0) + G.getUint16(2, !0) - 1
        }
      };
    });
  }
  if (!((f = n["!merges"]) != null && f.length) && ((y = _[47]) != null && y[0])) {
    var R = uo(_[47][0].data);
    if ((b = R[2]) != null && b[0]) {
      var j = uo(R[2][0].data);
      (v = j[3]) != null && v[0] && (n["!merges"] = d$(j[3], function (B) {
        var F,
          N,
          G,
          z,
          V,
          O = uo(B),
          L = uo(O[2][0].data),
          D = uo(L[1][0].data);
        if ((F = D[1]) != null && F[0]) {
          var U = uo(D[1][0].data),
            H = wc(U[1][0].data);
          if (H == 67) {
            var Y = uo(U[40][0].data);
            if (!(!((N = Y[3]) != null && N[0]) || !((G = Y[4]) != null && G[0]))) {
              var K = uo(Y[3][0].data),
                W = uo(Y[4][0].data),
                Q = wc(K[1][0].data),
                q = (z = K[2]) != null && z[0] ? wc(K[2][0].data) : Q,
                ne = wc(W[1][0].data),
                de = (V = W[2]) != null && V[0] ? wc(W[2][0].data) : ne;
              return {
                s: {
                  r: ne,
                  c: Q
                },
                e: {
                  r: de,
                  c: q
                }
              };
            }
          }
        }
      }).filter(function (B) {
        return B != null;
      }));
    }
  }
}

function Dti(e, t, n) {
  var r = uo(t.data),
    a = {
      "!ref": "A1"
    };
  n != null && n.dense && (a["!data"] = []);
  var i = e[md(r[2][0].data)],
    o = wc(i[0].meta[1][0].data);
  if (o != 6001) throw new Error("6000 unexpected reference to ".concat(o));
  return jti(e, i[0], a, n), a;
}

function Lti(e, t, n) {
  var r,
    a = uo(t.data),
    i = {
      name: (r = a[1]) != null && r[0] ? UE(a[1][0].data) : "",
      sheets: []
    },
    o = d$(a[2], md);
  return o.forEach(function (s) {
    e[s].forEach(function (l) {
      var d = wc(l.meta[1][0].data);
      d == 6e3 && i.sheets.push(Dti(e, l, n));
    });
  }), i;
}

function Oti(e, t, n) {
  var r,
    a = rBt();
  a.Workbook = {
    WBProps: {
      date1904: !0
    }
  };
  var i = uo(t.data);
  if ((r = i[2]) != null && r[0]) throw new Error("Keynote presentations are not supported");
  var o = d$(i[1], md);
  if (o.forEach(function (s) {
    e[s].forEach(function (l) {
      var d = wc(l.meta[1][0].data);
      if (d == 2) {
        var u = Lti(e, l, n);
        u.sheets.forEach(function (h, p) {
          NCe(a, h, p == 0 ? u.name : u.name + "_" + p, !0);
        });
      }
    });
  }), a.SheetNames.length == 0) throw new Error("Empty NUMBERS file");
  return a.bookType = "numbers", a;
}

function eot(e, t) {
  var n,
    r,
    a,
    i,
    o,
    s,
    l,
    d = {},
    u = [];
  if (e.FullPaths.forEach(function (p) {
    if (p.match(/\.iwpv2/)) throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function (p) {
    if (p.name.match(/\.iwa$/) && p.content[0] == 0) {
      var m;
      try {
        m = Ike(p.content);
      } catch (y) {
        return console.log("?? " + p.content.length + " " + (y.message || y));
      }
      var f;
      try {
        f = Ske(m);
      } catch (y) {
        return console.log("## " + (y.message || y));
      }
      f.forEach(function (y) {
        d[y.id] = y.messages, u.push(y.id);
      });
    }
  }), !u.length) throw new Error("File has no messages");
  if ((a = (r = (n = d == null ? void 0 : d[1]) == null ? void 0 : n[0].meta) == null ? void 0 : r[1]) != null && a[0].data && wc(d[1][0].meta[1][0].data) == 1e4) throw new Error("Pages documents are not supported");
  var h = ((l = (s = (o = (i = d == null ? void 0 : d[1]) == null ? void 0 : i[0]) == null ? void 0 : o.meta) == null ? void 0 : s[1]) == null ? void 0 : l[0].data) && wc(d[1][0].meta[1][0].data) == 1 && d[1][0];
  if (h || u.forEach(function (p) {
    d[p].forEach(function (m) {
      var f = wc(m.meta[1][0].data) >>> 0;
      if (f == 1) if (!h) h = m;else throw new Error("Document has multiple roots");
    });
  }), !h) throw new Error("Cannot find Document root");
  return Oti(d, h, t);
}

function Bti(e, t, n) {
  var r,
    a,
    i,
    o = [[], [{
      type: 0,
      data: ys(0)
    }], [{
      type: 0,
      data: ys(0)
    }], [{
      type: 2,
      data: new Uint8Array([])
    }], [{
      type: 2,
      data: new Uint8Array(Array.from({
        length: 510
      }, function () {
        return 255;
      }))
    }], [{
      type: 0,
      data: ys(5)
    }], [{
      type: 2,
      data: new Uint8Array([])
    }], [{
      type: 2,
      data: new Uint8Array(Array.from({
        length: 510
      }, function () {
        return 255;
      }))
    }], [{
      type: 0,
      data: ys(1)
    }]];
  if (!((r = o[6]) != null && r[0]) || !((a = o[7]) != null && a[0])) throw "Mutation only works on post-BNC storages!";
  var s = 0;
  if (o[7][0].data.length < 2 * e.length) {
    var l = new Uint8Array(2 * e.length);
    l.set(o[7][0].data), o[7][0].data = l;
  }
  if (o[4][0].data.length < 2 * e.length) {
    var d = new Uint8Array(2 * e.length);
    d.set(o[4][0].data), o[4][0].data = d;
  }
  for (var u = dD(o[7][0].data), h = 0, p = [], m = dD(o[4][0].data), f = 0, y = [], b = 4, v = 0; v < e.length; ++v) {
    if (e[v] == null || e[v].t == "z" && !((i = e[v].c) != null && i.length) || e[v].t == "e") {
      u.setUint16(v * 2, 65535, !0), m.setUint16(v * 2, 65535);
      continue;
    }
    u.setUint16(v * 2, h / b, !0), m.setUint16(v * 2, f / b, !0);
    var _, w;
    switch (e[v].t) {
      case "d":
        if (e[v].v instanceof Date) {
          _ = Jit(e[v], t), w = Zit(e[v], t);
          break;
        }
        _ = Jit(e[v], t), w = Zit(e[v], t);
        break;
      case "s":
      case "n":
      case "b":
      case "z":
        _ = Jit(e[v], t), w = Zit(e[v], t);
        break;
      default:
        throw new Error("Unsupported value " + e[v]);
    }
    p.push(_), h += _.length, y.push(w), f += w.length, ++s;
  }
  for (o[2][0].data = ys(s), o[5][0].data = ys(5); v < o[7][0].data.length / 2; ++v) u.setUint16(v * 2, 65535, !0), m.setUint16(v * 2, 65535, !0);
  return o[6][0].data = c$(p), o[3][0].data = c$(y), o[8] = [{
    type: 0,
    data: ys(1)
  }], o;
}

function Kwt(e, t) {
  return {
    meta: [[], [{
      type: 0,
      data: ys(e)
    }]],
    data: t
  };
}

function T6(e, t) {
  t.last || (t.last = 927262);
  for (var n = t.last; n < 2e6; ++n) if (!t[n]) return t[t.last = n] = e, n;
  throw new Error("Too many messages");
}

function Fti(e) {
  var t = {},
    n = [];
  return e.FileIndex.map(function (r, a) {
    return [r, e.FullPaths[a]];
  }).forEach(function (r) {
    var a = r[0],
      i = r[1];
    a.type == 2 && a.name.match(/\.iwa/) && a.content[0] == 0 && Ske(Ike(a.content)).forEach(function (o) {
      n.push(o.id), t[o.id] = {
        deps: [],
        location: i,
        type: wc(o.messages[0].meta[1][0].data)
      };
    });
  }), e.FileIndex.forEach(function (r) {
    r.name.match(/\.iwa/) && r.content[0] == 0 && Ske(Ike(r.content)).forEach(function (a) {
      a.messages.forEach(function (i) {
        [5, 6].forEach(function (o) {
          i.meta[o] && i.meta[o].forEach(function (s) {
            t[a.id].deps.push(wc(s.data));
          });
        });
      });
    });
  }), t;
}

function X6e(e, t, n) {
  return Is([[], [{
    type: 0,
    data: ys(1)
  }], [], [{
    type: 5,
    data: new Uint8Array(Float32Array.from([e / 255]).buffer)
  }], [{
    type: 5,
    data: new Uint8Array(Float32Array.from([t / 255]).buffer)
  }], [{
    type: 5,
    data: new Uint8Array(Float32Array.from([n / 255]).buffer)
  }], [{
    type: 5,
    data: new Uint8Array(Float32Array.from([1]).buffer)
  }], [], [], [], [], [], [{
    type: 0,
    data: ys(1)
  }]]);
}

function _on(e) {
  switch (e) {
    case 0:
      return X6e(99, 222, 171);
    case 1:
      return X6e(162, 197, 240);
    case 2:
      return X6e(255, 189, 189);
  }
  return X6e(Math.random() * 255, Math.random() * 255, Math.random() * 255);
}

function zti(e, t) {
  if (!t || !t.numbers) throw new Error("Must pass a `numbers` option -- check the README");
  var n = Ds.read(t.numbers, {
      type: "base64"
    }),
    r = Fti(n),
    a = M6(n, r, 1);
  if (a == null) throw "Could not find message ".concat(1, " in Numbers template");
  var i = d$(uo(a.messages[0].data)[1], md);
  if (i.length > 1) throw new Error("Template NUMBERS file must have exactly one sheet");
  return e.SheetNames.forEach(function (o, s) {
    s >= 1 && ($ti(n, r, s + 1), a = M6(n, r, 1), i = d$(uo(a.messages[0].data)[1], md)), Gti(n, r, e.Sheets[o], o, s, i[s]);
  }), n;
}

function zh(e, t, n, r) {
  var a = Ds.find(e, t[n].location);
  if (!a) throw "Could not find ".concat(t[n].location, " in Numbers template");
  var i = Ske(Ike(a.content)),
    o = i.find(function (s) {
      return s.id == n;
    });
  r(o, i), a.content = qie(Wie(i)), a.size = a.content.length;
}

function M6(e, t, n) {
  var r = Ds.find(e, t[n].location);
  if (!r) throw "Could not find ".concat(t[n].location, " in Numbers template");
  var a = Ske(Ike(r.content)),
    i = a.find(function (o) {
      return o.id == n;
    });
  return i;
}

function Qwt(e, t, n) {
  e[3].push({
    type: 2,
    data: Is([[], [{
      type: 0,
      data: ys(t)
    }], [{
      type: 2,
      data: m2(n.replace(/-[\s\S]*$/, ""))
    }], [{
      type: 2,
      data: m2(n)
    }], [{
      type: 2,
      data: new Uint8Array([2, 0, 0])
    }], [{
      type: 2,
      data: new Uint8Array([2, 0, 0])
    }], [], [], [], [], [{
      type: 0,
      data: ys(0)
    }], [], [{
      type: 0,
      data: ys(0)
    }]])
  }), e[1] = [{
    type: 0,
    data: ys(Math.max(t + 1, wc(e[1][0].data)))
  }];
}

function JG(e, t, n, r, a, i) {
  i || (i = T6({
    deps: [],
    location: "",
    type: t
  }, a));
  var o = "".concat(r, "-").concat(i, ".iwa");
  a[i].location = "Root Entry" + o, Ds.utils.cfb_add(e, o, qie(Wie([{
    id: i,
    messages: [Kwt(t, Is(n))]
  }])));
  var s = o.replace(/^[\/]/, "").replace(/^Index\//, "").replace(/\.iwa$/, "");
  return zh(e, a, 2, function (l) {
    var d = uo(l.messages[0].data);
    Qwt(d, i || 0, s), l.messages[0].data = Is(d);
  }), i;
}

function ek(e, t, n, r) {
  var a = t[n].location.replace(/^Root Entry\//, "").replace(/^Index\//, "").replace(/\.iwa$/, ""),
    i = e[3].findIndex(function (s) {
      var l,
        d,
        u = uo(s.data);
      return (l = u[3]) != null && l[0] ? UE(u[3][0].data) == a : !!((d = u[2]) != null && d[0] && UE(u[2][0].data) == a);
    }),
    o = uo(e[3][i].data);
  o[6] || (o[6] = []), (Array.isArray(r) ? r : [r]).forEach(function (s) {
    o[6].push({
      type: 2,
      data: Is([[], [{
        type: 0,
        data: ys(s)
      }]])
    });
  }), e[3][i].data = Is(o);
}

function Uti(e, t, n, r) {
  var a = t[n].location.replace(/^Root Entry\//, "").replace(/^Index\//, "").replace(/\.iwa$/, ""),
    i = e[3].findIndex(function (s) {
      var l,
        d,
        u = uo(s.data);
      return (l = u[3]) != null && l[0] ? UE(u[3][0].data) == a : !!((d = u[2]) != null && d[0] && UE(u[2][0].data) == a);
    }),
    o = uo(e[3][i].data);
  o[6] || (o[6] = []), o[6] = o[6].filter(function (s) {
    return wc(uo(s.data)[1][0].data) != r;
  }), e[3][i].data = Is(o);
}

function $ti(e, t, n) {
  var r = -1,
    a = -1,
    i = {};
  zh(e, t, 1, function (l, d) {
    var u = uo(l.messages[0].data);
    r = md(uo(l.messages[0].data)[1][0].data), a = T6({
      deps: [1],
      location: t[r].location,
      type: 2
    }, t), i[r] = a, Vw(l, a), u[1].push({
      type: 2,
      data: Kw(a)
    });
    var h = M6(e, t, r);
    h.id = a, t[1].location == t[a].location ? d.push(h) : zh(e, t, a, function (p, m) {
      return m.push(h);
    }), l.messages[0].data = Is(u);
  });
  var o = -1;
  zh(e, t, a, function (l, d) {
    for (var u = uo(l.messages[0].data), h = 3; h <= 69; ++h) delete u[h];
    var p = d$(u[2], md);
    p.forEach(function (f) {
      return bR(l, f);
    }), o = T6({
      deps: [a],
      location: t[p[0]].location,
      type: t[p[0]].type
    }, t), Vw(l, o), i[p[0]] = o, u[2] = [{
      type: 2,
      data: Kw(o)
    }];
    var m = M6(e, t, p[0]);
    m.id = o, t[p[0]].location == t[a].location ? d.push(m) : (zh(e, t, 2, function (f) {
      var y = uo(f.messages[0].data);
      ek(y, t, a, o), f.messages[0].data = Is(y);
    }), zh(e, t, o, function (f, y) {
      return y.push(m);
    })), l.messages[0].data = Is(u);
  });
  var s = -1;
  zh(e, t, o, function (l, d) {
    for (var u = uo(l.messages[0].data), h = uo(u[1][0].data), p = 3; p <= 69; ++p) delete h[p];
    var m = md(h[2][0].data);
    h[2][0].data = Kw(i[m]), u[1][0].data = Is(h);
    var f = md(u[2][0].data);
    bR(l, f), s = T6({
      deps: [o],
      location: t[f].location,
      type: t[f].type
    }, t), Vw(l, s), i[f] = s, u[2][0].data = Kw(s);
    var y = M6(e, t, f);
    y.id = s, t[o].location == t[s].location ? d.push(y) : zh(e, t, s, function (b, v) {
      return v.push(y);
    }), l.messages[0].data = Is(u);
  }), zh(e, t, s, function (l, d) {
    var u,
      h,
      p = uo(l.messages[0].data),
      m = UE(p[1][0].data),
      f = m.replace(/-[A-Z0-9]*/, "-".concat(("0000" + n.toString(16)).slice(-4)));
    if (p[1][0].data = m2(f), [12, 13, 29, 31, 32, 33, 39, 44, 47, 81, 82, 84].forEach(function (A) {
      return delete p[A];
    }), p[45]) {
      var y = uo(p[45][0].data),
        b = md(y[1][0].data);
      bR(l, b), delete p[45];
    }
    if (p[70]) {
      var v = uo(p[70][0].data);
      (u = v[2]) == null || u.forEach(function (A) {
        var S = uo(A.data);
        [2, 3].map(function (C) {
          return S[C][0];
        }).forEach(function (C) {
          var I = uo(C.data);
          if (I[8]) {
            var E = md(I[8][0].data);
            bR(l, E);
          }
        });
      }), delete p[70];
    }
    [46, 30, 34, 35, 36, 38, 48, 49, 60, 61, 62, 63, 64, 71, 72, 73, 74, 75, 85, 86, 87, 88, 89].forEach(function (A) {
      if (p[A]) {
        var S = md(p[A][0].data);
        delete p[A], bR(l, S);
      }
    });
    var _ = uo(p[4][0].data);
    {
      [2, 4, 5, 6, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22].forEach(function (A) {
        var S;
        if ((S = _[A]) != null && S[0]) {
          var C = md(_[A][0].data),
            I = T6({
              deps: [s],
              location: t[C].location,
              type: t[C].type
            }, t);
          bR(l, C), Vw(l, I), i[C] = I;
          var E = M6(e, t, C);
          if (E.id = I, t[C].location == t[s].location) d.push(E);else {
            t[I].location = t[C].location.replace(C.toString(), I.toString()), t[I].location == t[C].location && (t[I].location = t[I].location.replace(/\.iwa/, "-".concat(I, ".iwa"))), Ds.utils.cfb_add(e, t[I].location, qie(Wie([E])));
            var M = t[I].location.replace(/^Root Entry\//, "").replace(/^Index\//, "").replace(/\.iwa$/, "");
            zh(e, t, 2, function (T) {
              var P = uo(T.messages[0].data);
              Qwt(P, I, M), ek(P, t, s, I), T.messages[0].data = Is(P);
            });
          }
          _[A][0].data = Kw(I);
        }
      });
      var w = uo(_[1][0].data);
      (h = w[2]) == null || h.forEach(function (A) {
        var S = md(A.data),
          C = T6({
            deps: [s],
            location: t[S].location,
            type: t[S].type
          }, t);
        bR(l, S), Vw(l, C), i[S] = C;
        var I = M6(e, t, S);
        if (I.id = C, t[S].location == t[s].location) d.push(I);else {
          t[C].location = t[S].location.replace(S.toString(), C.toString()), t[C].location == t[S].location && (t[C].location = t[C].location.replace(/\.iwa/, "-".concat(C, ".iwa"))), Ds.utils.cfb_add(e, t[C].location, qie(Wie([I])));
          var E = t[C].location.replace(/^Root Entry\//, "").replace(/^Index\//, "").replace(/\.iwa$/, "");
          zh(e, t, 2, function (M) {
            var T = uo(M.messages[0].data);
            Qwt(T, C, E), ek(T, t, s, C), M.messages[0].data = Is(T);
          });
        }
        A.data = Kw(C);
      }), _[1][0].data = Is(w);
      var k = uo(_[3][0].data);
      k[1].forEach(function (A) {
        var S = uo(A.data),
          C = md(S[2][0].data),
          I = i[C];
        if (!i[C]) {
          I = T6({
            deps: [s],
            location: "",
            type: t[C].type
          }, t), t[I].location = "Root Entry/Index/Tables/Tile-".concat(I, ".iwa"), i[C] = I;
          var E = M6(e, t, C);
          E.id = I, bR(l, C), Vw(l, I), Ds.utils.cfb_add(e, "/Index/Tables/Tile-".concat(I, ".iwa"), qie(Wie([E]))), zh(e, t, 2, function (M) {
            var T = uo(M.messages[0].data);
            T[3].push({
              type: 2,
              data: Is([[], [{
                type: 0,
                data: ys(I)
              }], [{
                type: 2,
                data: m2("Tables/Tile")
              }], [{
                type: 2,
                data: m2("Tables/Tile-".concat(I))
              }], [{
                type: 2,
                data: new Uint8Array([2, 0, 0])
              }], [{
                type: 2,
                data: new Uint8Array([2, 0, 0])
              }], [], [], [], [], [{
                type: 0,
                data: ys(0)
              }], [], [{
                type: 0,
                data: ys(0)
              }]])
            }), T[1] = [{
              type: 0,
              data: ys(Math.max(I + 1, wc(T[1][0].data)))
            }], ek(T, t, s, I), M.messages[0].data = Is(T);
          });
        }
        S[2][0].data = Kw(I), A.data = Is(S);
      }), _[3][0].data = Is(k);
    }
    p[4][0].data = Is(_), l.messages[0].data = Is(p);
  });
}

function Gti(e, t, n, r, a, i) {
  var o = [];
  zh(e, t, i, function (d) {
    var u = uo(d.messages[0].data);
    u[1] = [{
      type: 2,
      data: m2(r)
    }], o = d$(u[2], md), d.messages[0].data = Is(u);
  });
  var s = M6(e, t, o[0]),
    l = md(uo(s.messages[0].data)[2][0].data);
  zh(e, t, l, function (d, u) {
    return Vti(e, t, n, d, u, l);
  });
}

function Vti(e, t, n, r, a, i) {
  if (!n["!ref"]) throw new Error("Cannot export empty sheet to NUMBERS");
  var o = Ty(n["!ref"]);
  o.s.r = o.s.c = 0;
  var s = !1;
  o.e.c > 999 && (s = !0, o.e.c = 999), o.e.r > 999999 && (s = !0, o.e.r = 999999), s && console.error("Truncating to ".concat(Ac(o)));
  var l = [];
  if (n["!data"]) l = n["!data"];else {
    for (var d = [], u = 0; u <= o.e.c; ++u) d[u] = ic(u);
    for (var h = 0; h <= o.e.r; ++h) {
      l[h] = [];
      var p = "" + (h + 1);
      for (u = 0; u <= o.e.c; ++u) {
        var m = n[d[u] + p];
        m && (l[h][u] = m);
      }
    }
  }
  var f = {
      cmnt: [{
        a: "~54ee77S~",
        t: "... the people who are crazy enough to think they can change the world, are the ones who do."
      }],
      rsst: [{
        v: "~54ee77S~",
        l: "https://sheetjs.com/"
      }],
      sst: ["~Sh33tJ5~"]
    },
    y = uo(r.messages[0].data);
  {
    y[6][0].data = ys(o.e.r + 1), y[7][0].data = ys(o.e.c + 1), delete y[46];
    var b = uo(y[4][0].data);
    {
      var v = md(uo(b[1][0].data)[2][0].data);
      zh(e, t, v, function (L, D) {
        var U,
          H = uo(L.messages[0].data);
        if ((U = H == null ? void 0 : H[2]) != null && U[0]) for (var Y = 0; Y < l.length; ++Y) {
          var K = uo(H[2][0].data);
          K[1][0].data = ys(Y), K[4][0].data = ys(l[Y].length), H[2][Y] = {
            type: H[2][0].type,
            data: Is(K)
          };
        }
        L.messages[0].data = Is(H);
      });
      var _ = md(b[2][0].data);
      zh(e, t, _, function (L, D) {
        for (var U = uo(L.messages[0].data), H = 0; H <= o.e.c; ++H) {
          var Y = uo(U[2][0].data);
          Y[1][0].data = ys(H), Y[4][0].data = ys(o.e.r + 1), U[2][H] = {
            type: U[2][0].type,
            data: Is(Y)
          };
        }
        L.messages[0].data = Is(U);
      });
      var w = uo(b[9][0].data);
      w[1] = [];
      var k = uo(b[3][0].data);
      {
        var A = 256;
        k[2] = [{
          type: 0,
          data: ys(A)
        }];
        var S = md(uo(k[1][0].data)[2][0].data),
          C = (function () {
            var L = M6(e, t, 2),
              D = uo(L.messages[0].data),
              U = D[3].filter(function (H) {
                return wc(uo(H.data)[1][0].data) == S;
              });
            return U != null && U.length ? wc(uo(U[0].data)[12][0].data) : 0;
          })();
        Ds.utils.cfb_del(e, t[S].location), zh(e, t, 2, function (L) {
          var D = uo(L.messages[0].data);
          D[3] = D[3].filter(function (U) {
            return wc(uo(U.data)[1][0].data) != S;
          }), Uti(D, t, i, S), L.messages[0].data = Is(D);
        }), bR(r, S), k[1] = [];
        for (var I = Math.ceil((o.e.r + 1) / A), E = 0; E < I; ++E) {
          var M = T6({
            deps: [],
            location: "",
            type: 6002
          }, t);
          t[M].location = "Root Entry/Index/Tables/Tile-".concat(M, ".iwa");
          for (var T = [[], [{
              type: 0,
              data: ys(0)
            }], [{
              type: 0,
              data: ys(Math.min(o.e.r + 1, (E + 1) * A))
            }], [{
              type: 0,
              data: ys(0)
            }], [{
              type: 0,
              data: ys(Math.min((E + 1) * A, o.e.r + 1) - E * A)
            }], [], [{
              type: 0,
              data: ys(5)
            }], [{
              type: 0,
              data: ys(1)
            }], [{
              type: 0,
              data: ys(1)
            }]], P = E * A; P <= Math.min(o.e.r, (E + 1) * A - 1); ++P) {
            var R = Bti(l[P], f);
            R[1][0].data = ys(P - E * A), T[5].push({
              data: Is(R),
              type: 2
            });
          }
          k[1].push({
            type: 2,
            data: Is([[], [{
              type: 0,
              data: ys(E)
            }], [{
              type: 2,
              data: Kw(M)
            }]])
          });
          var j = {
              id: M,
              messages: [Kwt(6002, Is(T))]
            },
            B = qie(Wie([j]));
          Ds.utils.cfb_add(e, "/Index/Tables/Tile-".concat(M, ".iwa"), B), zh(e, t, 2, function (L) {
            var D = uo(L.messages[0].data);
            D[3].push({
              type: 2,
              data: Is([[], [{
                type: 0,
                data: ys(M)
              }], [{
                type: 2,
                data: m2("Tables/Tile")
              }], [{
                type: 2,
                data: m2("Tables/Tile-".concat(M))
              }], [{
                type: 2,
                data: new Uint8Array([2, 0, 0])
              }], [{
                type: 2,
                data: new Uint8Array([2, 0, 0])
              }], [], [], [], [], [{
                type: 0,
                data: ys(0)
              }], [], [{
                type: 0,
                data: ys(C)
              }]])
            }), D[1] = [{
              type: 0,
              data: ys(Math.max(M + 1, wc(D[1][0].data)))
            }], ek(D, t, i, M), L.messages[0].data = Is(D);
          }), Vw(r, M), w[1].push({
            type: 2,
            data: Is([[], [{
              type: 0,
              data: ys(E * A)
            }], [{
              type: 0,
              data: ys(E)
            }]])
          });
        }
      }
      if (b[3][0].data = Is(k), b[9][0].data = Is(w), b[10] = [{
        type: 2,
        data: new Uint8Array([])
      }], n["!merges"]) {
        var F = T6({
          type: 6144,
          deps: [i],
          location: t[i].location
        }, t);
        a.push({
          id: F,
          messages: [Kwt(6144, Is([[], n["!merges"].map(function (L) {
            return {
              type: 2,
              data: Is([[], [{
                type: 2,
                data: Is([[], [{
                  type: 5,
                  data: new Uint8Array(new Uint16Array([L.s.r, L.s.c]).buffer)
                }]])
              }], [{
                type: 2,
                data: Is([[], [{
                  type: 5,
                  data: new Uint8Array(new Uint16Array([L.e.r - L.s.r + 1, L.e.c - L.s.c + 1]).buffer)
                }]])
              }]])
            };
          })]))]
        }), b[13] = [{
          type: 2,
          data: Kw(F)
        }], zh(e, t, 2, function (L) {
          var D = uo(L.messages[0].data);
          ek(D, t, i, F), L.messages[0].data = Is(D);
        }), Vw(r, F);
      } else delete b[13];
      var N = md(b[4][0].data);
      zh(e, t, N, function (L) {
        var D = uo(L.messages[0].data);
        D[3] = [], f.sst.forEach(function (U, H) {
          H != 0 && D[3].push({
            type: 2,
            data: Is([[], [{
              type: 0,
              data: ys(H)
            }], [{
              type: 0,
              data: ys(1)
            }], [{
              type: 2,
              data: m2(U)
            }]])
          });
        }), L.messages[0].data = Is(D);
      });
      var G = md(b[17][0].data);
      if (zh(e, t, G, function (L) {
        var D = uo(L.messages[0].data);
        D[3] = [];
        var U = [904980, 903835, 903815, 903845];
        f.rsst.forEach(function (H, Y) {
          if (Y != 0) {
            var K = [[], [{
              type: 0,
              data: new Uint8Array([5])
            }], [], [{
              type: 2,
              data: m2(H.v)
            }]];
            K[10] = [{
              type: 0,
              data: new Uint8Array([1])
            }], K[19] = [{
              type: 2,
              data: new Uint8Array([10, 6, 8, 0, 18, 2, 101, 110])
            }], K[5] = [{
              type: 2,
              data: new Uint8Array([10, 8, 8, 0, 18, 4, 8, 155, 149, 55])
            }], K[2] = [{
              type: 2,
              data: new Uint8Array([8, 148, 158, 55])
            }], K[6] = [{
              type: 2,
              data: new Uint8Array([10, 6, 8, 0, 16, 0, 24, 0])
            }], K[7] = [{
              type: 2,
              data: new Uint8Array([10, 8, 8, 0, 18, 4, 8, 135, 149, 55])
            }], K[8] = [{
              type: 2,
              data: new Uint8Array([10, 8, 8, 0, 18, 4, 8, 165, 149, 55])
            }], K[14] = [{
              type: 2,
              data: new Uint8Array([10, 6, 8, 0, 16, 0, 24, 0])
            }], K[24] = [{
              type: 2,
              data: new Uint8Array([10, 6, 8, 0, 16, 0, 24, 0])
            }];
            var W = T6({
                deps: [],
                location: "",
                type: 2001
              }, t),
              Q = [];
            if (H.l) {
              var q = JG(e, 2032, [[], [], [{
                type: 2,
                data: m2(H.l)
              }]], "/Index/Tables/DataList", t);
              K[11] = [];
              var ne = [[], []];
              ne[1] || (ne[1] = []), ne[1].push({
                type: 2,
                data: Is([[], [{
                  type: 0,
                  data: ys(0)
                }], [{
                  type: 2,
                  data: Kw(q)
                }]])
              }), K[11][0] = {
                type: 2,
                data: Is(ne)
              }, Q.push(q);
            }
            JG(e, 2001, K, "/Index/Tables/DataList", t, W), zh(e, t, W, function (le) {
              U.forEach(function (J) {
                return Vw(le, J);
              }), Q.forEach(function (J) {
                return Vw(le, J);
              });
            });
            var de = JG(e, 6218, [[], [{
              type: 2,
              data: Kw(W)
            }], [], [{
              type: 2,
              data: new Uint8Array([13, 255, 255, 255, 0, 18, 10, 16, 255, 255, 1, 24, 255, 255, 255, 255, 7])
            }]], "/Index/Tables/DataList", t);
            zh(e, t, de, function (le) {
              return Vw(le, W);
            }), D[3].push({
              type: 2,
              data: Is([[], [{
                type: 0,
                data: ys(Y)
              }], [{
                type: 0,
                data: ys(1)
              }], [], [], [], [], [], [], [{
                type: 2,
                data: Kw(de)
              }]])
            }), Vw(L, de), zh(e, t, 2, function (le) {
              var J = uo(le.messages[0].data);
              ek(J, t, G, de), ek(J, t, de, W), ek(J, t, W, Q), ek(J, t, W, U), le.messages[0].data = Is(J);
            });
          }
        }), L.messages[0].data = Is(D);
      }), f.cmnt.length > 1) {
        var z = md(b[19][0].data),
          V = {},
          O = 0;
        zh(e, t, z, function (L) {
          var D = uo(L.messages[0].data);
          D[3] = [], f.cmnt.forEach(function (U, H) {
            if (H != 0) {
              var Y = [];
              U.replies && U.replies.forEach(function (Q) {
                V[Q.a || ""] || (V[Q.a || ""] = JG(e, 212, [[], [{
                  type: 2,
                  data: m2(Q.a || "")
                }], [{
                  type: 2,
                  data: _on(++O)
                }], [], [{
                  type: 0,
                  data: ys(0)
                }]], "/Index/Tables/DataList", t));
                var q = V[Q.a || ""],
                  ne = JG(e, 3056, [[], [{
                    type: 2,
                    data: m2(Q.t || "")
                  }], [{
                    type: 2,
                    data: Is([[], [{
                      type: 1,
                      data: new Uint8Array([0, 0, 0, 128, 116, 109, 182, 65])
                    }]])
                  }], [{
                    type: 2,
                    data: Kw(q)
                  }]], "/Index/Tables/DataList", t);
                zh(e, t, ne, function (de) {
                  return Vw(de, q);
                }), Y.push(ne), zh(e, t, 2, function (de) {
                  var le = uo(de.messages[0].data);
                  ek(le, t, ne, q), de.messages[0].data = Is(le);
                });
              }), V[U.a || ""] || (V[U.a || ""] = JG(e, 212, [[], [{
                type: 2,
                data: m2(U.a || "")
              }], [{
                type: 2,
                data: _on(++O)
              }], [], [{
                type: 0,
                data: ys(0)
              }]], "/Index/Tables/DataList", t));
              var K = V[U.a || ""],
                W = JG(e, 3056, [[], [{
                  type: 2,
                  data: m2(U.t || "")
                }], [{
                  type: 2,
                  data: Is([[], [{
                    type: 1,
                    data: new Uint8Array([0, 0, 0, 128, 116, 109, 182, 65])
                  }]])
                }], [{
                  type: 2,
                  data: Kw(K)
                }], Y.map(function (Q) {
                  return {
                    type: 2,
                    data: Kw(Q)
                  };
                }), [{
                  type: 2,
                  data: Is([[], [{
                    type: 0,
                    data: ys(H)
                  }], [{
                    type: 0,
                    data: ys(0)
                  }]])
                }]], "/Index/Tables/DataList", t);
              zh(e, t, W, function (Q) {
                Vw(Q, K), Y.forEach(function (q) {
                  return Vw(Q, q);
                });
              }), D[3].push({
                type: 2,
                data: Is([[], [{
                  type: 0,
                  data: ys(H)
                }], [{
                  type: 0,
                  data: ys(1)
                }], [], [], [], [], [], [], [], [{
                  type: 2,
                  data: Kw(W)
                }]])
              }), Vw(L, W), zh(e, t, 2, function (Q) {
                var q = uo(Q.messages[0].data);
                ek(q, t, z, W), ek(q, t, W, K), Y.length && ek(q, t, W, Y), Q.messages[0].data = Is(q);
              });
            }
          }), D[2][0].data = ys(f.cmnt.length + 1), L.messages[0].data = Is(D);
        });
      }
    }
    y[4][0].data = Is(b);
  }
  r.messages[0].data = Is(y);
}

function _ar(e) {
  return function (n) {
    for (var r = 0; r != e.length; ++r) {
      var a = e[r];
      n[a[0]] === void 0 && (n[a[0]] = a[1]), a[2] === "n" && (n[a[0]] = Number(n[a[0]]));
    }
  };
}

function XOt(e) {
  _ar([["cellNF", !1], ["cellHTML", !0], ["cellFormula", !0], ["cellStyles", !1], ["cellText", !0], ["cellDates", !1], ["sheetStubs", !1], ["sheetRows", 0, "n"], ["bookDeps", !1], ["bookSheets", !1], ["bookProps", !1], ["bookFiles", !1], ["bookVBA", !1], ["password", ""], ["WTF", !1]])(e);
}

function JOt(e) {
  _ar([["cellDates", !1], ["bookSST", !1], ["bookType", "xlsx"], ["compression", !1], ["WTF", !1]])(e);
}

function Hti(e) {
  return Kc.WS.indexOf(e) > -1 ? "sheet" : e == Kc.CS ? "chart" : e == Kc.DS ? "dialog" : e == Kc.MS ? "macro" : e && e.length ? e : "sheet";
}

function Wti(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function (r) {
      return r.id || (r.id = r.strRelID), [r.name, e["!id"][r.id].Target, Hti(e["!id"][r.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}

function qti(e, t, n, r, a, i, o, s) {
  if (!(!e || !e["!legdrawel"])) {
    var l = zre(e["!legdrawel"].Target, r),
      d = T2(n, l, !0);
    d && rYa(Ch(d), e, s || []);
  }
}

function Kti(e, t, n, r, a, i, o, s, l, d, u, h) {
  try {
    i[r] = d1e(T2(e, n, !0), t);
    var p = ny(e, t),
      m;
    switch (s) {
      case "sheet":
        m = Sei(p, t, a, l, i[r], d, u, h);
        break;
      case "chart":
        if (m = Iei(p, t, a, l, i[r], d, u, h), !m || !m["!drawel"]) break;
        var f = zre(m["!drawel"].Target, t),
          y = vke(f),
          b = nYa(T2(e, f, !0), d1e(T2(e, y, !0), f)),
          v = zre(b, f),
          _ = vke(v);
        m = QZa(T2(e, v, !0), v, l, d1e(T2(e, _, !0), v), d, m);
        break;
      case "macro":
        m = Cei(p, t, a, l, i[r], d, u, h);
        break;
      case "dialog":
        m = Eei(p, t, a, l, i[r], d, u, h);
        break;
      default:
        throw new Error("Unrecognized sheet type " + s);
    }
    o[r] = m;
    var w = [],
      k = [];
    i && i[r] && Gm(i[r]).forEach(function (A) {
      var S = "";
      if (i[r][A].Type == Kc.CMNT) {
        if (S = zre(i[r][A].Target, t), w = Pei(ny(e, S, !0), S, l), !w || !w.length) return;
        ion(m, w, !1);
      }
      i[r][A].Type == Kc.TCMNT && (S = zre(i[r][A].Target, t), k = k.concat(sYa(ny(e, S, !0), l)));
    }), k && k.length && ion(m, k, !0, l.people || []), qti(m, s, e, t, a, l, d, w);
  } catch (A) {
    if (l.WTF) throw A;
  }
}

function d4(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}

function ZOt(e, t) {
  if (VZ(), t = t || {}, XOt(t), b4(e, "META-INF/manifest.xml") || b4(e, "objectdata.xml")) return bon(e, t);
  if (b4(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof eot < "u") {
      if (e.FileIndex) return eot(e, t);
      var n = Ds.utils.cfb_new();
      return Iin(e).forEach(function (B) {
        bc(n, B, eHa(e, B));
      }), eot(n, t);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!b4(e, "[Content_Types].xml")) {
    if (b4(e, "index.xml.gz")) throw new Error("Unsupported NUMBERS 08 file");
    if (b4(e, "index.xml")) throw new Error("Unsupported NUMBERS 09 file");
    var r = Ds.find(e, "Index.zip");
    if (r) return t = qu(t), delete t.type, typeof r.content == "string" && (t.type = "binary"), typeof Bun < "u" && Buffer.isBuffer(r.content) ? zz(new Uint8Array(r.content), t) : zz(r.content, t);
    throw new Error("Unsupported ZIP file");
  }
  var a = Iin(e),
    i = qHa(T2(e, "[Content_Types].xml")),
    o = !1,
    s,
    l;
  if (i.workbooks.length === 0 && (l = "xl/workbook.xml", ny(e, l, !0) && i.workbooks.push(l)), i.workbooks.length === 0) {
    if (l = "xl/workbook.bin", !ny(e, l, !0)) throw new Error("Could not find workbook");
    i.workbooks.push(l), o = !0;
  }
  i.workbooks[0].slice(-3) == "bin" && (o = !0);
  var d = {},
    u = {};
  if (!t.bookSheets && !t.bookProps) {
    if (h1e = [], i.sst) try {
      h1e = Mei(ny(e, d4(i.sst)), i.sst, t);
    } catch (B) {
      if (t.WTF) throw B;
    }
    t.cellStyles && i.themes.length && (d = Err(T2(e, i.themes[0].replace(/^\//, ""), !0) || "", t)), i.style && (u = Tei(ny(e, d4(i.style)), i.style, d, t));
  }
  i.links.map(function (B) {
    try {
      var F = d1e(T2(e, vke(d4(B))), B);
      return Nei(ny(e, d4(B)), F, B, t);
    } catch {}
  });
  var h = Aei(ny(e, d4(i.workbooks[0])), i.workbooks[0], t),
    p = {},
    m = "";
  i.coreprops.length && (m = ny(e, d4(i.coreprops[0]), !0), m && (p = Ynr(m)), i.extprops.length !== 0 && (m = ny(e, d4(i.extprops[0]), !0), m && ZHa(m, p, t)));
  var f = {};
  (!t.bookSheets || t.bookProps) && i.custprops.length !== 0 && (m = T2(e, d4(i.custprops[0]), !0), m && (f = tWa(m, t)));
  var y = {};
  if ((t.bookSheets || t.bookProps) && (h.Sheets ? s = h.Sheets.map(function (F) {
    return F.name;
  }) : p.Worksheets && p.SheetNames.length > 0 && (s = p.SheetNames), t.bookProps && (y.Props = p, y.Custprops = f), t.bookSheets && typeof s < "u" && (y.SheetNames = s), t.bookSheets ? y.SheetNames : t.bookProps)) return y;
  s = {};
  var b = {};
  t.bookDeps && i.calcchain && (b = Rei(ny(e, d4(i.calcchain)), i.calcchain));
  var v = 0,
    _ = {},
    w,
    k;
  {
    var A = h.Sheets;
    p.Worksheets = A.length, p.SheetNames = [];
    for (var S = 0; S != A.length; ++S) p.SheetNames[S] = A[S].name;
  }
  var C = o ? "bin" : "xml",
    I = i.workbooks[0].lastIndexOf("/"),
    E = (i.workbooks[0].slice(0, I + 1) + "_rels/" + i.workbooks[0].slice(I + 1) + ".rels").replace(/^\//, "");
  b4(e, E) || (E = "xl/_rels/workbook." + C + ".rels");
  var M = d1e(T2(e, E, !0), E.replace(/_rels.*/, "s5s"));
  (i.metadata || []).length >= 1 && (t.xlmeta = jei(ny(e, d4(i.metadata[0])), i.metadata[0], t)), (i.people || []).length >= 1 && (t.people = lYa(ny(e, d4(i.people[0])), t)), M && (M = Wti(M, h.Sheets));
  var T = ny(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (v = 0; v != p.Worksheets; ++v) {
    var P = "sheet";
    if (M && M[v] ? (w = "xl/" + M[v][1].replace(/[\/]?xl\//, ""), b4(e, w) || (w = M[v][1]), b4(e, w) || (w = E.replace(/_rels\/[\S\s]*$/, "") + M[v][1]), P = M[v][2]) : (w = "xl/worksheets/sheet" + (v + 1 - T) + "." + C, w = w.replace(/sheet0\./, "sheet.")), k = w.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (v != t.sheets) continue e;
        break;
      case "string":
        if (p.SheetNames[v].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var R = !1, j = 0; j != t.sheets.length; ++j) typeof t.sheets[j] == "number" && t.sheets[j] == v && (R = 1), typeof t.sheets[j] == "string" && t.sheets[j].toLowerCase() == p.SheetNames[v].toLowerCase() && (R = 1);
          if (!R) continue e;
        }
    }
    Kti(e, w, k, p.SheetNames[v], v, _, s, P, t, h, d, u);
  }
  return y = {
    Directory: i,
    Workbook: h,
    Props: p,
    Custprops: f,
    Deps: b,
    Sheets: s,
    SheetNames: p.SheetNames,
    Strings: h1e,
    Styles: u,
    Themes: d,
    SSF: qu(Cs)
  }, t && t.bookFiles && (e.files ? (y.keys = a, y.files = e.files) : (y.keys = [], y.files = {}, e.FullPaths.forEach(function (B, F) {
    B = B.replace(/^Root Entry[\/]/, ""), y.keys.push(B), y.files[B] = e.FileIndex[F];
  }))), t && t.bookVBA && (i.vba.length > 0 ? y.vbaraw = ny(e, d4(i.vba[0]), !0) : i.defaults && i.defaults.bin === mYa && (y.vbaraw = ny(e, "xl/vbaProject.bin", !0))), y.bookType = o ? "xlsb" : "xlsx", y;
}

function Qti(e, t) {
  var n = t || {},
    r = "Workbook",
    a = Ds.find(e, r);
  try {
    if (r = "/!DataSpaces/Version", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
    if (IKa(a.content), r = "/!DataSpaces/DataSpaceMap", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
    var i = EKa(a.content);
    if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + r);
    if (r = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
    var o = TKa(a.content);
    if (o.length != 1 || o[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + r);
    if (r = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
    PKa(a.content);
  } catch {}
  if (r = "/EncryptionInfo", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
  var s = RKa(a.content);
  if (r = "/EncryptedPackage", a = Ds.find(e, r), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + r);
  if (s[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(s[1], a.content, n.password || "", n);
  if (s[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(s[1], a.content, n.password || "", n);
  throw new Error("File is password-protected");
}

function Yti(e, t) {
  e && !e.SSF && (e.SSF = qu(Cs)), e && e.SSF && (VZ(), vpe(e.SSF), t.revssf = kCe(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, p1e ? t.revStrings = new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var n = "bin",
    r = !0,
    a = zOt();
  JOt(t = t || {});
  var i = SOt(),
    o = "",
    s = 0;
  if (t.cellXfs = [], HP(t.cellXfs, {}, {
    revssf: {
      General: 0
    }
  }), e.Props || (e.Props = {}), o = "docProps/core.xml", bc(i, o, Xnr(e.Props, t)), a.coreprops.push(o), Ju(t.rels, 2, o, Kc.CORE_PROPS), o = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;else {
    for (var l = [], d = 0; d < e.SheetNames.length; ++d) (e.Workbook.Sheets[d] || {}).Hidden != 2 && l.push(e.SheetNames[d]);
    e.Props.SheetNames = l;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, bc(i, o, err(e.Props)), a.extprops.push(o), Ju(t.rels, 3, o, Kc.EXT_PROPS), e.Custprops !== e.Props && Gm(e.Custprops || {}).length > 0 && (o = "docProps/custom.xml", bc(i, o, trr(e.Custprops)), a.custprops.push(o), Ju(t.rels, 4, o, Kc.CUST_PROPS));
  var u = ["SheetJ5"];
  for (t.tcid = 0, s = 1; s <= e.SheetNames.length; ++s) {
    var h = {
        "!id": {}
      },
      p = e.Sheets[e.SheetNames[s - 1]],
      m = (p || {})["!type"] || "sheet";
    switch (m) {
      case "chart":
      default:
        o = "xl/worksheets/sheet" + s + "." + n, bc(i, o, qZa(s - 1, t, e, h)), a.sheets.push(o), Ju(t.wbrels, -1, "worksheets/sheet" + s + "." + n, Kc.WS[0]);
    }
    if (p) {
      var f = p["!comments"],
        y = !1,
        b = "";
      if (f && f.length > 0) {
        var v = !1;
        f.forEach(function (w) {
          w[1].forEach(function (k) {
            k.T == !0 && (v = !0);
          });
        }), v && (b = "xl/threadedComments/threadedComment" + s + ".xml", bc(i, b, Mrr(f, u, t)), a.threadedcomments.push(b), Ju(h, -1, "../threadedComments/threadedComment" + s + ".xml", Kc.TCMNT)), b = "xl/comments" + s + "." + n, bc(i, b, pYa(f)), a.comments.push(b), Ju(h, -1, "../comments" + s + "." + n, Kc.CMNT), y = !0;
      }
      p["!legacy"] && y && bc(i, "xl/drawings/vmlDrawing" + s + ".vml", Trr(s, p["!comments"])), delete p["!comments"], delete p["!legacy"];
    }
    h["!id"].rId1 && bc(i, vke(o), Vie(h));
  }
  t.Strings != null && t.Strings.length > 0 && (o = "xl/sharedStrings." + n, bc(i, o, SKa(t.Strings)), a.strs.push(o), Ju(t.wbrels, -1, "sharedStrings." + n, Kc.SST)), o = "xl/workbook." + n, bc(i, o, kei(e)), a.workbooks.push(o), Ju(t.rels, 1, o, Kc.WB), o = "xl/theme/theme1.xml";
  var _ = WOt(e.Themes, t);
  return bc(i, o, _), a.themes.push(o), Ju(t.wbrels, -1, "theme/theme1.xml", Kc.THEME), o = "xl/styles." + n, bc(i, o, TQa(e, t)), a.styles.push(o), Ju(t.wbrels, -1, "styles." + n, Kc.STY), e.vbaraw && r && (o = "xl/vbaProject.bin", bc(i, o, e.vbaraw), a.vba.push(o), Ju(t.wbrels, -1, "vbaProject.bin", Kc.VBA)), o = "xl/metadata." + n, bc(i, o, QQa()), a.metadata.push(o), Ju(t.wbrels, -1, "metadata." + n, Kc.XLMETA), u.length > 1 && (o = "xl/persons/person.xml", bc(i, o, Prr(u)), a.people.push(o), Ju(t.wbrels, -1, "persons/person.xml", Kc.PEOPLE)), bc(i, "[Content_Types].xml", Knr(a, t)), bc(i, "_rels/.rels", Vie(t.rels)), bc(i, "xl/_rels/workbook." + n + ".rels", Vie(t.wbrels)), delete t.revssf, delete t.ssf, i;
}

function kar(e, t) {
  e && !e.SSF && (e.SSF = qu(Cs)), e && e.SSF && (VZ(), vpe(e.SSF), t.revssf = kCe(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, p1e ? t.revStrings = new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var n = "xml",
    r = yYa.indexOf(t.bookType) > -1,
    a = zOt();
  JOt(t = t || {});
  var i = SOt(),
    o = "",
    s = 0;
  if (t.cellXfs = [], HP(t.cellXfs, {}, {
    revssf: {
      General: 0
    }
  }), e.Props || (e.Props = {}), o = "docProps/core.xml", bc(i, o, Xnr(e.Props, t)), a.coreprops.push(o), Ju(t.rels, 2, o, Kc.CORE_PROPS), o = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;else {
    for (var l = [], d = 0; d < e.SheetNames.length; ++d) (e.Workbook.Sheets[d] || {}).Hidden != 2 && l.push(e.SheetNames[d]);
    e.Props.SheetNames = l;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, bc(i, o, err(e.Props)), a.extprops.push(o), Ju(t.rels, 3, o, Kc.EXT_PROPS), e.Custprops !== e.Props && Gm(e.Custprops || {}).length > 0 && (o = "docProps/custom.xml", bc(i, o, trr(e.Custprops)), a.custprops.push(o), Ju(t.rels, 4, o, Kc.CUST_PROPS));
  var u = ["SheetJ5"];
  for (t.tcid = 0, s = 1; s <= e.SheetNames.length; ++s) {
    var h = {
        "!id": {}
      },
      p = e.Sheets[e.SheetNames[s - 1]],
      m = (p || {})["!type"] || "sheet";
    switch (m) {
      case "chart":
      default:
        o = "xl/worksheets/sheet" + s + "." + n, bc(i, o, jJa(s - 1, t, e, h)), a.sheets.push(o), Ju(t.wbrels, -1, "worksheets/sheet" + s + "." + n, Kc.WS[0]);
    }
    if (p) {
      var f = p["!comments"],
        y = !1,
        b = "";
      if (f && f.length > 0) {
        var v = !1;
        f.forEach(function (_) {
          _[1].forEach(function (w) {
            w.T == !0 && (v = !0);
          });
        }), v && (b = "xl/threadedComments/threadedComment" + s + ".xml", bc(i, b, Mrr(f, u, t)), a.threadedcomments.push(b), Ju(h, -1, "../threadedComments/threadedComment" + s + ".xml", Kc.TCMNT)), b = "xl/comments" + s + "." + n, bc(i, b, oYa(f)), a.comments.push(b), Ju(h, -1, "../comments" + s + "." + n, Kc.CMNT), y = !0;
      }
      p["!legacy"] && y && bc(i, "xl/drawings/vmlDrawing" + s + ".vml", Trr(s, p["!comments"])), delete p["!comments"], delete p["!legacy"];
    }
    h["!id"].rId1 && bc(i, vke(o), Vie(h));
  }
  return t.Strings != null && t.Strings.length > 0 && (o = "xl/sharedStrings." + n, bc(i, o, wKa(t.Strings, t)), a.strs.push(o), Ju(t.wbrels, -1, "sharedStrings." + n, Kc.SST)), o = "xl/workbook." + n, bc(i, o, sei(e)), a.workbooks.push(o), Ju(t.rels, 1, o, Kc.WB), o = "xl/theme/theme1.xml", bc(i, o, WOt(e.Themes, t)), a.themes.push(o), Ju(t.wbrels, -1, "theme/theme1.xml", Kc.THEME), o = "xl/styles." + n, bc(i, o, sQa(e, t)), a.styles.push(o), Ju(t.wbrels, -1, "styles." + n, Kc.STY), e.vbaraw && r && (o = "xl/vbaProject.bin", bc(i, o, e.vbaraw), a.vba.push(o), Ju(t.wbrels, -1, "vbaProject.bin", Kc.VBA)), o = "xl/metadata." + n, bc(i, o, XQa()), a.metadata.push(o), Ju(t.wbrels, -1, "metadata." + n, Kc.XLMETA), u.length > 1 && (o = "xl/persons/person.xml", bc(i, o, Prr(u)), a.people.push(o), Ju(t.wbrels, -1, "persons/person.xml", Kc.PEOPLE)), bc(i, "[Content_Types].xml", Knr(a, t)), bc(i, "_rels/.rels", Vie(t.rels)), bc(i, "xl/_rels/workbook." + n + ".rels", Vie(t.wbrels)), delete t.revssf, delete t.ssf, i;
}

function eBt(e, t) {
  var n = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      n = _3(e.slice(0, 12));
      break;
    case "binary":
      n = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [n.charCodeAt(0), n.charCodeAt(1), n.charCodeAt(2), n.charCodeAt(3), n.charCodeAt(4), n.charCodeAt(5), n.charCodeAt(6), n.charCodeAt(7)];
}

function Xti(e, t) {
  return Ds.find(e, "EncryptedPackage") ? Qti(e, t) : WXe(e, t);
}

function Jti(e, t) {
  var n,
    r = e,
    a = t || {};
  return a.type || (a.type = Uc && Buffer.isBuffer(e) ? "buffer" : "base64"), n = Cnr(r, a), ZOt(n, a);
}

function Aar(e, t) {
  var n = 0;
  e: for (; n < e.length;) switch (e.charCodeAt(n)) {
    case 10:
    case 13:
    case 32:
      ++n;
      break;
    case 60:
      return Wwt(e.slice(n), t);
    default:
      break e;
  }
  return Mde.to_workbook(e, t);
}

function Zti(e, t) {
  var n = "",
    r = eBt(e, t);
  switch (t.type) {
    case "base64":
      n = _3(e);
      break;
    case "binary":
      n = e;
      break;
    case "buffer":
      n = e.toString("binary");
      break;
    case "array":
      n = wJ(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return r[0] == 239 && r[1] == 187 && r[2] == 191 && (n = Ch(n)), t.type = "binary", Aar(n, t);
}

function eni(e, t) {
  var n = e;
  return t.type == "base64" && (n = _3(n)), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer && (n = new Uint8Array(e)), n = typeof Rc < "u" ? Rc.utils.decode(1200, n.slice(2), "str") : Uc && Buffer.isBuffer(e) ? e.slice(2).toString("utf16le") : typeof Uint8Array < "u" && n instanceof Uint8Array ? typeof TextDecoder < "u" ? new TextDecoder("utf-16le").decode(n.slice(2)) : aVa(n.slice(2)) : dnr(n.slice(2)), t.type = "binary", Aar(n, t);
}

function tni(e) {
  return e.match(/[^\x00-\x7F]/) ? CM(e) : e;
}

function tot(e, t, n, r) {
  return r ? (n.type = "string", Mde.to_workbook(e, n)) : Mde.to_workbook(t, n);
}

function zz(e, t) {
  DXe();
  var n = t || {};
  if (n.codepage && typeof Rc > "u" && console.error("Codepage tables are not loaded.  Non-ASCII characters may not give expected results"), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return zz(new Uint8Array(e), (n = qu(n), n.type = "array", n));
  if (typeof Int8Array < "u" && e instanceof Int8Array) return zz(new Uint8Array(e.buffer, e.byteOffset, e.length), n);
  typeof Uint8Array < "u" && e instanceof Uint8Array && !n.type && (n.type = typeof Deno < "u" ? "buffer" : "array");
  var r = e,
    a = [0, 0, 0, 0],
    i = !1;
  if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), Hie = {}, n.dateNF && (Hie.dateNF = n.dateNF), n.type || (n.type = Uc && Buffer.isBuffer(e) ? "buffer" : "base64"), n.type == "file" && (n.type = Uc ? "buffer" : "binary", r = DVa(e), typeof Uint8Array < "u" && !Uc && (n.type = "array")), n.type == "string" && (i = !0, n.type = "binary", n.codepage = 65001, r = tni(e)), n.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var o = new ArrayBuffer(3),
      s = new Uint8Array(o);
    if (s.foo = "bar", !s.foo) return n = qu(n), n.type = "array", zz(yOt(r), n);
  }
  switch ((a = eBt(r, n))[0]) {
    case 208:
      if (a[1] === 207 && a[2] === 17 && a[3] === 224 && a[4] === 161 && a[5] === 177 && a[6] === 26 && a[7] === 225) return Xti(Ds.read(r, n), n);
      break;
    case 9:
      if (a[1] <= 8) return WXe(r, n);
      break;
    case 60:
      return Wwt(r, n);
    case 73:
      if (a[1] === 73 && a[2] === 42 && a[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (a[1] === 68) return dKa(r, n);
      break;
    case 84:
      if (a[1] === 65 && a[2] === 66 && a[3] === 76) return vrr.to_workbook(r, n);
      break;
    case 80:
      return a[1] === 75 && a[2] < 9 && a[3] < 9 ? Jti(r, n) : tot(e, r, n, i);
    case 239:
      return a[3] === 60 ? Wwt(r, n) : tot(e, r, n, i);
    case 255:
      if (a[1] === 254) return eni(r, n);
      if (a[1] === 0 && a[2] === 2 && a[3] === 0) return LQ.to_workbook(r, n);
      break;
    case 0:
      if (a[1] === 0 && (a[2] >= 2 && a[3] === 0 || a[2] === 0 && (a[3] === 8 || a[3] === 9))) return LQ.to_workbook(r, n);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return Hwt.to_workbook(r, n);
    case 123:
      if (a[1] === 92 && a[2] === 114 && a[3] === 116) return VKa(r, n);
      break;
    case 10:
    case 13:
    case 32:
      return Zti(r, n);
    case 137:
      if (a[1] === 80 && a[2] === 78 && a[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
    case 8:
      if (a[1] === 231) throw new Error("Unsupported Multiplan 1.x file!");
      break;
    case 12:
      if (a[1] === 236) throw new Error("Unsupported Multiplan 2.x file!");
      if (a[1] === 237) throw new Error("Unsupported Multiplan 3.x file!");
      break;
  }
  return cKa.indexOf(a[0]) > -1 && a[2] <= 12 && a[3] <= 31 ? Hwt.to_workbook(r, n) : tot(e, r, n, i);
}

function Jze(e, t) {
  var n = t || {};
  return n.type = "file", zz(e, n);
}

function Sar(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return _Ce(t.file, Ds.write(e, {
        type: Uc ? "buffer" : ""
      }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return Ds.write(e, t);
}

function nni(e, t) {
  switch (t.bookType) {
    case "ods":
      return gar(e, t);
    case "numbers":
      return zti(e, t);
    case "xlsb":
      return Yti(e, t);
    default:
      return kar(e, t);
  }
}

function rni(e, t) {
  var n = qu(t || {}),
    r = nni(e, n);
  return Iar(r, n);
}

function ani(e, t) {
  var n = qu(t || {}),
    r = kar(e, n);
  return Iar(r, n);
}

function Iar(e, t) {
  var n = {},
    r = Uc ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (n.compression = "DEFLATE"), t.password) n.type = r;else switch (t.type) {
    case "base64":
      n.type = "base64";
      break;
    case "binary":
      n.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    case "buffer":
    case "file":
      n.type = r;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var a = e.FullPaths ? Ds.write(e, {
    fileType: "zip",
    type: {
      nodebuffer: "buffer",
      string: "binary"
    }[n.type] || n.type,
    compression: !!t.compression
  }) : e.generate(n);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(xCe(a));
  }
  return t.password && typeof encrypt_agile < "u" ? Sar(encrypt_agile(a, t.password), t) : t.type === "file" ? _Ce(t.file, a) : t.type == "string" ? Ch(a) : a;
}

function ini(e, t) {
  var n = t || {},
    r = Zei(e, n);
  return Sar(r, n);
}

function M8(e, t, n) {
  n || (n = "");
  var r = n + e;
  switch (t.type) {
    case "base64":
      return Uze(CM(r));
    case "binary":
      return CM(r);
    case "string":
      return e;
    case "file":
      return _Ce(t.file, r, "utf8");
    case "buffer":
      return Uc ? g9(r, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(r) : M8(r, {
        type: "binary"
      }).split("").map(function (a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}

function oni(e, t) {
  switch (t.type) {
    case "base64":
      return oVa(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return _Ce(t.file, e, "binary");
    case "buffer":
      return Uc ? g9(e, "binary") : e.split("").map(function (n) {
        return n.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}

function J6e(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var n = "", r = 0; r < e.length; ++r) n += String.fromCharCode(e[r]);
      return t.type == "base64" ? Uze(n) : t.type == "string" ? Ch(n) : n;
    case "file":
      return _Ce(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}

function qXe(e, t) {
  DXe(), qrr(e);
  var n = qu(t || {});
  if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), n.type == "array") {
    n.type = "binary";
    var r = qXe(e, n);
    return n.type = "array", xCe(r);
  }
  return ani(e, n);
}

function RCe(e, t) {
  DXe(), qrr(e);
  var n = qu(t || {});
  if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), n.type == "array") {
    n.type = "binary";
    var r = RCe(e, n);
    return n.type = "array", xCe(r);
  }
  var a = 0;
  if (n.sheet && (typeof n.sheet == "number" ? a = n.sheet : a = e.SheetNames.indexOf(n.sheet), !e.SheetNames[a])) throw new Error("Sheet not found: " + n.sheet + " : " + typeof n.sheet);
  switch (n.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return M8(Wei(e, n), n);
    case "slk":
    case "sylk":
      return M8(brr.from_sheet(e.Sheets[e.SheetNames[a]], n, e), n);
    case "htm":
    case "html":
      return M8(uar(e.Sheets[e.SheetNames[a]], n), n);
    case "txt":
      return oni(Par(e.Sheets[e.SheetNames[a]], n), n);
    case "csv":
      return M8(nBt(e.Sheets[e.SheetNames[a]], n), n, "\uFEFF");
    case "dif":
      return M8(vrr.from_sheet(e.Sheets[e.SheetNames[a]], n), n);
    case "dbf":
      return J6e(Hwt.from_sheet(e.Sheets[e.SheetNames[a]], n), n);
    case "prn":
      return M8(Mde.from_sheet(e.Sheets[e.SheetNames[a]], n), n);
    case "rtf":
      return M8(HKa(e.Sheets[e.SheetNames[a]]), n);
    case "eth":
      return M8(wrr.from_sheet(e.Sheets[e.SheetNames[a]], n), n);
    case "fods":
      return M8(gar(e, n), n);
    case "wk1":
      return J6e(LQ.sheet_to_wk1(e.Sheets[e.SheetNames[a]], n), n);
    case "wk3":
      return J6e(LQ.book_to_wk3(e, n), n);
    case "biff2":
      n.biff || (n.biff = 2);
    case "biff3":
      n.biff || (n.biff = 3);
    case "biff4":
      return n.biff || (n.biff = 4), J6e(oar(e, n), n);
    case "biff5":
      n.biff || (n.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return n.biff || (n.biff = 8), ini(e, n);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return rni(e, n);
    default:
      throw new Error("Unrecognized bookType |" + n.bookType + "|");
  }
}

function tBt(e) {
  if (!e.bookType) {
    var t = {
        xls: "biff8",
        htm: "html",
        slk: "sylk",
        socialcalc: "eth",
        Sh33tJS: "WTF"
      },
      n = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    n.match(/^\.[a-z]+$/) && (e.bookType = n.slice(1)), e.bookType = t[e.bookType] || e.bookType;
  }
}

function Zze(e, t, n) {
  var r = n || {};
  return r.type = "file", r.file = t, tBt(r), RCe(e, r);
}

function Car(e, t, n) {
  var r = n || {};
  return r.type = "file", r.file = t, tBt(r), qXe(e, r);
}

function Ear(e, t, n, r) {
  var a = n || {};
  a.type = "file", a.file = e, tBt(a), a.type = "buffer";
  var i = r;
  return i instanceof Function || (i = n), T7.writeFile(e, RCe(t, a), i);
}

function Tar(e, t, n, r, a, i, o) {
  var s = Jc(n),
    l = o.defval,
    d = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"),
    u = !0,
    h = e["!data"] != null,
    p = a === 1 ? [] : {};
  if (a !== 1) if (Object.defineProperty) try {
    Object.defineProperty(p, "__rowNum__", {
      value: n,
      enumerable: !1
    });
  } catch {
    p.__rowNum__ = n;
  } else p.__rowNum__ = n;
  if (!h || e["!data"][n]) for (var m = t.s.c; m <= t.e.c; ++m) {
    var f = h ? (e["!data"][n] || [])[m] : e[r[m] + s];
    if (f == null || f.t === void 0) {
      if (l === void 0) continue;
      i[m] != null && (p[i[m]] = l);
      continue;
    }
    var y = f.v;
    switch (f.t) {
      case "z":
        if (y == null) break;
        continue;
      case "e":
        y = y == 0 ? null : void 0;
        break;
      case "s":
      case "b":
      case "n":
        if (!f.z || !k3(f.z) || (y = lj(y), typeof y == "number")) break;
      case "d":
        o && (o.UTC || o.raw === !1) || (y = xJ(new Date(y)));
        break;
      default:
        throw new Error("unrecognized type " + f.t);
    }
    if (i[m] != null) {
      if (y == null) {
        if (f.t == "e" && y === null) p[i[m]] = null;else if (l !== void 0) p[i[m]] = l;else if (d && y === null) p[i[m]] = null;else continue;
      } else p[i[m]] = (f.t === "n" && typeof o.rawNumbers == "boolean" ? o.rawNumbers : d) ? y : VP(f, y, o);
      y != null && (u = !1);
    }
  }
  return {
    row: p,
    isempty: u
  };
}

function Ywt(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var n = {
      t: "n",
      v: 0
    },
    r = 0,
    a = 1,
    i = [],
    o = 0,
    s = "",
    l = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 0
      }
    },
    d = t || {},
    u = d.range != null ? d.range : e["!ref"];
  switch (d.header === 1 ? r = 1 : d.header === "A" ? r = 2 : Array.isArray(d.header) ? r = 3 : d.header == null && (r = 0), typeof u) {
    case "string":
      l = wd(u);
      break;
    case "number":
      l = wd(e["!ref"]), l.s.r = u;
      break;
    default:
      l = u;
  }
  r > 0 && (a = 0);
  var h = Jc(l.s.r),
    p = [],
    m = [],
    f = 0,
    y = 0,
    b = e["!data"] != null,
    v = l.s.r,
    _ = 0,
    w = {};
  b && !e["!data"][v] && (e["!data"][v] = []);
  var k = d.skipHidden && e["!cols"] || [],
    A = d.skipHidden && e["!rows"] || [];
  for (_ = l.s.c; _ <= l.e.c; ++_) if (!(k[_] || {}).hidden) switch (p[_] = ic(_), n = b ? e["!data"][v][_] : e[p[_] + h], r) {
    case 1:
      i[_] = _ - l.s.c;
      break;
    case 2:
      i[_] = p[_];
      break;
    case 3:
      i[_] = d.header[_ - l.s.c];
      break;
    default:
      if (n == null && (n = {
        w: "__EMPTY",
        t: "s"
      }), s = o = VP(n, null, d), y = w[o] || 0, !y) w[o] = 1;else {
        do s = o + "_" + y++; while (w[s]);
        w[o] = y, w[s] = 1;
      }
      i[_] = s;
  }
  for (v = l.s.r + a; v <= l.e.r; ++v) if (!(A[v] || {}).hidden) {
    var S = Tar(e, l, v, p, r, i, d);
    (S.isempty === !1 || (r === 1 ? d.blankrows !== !1 : d.blankrows)) && (m[f++] = S.row);
  }
  return m.length = f, m;
}

var kon = /"/g;

function Mar(e, t, n, r, a, i, o, s, l) {
  for (var d = !0, u = [], h = "", p = Jc(n), m = e["!data"] != null, f = m && e["!data"][n] || [], y = t.s.c; y <= t.e.c; ++y) if (r[y]) {
    var b = m ? f[y] : e[r[y] + p];
    if (b == null) h = "";else if (b.v != null) {
      d = !1, h = "" + (l.rawNumbers && b.t == "n" ? b.v : VP(b, null, l));
      for (var v = 0, _ = 0; v !== h.length; ++v) if ((_ = h.charCodeAt(v)) === a || _ === i || _ === 34 || l.forceQuotes) {
        h = '"' + h.replace(kon, '""') + '"';
        break;
      }
      h == "ID" && s == 0 && u.length == 0 && (h = '"ID"');
    } else b.f != null && !b.F ? (d = !1, h = "=" + b.f, h.indexOf(",") >= 0 && (h = '"' + h.replace(kon, '""') + '"')) : h = "";
    u.push(h);
  }
  if (l.strip) for (; u[u.length - 1] === "";) --u.length;
  return l.blankrows === !1 && d ? null : u.join(o);
}

function nBt(e, t) {
  var n = [],
    r = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  for (var a = wd(e["!ref"]), i = r.FS !== void 0 ? r.FS : ",", o = i.charCodeAt(0), s = r.RS !== void 0 ? r.RS : `
`, l = s.charCodeAt(0), d = "", u = [], h = r.skipHidden && e["!cols"] || [], p = r.skipHidden && e["!rows"] || [], m = a.s.c; m <= a.e.c; ++m) (h[m] || {}).hidden || (u[m] = ic(m));
  for (var f = 0, y = a.s.r; y <= a.e.r; ++y) (p[y] || {}).hidden || (d = Mar(e, a, y, u, o, l, i, f, r), d != null && (d || r.blankrows !== !1) && n.push((f++ ? s : "") + d));
  return n.join("");
}

function Par(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var n = nBt(e, t);
  if (typeof Rc > "u" || t.type == "string") return n;
  var r = Rc.utils.encode(1200, n, "str");
  return "ÿþ" + r;
}

function sni(e, t) {
  var n = "",
    r,
    a = "";
  if (e == null || e["!ref"] == null) return [];
  var i = wd(e["!ref"]),
    o = "",
    s = [],
    l,
    d = [],
    u = e["!data"] != null;
  for (l = i.s.c; l <= i.e.c; ++l) s[l] = ic(l);
  for (var h = i.s.r; h <= i.e.r; ++h) for (o = Jc(h), l = i.s.c; l <= i.e.c; ++l) if (n = s[l] + o, r = u ? (e["!data"][h] || [])[l] : e[n], a = "", r !== void 0) {
    if (r.F != null) {
      if (n = r.F, !r.f) continue;
      a = r.f, n.indexOf(":") == -1 && (n = n + ":" + n);
    }
    if (r.f != null) a = r.f;else {
      if (t && t.values === !1) continue;
      if (r.t == "z") continue;
      if (r.t == "n" && r.v != null) a = "" + r.v;else if (r.t == "b") a = r.v ? "TRUE" : "FALSE";else if (r.w !== void 0) a = "'" + r.w;else {
        if (r.v === void 0) continue;
        r.t == "s" ? a = "'" + r.v : a = "" + r.v;
      }
    }
    d[d.length] = n + "=" + a;
  }
  return d;
}

function Rar(e, t, n) {
  var r = n || {},
    a = e ? e["!data"] != null : r.dense,
    i = +!r.skipHeader,
    o = e || {};
  !e && a && (o["!data"] = []);
  var s = 0,
    l = 0;
  if (o && r.origin != null) if (typeof r.origin == "number") s = r.origin;else {
    var d = typeof r.origin == "string" ? Eh(r.origin) : r.origin;
    s = d.r, l = d.c;
  }
  var u = {
    s: {
      c: 0,
      r: 0
    },
    e: {
      c: l,
      r: s + t.length - 1 + i
    }
  };
  if (o["!ref"]) {
    var h = wd(o["!ref"]);
    u.e.c = Math.max(u.e.c, h.e.c), u.e.r = Math.max(u.e.r, h.e.r), s == -1 && (s = h.e.r + 1, u.e.r = s + t.length - 1 + i);
  } else s == -1 && (s = 0, u.e.r = t.length - 1 + i);
  var p = r.header || [],
    m = 0,
    f = [];
  t.forEach(function (b, v) {
    a && !o["!data"][s + v + i] && (o["!data"][s + v + i] = []), a && (f = o["!data"][s + v + i]), Gm(b).forEach(function (_) {
      (m = p.indexOf(_)) == -1 && (p[m = p.length] = _);
      var w = b[_],
        k = "z",
        A = "",
        S = a ? "" : ic(l + m) + Jc(s + v + i),
        C = a ? f[l + m] : o[S];
      w && typeof w == "object" && !(w instanceof Date) ? a ? f[l + m] = w : o[S] = w : (typeof w == "number" ? k = "n" : typeof w == "boolean" ? k = "b" : typeof w == "string" ? k = "s" : w instanceof Date ? (k = "d", r.UTC || (w = OXe(w)), r.cellDates || (k = "n", w = bg(w)), A = C != null && C.z && k3(C.z) ? C.z : r.dateNF || Cs[14]) : w === null && r.nullError && (k = "e", w = 0), C ? (C.t = k, C.v = w, delete C.w, delete C.R, A && (C.z = A)) : a ? f[l + m] = C = {
        t: k,
        v: w
      } : o[S] = C = {
        t: k,
        v: w
      }, A && (C.z = A));
    });
  }), u.e.c = Math.max(u.e.c, l + p.length - 1);
  var y = Jc(s);
  if (a && !o["!data"][s] && (o["!data"][s] = []), i) for (m = 0; m < p.length; ++m) a ? o["!data"][s][m + l] = {
    t: "s",
    v: p[m]
  } : o[ic(m + l) + y] = {
    t: "s",
    v: p[m]
  };
  return o["!ref"] = Ac(u), o;
}

function lni(e, t) {
  return Rar(null, e, t);
}

function Cke(e, t, n) {
  if (typeof t == "string") {
    if (e["!data"] != null) {
      var r = Eh(t);
      return e["!data"][r.r] || (e["!data"][r.r] = []), e["!data"][r.r][r.c] || (e["!data"][r.r][r.c] = {
        t: "z"
      });
    }
    return e[t] || (e[t] = {
      t: "z"
    });
  }
  return typeof t != "number" ? Cke(e, Xc(t)) : Cke(e, ic(n || 0) + Jc(t));
}

function cni(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var n = e.SheetNames.indexOf(t);
    if (n > -1) return n;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}

function rBt(e, t) {
  var n = {
    SheetNames: [],
    Sheets: {}
  };
  return e && NCe(n, e, t || "Sheet1"), n;
}

function NCe(e, t, n, r) {
  var a = 1;
  if (!n) for (; a <= 65535 && e.SheetNames.indexOf(n = "Sheet" + a) != -1; ++a, n = void 0);
  if (!n || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (r && e.SheetNames.indexOf(n) >= 0 && n.length < 32) {
    var i = n.match(/\d+$/);
    a = i && +i[0] || 0;
    var o = i && n.slice(0, i.index) || n;
    for (++a; a <= 65535 && e.SheetNames.indexOf(n = o + a) != -1; ++a);
  }
  if (Wrr(n), e.SheetNames.indexOf(n) >= 0) throw new Error("Worksheet with name |" + n + "| already exists!");
  return e.SheetNames.push(n), e.Sheets[n] = t, n;
}

function dni(e, t, n) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var r = cni(e, t);
  switch (e.Workbook.Sheets[r] || (e.Workbook.Sheets[r] = {}), n) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + n);
  }
  e.Workbook.Sheets[r].Hidden = n;
}

function uni(e, t) {
  return e.z = t, e;
}

function Nar(e, t, n) {
  return t ? (e.l = {
    Target: t
  }, n && (e.l.Tooltip = n)) : delete e.l, e;
}

function hni(e, t, n) {
  return Nar(e, "#" + t, n);
}

function pni(e, t, n) {
  e.c || (e.c = []), e.c.push({
    t,
    a: n || "SheetJS"
  });
}

function mni(e, t, n, r) {
  for (var a = typeof t != "string" ? t : wd(t), i = typeof t == "string" ? t : Ac(t), o = a.s.r; o <= a.e.r; ++o) for (var s = a.s.c; s <= a.e.c; ++s) {
    var l = Cke(e, o, s);
    l.t = "n", l.F = i, delete l.v, o == a.s.r && s == a.s.c && (l.f = n, r && (l.D = !0));
  }
  var d = Ty(e["!ref"]);
  return d.s.r > a.s.r && (d.s.r = a.s.r), d.s.c > a.s.c && (d.s.c = a.s.c), d.e.r < a.e.r && (d.e.r = a.e.r), d.e.c < a.e.c && (d.e.c = a.e.c), e["!ref"] = Ac(d), e;
}

var jar = {
    encode_col: ic,
    encode_row: Jc,
    encode_cell: Xc,
    encode_range: Ac,
    decode_col: DOt,
    decode_row: jOt,
    split_cell: kHa,
    decode_cell: Eh,
    decode_range: Ty,
    format_cell: VP,
    sheet_new: AHa,
    sheet_add_aoa: $nr,
    sheet_add_json: Rar,
    sheet_add_dom: har,
    aoa_to_sheet: xpe,
    json_to_sheet: lni,
    table_to_sheet: par,
    table_to_book: bti,
    sheet_to_csv: nBt,
    sheet_to_txt: Par,
    sheet_to_json: Ywt,
    sheet_to_html: uar,
    sheet_to_formulae: sni,
    sheet_to_row_object_array: Ywt,
    sheet_get_cell: Cke,
    book_new: rBt,
    book_append_sheet: NCe,
    book_set_sheet_visibility: dni,
    cell_set_number_format: uni,
    cell_set_hyperlink: Nar,
    cell_set_internal_link: hni,
    cell_add_comment: pni,
    sheet_set_array_formula: mni,
    consts: {
      SHEET_VISIBLE: 0,
      SHEET_HIDDEN: 1,
      SHEET_VERY_HIDDEN: 2
    }
  },
  jCe;

function fni(e) {
  jCe = e;
}

function gni(e, t) {
  var n = jCe(),
    r = t ?? {};
  if (e == null || e["!ref"] == null) return n.push(null), n;
  for (var a = wd(e["!ref"]), i = r.FS !== void 0 ? r.FS : ",", o = i.charCodeAt(0), s = r.RS !== void 0 ? r.RS : `
`, l = s.charCodeAt(0), d = "", u = [], h = r.skipHidden && e["!cols"] || [], p = r.skipHidden && e["!rows"] || [], m = a.s.c; m <= a.e.c; ++m) (h[m] || {}).hidden || (u[m] = ic(m));
  var f = a.s.r,
    y = !1,
    b = 0;
  return n._read = function () {
    if (!y) return y = !0, n.push("\uFEFF");
    for (; f <= a.e.r;) if (++f, !(p[f - 1] || {}).hidden && (d = Mar(e, a, f - 1, u, o, l, i, b, r), d != null && (d || r.blankrows !== !1))) return n.push((b++ ? s : "") + d);
    return n.push(null);
  }, n;
}

function yni(e, t) {
  var n = jCe(),
    r = t || {},
    a = r.header != null ? r.header : lar,
    i = r.footer != null ? r.footer : car;
  n.push(a);
  var o = Ty(e["!ref"]);
  n.push(dar(e, o, r));
  var s = o.s.r,
    l = !1;
  return n._read = function () {
    if (s > o.e.r) return l || (l = !0, n.push("</table>" + i)), n.push(null);
    for (; s <= o.e.r;) {
      n.push(sar(e, o, s, r)), ++s;
      break;
    }
  }, n;
}

function bni(e, t) {
  var n = jCe({
    objectMode: !0
  });
  if (e == null || e["!ref"] == null) return n.push(null), n;
  var r = {
      t: "n",
      v: 0
    },
    a = 0,
    i = 1,
    o = [],
    s = 0,
    l = "",
    d = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 0
      }
    },
    u = t || {},
    h = u.range != null ? u.range : e["!ref"];
  switch (u.header === 1 ? a = 1 : u.header === "A" ? a = 2 : Array.isArray(u.header) && (a = 3), typeof h) {
    case "string":
      d = wd(h);
      break;
    case "number":
      d = wd(e["!ref"]), d.s.r = h;
      break;
    default:
      d = h;
  }
  a > 0 && (i = 0);
  var p = Jc(d.s.r),
    m = [],
    f = 0,
    y = e["!data"] != null,
    b = d.s.r,
    v = 0,
    _ = {};
  y && !e["!data"][b] && (e["!data"][b] = []);
  var w = u.skipHidden && e["!cols"] || [],
    k = u.skipHidden && e["!rows"] || [];
  for (v = d.s.c; v <= d.e.c; ++v) if (!(w[v] || {}).hidden) switch (m[v] = ic(v), r = y ? e["!data"][b][v] : e[m[v] + p], a) {
    case 1:
      o[v] = v - d.s.c;
      break;
    case 2:
      o[v] = m[v];
      break;
    case 3:
      o[v] = u.header[v - d.s.c];
      break;
    default:
      if (r == null && (r = {
        w: "__EMPTY",
        t: "s"
      }), l = s = VP(r, null, u), f = _[s] || 0, !f) _[s] = 1;else {
        do l = s + "_" + f++; while (_[l]);
        _[s] = f, _[l] = 1;
      }
      o[v] = l;
  }
  return b = d.s.r + i, n._read = function () {
    for (; b <= d.e.r;) if (!(k[b - 1] || {}).hidden) {
      var A = Tar(e, d, b, m, a, o, u);
      if (++b, A.isempty === !1 || (a === 1 ? u.blankrows !== !1 : u.blankrows)) {
        n.push(A.row);
        return;
      }
    }
    return n.push(null);
  }, n;
}

