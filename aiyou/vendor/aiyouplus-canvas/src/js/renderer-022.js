function $Vi() {
  if (Lhn) return tlt;
  Lhn = 1;
  var e = jf();
  e.System;
  var t = e.VbrMode,
    n = e.Float,
    r = e.ShortBlock,
    a = e.Util,
    i = e.Arrays;
  e.new_array_n, e.new_byte, e.new_double;
  var o = e.new_float,
    s = e.new_float_n,
    l = e.new_int;
  e.new_int_n;
  var d = e.assert,
    u = UVi(),
    h = Lx();
  function p() {
    var m = new u(),
      f = 2.302585092994046,
      y = 2,
      b = 16,
      v = 2,
      _ = 16,
      w = .34,
      k = 1 / (14752 * 14752) / (h.BLKSIZE / 2),
      A = .01,
      S = .8,
      C = .6,
      I = .3,
      E = 3.5,
      M = 21,
      T = .2302585093;
    function P(Le) {
      return Le;
    }
    function R(Le, Ke) {
      for (var Xe = 0, De = 0; De < h.BLKSIZE / 2; ++De) Xe += Le[De] * Ke.ATH.eql_w[De];
      return Xe *= k, Xe;
    }
    function j(Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft) {
      var We = Le.internal_flags;
      if (it < 2) m.fft_long(We, De[Ye], it, It, Ft), m.fft_short(We, Ce[He], it, It, Ft);else if (it == 2) {
        for (var Ze = h.BLKSIZE - 1; Ze >= 0; --Ze) {
          var Ge = De[Ye + 0][Ze],
            Oe = De[Ye + 1][Ze];
          De[Ye + 0][Ze] = (Ge + Oe) * a.SQRT2 * .5, De[Ye + 1][Ze] = (Ge - Oe) * a.SQRT2 * .5;
        }
        for (var st = 2; st >= 0; --st) for (var Ze = h.BLKSIZE_s - 1; Ze >= 0; --Ze) {
          var Ge = Ce[He + 0][st][Ze],
            Oe = Ce[He + 1][st][Ze];
          Ce[He + 0][st][Ze] = (Ge + Oe) * a.SQRT2 * .5, Ce[He + 1][st][Ze] = (Ge - Oe) * a.SQRT2 * .5;
        }
      }
      Ke[0] = De[Ye + 0][0], Ke[0] *= Ke[0];
      for (var Ze = h.BLKSIZE / 2 - 1; Ze >= 0; --Ze) {
        var vt = De[Ye + 0][h.BLKSIZE / 2 - Ze],
          Ht = De[Ye + 0][h.BLKSIZE / 2 + Ze];
        Ke[h.BLKSIZE / 2 - Ze] = (vt * vt + Ht * Ht) * .5;
      }
      for (var st = 2; st >= 0; --st) {
        Xe[st][0] = Ce[He + 0][st][0], Xe[st][0] *= Xe[st][0];
        for (var Ze = h.BLKSIZE_s / 2 - 1; Ze >= 0; --Ze) {
          var vt = Ce[He + 0][st][h.BLKSIZE_s / 2 - Ze],
            Ht = Ce[He + 0][st][h.BLKSIZE_s / 2 + Ze];
          Xe[st][h.BLKSIZE_s / 2 - Ze] = (vt * vt + Ht * Ht) * .5;
        }
      }
      {
        for (var nn = 0, Ze = 11; Ze < h.HBLKSIZE; Ze++) nn += Ke[Ze];
        We.tot_ener[it] = nn;
      }
      if (Le.analysis) {
        for (var Ze = 0; Ze < h.HBLKSIZE; Ze++) We.pinfo.energy[Ve][it][Ze] = We.pinfo.energy_save[it][Ze], We.pinfo.energy_save[it][Ze] = Ke[Ze];
        We.pinfo.pe[Ve][it] = We.pe[it];
      }
      Le.athaa_loudapprox == 2 && it < 2 && (We.loudness_sq[Ve][it] = We.loudness_sq_save[it], We.loudness_sq_save[it] = R(Ke, We));
    }
    var B = 8,
      F = 23,
      N = 15,
      G,
      z,
      V,
      O = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749];
    function L() {
      G = Math.pow(10, (B + 1) / 16), z = Math.pow(10, (F + 1) / 16), V = Math.pow(10, N / 10);
    }
    var D = [3.3246 * 3.3246, 3.23837 * 3.23837, 3.15437 * 3.15437, 3.00412 * 3.00412, 2.86103 * 2.86103, 2.65407 * 2.65407, 2.46209 * 2.46209, 2.284 * 2.284, 2.11879 * 2.11879, 1.96552 * 1.96552, 1.82335 * 1.82335, 1.69146 * 1.69146, 1.56911 * 1.56911, 1.46658 * 1.46658, 1.37074 * 1.37074, 1.31036 * 1.31036, 1.25264 * 1.25264, 1.20648 * 1.20648, 1.16203 * 1.16203, 1.12765 * 1.12765, 1.09428 * 1.09428, 1.0659 * 1.0659, 1.03826 * 1.03826, 1.01895 * 1.01895, 1],
      U = [1.33352 * 1.33352, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.30382 * 1.30382, 1.22321 * 1.22321, 1.14758 * 1.14758, 1],
      H = [2.35364 * 2.35364, 2.29259 * 2.29259, 2.23313 * 2.23313, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 1.49999 * 1.49999, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.11084 * 1.11084, 1.03826 * 1.03826];
    function Y(Le, Ke, Xe, De, Ye, Ce) {
      var He;
      if (Ke > Le) {
        if (Ke < Le * z) He = Ke / Le;else return Le + Ke;
      } else {
        if (Le >= Ke * z) return Le + Ke;
        He = Le / Ke;
      }
      if (d(Le >= 0), d(Ke >= 0), Le += Ke, De + 3 <= 6) {
        if (He >= G) return Le;
        var Ve = 0 | a.FAST_LOG10_X(He, 16);
        return Le * U[Ve];
      }
      var Ve = 0 | a.FAST_LOG10_X(He, 16);
      if (Ke = Ye.ATH.cb_l[Xe] * Ye.ATH.adjust, d(Ke >= 0), Le < V * Ke) {
        if (Le > Ke) {
          var it, It;
          return it = 1, Ve <= 13 && (it = H[Ve]), It = a.FAST_LOG10_X(Le / Ke, 10 / 15), Le * ((D[Ve] - it) * It + it);
        }
        return Ve > 13 ? Le : Le * H[Ve];
      }
      return Le * D[Ve];
    }
    var K = [1.33352 * 1.33352, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.30382 * 1.30382, 1.22321 * 1.22321, 1.14758 * 1.14758, 1];
    function W(Le, Ke, Xe) {
      var De;
      if (Le < 0 && (Le = 0), Ke < 0 && (Ke = 0), Le <= 0) return Ke;
      if (Ke <= 0) return Le;
      if (Ke > Le ? De = Ke / Le : De = Le / Ke, -2 <= Xe && Xe <= 2) {
        if (De >= G) return Le + Ke;
        var Ye = 0 | a.FAST_LOG10_X(De, 16);
        return (Le + Ke) * K[Ye];
      }
      return De < z ? Le + Ke : (Le < Ke && (Le = Ke), Le);
    }
    function Q(Le, Ke) {
      var Xe = Le.internal_flags;
      if (Xe.channels_out > 1) {
        for (var De = 0; De < h.SBMAX_l; De++) {
          var Ye = Xe.thm[0].l[De],
            Ce = Xe.thm[1].l[De];
          Xe.thm[0].l[De] += Ce * Ke, Xe.thm[1].l[De] += Ye * Ke;
        }
        for (var De = 0; De < h.SBMAX_s; De++) for (var He = 0; He < 3; He++) {
          var Ye = Xe.thm[0].s[De][He],
            Ce = Xe.thm[1].s[De][He];
          Xe.thm[0].s[De][He] += Ce * Ke, Xe.thm[1].s[De][He] += Ye * Ke;
        }
      }
    }
    function q(Le) {
      for (var Ke = 0; Ke < h.SBMAX_l; Ke++) if (!(Le.thm[0].l[Ke] > 1.58 * Le.thm[1].l[Ke] || Le.thm[1].l[Ke] > 1.58 * Le.thm[0].l[Ke])) {
        var Xe = Le.mld_l[Ke] * Le.en[3].l[Ke],
          De = Math.max(Le.thm[2].l[Ke], Math.min(Le.thm[3].l[Ke], Xe));
        Xe = Le.mld_l[Ke] * Le.en[2].l[Ke];
        var Ye = Math.max(Le.thm[3].l[Ke], Math.min(Le.thm[2].l[Ke], Xe));
        Le.thm[2].l[Ke] = De, Le.thm[3].l[Ke] = Ye;
      }
      for (var Ke = 0; Ke < h.SBMAX_s; Ke++) for (var Ce = 0; Ce < 3; Ce++) if (!(Le.thm[0].s[Ke][Ce] > 1.58 * Le.thm[1].s[Ke][Ce] || Le.thm[1].s[Ke][Ce] > 1.58 * Le.thm[0].s[Ke][Ce])) {
        var Xe = Le.mld_s[Ke] * Le.en[3].s[Ke][Ce],
          De = Math.max(Le.thm[2].s[Ke][Ce], Math.min(Le.thm[3].s[Ke][Ce], Xe));
        Xe = Le.mld_s[Ke] * Le.en[2].s[Ke][Ce];
        var Ye = Math.max(Le.thm[3].s[Ke][Ce], Math.min(Le.thm[2].s[Ke][Ce], Xe));
        Le.thm[2].s[Ke][Ce] = De, Le.thm[3].s[Ke][Ce] = Ye;
      }
    }
    function ne(Le, Ke, Xe) {
      var De = Ke,
        Ye = Math.pow(10, Xe);
      Ke *= 2, De *= 2;
      for (var Ce = 0; Ce < h.SBMAX_l; Ce++) {
        var He, Ve, it, It;
        if (It = Le.ATH.cb_l[Le.bm_l[Ce]] * Ye, He = Math.min(Math.max(Le.thm[0].l[Ce], It), Math.max(Le.thm[1].l[Ce], It)), Ve = Math.max(Le.thm[2].l[Ce], It), it = Math.max(Le.thm[3].l[Ce], It), He * Ke < Ve + it) {
          var Ft = He * De / (Ve + it);
          Ve *= Ft, it *= Ft, d(Ve + it > 0);
        }
        Le.thm[2].l[Ce] = Math.min(Ve, Le.thm[2].l[Ce]), Le.thm[3].l[Ce] = Math.min(it, Le.thm[3].l[Ce]);
      }
      Ye *= h.BLKSIZE_s / h.BLKSIZE;
      for (var Ce = 0; Ce < h.SBMAX_s; Ce++) for (var We = 0; We < 3; We++) {
        var He, Ve, it, It;
        if (It = Le.ATH.cb_s[Le.bm_s[Ce]] * Ye, He = Math.min(Math.max(Le.thm[0].s[Ce][We], It), Math.max(Le.thm[1].s[Ce][We], It)), Ve = Math.max(Le.thm[2].s[Ce][We], It), it = Math.max(Le.thm[3].s[Ce][We], It), He * Ke < Ve + it) {
          var Ft = He * Ke / (Ve + it);
          Ve *= Ft, it *= Ft, d(Ve + it > 0);
        }
        Le.thm[2].s[Ce][We] = Math.min(Le.thm[2].s[Ce][We], Ve), Le.thm[3].s[Ce][We] = Math.min(Le.thm[3].s[Ce][We], it);
      }
    }
    function de(Le, Ke, Xe, De, Ye) {
      var Ce,
        He,
        Ve = 0,
        it = 0;
      for (Ce = He = 0; Ce < h.SBMAX_s; ++He, ++Ce) {
        for (var It = Le.bo_s[Ce], Ft = Le.npart_s, We = It < Ft ? It : Ft; He < We;) d(Ke[He] >= 0), d(Xe[He] >= 0), Ve += Ke[He], it += Xe[He], He++;
        if (Le.en[De].s[Ce][Ye] = Ve, Le.thm[De].s[Ce][Ye] = it, He >= Ft) {
          ++Ce;
          break;
        }
        d(Ke[He] >= 0), d(Xe[He] >= 0);
        {
          var Ze = Le.PSY.bo_s_weight[Ce],
            Ge = 1 - Ze;
          Ve = Ze * Ke[He], it = Ze * Xe[He], Le.en[De].s[Ce][Ye] += Ve, Le.thm[De].s[Ce][Ye] += it, Ve = Ge * Ke[He], it = Ge * Xe[He];
        }
      }
      for (; Ce < h.SBMAX_s; ++Ce) Le.en[De].s[Ce][Ye] = 0, Le.thm[De].s[Ce][Ye] = 0;
    }
    function le(Le, Ke, Xe, De) {
      var Ye,
        Ce,
        He = 0,
        Ve = 0;
      for (Ye = Ce = 0; Ye < h.SBMAX_l; ++Ce, ++Ye) {
        for (var it = Le.bo_l[Ye], It = Le.npart_l, Ft = it < It ? it : It; Ce < Ft;) d(Ke[Ce] >= 0), d(Xe[Ce] >= 0), He += Ke[Ce], Ve += Xe[Ce], Ce++;
        if (Le.en[De].l[Ye] = He, Le.thm[De].l[Ye] = Ve, Ce >= It) {
          ++Ye;
          break;
        }
        d(Ke[Ce] >= 0), d(Xe[Ce] >= 0);
        {
          var We = Le.PSY.bo_l_weight[Ye],
            Ze = 1 - We;
          He = We * Ke[Ce], Ve = We * Xe[Ce], Le.en[De].l[Ye] += He, Le.thm[De].l[Ye] += Ve, He = Ze * Ke[Ce], Ve = Ze * Xe[Ce];
        }
      }
      for (; Ye < h.SBMAX_l; ++Ye) Le.en[De].l[Ye] = 0, Le.thm[De].l[Ye] = 0;
    }
    function J(Le, Ke, Xe, De, Ye, Ce) {
      var He = Le.internal_flags,
        Ve,
        it;
      for (it = Ve = 0; it < He.npart_s; ++it) {
        for (var It = 0, Ft = He.numlines_s[it], We = 0; We < Ft; ++We, ++Ve) {
          var Ze = Ke[Ce][Ve];
          It += Ze;
        }
        Xe[it] = It;
      }
      for (d(it == He.npart_s), d(Ve == 129), Ve = it = 0; it < He.npart_s; it++) {
        var Ge = He.s3ind_s[it][0],
          Oe = He.s3_ss[Ve++] * Xe[Ge];
        for (++Ge; Ge <= He.s3ind_s[it][1];) Oe += He.s3_ss[Ve] * Xe[Ge], ++Ve, ++Ge;
        {
          var st = v * He.nb_s1[Ye][it];
          De[it] = Math.min(Oe, st);
        }
        if (He.blocktype_old[Ye & 1] == h.SHORT_TYPE) {
          var st = _ * He.nb_s2[Ye][it],
            vt = De[it];
          De[it] = Math.min(st, vt);
        }
        He.nb_s2[Ye][it] = He.nb_s1[Ye][it], He.nb_s1[Ye][it] = Oe, d(De[it] >= 0);
      }
      for (; it <= h.CBANDS; ++it) Xe[it] = 0, De[it] = 0;
    }
    function pe(Le, Ke, Xe, De) {
      var Ye = Le.internal_flags;
      Le.short_blocks == r.short_block_coupled && !(Ke[0] != 0 && Ke[1] != 0) && (Ke[0] = Ke[1] = 0);
      for (var Ce = 0; Ce < Ye.channels_out; Ce++) De[Ce] = h.NORM_TYPE, Le.short_blocks == r.short_block_dispensed && (Ke[Ce] = 1), Le.short_blocks == r.short_block_forced && (Ke[Ce] = 0), Ke[Ce] != 0 ? (d(Ye.blocktype_old[Ce] != h.START_TYPE), Ye.blocktype_old[Ce] == h.SHORT_TYPE && (De[Ce] = h.STOP_TYPE)) : (De[Ce] = h.SHORT_TYPE, Ye.blocktype_old[Ce] == h.NORM_TYPE && (Ye.blocktype_old[Ce] = h.START_TYPE), Ye.blocktype_old[Ce] == h.STOP_TYPE && (Ye.blocktype_old[Ce] = h.SHORT_TYPE)), Xe[Ce] = Ye.blocktype_old[Ce], Ye.blocktype_old[Ce] = De[Ce];
    }
    function ce(Le, Ke, Xe) {
      return Xe >= 1 ? Le : Xe <= 0 ? Ke : Ke > 0 ? Math.pow(Le / Ke, Xe) * Ke : 0;
    }
    var we = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130];
    function X(Le, Ke) {
      for (var Xe = 309.07, De = 0; De < h.SBMAX_s - 1; De++) for (var Ye = 0; Ye < 3; Ye++) {
        var Ce = Le.thm.s[De][Ye];
        if (d(De < we.length), Ce > 0) {
          var He = Ce * Ke,
            Ve = Le.en.s[De][Ye];
          Ve > He && (Ve > He * 1e10 ? Xe += we[De] * (10 * f) : (d(He > 0), Xe += we[De] * a.FAST_LOG10(Ve / He)));
        }
      }
      return Xe;
    }
    var Z = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1];
    function re(Le, Ke) {
      for (var Xe = 281.0575, De = 0; De < h.SBMAX_l - 1; De++) {
        var Ye = Le.thm.l[De];
        if (d(De < Z.length), Ye > 0) {
          var Ce = Ye * Ke,
            He = Le.en.l[De];
          He > Ce && (He > Ce * 1e10 ? Xe += Z[De] * (10 * f) : (d(Ce > 0), Xe += Z[De] * a.FAST_LOG10(He / Ce)));
        }
      }
      return Xe;
    }
    function fe(Le, Ke, Xe, De, Ye) {
      var Ce, He;
      for (Ce = He = 0; Ce < Le.npart_l; ++Ce) {
        var Ve = 0,
          it = 0,
          It;
        for (It = 0; It < Le.numlines_l[Ce]; ++It, ++He) {
          var Ft = Ke[He];
          d(Ft >= 0), Ve += Ft, it < Ft && (it = Ft);
        }
        Xe[Ce] = Ve, De[Ce] = it, Ye[Ce] = Ve * Le.rnumlines_l[Ce], d(Le.rnumlines_l[Ce] >= 0), d(Ve >= 0), d(Xe[Ce] >= 0), d(De[Ce] >= 0), d(Ye[Ce] >= 0);
      }
    }
    function ye(Le, Ke, Xe, De) {
      var Ye = O.length - 1,
        Ce = 0,
        He = Xe[Ce] + Xe[Ce + 1];
      if (d(He >= 0), He > 0) {
        var Ve = Ke[Ce];
        Ve < Ke[Ce + 1] && (Ve = Ke[Ce + 1]), d(Le.numlines_l[Ce] + Le.numlines_l[Ce + 1] - 1 > 0), He = 20 * (Ve * 2 - He) / (He * (Le.numlines_l[Ce] + Le.numlines_l[Ce + 1] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      for (Ce = 1; Ce < Le.npart_l - 1; Ce++) if (He = Xe[Ce - 1] + Xe[Ce] + Xe[Ce + 1], d(He >= 0), He > 0) {
        var Ve = Ke[Ce - 1];
        Ve < Ke[Ce] && (Ve = Ke[Ce]), Ve < Ke[Ce + 1] && (Ve = Ke[Ce + 1]), d(Le.numlines_l[Ce - 1] + Le.numlines_l[Ce] + Le.numlines_l[Ce + 1] - 1 > 0), He = 20 * (Ve * 3 - He) / (He * (Le.numlines_l[Ce - 1] + Le.numlines_l[Ce] + Le.numlines_l[Ce + 1] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      if (d(Ce > 0), d(Ce == Le.npart_l - 1), He = Xe[Ce - 1] + Xe[Ce], d(He >= 0), He > 0) {
        var Ve = Ke[Ce - 1];
        Ve < Ke[Ce] && (Ve = Ke[Ce]), d(Le.numlines_l[Ce - 1] + Le.numlines_l[Ce] - 1 > 0), He = 20 * (Ve * 2 - He) / (He * (Le.numlines_l[Ce - 1] + Le.numlines_l[Ce] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      d(Ce == Le.npart_l - 1);
    }
    var ie = [-865163e-23 * 2, -.00851586 * 2, -674764e-23 * 2, .0209036 * 2, -336639e-22 * 2, -.0438162 * 2, -154175e-22 * 2, .0931738 * 2, -552212e-22 * 2, -.313819 * 2];
    this.L3psycho_anal_ns = function (Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It) {
      var Ft = Le.internal_flags,
        We = s([2, h.BLKSIZE]),
        Ze = s([2, 3, h.BLKSIZE_s]),
        Ge = o(h.CBANDS + 1),
        Oe = o(h.CBANDS + 1),
        st = o(h.CBANDS + 2),
        vt = l(2),
        Ht = l(2),
        nn,
        pt,
        lt,
        gt,
        Ut,
        _t,
        At,
        Yt,
        qe = s([2, 576]),
        kt,
        St = l(h.CBANDS + 2),
        hn = l(h.CBANDS + 2);
      for (i.fill(hn, 0), nn = Ft.channels_out, Le.mode == MPEGMode.JOINT_STEREO && (nn = 4), Le.VBR == t.vbr_off ? kt = Ft.ResvMax == 0 ? 0 : Ft.ResvSize / Ft.ResvMax * .5 : Le.VBR == t.vbr_rh || Le.VBR == t.vbr_mtrh || Le.VBR == t.vbr_mt ? kt = .6 : kt = 1, pt = 0; pt < Ft.channels_out; pt++) {
        var Qt = Ke[pt],
          Ot = Xe + 576 - 350 - M + 192;
        for (d(ie.length == (M - 1) / 2), gt = 0; gt < 576; gt++) {
          var ln, Pn;
          for (ln = Qt[Ot + gt + 10], Pn = 0, Ut = 0; Ut < (M - 1) / 2 - 1; Ut += 2) ln += ie[Ut] * (Qt[Ot + gt + Ut] + Qt[Ot + gt + M - Ut]), Pn += ie[Ut + 1] * (Qt[Ot + gt + Ut + 1] + Qt[Ot + gt + M - Ut - 1]);
          qe[pt][gt] = ln + Pn;
        }
        Ye[De][pt].en.assign(Ft.en[pt]), Ye[De][pt].thm.assign(Ft.thm[pt]), nn > 2 && (Ce[De][pt].en.assign(Ft.en[pt + 2]), Ce[De][pt].thm.assign(Ft.thm[pt + 2]));
      }
      for (pt = 0; pt < nn; pt++) {
        var rn,
          Yn,
          Ct = o(12),
          Cn = [0, 0, 0, 0],
          un = o(12),
          Jn = 1,
          Kn,
          en = o(h.CBANDS),
          Vn = o(h.CBANDS),
          Tt = [0, 0, 0, 0],
          Ue = o(h.HBLKSIZE),
          et = s([3, h.HBLKSIZE_s]);
        for (d(Ft.npart_s <= h.CBANDS), d(Ft.npart_l <= h.CBANDS), gt = 0; gt < 3; gt++) Ct[gt] = Ft.nsPsy.last_en_subshort[pt][gt + 6], d(Ft.nsPsy.last_en_subshort[pt][gt + 4] > 0), un[gt] = Ct[gt] / Ft.nsPsy.last_en_subshort[pt][gt + 4], Cn[0] += Ct[gt];
        if (pt == 2) for (gt = 0; gt < 576; gt++) {
          var ft, ht;
          ft = qe[0][gt], ht = qe[1][gt], qe[0][gt] = ft + ht, qe[1][gt] = ft - ht;
        }
        {
          var wt = qe[pt & 1],
            jt = 0;
          for (gt = 0; gt < 9; gt++) {
            for (var bt = jt + 64, Bt = 1; jt < bt; jt++) Bt < Math.abs(wt[jt]) && (Bt = Math.abs(wt[jt]));
            Ft.nsPsy.last_en_subshort[pt][gt] = Ct[gt + 3] = Bt, Cn[1 + gt / 3] += Bt, Bt > Ct[gt + 3 - 2] ? (d(Ct[gt + 3 - 2] > 0), Bt = Bt / Ct[gt + 3 - 2]) : Ct[gt + 3 - 2] > Bt * 10 ? (d(Bt > 0), Bt = Ct[gt + 3 - 2] / (Bt * 10)) : Bt = 0, un[gt + 3] = Bt;
          }
        }
        if (Le.analysis) {
          var wn = un[0];
          for (gt = 1; gt < 12; gt++) wn < un[gt] && (wn = un[gt]);
          Ft.pinfo.ers[De][pt] = Ft.pinfo.ers_save[pt], Ft.pinfo.ers_save[pt] = wn;
        }
        for (Kn = pt == 3 ? Ft.nsPsy.attackthre_s : Ft.nsPsy.attackthre, gt = 0; gt < 12; gt++) Tt[gt / 3] == 0 && un[gt] > Kn && (Tt[gt / 3] = gt % 3 + 1);
        for (gt = 1; gt < 4; gt++) {
          var at;
          Cn[gt - 1] > Cn[gt] ? (d(Cn[gt] > 0), at = Cn[gt - 1] / Cn[gt]) : (d(Cn[gt - 1] > 0), at = Cn[gt] / Cn[gt - 1]), at < 1.7 && (Tt[gt] = 0, gt == 1 && (Tt[0] = 0));
        }
        for (Tt[0] != 0 && Ft.nsPsy.lastAttacks[pt] != 0 && (Tt[0] = 0), (Ft.nsPsy.lastAttacks[pt] == 3 || Tt[0] + Tt[1] + Tt[2] + Tt[3] != 0) && (Jn = 0, Tt[1] != 0 && Tt[0] != 0 && (Tt[1] = 0), Tt[2] != 0 && Tt[1] != 0 && (Tt[2] = 0), Tt[3] != 0 && Tt[2] != 0 && (Tt[3] = 0)), pt < 2 ? Ht[pt] = Jn : Jn == 0 && (Ht[0] = Ht[1] = 0), it[pt] = Ft.tot_ener[pt], Yn = Ze, rn = We, j(Le, Ue, et, rn, pt & 1, Yn, pt & 1, De, pt, Ke, Xe), fe(Ft, Ue, Ge, en, Vn), ye(Ft, en, Vn, St), Yt = 0; Yt < 3; Yt++) {
          var Pt, dt;
          for (J(Le, et, Oe, st, pt, Yt), de(Ft, Oe, st, pt, Yt), At = 0; At < h.SBMAX_s; At++) {
            if (dt = Ft.thm[pt].s[At][Yt], dt *= S, Tt[Yt] >= 2 || Tt[Yt + 1] == 1) {
              var xt = Yt != 0 ? Yt - 1 : 2,
                Bt = ce(Ft.thm[pt].s[At][xt], dt, C * kt);
              dt = Math.min(dt, Bt);
            }
            if (Tt[Yt] == 1) {
              var xt = Yt != 0 ? Yt - 1 : 2,
                Bt = ce(Ft.thm[pt].s[At][xt], dt, I * kt);
              dt = Math.min(dt, Bt);
            } else if (Yt != 0 && Tt[Yt - 1] == 3 || Yt == 0 && Ft.nsPsy.lastAttacks[pt] == 3) {
              var xt = Yt != 2 ? Yt + 1 : 0,
                Bt = ce(Ft.thm[pt].s[At][xt], dt, I * kt);
              dt = Math.min(dt, Bt);
            }
            Pt = Ct[Yt * 3 + 3] + Ct[Yt * 3 + 4] + Ct[Yt * 3 + 5], Ct[Yt * 3 + 5] * 6 < Pt && (dt *= .5, Ct[Yt * 3 + 4] * 6 < Pt && (dt *= .5)), Ft.thm[pt].s[At][Yt] = dt;
          }
        }
        for (Ft.nsPsy.lastAttacks[pt] = Tt[2], _t = 0, lt = 0; lt < Ft.npart_l; lt++) {
          for (var yn = Ft.s3ind[lt][0], gn = Ge[yn] * O[St[yn]], mt = Ft.s3_ll[_t++] * gn; ++yn <= Ft.s3ind[lt][1];) gn = Ge[yn] * O[St[yn]], mt = Y(mt, Ft.s3_ll[_t++] * gn, yn, yn - lt, Ft);
          mt *= .158489319246111, Ft.blocktype_old[pt & 1] == h.SHORT_TYPE ? st[lt] = mt : st[lt] = ce(Math.min(mt, Math.min(y * Ft.nb_1[pt][lt], b * Ft.nb_2[pt][lt])), mt, kt), Ft.nb_2[pt][lt] = Ft.nb_1[pt][lt], Ft.nb_1[pt][lt] = mt;
        }
        for (; lt <= h.CBANDS; ++lt) Ge[lt] = 0, st[lt] = 0;
        le(Ft, Ge, st, pt);
      }
      if ((Le.mode == MPEGMode.STEREO || Le.mode == MPEGMode.JOINT_STEREO) && Le.interChRatio > 0 && Q(Le, Le.interChRatio), Le.mode == MPEGMode.JOINT_STEREO) {
        var Xt;
        q(Ft), Xt = Le.msfix, Math.abs(Xt) > 0 && ne(Ft, Xt, Le.ATHlower * Ft.ATH.adjust);
      }
      for (pe(Le, Ht, It, vt), pt = 0; pt < nn; pt++) {
        var Gn,
          rr = 0,
          qn,
          Dn;
        pt > 1 ? (Gn = Ve, rr = -2, qn = h.NORM_TYPE, (It[0] == h.SHORT_TYPE || It[1] == h.SHORT_TYPE) && (qn = h.SHORT_TYPE), Dn = Ce[De][pt - 2]) : (Gn = He, rr = 0, qn = It[pt], Dn = Ye[De][pt]), qn == h.SHORT_TYPE ? Gn[rr + pt] = X(Dn, Ft.masking_lower) : Gn[rr + pt] = re(Dn, Ft.masking_lower), Le.analysis && (Ft.pinfo.pe[De][pt] = Gn[rr + pt]);
      }
      return 0;
    };
    function ae(Le, Ke, Xe, De, Ye, Ce, He, Ve) {
      var it = Le.internal_flags;
      if (De < 2) m.fft_long(it, He[Ve], De, Ke, Xe);else if (De == 2) for (var It = h.BLKSIZE - 1; It >= 0; --It) {
        var Ft = He[Ve + 0][It],
          We = He[Ve + 1][It];
        He[Ve + 0][It] = (Ft + We) * a.SQRT2 * .5, He[Ve + 1][It] = (Ft - We) * a.SQRT2 * .5;
      }
      Ce[0] = He[Ve + 0][0], Ce[0] *= Ce[0];
      for (var It = h.BLKSIZE / 2 - 1; It >= 0; --It) {
        var Ze = He[Ve + 0][h.BLKSIZE / 2 - It],
          Ge = He[Ve + 0][h.BLKSIZE / 2 + It];
        Ce[h.BLKSIZE / 2 - It] = (Ze * Ze + Ge * Ge) * .5;
      }
      {
        for (var Oe = 0, It = 11; It < h.HBLKSIZE; It++) Oe += Ce[It];
        it.tot_ener[De] = Oe;
      }
      if (Le.analysis) {
        for (var It = 0; It < h.HBLKSIZE; It++) it.pinfo.energy[Ye][De][It] = it.pinfo.energy_save[De][It], it.pinfo.energy_save[De][It] = Ce[It];
        it.pinfo.pe[Ye][De] = it.pe[De];
      }
    }
    function be(Le, Ke, Xe, De, Ye, Ce, He, Ve) {
      var it = Le.internal_flags;
      if (Ye == 0 && De < 2 && m.fft_short(it, He[Ve], De, Ke, Xe), De == 2) for (var It = h.BLKSIZE_s - 1; It >= 0; --It) {
        var Ft = He[Ve + 0][Ye][It],
          We = He[Ve + 1][Ye][It];
        He[Ve + 0][Ye][It] = (Ft + We) * a.SQRT2 * .5, He[Ve + 1][Ye][It] = (Ft - We) * a.SQRT2 * .5;
      }
      Ce[Ye][0] = He[Ve + 0][Ye][0], Ce[Ye][0] *= Ce[Ye][0];
      for (var It = h.BLKSIZE_s / 2 - 1; It >= 0; --It) {
        var Ze = He[Ve + 0][Ye][h.BLKSIZE_s / 2 - It],
          Ge = He[Ve + 0][Ye][h.BLKSIZE_s / 2 + It];
        Ce[Ye][h.BLKSIZE_s / 2 - It] = (Ze * Ze + Ge * Ge) * .5;
      }
    }
    function Ee(Le, Ke, Xe, De) {
      var Ye = Le.internal_flags;
      Le.athaa_loudapprox == 2 && Xe < 2 && (Ye.loudness_sq[Ke][Xe] = Ye.loudness_sq_save[Xe], Ye.loudness_sq_save[Xe] = R(De, Ye));
    }
    var xe = [-865163e-23 * 2, -.00851586 * 2, -674764e-23 * 2, .0209036 * 2, -336639e-22 * 2, -.0438162 * 2, -154175e-22 * 2, .0931738 * 2, -552212e-22 * 2, -.313819 * 2];
    function he(Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It) {
      for (var Ft = s([2, 576]), We = Le.internal_flags, Ze = We.channels_out, Ge = Le.mode == MPEGMode.JOINT_STEREO ? 4 : Ze, Oe = 0; Oe < Ze; Oe++) {
        firbuf = Ke[Oe];
        var st = Xe + 576 - 350 - M + 192;
        d(xe.length == (M - 1) / 2);
        for (var vt = 0; vt < 576; vt++) {
          var Ht, nn;
          Ht = firbuf[st + vt + 10], nn = 0;
          for (var pt = 0; pt < (M - 1) / 2 - 1; pt += 2) Ht += xe[pt] * (firbuf[st + vt + pt] + firbuf[st + vt + M - pt]), nn += xe[pt + 1] * (firbuf[st + vt + pt + 1] + firbuf[st + vt + M - pt - 1]);
          Ft[Oe][vt] = Ht + nn;
        }
        Ye[De][Oe].en.assign(We.en[Oe]), Ye[De][Oe].thm.assign(We.thm[Oe]), Ge > 2 && (Ce[De][Oe].en.assign(We.en[Oe + 2]), Ce[De][Oe].thm.assign(We.thm[Oe + 2]));
      }
      for (var Oe = 0; Oe < Ge; Oe++) {
        var lt = o(12),
          gt = o(12),
          Ut = [0, 0, 0, 0],
          _t = Ft[Oe & 1],
          At = 0,
          Yt = Oe == 3 ? We.nsPsy.attackthre_s : We.nsPsy.attackthre,
          qe = 1;
        if (Oe == 2) for (var vt = 0, pt = 576; pt > 0; ++vt, --pt) {
          var kt = Ft[0][vt],
            St = Ft[1][vt];
          Ft[0][vt] = kt + St, Ft[1][vt] = kt - St;
        }
        for (var vt = 0; vt < 3; vt++) gt[vt] = We.nsPsy.last_en_subshort[Oe][vt + 6], d(We.nsPsy.last_en_subshort[Oe][vt + 4] > 0), lt[vt] = gt[vt] / We.nsPsy.last_en_subshort[Oe][vt + 4], Ut[0] += gt[vt];
        for (var vt = 0; vt < 9; vt++) {
          for (var hn = At + 64, Qt = 1; At < hn; At++) Qt < Math.abs(_t[At]) && (Qt = Math.abs(_t[At]));
          We.nsPsy.last_en_subshort[Oe][vt] = gt[vt + 3] = Qt, Ut[1 + vt / 3] += Qt, Qt > gt[vt + 3 - 2] ? (d(gt[vt + 3 - 2] > 0), Qt = Qt / gt[vt + 3 - 2]) : gt[vt + 3 - 2] > Qt * 10 ? (d(Qt > 0), Qt = gt[vt + 3 - 2] / (Qt * 10)) : Qt = 0, lt[vt + 3] = Qt;
        }
        for (var vt = 0; vt < 3; ++vt) {
          var Ot = gt[vt * 3 + 3] + gt[vt * 3 + 4] + gt[vt * 3 + 5],
            ln = 1;
          gt[vt * 3 + 5] * 6 < Ot && (ln *= .5, gt[vt * 3 + 4] * 6 < Ot && (ln *= .5)), Ve[Oe][vt] = ln;
        }
        if (Le.analysis) {
          for (var Pn = lt[0], vt = 1; vt < 12; vt++) Pn < lt[vt] && (Pn = lt[vt]);
          We.pinfo.ers[De][Oe] = We.pinfo.ers_save[Oe], We.pinfo.ers_save[Oe] = Pn;
        }
        for (var vt = 0; vt < 12; vt++) it[Oe][vt / 3] == 0 && lt[vt] > Yt && (it[Oe][vt / 3] = vt % 3 + 1);
        for (var vt = 1; vt < 4; vt++) {
          var rn = Ut[vt - 1],
            Yn = Ut[vt],
            Ct = Math.max(rn, Yn);
          Ct < 4e4 && rn < 1.7 * Yn && Yn < 1.7 * rn && (vt == 1 && it[Oe][0] <= it[Oe][vt] && (it[Oe][0] = 0), it[Oe][vt] = 0);
        }
        it[Oe][0] <= We.nsPsy.lastAttacks[Oe] && (it[Oe][0] = 0), (We.nsPsy.lastAttacks[Oe] == 3 || it[Oe][0] + it[Oe][1] + it[Oe][2] + it[Oe][3] != 0) && (qe = 0, it[Oe][1] != 0 && it[Oe][0] != 0 && (it[Oe][1] = 0), it[Oe][2] != 0 && it[Oe][1] != 0 && (it[Oe][2] = 0), it[Oe][3] != 0 && it[Oe][2] != 0 && (it[Oe][3] = 0)), Oe < 2 ? It[Oe] = qe : qe == 0 && (It[0] = It[1] = 0), He[Oe] = We.tot_ener[Oe];
      }
    }
    function ue(Le, Ke, Xe) {
      if (Xe == 0) for (var De = 0; De < Le.npart_s; De++) Le.nb_s2[Ke][De] = Le.nb_s1[Ke][De], Le.nb_s1[Ke][De] = 0;
    }
    function ge(Le, Ke) {
      for (var Xe = 0; Xe < Le.npart_l; Xe++) Le.nb_2[Ke][Xe] = Le.nb_1[Ke][Xe], Le.nb_1[Ke][Xe] = 0;
    }
    function _e(Le, Ke, Xe, De) {
      var Ye = O.length - 1,
        Ce = 0,
        He = Xe[Ce] + Xe[Ce + 1];
      if (d(He >= 0), He > 0) {
        var Ve = Ke[Ce];
        Ve < Ke[Ce + 1] && (Ve = Ke[Ce + 1]), d(Le.numlines_s[Ce] + Le.numlines_s[Ce + 1] - 1 > 0), He = 20 * (Ve * 2 - He) / (He * (Le.numlines_s[Ce] + Le.numlines_s[Ce + 1] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      for (Ce = 1; Ce < Le.npart_s - 1; Ce++) if (He = Xe[Ce - 1] + Xe[Ce] + Xe[Ce + 1], d(Ce + 1 < Le.npart_s), d(He >= 0), He > 0) {
        var Ve = Ke[Ce - 1];
        Ve < Ke[Ce] && (Ve = Ke[Ce]), Ve < Ke[Ce + 1] && (Ve = Ke[Ce + 1]), d(Le.numlines_s[Ce - 1] + Le.numlines_s[Ce] + Le.numlines_s[Ce + 1] - 1 > 0), He = 20 * (Ve * 3 - He) / (He * (Le.numlines_s[Ce - 1] + Le.numlines_s[Ce] + Le.numlines_s[Ce + 1] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      if (d(Ce > 0), d(Ce == Le.npart_s - 1), He = Xe[Ce - 1] + Xe[Ce], d(He >= 0), He > 0) {
        var Ve = Ke[Ce - 1];
        Ve < Ke[Ce] && (Ve = Ke[Ce]), d(Le.numlines_s[Ce - 1] + Le.numlines_s[Ce] - 1 > 0), He = 20 * (Ve * 2 - He) / (He * (Le.numlines_s[Ce - 1] + Le.numlines_s[Ce] - 1));
        var it = 0 | He;
        it > Ye && (it = Ye), De[Ce] = it;
      } else De[Ce] = 0;
      d(Ce == Le.npart_s - 1);
    }
    function ke(Le, Ke, Xe, De, Ye, Ce) {
      var He = Le.internal_flags,
        Ve = new float[h.CBANDS](),
        it = o(h.CBANDS),
        It,
        Ft,
        We,
        Ze = new int[h.CBANDS]();
      for (We = Ft = 0; We < He.npart_s; ++We) {
        var Ge = 0,
          Oe = 0,
          st = He.numlines_s[We];
        for (It = 0; It < st; ++It, ++Ft) {
          var vt = Ke[Ce][Ft];
          Ge += vt, Oe < vt && (Oe = vt);
        }
        Xe[We] = Ge, d(Ge >= 0), Ve[We] = Oe, d(st > 0), it[We] = Ge / st, d(it[We] >= 0);
      }
      for (d(We == He.npart_s), d(Ft == 129); We < h.CBANDS; ++We) Ve[We] = 0, it[We] = 0;
      for (_e(He, Ve, it, Ze), Ft = We = 0; We < He.npart_s; We++) {
        var Ht = He.s3ind_s[We][0],
          nn = He.s3ind_s[We][1],
          pt,
          lt,
          gt,
          Ut,
          _t;
        for (pt = Ze[Ht], lt = 1, Ut = He.s3_ss[Ft] * Xe[Ht] * O[Ze[Ht]], ++Ft, ++Ht; Ht <= nn;) pt += Ze[Ht], lt += 1, gt = He.s3_ss[Ft] * Xe[Ht] * O[Ze[Ht]], Ut = W(Ut, gt, Ht - We), ++Ft, ++Ht;
        pt = (1 + 2 * pt) / (2 * lt), _t = O[pt] * .5, Ut *= _t, De[We] = Ut, He.nb_s2[Ye][We] = He.nb_s1[Ye][We], He.nb_s1[Ye][We] = Ut, gt = Ve[We], gt *= He.minval_s[We], gt *= _t, De[We] > gt && (De[We] = gt), He.masking_lower > 1 && (De[We] *= He.masking_lower), De[We] > Xe[We] && (De[We] = Xe[We]), He.masking_lower < 1 && (De[We] *= He.masking_lower), d(De[We] >= 0);
      }
      for (; We < h.CBANDS; ++We) Xe[We] = 0, De[We] = 0;
    }
    function ve(Le, Ke, Xe, De, Ye) {
      var Ce = o(h.CBANDS),
        He = o(h.CBANDS),
        Ve = l(h.CBANDS + 2),
        it;
      fe(Le, Ke, Xe, Ce, He), ye(Le, Ce, He, Ve);
      var It = 0;
      for (it = 0; it < Le.npart_l; it++) {
        var Ft,
          We,
          Ze,
          Ge,
          Oe = Le.s3ind[it][0],
          st = Le.s3ind[it][1],
          vt = 0,
          Ht = 0;
        for (vt = Ve[Oe], Ht += 1, We = Le.s3_ll[It] * Xe[Oe] * O[Ve[Oe]], ++It, ++Oe; Oe <= st;) vt += Ve[Oe], Ht += 1, Ft = Le.s3_ll[It] * Xe[Oe] * O[Ve[Oe]], Ge = W(We, Ft, Oe - it), We = Ge, ++It, ++Oe;
        if (vt = (1 + 2 * vt) / (2 * Ht), Ze = O[vt] * .5, We *= Ze, Le.blocktype_old[Ye & 1] == h.SHORT_TYPE) {
          var nn = y * Le.nb_1[Ye][it];
          nn > 0 ? De[it] = Math.min(We, nn) : De[it] = Math.min(We, Xe[it] * I);
        } else {
          var pt = b * Le.nb_2[Ye][it],
            lt = y * Le.nb_1[Ye][it],
            nn;
          pt <= 0 && (pt = We), lt <= 0 && (lt = We), Le.blocktype_old[Ye & 1] == h.NORM_TYPE ? nn = Math.min(lt, pt) : nn = lt, De[it] = Math.min(We, nn);
        }
        Le.nb_2[Ye][it] = Le.nb_1[Ye][it], Le.nb_1[Ye][it] = We, Ft = Ce[it], Ft *= Le.minval_l[it], Ft *= Ze, De[it] > Ft && (De[it] = Ft), Le.masking_lower > 1 && (De[it] *= Le.masking_lower), De[it] > Xe[it] && (De[it] = Xe[it]), Le.masking_lower < 1 && (De[it] *= Le.masking_lower), d(De[it] >= 0);
      }
      for (; it < h.CBANDS; ++it) Xe[it] = 0, De[it] = 0;
    }
    function Te(Le, Ke) {
      var Xe = Le.internal_flags;
      Le.short_blocks == r.short_block_coupled && !(Ke[0] != 0 && Ke[1] != 0) && (Ke[0] = Ke[1] = 0);
      for (var De = 0; De < Xe.channels_out; De++) Le.short_blocks == r.short_block_dispensed && (Ke[De] = 1), Le.short_blocks == r.short_block_forced && (Ke[De] = 0);
    }
    function Ne(Le, Ke, Xe) {
      for (var De = Le.internal_flags, Ye = 0; Ye < De.channels_out; Ye++) {
        var Ce = h.NORM_TYPE;
        Ke[Ye] != 0 ? (d(De.blocktype_old[Ye] != h.START_TYPE), De.blocktype_old[Ye] == h.SHORT_TYPE && (Ce = h.STOP_TYPE)) : (Ce = h.SHORT_TYPE, De.blocktype_old[Ye] == h.NORM_TYPE && (De.blocktype_old[Ye] = h.START_TYPE), De.blocktype_old[Ye] == h.STOP_TYPE && (De.blocktype_old[Ye] = h.SHORT_TYPE)), Xe[Ye] = De.blocktype_old[Ye], De.blocktype_old[Ye] = Ce;
      }
    }
    function me(Le, Ke, Xe, De, Ye, Ce, He) {
      for (var Ve = Ce * 2, it = Ce > 0 ? Math.pow(10, Ye) : 1, It, Ft, We = 0; We < He; ++We) {
        var Ze = Le[2][We],
          Ge = Le[3][We],
          Oe = Ke[0][We],
          st = Ke[1][We],
          vt = Ke[2][We],
          Ht = Ke[3][We];
        if (Oe <= 1.58 * st && st <= 1.58 * Oe) {
          var nn = Xe[We] * Ge,
            pt = Xe[We] * Ze;
          Ft = Math.max(vt, Math.min(Ht, nn)), It = Math.max(Ht, Math.min(vt, pt));
        } else Ft = vt, It = Ht;
        if (Ce > 0) {
          var lt,
            gt,
            Ut = De[We] * it;
          if (lt = Math.min(Math.max(Oe, Ut), Math.max(st, Ut)), vt = Math.max(Ft, Ut), Ht = Math.max(It, Ut), gt = vt + Ht, gt > 0 && lt * Ve < gt) {
            var _t = lt * Ve / gt;
            vt *= _t, Ht *= _t, d(gt > 0);
          }
          Ft = Math.min(vt, Ft), It = Math.min(Ht, It);
        }
        Ft > Ze && (Ft = Ze), It > Ge && (It = Ge), Ke[2][We] = Ft, Ke[3][We] = It;
      }
    }
    this.L3psycho_anal_vbr = function (Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It) {
      var Ft = Le.internal_flags,
        We,
        Ze,
        Ge = o(h.HBLKSIZE),
        Oe = s([3, h.HBLKSIZE_s]),
        st = s([2, h.BLKSIZE]),
        vt = s([2, 3, h.BLKSIZE_s]),
        Ht = s([4, h.CBANDS]),
        nn = s([4, h.CBANDS]),
        pt = s([4, 3]),
        lt = .6,
        gt = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        Ut = l(2),
        _t = Le.mode == MPEGMode.JOINT_STEREO ? 4 : Ft.channels_out;
      he(Le, Ke, Xe, De, Ye, Ce, it, pt, gt, Ut), Te(Le, Ut);
      {
        for (var At = 0; At < _t; At++) {
          var Yt = At & 1;
          We = st, ae(Le, Ke, Xe, At, De, Ge, We, Yt), Ee(Le, De, At, Ge), Ut[Yt] != 0 ? ve(Ft, Ge, Ht[At], nn[At], At) : ge(Ft, At);
        }
        Ut[0] + Ut[1] == 2 && Le.mode == MPEGMode.JOINT_STEREO && me(Ht, nn, Ft.mld_cb_l, Ft.ATH.cb_l, Le.ATHlower * Ft.ATH.adjust, Le.msfix, Ft.npart_l);
        for (var At = 0; At < _t; At++) {
          var Yt = At & 1;
          Ut[Yt] != 0 && le(Ft, Ht[At], nn[At], At);
        }
      }
      {
        for (var qe = 0; qe < 3; qe++) {
          for (var At = 0; At < _t; ++At) {
            var Yt = At & 1;
            Ut[Yt] != 0 ? ue(Ft, At, qe) : (Ze = vt, be(Le, Ke, Xe, At, qe, Oe, Ze, Yt), ke(Le, Oe, Ht[At], nn[At], At, qe));
          }
          Ut[0] + Ut[1] == 0 && Le.mode == MPEGMode.JOINT_STEREO && me(Ht, nn, Ft.mld_cb_s, Ft.ATH.cb_s, Le.ATHlower * Ft.ATH.adjust, Le.msfix, Ft.npart_s);
          for (var At = 0; At < _t; ++At) {
            var Yt = At & 1;
            Ut[Yt] == 0 && de(Ft, Ht[At], nn[At], At, qe);
          }
        }
        for (var At = 0; At < _t; At++) {
          var Yt = At & 1;
          if (Ut[Yt] == 0) for (var kt = 0; kt < h.SBMAX_s; kt++) {
            for (var St = o(3), qe = 0; qe < 3; qe++) {
              var hn = Ft.thm[At].s[kt][qe];
              if (hn *= S, gt[At][qe] >= 2 || gt[At][qe + 1] == 1) {
                var Qt = qe != 0 ? qe - 1 : 2,
                  Ot = ce(Ft.thm[At].s[kt][Qt], hn, C * lt);
                hn = Math.min(hn, Ot);
              } else if (gt[At][qe] == 1) {
                var Qt = qe != 0 ? qe - 1 : 2,
                  Ot = ce(Ft.thm[At].s[kt][Qt], hn, I * lt);
                hn = Math.min(hn, Ot);
              } else if (qe != 0 && gt[At][qe - 1] == 3 || qe == 0 && Ft.nsPsy.lastAttacks[At] == 3) {
                var Qt = qe != 2 ? qe + 1 : 0,
                  Ot = ce(Ft.thm[At].s[kt][Qt], hn, I * lt);
                hn = Math.min(hn, Ot);
              }
              hn *= pt[At][qe], St[qe] = hn;
            }
            for (var qe = 0; qe < 3; qe++) Ft.thm[At].s[kt][qe] = St[qe];
          }
        }
      }
      for (var At = 0; At < _t; At++) Ft.nsPsy.lastAttacks[At] = gt[At][2];
      Ne(Le, Ut, It);
      for (var At = 0; At < _t; At++) {
        var ln, Pn, rn, Yn;
        At > 1 ? (ln = Ve, Pn = -2, rn = h.NORM_TYPE, (It[0] == h.SHORT_TYPE || It[1] == h.SHORT_TYPE) && (rn = h.SHORT_TYPE), Yn = Ce[De][At - 2]) : (ln = He, Pn = 0, rn = It[At], Yn = Ye[De][At]), rn == h.SHORT_TYPE ? ln[Pn + At] = X(Yn, Ft.masking_lower) : ln[Pn + At] = re(Yn, Ft.masking_lower), Le.analysis && (Ft.pinfo.pe[De][At] = ln[Pn + At]);
      }
      return 0;
    };
    function Ae(Le, Ke) {
      var Xe = Le,
        De;
      return Xe >= 0 ? De = -Xe * 27 : De = Xe * Ke, De <= -72 ? 0 : Math.exp(De * T);
    }
    function Fe(Le) {
      var Ke = 0,
        Xe = 0;
      {
        var De = 0,
          Ye,
          Ce;
        for (De = 0; Ae(De, Le) > 1e-20; De -= 1);
        for (Ye = De, Ce = 0; Math.abs(Ce - Ye) > 1e-12;) De = (Ce + Ye) / 2, Ae(De, Le) > 0 ? Ce = De : Ye = De;
        Ke = Ye;
      }
      {
        var De = 0,
          Ye,
          Ce;
        for (De = 0; Ae(De, Le) > 1e-20; De += 1);
        for (Ye = 0, Ce = De; Math.abs(Ce - Ye) > 1e-12;) De = (Ce + Ye) / 2, Ae(De, Le) > 0 ? Ye = De : Ce = De;
        Xe = Ce;
      }
      {
        var He = 0,
          Ve = 1e3,
          it;
        for (it = 0; it <= Ve; ++it) {
          var De = Ke + it * (Xe - Ke) / Ve,
            It = Ae(De, Le);
          He += It;
        }
        {
          var Ft = (Ve + 1) / (He * (Xe - Ke));
          return Ft;
        }
      }
    }
    function Me(Le) {
      var Ke, Xe, De, Ye;
      return Ke = Le, Ke >= 0 ? Ke *= 3 : Ke *= 1.5, Ke >= .5 && Ke <= 2.5 ? (Ye = Ke - .5, Xe = 8 * (Ye * Ye - 2 * Ye)) : Xe = 0, Ke += .474, De = 15.811389 + 7.5 * Ke - 17.5 * Math.sqrt(1 + Ke * Ke), De <= -60 ? 0 : (Ke = Math.exp((Xe + De) * T), Ke /= .6609193, Ke);
    }
    function Re(Le) {
      return Le < 0 && (Le = 0), Le = Le * .001, 13 * Math.atan(.76 * Le) + 3.5 * Math.atan(Le * Le / (7.5 * 7.5));
    }
    function $e(Le, Ke, Xe, De, Ye, Ce, He, Ve, it, It, Ft, We) {
      var Ze = o(h.CBANDS + 1),
        Ge = Ve / (We > 15 ? 2 * 576 : 384),
        Oe = l(h.HBLKSIZE),
        st;
      Ve /= it;
      var vt = 0,
        Ht = 0;
      for (st = 0; st < h.CBANDS; st++) {
        var nn, pt;
        for (nn = Re(Ve * vt), Ze[st] = Ve * vt, pt = vt; Re(Ve * pt) - nn < w && pt <= it / 2; pt++);
        for (Le[st] = pt - vt, Ht = st + 1; vt < pt;) d(vt < h.HBLKSIZE), Oe[vt++] = st;
        if (vt > it / 2) {
          vt = it / 2, ++st;
          break;
        }
      }
      d(st < h.CBANDS), Ze[st] = Ve * vt;
      for (var lt = 0; lt < We; lt++) {
        var gt, Ut, _t, At, Yt;
        _t = It[lt], At = It[lt + 1], gt = 0 | Math.floor(.5 + Ft * (_t - .5)), gt < 0 && (gt = 0), Ut = 0 | Math.floor(.5 + Ft * (At - .5)), Ut > it / 2 && (Ut = it / 2), Xe[lt] = (Oe[gt] + Oe[Ut]) / 2, Ke[lt] = Oe[Ut];
        var qe = Ge * At;
        He[lt] = (qe - Ze[Ke[lt]]) / (Ze[Ke[lt] + 1] - Ze[Ke[lt]]), He[lt] < 0 ? He[lt] = 0 : He[lt] > 1 && (He[lt] = 1), Yt = Re(Ve * It[lt] * Ft), Yt = Math.min(Yt, 15.5) / 15.5, Ce[lt] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * Yt)) - 2.5);
      }
      vt = 0;
      for (var kt = 0; kt < Ht; kt++) {
        var St = Le[kt],
          nn,
          hn;
        nn = Re(Ve * vt), hn = Re(Ve * (vt + St - 1)), De[kt] = .5 * (nn + hn), nn = Re(Ve * (vt - .5)), hn = Re(Ve * (vt + St - .5)), Ye[kt] = hn - nn, vt += St;
      }
      return Ht;
    }
    function rt(Le, Ke, Xe, De, Ye, Ce) {
      var He = s([h.CBANDS, h.CBANDS]),
        Ve,
        it = 0;
      if (Ce) for (var It = 0; It < Ke; It++) for (Ve = 0; Ve < Ke; Ve++) {
        var Ft = Me(Xe[It] - Xe[Ve]) * De[Ve];
        He[It][Ve] = Ft * Ye[It];
      } else for (Ve = 0; Ve < Ke; Ve++) for (var We = 15 + Math.min(21 / Xe[Ve], 12), Ze = Fe(We), It = 0; It < Ke; It++) {
        var Ft = Ze * Ae(Xe[It] - Xe[Ve], We) * De[Ve];
        He[It][Ve] = Ft * Ye[It];
      }
      for (var It = 0; It < Ke; It++) {
        for (Ve = 0; Ve < Ke && !(He[It][Ve] > 0); Ve++);
        for (Le[It][0] = Ve, Ve = Ke - 1; Ve > 0 && !(He[It][Ve] > 0); Ve--);
        Le[It][1] = Ve, it += Le[It][1] - Le[It][0] + 1;
      }
      for (var Ge = o(it), Oe = 0, It = 0; It < Ke; It++) for (Ve = Le[It][0]; Ve <= Le[It][1]; Ve++) Ge[Oe++] = He[It][Ve];
      return Ge;
    }
    function nt(Le) {
      var Ke = Re(Le);
      return Ke = Math.min(Ke, 15.5) / 15.5, Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * Ke)) - 2.5);
    }
    this.psymodel_init = function (Le) {
      var Ke = Le.internal_flags,
        Xe,
        De = !0,
        Ye = 13,
        Ce = 24,
        He = 0,
        Ve = 0,
        it = -8.25,
        It = -4.5,
        Ft = o(h.CBANDS),
        We = o(h.CBANDS),
        Ze = o(h.CBANDS),
        Ge = Le.out_samplerate;
      switch (Le.experimentalZ) {
        default:
        case 0:
          De = !0;
          break;
        case 1:
          De = !(Le.VBR == t.vbr_mtrh || Le.VBR == t.vbr_mt);
          break;
        case 2:
          De = !1;
          break;
        case 3:
          Ye = 8, He = -1.75, Ve = -.0125, it = -8.25, It = -2.25;
          break;
      }
      for (Ke.ms_ener_ratio_old = .25, Ke.blocktype_old[0] = Ke.blocktype_old[1] = h.NORM_TYPE, Xe = 0; Xe < 4; ++Xe) {
        for (var vt = 0; vt < h.CBANDS; ++vt) Ke.nb_1[Xe][vt] = 1e20, Ke.nb_2[Xe][vt] = 1e20, Ke.nb_s1[Xe][vt] = Ke.nb_s2[Xe][vt] = 1;
        for (var Oe = 0; Oe < h.SBMAX_l; Oe++) Ke.en[Xe].l[Oe] = 1e20, Ke.thm[Xe].l[Oe] = 1e20;
        for (var vt = 0; vt < 3; ++vt) {
          for (var Oe = 0; Oe < h.SBMAX_s; Oe++) Ke.en[Xe].s[Oe][vt] = 1e20, Ke.thm[Xe].s[Oe][vt] = 1e20;
          Ke.nsPsy.lastAttacks[Xe] = 0;
        }
        for (var vt = 0; vt < 9; vt++) Ke.nsPsy.last_en_subshort[Xe][vt] = 10;
      }
      for (Ke.loudness_sq_save[0] = Ke.loudness_sq_save[1] = 0, Ke.npart_l = $e(Ke.numlines_l, Ke.bo_l, Ke.bm_l, Ft, We, Ke.mld_l, Ke.PSY.bo_l_weight, Ge, h.BLKSIZE, Ke.scalefac_band.l, h.BLKSIZE / (2 * 576), h.SBMAX_l), d(Ke.npart_l < h.CBANDS), Xe = 0; Xe < Ke.npart_l; Xe++) {
        var st = He;
        Ft[Xe] >= Ye && (st = Ve * (Ft[Xe] - Ye) / (Ce - Ye) + He * (Ce - Ft[Xe]) / (Ce - Ye)), Ze[Xe] = Math.pow(10, st / 10), Ke.numlines_l[Xe] > 0 ? Ke.rnumlines_l[Xe] = 1 / Ke.numlines_l[Xe] : Ke.rnumlines_l[Xe] = 0;
      }
      Ke.s3_ll = rt(Ke.s3ind, Ke.npart_l, Ft, We, Ze, De);
      var vt = 0;
      for (Xe = 0; Xe < Ke.npart_l; Xe++) {
        var Ht;
        Ht = n.MAX_VALUE;
        for (var nn = 0; nn < Ke.numlines_l[Xe]; nn++, vt++) {
          var pt = Ge * vt / (1e3 * h.BLKSIZE),
            lt;
          lt = this.ATHformula(pt * 1e3, Le) - 20, lt = Math.pow(10, .1 * lt), lt *= Ke.numlines_l[Xe], Ht > lt && (Ht = lt);
        }
        Ke.ATH.cb_l[Xe] = Ht, Ht = -20 + Ft[Xe] * 20 / 10, Ht > 6 && (Ht = 100), Ht < -15 && (Ht = -15), Ht -= 8, Ke.minval_l[Xe] = Math.pow(10, Ht / 10) * Ke.numlines_l[Xe];
      }
      for (Ke.npart_s = $e(Ke.numlines_s, Ke.bo_s, Ke.bm_s, Ft, We, Ke.mld_s, Ke.PSY.bo_s_weight, Ge, h.BLKSIZE_s, Ke.scalefac_band.s, h.BLKSIZE_s / 384, h.SBMAX_s), d(Ke.npart_s < h.CBANDS), vt = 0, Xe = 0; Xe < Ke.npart_s; Xe++) {
        var Ht,
          st = it;
        Ft[Xe] >= Ye && (st = It * (Ft[Xe] - Ye) / (Ce - Ye) + it * (Ce - Ft[Xe]) / (Ce - Ye)), Ze[Xe] = Math.pow(10, st / 10), Ht = n.MAX_VALUE;
        for (var nn = 0; nn < Ke.numlines_s[Xe]; nn++, vt++) {
          var pt = Ge * vt / (1e3 * h.BLKSIZE_s),
            lt;
          lt = this.ATHformula(pt * 1e3, Le) - 20, lt = Math.pow(10, .1 * lt), lt *= Ke.numlines_s[Xe], Ht > lt && (Ht = lt);
        }
        Ke.ATH.cb_s[Xe] = Ht, Ht = -7 + Ft[Xe] * 7 / 12, Ft[Xe] > 12 && (Ht *= 1 + Math.log(1 + Ht) * 3.1), Ft[Xe] < 12 && (Ht *= 1 + Math.log(1 - Ht) * 2.3), Ht < -15 && (Ht = -15), Ht -= 8, Ke.minval_s[Xe] = Math.pow(10, Ht / 10) * Ke.numlines_s[Xe];
      }
      Ke.s3_ss = rt(Ke.s3ind_s, Ke.npart_s, Ft, We, Ze, De), L(), m.init_fft(Ke), Ke.decay = Math.exp(-1 * f / (A * Ge / 192));
      {
        var gt;
        gt = E, (Le.exp_nspsytune & 2) != 0 && (gt = 1), Math.abs(Le.msfix) > 0 && (gt = Le.msfix), Le.msfix = gt;
        for (var Ut = 0; Ut < Ke.npart_l; Ut++) Ke.s3ind[Ut][1] > Ke.npart_l - 1 && (Ke.s3ind[Ut][1] = Ke.npart_l - 1);
      }
      var _t = 576 * Ke.mode_gr / Ge;
      if (Ke.ATH.decay = Math.pow(10, -12 / 10 * _t), Ke.ATH.adjust = .01, Ke.ATH.adjustLimit = 1, d(Ke.bo_l[h.SBMAX_l - 1] <= Ke.npart_l), d(Ke.bo_s[h.SBMAX_s - 1] <= Ke.npart_s), Le.ATHtype != -1) {
        var pt,
          At = Le.out_samplerate / h.BLKSIZE,
          Yt = 0;
        for (pt = 0, Xe = 0; Xe < h.BLKSIZE / 2; ++Xe) pt += At, Ke.ATH.eql_w[Xe] = 1 / Math.pow(10, this.ATHformula(pt, Le) / 10), Yt += Ke.ATH.eql_w[Xe];
        for (Yt = 1 / Yt, Xe = h.BLKSIZE / 2; --Xe >= 0;) Ke.ATH.eql_w[Xe] *= Yt;
      }
      {
        for (var Ut = vt = 0; Ut < Ke.npart_s; ++Ut) for (Xe = 0; Xe < Ke.numlines_s[Ut]; ++Xe) ++vt;
        d(vt == 129);
        for (var Ut = vt = 0; Ut < Ke.npart_l; ++Ut) for (Xe = 0; Xe < Ke.numlines_l[Ut]; ++Xe) ++vt;
        d(vt == 513);
      }
      for (vt = 0, Xe = 0; Xe < Ke.npart_l; Xe++) {
        var pt = Ge * (vt + Ke.numlines_l[Xe] / 2) / (1 * h.BLKSIZE);
        Ke.mld_cb_l[Xe] = nt(pt), vt += Ke.numlines_l[Xe];
      }
      for (; Xe < h.CBANDS; ++Xe) Ke.mld_cb_l[Xe] = 1;
      for (vt = 0, Xe = 0; Xe < Ke.npart_s; Xe++) {
        var pt = Ge * (vt + Ke.numlines_s[Xe] / 2) / (1 * h.BLKSIZE_s);
        Ke.mld_cb_s[Xe] = nt(pt), vt += Ke.numlines_s[Xe];
      }
      for (; Xe < h.CBANDS; ++Xe) Ke.mld_cb_s[Xe] = 1;
      return 0;
    };
    function ze(Le, Ke) {
      Le < -.3 && (Le = 3410), Le /= 1e3, Le = Math.max(.1, Le);
      var Xe = 3.64 * Math.pow(Le, -.8) - 6.8 * Math.exp(-.6 * Math.pow(Le - 3.4, 2)) + 6 * Math.exp(-.15 * Math.pow(Le - 8.7, 2)) + (.6 + .04 * Ke) * .001 * Math.pow(Le, 4);
      return Xe;
    }
    this.ATHformula = function (Le, Ke) {
      var Xe;
      switch (Ke.ATHtype) {
        case 0:
          Xe = ze(Le, 9);
          break;
        case 1:
          Xe = ze(Le, -1);
          break;
        case 2:
          Xe = ze(Le, 0);
          break;
        case 3:
          Xe = ze(Le, 1) + 6;
          break;
        case 4:
          Xe = ze(Le, Ke.ATHcurve);
          break;
        default:
          Xe = ze(Le, 0);
          break;
      }
      return Xe;
    };
  }
  return tlt = p, tlt;
}

var nlt, Ohn;

function Mmr() {
  if (Ohn) return nlt;
  Ohn = 1;
  function e(t) {
    var n = t;
    this.ordinal = function () {
      return n;
    };
  }
  return e.STEREO = new e(0), e.JOINT_STEREO = new e(1), e.DUAL_CHANNEL = new e(2), e.MONO = new e(3), e.NOT_SET = new e(4), nlt = e, nlt;
}

var rlt, Bhn;

function GVi() {
  if (Bhn) return rlt;
  Bhn = 1;
  var e = Mmr();
  function t() {
    this.class_id = 0, this.num_samples = 0, this.num_channels = 0, this.in_samplerate = 0, this.out_samplerate = 0, this.scale = 0, this.scale_left = 0, this.scale_right = 0, this.analysis = !1, this.bWriteVbrTag = !1, this.decode_only = !1, this.quality = 0, this.mode = e.STEREO, this.force_ms = !1, this.free_format = !1, this.findReplayGain = !1, this.decode_on_the_fly = !1, this.write_id3tag_automatic = !1, this.brate = 0, this.compression_ratio = 0, this.copyright = 0, this.original = 0, this.extension = 0, this.emphasis = 0, this.error_protection = 0, this.strict_ISO = !1, this.disable_reservoir = !1, this.quant_comp = 0, this.quant_comp_short = 0, this.experimentalY = !1, this.experimentalZ = 0, this.exp_nspsytune = 0, this.preset = 0, this.VBR = null, this.VBR_q_frac = 0, this.VBR_q = 0, this.VBR_mean_bitrate_kbps = 0, this.VBR_min_bitrate_kbps = 0, this.VBR_max_bitrate_kbps = 0, this.VBR_hard_min = 0, this.lowpassfreq = 0, this.highpassfreq = 0, this.lowpasswidth = 0, this.highpasswidth = 0, this.maskingadjust = 0, this.maskingadjust_short = 0, this.ATHonly = !1, this.ATHshort = !1, this.noATH = !1, this.ATHtype = 0, this.ATHcurve = 0, this.ATHlower = 0, this.athaa_type = 0, this.athaa_loudapprox = 0, this.athaa_sensitivity = 0, this.short_blocks = null, this.useTemporal = !1, this.interChRatio = 0, this.msfix = 0, this.tune = !1, this.tune_value_a = 0, this.version = 0, this.encoder_delay = 0, this.encoder_padding = 0, this.framesize = 0, this.frameNum = 0, this.lame_allocated_gfp = 0, this.internal_flags = null;
  }
  return rlt = t, rlt;
}

var alt, Fhn;

function rZe() {
  if (Fhn) return alt;
  Fhn = 1;
  var e = Lx(),
    t = {};
  return t.SFBMAX = e.SBMAX_s * 3, alt = t, alt;
}

var ilt, zhn;

function Bzt() {
  if (zhn) return ilt;
  zhn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var t = e.new_float;
  e.new_float_n;
  var n = e.new_int;
  e.new_int_n, e.assert;
  var r = rZe();
  function a() {
    this.xr = t(576), this.l3_enc = n(576), this.scalefac = n(r.SFBMAX), this.xrpow_max = 0, this.part2_3_length = 0, this.big_values = 0, this.count1 = 0, this.global_gain = 0, this.scalefac_compress = 0, this.block_type = 0, this.mixed_block_flag = 0, this.table_select = n(3), this.subblock_gain = n(4), this.region0_count = 0, this.region1_count = 0, this.preflag = 0, this.scalefac_scale = 0, this.count1table_select = 0, this.part2_length = 0, this.sfb_lmax = 0, this.sfb_smin = 0, this.psy_lmax = 0, this.sfbmax = 0, this.psymax = 0, this.sfbdivide = 0, this.width = n(r.SFBMAX), this.window = n(r.SFBMAX), this.count1bits = 0, this.sfb_partition_table = null, this.slen = n(4), this.max_nonzero_coeff = 0;
    var i = this;
    function o(l) {
      return new Int32Array(l);
    }
    function s(l) {
      return new Float32Array(l);
    }
    this.assign = function (l) {
      i.xr = s(l.xr), i.l3_enc = o(l.l3_enc), i.scalefac = o(l.scalefac), i.xrpow_max = l.xrpow_max, i.part2_3_length = l.part2_3_length, i.big_values = l.big_values, i.count1 = l.count1, i.global_gain = l.global_gain, i.scalefac_compress = l.scalefac_compress, i.block_type = l.block_type, i.mixed_block_flag = l.mixed_block_flag, i.table_select = o(l.table_select), i.subblock_gain = o(l.subblock_gain), i.region0_count = l.region0_count, i.region1_count = l.region1_count, i.preflag = l.preflag, i.scalefac_scale = l.scalefac_scale, i.count1table_select = l.count1table_select, i.part2_length = l.part2_length, i.sfb_lmax = l.sfb_lmax, i.sfb_smin = l.sfb_smin, i.psy_lmax = l.psy_lmax, i.sfbmax = l.sfbmax, i.psymax = l.psymax, i.sfbdivide = l.sfbdivide, i.width = o(l.width), i.window = o(l.window), i.count1bits = l.count1bits, i.sfb_partition_table = l.sfb_partition_table.slice(0), i.slen = o(l.slen), i.max_nonzero_coeff = l.max_nonzero_coeff;
    };
  }
  return ilt = a, ilt;
}

var olt, Uhn;

function VVi() {
  if (Uhn) return olt;
  Uhn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double, e.new_float, e.new_float_n;
  var t = e.new_int;
  e.new_int_n, e.assert;
  var n = Bzt();
  function r() {
    this.tt = [[null, null], [null, null]], this.main_data_begin = 0, this.private_bits = 0, this.resvDrain_pre = 0, this.resvDrain_post = 0, this.scfsi = [t(4), t(4)];
    for (var a = 0; a < 2; a++) for (var i = 0; i < 2; i++) this.tt[a][i] = new n();
  }
  return olt = r, olt;
}

var slt, $hn;

function Pmr() {
  if ($hn) return slt;
  $hn = 1;
  var e = jf(),
    t = e.System;
  e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double, e.new_float, e.new_float_n;
  var n = e.new_int;
  e.new_int_n, e.assert;
  var r = Lx();
  function a(i, o, s, l) {
    this.l = n(1 + r.SBMAX_l), this.s = n(1 + r.SBMAX_s), this.psfb21 = n(1 + r.PSFB21), this.psfb12 = n(1 + r.PSFB12);
    var d = this.l,
      u = this.s;
    arguments.length == 4 && (this.arrL = arguments[0], this.arrS = arguments[1], this.arr21 = arguments[2], this.arr12 = arguments[3], t.arraycopy(this.arrL, 0, d, 0, Math.min(this.arrL.length, this.l.length)), t.arraycopy(this.arrS, 0, u, 0, Math.min(this.arrS.length, this.s.length)), t.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), t.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)));
  }
  return slt = a, slt;
}

var llt, Ghn;

function HVi() {
  if (Ghn) return llt;
  Ghn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var t = e.new_float,
    n = e.new_float_n,
    r = e.new_int;
  e.new_int_n, e.assert;
  var a = Lx();
  function i() {
    this.last_en_subshort = n([4, 9]), this.lastAttacks = r(4), this.pefirbuf = t(19), this.longfact = t(a.SBMAX_l), this.shortfact = t(a.SBMAX_s), this.attackthre = 0, this.attackthre_s = 0;
  }
  return llt = i, llt;
}

var clt, Vhn;

function WVi() {
  if (Vhn) return clt;
  Vhn = 1;
  function e() {
    this.sum = 0, this.seen = 0, this.want = 0, this.pos = 0, this.size = 0, this.bag = null, this.nVbrNumFrames = 0, this.nBytesWritten = 0, this.TotalFrameSize = 0;
  }
  return clt = e, clt;
}

var dlt, Hhn;

function aZe() {
  if (Hhn) return dlt;
  Hhn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n;
  var t = e.new_byte,
    n = e.new_double,
    r = e.new_float,
    a = e.new_float_n,
    i = e.new_int,
    o = e.new_int_n;
  e.assert;
  var s = VVi(),
    l = Pmr(),
    d = HVi(),
    u = WVi(),
    h = Tmr(),
    p = Lx(),
    m = rZe();
  f.MFSIZE = 3 * 1152 + p.ENCDELAY - p.MDCTDELAY, f.MAX_HEADER_BUF = 256, f.MAX_BITS_PER_CHANNEL = 4095, f.MAX_BITS_PER_GRANULE = 7680, f.BPC = 320;
  function f() {
    var y = 40;
    this.Class_ID = 0, this.lame_encode_frame_init = 0, this.iteration_init_init = 0, this.fill_buffer_resample_init = 0, this.mfbuf = a([2, f.MFSIZE]), this.mode_gr = 0, this.channels_in = 0, this.channels_out = 0, this.resample_ratio = 0, this.mf_samples_to_encode = 0, this.mf_size = 0, this.VBR_min_bitrate = 0, this.VBR_max_bitrate = 0, this.bitrate_index = 0, this.samplerate_index = 0, this.mode_ext = 0, this.lowpass1 = 0, this.lowpass2 = 0, this.highpass1 = 0, this.highpass2 = 0, this.noise_shaping = 0, this.noise_shaping_amp = 0, this.substep_shaping = 0, this.psymodel = 0, this.noise_shaping_stop = 0, this.subblock_gain = 0, this.use_best_huffman = 0, this.full_outer_loop = 0, this.l3_side = new s(), this.ms_ratio = r(2), this.padding = 0, this.frac_SpF = 0, this.slot_lag = 0, this.tag_spec = null, this.nMusicCRC = 0, this.OldValue = i(2), this.CurrentStep = i(2), this.masking_lower = 0, this.bv_scf = i(576), this.pseudohalf = i(m.SFBMAX), this.sfb21_extra = !1, this.inbuf_old = new Array(2), this.blackfilt = new Array(2 * f.BPC + 1), this.itime = n(2), this.sideinfo_len = 0, this.sb_sample = a([2, 2, 18, p.SBLIMIT]), this.amp_filter = r(32);
    function b() {
      this.write_timing = 0, this.ptr = 0, this.buf = t(y);
    }
    this.header = new Array(f.MAX_HEADER_BUF), this.h_ptr = 0, this.w_ptr = 0, this.ancillary_flag = 0, this.ResvSize = 0, this.ResvMax = 0, this.scalefac_band = new l(), this.minval_l = r(p.CBANDS), this.minval_s = r(p.CBANDS), this.nb_1 = a([4, p.CBANDS]), this.nb_2 = a([4, p.CBANDS]), this.nb_s1 = a([4, p.CBANDS]), this.nb_s2 = a([4, p.CBANDS]), this.s3_ss = null, this.s3_ll = null, this.decay = 0, this.thm = new Array(4), this.en = new Array(4), this.tot_ener = r(4), this.loudness_sq = a([2, 2]), this.loudness_sq_save = r(2), this.mld_l = r(p.SBMAX_l), this.mld_s = r(p.SBMAX_s), this.bm_l = i(p.SBMAX_l), this.bo_l = i(p.SBMAX_l), this.bm_s = i(p.SBMAX_s), this.bo_s = i(p.SBMAX_s), this.npart_l = 0, this.npart_s = 0, this.s3ind = o([p.CBANDS, 2]), this.s3ind_s = o([p.CBANDS, 2]), this.numlines_s = i(p.CBANDS), this.numlines_l = i(p.CBANDS), this.rnumlines_l = r(p.CBANDS), this.mld_cb_l = r(p.CBANDS), this.mld_cb_s = r(p.CBANDS), this.numlines_s_num1 = 0, this.numlines_l_num1 = 0, this.pe = r(4), this.ms_ratio_s_old = 0, this.ms_ratio_l_old = 0, this.ms_ener_ratio_old = 0, this.blocktype_old = i(2), this.nsPsy = new d(), this.VBR_seek_table = new u(), this.ATH = null, this.PSY = null, this.nogap_total = 0, this.nogap_current = 0, this.decode_on_the_fly = !0, this.findReplayGain = !0, this.findPeakSample = !0, this.PeakSample = 0, this.RadioGain = 0, this.AudiophileGain = 0, this.rgdata = null, this.noclipGainChange = 0, this.noclipScale = 0, this.bitrate_stereoMode_Hist = o([16, 5]), this.bitrate_blockType_Hist = o([16, 6]), this.pinfo = null, this.hip = null, this.in_buffer_nsamples = 0, this.in_buffer_0 = null, this.in_buffer_1 = null, this.iteration_loop = null;
    for (var v = 0; v < this.en.length; v++) this.en[v] = new h();
    for (var v = 0; v < this.thm.length; v++) this.thm[v] = new h();
    for (var v = 0; v < this.header.length; v++) this.header[v] = new b();
  }
  return dlt = f, dlt;
}

var ult, Whn;

function qVi() {
  if (Whn) return ult;
  Whn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var t = e.new_float;
  e.new_float_n, e.new_int, e.new_int_n, e.assert;
  var n = Lx();
  function r() {
    this.useAdjust = 0, this.aaSensitivityP = 0, this.adjust = 0, this.adjustLimit = 0, this.decay = 0, this.floor = 0, this.l = t(n.SBMAX_l), this.s = t(n.SBMAX_s), this.psfb21 = t(n.PSFB21), this.psfb12 = t(n.PSFB12), this.cb_l = t(n.CBANDS), this.cb_s = t(n.CBANDS), this.eql_w = t(n.BLKSIZE / 2);
  }
  return ult = r, ult;
}

var hlt, qhn;

function Rmr() {
  if (qhn) return hlt;
  qhn = 1;
  var e = jf(),
    t = e.System;
  e.VbrMode, e.Float, e.ShortBlock, e.Util;
  var n = e.Arrays;
  e.new_array_n, e.new_byte, e.new_double, e.new_float, e.new_float_n, e.new_int, e.new_int_n, e.assert, r.STEPS_per_dB = 100, r.MAX_dB = 120, r.GAIN_NOT_ENOUGH_SAMPLES = -24601, r.GAIN_ANALYSIS_ERROR = 0, r.GAIN_ANALYSIS_OK = 1, r.INIT_GAIN_ANALYSIS_ERROR = 0, r.INIT_GAIN_ANALYSIS_OK = 1, r.YULE_ORDER = 10, r.MAX_ORDER = r.YULE_ORDER, r.MAX_SAMP_FREQ = 48e3, r.RMS_WINDOW_TIME_NUMERATOR = 1, r.RMS_WINDOW_TIME_DENOMINATOR = 20, r.MAX_SAMPLES_PER_WINDOW = r.MAX_SAMP_FREQ * r.RMS_WINDOW_TIME_NUMERATOR / r.RMS_WINDOW_TIME_DENOMINATOR + 1;
  function r() {
    var a = 64.82;
    r.YULE_ORDER;
    var i = .95;
    r.MAX_SAMP_FREQ;
    var o = r.RMS_WINDOW_TIME_NUMERATOR,
      s = r.RMS_WINDOW_TIME_DENOMINATOR;
    r.MAX_SAMPLES_PER_WINDOW;
    var l = [[.038575994352, -3.84664617118067, -.02160367184185, 7.81501653005538, -.00123395316851, -11.34170355132042, -9291677959e-14, 13.05504219327545, -.01655260341619, -12.28759895145294, .02161526843274, 9.4829380631979, -.02074045215285, -5.87257861775999, .00594298065125, 2.75465861874613, .00306428023191, -.86984376593551, .00012025322027, .13919314567432, .00288463683916], [.0541865640643, -3.47845948550071, -.02911007808948, 6.36317777566148, -.00848709379851, -8.54751527471874, -.00851165645469, 9.4769360780128, -.00834990904936, -8.81498681370155, .02245293253339, 6.85401540936998, -.02596338512915, -4.39470996079559, .01624864962975, 2.19611684890774, -.00240879051584, -.75104302451432, .00674613682247, .13149317958808, -.00187763777362], [.15457299681924, -2.37898834973084, -.09331049056315, 2.84868151156327, -.06247880153653, -2.64577170229825, .02163541888798, 2.23697657451713, -.05588393329856, -1.67148153367602, .04781476674921, 1.00595954808547, .00222312597743, -.45953458054983, .03174092540049, .16378164858596, -.01390589421898, -.05032077717131, .00651420667831, .0234789740702, -.00881362733839], [.30296907319327, -1.61273165137247, -.22613988682123, 1.0797749225997, -.08587323730772, -.2565625775407, .03282930172664, -.1627671912044, -.00915702933434, -.22638893773906, -.02364141202522, .39120800788284, -.00584456039913, -.22138138954925, .06276101321749, .04500235387352, -828086748e-14, .02005851806501, .00205861885564, .00302439095741, -.02950134983287], [.33642304856132, -1.49858979367799, -.2557224142557, .87350271418188, -.11828570177555, .12205022308084, .11921148675203, -.80774944671438, -.07834489609479, .47854794562326, -.0046997791438, -.12453458140019, -.0058950022444, -.04067510197014, .05724228140351, .08333755284107, .00832043980773, -.04237348025746, -.0163538138454, .02977207319925, -.0176017656815], [.4491525660845, -.62820619233671, -.14351757464547, .29661783706366, -.22784394429749, -.372563729424, -.01419140100551, .00213767857124, .04078262797139, -.42029820170918, -.12398163381748, .22199650564824, .04097565135648, .00613424350682, .10478503600251, .06747620744683, -.01863887810927, .05784820375801, -.03193428438915, .03222754072173, .00541907748707], [.56619470757641, -1.04800335126349, -.75464456939302, .29156311971249, .1624213774223, -.26806001042947, .16744243493672, .00819999645858, -.18901604199609, .45054734505008, .3093178284183, -.33032403314006, -.27562961986224, .0673936833311, .00647310677246, -.04784254229033, .08647503780351, .01639907836189, -.0378898455484, .01807364323573, -.00588215443421], [.58100494960553, -.51035327095184, -.53174909058578, -.31863563325245, -.14289799034253, -.20256413484477, .17520704835522, .1472815413433, .02377945217615, .38952639978999, .15558449135573, -.23313271880868, -.25344790059353, -.05246019024463, .01628462406333, -.02505961724053, .06920467763959, .02442357316099, -.03721611395801, .01818801111503, -.00749618797172], [.53648789255105, -.2504987195602, -.42163034350696, -.43193942311114, -.00275953611929, -.03424681017675, .04267842219415, -.04678328784242, -.10214864179676, .26408300200955, .14590772289388, .15113130533216, -.02459864859345, -.17556493366449, -.11202315195388, -.18823009262115, -.04060034127, .05477720428674, .0478866554818, .0470440968812, -.02217936801134]],
      d = [[.98621192462708, -1.97223372919527, -1.97242384925416, .97261396931306, .98621192462708], [.98500175787242, -1.96977855582618, -1.97000351574484, .9702284756635, .98500175787242], [.97938932735214, -1.95835380975398, -1.95877865470428, .95920349965459, .97938932735214], [.97531843204928, -1.95002759149878, -1.95063686409857, .95124613669835, .97531843204928], [.97316523498161, -1.94561023566527, -1.94633046996323, .94705070426118, .97316523498161], [.96454515552826, -1.92783286977036, -1.92909031105652, .93034775234268, .96454515552826], [.96009142950541, -1.91858953033784, -1.92018285901082, .92177618768381, .96009142950541], [.95856916599601, -1.9154210807478, -1.91713833199203, .91885558323625, .95856916599601], [.94597685600279, -1.88903307939452, -1.89195371200558, .89487434461664, .94597685600279]];
    function u(y, b, v, _, w, k) {
      for (; w-- != 0;) v[_] = 1e-10 + y[b + 0] * k[0] - v[_ - 1] * k[1] + y[b - 1] * k[2] - v[_ - 2] * k[3] + y[b - 2] * k[4] - v[_ - 3] * k[5] + y[b - 3] * k[6] - v[_ - 4] * k[7] + y[b - 4] * k[8] - v[_ - 5] * k[9] + y[b - 5] * k[10] - v[_ - 6] * k[11] + y[b - 6] * k[12] - v[_ - 7] * k[13] + y[b - 7] * k[14] - v[_ - 8] * k[15] + y[b - 8] * k[16] - v[_ - 9] * k[17] + y[b - 9] * k[18] - v[_ - 10] * k[19] + y[b - 10] * k[20], ++_, ++b;
    }
    function h(y, b, v, _, w, k) {
      for (; w-- != 0;) v[_] = y[b + 0] * k[0] - v[_ - 1] * k[1] + y[b - 1] * k[2] - v[_ - 2] * k[3] + y[b - 2] * k[4], ++_, ++b;
    }
    function p(y, b) {
      for (var v = 0; v < MAX_ORDER; v++) y.linprebuf[v] = y.lstepbuf[v] = y.loutbuf[v] = y.rinprebuf[v] = y.rstepbuf[v] = y.routbuf[v] = 0;
      switch (0 | b) {
        case 48e3:
          y.reqindex = 0;
          break;
        case 44100:
          y.reqindex = 1;
          break;
        case 32e3:
          y.reqindex = 2;
          break;
        case 24e3:
          y.reqindex = 3;
          break;
        case 22050:
          y.reqindex = 4;
          break;
        case 16e3:
          y.reqindex = 5;
          break;
        case 12e3:
          y.reqindex = 6;
          break;
        case 11025:
          y.reqindex = 7;
          break;
        case 8e3:
          y.reqindex = 8;
          break;
        default:
          return INIT_GAIN_ANALYSIS_ERROR;
      }
      return y.sampleWindow = 0 | (b * o + s - 1) / s, y.lsum = 0, y.rsum = 0, y.totsamp = 0, n.ill(y.A, 0), INIT_GAIN_ANALYSIS_OK;
    }
    this.InitGainAnalysis = function (y, b) {
      return p(y, b) != INIT_GAIN_ANALYSIS_OK ? INIT_GAIN_ANALYSIS_ERROR : (y.linpre = MAX_ORDER, y.rinpre = MAX_ORDER, y.lstep = MAX_ORDER, y.rstep = MAX_ORDER, y.lout = MAX_ORDER, y.rout = MAX_ORDER, n.fill(y.B, 0), INIT_GAIN_ANALYSIS_OK);
    };
    function m(y) {
      return y * y;
    }
    this.AnalyzeSamples = function (y, b, v, _, w, k, A) {
      var S, C, I, E, M, T, P;
      if (k == 0) return GAIN_ANALYSIS_OK;
      switch (P = 0, M = k, A) {
        case 1:
          _ = b, w = v;
          break;
        case 2:
          break;
        default:
          return GAIN_ANALYSIS_ERROR;
      }
      for (k < MAX_ORDER ? (t.arraycopy(b, v, y.linprebuf, MAX_ORDER, k), t.arraycopy(_, w, y.rinprebuf, MAX_ORDER, k)) : (t.arraycopy(b, v, y.linprebuf, MAX_ORDER, MAX_ORDER), t.arraycopy(_, w, y.rinprebuf, MAX_ORDER, MAX_ORDER)); M > 0;) {
        T = M > y.sampleWindow - y.totsamp ? y.sampleWindow - y.totsamp : M, P < MAX_ORDER ? (S = y.linpre + P, C = y.linprebuf, I = y.rinpre + P, E = y.rinprebuf, T > MAX_ORDER - P && (T = MAX_ORDER - P)) : (S = v + P, C = b, I = w + P, E = _), u(C, S, y.lstepbuf, y.lstep + y.totsamp, T, l[y.reqindex]), u(E, I, y.rstepbuf, y.rstep + y.totsamp, T, l[y.reqindex]), h(y.lstepbuf, y.lstep + y.totsamp, y.loutbuf, y.lout + y.totsamp, T, d[y.reqindex]), h(y.rstepbuf, y.rstep + y.totsamp, y.routbuf, y.rout + y.totsamp, T, d[y.reqindex]), S = y.lout + y.totsamp, C = y.loutbuf, I = y.rout + y.totsamp, E = y.routbuf;
        for (var R = T % 8; R-- != 0;) y.lsum += m(C[S++]), y.rsum += m(E[I++]);
        for (R = T / 8; R-- != 0;) y.lsum += m(C[S + 0]) + m(C[S + 1]) + m(C[S + 2]) + m(C[S + 3]) + m(C[S + 4]) + m(C[S + 5]) + m(C[S + 6]) + m(C[S + 7]), S += 8, y.rsum += m(E[I + 0]) + m(E[I + 1]) + m(E[I + 2]) + m(E[I + 3]) + m(E[I + 4]) + m(E[I + 5]) + m(E[I + 6]) + m(E[I + 7]), I += 8;
        if (M -= T, P += T, y.totsamp += T, y.totsamp == y.sampleWindow) {
          var j = r.STEPS_per_dB * 10 * Math.log10((y.lsum + y.rsum) / y.totsamp * .5 + 1e-37),
            B = j <= 0 ? 0 : 0 | j;
          B >= y.A.length && (B = y.A.length - 1), y.A[B]++, y.lsum = y.rsum = 0, t.arraycopy(y.loutbuf, y.totsamp, y.loutbuf, 0, MAX_ORDER), t.arraycopy(y.routbuf, y.totsamp, y.routbuf, 0, MAX_ORDER), t.arraycopy(y.lstepbuf, y.totsamp, y.lstepbuf, 0, MAX_ORDER), t.arraycopy(y.rstepbuf, y.totsamp, y.rstepbuf, 0, MAX_ORDER), y.totsamp = 0;
        }
        if (y.totsamp > y.sampleWindow) return GAIN_ANALYSIS_ERROR;
      }
      return k < MAX_ORDER ? (t.arraycopy(y.linprebuf, k, y.linprebuf, 0, MAX_ORDER - k), t.arraycopy(y.rinprebuf, k, y.rinprebuf, 0, MAX_ORDER - k), t.arraycopy(b, v, y.linprebuf, MAX_ORDER - k, k), t.arraycopy(_, w, y.rinprebuf, MAX_ORDER - k, k)) : (t.arraycopy(b, v + k - MAX_ORDER, y.linprebuf, 0, MAX_ORDER), t.arraycopy(_, w + k - MAX_ORDER, y.rinprebuf, 0, MAX_ORDER)), GAIN_ANALYSIS_OK;
    };
    function f(y, b) {
      var v,
        _ = 0;
      for (v = 0; v < b; v++) _ += y[v];
      if (_ == 0) return GAIN_NOT_ENOUGH_SAMPLES;
      var w = 0 | Math.ceil(_ * (1 - i));
      for (v = b; v-- > 0 && !((w -= y[v]) <= 0););
      return a - v / r.STEPS_per_dB;
    }
    this.GetTitleGain = function (y) {
      for (var b = f(y.A, y.A.length), v = 0; v < y.A.length; v++) y.B[v] += y.A[v], y.A[v] = 0;
      for (var v = 0; v < MAX_ORDER; v++) y.linprebuf[v] = y.lstepbuf[v] = y.loutbuf[v] = y.rinprebuf[v] = y.rstepbuf[v] = y.routbuf[v] = 0;
      return y.totsamp = 0, y.lsum = y.rsum = 0, b;
    };
  }
  return hlt = r, hlt;
}

var plt, Khn;

function KVi() {
  if (Khn) return plt;
  Khn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var t = e.new_float;
  e.new_float_n;
  var n = e.new_int;
  e.new_int_n, e.assert;
  var r = Rmr();
  function a() {
    this.linprebuf = t(r.MAX_ORDER * 2), this.linpre = 0, this.lstepbuf = t(r.MAX_SAMPLES_PER_WINDOW + r.MAX_ORDER), this.lstep = 0, this.loutbuf = t(r.MAX_SAMPLES_PER_WINDOW + r.MAX_ORDER), this.lout = 0, this.rinprebuf = t(r.MAX_ORDER * 2), this.rinpre = 0, this.rstepbuf = t(r.MAX_SAMPLES_PER_WINDOW + r.MAX_ORDER), this.rstep = 0, this.routbuf = t(r.MAX_SAMPLES_PER_WINDOW + r.MAX_ORDER), this.rout = 0, this.sampleWindow = 0, this.totsamp = 0, this.lsum = 0, this.rsum = 0, this.freqindex = 0, this.first = 0, this.A = n(0 | r.STEPS_per_dB * r.MAX_dB), this.B = n(0 | r.STEPS_per_dB * r.MAX_dB);
  }
  return plt = a, plt;
}

var mlt, Qhn;

function Nmr() {
  if (Qhn) return mlt;
  Qhn = 1;
  function e(t) {
    this.bits = t;
  }
  return mlt = e, mlt;
}

var flt, Yhn;

function QVi() {
  if (Yhn) return flt;
  Yhn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var t = e.new_float;
  e.new_float_n;
  var n = e.new_int;
  e.new_int_n;
  var r = e.assert,
    a = Nmr(),
    i = Lx(),
    o = rZe(),
    s = aZe();
  function l(d) {
    var u = d;
    this.quantize = u, this.iteration_loop = function (h, p, m, f) {
      var y = h.internal_flags,
        b = t(o.SFBMAX),
        v = t(576),
        _ = n(2),
        w = 0,
        k,
        A = y.l3_side,
        S = new a(w);
      this.quantize.rv.ResvFrameBegin(h, S), w = S.bits;
      for (var C = 0; C < y.mode_gr; C++) {
        k = this.quantize.qupvt.on_pe(h, p, _, w, C, C), y.mode_ext == i.MPG_MD_MS_LR && (this.quantize.ms_convert(y.l3_side, C), this.quantize.qupvt.reduce_side(_, m[C], w, k));
        for (var I = 0; I < y.channels_out; I++) {
          var E,
            M,
            T = A.tt[C][I];
          T.block_type != i.SHORT_TYPE ? (E = 0, M = y.PSY.mask_adjust - E) : (E = 0, M = y.PSY.mask_adjust_short - E), y.masking_lower = Math.pow(10, M * .1), this.quantize.init_outer_loop(y, T), this.quantize.init_xrpow(y, T, v) && (this.quantize.qupvt.calc_xmin(h, f[C][I], T, b), this.quantize.outer_loop(h, T, b, v, I, _[I])), this.quantize.iteration_finish_one(y, C, I), r(T.part2_3_length <= s.MAX_BITS_PER_CHANNEL), r(T.part2_3_length <= _[I]);
        }
      }
      this.quantize.rv.ResvFrameEnd(y, w);
    };
  }
  return flt = l, flt;
}

var glt, Xhn;

function Fzt() {
  if (Xhn) return glt;
  Xhn = 1;
  function e(n, r, a, i) {
    this.xlen = n, this.linmax = r, this.table = a, this.hlen = i;
  }
  var t = {};
  return t.t1HB = [1, 1, 1, 0], t.t2HB = [1, 2, 1, 3, 1, 1, 3, 2, 0], t.t3HB = [3, 2, 1, 1, 1, 1, 3, 2, 0], t.t5HB = [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0], t.t6HB = [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0], t.t7HB = [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0], t.t8HB = [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0], t.t9HB = [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0], t.t10HB = [1, 2, 10, 23, 35, 30, 12, 17, 3, 3, 8, 12, 18, 21, 12, 7, 11, 9, 15, 21, 32, 40, 19, 6, 14, 13, 22, 34, 46, 23, 18, 7, 20, 19, 33, 47, 27, 22, 9, 3, 31, 22, 41, 26, 21, 20, 5, 3, 14, 13, 10, 11, 16, 6, 5, 1, 9, 8, 7, 8, 4, 4, 2, 0], t.t11HB = [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0], t.t12HB = [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0], t.t13HB = [1, 5, 14, 21, 34, 51, 46, 71, 42, 52, 68, 52, 67, 44, 43, 19, 3, 4, 12, 19, 31, 26, 44, 33, 31, 24, 32, 24, 31, 35, 22, 14, 15, 13, 23, 36, 59, 49, 77, 65, 29, 40, 30, 40, 27, 33, 42, 16, 22, 20, 37, 61, 56, 79, 73, 64, 43, 76, 56, 37, 26, 31, 25, 14, 35, 16, 60, 57, 97, 75, 114, 91, 54, 73, 55, 41, 48, 53, 23, 24, 58, 27, 50, 96, 76, 70, 93, 84, 77, 58, 79, 29, 74, 49, 41, 17, 47, 45, 78, 74, 115, 94, 90, 79, 69, 83, 71, 50, 59, 38, 36, 15, 72, 34, 56, 95, 92, 85, 91, 90, 86, 73, 77, 65, 51, 44, 43, 42, 43, 20, 30, 44, 55, 78, 72, 87, 78, 61, 46, 54, 37, 30, 20, 16, 53, 25, 41, 37, 44, 59, 54, 81, 66, 76, 57, 54, 37, 18, 39, 11, 35, 33, 31, 57, 42, 82, 72, 80, 47, 58, 55, 21, 22, 26, 38, 22, 53, 25, 23, 38, 70, 60, 51, 36, 55, 26, 34, 23, 27, 14, 9, 7, 34, 32, 28, 39, 49, 75, 30, 52, 48, 40, 52, 28, 18, 17, 9, 5, 45, 21, 34, 64, 56, 50, 49, 45, 31, 19, 12, 15, 10, 7, 6, 3, 48, 23, 20, 39, 36, 35, 53, 21, 16, 23, 13, 10, 6, 1, 4, 2, 16, 15, 17, 27, 25, 20, 29, 11, 17, 12, 16, 8, 1, 1, 0, 1], t.t15HB = [7, 12, 18, 53, 47, 76, 124, 108, 89, 123, 108, 119, 107, 81, 122, 63, 13, 5, 16, 27, 46, 36, 61, 51, 42, 70, 52, 83, 65, 41, 59, 36, 19, 17, 15, 24, 41, 34, 59, 48, 40, 64, 50, 78, 62, 80, 56, 33, 29, 28, 25, 43, 39, 63, 55, 93, 76, 59, 93, 72, 54, 75, 50, 29, 52, 22, 42, 40, 67, 57, 95, 79, 72, 57, 89, 69, 49, 66, 46, 27, 77, 37, 35, 66, 58, 52, 91, 74, 62, 48, 79, 63, 90, 62, 40, 38, 125, 32, 60, 56, 50, 92, 78, 65, 55, 87, 71, 51, 73, 51, 70, 30, 109, 53, 49, 94, 88, 75, 66, 122, 91, 73, 56, 42, 64, 44, 21, 25, 90, 43, 41, 77, 73, 63, 56, 92, 77, 66, 47, 67, 48, 53, 36, 20, 71, 34, 67, 60, 58, 49, 88, 76, 67, 106, 71, 54, 38, 39, 23, 15, 109, 53, 51, 47, 90, 82, 58, 57, 48, 72, 57, 41, 23, 27, 62, 9, 86, 42, 40, 37, 70, 64, 52, 43, 70, 55, 42, 25, 29, 18, 11, 11, 118, 68, 30, 55, 50, 46, 74, 65, 49, 39, 24, 16, 22, 13, 14, 7, 91, 44, 39, 38, 34, 63, 52, 45, 31, 52, 28, 19, 14, 8, 9, 3, 123, 60, 58, 53, 47, 43, 32, 22, 37, 24, 17, 12, 15, 10, 2, 1, 71, 37, 34, 30, 28, 20, 17, 26, 21, 16, 10, 6, 8, 6, 2, 0], t.t16HB = [1, 5, 14, 44, 74, 63, 110, 93, 172, 149, 138, 242, 225, 195, 376, 17, 3, 4, 12, 20, 35, 62, 53, 47, 83, 75, 68, 119, 201, 107, 207, 9, 15, 13, 23, 38, 67, 58, 103, 90, 161, 72, 127, 117, 110, 209, 206, 16, 45, 21, 39, 69, 64, 114, 99, 87, 158, 140, 252, 212, 199, 387, 365, 26, 75, 36, 68, 65, 115, 101, 179, 164, 155, 264, 246, 226, 395, 382, 362, 9, 66, 30, 59, 56, 102, 185, 173, 265, 142, 253, 232, 400, 388, 378, 445, 16, 111, 54, 52, 100, 184, 178, 160, 133, 257, 244, 228, 217, 385, 366, 715, 10, 98, 48, 91, 88, 165, 157, 148, 261, 248, 407, 397, 372, 380, 889, 884, 8, 85, 84, 81, 159, 156, 143, 260, 249, 427, 401, 392, 383, 727, 713, 708, 7, 154, 76, 73, 141, 131, 256, 245, 426, 406, 394, 384, 735, 359, 710, 352, 11, 139, 129, 67, 125, 247, 233, 229, 219, 393, 743, 737, 720, 885, 882, 439, 4, 243, 120, 118, 115, 227, 223, 396, 746, 742, 736, 721, 712, 706, 223, 436, 6, 202, 224, 222, 218, 216, 389, 386, 381, 364, 888, 443, 707, 440, 437, 1728, 4, 747, 211, 210, 208, 370, 379, 734, 723, 714, 1735, 883, 877, 876, 3459, 865, 2, 377, 369, 102, 187, 726, 722, 358, 711, 709, 866, 1734, 871, 3458, 870, 434, 0, 12, 10, 7, 11, 10, 17, 11, 9, 13, 12, 10, 7, 5, 3, 1, 3], t.t24HB = [15, 13, 46, 80, 146, 262, 248, 434, 426, 669, 653, 649, 621, 517, 1032, 88, 14, 12, 21, 38, 71, 130, 122, 216, 209, 198, 327, 345, 319, 297, 279, 42, 47, 22, 41, 74, 68, 128, 120, 221, 207, 194, 182, 340, 315, 295, 541, 18, 81, 39, 75, 70, 134, 125, 116, 220, 204, 190, 178, 325, 311, 293, 271, 16, 147, 72, 69, 135, 127, 118, 112, 210, 200, 188, 352, 323, 306, 285, 540, 14, 263, 66, 129, 126, 119, 114, 214, 202, 192, 180, 341, 317, 301, 281, 262, 12, 249, 123, 121, 117, 113, 215, 206, 195, 185, 347, 330, 308, 291, 272, 520, 10, 435, 115, 111, 109, 211, 203, 196, 187, 353, 332, 313, 298, 283, 531, 381, 17, 427, 212, 208, 205, 201, 193, 186, 177, 169, 320, 303, 286, 268, 514, 377, 16, 335, 199, 197, 191, 189, 181, 174, 333, 321, 305, 289, 275, 521, 379, 371, 11, 668, 184, 183, 179, 175, 344, 331, 314, 304, 290, 277, 530, 383, 373, 366, 10, 652, 346, 171, 168, 164, 318, 309, 299, 287, 276, 263, 513, 375, 368, 362, 6, 648, 322, 316, 312, 307, 302, 292, 284, 269, 261, 512, 376, 370, 364, 359, 4, 620, 300, 296, 294, 288, 282, 273, 266, 515, 380, 374, 369, 365, 361, 357, 2, 1033, 280, 278, 274, 267, 264, 259, 382, 378, 372, 367, 363, 360, 358, 356, 0, 43, 20, 19, 17, 15, 13, 11, 9, 7, 6, 4, 7, 5, 3, 1, 3], t.t32HB = [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16], t.t33HB = [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0], t.t1l = [1, 4, 3, 5], t.t2l = [1, 4, 7, 4, 5, 7, 6, 7, 8], t.t3l = [2, 3, 7, 4, 4, 7, 6, 7, 8], t.t5l = [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10], t.t6l = [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9], t.t7l = [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12], t.t8l = [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13], t.t9l = [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11], t.t10l = [1, 4, 7, 9, 10, 10, 10, 11, 4, 6, 8, 9, 10, 11, 10, 10, 7, 8, 9, 10, 11, 12, 11, 11, 8, 9, 10, 11, 12, 12, 11, 12, 9, 10, 11, 12, 12, 12, 12, 12, 10, 11, 12, 12, 13, 13, 12, 13, 9, 10, 11, 12, 12, 12, 13, 13, 10, 10, 11, 12, 12, 13, 13, 13], t.t11l = [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12], t.t12l = [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12], t.t13l = [1, 5, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 13, 13, 14, 14, 4, 6, 8, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13, 14, 14, 14, 7, 8, 9, 10, 11, 11, 12, 12, 11, 12, 12, 13, 13, 14, 15, 15, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 15, 9, 9, 11, 11, 12, 12, 13, 13, 12, 13, 13, 14, 14, 15, 15, 16, 10, 10, 11, 12, 12, 12, 13, 13, 13, 13, 14, 13, 15, 15, 16, 16, 10, 11, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 16, 16, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 16, 18, 18, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14, 15, 15, 16, 17, 17, 11, 11, 12, 12, 13, 13, 13, 15, 14, 15, 15, 16, 16, 16, 18, 17, 11, 12, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 18, 19, 12, 12, 12, 13, 14, 14, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 12, 13, 13, 14, 14, 15, 14, 15, 16, 16, 17, 17, 17, 18, 18, 18, 13, 13, 14, 15, 15, 15, 16, 16, 16, 16, 16, 17, 18, 17, 18, 18, 14, 14, 14, 15, 15, 15, 17, 16, 16, 19, 17, 17, 17, 19, 18, 18, 13, 14, 15, 16, 16, 16, 17, 16, 17, 17, 18, 18, 21, 20, 21, 18], t.t15l = [3, 5, 6, 8, 8, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 5, 5, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 6, 7, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 13, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 8, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 13, 13, 13, 14, 10, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 14, 14, 14, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 14, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 12, 12, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 14, 15, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15], t.t16_5l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 11, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 11, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 12, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 13, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 12, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 13, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 13, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 13, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 13, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 14, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 13, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 14, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 14, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 14, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 14, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 12], t.t16l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 10, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 10, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 11, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 12, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 11, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 12, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 12, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 12, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 13, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 13, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 13, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 13, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10], t.t24l = [4, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 13, 10, 5, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 12, 10, 7, 7, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 9, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 9, 10, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 9, 11, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 10, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10, 13, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 6], t.t32l = [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10], t.t33l = [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8], t.ht = [new e(0, 0, null, null), new e(2, 0, t.t1HB, t.t1l), new e(3, 0, t.t2HB, t.t2l), new e(3, 0, t.t3HB, t.t3l), new e(0, 0, null, null), new e(4, 0, t.t5HB, t.t5l), new e(4, 0, t.t6HB, t.t6l), new e(6, 0, t.t7HB, t.t7l), new e(6, 0, t.t8HB, t.t8l), new e(6, 0, t.t9HB, t.t9l), new e(8, 0, t.t10HB, t.t10l), new e(8, 0, t.t11HB, t.t11l), new e(8, 0, t.t12HB, t.t12l), new e(16, 0, t.t13HB, t.t13l), new e(0, 0, null, t.t16_5l), new e(16, 0, t.t15HB, t.t15l), new e(1, 1, t.t16HB, t.t16l), new e(2, 3, t.t16HB, t.t16l), new e(3, 7, t.t16HB, t.t16l), new e(4, 15, t.t16HB, t.t16l), new e(6, 63, t.t16HB, t.t16l), new e(8, 255, t.t16HB, t.t16l), new e(10, 1023, t.t16HB, t.t16l), new e(13, 8191, t.t16HB, t.t16l), new e(4, 15, t.t24HB, t.t24l), new e(5, 31, t.t24HB, t.t24l), new e(6, 63, t.t24HB, t.t24l), new e(7, 127, t.t24HB, t.t24l), new e(8, 255, t.t24HB, t.t24l), new e(9, 511, t.t24HB, t.t24l), new e(11, 2047, t.t24HB, t.t24l), new e(13, 8191, t.t24HB, t.t24l), new e(0, 0, t.t32HB, t.t32l), new e(0, 0, t.t33HB, t.t33l)], t.largetbl = [65540, 327685, 458759, 589832, 655369, 655370, 720906, 720907, 786443, 786444, 786444, 851980, 851980, 851980, 917517, 655370, 262149, 393222, 524295, 589832, 655369, 720906, 720906, 720907, 786443, 786443, 786444, 851980, 917516, 851980, 917516, 655370, 458759, 524295, 589832, 655369, 720905, 720906, 786442, 786443, 851979, 786443, 851979, 851980, 851980, 917516, 917517, 720905, 589832, 589832, 655369, 720905, 720906, 786442, 786442, 786443, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 786441, 655369, 655369, 720905, 720906, 786442, 786442, 851978, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 983053, 720905, 655370, 655369, 720906, 720906, 786442, 851978, 851979, 917515, 851979, 917515, 917516, 983052, 983052, 983052, 1048588, 786441, 720906, 720906, 720906, 786442, 851978, 851979, 851979, 851979, 917515, 917516, 917516, 917516, 983052, 983052, 1048589, 786441, 720907, 720906, 786442, 786442, 851979, 851979, 851979, 917515, 917516, 983052, 983052, 983052, 983052, 1114125, 1114125, 786442, 720907, 786443, 786443, 851979, 851979, 851979, 917515, 917515, 983051, 983052, 983052, 983052, 1048588, 1048589, 1048589, 786442, 786443, 786443, 786443, 851979, 851979, 917515, 917515, 983052, 983052, 983052, 983052, 1048588, 983053, 1048589, 983053, 851978, 786444, 851979, 786443, 851979, 917515, 917516, 917516, 917516, 983052, 1048588, 1048588, 1048589, 1114125, 1114125, 1048589, 786442, 851980, 851980, 851979, 851979, 917515, 917516, 983052, 1048588, 1048588, 1048588, 1048588, 1048589, 1048589, 983053, 1048589, 851978, 851980, 917516, 917516, 917516, 917516, 983052, 983052, 983052, 983052, 1114124, 1048589, 1048589, 1048589, 1048589, 1179661, 851978, 983052, 917516, 917516, 917516, 983052, 983052, 1048588, 1048588, 1048589, 1179661, 1114125, 1114125, 1114125, 1245197, 1114125, 851978, 917517, 983052, 851980, 917516, 1048588, 1048588, 983052, 1048589, 1048589, 1114125, 1179661, 1114125, 1245197, 1114125, 1048589, 851978, 655369, 655369, 655369, 720905, 720905, 786441, 786441, 786441, 851977, 851977, 851977, 851978, 851978, 851978, 851978, 655366], t.table23 = [65538, 262147, 458759, 262148, 327684, 458759, 393222, 458759, 524296], t.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369], t.bitrate_table = [[0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1], [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1], [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]], t.samplerate_table = [[22050, 24e3, 16e3, -1], [44100, 48e3, 32e3, -1], [11025, 12e3, 8e3, -1]], t.scfsi_band = [0, 6, 11, 16, 21], glt = t, glt;
}

var ylt, Jhn;

function jmr() {
  if (Jhn) return ylt;
  Jhn = 1;
  var e = Pmr(),
    t = jf();
  t.System;
  var n = t.VbrMode,
    r = t.Float;
  t.ShortBlock;
  var a = t.Util;
  t.Arrays, t.new_array_n, t.new_byte, t.new_double;
  var i = t.new_float;
  t.new_float_n;
  var o = t.new_int;
  t.new_int_n;
  var s = t.assert,
    l = Lx(),
    d = Nmr(),
    u = aZe();
  h.Q_MAX = 257, h.Q_MAX2 = 116, h.LARGE_BITS = 1e5, h.IXMAX_VAL = 8206;
  function h() {
    var p = null,
      m = null,
      f = null;
    this.setModules = function (j, B, F) {
      p = j, m = B, f = F;
    };
    function y(j) {
      return s(0 <= j + h.Q_MAX2 && j < h.Q_MAX), C[j + h.Q_MAX2];
    }
    this.IPOW20 = function (j) {
      return s(0 <= j && j < h.Q_MAX), I[j];
    };
    var b = 2220446049250313e-31,
      v = h.IXMAX_VAL,
      _ = v + 2,
      w = h.Q_MAX,
      k = h.Q_MAX2;
    h.LARGE_BITS;
    var A = 100;
    this.nr_of_sfb_block = [[[6, 5, 5, 5], [9, 9, 9, 9], [6, 9, 9, 9]], [[6, 5, 7, 3], [9, 9, 12, 6], [6, 9, 12, 6]], [[11, 10, 0, 0], [18, 18, 0, 0], [15, 18, 0, 0]], [[7, 7, 7, 0], [12, 12, 12, 0], [6, 15, 12, 0]], [[6, 6, 6, 3], [12, 9, 9, 6], [6, 12, 9, 6]], [[8, 8, 5, 0], [15, 12, 9, 0], [6, 18, 9, 0]]];
    var S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
    this.pretab = S, this.sfBandIndex = [new e([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0 / 3, 12 / 3, 24 / 3, 36 / 3, 54 / 3, 78 / 3, 108 / 3, 144 / 3, 186 / 3, 240 / 3, 312 / 3, 402 / 3, 522 / 3, 576 / 3], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0 / 3, 12 / 3, 24 / 3, 36 / 3, 54 / 3, 78 / 3, 108 / 3, 144 / 3, 186 / 3, 240 / 3, 312 / 3, 402 / 3, 522 / 3, 576 / 3], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new e([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0 / 3, 24 / 3, 48 / 3, 72 / 3, 108 / 3, 156 / 3, 216 / 3, 288 / 3, 372 / 3, 480 / 3, 486 / 3, 492 / 3, 498 / 3, 576 / 3], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
    var C = i(w + k + 1),
      I = i(w),
      E = i(_),
      M = i(_);
    this.adj43 = M;
    function T(j, B) {
      var F = f.ATHformula(B, j);
      return F -= A, F = Math.pow(10, F / 10 + j.ATHlower), F;
    }
    function P(j) {
      for (var B = j.internal_flags.ATH.l, F = j.internal_flags.ATH.psfb21, N = j.internal_flags.ATH.s, G = j.internal_flags.ATH.psfb12, z = j.internal_flags, V = j.out_samplerate, O = 0; O < l.SBMAX_l; O++) {
        var L = z.scalefac_band.l[O],
          D = z.scalefac_band.l[O + 1];
        B[O] = r.MAX_VALUE;
        for (var U = L; U < D; U++) {
          var H = U * V / 1152,
            Y = T(j, H);
          B[O] = Math.min(B[O], Y);
        }
      }
      for (var O = 0; O < l.PSFB21; O++) {
        var L = z.scalefac_band.psfb21[O],
          D = z.scalefac_band.psfb21[O + 1];
        F[O] = r.MAX_VALUE;
        for (var U = L; U < D; U++) {
          var H = U * V / 1152,
            Y = T(j, H);
          F[O] = Math.min(F[O], Y);
        }
      }
      for (var O = 0; O < l.SBMAX_s; O++) {
        var L = z.scalefac_band.s[O],
          D = z.scalefac_band.s[O + 1];
        N[O] = r.MAX_VALUE;
        for (var U = L; U < D; U++) {
          var H = U * V / 384,
            Y = T(j, H);
          N[O] = Math.min(N[O], Y);
        }
        N[O] *= z.scalefac_band.s[O + 1] - z.scalefac_band.s[O];
      }
      for (var O = 0; O < l.PSFB12; O++) {
        var L = z.scalefac_band.psfb12[O],
          D = z.scalefac_band.psfb12[O + 1];
        G[O] = r.MAX_VALUE;
        for (var U = L; U < D; U++) {
          var H = U * V / 384,
            Y = T(j, H);
          G[O] = Math.min(G[O], Y);
        }
        G[O] *= z.scalefac_band.s[13] - z.scalefac_band.s[12];
      }
      if (j.noATH) {
        for (var O = 0; O < l.SBMAX_l; O++) B[O] = 1e-20;
        for (var O = 0; O < l.PSFB21; O++) F[O] = 1e-20;
        for (var O = 0; O < l.SBMAX_s; O++) N[O] = 1e-20;
        for (var O = 0; O < l.PSFB12; O++) G[O] = 1e-20;
      }
      z.ATH.floor = 10 * Math.log10(T(j, -1));
    }
    this.iteration_init = function (j) {
      var B = j.internal_flags,
        F = B.l3_side,
        N;
      if (B.iteration_init_init == 0) {
        for (B.iteration_init_init = 1, F.main_data_begin = 0, P(j), E[0] = 0, N = 1; N < _; N++) E[N] = Math.pow(N, 4 / 3);
        for (N = 0; N < _ - 1; N++) M[N] = N + 1 - Math.pow(.5 * (E[N] + E[N + 1]), .75);
        for (M[N] = .5, N = 0; N < w; N++) I[N] = Math.pow(2, (N - 210) * -.1875);
        for (N = 0; N <= w + k; N++) C[N] = Math.pow(2, (N - 210 - k) * .25);
        p.huffman_init(B);
        {
          var G, z, V, O;
          for (N = j.exp_nspsytune >> 2 & 63, N >= 32 && (N -= 64), G = Math.pow(10, N / 4 / 10), N = j.exp_nspsytune >> 8 & 63, N >= 32 && (N -= 64), z = Math.pow(10, N / 4 / 10), N = j.exp_nspsytune >> 14 & 63, N >= 32 && (N -= 64), V = Math.pow(10, N / 4 / 10), N = j.exp_nspsytune >> 20 & 63, N >= 32 && (N -= 64), O = V * Math.pow(10, N / 4 / 10), N = 0; N < l.SBMAX_l; N++) {
            var L;
            N <= 6 ? L = G : N <= 13 ? L = z : N <= 20 ? L = V : L = O, B.nsPsy.longfact[N] = L;
          }
          for (N = 0; N < l.SBMAX_s; N++) {
            var L;
            N <= 5 ? L = G : N <= 10 ? L = z : N <= 11 ? L = V : L = O, B.nsPsy.shortfact[N] = L;
          }
        }
      }
    }, this.on_pe = function (j, B, F, N, G, z) {
      var V = j.internal_flags,
        O = 0,
        L,
        D = o(2),
        U,
        H = new d(O),
        Y = m.ResvMaxBits(j, N, H, z);
      O = H.bits;
      var K = O + Y;
      for (K > u.MAX_BITS_PER_GRANULE && (K = u.MAX_BITS_PER_GRANULE), L = 0, U = 0; U < V.channels_out; ++U) F[U] = Math.min(u.MAX_BITS_PER_CHANNEL, O / V.channels_out), D[U] = 0 | F[U] * B[G][U] / 700 - F[U], D[U] > N * 3 / 4 && (D[U] = N * 3 / 4), D[U] < 0 && (D[U] = 0), D[U] + F[U] > u.MAX_BITS_PER_CHANNEL && (D[U] = Math.max(0, u.MAX_BITS_PER_CHANNEL - F[U])), L += D[U];
      if (L > Y) for (U = 0; U < V.channels_out; ++U) D[U] = Y * D[U] / L;
      for (U = 0; U < V.channels_out; ++U) F[U] += D[U], Y -= D[U];
      for (L = 0, U = 0; U < V.channels_out; ++U) L += F[U];
      if (L > u.MAX_BITS_PER_GRANULE) {
        var W = 0;
        for (U = 0; U < V.channels_out; ++U) F[U] *= u.MAX_BITS_PER_GRANULE, F[U] /= L, W += F[U];
        s(W <= u.MAX_BITS_PER_GRANULE);
      }
      return K;
    }, this.reduce_side = function (j, B, F, N) {
      s(N <= u.MAX_BITS_PER_GRANULE), s(j[0] + j[1] <= u.MAX_BITS_PER_GRANULE);
      var G = .33 * (.5 - B) / .5;
      G < 0 && (G = 0), G > .5 && (G = .5);
      var z = 0 | G * .5 * (j[0] + j[1]);
      z > u.MAX_BITS_PER_CHANNEL - j[0] && (z = u.MAX_BITS_PER_CHANNEL - j[0]), z < 0 && (z = 0), j[1] >= 125 && (j[1] - z > 125 ? (j[0] < F && (j[0] += z), j[1] -= z) : (j[0] += j[1] - 125, j[1] = 125)), z = j[0] + j[1], z > N && (j[0] = N * j[0] / z, j[1] = N * j[1] / z), s(j[0] <= u.MAX_BITS_PER_CHANNEL), s(j[1] <= u.MAX_BITS_PER_CHANNEL), s(j[0] + j[1] <= u.MAX_BITS_PER_GRANULE);
    }, this.athAdjust = function (j, B, F) {
      var N = 90.30873362,
        G = 94.82444863,
        z = a.FAST_LOG10_X(B, 10),
        V = j * j,
        O = 0;
      return z -= F, V > 1e-20 && (O = 1 + a.FAST_LOG10_X(V, 10 / N)), O < 0 && (O = 0), z *= O, z += F + N - G, Math.pow(10, .1 * z);
    }, this.calc_xmin = function (j, B, F, N) {
      var G = 0,
        z = j.internal_flags,
        V,
        O = 0,
        L = 0,
        D = z.ATH,
        U = F.xr,
        H = j.VBR == n.vbr_mtrh ? 1 : 0,
        Y = z.masking_lower;
      for ((j.VBR == n.vbr_mtrh || j.VBR == n.vbr_mt) && (Y = 1), V = 0; V < F.psy_lmax; V++) {
        var K, W, Q, q, ne, de;
        j.VBR == n.vbr_rh || j.VBR == n.vbr_mtrh ? W = athAdjust(D.adjust, D.l[V], D.floor) : W = D.adjust * D.l[V], ne = F.width[V], Q = W / ne, q = b, de = ne >> 1, K = 0;
        do {
          var le, J;
          le = U[O] * U[O], K += le, q += le < Q ? le : Q, O++, J = U[O] * U[O], K += J, q += J < Q ? J : Q, O++;
        } while (--de > 0);
        if (K > W && L++, V == l.SBPSY_l) {
          var pe = W * z.nsPsy.longfact[V];
          q < pe && (q = pe);
        }
        if (H != 0 && (W = q), !j.ATHonly) {
          var ce = B.en.l[V];
          if (ce > 0) {
            var pe;
            pe = K * B.thm.l[V] * Y / ce, H != 0 && (pe *= z.nsPsy.longfact[V]), W < pe && (W = pe);
          }
        }
        H != 0 ? N[G++] = W : N[G++] = W * z.nsPsy.longfact[V];
      }
      var we = 575;
      if (F.block_type != l.SHORT_TYPE) for (var X = 576; X-- != 0 && BitStream.EQ(U[X], 0);) we = X;
      F.max_nonzero_coeff = we;
      for (var Z = F.sfb_smin; V < F.psymax; Z++, V += 3) {
        var ne, re, fe;
        for (j.VBR == n.vbr_rh || j.VBR == n.vbr_mtrh ? fe = athAdjust(D.adjust, D.s[Z], D.floor) : fe = D.adjust * D.s[Z], ne = F.width[V], re = 0; re < 3; re++) {
          var K = 0,
            W,
            Q,
            q,
            de = ne >> 1;
          Q = fe / ne, q = b;
          do {
            var le, J;
            le = U[O] * U[O], K += le, q += le < Q ? le : Q, O++, J = U[O] * U[O], K += J, q += J < Q ? J : Q, O++;
          } while (--de > 0);
          if (K > fe && L++, Z == l.SBPSY_s) {
            var pe = fe * z.nsPsy.shortfact[Z];
            q < pe && (q = pe);
          }
          if (H != 0 ? W = q : W = fe, !j.ATHonly && !j.ATHshort) {
            var ce = B.en.s[Z][re];
            if (ce > 0) {
              var pe;
              pe = K * B.thm.s[Z][re] * Y / ce, H != 0 && (pe *= z.nsPsy.shortfact[Z]), W < pe && (W = pe);
            }
          }
          H != 0 ? N[G++] = W : N[G++] = W * z.nsPsy.shortfact[Z];
        }
        j.useTemporal && (N[G - 3] > N[G - 3 + 1] && (N[G - 3 + 1] += (N[G - 3] - N[G - 3 + 1]) * z.decay), N[G - 3 + 1] > N[G - 3 + 2] && (N[G - 3 + 2] += (N[G - 3 + 1] - N[G - 3 + 2]) * z.decay));
      }
      return L;
    };
    function R(j) {
      this.s = j;
    }
    this.calc_noise_core = function (j, B, F, N) {
      var G = 0,
        z = B.s,
        V = j.l3_enc;
      if (z > j.count1) for (; F-- != 0;) {
        var O;
        O = j.xr[z], z++, G += O * O, O = j.xr[z], z++, G += O * O;
      } else if (z > j.big_values) {
        var L = i(2);
        for (L[0] = 0, L[1] = N; F-- != 0;) {
          var O;
          O = Math.abs(j.xr[z]) - L[V[z]], z++, G += O * O, O = Math.abs(j.xr[z]) - L[V[z]], z++, G += O * O;
        }
      } else for (; F-- != 0;) {
        var O;
        O = Math.abs(j.xr[z]) - E[V[z]] * N, z++, G += O * O, O = Math.abs(j.xr[z]) - E[V[z]] * N, z++, G += O * O;
      }
      return B.s = z, G;
    }, this.calc_noise = function (j, B, F, N, G) {
      var z = 0,
        V = 0,
        O,
        L,
        D = 0,
        U = 0,
        H = 0,
        Y = -20,
        K = 0,
        W = j.scalefac,
        Q = 0;
      for (N.over_SSD = 0, O = 0; O < j.psymax; O++) {
        var q = j.global_gain - (W[Q++] + (j.preflag != 0 ? S[O] : 0) << j.scalefac_scale + 1) - j.subblock_gain[j.window[O]] * 8,
          ne = 0;
        if (G != null && G.step[O] == q) ne = G.noise[O], K += j.width[O], F[z++] = ne / B[V++], ne = G.noise_log[O];else {
          var de = y(q);
          if (L = j.width[O] >> 1, K + j.width[O] > j.max_nonzero_coeff) {
            var le;
            le = j.max_nonzero_coeff - K + 1, le > 0 ? L = le >> 1 : L = 0;
          }
          var J = new R(K);
          ne = this.calc_noise_core(j, J, L, de), K = J.s, G != null && (G.step[O] = q, G.noise[O] = ne), ne = F[z++] = ne / B[V++], ne = a.FAST_LOG10(Math.max(ne, 1e-20)), G != null && (G.noise_log[O] = ne);
        }
        if (G != null && (G.global_gain = j.global_gain), H += ne, ne > 0) {
          var pe;
          pe = Math.max(0 | ne * 10 + .5, 1), N.over_SSD += pe * pe, D++, U += ne;
        }
        Y = Math.max(Y, ne);
      }
      return N.over_count = D, N.tot_noise = H, N.over_noise = U, N.max_noise = Y, D;
    }, this.set_pinfo = function (j, B, F, N, G) {
      var z = j.internal_flags,
        V,
        O,
        L,
        D,
        U,
        H = B.scalefac_scale == 0 ? .5 : 1,
        Y = B.scalefac,
        K = i(L3Side.SFBMAX),
        W = i(L3Side.SFBMAX),
        Q = new CalcNoiseResult();
      calc_xmin(j, F, B, K), calc_noise(B, K, W, Q, null);
      var q = 0;
      for (O = B.sfb_lmax, B.block_type != l.SHORT_TYPE && B.mixed_block_flag == 0 && (O = 22), V = 0; V < O; V++) {
        var ne = z.scalefac_band.l[V],
          de = z.scalefac_band.l[V + 1],
          le = de - ne;
        for (D = 0; q < de; q++) D += B.xr[q] * B.xr[q];
        D /= le, U = 1e15, z.pinfo.en[N][G][V] = U * D, z.pinfo.xfsf[N][G][V] = U * K[V] * W[V] / le, F.en.l[V] > 0 && !j.ATHonly ? D = D / F.en.l[V] : D = 0, z.pinfo.thr[N][G][V] = U * Math.max(D * F.thm.l[V], z.ATH.l[V]), z.pinfo.LAMEsfb[N][G][V] = 0, B.preflag != 0 && V >= 11 && (z.pinfo.LAMEsfb[N][G][V] = -H * S[V]), V < l.SBPSY_l && (s(Y[V] >= 0), z.pinfo.LAMEsfb[N][G][V] -= H * Y[V]);
      }
      if (B.block_type == l.SHORT_TYPE) for (O = V, V = B.sfb_smin; V < l.SBMAX_s; V++) for (var ne = z.scalefac_band.s[V], de = z.scalefac_band.s[V + 1], le = de - ne, J = 0; J < 3; J++) {
        for (D = 0, L = ne; L < de; L++) D += B.xr[q] * B.xr[q], q++;
        D = Math.max(D / le, 1e-20), U = 1e15, z.pinfo.en_s[N][G][3 * V + J] = U * D, z.pinfo.xfsf_s[N][G][3 * V + J] = U * K[O] * W[O] / le, F.en.s[V][J] > 0 ? D = D / F.en.s[V][J] : D = 0, (j.ATHonly || j.ATHshort) && (D = 0), z.pinfo.thr_s[N][G][3 * V + J] = U * Math.max(D * F.thm.s[V][J], z.ATH.s[V]), z.pinfo.LAMEsfb_s[N][G][3 * V + J] = -2 * B.subblock_gain[J], V < l.SBPSY_s && (z.pinfo.LAMEsfb_s[N][G][3 * V + J] -= H * Y[O]), O++;
      }
      z.pinfo.LAMEqss[N][G] = B.global_gain, z.pinfo.LAMEmainbits[N][G] = B.part2_3_length + B.part2_length, z.pinfo.LAMEsfbits[N][G] = B.part2_length, z.pinfo.over[N][G] = Q.over_count, z.pinfo.max_noise[N][G] = Q.max_noise * 10, z.pinfo.over_noise[N][G] = Q.over_noise * 10, z.pinfo.tot_noise[N][G] = Q.tot_noise * 10, z.pinfo.over_SSD[N][G] = Q.over_SSD;
    };
  }
  return ylt = h, ylt;
}

var blt, Zhn;

function Dmr() {
  if (Zhn) return blt;
  Zhn = 1;
  var e = jf(),
    t = e.System;
  e.VbrMode, e.Float, e.ShortBlock, e.Util;
  var n = e.Arrays;
  e.new_array_n, e.new_byte, e.new_double, e.new_float, e.new_float_n;
  var r = e.new_int;
  e.new_int_n;
  var a = e.assert,
    i = Lx(),
    o = Fzt(),
    s = Bzt(),
    l = jmr();
  function d() {
    var u = null;
    this.qupvt = null, this.setModules = function (V) {
      this.qupvt = V, u = V;
    };
    function h(V) {
      this.bits = 0 | V;
    }
    var p = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [1, 1], [1, 1], [1, 2], [2, 2], [2, 3], [2, 3], [3, 4], [3, 4], [3, 4], [4, 5], [4, 5], [4, 6], [5, 6], [5, 6], [5, 7], [6, 7], [6, 7]];
    function m(V, O, L, D, U, H) {
      var Y = .5946 / O;
      for (a(V > 0), V = V >> 1; V-- != 0;) U[H++] = Y > L[D++] ? 0 : 1, U[H++] = Y > L[D++] ? 0 : 1;
    }
    function f(V, O, L, D, U, H) {
      a(V > 0), V = V >> 1;
      var Y = V % 2;
      for (V = V >> 1; V-- != 0;) {
        var K, W, Q, q, ne, de, le, J;
        K = L[D++] * O, W = L[D++] * O, ne = 0 | K, Q = L[D++] * O, de = 0 | W, q = L[D++] * O, le = 0 | Q, K += u.adj43[ne], J = 0 | q, W += u.adj43[de], U[H++] = 0 | K, Q += u.adj43[le], U[H++] = 0 | W, q += u.adj43[J], U[H++] = 0 | Q, U[H++] = 0 | q;
      }
      if (Y != 0) {
        var K, W, ne, de;
        K = L[D++] * O, W = L[D++] * O, ne = 0 | K, de = 0 | W, K += u.adj43[ne], W += u.adj43[de], U[H++] = 0 | K, U[H++] = 0 | W;
      }
    }
    function y(V, O, L, D, U) {
      var H,
        Y,
        K = 0,
        W,
        Q = 0,
        q = 0,
        ne = 0,
        de = O,
        le = 0,
        J = de,
        pe = 0,
        ce = V,
        we = 0;
      for (W = U != null && D.global_gain == U.global_gain, D.block_type == i.SHORT_TYPE ? Y = 38 : Y = 21, H = 0; H <= Y; H++) {
        var X = -1;
        if ((W || D.block_type == i.NORM_TYPE) && (X = D.global_gain - (D.scalefac[H] + (D.preflag != 0 ? u.pretab[H] : 0) << D.scalefac_scale + 1) - D.subblock_gain[D.window[H]] * 8), a(D.width[H] >= 0), W && U.step[H] == X) Q != 0 && (f(Q, L, ce, we, J, pe), Q = 0), q != 0 && (m(q, L, ce, we, J, pe), q = 0);else {
          var Z = D.width[H];
          if (K + D.width[H] > D.max_nonzero_coeff) {
            var re;
            re = D.max_nonzero_coeff - K + 1, n.fill(O, D.max_nonzero_coeff, 576, 0), Z = re, Z < 0 && (Z = 0), H = Y + 1;
          }
          if (Q == 0 && q == 0 && (J = de, pe = le, ce = V, we = ne), U != null && U.sfb_count1 > 0 && H >= U.sfb_count1 && U.step[H] > 0 && X >= U.step[H] ? (Q != 0 && (f(Q, L, ce, we, J, pe), Q = 0, J = de, pe = le, ce = V, we = ne), q += Z) : (q != 0 && (m(q, L, ce, we, J, pe), q = 0, J = de, pe = le, ce = V, we = ne), Q += Z), Z <= 0) {
            q != 0 && (m(q, L, ce, we, J, pe), q = 0), Q != 0 && (f(Q, L, ce, we, J, pe), Q = 0);
            break;
          }
        }
        H <= Y && (le += D.width[H], ne += D.width[H], K += D.width[H]);
      }
      Q != 0 && (f(Q, L, ce, we, J, pe), Q = 0), q != 0 && (m(q, L, ce, we, J, pe), q = 0);
    }
    function b(V, O, L) {
      var D = 0,
        U = 0;
      do {
        var H = V[O++],
          Y = V[O++];
        D < H && (D = H), U < Y && (U = Y);
      } while (O < L);
      return D < U && (D = U), D;
    }
    function v(V, O, L, D, U, H) {
      var Y = o.ht[D].xlen * 65536 + o.ht[U].xlen,
        K = 0,
        W;
      do {
        var Q = V[O++],
          q = V[O++];
        Q != 0 && (Q > 14 && (Q = 15, K += Y), Q *= 16), q != 0 && (q > 14 && (q = 15, K += Y), Q += q), K += o.largetbl[Q];
      } while (O < L);
      return W = K & 65535, K >>= 16, K > W && (K = W, D = U), H.bits += K, D;
    }
    function _(V, O, L, D) {
      var U = 0,
        H = o.ht[1].hlen;
      do {
        var Y = V[O + 0] * 2 + V[O + 1];
        O += 2, U += H[Y];
      } while (O < L);
      return D.bits += U, 1;
    }
    function w(V, O, L, D, U) {
      var H = 0,
        Y,
        K = o.ht[D].xlen,
        W;
      D == 2 ? W = o.table23 : W = o.table56;
      do {
        var Q = V[O + 0] * K + V[O + 1];
        O += 2, H += W[Q];
      } while (O < L);
      return Y = H & 65535, H >>= 16, H > Y && (H = Y, D++), U.bits += H, D;
    }
    function k(V, O, L, D, U) {
      var H = 0,
        Y = 0,
        K = 0,
        W = o.ht[D].xlen,
        Q = o.ht[D].hlen,
        q = o.ht[D + 1].hlen,
        ne = o.ht[D + 2].hlen;
      do {
        var de = V[O + 0] * W + V[O + 1];
        O += 2, H += Q[de], Y += q[de], K += ne[de];
      } while (O < L);
      var le = D;
      return H > Y && (H = Y, le++), H > K && (H = K, le = D + 2), U.bits += H, le;
    }
    var A = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];
    function S(V, O, L, D) {
      var U = b(V, O, L);
      switch (U) {
        case 0:
          return U;
        case 1:
          return _(V, O, L, D);
        case 2:
        case 3:
          return w(V, O, L, A[U - 1], D);
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          return k(V, O, L, A[U - 1], D);
        default:
          if (U > l.IXMAX_VAL) return D.bits = l.LARGE_BITS, -1;
          U -= 15;
          var H;
          for (H = 24; H < 32 && !(o.ht[H].linmax >= U); H++);
          var Y;
          for (Y = H - 8; Y < 24 && !(o.ht[Y].linmax >= U); Y++);
          return v(V, O, L, Y, H, D);
      }
    }
    this.noquant_count_bits = function (V, O, L) {
      var D = O.l3_enc,
        U = Math.min(576, O.max_nonzero_coeff + 2 >> 1 << 1);
      for (L != null && (L.sfb_count1 = 0); U > 1 && (D[U - 1] | D[U - 2]) == 0; U -= 2);
      O.count1 = U;
      for (var H = 0, Y = 0; U > 3; U -= 4) {
        var K;
        if (((D[U - 1] | D[U - 2] | D[U - 3] | D[U - 4]) & 2147483647) > 1) break;
        K = ((D[U - 4] * 2 + D[U - 3]) * 2 + D[U - 2]) * 2 + D[U - 1], H += o.t32l[K], Y += o.t33l[K];
      }
      var W = H;
      if (O.count1table_select = 0, H > Y && (W = Y, O.count1table_select = 1), O.count1bits = W, O.big_values = U, U == 0) return W;
      if (O.block_type == i.SHORT_TYPE) H = 3 * V.scalefac_band.s[3], H > O.big_values && (H = O.big_values), Y = O.big_values;else if (O.block_type == i.NORM_TYPE) {
        if (a(U <= 576), H = O.region0_count = V.bv_scf[U - 2], Y = O.region1_count = V.bv_scf[U - 1], a(H + Y + 2 < i.SBPSY_l), Y = V.scalefac_band.l[H + Y + 2], H = V.scalefac_band.l[H + 1], Y < U) {
          var Q = new h(W);
          O.table_select[2] = S(D, Y, U, Q), W = Q.bits;
        }
      } else O.region0_count = 7, O.region1_count = i.SBMAX_l - 1 - 7 - 1, H = V.scalefac_band.l[8], Y = U, H > Y && (H = Y);
      if (H = Math.min(H, U), Y = Math.min(Y, U), a(H >= 0), a(Y >= 0), 0 < H) {
        var Q = new h(W);
        O.table_select[0] = S(D, 0, H, Q), W = Q.bits;
      }
      if (H < Y) {
        var Q = new h(W);
        O.table_select[1] = S(D, H, Y, Q), W = Q.bits;
      }
      if (V.use_best_huffman == 2 && (O.part2_3_length = W, best_huffman_divide(V, O), W = O.part2_3_length), L != null && O.block_type == i.NORM_TYPE) {
        for (var q = 0; V.scalefac_band.l[q] < O.big_values;) q++;
        L.sfb_count1 = q;
      }
      return W;
    }, this.count_bits = function (V, O, L, D) {
      var U = L.l3_enc,
        H = l.IXMAX_VAL / u.IPOW20(L.global_gain);
      if (L.xrpow_max > H) return l.LARGE_BITS;
      if (y(O, U, u.IPOW20(L.global_gain), L, D), (V.substep_shaping & 2) != 0) for (var Y = 0, K = L.global_gain + L.scalefac_scale, W = .634521682242439 / u.IPOW20(K), Q = 0; Q < L.sfbmax; Q++) {
        var q = L.width[Q];
        if (a(q >= 0), V.pseudohalf[Q] == 0) Y += q;else {
          var ne;
          for (ne = Y, Y += q; ne < Y; ++ne) U[ne] = O[ne] >= W ? U[ne] : 0;
        }
      }
      return this.noquant_count_bits(V, L, D);
    };
    function C(V, O, L, D, U, H, Y) {
      for (var K = O.big_values, W = 0; W <= 22; W++) D[W] = l.LARGE_BITS;
      for (var W = 0; W < 16; W++) {
        var Q = V.scalefac_band.l[W + 1];
        if (Q >= K) break;
        var q = 0,
          ne = new h(q),
          de = S(L, 0, Q, ne);
        q = ne.bits;
        for (var le = 0; le < 8; le++) {
          var J = V.scalefac_band.l[W + le + 2];
          if (J >= K) break;
          var pe = q;
          ne = new h(pe);
          var ce = S(L, Q, J, ne);
          pe = ne.bits, D[W + le] > pe && (D[W + le] = pe, U[W + le] = W, H[W + le] = de, Y[W + le] = ce);
        }
      }
    }
    function I(V, O, L, D, U, H, Y, K) {
      for (var W = O.big_values, Q = 2; Q < i.SBMAX_l + 1; Q++) {
        var q = V.scalefac_band.l[Q];
        if (q >= W) break;
        var ne = U[Q - 2] + O.count1bits;
        if (L.part2_3_length <= ne) break;
        var de = new h(ne),
          le = S(D, q, W, de);
        ne = de.bits, !(L.part2_3_length <= ne) && (L.assign(O), L.part2_3_length = ne, L.region0_count = H[Q - 2], L.region1_count = Q - 2 - H[Q - 2], L.table_select[0] = Y[Q - 2], L.table_select[1] = K[Q - 2], L.table_select[2] = le);
      }
    }
    this.best_huffman_divide = function (V, O) {
      var L = new s(),
        D = O.l3_enc,
        U = r(23),
        H = r(23),
        Y = r(23),
        K = r(23);
      if (!(O.block_type == i.SHORT_TYPE && V.mode_gr == 1)) {
        L.assign(O), O.block_type == i.NORM_TYPE && (C(V, O, D, U, H, Y, K), I(V, L, O, D, U, H, Y, K));
        var W = L.big_values;
        if (!(W == 0 || (D[W - 2] | D[W - 1]) > 1) && (W = O.count1 + 2, !(W > 576))) {
          L.assign(O), L.count1 = W;
          var Q = 0,
            q = 0;
          for (a(W <= 576); W > L.big_values; W -= 4) {
            var ne = ((D[W - 4] * 2 + D[W - 3]) * 2 + D[W - 2]) * 2 + D[W - 1];
            Q += o.t32l[ne], q += o.t33l[ne];
          }
          if (L.big_values = W, L.count1table_select = 0, Q > q && (Q = q, L.count1table_select = 1), L.count1bits = Q, L.block_type == i.NORM_TYPE) I(V, L, O, D, U, H, Y, K);else {
            if (L.part2_3_length = Q, Q = V.scalefac_band.l[8], Q > W && (Q = W), Q > 0) {
              var de = new h(L.part2_3_length);
              L.table_select[0] = S(D, 0, Q, de), L.part2_3_length = de.bits;
            }
            if (W > Q) {
              var de = new h(L.part2_3_length);
              L.table_select[1] = S(D, Q, W, de), L.part2_3_length = de.bits;
            }
            O.part2_3_length > L.part2_3_length && O.assign(L);
          }
        }
      }
    };
    var E = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
      M = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
      T = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
      P = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
    d.slen1_tab = T, d.slen2_tab = P;
    function R(V, O) {
      for (var L, D = O.tt[1][V], U = O.tt[0][V], H = 0; H < o.scfsi_band.length - 1; H++) {
        for (L = o.scfsi_band[H]; L < o.scfsi_band[H + 1] && !(U.scalefac[L] != D.scalefac[L] && D.scalefac[L] >= 0); L++);
        if (L == o.scfsi_band[H + 1]) {
          for (L = o.scfsi_band[H]; L < o.scfsi_band[H + 1]; L++) D.scalefac[L] = -1;
          O.scfsi[V][H] = 1;
        }
      }
      var Y = 0,
        K = 0;
      for (L = 0; L < 11; L++) D.scalefac[L] != -1 && (K++, Y < D.scalefac[L] && (Y = D.scalefac[L]));
      for (var W = 0, Q = 0; L < i.SBPSY_l; L++) D.scalefac[L] != -1 && (Q++, W < D.scalefac[L] && (W = D.scalefac[L]));
      for (var H = 0; H < 16; H++) if (Y < E[H] && W < M[H]) {
        var q = T[H] * K + P[H] * Q;
        D.part2_length > q && (D.part2_length = q, D.scalefac_compress = H);
      }
    }
    this.best_scalefac_store = function (V, O, L, D) {
      var U = D.tt[O][L],
        H,
        Y,
        K,
        W,
        Q = 0;
      for (K = 0, H = 0; H < U.sfbmax; H++) {
        var q = U.width[H];
        for (a(q >= 0), K += q, W = -q; W < 0 && U.l3_enc[W + K] == 0; W++);
        W == 0 && (U.scalefac[H] = Q = -2);
      }
      if (U.scalefac_scale == 0 && U.preflag == 0) {
        var ne = 0;
        for (H = 0; H < U.sfbmax; H++) U.scalefac[H] > 0 && (ne |= U.scalefac[H]);
        if ((ne & 1) == 0 && ne != 0) {
          for (H = 0; H < U.sfbmax; H++) U.scalefac[H] > 0 && (U.scalefac[H] >>= 1);
          U.scalefac_scale = Q = 1;
        }
      }
      if (U.preflag == 0 && U.block_type != i.SHORT_TYPE && V.mode_gr == 2) {
        for (H = 11; H < i.SBPSY_l && !(U.scalefac[H] < u.pretab[H] && U.scalefac[H] != -2); H++);
        if (H == i.SBPSY_l) {
          for (H = 11; H < i.SBPSY_l; H++) U.scalefac[H] > 0 && (U.scalefac[H] -= u.pretab[H]);
          U.preflag = Q = 1;
        }
      }
      for (Y = 0; Y < 4; Y++) D.scfsi[L][Y] = 0;
      for (V.mode_gr == 2 && O == 1 && D.tt[0][L].block_type != i.SHORT_TYPE && D.tt[1][L].block_type != i.SHORT_TYPE && (R(L, D), Q = 0), H = 0; H < U.sfbmax; H++) U.scalefac[H] == -2 && (U.scalefac[H] = 0);
      Q != 0 && (V.mode_gr == 2 ? this.scale_bitcount(U) : this.scale_bitcount_lsf(V, U));
    };
    function j(V, O) {
      for (var L = 0; L < O; ++L) if (V[L] < 0) return !1;
      return !0;
    }
    var B = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
      F = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
      N = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
    this.scale_bitcount = function (V) {
      var O,
        L,
        D = 0,
        U = 0,
        H,
        Y = V.scalefac;
      if (a(j(Y, V.sfbmax)), V.block_type == i.SHORT_TYPE) H = B, V.mixed_block_flag != 0 && (H = F);else if (H = N, V.preflag == 0) {
        for (L = 11; L < i.SBPSY_l && !(Y[L] < u.pretab[L]); L++);
        if (L == i.SBPSY_l) for (V.preflag = 1, L = 11; L < i.SBPSY_l; L++) Y[L] -= u.pretab[L];
      }
      for (L = 0; L < V.sfbdivide; L++) D < Y[L] && (D = Y[L]);
      for (; L < V.sfbmax; L++) U < Y[L] && (U = Y[L]);
      for (V.part2_length = l.LARGE_BITS, O = 0; O < 16; O++) D < E[O] && U < M[O] && V.part2_length > H[O] && (V.part2_length = H[O], V.scalefac_compress = O);
      return V.part2_length == l.LARGE_BITS;
    };
    var G = [[15, 15, 7, 7], [15, 15, 7, 0], [7, 3, 0, 0], [15, 31, 31, 0], [7, 7, 7, 0], [3, 3, 0, 0]];
    this.scale_bitcount_lsf = function (V, O) {
      var L,
        D,
        U,
        H,
        Y,
        K,
        W,
        Q,
        q = r(4),
        ne = O.scalefac;
      for (O.preflag != 0 ? L = 2 : L = 0, W = 0; W < 4; W++) q[W] = 0;
      if (O.block_type == i.SHORT_TYPE) {
        D = 1;
        var de = u.nr_of_sfb_block[L][D];
        for (Q = 0, U = 0; U < 4; U++) for (H = de[U] / 3, W = 0; W < H; W++, Q++) for (Y = 0; Y < 3; Y++) ne[Q * 3 + Y] > q[U] && (q[U] = ne[Q * 3 + Y]);
      } else {
        D = 0;
        var de = u.nr_of_sfb_block[L][D];
        for (Q = 0, U = 0; U < 4; U++) for (H = de[U], W = 0; W < H; W++, Q++) ne[Q] > q[U] && (q[U] = ne[Q]);
      }
      for (K = !1, U = 0; U < 4; U++) q[U] > G[L][U] && (K = !0);
      if (!K) {
        var le, J, pe, ce;
        for (O.sfb_partition_table = u.nr_of_sfb_block[L][D], U = 0; U < 4; U++) O.slen[U] = z[q[U]];
        switch (le = O.slen[0], J = O.slen[1], pe = O.slen[2], ce = O.slen[3], L) {
          case 0:
            O.scalefac_compress = (le * 5 + J << 4) + (pe << 2) + ce;
            break;
          case 1:
            O.scalefac_compress = 400 + (le * 5 + J << 2) + pe;
            break;
          case 2:
            O.scalefac_compress = 500 + le * 3 + J;
            break;
          default:
            t.err.printf(`intensity stereo not implemented yet
`);
            break;
        }
      }
      if (!K) for (a(O.sfb_partition_table != null), O.part2_length = 0, U = 0; U < 4; U++) O.part2_length += O.slen[U] * O.sfb_partition_table[U];
      return K;
    };
    var z = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
    this.huffman_init = function (V) {
      for (var O = 2; O <= 576; O += 2) {
        for (var L = 0, D; V.scalefac_band.l[++L] < O;);
        for (D = p[L][0]; V.scalefac_band.l[D + 1] > O;) D--;
        for (D < 0 && (D = p[L][0]), V.bv_scf[O - 2] = D, D = p[L][1]; V.scalefac_band.l[D + V.bv_scf[O - 2] + 2] > O;) D--;
        D < 0 && (D = p[L][1]), V.bv_scf[O - 1] = D;
      }
    };
  }
  return blt = d, blt;
}

var vlt, epn;

function Lmr() {
  if (epn) return vlt;
  epn = 1;
  var e = jf(),
    t = e.System;
  e.VbrMode, e.Float, e.ShortBlock, e.Util;
  var n = e.Arrays;
  e.new_array_n;
  var r = e.new_byte;
  e.new_double, e.new_float;
  var a = e.new_float_n,
    i = e.new_int;
  e.new_int_n;
  var o = e.assert,
    s = Dmr(),
    l = Fzt(),
    d = Lx(),
    u = aZe();
  h.EQ = function (p, m) {
    return Math.abs(p) > Math.abs(m) ? Math.abs(p - m) <= Math.abs(p) * 1e-6 : Math.abs(p - m) <= Math.abs(m) * 1e-6;
  }, h.NEQ = function (p, m) {
    return !h.EQ(p, m);
  };
  function h() {
    var p = this,
      m = 32773,
      f = 32,
      y = null,
      b = null,
      v = null,
      _ = null;
    this.setModules = function (O, L, D, U) {
      y = O, b = L, v = D, _ = U;
    };
    var w = null,
      k = 0,
      A = 0,
      S = 0;
    this.getframebits = function (O) {
      var L = O.internal_flags,
        D;
      L.bitrate_index != 0 ? D = l.bitrate_table[O.version][L.bitrate_index] : D = O.brate, o(8 <= D && D <= 640);
      var U = 0 | (O.version + 1) * 72e3 * D / O.out_samplerate + L.padding;
      return 8 * U;
    };
    function C(O) {
      t.arraycopy(O.header[O.w_ptr].buf, 0, w, A, O.sideinfo_len), A += O.sideinfo_len, k += O.sideinfo_len * 8, O.w_ptr = O.w_ptr + 1 & u.MAX_HEADER_BUF - 1;
    }
    function I(O, L, D) {
      for (o(D < f - 2); D > 0;) {
        var U;
        S == 0 && (S = 8, A++, o(A < Lame.LAME_MAXMP3BUFFER), o(O.header[O.w_ptr].write_timing >= k), O.header[O.w_ptr].write_timing == k && C(O), w[A] = 0), U = Math.min(D, S), D -= U, S -= U, o(D < f), o(S < f), w[A] |= L >> D << S, k += U;
      }
    }
    function E(O, L, D) {
      for (o(D < f - 2); D > 0;) {
        var U;
        S == 0 && (S = 8, A++, o(A < Lame.LAME_MAXMP3BUFFER), w[A] = 0), U = Math.min(D, S), D -= U, S -= U, o(D < f), o(S < f), w[A] |= L >> D << S, k += U;
      }
    }
    function M(O, L) {
      var D = O.internal_flags,
        U;
      if (o(L >= 0), L >= 8 && (I(D, 76, 8), L -= 8), L >= 8 && (I(D, 65, 8), L -= 8), L >= 8 && (I(D, 77, 8), L -= 8), L >= 8 && (I(D, 69, 8), L -= 8), L >= 32) {
        var H = v.getLameShortVersion();
        if (L >= 32) for (U = 0; U < H.length && L >= 8; ++U) L -= 8, I(D, H.charAt(U), 8);
      }
      for (; L >= 1; L -= 1) I(D, D.ancillary_flag, 1), D.ancillary_flag ^= O.disable_reservoir ? 0 : 1;
      o(L == 0);
    }
    function T(O, L, D) {
      for (var U = O.header[O.h_ptr].ptr; D > 0;) {
        var H = Math.min(D, 8 - (U & 7));
        D -= H, o(D < f), O.header[O.h_ptr].buf[U >> 3] |= L >> D << 8 - (U & 7) - H, U += H;
      }
      O.header[O.h_ptr].ptr = U;
    }
    function P(O, L) {
      O <<= 8;
      for (var D = 0; D < 8; D++) O <<= 1, L <<= 1, ((L ^ O) & 65536) != 0 && (L ^= m);
      return L;
    }
    this.CRC_writeheader = function (O, L) {
      var D = 65535;
      D = P(L[2] & 255, D), D = P(L[3] & 255, D);
      for (var U = 6; U < O.sideinfo_len; U++) D = P(L[U] & 255, D);
      L[4] = byte(D >> 8), L[5] = byte(D & 255);
    };
    function R(O, L) {
      var D = O.internal_flags,
        U,
        H,
        Y;
      if (U = D.l3_side, D.header[D.h_ptr].ptr = 0, n.fill(D.header[D.h_ptr].buf, 0, D.sideinfo_len, 0), O.out_samplerate < 16e3 ? T(D, 4094, 12) : T(D, 4095, 12), T(D, O.version, 1), T(D, 1, 2), T(D, O.error_protection ? 0 : 1, 1), T(D, D.bitrate_index, 4), T(D, D.samplerate_index, 2), T(D, D.padding, 1), T(D, O.extension, 1), T(D, O.mode.ordinal(), 2), T(D, D.mode_ext, 2), T(D, O.copyright, 1), T(D, O.original, 1), T(D, O.emphasis, 2), O.error_protection && T(D, 0, 16), O.version == 1) {
        for (o(U.main_data_begin >= 0), T(D, U.main_data_begin, 9), D.channels_out == 2 ? T(D, U.private_bits, 3) : T(D, U.private_bits, 5), Y = 0; Y < D.channels_out; Y++) {
          var K;
          for (K = 0; K < 4; K++) T(D, U.scfsi[Y][K], 1);
        }
        for (H = 0; H < 2; H++) for (Y = 0; Y < D.channels_out; Y++) {
          var W = U.tt[H][Y];
          T(D, W.part2_3_length + W.part2_length, 12), T(D, W.big_values / 2, 9), T(D, W.global_gain, 8), T(D, W.scalefac_compress, 4), W.block_type != d.NORM_TYPE ? (T(D, 1, 1), T(D, W.block_type, 2), T(D, W.mixed_block_flag, 1), W.table_select[0] == 14 && (W.table_select[0] = 16), T(D, W.table_select[0], 5), W.table_select[1] == 14 && (W.table_select[1] = 16), T(D, W.table_select[1], 5), T(D, W.subblock_gain[0], 3), T(D, W.subblock_gain[1], 3), T(D, W.subblock_gain[2], 3)) : (T(D, 0, 1), W.table_select[0] == 14 && (W.table_select[0] = 16), T(D, W.table_select[0], 5), W.table_select[1] == 14 && (W.table_select[1] = 16), T(D, W.table_select[1], 5), W.table_select[2] == 14 && (W.table_select[2] = 16), T(D, W.table_select[2], 5), o(0 <= W.region0_count && W.region0_count < 16), o(0 <= W.region1_count && W.region1_count < 8), T(D, W.region0_count, 4), T(D, W.region1_count, 3)), T(D, W.preflag, 1), T(D, W.scalefac_scale, 1), T(D, W.count1table_select, 1);
        }
      } else for (o(U.main_data_begin >= 0), T(D, U.main_data_begin, 8), T(D, U.private_bits, D.channels_out), H = 0, Y = 0; Y < D.channels_out; Y++) {
        var W = U.tt[H][Y];
        T(D, W.part2_3_length + W.part2_length, 12), T(D, W.big_values / 2, 9), T(D, W.global_gain, 8), T(D, W.scalefac_compress, 9), W.block_type != d.NORM_TYPE ? (T(D, 1, 1), T(D, W.block_type, 2), T(D, W.mixed_block_flag, 1), W.table_select[0] == 14 && (W.table_select[0] = 16), T(D, W.table_select[0], 5), W.table_select[1] == 14 && (W.table_select[1] = 16), T(D, W.table_select[1], 5), T(D, W.subblock_gain[0], 3), T(D, W.subblock_gain[1], 3), T(D, W.subblock_gain[2], 3)) : (T(D, 0, 1), W.table_select[0] == 14 && (W.table_select[0] = 16), T(D, W.table_select[0], 5), W.table_select[1] == 14 && (W.table_select[1] = 16), T(D, W.table_select[1], 5), W.table_select[2] == 14 && (W.table_select[2] = 16), T(D, W.table_select[2], 5), o(0 <= W.region0_count && W.region0_count < 16), o(0 <= W.region1_count && W.region1_count < 8), T(D, W.region0_count, 4), T(D, W.region1_count, 3)), T(D, W.scalefac_scale, 1), T(D, W.count1table_select, 1);
      }
      O.error_protection && CRC_writeheader(D, D.header[D.h_ptr].buf);
      {
        var Q = D.h_ptr;
        o(D.header[Q].ptr == D.sideinfo_len * 8), D.h_ptr = Q + 1 & u.MAX_HEADER_BUF - 1, D.header[D.h_ptr].write_timing = D.header[Q].write_timing + L, D.h_ptr == D.w_ptr && t.err.println(`Error: MAX_HEADER_BUF too small in bitstream.c 
`);
      }
    }
    function j(O, L) {
      var D = l.ht[L.count1table_select + 32],
        U,
        H = 0,
        Y = L.big_values,
        K = L.big_values;
      for (o(L.count1table_select < 2), U = (L.count1 - L.big_values) / 4; U > 0; --U) {
        var W = 0,
          Q = 0,
          q;
        q = L.l3_enc[Y + 0], q != 0 && (Q += 8, L.xr[K + 0] < 0 && W++, o(q <= 1)), q = L.l3_enc[Y + 1], q != 0 && (Q += 4, W *= 2, L.xr[K + 1] < 0 && W++, o(q <= 1)), q = L.l3_enc[Y + 2], q != 0 && (Q += 2, W *= 2, L.xr[K + 2] < 0 && W++, o(q <= 1)), q = L.l3_enc[Y + 3], q != 0 && (Q++, W *= 2, L.xr[K + 3] < 0 && W++, o(q <= 1)), Y += 4, K += 4, I(O, W + D.table[Q], D.hlen[Q]), H += D.hlen[Q];
      }
      return H;
    }
    function B(O, L, D, U, H) {
      var Y = l.ht[L],
        K = 0;
      if (o(L < 32), L == 0) return K;
      for (var W = D; W < U; W += 2) {
        var Q = 0,
          q = 0,
          ne = Y.xlen,
          de = Y.xlen,
          le = 0,
          J = H.l3_enc[W],
          pe = H.l3_enc[W + 1];
        if (J != 0 && (H.xr[W] < 0 && le++, Q--), L > 15) {
          if (J > 14) {
            var ce = J - 15;
            o(ce <= Y.linmax), le |= ce << 1, q = ne, J = 15;
          }
          if (pe > 14) {
            var we = pe - 15;
            o(we <= Y.linmax), le <<= ne, le |= we, q += ne, pe = 15;
          }
          de = 16;
        }
        pe != 0 && (le <<= 1, H.xr[W + 1] < 0 && le++, Q--), o((J | pe) < 16), J = J * de + pe, q -= Q, Q += Y.hlen[J], o(Q <= f), o(q <= f), I(O, Y.table[J], Q), I(O, le, q), K += Q + q;
      }
      return K;
    }
    function F(O, L) {
      var D = 3 * O.scalefac_band.s[3];
      D > L.big_values && (D = L.big_values);
      var U = B(O, L.table_select[0], 0, D, L);
      return U += B(O, L.table_select[1], D, L.big_values, L), U;
    }
    function N(O, L) {
      var D, U, H, Y;
      D = L.big_values, o(0 <= D && D <= 576);
      var K = L.region0_count + 1;
      return o(0 <= K), o(K < O.scalefac_band.l.length), H = O.scalefac_band.l[K], K += L.region1_count + 1, o(0 <= K), o(K < O.scalefac_band.l.length), Y = O.scalefac_band.l[K], H > D && (H = D), Y > D && (Y = D), U = B(O, L.table_select[0], 0, H, L), U += B(O, L.table_select[1], H, Y, L), U += B(O, L.table_select[2], Y, D, L), U;
    }
    function G(O) {
      var L,
        D,
        U,
        H,
        Y = 0,
        K = O.internal_flags,
        W = K.l3_side;
      if (O.version == 1) for (L = 0; L < 2; L++) for (D = 0; D < K.channels_out; D++) {
        var Q = W.tt[L][D],
          q = s.slen1_tab[Q.scalefac_compress],
          ne = s.slen2_tab[Q.scalefac_compress];
        for (H = 0, U = 0; U < Q.sfbdivide; U++) Q.scalefac[U] != -1 && (I(K, Q.scalefac[U], q), H += q);
        for (; U < Q.sfbmax; U++) Q.scalefac[U] != -1 && (I(K, Q.scalefac[U], ne), H += ne);
        o(H == Q.part2_length), Q.block_type == d.SHORT_TYPE ? H += F(K, Q) : H += N(K, Q), H += j(K, Q), o(H == Q.part2_3_length + Q.part2_length), Y += H;
      } else for (L = 0, D = 0; D < K.channels_out; D++) {
        var Q = W.tt[L][D],
          de,
          le,
          J = 0;
        if (o(Q.sfb_partition_table != null), H = 0, U = 0, le = 0, Q.block_type == d.SHORT_TYPE) {
          for (; le < 4; le++) {
            var pe = Q.sfb_partition_table[le] / 3,
              ce = Q.slen[le];
            for (de = 0; de < pe; de++, U++) I(K, Math.max(Q.scalefac[U * 3 + 0], 0), ce), I(K, Math.max(Q.scalefac[U * 3 + 1], 0), ce), I(K, Math.max(Q.scalefac[U * 3 + 2], 0), ce), J += 3 * ce;
          }
          H += F(K, Q);
        } else {
          for (; le < 4; le++) {
            var pe = Q.sfb_partition_table[le],
              ce = Q.slen[le];
            for (de = 0; de < pe; de++, U++) I(K, Math.max(Q.scalefac[U], 0), ce), J += ce;
          }
          H += N(K, Q);
        }
        H += j(K, Q), o(H == Q.part2_3_length), o(J == Q.part2_length), Y += J + H;
      }
      return Y;
    }
    function z() {
      this.total = 0;
    }
    function V(O, L) {
      var D = O.internal_flags,
        U,
        H,
        Y,
        K,
        W;
      return W = D.w_ptr, K = D.h_ptr - 1, K == -1 && (K = u.MAX_HEADER_BUF - 1), U = D.header[K].write_timing - k, L.total = U, U >= 0 && (H = 1 + K - W, K < W && (H = 1 + K - W + u.MAX_HEADER_BUF), U -= H * 8 * D.sideinfo_len), Y = p.getframebits(O), U += Y, L.total += Y, L.total % 8 != 0 ? L.total = 1 + L.total / 8 : L.total = L.total / 8, L.total += A + 1, U < 0 && t.err.println(`strange error flushing buffer ... 
`), U;
    }
    this.flush_bitstream = function (O) {
      var L = O.internal_flags,
        D,
        U,
        H = L.h_ptr - 1;
      if (H == -1 && (H = u.MAX_HEADER_BUF - 1), D = L.l3_side, !((U = V(O, new z())) < 0)) {
        if (M(O, U), o(L.header[H].write_timing + this.getframebits(O) == k), L.ResvSize = 0, D.main_data_begin = 0, L.findReplayGain) {
          var Y = y.GetTitleGain(L.rgdata);
          o(NEQ(Y, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)), L.RadioGain = Math.floor(Y * 10 + .5) | 0;
        }
        L.findPeakSample && (L.noclipGainChange = Math.ceil(Math.log10(L.PeakSample / 32767) * 20 * 10) | 0, L.noclipGainChange > 0 && (EQ(O.scale, 1) || EQ(O.scale, 0)) ? L.noclipScale = Math.floor(32767 / L.PeakSample * 100) / 100 : L.noclipScale = -1);
      }
    }, this.add_dummy_byte = function (O, L, D) {
      for (var U = O.internal_flags, H; D-- > 0;) for (E(U, L, 8), H = 0; H < u.MAX_HEADER_BUF; ++H) U.header[H].write_timing += 8;
    }, this.format_bitstream = function (O) {
      var L = O.internal_flags,
        D;
      D = L.l3_side;
      var U = this.getframebits(O);
      M(O, D.resvDrain_pre), R(O, U);
      var H = 8 * L.sideinfo_len;
      if (H += G(O), M(O, D.resvDrain_post), H += D.resvDrain_post, D.main_data_begin += (U - H) / 8, V(O, new z()) != L.ResvSize && t.err.println("Internal buffer inconsistency. flushbits <> ResvSize"), D.main_data_begin * 8 != L.ResvSize && (t.err.printf(`bit reservoir error: 
l3_side.main_data_begin: %d 
Resvoir size:             %d 
resv drain (post)         %d 
resv drain (pre)          %d 
header and sideinfo:      %d 
data bits:                %d 
total bits:               %d (remainder: %d) 
bitsperframe:             %d 
`, 8 * D.main_data_begin, L.ResvSize, D.resvDrain_post, D.resvDrain_pre, 8 * L.sideinfo_len, H - D.resvDrain_post - 8 * L.sideinfo_len, H, H % 8, U), t.err.println("This is a fatal error.  It has several possible causes:"), t.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), t.err.println(" 9%%  Your system is overclocked"), t.err.println(" 1%%  bug in LAME encoding library"), L.ResvSize = D.main_data_begin * 8), o(k % 8 == 0), k > 1e9) {
        var Y;
        for (Y = 0; Y < u.MAX_HEADER_BUF; ++Y) L.header[Y].write_timing -= k;
        k = 0;
      }
      return 0;
    }, this.copy_buffer = function (O, L, D, U, H) {
      var Y = A + 1;
      if (Y <= 0) return 0;
      if (U != 0 && Y > U) return -1;
      if (t.arraycopy(w, 0, L, D, Y), A = -1, S = 0, H != 0) {
        var K = i(1);
        if (K[0] = O.nMusicCRC, _.updateMusicCRC(K, L, D, Y), O.nMusicCRC = K[0], Y > 0 && (O.VBR_seek_table.nBytesWritten += Y), O.decode_on_the_fly) {
          for (var W = a([2, 1152]), Q = Y, q = -1, ne; q != 0;) if (q = b.hip_decode1_unclipped(O.hip, L, D, Q, W[0], W[1]), Q = 0, q == -1 && (q = 0), q > 0) {
            if (o(q <= 1152), O.findPeakSample) {
              for (ne = 0; ne < q; ne++) W[0][ne] > O.PeakSample ? O.PeakSample = W[0][ne] : -W[0][ne] > O.PeakSample && (O.PeakSample = -W[0][ne]);
              if (O.channels_out > 1) for (ne = 0; ne < q; ne++) W[1][ne] > O.PeakSample ? O.PeakSample = W[1][ne] : -W[1][ne] > O.PeakSample && (O.PeakSample = -W[1][ne]);
            }
            if (O.findReplayGain && y.AnalyzeSamples(O.rgdata, W[0], 0, W[1], 0, q, O.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
          }
        }
      }
      return Y;
    }, this.init_bit_stream_w = function (O) {
      w = r(Lame.LAME_MAXMP3BUFFER), O.h_ptr = O.w_ptr = 0, O.header[O.h_ptr].write_timing = 0, A = -1, S = 0, k = 0;
    };
  }
  return vlt = h, vlt;
}

var wlt, tpn;

function YVi() {
  if (tpn) return wlt;
  tpn = 1;
  var e = jf(),
    t = e.System,
    n = e.VbrMode;
  e.Float;
  var r = e.ShortBlock;
  e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double;
  var a = e.new_float;
  e.new_float_n, e.new_int;
  var i = e.new_int_n,
    o = e.new_short_n,
    s = e.assert,
    l = $Vi(),
    d = GVi(),
    u = aZe(),
    h = qVi(),
    p = KVi(),
    m = QVi(),
    f = Lmr(),
    y = Fzt(),
    b = Lx();
  function v() {
    var _ = this,
      w = 128 * 1024;
    v.V9 = 410, v.V8 = 420, v.V7 = 430, v.V6 = 440, v.V5 = 450, v.V4 = 460, v.V3 = 470, v.V2 = 480, v.V1 = 490, v.V0 = 500, v.R3MIX = 1e3, v.STANDARD = 1001, v.EXTREME = 1002, v.INSANE = 1003, v.STANDARD_FAST = 1004, v.EXTREME_FAST = 1005, v.MEDIUM = 1006, v.MEDIUM_FAST = 1007;
    var k = 16384 + w;
    v.LAME_MAXMP3BUFFER = k;
    var A,
      S,
      C,
      I,
      E,
      M = new l(),
      T,
      P,
      R;
    this.enc = new b(), this.setModules = function (X, Z, re, fe, ye, ie, ae, be, Ee) {
      A = X, S = Z, C = re, I = fe, E = ye, T = ie, P = be, R = Ee, this.enc.setModules(S, M, I, T);
    };
    function j() {
      this.mask_adjust = 0, this.mask_adjust_short = 0, this.bo_l_weight = a(b.SBMAX_l), this.bo_s_weight = a(b.SBMAX_s);
    }
    function B() {
      this.lowerlimit = 0;
    }
    function F(X, Z) {
      this.lowpass = Z;
    }
    var N = 4294479419;
    function G(X) {
      var Z;
      return X.class_id = N, Z = X.internal_flags = new u(), X.mode = MPEGMode.NOT_SET, X.original = 1, X.in_samplerate = 44100, X.num_channels = 2, X.num_samples = -1, X.bWriteVbrTag = !0, X.quality = -1, X.short_blocks = null, Z.subblock_gain = -1, X.lowpassfreq = 0, X.highpassfreq = 0, X.lowpasswidth = -1, X.highpasswidth = -1, X.VBR = n.vbr_off, X.VBR_q = 4, X.ATHcurve = -1, X.VBR_mean_bitrate_kbps = 128, X.VBR_min_bitrate_kbps = 0, X.VBR_max_bitrate_kbps = 0, X.VBR_hard_min = 0, Z.VBR_min_bitrate = 1, Z.VBR_max_bitrate = 13, X.quant_comp = -1, X.quant_comp_short = -1, X.msfix = -1, Z.resample_ratio = 1, Z.OldValue[0] = 180, Z.OldValue[1] = 180, Z.CurrentStep[0] = 4, Z.CurrentStep[1] = 4, Z.masking_lower = 1, Z.nsPsy.attackthre = -1, Z.nsPsy.attackthre_s = -1, X.scale = -1, X.athaa_type = -1, X.ATHtype = -1, X.athaa_loudapprox = -1, X.athaa_sensitivity = 0, X.useTemporal = null, X.interChRatio = -1, Z.mf_samples_to_encode = b.ENCDELAY + b.POSTDELAY, X.encoder_padding = 0, Z.mf_size = b.ENCDELAY - b.MDCTDELAY, X.findReplayGain = !1, X.decode_on_the_fly = !1, Z.decode_on_the_fly = !1, Z.findReplayGain = !1, Z.findPeakSample = !1, Z.RadioGain = 0, Z.AudiophileGain = 0, Z.noclipGainChange = 0, Z.noclipScale = -1, X.preset = 0, X.write_id3tag_automatic = !0, 0;
    }
    this.lame_init = function () {
      var X = new d();
      return G(X), X.lame_allocated_gfp = 1, X;
    };
    function z(X) {
      return X > 1 ? 0 : X <= 0 ? 1 : Math.cos(Math.PI / 2 * X);
    }
    this.nearestBitrateFullIndex = function (X) {
      var Z = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
        re = 0,
        fe = 0,
        ye = 0,
        ie = 0;
      ie = Z[16], ye = 16, fe = Z[16], re = 16;
      for (var ae = 0; ae < 16; ae++) if (Math.max(X, Z[ae + 1]) != X) {
        ie = Z[ae + 1], ye = ae + 1, fe = Z[ae], re = ae;
        break;
      }
      return ie - X > X - fe ? re : ye;
    };
    function V(X, Z) {
      var re = 44100;
      return Z >= 48e3 ? re = 48e3 : Z >= 44100 ? re = 44100 : Z >= 32e3 ? re = 32e3 : Z >= 24e3 ? re = 24e3 : Z >= 22050 ? re = 22050 : Z >= 16e3 ? re = 16e3 : Z >= 12e3 ? re = 12e3 : Z >= 11025 ? re = 11025 : Z >= 8e3 && (re = 8e3), X == -1 ? re : (X <= 15960 && (re = 44100), X <= 15250 && (re = 32e3), X <= 11220 && (re = 24e3), X <= 9970 && (re = 22050), X <= 7230 && (re = 16e3), X <= 5420 && (re = 12e3), X <= 4510 && (re = 11025), X <= 3970 && (re = 8e3), Z < re ? Z > 44100 ? 48e3 : Z > 32e3 ? 44100 : Z > 24e3 ? 32e3 : Z > 22050 ? 24e3 : Z > 16e3 ? 22050 : Z > 12e3 ? 16e3 : Z > 11025 ? 12e3 : Z > 8e3 ? 11025 : 8e3 : re);
    }
    function O(X, Z) {
      switch (X) {
        case 44100:
          return Z.version = 1, 0;
        case 48e3:
          return Z.version = 1, 1;
        case 32e3:
          return Z.version = 1, 2;
        case 22050:
          return Z.version = 0, 0;
        case 24e3:
          return Z.version = 0, 1;
        case 16e3:
          return Z.version = 0, 2;
        case 11025:
          return Z.version = 0, 0;
        case 12e3:
          return Z.version = 0, 1;
        case 8e3:
          return Z.version = 0, 2;
        default:
          return Z.version = 0, -1;
      }
    }
    function L(X, Z, re) {
      re < 16e3 && (Z = 2);
      for (var fe = y.bitrate_table[Z][1], ye = 2; ye <= 14; ye++) y.bitrate_table[Z][ye] > 0 && Math.abs(y.bitrate_table[Z][ye] - X) < Math.abs(fe - X) && (fe = y.bitrate_table[Z][ye]);
      return fe;
    }
    function D(X, Z, re) {
      re < 16e3 && (Z = 2);
      for (var fe = 0; fe <= 14; fe++) if (y.bitrate_table[Z][fe] > 0 && y.bitrate_table[Z][fe] == X) return fe;
      return -1;
    }
    function U(X, Z) {
      var re = [new F(8, 2e3), new F(16, 3700), new F(24, 3900), new F(32, 5500), new F(40, 7e3), new F(48, 7500), new F(56, 1e4), new F(64, 11e3), new F(80, 13500), new F(96, 15100), new F(112, 15600), new F(128, 17e3), new F(160, 17500), new F(192, 18600), new F(224, 19400), new F(256, 19700), new F(320, 20500)],
        fe = _.nearestBitrateFullIndex(Z);
      X.lowerlimit = re[fe].lowpass;
    }
    function H(X) {
      var Z = X.internal_flags,
        re = 32,
        fe = -1;
      if (Z.lowpass1 > 0) {
        for (var ye = 999, ie = 0; ie <= 31; ie++) {
          var ae = ie / 31;
          ae >= Z.lowpass2 && (re = Math.min(re, ie)), Z.lowpass1 < ae && ae < Z.lowpass2 && (ye = Math.min(ye, ie));
        }
        ye == 999 ? Z.lowpass1 = (re - .75) / 31 : Z.lowpass1 = (ye - .75) / 31, Z.lowpass2 = re / 31;
      }
      if (Z.highpass2 > 0 && Z.highpass2 < .9 * (.75 / 31) && (Z.highpass1 = 0, Z.highpass2 = 0, t.err.println(`Warning: highpass filter disabled.  highpass frequency too small
`)), Z.highpass2 > 0) {
        for (var be = -1, ie = 0; ie <= 31; ie++) {
          var ae = ie / 31;
          ae <= Z.highpass1 && (fe = Math.max(fe, ie)), Z.highpass1 < ae && ae < Z.highpass2 && (be = Math.max(be, ie));
        }
        Z.highpass1 = fe / 31, be == -1 ? Z.highpass2 = (fe + .75) / 31 : Z.highpass2 = (be + .75) / 31;
      }
      for (var ie = 0; ie < 32; ie++) {
        var Ee,
          xe,
          ae = ie / 31;
        Z.highpass2 > Z.highpass1 ? Ee = z((Z.highpass2 - ae) / (Z.highpass2 - Z.highpass1 + 1e-20)) : Ee = 1, Z.lowpass2 > Z.lowpass1 ? xe = z((ae - Z.lowpass1) / (Z.lowpass2 - Z.lowpass1 + 1e-20)) : xe = 1, Z.amp_filter[ie] = Ee * xe;
      }
    }
    function Y(X) {
      var Z = X.internal_flags;
      switch (X.quality) {
        default:
        case 9:
          Z.psymodel = 0, Z.noise_shaping = 0, Z.noise_shaping_amp = 0, Z.noise_shaping_stop = 0, Z.use_best_huffman = 0, Z.full_outer_loop = 0;
          break;
        case 8:
          X.quality = 7;
        case 7:
          Z.psymodel = 1, Z.noise_shaping = 0, Z.noise_shaping_amp = 0, Z.noise_shaping_stop = 0, Z.use_best_huffman = 0, Z.full_outer_loop = 0;
          break;
        case 6:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.noise_shaping_amp = 0, Z.noise_shaping_stop = 0, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 0, Z.full_outer_loop = 0;
          break;
        case 5:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.noise_shaping_amp = 0, Z.noise_shaping_stop = 0, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 0, Z.full_outer_loop = 0;
          break;
        case 4:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.noise_shaping_amp = 0, Z.noise_shaping_stop = 0, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 1, Z.full_outer_loop = 0;
          break;
        case 3:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.noise_shaping_amp = 1, Z.noise_shaping_stop = 1, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 1, Z.full_outer_loop = 0;
          break;
        case 2:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.substep_shaping == 0 && (Z.substep_shaping = 2), Z.noise_shaping_amp = 1, Z.noise_shaping_stop = 1, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 1, Z.full_outer_loop = 0;
          break;
        case 1:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.substep_shaping == 0 && (Z.substep_shaping = 2), Z.noise_shaping_amp = 2, Z.noise_shaping_stop = 1, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 1, Z.full_outer_loop = 0;
          break;
        case 0:
          Z.psymodel = 1, Z.noise_shaping == 0 && (Z.noise_shaping = 1), Z.substep_shaping == 0 && (Z.substep_shaping = 2), Z.noise_shaping_amp = 2, Z.noise_shaping_stop = 1, Z.subblock_gain == -1 && (Z.subblock_gain = 1), Z.use_best_huffman = 1, Z.full_outer_loop = 0;
          break;
      }
    }
    function K(X) {
      var Z = X.internal_flags;
      X.frameNum = 0, X.write_id3tag_automatic && P.id3tag_write_v2(X), Z.bitrate_stereoMode_Hist = i([16, 5]), Z.bitrate_blockType_Hist = i([16, 6]), Z.PeakSample = 0, X.bWriteVbrTag && T.InitVbrTag(X);
    }
    this.lame_init_params = function (X) {
      var Z = X.internal_flags;
      if (Z.Class_ID = 0, Z.ATH == null && (Z.ATH = new h()), Z.PSY == null && (Z.PSY = new j()), Z.rgdata == null && (Z.rgdata = new p()), Z.channels_in = X.num_channels, Z.channels_in == 1 && (X.mode = MPEGMode.MONO), Z.channels_out = X.mode == MPEGMode.MONO ? 1 : 2, Z.mode_ext = b.MPG_MD_MS_LR, X.mode == MPEGMode.MONO && (X.force_ms = !1), X.VBR == n.vbr_off && X.VBR_mean_bitrate_kbps != 128 && X.brate == 0 && (X.brate = X.VBR_mean_bitrate_kbps), X.VBR == n.vbr_off || X.VBR == n.vbr_mtrh || X.VBR == n.vbr_mt || (X.free_format = !1), X.VBR == n.vbr_off && X.brate == 0 && f.EQ(X.compression_ratio, 0) && (X.compression_ratio = 11.025), X.VBR == n.vbr_off && X.compression_ratio > 0 && (X.out_samplerate == 0 && (X.out_samplerate = map2MP3Frequency(int(.97 * X.in_samplerate))), X.brate = 0 | X.out_samplerate * 16 * Z.channels_out / (1e3 * X.compression_ratio), Z.samplerate_index = O(X.out_samplerate, X), X.free_format || (X.brate = L(X.brate, X.version, X.out_samplerate))), X.out_samplerate != 0 && (X.out_samplerate < 16e3 ? (X.VBR_mean_bitrate_kbps = Math.max(X.VBR_mean_bitrate_kbps, 8), X.VBR_mean_bitrate_kbps = Math.min(X.VBR_mean_bitrate_kbps, 64)) : X.out_samplerate < 32e3 ? (X.VBR_mean_bitrate_kbps = Math.max(X.VBR_mean_bitrate_kbps, 8), X.VBR_mean_bitrate_kbps = Math.min(X.VBR_mean_bitrate_kbps, 160)) : (X.VBR_mean_bitrate_kbps = Math.max(X.VBR_mean_bitrate_kbps, 32), X.VBR_mean_bitrate_kbps = Math.min(X.VBR_mean_bitrate_kbps, 320))), X.lowpassfreq == 0) {
        var re = 16e3;
        switch (X.VBR) {
          case n.vbr_off:
            {
              var fe = new B();
              U(fe, X.brate), re = fe.lowerlimit;
              break;
            }
          case n.vbr_abr:
            {
              var fe = new B();
              U(fe, X.VBR_mean_bitrate_kbps), re = fe.lowerlimit;
              break;
            }
          case n.vbr_rh:
            {
              var ye = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];
              if (0 <= X.VBR_q && X.VBR_q <= 9) {
                var ie = ye[X.VBR_q],
                  ae = ye[X.VBR_q + 1],
                  be = X.VBR_q_frac;
                re = linear_int(ie, ae, be);
              } else re = 19500;
              break;
            }
          default:
            {
              var ye = [19500, 19e3, 18500, 18e3, 17500, 16500, 15500, 14500, 12500, 9500, 3950];
              if (0 <= X.VBR_q && X.VBR_q <= 9) {
                var ie = ye[X.VBR_q],
                  ae = ye[X.VBR_q + 1],
                  be = X.VBR_q_frac;
                re = linear_int(ie, ae, be);
              } else re = 19500;
            }
        }
        X.mode == MPEGMode.MONO && (X.VBR == n.vbr_off || X.VBR == n.vbr_abr) && (re *= 1.5), X.lowpassfreq = re | 0;
      }
      if (X.out_samplerate == 0 && (2 * X.lowpassfreq > X.in_samplerate && (X.lowpassfreq = X.in_samplerate / 2), X.out_samplerate = V(X.lowpassfreq | 0, X.in_samplerate)), X.lowpassfreq = Math.min(20500, X.lowpassfreq), X.lowpassfreq = Math.min(X.out_samplerate / 2, X.lowpassfreq), X.VBR == n.vbr_off && (X.compression_ratio = X.out_samplerate * 16 * Z.channels_out / (1e3 * X.brate)), X.VBR == n.vbr_abr && (X.compression_ratio = X.out_samplerate * 16 * Z.channels_out / (1e3 * X.VBR_mean_bitrate_kbps)), X.bWriteVbrTag || (X.findReplayGain = !1, X.decode_on_the_fly = !1, Z.findPeakSample = !1), Z.findReplayGain = X.findReplayGain, Z.decode_on_the_fly = X.decode_on_the_fly, Z.decode_on_the_fly && (Z.findPeakSample = !0), Z.findReplayGain && A.InitGainAnalysis(Z.rgdata, X.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) return X.internal_flags = null, -6;
      switch (Z.decode_on_the_fly && !X.decode_only && (Z.hip != null && R.hip_decode_exit(Z.hip), Z.hip = R.hip_decode_init()), Z.mode_gr = X.out_samplerate <= 24e3 ? 1 : 2, X.framesize = 576 * Z.mode_gr, X.encoder_delay = b.ENCDELAY, Z.resample_ratio = X.in_samplerate / X.out_samplerate, X.VBR) {
        case n.vbr_mt:
        case n.vbr_rh:
        case n.vbr_mtrh:
          {
            var Ee = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5];
            X.compression_ratio = Ee[X.VBR_q];
          }
          break;
        case n.vbr_abr:
          X.compression_ratio = X.out_samplerate * 16 * Z.channels_out / (1e3 * X.VBR_mean_bitrate_kbps);
          break;
        default:
          X.compression_ratio = X.out_samplerate * 16 * Z.channels_out / (1e3 * X.brate);
          break;
      }
      if (X.mode == MPEGMode.NOT_SET && (X.mode = MPEGMode.JOINT_STEREO), X.highpassfreq > 0 ? (Z.highpass1 = 2 * X.highpassfreq, X.highpasswidth >= 0 ? Z.highpass2 = 2 * (X.highpassfreq + X.highpasswidth) : Z.highpass2 = 2 * X.highpassfreq, Z.highpass1 /= X.out_samplerate, Z.highpass2 /= X.out_samplerate) : (Z.highpass1 = 0, Z.highpass2 = 0), X.lowpassfreq > 0 ? (Z.lowpass2 = 2 * X.lowpassfreq, X.lowpasswidth >= 0 ? (Z.lowpass1 = 2 * (X.lowpassfreq - X.lowpasswidth), Z.lowpass1 < 0 && (Z.lowpass1 = 0)) : Z.lowpass1 = 2 * X.lowpassfreq, Z.lowpass1 /= X.out_samplerate, Z.lowpass2 /= X.out_samplerate) : (Z.lowpass1 = 0, Z.lowpass2 = 0), H(X), Z.samplerate_index = O(X.out_samplerate, X), Z.samplerate_index < 0) return X.internal_flags = null, -1;
      if (X.VBR == n.vbr_off) {
        if (X.free_format) Z.bitrate_index = 0;else if (X.brate = L(X.brate, X.version, X.out_samplerate), Z.bitrate_index = D(X.brate, X.version, X.out_samplerate), Z.bitrate_index <= 0) return X.internal_flags = null, -1;
      } else Z.bitrate_index = 1;
      X.analysis && (X.bWriteVbrTag = !1), Z.pinfo != null && (X.bWriteVbrTag = !1), S.init_bit_stream_w(Z);
      for (var xe = Z.samplerate_index + 3 * X.version + 6 * (X.out_samplerate < 16e3 ? 1 : 0), he = 0; he < b.SBMAX_l + 1; he++) Z.scalefac_band.l[he] = I.sfBandIndex[xe].l[he];
      for (var he = 0; he < b.PSFB21 + 1; he++) {
        var ue = (Z.scalefac_band.l[22] - Z.scalefac_band.l[21]) / b.PSFB21,
          ge = Z.scalefac_band.l[21] + he * ue;
        Z.scalefac_band.psfb21[he] = ge;
      }
      Z.scalefac_band.psfb21[b.PSFB21] = 576;
      for (var he = 0; he < b.SBMAX_s + 1; he++) Z.scalefac_band.s[he] = I.sfBandIndex[xe].s[he];
      for (var he = 0; he < b.PSFB12 + 1; he++) {
        var ue = (Z.scalefac_band.s[13] - Z.scalefac_band.s[12]) / b.PSFB12,
          ge = Z.scalefac_band.s[12] + he * ue;
        Z.scalefac_band.psfb12[he] = ge;
      }
      Z.scalefac_band.psfb12[b.PSFB12] = 192, X.version == 1 ? Z.sideinfo_len = Z.channels_out == 1 ? 21 : 36 : Z.sideinfo_len = Z.channels_out == 1 ? 13 : 21, X.error_protection && (Z.sideinfo_len += 2), K(X), Z.Class_ID = N;
      {
        var _e;
        for (_e = 0; _e < 19; _e++) Z.nsPsy.pefirbuf[_e] = 700 * Z.mode_gr * Z.channels_out;
        X.ATHtype == -1 && (X.ATHtype = 4);
      }
      switch (s(X.VBR_q <= 9), s(X.VBR_q >= 0), X.VBR) {
        case n.vbr_mt:
          X.VBR = n.vbr_mtrh;
        case n.vbr_mtrh:
          {
            X.useTemporal == null && (X.useTemporal = !1), C.apply_preset(X, 500 - X.VBR_q * 10, 0), X.quality < 0 && (X.quality = LAME_DEFAULT_QUALITY), X.quality < 5 && (X.quality = 0), X.quality > 5 && (X.quality = 5), Z.PSY.mask_adjust = X.maskingadjust, Z.PSY.mask_adjust_short = X.maskingadjust_short, X.experimentalY ? Z.sfb21_extra = !1 : Z.sfb21_extra = X.out_samplerate > 44e3, Z.iteration_loop = new VBRNewIterationLoop(E);
            break;
          }
        case n.vbr_rh:
          {
            C.apply_preset(X, 500 - X.VBR_q * 10, 0), Z.PSY.mask_adjust = X.maskingadjust, Z.PSY.mask_adjust_short = X.maskingadjust_short, X.experimentalY ? Z.sfb21_extra = !1 : Z.sfb21_extra = X.out_samplerate > 44e3, X.quality > 6 && (X.quality = 6), X.quality < 0 && (X.quality = LAME_DEFAULT_QUALITY), Z.iteration_loop = new VBROldIterationLoop(E);
            break;
          }
        default:
          {
            var ke;
            Z.sfb21_extra = !1, X.quality < 0 && (X.quality = LAME_DEFAULT_QUALITY), ke = X.VBR, ke == n.vbr_off && (X.VBR_mean_bitrate_kbps = X.brate), C.apply_preset(X, X.VBR_mean_bitrate_kbps, 0), X.VBR = ke, Z.PSY.mask_adjust = X.maskingadjust, Z.PSY.mask_adjust_short = X.maskingadjust_short, ke == n.vbr_off ? Z.iteration_loop = new m(E) : Z.iteration_loop = new ABRIterationLoop(E);
            break;
          }
      }
      if (s(X.scale >= 0), X.VBR != n.vbr_off) {
        if (Z.VBR_min_bitrate = 1, Z.VBR_max_bitrate = 14, X.out_samplerate < 16e3 && (Z.VBR_max_bitrate = 8), X.VBR_min_bitrate_kbps != 0 && (X.VBR_min_bitrate_kbps = L(X.VBR_min_bitrate_kbps, X.version, X.out_samplerate), Z.VBR_min_bitrate = D(X.VBR_min_bitrate_kbps, X.version, X.out_samplerate), Z.VBR_min_bitrate < 0) || X.VBR_max_bitrate_kbps != 0 && (X.VBR_max_bitrate_kbps = L(X.VBR_max_bitrate_kbps, X.version, X.out_samplerate), Z.VBR_max_bitrate = D(X.VBR_max_bitrate_kbps, X.version, X.out_samplerate), Z.VBR_max_bitrate < 0)) return -1;
        X.VBR_min_bitrate_kbps = y.bitrate_table[X.version][Z.VBR_min_bitrate], X.VBR_max_bitrate_kbps = y.bitrate_table[X.version][Z.VBR_max_bitrate], X.VBR_mean_bitrate_kbps = Math.min(y.bitrate_table[X.version][Z.VBR_max_bitrate], X.VBR_mean_bitrate_kbps), X.VBR_mean_bitrate_kbps = Math.max(y.bitrate_table[X.version][Z.VBR_min_bitrate], X.VBR_mean_bitrate_kbps);
      }
      return X.tune && (Z.PSY.mask_adjust += X.tune_value_a, Z.PSY.mask_adjust_short += X.tune_value_a), Y(X), s(X.scale >= 0), X.athaa_type < 0 ? Z.ATH.useAdjust = 3 : Z.ATH.useAdjust = X.athaa_type, Z.ATH.aaSensitivityP = Math.pow(10, X.athaa_sensitivity / -10), X.short_blocks == null && (X.short_blocks = r.short_block_allowed), X.short_blocks == r.short_block_allowed && (X.mode == MPEGMode.JOINT_STEREO || X.mode == MPEGMode.STEREO) && (X.short_blocks = r.short_block_coupled), X.quant_comp < 0 && (X.quant_comp = 1), X.quant_comp_short < 0 && (X.quant_comp_short = 0), X.msfix < 0 && (X.msfix = 0), X.exp_nspsytune = X.exp_nspsytune | 1, X.internal_flags.nsPsy.attackthre < 0 && (X.internal_flags.nsPsy.attackthre = l.NSATTACKTHRE), X.internal_flags.nsPsy.attackthre_s < 0 && (X.internal_flags.nsPsy.attackthre_s = l.NSATTACKTHRE_S), s(X.scale >= 0), X.scale < 0 && (X.scale = 1), X.ATHtype < 0 && (X.ATHtype = 4), X.ATHcurve < 0 && (X.ATHcurve = 4), X.athaa_loudapprox < 0 && (X.athaa_loudapprox = 2), X.interChRatio < 0 && (X.interChRatio = 0), X.useTemporal == null && (X.useTemporal = !0), Z.slot_lag = Z.frac_SpF = 0, X.VBR == n.vbr_off && (Z.slot_lag = Z.frac_SpF = (X.version + 1) * 72e3 * X.brate % X.out_samplerate | 0), I.iteration_init(X), M.psymodel_init(X), s(X.scale >= 0), 0;
    };
    function W(X, Z) {
      (X.in_buffer_0 == null || X.in_buffer_nsamples < Z) && (X.in_buffer_0 = a(Z), X.in_buffer_1 = a(Z), X.in_buffer_nsamples = Z);
    }
    this.lame_encode_flush = function (X, Z, re, fe) {
      var ye = X.internal_flags,
        ie = o([2, 1152]),
        ae = 0,
        be,
        Ee,
        xe,
        he,
        ue = ye.mf_samples_to_encode - b.POSTDELAY,
        ge = Q(X);
      if (ye.mf_samples_to_encode < 1) return 0;
      for (be = 0, X.in_samplerate != X.out_samplerate && (ue += 16 * X.out_samplerate / X.in_samplerate), xe = X.framesize - ue % X.framesize, xe < 576 && (xe += X.framesize), X.encoder_padding = xe, he = (ue + xe) / X.framesize; he > 0 && ae >= 0;) {
        var _e = ge - ye.mf_size,
          ke = X.frameNum;
        _e *= X.in_samplerate, _e /= X.out_samplerate, _e > 1152 && (_e = 1152), _e < 1 && (_e = 1), Ee = fe - be, fe == 0 && (Ee = 0), ae = this.lame_encode_buffer(X, ie[0], ie[1], _e, Z, re, Ee), re += ae, be += ae, he -= ke != X.frameNum ? 1 : 0;
      }
      if (ye.mf_samples_to_encode = 0, ae < 0 || (Ee = fe - be, fe == 0 && (Ee = 0), S.flush_bitstream(X), ae = S.copy_buffer(ye, Z, re, Ee, 1), ae < 0)) return ae;
      if (re += ae, be += ae, Ee = fe - be, fe == 0 && (Ee = 0), X.write_id3tag_automatic) {
        if (P.id3tag_write_v1(X), ae = S.copy_buffer(ye, Z, re, Ee, 0), ae < 0) return ae;
        be += ae;
      }
      return be;
    }, this.lame_encode_buffer = function (X, Z, re, fe, ye, ie, ae) {
      var be = X.internal_flags,
        Ee = [null, null];
      if (be.Class_ID != N) return -3;
      if (fe == 0) return 0;
      W(be, fe), Ee[0] = be.in_buffer_0, Ee[1] = be.in_buffer_1;
      for (var xe = 0; xe < fe; xe++) Ee[0][xe] = Z[xe], be.channels_in > 1 && (Ee[1][xe] = re[xe]);
      return q(X, Ee[0], Ee[1], fe, ye, ie, ae);
    };
    function Q(X) {
      var Z = b.BLKSIZE + X.framesize - b.FFTOFFSET;
      return Z = Math.max(Z, 512 + X.framesize - 32), s(u.MFSIZE >= Z), Z;
    }
    function q(X, Z, re, fe, ye, ie, ae) {
      var be = X.internal_flags,
        Ee = 0,
        xe,
        he,
        ue,
        ge,
        _e,
        ke = [null, null],
        ve = [null, null];
      if (be.Class_ID != N) return -3;
      if (fe == 0) return 0;
      if (_e = S.copy_buffer(be, ye, ie, ae, 0), _e < 0) return _e;
      if (ie += _e, Ee += _e, ve[0] = Z, ve[1] = re, f.NEQ(X.scale, 0) && f.NEQ(X.scale, 1)) for (he = 0; he < fe; ++he) ve[0][he] *= X.scale, be.channels_out == 2 && (ve[1][he] *= X.scale);
      if (f.NEQ(X.scale_left, 0) && f.NEQ(X.scale_left, 1)) for (he = 0; he < fe; ++he) ve[0][he] *= X.scale_left;
      if (f.NEQ(X.scale_right, 0) && f.NEQ(X.scale_right, 1)) for (he = 0; he < fe; ++he) ve[1][he] *= X.scale_right;
      if (X.num_channels == 2 && be.channels_out == 1) for (he = 0; he < fe; ++he) ve[0][he] = .5 * (ve[0][he] + ve[1][he]), ve[1][he] = 0;
      ge = Q(X), ke[0] = be.mfbuf[0], ke[1] = be.mfbuf[1];
      for (var Te = 0; fe > 0;) {
        var Ne = [null, null],
          me = 0,
          Ae = 0;
        Ne[0] = ve[0], Ne[1] = ve[1];
        var Fe = new de();
        if (we(X, ke, Ne, Te, fe, Fe), me = Fe.n_in, Ae = Fe.n_out, be.findReplayGain && !be.decode_on_the_fly && A.AnalyzeSamples(be.rgdata, ke[0], be.mf_size, ke[1], be.mf_size, Ae, be.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
        if (fe -= me, Te += me, be.channels_out == 2, be.mf_size += Ae, s(be.mf_size <= u.MFSIZE), be.mf_samples_to_encode < 1 && (be.mf_samples_to_encode = b.ENCDELAY + b.POSTDELAY), be.mf_samples_to_encode += Ae, be.mf_size >= ge) {
          var Me = ae - Ee;
          if (ae == 0 && (Me = 0), xe = ne(X, ke[0], ke[1], ye, ie, Me), xe < 0) return xe;
          for (ie += xe, Ee += xe, be.mf_size -= X.framesize, be.mf_samples_to_encode -= X.framesize, ue = 0; ue < be.channels_out; ue++) for (he = 0; he < be.mf_size; he++) ke[ue][he] = ke[ue][he + X.framesize];
        }
      }
      return s(fe == 0), Ee;
    }
    function ne(X, Z, re, fe, ye, ie) {
      var ae = _.enc.lame_encode_mp3_frame(X, Z, re, fe, ye, ie);
      return X.frameNum++, ae;
    }
    function de() {
      this.n_in = 0, this.n_out = 0;
    }
    function le() {
      this.num_used = 0;
    }
    function J(X, Z) {
      return Z != 0 ? J(Z, X % Z) : X;
    }
    function pe(X, Z, re) {
      var fe = Math.PI * Z;
      X /= re, X < 0 && (X = 0), X > 1 && (X = 1);
      var ye = X - .5,
        ie = .42 - .5 * Math.cos(2 * X * Math.PI) + .08 * Math.cos(4 * X * Math.PI);
      return Math.abs(ye) < 1e-9 ? fe / Math.PI : ie * Math.sin(re * fe * ye) / (Math.PI * re * ye);
    }
    function ce(X, Z, re, fe, ye, ie, ae, be, Ee) {
      var xe = X.internal_flags,
        he,
        ue = 0,
        ge,
        _e = X.out_samplerate / J(X.out_samplerate, X.in_samplerate);
      _e > u.BPC && (_e = u.BPC);
      var ke = Math.abs(xe.resample_ratio - Math.floor(.5 + xe.resample_ratio)) < 1e-4 ? 1 : 0,
        ve = 1 / xe.resample_ratio;
      ve > 1 && (ve = 1);
      var Te = 31;
      Te % 2 == 0 && --Te, Te += ke;
      var Ne = Te + 1;
      if (xe.fill_buffer_resample_init == 0) {
        for (xe.inbuf_old[0] = a(Ne), xe.inbuf_old[1] = a(Ne), he = 0; he <= 2 * _e; ++he) xe.blackfilt[he] = a(Ne);
        for (xe.itime[0] = 0, xe.itime[1] = 0, ue = 0; ue <= 2 * _e; ue++) {
          var me = 0,
            Ae = (ue - _e) / (2 * _e);
          for (he = 0; he <= Te; he++) me += xe.blackfilt[ue][he] = pe(he - Ae, ve, Te);
          for (he = 0; he <= Te; he++) xe.blackfilt[ue][he] /= me;
        }
        xe.fill_buffer_resample_init = 1;
      }
      var Fe = xe.inbuf_old[Ee];
      for (ge = 0; ge < fe; ge++) {
        var Me, Re;
        if (Me = ge * xe.resample_ratio, ue = 0 | Math.floor(Me - xe.itime[Ee]), Te + ue - Te / 2 >= ae) break;
        var Ae = Me - xe.itime[Ee] - (ue + .5 * (Te % 2));
        s(Math.abs(Ae) <= .501), Re = 0 | Math.floor(Ae * 2 * _e + _e + .5);
        var $e = 0;
        for (he = 0; he <= Te; ++he) {
          var rt = 0 | he + ue - Te / 2,
            nt;
          s(rt < ae), s(rt + Ne >= 0), nt = rt < 0 ? Fe[Ne + rt] : ye[ie + rt], $e += nt * xe.blackfilt[Re][he];
        }
        Z[re + ge] = $e;
      }
      if (be.num_used = Math.min(ae, Te + ue - Te / 2), xe.itime[Ee] += be.num_used - ge * xe.resample_ratio, be.num_used >= Ne) for (he = 0; he < Ne; he++) Fe[he] = ye[ie + be.num_used + he - Ne];else {
        var ze = Ne - be.num_used;
        for (he = 0; he < ze; ++he) Fe[he] = Fe[he + be.num_used];
        for (ue = 0; he < Ne; ++he, ++ue) Fe[he] = ye[ie + ue];
        s(ue == be.num_used);
      }
      return ge;
    }
    function we(X, Z, re, fe, ye, ie) {
      var ae = X.internal_flags;
      if (ae.resample_ratio < .9999 || ae.resample_ratio > 1.0001) for (var be = 0; be < ae.channels_out; be++) {
        var Ee = new le();
        ie.n_out = ce(X, Z[be], ae.mf_size, X.framesize, re[be], fe, ye, Ee, be), ie.n_in = Ee.num_used;
      } else {
        ie.n_out = Math.min(X.framesize, ye), ie.n_in = ie.n_out;
        for (var xe = 0; xe < ie.n_out; ++xe) Z[0][ae.mf_size + xe] = re[0][fe + xe], ae.channels_out == 2 && (Z[1][ae.mf_size + xe] = re[1][fe + xe]);
      }
    }
  }
  return wlt = v, wlt;
}

var xlt, npn;

function XVi() {
  if (npn) return xlt;
  npn = 1;
  var e = jf();
  e.System;
  var t = e.VbrMode;
  e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n, e.new_byte, e.new_double, e.new_float, e.new_float_n, e.new_int, e.new_int_n, e.assert;
  function n() {
    function r(p, m, f, y, b, v, _, w, k, A, S, C, I, E, M) {
      this.vbr_q = p, this.quant_comp = m, this.quant_comp_s = f, this.expY = y, this.st_lrm = b, this.st_s = v, this.masking_adj = _, this.masking_adj_short = w, this.ath_lower = k, this.ath_curve = A, this.ath_sensitivity = S, this.interch = C, this.safejoint = I, this.sfb21mod = E, this.msfix = M;
    }
    function a(p, m, f, y, b, v, _, w, k, A, S, C, I, E) {
      this.quant_comp = m, this.quant_comp_s = f, this.safejoint = y, this.nsmsfix = b, this.st_lrm = v, this.st_s = _, this.nsbass = w, this.scale = k, this.masking_adj = A, this.ath_lower = S, this.ath_curve = C, this.interch = I, this.sfscale = E;
    }
    var i;
    this.setModules = function (p) {
      i = p;
    };
    var o = [new r(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97), new r(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new r(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new r(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new r(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new r(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new r(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3), new r(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new r(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new r(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new r(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)],
      s = [new r(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97), new r(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new r(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new r(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new r(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79), new r(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95), new r(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new r(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new r(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new r(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new r(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)];
    function l(p, m, f) {
      var y = p.VBR == t.vbr_rh ? o : s,
        b = p.VBR_q_frac,
        v = y[m],
        _ = y[m + 1],
        w = v;
      v.st_lrm = v.st_lrm + b * (_.st_lrm - v.st_lrm), v.st_s = v.st_s + b * (_.st_s - v.st_s), v.masking_adj = v.masking_adj + b * (_.masking_adj - v.masking_adj), v.masking_adj_short = v.masking_adj_short + b * (_.masking_adj_short - v.masking_adj_short), v.ath_lower = v.ath_lower + b * (_.ath_lower - v.ath_lower), v.ath_curve = v.ath_curve + b * (_.ath_curve - v.ath_curve), v.ath_sensitivity = v.ath_sensitivity + b * (_.ath_sensitivity - v.ath_sensitivity), v.interch = v.interch + b * (_.interch - v.interch), v.msfix = v.msfix + b * (_.msfix - v.msfix), h(p, w.vbr_q), f != 0 ? p.quant_comp = w.quant_comp : Math.abs(p.quant_comp - -1) > 0 || (p.quant_comp = w.quant_comp), f != 0 ? p.quant_comp_short = w.quant_comp_s : Math.abs(p.quant_comp_short - -1) > 0 || (p.quant_comp_short = w.quant_comp_s), w.expY != 0 && (p.experimentalY = w.expY != 0), f != 0 ? p.internal_flags.nsPsy.attackthre = w.st_lrm : Math.abs(p.internal_flags.nsPsy.attackthre - -1) > 0 || (p.internal_flags.nsPsy.attackthre = w.st_lrm), f != 0 ? p.internal_flags.nsPsy.attackthre_s = w.st_s : Math.abs(p.internal_flags.nsPsy.attackthre_s - -1) > 0 || (p.internal_flags.nsPsy.attackthre_s = w.st_s), f != 0 ? p.maskingadjust = w.masking_adj : Math.abs(p.maskingadjust - 0) > 0 || (p.maskingadjust = w.masking_adj), f != 0 ? p.maskingadjust_short = w.masking_adj_short : Math.abs(p.maskingadjust_short - 0) > 0 || (p.maskingadjust_short = w.masking_adj_short), f != 0 ? p.ATHlower = -w.ath_lower / 10 : Math.abs(-p.ATHlower * 10 - 0) > 0 || (p.ATHlower = -w.ath_lower / 10), f != 0 ? p.ATHcurve = w.ath_curve : Math.abs(p.ATHcurve - -1) > 0 || (p.ATHcurve = w.ath_curve), f != 0 ? p.athaa_sensitivity = w.ath_sensitivity : Math.abs(p.athaa_sensitivity - -1) > 0 || (p.athaa_sensitivity = w.ath_sensitivity), w.interch > 0 && (f != 0 ? p.interChRatio = w.interch : Math.abs(p.interChRatio - -1) > 0 || (p.interChRatio = w.interch)), w.safejoint > 0 && (p.exp_nspsytune = p.exp_nspsytune | w.safejoint), w.sfb21mod > 0 && (p.exp_nspsytune = p.exp_nspsytune | w.sfb21mod << 20), f != 0 ? p.msfix = w.msfix : Math.abs(p.msfix - -1) > 0 || (p.msfix = w.msfix), f == 0 && (p.VBR_q = m, p.VBR_q_frac = b);
    }
    var d = [new a(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1), new a(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1), new a(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1), new a(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1), new a(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new a(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new a(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1), new a(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1), new a(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1), new a(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1), new a(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1), new a(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1), new a(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1), new a(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0), new a(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0), new a(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0), new a(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)];
    function u(p, m, f) {
      var y = m,
        b = i.nearestBitrateFullIndex(m);
      if (p.VBR = t.vbr_abr, p.VBR_mean_bitrate_kbps = y, p.VBR_mean_bitrate_kbps = Math.min(p.VBR_mean_bitrate_kbps, 320), p.VBR_mean_bitrate_kbps = Math.max(p.VBR_mean_bitrate_kbps, 8), p.brate = p.VBR_mean_bitrate_kbps, p.VBR_mean_bitrate_kbps > 320 && (p.disable_reservoir = !0), d[b].safejoint > 0 && (p.exp_nspsytune = p.exp_nspsytune | 2), d[b].sfscale > 0 && (p.internal_flags.noise_shaping = 2), Math.abs(d[b].nsbass) > 0) {
        var v = int(d[b].nsbass * 4);
        v < 0 && (v += 64), p.exp_nspsytune = p.exp_nspsytune | v << 2;
      }
      return f != 0 ? p.quant_comp = d[b].quant_comp : Math.abs(p.quant_comp - -1) > 0 || (p.quant_comp = d[b].quant_comp), f != 0 ? p.quant_comp_short = d[b].quant_comp_s : Math.abs(p.quant_comp_short - -1) > 0 || (p.quant_comp_short = d[b].quant_comp_s), f != 0 ? p.msfix = d[b].nsmsfix : Math.abs(p.msfix - -1) > 0 || (p.msfix = d[b].nsmsfix), f != 0 ? p.internal_flags.nsPsy.attackthre = d[b].st_lrm : Math.abs(p.internal_flags.nsPsy.attackthre - -1) > 0 || (p.internal_flags.nsPsy.attackthre = d[b].st_lrm), f != 0 ? p.internal_flags.nsPsy.attackthre_s = d[b].st_s : Math.abs(p.internal_flags.nsPsy.attackthre_s - -1) > 0 || (p.internal_flags.nsPsy.attackthre_s = d[b].st_s), f != 0 ? p.scale = d[b].scale : Math.abs(p.scale - -1) > 0 || (p.scale = d[b].scale), f != 0 ? p.maskingadjust = d[b].masking_adj : Math.abs(p.maskingadjust - 0) > 0 || (p.maskingadjust = d[b].masking_adj), d[b].masking_adj > 0 ? f != 0 ? p.maskingadjust_short = d[b].masking_adj * .9 : Math.abs(p.maskingadjust_short - 0) > 0 || (p.maskingadjust_short = d[b].masking_adj * .9) : f != 0 ? p.maskingadjust_short = d[b].masking_adj * 1.1 : Math.abs(p.maskingadjust_short - 0) > 0 || (p.maskingadjust_short = d[b].masking_adj * 1.1), f != 0 ? p.ATHlower = -d[b].ath_lower / 10 : Math.abs(-p.ATHlower * 10 - 0) > 0 || (p.ATHlower = -d[b].ath_lower / 10), f != 0 ? p.ATHcurve = d[b].ath_curve : Math.abs(p.ATHcurve - -1) > 0 || (p.ATHcurve = d[b].ath_curve), f != 0 ? p.interChRatio = d[b].interch : Math.abs(p.interChRatio - -1) > 0 || (p.interChRatio = d[b].interch), m;
    }
    this.apply_preset = function (p, m, f) {
      switch (m) {
        case Lame.R3MIX:
          {
            m = Lame.V3, p.VBR = t.vbr_mtrh;
            break;
          }
        case Lame.MEDIUM:
          {
            m = Lame.V4, p.VBR = t.vbr_rh;
            break;
          }
        case Lame.MEDIUM_FAST:
          {
            m = Lame.V4, p.VBR = t.vbr_mtrh;
            break;
          }
        case Lame.STANDARD:
          {
            m = Lame.V2, p.VBR = t.vbr_rh;
            break;
          }
        case Lame.STANDARD_FAST:
          {
            m = Lame.V2, p.VBR = t.vbr_mtrh;
            break;
          }
        case Lame.EXTREME:
          {
            m = Lame.V0, p.VBR = t.vbr_rh;
            break;
          }
        case Lame.EXTREME_FAST:
          {
            m = Lame.V0, p.VBR = t.vbr_mtrh;
            break;
          }
        case Lame.INSANE:
          return m = 320, p.preset = m, u(p, m, f), p.VBR = t.vbr_off, m;
      }
      switch (p.preset = m, m) {
        case Lame.V9:
          return l(p, 9, f), m;
        case Lame.V8:
          return l(p, 8, f), m;
        case Lame.V7:
          return l(p, 7, f), m;
        case Lame.V6:
          return l(p, 6, f), m;
        case Lame.V5:
          return l(p, 5, f), m;
        case Lame.V4:
          return l(p, 4, f), m;
        case Lame.V3:
          return l(p, 3, f), m;
        case Lame.V2:
          return l(p, 2, f), m;
        case Lame.V1:
          return l(p, 1, f), m;
        case Lame.V0:
          return l(p, 0, f), m;
      }
      return 8 <= m && m <= 320 ? u(p, m, f) : (p.preset = 0, m);
    };
    function h(p, m) {
      var f = 0;
      return 0 > m && (f = -1, m = 0), 9 < m && (f = -1, m = 9), p.VBR_q = m, p.VBR_q_frac = 0, f;
    }
  }
  return xlt = n, xlt;
}

var _lt, rpn;

function JVi() {
  if (rpn) return _lt;
  rpn = 1;
  function e() {
    this.setModules = function (t, n) {};
  }
  return _lt = e, _lt;
}

var klt, apn;

function ZVi() {
  if (apn) return klt;
  apn = 1;
  function e() {
    this.over_noise = 0, this.tot_noise = 0, this.max_noise = 0, this.over_count = 0, this.over_SSD = 0, this.bits = 0;
  }
  return klt = e, klt;
}

var Alt, ipn;

function eHi() {
  if (ipn) return Alt;
  ipn = 1;
  var e = jf(),
    t = e.new_float,
    n = e.new_int;
  e.assert;
  function r() {
    this.global_gain = 0, this.sfb_count1 = 0, this.step = n(39), this.noise = t(39), this.noise_log = t(39);
  }
  return Alt = r, Alt;
}

var Slt, opn;

function tHi() {
  if (opn) return Slt;
  opn = 1;
  var e = jf(),
    t = e.System,
    n = e.VbrMode;
  e.Float, e.ShortBlock;
  var r = e.Util,
    a = e.Arrays;
  e.new_array_n, e.new_byte, e.new_double;
  var i = e.new_float;
  e.new_float_n, e.new_int, e.new_int_n;
  var o = e.assert,
    s = JVi(),
    l = ZVi(),
    d = eHi(),
    u = Lx(),
    h = Bzt(),
    p = rZe();
  function m() {
    var f;
    this.rv = null;
    var y;
    this.qupvt = null;
    var b,
      v = new s(),
      _;
    this.setModules = function (B, F, N, G) {
      f = B, y = F, this.rv = F, b = N, this.qupvt = N, _ = G, v.setModules(b, _);
    }, this.ms_convert = function (B, F) {
      for (var N = 0; N < 576; ++N) {
        var G = B.tt[F][0].xr[N],
          z = B.tt[F][1].xr[N];
        B.tt[F][0].xr[N] = (G + z) * (r.SQRT2 * .5), B.tt[F][1].xr[N] = (G - z) * (r.SQRT2 * .5);
      }
    };
    function w(B, F, N, G) {
      G = 0;
      for (var z = 0; z <= N; ++z) {
        var V = Math.abs(B.xr[z]);
        G += V, F[z] = Math.sqrt(V * Math.sqrt(V)), F[z] > B.xrpow_max && (B.xrpow_max = F[z]);
      }
      return G;
    }
    this.init_xrpow = function (B, F, N) {
      var G = 0,
        z = 0 | F.max_nonzero_coeff;
      if (o(N != null), F.xrpow_max = 0, o(0 <= z && z <= 575), a.fill(N, z, 576, 0), G = w(F, N, z, G), G > 1e-20) {
        var V = 0;
        (B.substep_shaping & 2) != 0 && (V = 1);
        for (var O = 0; O < F.psymax; O++) B.pseudohalf[O] = V;
        return !0;
      }
      return a.fill(F.l3_enc, 0, 576, 0), !1;
    };
    function k(B, F) {
      var N = B.ATH,
        G = F.xr;
      if (F.block_type != u.SHORT_TYPE) for (var z = !1, V = u.PSFB21 - 1; V >= 0 && !z; V--) {
        var O = B.scalefac_band.psfb21[V],
          L = B.scalefac_band.psfb21[V + 1],
          D = b.athAdjust(N.adjust, N.psfb21[V], N.floor);
        B.nsPsy.longfact[21] > 1e-12 && (D *= B.nsPsy.longfact[21]);
        for (var U = L - 1; U >= O; U--) if (Math.abs(G[U]) < D) G[U] = 0;else {
          z = !0;
          break;
        }
      } else for (var H = 0; H < 3; H++) for (var z = !1, V = u.PSFB12 - 1; V >= 0 && !z; V--) {
        var O = B.scalefac_band.s[12] * 3 + (B.scalefac_band.s[13] - B.scalefac_band.s[12]) * H + (B.scalefac_band.psfb12[V] - B.scalefac_band.psfb12[0]),
          L = O + (B.scalefac_band.psfb12[V + 1] - B.scalefac_band.psfb12[V]),
          Y = b.athAdjust(N.adjust, N.psfb12[V], N.floor);
        B.nsPsy.shortfact[12] > 1e-12 && (Y *= B.nsPsy.shortfact[12]);
        for (var U = L - 1; U >= O; U--) if (Math.abs(G[U]) < Y) G[U] = 0;else {
          z = !0;
          break;
        }
      }
    }
    this.init_outer_loop = function (B, F) {
      F.part2_3_length = 0, F.big_values = 0, F.count1 = 0, F.global_gain = 210, F.scalefac_compress = 0, F.table_select[0] = 0, F.table_select[1] = 0, F.table_select[2] = 0, F.subblock_gain[0] = 0, F.subblock_gain[1] = 0, F.subblock_gain[2] = 0, F.subblock_gain[3] = 0, F.region0_count = 0, F.region1_count = 0, F.preflag = 0, F.scalefac_scale = 0, F.count1table_select = 0, F.part2_length = 0, F.sfb_lmax = u.SBPSY_l, F.sfb_smin = u.SBPSY_s, F.psy_lmax = B.sfb21_extra ? u.SBMAX_l : u.SBPSY_l, F.psymax = F.psy_lmax, F.sfbmax = F.sfb_lmax, F.sfbdivide = 11;
      for (var N = 0; N < u.SBMAX_l; N++) F.width[N] = B.scalefac_band.l[N + 1] - B.scalefac_band.l[N], F.window[N] = 3;
      if (F.block_type == u.SHORT_TYPE) {
        var G = i(576);
        F.sfb_smin = 0, F.sfb_lmax = 0, F.mixed_block_flag != 0 && (F.sfb_smin = 3, F.sfb_lmax = B.mode_gr * 2 + 4), F.psymax = F.sfb_lmax + 3 * ((B.sfb21_extra ? u.SBMAX_s : u.SBPSY_s) - F.sfb_smin), F.sfbmax = F.sfb_lmax + 3 * (u.SBPSY_s - F.sfb_smin), F.sfbdivide = F.sfbmax - 18, F.psy_lmax = F.sfb_lmax;
        var z = B.scalefac_band.l[F.sfb_lmax];
        t.arraycopy(F.xr, 0, G, 0, 576);
        for (var N = F.sfb_smin; N < u.SBMAX_s; N++) for (var V = B.scalefac_band.s[N], O = B.scalefac_band.s[N + 1], L = 0; L < 3; L++) for (var D = V; D < O; D++) F.xr[z++] = G[3 * D + L];
        for (var U = F.sfb_lmax, N = F.sfb_smin; N < u.SBMAX_s; N++) F.width[U] = F.width[U + 1] = F.width[U + 2] = B.scalefac_band.s[N + 1] - B.scalefac_band.s[N], F.window[U] = 0, F.window[U + 1] = 1, F.window[U + 2] = 2, U += 3;
      }
      F.count1bits = 0, F.sfb_partition_table = b.nr_of_sfb_block[0][0], F.slen[0] = 0, F.slen[1] = 0, F.slen[2] = 0, F.slen[3] = 0, F.max_nonzero_coeff = 575, a.fill(F.scalefac, 0), k(B, F);
    };
    function A(B) {
      this.ordinal = B;
    }
    A.BINSEARCH_NONE = new A(0), A.BINSEARCH_UP = new A(1), A.BINSEARCH_DOWN = new A(2);
    function S(B, F, N, G, z) {
      var V,
        O = B.CurrentStep[G],
        L = !1,
        D = B.OldValue[G],
        U = A.BINSEARCH_NONE;
      for (F.global_gain = D, N -= F.part2_length, o(O != 0);;) {
        var H;
        if (V = _.count_bits(B, z, F, null), O == 1 || V == N) break;
        V > N ? (U == A.BINSEARCH_DOWN && (L = !0), L && (O /= 2), U = A.BINSEARCH_UP, H = O) : (U == A.BINSEARCH_UP && (L = !0), L && (O /= 2), U = A.BINSEARCH_DOWN, H = -O), F.global_gain += H, F.global_gain < 0 && (F.global_gain = 0, L = !0), F.global_gain > 255 && (F.global_gain = 255, L = !0);
      }
      for (o(F.global_gain >= 0), o(F.global_gain < 256); V > N && F.global_gain < 255;) F.global_gain++, V = _.count_bits(B, z, F, null);
      return B.CurrentStep[G] = D - F.global_gain >= 4 ? 4 : 2, B.OldValue[G] = F.global_gain, F.part2_3_length = V, V;
    }
    this.trancate_smallspectrums = function (B, F, N, G) {
      var z = i(p.SFBMAX);
      if (!((B.substep_shaping & 4) == 0 && F.block_type == u.SHORT_TYPE || (B.substep_shaping & 128) != 0)) {
        b.calc_noise(F, N, z, new l(), null);
        for (var O = 0; O < 576; O++) {
          var V = 0;
          F.l3_enc[O] != 0 && (V = Math.abs(F.xr[O])), G[O] = V;
        }
        var O = 0,
          L = 8;
        F.block_type == u.SHORT_TYPE && (L = 6);
        do {
          var D,
            U,
            H,
            Y,
            K = F.width[L];
          if (O += K, !(z[L] >= 1) && (a.sort(G, O - K, K), !BitStream.EQ(G[O - 1], 0))) {
            D = (1 - z[L]) * N[L], U = 0, Y = 0;
            do {
              var W;
              for (H = 1; Y + H < K && !BitStream.NEQ(G[Y + O - K], G[Y + O + H - K]); H++);
              if (W = G[Y + O - K] * G[Y + O - K] * H, D < W) {
                Y != 0 && (U = G[Y + O - K - 1]);
                break;
              }
              D -= W, Y += H;
            } while (Y < K);
            if (!BitStream.EQ(U, 0)) do Math.abs(F.xr[O - K]) <= U && (F.l3_enc[O - K] = 0); while (--K > 0);
          }
        } while (++L < F.psymax);
        F.part2_3_length = _.noquant_count_bits(B, F, null);
      }
    };
    function C(B) {
      for (var F = 0; F < B.sfbmax; F++) if (B.scalefac[F] + B.subblock_gain[B.window[F]] == 0) return !1;
      return !0;
    }
    function I(B) {
      return r.FAST_LOG10(.368 + .632 * B * B * B);
    }
    function E(B, F) {
      for (var N = 1e-37, G = 0; G < F.psymax; G++) N += I(B[G]);
      return Math.max(1e-20, N);
    }
    function M(B, F, N, G, z) {
      var V;
      switch (B) {
        default:
        case 9:
          {
            F.over_count > 0 ? (V = N.over_SSD <= F.over_SSD, N.over_SSD == F.over_SSD && (V = N.bits < F.bits)) : V = N.max_noise < 0 && N.max_noise * 10 + N.bits <= F.max_noise * 10 + F.bits;
            break;
          }
        case 0:
          V = N.over_count < F.over_count || N.over_count == F.over_count && N.over_noise < F.over_noise || N.over_count == F.over_count && BitStream.EQ(N.over_noise, F.over_noise) && N.tot_noise < F.tot_noise;
          break;
        case 8:
          N.max_noise = E(z, G);
        case 1:
          V = N.max_noise < F.max_noise;
          break;
        case 2:
          V = N.tot_noise < F.tot_noise;
          break;
        case 3:
          V = N.tot_noise < F.tot_noise && N.max_noise < F.max_noise;
          break;
        case 4:
          V = N.max_noise <= 0 && F.max_noise > .2 || N.max_noise <= 0 && F.max_noise < 0 && F.max_noise > N.max_noise - .2 && N.tot_noise < F.tot_noise || N.max_noise <= 0 && F.max_noise > 0 && F.max_noise > N.max_noise - .2 && N.tot_noise < F.tot_noise + F.over_noise || N.max_noise > 0 && F.max_noise > -.05 && F.max_noise > N.max_noise - .1 && N.tot_noise + N.over_noise < F.tot_noise + F.over_noise || N.max_noise > 0 && F.max_noise > -.1 && F.max_noise > N.max_noise - .15 && N.tot_noise + N.over_noise + N.over_noise < F.tot_noise + F.over_noise + F.over_noise;
          break;
        case 5:
          V = N.over_noise < F.over_noise || BitStream.EQ(N.over_noise, F.over_noise) && N.tot_noise < F.tot_noise;
          break;
        case 6:
          V = N.over_noise < F.over_noise || BitStream.EQ(N.over_noise, F.over_noise) && (N.max_noise < F.max_noise || BitStream.EQ(N.max_noise, F.max_noise) && N.tot_noise <= F.tot_noise);
          break;
        case 7:
          V = N.over_count < F.over_count || N.over_noise < F.over_noise;
          break;
      }
      return F.over_count == 0 && (V = V && N.bits < F.bits), V;
    }
    function T(B, F, N, G, z) {
      var V = B.internal_flags,
        O;
      F.scalefac_scale == 0 ? O = 1.2968395546510096 : O = 1.6817928305074292;
      for (var L = 0, D = 0; D < F.sfbmax; D++) L < N[D] && (L = N[D]);
      var U = V.noise_shaping_amp;
      switch (U == 3 && (z ? U = 2 : U = 1), U) {
        case 2:
          break;
        case 1:
          L > 1 ? L = Math.pow(L, .5) : L *= .95;
          break;
        case 0:
        default:
          L > 1 ? L = 1 : L *= .95;
          break;
      }
      for (var H = 0, D = 0; D < F.sfbmax; D++) {
        var Y = F.width[D],
          K;
        if (H += Y, !(N[D] < L)) {
          if ((V.substep_shaping & 2) != 0 && (V.pseudohalf[D] = V.pseudohalf[D] == 0 ? 1 : 0, V.pseudohalf[D] == 0 && V.noise_shaping_amp == 2)) return;
          for (F.scalefac[D]++, K = -Y; K < 0; K++) G[H + K] *= O, G[H + K] > F.xrpow_max && (F.xrpow_max = G[H + K]);
          if (V.noise_shaping_amp == 2) return;
        }
      }
    }
    function P(B, F) {
      for (var N = 1.2968395546510096, G = 0, z = 0; z < B.sfbmax; z++) {
        var V = B.width[z],
          O = B.scalefac[z];
        if (B.preflag != 0 && (O += b.pretab[z]), G += V, (O & 1) != 0) {
          O++;
          for (var L = -V; L < 0; L++) F[G + L] *= N, F[G + L] > B.xrpow_max && (B.xrpow_max = F[G + L]);
        }
        B.scalefac[z] = O >> 1;
      }
      B.preflag = 0, B.scalefac_scale = 1;
    }
    function R(B, F, N) {
      var G,
        z = F.scalefac;
      for (G = 0; G < F.sfb_lmax; G++) if (z[G] >= 16) return !0;
      for (var V = 0; V < 3; V++) {
        var O = 0,
          L = 0;
        for (G = F.sfb_lmax + V; G < F.sfbdivide; G += 3) O < z[G] && (O = z[G]);
        for (; G < F.sfbmax; G += 3) L < z[G] && (L = z[G]);
        if (!(O < 16 && L < 8)) {
          if (F.subblock_gain[V] >= 7) return !0;
          F.subblock_gain[V]++;
          var D = B.scalefac_band.l[F.sfb_lmax];
          for (G = F.sfb_lmax + V; G < F.sfbmax; G += 3) {
            var U,
              H = F.width[G],
              Y = z[G];
            if (o(Y >= 0), Y = Y - (4 >> F.scalefac_scale), Y >= 0) {
              z[G] = Y, D += H * 3;
              continue;
            }
            z[G] = 0;
            {
              var K = 210 + (Y << F.scalefac_scale + 1);
              U = b.IPOW20(K);
            }
            D += H * (V + 1);
            for (var W = -H; W < 0; W++) N[D + W] *= U, N[D + W] > F.xrpow_max && (F.xrpow_max = N[D + W]);
            D += H * (3 - V - 1);
          }
          {
            var U = b.IPOW20(202);
            D += F.width[G] * (V + 1);
            for (var W = -F.width[G]; W < 0; W++) N[D + W] *= U, N[D + W] > F.xrpow_max && (F.xrpow_max = N[D + W]);
          }
        }
      }
      return !1;
    }
    function j(B, F, N, G, z) {
      var V = B.internal_flags;
      T(B, F, N, G, z);
      var O = C(F);
      return O ? !1 : (V.mode_gr == 2 ? O = _.scale_bitcount(F) : O = _.scale_bitcount_lsf(V, F), O ? (V.noise_shaping > 1 && (a.fill(V.pseudohalf, 0), F.scalefac_scale == 0 ? (P(F, G), O = !1) : F.block_type == u.SHORT_TYPE && V.subblock_gain > 0 && (O = R(V, F, G) || C(F))), O || (V.mode_gr == 2 ? O = _.scale_bitcount(F) : O = _.scale_bitcount_lsf(V, F)), !O) : !0);
    }
    this.outer_loop = function (B, F, N, G, z, V) {
      var O = B.internal_flags,
        L = new h(),
        D = i(576),
        U = i(p.SFBMAX),
        H = new l(),
        Y,
        K = new d(),
        W = 9999999,
        Q = !1,
        q = !1,
        ne = 0;
      if (S(O, F, V, z, G), O.noise_shaping == 0) return 100;
      b.calc_noise(F, N, U, H, K), H.bits = F.part2_3_length, L.assign(F);
      var de = 0;
      for (t.arraycopy(G, 0, D, 0, 576); !Q;) {
        do {
          var le = new l(),
            J,
            pe = 255;
          if ((O.substep_shaping & 2) != 0 ? J = 20 : J = 3, O.sfb21_extra && (U[L.sfbmax] > 1 || L.block_type == u.SHORT_TYPE && (U[L.sfbmax + 1] > 1 || U[L.sfbmax + 2] > 1)) || !j(B, L, U, G, q)) break;
          L.scalefac_scale != 0 && (pe = 254);
          var ce = V - L.part2_length;
          if (ce <= 0) break;
          for (; (L.part2_3_length = _.count_bits(O, G, L, K)) > ce && L.global_gain <= pe;) L.global_gain++;
          if (L.global_gain > pe) break;
          if (H.over_count == 0) {
            for (; (L.part2_3_length = _.count_bits(O, G, L, K)) > W && L.global_gain <= pe;) L.global_gain++;
            if (L.global_gain > pe) break;
          }
          if (b.calc_noise(L, N, U, le, K), le.bits = L.part2_3_length, F.block_type != u.SHORT_TYPE ? Y = B.quant_comp : Y = B.quant_comp_short, Y = M(Y, H, le, L, U) ? 1 : 0, Y != 0) W = F.part2_3_length, H = le, F.assign(L), de = 0, t.arraycopy(G, 0, D, 0, 576);else if (O.full_outer_loop == 0 && (++de > J && H.over_count == 0 || O.noise_shaping_amp == 3 && q && de > 30 || O.noise_shaping_amp == 3 && q && L.global_gain - ne > 15)) break;
        } while (L.global_gain + L.scalefac_scale < 255);
        O.noise_shaping_amp == 3 ? q ? Q = !0 : (L.assign(F), t.arraycopy(D, 0, G, 0, 576), de = 0, ne = L.global_gain, q = !0) : Q = !0;
      }
      return o(F.global_gain + F.scalefac_scale <= 255), B.VBR == n.vbr_rh || B.VBR == n.vbr_mtrh ? t.arraycopy(D, 0, G, 0, 576) : (O.substep_shaping & 1) != 0 && trancate_smallspectrums(O, F, N, G), H.over_count;
    }, this.iteration_finish_one = function (B, F, N) {
      var G = B.l3_side,
        z = G.tt[F][N];
      _.best_scalefac_store(B, F, N, G), B.use_best_huffman == 1 && _.best_huffman_divide(B, z), y.ResvAdjust(B, z);
    }, this.VBR_encode_granule = function (B, F, N, G, z, V, O) {
      var L = B.internal_flags,
        D = new h(),
        U = i(576),
        H = O,
        Y = O + 1,
        K = (O + V) / 2,
        W,
        Q,
        q = 0,
        ne = L.sfb21_extra;
      o(H <= LameInternalFlags.MAX_BITS_PER_CHANNEL), a.fill(D.l3_enc, 0);
      do o(K >= V), o(K <= O), o(V <= O), K > H - 42 ? L.sfb21_extra = !1 : L.sfb21_extra = ne, Q = outer_loop(B, F, N, G, z, K), Q <= 0 ? (q = 1, Y = F.part2_3_length, D.assign(F), t.arraycopy(G, 0, U, 0, 576), O = Y - 32, W = O - V, K = (O + V) / 2) : (V = K + 32, W = O - V, K = (O + V) / 2, q != 0 && (q = 2, F.assign(D), t.arraycopy(U, 0, G, 0, 576))); while (W > 12);
      L.sfb21_extra = ne, q == 2 && t.arraycopy(D.l3_enc, 0, F.l3_enc, 0, 576), o(F.part2_3_length <= H);
    }, this.get_framebits = function (B, F) {
      var N = B.internal_flags;
      N.bitrate_index = N.VBR_min_bitrate;
      var G = f.getframebits(B);
      N.bitrate_index = 1, G = f.getframebits(B);
      for (var z = 1; z <= N.VBR_max_bitrate; z++) {
        N.bitrate_index = z;
        var V = new MeanBits(G);
        F[z] = y.ResvFrameBegin(B, V), G = V.bits;
      }
    }, this.VBR_old_prepare = function (B, F, N, G, z, V, O, L, D) {
      var U = B.internal_flags,
        H,
        Y = 0,
        K = 1,
        W = 0;
      U.bitrate_index = U.VBR_max_bitrate;
      var Q = y.ResvFrameBegin(B, new MeanBits(0)) / U.mode_gr;
      get_framebits(B, V);
      for (var q = 0; q < U.mode_gr; q++) {
        var ne = b.on_pe(B, F, L[q], Q, q, 0);
        U.mode_ext == u.MPG_MD_MS_LR && (ms_convert(U.l3_side, q), b.reduce_side(L[q], N[q], Q, ne));
        for (var de = 0; de < U.channels_out; ++de) {
          var le = U.l3_side.tt[q][de];
          le.block_type != u.SHORT_TYPE ? (Y = 1.28 / (1 + Math.exp(3.5 - F[q][de] / 300)) - .05, H = U.PSY.mask_adjust - Y) : (Y = 2.56 / (1 + Math.exp(3.5 - F[q][de] / 300)) - .14, H = U.PSY.mask_adjust_short - Y), U.masking_lower = Math.pow(10, H * .1), init_outer_loop(U, le), D[q][de] = b.calc_xmin(B, G[q][de], le, z[q][de]), D[q][de] != 0 && (K = 0), O[q][de] = 126, W += L[q][de];
        }
      }
      for (var q = 0; q < U.mode_gr; q++) for (var de = 0; de < U.channels_out; de++) W > V[U.VBR_max_bitrate] && (L[q][de] *= V[U.VBR_max_bitrate], L[q][de] /= W), O[q][de] > L[q][de] && (O[q][de] = L[q][de]);
      return K;
    }, this.bitpressure_strategy = function (B, F, N, G) {
      for (var z = 0; z < B.mode_gr; z++) for (var V = 0; V < B.channels_out; V++) {
        for (var O = B.l3_side.tt[z][V], L = F[z][V], D = 0, U = 0; U < O.psy_lmax; U++) L[D++] *= 1 + .029 * U * U / u.SBMAX_l / u.SBMAX_l;
        if (O.block_type == u.SHORT_TYPE) for (var U = O.sfb_smin; U < u.SBMAX_s; U++) L[D++] *= 1 + .029 * U * U / u.SBMAX_s / u.SBMAX_s, L[D++] *= 1 + .029 * U * U / u.SBMAX_s / u.SBMAX_s, L[D++] *= 1 + .029 * U * U / u.SBMAX_s / u.SBMAX_s;
        G[z][V] = 0 | Math.max(N[z][V], .9 * G[z][V]);
      }
    }, this.VBR_new_prepare = function (B, F, N, G, z, V) {
      var O = B.internal_flags,
        L = 1,
        D = 0,
        U = 0,
        H;
      if (B.free_format) {
        O.bitrate_index = 0;
        var Y = new MeanBits(D);
        H = y.ResvFrameBegin(B, Y), D = Y.bits, z[0] = H;
      } else {
        O.bitrate_index = O.VBR_max_bitrate;
        var Y = new MeanBits(D);
        y.ResvFrameBegin(B, Y), D = Y.bits, get_framebits(B, z), H = z[O.VBR_max_bitrate];
      }
      for (var K = 0; K < O.mode_gr; K++) {
        b.on_pe(B, F, V[K], D, K, 0), O.mode_ext == u.MPG_MD_MS_LR && ms_convert(O.l3_side, K);
        for (var W = 0; W < O.channels_out; ++W) {
          var Q = O.l3_side.tt[K][W];
          O.masking_lower = Math.pow(10, O.PSY.mask_adjust * .1), init_outer_loop(O, Q), b.calc_xmin(B, N[K][W], Q, G[K][W]) != 0 && (L = 0), U += V[K][W];
        }
      }
      for (var K = 0; K < O.mode_gr; K++) for (var W = 0; W < O.channels_out; W++) U > H && (V[K][W] *= H, V[K][W] /= U);
      return L;
    }, this.calc_target_bits = function (B, F, N, G, z, V) {
      var O = B.internal_flags,
        L = O.l3_side,
        D,
        U,
        H,
        Y,
        K = 0;
      O.bitrate_index = O.VBR_max_bitrate;
      var W = new MeanBits(K);
      for (V[0] = y.ResvFrameBegin(B, W), K = W.bits, O.bitrate_index = 1, K = f.getframebits(B) - O.sideinfo_len * 8, z[0] = K / (O.mode_gr * O.channels_out), K = B.VBR_mean_bitrate_kbps * B.framesize * 1e3, (O.substep_shaping & 1) != 0 && (K *= 1.09), K /= B.out_samplerate, K -= O.sideinfo_len * 8, K /= O.mode_gr * O.channels_out, D = .93 + .07 * (11 - B.compression_ratio) / (11 - 5.5), D < .9 && (D = .9), D > 1 && (D = 1), U = 0; U < O.mode_gr; U++) {
        var Q = 0;
        for (H = 0; H < O.channels_out; H++) {
          if (G[U][H] = int(D * K), F[U][H] > 700) {
            var q = int((F[U][H] - 700) / 1.4),
              ne = L.tt[U][H];
            G[U][H] = int(D * K), ne.block_type == u.SHORT_TYPE && q < K / 2 && (q = K / 2), q > K * 3 / 2 ? q = K * 3 / 2 : q < 0 && (q = 0), G[U][H] += q;
          }
          G[U][H] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (G[U][H] = LameInternalFlags.MAX_BITS_PER_CHANNEL), Q += G[U][H];
        }
        if (Q > LameInternalFlags.MAX_BITS_PER_GRANULE) for (H = 0; H < O.channels_out; ++H) G[U][H] *= LameInternalFlags.MAX_BITS_PER_GRANULE, G[U][H] /= Q;
      }
      if (O.mode_ext == u.MPG_MD_MS_LR) for (U = 0; U < O.mode_gr; U++) b.reduce_side(G[U], N[U], K * O.channels_out, LameInternalFlags.MAX_BITS_PER_GRANULE);
      for (Y = 0, U = 0; U < O.mode_gr; U++) for (H = 0; H < O.channels_out; H++) G[U][H] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (G[U][H] = LameInternalFlags.MAX_BITS_PER_CHANNEL), Y += G[U][H];
      if (Y > V[0]) for (U = 0; U < O.mode_gr; U++) for (H = 0; H < O.channels_out; H++) G[U][H] *= V[0], G[U][H] /= Y;
    };
  }
  return Slt = m, Slt;
}

var Ilt, spn;

function nHi() {
  if (spn) return Ilt;
  spn = 1;
  var e = jf(),
    t = e.assert;
  function n() {
    var r;
    this.setModules = function (a) {
      r = a;
    }, this.ResvFrameBegin = function (a, i) {
      var o = a.internal_flags,
        s,
        l = o.l3_side,
        d = r.getframebits(a);
      i.bits = (d - o.sideinfo_len * 8) / o.mode_gr;
      var u = 8 * 256 * o.mode_gr - 8;
      a.brate > 320 ? s = 8 * int(a.brate * 1e3 / (a.out_samplerate / 1152) / 8 + .5) : (s = 8 * 1440, a.strict_ISO && (s = 8 * int(32e4 / (a.out_samplerate / 1152) / 8 + .5))), o.ResvMax = s - d, o.ResvMax > u && (o.ResvMax = u), (o.ResvMax < 0 || a.disable_reservoir) && (o.ResvMax = 0);
      var h = i.bits * o.mode_gr + Math.min(o.ResvSize, o.ResvMax);
      return h > s && (h = s), t(o.ResvMax % 8 == 0), t(o.ResvMax >= 0), l.resvDrain_pre = 0, o.pinfo != null && (o.pinfo.mean_bits = i.bits / 2, o.pinfo.resvsize = o.ResvSize), h;
    }, this.ResvMaxBits = function (a, i, o, s) {
      var l = a.internal_flags,
        d,
        u = l.ResvSize,
        h = l.ResvMax;
      s != 0 && (u += i), (l.substep_shaping & 1) != 0 && (h *= .9), o.bits = i, u * 10 > h * 9 ? (d = u - h * 9 / 10, o.bits += d, l.substep_shaping |= 128) : (d = 0, l.substep_shaping &= 127, !a.disable_reservoir && (l.substep_shaping & 1) == 0 && (o.bits -= .1 * i));
      var p = u < l.ResvMax * 6 / 10 ? u : l.ResvMax * 6 / 10;
      return p -= d, p < 0 && (p = 0), p;
    }, this.ResvAdjust = function (a, i) {
      a.ResvSize -= i.part2_3_length + i.part2_length;
    }, this.ResvFrameEnd = function (a, i) {
      var o,
        s = a.l3_side;
      a.ResvSize += i * a.mode_gr;
      var l = 0;
      s.resvDrain_post = 0, s.resvDrain_pre = 0, (o = a.ResvSize % 8) != 0 && (l += o), o = a.ResvSize - l - a.ResvMax, o > 0 && (t(o % 8 == 0), t(o >= 0), l += o);
      {
        var d = Math.min(s.main_data_begin * 8, l) / 8;
        s.resvDrain_pre += 8 * d, l -= 8 * d, a.ResvSize -= 8 * d, s.main_data_begin -= d;
      }
      s.resvDrain_post += l, a.ResvSize -= l;
    };
  }
  return Ilt = n, Ilt;
}

var Clt, lpn;

function rHi() {
  if (lpn) return Clt;
  lpn = 1;
  function e() {
    var t = "http://www.mp3dev.org/",
      n = 3,
      r = 98,
      a = 4,
      i = 0,
      o = 93;
    this.getLameVersion = function () {
      return n + "." + r + "." + a;
    }, this.getLameShortVersion = function () {
      return n + "." + r + "." + a;
    }, this.getLameVeryShortVersion = function () {
      return "LAME" + n + "." + r + "r";
    }, this.getPsyVersion = function () {
      return i + "." + o;
    }, this.getLameUrl = function () {
      return t;
    }, this.getLameOsBitness = function () {
      return "32bits";
    };
  }
  return Clt = e, Clt;
}

var Elt, cpn;

function aHi() {
  if (cpn) return Elt;
  cpn = 1;
  var e = jf(),
    t = e.System,
    n = e.VbrMode;
  e.Float;
  var r = e.ShortBlock;
  e.Util;
  var a = e.Arrays;
  e.new_array_n;
  var i = e.new_byte;
  e.new_double, e.new_float, e.new_float_n, e.new_int, e.new_int_n;
  var o = e.assert;
  s.NUMTOCENTRIES = 100, s.MAXFRAMESIZE = 2880;
  function s() {
    var l, d, u;
    this.setModules = function (O, L, D) {
      l = O, d = L, u = D;
    };
    var h = 1,
      p = 2,
      m = 4,
      f = 8,
      y = s.NUMTOCENTRIES,
      b = s.MAXFRAMESIZE,
      v = y + 4 + 4 + 4 + 4 + 4,
      _ = v + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2,
      w = 128,
      k = 64,
      A = 32,
      S = null,
      C = "Xing",
      I = "Info",
      E = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
    function M(O, L) {
      if (O.nVbrNumFrames++, O.sum += L, O.seen++, !(O.seen < O.want) && (O.pos < O.size && (O.bag[O.pos] = O.sum, O.pos++, O.seen = 0), O.pos == O.size)) {
        for (var D = 1; D < O.size; D += 2) O.bag[D / 2] = O.bag[D];
        O.want *= 2, O.pos /= 2;
      }
    }
    function T(O, L) {
      if (!(O.pos <= 0)) for (var D = 1; D < y; ++D) {
        var U = D / y,
          H,
          Y,
          K = 0 | Math.floor(U * O.pos);
        K > O.pos - 1 && (K = O.pos - 1), H = O.bag[K], Y = O.sum;
        var W = 0 | 256 * H / Y;
        W > 255 && (W = 255), L[D] = 255 & W;
      }
    }
    this.addVbrFrame = function (O) {
      var L = O.internal_flags,
        D = Tables.bitrate_table[O.version][L.bitrate_index];
      o(L.VBR_seek_table.bag != null), M(L.VBR_seek_table, D);
    };
    function P(O, L) {
      var D = O[L + 0] & 255;
      return D <<= 8, D |= O[L + 1] & 255, D <<= 8, D |= O[L + 2] & 255, D <<= 8, D |= O[L + 3] & 255, D;
    }
    function R(O, L, D) {
      O[L + 0] = 255 & (D >> 24 & 255), O[L + 1] = 255 & (D >> 16 & 255), O[L + 2] = 255 & (D >> 8 & 255), O[L + 3] = 255 & (D & 255);
    }
    function j(O, L, D) {
      O[L + 0] = 255 & (D >> 8 & 255), O[L + 1] = 255 & (D & 255);
    }
    function B(O, L) {
      return new String(O, L, C.length(), S).equals(C) || new String(O, L, I.length(), S).equals(I);
    }
    function F(O, L, D) {
      return 255 & (O << L | D & ~(-1 << L));
    }
    function N(O, L) {
      var D = O.internal_flags;
      L[0] = F(L[0], 8, 255), L[1] = F(L[1], 3, 7), L[1] = F(L[1], 1, O.out_samplerate < 16e3 ? 0 : 1), L[1] = F(L[1], 1, O.version), L[1] = F(L[1], 2, 1), L[1] = F(L[1], 1, O.error_protection ? 0 : 1), L[2] = F(L[2], 4, D.bitrate_index), L[2] = F(L[2], 2, D.samplerate_index), L[2] = F(L[2], 1, 0), L[2] = F(L[2], 1, O.extension), L[3] = F(L[3], 2, O.mode.ordinal()), L[3] = F(L[3], 2, D.mode_ext), L[3] = F(L[3], 1, O.copyright), L[3] = F(L[3], 1, O.original), L[3] = F(L[3], 2, O.emphasis), L[0] = 255;
      var U = 255 & (L[1] & 241),
        H;
      O.version == 1 ? H = w : O.out_samplerate < 16e3 ? H = A : H = k, O.VBR == n.vbr_off && (H = O.brate);
      var Y;
      O.free_format ? Y = 0 : Y = 255 & 16 * l.BitrateIndex(H, O.version, O.out_samplerate), O.version == 1 ? (L[1] = 255 & (U | 10), U = 255 & (L[2] & 13), L[2] = 255 & (Y | U)) : (L[1] = 255 & (U | 2), U = 255 & (L[2] & 13), L[2] = 255 & (Y | U));
    }
    this.getVbrTag = function (O) {
      var L = new VBRTagData(),
        D = 0;
      L.flags = 0;
      var U = O[D + 1] >> 3 & 1,
        H = O[D + 2] >> 2 & 3,
        Y = O[D + 3] >> 6 & 3,
        K = O[D + 2] >> 4 & 15;
      if (K = Tables.bitrate_table[U][K], O[D + 1] >> 4 == 14 ? L.samprate = Tables.samplerate_table[2][H] : L.samprate = Tables.samplerate_table[U][H], U != 0 ? Y != 3 ? D += 36 : D += 21 : Y != 3 ? D += 21 : D += 13, !B(O, D)) return null;
      D += 4, L.hId = U;
      var W = L.flags = P(O, D);
      if (D += 4, (W & h) != 0 && (L.frames = P(O, D), D += 4), (W & p) != 0 && (L.bytes = P(O, D), D += 4), (W & m) != 0) {
        if (L.toc != null) for (var Q = 0; Q < y; Q++) L.toc[Q] = O[D + Q];
        D += y;
      }
      L.vbrScale = -1, (W & f) != 0 && (L.vbrScale = P(O, D), D += 4), L.headersize = (U + 1) * 72e3 * K / L.samprate, D += 21;
      var q = O[D + 0] << 4;
      q += O[D + 1] >> 4;
      var ne = (O[D + 1] & 15) << 8;
      return ne += O[D + 2] & 255, (q < 0 || q > 3e3) && (q = -1), (ne < 0 || ne > 3e3) && (ne = -1), L.encDelay = q, L.encPadding = ne, L;
    }, this.InitVbrTag = function (O) {
      var L = O.internal_flags,
        D;
      O.version == 1 ? D = w : O.out_samplerate < 16e3 ? D = A : D = k, O.VBR == n.vbr_off && (D = O.brate);
      var U = (O.version + 1) * 72e3 * D / O.out_samplerate,
        H = L.sideinfo_len + _;
      if (L.VBR_seek_table.TotalFrameSize = U, U < H || U > b) {
        O.bWriteVbrTag = !1;
        return;
      }
      L.VBR_seek_table.nVbrNumFrames = 0, L.VBR_seek_table.nBytesWritten = 0, L.VBR_seek_table.sum = 0, L.VBR_seek_table.seen = 0, L.VBR_seek_table.want = 1, L.VBR_seek_table.pos = 0, L.VBR_seek_table.bag == null && (L.VBR_seek_table.bag = new int[400](), L.VBR_seek_table.size = 400);
      var Y = i(b);
      N(O, Y);
      for (var K = L.VBR_seek_table.TotalFrameSize, W = 0; W < K; ++W) d.add_dummy_byte(O, Y[W] & 255, 1);
    };
    function G(O, L) {
      var D = L ^ O;
      return L = L >> 8 ^ E[D & 255], L;
    }
    this.updateMusicCRC = function (O, L, D, U) {
      for (var H = 0; H < U; ++H) O[0] = G(L[D + H], O[0]);
    };
    function z(O, L, D, U, H) {
      var Y = O.internal_flags,
        K = 0,
        W = O.encoder_delay,
        Q = O.encoder_padding,
        q = 100 - 10 * O.VBR_q - O.quality,
        ne = u.getLameVeryShortVersion(),
        de,
        le = 0,
        J,
        pe = [1, 5, 3, 2, 4, 0, 3],
        ce = 0 | (O.lowpassfreq / 100 + .5 > 255 ? 255 : O.lowpassfreq / 100 + .5),
        we = 0,
        X = 0,
        Z = 0,
        re = O.internal_flags.noise_shaping,
        fe = 0,
        ye = 0,
        ie = 0,
        ae = 0,
        be = 0,
        Ee = (O.exp_nspsytune & 1) != 0,
        xe = (O.exp_nspsytune & 2) != 0,
        he = !1,
        ue = !1,
        ge = O.internal_flags.nogap_total,
        _e = O.internal_flags.nogap_current,
        ke = O.ATHtype,
        ve = 0,
        Te;
      switch (O.VBR) {
        case vbr_abr:
          Te = O.VBR_mean_bitrate_kbps;
          break;
        case vbr_off:
          Te = O.brate;
          break;
        default:
          Te = O.VBR_min_bitrate_kbps;
      }
      switch (O.VBR.ordinal() < pe.length ? de = pe[O.VBR.ordinal()] : de = 0, J = 16 * le + de, Y.findReplayGain && (Y.RadioGain > 510 && (Y.RadioGain = 510), Y.RadioGain < -510 && (Y.RadioGain = -510), X = 8192, X |= 3072, Y.RadioGain >= 0 ? X |= Y.RadioGain : (X |= 512, X |= -Y.RadioGain)), Y.findPeakSample && (we = Math.abs(0 | Y.PeakSample / 32767 * Math.pow(2, 23) + .5)), ge != -1 && (_e > 0 && (ue = !0), _e < ge - 1 && (he = !0)), ve = ke + ((Ee ? 1 : 0) << 4) + ((xe ? 1 : 0) << 5) + ((he ? 1 : 0) << 6) + ((ue ? 1 : 0) << 7), q < 0 && (q = 0), O.mode) {
        case MONO:
          fe = 0;
          break;
        case STEREO:
          fe = 1;
          break;
        case DUAL_CHANNEL:
          fe = 2;
          break;
        case JOINT_STEREO:
          O.force_ms ? fe = 4 : fe = 3;
          break;
        case NOT_SET:
        default:
          fe = 7;
          break;
      }
      O.in_samplerate <= 32e3 ? ie = 0 : O.in_samplerate == 48e3 ? ie = 2 : O.in_samplerate > 48e3 ? ie = 3 : ie = 1, (O.short_blocks == r.short_block_forced || O.short_blocks == r.short_block_dispensed || O.lowpassfreq == -1 && O.highpassfreq == -1 || O.scale_left < O.scale_right || O.scale_left > O.scale_right || O.disable_reservoir && O.brate < 320 || O.noATH || O.ATHonly || ke == 0 || O.in_samplerate <= 32e3) && (ye = 1), ae = re + (fe << 2) + (ye << 5) + (ie << 6), be = Y.nMusicCRC, R(D, U + K, q), K += 4;
      for (var Ne = 0; Ne < 9; Ne++) D[U + K + Ne] = 255 & ne.charAt(Ne);
      K += 9, D[U + K] = 255 & J, K++, D[U + K] = 255 & ce, K++, R(D, U + K, we), K += 4, j(D, U + K, X), K += 2, j(D, U + K, Z), K += 2, D[U + K] = 255 & ve, K++, Te >= 255 ? D[U + K] = 255 : D[U + K] = 255 & Te, K++, D[U + K] = 255 & W >> 4, D[U + K + 1] = 255 & (W << 4) + (Q >> 8), D[U + K + 2] = 255 & Q, K += 3, D[U + K] = 255 & ae, K++, D[U + K++] = 0, j(D, U + K, O.preset), K += 2, R(D, U + K, L), K += 4, j(D, U + K, be), K += 2;
      for (var me = 0; me < K; me++) H = G(D[U + me], H);
      return j(D, U + K, H), K += 2, K;
    }
    function V(O) {
      O.seek(0);
      var L = i(10);
      O.readFully(L);
      var D;
      return new String(L, "ISO-8859-1").startsWith("ID3") ? D = 0 : D = ((L[6] & 127) << 21 | (L[7] & 127) << 14 | (L[8] & 127) << 7 | L[9] & 127) + L.length, D;
    }
    this.getLameTagFrame = function (O, L) {
      var D = O.internal_flags;
      if (!O.bWriteVbrTag || D.Class_ID != Lame.LAME_ID || D.VBR_seek_table.pos <= 0) return 0;
      if (L.length < D.VBR_seek_table.TotalFrameSize) return D.VBR_seek_table.TotalFrameSize;
      a.fill(L, 0, D.VBR_seek_table.TotalFrameSize, 0), N(O, L);
      var U = i(y);
      if (O.free_format) for (var H = 1; H < y; ++H) U[H] = 255 & 255 * H / 100;else T(D.VBR_seek_table, U);
      var Y = D.sideinfo_len;
      O.error_protection && (Y -= 2), O.VBR == n.vbr_off ? (L[Y++] = 255 & I.charAt(0), L[Y++] = 255 & I.charAt(1), L[Y++] = 255 & I.charAt(2), L[Y++] = 255 & I.charAt(3)) : (L[Y++] = 255 & C.charAt(0), L[Y++] = 255 & C.charAt(1), L[Y++] = 255 & C.charAt(2), L[Y++] = 255 & C.charAt(3)), R(L, Y, h + p + m + f), Y += 4, R(L, Y, D.VBR_seek_table.nVbrNumFrames), Y += 4;
      var K = D.VBR_seek_table.nBytesWritten + D.VBR_seek_table.TotalFrameSize;
      R(L, Y, 0 | K), Y += 4, t.arraycopy(U, 0, L, Y, U.length), Y += U.length, O.error_protection && d.CRC_writeheader(D, L);
      for (var W = 0, H = 0; H < Y; H++) W = G(L[H], W);
      return Y += z(O, K, L, Y, W), D.VBR_seek_table.TotalFrameSize;
    }, this.putVbrTag = function (O, L) {
      var D = O.internal_flags;
      if (D.VBR_seek_table.pos <= 0 || (L.seek(L.length()), L.length() == 0)) return -1;
      var U = V(L);
      L.seek(U);
      var H = i(b),
        Y = getLameTagFrame(O, H);
      return Y > H.length ? -1 : (Y < 1 || L.write(H, 0, Y), 0);
    };
  }
  return Elt = s, Elt;
}

var dpn;

function iHi() {
  if (dpn) return XMe;
  dpn = 1;
  var e = jf();
  e.System, e.VbrMode, e.Float, e.ShortBlock, e.Util, e.Arrays, e.new_array_n;
  var t = e.new_byte;
  e.new_double, e.new_float, e.new_float_n, e.new_int, e.new_int_n;
  var n = e.assert,
    r = YVi(),
    a = XVi(),
    i = Rmr(),
    o = jmr(),
    s = tHi(),
    l = Dmr(),
    d = nHi(),
    u = Mmr(),
    h = Lmr();
  Lx();
  var p = rHi(),
    m = aHi();
  function f() {
    this.setModules = function (A, S) {};
  }
  function y() {
    this.setModules = function (A, S, C) {};
  }
  function b() {}
  function v() {
    this.setModules = function (A, S) {};
  }
  function _(A, S, C) {
    arguments.length != 3 && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), A = 1, S = 44100, C = 128);
    var I = new r(),
      E = new f(),
      M = new i(),
      T = new h(),
      P = new a(),
      R = new o(),
      j = new s(),
      B = new m(),
      F = new p(),
      N = new v(),
      G = new d(),
      z = new l(),
      V = new y(),
      O = new b();
    I.setModules(M, T, P, R, j, B, F, N, O), T.setModules(M, O, F, B), N.setModules(T, F), P.setModules(I), j.setModules(T, G, R, z), R.setModules(z, G, I.enc.psy), G.setModules(T), z.setModules(R), B.setModules(I, T, F), E.setModules(V, O), V.setModules(F, N, P);
    var L = I.lame_init();
    L.num_channels = A, L.in_samplerate = S, L.brate = C, L.mode = u.STEREO, L.quality = 3, L.bWriteVbrTag = !1, L.disable_reservoir = !0, L.write_id3tag_automatic = !1;
    var D = I.lame_init_params(L);
    n(D == 0);
    var U = 1152,
      H = 0 | 1.25 * U + 7200,
      Y = t(H);
    this.encodeBuffer = function (K, W) {
      A == 1 && (W = K), n(K.length == W.length), K.length > U && (U = K.length, H = 0 | 1.25 * U + 7200, Y = t(H));
      var Q = I.lame_encode_buffer(L, K, W, K.length, Y, 0, H);
      return new Int8Array(Y.subarray(0, Q));
    }, this.flush = function () {
      var K = I.lame_encode_flush(L, Y, 0, H);
      return new Int8Array(Y.subarray(0, K));
    };
  }
  function w() {
    this.dataOffset = 0, this.dataLen = 0, this.channels = 0, this.sampleRate = 0;
  }
  function k(A) {
    return A.charCodeAt(0) << 24 | A.charCodeAt(1) << 16 | A.charCodeAt(2) << 8 | A.charCodeAt(3);
  }
  return w.RIFF = k("RIFF"), w.WAVE = k("WAVE"), w.fmt_ = k("fmt "), w.data = k("data"), w.readHeader = function (A) {
    var S = new w(),
      C = A.getUint32(0, !1);
    if (w.RIFF == C && (A.getUint32(4, !0), w.WAVE == A.getUint32(8, !1) && w.fmt_ == A.getUint32(12, !1))) {
      var I = A.getUint32(16, !0),
        E = 20;
      switch (I) {
        case 16:
        case 18:
          S.channels = A.getUint16(E + 2, !0), S.sampleRate = A.getUint32(E + 4, !0);
          break;
        default:
          throw "extended fmt chunk not implemented";
      }
      E += I;
      for (var M = w.data, T = 0; M != C && (C = A.getUint32(E, !1), T = A.getUint32(E + 4, !0), M != C);) E += T + 8;
      return S.dataLen = T, S.dataOffset = E + 8, S;
    }
  }, XMe.Mp3Encoder = _, XMe.WavHeader = w, XMe;
}

var Omr = iHi();

const oHi = j4e(Omr),
  Bmr = Y5r({
    __proto__: null,
    default: oHi
  }, [Omr]);

async function sHi(e, t, n) {
  const r = await $i(e, {
    method: "GET"
  });
  if (!r.ok) throw new Error(`读取 3D 资源失败（HTTP ${r.status}）`);
  const a = await r.arrayBuffer();
  return new File([a], t, {
    type: n
  });
}

async function Fmr(e, t) {
  if (!ua()) return null;
  const n = t.replace(/[^\w.\-]+/g, "_").slice(0, 64) || "3d",
    r = String(e.src_thumbnail_url || e.rendered_image_url || "").trim();
  let a = "",
    i = "";
  if (r && /^https?:\/\//i.test(r)) if (nr(r)) a = r, i = r;else {
    const {
        uploadRemoteImageResultToGlobalOss: l
      } = await Ie(async () => {
        const {
          uploadRemoteImageResultToGlobalOss: u
        } = await Promise.resolve().then(() => ii);
        return {
          uploadRemoteImageResultToGlobalOss: u
        };
      }, void 0, import.meta.url),
      d = await l(r, `${n}-thumb`);
    a = String(d.displayUrl || d.remoteUrl || "").trim(), i = String(d.remoteUrl || d.displayUrl || "").trim();
  }
  let o = "";
  const s = _X(e);
  if (s && /^https?:\/\//i.test(s) && !nr(s)) try {
    const {
        uploadFileToGlobalMaterialAliyunOss: l
      } = await Ie(async () => {
        const {
          uploadFileToGlobalMaterialAliyunOss: u
        } = await Promise.resolve().then(() => Ah);
        return {
          uploadFileToGlobalMaterialAliyunOss: u
        };
      }, void 0, import.meta.url),
      d = await sHi(s, `${n}.glb`, "model/gltf-binary");
    o = String((await l(d)) || "").trim();
  } catch (l) {
    console.warn("[3D][OSS] 模型上传失败，继续使用原地址显示", l);
  } else s && nr(s) && (o = s);
  return !a && !o ? null : {
    displayUrl: a || String(e.src_thumbnail_url || e.rendered_image_url || ""),
    remoteThumbUrl: i || a,
    modelUrl: o || void 0,
    meta: {
      ...e,
      source_url: o || e.source_url,
      rendered_image_url: a || e.rendered_image_url,
      src_thumbnail_url: a || e.src_thumbnail_url
    }
  };
}

const zmr = Object.freeze(Object.defineProperty({
  __proto__: null,
  persistThreeDAssetsToOss: Fmr
}, Symbol.toStringTag, {
  value: "Module"
}));

var lHi = {
  9306(e, t, n) {
    var r = n(4901),
      a = n(6823),
      i = TypeError;
    e.exports = function (o) {
      if (r(o)) return o;
      throw new i(a(o) + " is not a function");
    };
  },
  3506(e, t, n) {
    var r = n(3925),
      a = String,
      i = TypeError;
    e.exports = function (o) {
      if (r(o)) return o;
      throw new i("Can't set " + a(o) + " as a prototype");
    };
  },
  7080(e, t, n) {
    var r = n(4402).has;
    e.exports = function (a) {
      return r(a), a;
    };
  },
  3463(e) {
    var t = TypeError;
    e.exports = function (n) {
      if (typeof n == "string") return n;
      throw new t("Argument is not a string");
    };
  },
  4328(e, t, n) {
    var r = n(4995),
      a = new r.WeakMap(),
      i = r.set,
      o = r.remove;
    e.exports = function (s) {
      return i(a, s, 1), o(a, s), s;
    };
  },
  6557(e, t, n) {
    var r = n(4995).has;
    e.exports = function (a) {
      return r(a), a;
    };
  },
  6469(e, t, n) {
    var r = n(8227),
      a = n(2360),
      i = n(4913).f,
      o = r("unscopables"),
      s = Array.prototype;
    s[o] === void 0 && i(s, o, {
      configurable: !0,
      value: a(null)
    }), e.exports = function (l) {
      s[o][l] = !0;
    };
  },
  679(e, t, n) {
    var r = n(1625),
      a = TypeError;
    e.exports = function (i, o) {
      if (r(o, i)) return i;
      throw new a("Incorrect invocation");
    };
  },
  8551(e, t, n) {
    var r = n(34),
      a = String,
      i = TypeError;
    e.exports = function (o) {
      if (r(o)) return o;
      throw new i(a(o) + " is not an object");
    };
  },
  7811(e) {
    e.exports = typeof ArrayBuffer < "u" && typeof DataView < "u";
  },
  4644(e, t, n) {
    var r = n(7811),
      a = n(3724),
      i = n(4576),
      o = n(4901),
      s = n(34),
      l = n(9297),
      d = n(6955),
      u = n(6823),
      h = n(6699),
      p = n(6840),
      m = n(2106),
      f = n(1625),
      y = n(2787),
      b = n(2967),
      v = n(8227),
      _ = n(3392),
      w = n(1181),
      k = w.enforce,
      A = w.get,
      S = i.Int8Array,
      C = S && S.prototype,
      I = i.Uint8ClampedArray,
      E = I && I.prototype,
      M = S && y(S),
      T = C && y(C),
      P = Object.prototype,
      R = i.TypeError,
      j = v("toStringTag"),
      B = _("TYPED_ARRAY_TAG"),
      F = "TypedArrayConstructor",
      N = r && !!b && d(i.opera) !== "Opera",
      G = !1,
      z,
      V,
      O,
      L = {
        Int8Array: 1,
        Uint8Array: 1,
        Uint8ClampedArray: 1,
        Int16Array: 2,
        Uint16Array: 2,
        Int32Array: 4,
        Uint32Array: 4,
        Float32Array: 4,
        Float64Array: 8
      },
      D = {
        BigInt64Array: 8,
        BigUint64Array: 8
      },
      U = function (de) {
        if (!s(de)) return !1;
        var le = d(de);
        return le === "DataView" || l(L, le) || l(D, le);
      },
      H = function (ne) {
        var de = y(ne);
        if (s(de)) {
          var le = A(de);
          return le && l(le, F) ? le[F] : H(de);
        }
      },
      Y = function (ne) {
        if (!s(ne)) return !1;
        var de = d(ne);
        return l(L, de) || l(D, de);
      },
      K = function (ne) {
        if (Y(ne)) return ne;
        throw new R("Target is not a typed array");
      },
      W = function (ne) {
        if (o(ne) && (!b || f(M, ne))) return ne;
        throw new R(u(ne) + " is not a typed array constructor");
      },
      Q = function (ne, de, le, J) {
        if (a) {
          if (le) for (var pe in L) {
            var ce = i[pe];
            if (ce && l(ce.prototype, ne)) try {
              delete ce.prototype[ne];
            } catch {
              try {
                ce.prototype[ne] = de;
              } catch {}
            }
          }
          (!T[ne] || le) && p(T, ne, le ? de : N && C[ne] || de, J);
        }
      },
      q = function (ne, de, le) {
        var J, pe;
        if (a) {
          if (b) {
            if (le) {
              for (J in L) if (pe = i[J], pe && l(pe, ne)) try {
                delete pe[ne];
              } catch {}
            }
            if (!M[ne] || le) try {
              return p(M, ne, le ? de : N && M[ne] || de);
            } catch {} else return;
          }
          for (J in L) pe = i[J], pe && (!pe[ne] || le) && p(pe, ne, de);
        }
      };
    for (z in L) V = i[z], O = V && V.prototype, O ? k(O)[F] = V : N = !1;
    for (z in D) V = i[z], O = V && V.prototype, O && (k(O)[F] = V);
    if ((!N || !o(M) || M === Function.prototype) && (M = function () {
      throw new R("Incorrect invocation");
    }, N)) for (z in L) i[z] && b(i[z], M);
    if ((!N || !T || T === P) && (T = M.prototype, N)) for (z in L) i[z] && b(i[z].prototype, T);
    if (N && y(E) !== T && b(E, T), a && !l(T, j)) {
      G = !0, m(T, j, {
        configurable: !0,
        get: function () {
          return s(this) ? this[B] : void 0;
        }
      });
      for (z in L) i[z] && h(i[z].prototype, B, z);
    }
    e.exports = {
      NATIVE_ARRAY_BUFFER_VIEWS: N,
      TYPED_ARRAY_TAG: G && B,
      aTypedArray: K,
      aTypedArrayConstructor: W,
      exportTypedArrayMethod: Q,
      exportTypedArrayStaticMethod: q,
      getTypedArrayConstructor: H,
      isView: U,
      isTypedArray: Y,
      TypedArray: M,
      TypedArrayPrototype: T
    };
  },
  9617(e, t, n) {
    var r = n(5397),
      a = n(5610),
      i = n(6198),
      o = function (s) {
        return function (l, d, u) {
          var h = r(l),
            p = i(h);
          if (p === 0) return !s && -1;
          var m = a(u, p),
            f;
          if (s && d !== d) {
            for (; p > m;) if (f = h[m++], f !== f) return !0;
          } else for (; p > m; m++) if ((s || m in h) && h[m] === d) return s || m || 0;
          return !s && -1;
        };
      };
    e.exports = {
      includes: o(!0),
      indexOf: o(!1)
    };
  },
  4527(e, t, n) {
    var r = n(3724),
      a = n(4376),
      i = TypeError,
      o = Object.getOwnPropertyDescriptor,
      s = r && !(function () {
        if (this !== void 0) return !0;
        try {
          Object.defineProperty([], "length", {
            writable: !1
          }).length = 1;
        } catch (l) {
          return l instanceof TypeError;
        }
      })();
    e.exports = s ? function (l, d) {
      if (a(l) && !o(l, "length").writable) throw new i("Cannot set read only .length");
      return l.length = d;
    } : function (l, d) {
      return l.length = d;
    };
  },
  6319(e, t, n) {
    var r = n(8551),
      a = n(9539);
    e.exports = function (i, o, s, l) {
      try {
        return l ? o(r(s)[0], s[1]) : o(s);
      } catch (d) {
        a(i, "throw", d);
      }
    };
  },
  2195(e, t, n) {
    var r = n(9504),
      a = r({}.toString),
      i = r("".slice);
    e.exports = function (o) {
      return i(a(o), 8, -1);
    };
  },
  6955(e, t, n) {
    var r = n(2140),
      a = n(4901),
      i = n(2195),
      o = n(8227),
      s = o("toStringTag"),
      l = Object,
      d = i((function () {
        return arguments;
      })()) === "Arguments",
      u = function (h, p) {
        try {
          return h[p];
        } catch {}
      };
    e.exports = r ? i : function (h) {
      var p, m, f;
      return h === void 0 ? "Undefined" : h === null ? "Null" : typeof (m = u(p = l(h), s)) == "string" ? m : d ? i(p) : (f = i(p)) === "Object" && a(p.callee) ? "Arguments" : f;
    };
  },
  7740(e, t, n) {
    var r = n(9297),
      a = n(5031),
      i = n(7347),
      o = n(4913);
    e.exports = function (s, l, d) {
      for (var u = a(l), h = o.f, p = i.f, m = 0; m < u.length; m++) {
        var f = u[m];
        !r(s, f) && !(d && r(d, f)) && h(s, f, p(l, f));
      }
    };
  },
  2211(e, t, n) {
    var r = n(9039);
    e.exports = !r(function () {
      function a() {}
      return a.prototype.constructor = null, Object.getPrototypeOf(new a()) !== a.prototype;
    });
  },
  2529(e) {
    e.exports = function (t, n) {
      return {
        value: t,
        done: n
      };
    };
  },
  6699(e, t, n) {
    var r = n(3724),
      a = n(4913),
      i = n(6980);
    e.exports = r ? function (o, s, l) {
      return a.f(o, s, i(1, l));
    } : function (o, s, l) {
      return o[s] = l, o;
    };
  },
  6980(e) {
    e.exports = function (t, n) {
      return {
        enumerable: !(t & 1),
        configurable: !(t & 2),
        writable: !(t & 4),
        value: n
      };
    };
  },
  4659(e, t, n) {
    var r = n(3724),
      a = n(4913),
      i = n(6980);
    e.exports = function (o, s, l) {
      r ? a.f(o, s, i(0, l)) : o[s] = l;
    };
  },
  2106(e, t, n) {
    var r = n(283),
      a = n(4913);
    e.exports = function (i, o, s) {
      return s.get && r(s.get, o, {
        getter: !0
      }), s.set && r(s.set, o, {
        setter: !0
      }), a.f(i, o, s);
    };
  },
  6840(e, t, n) {
    var r = n(4901),
      a = n(4913),
      i = n(283),
      o = n(9433);
    e.exports = function (s, l, d, u) {
      u || (u = {});
      var h = u.enumerable,
        p = u.name !== void 0 ? u.name : l;
      if (r(d) && i(d, p, u), u.global) h ? s[l] = d : o(l, d);else {
        try {
          u.unsafe ? s[l] && (h = !0) : delete s[l];
        } catch {}
        h ? s[l] = d : a.f(s, l, {
          value: d,
          enumerable: !1,
          configurable: !u.nonConfigurable,
          writable: !u.nonWritable
        });
      }
      return s;
    };
  },
  6279(e, t, n) {
    var r = n(6840);
    e.exports = function (a, i, o) {
      for (var s in i) r(a, s, i[s], o);
      return a;
    };
  },
  9433(e, t, n) {
    var r = n(4576),
      a = Object.defineProperty;
    e.exports = function (i, o) {
      try {
        a(r, i, {
          value: o,
          configurable: !0,
          writable: !0
        });
      } catch {
        r[i] = o;
      }
      return o;
    };
  },
  3724(e, t, n) {
    var r = n(9039);
    e.exports = !r(function () {
      return Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        }
      })[1] !== 7;
    });
  },
  4055(e, t, n) {
    var r = n(4576),
      a = n(34),
      i = r.document,
      o = a(i) && a(i.createElement);
    e.exports = function (s) {
      return o ? i.createElement(s) : {};
    };
  },
  6837(e) {
    var t = TypeError,
      n = 9007199254740991;
    e.exports = function (r) {
      if (r > n) throw new t("Maximum allowed index exceeded");
      return r;
    };
  },
  8727(e) {
    e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  },
  2839(e, t, n) {
    var r = n(4576),
      a = r.navigator,
      i = a && a.userAgent;
    e.exports = i ? String(i) : "";
  },
  9519(e, t, n) {
    var r = n(4576),
      a = n(2839),
      i = r.process,
      o = r.Deno,
      s = i && i.versions || o && o.version,
      l = s && s.v8,
      d,
      u;
    l && (d = l.split("."), u = d[0] > 0 && d[0] < 4 ? 1 : +(d[0] + d[1])), !u && a && (d = a.match(/Edge\/(\d+)/), (!d || d[1] >= 74) && (d = a.match(/Chrome\/(\d+)/), d && (u = +d[1]))), e.exports = u;
  },
  6518(e, t, n) {
    var r = n(4576),
      a = n(7347).f,
      i = n(6699),
      o = n(6840),
      s = n(9433),
      l = n(7740),
      d = n(2796);
    e.exports = function (u, h) {
      var p = u.target,
        m = u.global,
        f = u.stat,
        y,
        b,
        v,
        _,
        w,
        k;
      if (m ? b = r : f ? b = r[p] || s(p, {}) : b = r[p] && r[p].prototype, b) for (v in h) {
        if (w = h[v], u.dontCallGetSet ? (k = a(b, v), _ = k && k.value) : _ = b[v], y = d(m ? v : p + (f ? "." : "#") + v, u.forced), !y && _ !== void 0) {
          if (typeof w == typeof _) continue;
          l(w, _);
        }
        (u.sham || _ && _.sham) && i(w, "sham", !0), o(b, v, w, u);
      }
    };
  },
  9039(e) {
    e.exports = function (t) {
      try {
        return !!t();
      } catch {
        return !0;
      }
    };
  },
  6080(e, t, n) {
    var r = n(7476),
      a = n(9306),
      i = n(616),
      o = r(r.bind);
    e.exports = function (s, l) {
      return a(s), l === void 0 ? s : i ? o(s, l) : function () {
        return s.apply(l, arguments);
      };
    };
  },
  616(e, t, n) {
    var r = n(9039);
    e.exports = !r(function () {
      var a = (function () {}).bind();
      return typeof a != "function" || a.hasOwnProperty("prototype");
    });
  },
  9565(e, t, n) {
    var r = n(616),
      a = Function.prototype.call;
    e.exports = r ? a.bind(a) : function () {
      return a.apply(a, arguments);
    };
  },
  350(e, t, n) {
    var r = n(3724),
      a = n(9297),
      i = Function.prototype,
      o = r && Object.getOwnPropertyDescriptor,
      s = a(i, "name"),
      l = s && (function () {}).name === "something",
      d = s && (!r || r && o(i, "name").configurable);
    e.exports = {
      EXISTS: s,
      PROPER: l,
      CONFIGURABLE: d
    };
  },
  6706(e, t, n) {
    var r = n(9504),
      a = n(9306);
    e.exports = function (i, o, s) {
      try {
        return r(a(Object.getOwnPropertyDescriptor(i, o)[s]));
      } catch {}
    };
  },
  7476(e, t, n) {
    var r = n(2195),
      a = n(9504);
    e.exports = function (i) {
      if (r(i) === "Function") return a(i);
    };
  },
  9504(e, t, n) {
    var r = n(616),
      a = Function.prototype,
      i = a.call,
      o = r && a.bind.bind(i, i);
    e.exports = r ? o : function (s) {
      return function () {
        return i.apply(s, arguments);
      };
    };
  },
  7751(e, t, n) {
    var r = n(4576),
      a = n(4901),
      i = function (o) {
        return a(o) ? o : void 0;
      };
    e.exports = function (o, s) {
      return arguments.length < 2 ? i(r[o]) : r[o] && r[o][s];
    };
  },
  1767(e) {
    e.exports = function (t) {
      return {
        iterator: t,
        next: t.next,
        done: !1
      };
    };
  },
  8563(e, t, n) {
    var r = n(9565),
      a = n(4901),
      i = n(8551),
      o = n(6823),
      s = n(3085),
      l = TypeError;
    e.exports = function (d, u) {
      var h = arguments.length < 2 ? s(d) : u;
      if (a(h)) return i(r(h, d));
      throw new l(o(d) + " is not iterable");
    };
  },
  3085(e, t, n) {
    var r = n(2195),
      a = n(4117),
      i = n(5966),
      o = n(8227),
      s = o("iterator"),
      l = Array.prototype;
    e.exports = function (d) {
      if (!a(d)) return i(d, s) || i(d, "@@iterator") || (r(d) === "Arguments" ? l[s] : void 0);
    };
  },
  5966(e, t, n) {
    var r = n(9306),
      a = n(4117);
    e.exports = function (i, o) {
      var s = i[o];
      return a(s) ? void 0 : r(s);
    };
  },
  3789(e, t, n) {
    var r = n(9306),
      a = n(8551),
      i = n(9565),
      o = n(1291),
      s = n(1767),
      l = "Invalid size",
      d = RangeError,
      u = TypeError,
      h = Math.max,
      p = function (m, f) {
        this.set = m, this.size = h(f, 0), this.has = r(m.has), this.keys = r(m.keys);
      };
    p.prototype = {
      getIterator: function () {
        return s(a(i(this.keys, this.set)));
      },
      includes: function (m) {
        return i(this.has, this.set, m);
      }
    }, e.exports = function (m) {
      a(m);
      var f = +m.size;
      if (f !== f) throw new u(l);
      var y = o(f);
      if (y < 0) throw new d(l);
      return new p(m, y);
    };
  },
  4576(e) {
    var t = function (n) {
      return n && n.Math === Math && n;
    };
    e.exports = t(typeof globalThis == "object" && globalThis) || t(typeof window == "object" && window) || t(typeof self == "object" && self) || t(typeof global == "object" && global) || t(typeof this == "object" && this) || (function () {
      return this;
    })() || Function("return this")();
  },
  9297(e, t, n) {
    var r = n(9504),
      a = n(8981),
      i = r({}.hasOwnProperty);
    e.exports = Object.hasOwn || function (s, l) {
      return i(a(s), l);
    };
  },
  421(e) {
    e.exports = {};
  },
  397(e, t, n) {
    var r = n(7751);
    e.exports = r("document", "documentElement");
  },
  5917(e, t, n) {
    var r = n(3724),
      a = n(9039),
      i = n(4055);
    e.exports = !r && !a(function () {
      return Object.defineProperty(i("div"), "a", {
        get: function () {
          return 7;
        }
      }).a !== 7;
    });
  },
  7055(e, t, n) {
    var r = n(9504),
      a = n(9039),
      i = n(2195),
      o = Object,
      s = r("".split);
    e.exports = a(function () {
      return !o("z").propertyIsEnumerable(0);
    }) ? function (l) {
      return i(l) === "String" ? s(l, "") : o(l);
    } : o;
  },
  3706(e, t, n) {
    var r = n(9504),
      a = n(4901),
      i = n(7629),
      o = r(Function.toString);
    a(i.inspectSource) || (i.inspectSource = function (s) {
      return o(s);
    }), e.exports = i.inspectSource;
  },
  1181(e, t, n) {
    var r = n(8622),
      a = n(4576),
      i = n(34),
      o = n(6699),
      s = n(9297),
      l = n(7629),
      d = n(6119),
      u = n(421),
      h = "Object already initialized",
      p = a.TypeError,
      m = a.WeakMap,
      f,
      y,
      b,
      v = function (A) {
        return b(A) ? y(A) : f(A, {});
      },
      _ = function (A) {
        return function (S) {
          var C;
          if (!i(S) || (C = y(S)).type !== A) throw new p("Incompatible receiver, " + A + " required");
          return C;
        };
      };
    if (r || l.state) {
      var w = l.state || (l.state = new m());
      w.get = w.get, w.has = w.has, w.set = w.set, f = function (A, S) {
        if (w.has(A)) throw new p(h);
        return S.facade = A, w.set(A, S), S;
      }, y = function (A) {
        return w.get(A) || {};
      }, b = function (A) {
        return w.has(A);
      };
    } else {
      var k = d("state");
      u[k] = !0, f = function (A, S) {
        if (s(A, k)) throw new p(h);
        return S.facade = A, o(A, k, S), S;
      }, y = function (A) {
        return s(A, k) ? A[k] : {};
      }, b = function (A) {
        return s(A, k);
      };
    }
    e.exports = {
      set: f,
      get: y,
      has: b,
      enforce: v,
      getterFor: _
    };
  },
  4209(e, t, n) {
    var r = n(8227),
      a = n(6269),
      i = r("iterator"),
      o = Array.prototype;
    e.exports = function (s) {
      return s !== void 0 && (a.Array === s || o[i] === s);
    };
  },
  4376(e, t, n) {
    var r = n(2195);
    e.exports = Array.isArray || function (i) {
      return r(i) === "Array";
    };
  },
  1108(e, t, n) {
    var r = n(6955);
    e.exports = function (a) {
      var i = r(a);
      return i === "BigInt64Array" || i === "BigUint64Array";
    };
  },
  4901(e) {
    var t = typeof document == "object" && document.all;
    e.exports = typeof t > "u" && t !== void 0 ? function (n) {
      return typeof n == "function" || n === t;
    } : function (n) {
      return typeof n == "function";
    };
  },
  2796(e, t, n) {
    var r = n(9039),
      a = n(4901),
      i = /#|\.prototype\./,
      o = function (h, p) {
        var m = l[s(h)];
        return m === u ? !0 : m === d ? !1 : a(p) ? r(p) : !!p;
      },
      s = o.normalize = function (h) {
        return String(h).replace(i, ".").toLowerCase();
      },
      l = o.data = {},
      d = o.NATIVE = "N",
      u = o.POLYFILL = "P";
    e.exports = o;
  },
  4117(e) {
    e.exports = function (t) {
      return t == null;
    };
  },
  34(e, t, n) {
    var r = n(4901);
    e.exports = function (a) {
      return typeof a == "object" ? a !== null : r(a);
    };
  },
  3925(e, t, n) {
    var r = n(34);
    e.exports = function (a) {
      return r(a) || a === null;
    };
  },
  6395(e) {
    e.exports = !1;
  },
  5810(e, t, n) {
    var r = n(34),
      a = n(1181).get;
    e.exports = function (o) {
      if (!r(o)) return !1;
      var s = a(o);
      return !!s && s.type === "RawJSON";
    };
  },
  757(e, t, n) {
    var r = n(7751),
      a = n(4901),
      i = n(1625),
      o = n(7040),
      s = Object;
    e.exports = o ? function (l) {
      return typeof l == "symbol";
    } : function (l) {
      var d = r("Symbol");
      return a(d) && i(d.prototype, s(l));
    };
  },
  507(e, t, n) {
    var r = n(9565);
    e.exports = function (a, i, o) {
      for (var s = o ? a : a.iterator, l = a.next, d, u; !(d = r(l, s)).done;) if (u = i(d.value), u !== void 0) return u;
    };
  },
  2652(e, t, n) {
    var r = n(6080),
      a = n(9565),
      i = n(8551),
      o = n(6823),
      s = n(4209),
      l = n(6198),
      d = n(1625),
      u = n(8563),
      h = n(3085),
      p = n(9539),
      m = TypeError,
      f = function (b, v) {
        this.stopped = b, this.result = v;
      },
      y = f.prototype;
    e.exports = function (b, v, _) {
      var w = _ && _.that,
        k = !!(_ && _.AS_ENTRIES),
        A = !!(_ && _.IS_RECORD),
        S = !!(_ && _.IS_ITERATOR),
        C = !!(_ && _.INTERRUPTED),
        I = r(v, w),
        E,
        M,
        T,
        P,
        R,
        j,
        B,
        F = function (z) {
          var V = E;
          return E = void 0, V && p(V, "normal"), new f(!0, z);
        },
        N = function (z) {
          return k ? (i(z), C ? I(z[0], z[1], F) : I(z[0], z[1])) : C ? I(z, F) : I(z);
        };
      if (A) E = b.iterator;else if (S) E = b;else {
        if (M = h(b), !M) throw new m(o(b) + " is not iterable");
        if (s(M)) {
          for (T = 0, P = l(b); P > T; T++) if (R = N(b[T]), R && d(y, R)) return R;
          return new f(!1);
        }
        E = u(b, M);
      }
      for (j = A ? b.next : E.next; !(B = a(j, E)).done;) {
        var G = B.value;
        try {
          R = N(G);
        } catch (z) {
          if (E) p(E, "throw", z);else throw z;
        }
        if (typeof R == "object" && R && d(y, R)) return R;
      }
      return new f(!1);
    };
  },
  6859(e) {
    e.exports = function (t) {
      t.iterator = t.next = t.nextHandler = t.mapper = t.predicate = t.inner = t.iterables = t.iters = t.openIters = t.padding = t.finishResults = t.buffer = null;
    };
  },
  1385(e, t, n) {
    var r = n(9539);
    e.exports = function (a, i, o) {
      for (var s = a.length - 1; s >= 0; s--) if (a[s] !== void 0) try {
        o = r(a[s].iterator, i, o);
      } catch (l) {
        i = "throw", o = l;
      }
      if (i === "throw") throw o;
      return o;
    };
  },
  9539(e, t, n) {
    var r = n(9565),
      a = n(8551),
      i = n(5966);
    e.exports = function (o, s, l) {
      var d, u;
      a(o);
      try {
        if (d = i(o, "return"), !d) {
          if (s === "throw") throw l;
          return l;
        }
        d = r(d, o);
      } catch (h) {
        u = !0, d = h;
      }
      if (s === "throw") throw l;
      if (u) throw d;
      return a(d), l;
    };
  },
  9462(e, t, n) {
    var r = n(9565),
      a = n(2360),
      i = n(6699),
      o = n(6279),
      s = n(8227),
      l = n(1181),
      d = n(5966),
      u = n(7657).IteratorPrototype,
      h = n(2529),
      p = n(9539),
      m = n(1385),
      f = n(6859),
      y = s("toStringTag"),
      b = "IteratorHelper",
      v = "WrapForValidIterator",
      _ = "normal",
      w = "throw",
      k = l.set,
      A = function (I) {
        var E = l.getterFor(I ? v : b);
        return o(a(u), {
          next: function () {
            var T = E(this);
            if (I) return T.nextHandler();
            if (T.done) return h(void 0, !0);
            try {
              var P = T.nextHandler();
              return T.done && f(T), T.returnHandlerResult ? P : h(P, T.done);
            } catch (R) {
              throw T.done = !0, f(T), R;
            }
          },
          return: function () {
            var M = E(this),
              T = M.iterator,
              P = M.inner,
              R = M.openIters,
              j = M.done;
            if (M.done = !0, I) {
              var B = d(T, "return");
              return B ? r(B, T) : h(void 0, !0);
            }
            if (f(M), j) return h(void 0, !0);
            if (P) try {
              p(P.iterator, _);
            } catch (F) {
              return p(T, w, F);
            }
            if (R) try {
              m(R, _);
            } catch (F) {
              if (T) return p(T, w, F);
              throw F;
            }
            return T && p(T, _), h(void 0, !0);
          }
        });
      },
      S = A(!0),
      C = A(!1);
    i(C, y, "Iterator Helper"), e.exports = function (I, E, M) {
      var T = function (R, j) {
        j ? (j.iterator = R.iterator, j.next = R.next) : j = R, j.type = E ? v : b, j.returnHandlerResult = !!M, j.nextHandler = I, j.counter = 0, j.done = !1, k(this, j);
      };
      return T.prototype = E ? S : C, T;
    };
  },
  684(e) {
    e.exports = function (t, n) {
      var r = typeof Iterator == "function" && Iterator.prototype[t];
      if (r) try {
        r.call({
          next: null
        }, n).next();
      } catch {
        return !0;
      }
    };
  },
  4549(e, t, n) {
    var r = n(4576);
    e.exports = function (a, i) {
      var o = r.Iterator,
        s = o && o.prototype,
        l = s && s[a],
        d = !1;
      if (l) try {
        l.call({
          next: function () {
            return {
              done: !0
            };
          },
          return: function () {
            d = !0;
          }
        }, -1);
      } catch (u) {
        u instanceof i || (d = !1);
      }
      if (!d) return l;
    };
  },
  7657(e, t, n) {
    var r = n(9039),
      a = n(4901),
      i = n(34),
      o = n(2360),
      s = n(2787),
      l = n(6840),
      d = n(8227),
      u = n(6395),
      h = d("iterator"),
      p = !1,
      m,
      f,
      y;
    [].keys && (y = [].keys(), "next" in y ? (f = s(s(y)), f !== Object.prototype && (m = f)) : p = !0);
    var b = !i(m) || r(function () {
      var v = {};
      return m[h].call(v) !== v;
    });
    b ? m = {} : u && (m = o(m)), a(m[h]) || l(m, h, function () {
      return this;
    }), e.exports = {
      IteratorPrototype: m,
      BUGGY_SAFARI_ITERATORS: p
    };
  },
  6269(e) {
    e.exports = Object.create ? Object.create(null) : {};
  },
  6198(e, t, n) {
    var r = n(8014);
    e.exports = function (a) {
      return r(a.length);
    };
  },
  283(e, t, n) {
    var r = n(9504),
      a = n(9039),
      i = n(4901),
      o = n(9297),
      s = n(3724),
      l = n(350).CONFIGURABLE,
      d = n(3706),
      u = n(1181),
      h = u.enforce,
      p = u.get,
      m = String,
      f = Object.defineProperty,
      y = r("".slice),
      b = r("".replace),
      v = r([].join),
      _ = s && !a(function () {
        return f(function () {}, "length", {
          value: 8
        }).length !== 8;
      }),
      w = String(String).split("String"),
      k = e.exports = function (A, S, C) {
        y(m(S), 0, 7) === "Symbol(" && (S = "[" + b(m(S), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), C && C.getter && (S = "get " + S), C && C.setter && (S = "set " + S), (!o(A, "name") || l && A.name !== S) && (s ? f(A, "name", {
          value: S,
          configurable: !0
        }) : A.name = S), _ && C && o(C, "arity") && A.length !== C.arity && f(A, "length", {
          value: C.arity
        });
        try {
          C && o(C, "constructor") && C.constructor ? s && f(A, "prototype", {
            writable: !1
          }) : A.prototype && (A.prototype = void 0);
        } catch {}
        var I = h(A);
        return o(I, "source") || (I.source = v(w, typeof S == "string" ? S : "")), A;
      };
    Function.prototype.toString = k(function () {
      return i(this) && p(this).source || d(this);
    }, "toString");
  },
  2248(e, t, n) {
    var r = n(9504),
      a = Map.prototype;
    e.exports = {
      Map,
      set: r(a.set),
      get: r(a.get),
      has: r(a.has),
      remove: r(a.delete),
      proto: a
    };
  },
  741(e) {
    var t = Math.ceil,
      n = Math.floor;
    e.exports = Math.trunc || function (a) {
      var i = +a;
      return (i > 0 ? n : t)(i);
    };
  },
  7819(e, t, n) {
    var r = n(9039);
    e.exports = !r(function () {
      var a = "9007199254740993",
        i = JSON.rawJSON(a);
      return !JSON.isRawJSON(i) || JSON.stringify(i) !== a;
    });
  },
  2360(e, t, n) {
    var r = n(8551),
      a = n(6801),
      i = n(8727),
      o = n(421),
      s = n(397),
      l = n(4055),
      d = n(6119),
      u = ">",
      h = "<",
      p = "prototype",
      m = "script",
      f = d("IE_PROTO"),
      y = function () {},
      b = function (A) {
        return h + m + u + A + h + "/" + m + u;
      },
      v = function (A) {
        A.write(b("")), A.close();
        var S = A.parentWindow.Object;
        return A = null, S;
      },
      _ = function () {
        var A = l("iframe"),
          S = "java" + m + ":",
          C;
        return A.style.display = "none", s.appendChild(A), A.src = String(S), C = A.contentWindow.document, C.open(), C.write(b("document.F=Object")), C.close(), C.F;
      },
      w,
      k = function () {
        try {
          w = new ActiveXObject("htmlfile");
        } catch {}
        k = typeof document < "u" ? document.domain && w ? v(w) : _() : v(w);
        for (var A = i.length; A--;) delete k[p][i[A]];
        return k();
      };
    o[f] = !0, e.exports = Object.create || function (S, C) {
      var I;
      return S !== null ? (y[p] = r(S), I = new y(), y[p] = null, I[f] = S) : I = k(), C === void 0 ? I : a.f(I, C);
    };
  },
  6801(e, t, n) {
    var r = n(3724),
      a = n(8686),
      i = n(4913),
      o = n(8551),
      s = n(5397),
      l = n(1072);
    t.f = r && !a ? Object.defineProperties : function (u, h) {
      o(u);
      for (var p = s(h), m = l(h), f = m.length, y = 0, b; f > y;) i.f(u, b = m[y++], p[b]);
      return u;
    };
  },
  4913(e, t, n) {
    var r = n(3724),
      a = n(5917),
      i = n(8686),
      o = n(8551),
      s = n(6969),
      l = TypeError,
      d = Object.defineProperty,
      u = Object.getOwnPropertyDescriptor,
      h = "enumerable",
      p = "configurable",
      m = "writable";
    t.f = r ? i ? function (y, b, v) {
      if (o(y), b = s(b), o(v), typeof y == "function" && b === "prototype" && "value" in v && m in v && !v[m]) {
        var _ = u(y, b);
        _ && _[m] && (y[b] = v.value, v = {
          configurable: p in v ? v[p] : _[p],
          enumerable: h in v ? v[h] : _[h],
          writable: !1
        });
      }
      return d(y, b, v);
    } : d : function (y, b, v) {
      if (o(y), b = s(b), o(v), a) try {
        return d(y, b, v);
      } catch {}
      if ("get" in v || "set" in v) throw new l("Accessors not supported");
      return "value" in v && (y[b] = v.value), y;
    };
  },
  7347(e, t, n) {
    var r = n(3724),
      a = n(9565),
      i = n(8773),
      o = n(6980),
      s = n(5397),
      l = n(6969),
      d = n(9297),
      u = n(5917),
      h = Object.getOwnPropertyDescriptor;
    t.f = r ? h : function (m, f) {
      if (m = s(m), f = l(f), u) try {
        return h(m, f);
      } catch {}
      if (d(m, f)) return o(!a(i.f, m, f), m[f]);
    };
  },
  8480(e, t, n) {
    var r = n(1828),
      a = n(8727),
      i = a.concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function (s) {
      return r(s, i);
    };
  },
  3717(e, t) {
    t.f = Object.getOwnPropertySymbols;
  },
  2787(e, t, n) {
    var r = n(9297),
      a = n(4901),
      i = n(8981),
      o = n(6119),
      s = n(2211),
      l = o("IE_PROTO"),
      d = Object,
      u = d.prototype;
    e.exports = s ? d.getPrototypeOf : function (h) {
      var p = i(h);
      if (r(p, l)) return p[l];
      var m = p.constructor;
      return a(m) && p instanceof m ? m.prototype : p instanceof d ? u : null;
    };
  },
  1625(e, t, n) {
    var r = n(9504);
    e.exports = r({}.isPrototypeOf);
  },
  1828(e, t, n) {
    var r = n(9504),
      a = n(9297),
      i = n(5397),
      o = n(9617).indexOf,
      s = n(421),
      l = r([].push);
    e.exports = function (d, u) {
      var h = i(d),
        p = 0,
        m = [],
        f;
      for (f in h) !a(s, f) && a(h, f) && l(m, f);
      for (; u.length > p;) a(h, f = u[p++]) && (~o(m, f) || l(m, f));
      return m;
    };
  },
  1072(e, t, n) {
    var r = n(1828),
      a = n(8727);
    e.exports = Object.keys || function (o) {
      return r(o, a);
    };
  },
  8773(e, t) {
    var n = {}.propertyIsEnumerable,
      r = Object.getOwnPropertyDescriptor,
      a = r && !n.call({
        1: 2
      }, 1);
    t.f = a ? function (o) {
      var s = r(this, o);
      return !!s && s.enumerable;
    } : n;
  },
  2967(e, t, n) {
    var r = n(6706),
      a = n(34),
      i = n(7750),
      o = n(3506);
    e.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function () {
      var s = !1,
        l = {},
        d;
      try {
        d = r(Object.prototype, "__proto__", "set"), d(l, []), s = l instanceof Array;
      } catch {}
      return function (h, p) {
        return i(h), o(p), a(h) && (s ? d(h, p) : h.__proto__ = p), h;
      };
    })() : void 0);
  },
  4270(e, t, n) {
    var r = n(9565),
      a = n(4901),
      i = n(34),
      o = TypeError;
    e.exports = function (s, l) {
      var d, u;
      if (l === "string" && a(d = s.toString) && !i(u = r(d, s)) || a(d = s.valueOf) && !i(u = r(d, s)) || l !== "string" && a(d = s.toString) && !i(u = r(d, s))) return u;
      throw new o("Can't convert object to primitive value");
    };
  },
  5031(e, t, n) {
    var r = n(7751),
      a = n(9504),
      i = n(8480),
      o = n(3717),
      s = n(8551),
      l = a([].concat);
    e.exports = r("Reflect", "ownKeys") || function (u) {
      var h = i.f(s(u)),
        p = o.f;
      return p ? l(h, p(u)) : h;
    };
  },
  8235(e, t, n) {
    var r = n(9504),
      a = n(9297),
      i = SyntaxError,
      o = parseInt,
      s = String.fromCharCode,
      l = r("".charAt),
      d = r("".slice),
      u = r(/./.exec),
      h = {
        '\\"': '"',
        "\\\\": "\\",
        "\\/": "/",
        "\\b": "\b",
        "\\f": "\f",
        "\\n": `
`,
        "\\r": "\r",
        "\\t": "	"
      },
      p = /^[\da-f]{4}$/i,
      m = /^[\u0000-\u001F]$/;
    e.exports = function (f, y) {
      for (var b = !0, v = ""; y < f.length;) {
        var _ = l(f, y);
        if (_ === "\\") {
          var w = d(f, y, y + 2);
          if (a(h, w)) v += h[w], y += 2;else if (w === "\\u") {
            y += 2;
            var k = d(f, y, y + 4);
            if (!u(p, k)) throw new i("Bad Unicode escape at: " + y);
            v += s(o(k, 16)), y += 4;
          } else throw new i('Unknown escape sequence: "' + w + '"');
        } else if (_ === '"') {
          b = !1, y++;
          break;
        } else {
          if (u(m, _)) throw new i("Bad control character in string literal at: " + y);
          v += _, y++;
        }
      }
      if (b) throw new i("Unterminated string at: " + y);
      return {
        value: v,
        end: y
      };
    };
  },
  7750(e, t, n) {
    var r = n(4117),
      a = TypeError;
    e.exports = function (i) {
      if (r(i)) throw new a("Can't call method on " + i);
      return i;
    };
  },
  9286(e, t, n) {
    var r = n(4402),
      a = n(8469),
      i = r.Set,
      o = r.add;
    e.exports = function (s) {
      var l = new i();
      return a(s, function (d) {
        o(l, d);
      }), l;
    };
  },
  3440(e, t, n) {
    var r = n(7080),
      a = n(4402),
      i = n(9286),
      o = n(5170),
      s = n(3789),
      l = n(8469),
      d = n(507),
      u = a.has,
      h = a.remove;
    e.exports = function (m) {
      var f = r(this),
        y = s(m),
        b = i(f);
      return o(b) <= y.size ? l(b, function (v) {
        y.includes(v) && h(b, v);
      }) : d(y.getIterator(), function (v) {
        u(b, v) && h(b, v);
      }), b;
    };
  },
  4402(e, t, n) {
    var r = n(9504),
      a = Set.prototype;
    e.exports = {
      Set,
      add: r(a.add),
      has: r(a.has),
      remove: r(a.delete),
      proto: a
    };
  },
  8750(e, t, n) {
    var r = n(7080),
      a = n(4402),
      i = n(5170),
      o = n(3789),
      s = n(8469),
      l = n(507),
      d = a.Set,
      u = a.add,
      h = a.has;
    e.exports = function (m) {
      var f = r(this),
        y = o(m),
        b = new d();
      return i(f) > y.size ? l(y.getIterator(), function (v) {
        h(f, v) && u(b, v);
      }) : s(f, function (v) {
        y.includes(v) && u(b, v);
      }), b;
    };
  },
  4449(e, t, n) {
    var r = n(7080),
      a = n(4402).has,
      i = n(5170),
      o = n(3789),
      s = n(8469),
      l = n(507),
      d = n(9539);
    e.exports = function (h) {
      var p = r(this),
        m = o(h);
      if (i(p) <= m.size) return s(p, function (y) {
        if (m.includes(y)) return !1;
      }, !0) !== !1;
      var f = m.getIterator();
      return l(f, function (y) {
        if (a(p, y)) return d(f.iterator, "normal", !1);
      }) !== !1;
    };
  },
  3838(e, t, n) {
    var r = n(7080),
      a = n(5170),
      i = n(8469),
      o = n(3789);
    e.exports = function (l) {
      var d = r(this),
        u = o(l);
      return a(d) > u.size ? !1 : i(d, function (h) {
        if (!u.includes(h)) return !1;
      }, !0) !== !1;
    };
  },
  8527(e, t, n) {
    var r = n(7080),
      a = n(4402).has,
      i = n(5170),
      o = n(3789),
      s = n(507),
      l = n(9539);
    e.exports = function (u) {
      var h = r(this),
        p = o(u);
      if (i(h) < p.size) return !1;
      var m = p.getIterator();
      return s(m, function (f) {
        if (!a(h, f)) return l(m.iterator, "normal", !1);
      }) !== !1;
    };
  },
  8469(e, t, n) {
    var r = n(9504),
      a = n(507),
      i = n(4402),
      o = i.Set,
      s = i.proto,
      l = r(s.forEach),
      d = r(s.keys),
      u = d(new o()).next;
    e.exports = function (h, p, m) {
      return m ? a({
        iterator: d(h),
        next: u
      }, p) : l(h, p);
    };
  },
  4916(e, t, n) {
    var r = n(7751),
      a = function (o) {
        return {
          size: o,
          has: function () {
            return !1;
          },
          keys: function () {
            return {
              next: function () {
                return {
                  done: !0
                };
              }
            };
          }
        };
      },
      i = function (o) {
        return {
          size: o,
          has: function () {
            return !0;
          },
          keys: function () {
            throw new Error("e");
          }
        };
      };
    e.exports = function (o, s) {
      var l = r("Set");
      try {
        new l()[o](a(0));
        try {
          return new l()[o](a(-1)), !1;
        } catch {
          if (!s) return !0;
          try {
            return new l()[o](i(-1 / 0)), !1;
          } catch {
            var d = new l([1, 2]);
            return s(d[o](i(1 / 0)));
          }
        }
      } catch {
        return !1;
      }
    };
  },
  9835(e) {
    e.exports = function (t) {
      try {
        var n = new Set(),
          r = {
            size: 0,
            has: function () {
              return !0;
            },
            keys: function () {
              return Object.defineProperty({}, "next", {
                get: function () {
                  return n.clear(), n.add(4), function () {
                    return {
                      done: !0
                    };
                  };
                }
              });
            }
          },
          a = n[t](r);
        return a.size === 1 && a.values().next().value === 4;
      } catch {
        return !1;
      }
    };
  },
  5170(e, t, n) {
    var r = n(6706),
      a = n(4402);
    e.exports = r(a.proto, "size", "get") || function (i) {
      return i.size;
    };
  },
  3650(e, t, n) {
    var r = n(7080),
      a = n(4402),
      i = n(9286),
      o = n(3789),
      s = n(507),
      l = a.add,
      d = a.has,
      u = a.remove;
    e.exports = function (p) {
      var m = r(this),
        f = o(p).getIterator(),
        y = i(m);
      return s(f, function (b) {
        d(m, b) ? u(y, b) : l(y, b);
      }), y;
    };
  },
  4204(e, t, n) {
    var r = n(7080),
      a = n(4402).add,
      i = n(9286),
      o = n(3789),
      s = n(507);
    e.exports = function (d) {
      var u = r(this),
        h = o(d).getIterator(),
        p = i(u);
      return s(h, function (m) {
        a(p, m);
      }), p;
    };
  },
  6119(e, t, n) {
    var r = n(5745),
      a = n(3392),
      i = r("keys");
    e.exports = function (o) {
      return i[o] || (i[o] = a(o));
    };
  },
  7629(e, t, n) {
    var r = n(6395),
      a = n(4576),
      i = n(9433),
      o = "__core-js_shared__",
      s = e.exports = a[o] || i(o, {});
    (s.versions || (s.versions = [])).push({
      version: "3.50.0",
      mode: r ? "pure" : "global",
      copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
      license: "https://github.com/zloirock/core-js/blob/v3.50.0/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  },
  5745(e, t, n) {
    var r = n(7629),
      a = Object.create || Object;
    e.exports = function (i, o) {
      return r[i] || (r[i] = o || a(null));
    };
  },
  533(e, t, n) {
    var r = n(9504),
      a = n(8014),
      i = n(655),
      o = n(2333),
      s = n(7750),
      l = r(o),
      d = r("".slice),
      u = Math.ceil,
      h = function (p) {
        return function (m, f, y) {
          var b = i(s(m)),
            v = a(f),
            _ = b.length;
          if (v <= _) return b;
          var w = y === void 0 ? " " : i(y),
            k,
            A;
          return w === "" ? b : (k = v - _, A = l(w, u(k / w.length)), A.length > k && (A = d(A, 0, k)), p ? b + A : A + b);
        };
      };
    e.exports = {
      start: h(!1),
      end: h(!0)
    };
  },
  2333(e, t, n) {
    var r = n(1291),
      a = n(655),
      i = n(7750),
      o = RangeError,
      s = Math.floor;
    e.exports = function (d) {
      var u = a(i(this)),
        h = "",
        p = r(d);
      if (p < 0 || p === 1 / 0) throw new o("Wrong number of repetitions");
      for (; p > 0; (p = s(p / 2)) && (u += u)) p % 2 && (h += u);
      return h;
    };
  },
  4495(e, t, n) {
    var r = n(9519),
      a = n(9039),
      i = n(4576),
      o = i.String;
    e.exports = !!Object.getOwnPropertySymbols && !a(function () {
      var s = Symbol("symbol detection");
      return !o(s) || !(Object(s) instanceof Symbol) || !Symbol.sham && r && r < 41;
    });
  },
  1240(e, t, n) {
    var r = n(9504);
    e.exports = r(1.1.valueOf);
  },
  5610(e, t, n) {
    var r = n(1291),
      a = Math.max,
      i = Math.min;
    e.exports = function (o, s) {
      var l = r(o);
      return l < 0 ? a(l + s, 0) : i(l, s);
    };
  },
  5854(e, t, n) {
    var r = n(2777),
      a = TypeError;
    e.exports = function (i) {
      var o = r(i, "number");
      if (typeof o == "number") throw new a("Can't convert number to bigint");
      return BigInt(o);
    };
  },
  5397(e, t, n) {
    var r = n(7055),
      a = n(7750);
    e.exports = function (i) {
      return r(a(i));
    };
  },
  1291(e, t, n) {
    var r = n(741);
    e.exports = function (a) {
      var i = +a;
      return i !== i || i === 0 ? 0 : r(i);
    };
  },
  8014(e, t, n) {
    var r = n(1291),
      a = Math.min;
    e.exports = function (i) {
      var o = r(i);
      return o > 0 ? a(o, 9007199254740991) : 0;
    };
  },
  8981(e, t, n) {
    var r = n(7750),
      a = Object;
    e.exports = function (i) {
      return a(r(i));
    };
  },
  2777(e, t, n) {
    var r = n(9565),
      a = n(34),
      i = n(757),
      o = n(5966),
      s = n(4270),
      l = n(8227),
      d = TypeError,
      u = l("toPrimitive");
    e.exports = function (h, p) {
      if (!a(h) || i(h)) return h;
      var m = o(h, u),
        f;
      if (m) {
        if (p === void 0 && (p = "default"), f = r(m, h, p), !a(f) || i(f)) return f;
        throw new d("Can't convert object to primitive value");
      }
      return p === void 0 && (p = "number"), s(h, p);
    };
  },
  6969(e, t, n) {
    var r = n(2777),
      a = n(757);
    e.exports = function (i) {
      var o = r(i, "string");
      return a(o) ? o : o + "";
    };
  },
  2140(e, t, n) {
    var r = n(8227),
      a = r("toStringTag"),
      i = {};
    i[a] = "z", e.exports = String(i) === "[object z]";
  },
  655(e, t, n) {
    var r = n(6955),
      a = String;
    e.exports = function (i) {
      if (r(i) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
      return a(i);
    };
  },
  6823(e) {
    var t = String;
    e.exports = function (n) {
      try {
        return t(n);
      } catch {
        return "Object";
      }
    };
  },
  3392(e, t, n) {
    var r = n(9504),
      a = 0,
      i = Math.random(),
      o = r(1.1.toString);
    e.exports = function (s) {
      return "Symbol(" + (s === void 0 ? "" : s) + ")_" + o(++a + i, 36);
    };
  },
  7416(e, t, n) {
    var r = n(9039),
      a = n(8227),
      i = n(3724),
      o = n(6395),
      s = a("iterator");
    e.exports = !r(function () {
      var l = new URL("b?a=1&b=2&c=3", "https://a"),
        d = l.searchParams,
        u = new URLSearchParams("a=1&a=2&b=3"),
        h = "";
      return l.pathname = "c%20d", d.forEach(function (p, m) {
        d.delete("b"), h += m + p;
      }), u.delete("a", 2), u.delete("b", void 0), o && (!l.toJSON || !u.has("a", 1) || u.has("a", 2) || !u.has("a", void 0) || u.has("b")) || !d.size && (o || !i) || !d.sort || l.href !== "https://a/c%20d?a=1&c=3" || d.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !d[s] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || h !== "a1c3" || new URL("https://x", void 0).host !== "x";
    });
  },
  7040(e, t, n) {
    var r = n(4495);
    e.exports = r && !Symbol.sham && typeof Symbol.iterator == "symbol";
  },
  8686(e, t, n) {
    var r = n(3724),
      a = n(9039);
    e.exports = r && a(function () {
      return Object.defineProperty(function () {}, "prototype", {
        value: 42,
        writable: !1
      }).prototype !== 42;
    });
  },
  2812(e) {
    var t = TypeError;
    e.exports = function (n, r) {
      if (n < r) throw new t("Not enough arguments");
      return n;
    };
  },
  8622(e, t, n) {
    var r = n(4576),
      a = n(4901),
      i = r.WeakMap;
    e.exports = a(i) && /native code/.test(String(i));
  },
  4995(e, t, n) {
    var r = n(9504),
      a = WeakMap.prototype;
    e.exports = {
      WeakMap,
      set: r(a.set),
      get: r(a.get),
      has: r(a.has),
      remove: r(a.delete)
    };
  },
  8227(e, t, n) {
    var r = n(4576),
      a = n(5745),
      i = n(9297),
      o = n(3392),
      s = n(4495),
      l = n(7040),
      d = r.Symbol,
      u = a("wks"),
      h = l ? d.for || d : d && d.withoutSetter || o;
    e.exports = function (p) {
      return i(u, p) || (u[p] = s && i(d, p) ? d[p] : h("Symbol." + p)), u[p];
    };
  },
  7452(e) {
    e.exports = `	
\v\f\r                　\u2028\u2029\uFEFF`;
  },
  4423(e, t, n) {
    var r = n(6518),
      a = n(9617).includes,
      i = n(9039),
      o = n(6469),
      s = i(function () {
        return !Array(1).includes();
      }),
      l = i(function () {
        return [, 1].includes(void 0, 1);
      });
    r({
      target: "Array",
      proto: !0,
      forced: s || l
    }, {
      includes: function (u) {
        return a(this, u, arguments.length > 1 ? arguments[1] : void 0);
      }
    }), o("includes");
  },
  4114(e, t, n) {
    var r = n(6518),
      a = n(8981),
      i = n(6198),
      o = n(4527),
      s = n(6837),
      l = n(9039),
      d = l(function () {
        return [].push.call({
          length: 4294967296
        }, 1) !== 4294967297;
      }),
      u = function () {
        try {
          Object.defineProperty([], "length", {
            writable: !1
          }).push();
        } catch (p) {
          return p instanceof TypeError;
        }
      },
      h = d || !u();
    r({
      target: "Array",
      proto: !0,
      arity: 1,
      forced: h
    }, {
      push: function (m) {
        var f = a(this),
          y = i(f),
          b = arguments.length;
        s(y + b);
        for (var v = 0; v < b; v++) f[y] = arguments[v], y++;
        return o(f, y), y;
      }
    });
  },
  8111(e, t, n) {
    var r = n(6518),
      a = n(4576),
      i = n(679),
      o = n(8551),
      s = n(4901),
      l = n(2787),
      d = n(2106),
      u = n(4659),
      h = n(9039),
      p = n(9297),
      m = n(8227),
      f = n(7657).IteratorPrototype,
      y = n(3724),
      b = n(6395),
      v = "constructor",
      _ = "Iterator",
      w = m("toStringTag"),
      k = TypeError,
      A = a[_],
      S = b || !s(A) || A.prototype !== f || !h(function () {
        A({});
      }),
      C = function () {
        if (i(this, f), l(this) === f) throw new k("Abstract class Iterator not directly constructable");
      },
      I = function (E, M) {
        y ? d(f, E, {
          configurable: !0,
          get: function () {
            return M;
          },
          set: function (T) {
            if (o(this), this === f) throw new k("You can't redefine this property");
            p(this, E) ? this[E] = T : u(this, E, T);
          }
        }) : f[E] = M;
      };
    p(f, w) || I(w, _), (S || !p(f, v) || f[v] === Object) && I(v, C), C.prototype = f, r({
      global: !0,
      constructor: !0,
      forced: S
    }, {
      Iterator: C
    });
  },
  1148(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(2652),
      o = n(9306),
      s = n(8551),
      l = n(1767),
      d = n(9539),
      u = n(4549),
      h = u("every", TypeError);
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: h
    }, {
      every: function (m) {
        s(this);
        try {
          o(m);
        } catch (b) {
          d(this, "throw", b);
        }
        if (h) return a(h, this, m);
        var f = l(this),
          y = 0;
        return !i(f, function (b, v) {
          if (!m(b, y++)) return v();
        }, {
          IS_RECORD: !0,
          INTERRUPTED: !0
        }).stopped;
      }
    });
  },
  2489(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(9306),
      o = n(8551),
      s = n(1767),
      l = n(9462),
      d = n(6319),
      u = n(6395),
      h = n(9539),
      p = n(684),
      m = n(4549),
      f = !u && !p("filter", function () {}),
      y = !u && !f && m("filter", TypeError),
      b = u || f || y,
      v = l(function () {
        for (var _ = this.iterator, w = this.predicate, k = this.next, A, S, C;;) {
          if (A = o(a(k, _)), S = this.done = !!A.done, S) return;
          if (C = A.value, d(_, w, [C, this.counter++], !0)) return C;
        }
      });
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: b
    }, {
      filter: function (w) {
        o(this);
        try {
          i(w);
        } catch (k) {
          h(this, "throw", k);
        }
        return y ? a(y, this, w) : new v(s(this), {
          predicate: w
        });
      }
    });
  },
  116(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(2652),
      o = n(9306),
      s = n(8551),
      l = n(1767),
      d = n(9539),
      u = n(4549),
      h = u("find", TypeError);
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: h
    }, {
      find: function (m) {
        s(this);
        try {
          o(m);
        } catch (b) {
          d(this, "throw", b);
        }
        if (h) return a(h, this, m);
        var f = l(this),
          y = 0;
        return i(f, function (b, v) {
          if (m(b, y++)) return v(b);
        }, {
          IS_RECORD: !0,
          INTERRUPTED: !0
        }).result;
      }
    });
  },
  7588(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(2652),
      o = n(9306),
      s = n(8551),
      l = n(1767),
      d = n(9539),
      u = n(4549),
      h = u("forEach", TypeError);
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: h
    }, {
      forEach: function (m) {
        s(this);
        try {
          o(m);
        } catch (b) {
          d(this, "throw", b);
        }
        if (h) return a(h, this, m);
        var f = l(this),
          y = 0;
        i(f, function (b) {
          m(b, y++);
        }, {
          IS_RECORD: !0
        });
      }
    });
  },
  1701(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(9306),
      o = n(8551),
      s = n(1767),
      l = n(9462),
      d = n(6319),
      u = n(9539),
      h = n(684),
      p = n(4549),
      m = n(6395),
      f = !m && !h("map", function () {}),
      y = !m && !f && p("map", TypeError),
      b = m || f || y,
      v = l(function () {
        var _ = this.iterator,
          w = o(a(this.next, _)),
          k = this.done = !!w.done;
        if (!k) return d(_, this.mapper, [w.value, this.counter++], !0);
      });
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: b
    }, {
      map: function (w) {
        o(this);
        try {
          i(w);
        } catch (k) {
          u(this, "throw", k);
        }
        return y ? a(y, this, w) : new v(s(this), {
          mapper: w
        });
      }
    });
  },
  3579(e, t, n) {
    var r = n(6518),
      a = n(9565),
      i = n(2652),
      o = n(9306),
      s = n(8551),
      l = n(1767),
      d = n(9539),
      u = n(4549),
      h = u("some", TypeError);
    r({
      target: "Iterator",
      proto: !0,
      real: !0,
      forced: h
    }, {
      some: function (m) {
        s(this);
        try {
          o(m);
        } catch (b) {
          d(this, "throw", b);
        }
        if (h) return a(h, this, m);
        var f = l(this),
          y = 0;
        return i(f, function (b, v) {
          if (m(b, y++)) return v();
        }, {
          IS_RECORD: !0,
          INTERRUPTED: !0
        }).stopped;
      }
    });
  },
  9112(e, t, n) {
    var r = n(6518),
      a = n(3724),
      i = n(4576),
      o = n(7751),
      s = n(9504),
      l = n(9565),
      d = n(4901),
      u = n(34),
      h = n(4376),
      p = n(9297),
      m = n(655),
      f = n(6198),
      y = n(4659),
      b = n(9039),
      v = n(8235),
      _ = n(4495),
      w = i.JSON,
      k = i.Number,
      A = i.SyntaxError,
      S = w && w.parse,
      C = o("Object", "keys"),
      I = Object.getOwnPropertyDescriptor,
      E = s("".charAt),
      M = s("".slice),
      T = s(/./.exec),
      P = s([].push),
      R = /^\d$/,
      j = /^[1-9]$/,
      B = /^[\d-]$/,
      F = /^[\t\n\r ]$/,
      N = 0,
      G = 1,
      z = function (Y, K) {
        Y = m(Y);
        var W = new D(Y, 0),
          Q = W.parse(),
          q = Q.value,
          ne = W.skip(F, Q.end);
        if (ne < Y.length) throw new A('Unexpected extra character: "' + E(Y, ne) + '" after the parsed data at: ' + ne);
        return d(K) ? V({
          "": q
        }, "", K, Q) : q;
      },
      V = function (Y, K, W, Q) {
        var q = Y[K],
          ne = Q && q === Q.value,
          de = ne && typeof Q.source == "string" ? {
            source: Q.source
          } : {},
          le,
          J,
          pe,
          ce,
          we;
        if (u(q)) {
          var X = h(q),
            Z = ne ? Q.nodes : X ? [] : {};
          if (X) for (le = Z.length, pe = f(q), ce = 0; ce < pe; ce++) O(q, ce, V(q, "" + ce, W, ce < le ? Z[ce] : void 0));else for (J = C(q), pe = f(J), ce = 0; ce < pe; ce++) we = J[ce], O(q, we, V(q, we, W, p(Z, we) ? Z[we] : void 0));
        }
        return l(W, Y, K, q, de);
      },
      O = function (Y, K, W) {
        if (a) {
          var Q = I(Y, K);
          if (Q && !Q.configurable) return;
        }
        W === void 0 ? delete Y[K] : y(Y, K, W);
      },
      L = function (Y, K, W, Q) {
        this.value = Y, this.end = K, this.source = W, this.nodes = Q;
      },
      D = function (Y, K) {
        this.source = Y, this.index = K;
      };
    D.prototype = {
      fork: function (Y) {
        return new D(this.source, Y);
      },
      parse: function () {
        var Y = this.source,
          K = this.skip(F, this.index),
          W = this.fork(K),
          Q = E(Y, K);
        if (T(B, Q)) return W.number();
        switch (Q) {
          case "{":
            return W.object();
          case "[":
            return W.array();
          case '"':
            return W.string();
          case "t":
            return W.keyword(!0);
          case "f":
            return W.keyword(!1);
          case "n":
            return W.keyword(null);
        }
        throw new A('Unexpected character: "' + Q + '" at: ' + K);
      },
      node: function (Y, K, W, Q, q) {
        return new L(K, Q, Y ? null : M(this.source, W, Q), q);
      },
      object: function () {
        for (var Y = this.source, K = this.index + 1, W = !1, Q = {}, q = {}, ne = !1; K < Y.length;) {
          if (K = this.until(['"', "}"], K), E(Y, K) === "}" && !W) {
            K++, ne = !0;
            break;
          }
          var de = this.fork(K).string(),
            le = de.value;
          K = de.end, K = this.until([":"], K) + 1, K = this.skip(F, K), de = this.fork(K).parse(), y(q, le, de), y(Q, le, de.value), K = this.until([",", "}"], de.end);
          var J = E(Y, K);
          if (J === ",") W = !0, K++;else if (J === "}") {
            K++, ne = !0;
            break;
          }
        }
        if (!ne) throw new A("Unterminated object at: " + K);
        return this.node(G, Q, this.index, K, q);
      },
      array: function () {
        for (var Y = this.source, K = this.index + 1, W = !1, Q = [], q = [], ne = !1; K < Y.length;) {
          if (K = this.skip(F, K), E(Y, K) === "]" && !W) {
            K++, ne = !0;
            break;
          }
          var de = this.fork(K).parse();
          if (P(q, de), P(Q, de.value), K = this.until([",", "]"], de.end), E(Y, K) === ",") W = !0, K++;else if (E(Y, K) === "]") {
            K++, ne = !0;
            break;
          }
        }
        if (!ne) throw new A("Unterminated array at: " + K);
        return this.node(G, Q, this.index, K, q);
      },
      string: function () {
        var Y = this.index,
          K = v(this.source, this.index + 1);
        return this.node(N, K.value, Y, K.end);
      },
      number: function () {
        var Y = this.source,
          K = this.index,
          W = K;
        if (E(Y, W) === "-" && W++, E(Y, W) === "0") W++;else if (T(j, E(Y, W))) W = this.skip(R, W + 1);else throw new A("Failed to parse number at: " + W);
        if (E(Y, W) === ".") {
          var Q = W + 1;
          if (W = this.skip(R, Q), Q === W) throw new A("Failed to parse number's fraction at: " + W);
        }
        if (E(Y, W) === "e" || E(Y, W) === "E") {
          W++, (E(Y, W) === "+" || E(Y, W) === "-") && W++;
          var q = W;
          if (W = this.skip(R, W), q === W) throw new A("Failed to parse number's exponent value at: " + W);
        }
        return this.node(N, k(M(Y, K, W)), K, W);
      },
      keyword: function (Y) {
        var K = "" + Y,
          W = this.index,
          Q = W + K.length;
        if (M(this.source, W, Q) !== K) throw new A("Failed to parse value at: " + W);
        return this.node(N, Y, W, Q);
      },
      skip: function (Y, K) {
        for (var W = this.source; K < W.length && T(Y, E(W, K)); K++);
        return K;
      },
      until: function (Y, K) {
        K = this.skip(F, K);
        for (var W = E(this.source, K), Q = 0; Q < Y.length; Q++) if (Y[Q] === W) return K;
        throw new A('Unexpected character: "' + W + '" at: ' + K);
      }
    };
    var U = b(function () {
        var Y = "9007199254740993",
          K;
        return S(Y, function (W, Q, q) {
          K = q.source;
        }), K !== Y;
      }),
      H = _ && !b(function () {
        return 1 / S("-0 	") !== -1 / 0;
      });
    r({
      target: "JSON",
      stat: !0,
      forced: U
    }, {
      parse: function (K, W) {
        return H && !d(W) ? S(K) : z(K, W);
      }
    });
  },
  3110(e, t, n) {
    var r = n(6518),
      a = n(7751),
      i = n(9565),
      o = n(9504),
      s = n(9039),
      l = n(4376),
      d = n(4901),
      u = n(34),
      h = n(2360),
      p = n(5810),
      m = n(757),
      f = n(2195),
      y = n(1240),
      b = n(9617).includes,
      v = n(9297),
      _ = n(655),
      w = n(8235),
      k = n(3392),
      A = n(4495),
      S = n(7819),
      C = String,
      I = TypeError,
      E = a("JSON", "stringify"),
      M = a("BigInt"),
      T = o("".valueOf),
      P = o((!0).valueOf),
      R = M && o(M.prototype.valueOf),
      j = o(/./.exec),
      B = o("".charAt),
      F = o("".charCodeAt),
      N = o("".replace),
      G = o("".slice),
      z = o([].push),
      V = o([].pop),
      O = o(1.1.toString),
      L = /[\uD800-\uDFFF]/g,
      D = /^[\uD800-\uDBFF]$/,
      U = /^[\uDC00-\uDFFF]$/,
      H = /^\d+$/,
      Y = k(),
      K = k(),
      W = k(),
      Q = Y.length,
      q = K.length,
      ne = !A || s(function () {
        var ie = a("Symbol")("stringify detection");
        return E([ie]) !== "[null]" || E({
          a: ie
        }) !== "{}" || E(Object(ie)) !== "{}";
      }),
      de = s(function () {
        return E("\uDF06\uD834") !== '"\\udf06\\ud834"' || E("\uDEAD") !== '"\\udead"';
      }),
      le = S ? a("JSON", "isRawJSON") : p,
      J = ne ? function (ie, ae, be) {
        return E(ie, function (Ee, xe) {
          var he = i(ae, this, Ee, xe);
          if (!m(he)) return he;
        }, be);
      } : E,
      pe = function (ie, ae, be) {
        var Ee = B(be, ae - 1),
          xe = B(be, ae + 1);
        return j(D, ie) && !j(U, xe) || j(U, ie) && !j(D, Ee) ? "\\u" + O(F(ie, 0), 16) : ie;
      },
      ce = function (ie) {
        if (l(ie)) {
          for (var ae = ie.length, be = [], Ee = h(null), xe = 0; xe < ae; xe++) {
            var he = ie[xe],
              ue;
            if (typeof he == "string") ue = he;else if (typeof he == "number" || f(he) === "Number" || f(he) === "String") ue = _(he);else continue;
            v(Ee, ue) || (Ee[ue] = !0, z(be, ue));
          }
          return be;
        }
      },
      we = function (ie, ae) {
        try {
          return ie(ae), !0;
        } catch {
          return !1;
        }
      },
      X = function (ie) {
        var ae = f(ie);
        return ae === "Number" && we(y, ie) || ae === "String" && we(T, ie) || ae === "Boolean" && we(P, ie) || !!R && ae === "BigInt" && we(R, ie);
      },
      Z = function (ie) {
        if (!u(ie) || d(ie) || l(ie)) return !1;
        try {
          return !X(ie);
        } catch {
          return !0;
        }
      },
      re = function (ie, ae) {
        return {
          toJSON: function () {
            var be = ie[ae];
            if (u(be) || typeof be == "bigint") {
              var Ee = be.toJSON;
              d(Ee) && (be = i(Ee, be, ae));
            }
            return be;
          }
        };
      },
      fe = function (ie) {
        for (var ae = 0, be = ie.length; ae < be; ae++) if (j(H, ie[ae])) return K;
        return "";
      },
      ye = function (ie, ae, be) {
        for (var Ee = h(null), xe = 0, he = ae.length; xe < he; xe++) {
          var ue = ae[xe];
          Ee[be + ue] = re(ie, ue);
        }
        return Ee[W] = null, Ee;
      };
    E && r({
      target: "JSON",
      stat: !0,
      arity: 3,
      forced: ne || de || !S
    }, {
      stringify: function (ae, be, Ee) {
        var xe = d(be) ? be : void 0,
          he = xe ? void 0 : ce(be),
          ue = he && fe(he),
          ge = [],
          _e = [],
          ke = [],
          ve,
          Te = !1,
          Ne = !0,
          me = J(ae, function (nt, ze) {
            if (nt = C(nt), he) {
              if (nt === W) {
                V(_e), ve = V(ke);
                return;
              }
              if (Ne) Ne = !1;else if (this !== ve && !l(this) && !b(he, nt)) return;
            } else xe && (ze = i(xe, this, nt, ze));
            if (le(ze)) return S ? ze : (Te = !0, Y + (z(ge, ze.rawJSON) - 1));
            if (he && Z(ze)) {
              if (b(_e, ze)) throw new I("Converting circular structure to JSON");
              var Le = ye(ze, he, ue);
              return z(_e, ze), z(ke, ve), ve = Le, ue && (Te = !0), Le;
            }
            return ze;
          }, Ee);
        if (typeof me != "string" || (de && (me = N(me, L, pe)), !Te)) return me;
        for (var Ae = "", Fe = me.length, Me = 0; Me < Fe; Me++) {
          var Re = B(me, Me);
          if (Re === '"') {
            var $e = w(me, ++Me).end - 1,
              rt = G(me, Me, $e);
            G(rt, 0, Q) === Y ? Ae += ge[G(rt, Q)] : G(rt, 0, q) === K ? Ae += '"' + G(rt, q) + '"' : Ae += '"' + rt + '"', Me = $e;
          } else Ae += Re;
        }
        return Ae;
      }
    });
  },
  2731(e, t, n) {
    var r = n(6518),
      a = n(9306),
      i = n(2248),
      o = n(6395),
      s = i.get,
      l = i.has,
      d = i.set;
    r({
      target: "Map",
      proto: !0,
      real: !0,
      forced: o
    }, {
      getOrInsertComputed: function (h, p) {
        var m = l(this, h);
        if (a(p), m) return s(this, h);
        h === 0 && 1 / h === -1 / 0 && (h = 0);
        var f = p(h);
        return d(this, h, f), f;
      }
    });
  },
  5367(e, t, n) {
    var r = n(6518),
      a = n(2248),
      i = n(6395),
      o = a.get,
      s = a.has,
      l = a.set;
    r({
      target: "Map",
      proto: !0,
      real: !0,
      forced: i
    }, {
      getOrInsert: function (u, h) {
        return s(this, u) ? o(this, u) : (l(this, u, h), h);
      }
    });
  },
  6069(e, t, n) {
    var r = n(6518),
      a = n(9504),
      i = n(3463),
      o = n(9297),
      s = n(533).start,
      l = n(7452),
      d = Array,
      u = RegExp.escape,
      h = a("".charAt),
      p = a("".charCodeAt),
      m = a(1.1.toString),
      f = a([].join),
      y = /^[0-9a-z]/i,
      b = /^[$()*+./?[\\\]^{|}]/,
      v = RegExp("^[!\"#%&',\\-:;<=>@`~" + l + "]"),
      _ = a(y.exec),
      w = {
        "	": "t",
        "\n": "n",
        "\v": "v",
        "\f": "f",
        "\r": "r"
      },
      k = function (S) {
        var C = m(p(S, 0), 16);
        return C.length < 3 ? "\\x" + s(C, 2, "0") : "\\u" + s(C, 4, "0");
      },
      A = !u || u("ab") !== "\\x61b";
    r({
      target: "RegExp",
      stat: !0,
      forced: A
    }, {
      escape: function (C) {
        i(C);
        for (var I = C.length, E = d(I), M = 0; M < I; M++) {
          var T = h(C, M);
          if (M === 0 && _(y, T)) E[M] = k(T);else if (o(w, T)) E[M] = "\\" + w[T];else if (_(b, T)) E[M] = "\\" + T;else if (_(v, T)) E[M] = k(T);else {
            var P = p(T, 0);
            (P & 63488) !== 55296 ? E[M] = T : P >= 56320 || M + 1 >= I || (p(C, M + 1) & 64512) !== 56320 ? E[M] = k(T) : (E[M] = T, E[++M] = h(C, M));
          }
        }
        return f(E, "");
      }
    });
  },
  7642(e, t, n) {
    var r = n(6518),
      a = n(3440),
      i = n(9039),
      o = n(4916),
      s = !o("difference", function (d) {
        return d.size === 0;
      }),
      l = s || i(function () {
        var d = {
            size: 1,
            has: function () {
              return !0;
            },
            keys: function () {
              var h = 0;
              return {
                next: function () {
                  var p = h++ > 1;
                  return u.has(1) && u.clear(), {
                    done: p,
                    value: 2
                  };
                }
              };
            }
          },
          u = new Set([1, 2, 3, 4]);
        return u.difference(d).size !== 3;
      });
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: l
    }, {
      difference: a
    });
  },
  8004(e, t, n) {
    var r = n(6518),
      a = n(9039),
      i = n(8750),
      o = n(4916),
      s = !o("intersection", function (l) {
        return l.size === 2 && l.has(1) && l.has(2);
      }) || a(function () {
        return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== "3,2";
      });
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: s
    }, {
      intersection: i
    });
  },
  3853(e, t, n) {
    var r = n(6518),
      a = n(4449),
      i = n(4916),
      o = !i("isDisjointFrom", function (s) {
        return !s;
      });
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: o
    }, {
      isDisjointFrom: a
    });
  },
  5876(e, t, n) {
    var r = n(6518),
      a = n(3838),
      i = n(4916),
      o = !i("isSubsetOf", function (s) {
        return s;
      });
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: o
    }, {
      isSubsetOf: a
    });
  },
  2475(e, t, n) {
    var r = n(6518),
      a = n(8527),
      i = n(4916),
      o = !i("isSupersetOf", function (s) {
        return !s;
      });
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: o
    }, {
      isSupersetOf: a
    });
  },
  5024(e, t, n) {
    var r = n(6518),
      a = n(3650),
      i = n(9835),
      o = n(4916),
      s = !o("symmetricDifference") || !i("symmetricDifference");
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: s
    }, {
      symmetricDifference: a
    });
  },
  1698(e, t, n) {
    var r = n(6518),
      a = n(4204),
      i = n(9835),
      o = n(4916),
      s = !o("union") || !i("union");
    r({
      target: "Set",
      proto: !0,
      real: !0,
      forced: s
    }, {
      union: a
    });
  },
  9577(e, t, n) {
    var r = n(4644),
      a = n(1108),
      i = n(6198),
      o = n(1291),
      s = n(5854),
      l = r.aTypedArray,
      d = r.getTypedArrayConstructor,
      u = r.exportTypedArrayMethod,
      h = RangeError,
      p = (function () {
        try {
          new Int8Array(1).with(2, {
            valueOf: function () {
              throw 8;
            }
          });
        } catch (f) {
          return f === 8;
        }
      })(),
      m = p && (function () {
        try {
          new Int8Array(1).with(-.5, 1);
        } catch {
          return !0;
        }
      })();
    u("with", function (f, y) {
      var b = l(this),
        v = i(b),
        _ = o(f),
        w = _ < 0 ? v + _ : _,
        k = a(b) ? s(y) : +y;
      if (w >= v || w < 0) throw new h("Incorrect index");
      for (var A = new (d(b))(v), S = 0; S < v; S++) A[S] = S === w ? k : b[S];
      return A;
    }, !p || m);
  },
  9452(e, t, n) {
    var r = n(6518),
      a = n(9306),
      i = n(6557),
      o = n(4328),
      s = n(4995),
      l = n(6395),
      d = s.get,
      u = s.has,
      h = s.set,
      p = l || !(function () {
        try {
          WeakMap.prototype.getOrInsertComputed && new WeakMap().getOrInsertComputed(1, function () {
            throw 1;
          });
        } catch (m) {
          return m instanceof TypeError;
        }
      })();
    r({
      target: "WeakMap",
      proto: !0,
      real: !0,
      forced: p
    }, {
      getOrInsertComputed: function (f, y) {
        if (l || i(this), o(f), a(y), u(this, f)) return d(this, f);
        var b = y(f);
        return h(this, f, b), b;
      }
    });
  },
  8454(e, t, n) {
    var r = n(6518),
      a = n(4995),
      i = n(6395),
      o = a.get,
      s = a.has,
      l = a.set;
    r({
      target: "WeakMap",
      proto: !0,
      real: !0,
      forced: i
    }, {
      getOrInsert: function (u, h) {
        return s(this, u) ? o(this, u) : (l(this, u, h), h);
      }
    });
  },
  5781(e, t, n) {
    var r = n(6518),
      a = n(7751),
      i = n(2812),
      o = n(655),
      s = n(7416),
      l = a("URL");
    r({
      target: "URL",
      stat: !0,
      forced: !s
    }, {
      parse: function (u) {
        var h = i(arguments.length, 1),
          p = o(u),
          m = h < 2 || arguments[1] === void 0 ? void 0 : o(arguments[1]);
        try {
          return new l(p, m);
        } catch {
          return null;
        }
      }
    });
  }
};

const upn = {};

function oh(e) {
  const t = upn[e];
  if (t !== void 0) return t.exports;
  const n = upn[e] = {
    exports: {}
  };
  return lHi[e].call(n.exports, n, n.exports, oh), n.exports;
}

oh.d = (e, t) => {
  if (Array.isArray(t)) for (var n = 0; n < t.length;) {
    var r = t[n++],
      a = t[n++];
    oh.o(e, r) ? a === 0 && n++ : a === 0 ? Object.defineProperty(e, r, {
      enumerable: !0,
      value: t[n++]
    }) : Object.defineProperty(e, r, {
      enumerable: !0,
      get: a
    });
  } else for (var r in t) oh.o(t, r) && !oh.o(e, r) && Object.defineProperty(e, r, {
    enumerable: !0,
    get: t[r]
  });
};

oh.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);

oh(4114);

oh(8111);

oh(2489);

oh(7588);

oh(1701);

oh(3110);

oh(5367);

oh(2731);

oh(6069);

oh(7642);

oh(8004);

oh(3853);

oh(5876);

oh(2475);

oh(5024);

oh(1698);

oh(9577);

const {
  AbortException: cHi,
  AnnotationEditorLayer: dHi,
  AnnotationEditorParamsType: d7o,
  AnnotationEditorType: $_,
  AnnotationEditorUIManager: uHi,
  AnnotationLayer: hHi,
  AnnotationMode: aM,
  AnnotationType: Umr,
  applyOpacity: u7o,
  build: h7o,
  ColorPicker: p7o,
  createValidAbsoluteUrl: $mr,
  CSSConstants: m7o,
  DOMSVGFactory: f7o,
  DrawLayer: pHi,
  FeatureTest: zzt,
  fetchData: hpn,
  findContrastColor: g7o,
  getDocument: y7o,
  getFilenameFromUrl: b7o,
  getPdfFilenameFromUrl: mHi,
  getRGB: v7o,
  getRGBA: w7o,
  getUuid: fHi,
  GlobalWorkerOptions: x7o,
  ImageKind: _7o,
  InvalidPDFException: k7o,
  isDataScheme: A7o,
  isPdfFile: gHi,
  isValidExplicitDest: yHi,
  makeArr: bHi,
  makeMap: ppn,
  makeObj: S7o,
  makeSet: vHi,
  MathClamp: wHi,
  noContextMenu: I7o,
  normalizeUnicode: xHi,
  OPS: C7o,
  OutputScale: Kje,
  PasswordException: _Hi,
  PasswordResponses: E7o,
  PDFDataRangeTransport: T7o,
  PDFDateString: M7o,
  PDFWorker: P7o,
  PermissionFlag: Nte,
  PixelsPerInch: zR,
  RenderingCancelledException: SAt,
  renderRichText: R7o,
  ResponseException: N7o,
  setLayerDimensions: Gmr,
  shadow: uAe,
  SignatureExtractor: j7o,
  stopEvent: IAt,
  SupportedImageMimeTypes: D7o,
  TextLayer: kHi,
  TextLayerImages: AHi,
  TouchManager: L7o,
  updateUrlHash: SHi,
  Util: Uzt,
  VerbosityLevel: O7o,
  version: mpn,
  XfaLayer: fpn
} = globalThis.pdfjsLib;

let gpn = null,
  ypn = null;

function bpn(e, t) {
  ypn || (ypn = new Intl.Segmenter(void 0, {
    granularity: "grapheme"
  }));
  const n = ypn.segment(e),
    r = n.containing(t);
  if (r.index !== t) return !1;
  gpn || (gpn = new Intl.Segmenter(void 0, {
    granularity: "word"
  }));
  const a = n.containing(t - 1).segment;
  return gpn.segment(a + r.segment).containing(a.length).index === a.length;
}

function IHi(e, t, n) {
  const r = t + n;
  return (t === 0 || bpn(e, t)) && (r === e.length || bpn(e, r));
}

let iV;

function CHi() {
  if (!iV) {
    const e = [],
      t = [],
      n = new RegExp("^\\p{M}$", "u");
    for (let a = 0; a < 65536; a++) {
      if (a >= 55296 && a <= 57343) continue;
      const i = String.fromCharCode(a);
      if (i.normalize("NFKC") !== i && !n.test(i)) {
        if (t.length !== 2) {
          t[0] = t[1] = a;
          continue;
        }
        t[1] + 1 !== a ? (t[0] === t[1] ? e.push(String.fromCharCode(t[0])) : e.push(`${String.fromCharCode(t[0])}-${String.fromCharCode(t[1])}`), t[0] = t[1] = a) : t[1] = a;
      }
    }
    const r = e.join("");
    if (!iV) iV = r;else if (r !== iV) {
      for (let a = 1; a < r.length; a++) if (r[a] !== iV[a]) {
        console.log(`Difference at index ${a}: U+${r.charCodeAt(a).toString(16).toUpperCase().padStart(4, "0")}!== U+${iV.charCodeAt(a).toString(16).toUpperCase().padStart(4, "0")}`);
        break;
      }
      throw new Error("getNormalizeWithNFKC - update the `NormalizeWithNFKC` string.");
    }
  }
  return iV;
}

oh(4423);

const moe = {
    UNKNOWN: 0,
    NORMAL: 1,
    CHANGING: 2,
    FULLSCREEN: 3
  },
  R6 = {
    DISABLE: 0,
    ENABLE: 1,
    ENABLE_PERMISSIONS: 2
  },
  kd = {
    UNKNOWN: -1,
    VERTICAL: 0,
    HORIZONTAL: 1,
    WRAPPED: 2,
    PAGE: 3
  },
  C1 = {
    UNKNOWN: -1,
    NONE: 0,
    ODD: 1,
    EVEN: 2
  };

function EHi(e, t) {
  let n = e.offsetParent;
  if (!n) {
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }
  let r = e.offsetTop + e.clientTop,
    a = e.offsetLeft + e.clientLeft;
  for (; n.clientHeight === n.scrollHeight && n.clientWidth === n.scrollWidth;) if (r += n.offsetTop, a += n.offsetLeft, n = n.offsetParent, !n) return;
  t && (t.top !== void 0 && (r += t.top), t.left !== void 0 && (a += t.left, n.scrollLeft = a)), n.scrollTop = r;
}

function THi(e, t, n = void 0) {
  function r() {
    i = null;
    const o = e.scrollLeft,
      s = a.lastX;
    o !== s && (a.right = o > s), a.lastX = o;
    const l = e.scrollTop,
      d = a.lastY;
    l !== d && (a.down = l > d), a.lastY = l, t(a);
  }
  const a = {
    right: !0,
    down: !0,
    lastX: e.scrollLeft,
    lastY: e.scrollTop
  };
  let i = null;
  return e.addEventListener("scroll", () => {
    i ?? (i = window.requestAnimationFrame(r));
  }, {
    useCapture: !0,
    signal: n
  }), n == null || n.addEventListener("abort", () => window.cancelAnimationFrame(i), {
    once: !0
  }), a;
}

function tEe(e) {
  const t = new Map();
  for (const [n, r] of new URLSearchParams(e)) t.set(n.toLowerCase(), r);
  return t;
}

const vpn = /[\x00-\x1F]/g;

function SH(e, t = !1) {
  return vpn.test(e) ? t ? e.replaceAll(vpn, n => n === "\0" ? "" : " ") : e.replaceAll("\0", "") : e;
}

function hAe(e, t, n = 0) {
  let r = n,
    a = e.length - 1;
  if (a < 0 || !t(e[a])) return e.length;
  if (t(e[r])) return r;
  for (; r < a;) {
    const i = r + a >> 1,
      o = e[i];
    t(o) ? a = i : r = i + 1;
  }
  return r;
}

function wpn(e) {
  if (Math.floor(e) === e) return [e, 1];
  const t = 1 / e,
    n = 8;
  if (t > n) return [1, n];
  if (Math.floor(t) === t) return [1, t];
  const r = e > 1 ? t : e;
  let a = 0,
    i = 1,
    o = 1,
    s = 1;
  for (;;) {
    const l = a + o,
      d = i + s;
    if (d > n) break;
    r <= l / d ? (o = l, s = d) : (a = l, i = d);
  }
  return r - a / i < o / s - r ? r === e ? [a, i] : [i, a] : r === e ? [o, s] : [s, o];
}

function JMe(e, t) {
  return e - e % t;
}

function MHi(e, t, n) {
  if (e < 2) return e;
  let r = t[e].div,
    a = r.offsetTop + r.clientTop;
  a >= n && (r = t[e - 1].div, a = r.offsetTop + r.clientTop);
  for (let i = e - 2; i >= 0 && (r = t[i].div, !(r.offsetTop + r.clientTop + r.clientHeight <= a)); --i) e = i;
  return e;
}

function PHi(e, t) {
  const n = e.percent - t.percent;
  return Math.abs(n) > .001 ? -n : e.id - t.id;
}

function RHi({
  scrollEl: e,
  views: t,
  sortByVisibility: n = !1,
  horizontal: r = !1,
  rtl: a = !1
}) {
  const i = e.scrollTop,
    o = i + e.clientHeight,
    s = e.scrollLeft,
    l = s + e.clientWidth;
  function d(_) {
    const w = _.div;
    return w.offsetTop + w.clientTop + w.clientHeight > i;
  }
  function u(_) {
    const w = _.div,
      k = w.offsetLeft + w.clientLeft,
      A = k + w.clientWidth;
    return a ? k < l : A > s;
  }
  const h = [],
    p = new Set(),
    m = t.length;
  let f = hAe(t, r ? u : d);
  f > 0 && f < m && !r && (f = MHi(f, t, i));
  let y = r ? l : -1;
  for (let _ = f; _ < m; _++) {
    const w = t[_],
      k = w.div,
      A = k.offsetLeft + k.clientLeft,
      S = k.offsetTop + k.clientTop,
      C = k.clientWidth,
      I = k.clientHeight,
      E = A + C,
      M = S + I;
    if (y === -1) M >= o && (y = M);else if ((r ? A : S) > y) break;
    if (M <= i || S >= o || E <= s || A >= l) continue;
    const T = Math.max(0, i - S),
      P = Math.max(0, s - A),
      R = T + Math.max(0, M - o),
      j = P + Math.max(0, E - l),
      B = (I - R) / I,
      F = (C - j) / C,
      N = B * F * 100 | 0;
    h.push({
      id: w.id,
      x: A,
      y: S,
      visibleArea: N === 100 ? null : {
        minX: P,
        minY: T,
        maxX: Math.min(E, l) - A,
        maxY: Math.min(M, o) - S
      },
      view: w,
      percent: N,
      widthPercent: F * 100 | 0
    }), p.add(w.id);
  }
  const b = h[0],
    v = h.at(-1);
  return n && h.sort(PHi), {
    first: b,
    last: v,
    views: h,
    ids: p
  };
}

function Vmr(e) {
  return Number.isInteger(e) && e % 90 === 0;
}

function NHi(e) {
  return Number.isInteger(e) && Object.values(kd).includes(e) && e !== kd.UNKNOWN;
}

function jHi(e) {
  return Number.isInteger(e) && Object.values(C1).includes(e) && e !== C1.UNKNOWN;
}

function xpn(e) {
  return e.width <= e.height;
}

new Promise(function (e) {
  window.requestAnimationFrame(e);
});

const DHi = document.documentElement.style;

var nF, yK, rF, Zse, bK;

class Hmr {
  constructor(t) {
    qt(this, nF, null);
    qt(this, yK, null);
    qt(this, rF, 0);
    qt(this, Zse, null);
    qt(this, bK, !0);
    yt(this, nF, t.classList), yt(this, Zse, t.style);
  }
  get percent() {
    return te(this, rF);
  }
  set percent(t) {
    if (yt(this, rF, t), isNaN(t)) {
      te(this, nF).add("indeterminate");
      return;
    }
    te(this, nF).remove("indeterminate"), te(this, Zse).setProperty("--progressBar-percent", `${te(this, rF)}%`);
  }
  setWidth(t) {
    if (!t) return;
    const r = t.parentNode.offsetWidth - t.offsetWidth;
    r > 0 && te(this, Zse).setProperty("--progressBar-end-offset", `${r}px`);
  }
  setDisableAutoFetch(t = 5e3) {
    te(this, rF) === 100 || isNaN(te(this, rF)) || (te(this, yK) && clearTimeout(te(this, yK)), this.show(), yt(this, yK, setTimeout(() => {
      yt(this, yK, null), this.hide();
    }, t)));
  }
  hide() {
    te(this, bK) && (yt(this, bK, !1), te(this, nF).add("hidden"));
  }
  show() {
    te(this, bK) || (yt(this, bK, !0), te(this, nF).remove("hidden"));
  }
}

nF = new WeakMap(), yK = new WeakMap(), rF = new WeakMap(), Zse = new WeakMap(), bK = new WeakMap();

function LHi(e) {
  let t = kd.VERTICAL,
    n = C1.NONE;
  switch (e) {
    case "SinglePage":
      t = kd.PAGE;
      break;
    case "OneColumn":
      break;
    case "TwoPageLeft":
      t = kd.PAGE;
    case "TwoColumnLeft":
      n = C1.ODD;
      break;
    case "TwoPageRight":
      t = kd.PAGE;
    case "TwoColumnRight":
      n = C1.EVEN;
      break;
  }
  return {
    scrollMode: t,
    spreadMode: n
  };
}

const ZMe = (function () {
    const e = document.createElement("div");
    return e.style.width = "round(down, calc(1.6666666666666665 * 792px), 1px)", e.style.width === "calc(1320px)" ? Math.fround : t => t;
  })(),
  Wmr = "59968104-cc61-4cf9-b570-014b35b3709c",
  G2 = Object.freeze({
    internal: Wmr
  }),
  ER = {
    FOUND: 0,
    NOT_FOUND: 1,
    WRAPPED: 2,
    PENDING: 3
  },
  _pn = new Map([["‐", "-"], ["‘", "'"], ["’", "'"], ["‚", "'"], ["‛", "'"], ["“", '"'], ["”", '"'], ["„", '"'], ["‟", '"'], ["¼", "1/4"], ["½", "1/2"], ["¾", "3/4"]]),
  kpn = new Set([12441, 12442, 2381, 2509, 2637, 2765, 2893, 3021, 3149, 3277, 3387, 3388, 3405, 3530, 3642, 3770, 3972, 4153, 4154, 5908, 5940, 6098, 6752, 6980, 7082, 7083, 7154, 7155, 11647, 43014, 43052, 43204, 43347, 43456, 43766, 44013, 3158, 3953, 3954, 3962, 3963, 3964, 3965, 3968, 3956]);

let Apn;

const OHi = new RegExp("\\p{M}+", "gu"),
  BHi = new RegExp("([+^$|])|(\\p{P}+)|(\\s+)|(\\p{M})|(\\p{L})", "gu"),
  FHi = /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g,
  Spn = new Map(),
  zHi = "[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]",
  UHi = new Map();

let Tlt = null,
  Mlt = null;

function Qje(e, t = {}) {
  const n = [];
  let r;
  for (; (r = FHi.exec(e)) !== null;) {
    let {
      index: _
    } = r;
    for (const w of r[0]) {
      let k = Spn.get(w);
      k || (k = w.normalize("NFD").length, Spn.set(w, k)), n.push([k, _++]);
    }
  }
  const a = n.length > 0,
    i = t.ignoreDashEOL ?? !1;
  let o;
  if (!a && Tlt) o = Tlt;else if (a && Mlt) o = Mlt;else {
    const _ = _pn.keys().join(""),
      w = CHi(),
      C = [`[${_}]`, `[${w}]`, "(?:゙|゚)\\n", "\\p{M}+(?:-\\n)?", "\\p{Ll}-\\n(?=\\p{Ll})|\\p{Lu}-\\n(?=\\p{L})", "\\S-\\n", "(?:\\p{Ideographic}|[぀-ヿ])\\n", "\\n", a ? zHi : "\\u0000"];
    o = new RegExp(C.map(I => `(${I})`).join("|"), "gmu"), a ? Mlt = o : Tlt = o;
  }
  const s = [];
  for (; (r = OHi.exec(e)) !== null;) s.push([r[0].length, r.index]);
  let l = e.normalize("NFD");
  const d = [0, 0];
  let u = 0,
    h = 0,
    p = 0,
    m = 0,
    f = 0,
    y = !1;
  l = l.replace(o, (_, w, k, A, S, C, I, E, M, T, P) => {
    var R, j, B;
    if (P -= m, w) {
      const F = _pn.get(w),
        N = F.length;
      for (let G = 1; G < N; G++) d.push(P - p + G, p - G);
      return p -= N - 1, F;
    }
    if (k) {
      const F = UHi.getOrInsertComputed(k, () => k.normalize("NFKC")),
        N = F.length;
      for (let G = 1; G < N; G++) d.push(P - p + G, p - G);
      return p -= N - 1, F;
    }
    if (A) return y = !0, P + f === ((R = s[u]) == null ? void 0 : R[1]) ? ++u : (d.push(P - 1 - p + 1, p - 1), p -= 1, m += 1), d.push(P - p + 1, p), m += 1, f += 1, A.charAt(0);
    if (S) {
      const F = S.endsWith(`
`),
        N = F ? S.length - 2 : S.length;
      y = !0;
      let G = N;
      P + f === ((j = s[u]) == null ? void 0 : j[1]) && (G -= s[u][0], ++u);
      for (let z = 1; z <= G; z++) d.push(P - 1 - p + z, p - z);
      return p -= G, m += G, F ? (P += N - 1, d.push(P - p + 1, 1 + p), p += 1, m += 1, f += 1, S.slice(0, N)) : S;
    }
    if (C) {
      if (i) return m += 1, f += 1, C.slice(0, -1);
      const F = C.length - 2;
      return d.push(P - p + F, 1 + p), p += 1, m += 1, f += 1, C.slice(0, -2);
    }
    if (I) return m += 1, f += 1, I.slice(0, -1);
    if (E) {
      const F = E.length - 1;
      return d.push(P - p + F, p), m += 1, f += 1, E.slice(0, -1);
    }
    if (M) return d.push(P - p + 1, p - 1), p -= 1, m += 1, f += 1, " ";
    if (P + f === ((B = n[h]) == null ? void 0 : B[1])) {
      const F = n[h][0] - 1;
      ++h;
      for (let N = 1; N <= F; N++) d.push(P - (p - N), p - N);
      p -= F, m += F;
    }
    return T;
  }), d.push(l.length, p);
  const b = new Uint32Array(d.length >> 1),
    v = new Int32Array(d.length >> 1);
  for (let _ = 0, w = d.length; _ < w; _ += 2) b[_ >> 1] = d[_], v[_ >> 1] = d[_ + 1];
  return [l, [b, v], y];
}

function qmr(e, t, n) {
  if (!e) return [t, n];
  const [r, a] = e,
    i = t,
    o = t + n - 1;
  let s = hAe(r, p => p >= i);
  r[s] > i && --s;
  let l = hAe(r, p => p >= o, s);
  r[l] > o && --l;
  const d = i + a[s],
    h = o + a[l] + 1 - d;
  return [d, h];
}

var ty, ele, $3e, vK, v6, SN, bs, Qmr, CAt, EAt, Ymr, TAt, Xmr, Jmr, Yje, $ye, ZV, Zmr, MAt, PAt, Xje, efr, tfr, RAt, NAt, Gye;

class Kmr {
  constructor({
    linkService: t,
    eventBus: n,
    delay: r = 250,
    updateMatchesCountOnProgress: a = !0
  }) {
    qt(this, bs);
    qt(this, ty, null);
    qt(this, ele, !0);
    qt(this, $3e, 0);
    qt(this, vK, 0);
    qt(this, v6, null);
    qt(this, SN, null);
    this._linkService = t, this._eventBus = n, yt(this, ele, a), yt(this, $3e, r), this.onIsPageVisible = null, Gt(this, bs, CAt).call(this), n.on("find", Gt(this, bs, Qmr).bind(this), G2), n.on("findbarclose", Gt(this, bs, tfr).bind(this), G2), n.on("pagesedited", Gt(this, bs, efr).bind(this), G2);
  }
  get highlightMatches() {
    return this._highlightMatches;
  }
  get pageMatches() {
    return this._pageMatches;
  }
  get pageMatchesLength() {
    return this._pageMatchesLength;
  }
  get selected() {
    return this._selected;
  }
  get state() {
    return te(this, ty);
  }
  setDocument(t) {
    this._pdfDocument && Gt(this, bs, CAt).call(this), t && (this._pdfDocument = t, this._firstPageCapability.resolve());
  }
  scrollMatchIntoView({
    element: t = null,
    pageIndex: n = -1,
    matchIndex: r = -1
  }) {
    if (!(!this._scrollMatches || !t)) {
      {
        if (r === -1 || r !== this._selected.matchIdx) return;
        if (n === -1 || n !== this._selected.pageIdx) return;
      }
      this._scrollMatches = !1, t.scrollIntoView({
        block: "start",
        inline: "center"
      });
    }
  }
  match(t, n, r) {
    const a = this._hasDiacritics[r];
    let i = !1;
    if (typeof t == "string" ? [i, t] = Gt(this, bs, TAt).call(this, t, a) : t = t.sort().reverse().map(h => {
      const [p, m] = Gt(this, bs, TAt).call(this, h, a);
      return i || (i = p), `(${m})`;
    }).join("|"), !t) return;
    const {
        caseSensitive: o,
        entireWord: s
      } = te(this, ty),
      l = `g${i ? "u" : ""}${o ? "" : "i"}`;
    t = new RegExp(t, l);
    const d = [];
    let u;
    for (; (u = t.exec(n)) !== null;) s && !IHi(n, u.index, u[0].length) || d.push({
      index: u.index,
      length: u[0].length
    });
    return d;
  }
}

ty = new WeakMap(), ele = new WeakMap(), $3e = new WeakMap(), vK = new WeakMap(), v6 = new WeakMap(), SN = new WeakMap(), bs = new WeakSet(), Qmr = function (t) {
  if (!t) return;
  const n = this._pdfDocument,
    {
      type: r
    } = t;
  (te(this, ty) === null || Gt(this, bs, Ymr).call(this, t)) && (this._dirtyMatch = !0), yt(this, ty, t), r !== "highlightallchange" && Gt(this, bs, Gye).call(this, ER.PENDING), this._firstPageCapability.promise.then(() => {
    if (!this._pdfDocument || n && this._pdfDocument !== n) return;
    Gt(this, bs, Jmr).call(this);
    const a = !this._highlightMatches,
      i = !!this._findTimeout;
    this._findTimeout && (clearTimeout(this._findTimeout), this._findTimeout = null), r ? this._dirtyMatch ? Gt(this, bs, ZV).call(this) : r === "again" ? (Gt(this, bs, ZV).call(this), a && te(this, ty).highlightAll && Gt(this, bs, $ye).call(this)) : r === "highlightallchange" ? (i ? Gt(this, bs, ZV).call(this) : this._highlightMatches = !0, Gt(this, bs, $ye).call(this)) : Gt(this, bs, ZV).call(this) : this._findTimeout = setTimeout(() => {
      Gt(this, bs, ZV).call(this), this._findTimeout = null;
    }, te(this, $3e));
  });
}, CAt = function () {
  this._highlightMatches = !1, this._scrollMatches = !1, this._pdfDocument = null, this._pageMatches = [], this._pageMatchesLength = [], yt(this, vK, 0), yt(this, ty, null), this._selected = {
    pageIdx: -1,
    matchIdx: -1
  }, this._offset = {
    pageIdx: null,
    matchIdx: null,
    wrapped: !1
  }, this._extractTextPromises = [], this._pageContents = [], this._pageDiffs = [], this._hasDiacritics = [], this._matchesCountTotal = 0, this._pagesToSearch = null, this._pendingFindMatches = new Set(), this._resumePageIdx = null, this._dirtyMatch = !1, clearTimeout(this._findTimeout), this._findTimeout = null, yt(this, v6, null), this._firstPageCapability = Promise.withResolvers();
}, EAt = function () {
  const {
    query: t
  } = te(this, ty);
  return typeof t == "string" ? (t !== this._rawQuery && (this._rawQuery = t, [this._normalizedQuery] = Qje(t)), this._normalizedQuery) : (t || []).filter(Boolean).map(n => Qje(n)[0]);
}, Ymr = function (t) {
  var o;
  const n = t.query,
    r = te(this, ty).query,
    a = typeof n;
  if (a !== typeof r) return !0;
  if (a === "string") {
    if (n !== r) return !0;
  } else if (JSON.stringify(n) !== JSON.stringify(r)) return !0;
  switch (t.type) {
    case "again":
      const s = this._selected.pageIdx + 1,
        l = this._linkService;
      return s >= 1 && s <= l.pagesCount && s !== l.page && !(((o = this.onIsPageVisible) == null ? void 0 : o.call(this, s)) ?? !0);
    case "highlightallchange":
      return !1;
  }
  return !0;
}, TAt = function (t, n) {
  const {
    matchDiacritics: r
  } = te(this, ty);
  let a = !1;
  const i = (s, l) => s === t ? l : t.startsWith(s) ? `${l}[ ]*` : t.endsWith(s) ? `[ ]*${l}` : `[ ]*${l}[ ]*`;
  t = t.replaceAll(BHi, (s, l, d, u, h, p) => l ? i(l, RegExp.escape(l)) : d ? i(d, RegExp.escape(d)) : u ? "[ ]+" : r ? h || p : h ? kpn.has(h.charCodeAt(0)) ? h : "" : n ? (a = !0, `${p}\\p{M}*`) : p);
  const o = "[ ]*";
  return t.endsWith(o) && (t = t.slice(0, t.length - o.length)), r && n && (Apn || (Apn = String.fromCharCode(...kpn)), a = !0, t = `${t}(?=[${Apn}]|[^\\p{M}]|$)`), [a, t];
}, Xmr = function (t) {
  if (!te(this, ty)) return;
  const n = te(this, bs, EAt);
  if (n.length === 0) return;
  const r = this._pageContents[t],
    a = this.match(n, r, t),
    i = this._pageMatches[t] = [],
    o = this._pageMatchesLength[t] = [],
    s = this._pageDiffs[t];
  a == null || a.forEach(({
    index: d,
    length: u
  }) => {
    const [h, p] = qmr(s, d, u);
    p && (i.push(h), o.push(p));
  }), te(this, ty).highlightAll && Gt(this, bs, Yje).call(this, t), this._resumePageIdx === t && (this._resumePageIdx = null, Gt(this, bs, MAt).call(this));
  const l = i.length;
  this._matchesCountTotal += l, te(this, ele) ? l > 0 && Gt(this, bs, NAt).call(this) : ++rm(this, vK)._ === this._linkService.pagesCount && Gt(this, bs, NAt).call(this);
}, Jmr = function () {
  if (this._extractTextPromises.length > 0) return;
  let t = Promise.resolve();
  const n = {
      disableNormalization: !0
    },
    r = this._pdfDocument;
  for (let a = 0, i = this._linkService.pagesCount; a < i; a++) {
    const {
      promise: o,
      resolve: s
    } = Promise.withResolvers();
    this._extractTextPromises[a] = o, t = t.then(async () => {
      if (r !== this._pdfDocument) {
        s();
        return;
      }
      try {
        const d = await (await r.getPage(a + 1)).getTextContent(n);
        if (r !== this._pdfDocument) {
          s();
          return;
        }
        const u = [];
        for (const h of d.items) u.push(h.str), h.hasEOL && u.push(`
`);
        [this._pageContents[a], this._pageDiffs[a], this._hasDiacritics[a]] = Qje(u.join(""));
      } catch (l) {
        if (r !== this._pdfDocument) {
          s();
          return;
        }
        console.error(`Unable to get text content for page ${a + 1}`, l), [this._pageContents[a], this._pageDiffs[a], this._hasDiacritics[a]] = ["", null, !1];
      }
      s();
    });
  }
}, Yje = function (t) {
  this._scrollMatches && this._selected.pageIdx === t && (this._linkService.page = t + 1), this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: t
  });
}, $ye = function () {
  this._eventBus.dispatch("updatetextlayermatches", {
    source: this,
    pageIndex: -1
  });
}, ZV = function () {
  const t = te(this, ty).findPrevious,
    n = this._linkService.page - 1,
    r = this._linkService.pagesCount;
  if (this._highlightMatches = !0, this._dirtyMatch) {
    this._dirtyMatch = !1, this._selected.pageIdx = this._selected.matchIdx = -1, this._offset.pageIdx = n, this._offset.matchIdx = null, this._offset.wrapped = !1, this._resumePageIdx = null, this._pageMatches.length = 0, this._pageMatchesLength.length = 0, yt(this, vK, 0), this._matchesCountTotal = 0, Gt(this, bs, $ye).call(this);
    for (let o = 0; o < r; o++) this._pendingFindMatches.has(o) || (this._pendingFindMatches.add(o), this._extractTextPromises[o].then(() => {
      this._pendingFindMatches.delete(o), Gt(this, bs, Xmr).call(this, o);
    }));
  }
  if (te(this, bs, EAt).length === 0) {
    Gt(this, bs, Gye).call(this, ER.FOUND);
    return;
  }
  if (this._resumePageIdx) return;
  const i = this._offset;
  if (this._pagesToSearch = r, i.matchIdx !== null) {
    const o = this._pageMatches[i.pageIdx].length;
    if (!t && i.matchIdx + 1 < o || t && i.matchIdx > 0) {
      i.matchIdx = t ? i.matchIdx - 1 : i.matchIdx + 1, Gt(this, bs, Xje).call(this, !0);
      return;
    }
    Gt(this, bs, PAt).call(this, t);
  }
  Gt(this, bs, MAt).call(this);
}, Zmr = function (t) {
  const n = this._offset,
    r = t.length,
    a = te(this, ty).findPrevious;
  return r ? (n.matchIdx = a ? r - 1 : 0, Gt(this, bs, Xje).call(this, !0), !0) : (Gt(this, bs, PAt).call(this, a), n.wrapped && (n.matchIdx = null, this._pagesToSearch < 0) ? (Gt(this, bs, Xje).call(this, !1), !0) : !1);
}, MAt = function () {
  this._resumePageIdx !== null && console.error("There can only be one pending page.");
  let t = null;
  do {
    const n = this._offset.pageIdx;
    if (t = this._pageMatches[n], !t) {
      this._resumePageIdx = n;
      break;
    }
  } while (!Gt(this, bs, Zmr).call(this, t));
}, PAt = function (t) {
  const n = this._offset,
    r = this._linkService.pagesCount;
  n.pageIdx = t ? n.pageIdx - 1 : n.pageIdx + 1, n.matchIdx = null, this._pagesToSearch--, (n.pageIdx >= r || n.pageIdx < 0) && (n.pageIdx = t ? r - 1 : 0, n.wrapped = !0);
}, Xje = function (t = !1) {
  let n = ER.NOT_FOUND;
  const r = this._offset.wrapped;
  if (this._offset.wrapped = !1, t) {
    const a = this._selected.pageIdx;
    this._selected.pageIdx = this._offset.pageIdx, this._selected.matchIdx = this._offset.matchIdx, n = r ? ER.WRAPPED : ER.FOUND, a !== -1 && a !== this._selected.pageIdx && Gt(this, bs, Yje).call(this, a);
  }
  Gt(this, bs, Gye).call(this, n, te(this, ty).findPrevious), this._selected.pageIdx !== -1 && (this._scrollMatches = !0, Gt(this, bs, Yje).call(this, this._selected.pageIdx));
}, efr = function ({
  pagesMapper: t,
  type: n,
  pageNumbers: r
}) {
  var p, m, f, y;
  if (this._extractTextPromises.length === 0) return;
  if (n === "copy") {
    const b = new Map(),
      v = new Map(),
      _ = new Map(),
      w = new Map();
    for (const k of r) b.set(k, this._extractTextPromises[k - 1]), v.set(k, this._pageContents[k - 1]), _.set(k, this._pageDiffs[k - 1]), w.set(k, this._hasDiacritics[k - 1]);
    yt(this, v6, {
      promises: b,
      contents: v,
      diffs: _,
      diacritics: w
    });
    return;
  }
  if (n === "cancelCopy") {
    yt(this, v6, null);
    return;
  }
  if (n === "delete" && yt(this, SN, {
    promises: this._extractTextPromises,
    contents: this._pageContents,
    diffs: this._pageDiffs,
    diacritics: this._hasDiacritics
  }), n === "cancelDelete") {
    this._extractTextPromises = te(this, SN).promises, this._pageContents = te(this, SN).contents, this._pageDiffs = te(this, SN).diffs, this._hasDiacritics = te(this, SN).diacritics;
    return;
  }
  if (n === "cleanSavedData") {
    yt(this, SN, null);
    return;
  }
  this._findTimeout && (clearTimeout(this._findTimeout), this._findTimeout = null), this._resumePageIdx = null, this._dirtyMatch = !0;
  const a = this._extractTextPromises,
    i = this._pageContents,
    o = this._pageDiffs,
    s = this._hasDiacritics,
    l = this._extractTextPromises = [],
    d = this._pageContents = [],
    u = this._pageDiffs = [],
    h = this._hasDiacritics = [];
  for (let b = 1, v = t.pagesNumber; b <= v; b++) {
    const _ = t.getPrevPageNumber(b);
    if (_ < 0) {
      const w = -_;
      l.push(((p = te(this, v6)) == null ? void 0 : p.promises.get(w)) || Promise.resolve()), d.push(((m = te(this, v6)) == null ? void 0 : m.contents.get(w)) ?? ""), u.push(((f = te(this, v6)) == null ? void 0 : f.diffs.get(w)) ?? null), h.push(((y = te(this, v6)) == null ? void 0 : y.diacritics.get(w)) ?? !1);
      continue;
    }
    l.push(a[_ - 1] || Promise.resolve()), d.push(i[_ - 1] ?? ""), u.push(o[_ - 1] ?? null), h.push(s[_ - 1] ?? !1);
  }
  te(this, ty) && Gt(this, bs, ZV).call(this);
}, tfr = function (t) {
  const n = this._pdfDocument;
  this._firstPageCapability.promise.then(() => {
    !this._pdfDocument || n && this._pdfDocument !== n || (this._findTimeout && (clearTimeout(this._findTimeout), this._findTimeout = null), this._resumePageIdx && (this._resumePageIdx = null, this._dirtyMatch = !0), Gt(this, bs, Gye).call(this, ER.FOUND), this._highlightMatches = !1, Gt(this, bs, $ye).call(this));
  });
}, RAt = function () {
  var i;
  const {
    pageIdx: t,
    matchIdx: n
  } = this._selected;
  let r = 0,
    a = this._matchesCountTotal;
  if (n !== -1) {
    for (let o = 0; o < t; o++) r += ((i = this._pageMatches[o]) == null ? void 0 : i.length) || 0;
    r += n + 1;
  }
  return (r < 1 || r > a) && (r = a = 0), {
    current: r,
    total: a
  };
}, NAt = function () {
  this._eventBus.dispatch("updatefindmatchescount", {
    source: this,
    matchesCount: Gt(this, bs, RAt).call(this)
  });
}, Gye = function (t, n = !1) {
  var r, a;
  !te(this, ele) && (te(this, vK) !== this._linkService.pagesCount || t === ER.PENDING) || this._eventBus.dispatch("updatefindcontrolstate", {
    source: this,
    state: t,
    previous: n,
    entireWord: ((r = te(this, ty)) == null ? void 0 : r.entireWord) ?? null,
    matchesCount: Gt(this, bs, RAt).call(this),
    rawQuery: ((a = te(this, ty)) == null ? void 0 : a.query) ?? null
  });
};

oh(9112);

oh(5781);

const $Hi = "noopener noreferrer nofollow",
  TO = {
    NONE: 0,
    SELF: 1,
    BLANK: 2,
    PARENT: 3,
    TOP: 4
  };

class $zt {
  constructor({
    eventBus: t,
    externalLinkTarget: n = null,
    externalLinkRel: r = null,
    ignoreDestinationZoom: a = !1
  } = {}) {
    On(this, "externalLinkEnabled", !0);
    this.eventBus = t, this.externalLinkTarget = n, this.externalLinkRel = r, this._ignoreDestinationZoom = a, this.baseUrl = null, this.pdfDocument = null, this.pdfViewer = null, this.pdfHistory = null;
  }
  setDocument(t, n = null) {
    this.baseUrl = n, this.pdfDocument = t;
  }
  setViewer(t) {
    this.pdfViewer = t;
  }
  setHistory(t) {
    this.pdfHistory = t;
  }
  get pagesCount() {
    var t;
    return ((t = this.pdfDocument) == null ? void 0 : t.pagesMapper.pagesNumber) || 0;
  }
  get page() {
    return this.pdfDocument ? this.pdfViewer.currentPageNumber : 1;
  }
  set page(t) {
    this.pdfDocument && (this.pdfViewer.currentPageNumber = t);
  }
  get rotation() {
    return this.pdfDocument ? this.pdfViewer.pagesRotation : 0;
  }
  set rotation(t) {
    this.pdfDocument && (this.pdfViewer.pagesRotation = t);
  }
  get isInPresentationMode() {
    return this.pdfDocument ? this.pdfViewer.isInPresentationMode : !1;
  }
  async goToDestination(t) {
    if (!this.pdfDocument) return;
    let n, r, a;
    if (typeof t == "string" ? (n = t, r = await this.pdfDocument.getDestination(t)) : (n = null, r = await t), !Array.isArray(r)) {
      console.error(`goToDestination: "${r}" is not a valid destination array, for dest="${t}".`);
      return;
    }
    const [i] = r;
    if (i && typeof i == "object") {
      if (a = this.pdfDocument.cachedPageNumber(i), !a) try {
        a = (await this.pdfDocument.getPageIndex(i)) + 1;
      } catch {
        console.error(`goToDestination: "${i}" is not a valid page reference, for dest="${t}".`);
        return;
      }
    } else Number.isInteger(i) && (a = i + 1);
    if (!a || a < 1 || a > this.pagesCount) {
      console.error(`goToDestination: "${a}" is not a valid page number, for dest="${t}".`);
      return;
    }
    this.pdfHistory && (this.pdfHistory.pushCurrentPosition(), this.pdfHistory.push({
      namedDest: n,
      explicitDest: r,
      pageNumber: a
    })), this.pdfViewer.scrollPageIntoView({
      pageNumber: a,
      destArray: r,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    });
    const o = new AbortController();
    this.eventBus.on("textlayerrendered", s => {
      s.pageNumber === a && (s.source.textLayer.div.focus(), o.abort());
    }, {
      signal: o.signal,
      ...G2
    });
  }
  goToPage(t) {
    if (!this.pdfDocument) return;
    const n = typeof t == "string" && this.pdfViewer.pageLabelToPageNumber(t) || t | 0;
    if (!(Number.isInteger(n) && n > 0 && n <= this.pagesCount)) {
      console.error(`PDFLinkService.goToPage: "${t}" is not a valid page.`);
      return;
    }
    this.pdfHistory && (this.pdfHistory.pushCurrentPosition(), this.pdfHistory.pushPage(n)), this.pdfViewer.scrollPageIntoView({
      pageNumber: n
    });
  }
  goToXY(t, n, r, a = {}) {
    this.pdfViewer.scrollPageIntoView({
      pageNumber: t,
      destArray: [null, {
        name: "XYZ"
      }, n, r],
      ignoreDestinationZoom: !0,
      ...a
    });
  }
  async getAttachmentContent(t) {
    var n;
    try {
      return await ((n = this.pdfDocument) == null ? void 0 : n.getAttachmentContent(t));
    } catch (r) {
      r instanceof _Hi || console.warn(`Unable to load attachment content: ${r}`);
    }
    return null;
  }
  addLinkAttributes(t, n, r = !1) {
    if (!n || typeof n != "string") throw new Error('A valid "url" parameter must provided.');
    const a = r ? TO.BLANK : this.externalLinkTarget,
      i = this.externalLinkRel;
    let o = n;
    const s = URL.parse(n);
    (s != null && s.username || s != null && s.password) && (s.username = s.password = "", o = s.href), this.externalLinkEnabled ? (t.href = n, t.title = o) : (t.href = "", t.title = `Disabled: ${o}`, t.onclick = () => !1);
    let l = "";
    switch (a) {
      case TO.NONE:
        break;
      case TO.SELF:
        l = "_self";
        break;
      case TO.BLANK:
        l = "_blank";
        break;
      case TO.PARENT:
        l = "_parent";
        break;
      case TO.TOP:
        l = "_top";
        break;
    }
    t.target = l, t.rel = typeof i == "string" ? i : $Hi;
  }
  getDestinationHash(t) {
    if (typeof t == "string") {
      if (t.length > 0) return this.getAnchorUrl("#" + escape(t));
    } else if (Array.isArray(t)) {
      const n = JSON.stringify(t);
      if (n.length > 0) return this.getAnchorUrl("#" + escape(n));
    }
    return this.getAnchorUrl("");
  }
  getAnchorUrl(t) {
    return this.baseUrl ? this.baseUrl + t : t;
  }
  setHash(t) {
    if (!this.pdfDocument) return;
    let n, r;
    if (t.includes("=")) {
      const a = tEe(t);
      if (a.has("search")) {
        const i = a.get("search").replaceAll('"', ""),
          o = a.get("phrase") === "true";
        this.eventBus.dispatch("findfromurlhash", {
          source: this,
          query: o ? i : i.match(/\S+/g)
        });
      }
      if (a.has("page") && (n = a.get("page") | 0 || 1), a.has("zoom")) {
        const i = a.get("zoom").split(","),
          o = i[0],
          s = parseFloat(o);
        o.includes("Fit") ? o === "Fit" || o === "FitB" ? r = [null, {
          name: o
        }] : o === "FitH" || o === "FitBH" || o === "FitV" || o === "FitBV" ? r = [null, {
          name: o
        }, i.length > 1 ? i[1] | 0 : null] : o === "FitR" ? i.length !== 5 ? console.error('PDFLinkService.setHash: Not enough parameters for "FitR".') : r = [null, {
          name: o
        }, i[1] | 0, i[2] | 0, i[3] | 0, i[4] | 0] : console.error(`PDFLinkService.setHash: "${o}" is not a valid zoom value.`) : r = [null, {
          name: "XYZ"
        }, i.length > 1 ? i[1] | 0 : null, i.length > 2 ? i[2] | 0 : null, s ? s / 100 : o];
      }
      r ? this.pdfViewer.scrollPageIntoView({
        pageNumber: n || this.page,
        destArray: r,
        allowNegativeOffset: !0
      }) : n && (this.page = n), a.has("pagemode") && this.eventBus.dispatch("pagemode", {
        source: this,
        mode: a.get("pagemode")
      }), a.has("nameddest") && this.goToDestination(a.get("nameddest"));
      return;
    }
    r = unescape(t);
    try {
      r = JSON.parse(r), Array.isArray(r) || (r = r.toString());
    } catch {}
    if (typeof r == "string" || yHi(r)) {
      this.goToDestination(r);
      return;
    }
    console.error(`PDFLinkService.setHash: "${unescape(t)}" is not a valid destination.`);
  }
  executeNamedAction(t) {
    var n, r;
    if (this.pdfDocument) {
      switch (t) {
        case "GoBack":
          (n = this.pdfHistory) == null || n.back();
          break;
        case "GoForward":
          (r = this.pdfHistory) == null || r.forward();
          break;
        case "NextPage":
          this.pdfViewer.nextPage();
          break;
        case "PrevPage":
          this.pdfViewer.previousPage();
          break;
        case "LastPage":
          this.page = this.pagesCount;
          break;
        case "FirstPage":
          this.page = 1;
          break;
      }
      this.eventBus.dispatch("namedaction", {
        source: this,
        action: t
      });
    }
  }
  async executeSetOCGState(t) {
    if (!this.pdfDocument) return;
    const n = this.pdfDocument,
      r = await this.pdfViewer.optionalContentConfigPromise;
    n === this.pdfDocument && (r.setOCGState(t), this.pdfViewer.optionalContentConfigPromise = Promise.resolve(r));
  }
}

class iZe extends $zt {
  setDocument(t, n = null) {}
}

var aF, G3e, V3e, iF, H3e, bD, nfr, jAt, rfr;

class Gzt {
  constructor({
    pdfPage: t,
    linkService: n,
    downloadManager: r,
    annotationStorage: a = null,
    imageResourcesPath: i = "",
    renderForms: o = !0,
    enableComment: s = !1,
    commentManager: l = null,
    enableScripting: d = !1,
    hasJSActionsPromise: u = null,
    fieldObjectsPromise: h = null,
    annotationCanvasMap: p = null,
    accessibilityManager: m = null,
    annotationEditorUIManager: f = null,
    onAppend: y = null
  }) {
    qt(this, bD);
    qt(this, aF, null);
    qt(this, G3e, null);
    qt(this, V3e, null);
    qt(this, iF, null);
    qt(this, H3e, !1);
    this.pdfPage = t, this.linkService = n, this.downloadManager = r, this.imageResourcesPath = i, this.renderForms = o, this.annotationStorage = a, this.enableComment = s, yt(this, G3e, l), this.enableScripting = d, this._hasJSActionsPromise = u || Promise.resolve(!1), this._fieldObjectsPromise = h || Promise.resolve(null), this._annotationCanvasMap = p, this._accessibilityManager = m, this._annotationEditorUIManager = f, yt(this, V3e, y), this.annotationLayer = null, this.div = null, this._cancelled = !1, this._eventBus = n.eventBus;
  }
  async render({
    viewport: t,
    intent: n = "display",
    structTreeLayer: r = null,
    optionalContentConfigPromise: a = null
  }) {
    var u, h;
    if (this.div) {
      const p = await a;
      if (this._cancelled || !this.annotationLayer) return;
      this.annotationLayer.update({
        viewport: t.clone({
          dontFlip: !0
        }),
        optionalContentConfig: p
      });
      return;
    }
    const [i, o, s, l] = await Promise.all([this.pdfPage.getAnnotations({
      intent: n
    }), this._hasJSActionsPromise, this._fieldObjectsPromise, a]);
    if (this._cancelled) return;
    const d = this.div = document.createElement("div");
    if (d.className = "annotationLayer", (u = te(this, V3e)) == null || u.call(this, d), Gt(this, bD, nfr).call(this, t, r), i.length === 0) {
      yt(this, aF, i), Gmr(this.div, t);
      return;
    }
    await this.annotationLayer.render({
      annotations: i,
      imageResourcesPath: this.imageResourcesPath,
      renderForms: this.renderForms,
      downloadManager: this.downloadManager,
      enableComment: this.enableComment,
      enableScripting: this.enableScripting,
      hasJSActions: o,
      fieldObjects: s,
      optionalContentConfig: l
    }), yt(this, aF, i), this.linkService.isInPresentationMode && Gt(this, bD, jAt).call(this, moe.FULLSCREEN), te(this, iF) || (yt(this, iF, new AbortController()), (h = this._eventBus) == null || h.on("presentationmodechanged", p => {
      Gt(this, bD, jAt).call(this, p.state);
    }, {
      signal: te(this, iF).signal,
      ...G2
    }));
  }
  cancel() {
    var t, n;
    this._cancelled = !0, (t = te(this, iF)) == null || t.abort(), yt(this, iF, null), (n = this.annotationLayer) == null || n.destroy();
  }
  refreshCanvases() {
    var t;
    (t = this.annotationLayer) == null || t.refreshCanvases();
  }
  hide() {
    this.div && (this.div.hidden = !0);
  }
  hasEditableAnnotations() {
    var t;
    return !!((t = this.annotationLayer) != null && t.hasEditableAnnotations());
  }
  async injectLinkAnnotations(t) {
    if (te(this, aF) === null) throw new Error("`render` method must be called before `injectLinkAnnotations`.");
    if (this._cancelled || te(this, H3e)) return;
    yt(this, H3e, !0);
    const n = te(this, aF).length ? Gt(this, bD, rfr).call(this, t) : t;
    n.length && (await this.annotationLayer.addLinkAnnotations(n));
  }
}

aF = new WeakMap(), G3e = new WeakMap(), V3e = new WeakMap(), iF = new WeakMap(), H3e = new WeakMap(), bD = new WeakSet(), nfr = function (t, n) {
  this.annotationLayer = new hHi({
    div: this.div,
    accessibilityManager: this._accessibilityManager,
    annotationCanvasMap: this._annotationCanvasMap,
    annotationEditorUIManager: this._annotationEditorUIManager,
    annotationStorage: this.annotationStorage,
    page: this.pdfPage,
    viewport: t.clone({
      dontFlip: !0
    }),
    structTreeLayer: n,
    commentManager: te(this, G3e),
    linkService: this.linkService
  });
}, jAt = function (t) {
  if (!this.div) return;
  let n = !1;
  switch (t) {
    case moe.FULLSCREEN:
      n = !0;
      break;
    case moe.NORMAL:
      break;
    default:
      return;
  }
  for (const r of this.div.childNodes) r.hasAttribute("data-internal-link") || r.classList.contains("mediaAnnotation") || (r.inert = n);
}, rfr = function (t) {
  function n(i) {
    if (!i.quadPoints) return [i.rect];
    const o = [];
    for (let s = 2, l = i.quadPoints.length; s < l; s += 8) {
      const d = i.quadPoints[s],
        u = i.quadPoints[s + 1],
        h = i.quadPoints[s + 2],
        p = i.quadPoints[s + 3];
      o.push([h, p, d, u]);
    }
    return o;
  }
  function r(i, o) {
    const s = [],
      l = n(i),
      d = n(o);
    for (const u of l) for (const h of d) {
      const p = Uzt.intersect(u, h);
      p && s.push(p);
    }
    return s;
  }
  function a(i) {
    let o = 0;
    for (const s of i) o += Math.abs((s[2] - s[0]) * (s[3] - s[1]));
    return o;
  }
  return t.filter(i => {
    let o;
    for (const s of te(this, aF)) {
      if (s.annotationType !== Umr.LINK) continue;
      const l = r(s, i);
      if (l.length !== 0 && (o ?? (o = a(n(i))), a(l) / o > .5)) return !1;
    }
    return !0;
  });
};

oh(8454);

oh(9452);

var W3e;

class GHi {
  constructor() {
    qt(this, W3e, new WeakMap());
  }
  _triggerDownload(t, n, r, a = !1) {
    throw new Error("Not implemented: _triggerDownload");
  }
  _getOpenDataUrl(t, n, r = null) {
    throw new Error("Not implemented: _getOpenDataUrl");
  }
  downloadData(t, n, r) {
    const a = URL.createObjectURL(new Blob([t], {
      type: r
    }));
    this._triggerDownload(a, a, n, !0);
  }
  openOrDownloadData(t, n, r = null) {
    const a = gHi(n),
      i = a ? "application/pdf" : "";
    if (a) {
      const o = te(this, W3e).getOrInsertComputed(t, () => URL.createObjectURL(new Blob([t], {
        type: i
      })));
      try {
        const s = this._getOpenDataUrl(o, n, r);
        return window.open(s), !0;
      } catch (s) {
        console.error("openOrDownloadData:", s), URL.revokeObjectURL(o), te(this, W3e).delete(t);
      }
    }
    return this.downloadData(t, n, i), !1;
  }
  download(t, n, r) {
    const a = t ? URL.createObjectURL(new Blob([t], {
      type: "application/pdf"
    })) : null;
    this._triggerDownload(a, n, r);
  }
}

W3e = new WeakMap();

class afr extends GHi {
  _triggerDownload(t, n, r, a = !1) {
    if (!t && !a) {
      if (!$mr(n, "http://example.com")) throw new Error(`_triggerDownload - not a valid URL: ${n}`);
      t = n + "#pdfjs.action=download";
    }
    const i = document.createElement("a");
    i.href = t, i.target = "_parent", "download" in i && (i.download = r), (document.body || document.documentElement).append(i), i.click(), i.remove();
  }
  _getOpenDataUrl(t, n, r = null) {
    throw new Error("Opening data is not supported in `COMPONENTS` builds.");
  }
}

oh(116);

const Ipn = {
  EVENT: "event",
  TIMEOUT: "timeout"
};

async function VHi({
  target: e,
  name: t,
  delay: n = 0
}) {
  if (typeof e != "object" || !(Number.isInteger(n) && n >= 0)) throw new Error("waitOnEventOrTimeout - invalid parameters.");
  const {
      promise: r,
      resolve: a
    } = Promise.withResolvers(),
    i = new AbortController();
  function o(u) {
    i.abort(), clearTimeout(d), a(u);
  }
  const s = e instanceof w$e ? "on" : "addEventListener",
    l = e instanceof w$e ? {
      signal: i.signal,
      ...G2
    } : {
      signal: i.signal
    };
  e[s](t, o.bind(null, Ipn.EVENT), l);
  const d = setTimeout(o.bind(null, Ipn.TIMEOUT), n);
  return r;
}

var tle;

class w$e {
  constructor() {
    qt(this, tle, new Map());
    Object.seal(this);
  }
  on(t, n, r = null) {
    let a = null;
    if ((r == null ? void 0 : r.signal) instanceof AbortSignal) {
      const {
        signal: i
      } = r;
      if (i.aborted) {
        console.error("Cannot use an `aborted` signal.");
        return;
      }
      const o = () => this.off(t, n);
      a = () => i.removeEventListener("abort", o), i.addEventListener("abort", o);
    }
    te(this, tle).getOrInsertComputed(t, vHi).add({
      listener: n,
      internal: (r == null ? void 0 : r.internal) === Wmr,
      once: (r == null ? void 0 : r.once) === !0,
      rmAbort: a
    });
  }
  off(t, n, r = null) {
    var o;
    const a = te(this, tle).get(t),
      i = a == null ? void 0 : a.keys().find(s => s.listener === n);
    i && ((o = i.rmAbort) == null || o.call(i), a.delete(i));
  }
  dispatch(t, n) {
    const r = te(this, tle).get(t);
    if (!(r != null && r.size)) return;
    let a;
    for (const {
      listener: i,
      internal: o,
      once: s
    } of new Set(r)) {
      if (s && this.off(t, i), !o) {
        (a ?? (a = [])).push(i);
        continue;
      }
      i(n);
    }
    if (a) for (const i of a) i(n);
  }
}

tle = new WeakMap();

class foe {
  constructor(t) {
    this.value = t;
  }
  valueOf() {
    return this.value;
  }
}

class My extends foe {
  constructor(t = "???") {
    super(t);
  }
  toString(t) {
    return `{${this.value}}`;
  }
}

class pj extends foe {
  constructor(t, n = {}) {
    super(t), this.opts = n;
  }
  toString(t) {
    if (t) try {
      return t.memoizeIntlObject(Intl.NumberFormat, this.opts).format(this.value);
    } catch (n) {
      t.reportError(n);
    }
    return this.value.toString(10);
  }
}

class w$ extends foe {
  static supportsValue(t) {
    if (typeof t == "number" || t instanceof Date) return !0;
    if (t instanceof foe) return w$.supportsValue(t.valueOf());
    if ("Temporal" in globalThis) {
      const n = globalThis.Temporal;
      if (t instanceof n.Instant || t instanceof n.PlainDateTime || t instanceof n.PlainDate || t instanceof n.PlainMonthDay || t instanceof n.PlainTime || t instanceof n.PlainYearMonth) return !0;
    }
    return !1;
  }
  constructor(t, n = {}) {
    t instanceof w$ ? (n = {
      ...t.opts,
      ...n
    }, t = t.value) : t instanceof foe && (t = t.valueOf()), typeof t == "object" && "calendarId" in t && n.calendar === void 0 && (n = {
      ...n,
      calendar: t.calendarId
    }), super(t), this.opts = n;
  }
  [Symbol.toPrimitive](t) {
    return t === "string" ? this.toString() : this.toNumber();
  }
  toNumber() {
    const t = this.value;
    if (typeof t == "number") return t;
    if (t instanceof Date) return t.getTime();
    if ("epochMilliseconds" in t) return t.epochMilliseconds;
    if ("toZonedDateTime" in t) return t.toZonedDateTime("UTC").epochMilliseconds;
    throw new TypeError("Unwrapping a non-number value as a number");
  }
  toString(t) {
    if (t) try {
      return t.memoizeIntlObject(Intl.DateTimeFormat, this.opts).format(this.value);
    } catch (n) {
      t.reportError(n);
    }
    return typeof this.value == "number" || this.value instanceof Date ? new Date(this.value).toISOString() : this.value.toString();
  }
}

const Cpn = 100,
  HHi = "⁨",
  WHi = "⁩";

function qHi(e, t, n) {
  if (n === t || n instanceof pj && t instanceof pj && n.value === t.value) return !0;
  if (t instanceof pj && typeof n == "string") {
    let r = e.memoizeIntlObject(Intl.PluralRules, t.opts).select(t.value);
    if (n === r) return !0;
  }
  return !1;
}

function Epn(e, t, n) {
  return t[n] ? qde(e, t[n].value) : (e.reportError(new RangeError("No default")), new My());
}

function DAt(e, t) {
  const n = [],
    r = Object.create(null);
  for (const a of t) a.type === "narg" ? r[a.name] = pAe(e, a.value) : n.push(pAe(e, a));
  return {
    positional: n,
    named: r
  };
}

function pAe(e, t) {
  switch (t.type) {
    case "str":
      return t.value;
    case "num":
      return new pj(t.value, {
        minimumFractionDigits: t.precision
      });
    case "var":
      return KHi(e, t);
    case "mesg":
      return QHi(e, t);
    case "term":
      return YHi(e, t);
    case "func":
      return XHi(e, t);
    case "select":
      return JHi(e, t);
    default:
      return new My();
  }
}

function KHi(e, {
  name: t
}) {
  let n;
  if (e.params) {
    if (Object.prototype.hasOwnProperty.call(e.params, t)) n = e.params[t];else return new My(`$${t}`);
  } else if (e.args && Object.prototype.hasOwnProperty.call(e.args, t)) n = e.args[t];else return e.reportError(new ReferenceError(`Unknown variable: $${t}`)), new My(`$${t}`);
  if (n instanceof foe) return n;
  switch (typeof n) {
    case "string":
      return n;
    case "number":
      return new pj(n);
    case "object":
      if (w$.supportsValue(n)) return new w$(n);
    default:
      return e.reportError(new TypeError(`Variable type not supported: $${t}, ${typeof n}`)), new My(`$${t}`);
  }
}

function QHi(e, {
  name: t,
  attr: n
}) {
  const r = e.bundle._messages.get(t);
  if (!r) return e.reportError(new ReferenceError(`Unknown message: ${t}`)), new My(t);
  if (n) {
    const a = r.attributes[n];
    return a ? qde(e, a) : (e.reportError(new ReferenceError(`Unknown attribute: ${n}`)), new My(`${t}.${n}`));
  }
  return r.value ? qde(e, r.value) : (e.reportError(new ReferenceError(`No value: ${t}`)), new My(t));
}

function YHi(e, {
  name: t,
  attr: n,
  args: r
}) {
  const a = `-${t}`,
    i = e.bundle._terms.get(a);
  if (!i) return e.reportError(new ReferenceError(`Unknown term: ${a}`)), new My(a);
  if (n) {
    const s = i.attributes[n];
    if (s) {
      e.params = DAt(e, r).named;
      const l = qde(e, s);
      return e.params = null, l;
    }
    return e.reportError(new ReferenceError(`Unknown attribute: ${n}`)), new My(`${a}.${n}`);
  }
  e.params = DAt(e, r).named;
  const o = qde(e, i.value);
  return e.params = null, o;
}

function XHi(e, {
  name: t,
  args: n
}) {
  let r = e.bundle._functions[t];
  if (!r) return e.reportError(new ReferenceError(`Unknown function: ${t}()`)), new My(`${t}()`);
  if (typeof r != "function") return e.reportError(new TypeError(`Function ${t}() is not callable`)), new My(`${t}()`);
  try {
    let a = DAt(e, n);
    return r(a.positional, a.named);
  } catch (a) {
    return e.reportError(a), new My(`${t}()`);
  }
}

function JHi(e, {
  selector: t,
  variants: n,
  star: r
}) {
  let a = pAe(e, t);
  if (a instanceof My) return Epn(e, n, r);
  for (const i of n) {
    const o = pAe(e, i.key);
    if (qHi(e, a, o)) return qde(e, i.value);
  }
  return Epn(e, n, r);
}

function ifr(e, t) {
  if (e.dirty.has(t)) return e.reportError(new RangeError("Cyclic reference")), new My();
  e.dirty.add(t);
  const n = [],
    r = e.bundle._useIsolating && t.length > 1;
  for (const a of t) {
    if (typeof a == "string") {
      n.push(e.bundle._transform(a));
      continue;
    }
    if (e.placeables++, e.placeables > Cpn) throw e.dirty.delete(t), new RangeError(`Too many placeables expanded: ${e.placeables}, max allowed is ${Cpn}`);
    r && n.push(HHi), n.push(pAe(e, a).toString(e)), r && n.push(WHi);
  }
  return e.dirty.delete(t), n.join("");
}

function qde(e, t) {
  return typeof t == "string" ? e.bundle._transform(t) : ifr(e, t);
}

class ZHi {
  constructor(t, n, r) {
    this.dirty = new WeakSet(), this.params = null, this.placeables = 0, this.bundle = t, this.errors = n, this.args = r;
  }
  reportError(t) {
    if (!this.errors || !(t instanceof Error)) throw t;
    this.errors.push(t);
  }
  memoizeIntlObject(t, n) {
    let r = this.bundle._intls.get(t);
    r || (r = {}, this.bundle._intls.set(t, r));
    let a = JSON.stringify(n);
    return r[a] || (r[a] = new t(this.bundle.locales, n)), r[a];
  }
}

function LAt(e, t) {
  const n = Object.create(null);
  for (const [r, a] of Object.entries(e)) t.includes(r) && (n[r] = a.valueOf());
  return n;
}

const Tpn = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];

function eWi(e, t) {
  let n = e[0];
  if (n instanceof My) return new My(`NUMBER(${n.valueOf()})`);
  if (n instanceof pj) return new pj(n.valueOf(), {
    ...n.opts,
    ...LAt(t, Tpn)
  });
  if (n instanceof w$) return new pj(n.toNumber(), {
    ...LAt(t, Tpn)
  });
  throw new TypeError("Invalid argument to NUMBER");
}

const tWi = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];

function nWi(e, t) {
  let n = e[0];
  if (n instanceof My) return new My(`DATETIME(${n.valueOf()})`);
  if (n instanceof w$ || n instanceof pj) return new w$(n, LAt(t, tWi));
  throw new TypeError("Invalid argument to DATETIME");
}

const Mpn = new Map();

function rWi(e) {
  const t = Array.isArray(e) ? e.join(" ") : e;
  let n = Mpn.get(t);
  return n === void 0 && (n = new Map(), Mpn.set(t, n)), n;
}

class aWi {
  constructor(t, {
    functions: n,
    useIsolating: r = !0,
    transform: a = i => i
  } = {}) {
    this._terms = new Map(), this._messages = new Map(), this.locales = Array.isArray(t) ? t : [t], this._functions = {
      NUMBER: eWi,
      DATETIME: nWi,
      ...n
    }, this._useIsolating = r, this._transform = a, this._intls = rWi(t);
  }
  hasMessage(t) {
    return this._messages.has(t);
  }
  getMessage(t) {
    return this._messages.get(t);
  }
  addResource(t, {
    allowOverrides: n = !1
  } = {}) {
    const r = [];
    for (let a = 0; a < t.body.length; a++) {
      let i = t.body[a];
      if (i.id.startsWith("-")) {
        if (n === !1 && this._terms.has(i.id)) {
          r.push(new Error(`Attempt to override an existing term: "${i.id}"`));
          continue;
        }
        this._terms.set(i.id, i);
      } else {
        if (n === !1 && this._messages.has(i.id)) {
          r.push(new Error(`Attempt to override an existing message: "${i.id}"`));
          continue;
        }
        this._messages.set(i.id, i);
      }
    }
    return r;
  }
  formatPattern(t, n = null, r = null) {
    if (typeof t == "string") return this._transform(t);
    let a = new ZHi(this, r, n);
    try {
      return ifr(a, t).toString(a);
    } catch (i) {
      if (a.errors && i instanceof Error) return a.errors.push(i), new My().toString(a);
      throw i;
    }
  }
}

const Plt = /^(-?[a-zA-Z][\w-]*) *= */gm,
  Ppn = /\.([a-zA-Z][\w-]*) *= */y,
  iWi = /\*?\[/y,
  Rlt = /(-?[0-9]+(?:\.([0-9]+))?)/y,
  oWi = /([a-zA-Z][\w-]*)/y,
  Rpn = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y,
  sWi = /^[A-Z][A-Z0-9_-]*$/,
  ePe = /([^{}\n\r]+)/y,
  lWi = /([^\\"\n\r]*)/y,
  Npn = /\\([\\"])/y,
  jpn = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y,
  cWi = /^\n+/,
  Dpn = / +$/,
  dWi = / *\r?\n/g,
  uWi = /( *)$/,
  hWi = /{\s*/y,
  Lpn = /\s*}/y,
  pWi = /\[\s*/y,
  mWi = /\s*] */y,
  fWi = /\s*\(\s*/y,
  gWi = /\s*->\s*/y,
  yWi = /\s*:\s*/y,
  bWi = /\s*,?\s*/y,
  vWi = /\s+/y;

class wWi {
  constructor(t) {
    this.body = [], Plt.lastIndex = 0;
    let n = 0;
    for (;;) {
      let E = Plt.exec(t);
      if (E === null) break;
      n = Plt.lastIndex;
      try {
        this.body.push(l(E[1]));
      } catch (M) {
        if (M instanceof SyntaxError) continue;
        throw M;
      }
    }
    function r(E) {
      return E.lastIndex = n, E.test(t);
    }
    function a(E, M) {
      if (t[n] === E) return n++, !0;
      if (M) throw new M(`Expected ${E}`);
      return !1;
    }
    function i(E, M) {
      if (r(E)) return n = E.lastIndex, !0;
      if (M) throw new M(`Expected ${E.toString()}`);
      return !1;
    }
    function o(E) {
      E.lastIndex = n;
      let M = E.exec(t);
      if (M === null) throw new SyntaxError(`Expected ${E.toString()}`);
      return n = E.lastIndex, M;
    }
    function s(E) {
      return o(E)[1];
    }
    function l(E) {
      let M = u(),
        T = d();
      if (M === null && Object.keys(T).length === 0) throw new SyntaxError("Expected message value or attributes");
      return {
        id: E,
        value: M,
        attributes: T
      };
    }
    function d() {
      let E = Object.create(null);
      for (; r(Ppn);) {
        let M = s(Ppn),
          T = u();
        if (T === null) throw new SyntaxError("Expected attribute value");
        E[M] = T;
      }
      return E;
    }
    function u() {
      let E;
      if (r(ePe) && (E = s(ePe)), t[n] === "{" || t[n] === "}") return h(E ? [E] : [], 1 / 0);
      let M = S();
      return M ? E ? h([E, M], M.length) : (M.value = C(M.value, cWi), h([M], M.length)) : E ? C(E, Dpn) : null;
    }
    function h(E = [], M) {
      for (;;) {
        if (r(ePe)) {
          E.push(s(ePe));
          continue;
        }
        if (t[n] === "{") {
          E.push(p());
          continue;
        }
        if (t[n] === "}") throw new SyntaxError("Unbalanced closing brace");
        let j = S();
        if (j) {
          E.push(j), M = Math.min(M, j.length);
          continue;
        }
        break;
      }
      let T = E.length - 1,
        P = E[T];
      typeof P == "string" && (E[T] = C(P, Dpn));
      let R = [];
      for (let j of E) j instanceof Opn && (j = j.value.slice(0, j.value.length - M)), j && R.push(j);
      return R;
    }
    function p() {
      i(hWi, SyntaxError);
      let E = m();
      if (i(Lpn)) return E;
      if (i(gWi)) {
        let M = b();
        return i(Lpn, SyntaxError), {
          type: "select",
          selector: E,
          ...M
        };
      }
      throw new SyntaxError("Unclosed placeable");
    }
    function m() {
      if (t[n] === "{") return p();
      if (r(Rpn)) {
        let [, E, M, T = null] = o(Rpn);
        if (E === "$") return {
          type: "var",
          name: M
        };
        if (i(fWi)) {
          let P = f();
          if (E === "-") return {
            type: "term",
            name: M,
            attr: T,
            args: P
          };
          if (sWi.test(M)) return {
            type: "func",
            name: M,
            args: P
          };
          throw new SyntaxError("Function names must be all upper-case");
        }
        return E === "-" ? {
          type: "term",
          name: M,
          attr: T,
          args: []
        } : {
          type: "mesg",
          name: M,
          attr: T
        };
      }
      return _();
    }
    function f() {
      let E = [];
      for (;;) {
        switch (t[n]) {
          case ")":
            return n++, E;
          case void 0:
            throw new SyntaxError("Unclosed argument list");
        }
        E.push(y()), i(bWi);
      }
    }
    function y() {
      let E = m();
      return E.type !== "mesg" ? E : i(yWi) ? {
        type: "narg",
        name: E.name,
        value: _()
      } : E;
    }
    function b() {
      let E = [],
        M = 0,
        T;
      for (; r(iWi);) {
        a("*") && (T = M);
        let P = v(),
          R = u();
        if (R === null) throw new SyntaxError("Expected variant value");
        E[M++] = {
          key: P,
          value: R
        };
      }
      if (M === 0) return null;
      if (T === void 0) throw new SyntaxError("Expected default variant");
      return {
        variants: E,
        star: T
      };
    }
    function v() {
      i(pWi, SyntaxError);
      let E;
      return r(Rlt) ? E = w() : E = {
        type: "str",
        value: s(oWi)
      }, i(mWi, SyntaxError), E;
    }
    function _() {
      if (r(Rlt)) return w();
      if (t[n] === '"') return k();
      throw new SyntaxError("Invalid expression");
    }
    function w() {
      let [, E, M = ""] = o(Rlt),
        T = M.length;
      return {
        type: "num",
        value: parseFloat(E),
        precision: T
      };
    }
    function k() {
      a('"', SyntaxError);
      let E = "";
      for (;;) {
        if (E += s(lWi), t[n] === "\\") {
          E += A();
          continue;
        }
        if (a('"')) return {
          type: "str",
          value: E
        };
        throw new SyntaxError("Unclosed string literal");
      }
    }
    function A() {
      if (r(Npn)) return s(Npn);
      if (r(jpn)) {
        let [, E, M] = o(jpn),
          T = parseInt(E || M, 16);
        return T <= 55295 || 57344 <= T ? String.fromCodePoint(T) : "�";
      }
      throw new SyntaxError("Unknown escape sequence");
    }
    function S() {
      let E = n;
      switch (i(vWi), t[n]) {
        case ".":
        case "[":
        case "*":
        case "}":
        case void 0:
          return !1;
        case "{":
          return I(t.slice(E, n));
      }
      return t[n - 1] === " " ? I(t.slice(E, n)) : !1;
    }
    function C(E, M) {
      return E.replace(M, "");
    }
    function I(E) {
      let M = E.replace(dWi, `
`),
        T = uWi.exec(E)[1].length;
      return new Opn(M, T);
    }
  }
}

class Opn {
  constructor(t, n) {
    this.value = t, this.length = n;
  }
}

const xWi = /<|&#?\w+;/,
  _Wi = {
    "http://www.w3.org/1999/xhtml": ["em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr"]
  },
  kWi = {
    "http://www.w3.org/1999/xhtml": {
      global: ["title", "aria-description", "aria-label", "aria-valuetext"],
      a: ["download"],
      area: ["download", "alt"],
      input: ["alt", "placeholder"],
      menuitem: ["label"],
      menu: ["label"],
      optgroup: ["label"],
      option: ["label"],
      track: ["label"],
      img: ["alt"],
      textarea: ["placeholder"],
      th: ["abbr"]
    },
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul": {
      global: ["accesskey", "aria-label", "aria-valuetext", "label", "title", "tooltiptext"],
      description: ["value"],
      key: ["key", "keycode"],
      label: ["value"],
      textbox: ["placeholder", "value"]
    }
  };

function AWi(e, t) {
  const {
    value: n
  } = t;
  if (typeof n == "string") if (e.localName === "title" && e.namespaceURI === "http://www.w3.org/1999/xhtml") e.textContent = n;else if (!xWi.test(n)) e.textContent = n;else {
    const r = e.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "template");
    r.innerHTML = n, SWi(r.content, e);
  }
  ofr(t, e);
}

function SWi(e, t) {
  for (const n of e.childNodes) if (n.nodeType !== n.TEXT_NODE) {
    if (n.hasAttribute("data-l10n-name")) {
      const r = CWi(t, n);
      e.replaceChild(r, n);
      continue;
    }
    if (TWi(n)) {
      const r = EWi(n);
      e.replaceChild(r, n);
      continue;
    }
    console.warn(`An element of forbidden type "${n.localName}" was found in the translation. Only safe text-level elements and elements with data-l10n-name are allowed.`), e.replaceChild(OAt(n), n);
  }
  t.textContent = "", t.appendChild(e);
}

function IWi(e, t) {
  if (!e) return !1;
  for (let n of e) if (n.name === t) return !0;
  return !1;
}

function ofr(e, t) {
  const n = t.hasAttribute("data-l10n-attrs") ? t.getAttribute("data-l10n-attrs").split(",").map(r => r.trim()) : null;
  for (const r of Array.from(t.attributes)) Bpn(r.name, t, n) && !IWi(e.attributes, r.name) && t.removeAttribute(r.name);
  if (e.attributes) for (const r of Array.from(e.attributes)) Bpn(r.name, t, n) && t.getAttribute(r.name) !== r.value && t.setAttribute(r.name, r.value);
}

function CWi(e, t) {
  const n = t.getAttribute("data-l10n-name"),
    r = e.querySelector(`[data-l10n-name="${n}"]`);
  if (!r) return console.warn(`An element named "${n}" wasn't found in the source.`), OAt(t);
  if (r.localName !== t.localName) return console.warn(`An element named "${n}" was found in the translation but its type ${t.localName} didn't match the element found in the source (${r.localName}).`), OAt(t);
  e.removeChild(r);
  const a = r.cloneNode(!1);
  return sfr(t, a);
}

function EWi(e) {
  const t = e.ownerDocument.createElement(e.localName);
  return sfr(e, t);
}

function OAt(e) {
  return e.ownerDocument.createTextNode(e.textContent);
}

function TWi(e) {
  const t = _Wi[e.namespaceURI];
  return t && t.includes(e.localName);
}

function Bpn(e, t, n = null) {
  if (n && n.includes(e)) return !0;
  const r = kWi[t.namespaceURI];
  if (!r) return !1;
  const a = e.toLowerCase(),
    i = t.localName;
  if (r.global.includes(a)) return !0;
  if (!r[i]) return !1;
  if (r[i].includes(a)) return !0;
  if (t.namespaceURI === "http://www.w3.org/1999/xhtml" && i === "input" && a === "value") {
    const o = t.type.toLowerCase();
    if (o === "submit" || o === "button" || o === "reset") return !0;
  }
  return !1;
}

function sfr(e, t) {
  return t.textContent = e.textContent, ofr(e, t), t;
}

class MWi extends Array {
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
}

class PWi extends MWi {
  constructor(t) {
    if (super(), Symbol.asyncIterator in Object(t)) this.iterator = t[Symbol.asyncIterator]();else if (Symbol.iterator in Object(t)) this.iterator = t[Symbol.iterator]();else throw new TypeError("Argument must implement the iteration protocol.");
  }
  [Symbol.asyncIterator]() {
    const t = this;
    let n = 0;
    return {
      async next() {
        return t.length <= n && t.push(t.iterator.next()), t[n++];
      }
    };
  }
  async touchNext(t = 1) {
    let n = 0;
    for (; n++ < t;) {
      const r = this[this.length - 1];
      if (r && (await r).done) break;
      this.push(this.iterator.next());
    }
    return this[this.length - 1];
  }
}

class RWi {
  constructor(t = [], n) {
    this.resourceIds = t, this.generateBundles = n, this.onChange(!0);
  }
  addResourceIds(t, n = !1) {
    return this.resourceIds.push(...t), this.onChange(n), this.resourceIds.length;
  }
  removeResourceIds(t) {
    return this.resourceIds = this.resourceIds.filter(n => !t.includes(n)), this.onChange(), this.resourceIds.length;
  }
  async formatWithFallback(t, n) {
    const r = [];
    let a = !1;
    for await (const i of this.bundles) {
      a = !0;
      const o = DWi(n, i, t, r);
      if (o.size === 0) break;
      if (typeof console < "u") {
        const s = i.locales[0],
          l = Array.from(o).join(", ");
        console.warn(`[fluent] Missing translations in ${s}: ${l}`);
      }
    }
    return !a && typeof console < "u" && console.warn(`[fluent] Request for keys failed because no resource bundles got generated.
  keys: ${JSON.stringify(t)}.
  resourceIds: ${JSON.stringify(this.resourceIds)}.`), r;
  }
  formatMessages(t) {
    return this.formatWithFallback(t, jWi);
  }
  formatValues(t) {
    return this.formatWithFallback(t, NWi);
  }
  async formatValue(t, n) {
    const [r] = await this.formatValues([{
      id: t,
      args: n
    }]);
    return r;
  }
  handleEvent() {
    this.onChange();
  }
  onChange(t = !1) {
    this.bundles = PWi.from(this.generateBundles(this.resourceIds)), t && this.bundles.touchNext(2);
  }
}

function NWi(e, t, n, r) {
  return n.value ? e.formatPattern(n.value, r, t) : null;
}

function jWi(e, t, n, r) {
  const a = {
    value: null,
    attributes: null
  };
  n.value && (a.value = e.formatPattern(n.value, r, t));
  let i = Object.keys(n.attributes);
  if (i.length > 0) {
    a.attributes = new Array(i.length);
    for (let [o, s] of i.entries()) {
      let l = e.formatPattern(n.attributes[s], r, t);
      a.attributes[o] = {
        name: s,
        value: l
      };
    }
  }
  return a;
}

function DWi(e, t, n, r) {
  const a = [],
    i = new Set();
  return n.forEach(({
    id: o,
    args: s
  }, l) => {
    if (r[l] !== void 0) return;
    let d = t.getMessage(o);
    if (d) {
      if (a.length = 0, r[l] = e(t, a, d, s), a.length > 0 && typeof console < "u") {
        const u = t.locales[0],
          h = a.join(", ");
        console.warn(`[fluent][resolver] errors in ${u}/${o}: ${h}.`);
      }
    } else i.add(o);
  }), i;
}

const eH = "data-l10n-id",
  Xfe = "data-l10n-args",
  LWi = `[${eH}]`;

class OWi extends RWi {
  constructor(t, n) {
    super(t, n), this.roots = new Set(), this.pendingrAF = null, this.pendingElements = new Set(), this.windowElement = null, this.mutationObserver = null, this.observerConfig = {
      attributes: !0,
      characterData: !1,
      childList: !0,
      subtree: !0,
      attributeFilter: [eH, Xfe]
    };
  }
  onChange(t = !1) {
    super.onChange(t), this.roots && this.translateRoots();
  }
  setAttributes(t, n, r) {
    return t.setAttribute(eH, n), r ? t.setAttribute(Xfe, JSON.stringify(r)) : t.removeAttribute(Xfe), t;
  }
  getAttributes(t) {
    return {
      id: t.getAttribute(eH),
      args: JSON.parse(t.getAttribute(Xfe) || null)
    };
  }
  connectRoot(t) {
    for (const n of this.roots) if (n === t || n.contains(t) || t.contains(n)) throw new Error("Cannot add a root that overlaps with existing root.");
    if (this.windowElement) {
      if (this.windowElement !== t.ownerDocument.defaultView) throw new Error(`Cannot connect a root:
          DOMLocalization already has a root from a different window.`);
    } else this.windowElement = t.ownerDocument.defaultView, this.mutationObserver = new this.windowElement.MutationObserver(n => this.translateMutations(n));
    this.roots.add(t), this.mutationObserver.observe(t, this.observerConfig);
  }
  disconnectRoot(t) {
    return this.roots.delete(t), this.pauseObserving(), this.roots.size === 0 ? (this.mutationObserver = null, this.windowElement && this.pendingrAF && this.windowElement.cancelAnimationFrame(this.pendingrAF), this.windowElement = null, this.pendingrAF = null, this.pendingElements.clear(), !0) : (this.resumeObserving(), !1);
  }
  translateRoots() {
    const t = Array.from(this.roots);
    return Promise.all(t.map(n => this.translateFragment(n)));
  }
  pauseObserving() {
    this.mutationObserver && (this.translateMutations(this.mutationObserver.takeRecords()), this.mutationObserver.disconnect());
  }
  resumeObserving() {
    if (this.mutationObserver) for (const t of this.roots) this.mutationObserver.observe(t, this.observerConfig);
  }
  translateMutations(t) {
    for (const n of t) switch (n.type) {
      case "attributes":
        n.target.hasAttribute("data-l10n-id") && this.pendingElements.add(n.target);
        break;
      case "childList":
        for (const r of n.addedNodes) if (r.nodeType === r.ELEMENT_NODE) if (r.childElementCount) for (const a of this.getTranslatables(r)) this.pendingElements.add(a);else r.hasAttribute(eH) && this.pendingElements.add(r);
        break;
    }
    this.pendingElements.size > 0 && this.pendingrAF === null && (this.pendingrAF = this.windowElement.requestAnimationFrame(() => {
      this.translateElements(Array.from(this.pendingElements)), this.pendingElements.clear(), this.pendingrAF = null;
    }));
  }
  translateFragment(t) {
    return this.translateElements(this.getTranslatables(t));
  }
  async translateElements(t) {
    if (!t.length) return;
    const n = t.map(this.getKeysForElement),
      r = await this.formatMessages(n);
    return this.applyTranslations(t, r);
  }
  applyTranslations(t, n) {
    this.pauseObserving();
    for (let r = 0; r < t.length; r++) n[r] !== void 0 && AWi(t[r], n[r]);
    this.resumeObserving();
  }
  getTranslatables(t) {
    const n = Array.from(t.querySelectorAll(LWi));
    return typeof t.hasAttribute == "function" && t.hasAttribute(eH) && n.push(t), n;
  }
  getKeysForElement(t) {
    return {
      id: t.getAttribute(eH),
      args: JSON.parse(t.getAttribute(Xfe) || null)
    };
  }
}

var q3e, oF, nle, J_, kue, lfr, cfr;

const Cwe = class Cwe {
  constructor({
    lang: t,
    isRTL: n
  }, r = null) {
    qt(this, q3e);
    qt(this, oF);
    qt(this, nle);
    qt(this, J_);
    var a, i;
    yt(this, nle, Gt(a = Cwe, kue, lfr).call(a, t)), yt(this, J_, r), yt(this, q3e, n ?? Gt(i = Cwe, kue, cfr).call(i, te(this, nle)) ? "rtl" : "ltr");
  }
  _setL10n(t) {
    yt(this, J_, t);
  }
  getLanguage() {
    return te(this, nle);
  }
  getDirection() {
    return te(this, q3e);
  }
  async get(t, n = null, r) {
    var i;
    return Array.isArray(t) ? (t = t.map(s => ({
      id: s
    })), (await te(this, J_).formatMessages(t)).map(s => s.value)) : ((i = (await te(this, J_).formatMessages([{
      id: t,
      args: n
    }]))[0]) == null ? void 0 : i.value) || r;
  }
  async translate(t) {
    (te(this, oF) || yt(this, oF, new Set())).add(t);
    try {
      te(this, J_).connectRoot(t), await te(this, J_).translateRoots();
    } catch {}
  }
  async translateOnce(t) {
    try {
      await te(this, J_).translateElements([t]);
    } catch (n) {
      console.error("translateOnce:", n);
    }
  }
  async destroy() {
    if (te(this, oF)) {
      for (const t of te(this, oF)) te(this, J_).disconnectRoot(t);
      te(this, oF).clear(), yt(this, oF, null);
    }
    te(this, J_).pauseObserving();
  }
  pause() {
    te(this, J_).pauseObserving();
  }
  resume() {
    te(this, J_).resumeObserving();
  }
};

q3e = new WeakMap(), oF = new WeakMap(), nle = new WeakMap(), J_ = new WeakMap(), kue = new WeakSet(), lfr = function (t) {
  return t = (t == null ? void 0 : t.toLowerCase()) || "en-us", {
    en: "en-us",
    es: "es-es",
    fy: "fy-nl",
    ga: "ga-ie",
    gu: "gu-in",
    hi: "hi-in",
    hy: "hy-am",
    nb: "nb-no",
    ne: "ne-np",
    nn: "nn-no",
    pa: "pa-in",
    pt: "pt-pt",
    sv: "sv-se",
    zh: "zh-cn"
  }[t] || t;
}, cfr = function (t) {
  const n = t.split("-", 1)[0];
  return ["ar", "he", "fa", "ps", "ur"].includes(n);
}, qt(Cwe, kue);

let BAt = Cwe;

function BWi() {
  const {
    isAndroid: e,
    isLinux: t,
    isMac: n,
    isWindows: r
  } = zzt.platform;
  return t ? "linux" : r ? "windows" : n ? "macos" : e ? "android" : "other";
}

function Fpn(e, t) {
  const n = new wWi(t),
    r = new aWi(e, {
      functions: {
        PLATFORM: BWi
      }
    }),
    a = r.addResource(n);
  return a.length && console.error("L10n errors", a), r;
}

var A3, dfr, ufr, hfr, pfr, FAt;

const OH = class OH extends BAt {
  constructor(t) {
    super({
      lang: t
    });
    const n = t ? Gt(OH, A3, dfr).bind(OH, "en-us", this.getLanguage()) : Gt(OH, A3, pfr).bind(OH, this.getLanguage());
    this._setL10n(new OWi([], n));
  }
};

A3 = new WeakSet(), dfr = async function* (t, n) {
  const {
      baseURL: r,
      paths: a
    } = await Gt(this, A3, hfr).call(this),
    i = [n];
  if (t !== n) {
    const s = n.split("-", 1)[0];
    s !== n && i.push(s), i.push(t);
  }
  const o = i.map(s => [s, Gt(this, A3, ufr).call(this, s, r, a)]);
  for (const [s, l] of o) {
    const d = await l;
    d ? yield d : s === "en-us" && (yield Gt(this, A3, FAt).call(this, s));
  }
}, ufr = async function (t, n, r) {
  const a = r[t];
  if (!a) return null;
  const i = new URL(a, n),
    o = await hpn(i, "text");
  return Fpn(t, o);
}, hfr = async function () {
  try {
    const {
        href: t
      } = document.querySelector('link[type="application/l10n"]'),
      n = await hpn(t, "json");
    return {
      baseURL: t.substring(0, t.lastIndexOf("/") + 1) || "./",
      paths: n
    };
  } catch {}
  return {
    baseURL: "./",
    paths: Object.create(null)
  };
}, pfr = async function* (t) {
  yield Gt(this, A3, FAt).call(this, t);
}, FAt = async function (t) {
  return Fpn(t, `pdfjs-previous-button =
    .title = Previous Page
pdfjs-previous-button-label = Previous
pdfjs-next-button =
    .title = Next Page
pdfjs-next-button-label = Next
pdfjs-page-input =
    .title = Page
pdfjs-of-pages = of { $pagesCount }
pdfjs-page-of-pages = ({ $pageNumber } of { $pagesCount })
pdfjs-zoom-out-button =
    .title = Zoom Out
pdfjs-zoom-out-button-label = Zoom Out
pdfjs-zoom-in-button =
    .title = Zoom In
pdfjs-zoom-in-button-label = Zoom In
pdfjs-zoom-select =
    .title = Zoom
pdfjs-presentation-mode-button =
    .title = Switch to Presentation Mode
pdfjs-presentation-mode-button-label = Presentation Mode
pdfjs-open-file-button =
    .title = Open File
pdfjs-open-file-button-label = Open
pdfjs-print-button =
    .title = Print
pdfjs-print-button-label = Print
pdfjs-save-button =
    .title = Save
pdfjs-save-button-label = Save
pdfjs-download-button =
    .title = Download
pdfjs-download-button-label = Download
pdfjs-bookmark-button =
    .title = Current Page (View URL from Current Page)
pdfjs-bookmark-button-label = Current Page
pdfjs-tools-button =
    .title = Tools
pdfjs-tools-button-label = Tools
pdfjs-first-page-button =
    .title = Go to First Page
pdfjs-first-page-button-label = Go to First Page
pdfjs-last-page-button =
    .title = Go to Last Page
pdfjs-last-page-button-label = Go to Last Page
pdfjs-page-rotate-cw-button =
    .title = Rotate Clockwise
pdfjs-page-rotate-cw-button-label = Rotate Clockwise
pdfjs-page-rotate-ccw-button =
    .title = Rotate Counterclockwise
pdfjs-page-rotate-ccw-button-label = Rotate Counterclockwise
pdfjs-cursor-text-select-tool-button =
    .title = Enable Text Selection Tool
pdfjs-cursor-text-select-tool-button-label = Text Selection Tool
pdfjs-cursor-hand-tool-button =
    .title = Enable Hand Tool
pdfjs-cursor-hand-tool-button-label = Hand Tool
pdfjs-scroll-page-button =
    .title = Use Page Scrolling
pdfjs-scroll-page-button-label = Page Scrolling
pdfjs-scroll-vertical-button =
    .title = Use Vertical Scrolling
pdfjs-scroll-vertical-button-label = Vertical Scrolling
pdfjs-scroll-horizontal-button =
    .title = Use Horizontal Scrolling
pdfjs-scroll-horizontal-button-label = Horizontal Scrolling
pdfjs-scroll-wrapped-button =
    .title = Use Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
pdfjs-spread-none-button =
    .title = Do not join page spreads
pdfjs-spread-none-button-label = No Spreads
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Odd Spreads
pdfjs-spread-even-button =
    .title = Join page spreads starting with even-numbered pages
pdfjs-spread-even-button-label = Even Spreads
pdfjs-document-properties-button =
    .title = Document Properties…
pdfjs-document-properties-button-label = Document Properties…
pdfjs-document-properties-file-name = File name:
pdfjs-document-properties-file-size = File size:
pdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3) } KB ({ $b } bytes)
pdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3) } MB ({ $b } bytes)
pdfjs-document-properties-title = Title:
pdfjs-document-properties-author = Author:
pdfjs-document-properties-subject = Subject:
pdfjs-document-properties-keywords = Keywords:
pdfjs-document-properties-creation-date = Creation Date:
pdfjs-document-properties-modification-date = Modification Date:
pdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-document-properties-creator = Creator:
pdfjs-document-properties-producer = PDF Producer:
pdfjs-document-properties-version = PDF Version:
pdfjs-document-properties-page-count = Page Count:
pdfjs-document-properties-page-size = Page Size:
pdfjs-document-properties-page-size-unit-inches = in
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = portrait
pdfjs-document-properties-page-size-orientation-landscape = landscape
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Legal
pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })
pdfjs-document-properties-linearized = Fast Web View:
pdfjs-document-properties-linearized-yes = Yes
pdfjs-document-properties-linearized-no = No
pdfjs-document-properties-close-button = Close
pdfjs-print-progress-message = Preparing document for printing…
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Cancel
pdfjs-printing-not-supported = Warning: Printing is not fully supported by this browser.
pdfjs-printing-not-ready = Warning: The PDF is not fully loaded for printing.
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-findbar-button =
    .title = Find in Document
pdfjs-findbar-button-label = Find
pdfjs-additional-layers = Additional Layers
pdfjs-thumb-page-title1 =
    .title = Page { $page } of { $total }
pdfjs-thumb-page-canvas =
    .aria-label = Thumbnail of Page { $page }
pdfjs-thumb-page-checkbox1 =
    .title = Select page { $page }
pdfjs-find-input =
    .title = Find
    .placeholder = Find in document…
pdfjs-find-previous-button =
    .title = Find the previous occurrence of the phrase
pdfjs-find-previous-button-label = Previous
pdfjs-find-next-button =
    .title = Find the next occurrence of the phrase
pdfjs-find-next-button-label = Next
pdfjs-find-highlight-checkbox = Highlight All
pdfjs-find-match-case-checkbox-label = Match Case
pdfjs-find-match-diacritics-checkbox-label = Match Diacritics
pdfjs-find-entire-word-checkbox-label = Whole Words
pdfjs-find-reached-top = Reached top of document, continued from bottom
pdfjs-find-reached-bottom = Reached end of document, continued from top
pdfjs-find-match-count =
    { $total ->
        [one] { $current } of { $total } match
       *[other] { $current } of { $total } matches
    }
pdfjs-find-match-count-limit =
    { $limit ->
        [one] More than { $limit } match
       *[other] More than { $limit } matches
    }
pdfjs-find-not-found = Phrase not found
pdfjs-page-scale-width = Page Width
pdfjs-page-scale-fit = Page Fit
pdfjs-page-scale-auto = Automatic Zoom
pdfjs-page-scale-actual = Actual Size
pdfjs-page-scale-percent = { $scale }%
pdfjs-page-landmark =
    .aria-label = Page { $page }
pdfjs-loading-error = An error occurred while loading the PDF.
pdfjs-invalid-file-error = Invalid or corrupted PDF file.
pdfjs-missing-file-error = Missing PDF file.
pdfjs-unexpected-response-error = Unexpected server response.
pdfjs-rendering-error = An error occurred while rendering the page.
pdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-text-annotation-type =
    .alt = [{ $type } Annotation]
pdfjs-password-label = Enter the password to open this PDF file.
pdfjs-password-invalid = Invalid password. Please try again.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Cancel
pdfjs-web-fonts-disabled = Web fonts are disabled: unable to use embedded PDF fonts.
pdfjs-editor-free-text-button =
    .title = Text
pdfjs-editor-color-picker-free-text-input =
    .title = Change text color
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Draw
pdfjs-editor-color-picker-ink-input =
    .title = Change drawing color
pdfjs-editor-ink-button-label = Draw
pdfjs-editor-stamp-button =
    .title = Add or edit images
pdfjs-editor-stamp-button-label = Add or edit images
pdfjs-editor-highlight-button =
    .title = Highlight
pdfjs-editor-highlight-button-label = Highlight
pdfjs-highlight-floating-button1 =
    .title = Highlight
    .aria-label = Highlight
pdfjs-highlight-floating-button-label = Highlight
pdfjs-comment-floating-button =
    .title = Comment
    .aria-label = Comment
pdfjs-comment-floating-button-label = Comment
pdfjs-editor-comment-button =
    .title = Comment
    .aria-label = Comment
pdfjs-editor-comment-button-label = Comment
pdfjs-editor-signature-button =
    .title = Add signature
pdfjs-editor-signature-button-label = Add signature
pdfjs-editor-highlight-editor =
    .aria-label = Highlight editor
pdfjs-editor-ink-editor =
    .aria-label = Drawing editor
pdfjs-editor-signature-editor1 =
    .aria-description = Signature editor: { $description }
pdfjs-editor-stamp-editor =
    .aria-label = Image editor
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-remove-signature-button =
    .title = Remove signature
pdfjs-editor-free-text-color-input = Color
pdfjs-editor-free-text-size-input = Size
pdfjs-editor-ink-color-input = Color
pdfjs-editor-ink-thickness-input = Thickness
pdfjs-editor-ink-opacity-input = Opacity
pdfjs-editor-stamp-add-image-button =
    .title = Add image
pdfjs-editor-stamp-add-image-button-label = Add image
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-editor-add-signature-container =
    .aria-label = Signature controls and saved signatures
pdfjs-editor-signature-add-signature-button =
    .title = Add new signature
pdfjs-editor-signature-add-signature-button-label = Add new signature
pdfjs-editor-add-saved-signature-button =
    .title = Saved signature: { $description }
pdfjs-free-text2 =
    .aria-label = Text Editor
    .default-content = Start typing…
pdfjs-editor-comments-sidebar-title =
    { $count ->
        [one] Comment
       *[other] Comments
    }
pdfjs-editor-comments-sidebar-close-button =
    .title = Close the sidebar
    .aria-label = Close the sidebar
pdfjs-editor-comments-sidebar-close-button-label = Close the sidebar
pdfjs-editor-comments-sidebar-no-comments1 = See something noteworthy? Highlight it and leave a comment.
pdfjs-editor-comments-sidebar-no-comments-link = Learn more
pdfjs-editor-alt-text-button =
    .aria-label = Alt text
pdfjs-editor-alt-text-button-label = Alt text
pdfjs-editor-alt-text-edit-button =
    .aria-label = Edit alt text
pdfjs-editor-alt-text-dialog-label = Choose an option
pdfjs-editor-alt-text-dialog-description = Alt text (alternative text) helps when people can’t see the image or when it doesn’t load.
pdfjs-editor-alt-text-add-description-label = Add a description
pdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.
pdfjs-editor-alt-text-mark-decorative-label = Mark as decorative
pdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.
pdfjs-editor-alt-text-cancel-button = Cancel
pdfjs-editor-alt-text-save-button = Save
pdfjs-editor-alt-text-decorative-tooltip = Marked as decorative
pdfjs-editor-alt-text-textarea =
    .placeholder = For example, “A young man sits down at a table to eat a meal”
pdfjs-editor-resizer-top-left =
    .aria-label = Top left corner — resize
pdfjs-editor-resizer-top-middle =
    .aria-label = Top middle — resize
pdfjs-editor-resizer-top-right =
    .aria-label = Top right corner — resize
pdfjs-editor-resizer-middle-right =
    .aria-label = Middle right — resize
pdfjs-editor-resizer-bottom-right =
    .aria-label = Bottom right corner — resize
pdfjs-editor-resizer-bottom-middle =
    .aria-label = Bottom middle — resize
pdfjs-editor-resizer-bottom-left =
    .aria-label = Bottom left corner — resize
pdfjs-editor-resizer-middle-left =
    .aria-label = Middle left — resize
pdfjs-editor-highlight-colorpicker-label = Highlight color
pdfjs-editor-colorpicker-button =
    .title = Change color
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Color choices
pdfjs-editor-colorpicker-yellow =
    .title = Yellow
pdfjs-editor-colorpicker-green =
    .title = Green
pdfjs-editor-colorpicker-blue =
    .title = Blue
pdfjs-editor-colorpicker-pink =
    .title = Pink
pdfjs-editor-colorpicker-red =
    .title = Red
pdfjs-editor-highlight-show-all-button-label = Show all
pdfjs-editor-highlight-show-all-button =
    .title = Show all
pdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description)
pdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description)
pdfjs-editor-new-alt-text-textarea =
    .placeholder = Write your description here…
pdfjs-editor-new-alt-text-description = Short description for people who can’t see the image or when the image doesn’t load.
pdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.
pdfjs-editor-new-alt-text-disclaimer-learn-more-url = Learn more
pdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically
pdfjs-editor-new-alt-text-not-now-button = Not now
pdfjs-editor-new-alt-text-error-title = Couldn’t create alt text automatically
pdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.
pdfjs-editor-new-alt-text-error-close-button = Close
pdfjs-editor-new-alt-text-ai-model-downloading-progress = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)
    .aria-valuetext = Downloading alt text AI model ({ $downloadedSize } of { $totalSize } MB)
pdfjs-editor-new-alt-text-added-button =
    .aria-label = Alt text added
pdfjs-editor-new-alt-text-added-button-label = Alt text added
pdfjs-editor-new-alt-text-missing-button =
    .aria-label = Missing alt text
pdfjs-editor-new-alt-text-missing-button-label = Missing alt text
pdfjs-editor-new-alt-text-to-review-button =
    .aria-label = Review alt text
pdfjs-editor-new-alt-text-to-review-button-label = Review alt text
pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Created automatically: { $generatedAltText }
pdfjs-image-alt-text-settings-button =
    .title = Image alt text settings
pdfjs-image-alt-text-settings-button-label = Image alt text settings
pdfjs-editor-alt-text-settings-dialog-label = Image alt text settings
pdfjs-editor-alt-text-settings-automatic-title = Automatic alt text
pdfjs-editor-alt-text-settings-create-model-button-label = Create alt text automatically
pdfjs-editor-alt-text-settings-create-model-description = Suggests descriptions to help people who can’t see the image or when the image doesn’t load.
pdfjs-editor-alt-text-settings-editor-title = Alt text editor
pdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image
pdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.
pdfjs-editor-alt-text-settings-close-button = Close
pdfjs-editor-highlight-added-alert = Highlight added
pdfjs-editor-freetext-added-alert = Text added
pdfjs-editor-ink-added-alert = Drawing added
pdfjs-editor-stamp-added-alert = Image added
pdfjs-editor-signature-added-alert = Signature added
pdfjs-editor-undo-bar-message-highlight = Highlight removed
pdfjs-editor-undo-bar-message-freetext = Text removed
pdfjs-editor-undo-bar-message-ink = Drawing removed
pdfjs-editor-undo-bar-message-stamp = Image removed
pdfjs-editor-undo-bar-message-signature = Signature removed
pdfjs-editor-undo-bar-message-comment = Comment removed
pdfjs-editor-undo-bar-message-multiple =
    { $count ->
        [one] { $count } annotation removed
       *[other] { $count } annotations removed
    }
pdfjs-editor-undo-bar-undo-button =
    .title = Undo
pdfjs-editor-undo-bar-undo-button-label = Undo
pdfjs-editor-undo-bar-close-button =
    .title = Close
pdfjs-editor-undo-bar-close-button-label = Close
pdfjs-editor-add-signature-dialog-label = This modal allows the user to create a signature to add to a PDF document. The user can edit the name (which also serves as the alt text), and optionally save the signature for repeated use.
pdfjs-editor-add-signature-dialog-title = Add a signature
pdfjs-editor-add-signature-type-button = Type
    .title = Type
pdfjs-editor-add-signature-draw-button = Draw
    .title = Draw
pdfjs-editor-add-signature-image-button = Image
    .title = Image
pdfjs-editor-add-signature-type-input =
    .aria-label = Type your signature
    .placeholder = Type your signature
pdfjs-editor-add-signature-draw-placeholder = Draw your signature
pdfjs-editor-add-signature-draw-thickness-range-label = Thickness
pdfjs-editor-add-signature-draw-thickness-range =
    .title = Drawing thickness: { $thickness }
pdfjs-editor-add-signature-image-placeholder = Drag a file here to upload
pdfjs-editor-add-signature-image-browse-link =
    { PLATFORM() ->
        [macos] Or choose image files
       *[other] Or browse image files
    }
pdfjs-editor-add-signature-description-label = Description (alt text)
pdfjs-editor-add-signature-description-input =
    .title = Description (alt text)
pdfjs-editor-add-signature-description-default-when-drawing = Signature
pdfjs-editor-add-signature-clear-button-label = Clear signature
pdfjs-editor-add-signature-clear-button =
    .title = Clear signature
pdfjs-editor-add-signature-save-checkbox = Save signature
pdfjs-editor-add-signature-save-warning-message = You’ve reached the limit of 5 saved signatures. Remove one to save more.
pdfjs-editor-add-signature-image-upload-error-title = Couldn’t upload image
pdfjs-editor-add-signature-image-upload-error-description = Check your network connection or try another image.
pdfjs-editor-add-signature-image-no-data-error-title = Can’t convert this image into a signature
pdfjs-editor-add-signature-image-no-data-error-description = Please try uploading a different image.
pdfjs-editor-add-signature-error-close-button = Close
pdfjs-editor-add-signature-cancel-button = Cancel
pdfjs-editor-add-signature-add-button = Add
pdfjs-editor-delete-signature-button1 =
    .title = Remove saved signature
pdfjs-editor-delete-signature-button-label1 = Remove saved signature
pdfjs-editor-add-signature-edit-button-label = Edit description
pdfjs-editor-edit-signature-dialog-title = Edit description
pdfjs-editor-edit-signature-update-button = Update
pdfjs-show-comment-button =
    .title = Show comment
pdfjs-editor-edit-comment-popup-button-label = Edit comment
pdfjs-editor-edit-comment-popup-button =
    .title = Edit comment
pdfjs-editor-delete-comment-popup-button-label = Remove comment
pdfjs-editor-delete-comment-popup-button =
    .title = Remove comment
pdfjs-editor-edit-comment-dialog-title-when-editing = Edit comment
pdfjs-editor-edit-comment-dialog-save-button-when-editing = Update
pdfjs-editor-edit-comment-dialog-title-when-adding = Add comment
pdfjs-editor-edit-comment-dialog-save-button-when-adding = Add
pdfjs-editor-edit-comment-dialog-text-input =
    .placeholder = Start typing…
pdfjs-editor-edit-comment-dialog-cancel-button = Cancel
pdfjs-editor-add-comment-button =
    .title = Add comment
pdfjs-toggle-views-manager-button1 =
    .title = Manage pages
pdfjs-toggle-views-manager-notification-button =
    .title = Toggle Sidebar (document contains thumbnails/outline/attachments/layers)
pdfjs-toggle-views-manager-button1-label = Manage pages
pdfjs-views-manager-sidebar =
    .aria-label = Sidebar
pdfjs-views-manager-sidebar-resizer =
    .aria-label = Sidebar resizer
pdfjs-views-manager-view-selector-button =
    .title = Views
pdfjs-views-manager-view-selector-button-label = Views
pdfjs-views-manager-pages-title = Pages
pdfjs-views-manager-outlines-title1 = Document outline
    .title = Document outline (double-click to expand/collapse all items)
pdfjs-views-manager-attachments-title = Attachments
pdfjs-views-manager-layers-title1 = Layers
    .title = Layers (double-click to reset all layers to the default state)
pdfjs-views-manager-pages-option-label = Pages
pdfjs-views-manager-outlines-option-label = Document outline
pdfjs-views-manager-attachments-option-label = Attachments
pdfjs-views-manager-layers-option-label = Layers
pdfjs-views-manager-add-file-button =
    .title = Add file
pdfjs-views-manager-add-file-button-label = Add file
pdfjs-views-manager-pages-status-action-label =
    { $count ->
        [one] { $count } selected
        *[other] { $count } selected
    }
pdfjs-views-manager-pages-status-none-action-label = Select pages
pdfjs-views-manager-pages-status-action-button-label = Manage
pdfjs-views-manager-pages-status-copy-button-label = Copy
pdfjs-views-manager-pages-status-cut-button-label = Cut
pdfjs-views-manager-pages-status-delete-button-label = Delete
pdfjs-views-manager-pages-status-export-selected-button-label = Export selected…
pdfjs-views-manager-status-undo-cut-label =
    { $count ->
        [one] 1 page cut
        *[other] { $count } pages cut
    }
pdfjs-views-manager-pages-status-undo-copy-label =
    { $count ->
        [one] 1 page copied
        *[other] { $count } pages copied
    }
pdfjs-views-manager-pages-status-undo-delete-label =
    { $count ->
        [one] 1 page deleted
        *[other] { $count } pages deleted
    }
pdfjs-views-manager-status-undo-button-label = Undo
pdfjs-views-manager-status-done-button-label = Done
pdfjs-views-manager-status-close-button =
    .title = Close
pdfjs-views-manager-status-close-button-label = Close
pdfjs-views-manager-paste-button-label = Paste
pdfjs-views-manager-paste-button-before =
    .title = Paste before the first page
pdfjs-views-manager-paste-button-after =
    .title = Paste after page { $page }
pdfjs-new-badge-content = NEW
pdfjs-views-manager-waiting-for-file = Uploading file…
pdfjs-digital-signature-properties-button =
    .title = Digital signature properties
    .aria-label = Digital signature properties
pdfjs-digital-signature-properties-button-label = Digital signature properties
pdfjs-digital-signature-properties-banner-verified = Document was signed with a valid digital signature
pdfjs-digital-signature-properties-banner-unknown =
    { $count ->
        [one] Document signed but { $count } digital signature could not be verified
       *[other] Document signed but { $count } digital signatures could not be verified
    }
pdfjs-digital-signature-properties-banner-untrusted =
    { $count ->
        [one] Document signed with { $count } certificate that is not trusted
       *[other] Document signed with { $count } certificates that are not trusted
    }
pdfjs-digital-signature-properties-banner-expired =
    { $count ->
        [one] Document signed with { $count } expired certificate
       *[other] Document signed with { $count } expired certificates
    }
pdfjs-digital-signature-properties-banner-invalid =
    { $count ->
        [one] Document has { $count } invalid digital signature
       *[other] Document has { $count } invalid digital signatures
    }
pdfjs-digital-signature-properties-banner-revoked =
    { $count ->
        [one] Document signed with { $count } revoked certificate
       *[other] Document signed with { $count } revoked certificates
    }
pdfjs-digital-signature-properties-status-verified = Status: Signature verified
pdfjs-digital-signature-properties-status-invalid = Status: Signature invalid
pdfjs-digital-signature-properties-status-unknown = Status: Unable to verify (unsupported)
pdfjs-digital-signature-properties-certificate-trusted = Certificate: Trusted ({ $issuer })
pdfjs-digital-signature-properties-certificate-unknown = Certificate: Unavailable
pdfjs-digital-signature-properties-certificate-untrusted = Certificate: Untrusted
pdfjs-digital-signature-properties-certificate-untrusted-unknown-issuer = Certificate: Unknown issuer ({ $issuer })
pdfjs-digital-signature-properties-certificate-untrusted-self-signed = Certificate: Self-signed ({ $issuer })
pdfjs-digital-signature-properties-certificate-untrusted-untrusted-issuer = Certificate: Untrusted issuer ({ $issuer })
pdfjs-digital-signature-properties-certificate-expired = Certificate: Expired
pdfjs-digital-signature-properties-certificate-expired-with-date = Certificate: Expired ({ DATETIME($dateObj, dateStyle: "medium") })
pdfjs-digital-signature-properties-certificate-revoked = Certificate: Revoked
pdfjs-digital-signature-properties-view-certificate = View certificate
pdfjs-digital-signature-properties-reason = Reason: { $reason }
pdfjs-digital-signature-properties-timestamp = Timestamp: { DATETIME($dateObj, dateStyle: "short", timeStyle: "medium") }
pdfjs-digital-signature-properties-sub-signatures =
    { $count ->
        [one] Sub-signature ({ $count })
       *[other] Sub-signatures ({ $count })
    }`);
}, qt(OH, A3);

let DJ = OH;

const FWi = 1e3,
  zWi = 50,
  UWi = 1e3;

function Nlt() {
  return document.location.hash;
}

var sF, Pc, _R, Jje, Zje, Vye, eDe, zAt, ffr, gfr, UAt, yfr, bfr;

class mfr {
  constructor({
    linkService: t,
    eventBus: n
  }) {
    qt(this, Pc);
    qt(this, sF, null);
    this.linkService = t, this.eventBus = n, this._initialized = !1, this._fingerprint = "", this.reset(), this.eventBus.on("pagesinit", () => {
      this._isPagesLoaded = !1, this.eventBus.on("pagesloaded", r => {
        this._isPagesLoaded = !!r.pagesCount;
      }, {
        once: !0,
        ...G2
      });
    }, G2);
  }
  initialize({
    fingerprint: t,
    resetHistory: n = !1,
    updateUrl: r = !1
  }) {
    if (!t || typeof t != "string") {
      console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
      return;
    }
    this._initialized && this.reset();
    const a = this._fingerprint !== "" && this._fingerprint !== t;
    this._fingerprint = t, this._updateUrl = r === !0, this._initialized = !0, Gt(this, Pc, yfr).call(this);
    const i = window.history.state;
    if (this._popStateInProgress = !1, this._blockHashChange = 0, this._currentHash = Nlt(), this._numPositionUpdates = 0, this._uid = this._maxUid = 0, this._destination = null, this._position = null, !Gt(this, Pc, Vye).call(this, i, !0) || n) {
      const {
        hash: s,
        page: l,
        rotation: d
      } = Gt(this, Pc, zAt).call(this, !0);
      if (!s || a || n) {
        Gt(this, Pc, _R).call(this, null, !0);
        return;
      }
      Gt(this, Pc, _R).call(this, {
        hash: s,
        page: l,
        rotation: d
      }, !0);
      return;
    }
    const o = i.destination;
    Gt(this, Pc, eDe).call(this, o, i.uid, !0), o.rotation !== void 0 && (this._initialRotation = o.rotation), o.dest ? (this._initialBookmark = JSON.stringify(o.dest), this._destination.page = null) : o.hash ? this._initialBookmark = o.hash : o.page && (this._initialBookmark = `page=${o.page}`);
  }
  reset() {
    this._initialized && (Gt(this, Pc, UAt).call(this), this._initialized = !1, Gt(this, Pc, bfr).call(this)), this._updateViewareaTimeout && (clearTimeout(this._updateViewareaTimeout), this._updateViewareaTimeout = null), this._initialBookmark = null, this._initialRotation = null;
  }
  push({
    namedDest: t = null,
    explicitDest: n,
    pageNumber: r
  }) {
    if (!this._initialized) return;
    if (t && typeof t != "string") {
      console.error(`PDFHistory.push: "${t}" is not a valid namedDest parameter.`);
      return;
    } else if (Array.isArray(n)) {
      if (!Gt(this, Pc, Zje).call(this, r) && (r !== null || this._destination)) {
        console.error(`PDFHistory.push: "${r}" is not a valid pageNumber parameter.`);
        return;
      }
    } else {
      console.error(`PDFHistory.push: "${n}" is not a valid explicitDest parameter.`);
      return;
    }
    const a = t || JSON.stringify(n);
    if (!a) return;
    let i = !1;
    if (this._destination && ($Wi(this._destination.hash, a) || GWi(this._destination.dest, n))) {
      if (this._destination.page) return;
      i = !0;
    }
    this._popStateInProgress && !i || (Gt(this, Pc, _R).call(this, {
      dest: n,
      hash: a,
      page: r,
      rotation: this.linkService.rotation
    }, i), this._popStateInProgress || (this._popStateInProgress = !0, Promise.resolve().then(() => {
      this._popStateInProgress = !1;
    })));
  }
  pushPage(t) {
    var n;
    if (this._initialized) {
      if (!Gt(this, Pc, Zje).call(this, t)) {
        console.error(`PDFHistory.pushPage: "${t}" is not a valid page number.`);
        return;
      }
      ((n = this._destination) == null ? void 0 : n.page) !== t && (this._popStateInProgress || (Gt(this, Pc, _R).call(this, {
        dest: null,
        hash: `page=${t}`,
        page: t,
        rotation: this.linkService.rotation
      }), this._popStateInProgress || (this._popStateInProgress = !0, Promise.resolve().then(() => {
        this._popStateInProgress = !1;
      }))));
    }
  }
  pushCurrentPosition() {
    !this._initialized || this._popStateInProgress || Gt(this, Pc, Jje).call(this);
  }
  back() {
    if (!this._initialized || this._popStateInProgress) return;
    const t = window.history.state;
    Gt(this, Pc, Vye).call(this, t) && t.uid > 0 && window.history.back();
  }
  forward() {
    if (!this._initialized || this._popStateInProgress) return;
    const t = window.history.state;
    Gt(this, Pc, Vye).call(this, t) && t.uid < this._maxUid && window.history.forward();
  }
  get popStateInProgress() {
    return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
  }
  get initialBookmark() {
    return this._initialized ? this._initialBookmark : null;
  }
  get initialRotation() {
    return this._initialized ? this._initialRotation : null;
  }
}

sF = new WeakMap(), Pc = new WeakSet(), _R = function (t, n = !1) {
  const r = n || !this._destination,
    a = {
      fingerprint: this._fingerprint,
      uid: r ? this._uid : this._uid + 1,
      destination: t
    };
  Gt(this, Pc, eDe).call(this, t, a.uid);
  let i;
  if (this._updateUrl && (t != null && t.hash)) {
    const {
      href: o,
      protocol: s
    } = document.location;
    s !== "file:" && (i = SHi(o, t.hash));
  }
  r ? window.history.replaceState(a, "", i) : window.history.pushState(a, "", i);
}, Jje = function (t = !1) {
  if (!this._position) return;
  let n = this._position;
  if (t && (n = Object.assign(Object.create(null), this._position), n.temporary = !0), !this._destination) {
    Gt(this, Pc, _R).call(this, n);
    return;
  }
  if (this._destination.temporary) {
    Gt(this, Pc, _R).call(this, n, !0);
    return;
  }
  if (this._destination.hash === n.hash || !this._destination.page && this._numPositionUpdates <= zWi) return;
  let r = !1;
  if (this._destination.page >= n.first && this._destination.page <= n.page) {
    if (this._destination.dest !== void 0 || !this._destination.first) return;
    r = !0;
  }
  Gt(this, Pc, _R).call(this, n, r);
}, Zje = function (t) {
  return Number.isInteger(t) && t > 0 && t <= this.linkService.pagesCount;
}, Vye = function (t, n = !1) {
  if (!t) return !1;
  if (t.fingerprint !== this._fingerprint) if (n) {
    if (typeof t.fingerprint != "string" || t.fingerprint.length !== this._fingerprint.length) return !1;
    const [r] = performance.getEntriesByType("navigation");
    if ((r == null ? void 0 : r.type) !== "reload") return !1;
  } else return !1;
  return !(!Number.isInteger(t.uid) || t.uid < 0 || t.destination === null || typeof t.destination != "object");
}, eDe = function (t, n, r = !1) {
  this._updateViewareaTimeout && (clearTimeout(this._updateViewareaTimeout), this._updateViewareaTimeout = null), r && (t != null && t.temporary) && delete t.temporary, this._destination = t, this._uid = n, this._maxUid = Math.max(this._maxUid, n), this._numPositionUpdates = 0;
}, zAt = function (t = !1) {
  const n = unescape(Nlt()).substring(1),
    r = tEe(n),
    a = r.get("nameddest") || "";
  let i = r.get("page") | 0;
  return (!Gt(this, Pc, Zje).call(this, i) || t && a.length > 0) && (i = null), {
    hash: n,
    page: i,
    rotation: this.linkService.rotation
  };
}, ffr = function ({
  location: t
}) {
  this._updateViewareaTimeout && (clearTimeout(this._updateViewareaTimeout), this._updateViewareaTimeout = null), this._position = {
    hash: t.pdfOpenParams.substring(1),
    page: this.linkService.page,
    first: t.pageNumber,
    rotation: t.rotation
  }, !this._popStateInProgress && (this._isPagesLoaded && this._destination && !this._destination.page && this._numPositionUpdates++, this._updateViewareaTimeout = setTimeout(() => {
    this._popStateInProgress || Gt(this, Pc, Jje).call(this, !0), this._updateViewareaTimeout = null;
  }, UWi));
}, gfr = function ({
  state: t
}) {
  const n = Nlt(),
    r = this._currentHash !== n;
  if (this._currentHash = n, !t) {
    this._uid++;
    const {
      hash: i,
      page: o,
      rotation: s
    } = Gt(this, Pc, zAt).call(this);
    Gt(this, Pc, _R).call(this, {
      hash: i,
      page: o,
      rotation: s
    }, !0);
    return;
  }
  if (!Gt(this, Pc, Vye).call(this, t)) return;
  this._popStateInProgress = !0, r && (this._blockHashChange++, VHi({
    target: window,
    name: "hashchange",
    delay: FWi
  }).then(() => {
    this._blockHashChange--;
  }));
  const a = t.destination;
  Gt(this, Pc, eDe).call(this, a, t.uid, !0), Vmr(a.rotation) && (this.linkService.rotation = a.rotation), a.dest ? this.linkService.goToDestination(a.dest) : a.hash ? this.linkService.setHash(a.hash) : a.page && (this.linkService.page = a.page), Promise.resolve().then(() => {
    this._popStateInProgress = !1;
  });
}, UAt = function () {
  (!this._destination || this._destination.temporary) && Gt(this, Pc, Jje).call(this);
}, yfr = function () {
  if (te(this, sF)) return;
  yt(this, sF, new AbortController());
  const {
    signal: t
  } = te(this, sF);
  this.eventBus.on("updateviewarea", Gt(this, Pc, ffr).bind(this), {
    signal: t,
    ...G2
  }), window.addEventListener("popstate", Gt(this, Pc, gfr).bind(this), {
    signal: t
  }), window.addEventListener("pagehide", Gt(this, Pc, UAt).bind(this), {
    signal: t
  });
}, bfr = function () {
  var t;
  (t = te(this, sF)) == null || t.abort(), yt(this, sF, null);
};

function $Wi(e, t) {
  return typeof e != "string" || typeof t != "string" ? !1 : e === t || tEe(e).get("nameddest") === t;
}

function GWi(e, t) {
  function n(r, a) {
    if (typeof r != typeof a || Array.isArray(r) || Array.isArray(a)) return !1;
    if (r !== null && typeof r == "object" && a !== null) {
      if (Object.keys(r).length !== Object.keys(a).length) return !1;
      for (const i in r) if (!n(r[i], a[i])) return !1;
      return !0;
    }
    return r === a || Number.isNaN(r) && Number.isNaN(a);
  }
  if (!(Array.isArray(e) && Array.isArray(t)) || e.length !== t.length) return !1;
  for (let r = 0, a = e.length; r < a; r++) if (!n(e[r], t[r])) return !1;
  return !0;
}

var K3e, Q3e, Y3e, X3e, J3e, rle;

class VWi {
  constructor(t) {
    qt(this, K3e, null);
    qt(this, Q3e, null);
    qt(this, Y3e, null);
    qt(this, X3e, null);
    qt(this, J3e, null);
    qt(this, rle);
    this.pageIndex = t.pageIndex, this.accessibilityManager = t.accessibilityManager, this.l10n = t.l10n, this.l10n || (this.l10n = new DJ()), this.annotationEditorLayer = null, this.div = null, this._cancelled = !1, yt(this, rle, t.uiManager), yt(this, K3e, t.annotationLayer || null), yt(this, J3e, t.textLayer || null), yt(this, Q3e, t.drawLayer || null), yt(this, Y3e, t.onAppend || null), yt(this, X3e, t.structTreeLayer || null);
  }
  updatePageIndex(t) {
    var n;
    this.pageIndex = t, (n = this.annotationEditorLayer) == null || n.updatePageIndex(t);
  }
  async render({
    viewport: t,
    intent: n = "display"
  }) {
    var o;
    if (n !== "display" || this._cancelled) return;
    const r = t.clone({
      dontFlip: !0
    });
    if (this.div) {
      this.annotationEditorLayer.update({
        viewport: r
      }), this.show();
      return;
    }
    const a = this.div = document.createElement("div");
    a.className = "annotationEditorLayer", a.hidden = !0, a.dir = te(this, rle).direction, (o = te(this, Y3e)) == null || o.call(this, a), this.annotationEditorLayer = new dHi({
      uiManager: te(this, rle),
      div: a,
      structTreeLayer: te(this, X3e),
      accessibilityManager: this.accessibilityManager,
      pageIndex: this.pageIndex,
      l10n: this.l10n,
      viewport: r,
      annotationLayer: te(this, K3e),
      textLayer: te(this, J3e),
      drawLayer: te(this, Q3e)
    });
    const i = {
      viewport: r,
      div: a,
      annotations: null,
      intent: n
    };
    await this.annotationEditorLayer.render(i), this.show();
  }
  update(t) {
    this.div && this.annotationEditorLayer.update({
      viewport: t.clone({
        dontFlip: !0
      })
    });
  }
  cancel() {
    this._cancelled = !0, this.div && this.annotationEditorLayer.destroy();
  }
  hide() {
    this.div && (this.annotationEditorLayer.pause(!0), this.div.hidden = !0);
  }
  show() {
    !this.div || this.annotationEditorLayer.isInvisible || (this.div.hidden = !1, this.annotationEditorLayer.pause(!1));
  }
}

K3e = new WeakMap(), Q3e = new WeakMap(), Y3e = new WeakMap(), X3e = new WeakMap(), J3e = new WeakMap(), rle = new WeakMap();

{
  var $At = new Map();
  const {
      maxTouchPoints: e,
      platform: t,
      userAgent: n
    } = navigator,
    r = /Android/.test(n);
  (/\b(?:iPad|iPhone|iPod)(?=;)/.test(n) || t === "MacIntel" && e > 1 || r) && $At.set("maxCanvasPixels", 5242880), r && $At.set("useSystemFonts", !1);
}

const ri = {
    BROWSER: 1,
    VIEWER: 2,
    API: 4,
    WORKER: 8,
    EVENT_DISPATCH: 16,
    PREFERENCE: 128
  },
  GAt = {
    BOOLEAN: 1,
    NUMBER: 2,
    OBJECT: 4,
    STRING: 8,
    UNDEFINED: 16
  },
  jlt = new Map([["allowedGlobalEvents", {
    value: null,
    kind: ri.BROWSER
  }], ["canvasMaxAreaInBytes", {
    value: -1,
    kind: ri.BROWSER + ri.API
  }], ["isInAutomation", {
    value: !1,
    kind: ri.BROWSER
  }], ["localeProperties", {
    value: {
      lang: navigator.language || "en-US"
    },
    kind: ri.BROWSER
  }], ["maxCanvasDim", {
    value: 32767,
    kind: ri.BROWSER + ri.VIEWER
  }], ["nimbusDataStr", {
    value: "",
    kind: ri.BROWSER
  }], ["supportsCaretBrowsingMode", {
    value: !1,
    kind: ri.BROWSER
  }], ["supportsDocumentFonts", {
    value: !0,
    kind: ri.BROWSER
  }], ["supportsDownloading", {
    value: !0,
    kind: ri.BROWSER
  }], ["supportsIntegratedFind", {
    value: !1,
    kind: ri.BROWSER
  }], ["supportsMouseWheelZoomCtrlKey", {
    value: !0,
    kind: ri.BROWSER
  }], ["supportsMouseWheelZoomMetaKey", {
    value: !0,
    kind: ri.BROWSER
  }], ["supportsPinchToZoom", {
    value: !0,
    kind: ri.BROWSER
  }], ["supportsPrinting", {
    value: !0,
    kind: ri.BROWSER
  }], ["toolbarDensity", {
    value: 0,
    kind: ri.BROWSER + ri.EVENT_DISPATCH
  }], ["altTextLearnMoreUrl", {
    value: "",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["annotationEditorMode", {
    value: 0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["annotationMode", {
    value: 2,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["capCanvasAreaFactor", {
    value: 200,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["commentLearnMoreUrl", {
    value: "",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["cursorToolOnLoad", {
    value: 0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["debuggerSrc", {
    value: "./debugger.mjs",
    kind: ri.VIEWER
  }], ["defaultUrl", {
    value: "compressed.tracemonkey-pldi-09.pdf",
    kind: ri.VIEWER
  }], ["defaultZoomDelay", {
    value: 400,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["defaultZoomValue", {
    value: "",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["disableHistory", {
    value: !1,
    kind: ri.VIEWER
  }], ["disablePageLabels", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["disablePreferences", {
    value: !1,
    kind: ri.VIEWER
  }], ["enableAltText", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableAltTextModelDownload", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE + ri.EVENT_DISPATCH
  }], ["enableAutoLinking", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableComment", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableDetailCanvas", {
    value: !0,
    kind: ri.VIEWER
  }], ["enableGuessAltText", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE + ri.EVENT_DISPATCH
  }], ["enableHighlightFloatingButton", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableMerge", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableNewAltTextWhenAddingImage", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableNewBadge", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableNova", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableOptimizedPartialRendering", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enablePermissions", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enablePrintAutoRotate", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableScripting", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableSelectionRendering", {
    value: !0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableSignatureEditor", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableSignatureVerification", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableSplitMerge", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["enableUpdatedAddImage", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["externalLinkRel", {
    value: "noopener noreferrer nofollow",
    kind: ri.VIEWER
  }], ["externalLinkTarget", {
    value: 0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["highlightEditorColors", {
    value: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F,yellow_HCM=#FFFFCC,green_HCM=#53FFBC,blue_HCM=#80EBFF,pink_HCM=#F6B8FF,red_HCM=#C50043",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["historyUpdateUrl", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["ignoreDestinationZoom", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["imageResourcesPath", {
    value: "./images/",
    kind: ri.VIEWER
  }], ["imagesRightClickMinSize", {
    value: -1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["maxCanvasPixels", {
    value: 2 ** 25,
    kind: ri.VIEWER
  }], ["minDurationToUpdateCanvas", {
    value: 500,
    kind: ri.VIEWER
  }], ["forcePageColors", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["pageColorsBackground", {
    value: "Canvas",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["pageColorsForeground", {
    value: "CanvasText",
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["pdfBugEnabled", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["postMessageAfterPrintCallback", {
    value: !1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["printResolution", {
    value: 150,
    kind: ri.VIEWER
  }], ["sandboxBundleSrc", {
    value: "../build/pdf.sandbox.mjs",
    kind: ri.VIEWER
  }], ["sidebarViewOnLoad", {
    value: -1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["scrollModeOnLoad", {
    value: -1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["spreadModeOnLoad", {
    value: -1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["textLayerMode", {
    value: 1,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["viewerCssTheme", {
    value: 0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["viewOnLoad", {
    value: 0,
    kind: ri.VIEWER + ri.PREFERENCE
  }], ["cMapPacked", {
    value: !0,
    kind: ri.API
  }], ["cMapUrl", {
    value: "../web/cmaps/",
    kind: ri.API
  }], ["disableAutoFetch", {
    value: !1,
    kind: ri.API + ri.PREFERENCE
  }], ["disableFontFace", {
    value: !1,
    kind: ri.API + ri.PREFERENCE
  }], ["disableRange", {
    value: !1,
    kind: ri.API + ri.PREFERENCE
  }], ["disableStream", {
    value: !1,
    kind: ri.API + ri.PREFERENCE
  }], ["docBaseUrl", {
    value: "",
    kind: ri.API
  }], ["enableHWA", {
    value: !0,
    kind: ri.API + ri.PREFERENCE
  }], ["enableWebGPU", {
    value: !0,
    kind: ri.API + ri.PREFERENCE
  }], ["enableXfa", {
    value: !0,
    kind: ri.API + ri.PREFERENCE
  }], ["fontExtraProperties", {
    value: !1,
    kind: ri.API
  }], ["iccUrl", {
    value: "../web/iccs/",
    kind: ri.API
  }], ["isOffscreenCanvasSupported", {
    value: !0,
    kind: ri.API
  }], ["maxImageSize", {
    value: -1,
    kind: ri.API
  }], ["pdfBug", {
    value: !1,
    kind: ri.API
  }], ["standardFontDataUrl", {
    value: "../web/standard_fonts/",
    kind: ri.API
  }], ["useSystemFonts", {
    value: void 0,
    kind: ri.API,
    type: GAt.BOOLEAN + GAt.UNDEFINED
  }], ["verbosity", {
    value: 1,
    kind: ri.API
  }], ["wasmUrl", {
    value: "../web/wasm/",
    kind: ri.API
  }], ["workerPort", {
    value: null,
    kind: ri.WORKER
  }], ["workerSrc", {
    value: "../build/pdf.worker.mjs",
    kind: ri.WORKER
  }]]);

var lF;

const O8 = class O8 {
  static get(t) {
    return te(this, lF).get(t);
  }
  static getAll(t = null, n = !1) {
    const r = Object.create(null);
    for (const [a, i] of jlt) t && !(t & i.kind) || (r[a] = n ? i.value : te(this, lF).get(a));
    return r;
  }
  static set(t, n) {
    this.setAll({
      [t]: n
    });
  }
  static setAll(t, n = !1) {
    this._hasInvokedSet || (this._hasInvokedSet = !0);
    let r;
    for (const a in t) {
      const i = jlt.get(a),
        o = t[a];
      if (!i || !(typeof o == typeof i.value || GAt[(typeof o).toUpperCase()] & i.type)) continue;
      const {
        kind: s
      } = i;
      n && !(s & ri.BROWSER || s & ri.PREFERENCE) || (this.eventBus && s & ri.EVENT_DISPATCH && (r ?? (r = new Map())).set(a, o), te(this, lF).set(a, o));
    }
    r == null || r.forEach((a, i) => {
      this.eventBus.dispatch(i.toLowerCase(), {
        source: this,
        value: a
      });
    });
  }
};

lF = new WeakMap(), On(O8, "eventBus"), qt(O8, lF, new Map()), (() => {
  for (const [t, n] of jlt) te(O8, lF).set(t, n.value);
  for (const [t, n] of $At) te(O8, lF).set(t, n);
  O8._hasInvokedSet = !1, O8._checkDisablePreferences = () => O8.get("disablePreferences") ? !0 : (O8._hasInvokedSet && console.warn('The Preferences may override manually set AppOptions; please use the "disablePreferences"-option to prevent that.'), !1);
})();

let Y1e = O8;

function zpn({
  width: e,
  height: t,
  left: n,
  top: r
}, a) {
  if (e === 0 || t === 0) return null;
  const i = a.textLayer.div.getBoundingClientRect(),
    o = a.getPagePoint(n - i.left, r - i.top),
    s = a.getPagePoint(n - i.left + e, r - i.top + t);
  return Uzt.normalizeRect([o[0], o[1], s[0], s[1]]);
}

function HWi(e, t) {
  const n = e.getClientRects();
  if (n.length === 1) return {
    rect: zpn(n[0], t)
  };
  const r = [1 / 0, 1 / 0, -1 / 0, -1 / 0],
    a = [];
  let i = 0;
  for (const o of n) {
    const s = zpn(o, t);
    s !== null && (a[i] = a[i + 4] = s[0], a[i + 1] = a[i + 3] = s[3], a[i + 2] = a[i + 6] = s[2], a[i + 5] = a[i + 7] = s[1], Uzt.rectBoundingBox(...s, r), i += 8);
  }
  return {
    quadPoints: a,
    rect: r
  };
}

function Upn(e, t) {
  let n = e;
  do {
    if (n.nodeType === Node.TEXT_NODE) {
      const r = n.textContent.length;
      if (t <= r) return [n, t];
      t -= r;
    } else if (n.firstChild) {
      n = n.firstChild;
      continue;
    }
    for (; !n.nextSibling && n !== e;) n = n.parentNode;
    n !== e && (n = n.nextSibling);
  } while (n !== e);
  throw new Error("Offset is bigger than container's contents length.");
}

function WWi({
  url: e,
  index: t,
  length: n
}, r, a) {
  const i = r._textHighlighter,
    [{
      begin: o,
      end: s
    }] = i._convertMatches([t], [n]),
    l = new Range();
  return l.setStart(...Upn(i.textDivs[o.divIdx], o.offset)), l.setEnd(...Upn(i.textDivs[s.divIdx], s.offset)), {
    id: `inferred_link_${a}`,
    unsafeUrl: e,
    url: e,
    annotationType: Umr.LINK,
    rotation: 0,
    ...HWi(l, r),
    borderStyle: null
  };
}

var cVe, Z3e, e4e;

class tDe {
  static findLinks(t) {
    var o;
    te(this, Z3e) ?? yt(this, Z3e, new RegExp("\\b(?:https?:\\/\\/|mailto:|www\\.)(?:[\\S--[\\p{P}<>]]|\\/|[\\S--[\\[\\]]]+[\\S--[\\p{P}<>]])+|(?=\\p{L})[\\S--[@\\p{Ps}\\p{Pe}<>]]{1,64}@([\\S--[[\\p{P}--\\-]<>]]{1,63}(?:\\.[\\S--[[\\p{P}--\\-]<>]]{1,63})+)", "gv"));
    const [n, r] = Qje(t, {
        ignoreDashEOL: !0
      }),
      a = n.matchAll(te(this, Z3e)),
      i = [];
    for (const s of a) {
      const [l, d] = s;
      let u;
      if (l.startsWith("www.") || l.startsWith("http://") || l.startsWith("https://")) u = l;else if (d) {
        const p = (o = URL.parse(`http://${d}`)) == null ? void 0 : o.hostname;
        if (!p || (te(this, e4e) ?? yt(this, e4e, /\.\d+$/), te(this, e4e).test(p))) continue;
      }
      u ?? (u = l.startsWith("mailto:") ? l : `mailto:${l}`);
      const h = $mr(u, null, {
        addDefaultProtocol: !0
      });
      if (h) {
        const [p, m] = qmr(r, s.index, l.length);
        i.push({
          url: h.href,
          index: p,
          length: m
        });
      }
    }
    return i;
  }
  static processLinks(t) {
    return this.findLinks(t._textHighlighter.textContentItemsStr.join(`
`)).map(n => WWi(n, t, rm(this, cVe)._++));
  }
}

cVe = new WeakMap(), Z3e = new WeakMap(), e4e = new WeakMap(), qt(tDe, cVe, 0), qt(tDe, Z3e), qt(tDe, e4e);

const Su = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};

class qWi {
  constructor() {
    On(this, "renderingId", "");
    On(this, "renderTask", null);
    On(this, "resume", null);
  }
  get renderingState() {
    throw new Error("Abstract getter `renderingState` accessed");
  }
  set renderingState(t) {
    throw new Error("Abstract setter `renderingState` accessed");
  }
  async draw() {
    throw new Error("Not implemented: draw");
  }
}

var cF, ale, ile, IN, dF, CN, dVe, t4e, VAt;

class vfr extends qWi {
  constructor(n) {
    super();
    qt(this, t4e);
    qt(this, cF, null);
    qt(this, ale, null);
    qt(this, ile, Su.INITIAL);
    qt(this, IN, null);
    qt(this, dF, 0);
    qt(this, CN, null);
    On(this, "canvas", null);
    On(this, "div", null);
    On(this, "enableOptimizedPartialRendering", !1);
    On(this, "enableSelectionRendering", !0);
    On(this, "imagesRightClickMinSize", -1);
    On(this, "eventBus", null);
    On(this, "id", null);
    On(this, "imageCoordinates", null);
    On(this, "pageColors", null);
    On(this, "recordedBBoxes", null);
    On(this, "renderingQueue", null);
    qt(this, dVe, n => {
      var r;
      if ((r = te(this, IN)) == null || r.call(this, !1), this.renderingQueue && !this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = Su.PAUSED, this.resume = () => {
          this.renderingState = Su.RUNNING, n();
        };
        return;
      }
      n();
    });
    this.eventBus = n.eventBus, this.id = n.id, this.pageColors = n.pageColors || null, this.renderingQueue = n.renderingQueue, this.enableOptimizedPartialRendering = n.enableOptimizedPartialRendering ?? !1, this.enableSelectionRendering = n.enableSelectionRendering !== !1 && zzt.isBackdropFilterSupported, this.imagesRightClickMinSize = n.imagesRightClickMinSize ?? -1, this.minDurationToUpdateCanvas = n.minDurationToUpdateCanvas ?? 500;
  }
  get renderingState() {
    return te(this, ile);
  }
  set renderingState(n) {
    var r;
    if (n !== te(this, ile)) switch (yt(this, ile, n), te(this, cF) && (clearTimeout(te(this, cF)), yt(this, cF, null)), n) {
      case Su.PAUSED:
        this.div.classList.remove("loading"), yt(this, dF, 0), (r = te(this, IN)) == null || r.call(this, !1);
        break;
      case Su.RUNNING:
        this.div.classList.add("loadingIcon"), yt(this, cF, setTimeout(() => {
          this.div.classList.add("loading"), yt(this, cF, null);
        }, 0)), yt(this, dF, Date.now());
        break;
      case Su.INITIAL:
      case Su.FINISHED:
        this.div.classList.remove("loadingIcon", "loading"), yt(this, dF, 0);
        break;
    }
  }
  _createCanvas(n, r = !1) {
    const {
        pageColors: a
      } = this,
      i = !!(a != null && a.background && (a != null && a.foreground)),
      o = this.canvas,
      s = !o && !i && !r;
    let l = this.canvas = document.createElement("canvas");
    return yt(this, IN, d => {
      if (s) {
        let u = te(this, CN);
        if (!d && this.minDurationToUpdateCanvas > 0) {
          if (Date.now() - te(this, dF) < this.minDurationToUpdateCanvas) return;
          u || (u = yt(this, CN, l), l = this.canvas = l.cloneNode(!1), n(l));
        }
        if (u) {
          l.getContext("2d", {
            alpha: !1
          }).drawImage(u, 0, 0), d ? Gt(this, t4e, VAt).call(this) : yt(this, dF, Date.now());
          return;
        }
        n(l), yt(this, IN, null);
        return;
      }
      d && (o ? (o.replaceWith(l), o.width = o.height = 0) : n(l));
    }), {
      canvas: l,
      prevCanvas: o
    };
  }
  _resetCanvas() {
    const {
      canvas: n
    } = this;
    n && (n.remove(), n.width = n.height = 0, this.canvas = null, Gt(this, t4e, VAt).call(this));
  }
  async _drawCanvas(n, r, a) {
    var s, l;
    const i = this.renderTask = this.pdfPage.render(n);
    i.onContinue = te(this, dVe), i.onError = d => {
      d instanceof SAt && (r(), yt(this, ale, null));
    };
    let o = null;
    try {
      await i.promise, (s = te(this, IN)) == null || s.call(this, !0);
    } catch (d) {
      if (d instanceof SAt) return;
      o = d, (l = te(this, IN)) == null || l.call(this, !0);
    } finally {
      yt(this, ale, o), i === this.renderTask && (this.renderTask = null, this.enableOptimizedPartialRendering && (this.recordedBBoxes ?? (this.recordedBBoxes = i.recordedBBoxes)), this.imagesRightClickMinSize !== -1 && (this.imageCoordinates ?? (this.imageCoordinates = this.pdfPage.imageCoordinates)));
    }
    if (this.renderingState = Su.FINISHED, a(i), o) throw o;
  }
  cancelRendering({
    cancelExtraDelay: n = 0
  } = {}) {
    this.renderTask && (this.renderTask.cancel(n), this.renderTask = null), this.resume = null;
  }
  dispatchPageRender() {
    this.eventBus.dispatch("pagerender", {
      source: this,
      pageNumber: this.id
    });
  }
  dispatchPageRendered(n, r) {
    this.eventBus.dispatch("pagerendered", {
      source: this,
      pageNumber: this.id,
      cssTransform: n,
      isDetailView: r,
      timestamp: performance.now(),
      error: te(this, ale)
    });
  }
}

cF = new WeakMap(), ale = new WeakMap(), ile = new WeakMap(), IN = new WeakMap(), dF = new WeakMap(), CN = new WeakMap(), dVe = new WeakMap(), t4e = new WeakSet(), VAt = function () {
  te(this, CN) && (te(this, CN).width = te(this, CN).height = 0, yt(this, CN, null));
};

var EN;

class KWi {
  constructor(t) {
    qt(this, EN, null);
    this.pageIndex = t.pageIndex, this.textLayer = t.textLayer || null, this.filterFactory = t.filterFactory || null, this.pageColors = t.pageColors || null;
  }
  async render({
    intent: t = "display"
  }) {
    t !== "display" || te(this, EN) || this._cancelled || yt(this, EN, new pHi({
      pageIndex: this.pageIndex,
      textLayer: this.textLayer,
      filterFactory: this.filterFactory,
      pageColors: this.pageColors
    }));
  }
  cancel() {
    var t;
    this._cancelled = !0, (t = te(this, EN)) == null || t.destroy(), yt(this, EN, null);
  }
  setParent(t) {
    var n;
    (n = te(this, EN)) == null || n.setParent(t);
  }
  getDrawLayer() {
    return te(this, EN);
  }
}

EN = new WeakMap();

var B4, uVe, wfr;

class QWi extends vfr {
  constructor({
    pageView: n
  }) {
    super(n);
    qt(this, uVe);
    qt(this, B4, null);
    On(this, "renderingCancelled", !1);
    this.pageView = n, this.renderingId = "detail" + this.id, this.div = n.div;
  }
  setPdfPage(n) {
    this.pageView.setPdfPage(n);
  }
  get pdfPage() {
    return this.pageView.pdfPage;
  }
  get renderingState() {
    return super.renderingState;
  }
  set renderingState(n) {
    this.renderingCancelled = !1, super.renderingState = n;
  }
  reset({
    keepCanvas: n = !1
  } = {}) {
    const r = this.renderingCancelled || this.renderingState === Su.RUNNING || this.renderingState === Su.PAUSED;
    this.cancelRendering(), this.renderingState = Su.INITIAL, this.renderingCancelled = r, n || this._resetCanvas();
  }
  update({
    visibleArea: n = null,
    underlyingViewUpdated: r = !1
  } = {}) {
    if (r) {
      this.cancelRendering(), this.renderingState = Su.INITIAL;
      return;
    }
    if (!Gt(this, uVe, wfr).call(this, n)) return;
    const {
        viewport: a,
        maxCanvasPixels: i,
        capCanvasAreaFactor: o
      } = this.pageView,
      s = n.maxX - n.minX,
      l = n.maxY - n.minY,
      d = s * l * Kje.pixelRatio ** 2,
      h = (Math.sqrt(Kje.capPixels(i, o) / d) - 1) / 2;
    let p = Math.min(1, h);
    p < 0 && (p = 0);
    const m = s * p,
      f = l * p,
      y = Math.max(0, n.minX - m),
      b = Math.min(a.width, n.maxX + m),
      v = Math.max(0, n.minY - f),
      _ = Math.min(a.height, n.maxY + f),
      w = b - y,
      k = _ - v;
    yt(this, B4, {
      minX: y,
      minY: v,
      width: w,
      height: k,
      scale: a.scale
    }), this.reset({
      keepCanvas: !0
    });
  }
  _getRenderingContext(n, r) {
    const a = this.pageView._getRenderingContext(n, r, !1),
      i = this.pdfPage.recordedBBoxes;
    if (!i || !this.enableOptimizedPartialRendering) return a;
    const {
        viewport: {
          width: o,
          height: s
        }
      } = this.pageView,
      {
        width: l,
        height: d,
        minX: u,
        minY: h
      } = te(this, B4),
      p = u / o,
      m = h / s,
      f = (u + l) / o,
      y = (h + d) / s;
    return {
      ...a,
      operationsFilter(b) {
        return i.isEmpty(b) ? !1 : i.minX(b) <= f && i.maxX(b) >= p && i.minY(b) <= y && i.maxY(b) >= m;
      }
    };
  }
  async draw() {
    if (this.pageView.detailView !== this) return;
    const n = this.pageView.renderingState === Su.FINISHED || this.renderingState === Su.FINISHED;
    this.renderingState !== Su.INITIAL && (console.error("Must be in new state before drawing"), this.reset());
    const {
      div: r,
      pdfPage: a,
      viewport: i
    } = this.pageView;
    if (!a) throw this.renderingState = Su.FINISHED, new Error("pdfPage is not loaded");
    this.renderingState = Su.RUNNING;
    const o = this.pageView._ensureCanvasWrapper(),
      {
        canvas: s,
        prevCanvas: l
      } = this._createCanvas(b => {
        var v;
        ((v = o.firstElementChild) == null ? void 0 : v.tagName) === "CANVAS" ? o.firstElementChild.after(b) : o.prepend(b);
      }, n);
    s.ariaHidden = !0, this.enableOptimizedPartialRendering && (s.className = "detailView");
    const {
        width: d,
        height: u
      } = i,
      h = te(this, B4),
      {
        pixelRatio: p
      } = Kje,
      m = [p, 0, 0, p, -h.minX * p, -h.minY * p];
    s.width = h.width * p, s.height = h.height * p;
    const {
      style: f
    } = s;
    f.width = `${h.width * 100 / d}%`, f.height = `${h.height * 100 / u}%`, f.top = `${h.minY * 100 / u}%`, f.left = `${h.minX * 100 / d}%`;
    const y = this._drawCanvas(this._getRenderingContext(s, m), () => {
      var b;
      (b = this.canvas) == null || b.remove(), this.canvas = l;
    }, () => {
      this.pageView._refreshAnnotationLayer(), this.dispatchPageRendered(!1, !0);
    });
    return r.setAttribute("data-loaded", !0), this.dispatchPageRender(), y;
  }
}

B4 = new WeakMap(), uVe = new WeakSet(), wfr = function (n) {
  if (!te(this, B4)) return !0;
  const r = te(this, B4).minX,
    a = te(this, B4).minY,
    i = te(this, B4).width + r,
    o = te(this, B4).height + a;
  if (n.minX < r || n.minY < a || n.maxX > i || n.maxY > o) return !0;
  const {
    width: s,
    height: l,
    scale: d
  } = this.pageView.viewport;
  if (te(this, B4).scale !== d) return !0;
  const u = n.minX - r,
    h = i - n.maxX,
    p = n.minY - a,
    m = o - n.maxY,
    f = .5,
    y = (1 + f) / f;
  return r > 0 && h / u > y || i < s && u / h > y || a > 0 && m / p > y || o < l && p / m > y;
};

const $pn = {
    Document: null,
    DocumentFragment: null,
    Part: "group",
    Art: "article",
    Sect: "group",
    Div: "group",
    BlockQuote: "blockquote",
    Aside: "note",
    NonStruct: "none",
    P: "paragraph",
    H: "heading",
    Title: null,
    FENote: "note",
    Sub: "group",
    Lbl: null,
    Span: null,
    Em: "emphasis",
    Strong: "strong",
    Note: "note",
    Code: "code",
    Link: "link",
    Annot: "note",
    Form: "form",
    Ruby: null,
    RB: null,
    RT: null,
    RP: null,
    Warichu: null,
    WT: null,
    WP: null,
    L: "list",
    LI: "listitem",
    LBody: null,
    Table: "table",
    TR: "row",
    TH: "columnheader",
    TD: "cell",
    THead: "rowgroup",
    TBody: "rowgroup",
    TFoot: "rowgroup",
    Caption: "caption",
    Figure: "figure",
    Formula: null,
    Artifact: null
  },
  YWi = new Set(["caption", "code", "emphasis", "generic", "none", "paragraph", "strong"]),
  xfr = new Set(["math", "merror", "mfrac", "mi", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mprescripts", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msubsup", "msup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "semantics"]),
  x$e = "http://www.w3.org/1998/Math/MathML";

class Gpn {
  static get sanitizer() {
    return uAe(this, "sanitizer", zzt.isSanitizerSupported ? new Sanitizer({
      elements: Array.from(xfr.keys(), t => ({
        name: t,
        namespace: x$e
      })),
      replaceWithChildrenElements: [{
        name: "maction",
        namespace: x$e
      }],
      attributes: ["dir", "displaystyle", "mathbackground", "mathcolor", "mathsize", "scriptlevel", "encoding", "display", "linethickness", "intent", "arg", "form", "fence", "separator", "lspace", "rspace", "stretchy", "symmetric", "maxsize", "minsize", "largeop", "movablelimits", "width", "height", "depth", "voffset", "accent", "accentunder", "columnspan", "rowspan"],
      comments: !1
    }) : null);
  }
}

const XWi = /^H(\d+)$/;

var ole, NC, sle, n4e, lle, cle, hVe, r4e, a4e, dle, ule, uF, hF, w6, Nf, HAt, WAt, qAt, _fr, KAt, kfr, QAt, YAt;

class Vzt {
  constructor(t, n) {
    qt(this, Nf);
    qt(this, ole);
    qt(this, NC, null);
    qt(this, sle);
    qt(this, n4e, new Set());
    qt(this, lle, new Map());
    qt(this, cle, new Map());
    qt(this, hVe, 0);
    qt(this, r4e, `pdfjs_internal_struct_${fHi()}_`);
    qt(this, a4e, new Map());
    qt(this, dle, new Map());
    qt(this, ule);
    qt(this, uF, null);
    qt(this, hF, null);
    qt(this, w6, null);
    yt(this, ole, t.getStructTree()), yt(this, ule, n);
  }
  async render() {
    var a;
    if (te(this, sle)) return te(this, sle);
    const {
      promise: t,
      resolve: n,
      reject: r
    } = Promise.withResolvers();
    yt(this, sle, t);
    try {
      const i = await te(this, ole);
      Gt(this, Nf, HAt).call(this, i), Gt(this, Nf, WAt).call(this, i), yt(this, NC, Gt(this, Nf, YAt).call(this, i));
    } catch (i) {
      r(i);
    }
    return yt(this, ole, null), (a = te(this, NC)) == null || a.classList.add("structTree"), n(te(this, NC)), t;
  }
  async getAriaAttributes(t, {
    enableLinkOwnership: n = !1
  } = {}) {
    try {
      await this.render();
      const r = te(this, cle).get(t);
      if (r && n) {
        const {
          element: a,
          ids: i
        } = r;
        a.removeAttribute("role"), i.length > 0 && te(this, lle).getOrInsertComputed(t, ppn).set("aria-owns", i.join(" ")), te(this, cle).delete(t);
      }
      return te(this, lle).get(t);
    } catch {}
    return null;
  }
  async getAnnotationIds() {
    try {
      return await this.render(), te(this, n4e);
    } catch {}
    return null;
  }
  hide() {
    te(this, NC) && !te(this, NC).hidden && (te(this, NC).hidden = !0);
  }
  show() {
    var t;
    (t = te(this, NC)) != null && t.hidden && (te(this, NC).hidden = !1);
  }
  updateTextLayer() {
    var t;
    if (te(this, uF)) {
      for (const [n, r] of te(this, uF)) (t = document.getElementById(n)) == null || t.append(r);
      te(this, uF).clear(), yt(this, uF, null);
    }
    if (te(this, hF)) {
      for (const n of te(this, hF)) {
        const r = document.getElementById(n);
        r && (r.ariaHidden = !0);
      }
      te(this, hF).length = 0, yt(this, hF, null);
    }
    if (te(this, w6)) {
      for (let n = 0, r = te(this, w6).length; n < r; n += 2) {
        const a = te(this, w6)[n],
          i = te(this, w6)[n + 1];
        let o = "";
        for (const s of i) {
          const l = document.getElementById(s);
          l && (o += l.textContent.trim() || "", l.ariaHidden = "true");
        }
        o && (a.textContent = o);
      }
      te(this, w6).length = 0, yt(this, w6, null);
    }
  }
}

ole = new WeakMap(), NC = new WeakMap(), sle = new WeakMap(), n4e = new WeakMap(), lle = new WeakMap(), cle = new WeakMap(), hVe = new WeakMap(), r4e = new WeakMap(), a4e = new WeakMap(), dle = new WeakMap(), ule = new WeakMap(), uF = new WeakMap(), hF = new WeakMap(), w6 = new WeakMap(), Nf = new WeakSet(), HAt = function (t) {
  if (t) {
    t.structId && te(this, dle).getOrInsert(t.structId, t);
    for (const n of t.children || []) Gt(this, Nf, HAt).call(this, n);
  }
}, WAt = function (t) {
  if (t) {
    if (t.type === "annotation") {
      te(this, n4e).add(t.id);
      return;
    }
    for (const n of t.children || []) Gt(this, Nf, WAt).call(this, n);
  }
}, qAt = function (t) {
  return te(this, a4e).getOrInsertComputed(t, () => `${te(this, r4e)}${te(this, a4e).size}`);
}, _fr = function (t) {
  const n = [],
    r = new Set(),
    a = t.toReversed();
  for (; a.length > 0;) {
    const i = a.pop();
    if (r.has(i)) continue;
    r.add(i);
    const o = te(this, dle).get(i);
    if ((o == null ? void 0 : o.role) === "TH" && (n.push(Gt(this, Nf, qAt).call(this, i)), o.headers)) for (let s = o.headers.length - 1; s >= 0; s--) a.push(o.headers[s]);
  }
  return n;
}, KAt = function (t, n) {
  const {
    alt: r,
    colSpan: a,
    headers: i,
    id: o,
    lang: s,
    rowSpan: l,
    short: d,
    structId: u,
    summary: h
  } = t;
  if (r !== void 0) {
    let p = !1;
    const m = SH(r);
    for (const y of t.children) y.type === "annotation" && (te(this, lle).getOrInsertComputed(y.id, ppn).set("aria-label", m), p = !0);
    const f = n.getAttribute("role") || (n.localName === "span" ? "generic" : null);
    !p && f !== "none" && n.setAttribute(YWi.has(f) ? "aria-description" : "aria-label", m);
  }
  if (o !== void 0 && n.setAttribute("aria-owns", o), u !== void 0 && te(this, dle).get(u) === t) {
    const p = Gt(this, Nf, qAt).call(this, u);
    if (d !== void 0) {
      const m = document.createElement("span");
      m.setAttribute("id", p), m.setAttribute("aria-hidden", "true"), m.textContent = SH(d), n.append(m);
    } else n.setAttribute("id", p);
  }
  if (s !== void 0 && n.setAttribute("lang", SH(s, !0)), l !== void 0 && n.setAttribute("aria-rowspan", l), a !== void 0 && n.setAttribute("aria-colspan", a), (i == null ? void 0 : i.length) > 0) {
    const p = Gt(this, Nf, _fr).call(this, i);
    p.length > 0 && n.setAttribute("aria-describedby", p.join(" "));
  }
  h !== void 0 && n.setAttribute("aria-description", SH(h));
}, kfr = function (t, n) {
  const {
      alt: r,
      bbox: a,
      children: i
    } = t,
    o = i == null ? void 0 : i[0];
  if (!te(this, ule) || !r || !a || (o == null ? void 0 : o.type) !== "content") return !1;
  const {
    id: s
  } = o;
  if (!s) return !1;
  n.setAttribute("aria-owns", s);
  const l = document.createElement("span");
  (te(this, uF) || yt(this, uF, new Map())).set(s, l), l.setAttribute("role", "img"), l.setAttribute("aria-label", SH(r));
  const {
      pageHeight: d,
      pageX: u,
      pageY: h
    } = te(this, ule),
    p = "calc(var(--total-scale-factor) *",
    {
      style: m
    } = l;
  return m.width = `${p}${a[2] - a[0]}px)`, m.height = `${p}${a[3] - a[1]}px)`, m.left = `${p}${a[0] - u}px)`, m.top = `${p}${d - a[3] + h}px)`, !0;
}, QAt = function (t, n) {
  if (t) {
    "id" in t && n.push(t.id);
    for (const r of t.children || []) Gt(this, Nf, QAt).call(this, r, n);
  }
}, YAt = function (t, n = []) {
  var i, o, s, l;
  if (!t) return null;
  let r,
    a = !0;
  if ("role" in t) {
    const {
      role: d
    } = t;
    if (xfr.has(d)) {
      r = document.createElementNS(x$e, d);
      const h = [];
      (te(this, w6) || yt(this, w6, [])).push(r, h);
      for (const {
        type: p,
        id: m
      } of t.children || []) p === "content" && m && h.push(m);
    } else r = document.createElement("span");
    const u = d.match(XWi);
    if (u) r.setAttribute("role", "heading"), r.setAttribute("aria-level", u[1]);else if ($pn[d]) {
      let h = $pn[d];
      if (d === "TH") t.scope === "Row" ? h = "rowheader" : t.scope === "Column" ? h = "columnheader" : ((i = n.at(-1)) == null ? void 0 : i.role) === "TR" && ((o = n.at(-2)) == null ? void 0 : o.role) === "TBody" && (h = "rowheader");else if (d === "Caption") {
        const p = (s = n.at(-1)) == null ? void 0 : s.role;
        p !== "Table" && p !== "Figure" && (h = null);
      }
      h && r.setAttribute("role", h);
    }
    if (d === "Figure" && Gt(this, Nf, kfr).call(this, t, r)) return r;
    d === "Formula" && (t.mathML && Gpn.sanitizer && (a = !1, r.setHTML(t.mathML, {
      sanitizer: Gpn.sanitizer
    }), Gt(this, Nf, QAt).call(this, t, te(this, hF) || yt(this, hF, [])), delete t.alt), !t.mathML && t.children.length === 1 && t.children[0].role !== "math" && (r = document.createElementNS(x$e, "math"), delete t.alt));
  }
  if (r || (r = document.createElement("span")), Gt(this, Nf, KAt).call(this, t, r), t.children) {
    if (t.children.length === 1 && !("role" in t.children[0]) && "id" in t.children[0] && r.getAttribute("role") !== "none") Gt(this, Nf, KAt).call(this, t.children[0], r);else if (a) {
      n.push(t);
      for (const d of t.children) r.append(Gt(this, Nf, YAt).call(this, d, n));
      n.pop();
    }
  }
  if (t.role === "Link") {
    const d = (l = t.children) == null ? void 0 : l.filter(u => u.type === "annotation");
    if ((d == null ? void 0 : d.length) === 1) {
      const u = d[0],
        h = [];
      for (const p of r.children) p.getAttribute("aria-owns") !== u.id && (p.id || (p.id = `${te(this, r4e)}link_${rm(this, hVe)._++}`), h.push(p.id));
      te(this, cle).set(u.id, {
        element: r,
        ids: h
      });
    }
  }
  return r;
};

var TN, F4, MN, pF, hle, nDe, i4e, JAt;

const pae = class pae {
  constructor() {
    qt(this, i4e);
    qt(this, TN, !1);
    qt(this, F4, null);
    qt(this, MN, new Map());
    qt(this, pF, new Map());
  }
  setTextMapping(t) {
    yt(this, F4, t);
  }
  enable() {
    if (te(this, TN)) throw new Error("TextAccessibilityManager is already enabled.");
    if (!te(this, F4)) throw new Error("Text divs and strings have not been set.");
    if (yt(this, TN, !0), yt(this, F4, te(this, F4).slice()), te(this, F4).sort(Gt(pae, hle, nDe)), te(this, MN).size > 0) {
      const t = te(this, F4);
      for (const [n, r] of te(this, MN)) {
        if (!document.getElementById(n)) {
          te(this, MN).delete(n);
          continue;
        }
        Gt(this, i4e, JAt).call(this, n, t[r]);
      }
    }
    for (const [t, n] of te(this, pF)) this.addPointerInTextLayer(t, n);
    te(this, pF).clear();
  }
  disable() {
    te(this, TN) && (te(this, pF).clear(), yt(this, F4, null), yt(this, TN, !1));
  }
  removePointerInTextLayer(t) {
    if (!te(this, TN)) {
      te(this, pF).delete(t);
      return;
    }
    const n = te(this, F4);
    if (!(n != null && n.length)) return;
    const {
        id: r
      } = t,
      a = te(this, MN).get(r);
    if (a === void 0) return;
    const i = n[a];
    te(this, MN).delete(r);
    let o = i.getAttribute("aria-owns");
    o != null && o.includes(r) && (o = o.split(" ").filter(s => s !== r).join(" "), o ? i.setAttribute("aria-owns", o) : (i.removeAttribute("aria-owns"), i.setAttribute("role", "presentation")));
  }
  addPointerInTextLayer(t, n) {
    const {
      id: r
    } = t;
    if (!r) return null;
    if (!te(this, TN)) return te(this, pF).set(t, n), null;
    n && this.removePointerInTextLayer(t);
    const a = te(this, F4);
    if (!(a != null && a.length)) return null;
    const i = hAe(a, d => {
        var u;
        return Gt(u = pae, hle, nDe).call(u, t, d) < 0;
      }),
      o = Math.max(0, i - 1),
      s = a[o];
    Gt(this, i4e, JAt).call(this, r, s), te(this, MN).set(r, o);
    const l = s.parentNode;
    return l != null && l.classList.contains("markedContent") ? l.id : null;
  }
  moveElementInDOM(t, n, r, a) {
    const i = this.addPointerInTextLayer(r, a);
    if (!t.hasChildNodes()) return t.append(n), i;
    const o = Array.from(t.childNodes).filter(l => l !== n);
    if (o.length === 0) return i;
    const s = hAe(o, l => {
      var d;
      return Gt(d = pae, hle, nDe).call(d, n, l) < 0;
    });
    return s === 0 ? o[0].before(n) : o[s - 1].after(n), i;
  }
};

TN = new WeakMap(), F4 = new WeakMap(), MN = new WeakMap(), pF = new WeakMap(), hle = new WeakSet(), nDe = function (t, n) {
  const r = t.getBoundingClientRect(),
    a = n.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return 1;
  if (a.width === 0 && a.height === 0) return -1;
  const i = r.y,
    o = r.y + r.height,
    s = r.y + r.height / 2,
    l = a.y,
    d = a.y + a.height,
    u = a.y + a.height / 2;
  if (s <= l && u >= o) return -1;
  if (u <= i && s >= d) return 1;
  const h = r.x + r.width / 2,
    p = a.x + a.width / 2;
  return h - p;
}, i4e = new WeakSet(), JAt = function (t, n) {
  const r = n.getAttribute("aria-owns");
  r != null && r.includes(t) || n.setAttribute("aria-owns", r ? `${r} ${t}` : t), n.removeAttribute("role");
}, qt(pae, hle);

let XAt = pae;

var mF;

class JWi {
  constructor({
    findController: t,
    eventBus: n,
    pageIndex: r
  }) {
    qt(this, mF, null);
    this.findController = t, this.matches = [], this.eventBus = n, this.pageIdx = r, this.textDivs = null, this.textContentItemsStr = null, this.enabled = !1;
  }
  setTextMapping(t, n) {
    this.textDivs = t, this.textContentItemsStr = n;
  }
  enable() {
    if (!this.textDivs || !this.textContentItemsStr) throw new Error("Text divs and strings have not been set.");
    if (this.enabled) throw new Error("TextHighlighter is already enabled.");
    this.enabled = !0, te(this, mF) || (yt(this, mF, new AbortController()), this.eventBus.on("updatetextlayermatches", t => {
      (t.pageIndex === this.pageIdx || t.pageIndex === -1) && this._updateMatches();
    }, {
      signal: te(this, mF).signal,
      ...G2
    })), this._updateMatches();
  }
  disable() {
    var t;
    this.enabled && (this.enabled = !1, (t = te(this, mF)) == null || t.abort(), yt(this, mF, null), this._updateMatches(!0));
  }
  _convertMatches(t, n) {
    if (!t) return [];
    const {
      textContentItemsStr: r
    } = this;
    let a = 0,
      i = 0;
    const o = r.length - 1,
      s = [];
    for (let l = 0, d = t.length; l < d; l++) {
      let u = t[l];
      for (; a !== o && u >= i + r[a].length;) i += r[a].length, a++;
      a === r.length && console.error("Could not find a matching mapping");
      const h = {
        begin: {
          divIdx: a,
          offset: u - i
        }
      };
      for (u += n[l]; a !== o && u > i + r[a].length;) i += r[a].length, a++;
      h.end = {
        divIdx: a,
        offset: u - i
      }, s.push(h);
    }
    return s;
  }
  _renderMatches(t) {
    if (t.length === 0) return;
    const {
        findController: n,
        pageIdx: r
      } = this,
      {
        textContentItemsStr: a,
        textDivs: i
      } = this,
      o = r === n.selected.pageIdx,
      s = n.selected.matchIdx,
      l = n.state.highlightAll;
    let d = null;
    const u = {
      offset: void 0
    };
    function h(v, _) {
      const w = v.divIdx;
      return i[w].textContent = "", p(w, 0, v.offset, _);
    }
    function p(v, _, w, k) {
      let A = i[v];
      if (A.nodeType === Node.TEXT_NODE) {
        const I = document.createElement("span");
        A.before(I), I.append(A), i[v] = I, A = I;
      }
      const S = a[v].substring(_, w),
        C = document.createTextNode(S);
      if (k) {
        const I = document.createElement("span");
        return I.className = `${k} appended`, I.append(C), A.append(I), k.includes("selected") ? I : null;
      }
      return A.append(C), 0;
    }
    let m = s,
      f = m + 1;
    if (l) m = 0, f = t.length;else if (!o) return;
    let y = -1,
      b = -1;
    for (let v = m; v < f; v++) {
      const _ = t[v],
        w = _.begin;
      if (w.divIdx === y && w.offset === b) continue;
      y = w.divIdx, b = w.offset;
      const k = _.end,
        A = o && v === s,
        S = A ? " selected" : "";
      let C = null;
      if (!d || w.divIdx !== d.divIdx ? (d !== null && p(d.divIdx, d.offset, u.offset), h(w)) : p(d.divIdx, d.offset, w.offset), w.divIdx === k.divIdx) C = p(w.divIdx, w.offset, k.offset, "highlight" + S);else {
        C = p(w.divIdx, w.offset, u.offset, "highlight begin" + S);
        for (let I = w.divIdx + 1, E = k.divIdx; I < E; I++) i[I].className = "highlight middle" + S;
        h(k, "highlight end" + S);
      }
      d = k, A && n.scrollMatchIntoView({
        element: C,
        pageIndex: r,
        matchIndex: s
      });
    }
    d && p(d.divIdx, d.offset, u.offset);
  }
  _updateMatches(t = !1) {
    if (!this.enabled && !t) return;
    const {
        findController: n,
        matches: r,
        pageIdx: a
      } = this,
      {
        textContentItemsStr: i,
        textDivs: o
      } = this;
    let s = -1;
    for (const u of r) {
      const h = Math.max(s, u.begin.divIdx);
      for (let p = h, m = u.end.divIdx; p <= m; p++) {
        const f = o[p];
        f.textContent = i[p], f.className = "";
      }
      s = u.end.divIdx + 1;
    }
    if (!(n != null && n.highlightMatches) || t) return;
    const l = n.pageMatches[a] || null,
      d = n.pageMatchesLength[a] || null;
    this.matches = this._convertMatches(l, d), this._renderMatches(this.matches);
  }
}

mF = new WeakMap();

var o4e, s4e, l4e, fF, x6, Z_, PN, pVe, Afr, Aue, Sfr, Ifr;

const PO = class PO {
  constructor({
    pdfPage: t,
    highlighter: n = null,
    accessibilityManager: r = null,
    enablePermissions: a = !1,
    onAppend: i = null,
    abortSignal: o = null
  }) {
    qt(this, pVe);
    qt(this, o4e, null);
    qt(this, s4e, !1);
    qt(this, l4e, null);
    qt(this, fF, !1);
    qt(this, x6, null);
    this.pdfPage = t, this.highlighter = n, this.accessibilityManager = r, yt(this, s4e, a === !0), yt(this, l4e, i), yt(this, o4e, o), this.div = document.createElement("div"), this.div.tabIndex = 0, this.div.className = "textLayer";
  }
  async render({
    viewport: t,
    images: n,
    textContentParams: r = null
  }) {
    var s, l, d, u, h;
    if (te(this, fF) && te(this, x6)) {
      te(this, x6).update({
        viewport: t,
        onBefore: this.hide.bind(this)
      }), this.show();
      return;
    }
    this.cancel(), yt(this, x6, new kHi({
      textContentSource: this.pdfPage.streamTextContent(r || {
        includeMarkedContent: !0,
        disableNormalization: !0
      }),
      images: n,
      container: this.div,
      viewport: t
    }));
    const {
      textDivs: a,
      textContentItemsStr: i
    } = te(this, x6);
    (s = this.highlighter) == null || s.setTextMapping(a, i), (l = this.accessibilityManager) == null || l.setTextMapping(a), await te(this, x6).render(), yt(this, fF, !0);
    const o = document.createElement("div");
    o.className = "endOfContent", this.div.append(o), Gt(this, pVe, Afr).call(this, o), (d = te(this, l4e)) == null || d.call(this, this.div), (u = this.highlighter) == null || u.enable(), (h = this.accessibilityManager) == null || h.enable();
  }
  hide() {
    var t;
    !this.div.hidden && te(this, fF) && ((t = this.highlighter) == null || t.disable(), this.div.hidden = !0);
  }
  show() {
    var t;
    this.div.hidden && te(this, fF) && (this.div.hidden = !1, (t = this.highlighter) == null || t.enable());
  }
  cancel() {
    var t, n, r, a;
    (t = te(this, x6)) == null || t.cancel(), yt(this, x6, null), yt(this, fF, !1), this.div.replaceChildren(), (n = this.highlighter) == null || n.disable(), (r = this.accessibilityManager) == null || r.disable(), Gt(a = PO, Aue, Sfr).call(a, this.div);
  }
};

o4e = new WeakMap(), s4e = new WeakMap(), l4e = new WeakMap(), fF = new WeakMap(), x6 = new WeakMap(), Z_ = new WeakMap(), PN = new WeakMap(), pVe = new WeakSet(), Afr = function (t) {
  var i;
  const {
      div: n
    } = this,
    r = te(this, o4e),
    a = r ? {
      signal: r
    } : null;
  n.addEventListener("mousedown", () => {
    n.classList.add("selecting");
  }, a), n.addEventListener("copy", o => {
    if (!te(this, s4e)) {
      const s = document.getSelection();
      o.clipboardData.setData("text/plain", SH(xHi(s.toString())));
    }
    IAt(o);
  }, a), te(PO, Z_).set(n, t), Gt(i = PO, Aue, Ifr).call(i, r);
}, Aue = new WeakSet(), Sfr = function (t) {
  var n;
  te(this, Z_).delete(t), te(this, Z_).size === 0 && ((n = te(this, PN)) == null || n.abort(), yt(this, PN, null));
}, Ifr = function (t) {
  if (te(this, PN)) return;
  yt(this, PN, new AbortController());
  const n = t ? AbortSignal.any([te(this, PN).signal, t]) : te(this, PN).signal,
    r = (s, l) => {
      l.append(s), s.style.width = "", s.style.height = "", l.classList.remove("selecting");
    };
  let a = !1;
  document.addEventListener("pointerdown", () => {
    a = !0;
  }, {
    signal: n
  }), document.addEventListener("pointerup", () => {
    a = !1, te(this, Z_).forEach(r);
  }, {
    signal: n
  }), window.addEventListener("blur", () => {
    a = !1, te(this, Z_).forEach(r);
  }, {
    signal: n
  }), document.addEventListener("keyup", () => {
    a || te(this, Z_).forEach(r);
  }, {
    signal: n
  });
  var i, o;
  document.addEventListener("selectionchange", () => {
    var f, y, b, v;
    const s = document.getSelection();
    if (s.rangeCount === 0) {
      te(this, Z_).forEach(r);
      return;
    }
    const l = new Set();
    for (let _ = 0; _ < s.rangeCount; _++) {
      const w = s.getRangeAt(_);
      for (const k of te(this, Z_).keys()) !l.has(k) && w.intersectsNode(k) && l.add(k);
    }
    for (const [_, w] of te(this, Z_)) l.has(_) ? _.classList.add("selecting") : r(w, _);
    if (i === void 0 && (i = getComputedStyle(te(this, Z_).values().next().value).getPropertyValue("-moz-user-select") === "none", !i)) {
      const _ = navigator.userAgentData ? (f = navigator.userAgentData.brands.find(({
        brand: w
      }) => w === "Chromium")) == null ? void 0 : f.version : (y = /\bChrome\/(\d+)\b/.exec(navigator.userAgent)) == null ? void 0 : y[1];
      i = !!_ && parseInt(_, 10) >= 148;
    }
    if (i) return;
    const d = s.getRangeAt(0),
      u = o && (d.compareBoundaryPoints(Range.END_TO_END, o) === 0 || d.compareBoundaryPoints(Range.START_TO_END, o) === 0);
    let h = u ? d.startContainer : d.endContainer;
    if (h.nodeType === Node.TEXT_NODE && (h = h.parentNode), (b = h.classList) != null && b.contains("highlight") && (h = h.parentNode), !u && d.endOffset === 0) do {
      for (; !h.previousSibling;) h = h.parentNode;
      h = h.previousSibling;
    } while (!h.childNodes.length);
    const p = (v = h.parentElement) == null ? void 0 : v.closest(".textLayer"),
      m = te(this, Z_).get(p);
    m && (m.style.width = p.style.width, m.style.height = p.style.height, m.style.userSelect = "text", h.parentElement.insertBefore(m, u ? h : h.nextSibling)), o = d.cloneRange();
  }, {
    signal: n
  });
}, qt(PO, Aue), qt(PO, Z_, new Map()), qt(PO, PN, null);

let mAe = PO;

var c4e;

class Hzt {
  constructor({
    pdfPage: t,
    annotationStorage: n = null,
    linkService: r,
    xfaHtml: a = null
  }) {
    qt(this, c4e, !1);
    On(this, "div", null);
    this.pdfPage = t, this.annotationStorage = n, this.linkService = r, this.xfaHtml = a;
  }
  async render({
    viewport: t,
    intent: n = "display"
  }) {
    let r;
    if (n === "print") r = this.xfaHtml;else if (r = await this.pdfPage.getXfa(), te(this, c4e) || !r) return {
      textDivs: []
    };
    const a = !!this.div,
      i = {
        viewport: t.clone({
          dontFlip: !0
        }),
        div: this.div ?? (this.div = document.createElement("div")),
        xfaHtml: r,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent: n
      };
    return a ? fpn.update(i) : fpn.render(i);
  }
  cancel() {
    yt(this, c4e, !0);
  }
  hide() {
    this.div && (this.div.hidden = !0);
  }
}

c4e = new WeakMap();

const ZWi = {
    annotationEditorUIManager: null,
    annotationStorage: null,
    downloadManager: null,
    enableScripting: !1,
    fieldObjectsPromise: null,
    findController: null,
    hasJSActionsPromise: null,
    get linkService() {
      return new iZe();
    }
  },
  eqi = new Map([["canvasWrapper", 0], ["textLayer", 1], ["annotationLayer", 2], ["annotationEditorLayer", 3], ["xfaLayer", 3]]);

var ple, RN, gF, mle, fle, gle, d4e, jC, NN, yle, u4e, h4e, p4e, wK, m4e, jN, yF, Nc, zne, rDe, Une, ZAt, eSt, tSt, nSt, rSt, Cfr, Efr, Tfr, aSt;

const vVt = class vVt extends vfr {
  constructor(n) {
    var o, s;
    super(n);
    qt(this, Nc);
    qt(this, ple, null);
    qt(this, RN, aM.ENABLE_FORMS);
    qt(this, gF, null);
    qt(this, mle, null);
    qt(this, fle, !0);
    qt(this, gle, !1);
    qt(this, d4e, !1);
    qt(this, jC, null);
    qt(this, NN, !1);
    qt(this, yle, null);
    qt(this, u4e, null);
    qt(this, h4e, 1);
    qt(this, p4e, 1);
    qt(this, wK, R6.ENABLE);
    qt(this, m4e, 1);
    qt(this, jN, {
      directDrawing: !0,
      initialOptionalContent: !0,
      regularAnnotations: !0
    });
    qt(this, yF, [null, null, null, null]);
    const {
      container: r,
      defaultViewport: a
    } = n;
    this.renderingId = "page" + this.id, yt(this, jC, n.layerProperties || ZWi), yt(this, ple, n.abortSignal || null), this.pdfPage = null, this.pageLabel = null, this.rotation = 0, this.scale = n.scale || 1, this.viewport = a, this.pdfPageRotate = a.rotation, this._optionalContentConfigPromise = n.optionalContentConfigPromise || null, yt(this, wK, n.textLayerMode ?? R6.ENABLE), yt(this, RN, n.annotationMode ?? aM.ENABLE_FORMS), this.imageResourcesPath = n.imageResourcesPath || "", this.enableDetailCanvas = n.enableDetailCanvas ?? !0, this.maxCanvasPixels = n.maxCanvasPixels ?? Y1e.get("maxCanvasPixels"), this.maxCanvasDim = n.maxCanvasDim || Y1e.get("maxCanvasDim"), this.capCanvasAreaFactor = n.capCanvasAreaFactor ?? Y1e.get("capCanvasAreaFactor"), yt(this, fle, n.enableAutoLinking !== !1), yt(this, mle, n.commentManager || null), this.l10n = n.l10n, this.l10n || (this.l10n = new DJ()), this._isStandalone = !((o = this.renderingQueue) != null && o.hasViewer()), this._container = r, this._annotationCanvasMap = null, this.annotationLayer = null, this.annotationEditorLayer = null, this.textLayer = null, this.xfaLayer = null, this.structTreeLayer = null, this.drawLayer = null, this.detailView = null;
    const i = document.createElement("div");
    if (i.className = "page", i.setAttribute("data-page-number", this.id), i.setAttribute("role", "region"), i.setAttribute("data-l10n-id", "pdfjs-page-landmark"), i.setAttribute("data-l10n-args", JSON.stringify({
      page: this.id
    })), this.div = i, Gt(this, Nc, rDe).call(this), r == null || r.append(i), this._isStandalone) {
      r == null || r.style.setProperty("--scale-factor", this.scale * zR.PDF_TO_CSS_UNITS), (s = this.pageColors) != null && s.background && (r == null || r.style.setProperty("--page-bg-color", this.pageColors.background));
      const {
        optionalContentConfigPromise: l
      } = n;
      l && l.then(d => {
        l === this._optionalContentConfigPromise && (te(this, jN).initialOptionalContent = d.hasInitialVisibility);
      }), n.l10n || this.l10n.translate(this.div);
    }
  }
  clone(n) {
    const r = new vVt({
      container: null,
      eventBus: this.eventBus,
      pagesColors: this.pageColors,
      renderingQueue: this.renderingQueue,
      enableOptimizedPartialRendering: this.enableOptimizedPartialRendering,
      minDurationToUpdateCanvas: this.minDurationToUpdateCanvas,
      defaultViewport: this.viewport,
      id: n,
      layerProperties: te(this, jC),
      abortSignal: te(this, ple),
      scale: this.scale,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      textLayerMode: te(this, wK),
      annotationMode: te(this, RN),
      imageResourcesPath: this.imageResourcesPath,
      enableDetailCanvas: this.enableDetailCanvas,
      maxCanvasPixels: this.maxCanvasPixels,
      maxCanvasDim: this.maxCanvasDim,
      capCanvasAreaFactor: this.capCanvasAreaFactor,
      enableAutoLinking: te(this, fle),
      commentManager: te(this, mle),
      l10n: this.l10n
    });
    return r.setPdfPage(this.pdfPage.clone(n - 1)), r;
  }
  updatePageNumber(n) {
    var a;
    const r = this.id;
    if (r !== n) {
      this.id = n, this.renderingId = `page${n}`, this.pdfPage && (this.pdfPage.pageNumber = n), this.setPageLabel(this.pageLabel);
      const {
        div: i
      } = this;
      i.setAttribute("data-page-number", n), i.setAttribute("data-l10n-args", JSON.stringify({
        page: n
      })), this._textHighlighter.pageIdx = n - 1;
    }
    (a = te(this, jC).annotationEditorUIManager) == null || a.updatePageIndex(r - 1, n - 1);
  }
  setPdfPage(n) {
    var a, i, o, s;
    this._isStandalone && (((a = this.pageColors) == null ? void 0 : a.foreground) === "CanvasText" || ((i = this.pageColors) == null ? void 0 : i.background) === "Canvas") && ((o = this._container) == null || o.style.setProperty("--hcm-highlight-filter", n.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight")), (s = this._container) == null || s.style.setProperty("--hcm-highlight-selected-filter", n.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "Highlight"))), this.pdfPage = n, this.pdfPageRotate = n.rotate;
    const r = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = n.getViewport({
      scale: this.scale * zR.PDF_TO_CSS_UNITS,
      rotation: r
    }), Gt(this, Nc, rDe).call(this), this.reset();
  }
  destroy() {
    var n;
    this.reset(), (n = this.pdfPage) == null || n.cleanup();
  }
  deleteMe(n) {
    var r;
    if (n) {
      this.div.remove();
      return;
    }
    this.destroy(), (r = te(this, jC).annotationEditorUIManager) == null || r.deletePage(this.id);
  }
  hasEditableAnnotations() {
    var n;
    return !!((n = this.annotationLayer) != null && n.hasEditableAnnotations());
  }
  get _textHighlighter() {
    return uAe(this, "_textHighlighter", new JWi({
      pageIndex: this.id - 1,
      eventBus: this.eventBus,
      findController: te(this, jC).findController
    }));
  }
  _refreshAnnotationLayer() {
    var n, r;
    (n = this._annotationCanvasMap) != null && n.size && ((r = this.annotationLayer) == null || r.refreshCanvases());
  }
  _resetCanvas() {
    super._resetCanvas(), yt(this, yle, null);
  }
  reset({
    keepAnnotationLayer: n = !1,
    keepAnnotationEditorLayer: r = !1,
    keepXfaLayer: a = !1,
    keepTextLayer: i = !1,
    keepCanvasWrapper: o = !1,
    preserveDetailViewState: s = !1
  } = {}) {
    var b, v, _, w, k, A, S;
    const l = ((b = this.pdfPage) == null ? void 0 : b._pdfBug) ?? !1;
    this.cancelRendering({
      keepAnnotationLayer: n,
      keepAnnotationEditorLayer: r,
      keepXfaLayer: a,
      keepTextLayer: i
    }), this.renderingState = Su.INITIAL;
    const d = this.div,
      u = d.childNodes,
      h = n && ((v = this.annotationLayer) == null ? void 0 : v.div) || null,
      p = r && ((_ = this.annotationEditorLayer) == null ? void 0 : _.div) || null,
      m = a && ((w = this.xfaLayer) == null ? void 0 : w.div) || null,
      f = i && ((k = this.textLayer) == null ? void 0 : k.div) || null,
      y = o && te(this, gF) || null;
    for (let C = u.length - 1; C >= 0; C--) {
      const I = u[C];
      switch (I) {
        case h:
        case p:
        case m:
        case f:
        case y:
          continue;
      }
      if (l && I.classList.contains("pdfBugGroupsLayer")) continue;
      I.remove();
      const E = te(this, yF).indexOf(I);
      E >= 0 && (te(this, yF)[E] = null);
    }
    d.removeAttribute("data-loaded"), h && this.annotationLayer.hide(), p && this.annotationEditorLayer.hide(), m && this.xfaLayer.hide(), f && this.textLayer.hide(), (A = this.structTreeLayer) == null || A.hide(), !o && te(this, gF) && (yt(this, gF, null), this._resetCanvas()), s || ((S = this.detailView) == null || S.reset({
      keepCanvas: o
    }), o || (this.detailView = null));
  }
  toggleEditingMode(n) {
    yt(this, d4e, n), this.hasEditableAnnotations() && this.reset({
      keepAnnotationLayer: !0,
      keepAnnotationEditorLayer: !0,
      keepXfaLayer: !0,
      keepTextLayer: !0,
      keepCanvasWrapper: !0
    });
  }
  updateVisibleArea(n) {
    this.enableDetailCanvas && (te(this, NN) && this.maxCanvasPixels > 0 && n ? (this.detailView ?? (this.detailView = new QWi({
      pageView: this,
      enableOptimizedPartialRendering: this.enableOptimizedPartialRendering,
      imagesRightClickMinSize: -1
    })), this.detailView.update({
      visibleArea: n
    })) : this.detailView && (this.detailView.reset(), this.detailView = null));
  }
  update({
    scale: n = 0,
    rotation: r = null,
    optionalContentConfigPromise: a = null,
    drawingDelay: i = -1
  }) {
    var s, l, d, u;
    this.scale = n || this.scale, typeof r == "number" && (this.rotation = r), a instanceof Promise && (this._optionalContentConfigPromise = a, a.then(h => {
      a === this._optionalContentConfigPromise && (te(this, jN).initialOptionalContent = h.hasInitialVisibility);
    })), te(this, jN).directDrawing = !0;
    const o = (this.rotation + this.pdfPageRotate) % 360;
    if (this.viewport = this.viewport.clone({
      scale: this.scale * zR.PDF_TO_CSS_UNITS,
      rotation: o
    }), Gt(this, Nc, rDe).call(this), this._isStandalone && ((s = this._container) == null || s.style.setProperty("--scale-factor", this.viewport.scale)), Gt(this, Nc, aSt).call(this), this.canvas) {
      const h = te(this, gle) && te(this, NN),
        p = i >= 0 && i < 1e3;
      if (p || h) {
        p && !h && this.renderingState !== Su.FINISHED && (this.cancelRendering({
          keepAnnotationLayer: !0,
          keepAnnotationEditorLayer: !0,
          keepXfaLayer: !0,
          keepTextLayer: !0,
          cancelExtraDelay: i
        }), this.renderingState = Su.FINISHED, te(this, jN).directDrawing = !1), this.cssTransform({
          redrawAnnotationLayer: !0,
          redrawAnnotationEditorLayer: !0,
          redrawXfaLayer: !0,
          redrawTextLayer: !p,
          hideTextLayer: p
        }), p || ((l = this.detailView) == null || l.update({
          underlyingViewUpdated: !0
        }), this.dispatchPageRendered(!0, !1));
        return;
      }
    }
    this.cssTransform({}), (d = this.annotationEditorLayer) == null || d.update(this.viewport), this.reset({
      keepAnnotationLayer: !0,
      keepAnnotationEditorLayer: !0,
      keepXfaLayer: !0,
      keepTextLayer: !0,
      keepCanvasWrapper: !0,
      preserveDetailViewState: !0
    }), (u = this.detailView) == null || u.update({
      underlyingViewUpdated: !0
    });
  }
  cancelRendering({
    keepAnnotationLayer: n = !1,
    keepAnnotationEditorLayer: r = !1,
    keepXfaLayer: a = !1,
    keepTextLayer: i = !1,
    cancelExtraDelay: o = 0
  } = {}) {
    var s;
    super.cancelRendering({
      cancelExtraDelay: o
    }), this.textLayer && (!i || !this.textLayer.div) && (this.textLayer.cancel(), this.textLayer = null), this.annotationLayer && (!n || !this.annotationLayer.div) && (this.annotationLayer.cancel(), this.annotationLayer = null, this._annotationCanvasMap = null), this.structTreeLayer && !this.textLayer && (this.structTreeLayer = null), this.annotationEditorLayer && (!r || !this.annotationEditorLayer.div || !this.textLayer) && (this.drawLayer && (this.drawLayer.cancel(), this.drawLayer = null), this.annotationEditorLayer.cancel(), this.annotationEditorLayer = null), this.drawLayer && !this.textLayer && (this.drawLayer.cancel(), this.drawLayer = null), this.xfaLayer && (!a || !this.xfaLayer.div) && (this.xfaLayer.cancel(), this.xfaLayer = null, (s = this._textHighlighter) == null || s.disable());
  }
  cssTransform({
    redrawAnnotationLayer: n = !1,
    redrawAnnotationEditorLayer: r = !1,
    redrawXfaLayer: a = !1,
    redrawTextLayer: i = !1,
    hideTextLayer: o = !1
  }) {
    var d;
    const {
      canvas: s
    } = this;
    if (!s) return;
    const l = te(this, yle);
    if (this.viewport !== l) {
      const u = (360 + this.viewport.rotation - l.rotation) % 360;
      if (u === 90 || u === 270) {
        const {
            width: h,
            height: p
          } = this.viewport,
          m = p / h,
          f = h / p;
        s.style.transform = `rotate(${u}deg) scale(${m},${f})`;
      } else s.style.transform = u === 0 ? "" : `rotate(${u}deg)`;
    }
    n && this.annotationLayer && Gt(this, Nc, ZAt).call(this), r && this.annotationEditorLayer && (this.drawLayer && Gt(this, Nc, tSt).call(this), Gt(this, Nc, eSt).call(this)), a && this.xfaLayer && Gt(this, Nc, nSt).call(this), this.textLayer && (o ? (this.textLayer.hide(), (d = this.structTreeLayer) == null || d.hide()) : i && Gt(this, Nc, rSt).call(this));
  }
  get width() {
    return this.viewport.width;
  }
  get height() {
    return this.viewport.height;
  }
  getPagePoint(n, r) {
    return this.viewport.convertToPdfPoint(n, r);
  }
  _ensureCanvasWrapper() {
    let n = te(this, gF);
    return n || (n = yt(this, gF, document.createElement("div")), n.classList.add("canvasWrapper"), Gt(this, Nc, zne).call(this, n, "canvasWrapper")), n;
  }
  _getRenderingContext(n, r, a, i) {
    return {
      canvas: n,
      transform: r,
      viewport: this.viewport,
      annotationMode: te(this, RN),
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      annotationCanvasMap: this._annotationCanvasMap,
      pageColors: this.pageColors,
      isEditing: te(this, d4e),
      recordOperations: a,
      recordImages: i
    };
  }
  async draw() {
    this.renderingState !== Su.INITIAL && (console.error("Must be in new state before drawing"), this.reset());
    const {
      div: n,
      l10n: r,
      pdfPage: a,
      viewport: i
    } = this;
    if (!a) throw this.renderingState = Su.FINISHED, new Error("pdfPage is not loaded");
    this.renderingState = Su.RUNNING;
    const o = this._ensureCanvasWrapper();
    if (!this.textLayer && te(this, wK) !== R6.DISABLE && !a.isPureXfa && (this._accessibilityManager || (this._accessibilityManager = new XAt()), this.textLayer = new mAe({
      pdfPage: a,
      highlighter: this._textHighlighter,
      accessibilityManager: this._accessibilityManager,
      enablePermissions: te(this, wK) === R6.ENABLE_PERMISSIONS,
      onAppend: S => {
        this.l10n.pause(), Gt(this, Nc, zne).call(this, S, "textLayer"), this.l10n.resume();
      },
      abortSignal: te(this, ple)
    }), this.enableSelectionRendering && this.textLayer.div.classList.add("selectionRendering")), !this.annotationLayer && te(this, RN) !== aM.DISABLE) {
      const {
        annotationStorage: S,
        annotationEditorUIManager: C,
        downloadManager: I,
        enableComment: E,
        enableScripting: M,
        fieldObjectsPromise: T,
        hasJSActionsPromise: P,
        linkService: R
      } = te(this, jC);
      this._annotationCanvasMap || (this._annotationCanvasMap = new Map()), this.annotationLayer = new Gzt({
        pdfPage: a,
        annotationStorage: S,
        imageResourcesPath: this.imageResourcesPath,
        renderForms: te(this, RN) === aM.ENABLE_FORMS,
        linkService: R,
        downloadManager: I,
        enableComment: E,
        enableScripting: M,
        hasJSActionsPromise: P,
        fieldObjectsPromise: T,
        annotationCanvasMap: this._annotationCanvasMap,
        accessibilityManager: this._accessibilityManager,
        annotationEditorUIManager: C,
        commentManager: te(this, mle),
        onAppend: j => {
          Gt(this, Nc, zne).call(this, j, "annotationLayer");
        }
      });
    }
    const {
      width: s,
      height: l
    } = i;
    yt(this, yle, i);
    const {
      canvas: d,
      prevCanvas: u
    } = this._createCanvas(S => {
      o.prepend(S);
    });
    d.setAttribute("role", "presentation"), this.outputScale || Gt(this, Nc, aSt).call(this);
    const {
      outputScale: h
    } = this;
    yt(this, gle, te(this, NN));
    const p = wpn(h.sx),
      m = wpn(h.sy),
      f = d.width = JMe(ZMe(s * h.sx), p[0]),
      y = d.height = JMe(ZMe(l * h.sy), m[0]),
      b = JMe(ZMe(s), p[1]),
      v = JMe(ZMe(l), m[1]);
    h.sx = f / b, h.sy = y / v, te(this, h4e) !== p[1] && (n.style.setProperty("--scale-round-x", `${p[1]}px`), yt(this, h4e, p[1])), te(this, p4e) !== m[1] && (n.style.setProperty("--scale-round-y", `${m[1]}px`), yt(this, p4e, m[1]));
    const _ = this.enableOptimizedPartialRendering && te(this, gle) && !this.recordedBBoxes,
      w = this.imagesRightClickMinSize !== -1 && !this.imageCoordinates,
      k = h.scaled ? [h.sx, 0, 0, h.sy, 0, 0] : null,
      A = this._drawCanvas(this._getRenderingContext(d, k, _, w), () => {
        u == null || u.remove(), this._resetCanvas();
      }, S => {
        te(this, jN).regularAnnotations = !S.separateAnnots, this.dispatchPageRendered(!1, !1);
      }).then(async () => {
        var I, E, M;
        if (this.renderingState !== Su.FINISHED) return;
        this.structTreeLayer || (this.structTreeLayer = new Vzt(a, i.rawDims));
        const S = this.textLayer ? Gt(this, Nc, rSt).call(this) : null;
        this.annotationLayer && (await Gt(this, Nc, ZAt).call(this, S)), this.drawLayer || (this.drawLayer = new KWi({
          pageIndex: this.id,
          textLayer: this.enableSelectionRendering ? (I = this.textLayer) == null ? void 0 : I.div : null,
          filterFactory: (E = this.pdfPage) == null ? void 0 : E.filterFactory,
          pageColors: this.pageColors
        })), await Gt(this, Nc, tSt).call(this), this.drawLayer.setParent(o);
        const {
          annotationEditorUIManager: C
        } = te(this, jC);
        C && (this.annotationLayer || te(this, RN) === aM.DISABLE) && (this.annotationEditorLayer || (this.annotationEditorLayer = new VWi({
          uiManager: C,
          pageIndex: this.id - 1,
          l10n: r,
          structTreeLayer: this.structTreeLayer,
          accessibilityManager: this._accessibilityManager,
          annotationLayer: (M = this.annotationLayer) == null ? void 0 : M.annotationLayer,
          textLayer: this.textLayer,
          drawLayer: this.drawLayer.getDrawLayer(),
          onAppend: T => {
            Gt(this, Nc, zne).call(this, T, "annotationEditorLayer");
          }
        })), Gt(this, Nc, eSt).call(this));
      });
    if (a.isPureXfa) {
      if (!this.xfaLayer) {
        const {
          annotationStorage: S,
          linkService: C
        } = te(this, jC);
        this.xfaLayer = new Hzt({
          pdfPage: a,
          annotationStorage: S,
          linkService: C
        });
      }
      Gt(this, Nc, nSt).call(this);
    }
    return n.setAttribute("data-loaded", !0), this.dispatchPageRender(), A;
  }
  setPageLabel(n) {
    this.pageLabel = typeof n == "string" ? n : null, this.div.setAttribute("data-l10n-args", JSON.stringify({
      page: this.pageLabel ?? this.id
    })), this.pageLabel !== null ? this.div.setAttribute("data-page-label", this.pageLabel) : this.div.removeAttribute("data-page-label");
  }
  get thumbnailCanvas() {
    const {
      directDrawing: n,
      initialOptionalContent: r,
      regularAnnotations: a
    } = te(this, jN);
    return n && r && a ? this.canvas : null;
  }
};

ple = new WeakMap(), RN = new WeakMap(), gF = new WeakMap(), mle = new WeakMap(), fle = new WeakMap(), gle = new WeakMap(), d4e = new WeakMap(), jC = new WeakMap(), NN = new WeakMap(), yle = new WeakMap(), u4e = new WeakMap(), h4e = new WeakMap(), p4e = new WeakMap(), wK = new WeakMap(), m4e = new WeakMap(), jN = new WeakMap(), yF = new WeakMap(), Nc = new WeakSet(), zne = function (n, r) {
  const a = eqi.get(r),
    i = te(this, yF)[a];
  if (te(this, yF)[a] = n, i) {
    i.replaceWith(n);
    return;
  }
  for (let o = a - 1; o >= 0; o--) {
    const s = te(this, yF)[o];
    if (s) {
      s.after(n);
      return;
    }
  }
  this.div.prepend(n);
}, rDe = function () {
  const {
    div: n,
    viewport: r
  } = this;
  if (r.userUnit !== te(this, m4e) && (r.userUnit !== 1 ? n.style.setProperty("--user-unit", r.userUnit) : n.style.removeProperty("--user-unit"), yt(this, m4e, r.userUnit)), this.pdfPage) {
    if (te(this, u4e) === r.rotation) return;
    yt(this, u4e, r.rotation);
  }
  Gmr(n, r, !0, !1);
}, Une = function (n, r) {
  this.eventBus.dispatch(n, {
    source: this,
    pageNumber: this.id,
    error: r
  });
}, ZAt = async function (n = null) {
  const {
    annotationLayer: r,
    textLayer: a
  } = this;
  let i = null;
  try {
    await this.annotationLayer.render({
      viewport: this.viewport,
      intent: "display",
      structTreeLayer: this.structTreeLayer,
      optionalContentConfigPromise: this._optionalContentConfigPromise
    });
  } catch (o) {
    console.error("#renderAnnotationLayer:", o), i = o;
  } finally {
    Gt(this, Nc, Une).call(this, "annotationlayerrendered", i);
  }
  te(this, fle) && n && Gt(this, Nc, Tfr).call(this, n, r, a);
}, eSt = async function () {
  let n = null;
  try {
    await this.annotationEditorLayer.render({
      viewport: this.viewport,
      intent: "display"
    });
  } catch (r) {
    console.error("#renderAnnotationEditorLayer:", r), n = r;
  } finally {
    Gt(this, Nc, Une).call(this, "annotationeditorlayerrendered", n);
  }
}, tSt = async function () {
  try {
    await this.drawLayer.render({
      intent: "display"
    });
  } catch (n) {
    console.error("#renderDrawLayer:", n);
  }
}, nSt = async function () {
  var r;
  let n = null;
  try {
    const a = await this.xfaLayer.render({
      viewport: this.viewport,
      intent: "display"
    });
    a != null && a.textDivs && this._textHighlighter && Gt(this, Nc, Efr).call(this, a.textDivs);
  } catch (a) {
    console.error("#renderXfaLayer:", a), n = a;
  } finally {
    (r = this.xfaLayer) != null && r.div && (this.l10n.pause(), Gt(this, Nc, zne).call(this, this.xfaLayer.div, "xfaLayer"), this.l10n.resume()), Gt(this, Nc, Une).call(this, "xfalayerrendered", n);
  }
}, rSt = async function () {
  let n = null;
  try {
    await this.textLayer.render({
      viewport: this.viewport,
      images: this.imageCoordinates ? new AHi(this.imagesRightClickMinSize, this.imageCoordinates, this.viewport, () => this.canvas) : null
    });
  } catch (r) {
    if (r instanceof cHi) return;
    console.error("#renderTextLayer:", r), n = r;
  }
  Gt(this, Nc, Une).call(this, "textlayerrendered", n), Gt(this, Nc, Cfr).call(this);
}, Cfr = async function () {
  var r, a, i;
  const n = await ((r = this.structTreeLayer) == null ? void 0 : r.render());
  n && (this.l10n.pause(), (a = this.structTreeLayer) == null || a.updateTextLayer(), this.canvas && n.parentNode !== this.canvas && this.canvas.append(n), this.l10n.resume()), (i = this.structTreeLayer) == null || i.show();
}, Efr = async function (n) {
  const r = await this.pdfPage.getTextContent(),
    a = [];
  for (const i of r.items) a.push(i.str);
  this._textHighlighter.setTextMapping(n, a), this._textHighlighter.enable();
}, Tfr = async function (n, r, a) {
  let i = null;
  try {
    if (await n, r !== this.annotationLayer || a !== this.textLayer) return;
    await r.injectLinkAnnotations(tDe.processLinks(this));
  } catch (o) {
    console.error("#injectLinkAnnotations:", o), i = o;
  }
  Gt(this, Nc, Une).call(this, "linkannotationsadded", i);
}, aSt = function () {
  const {
      width: n,
      height: r
    } = this.viewport,
    a = this.outputScale = new Kje();
  if (this.maxCanvasPixels === 0) {
    const i = 1 / this.scale;
    a.sx *= i, a.sy *= i, yt(this, NN, !0);
  } else if (yt(this, NN, a.limitCanvas(n, r, this.maxCanvasPixels, this.maxCanvasDim, this.capCanvasAreaFactor)), te(this, NN) && this.enableDetailCanvas) {
    const i = this.enableOptimizedPartialRendering ? 4 : 2;
    a.sx /= i, a.sy /= i;
  }
};

let fAe = vVt;

async function tqi(e) {
  const {
    info: r,
    metadata: a,
    contentDispositionFilename: i,
    contentLength: o
  } = await e.getMetadata();
  return {
    ...r,
    baseURL: "",
    filesize: o || (await e.getDownloadInfo()).length,
    filename: i || mHi(""),
    metadata: a == null ? void 0 : a.getRaw(),
    authors: a == null ? void 0 : a.get("dc:creator"),
    numPages: e.numPages,
    URL: ""
  };
}

class nqi {
  constructor(t, n) {
    this._ready = new Promise((r, a) => {
      import(t).then(o => {
        r(o.QuickJSSandbox(new URL(n, location.href).href));
      }).catch(a);
    });
  }
  async createSandbox(t) {
    (await this._ready).create(t);
  }
  async dispatchEventInSandbox(t) {
    const n = await this._ready;
    setTimeout(() => n.dispatchEvent(t), 0);
  }
  async destroySandbox() {
    (await this._ready).nukeSandbox();
  }
}

var _6, xK, f4e, _K, kK, g4e, AK, u2, DN, ble, sb, z4, Ov, Mfr, aDe, iSt, Pfr, Hye;

class rqi {
  constructor({
    eventBus: t,
    externalServices: n = null,
    docProperties: r = null
  }) {
    qt(this, Ov);
    qt(this, _6, null);
    qt(this, xK, null);
    qt(this, f4e, null);
    qt(this, _K, null);
    qt(this, kK, null);
    qt(this, g4e, null);
    qt(this, AK, null);
    qt(this, u2, null);
    qt(this, DN, null);
    qt(this, ble, !1);
    qt(this, sb, null);
    qt(this, z4, null);
    yt(this, kK, t), yt(this, g4e, n), yt(this, f4e, r);
  }
  setViewer(t) {
    yt(this, DN, t);
  }
  async setDocument(t) {
    var s;
    if (te(this, u2) && (await Gt(this, Ov, Hye).call(this)), yt(this, u2, t), !t) return;
    const [n, r, a] = await Promise.all([t.getFieldObjects(), t.getCalculationOrderIds(), t.getJSActions()]);
    if (!n && !a) {
      await Gt(this, Ov, Hye).call(this);
      return;
    }
    if (t !== te(this, u2)) return;
    if (n) {
      yt(this, AK, new Set());
      for (const l of n.values()) for (const {
        id: d
      } of l) te(this, AK).add(d);
    }
    try {
      yt(this, sb, Gt(this, Ov, Pfr).call(this));
    } catch (l) {
      console.error("setDocument:", l), await Gt(this, Ov, Hye).call(this);
      return;
    }
    const i = te(this, kK);
    yt(this, _K, new AbortController());
    const o = {
      signal: te(this, _K).signal,
      ...G2
    };
    i.on("updatefromsandbox", l => {
      (l == null ? void 0 : l.source) === window && Gt(this, Ov, Mfr).call(this, l.detail);
    }, o), i.on("dispatcheventinsandbox", l => {
      var d;
      (d = te(this, sb)) == null || d.dispatchEventInSandbox(l.detail);
    }, o), i.on("pagechanging", ({
      pageNumber: l,
      previous: d
    }) => {
      l !== d && (Gt(this, Ov, iSt).call(this, d), Gt(this, Ov, aDe).call(this, l));
    }, o), i.on("pagerendered", ({
      pageNumber: l
    }) => {
      this._pageOpenPending.has(l) && l === te(this, DN).currentPageNumber && Gt(this, Ov, aDe).call(this, l);
    }, o), i.on("pagesdestroy", async () => {
      var l, d;
      await Gt(this, Ov, iSt).call(this, te(this, DN).currentPageNumber), await ((l = te(this, sb)) == null ? void 0 : l.dispatchEventInSandbox({
        id: "doc",
        name: "WillClose"
      })), (d = te(this, _6)) == null || d.resolve();
    }, o);
    try {
      const l = await te(this, f4e).call(this, t);
      if (t !== te(this, u2)) return;
      await te(this, sb).createSandbox({
        objects: n,
        calculationOrder: r,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        },
        docInfo: {
          ...l,
          actions: a
        }
      }), i.dispatch("sandboxcreated", {
        source: this
      });
    } catch (l) {
      console.error("setDocument:", l), await Gt(this, Ov, Hye).call(this);
      return;
    }
    await ((s = te(this, sb)) == null ? void 0 : s.dispatchEventInSandbox({
      id: "doc",
      name: "Open"
    })), await Gt(this, Ov, aDe).call(this, te(this, DN).currentPageNumber, !0), Promise.resolve().then(() => {
      t === te(this, u2) && yt(this, ble, !0);
    });
  }
  async dispatchWillSave() {
    var t;
    return (t = te(this, sb)) == null ? void 0 : t.dispatchEventInSandbox({
      id: "doc",
      name: "WillSave"
    });
  }
  async dispatchDidSave() {
    var t;
    return (t = te(this, sb)) == null ? void 0 : t.dispatchEventInSandbox({
      id: "doc",
      name: "DidSave"
    });
  }
  async dispatchWillPrint() {
    var t;
    if (te(this, sb)) {
      await ((t = te(this, z4)) == null ? void 0 : t.promise), yt(this, z4, Promise.withResolvers());
      try {
        await te(this, sb).dispatchEventInSandbox({
          id: "doc",
          name: "WillPrint"
        });
      } catch (n) {
        throw te(this, z4).resolve(), yt(this, z4, null), n;
      }
      await te(this, z4).promise;
    }
  }
  async dispatchDidPrint() {
    var t;
    return (t = te(this, sb)) == null ? void 0 : t.dispatchEventInSandbox({
      id: "doc",
      name: "DidPrint"
    });
  }
  get destroyPromise() {
    var t;
    return ((t = te(this, xK)) == null ? void 0 : t.promise) || null;
  }
  get ready() {
    return te(this, ble);
  }
  get _pageOpenPending() {
    return uAe(this, "_pageOpenPending", new Set());
  }
  get _visitedPages() {
    return uAe(this, "_visitedPages", new Map());
  }
}

_6 = new WeakMap(), xK = new WeakMap(), f4e = new WeakMap(), _K = new WeakMap(), kK = new WeakMap(), g4e = new WeakMap(), AK = new WeakMap(), u2 = new WeakMap(), DN = new WeakMap(), ble = new WeakMap(), sb = new WeakMap(), z4 = new WeakMap(), Ov = new WeakSet(), Mfr = async function (t) {
  var d, u, h;
  const n = te(this, DN),
    r = n.isInPresentationMode || n.isChangingPresentationMode,
    {
      id: a,
      siblings: i,
      command: o,
      value: s
    } = t;
  if (!a) {
    switch (o) {
      case "clear":
        console.clear();
        break;
      case "error":
        console.error(s);
        break;
      case "layout":
        if (!r) {
          const p = LHi(s);
          n.spreadMode = p.spreadMode;
        }
        break;
      case "page-num":
        n.currentPageNumber = s + 1;
        break;
      case "print":
        await n.pagesPromise, te(this, kK).dispatch("print", {
          source: this
        });
        break;
      case "println":
        console.log(s);
        break;
      case "zoom":
        r || (n.currentScaleValue = s);
        break;
      case "SaveAs":
        te(this, kK).dispatch("download", {
          source: this
        });
        break;
      case "FirstPage":
        n.currentPageNumber = 1;
        break;
      case "LastPage":
        n.currentPageNumber = n.pagesCount;
        break;
      case "NextPage":
        n.nextPage();
        break;
      case "PrevPage":
        n.previousPage();
        break;
      case "ZoomViewIn":
        r || n.increaseScale();
        break;
      case "ZoomViewOut":
        r || n.decreaseScale();
        break;
      case "WillPrintFinished":
        (d = te(this, z4)) == null || d.resolve(), yt(this, z4, null);
        break;
    }
    return;
  }
  if (r && t.focus) return;
  delete t.id, delete t.siblings;
  const l = i ? [a, ...i] : [a];
  for (const p of l) {
    if (!((u = te(this, AK)) != null && u.has(p))) continue;
    const m = document.querySelector(`[data-element-id="${p}"]`);
    m ? m.dispatchEvent(new CustomEvent("updatefromsandbox", {
      detail: t
    })) : (h = te(this, u2)) == null || h.annotationStorage.setValue(p, t);
  }
}, aDe = async function (t, n = !1) {
  const r = te(this, u2),
    a = this._visitedPages;
  if (n && yt(this, _6, Promise.withResolvers()), !te(this, _6)) return;
  const i = te(this, DN).getPageView(t - 1);
  if ((i == null ? void 0 : i.renderingState) !== Su.FINISHED) {
    this._pageOpenPending.add(t);
    return;
  }
  this._pageOpenPending.delete(t);
  const o = (async () => {
    var l, d;
    const s = await (a.has(t) ? null : (l = i.pdfPage) == null ? void 0 : l.getJSActions());
    r === te(this, u2) && (await ((d = te(this, sb)) == null ? void 0 : d.dispatchEventInSandbox({
      id: "page",
      name: "PageOpen",
      pageNumber: t,
      actions: s
    })));
  })();
  a.set(t, o);
}, iSt = async function (t) {
  var i;
  const n = te(this, u2),
    r = this._visitedPages;
  if (!te(this, _6) || this._pageOpenPending.has(t)) return;
  const a = r.get(t);
  a && (r.set(t, null), await a, n === te(this, u2) && (await ((i = te(this, sb)) == null ? void 0 : i.dispatchEventInSandbox({
    id: "page",
    name: "PageClose",
    pageNumber: t
  }))));
}, Pfr = function () {
  if (yt(this, xK, Promise.withResolvers()), te(this, sb)) throw new Error("#initScripting: Scripting already exists.");
  return te(this, g4e).createScripting();
}, Hye = async function () {
  var t, n, r, a;
  if (yt(this, AK, null), !te(this, sb)) {
    yt(this, u2, null), (t = te(this, xK)) == null || t.resolve();
    return;
  }
  te(this, _6) && (await Promise.race([te(this, _6).promise, new Promise(i => {
    setTimeout(i, 1e3);
  })]).catch(() => {}), yt(this, _6, null)), yt(this, u2, null);
  try {
    await te(this, sb).destroySandbox();
  } catch {}
  (n = te(this, z4)) == null || n.reject(new Error("Scripting destroyed.")), yt(this, z4, null), (r = te(this, _K)) == null || r.abort(), yt(this, _K, null), this._pageOpenPending.clear(), this._visitedPages.clear(), yt(this, sb, null), yt(this, ble, !1), (a = te(this, xK)) == null || a.resolve();
};

class Rfr extends rqi {
  constructor(t) {
    t.externalServices || window.addEventListener("updatefromsandbox", n => {
      t.eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: n.detail
      });
    }), t.externalServices || (t.externalServices = {
      createScripting: () => new nqi(t.sandboxBundleSrc, t.wasmUrl)
    }), t.docProperties || (t.docProperties = n => tqi(n)), super(t);
  }
}

oh(1148);

oh(3579);

const aqi = 3e4;

var SK, IK, y4e, vle;

class iqi {
  constructor() {
    qt(this, SK, null);
    qt(this, IK, null);
    qt(this, y4e, null);
    qt(this, vle, null);
    On(this, "isThumbnailViewEnabled", !1);
    On(this, "onIdle", null);
    On(this, "printing", !1);
    Object.defineProperty(this, "hasViewer", {
      value: () => !!te(this, vle)
    });
  }
  setViewer(t) {
    yt(this, vle, t);
  }
  setThumbnailViewer(t) {
    yt(this, y4e, t);
  }
  isHighestPriority(t) {
    return te(this, SK) === t.renderingId;
  }
  renderHighestPriority(t) {
    var n;
    te(this, IK) && (clearTimeout(te(this, IK)), yt(this, IK, null)), !te(this, vle).forceRendering(t) && (this.isThumbnailViewEnabled && ((n = te(this, y4e)) != null && n.forceRendering()) || this.printing || this.onIdle && yt(this, IK, setTimeout(this.onIdle.bind(this), aqi)));
  }
  getHighestPriority(t, n, r, a = !1, i = !1) {
    const o = t.views,
      s = o.length;
    if (s === 0) return null;
    for (let p = 0; p < s; p++) {
      const m = o[p].view;
      if (!this.isViewFinished(m)) return m;
    }
    if (!i) for (let p = 0; p < s; p++) {
      const {
        detailView: m
      } = o[p].view;
      if (m && !this.isViewFinished(m)) return m;
    }
    const l = t.first.id,
      d = t.last.id;
    if (d - l + 1 > s) {
      const p = t.ids;
      for (let m = 1, f = d - l; m < f; m++) {
        const y = r ? l + m : d - m;
        if (p.has(y)) continue;
        const b = n[y - 1];
        if (!this.isViewFinished(b)) return b;
      }
    }
    let u = r ? d : l - 2,
      h = n[u];
    return h && !this.isViewFinished(h) || a && (u += r ? 1 : -1, h = n[u], h && !this.isViewFinished(h)) ? h : null;
  }
  isViewFinished(t) {
    return t.renderingState === Su.FINISHED;
  }
  renderView(t) {
    switch (t.renderingState) {
      case Su.FINISHED:
        return !1;
      case Su.PAUSED:
        yt(this, SK, t.renderingId), t.resume();
        break;
      case Su.RUNNING:
        yt(this, SK, t.renderingId);
        break;
      case Su.INITIAL:
        yt(this, SK, t.renderingId), t.draw().finally(() => {
          this.renderHighestPriority();
        }).catch(n => {
          n instanceof SAt || console.error("renderView:", n);
        });
        break;
    }
    return !0;
  }
}

SK = new WeakMap(), IK = new WeakMap(), y4e = new WeakMap(), vle = new WeakMap();

const Vpn = 10,
  tPe = {
    FORCE_SCROLL_MODE_PAGE: 1e4,
    FORCE_LAZY_PAGE_INIT: 5e3,
    PAUSE_EAGER_PAGE_INIT: 250
  };

function Hpn(e) {
  return Object.values($_).includes(e) && e !== $_.DISABLE;
}

var LN, CK, b4e, oSt;

class oqi {
  constructor(t) {
    qt(this, b4e);
    qt(this, LN, new Set());
    qt(this, CK, 0);
    yt(this, CK, t);
  }
  push(t) {
    const n = te(this, LN);
    n.has(t) && n.delete(t), n.add(t), n.size > te(this, CK) && Gt(this, b4e, oSt).call(this);
  }
  resize(t, n = null) {
    yt(this, CK, t);
    const r = te(this, LN);
    if (n) {
      const a = r.size;
      let i = 1;
      for (const o of r) if (n.has(o.id) && (r.delete(o), r.add(o)), ++i > a) break;
    }
    for (; r.size > te(this, CK);) Gt(this, b4e, oSt).call(this);
  }
  has(t) {
    return te(this, LN).has(t);
  }
  [Symbol.iterator]() {
    return te(this, LN).keys();
  }
}

LN = new WeakMap(), CK = new WeakMap(), b4e = new WeakSet(), oSt = function () {
  const t = te(this, LN).keys().next().value;
  t == null || t.destroy(), te(this, LN).delete(t);
};

var ON, v4e, w4e, U4, dv, EK, TK, x4e, _4e, k4e, A4e, S4e, I4e, C4e, E4e, bF, T4e, wle, mVe, xle, DC, _le, MK, PK, kle, vF, M4e, Ale, RK, BN, Sle, P4e, Ile, R4e, wF, $4, xF, ps, sSt, Nfr, jfr, Dfr, Wye, iDe, Lfr, Ofr, lSt, Bfr, uO, cSt, Ffr, zfr, Ufr, dSt, uSt, $fr, hSt, oDe, pSt;

class Wzt {
  constructor(t) {
    qt(this, ps);
    qt(this, ON, null);
    qt(this, v4e, null);
    qt(this, w4e, null);
    qt(this, U4, $_.NONE);
    qt(this, dv, null);
    qt(this, EK, aM.ENABLE_FORMS);
    qt(this, TK, null);
    qt(this, x4e, null);
    qt(this, _4e, null);
    qt(this, k4e, !1);
    qt(this, A4e, !1);
    qt(this, S4e, !1);
    qt(this, I4e, !1);
    qt(this, C4e, !0);
    qt(this, E4e, null);
    qt(this, bF, null);
    qt(this, T4e, 0);
    qt(this, wle, null);
    qt(this, mVe, [NaN, NaN]);
    qt(this, xle, !0);
    qt(this, DC, null);
    qt(this, _le, !1);
    qt(this, MK, null);
    qt(this, PK, null);
    qt(this, kle, !1);
    qt(this, vF, null);
    qt(this, M4e, 0);
    qt(this, Ale, new ResizeObserver(Gt(this, ps, $fr).bind(this)));
    qt(this, RK, null);
    qt(this, BN, null);
    qt(this, Sle, null);
    qt(this, P4e, !0);
    qt(this, Ile, R6.ENABLE);
    qt(this, R4e, null);
    qt(this, wF, null);
    qt(this, $4, null);
    qt(this, xF, null);
    var a, i;
    const n = "6.3.289";
    if (mpn !== n) throw new Error(`The API version "${mpn}" does not match the Viewer version "${n}".`);
    if (this.container = t.container, this.viewer = t.viewer || t.container.firstElementChild, yt(this, R4e, t.viewerAlert || null), ((a = this.container) == null ? void 0 : a.tagName) !== "DIV" || ((i = this.viewer) == null ? void 0 : i.tagName) !== "DIV") throw new Error("Invalid `container` and/or `viewer` option.");
    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") throw new Error("The `container` must be absolutely positioned.");
    te(this, Ale).observe(this.container), this.eventBus = t.eventBus, this.linkService = t.linkService || new iZe(), this.downloadManager = t.downloadManager || null, this.findController = t.findController || null, yt(this, v4e, t.altTextManager || null), yt(this, TK, t.commentManager || null), yt(this, Sle, t.signatureManager || null), yt(this, _4e, t.editorUndoBar || null), this.findController && (this.findController.onIsPageVisible = o => this._getVisiblePages().ids.has(o)), this._scriptingManager = t.scriptingManager || null, yt(this, Ile, t.textLayerMode ?? R6.ENABLE), yt(this, EK, t.annotationMode ?? aM.ENABLE_FORMS), yt(this, U4, t.annotationEditorMode ?? $_.NONE), yt(this, w4e, t.annotationEditorHighlightColors || null), yt(this, k4e, t.enableHighlightFloatingButton === !0), yt(this, S4e, t.enableUpdatedAddImage === !0), yt(this, I4e, t.enableNewAltTextWhenAddingImage === !0), this.imageResourcesPath = t.imageResourcesPath || "", this.enablePrintAutoRotate = t.enablePrintAutoRotate || !1, this.removePageBorders = t.removePageBorders || !1, this.maxCanvasPixels = t.maxCanvasPixels, this.maxCanvasDim = t.maxCanvasDim, this.capCanvasAreaFactor = t.capCanvasAreaFactor, this.enableDetailCanvas = t.enableDetailCanvas ?? !0, this.enableOptimizedPartialRendering = t.enableOptimizedPartialRendering ?? !1, this.enableSelectionRendering = t.enableSelectionRendering !== !1, this.imagesRightClickMinSize = t.imagesRightClickMinSize ?? -1, this.l10n = t.l10n, this.l10n || (this.l10n = new DJ()), yt(this, A4e, t.enablePermissions || !1), this.pageColors = t.pageColors || null, yt(this, wle, t.mlManager || null), yt(this, P4e, t.supportsPinchToZoom !== !1), yt(this, C4e, t.enableAutoLinking !== !1), yt(this, T4e, t.minDurationToUpdateCanvas ?? 500), this.defaultRenderingQueue = !t.renderingQueue, this.defaultRenderingQueue ? (this.renderingQueue = new iqi(), this.renderingQueue.setViewer(this)) : this.renderingQueue = t.renderingQueue;
    const {
      abortSignal: r
    } = t;
    yt(this, E4e, r || null), r == null || r.addEventListener("abort", () => {
      te(this, Ale).disconnect(), yt(this, Ale, null);
    }, {
      once: !0
    }), this.scroll = THi(this.container, this._scrollUpdate.bind(this), r), this.presentationModeState = moe.UNKNOWN, this._resetView(), this.removePageBorders && this.viewer.classList.add("removePageBorders"), Gt(this, ps, uSt).call(this), this.eventBus.on("thumbnailrendered", ({
      pageNumber: o,
      pdfPage: s
    }) => {
      const l = this._pages[o - 1];
      te(this, ON).has(l) || s == null || s.cleanup();
    }, G2), t.l10n || this.l10n.translate(this.container);
  }
  get printingAllowed() {
    return te(this, xle);
  }
  get pagesCount() {
    return this._pages.length;
  }
  getPageView(t) {
    return this._pages[t];
  }
  getCachedPageViews() {
    return new Set(te(this, ON));
  }
  get pageViewsReady() {
    return this._pages.every(t => t == null ? void 0 : t.pdfPage);
  }
  clearSelection() {
    var n, r;
    const t = document.getSelection();
    if (!(!t || t.isCollapsed)) {
      for (let a = 0, i = t.rangeCount; a < i; a++) if (t.getRangeAt(a).intersectsNode(this.viewer)) {
        (n = t.removeAllRanges) == null || n.call(t), (r = t.empty) == null || r.call(t);
        return;
      }
    }
  }
  get renderForms() {
    return te(this, EK) === aM.ENABLE_FORMS;
  }
  get enableScripting() {
    return !!this._scriptingManager;
  }
  get currentPageNumber() {
    return this._currentPageNumber;
  }
  set currentPageNumber(t) {
    if (!Number.isInteger(t)) throw new Error("Invalid page number.");
    this.pdfDocument && (this._currentPageNumber !== t && this.clearSelection(), this._setCurrentPageNumber(t, !0) || console.error(`currentPageNumber: "${t}" is not a valid page.`));
  }
  _setCurrentPageNumber(t, n = !1) {
    var a;
    if (this._currentPageNumber === t) return n && Gt(this, ps, cSt).call(this), !0;
    if (!(0 < t && t <= this.pagesCount)) return !1;
    const r = this._currentPageNumber;
    return this._currentPageNumber = t, this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: t,
      pageLabel: ((a = this._pageLabels) == null ? void 0 : a[t - 1]) ?? null,
      previous: r
    }), n && Gt(this, ps, cSt).call(this), !0;
  }
  get currentPageLabel() {
    var t;
    return ((t = this._pageLabels) == null ? void 0 : t[this._currentPageNumber - 1]) ?? null;
  }
  set currentPageLabel(t) {
    if (!this.pdfDocument) return;
    let n = t | 0;
    if (this._pageLabels) {
      const r = this._pageLabels.indexOf(t);
      r >= 0 && (n = r + 1);
    }
    this._currentPageNumber !== n && this.clearSelection(), this._setCurrentPageNumber(n, !0) || console.error(`currentPageLabel: "${t}" is not a valid page.`);
  }
  get currentScale() {
    return this._currentScale !== 0 ? this._currentScale : 1;
  }
  set currentScale(t) {
    if (isNaN(t)) throw new Error("Invalid numeric scale.");
    this.pdfDocument && Gt(this, ps, uO).call(this, t, {
      noScroll: !1
    });
  }
  get currentScaleValue() {
    return this._currentScaleValue;
  }
  set currentScaleValue(t) {
    this.pdfDocument && Gt(this, ps, uO).call(this, t, {
      noScroll: !1
    });
  }
  get pagesRotation() {
    return this._pagesRotation;
  }
  set pagesRotation(t) {
    if (!Vmr(t)) throw new Error("Invalid pages rotation angle.");
    if (!this.pdfDocument || (t %= 360, t < 0 && (t += 360), this._pagesRotation === t)) return;
    this.clearSelection(), this._pagesRotation = t;
    const n = this._currentPageNumber;
    this.refresh(!0, {
      rotation: t
    }), this._currentScaleValue && Gt(this, ps, uO).call(this, this._currentScaleValue, {
      noScroll: !0
    }), this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: t,
      pageNumber: n
    }), this.defaultRenderingQueue && this.update();
  }
  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }
  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }
  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }
  get _layerProperties() {
    const t = this;
    return uAe(this, "_layerProperties", {
      get annotationEditorUIManager() {
        return te(t, dv);
      },
      get annotationStorage() {
        var n;
        return (n = t.pdfDocument) == null ? void 0 : n.annotationStorage;
      },
      get downloadManager() {
        return t.downloadManager;
      },
      get enableComment() {
        return !!te(t, TK);
      },
      get enableScripting() {
        return !!t._scriptingManager;
      },
      get fieldObjectsPromise() {
        var n;
        return (n = t.pdfDocument) == null ? void 0 : n.getFieldObjects();
      },
      get findController() {
        return t.findController;
      },
      get hasJSActionsPromise() {
        var n;
        return (n = t.pdfDocument) == null ? void 0 : n.hasJSActions();
      },
      get linkService() {
        return t.linkService;
      }
    });
  }
  async getAllText(t = null) {
    const n = [],
      r = [];
    for (let a = 1, i = this.pdfDocument.numPages; a <= i; ++a) {
      if (t != null && t.aborted) return null;
      r.length = 0;
      const o = await this.pdfDocument.getPage(a),
        {
          items: s
        } = await o.getTextContent();
      for (const l of s) l.str && r.push(l.str), l.hasEOL && r.push(`
`);
      n.push(SH(r.join("")));
    }
    return n.join(`
`);
  }
  setDocument(t) {
    var m, f, y;
    if (this.pdfDocument && (this.eventBus.dispatch("pagesdestroy", {
      source: this
    }), this._cancelRendering(), this._resetView(), (m = this.findController) == null || m.setDocument(null), (f = this._scriptingManager) == null || f.setDocument(null), (y = te(this, dv)) == null || y.destroy(), yt(this, dv, null), yt(this, U4, $_.NONE), yt(this, xle, !0)), this.pdfDocument = t, !t) return;
    const n = t.numPages,
      r = t.getPage(1),
      a = t.getOptionalContentConfig({
        intent: "display"
      }),
      i = te(this, A4e) ? t.getPermissions() : Promise.resolve(),
      {
        eventBus: o,
        pageColors: s,
        viewer: l
      } = this;
    yt(this, bF, new AbortController());
    const {
        signal: d
      } = te(this, bF),
      u = {
        signal: d,
        ...G2
      };
    if (n > tPe.FORCE_SCROLL_MODE_PAGE) {
      console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document.");
      const b = this._scrollMode = kd.PAGE;
      o.dispatch("scrollmodechanged", {
        source: this,
        mode: b
      });
    }
    this._pagesCapability.promise.then(() => {
      o.dispatch("pagesloaded", {
        source: this,
        pagesCount: n
      });
    }, () => {});
    const h = b => {
      const v = this._pages[b.pageNumber - 1];
      v && te(this, ON).push(v);
    };
    o.on("pagerender", h, u);
    const p = b => {
      b.cssTransform || b.isDetailView || (this._onePageRenderedCapability.resolve({
        timestamp: b.timestamp
      }), o.off("pagerendered", p));
    };
    o.on("pagerendered", p, u), Promise.all([r, i]).then(([b, v]) => {
      var I;
      if (t !== this.pdfDocument) return;
      this._firstPageCapability.resolve(b), this._optionalContentConfigPromise = a;
      const {
        annotationEditorMode: _,
        annotationMode: w,
        textLayerMode: k
      } = Gt(this, ps, Nfr).call(this, v);
      if (k !== R6.DISABLE) {
        const E = yt(this, vF, document.createElement("div"));
        E.id = "hiddenCopyElement", E.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;display:none", l.before(E);
      }
      if (_ !== $_.DISABLE) {
        const E = _;
        t.isPureXfa ? console.warn("Warning: XFA-editing is not implemented.") : Hpn(E) ? (yt(this, dv, new uHi(this.container, l, te(this, R4e), te(this, v4e), te(this, TK), te(this, Sle), o, t, s, te(this, w4e), te(this, k4e), te(this, S4e), te(this, I4e), te(this, wle), te(this, _4e), te(this, P4e))), o.dispatch("annotationeditoruimanager", {
          source: this,
          uiManager: te(this, dv)
        }), E !== $_.NONE && (Gt(this, ps, pSt).call(this, E), te(this, dv).updateMode(E))) : console.error(`Invalid AnnotationEditor mode: ${E}`);
      }
      const A = this._scrollMode === kd.PAGE ? null : l,
        S = this.currentScale,
        C = b.getViewport({
          scale: S * zR.PDF_TO_CSS_UNITS
        });
      l.style.setProperty("--scale-factor", C.scale), s != null && s.background && l.style.setProperty("--page-bg-color", s.background), ((s == null ? void 0 : s.foreground) === "CanvasText" || (s == null ? void 0 : s.background) === "Canvas") && (l.style.setProperty("--hcm-highlight-filter", t.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight")), l.style.setProperty("--hcm-highlight-selected-filter", t.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "ButtonText")));
      for (let E = 1; E <= n; ++E) {
        const M = new fAe({
          container: A,
          eventBus: o,
          id: E,
          scale: S,
          defaultViewport: C.clone(),
          optionalContentConfigPromise: a,
          renderingQueue: this.renderingQueue,
          textLayerMode: k,
          annotationMode: w,
          imageResourcesPath: this.imageResourcesPath,
          maxCanvasPixels: this.maxCanvasPixels,
          maxCanvasDim: this.maxCanvasDim,
          capCanvasAreaFactor: this.capCanvasAreaFactor,
          enableDetailCanvas: this.enableDetailCanvas,
          enableOptimizedPartialRendering: this.enableOptimizedPartialRendering,
          enableSelectionRendering: this.enableSelectionRendering,
          imagesRightClickMinSize: this.imagesRightClickMinSize,
          pageColors: s,
          l10n: this.l10n,
          layerProperties: this._layerProperties,
          enableAutoLinking: te(this, C4e),
          minDurationToUpdateCanvas: te(this, T4e),
          commentManager: te(this, TK),
          abortSignal: te(this, E4e)
        });
        this._pages.push(M);
      }
      (I = this._pages[0]) == null || I.setPdfPage(b), this._scrollMode === kd.PAGE ? Gt(this, ps, Wye).call(this) : this._spreadMode !== C1.NONE && this._updateSpreadMode(), o.on("annotationeditorlayerrendered", E => {
        te(this, dv) && o.dispatch("annotationeditormodechanged", {
          source: this,
          mode: te(this, U4)
        });
      }, {
        once: !0,
        signal: d,
        ...G2
      }), Gt(this, ps, jfr).call(this, d).then(async () => {
        var M, T;
        if (t !== this.pdfDocument) return;
        if ((M = this.findController) == null || M.setDocument(t), (T = this._scriptingManager) == null || T.setDocument(t), te(this, vF) && document.addEventListener("copy", Gt(this, ps, Dfr).bind(this, k), {
          signal: d
        }), t.loadingParams.disableAutoFetch || n > tPe.FORCE_LAZY_PAGE_INIT) {
          this._pagesCapability.resolve();
          return;
        }
        let E = n - 1;
        if (E <= 0) {
          this._pagesCapability.resolve();
          return;
        }
        for (let P = 2; P <= n; ++P) {
          const R = t.getPage(P).then(j => {
            const B = this._pages[P - 1];
            B.pdfPage || B.setPdfPage(j), --E === 0 && this._pagesCapability.resolve();
          }, j => {
            console.error(`Unable to get page ${P} to initialize viewer`, j), --E === 0 && this._pagesCapability.resolve();
          });
          P % tPe.PAUSE_EAGER_PAGE_INIT === 0 && (await R);
        }
      }), o.dispatch("pagesinit", {
        source: this
      }), t.getMetadata().then(({
        info: E
      }) => {
        t === this.pdfDocument && E.Language && (l.lang = E.Language);
      }), this.defaultRenderingQueue && this.update();
    }).catch(b => {
      console.error("Unable to initialize viewer", b), this._pagesCapability.reject(b);
    });
  }
  onPagesEdited({
    pagesMapper: t,
    type: n,
    hasBeenCut: r,
    pageNumbers: a
  }) {
    var d, u, h, p, m;
    if (n === "copy") {
      yt(this, wF, new Map());
      for (const f of a) te(this, wF).set(f, this._pages[f - 1]);
      return;
    }
    if (n === "cancelCopy") {
      yt(this, wF, null);
      return;
    }
    if ((n === "cut" || n === "delete") && (yt(this, $4, this._pages), yt(this, xF, a)), n === "cancelDelete") {
      if (yt(this, xF, null), !te(this, $4)) return;
      const f = this._scrollMode === kd.PAGE ? null : this.viewer;
      if (f) {
        (d = te(this, dv)) == null || d.startUpdatePages();
        const y = document.createDocumentFragment();
        for (let b = 0, v = te(this, $4).length; b < v; b++) {
          const _ = te(this, $4)[b];
          _.updatePageNumber(b + 1), y.append(_.div);
        }
        f.replaceChildren(y), (u = te(this, dv)) == null || u.endUpdatePages();
      }
      this._pages = te(this, $4), yt(this, $4, null);
      return;
    }
    if (n === "cleanSavedData") {
      if (te(this, xF)) {
        if (te(this, $4)) {
          for (const f of te(this, xF)) te(this, $4)[f - 1].deleteMe();
          yt(this, $4, null);
        }
        yt(this, xF, null);
      }
      return;
    }
    this._currentPageNumber = 0;
    const o = this._pages,
      s = this._pages = [];
    (h = te(this, dv)) == null || h.startUpdatePages();
    for (let f = 1, y = t.pagesNumber; f <= y; f++) {
      const b = t.getPrevPageNumber(f);
      if (b < 0) {
        let _ = te(this, wF).get(-b);
        r ? _.updatePageNumber(f) : ((p = te(this, dv)) == null || p.clonePage(-b - 1, f - 1), _ = _.clone(f)), s.push(_);
        continue;
      }
      const v = o[b - 1];
      s.push(v), v.updatePageNumber(f);
    }
    (m = te(this, dv)) == null || m.endUpdatePages(), n === "paste" && yt(this, wF, null);
    const l = this._scrollMode === kd.PAGE ? null : this.viewer;
    if (l) {
      const f = document.createDocumentFragment();
      for (const {
        div: y
      } of s) f.append(y);
      l.replaceChildren(f);
    }
    setTimeout(() => {
      this.forceRendering();
    });
  }
  setPageLabels(t) {
    var n;
    if (this.pdfDocument) {
      t ? Array.isArray(t) && this.pdfDocument.numPages === t.length ? this._pageLabels = t : (this._pageLabels = null, console.error("setPageLabels: Invalid page labels.")) : this._pageLabels = null;
      for (let r = 0, a = this._pages.length; r < a; r++) this._pages[r].setPageLabel(((n = this._pageLabels) == null ? void 0 : n[r]) ?? null);
    }
  }
  _resetView() {
    var t, n;
    this._pages = [], this._currentPageNumber = 1, this._currentScale = 0, this._currentScaleValue = null, this._pageLabels = null, yt(this, ON, new oqi(Vpn)), this._location = null, this._pagesRotation = 0, this._optionalContentConfigPromise = null, this._firstPageCapability = Promise.withResolvers(), this._onePageRenderedCapability = Promise.withResolvers(), this._pagesCapability = Promise.withResolvers(), this._scrollMode = kd.VERTICAL, this._previousScrollMode = kd.UNKNOWN, this._spreadMode = C1.NONE, yt(this, RK, {
      previousPageNumber: 1,
      scrollDown: !0,
      pages: []
    }), (t = te(this, bF)) == null || t.abort(), yt(this, bF, null), this.viewer.textContent = "", this._updateScrollMode(), this.viewer.removeAttribute("lang"), (n = te(this, vF)) == null || n.remove(), yt(this, vF, null), Gt(this, ps, hSt).call(this), Gt(this, ps, oDe).call(this);
  }
  _scrollUpdate() {
    this.pagesCount !== 0 && (te(this, DC) && clearTimeout(te(this, DC)), yt(this, DC, setTimeout(() => {
      yt(this, DC, null), this.update();
    }, 100)), this.update());
  }
  panBy(t, n) {
    const {
        container: r
      } = this,
      a = te(this, mVe),
      {
        scrollLeft: i,
        scrollTop: o
      } = r,
      s = (Math.abs(i - a[0]) < 1 ? a[0] : i) - t,
      l = (Math.abs(o - a[1]) < 1 ? a[1] : o) - n;
    a[0] = s, a[1] = l, r.scrollLeft = s, r.scrollTop = l, yt(this, _le, !0);
  }
  pageLabelToPageNumber(t) {
    if (!this._pageLabels) return null;
    const n = this._pageLabels.indexOf(t);
    return n < 0 ? null : n + 1;
  }
  scrollPageIntoView({
    pageNumber: t,
    destArray: n = null,
    allowNegativeOffset: r = !1,
    ignoreDestinationZoom: a = !1,
    center: i = null
  }) {
    if (!this.pdfDocument) return;
    const o = Number.isInteger(t) && this._pages[t - 1];
    if (!o) {
      console.error(`scrollPageIntoView: "${t}" is not a valid pageNumber parameter.`);
      return;
    }
    if (this.isInPresentationMode || !n) {
      this._setCurrentPageNumber(t, !0);
      return;
    }
    let s = 0,
      l = 0,
      d = 0,
      u = 0,
      h,
      p;
    const m = o.rotation % 180 !== 0,
      f = (m ? o.height : o.width) / o.scale / zR.PDF_TO_CSS_UNITS,
      y = (m ? o.width : o.height) / o.scale / zR.PDF_TO_CSS_UNITS;
    let b = 0;
    switch (n[1].name) {
      case "XYZ":
        s = n[2], l = n[3], b = n[4], s = s !== null ? s : 0, l = l !== null ? l : y;
        break;
      case "Fit":
      case "FitB":
        b = "page-fit";
        break;
      case "FitH":
      case "FitBH":
        l = n[2], b = "page-width", l === null && this._location ? (s = this._location.left, l = this._location.top) : (typeof l != "number" || l < 0) && (l = y);
        break;
      case "FitV":
      case "FitBV":
        s = n[2], d = f, u = y, b = "page-height";
        break;
      case "FitR":
        s = n[2], l = n[3], d = n[4] - s, u = n[5] - l;
        let k = 40,
          A = 5;
        this.removePageBorders && (k = A = 0), h = (this.container.clientWidth - k) / d / zR.PDF_TO_CSS_UNITS, p = (this.container.clientHeight - A) / u / zR.PDF_TO_CSS_UNITS, b = Math.min(Math.abs(h), Math.abs(p));
        break;
      default:
        console.error(`scrollPageIntoView: "${n[1].name}" is not a valid destination type.`);
        return;
    }
    if (a || (b && b !== this._currentScale ? this.currentScaleValue = b : this._currentScale === 0 && (this.currentScaleValue = "auto")), b === "page-fit" && !n[4]) {
      Gt(this, ps, iDe).call(this, o);
      return;
    }
    const v = [o.viewport.convertToViewportPoint(s, l), o.viewport.convertToViewportPoint(s + d, l + u)];
    let _ = Math.min(v[0][0], v[1][0]),
      w = Math.min(v[0][1], v[1][1]);
    i ? ((i === "both" || i === "vertical") && (w -= (this.container.clientHeight - Math.abs(v[1][1] - v[0][1])) / 2), (i === "both" || i === "horizontal") && (_ -= (this.container.clientWidth - Math.abs(v[1][0] - v[0][0])) / 2)) : r || (_ = Math.max(_, 0), w = Math.max(w, 0)), Gt(this, ps, iDe).call(this, o, {
      left: _,
      top: w
    });
  }
  _updateLocation(t) {
    yt(this, _le, !1);
    const n = this._currentScale,
      r = this._currentScaleValue,
      a = parseFloat(r) === n ? Math.round(n * 1e4) / 100 : r,
      i = t.id,
      o = this._pages[i - 1],
      s = this.container,
      l = o.getPagePoint(s.scrollLeft - t.x, s.scrollTop - t.y),
      [d, u] = l;
    let h = `#page=${i}`;
    this.isInPresentationMode || (h += `&zoom=${a},${Math.round(d)},${Math.round(u)}`), this._location = {
      pageNumber: i,
      scale: a,
      top: u,
      left: d,
      rotation: this._pagesRotation,
      pdfOpenParams: h
    };
  }
  update() {
    const t = this._getVisiblePages(),
      n = t.views,
      r = n.length;
    if (r === 0) return;
    const a = Math.max(Vpn, 2 * r + 1);
    te(this, ON).resize(a, t.ids);
    for (const {
      view: l,
      visibleArea: d
    } of n) l.updateVisibleArea(d);
    for (const l of te(this, ON)) t.ids.has(l.id) || l.updateVisibleArea(null);
    this.renderingQueue.renderHighestPriority(t);
    const i = this._spreadMode === C1.NONE && (this._scrollMode === kd.PAGE || this._scrollMode === kd.VERTICAL),
      o = this._currentPageNumber;
    let s = !1;
    for (const l of n) {
      if (l.percent < 100) break;
      if (l.id === o && i) {
        s = !0;
        break;
      }
    }
    this._setCurrentPageNumber(s ? this._currentPageNumber : n[0].id), this._updateLocation(t.first), this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    });
  }
  containsElement(t) {
    return this.container.contains(t);
  }
  focus() {
    this.container.focus();
  }
  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === "rtl";
  }
  get isInPresentationMode() {
    return this.presentationModeState === moe.FULLSCREEN;
  }
  get isChangingPresentationMode() {
    return this.presentationModeState === moe.CHANGING;
  }
  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? !1 : this.container.scrollWidth > this.container.clientWidth;
  }
  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? !1 : this.container.scrollHeight > this.container.clientHeight;
  }
  _getVisiblePages() {
    const t = this._scrollMode === kd.PAGE ? te(this, RK).pages : this._pages,
      n = this._scrollMode === kd.HORIZONTAL,
      r = n && this._isContainerRtl;
    return RHi({
      scrollEl: this.container,
      views: t,
      sortByVisibility: !0,
      horizontal: n,
      rtl: r
    });
  }
  cleanup() {
    for (const t of this._pages) t.renderingState !== Su.FINISHED && t.reset();
  }
  _cancelRendering() {
    for (const t of this._pages) t.cancelRendering();
  }
  forceRendering(t) {
    const n = t || this._getVisiblePages(),
      r = Gt(this, ps, Ufr).call(this, n),
      a = this._spreadMode !== C1.NONE && this._scrollMode !== kd.HORIZONTAL,
      i = te(this, BN) !== null || te(this, DC) !== null && n.views.some(s => {
        var l;
        return (l = s.detailView) == null ? void 0 : l.renderingCancelled;
      }),
      o = this.renderingQueue.getHighestPriority(n, this._pages, r, a, i);
    return o ? (Gt(this, ps, zfr).call(this, o).then(() => {
      this.renderingQueue.renderView(o);
    }), !0) : !1;
  }
  get hasEqualPageSizes() {
    const t = this._pages[0];
    for (let n = 1, r = this._pages.length; n < r; ++n) {
      const a = this._pages[n];
      if (a.width !== t.width || a.height !== t.height) return !1;
    }
    return !0;
  }
  getPagesOverview() {
    let t;
    return this._pages.map(n => {
      const r = n.pdfPage.getViewport({
          scale: 1
        }),
        a = xpn(r);
      if (t === void 0) t = a;else if (this.enablePrintAutoRotate && a !== t) return {
        width: r.height,
        height: r.width,
        rotation: (r.rotation - 90) % 360
      };
      return {
        width: r.width,
        height: r.height,
        rotation: r.rotation
      };
    });
  }
  get optionalContentConfigPromise() {
    return this.pdfDocument ? this._optionalContentConfigPromise ? this._optionalContentConfigPromise : (console.error("optionalContentConfigPromise: Not initialized yet."), this.pdfDocument.getOptionalContentConfig({
      intent: "display"
    })) : Promise.resolve(null);
  }
  set optionalContentConfigPromise(t) {
    if (!(t instanceof Promise)) throw new Error(`Invalid optionalContentConfigPromise: ${t}`);
    this.pdfDocument && this._optionalContentConfigPromise && (this._optionalContentConfigPromise = t, this.refresh(!1, {
      optionalContentConfigPromise: t
    }), this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise: t
    }));
  }
  get scrollMode() {
    return this._scrollMode;
  }
  set scrollMode(t) {
    if (this._scrollMode !== t) {
      if (!NHi(t)) throw new Error(`Invalid scroll mode: ${t}`);
      this.pagesCount > tPe.FORCE_SCROLL_MODE_PAGE || (this._previousScrollMode = this._scrollMode, this.clearSelection(), this._scrollMode = t, this.eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode: t
      }), this._updateScrollMode(this._currentPageNumber));
    }
  }
  _updateScrollMode(t = null) {
    const n = this._scrollMode,
      r = this.viewer;
    r.classList.toggle("scrollHorizontal", n === kd.HORIZONTAL), r.classList.toggle("scrollWrapped", n === kd.WRAPPED), !(!this.pdfDocument || !t) && (n === kd.PAGE ? Gt(this, ps, Wye).call(this) : this._previousScrollMode === kd.PAGE && this._updateSpreadMode(), this._currentScaleValue && isNaN(this._currentScaleValue) && Gt(this, ps, uO).call(this, this._currentScaleValue, {
      noScroll: !0
    }), this._setCurrentPageNumber(t, !0), this.update());
  }
  get spreadMode() {
    return this._spreadMode;
  }
  set spreadMode(t) {
    if (this._spreadMode !== t) {
      if (!jHi(t)) throw new Error(`Invalid spread mode: ${t}`);
      this.clearSelection(), this._spreadMode = t, this.eventBus.dispatch("spreadmodechanged", {
        source: this,
        mode: t
      }), this._updateSpreadMode(this._currentPageNumber);
    }
  }
  _updateSpreadMode(t = null) {
    if (!this.pdfDocument) return;
    const n = this.viewer,
      r = this._pages;
    if (this._scrollMode === kd.PAGE) Gt(this, ps, Wye).call(this);else if (n.textContent = "", this._spreadMode === C1.NONE) for (const a of this._pages) n.append(a.div);else {
      const a = this._spreadMode - 1;
      let i = null;
      for (let o = 0, s = r.length; o < s; ++o) i === null ? (i = document.createElement("div"), i.className = "spread", n.append(i)) : o % 2 === a && (i = i.cloneNode(!1), n.append(i)), i.append(r[o].div);
    }
    t && (this._currentScaleValue && isNaN(this._currentScaleValue) && Gt(this, ps, uO).call(this, this._currentScaleValue, {
      noScroll: !0
    }), this._setCurrentPageNumber(t, !0), this.update());
  }
  nextPage() {
    const t = this._currentPageNumber,
      n = this.pagesCount;
    if (t >= n) return !1;
    const r = Gt(this, ps, dSt).call(this, t, !1) || 1;
    return this.currentPageNumber = Math.min(t + r, n), !0;
  }
  previousPage() {
    const t = this._currentPageNumber;
    if (t <= 1) return !1;
    const n = Gt(this, ps, dSt).call(this, t, !0) || 1;
    return this.currentPageNumber = Math.max(t - n, 1), !0;
  }
  updateScale({
    drawingDelay: t,
    scaleFactor: n = null,
    steps: r = null,
    origin: a,
    pan: i = null
  }) {
    if (r === null && n === null) throw new Error("Invalid updateScale options: either `steps` or `scaleFactor` must be provided.");
    if (!this.pdfDocument) return;
    let o = this._currentScale;
    if (n > 0 && n !== 1) o = Math.round(o * n * 100) / 100;else if (r) {
      const s = r > 0 ? 1.1 : .9090909090909091,
        l = r > 0 ? Math.ceil : Math.floor;
      r = Math.abs(r);
      do o = l((o * s).toFixed(2) * 10) / 10; while (--r > 0);
    }
    o = wHi(o, .1, 25), Gt(this, ps, uO).call(this, o, {
      noScroll: !1,
      drawingDelay: t,
      origin: a,
      pan: i
    });
  }
  increaseScale(t = {}) {
    this.updateScale({
      ...t,
      steps: t.steps ?? 1
    });
  }
  decreaseScale(t = {}) {
    this.updateScale({
      ...t,
      steps: -(t.steps ?? 1)
    });
  }
  get containerTopLeft() {
    return te(this, x4e) || yt(this, x4e, [this.container.offsetTop, this.container.offsetLeft]);
  }
  get annotationEditorMode() {
    return te(this, dv) ? te(this, U4) : $_.DISABLE;
  }
  set annotationEditorMode({
    mode: t,
    editId: n = null,
    isFromKeyboard: r = !1,
    mustEnterInEditMode: a = !1,
    editComment: i = !1
  }) {
    if (!te(this, dv)) throw new Error("The AnnotationEditor is not enabled.");
    if (te(this, U4) === t) return;
    if (!Hpn(t)) throw new Error(`Invalid AnnotationEditor mode: ${t}`);
    if (!this.pdfDocument) return;
    Gt(this, ps, pSt).call(this, t);
    const {
        eventBus: o,
        pdfDocument: s
      } = this,
      l = async () => {
        Gt(this, ps, oDe).call(this), yt(this, U4, t), await te(this, dv).updateMode(t, n, !0, r, a, i), !(t !== te(this, U4) || s !== this.pdfDocument) && o.dispatch("annotationeditormodechanged", {
          source: this,
          mode: t
        });
      };
    if (t === $_.NONE || te(this, U4) === $_.NONE) {
      const d = t !== $_.NONE;
      d || this.pdfDocument.annotationStorage.resetModifiedIds(), this.cleanup();
      for (const h of this._pages) h.toggleEditingMode(d);
      const u = Gt(this, ps, Ffr).call(this);
      if (d && u) {
        Gt(this, ps, oDe).call(this), yt(this, MK, new AbortController());
        const h = AbortSignal.any([te(this, bF).signal, te(this, MK).signal]);
        o.on("pagerendered", ({
          pageNumber: p
        }) => {
          u.delete(p), u.size === 0 && yt(this, PK, setTimeout(l, 0));
        }, {
          signal: h,
          ...G2
        });
        return;
      }
    }
    l();
  }
  refresh(t = !1, n = Object.create(null)) {
    if (this.pdfDocument) {
      for (const r of this._pages) r.update(n);
      Gt(this, ps, hSt).call(this), t || this.update();
    }
  }
}

ON = new WeakMap(), v4e = new WeakMap(), w4e = new WeakMap(), U4 = new WeakMap(), dv = new WeakMap(), EK = new WeakMap(), TK = new WeakMap(), x4e = new WeakMap(), _4e = new WeakMap(), k4e = new WeakMap(), A4e = new WeakMap(), S4e = new WeakMap(), I4e = new WeakMap(), C4e = new WeakMap(), E4e = new WeakMap(), bF = new WeakMap(), T4e = new WeakMap(), wle = new WeakMap(), mVe = new WeakMap(), xle = new WeakMap(), DC = new WeakMap(), _le = new WeakMap(), MK = new WeakMap(), PK = new WeakMap(), kle = new WeakMap(), vF = new WeakMap(), M4e = new WeakMap(), Ale = new WeakMap(), RK = new WeakMap(), BN = new WeakMap(), Sle = new WeakMap(), P4e = new WeakMap(), Ile = new WeakMap(), R4e = new WeakMap(), wF = new WeakMap(), $4 = new WeakMap(), xF = new WeakMap(), ps = new WeakSet(), sSt = function (t) {
  yt(this, xle, t), this.eventBus.dispatch("printingallowed", {
    source: this,
    isAllowed: t
  });
}, Nfr = function (t) {
  const n = {
    annotationEditorMode: te(this, U4),
    annotationMode: te(this, EK),
    textLayerMode: te(this, Ile)
  };
  return t ? (Gt(this, ps, sSt).call(this, t.has(Nte.PRINT_HIGH_QUALITY) || t.has(Nte.PRINT)), !t.has(Nte.COPY) && te(this, Ile) === R6.ENABLE && (n.textLayerMode = R6.ENABLE_PERMISSIONS), t.has(Nte.MODIFY_CONTENTS) || (n.annotationEditorMode = $_.DISABLE), !t.has(Nte.MODIFY_ANNOTATIONS) && !t.has(Nte.FILL_INTERACTIVE_FORMS) && te(this, EK) === aM.ENABLE_FORMS && (n.annotationMode = aM.ENABLE), n) : (Gt(this, ps, sSt).call(this, !0), n);
}, jfr = async function (t) {
  if (document.visibilityState === "hidden" || !this.container.offsetParent || this._getVisiblePages().views.length === 0) return;
  const n = Promise.withResolvers(),
    r = new AbortController();
  document.addEventListener("visibilitychange", () => {
    document.visibilityState === "hidden" && n.resolve();
  }, {
    signal: AbortSignal.any([t, r.signal])
  }), await Promise.race([this._onePageRenderedCapability.promise, n.promise]), r.abort();
}, Dfr = function (t, n) {
  const r = document.getSelection(),
    {
      focusNode: a,
      anchorNode: i
    } = r;
  if (i && a && r.containsNode(te(this, vF))) {
    if (te(this, kle) || t === R6.ENABLE_PERMISSIONS) {
      IAt(n);
      return;
    }
    yt(this, kle, !0);
    const {
      classList: o
    } = this.viewer;
    o.add("copyAll");
    const s = new AbortController(),
      l = new AbortController();
    window.addEventListener("keydown", d => {
      d.key === "Escape" && l.abort();
    }, {
      signal: s.signal
    }), this.getAllText(l.signal).then(async d => {
      d !== null && (await navigator.clipboard.writeText(d));
    }).catch(d => {
      console.warn(`Something goes wrong when extracting the text: ${d.message}`);
    }).finally(() => {
      yt(this, kle, !1), s.abort(), o.remove("copyAll");
    }), IAt(n);
  }
}, Wye = function () {
  if (this._scrollMode !== kd.PAGE) throw new Error("#ensurePageViewVisible: Invalid scrollMode value.");
  const t = this._currentPageNumber,
    n = te(this, RK),
    r = this.viewer;
  if (r.textContent = "", n.pages.length = 0, this._spreadMode === C1.NONE && !this.isInPresentationMode) {
    const a = this._pages[t - 1];
    r.append(a.div), n.pages.push(a);
  } else {
    const a = new Set(),
      i = this._spreadMode - 1;
    i === -1 ? a.add(t - 1) : t % 2 !== i ? (a.add(t - 1), a.add(t)) : (a.add(t - 2), a.add(t - 1));
    const o = document.createElement("div");
    if (o.className = "spread", this.isInPresentationMode) {
      const s = document.createElement("div");
      s.className = "dummyPage", o.append(s);
    }
    for (const s of a) {
      const l = this._pages[s];
      l && (o.append(l.div), n.pages.push(l));
    }
    r.append(o);
  }
  n.scrollDown = t >= n.previousPageNumber, n.previousPageNumber = t;
}, iDe = function (t, n = null) {
  const {
    div: r,
    id: a
  } = t;
  if (this._currentPageNumber !== a && this._setCurrentPageNumber(a), this._scrollMode === kd.PAGE && (Gt(this, ps, Wye).call(this), this.update()), !n && !this.isInPresentationMode) {
    const i = r.offsetLeft + r.clientLeft,
      o = i + r.clientWidth,
      {
        scrollLeft: s,
        clientWidth: l
      } = this.container;
    (this._scrollMode === kd.HORIZONTAL || i < s || o > s + l) && (n = {
      left: 0,
      top: 0
    });
  }
  EHi(r, n), !this._currentScaleValue && this._location && (this._location = null);
}, Lfr = function (t) {
  return t === this._currentScale || Math.abs(t - this._currentScale) < 1e-15;
}, Ofr = function () {
  if (!te(this, _le)) return;
  const {
    first: t
  } = this._getVisiblePages();
  t && this._updateLocation(t);
}, lSt = function (t, n, {
  noScroll: r = !1,
  preset: a = !1,
  drawingDelay: i = -1,
  origin: o = null,
  pan: s = null
}) {
  if (this._currentScaleValue = n.toString(), Gt(this, ps, Lfr).call(this, t)) {
    s && !r && this.panBy(s[0], s[1]), a && this.eventBus.dispatch("scalechanging", {
      source: this,
      scale: t,
      presetValue: n
    });
    return;
  }
  this.clearSelection(), this.viewer.style.setProperty("--scale-factor", t * zR.PDF_TO_CSS_UNITS);
  const l = i >= 0 && i < 1e3;
  this.refresh(!0, {
    scale: t,
    drawingDelay: l ? i : -1
  }), l && yt(this, BN, setTimeout(() => {
    yt(this, BN, null), this.refresh();
  }, i));
  const d = this._currentScale;
  if (this._currentScale = t, !r) {
    Gt(this, ps, Ofr).call(this);
    let u = this._currentPageNumber,
      h;
    this._location && !(this.isInPresentationMode || this.isChangingPresentationMode) && (u = this._location.pageNumber, h = [null, {
      name: "XYZ"
    }, this._location.left, this._location.top, null]), this.scrollPageIntoView({
      pageNumber: u,
      destArray: h,
      allowNegativeOffset: !0
    });
    let p = (s == null ? void 0 : s[0]) ?? 0,
      m = (s == null ? void 0 : s[1]) ?? 0;
    if (Array.isArray(o)) {
      const f = t / d - 1,
        [y, b] = this.containerTopLeft;
      p -= (o[0] - b) * f, m -= (o[1] - y) * f;
    }
    (p || m) && this.panBy(p, m);
  }
  this.eventBus.dispatch("scalechanging", {
    source: this,
    scale: t,
    presetValue: a ? n : void 0
  }), this.defaultRenderingQueue && this.update();
}, Bfr = function () {
  return this._spreadMode !== C1.NONE && this._scrollMode !== kd.HORIZONTAL ? 2 : 1;
}, uO = function (t, n) {
  let r = parseFloat(t);
  if (r > 0) n.preset = !1, Gt(this, ps, lSt).call(this, r, t, n);else {
    const a = this._pages[this._currentPageNumber - 1];
    if (!a) return;
    let i = 40,
      o = 5;
    this.isInPresentationMode ? (i = o = 4, this._spreadMode !== C1.NONE && (i *= 2)) : this.removePageBorders ? i = o = 0 : this._scrollMode === kd.HORIZONTAL && ([i, o] = [o, i]);
    const s = (this.container.clientWidth - i) / a.width * a.scale / te(this, ps, Bfr),
      l = (this.container.clientHeight - o) / a.height * a.scale;
    switch (t) {
      case "page-actual":
        r = 1;
        break;
      case "page-width":
        r = s;
        break;
      case "page-height":
        r = l;
        break;
      case "page-fit":
        r = Math.min(s, l);
        break;
      case "auto":
        const d = xpn(a) ? s : Math.min(l, s);
        r = Math.min(1.25, d);
        break;
      default:
        console.error(`#setScale: "${t}" is an unknown zoom value.`);
        return;
    }
    n.preset = !0, Gt(this, ps, lSt).call(this, r, t, n);
  }
}, cSt = function () {
  const t = this._pages[this._currentPageNumber - 1];
  this.isInPresentationMode && Gt(this, ps, uO).call(this, this._currentScaleValue, {
    noScroll: !0
  }), Gt(this, ps, iDe).call(this, t);
}, Ffr = function () {
  const t = this._getVisiblePages(),
    n = [],
    {
      ids: r,
      views: a
    } = t;
  for (const i of a) {
    const {
      view: o
    } = i;
    if (!o.hasEditableAnnotations()) {
      r.delete(o.id);
      continue;
    }
    n.push(i);
  }
  return n.length === 0 ? null : (this.renderingQueue.renderHighestPriority({
    first: n[0],
    last: n.at(-1),
    views: n,
    ids: r
  }), r);
}, zfr = async function (t) {
  if (t.pdfPage) return t.pdfPage;
  try {
    const n = await this.pdfDocument.getPage(t.id);
    return t.pdfPage || t.setPdfPage(n), n;
  } catch (n) {
    return console.error("Unable to get page for page view", n), null;
  }
}, Ufr = function (t) {
  var n, r;
  if (((n = t.first) == null ? void 0 : n.id) === 1) return !0;
  if (((r = t.last) == null ? void 0 : r.id) === this.pagesCount) return !1;
  switch (this._scrollMode) {
    case kd.PAGE:
      return te(this, RK).scrollDown;
    case kd.HORIZONTAL:
      return this.scroll.right;
  }
  return this.scroll.down;
}, dSt = function (t, n = !1) {
  switch (this._scrollMode) {
    case kd.WRAPPED:
      {
        const {
            views: r
          } = this._getVisiblePages(),
          a = new Map();
        for (const {
          id: i,
          y: o,
          percent: s,
          widthPercent: l
        } of r) s === 0 || l < 100 || a.getOrInsertComputed(o, bHi).push(i);
        for (const i of a.values()) {
          const o = i.indexOf(t);
          if (o === -1) continue;
          const s = i.length;
          if (s === 1) break;
          if (n) for (let l = o - 1, d = 0; l >= d; l--) {
            const u = i[l],
              h = i[l + 1] - 1;
            if (u < h) return t - h;
          } else for (let l = o + 1, d = s; l < d; l++) {
            const u = i[l],
              h = i[l - 1] + 1;
            if (u > h) return h - t;
          }
          if (n) {
            const l = i[0];
            if (l < t) return t - l + 1;
          } else {
            const l = i[s - 1];
            if (l > t) return l - t + 1;
          }
          break;
        }
        break;
      }
    case kd.HORIZONTAL:
      break;
    case kd.PAGE:
    case kd.VERTICAL:
      {
        if (this._spreadMode === C1.NONE) break;
        const r = this._spreadMode - 1;
        if (n && t % 2 !== r) break;
        if (!n && t % 2 === r) break;
        const {
            views: a
          } = this._getVisiblePages(),
          i = n ? t - 1 : t + 1;
        for (const {
          id: o,
          percent: s,
          widthPercent: l
        } of a) if (o === i) {
          if (s > 0 && l === 100) return 2;
          break;
        }
        break;
      }
  }
  return 1;
}, uSt = function (t = this.container.clientHeight) {
  t !== te(this, M4e) && (yt(this, M4e, t), DHi.setProperty("--viewer-container-height", `${t}px`));
}, $fr = function (t) {
  for (const n of t) if (n.target === this.container) {
    Gt(this, ps, uSt).call(this, Math.floor(n.borderBoxSize[0].blockSize)), yt(this, x4e, null);
    break;
  }
}, hSt = function () {
  te(this, BN) !== null && (clearTimeout(te(this, BN)), yt(this, BN, null)), te(this, DC) !== null && (clearTimeout(te(this, DC)), yt(this, DC, null));
}, oDe = function () {
  var t;
  (t = te(this, MK)) == null || t.abort(), yt(this, MK, null), te(this, PK) !== null && (clearTimeout(te(this, PK)), yt(this, PK, null));
}, pSt = function (t) {
  var n, r;
  switch (t) {
    case $_.STAMP:
      (n = te(this, wle)) == null || n.loadModel("altText");
      break;
    case $_.SIGNATURE:
      (r = te(this, Sle)) == null || r.loadSignatures();
      break;
  }
};

class Gfr extends Wzt {
  _resetView() {
    super._resetView(), this._scrollMode = kd.PAGE, this._spreadMode = C1.NONE;
  }
  set scrollMode(t) {}
  _updateScrollMode() {}
  set spreadMode(t) {}
  _updateSpreadMode() {}
}

globalThis.pdfjsViewer = {
  AnnotationLayerBuilder: Gzt,
  DownloadManager: afr,
  EventBus: w$e,
  FindState: ER,
  GenericL10n: DJ,
  LinkTarget: TO,
  parseQueryString: tEe,
  PDFFindController: Kmr,
  PDFHistory: mfr,
  PDFLinkService: $zt,
  PDFPageView: fAe,
  PDFScriptingManager: Rfr,
  PDFSinglePageViewer: Gfr,
  PDFViewer: Wzt,
  ProgressBar: Hmr,
  RenderingStates: Su,
  ScrollMode: kd,
  SimpleLinkService: iZe,
  SpreadMode: C1,
  StructTreeLayerBuilder: Vzt,
  TextLayerBuilder: mAe,
  XfaLayerBuilder: Hzt
};

const sqi = Object.freeze(Object.defineProperty({
  __proto__: null,
  AnnotationLayerBuilder: Gzt,
  DownloadManager: afr,
  EventBus: w$e,
  FindState: ER,
  GenericL10n: DJ,
  LinkTarget: TO,
  PDFFindController: Kmr,
  PDFHistory: mfr,
  PDFLinkService: $zt,
  PDFPageView: fAe,
  PDFScriptingManager: Rfr,
  PDFSinglePageViewer: Gfr,
  PDFViewer: Wzt,
  ProgressBar: Hmr,
  RenderingStates: Su,
  ScrollMode: kd,
  SimpleLinkService: iZe,
  SpreadMode: C1,
  StructTreeLayerBuilder: Vzt,
  TextLayerBuilder: mAe,
  XfaLayerBuilder: Hzt,
  parseQueryString: tEe
}, Symbol.toStringTag, {
  value: "Module"
}));

class X1e {
  constructor(t = {}) {
    On(this, "bufferPool", []);
    On(this, "config");
    On(this, "monitoringEnabled", !1);
    On(this, "monitorIntervalId", null);
    On(this, "stats", {
      buffersCreated: 0,
      buffersReused: 0,
      cleanupCount: 0,
      lastCleanupTime: 0
    });
    On(this, "lastWarningTime", 0);
    On(this, "WARNING_LOG_COOLDOWN_MS", 60 * 1e3);
    const {
        warning: n,
        cleanup: r
      } = X1e.getThresholds(),
      a = X1e.isMac();
    this.config = {
      bufferSize: t.bufferSize ?? 1024 * 1024,
      maxBuffers: t.maxBuffers ?? 10,
      monitorInterval: t.monitorInterval ?? (a ? 15e3 : 5e3),
      warningThreshold: t.warningThreshold ?? n,
      cleanupThreshold: t.cleanupThreshold ?? r,
      autoCleanupEnabled: t.autoCleanupEnabled ?? !0
    };
  }
  static isWindows() {
    return typeof navigator < "u" && /win/i.test(navigator.platform + navigator.userAgent);
  }
  static isMac() {
    return typeof navigator < "u" && /mac/i.test(navigator.platform + navigator.userAgent);
  }
  static getThresholds() {
    var r;
    const t = X1e.isWindows();
    let n = 4096;
    return typeof performance < "u" && ((r = performance.memory) != null && r.jsHeapSizeLimit) && (n = performance.memory.jsHeapSizeLimit / (1024 * 1024)), (!Number.isFinite(n) || n <= 0) && (n = 4096), t && n < 4096 ? {
      warning: Math.min(1536, n * .6),
      cleanup: Math.min(1024, n * .45)
    } : {
      warning: 4096,
      cleanup: 3072
    };
  }
  startMonitoring() {
    if (this.monitoringEnabled) {
      console.warn("[MemoryPoolManager] Monitoring already started");
      return;
    }
    this.monitoringEnabled = !0, this.monitorIntervalId = window.setInterval(() => {
      this.checkMemoryUsage();
    }, this.config.monitorInterval), console.log("[MemoryPoolManager] Memory monitoring started");
  }
  stopMonitoring() {
    this.monitorIntervalId !== null && (clearInterval(this.monitorIntervalId), this.monitorIntervalId = null), this.monitoringEnabled = !1, console.log("[MemoryPoolManager] Memory monitoring stopped");
  }
  checkMemoryUsage() {
    if (typeof document < "u" && document.hidden || !performance.memory) return;
    const t = performance.memory.usedJSHeapSize / (1024 * 1024),
      n = performance.memory.jsHeapSizeLimit / (1024 * 1024);
    if (t > this.config.warningThreshold) {
      const r = Date.now();
      r - this.lastWarningTime >= this.WARNING_LOG_COOLDOWN_MS && (this.lastWarningTime = r, console.warn(`[MemoryPoolManager] Memory warning: ${t.toFixed(2)}MB / ${n.toFixed(2)}MB`));
      const a = new CustomEvent("memoryWarning", {
        detail: {
          usedMemoryMB: t,
          limitMemoryMB: n
        }
      });
      window.dispatchEvent(a);
    }
    this.config.autoCleanupEnabled && t > this.config.cleanupThreshold && (console.log("[MemoryPoolManager] Auto cleanup triggered"), this.cleanup());
  }
  acquireBuffer() {
    let t;
    return this.bufferPool.length > 0 ? (t = this.bufferPool.pop(), this.stats.buffersReused++) : (t = new ArrayBuffer(this.config.bufferSize), this.stats.buffersCreated++), t;
  }
  releaseBuffer(t) {
    this.bufferPool.length < this.config.maxBuffers && this.bufferPool.push(t);
  }
  async readFileAsStream(t, n) {
    const r = this.config.bufferSize;
    let a = 0;
    for (; a < t.size;) {
      const o = await t.slice(a, a + r).arrayBuffer(),
        s = new Uint8Array(o),
        l = (a + r) / t.size;
      await n(s, Math.min(l, 1)), a += r;
    }
  }
  async uploadFileAsStream(t, n, r) {
    const a = this.config.bufferSize;
    let i = 0;
    const o = Math.ceil(t.size / a);
    let s = 0;
    const l = new FormData();
    for (; i < t.size;) {
      const u = t.slice(i, i + a);
      if (l.append(`chunk_${s}`, u), s++, i += a, s % 5 === 0 || i >= t.size) {
        const h = s / o;
        r == null || r(h);
      }
    }
    const d = await fetch(n, {
      method: "POST",
      body: l
    });
    return r == null || r(1), d;
  }
  cleanup() {
    this.bufferPool = [], typeof gc < "u" && gc(), this.stats.cleanupCount++, this.stats.lastCleanupTime = Date.now(), console.log("[MemoryPoolManager] Cleanup completed");
    const t = new CustomEvent("memoryCleanup", {
      detail: {
        stats: this.getStats()
      }
    });
    window.dispatchEvent(t);
  }
  getStats() {
    return {
      ...this.stats
    };
  }
  getMemoryUsage() {
    if (!performance.memory) return null;
    const t = performance.memory.usedJSHeapSize,
      n = performance.memory.jsHeapSizeLimit,
      r = performance.memory.jsHeapSizeUsed;
    return {
      usedJSHeapSize: (t / (1024 * 1024)).toFixed(2) + " MB",
      jsHeapSizeLimit: (n / (1024 * 1024)).toFixed(2) + " MB",
      jsHeapSizeUsed: (r / (1024 * 1024)).toFixed(2) + " MB",
      usagePercent: (t / n * 100).toFixed(2) + "%"
    };
  }
  getPoolStatus() {
    return {
      poolSize: this.bufferPool.length,
      maxBuffers: this.config.maxBuffers,
      bufferSize: (this.config.bufferSize / (1024 * 1024)).toFixed(2) + " MB",
      totalPoolMemory: (this.bufferPool.length * this.config.bufferSize / (1024 * 1024)).toFixed(2) + " MB"
    };
  }
  setAutoCleanup(t) {
    this.config.autoCleanupEnabled = t, console.log(`[MemoryPoolManager] Auto cleanup: ${t ? "enabled" : "disabled"}`);
  }
  setCleanupThreshold(t) {
    this.config.cleanupThreshold = t, console.log(`[MemoryPoolManager] Cleanup threshold set to: ${t}MB`);
  }
}

const TR = new X1e({
    bufferSize: 1024 * 1024,
    maxBuffers: 10,
    monitorInterval: 5e3,
    warningThreshold: 4096,
    cleanupThreshold: 3072,
    autoCleanupEnabled: !0
  }),
  Vfr = Object.freeze(Object.defineProperty({
    __proto__: null,
    memoryPoolManager: TR
  }, Symbol.toStringTag, {
    value: "Module"
  }));

function Hfr() {
  var t;
  const e = a9().idleMemoryCleanupMs;
  try {
    const n = (t = window.__getCanvasMemoryRoots) == null ? void 0 : t.call(window);
    if (Array.isArray(n == null ? void 0 : n.nodes) && n.nodes.length === 0) return Math.min(e, 120 * 1e3);
  } catch {}
  return e;
}

let mSt = Hfr(),
  Dlt = null,
  fSt = !1;

async function lqi() {
  try {
    try {
      const {
        isCanvasViewInteracting: t,
        getCanvasPanning: n,
        getCanvasZooming: r
      } = await Ie(async () => {
        const {
          isCanvasViewInteracting: a,
          getCanvasPanning: i,
          getCanvasZooming: o
        } = await Promise.resolve().then(() => W2);
        return {
          isCanvasViewInteracting: a,
          getCanvasPanning: i,
          getCanvasZooming: o
        };
      }, [], import.meta.url);
      if (t() || n() || r()) {
        _$e();
        return;
      }
    } catch {}
    const {
      sessionMemoryReclaim: e
    } = await Ie(async () => {
      const {
        sessionMemoryReclaim: t
      } = await Promise.resolve().then(() => E$t);
      return {
        sessionMemoryReclaim: t
      };
    }, void 0, import.meta.url);
    await e(), TR.cleanup();
    try {
      const {
        enterCanvasJsIdleSuspend: t
      } = await Ie(async () => {
        const {
          enterCanvasJsIdleSuspend: n
        } = await Promise.resolve().then(() => Xsr);
        return {
          enterCanvasJsIdleSuspend: n
        };
      }, void 0, import.meta.url);
      t();
    } catch {}
    console.log("[IdleMemoryCleanup] 闲置会话回收完成，已切入 JS 深度挂起");
  } catch (e) {
    console.warn("[IdleMemoryCleanup] 清理失败:", e);
  }
  _$e();
}

function _$e() {
  Dlt !== null && clearTimeout(Dlt), mSt = Hfr(), Dlt = setTimeout(() => {
    lqi();
  }, mSt);
}

function Wfr() {
  fSt && _$e();
}

function cqi() {
  fSt || (fSt = !0, window.addEventListener("canvasActivity", Wfr), _$e(), console.log("[IdleMemoryCleanup] 已启动，闲置", mSt / 6e4, "分钟后自动清理缓存"));
}

const qfr = Object.freeze(Object.defineProperty({
  __proto__: null,
  initIdleMemoryCleanup: cqi,
  resetIdleTimer: Wfr
}, Symbol.toStringTag, {
  value: "Module"
}));

class dqi {
  constructor() {
    On(this, "resources", new Map());
    On(this, "globalResources", new Map());
    On(this, "referenceCounts", new Map());
    On(this, "resourceToNodes", new Map());
  }
  register(t, n, r) {
    const a = `${t}_${n}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.resources.has(t) || this.resources.set(t, []);
    const i = {
      type: n,
      resource: r,
      nodeId: t,
      createdAt: Date.now()
    };
    this.resources.get(t).push(i), this.globalResources.set(a, i);
    const o = typeof r == "string" ? r : `${n}_${a}`,
      s = this.referenceCounts.get(o) || 0;
    return this.referenceCounts.set(o, s + 1), this.resourceToNodes.has(o) || this.resourceToNodes.set(o, new Set()), this.resourceToNodes.get(o).add(t), a;
  }
  isResourceReferenced(t, n) {
    const r = typeof t == "string" ? t : `resource_${Date.now()}`,
      a = this.resourceToNodes.get(r);
    return !a || a.size === 0 ? !1 : n ? Array.from(a).filter(o => o !== n).length > 0 : a.size > 0;
  }
  getReferenceCount(t) {
    const n = typeof t == "string" ? t : `resource_${Date.now()}`;
    return this.referenceCounts.get(n) || 0;
  }
  registerBlobUrl(t, n) {
    return this.register(t, "blob-url", n);
  }
  registerImage(t, n) {
    return this.register(t, "image", n);
  }
  registerVideo(t, n) {
    return this.register(t, "video", n);
  }
  registerImageBitmap(t, n) {
    return this.register(t, "imagebitmap", n);
  }
  releaseNode(t, n = !1) {
    const r = this.resources.get(t);
    if (!r || r.length === 0) return;
    let a = 0,
      i = 0;
    r.forEach(o => {
      var s;
      try {
        const l = typeof o.resource == "string" ? o.resource : `resource_${Date.now()}`;
        if (!n && this.isResourceReferenced(o.resource, t)) {
          i++;
          const d = this.referenceCounts.get(l) || 0;
          d > 0 && this.referenceCounts.set(l, d - 1);
          const u = this.resourceToNodes.get(l);
          u && u.delete(t);
          return;
        }
        switch (o.type) {
          case "blob-url":
            typeof o.resource == "string" && o.resource.startsWith("blob:") && (URL.revokeObjectURL(o.resource), a++);
            break;
          case "image":
            o.resource instanceof HTMLImageElement && (o.resource.src = "", o.resource.onload = null, o.resource.onerror = null, a++);
            break;
          case "video":
            if (o.resource instanceof HTMLVideoElement) {
              o.resource.pause(), o.resource.src = "", o.resource.srcObject = null, o.resource.load();
              const d = o.resource.cloneNode(!1);
              (s = o.resource.parentNode) == null || s.replaceChild(d, o.resource), a++;
            }
            break;
          case "imagebitmap":
            o.resource instanceof ImageBitmap && (o.resource.close(), a++);
            break;
        }
      } catch (l) {
        console.warn(`[MediaResourceRegistry] Failed to release resource for node ${t}:`, l);
      }
    }), this.globalResources.forEach((o, s) => {
      o.nodeId === t && this.globalResources.delete(s);
    }), this.resources.delete(t), this.resourceToNodes.forEach((o, s) => {
      o.delete(t), o.size === 0 && (this.resourceToNodes.delete(s), this.referenceCounts.delete(s));
    }), (a > 0 || i > 0) && console.log(`[MediaResourceRegistry] Released ${a} resources, skipped ${i} (referenced) for node ${t}`);
  }
  releaseAll() {
    Array.from(this.resources.keys()).forEach(n => this.releaseNode(n)), this.resources.clear(), this.globalResources.clear();
  }
  getNodeResourceCount(t) {
    var n;
    return ((n = this.resources.get(t)) == null ? void 0 : n.length) || 0;
  }
  getStats() {
    const t = {
      totalNodes: this.resources.size,
      totalResources: 0,
      resourcesByType: {
        "blob-url": 0,
        image: 0,
        video: 0,
        imagebitmap: 0
      }
    };
    return this.resources.forEach(n => {
      t.totalResources += n.length, n.forEach(r => {
        t.resourcesByType[r.type]++;
      });
    }), t;
  }
}

const sDe = new dqi(),
  Kfr = Object.freeze(Object.defineProperty({
    __proto__: null,
    mediaResourceRegistry: sDe
  }, Symbol.toStringTag, {
    value: "Module"
  }));

class uqi {
  constructor() {
    On(this, "pool", new Map());
    On(this, "MAX_POOL_SIZE", 100);
    On(this, "POOL_TTL", 300 * 1e3);
  }
  poolNode(t, n) {
    this.pool.size >= this.MAX_POOL_SIZE && this.evictOldest();
    const r = {
      className: n.className,
      style: n.getAttribute("style") || "",
      dataAttributes: {}
    };
    Array.from(n.attributes).forEach(a => {
      a.name.startsWith("data-") && (r.dataAttributes[a.name] = a.value);
    }), n.style.opacity = "0", n.style.pointerEvents = "none", this.pool.set(t, {
      nodeId: t,
      element: n,
      pooledAt: Date.now(),
      savedState: r
    }), hqi(), console.log(`[NodePool] Pooled node ${t}, pool size: ${this.pool.size}`);
  }
  getPooledNode(t) {
    const n = this.pool.get(t);
    if (!n) return null;
    if (Date.now() - n.pooledAt > this.POOL_TTL) return this.pool.delete(t), null;
    const {
      element: a,
      savedState: i
    } = n;
    return a.className = i.className || "", i.style ? a.setAttribute("style", i.style) : a.removeAttribute("style"), Object.entries(i.dataAttributes || {}).forEach(([o, s]) => {
      a.setAttribute(o, s);
    }), a.style.opacity = "", a.style.pointerEvents = "", this.pool.delete(t), console.log(`[NodePool] Retrieved pooled node ${t}`), a;
  }
  evictOldest() {
    let t = null,
      n = 1 / 0;
    if (this.pool.forEach((r, a) => {
      r.pooledAt < n && (n = r.pooledAt, t = a);
    }), t) {
      const r = this.pool.get(t);
      r && (r.element.remove(), sDe.releaseNode(t)), this.pool.delete(t), console.log(`[NodePool] Evicted oldest node ${t}`);
    }
  }
  cleanupExpired() {
    const t = Date.now(),
      n = [];
    this.pool.forEach((r, a) => {
      t - r.pooledAt > this.POOL_TTL && n.push(a);
    }), n.forEach(r => {
      const a = this.pool.get(r);
      a && (a.element.remove(), sDe.releaseNode(r)), this.pool.delete(r);
    }), n.length > 0 && console.log(`[NodePool] Cleaned up ${n.length} expired nodes`);
  }
  clear() {
    this.pool.forEach(t => {
      t.element.remove(), sDe.releaseNode(t.nodeId);
    }), this.pool.clear(), qzt(), console.log("[NodePool] Pool cleared");
  }
  getStats() {
    return {
      size: this.pool.size,
      maxSize: this.MAX_POOL_SIZE
    };
  }
}

const Kz = new uqi();

let J1e = null;

function hqi() {
  J1e === null && (J1e = setInterval(() => {
    Kz.cleanupExpired(), Kz.getStats().size === 0 && qzt();
  }, 6e4));
}

function qzt() {
  J1e !== null && (clearInterval(J1e), J1e = null);
}

function Qfr() {
  qzt(), Kz.clear();
}

const pqi = () => {
  g.useRef(null);
  const e = g.useRef(n => Kz.getPooledNode(n)).current,
    t = g.useRef((n, r) => {
      Kz.poolNode(n, r);
    }).current;
  return g.useInsertionEffect(() => {}, []), {
    getPooledNode: e,
    poolNode: t,
    getStats: () => Kz.getStats()
  };
};

typeof window < "u" && setInterval(() => {
  Kz.cleanupExpired();
}, 6e4);

const mqi = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Kz,
  destroyNodePool: Qfr,
  useNodePool: pqi
}, Symbol.toStringTag, {
  value: "Module"
}));

class fqi {
  constructor() {
    On(this, "cache", new Map());
    On(this, "lastViewHash", "");
    On(this, "lastNodesHash", "");
  }
  isViewChanged(t, n = 1) {
    const r = `${Math.floor(t.x / n)},${Math.floor(t.y / n)},${t.zoom.toFixed(2)}`;
    return r !== this.lastViewHash ? (this.lastViewHash = r, !0) : !1;
  }
  isNodesChanged(t) {
    const n = t.slice(0, 10).map(r => `${r.id}:${Math.floor(r.x)},${Math.floor(r.y)}`).join("|");
    return n !== this.lastNodesHash ? (this.lastNodesHash = n, !0) : !1;
  }
  get(t) {
    return this.cache.get(t);
  }
  set(t, n) {
    this.cache.set(t, n);
  }
  clear() {
    this.cache.clear(), this.lastViewHash = "", this.lastNodesHash = "";
  }
  clearConnection(t) {
    this.cache.delete(t);
  }
}

const Zre = new fqi();

function gqi(e, t, n, r, a, i, o = 100) {
  const s = Math.min(e, n),
    l = Math.max(e, n),
    d = Math.min(t, r),
    u = Math.max(t, r);
  return l >= -o && s <= a + o && u >= -o && d <= i + o;
}

function yqi(e, t, n, r, a, i, o = !0) {
  const s = [];
  (!o || Zre.isViewChanged(n, 10)) && (o || Zre.clear());
  for (const l of e) {
    const d = t.get(l.from),
      u = t.get(l.to);
    if (!d || !u) continue;
    if (o) {
      const A = Zre.get(l.id);
      if (A && !(A.startX !== (d.x + d.width) * n.zoom + n.x || A.endX !== u.x * n.zoom + n.x)) {
        A.isRelatedToSelected = i.has(l.from) || i.has(l.to), s.push(A);
        continue;
      }
    }
    const h = (d.x + d.width) * n.zoom + n.x,
      p = (d.y + d.height / 2) * n.zoom + n.y,
      m = u.x * n.zoom + n.x,
      f = (u.y + u.height / 2) * n.zoom + n.y;
    if (!gqi(h, p, m, f, r, a, 200)) continue;
    const b = OEt(h, p, m, f),
      v = i.has(l.from) || i.has(l.to),
      _ = (h + m) / 2,
      w = (p + f) / 2,
      k = {
        conn: l,
        startX: h,
        startY: p,
        endX: m,
        endY: f,
        pathD: b,
        midX: _,
        midY: w,
        isVisible: !0,
        isRelatedToSelected: v
      };
    o && Zre.set(l.id, k), s.push(k);
  }
  return s.sort((l, d) => l.isRelatedToSelected && !d.isRelatedToSelected ? 1 : !l.isRelatedToSelected && d.isRelatedToSelected ? -1 : 0), s;
}

function Yfr() {
  Zre.clear();
}

function bqi(e) {
  Zre.clear();
}

const vqi = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearConnectionCache: Yfr,
  clearConnectionCacheForNode: bqi,
  computeConnectionsOptimized: yqi
}, Symbol.toStringTag, {
  value: "Module"
}));

class wqi {
  constructor(t = 8) {
    On(this, "batchQueue", null);
    On(this, "rafId", null);
    On(this, "updateThrottleMs", 8);
    On(this, "lastUpdateTime", 0);
    On(this, "isProcessing", !1);
    On(this, "batchCount", 0);
    On(this, "nodeUpdateCount", 0);
    this.updateThrottleMs = t;
  }
  queueNodeUpdate(t, n, r, a = 1) {
    this.batchQueue || (this.batchQueue = {
      nodeUpdates: new Map(),
      edgeUpdates: new Map(),
      timestamp: performance.now()
    }), this.batchQueue.nodeUpdates.set(t, {
      x: n,
      y: r,
      scale: a
    }), this.nodeUpdateCount++, this._scheduleFlush();
  }
  queueEdgeUpdate(t, n) {
    this.batchQueue || (this.batchQueue = {
      nodeUpdates: new Map(),
      edgeUpdates: new Map(),
      timestamp: performance.now()
    }), this.batchQueue.edgeUpdates.set(t, n), this._scheduleFlush();
  }
  _scheduleFlush() {
    if (performance.now() - this.lastUpdateTime >= this.updateThrottleMs) {
      this._flush();
      return;
    }
    this.rafId === null && (this.rafId = requestAnimationFrame(() => {
      this.rafId = null, this._flush();
    }));
  }
  _flush() {
    if (!(!this.batchQueue || this.isProcessing)) {
      this.isProcessing = !0, this.lastUpdateTime = performance.now();
      try {
        const t = this.batchQueue;
        this.batchQueue = null, this.batchCount++;
        for (const [n, {
          x: r,
          y: a,
          scale: i
        }] of t.nodeUpdates.entries()) this._updateNodeDOM(n, r, a, i);
        for (const [n, r] of t.edgeUpdates.entries()) this._updateEdgeDOM(n, r);
        this._forceLayoutIfNeeded();
      } finally {
        this.isProcessing = !1;
      }
    }
  }
  _updateNodeDOM(t, n, r, a) {
    try {
      const i = document.querySelector(`[data-node-id="${t}"]`);
      if (!i) return;
      i.style.transform = `translate3d(${n}px, ${r}px, 0) scale(${a})`, i.style.willChange = "transform";
    } catch (i) {
      console.error("[CanvasDOMBatchOptimizer] Failed to update node:", t, i);
    }
  }
  _updateEdgeDOM(t, n) {
    try {
      const r = document.querySelector(`[data-edge-id="${t}"] path`);
      if (!r) return;
      r.setAttribute("d", n);
    } catch (r) {
      console.error("[CanvasDOMBatchOptimizer] Failed to update edge:", t, r);
    }
  }
  _forceLayoutIfNeeded() {}
  flush() {
    this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), this._flush();
  }
  clear() {
    this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), this.batchQueue = null;
  }
  getMetrics() {
    return {
      batchCount: this.batchCount,
      nodeUpdateCount: this.nodeUpdateCount,
      pendingUpdates: this.batchQueue ? {
        nodes: this.batchQueue.nodeUpdates.size,
        edges: this.batchQueue.edgeUpdates.size
      } : null,
      throttleMs: this.updateThrottleMs
    };
  }
  resetMetrics() {
    this.batchCount = 0, this.nodeUpdateCount = 0;
  }
  destroy() {
    this.clear(), this.batchQueue = null;
  }
}

let goe = null;

function gSt(e) {
  return goe || (goe = new wqi(e)), goe;
}

function xqi() {
  goe && (goe.destroy(), goe = null);
}

const _qi = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: gSt,
  destroyCanvasDOMBatchOptimizer: xqi,
  getCanvasDOMBatchOptimizer: gSt
}, Symbol.toStringTag, {
  value: "Module"
}));

let eae = new Map(),
  RW = null;

function kqi(e, t, n = 16) {
  eae.set(e, {
    ...eae.get(e),
    ...t
  }), RW !== null && clearTimeout(RW), RW = window.setTimeout(() => {
    const r = Array.from(eae.entries());
    eae.clear(), RW = null, window.dispatchEvent(new CustomEvent("batchNodeUpdate", {
      detail: {
        updates: r
      }
    }));
  }, n);
}

function Xfr() {
  RW !== null && (clearTimeout(RW), RW = null), eae.clear();
}

function Aqi() {
  return {
    pendingNodeUpdates: eae.size
  };
}

function Sqi(e, t = 16) {
  let n = 60,
    r = t;
  return typeof window < "u" && window.addEventListener("fpsUpdate", (a => {
    n = a.detail.fps, n < 30 ? r = t * 2 : n > 50 ? r = t : r = t * 1.5;
  })), MCn(e, r);
}

function Iqi(e, t) {
  let n = 100;
  return t > 200 ? n = 300 : t > 100 ? n = 200 : t > 50 && (n = 150), BHe(e, n);
}

function Cqi() {
  if (typeof navigator > "u") return !1;
  if ((navigator.hardwareConcurrency || 4) < 4) return !0;
  const t = navigator.deviceMemory;
  return !!(t && t < 4);
}

function Eqi(e, t = "low") {
  "requestIdleCallback" in window && t === "idle" ? requestIdleCallback(e, {
    timeout: 2e3
  }) : setTimeout(e, t === "idle" ? 100 : 50);
}

async function Tqi(e, t, n = 10, r = 16) {
  const a = [];
  for (let i = 0; i < e.length; i += n) {
    const o = e.slice(i, i + n),
      s = await Promise.all(o.map(t));
    a.push(...s), i + n < e.length && (await new Promise(l => setTimeout(l, r)));
  }
  return a;
}

const Mqi = Object.freeze(Object.defineProperty({
  __proto__: null,
  clearNodeUpdateQueue: Xfr,
  createAdaptiveThrottle: Sqi,
  createLargeProjectDebounce: Iqi,
  deferNonCriticalTask: Eqi,
  getPerformanceOptimizerProbe: Aqi,
  isLowPerformanceDevice: Cqi,
  processBatch: Tqi,
  queueNodeUpdate: kqi
}, Symbol.toStringTag, {
  value: "Module"
}));

function jte(e) {
  const t = {},
    n = ["id", "task_id", "status", "code", "message", "msg", "error", "failure_reason", "progress"],
    r = (a, i = "") => {
      if (!a || typeof a != "object") return;
      const o = a;
      for (const s of n) {
        const l = o[s];
        typeof l == "string" ? t[i + s] = l.slice(0, 160) : (typeof l == "number" || typeof l == "boolean") && (t[i + s] = l);
      }
      for (const s of ["data", "images", "results", "output"]) Array.isArray(o[s]) && (t[i + s + "Count"] = o[s].length);
    };
  return r(e), r(e == null ? void 0 : e.data, "data."), JSON.stringify(t);
}

function Kzt(e, t = {}) {
  return e === "h3" ? {
    generationMode: t.localVideoGenerationMode === "standard" ? "standard" : "fast",
    generateAudio: t.localGenerateAudio !== !1
  } : {
    generationMode: ["fast", "high"].includes(t.localImageGenerationMode || "") ? t.localImageGenerationMode : "standard",
    faceOptimizationEnabled: t.localFaceOptimization === !0
  };
}

async function Pqi(e, t) {
  const {
      protocol: n
    } = e,
    r = iTt(n);
  if (r) throw new Error(r);
  const a = JSON.stringify(n.body),
    i = a.includes('"$imageParts"');
  if (e.refImages.length && !/"\$(images|firstImage|lastImage|imageParts)"/.test(a)) throw new Error("此接口未配置参考图，请在 API 接入中编辑模型并补充参考图映射");
  if (e.mask && !a.includes("$mask")) throw new Error("当前自定义接口未映射蒙版字段");
  const o = async w => n.format === "multipart" ? t.getBlob(w) : n.referenceMode === "dataUrl" || i ? t.toDataUrl(await t.getBlob(w)) : t.toRemoteUrl(w),
    s = await Promise.all(e.refImages.map(o)),
    [l, d] = e.ratio.split(":").map(Number),
    u = parseFloat(e.resolution) * 1024,
    h = Number.isFinite(u) && u >= 512 && u <= 8192 ? u : 1024,
    p = l > 0 && d > 0 ? Math.round((l >= d ? h : h * l / d) / 8) * 8 : h,
    m = l > 0 && d > 0 ? Math.round((d >= l ? h : h * d / l) / 8) * 8 : h,
    f = e.settings || {},
    y = Pf(e.canvasUiTemplateId),
    b = {
      $model: e.modelName,
      $prompt: e.prompt,
      $ratio: i && e.ratio === "Auto" ? void 0 : y && f.gptImage2AspectRatio || e.ratio,
      $resolution: i ? e.resolution.toUpperCase() : y && f.gptImage2Resolution || e.resolution,
      $quality: e.quality || f.gptImageQuality || f.grokImageQuality || (y ? TP(e.canvasUiTemplateId, void 0) : void 0),
      $background: f.gptImageBackground || (y ? "auto" : void 0),
      $outputFormat: f.gptImageOutputFormat || (y ? "png" : void 0),
      $duration: parseFloat(e.duration || "") || void 0,
      $durationText: e.duration ? String(parseFloat(e.duration)) : void 0,
      $count: 1,
      $seed: e.seed,
      $size: y ? $6n(f, e.ratio) : /^\d+x\d+$/.test(e.ratio) ? e.ratio : `${p}x${m}`,
      $images: s.length ? s : void 0,
      $firstImage: s[0],
      $lastImage: s.length ? s[s.length - 1] : void 0,
      $imageParts: i ? s.map(w => {
        const k = typeof w == "string" && /^data:(image\/[\w.+-]+);base64,([\s\S]+)$/.exec(w);
        if (!k) throw new Error("无法读取参考图的 Base64 图片数据");
        return {
          inlineData: {
            mimeType: k[1],
            data: k[2]
          }
        };
      }) : void 0,
      $mask: e.mask ? await o(e.mask) : void 0
    },
    v = nOe(n.body, b);
  for (const w of n.requiredFields || []) {
    const k = w.split(".").reduce((A, S) => A == null ? void 0 : A[S], v);
    if (k == null || k === "" || Array.isArray(k) && !k.length) throw new Error(`请补充必填参数 ${w}`);
  }
  for (const [w, k] of Object.entries(n.valueOptions || {})) {
    const A = w.split("."),
      S = A.pop(),
      C = A.reduce((M, T) => M == null ? void 0 : M[T], v);
    if (!C || C[S] === void 0) continue;
    const E = k.find(M => M === C[S]) ?? k.find(M => String(M).toLowerCase() === String(C[S]).toLowerCase());
    if (E === void 0) throw new Error(`参数 ${w} 不支持 ${String(C[S])}，请选择：${k.join("、")}`);
    C[S] = E;
  }
  let _ = v;
  if (n.format === "multipart") {
    const w = new FormData(),
      k = A => A instanceof Blob || !!(A && typeof A == "object" && Object.values(A).some(k));
    for (const [A, S] of Object.entries(v)) {
      const C = Array.isArray(S) ? S : [S];
      for (const I of C) if (I instanceof Blob) {
        if (!I.size) throw new Error("参考图文件为空");
        w.append(A, I, `reference.${I.type === "image/jpeg" ? "jpg" : "png"}`);
      } else {
        if (k(I)) throw new Error("文件表单的参考图须绑定到顶层字段，不能放在嵌套 JSON 中");
        w.append(A, typeof I == "object" ? JSON.stringify(I) : String(I));
      }
    }
    _ = w;
  }
  return {
    endpoint: tOe(e.baseUrl, n.path, void 0, e.modelName),
    payload: _,
    useMultipart: n.format === "multipart"
  };
}

const ySt = "#00FF00",
  bSt = "#FF00FF",
  vSt = {
    [ySt]: {
      r: 0,
      g: 255,
      b: 0
    },
    [bSt]: {
      r: 255,
      g: 0,
      b: 255
    }
  },
  Wpn = ["[背景指令]", "背景色选择规则：如果主体包含绿色系（绿、青绿、黄绿、草绿等）颜色，使用纯洋红色(#FF00FF)背景；否则一律使用纯绿色(#00FF00)背景。", "背景要求：整张画布仅由所选纯色填充，无任何渐变、纹理、阴影、光照变化、地面或环境元素。", "主体要求：单主体、完整呈现、轮廓清晰锐利。主体与背景之间保持干净的边缘分离，不要有颜色溢出或混合。", "禁止：主体本身、描边、光晕、投影或反射中不能出现所选背景色。"].join(`
`);

function Jfr(e) {
  return String(e.background || "").trim().toLowerCase() !== "transparent" ? !1 : yTt(e.modelId) ? !0 : !_Br(e.platformGroup);
}

function Rqi(e) {
  return e.isVideoGeneration || e.needsMjGridSplit ? !1 : !!(e.globalOssMode || e.localCacheMode || e.hasInlineBase64);
}

async function Nqi(e, t) {
  return !Jfr({
    background: t.background,
    platformGroup: t.platformGroup,
    modelId: t.modelId
  }) || !fm(t.modelId) ? e : (console.log("[GPT Image] 回图后执行本地透明底抠图", {
    count: e.length
  }), Vqi(e, t.loadBlob));
}

function jqi(e) {
  const t = String(e || "").trim();
  return t.includes("[背景指令]") && /#00FF00|#FF00FF/.test(t) ? t : t ? `${t}

${Wpn}` : Wpn;
}

function Dqi(e, t, n) {
  const r = [];
  for (let l = 0; l < t; l += 1) r.push(l), r.push((n - 1) * t + l);
  for (let l = 1; l < n - 1; l += 1) r.push(l * t), r.push(l * t + t - 1);
  let a = 0,
    i = 0;
  const o = vSt[ySt],
    s = vSt[bSt];
  for (const l of r) {
    const d = l * 4,
      u = e[d],
      h = e[d + 1],
      p = e[d + 2],
      m = Math.sqrt((u - o.r) ** 2 + (h - o.g) ** 2 + (p - o.b) ** 2),
      f = Math.sqrt((u - s.r) ** 2 + (h - s.g) ** 2 + (p - s.b) ** 2);
    m < 100 && (a += 1), f < 100 && (i += 1);
  }
  return i > a ? bSt : ySt;
}

function Lqi(e, t, n, r) {
  if (e.length < t * n * 4) throw new Error("透明背景像素数据尺寸不匹配");
  const a = Jqi(r),
    i = Hqi(e, t, n, a);
  return Kqi(e, i, t, n, a), e;
}

function Oqi(e) {
  for (let t = 3; t < e.length; t += 16) if (e[t] < 250) return !0;
  return !1;
}

function Bqi(e) {
  let t = 0;
  const n = e.length / 4;
  for (let r = 3; r < e.length; r += 4) e[r] < 16 && (t += 1);
  return n > 0 ? t / n : 0;
}

async function Fqi(e) {
  const t = new Image();
  return t.decoding = "async", await new Promise((n, r) => {
    t.onload = () => n(), t.onerror = () => r(new Error("透明底后处理：图片加载失败")), t.src = e;
  }), t;
}

async function zqi(e) {
  const t = URL.createObjectURL(e);
  try {
    const n = await Fqi(t),
      r = document.createElement("canvas");
    r.width = n.naturalWidth, r.height = n.naturalHeight;
    const a = r.getContext("2d", {
      willReadFrequently: !0
    });
    if (!a) throw new Error("当前环境不支持 Canvas，无法执行透明底后处理");
    a.drawImage(n, 0, 0);
    const i = a.getImageData(0, 0, r.width, r.height);
    if (Oqi(i.data)) return e.type.includes("png") ? e : await qpn(r);
    const o = Dqi(i.data, r.width, r.height);
    return Lqi(i.data, r.width, r.height, o), Bqi(i.data) < .02 ? e : (a.putImageData(i, 0, 0), await qpn(r));
  } finally {
    URL.revokeObjectURL(t);
  }
}

async function qpn(e) {
  const t = await new Promise(n => {
    e.toBlob(r => n(r), "image/png");
  });
  if (!t) throw new Error("透明底后处理：导出 PNG 失败");
  return t;
}

function Uqi(e) {
  return new Promise((t, n) => {
    const r = new FileReader();
    r.onload = () => t(String(r.result || "")), r.onerror = () => n(new Error("透明底后处理：读取结果失败")), r.readAsDataURL(e);
  });
}

const $qi = 2e4;

async function Gqi(e, t) {
  let n;
  try {
    return await Promise.race([e(t), new Promise((r, a) => {
      n = setTimeout(() => a(new Error("透明底后处理：下载原图超时")), $qi);
    })]);
  } finally {
    n && clearTimeout(n);
  }
}

async function Vqi(e, t) {
  const n = [];
  for (const r of e) {
    const a = String(r || "").trim();
    if (!a) {
      n.push(r);
      continue;
    }
    try {
      const i = a.startsWith("data:") ? await (await fetch(a)).blob() : await Gqi(t, a),
        o = await zqi(i);
      n.push(await Uqi(o));
    } catch (i) {
      console.warn("[GPT Image] 本地透明底后处理失败，保留原图", i), n.push(r);
    }
  }
  return n;
}

function Hqi(e, t, n, r) {
  const a = Wqi(e, t, n, r);
  return qqi(e, t, n, r, a), a;
}

function Wqi(e, t, n, r) {
  const a = t * n,
    i = new Uint8Array(a),
    o = new Uint8Array(a),
    s = new Uint32Array(a);
  let l = 0,
    d = 0;
  const u = h => {
    o[h] || (o[h] = 1, !(Z1e(e, h, r) < .18) && (i[h] = 1, s[d] = h, d += 1));
  };
  for (let h = 0; h < t; h += 1) u(h), u((n - 1) * t + h);
  for (let h = 1; h < n - 1; h += 1) u(h * t), u(h * t + t - 1);
  for (; l < d;) {
    const h = s[l];
    l += 1;
    const p = h % t,
      m = Math.floor(h / t);
    p > 0 && u(h - 1), p < t - 1 && u(h + 1), m > 0 && u(h - t), m < n - 1 && u(h + t);
  }
  return i;
}

function qqi(e, t, n, r, a) {
  const i = t * n,
    o = new Uint8Array(i),
    s = new Uint32Array(i),
    l = new Uint32Array(i);
  for (let d = 0; d < i; d += 1) {
    if (a[d] || o[d] || Z1e(e, d, r) < .68) continue;
    let u = 0,
      h = 0,
      p = 0,
      m = 0,
      f = 0,
      y = 0;
    o[d] = 1, s[h] = d, h += 1;
    const b = A => {
      A < 0 || a[A] || o[A] || Z1e(e, A, r) < .24 || (o[A] = 1, s[h] = A, h += 1);
    };
    for (; u < h;) {
      const A = s[u];
      u += 1;
      const S = Z1e(e, A, r);
      l[p] = A, p += 1, m += S, S >= .68 && (f += 1), S >= .86 && (y += 1);
      const C = A % t,
        I = Math.floor(A / t);
      b(C > 0 ? A - 1 : -1), b(C < t - 1 ? A + 1 : -1), b(I > 0 ? A - t : -1), b(I < n - 1 ? A + t : -1);
    }
    const v = m / p,
      _ = f / p,
      w = y / p;
    if (v >= .42 || _ >= .18 || w >= .05 || p <= 3 && v >= .34) for (let A = 0; A < p; A += 1) a[l[A]] = 1;
  }
}

function Kqi(e, t, n, r, a) {
  const i = Qqi(t, n, r, 4),
    o = n * r;
  for (let s = 0; s < o; s += 1) {
    const l = s * 4,
      d = e[l],
      u = e[l + 1],
      h = e[l + 2],
      p = Z1e(e, s, a);
    let m = 255;
    if (t[s]) m = 0;else {
      const y = i[s];
      if (y > 0) {
        const b = Yqi(d, u, h, p, y, a);
        b > 0 && (m = Math.round(255 * (1 - b))), m = Math.max(m, y === 1 ? 48 : y === 2 ? 128 : 196);
      } else {
        const b = Qzt(d, u, h, a);
        p >= .46 && b >= .45 && (m = Math.round(255 * (1 - b * .75)), m = Math.max(m, 96));
      }
    }
    const f = Xqi(d, u, h, m, a, p, i[s]);
    e[l] = f.r, e[l + 1] = f.g, e[l + 2] = f.b, e[l + 3] = m;
  }
}

function Qqi(e, t, n, r) {
  const a = t * n,
    i = new Uint8Array(a);
  let o = [];
  for (let s = 0; s < a; s += 1) {
    if (e[s]) continue;
    const l = s % t,
      d = Math.floor(s / t);
    (l > 0 && e[s - 1] || l < t - 1 && e[s + 1] || d > 0 && e[s - t] || d < n - 1 && e[s + t]) && (i[s] = 1, o.push(s));
  }
  for (let s = 1; s < r; s += 1) {
    const l = [];
    for (const d of o) {
      const u = d % t,
        h = Math.floor(d / t);
      nPe(i, e, l, u > 0 ? d - 1 : -1, s), nPe(i, e, l, u < t - 1 ? d + 1 : -1, s), nPe(i, e, l, h > 0 ? d - t : -1, s), nPe(i, e, l, h < n - 1 ? d + t : -1, s);
    }
    if (o = l, !o.length) break;
  }
  return i;
}

function nPe(e, t, n, r, a) {
  r < 0 || t[r] || e[r] !== 0 || (e[r] = a + 1, n.push(r));
}

function Z1e(e, t, n) {
  const r = t * 4,
    a = Math.sqrt((e[r] - n.r) ** 2 + (e[r + 1] - n.g) ** 2 + (e[r + 2] - n.b) ** 2);
  return Kde((150 - a) / 150);
}

function Yqi(e, t, n, r, a, i) {
  const o = a <= 1 ? 1 : a === 2 ? .75 : a === 3 ? .45 : .25,
    s = Kde((r - .08) / .84 * o),
    l = Qzt(e, t, n, i) * o;
  return Kde(Math.max(s, l));
}

function Qzt(e, t, n, r) {
  return r.g === 255 ? Kde((t - Math.min(e, n)) / 255) : Kde((Math.min(e, n) - t * .65) / 255);
}

function Xqi(e, t, n, r, a, i, o) {
  if (r === 0) return {
    r: e,
    g: t,
    b: n
  };
  const s = o <= 0 ? i >= .46 ? .35 : 0 : o === 1 ? .55 : o === 2 ? .32 : .16,
    l = Qzt(e, t, n, a) * s,
    d = Kde(Math.max((255 - r) / 255, (i - .1) / .9 * s, l));
  if (d <= 0) return {
    r: e,
    g: t,
    b: n
  };
  const u = Math.max(.08, 1 - d);
  return {
    r: Llt((e - a.r * d) / u),
    g: Llt((t - a.g * d) / u),
    b: Llt((n - a.b * d) / u)
  };
}

function Jqi(e) {
  const t = vSt[e.toUpperCase()];
  if (!t) throw new Error("透明背景键色不支持");
  return t;
}

function Kde(e) {
  return Math.max(0, Math.min(1, e));
}

function Llt(e) {
  return Math.max(0, Math.min(255, Math.round(e)));
}

function Kpn(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

async function Zqi(e, t) {
  var Q;
  const {
      currentModel: n,
      baseUrl: r,
      prompt: a,
      ratio: i,
      resolution: o,
      rememberedQuality: s,
      hasReferenceImage: l,
      expandMode: d,
      canComflyOssUrlJsonGenerations: u,
      shopComflyNoRemoteImageUrl: h
    } = e,
    p = {
      ...e.settings
    },
    m = e.config ? {
      ...e.config
    } : void 0,
    f = e.refImages.slice(),
    y = e.comflyOssRefUrls.slice(),
    b = Kpn({
      hasReferenceImage: l,
      refImages: f
    }),
    v = Kpn({
      hasReferenceImage: l,
      refImages: y
    }),
    _ = (Q = e.markerMasks) == null ? void 0 : Q.map(q => ({
      ...q
    }));
  let w = "",
    k = !1,
    A = {};
  const S = (p == null ? void 0 : p.useAsyncMode) ?? !0,
    C = S ? "?async=true" : "";
  console.log(`[GPT Image] 使用${S ? "异步" : "同步"}模式`);
  const I = q => ({
      "1:1": "1024x1024",
      "16:9": "1792x1024",
      "21:9": "1792x1024",
      "4:3": "1536x1024",
      "3:2": "1536x1024",
      "9:16": "1024x1792",
      "3:4": "1024x1536",
      "2:3": "1024x1536",
      Auto: "1024x1024"
    })[q] || "1024x1024",
    E = String((m == null ? void 0 : m.id) || n).trim(),
    M = ux(E),
    T = fm(E) || !(m != null && m.isCustom) && fm((m == null ? void 0 : m.modelName) || n) || fm(n),
    P = zS(E),
    R = P ? mg(String((p == null ? void 0 : p.gptImage2Resolution) || (p == null ? void 0 : p.resolution) || o || "1k")) : M ? mg(String((p == null ? void 0 : p.gptImage2Resolution) || (p == null ? void 0 : p.resolution) || o || "auto")) : String((p == null ? void 0 : p.gptImage2Resolution) || (p == null ? void 0 : p.resolution) || o || ""),
    j = P && sOe(R),
    B = m != null && m.isCustom ? m.modelName || n : j ? CBr(R) : M ? EBr((m == null ? void 0 : m.modelName) || E) : O6n((m == null ? void 0 : m.modelName) || n),
    F = j ? TBr(p, String((p == null ? void 0 : p.ratio) || i || "").trim()) : null,
    N = () => M ? $6n(p, String((p == null ? void 0 : p.ratio) || i || "").trim()) : z6n(U6n(p, String((p == null ? void 0 : p.ratio) || i || "").trim()), R, p == null ? void 0 : p.gptImage2CustomSize),
    G = T ? TP(E, p == null ? void 0 : p.gptImageQuality, s) : String((p == null ? void 0 : p.gptImageQuality) || "standard"),
    z = T ? Dj(p == null ? void 0 : p.gptImageBackground) : String((p == null ? void 0 : p.gptImageBackground) || "opaque"),
    V = T ? "png" : String((p == null ? void 0 : p.gptImageOutputFormat) || "webp"),
    O = String((p == null ? void 0 : p.gptImageModeration) || "auto"),
    L = T && z === "transparent",
    D = String((p == null ? void 0 : p.platformGroup) || "").trim(),
    U = Jfr({
      background: z,
      platformGroup: D,
      modelId: E
    }),
    H = L && !U,
    Y = U ? jqi(a) : a.trim();
  U ? console.log("[GPT Image] 透明底：便宜渠道走本地抠图（纯绿/品红背景后处理）", {
    platformGroup: D || "default",
    model: B
  }) : H && console.log("[GPT Image] 透明底：官方 generate 参数", {
    background: "transparent",
    output_format: "png",
    platformGroup: D || "default"
  });
  const K = async q => {
      const ne = String(q || "").trim();
      if (!ne || ne.startsWith("data:image/") || ne.startsWith("http://") || ne.startsWith("https://")) return ne;
      const de = await t.getBlob(ne);
      return await Fu(de);
    },
    W = async () => {
      if (b.length === 0) return;
      if (u) return console.log("[GPT Image 2] 全局 OSS：generations JSON 直链参考图", {
        count: v.length,
        urls: v.map(ne => `${ne.slice(0, 72)}…`)
      }), F8(v);
      const q = await Promise.all(b.map(async ne => {
        try {
          const de = await t.prepareReference(ne);
          return await Fu(de);
        } catch (de) {
          return console.warn("[GPT Image 2] Phase3 prepare 失败，回退 toImageString:", de), K(ne);
        }
      }));
      return console.log("[GPT Image 2] 本地/非 OSS：generations JSON prepare 参考图", q.length, "张"), F8(q);
    };
  if (T && (!_ || _.length === 0) && !(l && h)) {
    w = `${r}/v1/images/generations${H ? "" : C}`;
    const ne = await W();
    if (j && F) H ? A = {
      model: B,
      prompt: Y,
      background: "transparent",
      output_format: "png",
      aspect_ratio: F,
      quality: G,
      ...(ne ? {
        image: ne
      } : {})
    } : A = {
      model: B,
      prompt: Y,
      response_format: "url",
      aspect_ratio: F,
      quality: G,
      output_format: U ? "png" : V,
      moderation: O,
      ...(U ? {} : {
        background: z
      }),
      ...(ne ? {
        image: ne
      } : {})
    }, console.log(`[GPT Image -All] ${R.toUpperCase()} generations`, {
      model: B,
      aspect_ratio: F,
      localTransparent: U
    });else {
      const de = N();
      H ? A = {
        model: B,
        prompt: Y,
        background: "transparent",
        output_format: "png",
        size: de,
        quality: G,
        ...(ne ? {
          image: ne
        } : {})
      } : A = {
        model: B,
        prompt: Y,
        response_format: "url",
        size: de,
        quality: G,
        output_format: U ? "png" : V,
        moderation: O,
        ...(U ? {} : {
          background: z
        }),
        ...(ne ? {
          image: ne
        } : {})
      }, (M || L) && console.log("[GPT Image] generations", {
        model: B,
        size: de,
        quality: G,
        localTransparent: U,
        nativeTransparent: H,
        sync: H
      });
    }
  } else if (l) {
    h && T && console.log("[GPT Image 2] shop.comfly.chat：参考图走 edits multipart（画布 prepare 文件上传）"), U ? console.log("[GPT Image] 透明底图生图：edits + 本地抠图（不传 background）") : H && console.log("[GPT Image] 透明底图生图：edits + background/output_format=png"), w = `${r}/v1/images/edits${H ? "" : C}`, k = !0;
    const ne = new FormData();
    if (ne.append("model", T ? B : (m == null ? void 0 : m.modelName) || n), ne.append("prompt", T ? Y : a), ne.append("n", "1"), H || ne.append("response_format", "url"), T && j && F) ne.append("aspect_ratio", F), console.log(`[GPT Image -All] ${R.toUpperCase()} edits`, {
      model: B,
      aspect_ratio: F
    });else {
      const J = T ? N() : I(i);
      ne.append("size", J), M && console.log("[GPT Image] edits", {
        model: B,
        size: J,
        aspect: p == null ? void 0 : p.gptImage2AspectRatio,
        resolutionUi: R
      });
    }
    ne.append("quality", G), T && (H ? (ne.append("background", "transparent"), ne.append("output_format", "png")) : (ne.append("output_format", U ? "png" : V), ne.append("moderation", O), U || ne.append("background", z)));
    let de = [],
      le = {
        w: 0,
        h: 0
      };
    try {
      const J = [];
      for (let pe = 0; pe < b.length; pe++) J.push(await t.prepareReference(b[pe], `input_${pe}.png`));
      le = J.length > 0 ? await Unn(J[0]) : {
        w: 0,
        h: 0
      }, de = d ? J : await Promise.all(J.map(async pe => {
        try {
          const {
            makeImageSquare: ce
          } = await Ie(async () => {
            const {
              makeImageSquare: we
            } = await Promise.resolve().then(() => Aoe);
            return {
              makeImageSquare: we
            };
          }, void 0, import.meta.url);
          return await ce(pe);
        } catch (ce) {
          return console.warn("[Generation] 转换正方形失败，使用原图:", ce), pe;
        }
      }));
    } catch (J) {
      console.warn("[GPT Image] Phase3-B multipart 失败，回退 processImageForAPI:", J);
      const pe = await Promise.all(b.map(ce => t.processImage(ce)));
      le = pe.length > 0 ? await Unn(pe[0]) : {
        w: 0,
        h: 0
      }, de = d ? pe : await Promise.all(pe.map(async ce => {
        try {
          const {
            makeImageSquare: we
          } = await Ie(async () => {
            const {
              makeImageSquare: X
            } = await Promise.resolve().then(() => Aoe);
            return {
              makeImageSquare: X
            };
          }, void 0, import.meta.url);
          return await we(ce);
        } catch (we) {
          return console.warn("[Generation] 转换正方形失败，使用原图:", we), ce;
        }
      }));
    }
    if (Pre(de, "[GPT Image] edits multipart"), de.forEach((J, pe) => ne.append("image", J, `input_${pe}.png`)), _ && _.length > 0) try {
      const {
          base64ToBlob: J
        } = await Ie(async () => {
          const {
            base64ToBlob: we
          } = await Promise.resolve().then(() => Aoe);
          return {
            base64ToBlob: we
          };
        }, void 0, import.meta.url),
        pe = _[0];
      let ce = J(pe.mask, "image/png");
      !d && le.w > 0 && le.h > 0 && (ce = await IRa(ce, le.w, le.h)), ne.append("mask", ce, "mask.png");
    } catch (J) {
      console.error("[Generation] ❌ 添加蒙版失败:", J);
    }
    A = ne;
  } else if (w = `${r}/v1/images/generations${H ? "" : C}`, T && j && F) A = H ? {
    model: B,
    prompt: Y,
    background: "transparent",
    output_format: "png",
    aspect_ratio: F,
    quality: G
  } : {
    model: B,
    prompt: Y,
    n: 1,
    aspect_ratio: F,
    quality: G,
    response_format: "url",
    output_format: U ? "png" : V,
    moderation: O,
    ...(U ? {} : {
      background: z
    })
  }, console.log(`[GPT Image -All] ${R.toUpperCase()} generations`, {
    model: B,
    aspect_ratio: F,
    localTransparent: U
  });else {
    const ne = T ? N() : I(i);
    A = H ? {
      model: B,
      prompt: Y,
      background: "transparent",
      output_format: "png",
      size: ne,
      quality: G
    } : {
      model: B,
      prompt: T ? Y : a,
      n: 1,
      size: ne,
      quality: G,
      response_format: "url",
      ...(T ? {
        output_format: U ? "png" : V,
        moderation: O,
        ...(U ? {} : {
          background: z
        })
      } : {})
    }, (M || L) && console.log("[GPT Image] generations (fallback)", {
      model: B,
      size: ne,
      quality: G,
      localTransparent: U,
      nativeTransparent: H
    });
  }
  return {
    endpoint: w,
    payload: A,
    useMultipart: k
  };
}

function eKi(e) {
  const t = new Set(),
    n = /--([a-zA-Z][\w-]*)/g;
  let r;
  for (; (r = n.exec(e)) !== null;) t.add(r[1].toLowerCase());
  return t;
}

function tKi(e) {
  return String(e || "").replace(/\s+/g, " ").trim();
}

function nKi(e, t) {
  const n = tKi(t);
  if (!n) return e.trim();
  let r = n;
  r.startsWith("--") || (r = `--${r}`);
  const a = r.split(/\s+(?=--)/).map(s => s.trim()).filter(Boolean);
  if (a.length === 0) return e.trim();
  const i = eKi(e),
    o = [];
  for (const s of a) {
    const l = s.match(/^--([a-zA-Z][\w-]*)/);
    if (!l) continue;
    const d = l[1].toLowerCase();
    i.has(d) || (o.push(s), i.add(d));
  }
  return o.length === 0 ? e.trim() : `${e.trim()} ${o.join(" ")}`.trim();
}

function rPe(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  try {
    if (/^https?:\/\//i.test(t)) {
      const n = new URL(t);
      return `${n.origin}${n.pathname}`.replace(/\/+$/, "");
    }
  } catch {}
  return t.split("?")[0].split("#")[0].replace(/\/+$/, "");
}

function gAe(e, t) {
  if (!Array.isArray(e)) return [];
  const n = [],
    r = new Set();
  for (const a of e) {
    const i = String(a || "").trim();
    if (!(!i || r.has(i)) && (r.add(i), n.push(i), n.length >= t)) break;
  }
  return n;
}

function Zfr(e, t, n) {
  const r = String(e || "").trim();
  if (!r) return;
  const a = rPe(r);
  for (const i of t) {
    const o = String(i || "").trim();
    if (!o) continue;
    if (o === r || a && rPe(o) === a) return o;
    const s = n == null ? void 0 : n.get(o);
    if (s != null && s.assetId && String(s.assetId).trim() === r) return o;
    for (const [l, d] of n || []) if (String((d == null ? void 0 : d.assetId) || "").trim() === r && (rPe(l) === rPe(o) || o === l)) return o;
  }
  if (/^(https?:|blob:|data:|asset:|file:)/i.test(r)) return r;
}

function Qpn(e, t, n, r) {
  const a = gAe(e, t),
    i = [],
    o = new Set();
  for (const s of a) {
    const l = Zfr(s, n, r);
    if (!(!l || o.has(l)) && (o.add(l), i.push(l), i.length >= t)) break;
  }
  return i;
}

function rKi(e) {
  const t = e.settings || {},
    n = (e.refImages || []).map(l => String(l || "").trim()).filter(Boolean),
    r = e.refMetaByRawUrl;
  let a = Qpn(t.mjImageKeys, U6, n, r),
    i = Qpn(t.mjStyleKeys, m7, n, r),
    o = Zfr(t.mjSubjectKey, n, r);
  if (gAe(t.mjImageKeys, U6).length > 0 || gAe(t.mjStyleKeys, m7).length > 0 || !!String(t.mjSubjectKey || "").trim()) {
    if (a.length === 0 && n.length > 0) {
      const l = new Set([o, ...i].filter(Boolean));
      a = n.filter(d => d && !l.has(d)).slice(0, U6);
    }
  } else {
    const l = String(e.legacyOref || "").trim() || String(t.mjOrefUrl || "").trim() || String(t.mjOref || "").trim() || "",
      d = String(e.legacySref || "").trim() || String(t.mjSrefUrl || "").trim() || String(t.mjSref || "").trim() || "";
    l && (o = l), d && (i = [d].slice(0, m7));
    const u = new Set([o, ...i].filter(Boolean));
    a = n.filter(h => h && !u.has(h)).slice(0, U6);
  }
  return {
    imageUrls: a.slice(0, U6),
    srefUrls: i.slice(0, m7),
    orefUrl: o || void 0
  };
}

function KC(e, t) {
  const n = String(t || "").replace(/^--/, "").toLowerCase();
  return n ? new RegExp(`(?:^|\\s)--${n}(?:\\s|$)`, "i").test(e) : !1;
}

function UR(e, t, n, r) {
  if (e == null || e === "") return t;
  const a = typeof e == "number" ? e : Number(e);
  return Number.isFinite(a) ? Math.min(r, Math.max(n, Math.round(a))) : t;
}

function aKi(e, t, n) {
  let r = String(e || "").trim();
  if (t.imageUrls.length > 0) {
    r = `${t.imageUrls.join(" ")} ${r}`.trim();
    const a = n == null ? void 0 : n.iw;
    if (a != null && Number.isFinite(Number(a)) && !KC(r, "iw")) {
      const i = Math.min(2, Math.max(.5, Number(a)));
      r = `${r} --iw ${i}`.trim();
    }
  }
  if (t.orefUrl && !KC(r, "oref")) {
    r = `${r} --oref ${t.orefUrl}`.trim();
    const a = n == null ? void 0 : n.ow;
    a && a > 0 && !KC(r, "ow") && (r = `${r} --ow ${Math.min(1e3, Math.max(1, a))}`.trim());
  }
  if (t.srefUrls.length > 0 && !KC(r, "sref")) {
    r = `${r} --sref ${t.srefUrls.join(" ")}`.trim();
    const a = n == null ? void 0 : n.sw;
    a != null && Number.isFinite(a) && !KC(r, "sw") && (r = `${r} --sw ${Math.min(1e3, Math.max(0, Math.round(a)))}`.trim());
    const i = n == null ? void 0 : n.sv;
    i != null && Number.isFinite(i) && !KC(r, "sv") && (r = `${r} --sv ${Math.min(6, Math.max(1, Math.round(i)))}`.trim());
  }
  return r;
}

function iKi(e, t) {
  const n = t || {};
  let r = String(e || "").trim();
  const a = (o, s) => {
    KC(r, s) || (r = `${r} ${o}`.trim());
  };
  if (n.mjStylize != null && n.mjStylize !== "") {
    const o = UR(n.mjStylize, 100, 0, 1e3);
    o !== 100 && a(`--stylize ${o}`, "stylize");
  }
  if (n.mjChaos != null && n.mjChaos !== "") {
    const o = UR(n.mjChaos, 0, 0, 100);
    o > 0 && a(`--chaos ${o}`, "chaos");
  }
  if (n.mjWeird != null && n.mjWeird !== "") {
    const o = UR(n.mjWeird, 0, 0, 3e3);
    o > 0 && a(`--weird ${o}`, "weird");
  }
  n.mjRaw && !KC(r, "style") && !KC(r, "raw") && (r = `${r} --style raw`.trim()), n.mjHd && a("--hd", "hd");
  const i = String(n.mjQuality ?? "").trim();
  return i && i !== "1" && ["0.25", "0.5", "1", "2"].includes(i) && !KC(r, "q") && !KC(r, "quality") && (r = `${r} --q ${i}`.trim()), r;
}

function oKi(e) {
  const t = e || {};
  return {
    stylize: UR(t.mjStylize, 100, 0, 1e3),
    chaos: UR(t.mjChaos, 0, 0, 100),
    weird: UR(t.mjWeird, 0, 0, 3e3),
    raw: !!t.mjRaw,
    hd: !!t.mjHd,
    sw: UR(t.mjSw, 100, 0, 1e3),
    sv: UR(t.mjSv, 4, 1, 6),
    iw: (() => {
      if (t.mjIw == null || t.mjIw === "") return 1;
      const n = Number(t.mjIw);
      return Number.isFinite(n) ? [.5, 1, 1.5, 2].reduce((a, i) => Math.abs(i - n) < Math.abs(a - n) ? i : a) : 1;
    })(),
    ow: UR(t.mjOw, 100, 0, 1e3),
    quality: ["0.25", "0.5", "1", "2"].includes(String(t.mjQuality ?? "")) ? String(t.mjQuality) : "1"
  };
}

function sKi(e) {
  const t = String(e || "").toLowerCase();
  return /--v\s*8(\.|$)/.test(t) || t.includes("8.1") || t.includes("8.2") || t.includes("--v 8");
}

function lKi(e) {
  const t = String(e || "").trim().toLowerCase();
  return /^https?:\/\//i.test(t) ? t.includes("cdn.discordapp.com") || t.includes("media.discordapp.net") || /discord(app)?\.com\/attachments\//i.test(t) : !1;
}

function aPe(e) {
  const t = String(e || "").trim();
  return t ? !lKi(t) : !1;
}

async function cKi(e, t) {
  var b;
  const n = {
      ...(e.settings || {})
    },
    r = e.refImages.slice(),
    a = n.mjMode || "fast",
    i = n.mjVersion || "--v 7",
    o = rKi({
      settings: n,
      refImages: r,
      refMetaByRawUrl: e.refMetaByRawUrl,
      legacyOref: e.legacyOref,
      legacySref: e.legacySref
    });
  let s = [...o.imageUrls],
    l = [...o.srefUrls],
    d = o.orefUrl || "";
  const u = [],
    h = new Map(),
    p = (v, _) => aPe(v) ? (u.push(v), h.set(_, u.length - 1), "") : v;
  for (let v = 0; v < s.length; v++) {
    const _ = s[v];
    _ && aPe(_) && (s[v] = null, p(_, `image_${v}`));
  }
  for (let v = 0; v < l.length; v++) {
    const _ = l[v];
    _ && aPe(_) && (l[v] = null, p(_, `sref_${v}`));
  }
  if (d && aPe(d) && (d = p(d, "oref")), u.length > 0) try {
    (b = t.onUploadProgress) == null || b.call(t);
    const v = `${e.baseUrl}/mj/submit/upload-discord-images`,
      _ = await Promise.all(u.map(A => t.toUploadBase64(A))),
      w = await fetch(v, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${e.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          base64Array: _
        })
      });
    if (!w.ok) {
      const A = await w.text();
      throw new Error(`图片上传失败: ${w.status} - ${A}`);
    }
    const k = await w.json();
    if (k.code === 1 && k.result && Array.isArray(k.result)) {
      const A = k.result;
      h.has("oref") && (d = A[h.get("oref")] || "");
      for (let S = 0; S < s.length; S++) s[S] === null && h.has(`image_${S}`) && (s[S] = A[h.get(`image_${S}`)] || null);
      for (let S = 0; S < l.length; S++) l[S] === null && h.has(`sref_${S}`) && (l[S] = A[h.get(`sref_${S}`)] || null);
    } else throw new Error(k.description || "上传返回格式错误");
  } catch (v) {
    return {
      error: `图片上传失败: ${v.message}`
    };
  }
  const m = s.filter(v => !!v),
    f = l.filter(v => !!v);
  let y = e.prompt.trim();
  return !y.includes("--v ") && !y.includes("--niji ") && (y = `${y} ${i}`.trim()), e.ratio !== "Auto" && !y.includes("--ar ") && (y = `${y} --ar ${e.ratio}`.trim()), y = aKi(y, {
    imageUrls: m,
    srefUrls: f,
    orefUrl: d || void 0
  }, {
    ow: n.mjOw,
    sw: n.mjSw,
    sv: n.mjSv,
    iw: n.mjIw
  }), y = iKi(y, n), y = nKi(y, String(n.mjExtraParams || "")), console.log("[MJ] 槽位发参", {
    imagePromptCount: m.length,
    srefCount: f.length,
    hasOref: !!d,
    promptPreview: y.slice(0, 240)
  }), {
    endpoint: `${e.baseUrl}/${a}/mj/submit/imagine`,
    payload: {
      prompt: y.trim(),
      base64Array: []
    },
    useMultipart: !1
  };
}

function dKi(e) {
  const t = OR(e.currentModel, e.durationSetting),
    n = R0(e.currentModel) && (t === "自适应" || t === "-1" || /^auto$/i.test(t)),
    r = n ? -1 : parseInt(t.replace(/s$/i, ""), 10) || 5,
    a = tG(e.resolutionSetting, e.currentModel),
    i = e.ratio && e.ratio !== "Auto" ? e.ratio : "adaptive",
    o = e.currentModel.replace(/-api$/, "");
  return {
    seedanceDuration: t,
    isSeedance25AdaptiveDuration: n,
    durationInt: r,
    resolutionStr: a,
    ratioStr: i,
    baseModelId: o,
    isSeedance20MultiMaterial: qg(o) || Kqe(o),
    isLiteT2v: o === "seedance-1-0-lite-t2v",
    supportsFrames: dPt(e.currentModel),
    endpoint: `${e.baseUrl}${xce(e.currentModel)}`
  };
}

function uKi(e) {
  return {
    min: e.isSeedance20MultiMaterial || e.baseModelId === "seedance-1.5-pro" ? 4 : 2,
    max: R0(e.currentModel) ? 30 : e.isSeedance20MultiMaterial ? 15 : 12
  };
}

function Ypn(e, t, n) {
  return e.some(r => {
    const a = String(r.role || "");
    return t.includes(a) || n != null && r.type === n;
  });
}

function hKi(e) {
  const t = uKi(e),
    n = R0(e.currentModel) && Ypn(e.content, ["reference_video"], "video_url"),
    r = R0(e.currentModel) && Ypn(e.content, ["first_frame", "last_frame"]),
    a = qg(e.currentModel) ? sPt(e.resolutionStr, e.currentModel) : Zxe(e.resolutionStr, e.currentModel),
    i = {
      model: qg(e.currentModel) ? Hqe(e.configModelName, e.configId) : e.configModelName || "doubao-seedance-1-5-pro-251215",
      content: e.content,
      ratio: n || r ? "adaptive" : e.ratioStr,
      duration: n || e.isSeedance25AdaptiveDuration ? -1 : Math.min(t.max, Math.max(t.min, e.durationInt)),
      ...a,
      watermark: !1
    };
  if ((uPt(e.currentModel) || e.isSeedance20MultiMaterial) && (i.generate_audio = e.generateAudio), R0(e.currentModel)) {
    const o = String(e.outputFormat || "mp4").trim().toLowerCase();
    i.output_format = o === "mov" ? "mov" : "mp4", i.generate_audio = e.generateAudio;
  }
  return i;
}

const pKi = 28 * 1024 * 1024;

function mKi(e) {
  return {
    maxBytes: pKi,
    maxDim: e ? 2048 : 1536,
    jpegQuality: e ? .88 : .85
  };
}

function iPe(e) {
  const t = e.indexOf(","),
    n = t >= 0 ? e.slice(0, t) : e,
    r = t >= 0 ? e.slice(t + 1) : "",
    a = /^data:image\/([^;]+);base64$/i.exec(n);
  if (!a) return e;
  let i = a[1].toLowerCase();
  return (i === "jpg" || i === "jpe") && (i = "jpeg"), `data:image/${i};base64,${r}`;
}

function fKi(e, t) {
  return t ? {
    type: "text",
    text: tXr(e || "") || e
  } : {
    type: "text",
    text: e
  };
}

function gKi(e, t) {
  return e.type === "image" && t ? e.url : e.type === "image" && e.assetUrl ? e.assetUrl : e.url;
}

function egr(e, t) {
  const n = String(t || "").toLowerCase();
  return e === "image" && (n.startsWith("data:video/") || n.includes(".mp4") || n.includes(".mov") || n.includes(".webm") || n.includes("/doc_video/") || n.includes("/video/"));
}

function yKi(e, t) {
  if (e.type === "image" && t && !String(e.url || "").trim()) throw new Error("sdols 多素材图生需要每条素材带有可读取的 url（本地/blob/公网）；仅有 Asset:// 时中转机无法代传，请重新添加图片或从本地上传。");
}

function bKi(e) {
  const t = egr(e.type, e.submitUrl);
  if (e.type === "image" && !t) return {
    item: {
      type: "image_url",
      image_url: {
        url: e.finalImageUrl ?? e.resolvedUrl.replace(/^Asset:\/\//, "asset://")
      },
      role: "reference_image"
    }
  };
  if (e.type === "video" || t) {
    if (e.isSeedance20MultiMaterial && String(e.resolvedUrl || "").startsWith("data:video/")) throw new Error("Seedance 2.0 参考视频不支持 Base64（data:video）。请改用公网 mp4/mov URL 或 asset:// 视频素材。");
    const n = RM(String(e.resolvedUrl || e.submitUrl || ""));
    return n && e.seenVideoKeys.has(n) ? {
      skip: !0
    } : (n && e.seenVideoKeys.add(n), {
      item: {
        type: "video_url",
        video_url: {
          url: e.resolvedUrl
        },
        role: "reference_video"
      }
    });
  }
  return {
    item: {
      type: "audio_url",
      audio_url: {
        url: e.resolvedUrl
      },
      role: "reference_audio"
    }
  };
}

function vKi(e) {
  return e.isLiteT2v ? {
    kind: "none"
  } : e.supportsFrames && e.isFramesMode && e.startUrl && e.endUrl ? {
    kind: "first-last",
    startUrl: e.startUrl,
    endUrl: e.endUrl
  } : e.isFramesMode && e.startUrl || e.hasReferenceImage ? {
    kind: "first-only",
    imgUrl: e.isFramesMode && e.startUrl ? e.startUrl : String(e.firstRefImage || ""),
    role: e.isSeedance20MultiMaterial && !qg(e.currentModel) ? "first_frame" : void 0
  } : {
    kind: "none"
  };
}

function wKi(e, t, n, r) {
  var m, f;
  const a = String(t || "").trim();
  if (/^https?:\/\//i.test(a) && a.length < 4096) return a;
  const i = [],
    o = (y, b) => {
      if (!(b > 10 || y == null)) {
        if (typeof y == "string") {
          /^https?:\/\//i.test(y) && y.length < 4096 && i.push(y);
          return;
        }
        if (Array.isArray(y)) {
          y.forEach(v => o(v, b + 1));
          return;
        }
        typeof y == "object" && Object.values(y).forEach(v => o(v, b + 1));
      }
    };
  if (o(e, 0), i.length > 0) return i[0];
  const s = e,
    l = s != null && s.data && typeof s.data == "object" ? s.data : null,
    d = (...y) => y.find(b => typeof b == "string" && String(b).trim()),
    u = d(s == null ? void 0 : s.url, s == null ? void 0 : s.file_url, s == null ? void 0 : s.download_url, s == null ? void 0 : s.uri, s == null ? void 0 : s.fileUrl, l == null ? void 0 : l.url, l == null ? void 0 : l.file_url, l == null ? void 0 : l.download_url, l == null ? void 0 : l.uri, (m = l == null ? void 0 : l.file) == null ? void 0 : m.url, (f = s == null ? void 0 : s.result) == null ? void 0 : f.url) || "";
  if (u && /^https?:\/\//i.test(u)) return u.trim();
  const h = d(l == null ? void 0 : l.path, s == null ? void 0 : s.path, l == null ? void 0 : l.file_path, s == null ? void 0 : s.file_path);
  if (h && h.startsWith("/") && !h.startsWith("//")) return `${r.replace(/\/+$/, "")}${h}`;
  const p = (s == null ? void 0 : s.id) || (l == null ? void 0 : l.id) || (l == null ? void 0 : l.file_id) || (s == null ? void 0 : s.file_id) || (l == null ? void 0 : l.upload_file_id);
  if (p && typeof p == "string" && p.length > 0 && !p.startsWith("http")) {
    const b = n.replace(/\/+$/, "").replace(/\/v1\/files$/i, "").replace(/\/seedance\/v1\/files$/i, "").replace(/\/seedance\/v3\/files$/i, ""),
      v = Array.from(new Set([b, r.replace(/\/+$/, "")])).filter(Boolean);
    for (const _ of v) {
      const w = `${_}/v1/files/${encodeURIComponent(p)}/content`;
      return console.log("[Seedance 2.0] upload 响应无直链，尝试 content URL:", w.slice(0, 120)), w;
    }
  }
  return null;
}

function xKi(e) {
  const t = String(e.apiRoot || "").replace(/\/+$/, ""),
    n = String(e.klingUploadBase || "").replace(/\/+$/, ""),
    r = String(e.customSdolsUpload || "").trim().replace(/\/+$/, "");
  return e.preferComflyFirst ? [...(r ? [r] : []), `${t}/v1/files`, `${t}/seedance/v1/files`, `${t}/seedance/v3/files`, `${n}/v1/files`, `${t}/zhonglian/api/v1/proxy/ark/files`, `${t}/api/v3/files`] : [`${n}/v1/files`, `${t}/zhonglian/api/v1/proxy/ark/files`, `${t}/v1/files`, `${t}/api/v3/files`];
}

function _Ki(e) {
  try {
    const t = new URL(e.uploadUrl),
      n = /^https?:\/\//i.test(e.baseUrl) ? e.baseUrl : `https://${e.baseUrl}`,
      r = new URL(n).origin;
    if (t.origin === r) return e.taskAuthKey || e.klingUploadKey;
  } catch {}
  return e.klingUploadKey;
}

function tgr(e) {
  return String(e || "").replace(/^Asset:\/\//, "asset://");
}

function ngr(e) {
  const t = String(e || "");
  return t.startsWith("Asset://") || t.startsWith("asset://");
}

function kKi(e, t) {
  const n = String(e || "").trim();
  if (!n) return {
    kind: "empty"
  };
  if (!ngr(n)) return {
    kind: "pass",
    url: n
  };
  const r = String(t || "").trim();
  return !r || /^asset:\/\//i.test(r) ? {
    kind: "error",
    message: "Seedance 2.0 API / Fast（sdols）中转机无法使用火山 asset:// 素材 ID。请使用画布图片/带 http(s) 或本地可解析 url 的素材（角色库素材需保留预览图链 m.url）。"
  } : {
    kind: "resolve-fallback",
    fallbackUrl: tgr(r)
  };
}

function AKi(e) {
  if (/^asset:\/\//i.test(String(e || "").trim())) throw new Error("sdols 图生：素材原始 url 仍解析为 asset://，无法上传到中转机。请重新从本地上传图片或换用公网图链。");
}

function SKi(e) {
  return e.startsWith("http://") || e.startsWith("https://") ? "http" : e.startsWith("data:video/") || e.startsWith("blob:") || e.startsWith("content_ref:") ? "upload-local" : "passthrough";
}

function IKi(e, t) {
  return !!e && /^https?:\/\//i.test(e) && !t;
}

function CKi(e, t, n) {
  return t ? e.startsWith("http://") || e.startsWith("https://") ? n ? "keep" : "oss-rehost" : e.startsWith("blob:") || e.startsWith("data:") || e.startsWith("content_ref:") ? "oss-rehost" : "keep" : "keep";
}

function EKi(e) {
  return e.startsWith("data:") || e.startsWith("http://") || e.startsWith("https://");
}

function Xpn(e) {
  const t = e.includes("mov") ? "mov" : e.includes("webm") ? "webm" : "mp4";
  return {
    ext: t,
    fileName: `seedance-ref-video.${t}`
  };
}

function TKi(e) {
  try {
    const t = e.configsJson ? JSON.parse(e.configsJson) : [],
      n = Array.isArray(t) ? t.find(o => (o == null ? void 0 : o.id) === "kling-o1" || String((o == null ? void 0 : o.modelName) || "").includes("kling-video-o1")) : null,
      r = String((n == null ? void 0 : n.url) || "").trim().replace(/\/+$/, ""),
      a = String((n == null ? void 0 : n.key) || "").trim(),
      i = String(e.globalKey || "").trim();
    return {
      base: r || e.baseUrl,
      key: a || i || e.apiKey
    };
  } catch {
    return {
      base: e.baseUrl,
      key: e.apiKey
    };
  }
}

function MKi(e) {
  const t = e.readStorageItem ?? (s => {
      try {
        return localStorage.getItem(s);
      } catch {
        return null;
      }
    }),
    n = () => TKi({
      configsJson: t("qiaodoumayi_api_configs"),
      globalKey: t("qiaodoumayi_global_key") || "",
      baseUrl: e.baseUrl,
      apiKey: e.apiKey
    }),
    r = async (s, l) => {
      const {
          base: d,
          key: u
        } = n(),
        h = String(e.apiKey || "").trim(),
        p = qg(e.currentModel),
        m = String(e.baseUrl || "").replace(/\/+$/, ""),
        f = String(t("qiaodoumayi_sdols_upload_url") || "").trim(),
        y = xKi({
          preferComflyFirst: p,
          apiRoot: m,
          klingUploadBase: d,
          customSdolsUpload: f
        }),
        b = w => _Ki({
          uploadUrl: w,
          baseUrl: e.baseUrl,
          taskAuthKey: h,
          klingUploadKey: u
        }),
        v = ["file", "image"];
      let _ = "";
      for (const w of y) for (const k of v) try {
        const A = new FormData();
        A.append(k, s);
        const S = await e.fetchWithTauriProxy(w, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${b(w)}`
            },
            body: A
          }),
          C = await S.text();
        if (!S.ok) {
          _ = `${w} (${k}) -> HTTP ${S.status}: ${C.slice(0, 200)}`;
          continue;
        }
        let I = {};
        try {
          I = C ? JSON.parse(C) : {};
        } catch {
          I = {};
        }
        const E = wKi(I, C, w, m);
        if (E) return console.log("[Seedance 2.0] uploaded media url:", l, String(E).slice(0, 120)), E;
        _ = `${w} (${k}) -> 响应缺少可用 URL，body 前 240 字: ${C.slice(0, 240)}`;
      } catch (A) {
        _ = `${w} (${k}) -> ${(A == null ? void 0 : A.message) || "upload failed"}`;
      }
      throw new Error(`${l}：${_ || "no upload endpoint available"}`);
    },
    a = async (s, l) => {
      if (e.useOssForApi) {
        const {
          resolveAgentVideoUrlForOss: m
        } = await Ie(async () => {
          const {
            resolveAgentVideoUrlForOss: f
          } = await Promise.resolve().then(() => Mc);
          return {
            resolveAgentVideoUrlForOss: f
          };
        }, void 0, import.meta.url);
        return m(s, l);
      }
      try {
        const {
            prepareAssetForModel: m,
            toMultipartFile: f
          } = await Ie(async () => {
            const {
              prepareAssetForModel: v,
              toMultipartFile: _
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: v,
              toMultipartFile: _
            };
          }, void 0, import.meta.url),
          y = await m({
            assetRef: s,
            modelId: "seedance-2.0-sdols",
            purpose: "video-reference",
            requestedTransportMode: "direct-file",
            assetId: l,
            allowReadVideoBlob: !0
          }),
          b = await f({
            prepared: y,
            allowReadVideoBlob: !0,
            fileName: "seedance-ref-video.mp4"
          });
        return await r(b.file, "参考视频自动上传失败");
      } catch (m) {
        console.warn("[Seedance 2.0] Phase3-B 参考视频 multipart 失败，回退 getBlobFromUrl:", m);
      }
      const d = s.startsWith("data:video/") ? await (await fetch(s)).blob() : await e.getBlobFromUrl(s),
        u = d.type || "video/mp4",
        {
          fileName: h
        } = Xpn(u),
        p = new File([d], h, {
          type: u
        });
      try {
        return await r(p, "参考视频自动上传失败");
      } catch (m) {
        return await e.promptPublicVideoUrlAfterUploadFailed(m);
      }
    },
    i = async (s, l, d) => {
      if (!s) return s;
      if (ngr(s)) return tgr(s);
      if (l === "video") {
        let u = "";
        const h = SKi(s);
        if (h === "http") {
          const p = await e.resolveReferenceVideoHttpUrl(s);
          e.isVolcAccessiblePublicUrl(p) ? u = p : u = await a(p, d);
        } else h === "upload-local" && (u = await a(s, d));
        if (IKi(u, e.isVolcAccessiblePublicUrl(u))) {
          console.warn("[Seedance] 参考视频域名火山不可达，转存当前网关 /v1/files:", u.slice(0, 160));
          const p = await e.getBlobFromUrl(u),
            m = p.type || "video/mp4",
            {
              fileName: f
            } = Xpn(m),
            y = new File([p], f, {
              type: m
            });
          try {
            u = await r(y, "参考视频转存网关失败");
          } catch (b) {
            u = await e.promptPublicVideoUrlAfterUploadFailed(b);
          }
        }
        if (u) return u;
      }
      if (l === "audio" && CKi(s, e.useOssForApi, e.isOssPublicHttpUrl(e.normalizeOssPublicHttpUrl(s) || s)) === "oss-rehost") {
        const {
          resolveAgentVideoUrlForOss: u
        } = await Ie(async () => {
          const {
            resolveAgentVideoUrlForOss: h
          } = await Promise.resolve().then(() => Mc);
          return {
            resolveAgentVideoUrlForOss: h
          };
        }, void 0, import.meta.url);
        return u(s, d);
      }
      if (EKi(s)) return s;
      try {
        const u = await e.getBlobFromUrl(s);
        return await e.blobToDataURL(u);
      } catch (u) {
        return console.warn("[Seedance 2.0] material url resolve failed, fallback to original url:", s, u), s;
      }
    };
  return {
    resolveSeedanceMaterialUrl: i,
    ensureSdolsArkImageUrlIfNeeded: async (s, l) => {
      if (!qg(e.currentModel)) return s;
      const {
          maxBytes: d,
          maxDim: u,
          jpegQuality: h
        } = mKi(e.useOssForApi),
        p = async (b, v) => {
          const _ = b.type.startsWith("image/") ? await e.resizeBlobForApi(b, u, h) : b;
          if (_.size > d) throw new Error(`${v}：单图超过约 28MB，超过官方建议的 Base64 体积，请先压缩图片。`);
          const w = await e.blobToDataURL(_);
          return iPe(w);
        },
        m = kKi(s, l);
      if (m.kind === "empty") return "";
      if (m.kind === "error") throw new Error(m.message);
      let f = m.kind === "resolve-fallback" ? "" : m.url;
      if (m.kind === "resolve-fallback") {
        const b = await i(m.fallbackUrl, "image");
        AKi(b), f = String(b || "").trim();
      }
      try {
        const b = e.buildGenApiResolveForRefUrl(f);
        if (!e.useOssForApi && b.assetId) {
          const {
              encodeLocalImageAssetAsApiDataUrl: S
            } = await Ie(async () => {
              const {
                encodeLocalImageAssetAsApiDataUrl: I
              } = await Promise.resolve().then(() => Ui);
              return {
                encodeLocalImageAssetAsApiDataUrl: I
              };
            }, void 0, import.meta.url),
            C = await S(b.assetId, u);
          if (C != null && C.startsWith("data:image/")) {
            const I = iPe(C),
              E = Math.round(I.length * 3 / 4 / 1024);
            return console.log(`[Seedance 2.0 API] Phase3-C 参考图已 Rust→Base64 (~${E}KB, maxDim=${u})`), I;
          }
          console.warn("[Seedance 2.0 API] Rust 发参小图未生成，继续安全回退:", b.assetId);
        } else e.useOssForApi || console.warn("[Seedance 2.0 API] 本地参考图未解析到 assetId，继续安全回退:", f.slice(0, 72));
        const {
            prepareAssetForModel: v
          } = await Ie(async () => {
            const {
              prepareAssetForModel: S
            } = await Promise.resolve().then(() => up);
            return {
              prepareAssetForModel: S
            };
          }, void 0, import.meta.url),
          _ = await v({
            assetRef: f,
            modelId: "seedance-2.0-sdols",
            purpose: "image-reference",
            requestedTransportMode: "base64",
            assetId: b.assetId,
            assetIdHints: b.assetIdHints,
            sourceNode: b.sourceNode,
            nodes: b.nodes
          }),
          w = _.type === "local-file" ? String(_.assetId || b.assetId || "").trim() : "";
        if (_.type === "local-file" && w && !e.useOssForApi) try {
          const {
              encodeLocalImageAssetAsApiDataUrl: S
            } = await Ie(async () => {
              const {
                encodeLocalImageAssetAsApiDataUrl: I
              } = await Promise.resolve().then(() => Ui);
              return {
                encodeLocalImageAssetAsApiDataUrl: I
              };
            }, void 0, import.meta.url),
            C = await S(w, u);
          if (C != null && C.startsWith("data:image/")) {
            const I = iPe(C),
              E = Math.round(I.length * 3 / 4 / 1024);
            return console.log(`[Seedance 2.0 API] Phase3-C 参考图已 Rust→Base64 (~${E}KB, maxDim=${u})`), I;
          }
        } catch (S) {
          console.warn("[Seedance 2.0 API] Phase3-C Rust 编码失败，回退 JS 压图:", S);
        }
        let k = null;
        if (_.type === "local-file" && _.assetId) try {
          const {
              ensureLocalPreviewDisplayUrl: S
            } = await Ie(async () => {
              const {
                ensureLocalPreviewDisplayUrl: I
              } = await Promise.resolve().then(() => Ui);
              return {
                ensureLocalPreviewDisplayUrl: I
              };
            }, void 0, import.meta.url),
            C = await S(_.assetId, {
              maxDim: Math.min(1024, u),
              allowVideoOriginal: !1
            });
          C && (k = await e.resizeDisplayUrlForApi(C, u, h));
        } catch {}
        if (!k && _.type === "local-file" && _.absolutePath && e.useOssForApi) try {
          const {
              convertFileSrc: S
            } = await Ie(async () => {
              const {
                convertFileSrc: I
              } = await Promise.resolve().then(() => sd);
              return {
                convertFileSrc: I
              };
            }, void 0, import.meta.url),
            C = S(_.absolutePath);
          k = await e.resizeDisplayUrlForApi(C, u, h);
        } catch (S) {
          console.warn("[Seedance 2.0 API] Phase3-C 本地文件直压失败，回退 materialize+resize:", S);
        }
        if (!k) {
          if (_.type === "local-file" && !e.useOssForApi) throw new Error("本地缓存参考图无法经 Rust 压成 API JPEG");
          const {
              materializePreparedAssetBlob: S
            } = await Ie(async () => {
              const {
                materializePreparedAssetBlob: I
              } = await Promise.resolve().then(() => up);
              return {
                materializePreparedAssetBlob: I
              };
            }, void 0, import.meta.url),
            C = await S(_);
          k = await e.resizeBlobForApi(C, u, h);
        }
        if (k.size > d) throw new Error("参考图压缩后仍超过约 28MB Base64 限制");
        const A = iPe(await e.blobToDataURL(k));
        return console.log(`[Seedance 2.0 API] Phase3-C 参考图已 prepare→resize→Base64 (${Math.round(k.size / 1024)}KB, maxDim=${u})`), A;
      } catch (b) {
        console.warn("[Seedance 2.0 API] Phase3-C prepare base64 失败，回退:", b);
      }
      if (f.startsWith("http://") || f.startsWith("https://")) try {
        const b = await e.getBlobFromUrl(f, {
          compressForApi: !0
        });
        return console.log("[Seedance 2.0 API] 参考图为 http(s)，已拉取并编码为 Base64 写入 content"), await p(b, "参考图处理失败（Seedance 2.0 API：外网图已拉取但体积过大或编码失败）");
      } catch (b) {
        return console.warn("[Seedance 2.0 API] http(s) 参考图无法拉取，回退为原 URL:", b), f;
      }
      const y = f.startsWith("data:") ? await e.resizeBlobForApi(await (await fetch(f)).blob(), u, h) : await e.getBlobFromUrl(f, {
        compressForApi: !0
      });
      return p(y, "参考图编码失败（sdols 默认 Base64，请检查图片是否过大或格式异常）");
    }
  };
}

function PKi(e) {
  const t = e.startFrame || e.defaultFrame || e.refImages[0] || void 0,
    n = e.endFrame || void 0;
  return {
    ...(t ? {
      startSource: t
    } : {}),
    ...(n ? {
      endSource: n
    } : {})
  };
}

function RKi(e) {
  const t = s9(e.configUrl || e.baseUrl, e.currentModel),
    n = Ip(e.currentModel),
    r = Ih(e.currentModel);
  return {
    isHuya20: n,
    isHuya25: r,
    isHuya20Or25: n || r,
    isHuya1510: CT(e.currentModel),
    isHuya20Pro: Y5e(e.currentModel),
    brandLabel: r ? "海艺 SD2.5" : "海艺 SD2.0",
    endpoint: t,
    openApiRoot: b3(t)
  };
}

function NKi(e) {
  const t = Ih(e.currentModel),
    n = Ip(e.currentModel),
    r = {
      duration: t ? K7n(e.durationSetting) : e.durationNum,
      resolution: t ? q7n(e.resolution) : W7n(e.currentModel, e.resolution)
    };
  if (t) {
    r.aspectRatio = Q7n(e.ratio), r.generateAudio = e.generateAudio !== !1;
    const a = String(e.outputFormat || "mp4").trim().toLowerCase();
    r.output_format = a === "mov" ? "mov" : "mp4", e.mcpWebSearch && (r.mcpList = ["web_search"]);
  } else CT(e.currentModel) ? (r.ratio = e.currentModel === "seedance-1-5-pro-huya-volc" ? Y7n(e.ratio) : X7n(e.ratio), r.camera_fixed = !!e.cameraFixed, e.currentModel === "seedance-1-5-pro-huya-volc" && (r.generate_audio = e.generateAudio !== !1)) : n && (r.aspectRatio = H7n(e.ratio), r.generateAudio = !!e.generateAudio, r.nsfw = !!e.nsfw, Y5e(e.currentModel) && e.mcpWebSearch && (r.mcpList = ["web_search"]));
  return r;
}

function jKi(e) {
  const t = !!(e.startFrame && e.endFrame),
    n = t || !!e.veoFramesMode;
  let r = e.mediaRoleMode;
  const a = e.imageCount > 0 && e.videoCount === 0 && e.audioCount === 0;
  return n && a && e.imageCount <= 2 ? r = "frame" : !n && r === "frame" && !t && (r = "reference"), r;
}

function DKi(e, t) {
  return e.roleMode = t.roleMode, t.roleMode === "frame" && (e.aspectRatio = "adaptive"), t.isHuya25 && t.hasRefVideo && (e.aspectRatio = "adaptive", e.duration = -1), e;
}

function LKi(e, t) {
  const n = String(e || "").trim();
  if (!n) return "";
  if (/^asset:\/\//i.test(n)) throw new Error(`${t} 参考图不能使用 asset://，请使用 OSS 公网直链后勾选「真人素材」报备`);
  if (YP(n)) throw new Error("参考图为 art.huya.info 鉴权链，火山无法拉取。请开启全局 OSS，使用 aliyuncs.com 公网 URL");
  if (!/^https?:\/\//i.test(n)) throw new Error(`参考图须为公网 https URL（当前: ${n.slice(0, 48)}…）。请确认已开启 OSS 上传`);
  return n;
}

function OKi(e, t, n) {
  if (!Array.isArray(e)) return [];
  const r = [];
  for (const a of e) {
    const i = LKi(String(a || ""), t);
    i && r.push(n(i));
  }
  return r;
}

function BKi(e, t) {
  return e > 0 ? t !== !1 : !!t;
}

function FKi(e, t) {
  return e.trim() || (t ? "请参考输入素材生成视频" : "生成视频");
}

function zKi(e) {
  return e ? "image2video" : "text2video";
}

function UKi(e) {
  return !!(e.isHuya20 && !e.isHuya20Pro && e.hasReference && e.mcpWebSearch);
}

function $Ki(e) {
  return {
    action: "generate",
    model: {
      provider: "volcengine",
      model: G7n(e.currentModel, e.configModelName || e.currentModel),
      type: e.taskType
    },
    parameters: e.parameters
  };
}

const GKi = "Kling v2.5 Fal 不支持动作迁移，请使用 v2.6 或 v3.0 Fal",
  VKi = "图生视频需要连接参考图或首帧",
  HKi = "无法读取参考图，请检查连线或重新上传";

function WKi(e) {
  const t = she(e.currentModel);
  if (!t) return null;
  const n = jOe(t),
    r = e.hasStartFrame || e.hasEndFrame,
    a = K$r({
      variant: n,
      isMotionControlNode: e.isMotionControlNode,
      hasFrameInput: r,
      hasReferenceImage: e.hasReferenceImage
    });
  return {
    resolvedId: t,
    variant: n,
    mode: a,
    hasStartFrame: e.hasStartFrame,
    hasEndFrame: e.hasEndFrame,
    hasFrameInput: r,
    endpoint: `${Po(e.baseUrl)}/${S9n(n, a, A9n({
      variant: n,
      isMotionControlNode: e.isMotionControlNode,
      settings: e.settings
    }))}`
  };
}

function qKi(e) {
  return (e == null ? void 0 : e.klingMotionControlCharacterOrientation) || "image";
}

function KKi(e) {
  return (e == null ? void 0 : e.klingVideoKeepSound) !== "no";
}

function QKi(e) {
  return {
    imageRaw: e.settingsImageUrl || e.refImages[0] || "",
    videoRaw: e.settingsVideoUrl || e.connectedVideoUrl || ""
  };
}

function YKi(e) {
  return {
    prompt: (e.prompt || "").trim(),
    image_url: e.imageUrl,
    video_url: e.videoUrl,
    character_orientation: e.characterOrientation || "image",
    keep_original_sound: e.keepOriginalSound !== !1
  };
}

function XKi(e) {
  return e.mode !== "i2v" ? {} : {
    startSource: (e.hasStartFrame ? e.startUrl || void 0 : e.refImages[0]) || void 0,
    endSource: e.hasEndFrame && e.endUrl || void 0
  };
}

function JKi(e, t, n, r) {
  return t === "v25" ? (e.image_url = n, r && (e.tail_image_url = r)) : (e.start_image_url = n, r && (e.end_image_url = r)), e;
}

function ZKi(e) {
  const t = {
    prompt: (e.prompt || "").trim() || " ",
    duration: X$r(e.variant, e.durationSetting),
    negative_prompt: "blur, distort, and low quality",
    cfg_scale: .5
  };
  return (e.variant === "v26" || e.variant === "v3") && (t.generate_audio = Z$r(e.variant, e.settings)), e.variant === "v3" && (t.shot_type = "customize"), e.mode === "t2v" && (t.aspect_ratio = J$r(e.ratio)), e.mode === "i2v" && e.startImageUrl && JKi(t, e.variant, e.startImageUrl, e.endImageUrl), t;
}

const eQi = "缺少提示词",
  tQi = "缺少参考图",
  nQi = "缺少参考视频",
  rQi = 20 * 1024 * 1024;

function aQi(e) {
  return O2(e) || jv(e);
}

function iQi(e) {
  return {
    endpoint: `${e}/kling/v1/videos/motion-control`
  };
}

function Yzt(e, t, n) {
  const r = {
    imageUrl: "",
    videoUrl: "",
    videoPreviewUrl: ""
  };
  if (!e || !t) return r;
  const a = t.filter(l => l.to === n);
  let i = "",
    o = "",
    s = "";
  for (const l of a) {
    const d = e.find(h => h.id === l.from);
    if (!d) continue;
    const u = TZ(d);
    if (u === "image" && !i) {
      i = f2e(d);
      continue;
    }
    if (u === "video" && !o) {
      o = String(Zo(d) || "").trim() || bIe(d);
      const h = String(d.content || "").trim();
      !o && h.startsWith("blob:") && (o = h), !o && h && !m2e(h) && (o = h), s = YPt(d) || o;
    }
  }
  return {
    imageUrl: i,
    videoUrl: o,
    videoPreviewUrl: s
  };
}

function oQi(e, t, n) {
  return Yzt(e, t, n).imageUrl || void 0;
}

function Jpn(e, t, n) {
  return Yzt(e, t, n).videoUrl || void 0;
}

function Zpn(e) {
  return QM(e);
}

function sQi(e) {
  return e.settingsUrl || e.refImage || e.connectedUrl;
}

function lQi(e) {
  return e.settingsUrl || e.connectedUrl;
}

function cQi(e) {
  try {
    return new URL(e).origin;
  } catch {
    return e;
  }
}

function dQi(e, t) {
  const n = String(e || "").trim();
  if (!n.startsWith("http://") && !n.startsWith("https://")) return !1;
  try {
    return new URL(n).origin === t;
  } catch {
    return !1;
  }
}

function uQi(e) {
  const t = e.split("?")[0].toLowerCase(),
    n = t.endsWith("/") ? t.slice(0, -1) : t;
  return /\.(mp4|webm|mov|m4v|ogg)$/.test(n);
}

function emn(e) {
  const t = e.data,
    n = t != null && t.data && typeof t.data == "object" ? t.data : null;
  let a = ((...s) => s.find(l => typeof l == "string" && String(l).trim()))(t == null ? void 0 : t.url, t == null ? void 0 : t.file_url, t == null ? void 0 : t.download_url, n == null ? void 0 : n.url, n == null ? void 0 : n.file_url, n == null ? void 0 : n.download_url);
  const i = t == null ? void 0 : t.id;
  if (e.fileKind === "image" ? !a && i && (a = `${e.baseUrl}/v1/files/${i}/content`) : (!a || !uQi(a)) && i && (a = `${e.baseUrl}/v1/files/${i}/content`), !a) return "";
  const o = String(a).trim();
  return o.startsWith("/") ? `${e.baseUrl}${o}` : o;
}

function tmn(e, t) {
  const n = String(e || "").toLowerCase();
  return n.includes("mp4") ? ".mp4" : n.includes("webm") ? ".webm" : n.includes("mov") ? ".mov" : n.includes("ogg") ? ".ogg" : n.includes("jpeg") || n.includes("jpg") ? ".jpg" : n.includes("png") ? ".png" : n.includes("webp") ? ".webp" : t === "video" ? ".mp4" : ".png";
}

function rgr(e) {
  return rQi;
}

function nmn(e) {
  const t = rgr();
  return `[MotionControl] ${e} 文件过大（>${Math.round(t / 1024 / 1024)}MB），请先用节点上传面板或裁剪/压缩后再生成`;
}

function rmn(e) {
  const t = e instanceof Error ? e.message : String(e);
  return !(t.includes("文件过大") || t.includes("过大"));
}

function hQi(e) {
  return !e || e.length < 50 ? !1 : /^[A-Za-z0-9+/]+={0,2}$/.test(e);
}

function pQi(e) {
  return e === "pro" || e === "4k" ? e : "std";
}

function mQi(e) {
  return e.startsWith("http://") || e.startsWith("https://");
}

function fQi(e) {
  const t = {
    model_name: e.modelName,
    prompt: e.prompt,
    image_url: e.imageBase64,
    video_url: e.videoUrl,
    character_orientation: e.characterOrientation || "image",
    mode: e.mode || "std",
    keep_original_sound: e.keepOriginalSound || "yes"
  };
  return e.watermarkEnabled && (t.watermark_info = {
    enabled: !0
  }), t;
}

const gQi = "无法读取参考图，请检查连线或重新上传图片",
  yQi = "参考生视频至少需要 2 张参考图";

function bQi(e) {
  if (!IS(e.currentModel)) return null;
  const t = Math.min(e.refImageCount, 7),
    n = iFr(t),
    r = parseInt(String(e.durationNum), 10);
  return {
    mode: n,
    grokRefCount: t,
    endpoint: `${Po(e.baseUrl)}/${oFr(n)}`,
    durationSec: lFr(n, r),
    aspectRatio: Y6n(e.ratio, n),
    resolutionStr: dFr(e.resolution)
  };
}

function vQi(e) {
  let t = (e.prompt || "").trim();
  return e.grokRefCount > 0 && !t && (t = `${Array.from({
    length: e.grokRefCount
  }, (n, r) => `@img${r + 1}`).join(" ")} `), e.mode === "r2v" && (t = sFr(t || e.prompt || "")), e.aspectRatio !== "auto" && (t = uFr(t || e.prompt || "", e.aspectRatio)), t || e.prompt || " ";
}

function wQi(e) {
  var n;
  const t = {
    prompt: e.prompt,
    duration: e.durationSec,
    aspect_ratio: e.aspectRatio,
    resolution: e.resolutionStr
  };
  return e.mode === "i2v" && e.imageUrl ? t.image_url = e.imageUrl : e.mode === "r2v" && ((n = e.referenceImageUrls) != null && n.length) && (t.reference_image_urls = e.referenceImageUrls), t;
}

function xQi(e) {
  return e.mode === "i2v" ? e.refImages.slice(0, 1) : e.mode === "r2v" ? e.refImages.slice(0, 7) : [];
}

const Xzt = 7,
  agr = "视频剪辑需要连接一条源视频",
  igr = "视频扩展需要连接一条源视频",
  Jzt = "图像转视频需要至少连接 1 张图片",
  _Qi = "「参考视频」使用参考图（最多 7 张）或预设音色，不支持视频链接。源视频请改用「视频剪辑」或「视频扩展」。",
  kQi = "参考视频需要至少 1 张参考图或选择参考音色",
  Zzt = "Animate this image",
  eUt = "Generate a video",
  ogr = "Edit this video",
  sgr = "Continue this video";

function Olt(e) {
  var a;
  const t = [],
    n = [],
    r = (i, o) => {
      const s = String(o || "").trim();
      !s || i.includes(s) || i.push(s);
    };
  for (const i of e.refImages) {
    const o = (a = e.refMetaByRawUrl) == null ? void 0 : a.get(i);
    if ((o == null ? void 0 : o.type) === "video" || Ey(i)) r(n, i);else {
      if ((o == null ? void 0 : o.type) === "audio") continue;
      r(t, i);
    }
  }
  if (e.refMetaByRawUrl) for (const [i, o] of e.refMetaByRawUrl) o.type === "video" ? r(n, i) : o.type === "image" && r(t, i);
  return {
    imageRefs: t,
    videoRefs: n
  };
}

function tUt(e) {
  return e.slice(0, Xzt);
}

function AQi(e) {
  return e.mode !== "i2v" ? [] : e.imageRefs.slice(0, 1);
}

function SQi(e) {
  return e === "edit" ? agr : igr;
}

function IQi(e) {
  return e ? _Qi : kQi;
}

function CQi(e) {
  var i, o;
  if (!ag(e.currentModel)) return null;
  const t = JWe(e.settings, e.imageCount, e.hasSourceVideo),
    n = ZWe(t, e.imageCount),
    r = v8t(e.resolvedPlatformGroup),
    a = parseInt(String(e.durationNum), 10);
  return {
    requestedMode: t,
    mode: n,
    openAiCompat: r,
    endpoint: LPn(e.baseUrl, n, {
      openAiCompat: r
    }),
    durationInt: n === "extend" ? EPn(a) : f8t(a),
    aspectRatioStr: g8t(e.ratio),
    resolutionStr: y8t((i = e.settings) == null ? void 0 : i.resolution, n),
    apiModel: TPn(n),
    voices: eqe((o = e.settings) == null ? void 0 : o[p3]),
    needsSourceVideo: m8t(n),
    promotedFromI2v: n !== t
  };
}

function EQi(e) {
  return MPn(e || "");
}

function TQi(e, t, n) {
  return String(e || "").trim() ? e : t === "r2v" && n > 0 ? `${Array.from({
    length: n
  }, (r, a) => `<IMAGE_${a + 1}>`).join(" ")} ` : t === "edit" ? ogr : t === "extend" ? sgr : t === "i2v" ? Zzt : eUt;
}

function MQi(e) {
  var r, a;
  const t = e.grokRefCount ?? ((r = e.referenceImageUrls) == null ? void 0 : r.length) ?? 0,
    n = {
      model: e.apiModel,
      prompt: TQi(e.grokPrompt, e.mode, t)
    };
  return (e.mode === "t2v" || e.mode === "i2v" || e.mode === "r2v" || e.mode === "extend") && (n.duration = e.durationInt), (e.mode === "t2v" || e.mode === "i2v" || e.mode === "r2v") && (n.aspect_ratio = e.aspectRatioStr, n.resolution = e.resolutionStr), e.imageUrl && (n.image = {
    url: e.imageUrl
  }), (a = e.referenceImageUrls) != null && a.length && (n.reference_images = e.referenceImageUrls.map(i => ({
    url: i
  }))), e.voices && e.voices.length > 0 && (n.reference_audios = e.voices.map(i => ({
    voice_id: i
  }))), e.videoUrl && (n.video = {
    url: e.videoUrl
  }), e.openAiCompat ? DPn(n) : n;
}

const amn = "无法读取参考图，请检查连线或重新上传图片",
  PQi = Jzt,
  RQi = "参考视频需要至少 1 张参考图";

function NQi(e) {
  var i;
  if (!V1(e.currentModel)) return null;
  const t = Math.min(e.imageCount, Xzt),
    n = UPn(e.settings, t),
    r = e$r(n, t),
    a = parseInt(String(e.durationNum), 10);
  return {
    requestedMode: n,
    mode: r,
    grokRefCount: t,
    endpoint: `${Po(e.baseUrl)}/${t$r(r)}`,
    durationSec: $Pn(a),
    aspectRatio: n$r(e.ratio),
    resolutionStr: r$r(e.resolution ?? ((i = e.settings) == null ? void 0 : i.resolution), r),
    promotedFromI2v: r !== n
  };
}

function jQi(e) {
  const t = a$r(e.prompt || "");
  return String(t || "").trim() ? t : e.mode === "r2v" && e.grokRefCount > 0 ? `${Array.from({
    length: e.grokRefCount
  }, (n, r) => `<IMAGE_${r}>`).join(" ")} ` : e.mode === "i2v" ? Zzt : eUt;
}

function DQi(e) {
  var n, r;
  const t = {
    prompt: jQi({
      prompt: e.prompt,
      grokRefCount: e.grokRefCount ?? ((n = e.referenceImageUrls) == null ? void 0 : n.length) ?? 0,
      mode: e.mode
    }),
    duration: e.durationSec,
    resolution: e.resolutionStr
  };
  return (e.mode === "t2v" || e.mode === "r2v") && (t.aspect_ratio = e.aspectRatio), e.mode === "i2v" && e.imageUrl ? t.image_url = e.imageUrl : e.mode === "r2v" && ((r = e.referenceImageUrls) != null && r.length) && (t.reference_image_urls = e.referenceImageUrls), t;
}

function LQi(e) {
  return e.mode === "i2v" ? e.imageRefs.slice(0, 1) : e.mode === "r2v" ? tUt(e.imageRefs) : [];
}

const imn = "无法读取参考图，请检查连线或重新上传图片",
  OQi = "无法读取源视频，请检查连线或重新上传",
  BQi = Jzt,
  FQi = "参考视频需要至少 1 张参考图",
  zQi = agr,
  UQi = igr;

function $Qi(e) {
  var i;
  if (!Nv(e.currentModel)) return null;
  const t = Math.min(e.imageCount, Xzt),
    n = BPn(e.settings, t, e.hasSourceVideo),
    r = BUr(n, t),
    a = parseInt(String(e.durationNum), 10);
  return {
    requestedMode: n,
    mode: r,
    grokRefCount: t,
    endpoint: `${Po(e.baseUrl)}/${GUr(r)}`,
    durationSec: qbe(r, a),
    aspectRatio: VUr(e.ratio, r),
    resolutionStr: HUr(e.resolution ?? ((i = e.settings) == null ? void 0 : i.resolution), r),
    needsSourceVideo: FUr(r),
    promotedFromI2v: r !== n
  };
}

function GQi(e) {
  const t = WUr(e.prompt || "");
  return String(t || "").trim() ? t : e.mode === "r2v" && e.grokRefCount > 0 ? `${Array.from({
    length: e.grokRefCount
  }, (n, r) => `@Image${r + 1}`).join(" ")} ` : e.mode === "edit" ? ogr : e.mode === "extend" ? sgr : e.mode === "i2v" ? Zzt : eUt;
}

function VQi(e) {
  return e === "edit" ? zQi : UQi;
}

function HQi(e) {
  var n, r;
  const t = {
    prompt: GQi({
      prompt: e.prompt,
      grokRefCount: e.grokRefCount ?? ((n = e.referenceImageUrls) == null ? void 0 : n.length) ?? 0,
      mode: e.mode
    })
  };
  return e.mode === "t2v" || e.mode === "i2v" || e.mode === "r2v" ? (t.duration = e.durationSec, t.resolution = e.resolutionStr, t.aspect_ratio = e.aspectRatio) : e.mode === "edit" ? t.resolution = e.resolutionStr : e.mode === "extend" && (t.duration = e.durationSec), e.mode === "i2v" && e.imageUrl ? t.image_url = e.imageUrl : e.mode === "r2v" && ((r = e.referenceImageUrls) != null && r.length) && (t.reference_image_urls = e.referenceImageUrls), (e.mode === "edit" || e.mode === "extend") && e.videoUrl && (t.video_url = e.videoUrl), t;
}

function WQi(e) {
  return e.mode === "i2v" ? e.imageRefs.slice(0, 1) : e.mode === "r2v" ? tUt(e.imageRefs) : [];
}

const qQi = "无法读取首尾帧图片，请检查连线或重新上传",
  KQi = "无法读取参考图，请检查连线或重新上传图片",
  QQi = "多图参考生视频至少需要 2 张参考图";

function YQi(e) {
  if (!Q1(e.currentModel)) return null;
  const t = M8t(e.currentModel),
    n = l$r({
      variant: t,
      veoFramesMode: e.veoFramesMode,
      hasStartEndFrames: e.hasStartEndFrames,
      refImageCount: e.refImageCount
    });
  return {
    variant: t,
    mode: n,
    endpoint: `${Po(e.baseUrl)}/${GPn(t, n)}`
  };
}

function XQi(e) {
  var n;
  const t = {
    prompt: (e.prompt || "").trim() || " ",
    aspect_ratio: u$r(e.ratio, e.mode),
    duration: p$r(e.durationSetting),
    resolution: h$r(e.resolution),
    generate_audio: e.generateAudio !== !1,
    auto_fix: e.mode === "t2v",
    safety_tolerance: "4"
  };
  return e.mode === "flf" && e.firstFrameUrl && e.lastFrameUrl ? (t.first_frame_url = e.firstFrameUrl, t.last_frame_url = e.lastFrameUrl, t.auto_fix = !1) : e.mode === "i2v" && e.imageUrl ? (t.image_url = e.imageUrl, t.auto_fix = !1) : e.mode === "r2v" && ((n = e.imageUrls) != null && n.length) && (t.image_urls = e.imageUrls, t.auto_fix = !1), t;
}

function JQi(e) {
  const t = !!e.framesMode,
    n = t && e.startPort || null,
    r = t && e.endPort || null;
  return {
    framesMode: t,
    startUrl: n,
    endUrl: r,
    hasStartEndFrames: !!(n && r)
  };
}

function ZQi(e) {
  return e.mode === "flf" ? {
    startUrl: e.startUrl || void 0,
    endUrl: e.endUrl || void 0
  } : e.mode === "i2v" ? {
    imageUrl: e.refImages[0]
  } : e.mode === "r2v" ? {
    imageUrls: e.refImages.slice(0, 3)
  } : {};
}

const eYi = "无法读取参考图，请检查连线或重新上传图片";

function tYi(e) {
  if (!wy(e.currentModel)) return null;
  const t = ohe(e.currentModel),
    n = e.hasReferenceImage && e.refImageCount > 0 ? "i2v" : "t2v";
  return {
    isPro: t,
    mode: n,
    endpoint: `${Po(e.baseUrl)}/${b9n(n, t)}`
  };
}

function nYi(e) {
  const t = {
    prompt: (e.prompt || "").trim() || " ",
    aspect_ratio: U$r(e.ratio, e.mode),
    duration: $$r(e.durationSetting),
    resolution: G$r(e.resolution, e.isPro, e.isHd),
    delete_video: !1,
    detect_and_block_ip: !1
  };
  return !e.isPro && e.mode === "t2v" && (t.model = "sora-2"), e.characterIds.length > 0 && (t.character_ids = e.characterIds), e.mode === "i2v" && e.imageUrl && (t.image_url = e.imageUrl), t;
}

function rYi(e) {
  return e.mode !== "i2v" ? [] : e.refImages.slice(0, 1);
}

const aYi = "音频不能作为唯一参考，请同时连接至少一张参考图或一条参考视频",
  iYi = "相机控制需要连接一张参考图作为首帧",
  oYi = "口型同步需要连接一张参考图",
  omn = "口型同步需要连接一段音频（至少 5 秒）",
  sYi = "图生视频需要连接参考图或首帧",
  lYi = "无法读取参考图，请检查连线或重新上传图片",
  cYi = "全能参考需要至少连接一张参考图、一条参考视频或一段参考音频";

function dYi(e) {
  const t = Lxe(e),
    n = pM(e),
    r = p5(e);
  return {
    turbo: t,
    camera: n,
    lipsync: r,
    isFramesMode: !t && !n && !r && !!(e != null && e.veoFramesMode)
  };
}

function smn(e, t) {
  const n = t == null ? void 0 : t.get(e);
  return (n == null ? void 0 : n.type) === "video" || Ey(e) ? "video" : (n == null ? void 0 : n.type) === "audio" || KE(e) ? "audio" : "image";
}

function uYi(e) {
  const t = [],
    n = new Set(),
    r = (i, o) => {
      const s = String(i || "").trim();
      !s || n.has(s) || (n.add(s), t.push({
        url: s,
        type: o || smn(s, e.refMetaByRawUrl)
      }));
    };
  if (!e.isFramesMode && (e.turbo || e.camera || e.lipsync)) {
    for (const i of e.refImages) {
      const o = smn(i, e.refMetaByRawUrl);
      o === "image" ? r(i, "image") : e.lipsync && o === "audio" && r(i, "audio");
    }
    if (e.lipsync && e.audioPortRef && r(e.audioPortRef, "audio"), e.refMetaByRawUrl) for (const [i, o] of e.refMetaByRawUrl) n.has(i) || (o.type === "image" ? r(i, "image") : e.lipsync && o.type === "audio" && r(i, "audio"));
  } else if (!e.isFramesMode && !e.turbo && !e.camera && !e.lipsync) {
    for (const i of e.refImages) r(i);
    if (e.videoPortRef && r(e.videoPortRef, "video"), e.audioPortRef && r(e.audioPortRef, "audio"), e.refMetaByRawUrl) for (const [i, o] of e.refMetaByRawUrl) n.has(i) || (o.type === "video" ? r(i, "video") : o.type === "audio" ? r(i, "audio") : o.type === "image" && r(i, "image"));
  }
  const a = t.slice(0, SGr);
  return {
    imageRefs: a.filter(i => i.type === "image").map(i => i.url),
    videoRefs: a.filter(i => i.type === "video").map(i => i.url),
    audioRefs: a.filter(i => i.type === "audio").map(i => i.url),
    strip: a.map(i => ({
      type: i.type
    }))
  };
}

function hYi(e) {
  if (!Yc(e.currentModel)) return null;
  const t = LGr({
    veoFramesMode: e.isFramesMode,
    hasStartFrame: e.hasStart,
    hasReferenceImage: e.hasReferenceImage,
    imageCount: e.imageCount,
    videoCount: e.videoCount,
    audioCount: e.audioCount,
    turbo: e.turbo,
    camera: e.camera,
    lipsync: e.lipsync
  });
  return {
    mode: t,
    endpoint: `${Po(e.baseUrl)}/${DGr(t)}`,
    durationSec: U9n(e.durationSetting),
    resolutionStr: $9n(e.resolution, t),
    expansion: G9n(e.promptExpansionMode)
  };
}

function pYi(e) {
  return e.mode === "turbo" || e.mode === "turbo-i2v" || e.mode === "lipsync" ? String(e.prompt || "") : e.mode === "camera" ? BGr(e.prompt) : zGr(e.prompt || "", e.strip);
}

function mYi(e) {
  var n, r, a;
  if (e.mode === "lipsync") return {
    image_url: e.imageUrl,
    audio_url: e.audioUrl,
    resolution: e.resolutionStr,
    enable_transcription: e.enableTranscription !== !1,
    enable_safety_checker: !0
  };
  const t = {
    prompt: (e.prompt || "").trim() || " ",
    duration: e.durationSec,
    resolution: e.resolutionStr,
    prompt_expansion_mode: e.expansion,
    enable_safety_checker: !0
  };
  return (e.mode === "t2v" || e.mode === "r2v" || e.mode === "turbo") && (t.aspect_ratio = Q8t(e.ratio, e.mode === "turbo" ? "t2v" : e.mode)), e.imageUrl && (t.image_url = e.imageUrl), e.endImageUrl && (t.end_image_url = e.endImageUrl), e.cameraTrajectory && (t.camera_trajectory = e.cameraTrajectory), (n = e.referenceImageUrls) != null && n.length && (t.reference_image_urls = e.referenceImageUrls), (r = e.referenceVideoUrls) != null && r.length && (t.reference_video_urls = e.referenceVideoUrls), (a = e.referenceAudioUrls) != null && a.length && (t.reference_audio_urls = e.referenceAudioUrls), t;
}

function fYi(e) {
  if (e.mode !== "i2v" && e.mode !== "turbo-i2v" && e.mode !== "camera" && e.mode !== "lipsync") return {};
  const t = e.startFrame || e.imageRefs[0] || e.refImages[0] || void 0;
  if (!t) return {};
  if (e.mode === "camera" || e.mode === "lipsync") return {
    startSource: t
  };
  const n = e.endFrame || (e.mode === "turbo-i2v" && e.imageRefs.length >= 2 ? e.imageRefs[1] : void 0);
  return {
    startSource: t,
    endSource: n || void 0
  };
}

function gYi(e, t, n, r) {
  const a = String(e.prompt || "");
  if ($Gr(a)) return e;
  const i = UGr(t, n, r);
  return e.prompt = i ? `${i}${a}`.trim() || " " : a.trim() || " ", e;
}

const lgr = "生成视频",
  yYi = "参考生视频需要至少连接一张参考图、一条参考视频或一段参考音频",
  bYi = "无法读取参考图，请检查连线或重新上传图片";

function vYi(e) {
  if (!D2(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed,
    r = WGr({
      imageCount: e.imageCount,
      videoCount: e.videoCount,
      audioCount: e.audioCount
    });
  return {
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${qGr(r)}`,
    durationSec: KGr(e.durationUi),
    resolutionStr: QGr(e.resolutionUi),
    aspectRatio: YGr(e.ratioUi),
    audio: t.huyaWanAudio !== !1,
    promptExtend: !!(t.promptExtend ?? t.huyaWanPromptExtend),
    enableThinking: VGr(t),
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null
  };
}

function wYi(e) {
  const t = XGr(e.prompt || "", e.strip);
  return e.mode === "t2v" ? t.trim() || lgr : t.trim();
}

function xYi(e) {
  const t = {
      resolution: e.resolutionStr,
      aspect_ratio: e.aspectRatio,
      duration: e.durationSec,
      audio: e.audio,
      enable_prompt_expansion: e.promptExtend,
      enable_thinking: e.enableThinking,
      enable_safety_checker: !0
    },
    n = String(e.prompt || "").trim();
  if (n ? t.prompt = n : e.mode === "t2v" && (t.prompt = lgr), e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), e.mode === "r2v") {
    const r = (e.referenceImageUrls || []).slice(0, H9n),
      a = (e.referenceVideoUrls || []).slice(0, W9n),
      i = (e.referenceAudioUrls || []).slice(0, q9n);
    r.length && (t.reference_image_urls = r), a.length && (t.reference_video_urls = a), i.length && (t.reference_audio_urls = i);
  }
  return t;
}

function _Yi(e, t, n, r) {
  const a = String(e.prompt || "");
  if (ZGr(a)) return e;
  const i = JGr(t, n, r),
    o = i ? `${i}${a}`.trim() : a.trim();
  return o ? e.prompt = o : delete e.prompt, e;
}

const cgr = "生成视频",
  kYi = "参考生视频需要至少连接一张参考图或一条参考视频",
  AYi = "参考生视频至少需要一张参考图或一条参考视频（不能只连音频）",
  SYi = "无法读取参考图，请检查连线或重新上传图片";

function IYi(e) {
  if (!Db(e.currentModel)) return null;
  const t = e.settings || {};
  return {
    mode: nVr({
      imageCount: e.imageCount,
      videoCount: e.videoCount,
      audioCount: e.audioCount
    }),
    endpoint: `${Po(e.baseUrl)}/${rVr()}`,
    duration: aVr(e.durationUi),
    resolutionStr: iVr(e.resolutionUi),
    aspectRatio: oVr(e.ratioUi),
    generateAudio: t.seedanceGenerateAudio !== !1,
    bitrateMode: aRn(t)
  };
}

function CYi(e) {
  const t = sVr(e.prompt || "", e.strip);
  return e.mode === "t2v" ? t.trim() || cgr : t.trim();
}

function EYi(e) {
  const t = {
      resolution: e.resolutionStr,
      aspect_ratio: e.aspectRatio,
      duration: e.duration,
      generate_audio: e.generateAudio,
      bitrate_mode: e.bitrateMode
    },
    n = String(e.prompt || "").trim();
  n ? t.prompt = n : e.mode === "t2v" && (t.prompt = cgr);
  const r = (e.referenceImageUrls || []).slice(0, Y9n),
    a = (e.referenceVideoUrls || []).slice(0, X9n),
    i = (e.referenceAudioUrls || []).slice(0, J9n);
  return r.length && (t.image_urls = r), a.length && (t.video_urls = a), i.length && (t.audio_urls = i), t;
}

function TYi(e, t, n, r) {
  const a = String(e.prompt || "");
  if (cVr(a)) return e;
  const i = lVr(t, n, r),
    o = i ? `${i}${a}`.trim() : a.trim();
  return o ? e.prompt = o : delete e.prompt, e;
}

const dgr = "生成视频",
  MYi = "参考生视频需要至少连接一张参考图或一条参考视频",
  PYi = "参考生视频至少需要一张参考图或一条参考视频（不能只连音频）",
  RYi = "无法读取参考图，请检查连线或重新上传图片",
  NYi = "请先用 480p 发送草稿，成功后再选择 1080p 发送";

function jYi(e) {
  if (!Kv(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed,
    r = fVr({
      imageCount: e.imageCount,
      videoCount: e.videoCount,
      audioCount: e.audioCount
    }),
    a = gVr({
      videoCount: e.videoCount
    }),
    i = r === "r2v" && a === "editing",
    o = dhe(e.currentModel);
  return {
    mode: r,
    task: a,
    endpoint: `${Po(e.baseUrl)}/${yVr(r)}`,
    duration: i ? "auto" : bVr(e.durationUi),
    resolutionStr: o ? "480p" : gRn(e.resolutionUi),
    aspectRatio: i ? "auto" : vVr(e.ratioUi),
    generateAudio: t.seedanceGenerateAudio !== !1,
    bitrateMode: mRn(t),
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null,
    draft: o
  };
}

function DYi(e) {
  if (!dhe(e.currentModel) || !AVr(e.resolutionUi)) return null;
  const t = SVr(e.settings);
  return t ? {
    endpoint: `${Po(e.baseUrl)}/${pVr}`,
    payload: LYi(t)
  } : "missing-draft";
}

function LYi(e) {
  return {
    draft_id: e,
    resolution: "1080p",
    codec: "auto"
  };
}

function OYi(e) {
  const t = wVr(e.prompt || "", e.strip);
  return e.mode === "t2v" ? t.trim() || dgr : t.trim();
}

function BYi(e) {
  const t = {
    resolution: e.resolutionStr,
    aspect_ratio: e.aspectRatio,
    duration: e.duration,
    generate_audio: e.generateAudio,
    bitrate_mode: e.bitrateMode
  };
  e.draft && (t.draft = !0, t.resolution = "480p");
  const n = String(e.prompt || "").trim();
  if (n ? t.prompt = n : e.mode === "t2v" && (t.prompt = dgr), e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), e.mode === "r2v") {
    t.task = e.task || "reference";
    const r = (e.referenceImageUrls || []).slice(0, lRn),
      a = (e.referenceVideoUrls || []).slice(0, cRn),
      i = (e.referenceAudioUrls || []).slice(0, dRn);
    r.length && (t.image_urls = r), a.length && (t.video_urls = a), i.length && (t.audio_urls = i);
  }
  return t;
}

function FYi(e, t, n, r) {
  const a = String(e.prompt || "");
  if (_Vr(a)) return e;
  const i = xVr(t, n, r),
    o = i ? `${i}${a}`.trim() : a.trim();
  return o ? e.prompt = o : delete e.prompt, e;
}

const ugr = "生成视频",
  zYi = "首尾帧需要连接首帧图片",
  UYi = "参考生视频需要至少连接一张参考图或一条参考视频",
  $Yi = "参考生视频至少需要一张参考图或一条参考视频（不能只连音频）",
  lmn = "无法读取参考图，请检查连线或重新上传图片";

function GYi(e) {
  if (!aw(e.currentModel)) return null;
  const t = e.settings || {},
    n = MVr({
      framesMode: e.framesMode,
      imageCount: e.imageCount,
      videoCount: e.videoCount,
      audioCount: e.audioCount
    });
  return {
    mode: n,
    endpoint: `${Po(e.baseUrl)}/${PVr(n)}`,
    duration: RVr(e.durationUi),
    resolutionStr: NVr(e.resolutionUi),
    aspectRatio: jVr(e.ratioUi),
    generateAudio: t.seedanceGenerateAudio !== !1
  };
}

function VYi(e) {
  const t = DVr(e.prompt || "", e.strip);
  return e.mode === "r2v" ? t.trim() : t.trim() || ugr;
}

function HYi(e) {
  const t = {
      resolution: e.resolutionStr,
      aspect_ratio: e.aspectRatio,
      duration: e.duration,
      generate_audio: e.generateAudio
    },
    n = String(e.prompt || "").trim();
  if (n ? t.prompt = n : e.mode !== "r2v" && (t.prompt = ugr), e.mode === "i2v") e.imageUrl && (t.image_url = e.imageUrl), e.endImageUrl && (t.end_image_url = e.endImageUrl);else if (e.mode === "r2v") {
    const r = (e.referenceImageUrls || []).slice(0, bRn),
      a = (e.referenceVideoUrls || []).slice(0, vRn),
      i = (e.referenceAudioUrls || []).slice(0, wRn);
    r.length && (t.image_urls = r), a.length && (t.video_urls = a), i.length && (t.audio_urls = i);
  }
  return t;
}

function WYi(e, t, n, r) {
  const a = String(e.prompt || "");
  if (OVr(a)) return e;
  const i = LVr(t, n, r),
    o = i ? `${i}${a}`.trim() : a.trim();
  return o ? e.prompt = o : delete e.prompt, e;
}

const hgr = "生成视频",
  qYi = "首尾帧需要连接首帧图片",
  KYi = "参考生视频需要至少连接一张参考图或一条参考视频",
  QYi = "参考生视频至少需要一张参考图或一条参考视频（不能只连音频）",
  cmn = "无法读取参考图，请检查连线或重新上传图片";

function YYi(e) {
  if (!Lb(e.currentModel)) return null;
  const t = e.settings || {},
    n = $Vr({
      framesMode: e.framesMode,
      imageCount: e.imageCount,
      videoCount: e.videoCount,
      audioCount: e.audioCount
    });
  return {
    mode: n,
    endpoint: `${Po(e.baseUrl)}/${GVr(n)}`,
    duration: VVr(e.durationUi),
    resolutionStr: HVr(e.resolutionUi),
    aspectRatio: WVr(e.ratioUi),
    generateAudio: t.seedanceGenerateAudio !== !1,
    bitrateMode: DRn(t)
  };
}

function XYi(e) {
  const t = qVr(e.prompt || "", e.strip);
  return e.mode === "r2v" ? t.trim() : t.trim() || hgr;
}

function JYi(e) {
  const t = {
      resolution: e.resolutionStr,
      aspect_ratio: e.aspectRatio,
      duration: e.duration,
      generate_audio: e.generateAudio,
      bitrate_mode: e.bitrateMode
    },
    n = String(e.prompt || "").trim();
  if (n ? t.prompt = n : e.mode !== "r2v" && (t.prompt = hgr), e.mode === "i2v") e.imageUrl && (t.image_url = e.imageUrl), e.endImageUrl && (t.end_image_url = e.endImageUrl);else if (e.mode === "r2v") {
    const r = (e.referenceImageUrls || []).slice(0, CRn),
      a = (e.referenceVideoUrls || []).slice(0, ERn),
      i = (e.referenceAudioUrls || []).slice(0, TRn);
    r.length && (t.image_urls = r), a.length && (t.video_urls = a), i.length && (t.audio_urls = i);
  }
  return t;
}

function ZYi(e, t, n, r) {
  const a = String(e.prompt || "");
  if (QVr(a)) return e;
  const i = KVr(t, n, r),
    o = i ? `${i}${a}`.trim() : a.trim();
  return o ? e.prompt = o : delete e.prompt, e;
}

const eXi = "编辑视频需要连接一条源视频",
  tXi = "视频参考需要至少连接 1 张参考图或 1 条参考视频",
  nXi = "图生视频需要连接参考图或首帧",
  dmn = "无法读取参考图，请检查连线或重新上传图片",
  rXi = "无法读取源视频，请检查连线或重新上传",
  aXi = "Edit this video. Keep everything else the same.";

function iXi(e) {
  const t = dce(e);
  return {
    workflowMode: t,
    isFramesMode: t === "t2v" && !!(e != null && e.veoFramesMode)
  };
}

function umn(e, t) {
  const n = t == null ? void 0 : t.get(e);
  return (n == null ? void 0 : n.type) === "video" || Ey(e) ? "video" : (n == null ? void 0 : n.type) === "audio" ? "audio" : "image";
}

function oXi(e) {
  const t = [],
    n = [],
    r = (s, l) => {
      const d = String(l || "").trim();
      !d || s.includes(d) || s.push(d);
    };
  for (const s of e.refImages) {
    const l = umn(s, e.refMetaByRawUrl);
    if (l === "video") r(n, s);else {
      if (l === "audio") continue;
      r(t, s);
    }
  }
  if (e.refMetaByRawUrl) for (const [s, l] of e.refMetaByRawUrl) l.type === "video" ? r(n, s) : l.type === "image" && r(t, s);
  const a = [],
    i = new Set(),
    o = (s, l) => {
      const d = String(s || "").trim();
      !d || i.has(d) || (i.add(d), a.push({
        type: l
      }));
    };
  for (const s of e.refImages) {
    const l = umn(s, e.refMetaByRawUrl);
    if (l === "video") o(s, "video");else {
      if (l === "audio") continue;
      o(s, "image");
    }
  }
  return {
    imageRefs: t,
    videoRefs: n,
    strip: a
  };
}

function sXi(e, t) {
  return {
    imgSlice: e.slice(0, tHr),
    vidSlice: t.slice(0, nHr)
  };
}

function lXi(e) {
  if (e.mode !== "i2v") return {};
  const t = e.isFramesMode && e.startFrame || e.imageRefs[0];
  if (!t) return {};
  const n = e.isFramesMode && e.endFrame || void 0;
  return {
    startSource: t,
    endSource: n || void 0
  };
}

function cXi(e) {
  var a, i;
  if (!kp(e.currentModel)) return null;
  const t = dce(e.settings),
    n = t === "t2v" && !!((a = e.settings) != null && a.veoFramesMode),
    r = aHr(t, {
      imageCount: e.imageCount,
      framesMode: n,
      hasStart: e.hasStart,
      hasEnd: e.hasEnd
    });
  return {
    workflowMode: t,
    isFramesMode: n,
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${dHr(r)}`,
    durationSec: hHr(parseInt(String(e.durationNum), 10)),
    aspectRatio: uHr(e.ratio),
    resolutionStr: FRn(String(((i = e.settings) == null ? void 0 : i.resolution) || "720p")),
    needsSourceVideo: oHr(r)
  };
}

function dXi(e, t) {
  return pHr(e || "", t);
}

function uXi(e) {
  var r, a;
  const t = String(e.prompt || "").trim(),
    n = {
      prompt: e.mode === "edit" && !t ? aXi : t || " ",
      resolution: e.resolutionStr
    };
  return e.mode !== "edit" && (n.aspect_ratio = e.aspectRatio, n.duration = e.durationSec), e.imageUrl && (n.image_url = e.imageUrl), e.endImageUrl && (n.end_image_url = e.endImageUrl), (r = e.imageUrls) != null && r.length && (n.image_urls = e.imageUrls), (a = e.referenceVideoUrls) != null && a.length && (n.reference_video_urls = e.referenceVideoUrls), e.videoUrl && (n.video_url = e.videoUrl), n;
}

function hXi(e, t, n) {
  const r = String(e.prompt || "");
  if (/<(?:IMAGE|VIDEO)_REF_\d+>/.test(r)) return e;
  const a = mHr(t, n);
  return e.prompt = a ? `${a}${r}`.trim() || " " : r.trim() || " ", e;
}

const pXi = "视频转视频编辑需要连接一条源视频",
  mXi = "视频转视频参考需要连接一条参考视频",
  fXi = "视频参考需要至少连接 1 张参考图",
  gXi = "图生视频需要连接参考图或首帧",
  yXi = "Kling O1 常规生产需要连接参考图或首帧",
  hmn = "无法读取参考图，请检查连线或重新上传图片",
  bXi = "无法读取源视频，请检查连线或重新上传",
  vXi = "@Video1 Edit this video. Keep everything else the same.",
  wXi = "@Video1 Follow the motion of the reference video.";

function xXi(e) {
  const t = HY(e);
  return {
    workflowMode: t,
    isFramesMode: t === "t2v" && !!(e != null && e.veoFramesMode)
  };
}

function pmn(e, t) {
  const n = t == null ? void 0 : t.get(e);
  return (n == null ? void 0 : n.type) === "video" || Ey(e) ? "video" : (n == null ? void 0 : n.type) === "audio" ? "audio" : "image";
}

function _Xi(e) {
  const t = [],
    n = [],
    r = (s, l) => {
      const d = String(l || "").trim();
      !d || s.includes(d) || s.push(d);
    };
  for (const s of e.refImages) {
    const l = pmn(s, e.refMetaByRawUrl);
    if (l === "video") r(n, s);else {
      if (l === "audio") continue;
      r(t, s);
    }
  }
  if (e.refMetaByRawUrl) for (const [s, l] of e.refMetaByRawUrl) l.type === "video" ? r(n, s) : l.type === "image" && r(t, s);
  const a = [],
    i = new Set(),
    o = (s, l) => {
      const d = String(s || "").trim();
      !d || i.has(d) || (i.add(d), a.push({
        type: l
      }));
    };
  for (const s of e.refImages) {
    const l = pmn(s, e.refMetaByRawUrl);
    if (l === "video") o(s, "video");else {
      if (l === "audio") continue;
      o(s, "image");
    }
  }
  return {
    imageRefs: t,
    videoRefs: n,
    strip: a
  };
}

function kXi(e) {
  return e.slice(0, FHr);
}

function AXi(e) {
  return e.slice(0, zHr);
}

function SXi(e) {
  if (e.mode !== "i2v") return {};
  const t = e.isFramesMode && e.startFrame || e.imageRefs[0];
  if (!t) return {};
  const n = e.isFramesMode && e.endFrame || void 0;
  return {
    startSource: t,
    endSource: n || void 0
  };
}

function IXi(e) {
  return e === "edit" ? pXi : mXi;
}

function CXi(e) {
  var o, s;
  if (!Gp(e.currentModel)) return null;
  const t = zRn(e.currentModel) || "4k",
    n = ID(e.currentModel),
    r = HY(e.settings),
    a = r === "t2v" && !!((o = e.settings) != null && o.veoFramesMode),
    i = GHr(r, {
      imageCount: e.imageCount,
      framesMode: a,
      hasStart: e.hasStart,
      hasEnd: e.hasEnd
    });
  return {
    workflowMode: r,
    isFramesMode: a,
    mode: i,
    variant: t,
    endpoint: `${Po(e.baseUrl)}/${URn(i, t)}`,
    durationStr: ZHr(String(((s = e.settings) == null ? void 0 : s.duration) || e.durationNum), {
      maxSec: n ? 10 : 15
    }),
    aspectRatio: JHr(e.ratio, i),
    generateAudio: n ? !1 : eWr(e.settings || void 0),
    keepAudio: tWr(e.settings || void 0),
    needsSourceVideo: HHr(i),
    isO1: n
  };
}

function EXi(e, t, n) {
  return nWr(e || "", t, {
    imageAsElement: n === "r2v"
  });
}

function TXi(e) {
  var n;
  const t = {
    prompt: (e.prompt || "").trim() || " "
  };
  return e.isO1 || (t.shot_type = "customize"), (e.mode === "t2v" || e.mode === "i2v" || e.mode === "r2v") && (t.duration = e.durationStr, e.isO1 || (t.generate_audio = e.generateAudio)), (e.mode === "t2v" || e.mode === "r2v" || e.mode === "v2v-ref") && (t.aspect_ratio = e.aspectRatio), e.mode === "v2v-ref" && (t.duration = e.durationStr), (e.mode === "edit" || e.mode === "v2v-ref") && (t.keep_audio = e.keepAudio), e.imageUrl && (t[e.isO1 && e.mode === "i2v" ? "start_image_url" : "image_url"] = e.imageUrl), e.endImageUrl && (t.end_image_url = e.endImageUrl), e.mode === "r2v" && e.hostedImageUrls && (t.elements = rWr(e.hostedImageUrls)), (n = e.imageUrls) != null && n.length && (t.image_urls = e.imageUrls), e.videoUrl && (t.video_url = e.videoUrl), t;
}

function MXi(e, t) {
  const n = String(e.prompt || "");
  if (/@Element\d+/i.test(n) || /@Image\d+/i.test(n)) return e;
  const r = GRn(t, 0, {
    imageAsElement: !0
  });
  return e.prompt = r ? `${r}${n}`.trim() || " " : n.trim() || " ", e;
}

function PXi(e, t, n) {
  const r = String(e.prompt || "");
  if (!/@Video\d+/i.test(r) && !/@Image\d+/i.test(r)) {
    const a = GRn(t, 1);
    e.prompt = a ? `${a}${r}`.trim() || " " : r.trim() || " ";
  }
  return String(e.prompt || "").trim() || (e.prompt = n === "edit" ? vXi : wXi), e;
}

const lDe = "生成视频",
  RXi = "Bring the scene in the image to life.",
  NXi = "Edit this video. Keep everything else the same.",
  jXi = "图像转视频需要连接一张首帧图",
  DXi = "参考视频需要至少连接 1 张参考图",
  LXi = "视频剪辑需要连接一条源视频",
  mmn = "无法读取参考图，请检查连线或重新上传图片",
  OXi = "无法读取源视频，请检查连线或重新上传";

function fmn(e, t) {
  const n = t == null ? void 0 : t.get(e);
  return (n == null ? void 0 : n.type) === "video" || Ey(e) ? "video" : (n == null ? void 0 : n.type) === "audio" ? "audio" : "image";
}

function BXi(e) {
  const t = [],
    n = [],
    r = (s, l) => {
      const d = String(l || "").trim();
      !d || s.includes(d) || s.push(d);
    };
  for (const s of e.refImages) {
    const l = fmn(s, e.refMetaByRawUrl);
    if (l === "video") r(n, s);else {
      if (l === "audio") continue;
      r(t, s);
    }
  }
  if (e.refMetaByRawUrl) for (const [s, l] of e.refMetaByRawUrl) l.type === "video" ? r(n, s) : l.type === "image" && r(t, s);
  const a = [],
    i = new Set(),
    o = (s, l) => {
      const d = String(s || "").trim();
      !d || i.has(d) || (i.add(d), a.push({
        type: l
      }));
    };
  for (const s of e.refImages) {
    const l = fmn(s, e.refMetaByRawUrl);
    if (l === "video") o(s, "video");else {
      if (l === "audio") continue;
      o(s, "image");
    }
  }
  return {
    imageRefs: t,
    videoRefs: n,
    strip: a
  };
}

function FXi(e) {
  return e.slice(0, HRn);
}

function zXi(e) {
  return e.slice(0, WRn);
}

function UXi(e) {
  if (!Fm(e.currentModel)) return null;
  const t = e.settings || {},
    n = Fxe(t),
    r = uWr(n, e.imageCount ?? 0),
    a = t.seed;
  return {
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${yWr(r)}`,
    durationSec: vWr(String(t.duration || e.durationNum)),
    aspectRatio: bWr(e.ratio),
    resolutionStr: wWr(e.resolution ?? String(t.resolution || "")),
    audioSetting: xWr(t),
    seed: a != null && Number.isFinite(Number(a)) ? Number(a) : null,
    needsSourceVideo: pWr(r)
  };
}

function $Xi(e) {
  return _Wr(e.prompt || "", e.strip, e.mode);
}

function GXi(e) {
  const t = {
    resolution: e.resolutionStr,
    enable_safety_checker: !0
  };
  (e.mode === "t2v" || e.mode === "r2v") && (t.aspect_ratio = e.aspectRatio), (e.mode === "t2v" || e.mode === "i2v" || e.mode === "r2v") && (t.duration = e.durationSec), e.mode === "edit" && (t.audio_setting = e.audioSetting), e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed));
  const n = String(e.prompt || "").trim();
  if (e.mode === "t2v") t.prompt = n || lDe;else if (e.mode === "i2v") n && (t.prompt = n), e.imageUrl && (t.image_url = e.imageUrl);else if (e.mode === "r2v") {
    t.prompt = n;
    const r = (e.imageUrls || []).slice(0, HRn);
    r.length && (t.image_urls = r);
  } else {
    t.prompt = n, e.videoUrl && (t.video_url = e.videoUrl);
    const r = (e.referenceImageUrls || []).slice(0, WRn);
    r.length && (t.reference_image_urls = r);
  }
  return t;
}

function VXi(e, t) {
  const n = String(e.prompt || "");
  if (KRn(n, "r2v")) return n.trim() || (e.prompt = lDe), e;
  const r = QRn(t, "r2v");
  return e.prompt = r ? `${r}${n}`.trim() || lDe : n.trim() || lDe, e;
}

function HXi(e, t) {
  const n = String(e.prompt || "");
  if (!KRn(n, "edit")) {
    const r = QRn(t, "edit");
    e.prompt = r ? `${r}${n}`.trim() : n.trim();
  }
  return String(e.prompt || "").trim() || (e.prompt = NXi), e;
}

function WXi(e) {
  return String(e.prompt || "").trim() || (e.prompt = RXi), e;
}

const qXi = "生成视频",
  KXi = "Vidu Q3 Mix 需要连接 1–4 张参考图",
  QXi = "无法读取参考图，请检查连线或重新上传图片";

function YXi(e) {
  if (!xb(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed;
  return {
    endpoint: `${Po(e.baseUrl)}/${YRn}`,
    durationSec: AWr(e.durationUi),
    resolutionStr: SWr(e.resolutionUi),
    aspectRatio: IWr(e.ratioUi),
    audio: t[Lft] !== !1,
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null
  };
}

function XXi(e) {
  return e.slice(0, XRn);
}

function JXi(e) {
  const t = {
    prompt: String(e.prompt || "").trim() || qXi,
    reference_image_urls: e.referenceImageUrls.slice(0, XRn),
    duration: e.durationSec,
    aspect_ratio: e.aspectRatio,
    resolution: e.resolutionStr,
    audio: e.audio
  };
  return e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), t;
}

const ZXi = "生成视频",
  eJi = "Vidu Q3 首尾帧需要连接首帧图",
  tJi = "无法读取参考图，请检查连线或重新上传图片";

function nJi(e) {
  return e.framesMode && e.startUrl || !e.framesMode && e.refImageCount > 0 ? "i2v" : "t2v";
}

function rJi(e) {
  if (e.framesMode) {
    const n = e.startUrl || void 0,
      r = e.endUrl || void 0;
    return n ? {
      start: n,
      end: r
    } : {};
  }
  const t = e.refImages.filter(Boolean);
  return t.length === 0 ? {} : {
    start: t[0],
    end: t[1]
  };
}

function aJi(e) {
  if (!yf(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed,
    r = nJi({
      framesMode: e.framesMode,
      startUrl: e.startUrl,
      refImageCount: e.refImageCount
    }),
    a = r === "i2v" && !!(e.framesMode ? e.endUrl : e.refImageCount >= 2),
    i = uhe(e.currentModel) && !e.framesMode ? 3 : 1;
  return {
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${tNn(e.currentModel, r)}`,
    durationSec: jWr(e.durationUi, i),
    resolutionStr: DWr(e.resolutionUi, a),
    aspectRatio: LWr(e.ratioUi),
    audio: t[Oft] !== !1,
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null
  };
}

function iJi(e) {
  const t = {
      duration: e.durationSec,
      resolution: e.resolutionStr,
      audio: e.audio
    },
    n = String(e.prompt || "").trim();
  return e.mode === "t2v" ? (t.prompt = n || ZXi, t.aspect_ratio = e.aspectRatio) : (n && (t.prompt = n), e.imageUrl && (t.image_url = e.imageUrl), e.endImageUrl && (t.end_image_url = e.endImageUrl)), e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), t;
}

const pgr = "生成视频",
  oJi = "Vidu Q4 图生需要连接首帧",
  gmn = "无法读取参考图，请检查连线或重新上传图片",
  sJi = "无法读取参考音频，请检查连线或重新上传";

function lJi(e) {
  if (!Sy(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed,
    r = FWr(e.framesMode);
  return {
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${zWr(r)}`,
    durationSec: UWr(e.durationUi),
    resolutionStr: lNn(e.resolutionUi),
    aspectRatio: $Wr(e.ratioUi),
    audio: t[Bft] === !0,
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null
  };
}

function cJi(e) {
  return e.mode === "i2v" ? String(e.prompt || "").trim() : qWr(e.prompt || "", e.strip).trim() || pgr;
}

function dJi(e) {
  const t = {
      duration: e.durationSec,
      resolution: e.resolutionStr
    },
    n = String(e.prompt || "").trim();
  if (e.mode === "i2v") n && (t.prompt = n), e.imageUrl && (t.image_url = e.imageUrl);else {
    t.prompt = n || pgr, t.aspect_ratio = e.aspectRatio, t.audio = e.audio;
    const r = e.referenceImageUrls || [],
      a = e.referenceAudioUrls || [];
    r.length && (t.reference_image_urls = r), a.length && (t.reference_audio_urls = a);
  }
  return e.seed != null && Number.isFinite(Number(e.seed)) && (t.seed = Number(e.seed)), t;
}

const uJi = "编辑视频需要连接一条源视频（MP4，15 秒 / 50MB 内）",
  hJi = "延长视频需要连接一条源视频（MP4，15 秒 / 50MB 内）",
  pJi = "图生视频需要连接参考图或首帧",
  ymn = "无法读取参考图，请检查连线或重新上传图片",
  mJi = "首尾帧需要连接首帧和尾帧",
  fJi = "无法读取首帧或尾帧，请检查连线或重新上传图片",
  gJi = "关键帧模式至少需要 2 张参考图",
  yJi = "无法读取源视频，请检查连线或重新上传",
  bJi = "Edit this video. Keep everything else the same.",
  vJi = "The camera keeps tracking as the subject continues the same action.";

function wJi(e) {
  const t = uce(e);
  return {
    workflowMode: t,
    isFramesMode: t === "t2v" && !!(e != null && e.veoFramesMode)
  };
}

function xJi(e) {
  var a;
  const t = [],
    n = [],
    r = (i, o) => {
      const s = String(o || "").trim();
      !s || i.includes(s) || i.push(s);
    };
  for (const i of e.refImages) {
    const o = (a = e.refMetaByRawUrl) == null ? void 0 : a.get(i);
    if ((o == null ? void 0 : o.type) === "video" || Ey(i)) r(n, i);else {
      if ((o == null ? void 0 : o.type) === "audio") continue;
      r(t, i);
    }
  }
  if (e.refMetaByRawUrl) for (const [i, o] of e.refMetaByRawUrl) o.type === "video" ? r(n, i) : o.type === "image" && r(t, i);
  return {
    imageRefs: t,
    videoRefs: n
  };
}

function _Ji(e) {
  return e.slice(0, dNn);
}

function bmn(e) {
  if (e.mode === "i2v") {
    const t = e.isFramesMode && e.startFrame || e.imageRefs[0];
    return t ? {
      startSource: t
    } : {};
  }
  if (e.mode === "flf") {
    const t = e.startFrame || e.imageRefs[0],
      n = e.endFrame || e.imageRefs[1];
    return {
      startSource: t || void 0,
      endSource: n || void 0
    };
  }
  return {};
}

function kJi(e) {
  return e === "edit" ? uJi : hJi;
}

function AJi(e) {
  var a, i, o;
  if (!Ap(e.currentModel)) return null;
  const t = uce(e.settings),
    n = t === "t2v" && !!((a = e.settings) != null && a.veoFramesMode),
    r = oqr(t, {
      imageCount: e.imageCount,
      framesMode: n,
      hasStart: e.hasStart,
      hasEnd: e.hasEnd
    });
  return {
    workflowMode: t,
    isFramesMode: n,
    mode: r,
    endpoint: `${Po(e.baseUrl)}/${pqr(r)}`,
    durationValue: gqr(String(((i = e.settings) == null ? void 0 : i.duration) || e.durationNum), r),
    aspectRatio: fqr(e.ratio),
    resolutionStr: hNn(String(((o = e.settings) == null ? void 0 : o.resolution) || "720p")),
    generateAudio: yqr(e.settings),
    needsSourceVideo: lqr(r)
  };
}

function SJi(e) {
  const n = {
    prompt: String(e.prompt || "").trim() || (e.mode === "edit" ? bJi : e.mode === "extend" ? vJi : " "),
    safety_tolerance: rqr
  };
  if (e.mode !== "edit" && (n.aspect_ratio = e.aspectRatio, n.resolution = e.resolutionStr, n.duration = e.durationValue, n.generate_audio = e.generateAudio), e.imageUrl && (n.image_url = e.imageUrl), e.startImageUrl && (n.start_image_url = e.startImageUrl), e.endImageUrl && (n.end_image_url = e.endImageUrl), e.mode === "keyframes" && e.hostedImageUrls) {
    const r = typeof e.durationValue == "number" ? e.durationValue : 5;
    n.keyframes = bqr(e.hostedImageUrls, r);
  }
  return e.videoUrl && (n.video_url = e.videoUrl), n;
}

const mgr = 7,
  fgr = "grok-video-3",
  IJi = "图片处理失败，请检查图片链接或跨域设置";

function CJi(e) {
  const t = String(e ?? "").trim().toLowerCase();
  return t.includes("480") ? "480p" : (t.includes("720"), "720p");
}

function EJi(e) {
  return e.slice(0, mgr);
}

function TJi(e) {
  return PE(e.currentModel) ? {
    endpoint: `${e.baseUrl}/v2/videos/generations`,
    durationInt: parseInt(String(e.durationNum), 10),
    aspectRatioStr: e.ratio && e.ratio !== "Auto" ? e.ratio : "3:2",
    resolutionStr: CJi(e.resolution),
    grokRefCount: Math.min(e.refImageCount, mgr)
  } : null;
}

function MJi(e, t) {
  return t > 0 && !String(e || "").trim() ? `${Array.from({
    length: t
  }, (n, r) => `@img${r + 1}`).join(" ")} ` : PPn(e || "");
}

function PJi(e) {
  var n;
  const t = {
    model: e.apiModel || fgr,
    prompt: MJi(e.prompt, e.grokRefCount),
    ratio: e.aspectRatioStr,
    resolution: e.resolutionStr
  };
  return Number.isFinite(e.durationInt) && e.durationInt > 0 && (t.duration = e.durationInt), (n = e.images) != null && n.length && (t.images = e.images), t;
}

const RJi = "可灵参考素材图床上传失败",
  NJi = "图片处理失败，请检查图片链接",
  jJi = "kling-video-o1",
  DJi = "kling-v3-omni";

function LJi(e) {
  if (!zv(e.currentModel)) return null;
  const t = E3(e.currentModel),
    n = e.klingVideoReferType || "base";
  let r = Number(e.durationNum);
  e.klingVideoUrl && n === "base" && e.klingVideoSegment && (r = Math.round(e.klingVideoSegment.endTime - e.klingVideoSegment.startTime));
  const a = e.resolution || "720P",
    i = e.klingV3Sound || "on";
  return {
    isV3Omni: t,
    omniLogTag: t ? "Kling 3.0 Omni" : "Kling O1",
    endpoint: `${e.baseUrl}/kling/v1/videos/omni-video`,
    modelName: t ? DJi : jJi,
    referType: n,
    keepSound: e.klingVideoKeepSound || "yes",
    finalDuration: Number.isFinite(r) ? r : Number(e.durationNum),
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : "16:9",
    mode: t ? a === "4K" ? "4k" : a === "1080P" ? "pro" : "std" : "pro",
    sound: t ? e.klingVideoUrl ? "off" : i === "on" ? "on" : "off" : void 0
  };
}

function OJi(e) {
  return e.map(t => ({
    image_url: t.url
  }));
}

function BJi(e) {
  return e.klingImages && e.klingImages.length > 0 ? {
    kind: "uploaded",
    images: e.klingImages
  } : e.hasReferenceImage ? {
    kind: "connected",
    urls: e.refImages
  } : {
    kind: "none"
  };
}

function FJi(e) {
  return e.map(t => ({
    element_id: String(t)
  }));
}

function zJi(e) {
  return `${typeof e.windowUrl == "string" && e.windowUrl || `${e.origin || ""}/api/kling-callback`}/api/kling-callback`;
}

function UJi(e) {
  var n, r;
  const t = {
    model_name: e.modelName,
    prompt: e.prompt
  };
  return (n = e.imageList) != null && n.length && (t.image_list = e.imageList), (r = e.elementList) != null && r.length && (t.element_list = e.elementList), e.videoUrl && (t.video_list = [{
    video_url: e.videoUrl,
    refer_type: e.referType,
    keep_original_sound: e.keepSound
  }]), t.mode = e.mode, e.sound && (t.sound = e.sound), t.aspect_ratio = e.aspectRatio, t.duration = String(e.duration), t.callback_url = e.callbackUrl, t;
}

const $Ji = "kling-v2-5-turbo",
  GJi = "图片处理失败，请检查图片链接";

function VJi(e) {
  if (!Lk(e.currentModel)) return null;
  const t = e.hasStartFrame || e.hasEndFrame,
    n = t || e.hasReferenceImage,
    r = e.klingV25Resolution || "std",
    a = n || r === "std" || r === "pro" ? r : "std";
  return {
    hasStartFrame: e.hasStartFrame,
    hasEndFrame: e.hasEndFrame,
    hasFrameInput: t,
    hasReferenceImage: e.hasReferenceImage,
    isImage2Video: n,
    endpoint: `${e.baseUrl}/kling/v1/videos/${n ? "image2video" : "text2video"}`,
    durationInt: parseInt(e.duration.replace("s", ""), 10),
    mode: a,
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : "16:9"
  };
}

function HJi(e) {
  return e.hasFrameInput ? {
    imageUrl: e.startUrl || e.endUrl || void 0,
    imageTailUrl: e.endUrl || void 0
  } : e.hasReferenceImage ? {
    imageUrl: e.refImages[0] || void 0
  } : {};
}

function WJi(e) {
  const t = {
    model_name: $Ji,
    prompt: e.prompt,
    duration: e.durationInt,
    mode: e.mode,
    aspect_ratio: e.aspectRatio
  };
  return e.image && (t.image = e.image), e.imageTail && (t.image_tail = e.imageTail), t;
}

const qJi = "kling-v2-6",
  KJi = "图片处理失败，请检查图片链接";

function QJi(e, t) {
  return e === "pro" && t === "on" ? "on" : "off";
}

function YJi(e) {
  if (!O2(e.currentModel)) return null;
  const t = e.hasStartFrame || e.hasEndFrame,
    n = t || e.hasReferenceImage,
    r = e.klingV26Resolution || "std",
    a = e.klingV26Sound,
    i = t ? "pro" : n || r === "std" || r === "pro" ? r : "std";
  return {
    hasStartFrame: e.hasStartFrame,
    hasEndFrame: e.hasEndFrame,
    hasFrameInput: t,
    hasReferenceImage: e.hasReferenceImage,
    isImage2Video: n,
    endpoint: `${e.baseUrl}/kling/v1/videos/${n ? "image2video" : "text2video"}`,
    durationStr: e.duration.replace("s", ""),
    mode: i,
    sound: QJi(i, a),
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : "16:9"
  };
}

function XJi(e) {
  return e.hasFrameInput ? {
    imageUrl: e.startUrl || e.endUrl || void 0,
    imageTailUrl: e.endUrl || void 0
  } : e.hasReferenceImage ? {
    imageUrl: e.refImages[0] || void 0
  } : {};
}

function JJi(e) {
  const t = {
    model_name: qJi,
    prompt: e.prompt,
    duration: e.durationStr,
    mode: e.mode,
    sound: e.sound,
    aspect_ratio: e.aspectRatio
  };
  return e.image && (t.image = e.image), e.imageTail && (t.image_tail = e.imageTail), t;
}

const ZJi = "kling-v3",
  eZi = "图片处理失败，请检查图片链接";

function tZi(e) {
  if (!(!e || e.length === 0)) return e.map(t => ({
    index: t.index,
    prompt: t.prompt,
    duration: String(t.duration || "2")
  }));
}

function nZi(e) {
  if (!(!e || e.length === 0)) return e.map(t => ({
    element_id: String(t)
  }));
}

function rZi(e) {
  return e === "4K" ? {
    resolution: "4k",
    mode: "4k"
  } : e === "1080P" ? {
    resolution: "1080p",
    mode: "pro"
  } : {
    resolution: "720p",
    mode: "std"
  };
}

function aZi(e) {
  if (!jv(e.currentModel)) return null;
  const t = e.hasStartFrame || e.hasEndFrame,
    n = t || e.hasReferenceImage,
    r = !!e.klingV3MultiShot,
    {
      resolution: a,
      mode: i
    } = rZi(e.resolution);
  return {
    hasStartFrame: e.hasStartFrame,
    hasEndFrame: e.hasEndFrame,
    hasFrameInput: t,
    hasReferenceImage: e.hasReferenceImage,
    isImage2Video: n,
    endpoint: `${e.baseUrl}/kling/v1/videos/${n ? "image2video" : "text2video"}`,
    prompt: r ? "" : e.prompt || "",
    durationStr: e.duration.replace("s", ""),
    sound: e.klingV3Sound === "on" ? "on" : "off",
    resolution: a,
    mode: i,
    multiShot: r,
    shotType: r ? e.klingV3ShotType || "intelligence" : void 0,
    multiPrompt: r ? tZi(e.klingV3MultiPrompt) : void 0,
    elementList: nZi(e.klingSubjects),
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : "16:9"
  };
}

function iZi(e) {
  return e.hasFrameInput ? {
    imageUrl: e.startUrl || e.endUrl || void 0,
    imageTailUrl: e.endUrl || void 0
  } : e.hasReferenceImage ? {
    imageUrl: e.refImages[0] || void 0
  } : {};
}

function oZi(e) {
  const t = {
    model_name: ZJi,
    prompt: e.prompt,
    duration: e.durationStr,
    sound: e.sound,
    resolution: e.resolution,
    mode: e.mode,
    multi_shot: e.multiShot,
    aspect_ratio: e.aspectRatio
  };
  return e.multiShot && e.shotType && (t.shot_type = e.shotType), e.multiShot && e.multiPrompt && (t.multi_prompt = e.multiPrompt), e.elementList && (t.element_list = e.elementList), e.image && (t.image = e.image), e.imageTail && (t.image_tail = e.imageTail), t;
}

const sZi = "veo-3.1-generate-preview";

function lZi(e) {
  if (!e || e === "Auto") return;
  if (e === "16:9" || e === "9:16") return e;
  const [t, n] = e.split(":").map(Number);
  if (Number.isFinite(t) && Number.isFinite(n) && n !== 0) return t / n >= 1 ? "16:9" : "9:16";
}

function cZi(e) {
  if (!(!e || e === "Auto")) {
    if (e === "720P") return "720p";
    if (e === "1080P") return "1080p";
    if (e === "4K") return "4k";
  }
}

function dZi(e, t) {
  let n = Number.isFinite(e) ? e : 8;
  return (t === "1080p" || t === "4k") && (n = 8), n;
}

function uZi(e) {
  if (!Dv(e.currentModel)) return null;
  const t = e.modelName || sZi,
    n = cZi(e.resolution);
  return {
    endpoint: `${e.baseUrl.replace(/\/+$/, "")}/v1beta/models/${t}:predictLongRunning`,
    modelName: t,
    aspectRatio: lZi(e.ratio),
    officialResolution: n,
    parameterResolution: n && n !== "720p" ? n : void 0,
    durationSeconds: dZi(e.durationNum, n),
    isFramesMode: e.isFramesMode
  };
}

function hZi(e) {
  const t = {
    prompt: e.prompt
  };
  e.image && (t.image = e.image), e.lastFrame && (t.lastFrame = e.lastFrame), e.referenceImages && e.referenceImages.length > 0 && (t.referenceImages = e.referenceImages);
  const n = {};
  return e.aspectRatio && (n.aspectRatio = e.aspectRatio), e.resolution && e.resolution !== "720p" && (n.resolution = e.resolution), e.durationSeconds && (n.durationSeconds = e.durationSeconds), {
    instances: [t],
    parameters: Object.keys(n).length > 0 ? n : void 0
  };
}

const pZi = 3;

function mZi(e) {
  const t = e.framesMode && e.startPort || null,
    n = e.framesMode && e.endPort || null;
  return t || n ? {
    startUrl: t,
    endUrl: n,
    imageUrl: null,
    referenceUrls: []
  } : e.refImages.length > 0 ? {
    startUrl: null,
    endUrl: null,
    imageUrl: e.refImages[0],
    referenceUrls: e.refImages.slice(1, 1 + pZi)
  } : {
    startUrl: null,
    endUrl: null,
    imageUrl: null,
    referenceUrls: []
  };
}

const fZi = "veo3.1-components",
  gZi = 3;

function yZi(e) {
  return Ex(e) && !Dv(e);
}

function bZi(e) {
  if (!yZi(e.currentModel)) return null;
  const t = _ce(e.currentModel),
    n = kce(e.currentModel),
    r = e.resolution && e.resolution !== "Auto" ? e.resolution : "720P";
  return {
    endpoint: `${e.baseUrl}/v2/videos/generations`,
    aspectRatio: t2e(e.ratio),
    isFastModel: t || n,
    isVeo31FastOnly: t,
    isVeo31LiteOnly: n,
    isProModel: e2e(e.currentModel),
    userSelectedResolution: r,
    enableUpsample: r === "1080P",
    payloadResolution: r === "4K" ? "4K" : void 0
  };
}

function vZi(e) {
  return e.isVeo31FastOnly ? "veo3.1-fast" : e.isVeo31LiteOnly ? "veo3.1-lite" : e.hasFrames ? e.isProModel ? e.is4K ? "veo3.1-pro-4k" : "veo3.1-pro" : e.is4K ? "veo3.1-4k" : "veo3.1" : e.imageCount > 0 ? e.isProModel && e.imageCount === 1 ? e.is4K ? "veo3.1-pro-4k" : "veo3.1-pro" : e.is4K ? "veo3.1-components-4k" : "veo3.1-components" : e.is4K ? e.isProModel ? "veo3.1-pro-4k" : "veo3.1-components-4k" : e.isProModel ? "veo3.1-pro" : fZi;
}

function wZi(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    enhance_prompt: !1
  };
  return e.images && e.images.length > 0 && (t.images = e.images), e.aspectRatio && (t.aspect_ratio = e.aspectRatio), e.enableUpsample && (t.enable_upsample = !0), e.resolution === "4K" && (t.resolution = "4K"), t;
}

function xZi(e) {
  const t = e.framesMode && e.startPort || null,
    n = e.framesMode && e.endPort || null;
  return [t, n].filter(Boolean);
}

function _Zi(e, t) {
  return !!e && t.length >= 1 && t.length <= 2;
}

function kZi(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, gZi);
}

const AZi = "MiniMax-Hailuo-2.3",
  SZi = "https://ai.comfly.chat";

function IZi(e) {
  return e.includes("t8star") ? SZi : e;
}

function CZi(e) {
  let t = e.resolution;
  return e.isHailuoFramesMode && e.hasStartFrame && e.hasEndFrame && t !== "768P" && t !== "1080P" && (t = "768P"), t && t !== "Auto" ? t : "768P";
}

function EZi(e) {
  if (!bx(e.currentModel)) return null;
  const t = !!e.veoFramesMode && J2(e.currentModel);
  return {
    endpoint: `${IZi(e.baseUrl)}/minimax/v1/video_generation`,
    model: e.modelName || AZi,
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : void 0,
    duration: e.durationNum || void 0,
    resolution: CZi({
      resolution: e.resolution,
      isHailuoFramesMode: t,
      hasStartFrame: e.hasStartFrame,
      hasEndFrame: e.hasEndFrame
    }),
    isHailuoFramesMode: t
  };
}

function TZi(e) {
  const t = !!e.veoFramesMode && J2(e.currentModel);
  return {
    startRaw: t && e.startPort || null,
    endRaw: t && e.endPort || null
  };
}

function MZi(e) {
  return e.startResolved && e.endResolved ? {
    mode: "frames",
    first: e.startResolved,
    last: e.endResolved
  } : e.refImages.length > 0 ? {
    mode: "i2v",
    raw: e.refImages[0]
  } : {
    mode: "t2v"
  };
}

function PZi(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    resolution: e.resolution
  };
  return e.aspectRatio && (t.aspect_ratio = e.aspectRatio), e.duration && (t.duration = e.duration), e.firstFrameImage && (t.first_frame_image = e.firstFrameImage), e.lastFrameImage && (t.last_frame_image = e.lastFrameImage), t;
}

const RZi = "生成视频",
  NZi = "wan2.6-i2v-flash",
  jZi = "wan2.6-i2v",
  DZi = "图片处理失败：无法加载或调整图片";

function LZi(e) {
  if (!(!e.hasReferenceImage || e.refImages.length === 0)) return [e.refImages[0]];
}

function OZi(e) {
  if (!Y1(e.currentModel) || yX(e.currentModel)) return null;
  const t = gX(e.currentModel);
  return {
    isOfficial: t,
    enableMultiShot: !!e.wan26MultiShot,
    useNestedFormat: t,
    endpoint: t ? `${e.baseUrl}/api/v1/services/aigc/video-generation/video-synthesis` : `${e.baseUrl}/v2/videos/generations`,
    prompt: e.prompt.trim() || RZi,
    model: t ? e.modelName || NZi : jZi,
    resolution: e.wan26Resolution || "720P",
    duration: e.durationNum,
    audioConfig: e.audioConfig
  };
}

function BZi(e) {
  if (e.useNestedFormat) {
    const n = {
      prompt: e.prompt
    };
    e.images && e.images.length > 0 && (n.img_url = e.images[0]), e.audioUrl && (n.audio_url = e.audioUrl);
    const r = {
      resolution: e.resolution,
      prompt_extend: !0,
      duration: e.duration
    };
    return e.enableMultiShot && (r.shot_type = "multi"), e.audioUrl || (e.audioConfig === "auto" || !e.audioConfig ? e.isOfficial || (r.audio = !0) : e.audioConfig === "none" && (r.audio = !1)), {
      model: e.model,
      input: n,
      parameters: r
    };
  }
  const t = {
    model: e.model,
    prompt: e.prompt,
    resolution: e.resolution,
    prompt_extend: !0,
    duration: e.duration
  };
  return e.enableMultiShot && (t.shot_type = "multi"), e.images && e.images.length > 0 && (t.images = e.images), e.audioUrl ? t.audio_url = e.audioUrl : e.audioConfig === "auto" || !e.audioConfig ? t.audio = !0 : e.audioConfig === "none" && (t.audio = !1), t;
}

const FZi = "viduq2",
  zZi = "生成视频",
  UZi = 7,
  $Zi = ["viduq2", "vidu2.0", "viduq2-pro", "viduq2-turbo", "viduq2-pro-fast", "viduq3-pro", "viduq3-turbo", "viduq3", "viduq3-mix"];

function GZi(e) {
  const t = fX(e.currentModel) || fX(e.modelName),
    n = e.modelName === "vidu2.0" || e.currentModel === "vidu-2.0";
  let r = 1,
    a = 10;
  return e.isViduFramesMode ? t ? (a = 16, r = 1) : n ? (r = 4, a = 8) : (a = 8, r = 1) : t ? (a = 16, (egt(e.currentModel) || egt(e.modelName)) && (r = 3)) : n && (r = 4, a = 8), {
    minDuration: r,
    maxDuration: a
  };
}

function VZi(e) {
  return e.isViduFramesMode && e.frameImageCount === 2 ? "start-end" : e.refImageCount > 0 ? e.refImageCount > 1 || e.viduQ3 ? "reference" : "img2video" : "text2video";
}

function HZi(e) {
  if (!_b(e.currentModel)) return null;
  const t = e.modelName || FZi,
    n = fX(e.currentModel) || fX(t),
    r = !!e.veoFramesMode && J2(e.currentModel),
    {
      minDuration: a,
      maxDuration: i
    } = GZi({
      currentModel: e.currentModel,
      modelName: t,
      isViduFramesMode: r
    }),
    o = Math.min(i, Math.max(a, parseInt(e.durationSetting.replace("s", ""), 10) || 5)),
    s = VZi({
      isViduFramesMode: r,
      frameImageCount: e.frameImageCount,
      refImageCount: e.refImageCount,
      viduQ3: n
    }),
    l = s === "start-end" ? "start-end2video" : s === "reference" ? "reference2video" : s === "img2video" ? "img2video" : "text2video";
  return {
    mode: s,
    endpoint: `${e.baseUrl}/vidu/ent/v2/${l}`,
    modelName: t,
    viduQ3: n,
    isViduFramesMode: r,
    durationSetting: e.durationSetting,
    minDuration: a,
    maxDuration: i,
    durationNum: o,
    resolution: e.resolution || "720p",
    aspectRatio: e.ratio && e.ratio !== "Auto" ? e.ratio : "16:9",
    includeStyle: s === "text2video" && !$Zi.includes(t)
  };
}

function WZi(e) {
  var r;
  const t = {
      model: e.modelName,
      duration: e.durationNum,
      seed: 0,
      resolution: e.resolution,
      off_peak: !1,
      ...(e.viduQ3 ? {
        audio: !0
      } : {
        movement_amplitude: "auto"
      })
    },
    n = ((r = e.prompt) == null ? void 0 : r.trim()) || "";
  return e.mode === "start-end" || e.mode === "img2video" ? (e.images && e.images.length > 0 && (t.images = e.images), n && (t.prompt = n), t) : (t.prompt = n || zZi, t.aspect_ratio = e.aspectRatio, e.mode === "reference" && e.images && e.images.length > 0 && (t.images = e.images), e.includeStyle && (t.style = "general"), t);
}

function qZi(e) {
  const t = !!e.veoFramesMode && J2(e.currentModel),
    n = t && e.startPort || null,
    r = t && e.endPort || null;
  return [n, r].filter(Boolean);
}

function KZi(e) {
  if (e.mode === "start-end") return e.frameImages;
  if (e.mode === "reference" || e.mode === "img2video") return e.refImages.slice(0, UZi);
}

const QZi = "fast",
  YZi = "low";

function XZi(e, t) {
  const n = e.trim();
  return t && t !== "Auto" && !n.includes("--ar ") ? `${n} --ar ${t}`.trim() : n;
}

function JZi(e) {
  if (!U5(e.currentModel)) return null;
  const t = e.mjMode || QZi;
  return {
    endpoint: `${e.baseUrl}/${t}/mj/submit/video`,
    mjMode: t,
    motion: e.mjMotion || YZi,
    prompt: XZi(e.prompt, e.ratio)
  };
}

function ZZi(e) {
  return {
    prompt: e.prompt,
    motion: e.motion,
    image: e.image || ""
  };
}

function eeo(e) {
  return e.length > 0 ? e[0] : null;
}

function teo(e) {
  return Dk(e.currentModel) ? {
    endpoint: `${e.baseUrl}/v1/videos`,
    model: e.modelName || ZMt,
    size: nPt(e.ratio),
    seconds: String(e.durationNum)
  } : null;
}

function neo(e) {
  var i;
  const t = e.videoPortRef || null,
    n = t || e.refImages[0] || "";
  if (!n) return null;
  const r = (i = e.refMetaByRawUrl) == null ? void 0 : i.get(n),
    a = t || (r == null ? void 0 : r.type) === "video" || Ey(n) ? "video" : "image";
  return {
    url: n,
    mediaType: a
  };
}

function reo(e) {
  return {
    model: e.model,
    prompt: e.prompt,
    size: e.size,
    seconds: e.seconds,
    watermark: "false"
  };
}

const aeo = 9,
  ieo = 3,
  oeo = 3;

function seo(e) {
  return Math.min(15, Math.max(5, Number.isFinite(e) ? e : 5));
}

function leo(e) {
  return Fv(e.currentModel) ? {
    endpoint: `${e.baseUrl}/v1/videos`,
    model: e.modelName || tPt,
    seconds: seo(e.durationNum),
    resolution: aPt(e.resolution),
    aspectRatio: rPt(e.ratio, {
      hasImageRefs: e.imageCount > 0,
      hasVideoRefs: e.videoCount > 0,
      hasAudioRefs: e.audioCount > 0
    })
  } : null;
}

function ceo(e) {
  return {
    model: e.model,
    prompt: e.prompt,
    seconds: String(e.seconds),
    resolution: e.resolution,
    aspect_ratio: e.aspectRatio,
    imageUrls: e.imageUrls || [],
    videoUrls: e.videoUrls || [],
    audioUrls: e.audioUrls || []
  };
}

function ggr(e) {
  const t = Number(IMt(e));
  return Number.isFinite(t) ? t : 5;
}

function ygr(e) {
  const t = String(e.prompt || "").trim() || "生成视频",
    n = (e.imageUrls || []).map(d => String(d || "").trim()).filter(Boolean).slice(0, 10),
    r = (e.videoUrls || []).map(d => String(d || "").trim()).filter(Boolean).slice(0, 5),
    a = (e.audioUrls || []).map(d => String(d || "").trim()).filter(Boolean).slice(0, 5),
    i = String(e.startImage || "").trim(),
    o = String(e.endImage || "").trim(),
    s = {
      model: I7n({
        modelId: e.modelId,
        modelName: e.modelName,
        prime: e.prime
      }) || jqe,
      prompt: t,
      resolution: CMt(e.resolutionUi),
      duration: ggr(e.durationUi),
      audio: e.audio !== !1,
      prompt_extend: !!e.promptExtend,
      watermark: !!e.watermark
    };
  if (e.seed != null && Number.isFinite(Number(e.seed)) && (s.seed = Number(e.seed)), e.framesMode) {
    if (!i) throw new Error("Wan 3.0 首尾帧模式需要首帧图片");
    return s.mode = "image-to-video", s.aspect_ratio = "adaptive", s.image_urls = o ? [i, o] : [i], s;
  }
  return (n.length > 0 || r.length > 0 || a.length > 0) && (s.mode = "reference-to-video", n.length && (s.image_urls = n), r.length && (s.video_urls = r), a.length && (s.audio_urls = a)), s.aspect_ratio = EMt(e.ratioUi), s;
}

const deo = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildWan30ApiPayload: ygr,
    mapWan30ApiDuration: ggr
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ueo = 10,
  heo = 5,
  peo = 5,
  meo = "生成视频",
  feo = "请参考输入素材生成视频";

function geo(e, t) {
  return e.trim() || (t ? feo : meo);
}

function yeo(e) {
  if (!X2(e.currentModel)) return null;
  const t = e.settings || {},
    n = t.seed;
  return {
    endpoint: `${e.baseUrl}/v1/videos`,
    framesMode: !!t.veoFramesMode,
    ratioUi: String(t.ratio || e.ratio || "16:9"),
    resolutionUi: String(t.resolution || e.resolution || "1080P"),
    durationUi: String(t.duration || e.duration || "5s"),
    prime: Dqe(e.currentModel, t),
    audio: t.huyaWanAudio !== !1,
    promptExtend: !!(t.promptExtend ?? t.huyaWanPromptExtend),
    watermark: !!t.huyaWanWatermark,
    seed: n != null && Number.isFinite(Number(n)) ? Number(n) : null
  };
}

const beo = "sora-2",
  veo = "sora-2-pro";

function weo(e, t) {
  return e === veo && !!t;
}

function xeo(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, 1);
}

function _eo(e, t) {
  const n = e === "9:16";
  return t ? n ? "1080x1920" : "1920x1080" : n ? "720x1280" : "1280x720";
}

function keo(e) {
  if (wy(e.currentModel)) return null;
  const t = e.baseUrl.includes("api.openai.com"),
    n = t2e(e.ratio) || "16:9",
    r = weo(e.currentModel, e.isHd);
  return {
    isOfficial: t,
    endpoint: t ? `${e.baseUrl}/videos` : `${e.baseUrl}/v2/videos/generations`,
    model: e.modelName || beo,
    aspectRatio: n,
    duration: String(e.durationNum),
    enableHd: r,
    size: _eo(n, r)
  };
}

function Aeo(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    aspect_ratio: e.aspectRatio,
    duration: e.duration
  };
  return e.enableHd && (t.hd = !0), e.characterId && (t.character = e.characterId), e.images && e.images.length > 0 && (t.images = e.images), t;
}

function Seo(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    size: e.size,
    seconds: e.seconds
  };
  return e.enableHd && (t.quality = "hd"), t;
}

const Ieo = 4,
  Ceo = 16,
  Eeo = "无法读取参考图，请检查连线或重新上传图片";

function Teo(e) {
  return vy(e) ? qBr : Ceo;
}

function Meo(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, Teo(e.currentModel));
}

function Peo(e, t) {
  const n = vy(e) ? G6n : Ieo;
  return Math.min(n, Math.max(1, Number((t == null ? void 0 : t.batchSize) ?? (t == null ? void 0 : t.batchCount) ?? 1)));
}

function Reo(e) {
  if (!kh(e.currentModel)) return null;
  const t = e.settings || {},
    n = vy(e.currentModel);
  return {
    endpoint: `${Po(e.baseUrl)}/${KK(e.currentModel, e.isEdit)}`,
    isEdit: e.isEdit,
    quality: V6n(e.currentModel, t.gptImageQuality),
    outputFormat: String(t.gptImageOutputFormat || "png"),
    numImages: Peo(e.currentModel, t),
    syncMode: !!(t.falSyncMode ?? !1),
    background: QBr(e.currentModel, t.gptImageBackground),
    imageSize: JBr(t, {
      isEdit: e.isEdit,
      allowAutoT2i: n
    })
  };
}

function Neo(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0),
    n = {
      prompt: e.prompt.trim(),
      image_size: e.imageSize,
      quality: e.quality,
      num_images: e.numImages,
      output_format: e.outputFormat,
      sync_mode: e.syncMode,
      ...(e.background ? {
        background: e.background
      } : {}),
      ...(t ? {
        image_urls: e.imageUrls
      } : {})
    };
  if (t && e.maskBase64) {
    const r = W6n(e.maskBase64);
    r && (n.mask_url = r);
  }
  return n;
}

const jeo = 4,
  Deo = "无法读取参考图，请检查连线或重新上传图片";

function Leo(e) {
  return Math.min(jeo, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function Oeo(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function Beo(e) {
  if (!IPt(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? oBe : SPt;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: Leo(t),
    syncMode: !!(t.falSyncMode ?? !1),
    enableWebSearch: xhe(t.falEnableWebSearch),
    safetyTolerance: aG(t.falSafetyTolerance),
    resolution: vDn(e.resolution),
    aspectRatio: bDn(e.ratio, e.isEdit)
  };
}

function Feo(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    resolution: e.resolution,
    safety_tolerance: e.safetyTolerance,
    sync_mode: e.syncMode,
    limit_generations: !1,
    enable_web_search: e.enableWebSearch,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const zeo = 4,
  Ueo = "无法读取参考图，请检查连线或重新上传图片";

function $eo(e) {
  return Math.min(zeo, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function Geo(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function Veo(e) {
  if (!GYr(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? sBe : wDn;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: $eo(t),
    syncMode: !!(t.falSyncMode ?? !1),
    enableWebSearch: xhe(t.falEnableWebSearch),
    safetyTolerance: aG(t.falSafetyTolerance),
    resolution: _Dn(e.resolution),
    aspectRatio: xDn(e.ratio)
  };
}

function Heo(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    resolution: e.resolution,
    safety_tolerance: e.safetyTolerance,
    sync_mode: e.syncMode,
    limit_generations: !0,
    enable_web_search: e.enableWebSearch,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Weo = 4,
  qeo = "无法读取参考图，请检查连线或重新上传图片";

function Keo(e) {
  return Math.min(Weo, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function Qeo(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function Yeo(e) {
  if (!PPt(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? lBe : MPt;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: Keo(t),
    syncMode: !!(t.falSyncMode ?? !1),
    enableWebSearch: xhe(t.falEnableWebSearch),
    safetyTolerance: aG(t.falSafetyTolerance),
    resolution: SDn(e.resolution),
    aspectRatio: ADn(e.ratio),
    thinkingLevel: kDn
  };
}

function Xeo(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    resolution: e.resolution,
    safety_tolerance: e.safetyTolerance,
    sync_mode: e.syncMode,
    limit_generations: !0,
    enable_web_search: e.enableWebSearch,
    thinking_level: e.thinkingLevel,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Jeo = 4,
  Zeo = "无法读取参考图，请检查连线或重新上传图片";

function eto(e) {
  return Math.min(Jeo, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function tto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function nto(e) {
  if (!HYr(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? cBe : IDn;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: eto(t),
    syncMode: !!(t.falSyncMode ?? !1),
    safetyTolerance: aG(t.falSafetyTolerance),
    aspectRatio: CDn(e.ratio)
  };
}

function rto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    safety_tolerance: e.safetyTolerance,
    sync_mode: e.syncMode,
    limit_generations: !0,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const ato = 4,
  ito = "无法读取参考图，请检查连线或重新上传图片";

function oto(e) {
  return Math.min(ato, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function sto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function lto(e) {
  if (!LPt(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? dBe : DPt;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: oto(t),
    syncMode: !!(t.falSyncMode ?? !1),
    enableWebSearch: xhe(t.falEnableWebSearch),
    safetyTolerance: aG(t.falSafetyTolerance),
    aspectRatio: EDn(e.ratio, e.isEdit)
  };
}

function cto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    safety_tolerance: e.safetyTolerance,
    sync_mode: e.syncMode,
    limit_generations: !1,
    enable_web_search: e.enableWebSearch,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const dto = "无法读取参考图，请检查连线或重新上传图片";

function uto(e) {
  return Math.min(pNn, Math.max(1, Number((e == null ? void 0 : e.batchSize) ?? (e == null ? void 0 : e.batchCount) ?? 1)));
}

function hto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, wqr);
}

function pto(e) {
  if (!Hh(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? $Oe : UOe;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: uto(t),
    syncMode: !!(t.falSyncMode ?? !1),
    aspectRatio: mNn(e.ratio)
  };
}

function mto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    output_format: e.outputFormat,
    sync_mode: e.syncMode,
    ...(e.aspectRatio ? {
      aspect_ratio: e.aspectRatio
    } : {}),
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const fto = "无法读取参考图，请检查连线或重新上传图片";

function gto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, _qr);
}

function yto(e) {
  if (!Uu(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? VOe : GOe,
    r = kqr(e.ratio, t.ratio, t.aspectRatio);
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: String(t.gptImageOutputFormat || "png").toLowerCase(),
    numImages: fNn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    aspectRatio: wqe(r)
  };
}

function bto(e) {
  var r;
  const t = String(((r = e.imageUrls) == null ? void 0 : r[0]) || "").trim(),
    n = !!t;
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    output_format: e.outputFormat,
    sync_mode: e.syncMode,
    ...(n ? {
      image_url: t
    } : {})
  };
}

const vto = "无法读取参考图，请检查连线或重新上传图片";

function wto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, N6t);
}

function xto(e) {
  if (!nh(e.currentModel)) return null;
  const t = e.settings || {};
  return {
    endpoint: `${Po(e.baseUrl)}/${Eqr(e.isEdit)}`,
    isEdit: e.isEdit,
    quality: j6t(t.grokImageQuality),
    resolution: yNn(t.resolution ?? e.resolution),
    numImages: bNn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    aspectRatio: gNn(e.ratio, e.isEdit)
  };
}

function _to(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    resolution: e.resolution,
    quality: e.quality,
    sync_mode: e.syncMode,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const kto = "无法读取参考图，请检查连线或重新上传图片";

function Ato(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, L6t);
}

function Sto(e) {
  if (!mp(e.currentModel)) return null;
  const t = e.settings || {};
  return {
    endpoint: `${Po(e.baseUrl)}/${rie(e.currentModel, e.isEdit)}`,
    isEdit: e.isEdit,
    resolution: wNn(t.resolution ?? e.resolution),
    numImages: xNn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    aspectRatio: vNn(e.ratio, e.isEdit)
  };
}

function Ito(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    aspect_ratio: e.aspectRatio,
    resolution: e.resolution,
    sync_mode: e.syncMode,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Cto = "无法读取参考图，请检查连线或重新上传图片";

function Eto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, Bqr);
}

function Tto(e) {
  if (!su(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? WOe : O6t;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    outputFormat: kNn(t.gptImageOutputFormat),
    numImages: _Nn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    promptExtend: t.promptExtend !== !1,
    imageSize: ANn(e.ratio, t.resolution ?? e.resolution, e.isEdit),
    seed: Fqr(t.seed)
  };
}

function Mto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    num_images: e.numImages,
    output_format: e.outputFormat,
    sync_mode: e.syncMode,
    enable_prompt_expansion: e.promptExtend,
    ...(e.imageSize != null ? {
      image_size: e.imageSize
    } : {}),
    ...(e.seed != null ? {
      seed: e.seed
    } : {}),
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Pto = "无法读取参考图，请检查连线或重新上传图片";

function Rto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, Hqr);
}

function Nto(e) {
  if (!Nm(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? qOe : $6t;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    numImages: SNn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    imageSize: INn(e.ratio, t.resolution ?? e.resolution, e.isEdit)
  };
}

function jto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    image_size: e.imageSize,
    num_images: e.numImages,
    max_images: 1,
    sync_mode: e.syncMode,
    enable_safety_checker: !0,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Dto = "无法读取参考图，请检查连线或重新上传图片";

function Lto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, Jqr);
}

function Oto(e) {
  if (!jm(e.currentModel)) return null;
  const t = e.settings || {},
    n = e.isEdit ? KOe : H6t;
  return {
    endpoint: `${Po(e.baseUrl)}/${n}`,
    isEdit: e.isEdit,
    numImages: CNn(t.batchSize, t.batchCount),
    syncMode: !!(t.falSyncMode ?? !1),
    imageSize: ENn(e.ratio, t.resolution ?? e.resolution)
  };
}

function Bto(e) {
  const t = !!(e.imageUrls && e.imageUrls.length > 0);
  return {
    prompt: e.prompt.trim(),
    image_size: e.imageSize,
    num_images: e.numImages,
    max_images: 1,
    sync_mode: e.syncMode,
    enable_safety_checker: !0,
    ...(t ? {
      image_urls: e.imageUrls
    } : {})
  };
}

const Fto = "flux-kontext-pro";

function zto(e) {
  return String(e || "").includes("flux-kontext");
}

function Uto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function $to(e) {
  if (!zto(e.currentModel)) return null;
  const t = e.useAsyncMode ? "?async=true" : "";
  return {
    endpoint: `${e.baseUrl}/v1/images/${e.useOssJson ? "generations" : "edits"}${t}`,
    useMultipart: !e.useOssJson,
    useAsyncMode: e.useAsyncMode,
    model: e.modelName || Fto,
    aspectRatio: e.ratio !== "Auto" ? e.ratio : void 0
  };
}

function Gto(e) {
  return {
    model: e.model,
    prompt: e.prompt,
    response_format: "url",
    ...(e.aspectRatio ? {
      aspect_ratio: e.aspectRatio
    } : {}),
    image: e.image
  };
}

function Vto(e) {
  const t = {
    model: e.model,
    prompt: e.prompt
  };
  return e.aspectRatio && (t.aspect_ratio = e.aspectRatio), t;
}

const Hto = "qwen-image-edit",
  Wto = "请根据参考图编辑",
  vmn = "需要参考图片",
  qto = {
    "1:1": "1024x1024",
    "16:9": "1792x1024",
    "9:16": "1024x1792",
    "4:3": "1536x1024",
    "3:4": "1024x1536",
    "3:2": "1536x1024",
    "2:3": "1024x1536",
    "21:9": "1792x1024",
    Auto: "1024x1024"
  };

function Kto(e) {
  return String(e || "").includes("qwen-image-edit");
}

function Qto(e) {
  return qto[e] || "1024x1024";
}

function bgr(e) {
  return e.trim() || Wto;
}

function Yto(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice();
}

function Xto(e) {
  if (!Kto(e.currentModel)) return null;
  const t = e.useAsyncMode ? "?async=true" : "";
  return {
    endpoint: `${e.baseUrl}/v1/images/${e.useOssJson ? "generations" : "edits"}${t}`,
    useMultipart: !e.useOssJson,
    useAsyncMode: e.useAsyncMode,
    model: e.modelName || Hto,
    size: Qto(e.ratio)
  };
}

function Jto(e) {
  return {
    model: e.model,
    prompt: bgr(e.prompt),
    response_format: "url",
    size: e.size,
    n: 1,
    image: e.image
  };
}

function Zto(e) {
  return {
    model: e.model,
    prompt: bgr(e.prompt),
    size: e.size,
    n: "1"
  };
}

function eno(e) {
  return e && e !== "Auto" ? e.toLowerCase() : void 0;
}

function tno(e) {
  const t = e.prompt.trim() || (e.hasReferenceImage ? "参考上图修改" : ""),
    n = e.ratio && e.ratio !== "Auto" ? e.hasReferenceImage ? `

请忽略参考图原始比例，按 ${e.ratio} 比例输出图片。` : `

请生成比例为 ${e.ratio} 的图片。` : "",
    r = e.resolution && e.resolution !== "Auto" ? `

请生成 ${e.resolution} 分辨率的图片。` : "";
  return t.concat(n).concat(r);
}

function wmn(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function nno(e) {
  if (!qM(e.currentModel)) return null;
  const t = e.hasReferenceImage && e.hasRefImages,
    n = MU(e.currentModel),
    r = e.useAsyncMode ? "?async=true" : "",
    a = t && (n || e.canComflyOssUrlJsonGenerations);
  let i,
    o,
    s = !1;
  return e.useAsyncMode ? t && !a ? (i = "async-edits", o = `${e.baseUrl}/v1/images/edits${r}`, s = !0) : (i = "async-generations", o = `${e.baseUrl}/v1/images/generations${r}`) : (i = "sync-chat", o = `${e.baseUrl}/v1/chat/completions`), {
    endpoint: o,
    useMultipart: s,
    useAsyncMode: e.useAsyncMode,
    mode: i,
    model: e.modelName || e.currentModel,
    prompt: tno({
      prompt: e.prompt,
      ratio: e.ratio,
      resolution: e.resolution,
      hasReferenceImage: e.hasReferenceImage
    }),
    maxRefs: cPt(e.currentModel),
    aspectRatio: e.ratio !== "Auto" ? e.ratio : void 0,
    resolution: eno(e.resolution),
    quality: e.quality,
    outputN: e.outputN,
    useGrok20ImagesField: !!(t && n)
  };
}

function vgr(e, t) {
  return {
    ...e,
    ...(t.aspectRatio ? {
      aspect_ratio: t.aspectRatio
    } : {}),
    ...(t.resolution ? {
      resolution: t.resolution
    } : {}),
    ...(t.quality ? {
      quality: t.quality
    } : {})
  };
}

function xmn(e) {
  return vgr({
    model: e.model,
    prompt: e.prompt,
    response_format: "url",
    ...(e.n && e.n > 1 ? {
      n: e.n
    } : {}),
    ...(e.images ? {
      images: e.images
    } : {}),
    ...(e.image !== void 0 ? {
      image: e.image
    } : {})
  }, e);
}

function rno(e) {
  const t = {
    model: e.model,
    prompt: e.prompt,
    response_format: "url"
  };
  return e.aspectRatio && (t.aspect_ratio = e.aspectRatio), e.resolution && (t.resolution = e.resolution), e.quality && (t.quality = e.quality), t;
}

function ano(e) {
  const t = e.imageUrls && e.imageUrls.length > 0 ? [{
    type: "text",
    text: e.prompt
  }, ...e.imageUrls.map(n => ({
    type: "image_url",
    image_url: {
      url: n
    }
  }))] : e.prompt;
  return vgr({
    model: e.model,
    messages: [{
      role: "user",
      content: t
    }],
    stream: !1
  }, e);
}

const ino = "z-image-turbo",
  ono = "/api/v1/services/aigc/multimodal-generation/generation",
  sno = "1024*1024",
  lno = {
    "1:1": "1024*1024",
    "16:9": "1280*720",
    "9:16": "720*1280",
    "4:3": "1152*864",
    "3:4": "864*1152",
    "3:2": "1248*832",
    "2:3": "832*1248",
    "21:9": "1344*576",
    "9:21": "576*1344",
    "7:9": "896*1152",
    "9:7": "1152*896"
  },
  cno = {
    "1:1": "1280*1280",
    "16:9": "1536*864",
    "9:16": "864*1536",
    "4:3": "1472*1104",
    "3:4": "1104*1472",
    "3:2": "1536*1024",
    "2:3": "1024*1536",
    "21:9": "1680*720",
    "9:21": "720*1680",
    "7:9": "1120*1440",
    "9:7": "1440*1120"
  };

function dno(e, t) {
  const n = lno[e] || sno;
  return t !== "2K" && t !== "4K" ? n : cno[e] || n;
}

function uno(e) {
  return Zqe(e.currentModel) ? {
    endpoint: `${e.baseUrl}${ono}`,
    model: ino,
    size: dno(e.ratio, e.resolution)
  } : null;
}

function hno(e) {
  return {
    model: e.model,
    input: {
      messages: [{
        role: "user",
        content: [{
          text: e.prompt
        }]
      }]
    },
    parameters: {
      prompt_extend: !1,
      size: e.size
    }
  };
}

function pno(e) {
  if (!jk(e.currentModel)) return null;
  const t = e.settings || {};
  return {
    endpoint: `${Po(e.baseUrl)}/${F6t}`,
    imageSize: Gqr(e.ratio),
    numInferenceSteps: zqr,
    syncMode: !!(t.falSyncMode ?? !1),
    seed: $qr(t.seed)
  };
}

function mno(e) {
  return {
    prompt: e.prompt.trim(),
    image_size: e.imageSize,
    num_inference_steps: e.numInferenceSteps,
    num_images: 1,
    enable_safety_checker: !0,
    output_format: "png",
    acceleration: "regular",
    enable_prompt_expansion: !1,
    sync_mode: e.syncMode,
    ...(e.seed != null ? {
      seed: e.seed
    } : {})
  };
}

const fno = "wan2.6-image",
  gno = "1280*1280",
  yno = "根据上传的音频风格生成",
  bno = 4,
  vno = 1,
  wno = {
    "1:1": "1280*1280",
    "16:9": "1280*720",
    "9:16": "720*1280",
    "4:3": "1280*960",
    "3:4": "960*1280",
    "3:2": "1200*800",
    "2:3": "800*1200",
    "21:9": "1344*576"
  };

function xno(e) {
  return wno[e] || gno;
}

function _no(e) {
  return !e.hasReferenceImage || e.refImages.length === 0 ? [] : e.refImages.slice(0, e.maxRefs);
}

function kno(e, t) {
  return !e && !t ? {
    enableInterleave: !0,
    forcedInterleave: !0
  } : {
    enableInterleave: e,
    forcedInterleave: !1
  };
}

function Ano(e, t, n) {
  return !t && !n ? e : `${e}

【音频参考】${n || yno}`;
}

function Sno(e, t, n, r) {
  return `${e}/api/v1/services/aigc/${(t ? n : !r) ? "multimodal-generation" : "image-generation"}/generation`;
}

function Ino(e) {
  if (!yX(e.currentModel)) return null;
  const t = kno(e.enableInterleave, e.hasReferenceImage),
    n = t.enableInterleave && e.useStream;
  return {
    endpoint: Sno(e.baseUrl, t.enableInterleave, n, e.useAsyncMode),
    model: fno,
    size: xno(e.ratio),
    enableInterleave: t.enableInterleave,
    forcedInterleave: t.forcedInterleave,
    useStream: n,
    useAsyncMode: e.useAsyncMode,
    maxRefs: t.enableInterleave ? vno : bno
  };
}

