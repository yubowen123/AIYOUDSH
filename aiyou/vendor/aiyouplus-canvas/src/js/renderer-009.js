class aen {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(t, n = 0, r = .1, a = 100, i = {}) {
    const {
      size: o = 256,
      position: s = cAa
    } = i;
    Trt = this._renderer.getRenderTarget(), Mrt = this._renderer.getActiveCubeFace(), Prt = this._renderer.getActiveMipmapLevel(), Rrt = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(o);
    const l = this._allocateTargets();
    return l.depthBuffer = !0, this._sceneToCubeUV(t, r, a, l, s), n > 0 && this._blur(l, 0, 0, n), this._applyPMREM(l), this._cleanup(l), l;
  }
  fromEquirectangular(t, n = null) {
    return this._fromTexture(t, n);
  }
  fromCubemap(t, n = null) {
    return this._fromTexture(t, n);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = sen(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = oen(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodMeshes.length; t++) this._lodMeshes[t].geometry.dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(Trt, Mrt, Prt), this._renderer.xr.enabled = Rrt, t.scissorTest = !1, Yee(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, n) {
    t.mapping === XX || t.mapping === nde ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Trt = this._renderer.getRenderTarget(), Mrt = this._renderer.getActiveCubeFace(), Prt = this._renderer.getActiveMipmapLevel(), Rrt = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const r = n || this._allocateTargets();
    return this._textureToCubeUV(t, r), this._applyPMREM(r), this._cleanup(r), r;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112),
      n = 4 * this._cubeSize,
      r = {
        magFilter: $m,
        minFilter: $m,
        generateMipmaps: !1,
        type: hT,
        format: W1,
        colorSpace: l_,
        depthBuffer: !1
      },
      a = ien(t, n, r);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== n) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ien(t, n, r);
      const {
        _lodMax: i
      } = this;
      ({
        lodMeshes: this._lodMeshes,
        sizeLods: this._sizeLods,
        sigmas: this._sigmas
      } = dAa(i)), this._blurMaterial = hAa(i, t, n), this._ggxMaterial = uAa(i, t, n);
    }
    return a;
  }
  _compileMaterial(t) {
    const n = new di(new Fd(), t);
    this._renderer.compile(n, Lme);
  }
  _sceneToCubeUV(t, n, r, a, i) {
    const l = new lu(90, 1, n, r),
      d = [1, -1, 1, 1, 1, 1],
      u = [1, 1, 1, -1, -1, -1],
      h = this._renderer,
      p = h.autoClear,
      m = h.toneMapping;
    h.getClearColor(ren), h.toneMapping = sP, h.autoClear = !1, h.state.buffers.depth.getReversed() && (h.setRenderTarget(a), h.clearDepth(), h.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new di(new dl(), new uu({
      name: "PMREM.Background",
      side: xx,
      depthWrite: !1,
      depthTest: !1
    })));
    const y = this._backgroundBox,
      b = y.material;
    let v = !1;
    const _ = t.background;
    _ ? _.isColor && (b.color.copy(_), t.background = null, v = !0) : (b.color.copy(ren), v = !0);
    for (let w = 0; w < 6; w++) {
      const k = w % 3;
      k === 0 ? (l.up.set(0, d[w], 0), l.position.set(i.x, i.y, i.z), l.lookAt(i.x + u[w], i.y, i.z)) : k === 1 ? (l.up.set(0, 0, d[w]), l.position.set(i.x, i.y, i.z), l.lookAt(i.x, i.y + u[w], i.z)) : (l.up.set(0, d[w], 0), l.position.set(i.x, i.y, i.z), l.lookAt(i.x, i.y, i.z + u[w]));
      const A = this._cubeSize;
      Yee(a, k * A, w > 2 ? A : 0, A, A), h.setRenderTarget(a), v && h.render(y, l), h.render(t, l);
    }
    h.toneMapping = m, h.autoClear = p, t.background = _;
  }
  _textureToCubeUV(t, n) {
    const r = this._renderer,
      a = t.mapping === XX || t.mapping === nde;
    a ? (this._cubemapMaterial === null && (this._cubemapMaterial = sen()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = oen());
    const i = a ? this._cubemapMaterial : this._equirectMaterial,
      o = this._lodMeshes[0];
    o.material = i;
    const s = i.uniforms;
    s.envMap.value = t;
    const l = this._cubeSize;
    Yee(n, 0, 0, 3 * l, 2 * l), r.setRenderTarget(n), r.render(o, Lme);
  }
  _applyPMREM(t) {
    const n = this._renderer,
      r = n.autoClear;
    n.autoClear = !1;
    const a = this._lodMeshes.length;
    for (let i = 1; i < a; i++) this._applyGGXFilter(t, i - 1, i);
    n.autoClear = r;
  }
  _applyGGXFilter(t, n, r) {
    const a = this._renderer,
      i = this._pingPongRenderTarget,
      o = this._ggxMaterial,
      s = this._lodMeshes[r];
    s.material = o;
    const l = o.uniforms,
      d = r / (this._lodMeshes.length - 1),
      u = n / (this._lodMeshes.length - 1),
      h = Math.sqrt(d * d - u * u),
      p = 0 + d * 1.25,
      m = h * p,
      {
        _lodMax: f
      } = this,
      y = this._sizeLods[r],
      b = 3 * y * (r > f - HF ? r - f + HF : 0),
      v = 4 * (this._cubeSize - y);
    l.envMap.value = t.texture, l.roughness.value = m, l.mipInt.value = f - n, Yee(i, b, v, 3 * y, 2 * y), a.setRenderTarget(i), a.render(s, Lme), l.envMap.value = i.texture, l.roughness.value = 0, l.mipInt.value = f - r, Yee(t, b, v, 3 * y, 2 * y), a.setRenderTarget(t), a.render(s, Lme);
  }
  _blur(t, n, r, a, i) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(t, o, n, r, a, "latitudinal", i), this._halfBlur(o, t, r, r, a, "longitudinal", i);
  }
  _halfBlur(t, n, r, a, i, o, s) {
    const l = this._renderer,
      d = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && vl("blur direction must be either latitudinal or longitudinal!");
    const u = 3,
      h = this._lodMeshes[a];
    h.material = d;
    const p = d.uniforms,
      m = this._sizeLods[r] - 1,
      f = isFinite(i) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * fH - 1),
      y = i / f,
      b = isFinite(i) ? 1 + Math.floor(u * y) : fH;
    b > fH && Es(`sigmaRadians, ${i}, is too large and will clip, as it requested ${b} samples when the maximum is set to ${fH}`);
    const v = [];
    let _ = 0;
    for (let C = 0; C < fH; ++C) {
      const I = C / y,
        E = Math.exp(-I * I / 2);
      v.push(E), C === 0 ? _ += E : C < b && (_ += 2 * E);
    }
    for (let C = 0; C < v.length; C++) v[C] = v[C] / _;
    p.envMap.value = t.texture, p.samples.value = b, p.weights.value = v, p.latitudinal.value = o === "latitudinal", s && (p.poleAxis.value = s);
    const {
      _lodMax: w
    } = this;
    p.dTheta.value = f, p.mipInt.value = w - r;
    const k = this._sizeLods[a],
      A = 3 * k * (a > w - HF ? a - w + HF : 0),
      S = 4 * (this._cubeSize - k);
    Yee(n, A, S, 3 * k, 2 * k), l.setRenderTarget(n), l.render(h, Lme);
  }
}

function dAa(e) {
  const t = [],
    n = [],
    r = [];
  let a = e;
  const i = e - HF + 1 + nen.length;
  for (let o = 0; o < i; o++) {
    const s = Math.pow(2, a);
    t.push(s);
    let l = 1 / s;
    o > e - HF ? l = nen[o - e + HF - 1] : o === 0 && (l = 0), n.push(l);
    const d = 1 / (s - 2),
      u = -d,
      h = 1 + d,
      p = [u, u, h, u, h, h, u, u, h, h, u, h],
      m = 6,
      f = 6,
      y = 3,
      b = 2,
      v = 1,
      _ = new Float32Array(y * f * m),
      w = new Float32Array(b * f * m),
      k = new Float32Array(v * f * m);
    for (let S = 0; S < m; S++) {
      const C = S % 3 * 2 / 3 - 1,
        I = S > 2 ? 0 : -1,
        E = [C, I, 0, C + 2 / 3, I, 0, C + 2 / 3, I + 1, 0, C, I, 0, C + 2 / 3, I + 1, 0, C, I + 1, 0];
      _.set(E, y * f * S), w.set(p, b * f * S);
      const M = [S, S, S, S, S, S];
      k.set(M, v * f * S);
    }
    const A = new Fd();
    A.setAttribute("position", new Z1(_, y)), A.setAttribute("uv", new Z1(w, b)), A.setAttribute("faceIndex", new Z1(k, v)), r.push(new di(A, null)), a > HF && a--;
  }
  return {
    lodMeshes: r,
    sizeLods: t,
    sigmas: n
  };
}

function ien(e, t, n) {
  const r = new FE(e, t, n);
  return r.texture.mapping = GYe, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r;
}

function Yee(e, t, n, r, a) {
  e.viewport.set(t, n, r, a), e.scissor.set(t, n, r, a);
}

function uAa(e, t, n) {
  return new Mx({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: lAa,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: {
        value: null
      },
      roughness: {
        value: 0
      },
      mipInt: {
        value: 0
      }
    },
    vertexShader: KYe(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: nj,
    depthTest: !1,
    depthWrite: !1
  });
}

function hAa(e, t, n) {
  const r = new Float32Array(fH),
    a = new dr(0, 1, 0);
  return new Mx({
    name: "SphericalGaussianBlur",
    defines: {
      n: fH,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: {
        value: null
      },
      samples: {
        value: 1
      },
      weights: {
        value: r
      },
      latitudinal: {
        value: !1
      },
      dTheta: {
        value: 0
      },
      mipInt: {
        value: 0
      },
      poleAxis: {
        value: a
      }
    },
    vertexShader: KYe(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: nj,
    depthTest: !1,
    depthWrite: !1
  });
}

function oen() {
  return new Mx({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null
      }
    },
    vertexShader: KYe(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: nj,
    depthTest: !1,
    depthWrite: !1
  });
}

function sen() {
  return new Mx({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      }
    },
    vertexShader: KYe(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: nj,
    depthTest: !1,
    depthWrite: !1
  });
}

function KYe() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}

class dKn extends FE {
  constructor(t = 1, n = {}) {
    super(t, t, n), this.isWebGLCubeRenderTarget = !0;
    const r = {
        width: t,
        height: t,
        depth: 1
      },
      a = [r, r, r, r, r, r];
    this.texture = new $qn(a), this._setTextureOptions(n), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(t, n) {
    this.texture.type = n.type, this.texture.colorSpace = n.colorSpace, this.texture.generateMipmaps = n.generateMipmaps, this.texture.minFilter = n.minFilter, this.texture.magFilter = n.magFilter;
    const r = {
        uniforms: {
          tEquirect: {
            value: null
          }
        },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      },
      a = new dl(5, 5, 5),
      i = new Mx({
        name: "CubemapFromEquirect",
        uniforms: ode(r.uniforms),
        vertexShader: r.vertexShader,
        fragmentShader: r.fragmentShader,
        side: xx,
        blending: nj
      });
    i.uniforms.tEquirect.value = n;
    const o = new di(a, i),
      s = n.minFilter;
    return n.minFilter === A7 && (n.minFilter = $m), new a2a(1, 10, this).update(t, o), n.minFilter = s, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(t, n = !0, r = !0, a = !0) {
    const i = t.getRenderTarget();
    for (let o = 0; o < 6; o++) t.setRenderTarget(this, o), t.clear(n, r, a);
    t.setRenderTarget(i);
  }
}

function pAa(e) {
  let t = new WeakMap(),
    n = new WeakMap(),
    r = null;
  function a(p, m = !1) {
    return p == null ? null : m ? o(p) : i(p);
  }
  function i(p) {
    if (p && p.isTexture) {
      const m = p.mapping;
      if (m === Dve || m === Qnt) if (t.has(p)) {
        const f = t.get(p).texture;
        return s(f, p.mapping);
      } else {
        const f = p.image;
        if (f && f.height > 0) {
          const y = new dKn(f.height);
          return y.fromEquirectangularTexture(e, p), t.set(p, y), p.addEventListener("dispose", d), s(y.texture, p.mapping);
        } else return null;
      }
    }
    return p;
  }
  function o(p) {
    if (p && p.isTexture) {
      const m = p.mapping,
        f = m === Dve || m === Qnt,
        y = m === XX || m === nde;
      if (f || y) {
        let b = n.get(p);
        const v = b !== void 0 ? b.texture.pmremVersion : 0;
        if (p.isRenderTargetTexture && p.pmremVersion !== v) return r === null && (r = new aen(e)), b = f ? r.fromEquirectangular(p, b) : r.fromCubemap(p, b), b.texture.pmremVersion = p.pmremVersion, n.set(p, b), b.texture;
        if (b !== void 0) return b.texture;
        {
          const _ = p.image;
          return f && _ && _.height > 0 || y && _ && l(_) ? (r === null && (r = new aen(e)), b = f ? r.fromEquirectangular(p) : r.fromCubemap(p), b.texture.pmremVersion = p.pmremVersion, n.set(p, b), p.addEventListener("dispose", u), b.texture) : null;
        }
      }
    }
    return p;
  }
  function s(p, m) {
    return m === Dve ? p.mapping = XX : m === Qnt && (p.mapping = nde), p;
  }
  function l(p) {
    let m = 0;
    const f = 6;
    for (let y = 0; y < f; y++) p[y] !== void 0 && m++;
    return m === f;
  }
  function d(p) {
    const m = p.target;
    m.removeEventListener("dispose", d);
    const f = t.get(m);
    f !== void 0 && (t.delete(m), f.dispose());
  }
  function u(p) {
    const m = p.target;
    m.removeEventListener("dispose", u);
    const f = n.get(m);
    f !== void 0 && (n.delete(m), f.dispose());
  }
  function h() {
    t = new WeakMap(), n = new WeakMap(), r !== null && (r.dispose(), r = null);
  }
  return {
    get: a,
    dispose: h
  };
}

function mAa(e) {
  const t = {};
  function n(r) {
    if (t[r] !== void 0) return t[r];
    const a = e.getExtension(r);
    return t[r] = a, a;
  }
  return {
    has: function (r) {
      return n(r) !== null;
    },
    init: function () {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function (r) {
      const a = n(r);
      return a === null && ZFe("WebGLRenderer: " + r + " extension not supported."), a;
    }
  };
}

function fAa(e, t, n, r) {
  const a = {},
    i = new WeakMap();
  function o(h) {
    const p = h.target;
    p.index !== null && t.remove(p.index);
    for (const f in p.attributes) t.remove(p.attributes[f]);
    p.removeEventListener("dispose", o), delete a[p.id];
    const m = i.get(p);
    m && (t.remove(m), i.delete(p)), r.releaseStatesOfGeometry(p), p.isInstancedBufferGeometry === !0 && delete p._maxInstanceCount, n.memory.geometries--;
  }
  function s(h, p) {
    return a[p.id] === !0 || (p.addEventListener("dispose", o), a[p.id] = !0, n.memory.geometries++), p;
  }
  function l(h) {
    const p = h.attributes;
    for (const m in p) t.update(p[m], e.ARRAY_BUFFER);
  }
  function d(h) {
    const p = [],
      m = h.index,
      f = h.attributes.position;
    let y = 0;
    if (f === void 0) return;
    if (m !== null) {
      const _ = m.array;
      y = m.version;
      for (let w = 0, k = _.length; w < k; w += 3) {
        const A = _[w + 0],
          S = _[w + 1],
          C = _[w + 2];
        p.push(A, S, S, C, C, A);
      }
    } else {
      const _ = f.array;
      y = f.version;
      for (let w = 0, k = _.length / 3 - 1; w < k; w += 3) {
        const A = w + 0,
          S = w + 1,
          C = w + 2;
        p.push(A, S, S, C, C, A);
      }
    }
    const b = new (f.count >= 65535 ? Oqn : Qjt)(p, 1);
    b.version = y;
    const v = i.get(h);
    v && t.remove(v), i.set(h, b);
  }
  function u(h) {
    const p = i.get(h);
    if (p) {
      const m = h.index;
      m !== null && p.version < m.version && d(h);
    } else d(h);
    return i.get(h);
  }
  return {
    get: s,
    update: l,
    getWireframeAttribute: u
  };
}

function gAa(e, t, n) {
  let r;
  function a(p) {
    r = p;
  }
  let i, o;
  function s(p) {
    i = p.type, o = p.bytesPerElement;
  }
  function l(p, m) {
    e.drawElements(r, m, i, p * o), n.update(m, r, 1);
  }
  function d(p, m, f) {
    f !== 0 && (e.drawElementsInstanced(r, m, i, p * o, f), n.update(m, r, f));
  }
  function u(p, m, f) {
    if (f === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, m, 0, i, p, 0, f);
    let b = 0;
    for (let v = 0; v < f; v++) b += m[v];
    n.update(b, r, 1);
  }
  function h(p, m, f, y) {
    if (f === 0) return;
    const b = t.get("WEBGL_multi_draw");
    if (b === null) for (let v = 0; v < p.length; v++) d(p[v] / o, m[v], y[v]);else {
      b.multiDrawElementsInstancedWEBGL(r, m, 0, i, p, 0, y, 0, f);
      let v = 0;
      for (let _ = 0; _ < f; _++) v += m[_] * y[_];
      n.update(v, r, 1);
    }
  }
  this.setMode = a, this.setIndex = s, this.render = l, this.renderInstances = d, this.renderMultiDraw = u, this.renderMultiDrawInstances = h;
}

function yAa(e) {
  const t = {
      geometries: 0,
      textures: 0
    },
    n = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };
  function r(i, o, s) {
    switch (n.calls++, o) {
      case e.TRIANGLES:
        n.triangles += s * (i / 3);
        break;
      case e.LINES:
        n.lines += s * (i / 2);
        break;
      case e.LINE_STRIP:
        n.lines += s * (i - 1);
        break;
      case e.LINE_LOOP:
        n.lines += s * i;
        break;
      case e.POINTS:
        n.points += s * i;
        break;
      default:
        vl("WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function a() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: t,
    render: n,
    programs: null,
    autoReset: !0,
    reset: a,
    update: r
  };
}

function bAa(e, t, n) {
  const r = new WeakMap(),
    a = new Vd();
  function i(o, s, l) {
    const d = o.morphTargetInfluences,
      u = s.morphAttributes.position || s.morphAttributes.normal || s.morphAttributes.color,
      h = u !== void 0 ? u.length : 0;
    let p = r.get(s);
    if (p === void 0 || p.count !== h) {
      let E = function () {
        C.dispose(), r.delete(s), s.removeEventListener("dispose", E);
      };
      p !== void 0 && p.texture.dispose();
      const m = s.morphAttributes.position !== void 0,
        f = s.morphAttributes.normal !== void 0,
        y = s.morphAttributes.color !== void 0,
        b = s.morphAttributes.position || [],
        v = s.morphAttributes.normal || [],
        _ = s.morphAttributes.color || [];
      let w = 0;
      m === !0 && (w = 1), f === !0 && (w = 2), y === !0 && (w = 3);
      let k = s.attributes.position.count * w,
        A = 1;
      k > t.maxTextureSize && (A = Math.ceil(k / t.maxTextureSize), k = t.maxTextureSize);
      const S = new Float32Array(k * A * 4 * h),
        C = new Dqn(S, k, A, h);
      C.type = Ck, C.needsUpdate = !0;
      const I = w * 4;
      for (let M = 0; M < h; M++) {
        const T = b[M],
          P = v[M],
          R = _[M],
          j = k * A * 4 * M;
        for (let B = 0; B < T.count; B++) {
          const F = B * I;
          m === !0 && (a.fromBufferAttribute(T, B), S[j + F + 0] = a.x, S[j + F + 1] = a.y, S[j + F + 2] = a.z, S[j + F + 3] = 0), f === !0 && (a.fromBufferAttribute(P, B), S[j + F + 4] = a.x, S[j + F + 5] = a.y, S[j + F + 6] = a.z, S[j + F + 7] = 0), y === !0 && (a.fromBufferAttribute(R, B), S[j + F + 8] = a.x, S[j + F + 9] = a.y, S[j + F + 10] = a.z, S[j + F + 11] = R.itemSize === 4 ? a.w : 1);
        }
      }
      p = {
        count: h,
        texture: C,
        size: new Qi(k, A)
      }, r.set(s, p), s.addEventListener("dispose", E);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null) l.getUniforms().setValue(e, "morphTexture", o.morphTexture, n);else {
      let m = 0;
      for (let y = 0; y < d.length; y++) m += d[y];
      const f = s.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(e, "morphTargetBaseInfluence", f), l.getUniforms().setValue(e, "morphTargetInfluences", d);
    }
    l.getUniforms().setValue(e, "morphTargetsTexture", p.texture, n), l.getUniforms().setValue(e, "morphTargetsTextureSize", p.size);
  }
  return {
    update: i
  };
}

function vAa(e, t, n, r, a) {
  let i = new WeakMap();
  function o(d) {
    const u = a.render.frame,
      h = d.geometry,
      p = t.get(d, h);
    if (i.get(p) !== u && (t.update(p), i.set(p, u)), d.isInstancedMesh && (d.hasEventListener("dispose", l) === !1 && d.addEventListener("dispose", l), i.get(d) !== u && (n.update(d.instanceMatrix, e.ARRAY_BUFFER), d.instanceColor !== null && n.update(d.instanceColor, e.ARRAY_BUFFER), i.set(d, u))), d.isSkinnedMesh) {
      const m = d.skeleton;
      i.get(m) !== u && (m.update(), i.set(m, u));
    }
    return p;
  }
  function s() {
    i = new WeakMap();
  }
  function l(d) {
    const u = d.target;
    u.removeEventListener("dispose", l), r.releaseStatesOfObject(u), n.remove(u.instanceMatrix), u.instanceColor !== null && n.remove(u.instanceColor);
  }
  return {
    update: o,
    dispose: s
  };
}

const wAa = {
  [wqn]: "LINEAR_TONE_MAPPING",
  [xqn]: "REINHARD_TONE_MAPPING",
  [_qn]: "CINEON_TONE_MAPPING",
  [epe]: "ACES_FILMIC_TONE_MAPPING",
  [Aqn]: "AGX_TONE_MAPPING",
  [Sqn]: "NEUTRAL_TONE_MAPPING",
  [kqn]: "CUSTOM_TONE_MAPPING"
};

function xAa(e, t, n, r, a) {
  const i = new FE(t, n, {
      type: e,
      depthBuffer: r,
      stencilBuffer: a
    }),
    o = new FE(t, n, {
      type: hT,
      depthBuffer: !1,
      stencilBuffer: !1
    }),
    s = new Fd();
  s.setAttribute("position", new Al([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), s.setAttribute("uv", new Al([0, 2, 0, 0, 2, 0], 2));
  const l = new Oxa({
      uniforms: {
        tDiffuse: {
          value: null
        }
      },
      vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
      fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
      depthTest: !1,
      depthWrite: !1
    }),
    d = new di(s, l),
    u = new uG(-1, 1, 1, -1, 0, 1);
  let h = null,
    p = null,
    m = !1,
    f,
    y = null,
    b = [],
    v = !1;
  this.setSize = function (_, w) {
    i.setSize(_, w), o.setSize(_, w);
    for (let k = 0; k < b.length; k++) {
      const A = b[k];
      A.setSize && A.setSize(_, w);
    }
  }, this.setEffects = function (_) {
    b = _, v = b.length > 0 && b[0].isRenderPass === !0;
    const w = i.width,
      k = i.height;
    for (let A = 0; A < b.length; A++) {
      const S = b[A];
      S.setSize && S.setSize(w, k);
    }
  }, this.begin = function (_, w) {
    if (m || _.toneMapping === sP && b.length === 0) return !1;
    if (y = w, w !== null) {
      const k = w.width,
        A = w.height;
      (i.width !== k || i.height !== A) && this.setSize(k, A);
    }
    return v === !1 && _.setRenderTarget(i), f = _.toneMapping, _.toneMapping = sP, !0;
  }, this.hasRenderPass = function () {
    return v;
  }, this.end = function (_, w) {
    _.toneMapping = f, m = !0;
    let k = i,
      A = o;
    for (let S = 0; S < b.length; S++) {
      const C = b[S];
      if (C.enabled !== !1 && (C.render(_, A, k, w), C.needsSwap !== !1)) {
        const I = k;
        k = A, A = I;
      }
    }
    if (h !== _.outputColorSpace || p !== _.toneMapping) {
      h = _.outputColorSpace, p = _.toneMapping, l.defines = {}, vc.getTransfer(h) === Fh && (l.defines.SRGB_TRANSFER = "");
      const S = wAa[p];
      S && (l.defines[S] = ""), l.needsUpdate = !0;
    }
    l.uniforms.tDiffuse.value = k.texture, _.setRenderTarget(y), _.render(d, u), y = null, m = !1;
  }, this.isCompositing = function () {
    return m;
  }, this.dispose = function () {
    i.dispose(), o.dispose(), s.dispose(), l.dispose();
  };
}

const uKn = new N0(),
  Ivt = new N_e(1, 1),
  hKn = new Dqn(),
  pKn = new Pwa(),
  mKn = new $qn(),
  len = [],
  cen = [],
  den = new Float32Array(16),
  uen = new Float32Array(9),
  hen = new Float32Array(4);

function spe(e, t, n) {
  const r = e[0];
  if (r <= 0 || r > 0) return e;
  const a = t * n;
  let i = len[a];
  if (i === void 0 && (i = new Float32Array(a), len[a] = i), t !== 0) {
    r.toArray(i, 0);
    for (let o = 1, s = 0; o !== t; ++o) s += n, e[o].toArray(i, s);
  }
  return i;
}

function Bb(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
  return !0;
}

function Fb(e, t) {
  for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}

function QYe(e, t) {
  let n = cen[t];
  n === void 0 && (n = new Int32Array(t), cen[t] = n);
  for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
  return n;
}

function _Aa(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}

function kAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);else {
    if (Bb(n, t)) return;
    e.uniform2fv(this.addr, t), Fb(n, t);
  }
}

function AAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);else {
    if (Bb(n, t)) return;
    e.uniform3fv(this.addr, t), Fb(n, t);
  }
}

function SAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);else {
    if (Bb(n, t)) return;
    e.uniform4fv(this.addr, t), Fb(n, t);
  }
}

function IAa(e, t) {
  const n = this.cache,
    r = t.elements;
  if (r === void 0) {
    if (Bb(n, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), Fb(n, t);
  } else {
    if (Bb(n, r)) return;
    hen.set(r), e.uniformMatrix2fv(this.addr, !1, hen), Fb(n, r);
  }
}

function CAa(e, t) {
  const n = this.cache,
    r = t.elements;
  if (r === void 0) {
    if (Bb(n, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), Fb(n, t);
  } else {
    if (Bb(n, r)) return;
    uen.set(r), e.uniformMatrix3fv(this.addr, !1, uen), Fb(n, r);
  }
}

function EAa(e, t) {
  const n = this.cache,
    r = t.elements;
  if (r === void 0) {
    if (Bb(n, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), Fb(n, t);
  } else {
    if (Bb(n, r)) return;
    den.set(r), e.uniformMatrix4fv(this.addr, !1, den), Fb(n, r);
  }
}

function TAa(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}

function MAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);else {
    if (Bb(n, t)) return;
    e.uniform2iv(this.addr, t), Fb(n, t);
  }
}

function PAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);else {
    if (Bb(n, t)) return;
    e.uniform3iv(this.addr, t), Fb(n, t);
  }
}

function RAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);else {
    if (Bb(n, t)) return;
    e.uniform4iv(this.addr, t), Fb(n, t);
  }
}

function NAa(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}

function jAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);else {
    if (Bb(n, t)) return;
    e.uniform2uiv(this.addr, t), Fb(n, t);
  }
}

function DAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);else {
    if (Bb(n, t)) return;
    e.uniform3uiv(this.addr, t), Fb(n, t);
  }
}

function LAa(e, t) {
  const n = this.cache;
  if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);else {
    if (Bb(n, t)) return;
    e.uniform4uiv(this.addr, t), Fb(n, t);
  }
}

function OAa(e, t, n) {
  const r = this.cache,
    a = n.allocateTextureUnit();
  r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a);
  let i;
  this.type === e.SAMPLER_2D_SHADOW ? (Ivt.compareFunction = n.isReversedDepthBuffer() ? Hjt : Vjt, i = Ivt) : i = uKn, n.setTexture2D(t || i, a);
}

function BAa(e, t, n) {
  const r = this.cache,
    a = n.allocateTextureUnit();
  r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTexture3D(t || pKn, a);
}

function FAa(e, t, n) {
  const r = this.cache,
    a = n.allocateTextureUnit();
  r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTextureCube(t || mKn, a);
}

function zAa(e, t, n) {
  const r = this.cache,
    a = n.allocateTextureUnit();
  r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTexture2DArray(t || hKn, a);
}

function UAa(e) {
  switch (e) {
    case 5126:
      return _Aa;
    case 35664:
      return kAa;
    case 35665:
      return AAa;
    case 35666:
      return SAa;
    case 35674:
      return IAa;
    case 35675:
      return CAa;
    case 35676:
      return EAa;
    case 5124:
    case 35670:
      return TAa;
    case 35667:
    case 35671:
      return MAa;
    case 35668:
    case 35672:
      return PAa;
    case 35669:
    case 35673:
      return RAa;
    case 5125:
      return NAa;
    case 36294:
      return jAa;
    case 36295:
      return DAa;
    case 36296:
      return LAa;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return OAa;
    case 35679:
    case 36299:
    case 36307:
      return BAa;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return FAa;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return zAa;
  }
}

function $Aa(e, t) {
  e.uniform1fv(this.addr, t);
}

function GAa(e, t) {
  const n = spe(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}

function VAa(e, t) {
  const n = spe(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}

function HAa(e, t) {
  const n = spe(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}

function WAa(e, t) {
  const n = spe(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, n);
}

function qAa(e, t) {
  const n = spe(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, n);
}

function KAa(e, t) {
  const n = spe(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, n);
}

function QAa(e, t) {
  e.uniform1iv(this.addr, t);
}

function YAa(e, t) {
  e.uniform2iv(this.addr, t);
}

function XAa(e, t) {
  e.uniform3iv(this.addr, t);
}

function JAa(e, t) {
  e.uniform4iv(this.addr, t);
}

function ZAa(e, t) {
  e.uniform1uiv(this.addr, t);
}

function eSa(e, t) {
  e.uniform2uiv(this.addr, t);
}

function tSa(e, t) {
  e.uniform3uiv(this.addr, t);
}

function nSa(e, t) {
  e.uniform4uiv(this.addr, t);
}

function rSa(e, t, n) {
  const r = this.cache,
    a = t.length,
    i = QYe(n, a);
  Bb(r, i) || (e.uniform1iv(this.addr, i), Fb(r, i));
  let o;
  this.type === e.SAMPLER_2D_SHADOW ? o = Ivt : o = uKn;
  for (let s = 0; s !== a; ++s) n.setTexture2D(t[s] || o, i[s]);
}

function aSa(e, t, n) {
  const r = this.cache,
    a = t.length,
    i = QYe(n, a);
  Bb(r, i) || (e.uniform1iv(this.addr, i), Fb(r, i));
  for (let o = 0; o !== a; ++o) n.setTexture3D(t[o] || pKn, i[o]);
}

function iSa(e, t, n) {
  const r = this.cache,
    a = t.length,
    i = QYe(n, a);
  Bb(r, i) || (e.uniform1iv(this.addr, i), Fb(r, i));
  for (let o = 0; o !== a; ++o) n.setTextureCube(t[o] || mKn, i[o]);
}

function oSa(e, t, n) {
  const r = this.cache,
    a = t.length,
    i = QYe(n, a);
  Bb(r, i) || (e.uniform1iv(this.addr, i), Fb(r, i));
  for (let o = 0; o !== a; ++o) n.setTexture2DArray(t[o] || hKn, i[o]);
}

function sSa(e) {
  switch (e) {
    case 5126:
      return $Aa;
    case 35664:
      return GAa;
    case 35665:
      return VAa;
    case 35666:
      return HAa;
    case 35674:
      return WAa;
    case 35675:
      return qAa;
    case 35676:
      return KAa;
    case 5124:
    case 35670:
      return QAa;
    case 35667:
    case 35671:
      return YAa;
    case 35668:
    case 35672:
      return XAa;
    case 35669:
    case 35673:
      return JAa;
    case 5125:
      return ZAa;
    case 36294:
      return eSa;
    case 36295:
      return tSa;
    case 36296:
      return nSa;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return rSa;
    case 35679:
    case 36299:
    case 36307:
      return aSa;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return iSa;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return oSa;
  }
}

class lSa {
  constructor(t, n, r) {
    this.id = t, this.addr = r, this.cache = [], this.type = n.type, this.setValue = UAa(n.type);
  }
}

class cSa {
  constructor(t, n, r) {
    this.id = t, this.addr = r, this.cache = [], this.type = n.type, this.size = n.size, this.setValue = sSa(n.type);
  }
}

class dSa {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, n, r) {
    const a = this.seq;
    for (let i = 0, o = a.length; i !== o; ++i) {
      const s = a[i];
      s.setValue(t, n[s.id], r);
    }
  }
}

const Nrt = /(\w+)(\])?(\[|\.)?/g;

function pen(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}

function uSa(e, t, n) {
  const r = e.name,
    a = r.length;
  for (Nrt.lastIndex = 0;;) {
    const i = Nrt.exec(r),
      o = Nrt.lastIndex;
    let s = i[1];
    const l = i[2] === "]",
      d = i[3];
    if (l && (s = s | 0), d === void 0 || d === "[" && o + 2 === a) {
      pen(n, d === void 0 ? new lSa(s, e, t) : new cSa(s, e, t));
      break;
    } else {
      let h = n.map[s];
      h === void 0 && (h = new dSa(s), pen(n, h)), n = h;
    }
  }
}

class RNe {
  constructor(t, n) {
    this.seq = [], this.map = {};
    const r = t.getProgramParameter(n, t.ACTIVE_UNIFORMS);
    for (let o = 0; o < r; ++o) {
      const s = t.getActiveUniform(n, o),
        l = t.getUniformLocation(n, s.name);
      uSa(s, l, this);
    }
    const a = [],
      i = [];
    for (const o of this.seq) o.type === t.SAMPLER_2D_SHADOW || o.type === t.SAMPLER_CUBE_SHADOW || o.type === t.SAMPLER_2D_ARRAY_SHADOW ? a.push(o) : i.push(o);
    a.length > 0 && (this.seq = a.concat(i));
  }
  setValue(t, n, r, a) {
    const i = this.map[n];
    i !== void 0 && i.setValue(t, r, a);
  }
  setOptional(t, n, r) {
    const a = n[r];
    a !== void 0 && this.setValue(t, r, a);
  }
  static upload(t, n, r, a) {
    for (let i = 0, o = n.length; i !== o; ++i) {
      const s = n[i],
        l = r[s.id];
      l.needsUpdate !== !1 && s.setValue(t, l.value, a);
    }
  }
  static seqWithValue(t, n) {
    const r = [];
    for (let a = 0, i = t.length; a !== i; ++a) {
      const o = t[a];
      o.id in n && r.push(o);
    }
    return r;
  }
}

function men(e, t, n) {
  const r = e.createShader(t);
  return e.shaderSource(r, n), e.compileShader(r), r;
}

const hSa = 37297;

let pSa = 0;

function mSa(e, t) {
  const n = e.split(`
`),
    r = [],
    a = Math.max(t - 6, 0),
    i = Math.min(t + 6, n.length);
  for (let o = a; o < i; o++) {
    const s = o + 1;
    r.push(`${s === t ? ">" : " "} ${s}: ${n[o]}`);
  }
  return r.join(`
`);
}

const fen = new Tc();

function fSa(e) {
  vc._getMatrix(fen, vc.workingColorSpace, e);
  const t = `mat3( ${fen.elements.map(n => n.toFixed(4))} )`;
  switch (vc.getTransfer(e)) {
    case XFe:
      return [t, "LinearTransferOETF"];
    case Fh:
      return [t, "sRGBTransferOETF"];
    default:
      return Es("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}

function gen(e, t, n) {
  const r = e.getShaderParameter(t, e.COMPILE_STATUS),
    i = (e.getShaderInfoLog(t) || "").trim();
  if (r && i === "") return "";
  const o = /ERROR: 0:(\d+)/.exec(i);
  if (o) {
    const s = parseInt(o[1]);
    return n.toUpperCase() + `

` + i + `

` + mSa(e.getShaderSource(t), s);
  } else return i;
}

function gSa(e, t) {
  const n = fSa(t);
  return [`vec4 ${e}( vec4 value ) {`, `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, "}"].join(`
`);
}

const ySa = {
  [wqn]: "Linear",
  [xqn]: "Reinhard",
  [_qn]: "Cineon",
  [epe]: "ACESFilmic",
  [Aqn]: "AgX",
  [Sqn]: "Neutral",
  [kqn]: "Custom"
};

function bSa(e, t) {
  const n = ySa[t];
  return n === void 0 ? (Es("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}

const L8e = new dr();

function vSa() {
  vc.getLuminanceCoefficients(L8e);
  const e = L8e.x.toFixed(4),
    t = L8e.y.toFixed(4),
    n = L8e.z.toFixed(4);
  return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${e}, ${t}, ${n} );`, "	return dot( weights, rgb );", "}"].join(`
`);
}

function wSa(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(P0e).join(`
`);
}

function xSa(e) {
  const t = [];
  for (const n in e) {
    const r = e[n];
    r !== !1 && t.push("#define " + n + " " + r);
  }
  return t.join(`
`);
}

function _Sa(e, t) {
  const n = {},
    r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let a = 0; a < r; a++) {
    const i = e.getActiveAttrib(t, a),
      o = i.name;
    let s = 1;
    i.type === e.FLOAT_MAT2 && (s = 2), i.type === e.FLOAT_MAT3 && (s = 3), i.type === e.FLOAT_MAT4 && (s = 4), n[o] = {
      type: i.type,
      location: e.getAttribLocation(t, o),
      locationSize: s
    };
  }
  return n;
}

function P0e(e) {
  return e !== "";
}

function yen(e, t) {
  const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}

function ben(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}

const kSa = /^[ \t]*#include +<([\w\d./]+)>/gm;

function Cvt(e) {
  return e.replace(kSa, SSa);
}

const ASa = new Map();

function SSa(e, t) {
  let n = Wc[t];
  if (n === void 0) {
    const r = ASa.get(t);
    if (r !== void 0) n = Wc[r], Es('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, r);else throw new Error("Can not resolve #include <" + t + ">");
  }
  return Cvt(n);
}

const ISa = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

function ven(e) {
  return e.replace(ISa, CSa);
}

function CSa(e, t, n, r) {
  let a = "";
  for (let i = parseInt(t); i < parseInt(n); i++) a += r.replace(/\[\s*i\s*\]/g, "[ " + i + " ]").replace(/UNROLLED_LOOP_INDEX/g, i);
  return a;
}

function wen(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return e.precision === "highp" ? t += `
#define HIGH_PRECISION` : e.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : e.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}

const ESa = {
  [jve]: "SHADOWMAP_TYPE_PCF",
  [E0e]: "SHADOWMAP_TYPE_VSM"
};

function TSa(e) {
  return ESa[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}

const MSa = {
  [XX]: "ENVMAP_TYPE_CUBE",
  [nde]: "ENVMAP_TYPE_CUBE",
  [GYe]: "ENVMAP_TYPE_CUBE_UV"
};

function PSa(e) {
  return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : MSa[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}

const RSa = {
  [nde]: "ENVMAP_MODE_REFRACTION"
};

function NSa(e) {
  return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : RSa[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}

const jSa = {
  [$Ye]: "ENVMAP_BLENDING_MULTIPLY",
  [H1a]: "ENVMAP_BLENDING_MIX",
  [W1a]: "ENVMAP_BLENDING_ADD"
};

function DSa(e) {
  return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : jSa[e.combine] || "ENVMAP_BLENDING_NONE";
}

function LSa(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const n = Math.log2(t) - 2,
    r = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
    texelHeight: r,
    maxMip: n
  };
}

function OSa(e, t, n, r) {
  const a = e.getContext(),
    i = n.defines;
  let o = n.vertexShader,
    s = n.fragmentShader;
  const l = TSa(n),
    d = PSa(n),
    u = NSa(n),
    h = DSa(n),
    p = LSa(n),
    m = wSa(n),
    f = xSa(i),
    y = a.createProgram();
  let b,
    v,
    _ = n.glslVersion ? "#version " + n.glslVersion + `
` : "";
  n.isRawShaderMaterial ? (b = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f].filter(P0e).join(`
`), b.length > 0 && (b += `
`), v = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f].filter(P0e).join(`
`), v.length > 0 && (v += `
`)) : (b = [wen(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f, n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", n.batching ? "#define USE_BATCHING" : "", n.batchingColor ? "#define USE_BATCHING_COLOR" : "", n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + u : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.mapUv ? "#define MAP_UV " + n.mapUv : "", n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "", n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "", n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "", n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "", n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "", n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "", n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "", n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "", n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "", n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "", n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "", n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "", n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "", n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "", n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "", n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "", n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "", n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "", n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "", n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "", n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "", n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "", n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", n.morphColors ? "#define USE_MORPHCOLORS" : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(P0e).join(`
`), v = [wen(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + u : "", n.envMap ? "#define " + h : "", p ? "#define CUBEUV_TEXEL_WIDTH " + p.texelWidth : "", p ? "#define CUBEUV_TEXEL_HEIGHT " + p.texelHeight : "", p ? "#define CUBEUV_MAX_MIP " + p.maxMip + ".0" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.dispersion ? "#define USE_DISPERSION" : "", n.iridescence ? "#define USE_IRIDESCENCE" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.sheen ? "#define USE_SHEEN" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", n.toneMapping !== sP ? "#define TONE_MAPPING" : "", n.toneMapping !== sP ? Wc.tonemapping_pars_fragment : "", n.toneMapping !== sP ? bSa("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.opaque ? "#define OPAQUE" : "", Wc.colorspace_pars_fragment, gSa("linearToOutputTexel", n.outputColorSpace), vSa(), n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", `
`].filter(P0e).join(`
`)), o = Cvt(o), o = yen(o, n), o = ben(o, n), s = Cvt(s), s = yen(s, n), s = ben(s, n), o = ven(o), s = ven(s), n.isRawShaderMaterial !== !0 && (_ = `#version 300 es
`, b = [m, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + b, v = ["#define varying in", n.glslVersion === iZt ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", n.glslVersion === iZt ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + v);
  const w = _ + b + o,
    k = _ + v + s,
    A = men(a, a.VERTEX_SHADER, w),
    S = men(a, a.FRAGMENT_SHADER, k);
  a.attachShader(y, A), a.attachShader(y, S), n.index0AttributeName !== void 0 ? a.bindAttribLocation(y, 0, n.index0AttributeName) : n.morphTargets === !0 && a.bindAttribLocation(y, 0, "position"), a.linkProgram(y);
  function C(T) {
    if (e.debug.checkShaderErrors) {
      const P = a.getProgramInfoLog(y) || "",
        R = a.getShaderInfoLog(A) || "",
        j = a.getShaderInfoLog(S) || "",
        B = P.trim(),
        F = R.trim(),
        N = j.trim();
      let G = !0,
        z = !0;
      if (a.getProgramParameter(y, a.LINK_STATUS) === !1) {
        if (G = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(a, y, A, S);else {
          const V = gen(a, A, "vertex"),
            O = gen(a, S, "fragment");
          vl("THREE.WebGLProgram: Shader Error " + a.getError() + " - VALIDATE_STATUS " + a.getProgramParameter(y, a.VALIDATE_STATUS) + `

Material Name: ` + T.name + `
Material Type: ` + T.type + `

Program Info Log: ` + B + `
` + V + `
` + O);
        }
      } else B !== "" ? Es("WebGLProgram: Program Info Log:", B) : (F === "" || N === "") && (z = !1);
      z && (T.diagnostics = {
        runnable: G,
        programLog: B,
        vertexShader: {
          log: F,
          prefix: b
        },
        fragmentShader: {
          log: N,
          prefix: v
        }
      });
    }
    a.deleteShader(A), a.deleteShader(S), I = new RNe(a, y), E = _Sa(a, y);
  }
  let I;
  this.getUniforms = function () {
    return I === void 0 && C(this), I;
  };
  let E;
  this.getAttributes = function () {
    return E === void 0 && C(this), E;
  };
  let M = n.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function () {
    return M === !1 && (M = a.getProgramParameter(y, hSa)), M;
  }, this.destroy = function () {
    r.releaseStatesOfProgram(this), a.deleteProgram(y), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = pSa++, this.cacheKey = t, this.usedTimes = 1, this.program = y, this.vertexShader = A, this.fragmentShader = S, this;
}

let BSa = 0;

class FSa {
  constructor() {
    this.shaderCache = new Map(), this.materialCache = new Map();
  }
  update(t) {
    const n = t.vertexShader,
      r = t.fragmentShader,
      a = this._getShaderStage(n),
      i = this._getShaderStage(r),
      o = this._getShaderCacheForMaterial(t);
    return o.has(a) === !1 && (o.add(a), a.usedTimes++), o.has(i) === !1 && (o.add(i), i.usedTimes++), this;
  }
  remove(t) {
    const n = this.materialCache.get(t);
    for (const r of n) r.usedTimes--, r.usedTimes === 0 && this.shaderCache.delete(r.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const n = this.materialCache;
    let r = n.get(t);
    return r === void 0 && (r = new Set(), n.set(t, r)), r;
  }
  _getShaderStage(t) {
    const n = this.shaderCache;
    let r = n.get(t);
    return r === void 0 && (r = new zSa(t), n.set(t, r)), r;
  }
}

class zSa {
  constructor(t) {
    this.id = BSa++, this.code = t, this.usedTimes = 0;
  }
}

function USa(e, t, n, r, a, i) {
  const o = new Kjt(),
    s = new FSa(),
    l = new Set(),
    d = [],
    u = new Map(),
    h = r.logarithmicDepthBuffer;
  let p = r.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function f(I) {
    return l.add(I), I === 0 ? "uv" : `uv${I}`;
  }
  function y(I, E, M, T, P) {
    const R = T.fog,
      j = P.geometry,
      B = I.isMeshStandardMaterial || I.isMeshLambertMaterial || I.isMeshPhongMaterial ? T.environment : null,
      F = I.isMeshStandardMaterial || I.isMeshLambertMaterial && !I.envMap || I.isMeshPhongMaterial && !I.envMap,
      N = t.get(I.envMap || B, F),
      G = N && N.mapping === GYe ? N.image.height : null,
      z = m[I.type];
    I.precision !== null && (p = r.getMaxPrecision(I.precision), p !== I.precision && Es("WebGLProgram.getParameters:", I.precision, "not supported, using", p, "instead."));
    const V = j.morphAttributes.position || j.morphAttributes.normal || j.morphAttributes.color,
      O = V !== void 0 ? V.length : 0;
    let L = 0;
    j.morphAttributes.position !== void 0 && (L = 1), j.morphAttributes.normal !== void 0 && (L = 2), j.morphAttributes.color !== void 0 && (L = 3);
    let D, U, H, Y;
    if (z) {
      const De = uk[z];
      D = De.vertexShader, U = De.fragmentShader;
    } else D = I.vertexShader, U = I.fragmentShader, s.update(I), H = s.getVertexShaderID(I), Y = s.getFragmentShaderID(I);
    const K = e.getRenderTarget(),
      W = e.state.buffers.depth.getReversed(),
      Q = P.isInstancedMesh === !0,
      q = P.isBatchedMesh === !0,
      ne = !!I.map,
      de = !!I.matcap,
      le = !!N,
      J = !!I.aoMap,
      pe = !!I.lightMap,
      ce = !!I.bumpMap,
      we = !!I.normalMap,
      X = !!I.displacementMap,
      Z = !!I.emissiveMap,
      re = !!I.metalnessMap,
      fe = !!I.roughnessMap,
      ye = I.anisotropy > 0,
      ie = I.clearcoat > 0,
      ae = I.dispersion > 0,
      be = I.iridescence > 0,
      Ee = I.sheen > 0,
      xe = I.transmission > 0,
      he = ye && !!I.anisotropyMap,
      ue = ie && !!I.clearcoatMap,
      ge = ie && !!I.clearcoatNormalMap,
      _e = ie && !!I.clearcoatRoughnessMap,
      ke = be && !!I.iridescenceMap,
      ve = be && !!I.iridescenceThicknessMap,
      Te = Ee && !!I.sheenColorMap,
      Ne = Ee && !!I.sheenRoughnessMap,
      me = !!I.specularMap,
      Ae = !!I.specularColorMap,
      Fe = !!I.specularIntensityMap,
      Me = xe && !!I.transmissionMap,
      Re = xe && !!I.thicknessMap,
      $e = !!I.gradientMap,
      rt = !!I.alphaMap,
      nt = I.alphaTest > 0,
      ze = !!I.alphaHash,
      Le = !!I.extensions;
    let Ke = sP;
    I.toneMapped && (K === null || K.isXRRenderTarget === !0) && (Ke = e.toneMapping);
    const Xe = {
      shaderID: z,
      shaderType: I.type,
      shaderName: I.name,
      vertexShader: D,
      fragmentShader: U,
      defines: I.defines,
      customVertexShaderID: H,
      customFragmentShaderID: Y,
      isRawShaderMaterial: I.isRawShaderMaterial === !0,
      glslVersion: I.glslVersion,
      precision: p,
      batching: q,
      batchingColor: q && P._colorsTexture !== null,
      instancing: Q,
      instancingColor: Q && P.instanceColor !== null,
      instancingMorph: Q && P.morphTexture !== null,
      outputColorSpace: K === null ? e.outputColorSpace : K.isXRRenderTarget === !0 ? K.texture.colorSpace : l_,
      alphaToCoverage: !!I.alphaToCoverage,
      map: ne,
      matcap: de,
      envMap: le,
      envMapMode: le && N.mapping,
      envMapCubeUVHeight: G,
      aoMap: J,
      lightMap: pe,
      bumpMap: ce,
      normalMap: we,
      displacementMap: X,
      emissiveMap: Z,
      normalMapObjectSpace: we && I.normalMapType === J1a,
      normalMapTangentSpace: we && I.normalMapType === VYe,
      metalnessMap: re,
      roughnessMap: fe,
      anisotropy: ye,
      anisotropyMap: he,
      clearcoat: ie,
      clearcoatMap: ue,
      clearcoatNormalMap: ge,
      clearcoatRoughnessMap: _e,
      dispersion: ae,
      iridescence: be,
      iridescenceMap: ke,
      iridescenceThicknessMap: ve,
      sheen: Ee,
      sheenColorMap: Te,
      sheenRoughnessMap: Ne,
      specularMap: me,
      specularColorMap: Ae,
      specularIntensityMap: Fe,
      transmission: xe,
      transmissionMap: Me,
      thicknessMap: Re,
      gradientMap: $e,
      opaque: I.transparent === !1 && I.blending === Sie && I.alphaToCoverage === !1,
      alphaMap: rt,
      alphaTest: nt,
      alphaHash: ze,
      combine: I.combine,
      mapUv: ne && f(I.map.channel),
      aoMapUv: J && f(I.aoMap.channel),
      lightMapUv: pe && f(I.lightMap.channel),
      bumpMapUv: ce && f(I.bumpMap.channel),
      normalMapUv: we && f(I.normalMap.channel),
      displacementMapUv: X && f(I.displacementMap.channel),
      emissiveMapUv: Z && f(I.emissiveMap.channel),
      metalnessMapUv: re && f(I.metalnessMap.channel),
      roughnessMapUv: fe && f(I.roughnessMap.channel),
      anisotropyMapUv: he && f(I.anisotropyMap.channel),
      clearcoatMapUv: ue && f(I.clearcoatMap.channel),
      clearcoatNormalMapUv: ge && f(I.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: _e && f(I.clearcoatRoughnessMap.channel),
      iridescenceMapUv: ke && f(I.iridescenceMap.channel),
      iridescenceThicknessMapUv: ve && f(I.iridescenceThicknessMap.channel),
      sheenColorMapUv: Te && f(I.sheenColorMap.channel),
      sheenRoughnessMapUv: Ne && f(I.sheenRoughnessMap.channel),
      specularMapUv: me && f(I.specularMap.channel),
      specularColorMapUv: Ae && f(I.specularColorMap.channel),
      specularIntensityMapUv: Fe && f(I.specularIntensityMap.channel),
      transmissionMapUv: Me && f(I.transmissionMap.channel),
      thicknessMapUv: Re && f(I.thicknessMap.channel),
      alphaMapUv: rt && f(I.alphaMap.channel),
      vertexTangents: !!j.attributes.tangent && (we || ye),
      vertexColors: I.vertexColors,
      vertexAlphas: I.vertexColors === !0 && !!j.attributes.color && j.attributes.color.itemSize === 4,
      pointsUvs: P.isPoints === !0 && !!j.attributes.uv && (ne || rt),
      fog: !!R,
      useFog: I.fog === !0,
      fogExp2: !!R && R.isFogExp2,
      flatShading: I.wireframe === !1 && (I.flatShading === !0 || j.attributes.normal === void 0 && we === !1 && (I.isMeshLambertMaterial || I.isMeshPhongMaterial || I.isMeshStandardMaterial || I.isMeshPhysicalMaterial)),
      sizeAttenuation: I.sizeAttenuation === !0,
      logarithmicDepthBuffer: h,
      reversedDepthBuffer: W,
      skinning: P.isSkinnedMesh === !0,
      morphTargets: j.morphAttributes.position !== void 0,
      morphNormals: j.morphAttributes.normal !== void 0,
      morphColors: j.morphAttributes.color !== void 0,
      morphTargetsCount: O,
      morphTextureStride: L,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numClippingPlanes: i.numPlanes,
      numClipIntersection: i.numIntersection,
      dithering: I.dithering,
      shadowMapEnabled: e.shadowMap.enabled && M.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: Ke,
      decodeVideoTexture: ne && I.map.isVideoTexture === !0 && vc.getTransfer(I.map.colorSpace) === Fh,
      decodeVideoTextureEmissive: Z && I.emissiveMap.isVideoTexture === !0 && vc.getTransfer(I.emissiveMap.colorSpace) === Fh,
      premultipliedAlpha: I.premultipliedAlpha,
      doubleSided: I.side === _y,
      flipSided: I.side === xx,
      useDepthPacking: I.depthPacking >= 0,
      depthPacking: I.depthPacking || 0,
      index0AttributeName: I.index0AttributeName,
      extensionClipCullDistance: Le && I.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Le && I.extensions.multiDraw === !0 || q) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: I.customProgramCacheKey()
    };
    return Xe.vertexUv1s = l.has(1), Xe.vertexUv2s = l.has(2), Xe.vertexUv3s = l.has(3), l.clear(), Xe;
  }
  function b(I) {
    const E = [];
    if (I.shaderID ? E.push(I.shaderID) : (E.push(I.customVertexShaderID), E.push(I.customFragmentShaderID)), I.defines !== void 0) for (const M in I.defines) E.push(M), E.push(I.defines[M]);
    return I.isRawShaderMaterial === !1 && (v(E, I), _(E, I), E.push(e.outputColorSpace)), E.push(I.customProgramCacheKey), E.join();
  }
  function v(I, E) {
    I.push(E.precision), I.push(E.outputColorSpace), I.push(E.envMapMode), I.push(E.envMapCubeUVHeight), I.push(E.mapUv), I.push(E.alphaMapUv), I.push(E.lightMapUv), I.push(E.aoMapUv), I.push(E.bumpMapUv), I.push(E.normalMapUv), I.push(E.displacementMapUv), I.push(E.emissiveMapUv), I.push(E.metalnessMapUv), I.push(E.roughnessMapUv), I.push(E.anisotropyMapUv), I.push(E.clearcoatMapUv), I.push(E.clearcoatNormalMapUv), I.push(E.clearcoatRoughnessMapUv), I.push(E.iridescenceMapUv), I.push(E.iridescenceThicknessMapUv), I.push(E.sheenColorMapUv), I.push(E.sheenRoughnessMapUv), I.push(E.specularMapUv), I.push(E.specularColorMapUv), I.push(E.specularIntensityMapUv), I.push(E.transmissionMapUv), I.push(E.thicknessMapUv), I.push(E.combine), I.push(E.fogExp2), I.push(E.sizeAttenuation), I.push(E.morphTargetsCount), I.push(E.morphAttributeCount), I.push(E.numDirLights), I.push(E.numPointLights), I.push(E.numSpotLights), I.push(E.numSpotLightMaps), I.push(E.numHemiLights), I.push(E.numRectAreaLights), I.push(E.numDirLightShadows), I.push(E.numPointLightShadows), I.push(E.numSpotLightShadows), I.push(E.numSpotLightShadowsWithMaps), I.push(E.numLightProbes), I.push(E.shadowMapType), I.push(E.toneMapping), I.push(E.numClippingPlanes), I.push(E.numClipIntersection), I.push(E.depthPacking);
  }
  function _(I, E) {
    o.disableAll(), E.instancing && o.enable(0), E.instancingColor && o.enable(1), E.instancingMorph && o.enable(2), E.matcap && o.enable(3), E.envMap && o.enable(4), E.normalMapObjectSpace && o.enable(5), E.normalMapTangentSpace && o.enable(6), E.clearcoat && o.enable(7), E.iridescence && o.enable(8), E.alphaTest && o.enable(9), E.vertexColors && o.enable(10), E.vertexAlphas && o.enable(11), E.vertexUv1s && o.enable(12), E.vertexUv2s && o.enable(13), E.vertexUv3s && o.enable(14), E.vertexTangents && o.enable(15), E.anisotropy && o.enable(16), E.alphaHash && o.enable(17), E.batching && o.enable(18), E.dispersion && o.enable(19), E.batchingColor && o.enable(20), E.gradientMap && o.enable(21), I.push(o.mask), o.disableAll(), E.fog && o.enable(0), E.useFog && o.enable(1), E.flatShading && o.enable(2), E.logarithmicDepthBuffer && o.enable(3), E.reversedDepthBuffer && o.enable(4), E.skinning && o.enable(5), E.morphTargets && o.enable(6), E.morphNormals && o.enable(7), E.morphColors && o.enable(8), E.premultipliedAlpha && o.enable(9), E.shadowMapEnabled && o.enable(10), E.doubleSided && o.enable(11), E.flipSided && o.enable(12), E.useDepthPacking && o.enable(13), E.dithering && o.enable(14), E.transmission && o.enable(15), E.sheen && o.enable(16), E.opaque && o.enable(17), E.pointsUvs && o.enable(18), E.decodeVideoTexture && o.enable(19), E.decodeVideoTextureEmissive && o.enable(20), E.alphaToCoverage && o.enable(21), I.push(o.mask);
  }
  function w(I) {
    const E = m[I.type];
    let M;
    if (E) {
      const T = uk[E];
      M = iDt.clone(T.uniforms);
    } else M = I.uniforms;
    return M;
  }
  function k(I, E) {
    let M = u.get(E);
    return M !== void 0 ? ++M.usedTimes : (M = new OSa(e, E, I, a), d.push(M), u.set(E, M)), M;
  }
  function A(I) {
    if (--I.usedTimes === 0) {
      const E = d.indexOf(I);
      d[E] = d[d.length - 1], d.pop(), u.delete(I.cacheKey), I.destroy();
    }
  }
  function S(I) {
    s.remove(I);
  }
  function C() {
    s.dispose();
  }
  return {
    getParameters: y,
    getProgramCacheKey: b,
    getUniforms: w,
    acquireProgram: k,
    releaseProgram: A,
    releaseShaderCache: S,
    programs: d,
    dispose: C
  };
}

function $Sa() {
  let e = new WeakMap();
  function t(o) {
    return e.has(o);
  }
  function n(o) {
    let s = e.get(o);
    return s === void 0 && (s = {}, e.set(o, s)), s;
  }
  function r(o) {
    e.delete(o);
  }
  function a(o, s, l) {
    e.get(o)[s] = l;
  }
  function i() {
    e = new WeakMap();
  }
  return {
    has: t,
    get: n,
    remove: r,
    update: a,
    dispose: i
  };
}

function GSa(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}

function xen(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}

function _en() {
  const e = [];
  let t = 0;
  const n = [],
    r = [],
    a = [];
  function i() {
    t = 0, n.length = 0, r.length = 0, a.length = 0;
  }
  function o(p) {
    let m = 0;
    return p.isInstancedMesh && (m += 2), p.isSkinnedMesh && (m += 1), m;
  }
  function s(p, m, f, y, b, v) {
    let _ = e[t];
    return _ === void 0 ? (_ = {
      id: p.id,
      object: p,
      geometry: m,
      material: f,
      materialVariant: o(p),
      groupOrder: y,
      renderOrder: p.renderOrder,
      z: b,
      group: v
    }, e[t] = _) : (_.id = p.id, _.object = p, _.geometry = m, _.material = f, _.materialVariant = o(p), _.groupOrder = y, _.renderOrder = p.renderOrder, _.z = b, _.group = v), t++, _;
  }
  function l(p, m, f, y, b, v) {
    const _ = s(p, m, f, y, b, v);
    f.transmission > 0 ? r.push(_) : f.transparent === !0 ? a.push(_) : n.push(_);
  }
  function d(p, m, f, y, b, v) {
    const _ = s(p, m, f, y, b, v);
    f.transmission > 0 ? r.unshift(_) : f.transparent === !0 ? a.unshift(_) : n.unshift(_);
  }
  function u(p, m) {
    n.length > 1 && n.sort(p || GSa), r.length > 1 && r.sort(m || xen), a.length > 1 && a.sort(m || xen);
  }
  function h() {
    for (let p = t, m = e.length; p < m; p++) {
      const f = e[p];
      if (f.id === null) break;
      f.id = null, f.object = null, f.geometry = null, f.material = null, f.group = null;
    }
  }
  return {
    opaque: n,
    transmissive: r,
    transparent: a,
    init: i,
    push: l,
    unshift: d,
    finish: h,
    sort: u
  };
}

function VSa() {
  let e = new WeakMap();
  function t(r, a) {
    const i = e.get(r);
    let o;
    return i === void 0 ? (o = new _en(), e.set(r, [o])) : a >= i.length ? (o = new _en(), i.push(o)) : o = i[a], o;
  }
  function n() {
    e = new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}

function HSa() {
  const e = {};
  return {
    get: function (t) {
      if (e[t.id] !== void 0) return e[t.id];
      let n;
      switch (t.type) {
        case "DirectionalLight":
          n = {
            direction: new dr(),
            color: new so()
          };
          break;
        case "SpotLight":
          n = {
            position: new dr(),
            direction: new dr(),
            color: new so(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          n = {
            position: new dr(),
            color: new so(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          n = {
            direction: new dr(),
            skyColor: new so(),
            groundColor: new so()
          };
          break;
        case "RectAreaLight":
          n = {
            color: new so(),
            position: new dr(),
            halfWidth: new dr(),
            halfHeight: new dr()
          };
          break;
      }
      return e[t.id] = n, n;
    }
  };
}

function WSa() {
  const e = {};
  return {
    get: function (t) {
      if (e[t.id] !== void 0) return e[t.id];
      let n;
      switch (t.type) {
        case "DirectionalLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Qi()
          };
          break;
        case "SpotLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Qi()
          };
          break;
        case "PointLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Qi(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return e[t.id] = n, n;
    }
  };
}

let qSa = 0;

function KSa(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}

function QSa(e) {
  const t = new HSa(),
    n = WSa(),
    r = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0
    };
  for (let d = 0; d < 9; d++) r.probe.push(new dr());
  const a = new dr(),
    i = new bo(),
    o = new bo();
  function s(d) {
    let u = 0,
      h = 0,
      p = 0;
    for (let E = 0; E < 9; E++) r.probe[E].set(0, 0, 0);
    let m = 0,
      f = 0,
      y = 0,
      b = 0,
      v = 0,
      _ = 0,
      w = 0,
      k = 0,
      A = 0,
      S = 0,
      C = 0;
    d.sort(KSa);
    for (let E = 0, M = d.length; E < M; E++) {
      const T = d[E],
        P = T.color,
        R = T.intensity,
        j = T.distance;
      let B = null;
      if (T.shadow && T.shadow.map && (T.shadow.map.texture.format === rde ? B = T.shadow.map.texture : B = T.shadow.map.depthTexture || T.shadow.map.texture), T.isAmbientLight) u += P.r * R, h += P.g * R, p += P.b * R;else if (T.isLightProbe) {
        for (let F = 0; F < 9; F++) r.probe[F].addScaledVector(T.sh.coefficients[F], R);
        C++;
      } else if (T.isDirectionalLight) {
        const F = t.get(T);
        if (F.color.copy(T.color).multiplyScalar(T.intensity), T.castShadow) {
          const N = T.shadow,
            G = n.get(T);
          G.shadowIntensity = N.intensity, G.shadowBias = N.bias, G.shadowNormalBias = N.normalBias, G.shadowRadius = N.radius, G.shadowMapSize = N.mapSize, r.directionalShadow[m] = G, r.directionalShadowMap[m] = B, r.directionalShadowMatrix[m] = T.shadow.matrix, _++;
        }
        r.directional[m] = F, m++;
      } else if (T.isSpotLight) {
        const F = t.get(T);
        F.position.setFromMatrixPosition(T.matrixWorld), F.color.copy(P).multiplyScalar(R), F.distance = j, F.coneCos = Math.cos(T.angle), F.penumbraCos = Math.cos(T.angle * (1 - T.penumbra)), F.decay = T.decay, r.spot[y] = F;
        const N = T.shadow;
        if (T.map && (r.spotLightMap[A] = T.map, A++, N.updateMatrices(T), T.castShadow && S++), r.spotLightMatrix[y] = N.matrix, T.castShadow) {
          const G = n.get(T);
          G.shadowIntensity = N.intensity, G.shadowBias = N.bias, G.shadowNormalBias = N.normalBias, G.shadowRadius = N.radius, G.shadowMapSize = N.mapSize, r.spotShadow[y] = G, r.spotShadowMap[y] = B, k++;
        }
        y++;
      } else if (T.isRectAreaLight) {
        const F = t.get(T);
        F.color.copy(P).multiplyScalar(R), F.halfWidth.set(T.width * .5, 0, 0), F.halfHeight.set(0, T.height * .5, 0), r.rectArea[b] = F, b++;
      } else if (T.isPointLight) {
        const F = t.get(T);
        if (F.color.copy(T.color).multiplyScalar(T.intensity), F.distance = T.distance, F.decay = T.decay, T.castShadow) {
          const N = T.shadow,
            G = n.get(T);
          G.shadowIntensity = N.intensity, G.shadowBias = N.bias, G.shadowNormalBias = N.normalBias, G.shadowRadius = N.radius, G.shadowMapSize = N.mapSize, G.shadowCameraNear = N.camera.near, G.shadowCameraFar = N.camera.far, r.pointShadow[f] = G, r.pointShadowMap[f] = B, r.pointShadowMatrix[f] = T.shadow.matrix, w++;
        }
        r.point[f] = F, f++;
      } else if (T.isHemisphereLight) {
        const F = t.get(T);
        F.skyColor.copy(T.color).multiplyScalar(R), F.groundColor.copy(T.groundColor).multiplyScalar(R), r.hemi[v] = F, v++;
      }
    }
    b > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = wo.LTC_FLOAT_1, r.rectAreaLTC2 = wo.LTC_FLOAT_2) : (r.rectAreaLTC1 = wo.LTC_HALF_1, r.rectAreaLTC2 = wo.LTC_HALF_2)), r.ambient[0] = u, r.ambient[1] = h, r.ambient[2] = p;
    const I = r.hash;
    (I.directionalLength !== m || I.pointLength !== f || I.spotLength !== y || I.rectAreaLength !== b || I.hemiLength !== v || I.numDirectionalShadows !== _ || I.numPointShadows !== w || I.numSpotShadows !== k || I.numSpotMaps !== A || I.numLightProbes !== C) && (r.directional.length = m, r.spot.length = y, r.rectArea.length = b, r.point.length = f, r.hemi.length = v, r.directionalShadow.length = _, r.directionalShadowMap.length = _, r.pointShadow.length = w, r.pointShadowMap.length = w, r.spotShadow.length = k, r.spotShadowMap.length = k, r.directionalShadowMatrix.length = _, r.pointShadowMatrix.length = w, r.spotLightMatrix.length = k + A - S, r.spotLightMap.length = A, r.numSpotLightShadowsWithMaps = S, r.numLightProbes = C, I.directionalLength = m, I.pointLength = f, I.spotLength = y, I.rectAreaLength = b, I.hemiLength = v, I.numDirectionalShadows = _, I.numPointShadows = w, I.numSpotShadows = k, I.numSpotMaps = A, I.numLightProbes = C, r.version = qSa++);
  }
  function l(d, u) {
    let h = 0,
      p = 0,
      m = 0,
      f = 0,
      y = 0;
    const b = u.matrixWorldInverse;
    for (let v = 0, _ = d.length; v < _; v++) {
      const w = d[v];
      if (w.isDirectionalLight) {
        const k = r.directional[h];
        k.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), k.direction.sub(a), k.direction.transformDirection(b), h++;
      } else if (w.isSpotLight) {
        const k = r.spot[m];
        k.position.setFromMatrixPosition(w.matrixWorld), k.position.applyMatrix4(b), k.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), k.direction.sub(a), k.direction.transformDirection(b), m++;
      } else if (w.isRectAreaLight) {
        const k = r.rectArea[f];
        k.position.setFromMatrixPosition(w.matrixWorld), k.position.applyMatrix4(b), o.identity(), i.copy(w.matrixWorld), i.premultiply(b), o.extractRotation(i), k.halfWidth.set(w.width * .5, 0, 0), k.halfHeight.set(0, w.height * .5, 0), k.halfWidth.applyMatrix4(o), k.halfHeight.applyMatrix4(o), f++;
      } else if (w.isPointLight) {
        const k = r.point[p];
        k.position.setFromMatrixPosition(w.matrixWorld), k.position.applyMatrix4(b), p++;
      } else if (w.isHemisphereLight) {
        const k = r.hemi[y];
        k.direction.setFromMatrixPosition(w.matrixWorld), k.direction.transformDirection(b), y++;
      }
    }
  }
  return {
    setup: s,
    setupView: l,
    state: r
  };
}

function ken(e) {
  const t = new QSa(e),
    n = [],
    r = [];
  function a(u) {
    d.camera = u, n.length = 0, r.length = 0;
  }
  function i(u) {
    n.push(u);
  }
  function o(u) {
    r.push(u);
  }
  function s() {
    t.setup(n);
  }
  function l(u) {
    t.setupView(n, u);
  }
  const d = {
    lightsArray: n,
    shadowsArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: a,
    state: d,
    setupLights: s,
    setupLightsView: l,
    pushLight: i,
    pushShadow: o
  };
}

function YSa(e) {
  let t = new WeakMap();
  function n(a, i = 0) {
    const o = t.get(a);
    let s;
    return o === void 0 ? (s = new ken(e), t.set(a, [s])) : i >= o.length ? (s = new ken(e), o.push(s)) : s = o[i], s;
  }
  function r() {
    t = new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}

const XSa = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  JSa = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,
  ZSa = [new dr(1, 0, 0), new dr(-1, 0, 0), new dr(0, 1, 0), new dr(0, -1, 0), new dr(0, 0, 1), new dr(0, 0, -1)],
  e3a = [new dr(0, -1, 0), new dr(0, -1, 0), new dr(0, 0, 1), new dr(0, 0, -1), new dr(0, -1, 0), new dr(0, -1, 0)],
  Aen = new bo(),
  Ome = new dr(),
  jrt = new dr();

function t3a(e, t, n) {
  let r = new Jjt();
  const a = new Qi(),
    i = new Qi(),
    o = new Vd(),
    s = new Fxa(),
    l = new zxa(),
    d = {},
    u = n.maxTextureSize,
    h = {
      [uT]: xx,
      [xx]: uT,
      [_y]: _y
    },
    p = new Mx({
      defines: {
        VSM_SAMPLES: 8
      },
      uniforms: {
        shadow_pass: {
          value: null
        },
        resolution: {
          value: new Qi()
        },
        radius: {
          value: 4
        }
      },
      vertexShader: XSa,
      fragmentShader: JSa
    }),
    m = p.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const f = new Fd();
  f.setAttribute("position", new Z1(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
  const y = new di(f, p),
    b = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = jve;
  let v = this.type;
  this.render = function (S, C, I) {
    if (b.enabled === !1 || b.autoUpdate === !1 && b.needsUpdate === !1 || S.length === 0) return;
    this.type === I1a && (Es("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = jve);
    const E = e.getRenderTarget(),
      M = e.getActiveCubeFace(),
      T = e.getActiveMipmapLevel(),
      P = e.state;
    P.setBlending(nj), P.buffers.depth.getReversed() === !0 ? P.buffers.color.setClear(0, 0, 0, 0) : P.buffers.color.setClear(1, 1, 1, 1), P.buffers.depth.setTest(!0), P.setScissorTest(!1);
    const R = v !== this.type;
    R && C.traverse(function (j) {
      j.material && (Array.isArray(j.material) ? j.material.forEach(B => B.needsUpdate = !0) : j.material.needsUpdate = !0);
    });
    for (let j = 0, B = S.length; j < B; j++) {
      const F = S[j],
        N = F.shadow;
      if (N === void 0) {
        Es("WebGLShadowMap:", F, "has no shadow.");
        continue;
      }
      if (N.autoUpdate === !1 && N.needsUpdate === !1) continue;
      a.copy(N.mapSize);
      const G = N.getFrameExtents();
      a.multiply(G), i.copy(N.mapSize), (a.x > u || a.y > u) && (a.x > u && (i.x = Math.floor(u / G.x), a.x = i.x * G.x, N.mapSize.x = i.x), a.y > u && (i.y = Math.floor(u / G.y), a.y = i.y * G.y, N.mapSize.y = i.y));
      const z = e.state.buffers.depth.getReversed();
      if (N.camera._reversedDepth = z, N.map === null || R === !0) {
        if (N.map !== null && (N.map.depthTexture !== null && (N.map.depthTexture.dispose(), N.map.depthTexture = null), N.map.dispose()), this.type === E0e) {
          if (F.isPointLight) {
            Es("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          N.map = new FE(a.x, a.y, {
            format: rde,
            type: hT,
            minFilter: $m,
            magFilter: $m,
            generateMipmaps: !1
          }), N.map.texture.name = F.name + ".shadowMap", N.map.depthTexture = new N_e(a.x, a.y, Ck), N.map.depthTexture.name = F.name + ".shadowMapDepth", N.map.depthTexture.format = iD, N.map.depthTexture.compareFunction = null, N.map.depthTexture.minFilter = cg, N.map.depthTexture.magFilter = cg;
        } else F.isPointLight ? (N.map = new dKn(a.x), N.map.depthTexture = new txa(a.x, BP)) : (N.map = new FE(a.x, a.y), N.map.depthTexture = new N_e(a.x, a.y, BP)), N.map.depthTexture.name = F.name + ".shadowMap", N.map.depthTexture.format = iD, this.type === jve ? (N.map.depthTexture.compareFunction = z ? Hjt : Vjt, N.map.depthTexture.minFilter = $m, N.map.depthTexture.magFilter = $m) : (N.map.depthTexture.compareFunction = null, N.map.depthTexture.minFilter = cg, N.map.depthTexture.magFilter = cg);
        N.camera.updateProjectionMatrix();
      }
      const V = N.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let O = 0; O < V; O++) {
        if (N.map.isWebGLCubeRenderTarget) e.setRenderTarget(N.map, O), e.clear();else {
          O === 0 && (e.setRenderTarget(N.map), e.clear());
          const L = N.getViewport(O);
          o.set(i.x * L.x, i.y * L.y, i.x * L.z, i.y * L.w), P.viewport(o);
        }
        if (F.isPointLight) {
          const L = N.camera,
            D = N.matrix,
            U = F.distance || L.far;
          U !== L.far && (L.far = U, L.updateProjectionMatrix()), Ome.setFromMatrixPosition(F.matrixWorld), L.position.copy(Ome), jrt.copy(L.position), jrt.add(ZSa[O]), L.up.copy(e3a[O]), L.lookAt(jrt), L.updateMatrixWorld(), D.makeTranslation(-Ome.x, -Ome.y, -Ome.z), Aen.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), N._frustum.setFromProjectionMatrix(Aen, L.coordinateSystem, L.reversedDepth);
        } else N.updateMatrices(F);
        r = N.getFrustum(), k(C, I, N.camera, F, this.type);
      }
      N.isPointLightShadow !== !0 && this.type === E0e && _(N, I), N.needsUpdate = !1;
    }
    v = this.type, b.needsUpdate = !1, e.setRenderTarget(E, M, T);
  };
  function _(S, C) {
    const I = t.update(y);
    p.defines.VSM_SAMPLES !== S.blurSamples && (p.defines.VSM_SAMPLES = S.blurSamples, m.defines.VSM_SAMPLES = S.blurSamples, p.needsUpdate = !0, m.needsUpdate = !0), S.mapPass === null && (S.mapPass = new FE(a.x, a.y, {
      format: rde,
      type: hT
    })), p.uniforms.shadow_pass.value = S.map.depthTexture, p.uniforms.resolution.value = S.mapSize, p.uniforms.radius.value = S.radius, e.setRenderTarget(S.mapPass), e.clear(), e.renderBufferDirect(C, null, I, p, y, null), m.uniforms.shadow_pass.value = S.mapPass.texture, m.uniforms.resolution.value = S.mapSize, m.uniforms.radius.value = S.radius, e.setRenderTarget(S.map), e.clear(), e.renderBufferDirect(C, null, I, m, y, null);
  }
  function w(S, C, I, E) {
    let M = null;
    const T = I.isPointLight === !0 ? S.customDistanceMaterial : S.customDepthMaterial;
    if (T !== void 0) M = T;else if (M = I.isPointLight === !0 ? l : s, e.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) {
      const P = M.uuid,
        R = C.uuid;
      let j = d[P];
      j === void 0 && (j = {}, d[P] = j);
      let B = j[R];
      B === void 0 && (B = M.clone(), j[R] = B, C.addEventListener("dispose", A)), M = B;
    }
    if (M.visible = C.visible, M.wireframe = C.wireframe, E === E0e ? M.side = C.shadowSide !== null ? C.shadowSide : C.side : M.side = C.shadowSide !== null ? C.shadowSide : h[C.side], M.alphaMap = C.alphaMap, M.alphaTest = C.alphaToCoverage === !0 ? .5 : C.alphaTest, M.map = C.map, M.clipShadows = C.clipShadows, M.clippingPlanes = C.clippingPlanes, M.clipIntersection = C.clipIntersection, M.displacementMap = C.displacementMap, M.displacementScale = C.displacementScale, M.displacementBias = C.displacementBias, M.wireframeLinewidth = C.wireframeLinewidth, M.linewidth = C.linewidth, I.isPointLight === !0 && M.isMeshDistanceMaterial === !0) {
      const P = e.properties.get(M);
      P.light = I;
    }
    return M;
  }
  function k(S, C, I, E, M) {
    if (S.visible === !1) return;
    if (S.layers.test(C.layers) && (S.isMesh || S.isLine || S.isPoints) && (S.castShadow || S.receiveShadow && M === E0e) && (!S.frustumCulled || r.intersectsObject(S))) {
      S.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse, S.matrixWorld);
      const R = t.update(S),
        j = S.material;
      if (Array.isArray(j)) {
        const B = R.groups;
        for (let F = 0, N = B.length; F < N; F++) {
          const G = B[F],
            z = j[G.materialIndex];
          if (z && z.visible) {
            const V = w(S, z, E, M);
            S.onBeforeShadow(e, S, C, I, R, V, G), e.renderBufferDirect(I, null, R, V, S, G), S.onAfterShadow(e, S, C, I, R, V, G);
          }
        }
      } else if (j.visible) {
        const B = w(S, j, E, M);
        S.onBeforeShadow(e, S, C, I, R, B, null), e.renderBufferDirect(I, null, R, B, S, null), S.onAfterShadow(e, S, C, I, R, B, null);
      }
    }
    const P = S.children;
    for (let R = 0, j = P.length; R < j; R++) k(P[R], C, I, E, M);
  }
  function A(S) {
    S.target.removeEventListener("dispose", A);
    for (const I in d) {
      const E = d[I],
        M = S.target.uuid;
      M in E && (E[M].dispose(), delete E[M]);
    }
  }
}

function n3a(e, t) {
  function n() {
    let Me = !1;
    const Re = new Vd();
    let $e = null;
    const rt = new Vd(0, 0, 0, 0);
    return {
      setMask: function (nt) {
        $e !== nt && !Me && (e.colorMask(nt, nt, nt, nt), $e = nt);
      },
      setLocked: function (nt) {
        Me = nt;
      },
      setClear: function (nt, ze, Le, Ke, Xe) {
        Xe === !0 && (nt *= Ke, ze *= Ke, Le *= Ke), Re.set(nt, ze, Le, Ke), rt.equals(Re) === !1 && (e.clearColor(nt, ze, Le, Ke), rt.copy(Re));
      },
      reset: function () {
        Me = !1, $e = null, rt.set(-1, 0, 0, 0);
      }
    };
  }
  function r() {
    let Me = !1,
      Re = !1,
      $e = null,
      rt = null,
      nt = null;
    return {
      setReversed: function (ze) {
        if (Re !== ze) {
          const Le = t.get("EXT_clip_control");
          ze ? Le.clipControlEXT(Le.LOWER_LEFT_EXT, Le.ZERO_TO_ONE_EXT) : Le.clipControlEXT(Le.LOWER_LEFT_EXT, Le.NEGATIVE_ONE_TO_ONE_EXT), Re = ze;
          const Ke = nt;
          nt = null, this.setClear(Ke);
        }
      },
      getReversed: function () {
        return Re;
      },
      setTest: function (ze) {
        ze ? K(e.DEPTH_TEST) : W(e.DEPTH_TEST);
      },
      setMask: function (ze) {
        $e !== ze && !Me && (e.depthMask(ze), $e = ze);
      },
      setFunc: function (ze) {
        if (Re && (ze = cwa[ze]), rt !== ze) {
          switch (ze) {
            case Rbt:
              e.depthFunc(e.NEVER);
              break;
            case Nbt:
              e.depthFunc(e.ALWAYS);
              break;
            case jbt:
              e.depthFunc(e.LESS);
              break;
            case tde:
              e.depthFunc(e.LEQUAL);
              break;
            case Dbt:
              e.depthFunc(e.EQUAL);
              break;
            case Lbt:
              e.depthFunc(e.GEQUAL);
              break;
            case Obt:
              e.depthFunc(e.GREATER);
              break;
            case Bbt:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          rt = ze;
        }
      },
      setLocked: function (ze) {
        Me = ze;
      },
      setClear: function (ze) {
        nt !== ze && (nt = ze, Re && (ze = 1 - ze), e.clearDepth(ze));
      },
      reset: function () {
        Me = !1, $e = null, rt = null, nt = null, Re = !1;
      }
    };
  }
  function a() {
    let Me = !1,
      Re = null,
      $e = null,
      rt = null,
      nt = null,
      ze = null,
      Le = null,
      Ke = null,
      Xe = null;
    return {
      setTest: function (De) {
        Me || (De ? K(e.STENCIL_TEST) : W(e.STENCIL_TEST));
      },
      setMask: function (De) {
        Re !== De && !Me && (e.stencilMask(De), Re = De);
      },
      setFunc: function (De, Ye, Ce) {
        ($e !== De || rt !== Ye || nt !== Ce) && (e.stencilFunc(De, Ye, Ce), $e = De, rt = Ye, nt = Ce);
      },
      setOp: function (De, Ye, Ce) {
        (ze !== De || Le !== Ye || Ke !== Ce) && (e.stencilOp(De, Ye, Ce), ze = De, Le = Ye, Ke = Ce);
      },
      setLocked: function (De) {
        Me = De;
      },
      setClear: function (De) {
        Xe !== De && (e.clearStencil(De), Xe = De);
      },
      reset: function () {
        Me = !1, Re = null, $e = null, rt = null, nt = null, ze = null, Le = null, Ke = null, Xe = null;
      }
    };
  }
  const i = new n(),
    o = new r(),
    s = new a(),
    l = new WeakMap(),
    d = new WeakMap();
  let u = {},
    h = {},
    p = new WeakMap(),
    m = [],
    f = null,
    y = !1,
    b = null,
    v = null,
    _ = null,
    w = null,
    k = null,
    A = null,
    S = null,
    C = new so(0, 0, 0),
    I = 0,
    E = !1,
    M = null,
    T = null,
    P = null,
    R = null,
    j = null;
  const B = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let F = !1,
    N = 0;
  const G = e.getParameter(e.VERSION);
  G.indexOf("WebGL") !== -1 ? (N = parseFloat(/^WebGL (\d)/.exec(G)[1]), F = N >= 1) : G.indexOf("OpenGL ES") !== -1 && (N = parseFloat(/^OpenGL ES (\d)/.exec(G)[1]), F = N >= 2);
  let z = null,
    V = {};
  const O = e.getParameter(e.SCISSOR_BOX),
    L = e.getParameter(e.VIEWPORT),
    D = new Vd().fromArray(O),
    U = new Vd().fromArray(L);
  function H(Me, Re, $e, rt) {
    const nt = new Uint8Array(4),
      ze = e.createTexture();
    e.bindTexture(Me, ze), e.texParameteri(Me, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(Me, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let Le = 0; Le < $e; Le++) Me === e.TEXTURE_3D || Me === e.TEXTURE_2D_ARRAY ? e.texImage3D(Re, 0, e.RGBA, 1, 1, rt, 0, e.RGBA, e.UNSIGNED_BYTE, nt) : e.texImage2D(Re + Le, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, nt);
    return ze;
  }
  const Y = {};
  Y[e.TEXTURE_2D] = H(e.TEXTURE_2D, e.TEXTURE_2D, 1), Y[e.TEXTURE_CUBE_MAP] = H(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Y[e.TEXTURE_2D_ARRAY] = H(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), Y[e.TEXTURE_3D] = H(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), i.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), K(e.DEPTH_TEST), o.setFunc(tde), ce(!1), we(ZJt), K(e.CULL_FACE), J(nj);
  function K(Me) {
    u[Me] !== !0 && (e.enable(Me), u[Me] = !0);
  }
  function W(Me) {
    u[Me] !== !1 && (e.disable(Me), u[Me] = !1);
  }
  function Q(Me, Re) {
    return h[Me] !== Re ? (e.bindFramebuffer(Me, Re), h[Me] = Re, Me === e.DRAW_FRAMEBUFFER && (h[e.FRAMEBUFFER] = Re), Me === e.FRAMEBUFFER && (h[e.DRAW_FRAMEBUFFER] = Re), !0) : !1;
  }
  function q(Me, Re) {
    let $e = m,
      rt = !1;
    if (Me) {
      $e = p.get(Re), $e === void 0 && ($e = [], p.set(Re, $e));
      const nt = Me.textures;
      if ($e.length !== nt.length || $e[0] !== e.COLOR_ATTACHMENT0) {
        for (let ze = 0, Le = nt.length; ze < Le; ze++) $e[ze] = e.COLOR_ATTACHMENT0 + ze;
        $e.length = nt.length, rt = !0;
      }
    } else $e[0] !== e.BACK && ($e[0] = e.BACK, rt = !0);
    rt && e.drawBuffers($e);
  }
  function ne(Me) {
    return f !== Me ? (e.useProgram(Me), f = Me, !0) : !1;
  }
  const de = {
    [mH]: e.FUNC_ADD,
    [E1a]: e.FUNC_SUBTRACT,
    [T1a]: e.FUNC_REVERSE_SUBTRACT
  };
  de[M1a] = e.MIN, de[P1a] = e.MAX;
  const le = {
    [R1a]: e.ZERO,
    [N1a]: e.ONE,
    [j1a]: e.SRC_COLOR,
    [Mbt]: e.SRC_ALPHA,
    [z1a]: e.SRC_ALPHA_SATURATE,
    [B1a]: e.DST_COLOR,
    [L1a]: e.DST_ALPHA,
    [D1a]: e.ONE_MINUS_SRC_COLOR,
    [Pbt]: e.ONE_MINUS_SRC_ALPHA,
    [F1a]: e.ONE_MINUS_DST_COLOR,
    [O1a]: e.ONE_MINUS_DST_ALPHA,
    [U1a]: e.CONSTANT_COLOR,
    [$1a]: e.ONE_MINUS_CONSTANT_COLOR,
    [G1a]: e.CONSTANT_ALPHA,
    [V1a]: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function J(Me, Re, $e, rt, nt, ze, Le, Ke, Xe, De) {
    if (Me === nj) {
      y === !0 && (W(e.BLEND), y = !1);
      return;
    }
    if (y === !1 && (K(e.BLEND), y = !0), Me !== C1a) {
      if (Me !== b || De !== E) {
        if ((v !== mH || k !== mH) && (e.blendEquation(e.FUNC_ADD), v = mH, k = mH), De) switch (Me) {
          case Sie:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case KFe:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case eZt:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case tZt:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            vl("WebGLState: Invalid blending: ", Me);
            break;
        } else switch (Me) {
          case Sie:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case KFe:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case eZt:
            vl("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case tZt:
            vl("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            vl("WebGLState: Invalid blending: ", Me);
            break;
        }
        _ = null, w = null, A = null, S = null, C.set(0, 0, 0), I = 0, b = Me, E = De;
      }
      return;
    }
    nt = nt || Re, ze = ze || $e, Le = Le || rt, (Re !== v || nt !== k) && (e.blendEquationSeparate(de[Re], de[nt]), v = Re, k = nt), ($e !== _ || rt !== w || ze !== A || Le !== S) && (e.blendFuncSeparate(le[$e], le[rt], le[ze], le[Le]), _ = $e, w = rt, A = ze, S = Le), (Ke.equals(C) === !1 || Xe !== I) && (e.blendColor(Ke.r, Ke.g, Ke.b, Xe), C.copy(Ke), I = Xe), b = Me, E = !1;
  }
  function pe(Me, Re) {
    Me.side === _y ? W(e.CULL_FACE) : K(e.CULL_FACE);
    let $e = Me.side === xx;
    Re && ($e = !$e), ce($e), Me.blending === Sie && Me.transparent === !1 ? J(nj) : J(Me.blending, Me.blendEquation, Me.blendSrc, Me.blendDst, Me.blendEquationAlpha, Me.blendSrcAlpha, Me.blendDstAlpha, Me.blendColor, Me.blendAlpha, Me.premultipliedAlpha), o.setFunc(Me.depthFunc), o.setTest(Me.depthTest), o.setMask(Me.depthWrite), i.setMask(Me.colorWrite);
    const rt = Me.stencilWrite;
    s.setTest(rt), rt && (s.setMask(Me.stencilWriteMask), s.setFunc(Me.stencilFunc, Me.stencilRef, Me.stencilFuncMask), s.setOp(Me.stencilFail, Me.stencilZFail, Me.stencilZPass)), Z(Me.polygonOffset, Me.polygonOffsetFactor, Me.polygonOffsetUnits), Me.alphaToCoverage === !0 ? K(e.SAMPLE_ALPHA_TO_COVERAGE) : W(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function ce(Me) {
    M !== Me && (Me ? e.frontFace(e.CW) : e.frontFace(e.CCW), M = Me);
  }
  function we(Me) {
    Me !== A1a ? (K(e.CULL_FACE), Me !== T && (Me === ZJt ? e.cullFace(e.BACK) : Me === S1a ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : W(e.CULL_FACE), T = Me;
  }
  function X(Me) {
    Me !== P && (F && e.lineWidth(Me), P = Me);
  }
  function Z(Me, Re, $e) {
    Me ? (K(e.POLYGON_OFFSET_FILL), (R !== Re || j !== $e) && (R = Re, j = $e, o.getReversed() && (Re = -Re), e.polygonOffset(Re, $e))) : W(e.POLYGON_OFFSET_FILL);
  }
  function re(Me) {
    Me ? K(e.SCISSOR_TEST) : W(e.SCISSOR_TEST);
  }
  function fe(Me) {
    Me === void 0 && (Me = e.TEXTURE0 + B - 1), z !== Me && (e.activeTexture(Me), z = Me);
  }
  function ye(Me, Re, $e) {
    $e === void 0 && (z === null ? $e = e.TEXTURE0 + B - 1 : $e = z);
    let rt = V[$e];
    rt === void 0 && (rt = {
      type: void 0,
      texture: void 0
    }, V[$e] = rt), (rt.type !== Me || rt.texture !== Re) && (z !== $e && (e.activeTexture($e), z = $e), e.bindTexture(Me, Re || Y[Me]), rt.type = Me, rt.texture = Re);
  }
  function ie() {
    const Me = V[z];
    Me !== void 0 && Me.type !== void 0 && (e.bindTexture(Me.type, null), Me.type = void 0, Me.texture = void 0);
  }
  function ae() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function be() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function Ee() {
    try {
      e.texSubImage2D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function xe() {
    try {
      e.texSubImage3D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function he() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function ue() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function ge() {
    try {
      e.texStorage2D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function _e() {
    try {
      e.texStorage3D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function ke() {
    try {
      e.texImage2D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function ve() {
    try {
      e.texImage3D(...arguments);
    } catch (Me) {
      vl("WebGLState:", Me);
    }
  }
  function Te(Me) {
    D.equals(Me) === !1 && (e.scissor(Me.x, Me.y, Me.z, Me.w), D.copy(Me));
  }
  function Ne(Me) {
    U.equals(Me) === !1 && (e.viewport(Me.x, Me.y, Me.z, Me.w), U.copy(Me));
  }
  function me(Me, Re) {
    let $e = d.get(Re);
    $e === void 0 && ($e = new WeakMap(), d.set(Re, $e));
    let rt = $e.get(Me);
    rt === void 0 && (rt = e.getUniformBlockIndex(Re, Me.name), $e.set(Me, rt));
  }
  function Ae(Me, Re) {
    const rt = d.get(Re).get(Me);
    l.get(Re) !== rt && (e.uniformBlockBinding(Re, rt, Me.__bindingPointIndex), l.set(Re, rt));
  }
  function Fe() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), u = {}, z = null, V = {}, h = {}, p = new WeakMap(), m = [], f = null, y = !1, b = null, v = null, _ = null, w = null, k = null, A = null, S = null, C = new so(0, 0, 0), I = 0, E = !1, M = null, T = null, P = null, R = null, j = null, D.set(0, 0, e.canvas.width, e.canvas.height), U.set(0, 0, e.canvas.width, e.canvas.height), i.reset(), o.reset(), s.reset();
  }
  return {
    buffers: {
      color: i,
      depth: o,
      stencil: s
    },
    enable: K,
    disable: W,
    bindFramebuffer: Q,
    drawBuffers: q,
    useProgram: ne,
    setBlending: J,
    setMaterial: pe,
    setFlipSided: ce,
    setCullFace: we,
    setLineWidth: X,
    setPolygonOffset: Z,
    setScissorTest: re,
    activeTexture: fe,
    bindTexture: ye,
    unbindTexture: ie,
    compressedTexImage2D: ae,
    compressedTexImage3D: be,
    texImage2D: ke,
    texImage3D: ve,
    updateUBOMapping: me,
    uniformBlockBinding: Ae,
    texStorage2D: ge,
    texStorage3D: _e,
    texSubImage2D: Ee,
    texSubImage3D: xe,
    compressedTexSubImage2D: he,
    compressedTexSubImage3D: ue,
    scissor: Te,
    viewport: Ne,
    reset: Fe
  };
}

function r3a(e, t, n, r, a, i, o) {
  const s = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
    l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    d = new Qi(),
    u = new WeakMap();
  let h;
  const p = new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function f(ie, ae) {
    return m ? new OffscreenCanvas(ie, ae) : P_e("canvas");
  }
  function y(ie, ae, be) {
    let Ee = 1;
    const xe = ye(ie);
    if ((xe.width > be || xe.height > be) && (Ee = be / Math.max(xe.width, xe.height)), Ee < 1) if (typeof HTMLImageElement < "u" && ie instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && ie instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && ie instanceof ImageBitmap || typeof VideoFrame < "u" && ie instanceof VideoFrame) {
      const he = Math.floor(Ee * xe.width),
        ue = Math.floor(Ee * xe.height);
      h === void 0 && (h = f(he, ue));
      const ge = ae ? f(he, ue) : h;
      return ge.width = he, ge.height = ue, ge.getContext("2d").drawImage(ie, 0, 0, he, ue), Es("WebGLRenderer: Texture has been resized from (" + xe.width + "x" + xe.height + ") to (" + he + "x" + ue + ")."), ge;
    } else return "data" in ie && Es("WebGLRenderer: Image in DataTexture is too big (" + xe.width + "x" + xe.height + ")."), ie;
    return ie;
  }
  function b(ie) {
    return ie.generateMipmaps;
  }
  function v(ie) {
    e.generateMipmap(ie);
  }
  function _(ie) {
    return ie.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : ie.isWebGL3DRenderTarget ? e.TEXTURE_3D : ie.isWebGLArrayRenderTarget || ie.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function w(ie, ae, be, Ee, xe = !1) {
    if (ie !== null) {
      if (e[ie] !== void 0) return e[ie];
      Es("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + ie + "'");
    }
    let he = ae;
    if (ae === e.RED && (be === e.FLOAT && (he = e.R32F), be === e.HALF_FLOAT && (he = e.R16F), be === e.UNSIGNED_BYTE && (he = e.R8)), ae === e.RED_INTEGER && (be === e.UNSIGNED_BYTE && (he = e.R8UI), be === e.UNSIGNED_SHORT && (he = e.R16UI), be === e.UNSIGNED_INT && (he = e.R32UI), be === e.BYTE && (he = e.R8I), be === e.SHORT && (he = e.R16I), be === e.INT && (he = e.R32I)), ae === e.RG && (be === e.FLOAT && (he = e.RG32F), be === e.HALF_FLOAT && (he = e.RG16F), be === e.UNSIGNED_BYTE && (he = e.RG8)), ae === e.RG_INTEGER && (be === e.UNSIGNED_BYTE && (he = e.RG8UI), be === e.UNSIGNED_SHORT && (he = e.RG16UI), be === e.UNSIGNED_INT && (he = e.RG32UI), be === e.BYTE && (he = e.RG8I), be === e.SHORT && (he = e.RG16I), be === e.INT && (he = e.RG32I)), ae === e.RGB_INTEGER && (be === e.UNSIGNED_BYTE && (he = e.RGB8UI), be === e.UNSIGNED_SHORT && (he = e.RGB16UI), be === e.UNSIGNED_INT && (he = e.RGB32UI), be === e.BYTE && (he = e.RGB8I), be === e.SHORT && (he = e.RGB16I), be === e.INT && (he = e.RGB32I)), ae === e.RGBA_INTEGER && (be === e.UNSIGNED_BYTE && (he = e.RGBA8UI), be === e.UNSIGNED_SHORT && (he = e.RGBA16UI), be === e.UNSIGNED_INT && (he = e.RGBA32UI), be === e.BYTE && (he = e.RGBA8I), be === e.SHORT && (he = e.RGBA16I), be === e.INT && (he = e.RGBA32I)), ae === e.RGB && (be === e.UNSIGNED_INT_5_9_9_9_REV && (he = e.RGB9_E5), be === e.UNSIGNED_INT_10F_11F_11F_REV && (he = e.R11F_G11F_B10F)), ae === e.RGBA) {
      const ue = xe ? XFe : vc.getTransfer(Ee);
      be === e.FLOAT && (he = e.RGBA32F), be === e.HALF_FLOAT && (he = e.RGBA16F), be === e.UNSIGNED_BYTE && (he = ue === Fh ? e.SRGB8_ALPHA8 : e.RGBA8), be === e.UNSIGNED_SHORT_4_4_4_4 && (he = e.RGBA4), be === e.UNSIGNED_SHORT_5_5_5_1 && (he = e.RGB5_A1);
    }
    return (he === e.R16F || he === e.R32F || he === e.RG16F || he === e.RG32F || he === e.RGBA16F || he === e.RGBA32F) && t.get("EXT_color_buffer_float"), he;
  }
  function k(ie, ae) {
    let be;
    return ie ? ae === null || ae === BP || ae === C_e ? be = e.DEPTH24_STENCIL8 : ae === Ck ? be = e.DEPTH32F_STENCIL8 : ae === I_e && (be = e.DEPTH24_STENCIL8, Es("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : ae === null || ae === BP || ae === C_e ? be = e.DEPTH_COMPONENT24 : ae === Ck ? be = e.DEPTH_COMPONENT32F : ae === I_e && (be = e.DEPTH_COMPONENT16), be;
  }
  function A(ie, ae) {
    return b(ie) === !0 || ie.isFramebufferTexture && ie.minFilter !== cg && ie.minFilter !== $m ? Math.log2(Math.max(ae.width, ae.height)) + 1 : ie.mipmaps !== void 0 && ie.mipmaps.length > 0 ? ie.mipmaps.length : ie.isCompressedTexture && Array.isArray(ie.image) ? ae.mipmaps.length : 1;
  }
  function S(ie) {
    const ae = ie.target;
    ae.removeEventListener("dispose", S), I(ae), ae.isVideoTexture && u.delete(ae);
  }
  function C(ie) {
    const ae = ie.target;
    ae.removeEventListener("dispose", C), M(ae);
  }
  function I(ie) {
    const ae = r.get(ie);
    if (ae.__webglInit === void 0) return;
    const be = ie.source,
      Ee = p.get(be);
    if (Ee) {
      const xe = Ee[ae.__cacheKey];
      xe.usedTimes--, xe.usedTimes === 0 && E(ie), Object.keys(Ee).length === 0 && p.delete(be);
    }
    r.remove(ie);
  }
  function E(ie) {
    const ae = r.get(ie);
    e.deleteTexture(ae.__webglTexture);
    const be = ie.source,
      Ee = p.get(be);
    delete Ee[ae.__cacheKey], o.memory.textures--;
  }
  function M(ie) {
    const ae = r.get(ie);
    if (ie.depthTexture && (ie.depthTexture.dispose(), r.remove(ie.depthTexture)), ie.isWebGLCubeRenderTarget) for (let Ee = 0; Ee < 6; Ee++) {
      if (Array.isArray(ae.__webglFramebuffer[Ee])) for (let xe = 0; xe < ae.__webglFramebuffer[Ee].length; xe++) e.deleteFramebuffer(ae.__webglFramebuffer[Ee][xe]);else e.deleteFramebuffer(ae.__webglFramebuffer[Ee]);
      ae.__webglDepthbuffer && e.deleteRenderbuffer(ae.__webglDepthbuffer[Ee]);
    } else {
      if (Array.isArray(ae.__webglFramebuffer)) for (let Ee = 0; Ee < ae.__webglFramebuffer.length; Ee++) e.deleteFramebuffer(ae.__webglFramebuffer[Ee]);else e.deleteFramebuffer(ae.__webglFramebuffer);
      if (ae.__webglDepthbuffer && e.deleteRenderbuffer(ae.__webglDepthbuffer), ae.__webglMultisampledFramebuffer && e.deleteFramebuffer(ae.__webglMultisampledFramebuffer), ae.__webglColorRenderbuffer) for (let Ee = 0; Ee < ae.__webglColorRenderbuffer.length; Ee++) ae.__webglColorRenderbuffer[Ee] && e.deleteRenderbuffer(ae.__webglColorRenderbuffer[Ee]);
      ae.__webglDepthRenderbuffer && e.deleteRenderbuffer(ae.__webglDepthRenderbuffer);
    }
    const be = ie.textures;
    for (let Ee = 0, xe = be.length; Ee < xe; Ee++) {
      const he = r.get(be[Ee]);
      he.__webglTexture && (e.deleteTexture(he.__webglTexture), o.memory.textures--), r.remove(be[Ee]);
    }
    r.remove(ie);
  }
  let T = 0;
  function P() {
    T = 0;
  }
  function R() {
    const ie = T;
    return ie >= a.maxTextures && Es("WebGLTextures: Trying to use " + ie + " texture units while this GPU supports only " + a.maxTextures), T += 1, ie;
  }
  function j(ie) {
    const ae = [];
    return ae.push(ie.wrapS), ae.push(ie.wrapT), ae.push(ie.wrapR || 0), ae.push(ie.magFilter), ae.push(ie.minFilter), ae.push(ie.anisotropy), ae.push(ie.internalFormat), ae.push(ie.format), ae.push(ie.type), ae.push(ie.generateMipmaps), ae.push(ie.premultiplyAlpha), ae.push(ie.flipY), ae.push(ie.unpackAlignment), ae.push(ie.colorSpace), ae.join();
  }
  function B(ie, ae) {
    const be = r.get(ie);
    if (ie.isVideoTexture && re(ie), ie.isRenderTargetTexture === !1 && ie.isExternalTexture !== !0 && ie.version > 0 && be.__version !== ie.version) {
      const Ee = ie.image;
      if (Ee === null) Es("WebGLRenderer: Texture marked for update but no image data found.");else if (Ee.complete === !1) Es("WebGLRenderer: Texture marked for update but image is incomplete");else {
        Y(be, ie, ae);
        return;
      }
    } else ie.isExternalTexture && (be.__webglTexture = ie.sourceTexture ? ie.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D, be.__webglTexture, e.TEXTURE0 + ae);
  }
  function F(ie, ae) {
    const be = r.get(ie);
    if (ie.isRenderTargetTexture === !1 && ie.version > 0 && be.__version !== ie.version) {
      Y(be, ie, ae);
      return;
    } else ie.isExternalTexture && (be.__webglTexture = ie.sourceTexture ? ie.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D_ARRAY, be.__webglTexture, e.TEXTURE0 + ae);
  }
  function N(ie, ae) {
    const be = r.get(ie);
    if (ie.isRenderTargetTexture === !1 && ie.version > 0 && be.__version !== ie.version) {
      Y(be, ie, ae);
      return;
    }
    n.bindTexture(e.TEXTURE_3D, be.__webglTexture, e.TEXTURE0 + ae);
  }
  function G(ie, ae) {
    const be = r.get(ie);
    if (ie.isCubeDepthTexture !== !0 && ie.version > 0 && be.__version !== ie.version) {
      K(be, ie, ae);
      return;
    }
    n.bindTexture(e.TEXTURE_CUBE_MAP, be.__webglTexture, e.TEXTURE0 + ae);
  }
  const z = {
      [e$]: e.REPEAT,
      [hy]: e.CLAMP_TO_EDGE,
      [QFe]: e.MIRRORED_REPEAT
    },
    V = {
      [cg]: e.NEAREST,
      [Iqn]: e.NEAREST_MIPMAP_NEAREST,
      [T0e]: e.NEAREST_MIPMAP_LINEAR,
      [$m]: e.LINEAR,
      [CNe]: e.LINEAR_MIPMAP_NEAREST,
      [A7]: e.LINEAR_MIPMAP_LINEAR
    },
    O = {
      [Z1a]: e.NEVER,
      [awa]: e.ALWAYS,
      [ewa]: e.LESS,
      [Vjt]: e.LEQUAL,
      [twa]: e.EQUAL,
      [Hjt]: e.GEQUAL,
      [nwa]: e.GREATER,
      [rwa]: e.NOTEQUAL
    };
  function L(ie, ae) {
    if (ae.type === Ck && t.has("OES_texture_float_linear") === !1 && (ae.magFilter === $m || ae.magFilter === CNe || ae.magFilter === T0e || ae.magFilter === A7 || ae.minFilter === $m || ae.minFilter === CNe || ae.minFilter === T0e || ae.minFilter === A7) && Es("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(ie, e.TEXTURE_WRAP_S, z[ae.wrapS]), e.texParameteri(ie, e.TEXTURE_WRAP_T, z[ae.wrapT]), (ie === e.TEXTURE_3D || ie === e.TEXTURE_2D_ARRAY) && e.texParameteri(ie, e.TEXTURE_WRAP_R, z[ae.wrapR]), e.texParameteri(ie, e.TEXTURE_MAG_FILTER, V[ae.magFilter]), e.texParameteri(ie, e.TEXTURE_MIN_FILTER, V[ae.minFilter]), ae.compareFunction && (e.texParameteri(ie, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(ie, e.TEXTURE_COMPARE_FUNC, O[ae.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (ae.magFilter === cg || ae.minFilter !== T0e && ae.minFilter !== A7 || ae.type === Ck && t.has("OES_texture_float_linear") === !1) return;
      if (ae.anisotropy > 1 || r.get(ae).__currentAnisotropy) {
        const be = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(ie, be.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(ae.anisotropy, a.getMaxAnisotropy())), r.get(ae).__currentAnisotropy = ae.anisotropy;
      }
    }
  }
  function D(ie, ae) {
    let be = !1;
    ie.__webglInit === void 0 && (ie.__webglInit = !0, ae.addEventListener("dispose", S));
    const Ee = ae.source;
    let xe = p.get(Ee);
    xe === void 0 && (xe = {}, p.set(Ee, xe));
    const he = j(ae);
    if (he !== ie.__cacheKey) {
      xe[he] === void 0 && (xe[he] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, be = !0), xe[he].usedTimes++;
      const ue = xe[ie.__cacheKey];
      ue !== void 0 && (xe[ie.__cacheKey].usedTimes--, ue.usedTimes === 0 && E(ae)), ie.__cacheKey = he, ie.__webglTexture = xe[he].texture;
    }
    return be;
  }
  function U(ie, ae, be) {
    return Math.floor(Math.floor(ie / be) / ae);
  }
  function H(ie, ae, be, Ee) {
    const he = ie.updateRanges;
    if (he.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ae.width, ae.height, be, Ee, ae.data);else {
      he.sort((ve, Te) => ve.start - Te.start);
      let ue = 0;
      for (let ve = 1; ve < he.length; ve++) {
        const Te = he[ue],
          Ne = he[ve],
          me = Te.start + Te.count,
          Ae = U(Ne.start, ae.width, 4),
          Fe = U(Te.start, ae.width, 4);
        Ne.start <= me + 1 && Ae === Fe && U(Ne.start + Ne.count - 1, ae.width, 4) === Ae ? Te.count = Math.max(Te.count, Ne.start + Ne.count - Te.start) : (++ue, he[ue] = Ne);
      }
      he.length = ue + 1;
      const ge = e.getParameter(e.UNPACK_ROW_LENGTH),
        _e = e.getParameter(e.UNPACK_SKIP_PIXELS),
        ke = e.getParameter(e.UNPACK_SKIP_ROWS);
      e.pixelStorei(e.UNPACK_ROW_LENGTH, ae.width);
      for (let ve = 0, Te = he.length; ve < Te; ve++) {
        const Ne = he[ve],
          me = Math.floor(Ne.start / 4),
          Ae = Math.ceil(Ne.count / 4),
          Fe = me % ae.width,
          Me = Math.floor(me / ae.width),
          Re = Ae,
          $e = 1;
        e.pixelStorei(e.UNPACK_SKIP_PIXELS, Fe), e.pixelStorei(e.UNPACK_SKIP_ROWS, Me), n.texSubImage2D(e.TEXTURE_2D, 0, Fe, Me, Re, $e, be, Ee, ae.data);
      }
      ie.clearUpdateRanges(), e.pixelStorei(e.UNPACK_ROW_LENGTH, ge), e.pixelStorei(e.UNPACK_SKIP_PIXELS, _e), e.pixelStorei(e.UNPACK_SKIP_ROWS, ke);
    }
  }
  function Y(ie, ae, be) {
    let Ee = e.TEXTURE_2D;
    (ae.isDataArrayTexture || ae.isCompressedArrayTexture) && (Ee = e.TEXTURE_2D_ARRAY), ae.isData3DTexture && (Ee = e.TEXTURE_3D);
    const xe = D(ie, ae),
      he = ae.source;
    n.bindTexture(Ee, ie.__webglTexture, e.TEXTURE0 + be);
    const ue = r.get(he);
    if (he.version !== ue.__version || xe === !0) {
      n.activeTexture(e.TEXTURE0 + be);
      const ge = vc.getPrimaries(vc.workingColorSpace),
        _e = ae.colorSpace === $O ? null : vc.getPrimaries(ae.colorSpace),
        ke = ae.colorSpace === $O || ge === _e ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, ae.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, ae.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, ae.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, ke);
      let ve = y(ae.image, !1, a.maxTextureSize);
      ve = fe(ae, ve);
      const Te = i.convert(ae.format, ae.colorSpace),
        Ne = i.convert(ae.type);
      let me = w(ae.internalFormat, Te, Ne, ae.colorSpace, ae.isVideoTexture);
      L(Ee, ae);
      let Ae;
      const Fe = ae.mipmaps,
        Me = ae.isVideoTexture !== !0,
        Re = ue.__version === void 0 || xe === !0,
        $e = he.dataReady,
        rt = A(ae, ve);
      if (ae.isDepthTexture) me = k(ae.format === pW, ae.type), Re && (Me ? n.texStorage2D(e.TEXTURE_2D, 1, me, ve.width, ve.height) : n.texImage2D(e.TEXTURE_2D, 0, me, ve.width, ve.height, 0, Te, Ne, null));else if (ae.isDataTexture) {
        if (Fe.length > 0) {
          Me && Re && n.texStorage2D(e.TEXTURE_2D, rt, me, Fe[0].width, Fe[0].height);
          for (let nt = 0, ze = Fe.length; nt < ze; nt++) Ae = Fe[nt], Me ? $e && n.texSubImage2D(e.TEXTURE_2D, nt, 0, 0, Ae.width, Ae.height, Te, Ne, Ae.data) : n.texImage2D(e.TEXTURE_2D, nt, me, Ae.width, Ae.height, 0, Te, Ne, Ae.data);
          ae.generateMipmaps = !1;
        } else Me ? (Re && n.texStorage2D(e.TEXTURE_2D, rt, me, ve.width, ve.height), $e && H(ae, ve, Te, Ne)) : n.texImage2D(e.TEXTURE_2D, 0, me, ve.width, ve.height, 0, Te, Ne, ve.data);
      } else if (ae.isCompressedTexture) {
        if (ae.isCompressedArrayTexture) {
          Me && Re && n.texStorage3D(e.TEXTURE_2D_ARRAY, rt, me, Fe[0].width, Fe[0].height, ve.depth);
          for (let nt = 0, ze = Fe.length; nt < ze; nt++) if (Ae = Fe[nt], ae.format !== W1) {
            if (Te !== null) {
              if (Me) {
                if ($e) if (ae.layerUpdates.size > 0) {
                  const Le = ten(Ae.width, Ae.height, ae.format, ae.type);
                  for (const Ke of ae.layerUpdates) {
                    const Xe = Ae.data.subarray(Ke * Le / Ae.data.BYTES_PER_ELEMENT, (Ke + 1) * Le / Ae.data.BYTES_PER_ELEMENT);
                    n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, nt, 0, 0, Ke, Ae.width, Ae.height, 1, Te, Xe);
                  }
                  ae.clearLayerUpdates();
                } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, nt, 0, 0, 0, Ae.width, Ae.height, ve.depth, Te, Ae.data);
              } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, nt, me, Ae.width, Ae.height, ve.depth, 0, Ae.data, 0, 0);
            } else Es("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          } else Me ? $e && n.texSubImage3D(e.TEXTURE_2D_ARRAY, nt, 0, 0, 0, Ae.width, Ae.height, ve.depth, Te, Ne, Ae.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, nt, me, Ae.width, Ae.height, ve.depth, 0, Te, Ne, Ae.data);
        } else {
          Me && Re && n.texStorage2D(e.TEXTURE_2D, rt, me, Fe[0].width, Fe[0].height);
          for (let nt = 0, ze = Fe.length; nt < ze; nt++) Ae = Fe[nt], ae.format !== W1 ? Te !== null ? Me ? $e && n.compressedTexSubImage2D(e.TEXTURE_2D, nt, 0, 0, Ae.width, Ae.height, Te, Ae.data) : n.compressedTexImage2D(e.TEXTURE_2D, nt, me, Ae.width, Ae.height, 0, Ae.data) : Es("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Me ? $e && n.texSubImage2D(e.TEXTURE_2D, nt, 0, 0, Ae.width, Ae.height, Te, Ne, Ae.data) : n.texImage2D(e.TEXTURE_2D, nt, me, Ae.width, Ae.height, 0, Te, Ne, Ae.data);
        }
      } else if (ae.isDataArrayTexture) {
        if (Me) {
          if (Re && n.texStorage3D(e.TEXTURE_2D_ARRAY, rt, me, ve.width, ve.height, ve.depth), $e) if (ae.layerUpdates.size > 0) {
            const nt = ten(ve.width, ve.height, ae.format, ae.type);
            for (const ze of ae.layerUpdates) {
              const Le = ve.data.subarray(ze * nt / ve.data.BYTES_PER_ELEMENT, (ze + 1) * nt / ve.data.BYTES_PER_ELEMENT);
              n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, ze, ve.width, ve.height, 1, Te, Ne, Le);
            }
            ae.clearLayerUpdates();
          } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, ve.width, ve.height, ve.depth, Te, Ne, ve.data);
        } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, me, ve.width, ve.height, ve.depth, 0, Te, Ne, ve.data);
      } else if (ae.isData3DTexture) Me ? (Re && n.texStorage3D(e.TEXTURE_3D, rt, me, ve.width, ve.height, ve.depth), $e && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, ve.width, ve.height, ve.depth, Te, Ne, ve.data)) : n.texImage3D(e.TEXTURE_3D, 0, me, ve.width, ve.height, ve.depth, 0, Te, Ne, ve.data);else if (ae.isFramebufferTexture) {
        if (Re) if (Me) n.texStorage2D(e.TEXTURE_2D, rt, me, ve.width, ve.height);else {
          let nt = ve.width,
            ze = ve.height;
          for (let Le = 0; Le < rt; Le++) n.texImage2D(e.TEXTURE_2D, Le, me, nt, ze, 0, Te, Ne, null), nt >>= 1, ze >>= 1;
        }
      } else if (Fe.length > 0) {
        if (Me && Re) {
          const nt = ye(Fe[0]);
          n.texStorage2D(e.TEXTURE_2D, rt, me, nt.width, nt.height);
        }
        for (let nt = 0, ze = Fe.length; nt < ze; nt++) Ae = Fe[nt], Me ? $e && n.texSubImage2D(e.TEXTURE_2D, nt, 0, 0, Te, Ne, Ae) : n.texImage2D(e.TEXTURE_2D, nt, me, Te, Ne, Ae);
        ae.generateMipmaps = !1;
      } else if (Me) {
        if (Re) {
          const nt = ye(ve);
          n.texStorage2D(e.TEXTURE_2D, rt, me, nt.width, nt.height);
        }
        $e && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, Te, Ne, ve);
      } else n.texImage2D(e.TEXTURE_2D, 0, me, Te, Ne, ve);
      b(ae) && v(Ee), ue.__version = he.version, ae.onUpdate && ae.onUpdate(ae);
    }
    ie.__version = ae.version;
  }
  function K(ie, ae, be) {
    if (ae.image.length !== 6) return;
    const Ee = D(ie, ae),
      xe = ae.source;
    n.bindTexture(e.TEXTURE_CUBE_MAP, ie.__webglTexture, e.TEXTURE0 + be);
    const he = r.get(xe);
    if (xe.version !== he.__version || Ee === !0) {
      n.activeTexture(e.TEXTURE0 + be);
      const ue = vc.getPrimaries(vc.workingColorSpace),
        ge = ae.colorSpace === $O ? null : vc.getPrimaries(ae.colorSpace),
        _e = ae.colorSpace === $O || ue === ge ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, ae.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, ae.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, ae.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, _e);
      const ke = ae.isCompressedTexture || ae.image[0].isCompressedTexture,
        ve = ae.image[0] && ae.image[0].isDataTexture,
        Te = [];
      for (let ze = 0; ze < 6; ze++) !ke && !ve ? Te[ze] = y(ae.image[ze], !0, a.maxCubemapSize) : Te[ze] = ve ? ae.image[ze].image : ae.image[ze], Te[ze] = fe(ae, Te[ze]);
      const Ne = Te[0],
        me = i.convert(ae.format, ae.colorSpace),
        Ae = i.convert(ae.type),
        Fe = w(ae.internalFormat, me, Ae, ae.colorSpace),
        Me = ae.isVideoTexture !== !0,
        Re = he.__version === void 0 || Ee === !0,
        $e = xe.dataReady;
      let rt = A(ae, Ne);
      L(e.TEXTURE_CUBE_MAP, ae);
      let nt;
      if (ke) {
        Me && Re && n.texStorage2D(e.TEXTURE_CUBE_MAP, rt, Fe, Ne.width, Ne.height);
        for (let ze = 0; ze < 6; ze++) {
          nt = Te[ze].mipmaps;
          for (let Le = 0; Le < nt.length; Le++) {
            const Ke = nt[Le];
            ae.format !== W1 ? me !== null ? Me ? $e && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le, 0, 0, Ke.width, Ke.height, me, Ke.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le, Fe, Ke.width, Ke.height, 0, Ke.data) : Es("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Me ? $e && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le, 0, 0, Ke.width, Ke.height, me, Ae, Ke.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le, Fe, Ke.width, Ke.height, 0, me, Ae, Ke.data);
          }
        }
      } else {
        if (nt = ae.mipmaps, Me && Re) {
          nt.length > 0 && rt++;
          const ze = ye(Te[0]);
          n.texStorage2D(e.TEXTURE_CUBE_MAP, rt, Fe, ze.width, ze.height);
        }
        for (let ze = 0; ze < 6; ze++) if (ve) {
          Me ? $e && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, 0, 0, 0, Te[ze].width, Te[ze].height, me, Ae, Te[ze].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, 0, Fe, Te[ze].width, Te[ze].height, 0, me, Ae, Te[ze].data);
          for (let Le = 0; Le < nt.length; Le++) {
            const Xe = nt[Le].image[ze].image;
            Me ? $e && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le + 1, 0, 0, Xe.width, Xe.height, me, Ae, Xe.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le + 1, Fe, Xe.width, Xe.height, 0, me, Ae, Xe.data);
          }
        } else {
          Me ? $e && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, 0, 0, 0, me, Ae, Te[ze]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, 0, Fe, me, Ae, Te[ze]);
          for (let Le = 0; Le < nt.length; Le++) {
            const Ke = nt[Le];
            Me ? $e && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le + 1, 0, 0, me, Ae, Ke.image[ze]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + ze, Le + 1, Fe, me, Ae, Ke.image[ze]);
          }
        }
      }
      b(ae) && v(e.TEXTURE_CUBE_MAP), he.__version = xe.version, ae.onUpdate && ae.onUpdate(ae);
    }
    ie.__version = ae.version;
  }
  function W(ie, ae, be, Ee, xe, he) {
    const ue = i.convert(be.format, be.colorSpace),
      ge = i.convert(be.type),
      _e = w(be.internalFormat, ue, ge, be.colorSpace),
      ke = r.get(ae),
      ve = r.get(be);
    if (ve.__renderTarget = ae, !ke.__hasExternalTextures) {
      const Te = Math.max(1, ae.width >> he),
        Ne = Math.max(1, ae.height >> he);
      xe === e.TEXTURE_3D || xe === e.TEXTURE_2D_ARRAY ? n.texImage3D(xe, he, _e, Te, Ne, ae.depth, 0, ue, ge, null) : n.texImage2D(xe, he, _e, Te, Ne, 0, ue, ge, null);
    }
    n.bindFramebuffer(e.FRAMEBUFFER, ie), Z(ae) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, Ee, xe, ve.__webglTexture, 0, X(ae)) : (xe === e.TEXTURE_2D || xe >= e.TEXTURE_CUBE_MAP_POSITIVE_X && xe <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, Ee, xe, ve.__webglTexture, he), n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Q(ie, ae, be) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, ie), ae.depthBuffer) {
      const Ee = ae.depthTexture,
        xe = Ee && Ee.isDepthTexture ? Ee.type : null,
        he = k(ae.stencilBuffer, xe),
        ue = ae.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      Z(ae) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, X(ae), he, ae.width, ae.height) : be ? e.renderbufferStorageMultisample(e.RENDERBUFFER, X(ae), he, ae.width, ae.height) : e.renderbufferStorage(e.RENDERBUFFER, he, ae.width, ae.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, ue, e.RENDERBUFFER, ie);
    } else {
      const Ee = ae.textures;
      for (let xe = 0; xe < Ee.length; xe++) {
        const he = Ee[xe],
          ue = i.convert(he.format, he.colorSpace),
          ge = i.convert(he.type),
          _e = w(he.internalFormat, ue, ge, he.colorSpace);
        Z(ae) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, X(ae), _e, ae.width, ae.height) : be ? e.renderbufferStorageMultisample(e.RENDERBUFFER, X(ae), _e, ae.width, ae.height) : e.renderbufferStorage(e.RENDERBUFFER, _e, ae.width, ae.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function q(ie, ae, be) {
    const Ee = ae.isWebGLCubeRenderTarget === !0;
    if (n.bindFramebuffer(e.FRAMEBUFFER, ie), !(ae.depthTexture && ae.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const xe = r.get(ae.depthTexture);
    if (xe.__renderTarget = ae, (!xe.__webglTexture || ae.depthTexture.image.width !== ae.width || ae.depthTexture.image.height !== ae.height) && (ae.depthTexture.image.width = ae.width, ae.depthTexture.image.height = ae.height, ae.depthTexture.needsUpdate = !0), Ee) {
      if (xe.__webglInit === void 0 && (xe.__webglInit = !0, ae.depthTexture.addEventListener("dispose", S)), xe.__webglTexture === void 0) {
        xe.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, xe.__webglTexture), L(e.TEXTURE_CUBE_MAP, ae.depthTexture);
        const ke = i.convert(ae.depthTexture.format),
          ve = i.convert(ae.depthTexture.type);
        let Te;
        ae.depthTexture.format === iD ? Te = e.DEPTH_COMPONENT24 : ae.depthTexture.format === pW && (Te = e.DEPTH24_STENCIL8);
        for (let Ne = 0; Ne < 6; Ne++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + Ne, 0, Te, ae.width, ae.height, 0, ke, ve, null);
      }
    } else B(ae.depthTexture, 0);
    const he = xe.__webglTexture,
      ue = X(ae),
      ge = Ee ? e.TEXTURE_CUBE_MAP_POSITIVE_X + be : e.TEXTURE_2D,
      _e = ae.depthTexture.format === pW ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (ae.depthTexture.format === iD) Z(ae) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, _e, ge, he, 0, ue) : e.framebufferTexture2D(e.FRAMEBUFFER, _e, ge, he, 0);else if (ae.depthTexture.format === pW) Z(ae) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, _e, ge, he, 0, ue) : e.framebufferTexture2D(e.FRAMEBUFFER, _e, ge, he, 0);else throw new Error("Unknown depthTexture format");
  }
  function ne(ie) {
    const ae = r.get(ie),
      be = ie.isWebGLCubeRenderTarget === !0;
    if (ae.__boundDepthTexture !== ie.depthTexture) {
      const Ee = ie.depthTexture;
      if (ae.__depthDisposeCallback && ae.__depthDisposeCallback(), Ee) {
        const xe = () => {
          delete ae.__boundDepthTexture, delete ae.__depthDisposeCallback, Ee.removeEventListener("dispose", xe);
        };
        Ee.addEventListener("dispose", xe), ae.__depthDisposeCallback = xe;
      }
      ae.__boundDepthTexture = Ee;
    }
    if (ie.depthTexture && !ae.__autoAllocateDepthBuffer) {
      if (be) for (let Ee = 0; Ee < 6; Ee++) q(ae.__webglFramebuffer[Ee], ie, Ee);else {
        const Ee = ie.texture.mipmaps;
        Ee && Ee.length > 0 ? q(ae.__webglFramebuffer[0], ie, 0) : q(ae.__webglFramebuffer, ie, 0);
      }
    } else if (be) {
      ae.__webglDepthbuffer = [];
      for (let Ee = 0; Ee < 6; Ee++) if (n.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer[Ee]), ae.__webglDepthbuffer[Ee] === void 0) ae.__webglDepthbuffer[Ee] = e.createRenderbuffer(), Q(ae.__webglDepthbuffer[Ee], ie, !1);else {
        const xe = ie.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          he = ae.__webglDepthbuffer[Ee];
        e.bindRenderbuffer(e.RENDERBUFFER, he), e.framebufferRenderbuffer(e.FRAMEBUFFER, xe, e.RENDERBUFFER, he);
      }
    } else {
      const Ee = ie.texture.mipmaps;
      if (Ee && Ee.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer), ae.__webglDepthbuffer === void 0) ae.__webglDepthbuffer = e.createRenderbuffer(), Q(ae.__webglDepthbuffer, ie, !1);else {
        const xe = ie.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          he = ae.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, he), e.framebufferRenderbuffer(e.FRAMEBUFFER, xe, e.RENDERBUFFER, he);
      }
    }
    n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function de(ie, ae, be) {
    const Ee = r.get(ie);
    ae !== void 0 && W(Ee.__webglFramebuffer, ie, ie.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), be !== void 0 && ne(ie);
  }
  function le(ie) {
    const ae = ie.texture,
      be = r.get(ie),
      Ee = r.get(ae);
    ie.addEventListener("dispose", C);
    const xe = ie.textures,
      he = ie.isWebGLCubeRenderTarget === !0,
      ue = xe.length > 1;
    if (ue || (Ee.__webglTexture === void 0 && (Ee.__webglTexture = e.createTexture()), Ee.__version = ae.version, o.memory.textures++), he) {
      be.__webglFramebuffer = [];
      for (let ge = 0; ge < 6; ge++) if (ae.mipmaps && ae.mipmaps.length > 0) {
        be.__webglFramebuffer[ge] = [];
        for (let _e = 0; _e < ae.mipmaps.length; _e++) be.__webglFramebuffer[ge][_e] = e.createFramebuffer();
      } else be.__webglFramebuffer[ge] = e.createFramebuffer();
    } else {
      if (ae.mipmaps && ae.mipmaps.length > 0) {
        be.__webglFramebuffer = [];
        for (let ge = 0; ge < ae.mipmaps.length; ge++) be.__webglFramebuffer[ge] = e.createFramebuffer();
      } else be.__webglFramebuffer = e.createFramebuffer();
      if (ue) for (let ge = 0, _e = xe.length; ge < _e; ge++) {
        const ke = r.get(xe[ge]);
        ke.__webglTexture === void 0 && (ke.__webglTexture = e.createTexture(), o.memory.textures++);
      }
      if (ie.samples > 0 && Z(ie) === !1) {
        be.__webglMultisampledFramebuffer = e.createFramebuffer(), be.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, be.__webglMultisampledFramebuffer);
        for (let ge = 0; ge < xe.length; ge++) {
          const _e = xe[ge];
          be.__webglColorRenderbuffer[ge] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, be.__webglColorRenderbuffer[ge]);
          const ke = i.convert(_e.format, _e.colorSpace),
            ve = i.convert(_e.type),
            Te = w(_e.internalFormat, ke, ve, _e.colorSpace, ie.isXRRenderTarget === !0),
            Ne = X(ie);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Ne, Te, ie.width, ie.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ge, e.RENDERBUFFER, be.__webglColorRenderbuffer[ge]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), ie.depthBuffer && (be.__webglDepthRenderbuffer = e.createRenderbuffer(), Q(be.__webglDepthRenderbuffer, ie, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (he) {
      n.bindTexture(e.TEXTURE_CUBE_MAP, Ee.__webglTexture), L(e.TEXTURE_CUBE_MAP, ae);
      for (let ge = 0; ge < 6; ge++) if (ae.mipmaps && ae.mipmaps.length > 0) for (let _e = 0; _e < ae.mipmaps.length; _e++) W(be.__webglFramebuffer[ge][_e], ie, ae, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + ge, _e);else W(be.__webglFramebuffer[ge], ie, ae, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + ge, 0);
      b(ae) && v(e.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (ue) {
      for (let ge = 0, _e = xe.length; ge < _e; ge++) {
        const ke = xe[ge],
          ve = r.get(ke);
        let Te = e.TEXTURE_2D;
        (ie.isWebGL3DRenderTarget || ie.isWebGLArrayRenderTarget) && (Te = ie.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(Te, ve.__webglTexture), L(Te, ke), W(be.__webglFramebuffer, ie, ke, e.COLOR_ATTACHMENT0 + ge, Te, 0), b(ke) && v(Te);
      }
      n.unbindTexture();
    } else {
      let ge = e.TEXTURE_2D;
      if ((ie.isWebGL3DRenderTarget || ie.isWebGLArrayRenderTarget) && (ge = ie.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(ge, Ee.__webglTexture), L(ge, ae), ae.mipmaps && ae.mipmaps.length > 0) for (let _e = 0; _e < ae.mipmaps.length; _e++) W(be.__webglFramebuffer[_e], ie, ae, e.COLOR_ATTACHMENT0, ge, _e);else W(be.__webglFramebuffer, ie, ae, e.COLOR_ATTACHMENT0, ge, 0);
      b(ae) && v(ge), n.unbindTexture();
    }
    ie.depthBuffer && ne(ie);
  }
  function J(ie) {
    const ae = ie.textures;
    for (let be = 0, Ee = ae.length; be < Ee; be++) {
      const xe = ae[be];
      if (b(xe)) {
        const he = _(ie),
          ue = r.get(xe).__webglTexture;
        n.bindTexture(he, ue), v(he), n.unbindTexture();
      }
    }
  }
  const pe = [],
    ce = [];
  function we(ie) {
    if (ie.samples > 0) {
      if (Z(ie) === !1) {
        const ae = ie.textures,
          be = ie.width,
          Ee = ie.height;
        let xe = e.COLOR_BUFFER_BIT;
        const he = ie.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          ue = r.get(ie),
          ge = ae.length > 1;
        if (ge) for (let ke = 0; ke < ae.length; ke++) n.bindFramebuffer(e.FRAMEBUFFER, ue.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ke, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, ue.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ke, e.TEXTURE_2D, null, 0);
        n.bindFramebuffer(e.READ_FRAMEBUFFER, ue.__webglMultisampledFramebuffer);
        const _e = ie.texture.mipmaps;
        _e && _e.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, ue.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, ue.__webglFramebuffer);
        for (let ke = 0; ke < ae.length; ke++) {
          if (ie.resolveDepthBuffer && (ie.depthBuffer && (xe |= e.DEPTH_BUFFER_BIT), ie.stencilBuffer && ie.resolveStencilBuffer && (xe |= e.STENCIL_BUFFER_BIT)), ge) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, ue.__webglColorRenderbuffer[ke]);
            const ve = r.get(ae[ke]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, ve, 0);
          }
          e.blitFramebuffer(0, 0, be, Ee, 0, 0, be, Ee, xe, e.NEAREST), l === !0 && (pe.length = 0, ce.length = 0, pe.push(e.COLOR_ATTACHMENT0 + ke), ie.depthBuffer && ie.resolveDepthBuffer === !1 && (pe.push(he), ce.push(he), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, ce)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, pe));
        }
        if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), ge) for (let ke = 0; ke < ae.length; ke++) {
          n.bindFramebuffer(e.FRAMEBUFFER, ue.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ke, e.RENDERBUFFER, ue.__webglColorRenderbuffer[ke]);
          const ve = r.get(ae[ke]).__webglTexture;
          n.bindFramebuffer(e.FRAMEBUFFER, ue.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ke, e.TEXTURE_2D, ve, 0);
        }
        n.bindFramebuffer(e.DRAW_FRAMEBUFFER, ue.__webglMultisampledFramebuffer);
      } else if (ie.depthBuffer && ie.resolveDepthBuffer === !1 && l) {
        const ae = ie.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [ae]);
      }
    }
  }
  function X(ie) {
    return Math.min(a.maxSamples, ie.samples);
  }
  function Z(ie) {
    const ae = r.get(ie);
    return ie.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && ae.__useRenderToTexture !== !1;
  }
  function re(ie) {
    const ae = o.render.frame;
    u.get(ie) !== ae && (u.set(ie, ae), ie.update());
  }
  function fe(ie, ae) {
    const be = ie.colorSpace,
      Ee = ie.format,
      xe = ie.type;
    return ie.isCompressedTexture === !0 || ie.isVideoTexture === !0 || be !== l_ && be !== $O && (vc.getTransfer(be) === Fh ? (Ee !== W1 || xe !== bk) && Es("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : vl("WebGLTextures: Unsupported texture color space:", be)), ae;
  }
  function ye(ie) {
    return typeof HTMLImageElement < "u" && ie instanceof HTMLImageElement ? (d.width = ie.naturalWidth || ie.width, d.height = ie.naturalHeight || ie.height) : typeof VideoFrame < "u" && ie instanceof VideoFrame ? (d.width = ie.displayWidth, d.height = ie.displayHeight) : (d.width = ie.width, d.height = ie.height), d;
  }
  this.allocateTextureUnit = R, this.resetTextureUnits = P, this.setTexture2D = B, this.setTexture2DArray = F, this.setTexture3D = N, this.setTextureCube = G, this.rebindTextures = de, this.setupRenderTarget = le, this.updateRenderTargetMipmap = J, this.updateMultisampleRenderTarget = we, this.setupDepthRenderbuffer = ne, this.setupFrameBufferTexture = W, this.useMultisampledRTT = Z, this.isReversedDepthBuffer = function () {
    return n.buffers.depth.getReversed();
  };
}

function a3a(e, t) {
  function n(r, a = $O) {
    let i;
    const o = vc.getTransfer(a);
    if (r === bk) return e.UNSIGNED_BYTE;
    if (r === Ljt) return e.UNSIGNED_SHORT_4_4_4_4;
    if (r === Ojt) return e.UNSIGNED_SHORT_5_5_5_1;
    if (r === Tqn) return e.UNSIGNED_INT_5_9_9_9_REV;
    if (r === Mqn) return e.UNSIGNED_INT_10F_11F_11F_REV;
    if (r === Cqn) return e.BYTE;
    if (r === Eqn) return e.SHORT;
    if (r === I_e) return e.UNSIGNED_SHORT;
    if (r === Djt) return e.INT;
    if (r === BP) return e.UNSIGNED_INT;
    if (r === Ck) return e.FLOAT;
    if (r === hT) return e.HALF_FLOAT;
    if (r === Pqn) return e.ALPHA;
    if (r === Rqn) return e.RGB;
    if (r === W1) return e.RGBA;
    if (r === iD) return e.DEPTH_COMPONENT;
    if (r === pW) return e.DEPTH_STENCIL;
    if (r === Bjt) return e.RED;
    if (r === Fjt) return e.RED_INTEGER;
    if (r === rde) return e.RG;
    if (r === zjt) return e.RG_INTEGER;
    if (r === Ujt) return e.RGBA_INTEGER;
    if (r === ENe || r === TNe || r === MNe || r === PNe) if (o === Fh) {
      if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
        if (r === ENe) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (r === TNe) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (r === MNe) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (r === PNe) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    } else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
      if (r === ENe) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (r === TNe) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (r === MNe) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (r === PNe) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (r === Fbt || r === zbt || r === Ubt || r === $bt) if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
      if (r === Fbt) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
      if (r === zbt) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
      if (r === Ubt) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
      if (r === $bt) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
    } else return null;
    if (r === Gbt || r === Vbt || r === Hbt || r === Wbt || r === qbt || r === Kbt || r === Qbt) if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
      if (r === Gbt || r === Vbt) return o === Fh ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
      if (r === Hbt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
      if (r === Wbt) return i.COMPRESSED_R11_EAC;
      if (r === qbt) return i.COMPRESSED_SIGNED_R11_EAC;
      if (r === Kbt) return i.COMPRESSED_RG11_EAC;
      if (r === Qbt) return i.COMPRESSED_SIGNED_RG11_EAC;
    } else return null;
    if (r === Ybt || r === Xbt || r === Jbt || r === Zbt || r === evt || r === tvt || r === nvt || r === rvt || r === avt || r === ivt || r === ovt || r === svt || r === lvt || r === cvt) if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
      if (r === Ybt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
      if (r === Xbt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
      if (r === Jbt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
      if (r === Zbt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
      if (r === evt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
      if (r === tvt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
      if (r === nvt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
      if (r === rvt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
      if (r === avt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
      if (r === ivt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
      if (r === ovt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
      if (r === svt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
      if (r === lvt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
      if (r === cvt) return o === Fh ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
    } else return null;
    if (r === dvt || r === uvt || r === hvt) if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
      if (r === dvt) return o === Fh ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      if (r === uvt) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
      if (r === hvt) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    } else return null;
    if (r === pvt || r === mvt || r === fvt || r === gvt) if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
      if (r === pvt) return i.COMPRESSED_RED_RGTC1_EXT;
      if (r === mvt) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
      if (r === fvt) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
      if (r === gvt) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
    } else return null;
    return r === C_e ? e.UNSIGNED_INT_24_8 : e[r] !== void 0 ? e[r] : null;
  }
  return {
    convert: n
  };
}

const i3a = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  o3a = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;

class s3a {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, n) {
    if (this.texture === null) {
      const r = new Gqn(t.texture);
      (t.depthNear !== n.depthNear || t.depthFar !== n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = r;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const n = t.cameras[0].viewport,
        r = new Mx({
          vertexShader: i3a,
          fragmentShader: o3a,
          uniforms: {
            depthColor: {
              value: this.texture
            },
            depthWidth: {
              value: n.z
            },
            depthHeight: {
              value: n.w
            }
          }
        });
      this.mesh = new di(new W5(20, 20), r);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}

class l3a extends dG {
  constructor(t, n) {
    super();
    const r = this;
    let a = null,
      i = 1,
      o = null,
      s = "local-floor",
      l = 1,
      d = null,
      u = null,
      h = null,
      p = null,
      m = null,
      f = null;
    const y = typeof XRWebGLBinding < "u",
      b = new s3a(),
      v = {},
      _ = n.getContextAttributes();
    let w = null,
      k = null;
    const A = [],
      S = [],
      C = new Qi();
    let I = null;
    const E = new lu();
    E.viewport = new Vd();
    const M = new lu();
    M.viewport = new Vd();
    const T = [E, M],
      P = new i2a();
    let R = null,
      j = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (Y) {
      let K = A[Y];
      return K === void 0 && (K = new nrt(), A[Y] = K), K.getTargetRaySpace();
    }, this.getControllerGrip = function (Y) {
      let K = A[Y];
      return K === void 0 && (K = new nrt(), A[Y] = K), K.getGripSpace();
    }, this.getHand = function (Y) {
      let K = A[Y];
      return K === void 0 && (K = new nrt(), A[Y] = K), K.getHandSpace();
    };
    function B(Y) {
      const K = S.indexOf(Y.inputSource);
      if (K === -1) return;
      const W = A[K];
      W !== void 0 && (W.update(Y.inputSource, Y.frame, d || o), W.dispatchEvent({
        type: Y.type,
        data: Y.inputSource
      }));
    }
    function F() {
      a.removeEventListener("select", B), a.removeEventListener("selectstart", B), a.removeEventListener("selectend", B), a.removeEventListener("squeeze", B), a.removeEventListener("squeezestart", B), a.removeEventListener("squeezeend", B), a.removeEventListener("end", F), a.removeEventListener("inputsourceschange", N);
      for (let Y = 0; Y < A.length; Y++) {
        const K = S[Y];
        K !== null && (S[Y] = null, A[Y].disconnect(K));
      }
      R = null, j = null, b.reset();
      for (const Y in v) delete v[Y];
      t.setRenderTarget(w), m = null, p = null, h = null, a = null, k = null, H.stop(), r.isPresenting = !1, t.setPixelRatio(I), t.setSize(C.width, C.height, !1), r.dispatchEvent({
        type: "sessionend"
      });
    }
    this.setFramebufferScaleFactor = function (Y) {
      i = Y, r.isPresenting === !0 && Es("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function (Y) {
      s = Y, r.isPresenting === !0 && Es("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function () {
      return d || o;
    }, this.setReferenceSpace = function (Y) {
      d = Y;
    }, this.getBaseLayer = function () {
      return p !== null ? p : m;
    }, this.getBinding = function () {
      return h === null && y && (h = new XRWebGLBinding(a, n)), h;
    }, this.getFrame = function () {
      return f;
    }, this.getSession = function () {
      return a;
    }, this.setSession = async function (Y) {
      if (a = Y, a !== null) {
        if (w = t.getRenderTarget(), a.addEventListener("select", B), a.addEventListener("selectstart", B), a.addEventListener("selectend", B), a.addEventListener("squeeze", B), a.addEventListener("squeezestart", B), a.addEventListener("squeezeend", B), a.addEventListener("end", F), a.addEventListener("inputsourceschange", N), _.xrCompatible !== !0 && (await n.makeXRCompatible()), I = t.getPixelRatio(), t.getSize(C), y && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let W = null,
            Q = null,
            q = null;
          _.depth && (q = _.stencil ? n.DEPTH24_STENCIL8 : n.DEPTH_COMPONENT24, W = _.stencil ? pW : iD, Q = _.stencil ? C_e : BP);
          const ne = {
            colorFormat: n.RGBA8,
            depthFormat: q,
            scaleFactor: i
          };
          h = this.getBinding(), p = h.createProjectionLayer(ne), a.updateRenderState({
            layers: [p]
          }), t.setPixelRatio(1), t.setSize(p.textureWidth, p.textureHeight, !1), k = new FE(p.textureWidth, p.textureHeight, {
            format: W1,
            type: bk,
            depthTexture: new N_e(p.textureWidth, p.textureHeight, Q, void 0, void 0, void 0, void 0, void 0, void 0, W),
            stencilBuffer: _.stencil,
            colorSpace: t.outputColorSpace,
            samples: _.antialias ? 4 : 0,
            resolveDepthBuffer: p.ignoreDepthValues === !1,
            resolveStencilBuffer: p.ignoreDepthValues === !1
          });
        } else {
          const W = {
            antialias: _.antialias,
            alpha: !0,
            depth: _.depth,
            stencil: _.stencil,
            framebufferScaleFactor: i
          };
          m = new XRWebGLLayer(a, n, W), a.updateRenderState({
            baseLayer: m
          }), t.setPixelRatio(1), t.setSize(m.framebufferWidth, m.framebufferHeight, !1), k = new FE(m.framebufferWidth, m.framebufferHeight, {
            format: W1,
            type: bk,
            colorSpace: t.outputColorSpace,
            stencilBuffer: _.stencil,
            resolveDepthBuffer: m.ignoreDepthValues === !1,
            resolveStencilBuffer: m.ignoreDepthValues === !1
          });
        }
        k.isXRRenderTarget = !0, this.setFoveation(l), d = null, o = await a.requestReferenceSpace(s), H.setContext(a), H.start(), r.isPresenting = !0, r.dispatchEvent({
          type: "sessionstart"
        });
      }
    }, this.getEnvironmentBlendMode = function () {
      if (a !== null) return a.environmentBlendMode;
    }, this.getDepthTexture = function () {
      return b.getDepthTexture();
    };
    function N(Y) {
      for (let K = 0; K < Y.removed.length; K++) {
        const W = Y.removed[K],
          Q = S.indexOf(W);
        Q >= 0 && (S[Q] = null, A[Q].disconnect(W));
      }
      for (let K = 0; K < Y.added.length; K++) {
        const W = Y.added[K];
        let Q = S.indexOf(W);
        if (Q === -1) {
          for (let ne = 0; ne < A.length; ne++) if (ne >= S.length) {
            S.push(W), Q = ne;
            break;
          } else if (S[ne] === null) {
            S[ne] = W, Q = ne;
            break;
          }
          if (Q === -1) break;
        }
        const q = A[Q];
        q && q.connect(W);
      }
    }
    const G = new dr(),
      z = new dr();
    function V(Y, K, W) {
      G.setFromMatrixPosition(K.matrixWorld), z.setFromMatrixPosition(W.matrixWorld);
      const Q = G.distanceTo(z),
        q = K.projectionMatrix.elements,
        ne = W.projectionMatrix.elements,
        de = q[14] / (q[10] - 1),
        le = q[14] / (q[10] + 1),
        J = (q[9] + 1) / q[5],
        pe = (q[9] - 1) / q[5],
        ce = (q[8] - 1) / q[0],
        we = (ne[8] + 1) / ne[0],
        X = de * ce,
        Z = de * we,
        re = Q / (-ce + we),
        fe = re * -ce;
      if (K.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(fe), Y.translateZ(re), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), q[10] === -1) Y.projectionMatrix.copy(K.projectionMatrix), Y.projectionMatrixInverse.copy(K.projectionMatrixInverse);else {
        const ye = de + re,
          ie = le + re,
          ae = X - fe,
          be = Z + (Q - fe),
          Ee = J * le / ie * ye,
          xe = pe * le / ie * ye;
        Y.projectionMatrix.makePerspective(ae, be, Ee, xe, ye, ie), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function O(Y, K) {
      K === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(K.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function (Y) {
      if (a === null) return;
      let K = Y.near,
        W = Y.far;
      b.texture !== null && (b.depthNear > 0 && (K = b.depthNear), b.depthFar > 0 && (W = b.depthFar)), P.near = M.near = E.near = K, P.far = M.far = E.far = W, (R !== P.near || j !== P.far) && (a.updateRenderState({
        depthNear: P.near,
        depthFar: P.far
      }), R = P.near, j = P.far), P.layers.mask = Y.layers.mask | 6, E.layers.mask = P.layers.mask & -5, M.layers.mask = P.layers.mask & -3;
      const Q = Y.parent,
        q = P.cameras;
      O(P, Q);
      for (let ne = 0; ne < q.length; ne++) O(q[ne], Q);
      q.length === 2 ? V(P, E, M) : P.projectionMatrix.copy(E.projectionMatrix), L(Y, P, Q);
    };
    function L(Y, K, W) {
      W === null ? Y.matrix.copy(K.matrixWorld) : (Y.matrix.copy(W.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(K.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(K.projectionMatrix), Y.projectionMatrixInverse.copy(K.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = ade * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function () {
      return P;
    }, this.getFoveation = function () {
      if (!(p === null && m === null)) return l;
    }, this.setFoveation = function (Y) {
      l = Y, p !== null && (p.fixedFoveation = Y), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Y);
    }, this.hasDepthSensing = function () {
      return b.texture !== null;
    }, this.getDepthSensingMesh = function () {
      return b.getMesh(P);
    }, this.getCameraTexture = function (Y) {
      return v[Y];
    };
    let D = null;
    function U(Y, K) {
      if (u = K.getViewerPose(d || o), f = K, u !== null) {
        const W = u.views;
        m !== null && (t.setRenderTargetFramebuffer(k, m.framebuffer), t.setRenderTarget(k));
        let Q = !1;
        W.length !== P.cameras.length && (P.cameras.length = 0, Q = !0);
        for (let le = 0; le < W.length; le++) {
          const J = W[le];
          let pe = null;
          if (m !== null) pe = m.getViewport(J);else {
            const we = h.getViewSubImage(p, J);
            pe = we.viewport, le === 0 && (t.setRenderTargetTextures(k, we.colorTexture, we.depthStencilTexture), t.setRenderTarget(k));
          }
          let ce = T[le];
          ce === void 0 && (ce = new lu(), ce.layers.enable(le), ce.viewport = new Vd(), T[le] = ce), ce.matrix.fromArray(J.transform.matrix), ce.matrix.decompose(ce.position, ce.quaternion, ce.scale), ce.projectionMatrix.fromArray(J.projectionMatrix), ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(), ce.viewport.set(pe.x, pe.y, pe.width, pe.height), le === 0 && (P.matrix.copy(ce.matrix), P.matrix.decompose(P.position, P.quaternion, P.scale)), Q === !0 && P.cameras.push(ce);
        }
        const q = a.enabledFeatures;
        if (q && q.includes("depth-sensing") && a.depthUsage == "gpu-optimized" && y) {
          h = r.getBinding();
          const le = h.getDepthInformation(W[0]);
          le && le.isValid && le.texture && b.init(le, a.renderState);
        }
        if (q && q.includes("camera-access") && y) {
          t.state.unbindTexture(), h = r.getBinding();
          for (let le = 0; le < W.length; le++) {
            const J = W[le].camera;
            if (J) {
              let pe = v[J];
              pe || (pe = new Gqn(), v[J] = pe);
              const ce = h.getCameraImage(J);
              pe.sourceTexture = ce;
            }
          }
        }
      }
      for (let W = 0; W < A.length; W++) {
        const Q = S[W],
          q = A[W];
        Q !== null && q !== void 0 && q.update(Q, K, d || o);
      }
      D && D(Y, K), K.detectedPlanes && r.dispatchEvent({
        type: "planesdetected",
        data: K
      }), f = null;
    }
    const H = new cKn();
    H.setAnimationLoop(U), this.setAnimationLoop = function (Y) {
      D = Y;
    }, this.dispose = function () {};
  }
}

const OG = new xp(),
  c3a = new bo();

function d3a(e, t) {
  function n(b, v) {
    b.matrixAutoUpdate === !0 && b.updateMatrix(), v.value.copy(b.matrix);
  }
  function r(b, v) {
    v.color.getRGB(b.fogColor.value, eKn(e)), v.isFog ? (b.fogNear.value = v.near, b.fogFar.value = v.far) : v.isFogExp2 && (b.fogDensity.value = v.density);
  }
  function a(b, v, _, w, k) {
    v.isMeshBasicMaterial ? i(b, v) : v.isMeshLambertMaterial ? (i(b, v), v.envMap && (b.envMapIntensity.value = v.envMapIntensity)) : v.isMeshToonMaterial ? (i(b, v), h(b, v)) : v.isMeshPhongMaterial ? (i(b, v), u(b, v), v.envMap && (b.envMapIntensity.value = v.envMapIntensity)) : v.isMeshStandardMaterial ? (i(b, v), p(b, v), v.isMeshPhysicalMaterial && m(b, v, k)) : v.isMeshMatcapMaterial ? (i(b, v), f(b, v)) : v.isMeshDepthMaterial ? i(b, v) : v.isMeshDistanceMaterial ? (i(b, v), y(b, v)) : v.isMeshNormalMaterial ? i(b, v) : v.isLineBasicMaterial ? (o(b, v), v.isLineDashedMaterial && s(b, v)) : v.isPointsMaterial ? l(b, v, _, w) : v.isSpriteMaterial ? d(b, v) : v.isShadowMaterial ? (b.color.value.copy(v.color), b.opacity.value = v.opacity) : v.isShaderMaterial && (v.uniformsNeedUpdate = !1);
  }
  function i(b, v) {
    b.opacity.value = v.opacity, v.color && b.diffuse.value.copy(v.color), v.emissive && b.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity), v.map && (b.map.value = v.map, n(v.map, b.mapTransform)), v.alphaMap && (b.alphaMap.value = v.alphaMap, n(v.alphaMap, b.alphaMapTransform)), v.bumpMap && (b.bumpMap.value = v.bumpMap, n(v.bumpMap, b.bumpMapTransform), b.bumpScale.value = v.bumpScale, v.side === xx && (b.bumpScale.value *= -1)), v.normalMap && (b.normalMap.value = v.normalMap, n(v.normalMap, b.normalMapTransform), b.normalScale.value.copy(v.normalScale), v.side === xx && b.normalScale.value.negate()), v.displacementMap && (b.displacementMap.value = v.displacementMap, n(v.displacementMap, b.displacementMapTransform), b.displacementScale.value = v.displacementScale, b.displacementBias.value = v.displacementBias), v.emissiveMap && (b.emissiveMap.value = v.emissiveMap, n(v.emissiveMap, b.emissiveMapTransform)), v.specularMap && (b.specularMap.value = v.specularMap, n(v.specularMap, b.specularMapTransform)), v.alphaTest > 0 && (b.alphaTest.value = v.alphaTest);
    const _ = t.get(v),
      w = _.envMap,
      k = _.envMapRotation;
    w && (b.envMap.value = w, OG.copy(k), OG.x *= -1, OG.y *= -1, OG.z *= -1, w.isCubeTexture && w.isRenderTargetTexture === !1 && (OG.y *= -1, OG.z *= -1), b.envMapRotation.value.setFromMatrix4(c3a.makeRotationFromEuler(OG)), b.flipEnvMap.value = w.isCubeTexture && w.isRenderTargetTexture === !1 ? -1 : 1, b.reflectivity.value = v.reflectivity, b.ior.value = v.ior, b.refractionRatio.value = v.refractionRatio), v.lightMap && (b.lightMap.value = v.lightMap, b.lightMapIntensity.value = v.lightMapIntensity, n(v.lightMap, b.lightMapTransform)), v.aoMap && (b.aoMap.value = v.aoMap, b.aoMapIntensity.value = v.aoMapIntensity, n(v.aoMap, b.aoMapTransform));
  }
  function o(b, v) {
    b.diffuse.value.copy(v.color), b.opacity.value = v.opacity, v.map && (b.map.value = v.map, n(v.map, b.mapTransform));
  }
  function s(b, v) {
    b.dashSize.value = v.dashSize, b.totalSize.value = v.dashSize + v.gapSize, b.scale.value = v.scale;
  }
  function l(b, v, _, w) {
    b.diffuse.value.copy(v.color), b.opacity.value = v.opacity, b.size.value = v.size * _, b.scale.value = w * .5, v.map && (b.map.value = v.map, n(v.map, b.uvTransform)), v.alphaMap && (b.alphaMap.value = v.alphaMap, n(v.alphaMap, b.alphaMapTransform)), v.alphaTest > 0 && (b.alphaTest.value = v.alphaTest);
  }
  function d(b, v) {
    b.diffuse.value.copy(v.color), b.opacity.value = v.opacity, b.rotation.value = v.rotation, v.map && (b.map.value = v.map, n(v.map, b.mapTransform)), v.alphaMap && (b.alphaMap.value = v.alphaMap, n(v.alphaMap, b.alphaMapTransform)), v.alphaTest > 0 && (b.alphaTest.value = v.alphaTest);
  }
  function u(b, v) {
    b.specular.value.copy(v.specular), b.shininess.value = Math.max(v.shininess, 1e-4);
  }
  function h(b, v) {
    v.gradientMap && (b.gradientMap.value = v.gradientMap);
  }
  function p(b, v) {
    b.metalness.value = v.metalness, v.metalnessMap && (b.metalnessMap.value = v.metalnessMap, n(v.metalnessMap, b.metalnessMapTransform)), b.roughness.value = v.roughness, v.roughnessMap && (b.roughnessMap.value = v.roughnessMap, n(v.roughnessMap, b.roughnessMapTransform)), v.envMap && (b.envMapIntensity.value = v.envMapIntensity);
  }
  function m(b, v, _) {
    b.ior.value = v.ior, v.sheen > 0 && (b.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen), b.sheenRoughness.value = v.sheenRoughness, v.sheenColorMap && (b.sheenColorMap.value = v.sheenColorMap, n(v.sheenColorMap, b.sheenColorMapTransform)), v.sheenRoughnessMap && (b.sheenRoughnessMap.value = v.sheenRoughnessMap, n(v.sheenRoughnessMap, b.sheenRoughnessMapTransform))), v.clearcoat > 0 && (b.clearcoat.value = v.clearcoat, b.clearcoatRoughness.value = v.clearcoatRoughness, v.clearcoatMap && (b.clearcoatMap.value = v.clearcoatMap, n(v.clearcoatMap, b.clearcoatMapTransform)), v.clearcoatRoughnessMap && (b.clearcoatRoughnessMap.value = v.clearcoatRoughnessMap, n(v.clearcoatRoughnessMap, b.clearcoatRoughnessMapTransform)), v.clearcoatNormalMap && (b.clearcoatNormalMap.value = v.clearcoatNormalMap, n(v.clearcoatNormalMap, b.clearcoatNormalMapTransform), b.clearcoatNormalScale.value.copy(v.clearcoatNormalScale), v.side === xx && b.clearcoatNormalScale.value.negate())), v.dispersion > 0 && (b.dispersion.value = v.dispersion), v.iridescence > 0 && (b.iridescence.value = v.iridescence, b.iridescenceIOR.value = v.iridescenceIOR, b.iridescenceThicknessMinimum.value = v.iridescenceThicknessRange[0], b.iridescenceThicknessMaximum.value = v.iridescenceThicknessRange[1], v.iridescenceMap && (b.iridescenceMap.value = v.iridescenceMap, n(v.iridescenceMap, b.iridescenceMapTransform)), v.iridescenceThicknessMap && (b.iridescenceThicknessMap.value = v.iridescenceThicknessMap, n(v.iridescenceThicknessMap, b.iridescenceThicknessMapTransform))), v.transmission > 0 && (b.transmission.value = v.transmission, b.transmissionSamplerMap.value = _.texture, b.transmissionSamplerSize.value.set(_.width, _.height), v.transmissionMap && (b.transmissionMap.value = v.transmissionMap, n(v.transmissionMap, b.transmissionMapTransform)), b.thickness.value = v.thickness, v.thicknessMap && (b.thicknessMap.value = v.thicknessMap, n(v.thicknessMap, b.thicknessMapTransform)), b.attenuationDistance.value = v.attenuationDistance, b.attenuationColor.value.copy(v.attenuationColor)), v.anisotropy > 0 && (b.anisotropyVector.value.set(v.anisotropy * Math.cos(v.anisotropyRotation), v.anisotropy * Math.sin(v.anisotropyRotation)), v.anisotropyMap && (b.anisotropyMap.value = v.anisotropyMap, n(v.anisotropyMap, b.anisotropyMapTransform))), b.specularIntensity.value = v.specularIntensity, b.specularColor.value.copy(v.specularColor), v.specularColorMap && (b.specularColorMap.value = v.specularColorMap, n(v.specularColorMap, b.specularColorMapTransform)), v.specularIntensityMap && (b.specularIntensityMap.value = v.specularIntensityMap, n(v.specularIntensityMap, b.specularIntensityMapTransform));
  }
  function f(b, v) {
    v.matcap && (b.matcap.value = v.matcap);
  }
  function y(b, v) {
    const _ = t.get(v).light;
    b.referencePosition.value.setFromMatrixPosition(_.matrixWorld), b.nearDistance.value = _.shadow.camera.near, b.farDistance.value = _.shadow.camera.far;
  }
  return {
    refreshFogUniforms: r,
    refreshMaterialUniforms: a
  };
}

function u3a(e, t, n, r) {
  let a = {},
    i = {},
    o = [];
  const s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(_, w) {
    const k = w.program;
    r.uniformBlockBinding(_, k);
  }
  function d(_, w) {
    let k = a[_.id];
    k === void 0 && (f(_), k = u(_), a[_.id] = k, _.addEventListener("dispose", b));
    const A = w.program;
    r.updateUBOMapping(_, A);
    const S = t.render.frame;
    i[_.id] !== S && (p(_), i[_.id] = S);
  }
  function u(_) {
    const w = h();
    _.__bindingPointIndex = w;
    const k = e.createBuffer(),
      A = _.__size,
      S = _.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, k), e.bufferData(e.UNIFORM_BUFFER, A, S), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, w, k), k;
  }
  function h() {
    for (let _ = 0; _ < s; _++) if (o.indexOf(_) === -1) return o.push(_), _;
    return vl("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function p(_) {
    const w = a[_.id],
      k = _.uniforms,
      A = _.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, w);
    for (let S = 0, C = k.length; S < C; S++) {
      const I = Array.isArray(k[S]) ? k[S] : [k[S]];
      for (let E = 0, M = I.length; E < M; E++) {
        const T = I[E];
        if (m(T, S, E, A) === !0) {
          const P = T.__offset,
            R = Array.isArray(T.value) ? T.value : [T.value];
          let j = 0;
          for (let B = 0; B < R.length; B++) {
            const F = R[B],
              N = y(F);
            typeof F == "number" || typeof F == "boolean" ? (T.__data[0] = F, e.bufferSubData(e.UNIFORM_BUFFER, P + j, T.__data)) : F.isMatrix3 ? (T.__data[0] = F.elements[0], T.__data[1] = F.elements[1], T.__data[2] = F.elements[2], T.__data[3] = 0, T.__data[4] = F.elements[3], T.__data[5] = F.elements[4], T.__data[6] = F.elements[5], T.__data[7] = 0, T.__data[8] = F.elements[6], T.__data[9] = F.elements[7], T.__data[10] = F.elements[8], T.__data[11] = 0) : (F.toArray(T.__data, j), j += N.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          e.bufferSubData(e.UNIFORM_BUFFER, P, T.__data);
        }
      }
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function m(_, w, k, A) {
    const S = _.value,
      C = w + "_" + k;
    if (A[C] === void 0) return typeof S == "number" || typeof S == "boolean" ? A[C] = S : A[C] = S.clone(), !0;
    {
      const I = A[C];
      if (typeof S == "number" || typeof S == "boolean") {
        if (I !== S) return A[C] = S, !0;
      } else if (I.equals(S) === !1) return I.copy(S), !0;
    }
    return !1;
  }
  function f(_) {
    const w = _.uniforms;
    let k = 0;
    const A = 16;
    for (let C = 0, I = w.length; C < I; C++) {
      const E = Array.isArray(w[C]) ? w[C] : [w[C]];
      for (let M = 0, T = E.length; M < T; M++) {
        const P = E[M],
          R = Array.isArray(P.value) ? P.value : [P.value];
        for (let j = 0, B = R.length; j < B; j++) {
          const F = R[j],
            N = y(F),
            G = k % A,
            z = G % N.boundary,
            V = G + z;
          k += z, V !== 0 && A - V < N.storage && (k += A - V), P.__data = new Float32Array(N.storage / Float32Array.BYTES_PER_ELEMENT), P.__offset = k, k += N.storage;
        }
      }
    }
    const S = k % A;
    return S > 0 && (k += A - S), _.__size = k, _.__cache = {}, this;
  }
  function y(_) {
    const w = {
      boundary: 0,
      storage: 0
    };
    return typeof _ == "number" || typeof _ == "boolean" ? (w.boundary = 4, w.storage = 4) : _.isVector2 ? (w.boundary = 8, w.storage = 8) : _.isVector3 || _.isColor ? (w.boundary = 16, w.storage = 12) : _.isVector4 ? (w.boundary = 16, w.storage = 16) : _.isMatrix3 ? (w.boundary = 48, w.storage = 48) : _.isMatrix4 ? (w.boundary = 64, w.storage = 64) : _.isTexture ? Es("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : Es("WebGLRenderer: Unsupported uniform value type.", _), w;
  }
  function b(_) {
    const w = _.target;
    w.removeEventListener("dispose", b);
    const k = o.indexOf(w.__bindingPointIndex);
    o.splice(k, 1), e.deleteBuffer(a[w.id]), delete a[w.id], delete i[w.id];
  }
  function v() {
    for (const _ in a) e.deleteBuffer(a[_]);
    o = [], a = {}, i = {};
  }
  return {
    bind: l,
    update: d,
    dispose: v
  };
}

const h3a = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]);

let d8 = null;

function p3a() {
  return d8 === null && (d8 = new mW(h3a, 16, 16, rde, hT), d8.name = "DFG_LUT", d8.minFilter = $m, d8.magFilter = $m, d8.wrapS = hy, d8.wrapT = hy, d8.generateMipmaps = !1, d8.needsUpdate = !0), d8;
}

class FD {
  constructor(t = {}) {
    const {
      canvas: n = swa(),
      context: r = null,
      depth: a = !0,
      stencil: i = !1,
      alpha: o = !1,
      antialias: s = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: d = !1,
      powerPreference: u = "default",
      failIfMajorPerformanceCaveat: h = !1,
      reversedDepthBuffer: p = !1,
      outputBufferType: m = bk
    } = t;
    this.isWebGLRenderer = !0;
    let f;
    if (r !== null) {
      if (typeof WebGLRenderingContext < "u" && r instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      f = r.getContextAttributes().alpha;
    } else f = o;
    const y = m,
      b = new Set([Ujt, zjt, Fjt]),
      v = new Set([bk, BP, I_e, C_e, Ljt, Ojt]),
      _ = new Uint32Array(4),
      w = new Int32Array(4);
    let k = null,
      A = null;
    const S = [],
      C = [];
    let I = null;
    this.domElement = n, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = sP, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const E = this;
    let M = !1;
    this._outputColorSpace = Nl;
    let T = 0,
      P = 0,
      R = null,
      j = -1,
      B = null;
    const F = new Vd(),
      N = new Vd();
    let G = null;
    const z = new so(0);
    let V = 0,
      O = n.width,
      L = n.height,
      D = 1,
      U = null,
      H = null;
    const Y = new Vd(0, 0, O, L),
      K = new Vd(0, 0, O, L);
    let W = !1;
    const Q = new Jjt();
    let q = !1,
      ne = !1;
    const de = new bo(),
      le = new dr(),
      J = new Vd(),
      pe = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0
      };
    let ce = !1;
    function we() {
      return R === null ? D : 1;
    }
    let X = r;
    function Z(qe, kt) {
      return n.getContext(qe, kt);
    }
    try {
      const qe = {
        alpha: !0,
        depth: a,
        stencil: i,
        antialias: s,
        premultipliedAlpha: l,
        preserveDrawingBuffer: d,
        powerPreference: u,
        failIfMajorPerformanceCaveat: h
      };
      if ("setAttribute" in n && n.setAttribute("data-engine", `three.js r${jjt}`), n.addEventListener("webglcontextlost", Le, !1), n.addEventListener("webglcontextrestored", Ke, !1), n.addEventListener("webglcontextcreationerror", Xe, !1), X === null) {
        const kt = "webgl2";
        if (X = Z(kt, qe), X === null) throw Z(kt) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (qe) {
      throw vl("WebGLRenderer: " + qe.message), qe;
    }
    let re, fe, ye, ie, ae, be, Ee, xe, he, ue, ge, _e, ke, ve, Te, Ne, me, Ae, Fe, Me, Re, $e, rt;
    function nt() {
      re = new mAa(X), re.init(), Re = new a3a(X, re), fe = new oAa(X, re, t, Re), ye = new n3a(X, re), fe.reversedDepthBuffer && p && ye.buffers.depth.setReversed(!0), ie = new yAa(X), ae = new $Sa(), be = new r3a(X, re, ye, ae, fe, Re, ie), Ee = new pAa(E), xe = new _2a(X), $e = new aAa(X, xe), he = new fAa(X, xe, ie, $e), ue = new vAa(X, he, xe, $e, ie), Ae = new bAa(X, fe, be), Te = new sAa(ae), ge = new USa(E, Ee, re, fe, $e, Te), _e = new d3a(E, ae), ke = new VSa(), ve = new YSa(re), me = new rAa(E, Ee, ye, ue, f, l), Ne = new t3a(E, ue, fe), rt = new u3a(X, ie, fe, ye), Fe = new iAa(X, re, ie), Me = new gAa(X, re, ie), ie.programs = ge.programs, E.capabilities = fe, E.extensions = re, E.properties = ae, E.renderLists = ke, E.shadowMap = Ne, E.state = ye, E.info = ie;
    }
    nt(), y !== bk && (I = new xAa(y, n.width, n.height, a, i));
    const ze = new l3a(E, X);
    this.xr = ze, this.getContext = function () {
      return X;
    }, this.getContextAttributes = function () {
      return X.getContextAttributes();
    }, this.forceContextLoss = function () {
      const qe = re.get("WEBGL_lose_context");
      qe && qe.loseContext();
    }, this.forceContextRestore = function () {
      const qe = re.get("WEBGL_lose_context");
      qe && qe.restoreContext();
    }, this.getPixelRatio = function () {
      return D;
    }, this.setPixelRatio = function (qe) {
      qe !== void 0 && (D = qe, this.setSize(O, L, !1));
    }, this.getSize = function (qe) {
      return qe.set(O, L);
    }, this.setSize = function (qe, kt, St = !0) {
      if (ze.isPresenting) {
        Es("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      O = qe, L = kt, n.width = Math.floor(qe * D), n.height = Math.floor(kt * D), St === !0 && (n.style.width = qe + "px", n.style.height = kt + "px"), I !== null && I.setSize(n.width, n.height), this.setViewport(0, 0, qe, kt);
    }, this.getDrawingBufferSize = function (qe) {
      return qe.set(O * D, L * D).floor();
    }, this.setDrawingBufferSize = function (qe, kt, St) {
      O = qe, L = kt, D = St, n.width = Math.floor(qe * St), n.height = Math.floor(kt * St), this.setViewport(0, 0, qe, kt);
    }, this.setEffects = function (qe) {
      if (y === bk) {
        console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (qe) {
        for (let kt = 0; kt < qe.length; kt++) if (qe[kt].isOutputPass === !0) {
          console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      I.setEffects(qe || []);
    }, this.getCurrentViewport = function (qe) {
      return qe.copy(F);
    }, this.getViewport = function (qe) {
      return qe.copy(Y);
    }, this.setViewport = function (qe, kt, St, hn) {
      qe.isVector4 ? Y.set(qe.x, qe.y, qe.z, qe.w) : Y.set(qe, kt, St, hn), ye.viewport(F.copy(Y).multiplyScalar(D).round());
    }, this.getScissor = function (qe) {
      return qe.copy(K);
    }, this.setScissor = function (qe, kt, St, hn) {
      qe.isVector4 ? K.set(qe.x, qe.y, qe.z, qe.w) : K.set(qe, kt, St, hn), ye.scissor(N.copy(K).multiplyScalar(D).round());
    }, this.getScissorTest = function () {
      return W;
    }, this.setScissorTest = function (qe) {
      ye.setScissorTest(W = qe);
    }, this.setOpaqueSort = function (qe) {
      U = qe;
    }, this.setTransparentSort = function (qe) {
      H = qe;
    }, this.getClearColor = function (qe) {
      return qe.copy(me.getClearColor());
    }, this.setClearColor = function () {
      me.setClearColor(...arguments);
    }, this.getClearAlpha = function () {
      return me.getClearAlpha();
    }, this.setClearAlpha = function () {
      me.setClearAlpha(...arguments);
    }, this.clear = function (qe = !0, kt = !0, St = !0) {
      let hn = 0;
      if (qe) {
        let Qt = !1;
        if (R !== null) {
          const Ot = R.texture.format;
          Qt = b.has(Ot);
        }
        if (Qt) {
          const Ot = R.texture.type,
            ln = v.has(Ot),
            Pn = me.getClearColor(),
            rn = me.getClearAlpha(),
            Yn = Pn.r,
            Ct = Pn.g,
            Cn = Pn.b;
          ln ? (_[0] = Yn, _[1] = Ct, _[2] = Cn, _[3] = rn, X.clearBufferuiv(X.COLOR, 0, _)) : (w[0] = Yn, w[1] = Ct, w[2] = Cn, w[3] = rn, X.clearBufferiv(X.COLOR, 0, w));
        } else hn |= X.COLOR_BUFFER_BIT;
      }
      kt && (hn |= X.DEPTH_BUFFER_BIT), St && (hn |= X.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), hn !== 0 && X.clear(hn);
    }, this.clearColor = function () {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function () {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function () {
      this.clear(!1, !1, !0);
    }, this.dispose = function () {
      n.removeEventListener("webglcontextlost", Le, !1), n.removeEventListener("webglcontextrestored", Ke, !1), n.removeEventListener("webglcontextcreationerror", Xe, !1), me.dispose(), ke.dispose(), ve.dispose(), ae.dispose(), Ee.dispose(), ue.dispose(), $e.dispose(), rt.dispose(), ge.dispose(), ze.dispose(), ze.removeEventListener("sessionstart", It), ze.removeEventListener("sessionend", Ft), We.stop();
    };
    function Le(qe) {
      qe.preventDefault(), JFe("WebGLRenderer: Context Lost."), M = !0;
    }
    function Ke() {
      JFe("WebGLRenderer: Context Restored."), M = !1;
      const qe = ie.autoReset,
        kt = Ne.enabled,
        St = Ne.autoUpdate,
        hn = Ne.needsUpdate,
        Qt = Ne.type;
      nt(), ie.autoReset = qe, Ne.enabled = kt, Ne.autoUpdate = St, Ne.needsUpdate = hn, Ne.type = Qt;
    }
    function Xe(qe) {
      vl("WebGLRenderer: A WebGL context could not be created. Reason: ", qe.statusMessage);
    }
    function De(qe) {
      const kt = qe.target;
      kt.removeEventListener("dispose", De), Ye(kt);
    }
    function Ye(qe) {
      Ce(qe), ae.remove(qe);
    }
    function Ce(qe) {
      const kt = ae.get(qe).programs;
      kt !== void 0 && (kt.forEach(function (St) {
        ge.releaseProgram(St);
      }), qe.isShaderMaterial && ge.releaseShaderCache(qe));
    }
    this.renderBufferDirect = function (qe, kt, St, hn, Qt, Ot) {
      kt === null && (kt = pe);
      const ln = Qt.isMesh && Qt.matrixWorld.determinant() < 0,
        Pn = lt(qe, kt, St, hn, Qt);
      ye.setMaterial(hn, ln);
      let rn = St.index,
        Yn = 1;
      if (hn.wireframe === !0) {
        if (rn = he.getWireframeAttribute(St), rn === void 0) return;
        Yn = 2;
      }
      const Ct = St.drawRange,
        Cn = St.attributes.position;
      let un = Ct.start * Yn,
        Jn = (Ct.start + Ct.count) * Yn;
      Ot !== null && (un = Math.max(un, Ot.start * Yn), Jn = Math.min(Jn, (Ot.start + Ot.count) * Yn)), rn !== null ? (un = Math.max(un, 0), Jn = Math.min(Jn, rn.count)) : Cn != null && (un = Math.max(un, 0), Jn = Math.min(Jn, Cn.count));
      const Kn = Jn - un;
      if (Kn < 0 || Kn === 1 / 0) return;
      $e.setup(Qt, hn, Pn, St, rn);
      let en,
        Vn = Fe;
      if (rn !== null && (en = xe.get(rn), Vn = Me, Vn.setIndex(en)), Qt.isMesh) hn.wireframe === !0 ? (ye.setLineWidth(hn.wireframeLinewidth * we()), Vn.setMode(X.LINES)) : Vn.setMode(X.TRIANGLES);else if (Qt.isLine) {
        let Tt = hn.linewidth;
        Tt === void 0 && (Tt = 1), ye.setLineWidth(Tt * we()), Qt.isLineSegments ? Vn.setMode(X.LINES) : Qt.isLineLoop ? Vn.setMode(X.LINE_LOOP) : Vn.setMode(X.LINE_STRIP);
      } else Qt.isPoints ? Vn.setMode(X.POINTS) : Qt.isSprite && Vn.setMode(X.TRIANGLES);
      if (Qt.isBatchedMesh) {
        if (Qt._multiDrawInstances !== null) ZFe("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), Vn.renderMultiDrawInstances(Qt._multiDrawStarts, Qt._multiDrawCounts, Qt._multiDrawCount, Qt._multiDrawInstances);else if (re.get("WEBGL_multi_draw")) Vn.renderMultiDraw(Qt._multiDrawStarts, Qt._multiDrawCounts, Qt._multiDrawCount);else {
          const Tt = Qt._multiDrawStarts,
            Ue = Qt._multiDrawCounts,
            et = Qt._multiDrawCount,
            ft = rn ? xe.get(rn).bytesPerElement : 1,
            ht = ae.get(hn).currentProgram.getUniforms();
          for (let wt = 0; wt < et; wt++) ht.setValue(X, "_gl_DrawID", wt), Vn.render(Tt[wt] / ft, Ue[wt]);
        }
      } else if (Qt.isInstancedMesh) Vn.renderInstances(un, Kn, Qt.count);else if (St.isInstancedBufferGeometry) {
        const Tt = St._maxInstanceCount !== void 0 ? St._maxInstanceCount : 1 / 0,
          Ue = Math.min(St.instanceCount, Tt);
        Vn.renderInstances(un, Kn, Ue);
      } else Vn.render(un, Kn);
    };
    function He(qe, kt, St) {
      qe.transparent === !0 && qe.side === _y && qe.forceSinglePass === !1 ? (qe.side = xx, qe.needsUpdate = !0, Ht(qe, kt, St), qe.side = uT, qe.needsUpdate = !0, Ht(qe, kt, St), qe.side = _y) : Ht(qe, kt, St);
    }
    this.compile = function (qe, kt, St = null) {
      St === null && (St = qe), A = ve.get(St), A.init(kt), C.push(A), St.traverseVisible(function (Qt) {
        Qt.isLight && Qt.layers.test(kt.layers) && (A.pushLight(Qt), Qt.castShadow && A.pushShadow(Qt));
      }), qe !== St && qe.traverseVisible(function (Qt) {
        Qt.isLight && Qt.layers.test(kt.layers) && (A.pushLight(Qt), Qt.castShadow && A.pushShadow(Qt));
      }), A.setupLights();
      const hn = new Set();
      return qe.traverse(function (Qt) {
        if (!(Qt.isMesh || Qt.isPoints || Qt.isLine || Qt.isSprite)) return;
        const Ot = Qt.material;
        if (Ot) if (Array.isArray(Ot)) for (let ln = 0; ln < Ot.length; ln++) {
          const Pn = Ot[ln];
          He(Pn, St, Qt), hn.add(Pn);
        } else He(Ot, St, Qt), hn.add(Ot);
      }), A = C.pop(), hn;
    }, this.compileAsync = function (qe, kt, St = null) {
      const hn = this.compile(qe, kt, St);
      return new Promise(Qt => {
        function Ot() {
          if (hn.forEach(function (ln) {
            ae.get(ln).currentProgram.isReady() && hn.delete(ln);
          }), hn.size === 0) {
            Qt(qe);
            return;
          }
          setTimeout(Ot, 10);
        }
        re.get("KHR_parallel_shader_compile") !== null ? Ot() : setTimeout(Ot, 10);
      });
    };
    let Ve = null;
    function it(qe) {
      Ve && Ve(qe);
    }
    function It() {
      We.stop();
    }
    function Ft() {
      We.start();
    }
    const We = new cKn();
    We.setAnimationLoop(it), typeof self < "u" && We.setContext(self), this.setAnimationLoop = function (qe) {
      Ve = qe, ze.setAnimationLoop(qe), qe === null ? We.stop() : We.start();
    }, ze.addEventListener("sessionstart", It), ze.addEventListener("sessionend", Ft), this.render = function (qe, kt) {
      if (kt !== void 0 && kt.isCamera !== !0) {
        vl("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (M === !0) return;
      const St = ze.enabled === !0 && ze.isPresenting === !0,
        hn = I !== null && (R === null || St) && I.begin(E, R);
      if (qe.matrixWorldAutoUpdate === !0 && qe.updateMatrixWorld(), kt.parent === null && kt.matrixWorldAutoUpdate === !0 && kt.updateMatrixWorld(), ze.enabled === !0 && ze.isPresenting === !0 && (I === null || I.isCompositing() === !1) && (ze.cameraAutoUpdate === !0 && ze.updateCamera(kt), kt = ze.getCamera()), qe.isScene === !0 && qe.onBeforeRender(E, qe, kt, R), A = ve.get(qe, C.length), A.init(kt), C.push(A), de.multiplyMatrices(kt.projectionMatrix, kt.matrixWorldInverse), Q.setFromProjectionMatrix(de, AM, kt.reversedDepth), ne = this.localClippingEnabled, q = Te.init(this.clippingPlanes, ne), k = ke.get(qe, S.length), k.init(), S.push(k), ze.enabled === !0 && ze.isPresenting === !0) {
        const ln = E.xr.getDepthSensingMesh();
        ln !== null && Ze(ln, kt, -1 / 0, E.sortObjects);
      }
      Ze(qe, kt, 0, E.sortObjects), k.finish(), E.sortObjects === !0 && k.sort(U, H), ce = ze.enabled === !1 || ze.isPresenting === !1 || ze.hasDepthSensing() === !1, ce && me.addToRenderList(k, qe), this.info.render.frame++, q === !0 && Te.beginShadows();
      const Qt = A.state.shadowsArray;
      if (Ne.render(Qt, qe, kt), q === !0 && Te.endShadows(), this.info.autoReset === !0 && this.info.reset(), (hn && I.hasRenderPass()) === !1) {
        const ln = k.opaque,
          Pn = k.transmissive;
        if (A.setupLights(), kt.isArrayCamera) {
          const rn = kt.cameras;
          if (Pn.length > 0) for (let Yn = 0, Ct = rn.length; Yn < Ct; Yn++) {
            const Cn = rn[Yn];
            Oe(ln, Pn, qe, Cn);
          }
          ce && me.render(qe);
          for (let Yn = 0, Ct = rn.length; Yn < Ct; Yn++) {
            const Cn = rn[Yn];
            Ge(k, qe, Cn, Cn.viewport);
          }
        } else Pn.length > 0 && Oe(ln, Pn, qe, kt), ce && me.render(qe), Ge(k, qe, kt);
      }
      R !== null && P === 0 && (be.updateMultisampleRenderTarget(R), be.updateRenderTargetMipmap(R)), hn && I.end(E), qe.isScene === !0 && qe.onAfterRender(E, qe, kt), $e.resetDefaultState(), j = -1, B = null, C.pop(), C.length > 0 ? (A = C[C.length - 1], q === !0 && Te.setGlobalState(E.clippingPlanes, A.state.camera)) : A = null, S.pop(), S.length > 0 ? k = S[S.length - 1] : k = null;
    };
    function Ze(qe, kt, St, hn) {
      if (qe.visible === !1) return;
      if (qe.layers.test(kt.layers)) {
        if (qe.isGroup) St = qe.renderOrder;else if (qe.isLOD) qe.autoUpdate === !0 && qe.update(kt);else if (qe.isLight) A.pushLight(qe), qe.castShadow && A.pushShadow(qe);else if (qe.isSprite) {
          if (!qe.frustumCulled || Q.intersectsSprite(qe)) {
            hn && J.setFromMatrixPosition(qe.matrixWorld).applyMatrix4(de);
            const ln = ue.update(qe),
              Pn = qe.material;
            Pn.visible && k.push(qe, ln, Pn, St, J.z, null);
          }
        } else if ((qe.isMesh || qe.isLine || qe.isPoints) && (!qe.frustumCulled || Q.intersectsObject(qe))) {
          const ln = ue.update(qe),
            Pn = qe.material;
          if (hn && (qe.boundingSphere !== void 0 ? (qe.boundingSphere === null && qe.computeBoundingSphere(), J.copy(qe.boundingSphere.center)) : (ln.boundingSphere === null && ln.computeBoundingSphere(), J.copy(ln.boundingSphere.center)), J.applyMatrix4(qe.matrixWorld).applyMatrix4(de)), Array.isArray(Pn)) {
            const rn = ln.groups;
            for (let Yn = 0, Ct = rn.length; Yn < Ct; Yn++) {
              const Cn = rn[Yn],
                un = Pn[Cn.materialIndex];
              un && un.visible && k.push(qe, ln, un, St, J.z, Cn);
            }
          } else Pn.visible && k.push(qe, ln, Pn, St, J.z, null);
        }
      }
      const Ot = qe.children;
      for (let ln = 0, Pn = Ot.length; ln < Pn; ln++) Ze(Ot[ln], kt, St, hn);
    }
    function Ge(qe, kt, St, hn) {
      const {
        opaque: Qt,
        transmissive: Ot,
        transparent: ln
      } = qe;
      A.setupLightsView(St), q === !0 && Te.setGlobalState(E.clippingPlanes, St), hn && ye.viewport(F.copy(hn)), Qt.length > 0 && st(Qt, kt, St), Ot.length > 0 && st(Ot, kt, St), ln.length > 0 && st(ln, kt, St), ye.buffers.depth.setTest(!0), ye.buffers.depth.setMask(!0), ye.buffers.color.setMask(!0), ye.setPolygonOffset(!1);
    }
    function Oe(qe, kt, St, hn) {
      if ((St.isScene === !0 ? St.overrideMaterial : null) !== null) return;
      if (A.state.transmissionRenderTarget[hn.id] === void 0) {
        const un = re.has("EXT_color_buffer_half_float") || re.has("EXT_color_buffer_float");
        A.state.transmissionRenderTarget[hn.id] = new FE(1, 1, {
          generateMipmaps: !0,
          type: un ? hT : bk,
          minFilter: A7,
          samples: fe.samples,
          stencilBuffer: i,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: vc.workingColorSpace
        });
      }
      const Ot = A.state.transmissionRenderTarget[hn.id],
        ln = hn.viewport || F;
      Ot.setSize(ln.z * E.transmissionResolutionScale, ln.w * E.transmissionResolutionScale);
      const Pn = E.getRenderTarget(),
        rn = E.getActiveCubeFace(),
        Yn = E.getActiveMipmapLevel();
      E.setRenderTarget(Ot), E.getClearColor(z), V = E.getClearAlpha(), V < 1 && E.setClearColor(16777215, .5), E.clear(), ce && me.render(St);
      const Ct = E.toneMapping;
      E.toneMapping = sP;
      const Cn = hn.viewport;
      if (hn.viewport !== void 0 && (hn.viewport = void 0), A.setupLightsView(hn), q === !0 && Te.setGlobalState(E.clippingPlanes, hn), st(qe, St, hn), be.updateMultisampleRenderTarget(Ot), be.updateRenderTargetMipmap(Ot), re.has("WEBGL_multisampled_render_to_texture") === !1) {
        let un = !1;
        for (let Jn = 0, Kn = kt.length; Jn < Kn; Jn++) {
          const en = kt[Jn],
            {
              object: Vn,
              geometry: Tt,
              material: Ue,
              group: et
            } = en;
          if (Ue.side === _y && Vn.layers.test(hn.layers)) {
            const ft = Ue.side;
            Ue.side = xx, Ue.needsUpdate = !0, vt(Vn, St, hn, Tt, Ue, et), Ue.side = ft, Ue.needsUpdate = !0, un = !0;
          }
        }
        un === !0 && (be.updateMultisampleRenderTarget(Ot), be.updateRenderTargetMipmap(Ot));
      }
      E.setRenderTarget(Pn, rn, Yn), E.setClearColor(z, V), Cn !== void 0 && (hn.viewport = Cn), E.toneMapping = Ct;
    }
    function st(qe, kt, St) {
      const hn = kt.isScene === !0 ? kt.overrideMaterial : null;
      for (let Qt = 0, Ot = qe.length; Qt < Ot; Qt++) {
        const ln = qe[Qt],
          {
            object: Pn,
            geometry: rn,
            group: Yn
          } = ln;
        let Ct = ln.material;
        Ct.allowOverride === !0 && hn !== null && (Ct = hn), Pn.layers.test(St.layers) && vt(Pn, kt, St, rn, Ct, Yn);
      }
    }
    function vt(qe, kt, St, hn, Qt, Ot) {
      qe.onBeforeRender(E, kt, St, hn, Qt, Ot), qe.modelViewMatrix.multiplyMatrices(St.matrixWorldInverse, qe.matrixWorld), qe.normalMatrix.getNormalMatrix(qe.modelViewMatrix), Qt.onBeforeRender(E, kt, St, hn, qe, Ot), Qt.transparent === !0 && Qt.side === _y && Qt.forceSinglePass === !1 ? (Qt.side = xx, Qt.needsUpdate = !0, E.renderBufferDirect(St, kt, hn, Qt, qe, Ot), Qt.side = uT, Qt.needsUpdate = !0, E.renderBufferDirect(St, kt, hn, Qt, qe, Ot), Qt.side = _y) : E.renderBufferDirect(St, kt, hn, Qt, qe, Ot), qe.onAfterRender(E, kt, St, hn, Qt, Ot);
    }
    function Ht(qe, kt, St) {
      kt.isScene !== !0 && (kt = pe);
      const hn = ae.get(qe),
        Qt = A.state.lights,
        Ot = A.state.shadowsArray,
        ln = Qt.state.version,
        Pn = ge.getParameters(qe, Qt.state, Ot, kt, St),
        rn = ge.getProgramCacheKey(Pn);
      let Yn = hn.programs;
      hn.environment = qe.isMeshStandardMaterial || qe.isMeshLambertMaterial || qe.isMeshPhongMaterial ? kt.environment : null, hn.fog = kt.fog;
      const Ct = qe.isMeshStandardMaterial || qe.isMeshLambertMaterial && !qe.envMap || qe.isMeshPhongMaterial && !qe.envMap;
      hn.envMap = Ee.get(qe.envMap || hn.environment, Ct), hn.envMapRotation = hn.environment !== null && qe.envMap === null ? kt.environmentRotation : qe.envMapRotation, Yn === void 0 && (qe.addEventListener("dispose", De), Yn = new Map(), hn.programs = Yn);
      let Cn = Yn.get(rn);
      if (Cn !== void 0) {
        if (hn.currentProgram === Cn && hn.lightsStateVersion === ln) return pt(qe, Pn), Cn;
      } else Pn.uniforms = ge.getUniforms(qe), qe.onBeforeCompile(Pn, E), Cn = ge.acquireProgram(Pn, rn), Yn.set(rn, Cn), hn.uniforms = Pn.uniforms;
      const un = hn.uniforms;
      return (!qe.isShaderMaterial && !qe.isRawShaderMaterial || qe.clipping === !0) && (un.clippingPlanes = Te.uniform), pt(qe, Pn), hn.needsLights = Ut(qe), hn.lightsStateVersion = ln, hn.needsLights && (un.ambientLightColor.value = Qt.state.ambient, un.lightProbe.value = Qt.state.probe, un.directionalLights.value = Qt.state.directional, un.directionalLightShadows.value = Qt.state.directionalShadow, un.spotLights.value = Qt.state.spot, un.spotLightShadows.value = Qt.state.spotShadow, un.rectAreaLights.value = Qt.state.rectArea, un.ltc_1.value = Qt.state.rectAreaLTC1, un.ltc_2.value = Qt.state.rectAreaLTC2, un.pointLights.value = Qt.state.point, un.pointLightShadows.value = Qt.state.pointShadow, un.hemisphereLights.value = Qt.state.hemi, un.directionalShadowMatrix.value = Qt.state.directionalShadowMatrix, un.spotLightMatrix.value = Qt.state.spotLightMatrix, un.spotLightMap.value = Qt.state.spotLightMap, un.pointShadowMatrix.value = Qt.state.pointShadowMatrix), hn.currentProgram = Cn, hn.uniformsList = null, Cn;
    }
    function nn(qe) {
      if (qe.uniformsList === null) {
        const kt = qe.currentProgram.getUniforms();
        qe.uniformsList = RNe.seqWithValue(kt.seq, qe.uniforms);
      }
      return qe.uniformsList;
    }
    function pt(qe, kt) {
      const St = ae.get(qe);
      St.outputColorSpace = kt.outputColorSpace, St.batching = kt.batching, St.batchingColor = kt.batchingColor, St.instancing = kt.instancing, St.instancingColor = kt.instancingColor, St.instancingMorph = kt.instancingMorph, St.skinning = kt.skinning, St.morphTargets = kt.morphTargets, St.morphNormals = kt.morphNormals, St.morphColors = kt.morphColors, St.morphTargetsCount = kt.morphTargetsCount, St.numClippingPlanes = kt.numClippingPlanes, St.numIntersection = kt.numClipIntersection, St.vertexAlphas = kt.vertexAlphas, St.vertexTangents = kt.vertexTangents, St.toneMapping = kt.toneMapping;
    }
    function lt(qe, kt, St, hn, Qt) {
      kt.isScene !== !0 && (kt = pe), be.resetTextureUnits();
      const Ot = kt.fog,
        ln = hn.isMeshStandardMaterial || hn.isMeshLambertMaterial || hn.isMeshPhongMaterial ? kt.environment : null,
        Pn = R === null ? E.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : l_,
        rn = hn.isMeshStandardMaterial || hn.isMeshLambertMaterial && !hn.envMap || hn.isMeshPhongMaterial && !hn.envMap,
        Yn = Ee.get(hn.envMap || ln, rn),
        Ct = hn.vertexColors === !0 && !!St.attributes.color && St.attributes.color.itemSize === 4,
        Cn = !!St.attributes.tangent && (!!hn.normalMap || hn.anisotropy > 0),
        un = !!St.morphAttributes.position,
        Jn = !!St.morphAttributes.normal,
        Kn = !!St.morphAttributes.color;
      let en = sP;
      hn.toneMapped && (R === null || R.isXRRenderTarget === !0) && (en = E.toneMapping);
      const Vn = St.morphAttributes.position || St.morphAttributes.normal || St.morphAttributes.color,
        Tt = Vn !== void 0 ? Vn.length : 0,
        Ue = ae.get(hn),
        et = A.state.lights;
      if (q === !0 && (ne === !0 || qe !== B)) {
        const Pt = qe === B && hn.id === j;
        Te.setState(hn, qe, Pt);
      }
      let ft = !1;
      hn.version === Ue.__version ? (Ue.needsLights && Ue.lightsStateVersion !== et.state.version || Ue.outputColorSpace !== Pn || Qt.isBatchedMesh && Ue.batching === !1 || !Qt.isBatchedMesh && Ue.batching === !0 || Qt.isBatchedMesh && Ue.batchingColor === !0 && Qt.colorTexture === null || Qt.isBatchedMesh && Ue.batchingColor === !1 && Qt.colorTexture !== null || Qt.isInstancedMesh && Ue.instancing === !1 || !Qt.isInstancedMesh && Ue.instancing === !0 || Qt.isSkinnedMesh && Ue.skinning === !1 || !Qt.isSkinnedMesh && Ue.skinning === !0 || Qt.isInstancedMesh && Ue.instancingColor === !0 && Qt.instanceColor === null || Qt.isInstancedMesh && Ue.instancingColor === !1 && Qt.instanceColor !== null || Qt.isInstancedMesh && Ue.instancingMorph === !0 && Qt.morphTexture === null || Qt.isInstancedMesh && Ue.instancingMorph === !1 && Qt.morphTexture !== null || Ue.envMap !== Yn || hn.fog === !0 && Ue.fog !== Ot || Ue.numClippingPlanes !== void 0 && (Ue.numClippingPlanes !== Te.numPlanes || Ue.numIntersection !== Te.numIntersection) || Ue.vertexAlphas !== Ct || Ue.vertexTangents !== Cn || Ue.morphTargets !== un || Ue.morphNormals !== Jn || Ue.morphColors !== Kn || Ue.toneMapping !== en || Ue.morphTargetsCount !== Tt) && (ft = !0) : (ft = !0, Ue.__version = hn.version);
      let ht = Ue.currentProgram;
      ft === !0 && (ht = Ht(hn, kt, Qt));
      let wt = !1,
        jt = !1,
        bt = !1;
      const Bt = ht.getUniforms(),
        wn = Ue.uniforms;
      if (ye.useProgram(ht.program) && (wt = !0, jt = !0, bt = !0), hn.id !== j && (j = hn.id, jt = !0), wt || B !== qe) {
        ye.buffers.depth.getReversed() && qe.reversedDepth !== !0 && (qe._reversedDepth = !0, qe.updateProjectionMatrix()), Bt.setValue(X, "projectionMatrix", qe.projectionMatrix), Bt.setValue(X, "viewMatrix", qe.matrixWorldInverse);
        const dt = Bt.map.cameraPosition;
        dt !== void 0 && dt.setValue(X, le.setFromMatrixPosition(qe.matrixWorld)), fe.logarithmicDepthBuffer && Bt.setValue(X, "logDepthBufFC", 2 / (Math.log(qe.far + 1) / Math.LN2)), (hn.isMeshPhongMaterial || hn.isMeshToonMaterial || hn.isMeshLambertMaterial || hn.isMeshBasicMaterial || hn.isMeshStandardMaterial || hn.isShaderMaterial) && Bt.setValue(X, "isOrthographic", qe.isOrthographicCamera === !0), B !== qe && (B = qe, jt = !0, bt = !0);
      }
      if (Ue.needsLights && (et.state.directionalShadowMap.length > 0 && Bt.setValue(X, "directionalShadowMap", et.state.directionalShadowMap, be), et.state.spotShadowMap.length > 0 && Bt.setValue(X, "spotShadowMap", et.state.spotShadowMap, be), et.state.pointShadowMap.length > 0 && Bt.setValue(X, "pointShadowMap", et.state.pointShadowMap, be)), Qt.isSkinnedMesh) {
        Bt.setOptional(X, Qt, "bindMatrix"), Bt.setOptional(X, Qt, "bindMatrixInverse");
        const Pt = Qt.skeleton;
        Pt && (Pt.boneTexture === null && Pt.computeBoneTexture(), Bt.setValue(X, "boneTexture", Pt.boneTexture, be));
      }
      Qt.isBatchedMesh && (Bt.setOptional(X, Qt, "batchingTexture"), Bt.setValue(X, "batchingTexture", Qt._matricesTexture, be), Bt.setOptional(X, Qt, "batchingIdTexture"), Bt.setValue(X, "batchingIdTexture", Qt._indirectTexture, be), Bt.setOptional(X, Qt, "batchingColorTexture"), Qt._colorsTexture !== null && Bt.setValue(X, "batchingColorTexture", Qt._colorsTexture, be));
      const at = St.morphAttributes;
      if ((at.position !== void 0 || at.normal !== void 0 || at.color !== void 0) && Ae.update(Qt, St, ht), (jt || Ue.receiveShadow !== Qt.receiveShadow) && (Ue.receiveShadow = Qt.receiveShadow, Bt.setValue(X, "receiveShadow", Qt.receiveShadow)), (hn.isMeshStandardMaterial || hn.isMeshLambertMaterial || hn.isMeshPhongMaterial) && hn.envMap === null && kt.environment !== null && (wn.envMapIntensity.value = kt.environmentIntensity), wn.dfgLUT !== void 0 && (wn.dfgLUT.value = p3a()), jt && (Bt.setValue(X, "toneMappingExposure", E.toneMappingExposure), Ue.needsLights && gt(wn, bt), Ot && hn.fog === !0 && _e.refreshFogUniforms(wn, Ot), _e.refreshMaterialUniforms(wn, hn, D, L, A.state.transmissionRenderTarget[qe.id]), RNe.upload(X, nn(Ue), wn, be)), hn.isShaderMaterial && hn.uniformsNeedUpdate === !0 && (RNe.upload(X, nn(Ue), wn, be), hn.uniformsNeedUpdate = !1), hn.isSpriteMaterial && Bt.setValue(X, "center", Qt.center), Bt.setValue(X, "modelViewMatrix", Qt.modelViewMatrix), Bt.setValue(X, "normalMatrix", Qt.normalMatrix), Bt.setValue(X, "modelMatrix", Qt.matrixWorld), hn.isShaderMaterial || hn.isRawShaderMaterial) {
        const Pt = hn.uniformsGroups;
        for (let dt = 0, xt = Pt.length; dt < xt; dt++) {
          const yn = Pt[dt];
          rt.update(yn, ht), rt.bind(yn, ht);
        }
      }
      return ht;
    }
    function gt(qe, kt) {
      qe.ambientLightColor.needsUpdate = kt, qe.lightProbe.needsUpdate = kt, qe.directionalLights.needsUpdate = kt, qe.directionalLightShadows.needsUpdate = kt, qe.pointLights.needsUpdate = kt, qe.pointLightShadows.needsUpdate = kt, qe.spotLights.needsUpdate = kt, qe.spotLightShadows.needsUpdate = kt, qe.rectAreaLights.needsUpdate = kt, qe.hemisphereLights.needsUpdate = kt;
    }
    function Ut(qe) {
      return qe.isMeshLambertMaterial || qe.isMeshToonMaterial || qe.isMeshPhongMaterial || qe.isMeshStandardMaterial || qe.isShadowMaterial || qe.isShaderMaterial && qe.lights === !0;
    }
    this.getActiveCubeFace = function () {
      return T;
    }, this.getActiveMipmapLevel = function () {
      return P;
    }, this.getRenderTarget = function () {
      return R;
    }, this.setRenderTargetTextures = function (qe, kt, St) {
      const hn = ae.get(qe);
      hn.__autoAllocateDepthBuffer = qe.resolveDepthBuffer === !1, hn.__autoAllocateDepthBuffer === !1 && (hn.__useRenderToTexture = !1), ae.get(qe.texture).__webglTexture = kt, ae.get(qe.depthTexture).__webglTexture = hn.__autoAllocateDepthBuffer ? void 0 : St, hn.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function (qe, kt) {
      const St = ae.get(qe);
      St.__webglFramebuffer = kt, St.__useDefaultFramebuffer = kt === void 0;
    };
    const _t = X.createFramebuffer();
    this.setRenderTarget = function (qe, kt = 0, St = 0) {
      R = qe, T = kt, P = St;
      let hn = null,
        Qt = !1,
        Ot = !1;
      if (qe) {
        const Pn = ae.get(qe);
        if (Pn.__useDefaultFramebuffer !== void 0) {
          ye.bindFramebuffer(X.FRAMEBUFFER, Pn.__webglFramebuffer), F.copy(qe.viewport), N.copy(qe.scissor), G = qe.scissorTest, ye.viewport(F), ye.scissor(N), ye.setScissorTest(G), j = -1;
          return;
        } else if (Pn.__webglFramebuffer === void 0) be.setupRenderTarget(qe);else if (Pn.__hasExternalTextures) be.rebindTextures(qe, ae.get(qe.texture).__webglTexture, ae.get(qe.depthTexture).__webglTexture);else if (qe.depthBuffer) {
          const Ct = qe.depthTexture;
          if (Pn.__boundDepthTexture !== Ct) {
            if (Ct !== null && ae.has(Ct) && (qe.width !== Ct.image.width || qe.height !== Ct.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            be.setupDepthRenderbuffer(qe);
          }
        }
        const rn = qe.texture;
        (rn.isData3DTexture || rn.isDataArrayTexture || rn.isCompressedArrayTexture) && (Ot = !0);
        const Yn = ae.get(qe).__webglFramebuffer;
        qe.isWebGLCubeRenderTarget ? (Array.isArray(Yn[kt]) ? hn = Yn[kt][St] : hn = Yn[kt], Qt = !0) : qe.samples > 0 && be.useMultisampledRTT(qe) === !1 ? hn = ae.get(qe).__webglMultisampledFramebuffer : Array.isArray(Yn) ? hn = Yn[St] : hn = Yn, F.copy(qe.viewport), N.copy(qe.scissor), G = qe.scissorTest;
      } else F.copy(Y).multiplyScalar(D).floor(), N.copy(K).multiplyScalar(D).floor(), G = W;
      if (St !== 0 && (hn = _t), ye.bindFramebuffer(X.FRAMEBUFFER, hn) && ye.drawBuffers(qe, hn), ye.viewport(F), ye.scissor(N), ye.setScissorTest(G), Qt) {
        const Pn = ae.get(qe.texture);
        X.framebufferTexture2D(X.FRAMEBUFFER, X.COLOR_ATTACHMENT0, X.TEXTURE_CUBE_MAP_POSITIVE_X + kt, Pn.__webglTexture, St);
      } else if (Ot) {
        const Pn = kt;
        for (let rn = 0; rn < qe.textures.length; rn++) {
          const Yn = ae.get(qe.textures[rn]);
          X.framebufferTextureLayer(X.FRAMEBUFFER, X.COLOR_ATTACHMENT0 + rn, Yn.__webglTexture, St, Pn);
        }
      } else if (qe !== null && St !== 0) {
        const Pn = ae.get(qe.texture);
        X.framebufferTexture2D(X.FRAMEBUFFER, X.COLOR_ATTACHMENT0, X.TEXTURE_2D, Pn.__webglTexture, St);
      }
      j = -1;
    }, this.readRenderTargetPixels = function (qe, kt, St, hn, Qt, Ot, ln, Pn = 0) {
      if (!(qe && qe.isWebGLRenderTarget)) {
        vl("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let rn = ae.get(qe).__webglFramebuffer;
      if (qe.isWebGLCubeRenderTarget && ln !== void 0 && (rn = rn[ln]), rn) {
        ye.bindFramebuffer(X.FRAMEBUFFER, rn);
        try {
          const Yn = qe.textures[Pn],
            Ct = Yn.format,
            Cn = Yn.type;
          if (qe.textures.length > 1 && X.readBuffer(X.COLOR_ATTACHMENT0 + Pn), !fe.textureFormatReadable(Ct)) {
            vl("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!fe.textureTypeReadable(Cn)) {
            vl("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          kt >= 0 && kt <= qe.width - hn && St >= 0 && St <= qe.height - Qt && X.readPixels(kt, St, hn, Qt, Re.convert(Ct), Re.convert(Cn), Ot);
        } finally {
          const Yn = R !== null ? ae.get(R).__webglFramebuffer : null;
          ye.bindFramebuffer(X.FRAMEBUFFER, Yn);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function (qe, kt, St, hn, Qt, Ot, ln, Pn = 0) {
      if (!(qe && qe.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let rn = ae.get(qe).__webglFramebuffer;
      if (qe.isWebGLCubeRenderTarget && ln !== void 0 && (rn = rn[ln]), rn) if (kt >= 0 && kt <= qe.width - hn && St >= 0 && St <= qe.height - Qt) {
        ye.bindFramebuffer(X.FRAMEBUFFER, rn);
        const Yn = qe.textures[Pn],
          Ct = Yn.format,
          Cn = Yn.type;
        if (qe.textures.length > 1 && X.readBuffer(X.COLOR_ATTACHMENT0 + Pn), !fe.textureFormatReadable(Ct)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!fe.textureTypeReadable(Cn)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const un = X.createBuffer();
        X.bindBuffer(X.PIXEL_PACK_BUFFER, un), X.bufferData(X.PIXEL_PACK_BUFFER, Ot.byteLength, X.STREAM_READ), X.readPixels(kt, St, hn, Qt, Re.convert(Ct), Re.convert(Cn), 0);
        const Jn = R !== null ? ae.get(R).__webglFramebuffer : null;
        ye.bindFramebuffer(X.FRAMEBUFFER, Jn);
        const Kn = X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return X.flush(), await lwa(X, Kn, 4), X.bindBuffer(X.PIXEL_PACK_BUFFER, un), X.getBufferSubData(X.PIXEL_PACK_BUFFER, 0, Ot), X.deleteBuffer(un), X.deleteSync(Kn), Ot;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function (qe, kt = null, St = 0) {
      const hn = Math.pow(2, -St),
        Qt = Math.floor(qe.image.width * hn),
        Ot = Math.floor(qe.image.height * hn),
        ln = kt !== null ? kt.x : 0,
        Pn = kt !== null ? kt.y : 0;
      be.setTexture2D(qe, 0), X.copyTexSubImage2D(X.TEXTURE_2D, St, 0, 0, ln, Pn, Qt, Ot), ye.unbindTexture();
    };
    const At = X.createFramebuffer(),
      Yt = X.createFramebuffer();
    this.copyTextureToTexture = function (qe, kt, St = null, hn = null, Qt = 0, Ot = 0) {
      let ln, Pn, rn, Yn, Ct, Cn, un, Jn, Kn;
      const en = qe.isCompressedTexture ? qe.mipmaps[Ot] : qe.image;
      if (St !== null) ln = St.max.x - St.min.x, Pn = St.max.y - St.min.y, rn = St.isBox3 ? St.max.z - St.min.z : 1, Yn = St.min.x, Ct = St.min.y, Cn = St.isBox3 ? St.min.z : 0;else {
        const wn = Math.pow(2, -Qt);
        ln = Math.floor(en.width * wn), Pn = Math.floor(en.height * wn), qe.isDataArrayTexture ? rn = en.depth : qe.isData3DTexture ? rn = Math.floor(en.depth * wn) : rn = 1, Yn = 0, Ct = 0, Cn = 0;
      }
      hn !== null ? (un = hn.x, Jn = hn.y, Kn = hn.z) : (un = 0, Jn = 0, Kn = 0);
      const Vn = Re.convert(kt.format),
        Tt = Re.convert(kt.type);
      let Ue;
      kt.isData3DTexture ? (be.setTexture3D(kt, 0), Ue = X.TEXTURE_3D) : kt.isDataArrayTexture || kt.isCompressedArrayTexture ? (be.setTexture2DArray(kt, 0), Ue = X.TEXTURE_2D_ARRAY) : (be.setTexture2D(kt, 0), Ue = X.TEXTURE_2D), X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL, kt.flipY), X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL, kt.premultiplyAlpha), X.pixelStorei(X.UNPACK_ALIGNMENT, kt.unpackAlignment);
      const et = X.getParameter(X.UNPACK_ROW_LENGTH),
        ft = X.getParameter(X.UNPACK_IMAGE_HEIGHT),
        ht = X.getParameter(X.UNPACK_SKIP_PIXELS),
        wt = X.getParameter(X.UNPACK_SKIP_ROWS),
        jt = X.getParameter(X.UNPACK_SKIP_IMAGES);
      X.pixelStorei(X.UNPACK_ROW_LENGTH, en.width), X.pixelStorei(X.UNPACK_IMAGE_HEIGHT, en.height), X.pixelStorei(X.UNPACK_SKIP_PIXELS, Yn), X.pixelStorei(X.UNPACK_SKIP_ROWS, Ct), X.pixelStorei(X.UNPACK_SKIP_IMAGES, Cn);
      const bt = qe.isDataArrayTexture || qe.isData3DTexture,
        Bt = kt.isDataArrayTexture || kt.isData3DTexture;
      if (qe.isDepthTexture) {
        const wn = ae.get(qe),
          at = ae.get(kt),
          Pt = ae.get(wn.__renderTarget),
          dt = ae.get(at.__renderTarget);
        ye.bindFramebuffer(X.READ_FRAMEBUFFER, Pt.__webglFramebuffer), ye.bindFramebuffer(X.DRAW_FRAMEBUFFER, dt.__webglFramebuffer);
        for (let xt = 0; xt < rn; xt++) bt && (X.framebufferTextureLayer(X.READ_FRAMEBUFFER, X.COLOR_ATTACHMENT0, ae.get(qe).__webglTexture, Qt, Cn + xt), X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER, X.COLOR_ATTACHMENT0, ae.get(kt).__webglTexture, Ot, Kn + xt)), X.blitFramebuffer(Yn, Ct, ln, Pn, un, Jn, ln, Pn, X.DEPTH_BUFFER_BIT, X.NEAREST);
        ye.bindFramebuffer(X.READ_FRAMEBUFFER, null), ye.bindFramebuffer(X.DRAW_FRAMEBUFFER, null);
      } else if (Qt !== 0 || qe.isRenderTargetTexture || ae.has(qe)) {
        const wn = ae.get(qe),
          at = ae.get(kt);
        ye.bindFramebuffer(X.READ_FRAMEBUFFER, At), ye.bindFramebuffer(X.DRAW_FRAMEBUFFER, Yt);
        for (let Pt = 0; Pt < rn; Pt++) bt ? X.framebufferTextureLayer(X.READ_FRAMEBUFFER, X.COLOR_ATTACHMENT0, wn.__webglTexture, Qt, Cn + Pt) : X.framebufferTexture2D(X.READ_FRAMEBUFFER, X.COLOR_ATTACHMENT0, X.TEXTURE_2D, wn.__webglTexture, Qt), Bt ? X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER, X.COLOR_ATTACHMENT0, at.__webglTexture, Ot, Kn + Pt) : X.framebufferTexture2D(X.DRAW_FRAMEBUFFER, X.COLOR_ATTACHMENT0, X.TEXTURE_2D, at.__webglTexture, Ot), Qt !== 0 ? X.blitFramebuffer(Yn, Ct, ln, Pn, un, Jn, ln, Pn, X.COLOR_BUFFER_BIT, X.NEAREST) : Bt ? X.copyTexSubImage3D(Ue, Ot, un, Jn, Kn + Pt, Yn, Ct, ln, Pn) : X.copyTexSubImage2D(Ue, Ot, un, Jn, Yn, Ct, ln, Pn);
        ye.bindFramebuffer(X.READ_FRAMEBUFFER, null), ye.bindFramebuffer(X.DRAW_FRAMEBUFFER, null);
      } else Bt ? qe.isDataTexture || qe.isData3DTexture ? X.texSubImage3D(Ue, Ot, un, Jn, Kn, ln, Pn, rn, Vn, Tt, en.data) : kt.isCompressedArrayTexture ? X.compressedTexSubImage3D(Ue, Ot, un, Jn, Kn, ln, Pn, rn, Vn, en.data) : X.texSubImage3D(Ue, Ot, un, Jn, Kn, ln, Pn, rn, Vn, Tt, en) : qe.isDataTexture ? X.texSubImage2D(X.TEXTURE_2D, Ot, un, Jn, ln, Pn, Vn, Tt, en.data) : qe.isCompressedTexture ? X.compressedTexSubImage2D(X.TEXTURE_2D, Ot, un, Jn, en.width, en.height, Vn, en.data) : X.texSubImage2D(X.TEXTURE_2D, Ot, un, Jn, ln, Pn, Vn, Tt, en);
      X.pixelStorei(X.UNPACK_ROW_LENGTH, et), X.pixelStorei(X.UNPACK_IMAGE_HEIGHT, ft), X.pixelStorei(X.UNPACK_SKIP_PIXELS, ht), X.pixelStorei(X.UNPACK_SKIP_ROWS, wt), X.pixelStorei(X.UNPACK_SKIP_IMAGES, jt), Ot === 0 && kt.generateMipmaps && X.generateMipmap(Ue), ye.unbindTexture();
    }, this.initRenderTarget = function (qe) {
      ae.get(qe).__webglFramebuffer === void 0 && be.setupRenderTarget(qe);
    }, this.initTexture = function (qe) {
      qe.isCubeTexture ? be.setTextureCube(qe, 0) : qe.isData3DTexture ? be.setTexture3D(qe, 0) : qe.isDataArrayTexture || qe.isCompressedArrayTexture ? be.setTexture2DArray(qe, 0) : be.setTexture2D(qe, 0), ye.unbindTexture();
    }, this.resetState = function () {
      T = 0, P = 0, R = null, ye.reset(), $e.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  get coordinateSystem() {
    return AM;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const n = this.getContext();
    n.drawingBufferColorSpace = vc._getDrawingBufferColorSpace(t), n.unpackColorSpace = vc._getUnpackColorSpace();
  }
}

const Sen = {
    type: "change"
  },
  hDt = {
    type: "start"
  },
  fKn = {
    type: "end"
  },
  O8e = new tpe(),
  Ien = new D1(),
  m3a = Math.cos(70 * Mo.DEG2RAD),
  eb = new dr(),
  M_ = 2 * Math.PI,
  fp = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_PAN: 4,
    TOUCH_DOLLY_PAN: 5,
    TOUCH_DOLLY_ROTATE: 6
  },
  Drt = 1e-6;

class zve extends lKn {
  constructor(t, n = null) {
    super(t, n), this.state = fp.NONE, this.target = new dr(), this.cursor = new dr(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: tj.ROTATE,
      MIDDLE: tj.DOLLY,
      RIGHT: tj.PAN
    }, this.touches = {
      ONE: kre.ROTATE,
      TWO: kre.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new dr(), this._lastQuaternion = new hl(), this._lastTargetPosition = new dr(), this._quat = new hl().setFromUnitVectors(t.up, new dr(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ZZt(), this._sphericalDelta = new ZZt(), this._scale = 1, this._panOffset = new dr(), this._rotateStart = new Qi(), this._rotateEnd = new Qi(), this._rotateDelta = new Qi(), this._panStart = new Qi(), this._panEnd = new Qi(), this._panDelta = new Qi(), this._dollyStart = new Qi(), this._dollyEnd = new Qi(), this._dollyDelta = new Qi(), this._dollyDirection = new dr(), this._mouse = new Qi(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = g3a.bind(this), this._onPointerDown = f3a.bind(this), this._onPointerUp = y3a.bind(this), this._onContextMenu = A3a.bind(this), this._onMouseWheel = w3a.bind(this), this._onKeyDown = x3a.bind(this), this._onTouchStart = _3a.bind(this), this._onTouchMove = k3a.bind(this), this._onMouseDown = b3a.bind(this), this._onMouseMove = v3a.bind(this), this._interceptControlDown = S3a.bind(this), this._interceptControlUp = I3a.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  set cursorStyle(t) {
    this._cursorStyle = t, t === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
  }
  get cursorStyle() {
    return this._cursorStyle;
  }
  connect(t) {
    super.connect(t), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, {
      passive: !1
    }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
      passive: !0,
      capture: !0
    }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, {
      capture: !0
    }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Sen), this.update(), this.state = fp.NONE;
  }
  pan(t, n) {
    this._pan(t, n), this.update();
  }
  dollyIn(t) {
    this._dollyIn(t), this.update();
  }
  dollyOut(t) {
    this._dollyOut(t), this.update();
  }
  rotateLeft(t) {
    this._rotateLeft(t), this.update();
  }
  rotateUp(t) {
    this._rotateUp(t), this.update();
  }
  update(t = null) {
    const n = this.object.position;
    eb.copy(n).sub(this.target), eb.applyQuaternion(this._quat), this._spherical.setFromVector3(eb), this.autoRotate && this.state === fp.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let r = this.minAzimuthAngle,
      a = this.maxAzimuthAngle;
    isFinite(r) && isFinite(a) && (r < -Math.PI ? r += M_ : r > Math.PI && (r -= M_), a < -Math.PI ? a += M_ : a > Math.PI && (a -= M_), r <= a ? this._spherical.theta = Math.max(r, Math.min(a, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (r + a) / 2 ? Math.max(r, this._spherical.theta) : Math.min(a, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let i = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = o != this._spherical.radius;
    }
    if (eb.setFromSpherical(this._spherical), eb.applyQuaternion(this._quatInverse), n.copy(this.target).add(eb), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const s = eb.length();
        o = this._clampDistance(s * this._scale);
        const l = s - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), i = !!l;
      } else if (this.object.isOrthographicCamera) {
        const s = new dr(this._mouse.x, this._mouse.y, 0);
        s.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = l !== this.object.zoom;
        const d = new dr(this._mouse.x, this._mouse.y, 0);
        d.unproject(this.object), this.object.position.sub(d).add(s), this.object.updateMatrixWorld(), o = eb.length();
      } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (O8e.origin.copy(this.object.position), O8e.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(O8e.direction)) < m3a ? this.object.lookAt(this.target) : (Ien.setFromNormalAndCoplanarPoint(this.object.up, this.target), O8e.intersectPlane(Ien, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > Drt || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Drt || this._lastTargetPosition.distanceToSquared(this.target) > Drt ? (this.dispatchEvent(Sen), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? M_ / 60 * this.autoRotateSpeed * t : M_ / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const n = Math.abs(t * .01);
    return Math.pow(.95, this.zoomSpeed * n);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, n) {
    eb.setFromMatrixColumn(n, 0), eb.multiplyScalar(-t), this._panOffset.add(eb);
  }
  _panUp(t, n) {
    this.screenSpacePanning === !0 ? eb.setFromMatrixColumn(n, 1) : (eb.setFromMatrixColumn(n, 0), eb.crossVectors(this.object.up, eb)), eb.multiplyScalar(t), this._panOffset.add(eb);
  }
  _pan(t, n) {
    const r = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const a = this.object.position;
      eb.copy(a).sub(this.target);
      let i = eb.length();
      i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * i / r.clientHeight, this.object.matrix), this._panUp(2 * n * i / r.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / r.clientWidth, this.object.matrix), this._panUp(n * (this.object.top - this.object.bottom) / this.object.zoom / r.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(t, n) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = !0;
    const r = this.domElement.getBoundingClientRect(),
      a = t - r.left,
      i = n - r.top,
      o = r.width,
      s = r.height;
    this._mouse.x = a / o * 2 - 1, this._mouse.y = -(i / s) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const n = this.domElement;
    this._rotateLeft(M_ * this._rotateDelta.x / n.clientHeight), this._rotateUp(M_ * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let n = !1;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(M_ * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), n = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-M_ * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), n = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(M_ * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), n = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-M_ * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), n = !0;
        break;
    }
    n && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY);else {
      const n = this._getSecondPointerPosition(t),
        r = .5 * (t.pageX + n.x),
        a = .5 * (t.pageY + n.y);
      this._rotateStart.set(r, a);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY);else {
      const n = this._getSecondPointerPosition(t),
        r = .5 * (t.pageX + n.x),
        a = .5 * (t.pageY + n.y);
      this._panStart.set(r, a);
    }
  }
  _handleTouchStartDolly(t) {
    const n = this._getSecondPointerPosition(t),
      r = t.pageX - n.x,
      a = t.pageY - n.y,
      i = Math.sqrt(r * r + a * a);
    this._dollyStart.set(0, i);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY);else {
      const r = this._getSecondPointerPosition(t),
        a = .5 * (t.pageX + r.x),
        i = .5 * (t.pageY + r.y);
      this._rotateEnd.set(a, i);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const n = this.domElement;
    this._rotateLeft(M_ * this._rotateDelta.x / n.clientHeight), this._rotateUp(M_ * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY);else {
      const n = this._getSecondPointerPosition(t),
        r = .5 * (t.pageX + n.x),
        a = .5 * (t.pageY + n.y);
      this._panEnd.set(r, a);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const n = this._getSecondPointerPosition(t),
      r = t.pageX - n.x,
      a = t.pageY - n.y,
      i = Math.sqrt(r * r + a * a);
    this._dollyEnd.set(0, i), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (t.pageX + n.x) * .5,
      s = (t.pageY + n.y) * .5;
    this._updateZoomParameters(o, s);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let n = 0; n < this._pointers.length; n++) if (this._pointers[n] == t.pointerId) {
      this._pointers.splice(n, 1);
      return;
    }
  }
  _isTrackingPointer(t) {
    for (let n = 0; n < this._pointers.length; n++) if (this._pointers[n] == t.pointerId) return !0;
    return !1;
  }
  _trackPointer(t) {
    let n = this._pointerPositions[t.pointerId];
    n === void 0 && (n = new Qi(), this._pointerPositions[t.pointerId] = n), n.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const n = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[n];
  }
  _customWheelEvent(t) {
    const n = t.deltaMode,
      r = {
        clientX: t.clientX,
        clientY: t.clientY,
        deltaY: t.deltaY
      };
    switch (n) {
      case 1:
        r.deltaY *= 16;
        break;
      case 2:
        r.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (r.deltaY *= 10), r;
  }
}

function f3a(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}

function g3a(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}

function y3a(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(fKn), this.state = fp.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
      break;
    case 1:
      const t = this._pointers[0],
        n = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: n.x,
        pageY: n.y
      });
      break;
  }
}

function b3a(e) {
  let t;
  switch (e.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case tj.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = fp.DOLLY;
      break;
    case tj.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = fp.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = fp.ROTATE;
      }
      break;
    case tj.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = fp.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = fp.PAN;
      }
      break;
    default:
      this.state = fp.NONE;
  }
  this.state !== fp.NONE && this.dispatchEvent(hDt);
}

function v3a(e) {
  switch (this.state) {
    case fp.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case fp.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case fp.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}

function w3a(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== fp.NONE || (e.preventDefault(), this.dispatchEvent(hDt), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(fKn));
}

function x3a(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}

function _3a(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case kre.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = fp.TOUCH_ROTATE;
          break;
        case kre.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = fp.TOUCH_PAN;
          break;
        default:
          this.state = fp.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case kre.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = fp.TOUCH_DOLLY_PAN;
          break;
        case kre.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = fp.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = fp.NONE;
      }
      break;
    default:
      this.state = fp.NONE;
  }
  this.state !== fp.NONE && this.dispatchEvent(hDt);
}

function k3a(e) {
  switch (this._trackPointer(e), this.state) {
    case fp.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case fp.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case fp.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case fp.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = fp.NONE;
  }
}

function A3a(e) {
  this.enabled !== !1 && e.preventDefault();
}

function S3a(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}

function I3a(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}

const BG = new tJ(),
  Bw = new dr(),
  bL = new dr(),
  af = new hl(),
  Cen = {
    X: new dr(1, 0, 0),
    Y: new dr(0, 1, 0),
    Z: new dr(0, 0, 1)
  },
  Lrt = {
    type: "change"
  },
  Een = {
    type: "mouseDown",
    mode: null
  },
  Ten = {
    type: "mouseUp",
    mode: null
  },
  Men = {
    type: "objectChange"
  };

class C3a extends lKn {
  constructor(t, n = null) {
    super(void 0, n);
    const r = new N3a(this);
    this._root = r;
    const a = new j3a();
    this._gizmo = a, r.add(a);
    const i = new D3a();
    this._plane = i, r.add(i);
    const o = this;
    function s(w, k) {
      let A = k;
      Object.defineProperty(o, w, {
        get: function () {
          return A !== void 0 ? A : k;
        },
        set: function (S) {
          A !== S && (A = S, i[w] = S, a[w] = S, o.dispatchEvent({
            type: w + "-changed",
            value: S
          }), o.dispatchEvent(Lrt));
        }
      }), o[w] = k, i[w] = k, a[w] = k;
    }
    s("camera", t), s("object", void 0), s("enabled", !0), s("axis", null), s("mode", "translate"), s("translationSnap", null), s("rotationSnap", null), s("scaleSnap", null), s("space", "world"), s("size", 1), s("dragging", !1), s("showX", !0), s("showY", !0), s("showZ", !0), s("minX", -1 / 0), s("maxX", 1 / 0), s("minY", -1 / 0), s("maxY", 1 / 0), s("minZ", -1 / 0), s("maxZ", 1 / 0);
    const l = new dr(),
      d = new dr(),
      u = new hl(),
      h = new hl(),
      p = new dr(),
      m = new hl(),
      f = new dr(),
      y = new dr(),
      b = new dr(),
      v = 0,
      _ = new dr();
    s("worldPosition", l), s("worldPositionStart", d), s("worldQuaternion", u), s("worldQuaternionStart", h), s("cameraPosition", p), s("cameraQuaternion", m), s("pointStart", f), s("pointEnd", y), s("rotationAxis", b), s("rotationAngle", v), s("eye", _), this._offset = new dr(), this._startNorm = new dr(), this._endNorm = new dr(), this._cameraScale = new dr(), this._parentPosition = new dr(), this._parentQuaternion = new hl(), this._parentQuaternionInv = new hl(), this._parentScale = new dr(), this._worldScaleStart = new dr(), this._worldQuaternionInv = new hl(), this._worldScale = new dr(), this._positionStart = new dr(), this._quaternionStart = new hl(), this._scaleStart = new dr(), this._getPointer = E3a.bind(this), this._onPointerDown = M3a.bind(this), this._onPointerHover = T3a.bind(this), this._onPointerMove = P3a.bind(this), this._onPointerUp = R3a.bind(this), n !== null && this.connect(n);
  }
  connect(t) {
    super.connect(t), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "auto";
  }
  getHelper() {
    return this._root;
  }
  pointerHover(t) {
    if (this.object === void 0 || this.dragging === !0) return;
    t !== null && BG.setFromCamera(t, this.camera);
    const n = Ort(this._gizmo.picker[this.mode], BG);
    n ? this.axis = n.object.name : this.axis = null;
  }
  pointerDown(t) {
    if (!(this.object === void 0 || this.dragging === !0 || t != null && t.button !== 0) && this.axis !== null) {
      t !== null && BG.setFromCamera(t, this.camera);
      const n = Ort(this._plane, BG, !0);
      n && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(n.point).sub(this.worldPositionStart)), this.dragging = !0, Een.mode = this.mode, this.dispatchEvent(Een);
    }
  }
  pointerMove(t) {
    const n = this.axis,
      r = this.mode,
      a = this.object;
    let i = this.space;
    if (r === "scale" ? i = "local" : (n === "E" || n === "XYZE" || n === "XYZ") && (i = "world"), a === void 0 || n === null || this.dragging === !1 || t !== null && t.button !== -1) return;
    t !== null && BG.setFromCamera(t, this.camera);
    const o = Ort(this._plane, BG, !0);
    if (o) {
      if (this.pointEnd.copy(o.point).sub(this.worldPositionStart), r === "translate") this._offset.copy(this.pointEnd).sub(this.pointStart), i === "local" && n !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), n.indexOf("X") === -1 && (this._offset.x = 0), n.indexOf("Y") === -1 && (this._offset.y = 0), n.indexOf("Z") === -1 && (this._offset.z = 0), i === "local" && n !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), a.position.copy(this._offset).add(this._positionStart), this.translationSnap && (i === "local" && (a.position.applyQuaternion(af.copy(this._quaternionStart).invert()), n.search("X") !== -1 && (a.position.x = Math.round(a.position.x / this.translationSnap) * this.translationSnap), n.search("Y") !== -1 && (a.position.y = Math.round(a.position.y / this.translationSnap) * this.translationSnap), n.search("Z") !== -1 && (a.position.z = Math.round(a.position.z / this.translationSnap) * this.translationSnap), a.position.applyQuaternion(this._quaternionStart)), i === "world" && (a.parent && a.position.add(Bw.setFromMatrixPosition(a.parent.matrixWorld)), n.search("X") !== -1 && (a.position.x = Math.round(a.position.x / this.translationSnap) * this.translationSnap), n.search("Y") !== -1 && (a.position.y = Math.round(a.position.y / this.translationSnap) * this.translationSnap), n.search("Z") !== -1 && (a.position.z = Math.round(a.position.z / this.translationSnap) * this.translationSnap), a.parent && a.position.sub(Bw.setFromMatrixPosition(a.parent.matrixWorld)))), a.position.x = Math.max(this.minX, Math.min(this.maxX, a.position.x)), a.position.y = Math.max(this.minY, Math.min(this.maxY, a.position.y)), a.position.z = Math.max(this.minZ, Math.min(this.maxZ, a.position.z));else if (r === "scale") {
        if (n.search("XYZ") !== -1) {
          let s = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (s *= -1), bL.set(s, s, s);
        } else Bw.copy(this.pointStart), bL.copy(this.pointEnd), Bw.applyQuaternion(this._worldQuaternionInv), bL.applyQuaternion(this._worldQuaternionInv), bL.divide(Bw), n.search("X") === -1 && (bL.x = 1), n.search("Y") === -1 && (bL.y = 1), n.search("Z") === -1 && (bL.z = 1);
        a.scale.copy(this._scaleStart).multiply(bL), this.scaleSnap && (n.search("X") !== -1 && (a.scale.x = Math.round(a.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), n.search("Y") !== -1 && (a.scale.y = Math.round(a.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), n.search("Z") !== -1 && (a.scale.z = Math.round(a.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (r === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const s = 20 / this.worldPosition.distanceTo(Bw.setFromMatrixPosition(this.camera.matrixWorld));
        let l = !1;
        n === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(Bw.copy(this.rotationAxis).cross(this.eye)) * s) : (n === "X" || n === "Y" || n === "Z") && (this.rotationAxis.copy(Cen[n]), Bw.copy(Cen[n]), i === "local" && Bw.applyQuaternion(this.worldQuaternion), Bw.cross(this.eye), Bw.length() === 0 ? l = !0 : this.rotationAngle = this._offset.dot(Bw.normalize()) * s), (n === "E" || l) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), i === "local" && n !== "E" && n !== "XYZE" ? (a.quaternion.copy(this._quaternionStart), a.quaternion.multiply(af.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), a.quaternion.copy(af.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), a.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(Lrt), this.dispatchEvent(Men);
    }
  }
  pointerUp(t) {
    t !== null && t.button !== 0 || (this.dragging && this.axis !== null && (Ten.mode = this.mode, this.dispatchEvent(Ten)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.disconnect(), this._root.dispose();
  }
  attach(t) {
    return this.object = t, this._root.visible = !0, this;
  }
  detach() {
    return this.object = void 0, this.axis = null, this._root.visible = !1, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(Lrt), this.dispatchEvent(Men), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return BG;
  }
  getMode() {
    return this.mode;
  }
  setMode(t) {
    this.mode = t;
  }
  setTranslationSnap(t) {
    this.translationSnap = t;
  }
  setRotationSnap(t) {
    this.rotationSnap = t;
  }
  setScaleSnap(t) {
    this.scaleSnap = t;
  }
  setSize(t) {
    this.size = t;
  }
  setSpace(t) {
    this.space = t;
  }
  setColors(t, n, r, a) {
    const i = this._gizmo.materialLib;
    i.xAxis.color.set(t), i.yAxis.color.set(n), i.zAxis.color.set(r), i.active.color.set(a), i.xAxisTransparent.color.set(t), i.yAxisTransparent.color.set(n), i.zAxisTransparent.color.set(r), i.activeTransparent.color.set(a), i.xAxis._color && i.xAxis._color.set(t), i.yAxis._color && i.yAxis._color.set(n), i.zAxis._color && i.zAxis._color.set(r), i.active._color && i.active._color.set(a), i.xAxisTransparent._color && i.xAxisTransparent._color.set(t), i.yAxisTransparent._color && i.yAxisTransparent._color.set(n), i.zAxisTransparent._color && i.zAxisTransparent._color.set(r), i.activeTransparent._color && i.activeTransparent._color.set(a);
  }
}

function E3a(e) {
  if (this.domElement.ownerDocument.pointerLockElement) return {
    x: 0,
    y: 0,
    button: e.button
  };
  {
    const t = this.domElement.getBoundingClientRect();
    return {
      x: (e.clientX - t.left) / t.width * 2 - 1,
      y: -(e.clientY - t.top) / t.height * 2 + 1,
      button: e.button
    };
  }
}

function T3a(e) {
  if (this.enabled) switch (e.pointerType) {
    case "mouse":
    case "pen":
      this.pointerHover(this._getPointer(e));
      break;
  }
}

function M3a(e) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(e)), this.pointerDown(this._getPointer(e)));
}

function P3a(e) {
  this.enabled && this.pointerMove(this._getPointer(e));
}

function R3a(e) {
  this.enabled && (this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(e)));
}

function Ort(e, t, n) {
  const r = t.intersectObject(e, !0);
  for (let a = 0; a < r.length; a++) if (r[a].object.visible || n) return r[a];
  return !1;
}

const B8e = new xp(),
  Bp = new dr(0, 1, 0),
  Pen = new dr(0, 0, 0),
  Ren = new bo(),
  F8e = new hl(),
  NNe = new hl(),
  u8 = new dr(),
  Nen = new bo(),
  R0e = new dr(1, 0, 0),
  $V = new dr(0, 1, 0),
  N0e = new dr(0, 0, 1),
  z8e = new dr(),
  Bme = new dr(),
  Fme = new dr();

class N3a extends Zc {
  constructor(t) {
    super(), this.isTransformControlsRoot = !0, this.controls = t, this.visible = !1;
  }
  updateMatrixWorld(t) {
    const n = this.controls;
    n.object !== void 0 && (n.object.updateMatrixWorld(), n.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : n.object.parent.matrixWorld.decompose(n._parentPosition, n._parentQuaternion, n._parentScale), n.object.matrixWorld.decompose(n.worldPosition, n.worldQuaternion, n._worldScale), n._parentQuaternionInv.copy(n._parentQuaternion).invert(), n._worldQuaternionInv.copy(n.worldQuaternion).invert()), n.camera.updateMatrixWorld(), n.camera.matrixWorld.decompose(n.cameraPosition, n.cameraQuaternion, n._cameraScale), n.camera.isOrthographicCamera ? n.camera.getWorldDirection(n.eye).negate() : n.eye.copy(n.cameraPosition).sub(n.worldPosition).normalize(), super.updateMatrixWorld(t);
  }
  dispose() {
    this.traverse(function (t) {
      t.geometry && t.geometry.dispose(), t.material && t.material.dispose();
    });
  }
}

class j3a extends Zc {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const t = new uu({
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        toneMapped: !1,
        transparent: !0
      }),
      n = new BD({
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        toneMapped: !1,
        transparent: !0
      }),
      r = t.clone();
    r.opacity = .15;
    const a = n.clone();
    a.opacity = .5;
    const i = t.clone();
    i.color.setHex(16711680);
    const o = t.clone();
    o.color.setHex(65280);
    const s = t.clone();
    s.color.setHex(255);
    const l = t.clone();
    l.color.setHex(16711680), l.opacity = .5;
    const d = t.clone();
    d.color.setHex(65280), d.opacity = .5;
    const u = t.clone();
    u.color.setHex(255), u.opacity = .5;
    const h = t.clone();
    h.opacity = .25;
    const p = t.clone();
    p.color.setHex(16776960), p.opacity = .25;
    const m = t.clone();
    m.color.setHex(16776960);
    const f = t.clone();
    f.color.setHex(7895160), this.materialLib = {
      xAxis: i,
      yAxis: o,
      zAxis: s,
      active: m,
      xAxisTransparent: l,
      yAxisTransparent: d,
      zAxisTransparent: u,
      activeTransparent: p
    };
    const y = new lm(0, .04, .1, 12);
    y.translate(0, .05, 0);
    const b = new dl(.08, .08, .08);
    b.translate(0, .04, 0);
    const v = new Fd();
    v.setAttribute("position", new Al([0, 0, 0, 1, 0, 0], 3));
    const _ = new lm(.0075, .0075, .5, 3);
    _.translate(0, .25, 0);
    function w(B, F) {
      const N = new xS(B, .0075, 3, 64, F * Math.PI * 2);
      return N.rotateY(Math.PI / 2), N.rotateX(Math.PI / 2), N;
    }
    function k() {
      const B = new Fd();
      return B.setAttribute("position", new Al([0, 0, 0, 1, 1, 1], 3)), B;
    }
    const A = {
        X: [[new di(y, i), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new di(y, i), [-.5, 0, 0], [0, 0, Math.PI / 2]], [new di(_, i), [0, 0, 0], [0, 0, -Math.PI / 2]]],
        Y: [[new di(y, o), [0, .5, 0]], [new di(y, o), [0, -.5, 0], [Math.PI, 0, 0]], [new di(_, o)]],
        Z: [[new di(y, s), [0, 0, .5], [Math.PI / 2, 0, 0]], [new di(y, s), [0, 0, -.5], [-Math.PI / 2, 0, 0]], [new di(_, s), null, [Math.PI / 2, 0, 0]]],
        XYZ: [[new di(new fW(.1, 0), h), [0, 0, 0]]],
        XY: [[new di(new dl(.15, .15, .01), u), [.15, .15, 0]]],
        YZ: [[new di(new dl(.15, .15, .01), l), [0, .15, .15], [0, Math.PI / 2, 0]]],
        XZ: [[new di(new dl(.15, .15, .01), d), [.15, 0, .15], [-Math.PI / 2, 0, 0]]]
      },
      S = {
        X: [[new di(new lm(.2, 0, .6, 4), r), [.3, 0, 0], [0, 0, -Math.PI / 2]], [new di(new lm(.2, 0, .6, 4), r), [-.3, 0, 0], [0, 0, Math.PI / 2]]],
        Y: [[new di(new lm(.2, 0, .6, 4), r), [0, .3, 0]], [new di(new lm(.2, 0, .6, 4), r), [0, -.3, 0], [0, 0, Math.PI]]],
        Z: [[new di(new lm(.2, 0, .6, 4), r), [0, 0, .3], [Math.PI / 2, 0, 0]], [new di(new lm(.2, 0, .6, 4), r), [0, 0, -.3], [-Math.PI / 2, 0, 0]]],
        XYZ: [[new di(new fW(.2, 0), r)]],
        XY: [[new di(new dl(.2, .2, .01), r), [.15, .15, 0]]],
        YZ: [[new di(new dl(.2, .2, .01), r), [0, .15, .15], [0, Math.PI / 2, 0]]],
        XZ: [[new di(new dl(.2, .2, .01), r), [.15, 0, .15], [-Math.PI / 2, 0, 0]]]
      },
      C = {
        START: [[new di(new fW(.01, 2), a), null, null, null, "helper"]],
        END: [[new di(new fW(.01, 2), a), null, null, null, "helper"]],
        DELTA: [[new Qw(k(), a), null, null, null, "helper"]],
        X: [[new Qw(v, a), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
        Y: [[new Qw(v, a), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
        Z: [[new Qw(v, a), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
      },
      I = {
        XYZE: [[new di(w(.5, 1), f), null, [0, Math.PI / 2, 0]]],
        X: [[new di(w(.5, .5), i)]],
        Y: [[new di(w(.5, .5), o), null, [0, 0, -Math.PI / 2]]],
        Z: [[new di(w(.5, .5), s), null, [0, Math.PI / 2, 0]]],
        E: [[new di(w(.75, 1), p), null, [0, Math.PI / 2, 0]]]
      },
      E = {
        AXIS: [[new Qw(v, a), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
      },
      M = {
        XYZE: [[new di(new qp(.25, 10, 8), r)]],
        X: [[new di(new xS(.5, .1, 4, 24), r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
        Y: [[new di(new xS(.5, .1, 4, 24), r), [0, 0, 0], [Math.PI / 2, 0, 0]]],
        Z: [[new di(new xS(.5, .1, 4, 24), r), [0, 0, 0], [0, 0, -Math.PI / 2]]],
        E: [[new di(new xS(.75, .1, 2, 24), r)]]
      },
      T = {
        X: [[new di(b, i), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new di(_, i), [0, 0, 0], [0, 0, -Math.PI / 2]], [new di(b, i), [-.5, 0, 0], [0, 0, Math.PI / 2]]],
        Y: [[new di(b, o), [0, .5, 0]], [new di(_, o)], [new di(b, o), [0, -.5, 0], [0, 0, Math.PI]]],
        Z: [[new di(b, s), [0, 0, .5], [Math.PI / 2, 0, 0]], [new di(_, s), [0, 0, 0], [Math.PI / 2, 0, 0]], [new di(b, s), [0, 0, -.5], [-Math.PI / 2, 0, 0]]],
        XY: [[new di(new dl(.15, .15, .01), u), [.15, .15, 0]]],
        YZ: [[new di(new dl(.15, .15, .01), l), [0, .15, .15], [0, Math.PI / 2, 0]]],
        XZ: [[new di(new dl(.15, .15, .01), d), [.15, 0, .15], [-Math.PI / 2, 0, 0]]],
        XYZ: [[new di(new dl(.1, .1, .1), h)]]
      },
      P = {
        X: [[new di(new lm(.2, 0, .6, 4), r), [.3, 0, 0], [0, 0, -Math.PI / 2]], [new di(new lm(.2, 0, .6, 4), r), [-.3, 0, 0], [0, 0, Math.PI / 2]]],
        Y: [[new di(new lm(.2, 0, .6, 4), r), [0, .3, 0]], [new di(new lm(.2, 0, .6, 4), r), [0, -.3, 0], [0, 0, Math.PI]]],
        Z: [[new di(new lm(.2, 0, .6, 4), r), [0, 0, .3], [Math.PI / 2, 0, 0]], [new di(new lm(.2, 0, .6, 4), r), [0, 0, -.3], [-Math.PI / 2, 0, 0]]],
        XY: [[new di(new dl(.2, .2, .01), r), [.15, .15, 0]]],
        YZ: [[new di(new dl(.2, .2, .01), r), [0, .15, .15], [0, Math.PI / 2, 0]]],
        XZ: [[new di(new dl(.2, .2, .01), r), [.15, 0, .15], [-Math.PI / 2, 0, 0]]],
        XYZ: [[new di(new dl(.2, .2, .2), r), [0, 0, 0]]]
      },
      R = {
        X: [[new Qw(v, a), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
        Y: [[new Qw(v, a), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
        Z: [[new Qw(v, a), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
      };
    function j(B) {
      const F = new Zc();
      for (const N in B) for (let G = B[N].length; G--;) {
        const z = B[N][G][0].clone(),
          V = B[N][G][1],
          O = B[N][G][2],
          L = B[N][G][3],
          D = B[N][G][4];
        z.name = N, z.tag = D, V && z.position.set(V[0], V[1], V[2]), O && z.rotation.set(O[0], O[1], O[2]), L && z.scale.set(L[0], L[1], L[2]), z.updateMatrix();
        const U = z.geometry.clone();
        U.applyMatrix4(z.matrix), z.geometry = U, z.renderOrder = 1 / 0, z.position.set(0, 0, 0), z.rotation.set(0, 0, 0), z.scale.set(1, 1, 1), F.add(z);
      }
      return F;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = j(A)), this.add(this.gizmo.rotate = j(I)), this.add(this.gizmo.scale = j(T)), this.add(this.picker.translate = j(S)), this.add(this.picker.rotate = j(M)), this.add(this.picker.scale = j(P)), this.add(this.helper.translate = j(C)), this.add(this.helper.rotate = j(E)), this.add(this.helper.scale = j(R)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  updateMatrixWorld(t) {
    const r = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : NNe;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let a = [];
    a = a.concat(this.picker[this.mode].children), a = a.concat(this.gizmo[this.mode].children), a = a.concat(this.helper[this.mode].children);
    for (let i = 0; i < a.length; i++) {
      const o = a[i];
      o.visible = !0, o.rotation.set(0, 0, 0), o.position.copy(this.worldPosition);
      let s;
      if (this.camera.isOrthographicCamera ? s = (this.camera.top - this.camera.bottom) / this.camera.zoom : s = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), o.scale.set(1, 1, 1).multiplyScalar(s * this.size / 4), o.tag === "helper") {
        o.visible = !1, o.name === "AXIS" ? (o.visible = !!this.axis, this.axis === "X" && (af.setFromEuler(B8e.set(0, 0, 0)), o.quaternion.copy(r).multiply(af), Math.abs(Bp.copy(R0e).applyQuaternion(r).dot(this.eye)) > .9 && (o.visible = !1)), this.axis === "Y" && (af.setFromEuler(B8e.set(0, 0, Math.PI / 2)), o.quaternion.copy(r).multiply(af), Math.abs(Bp.copy($V).applyQuaternion(r).dot(this.eye)) > .9 && (o.visible = !1)), this.axis === "Z" && (af.setFromEuler(B8e.set(0, Math.PI / 2, 0)), o.quaternion.copy(r).multiply(af), Math.abs(Bp.copy(N0e).applyQuaternion(r).dot(this.eye)) > .9 && (o.visible = !1)), this.axis === "XYZE" && (af.setFromEuler(B8e.set(0, Math.PI / 2, 0)), Bp.copy(this.rotationAxis), o.quaternion.setFromRotationMatrix(Ren.lookAt(Pen, Bp, $V)), o.quaternion.multiply(af), o.visible = this.dragging), this.axis === "E" && (o.visible = !1)) : o.name === "START" ? (o.position.copy(this.worldPositionStart), o.visible = this.dragging) : o.name === "END" ? (o.position.copy(this.worldPosition), o.visible = this.dragging) : o.name === "DELTA" ? (o.position.copy(this.worldPositionStart), o.quaternion.copy(this.worldQuaternionStart), Bw.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), Bw.applyQuaternion(this.worldQuaternionStart.clone().invert()), o.scale.copy(Bw), o.visible = this.dragging) : (o.quaternion.copy(r), this.dragging ? o.position.copy(this.worldPositionStart) : o.position.copy(this.worldPosition), this.axis && (o.visible = this.axis.search(o.name) !== -1));
        continue;
      }
      o.quaternion.copy(r), this.mode === "translate" || this.mode === "scale" ? (o.name === "X" && Math.abs(Bp.copy(R0e).applyQuaternion(r).dot(this.eye)) > .99 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1), o.name === "Y" && Math.abs(Bp.copy($V).applyQuaternion(r).dot(this.eye)) > .99 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1), o.name === "Z" && Math.abs(Bp.copy(N0e).applyQuaternion(r).dot(this.eye)) > .99 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1), o.name === "XY" && Math.abs(Bp.copy(N0e).applyQuaternion(r).dot(this.eye)) < .2 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1), o.name === "YZ" && Math.abs(Bp.copy(R0e).applyQuaternion(r).dot(this.eye)) < .2 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1), o.name === "XZ" && Math.abs(Bp.copy($V).applyQuaternion(r).dot(this.eye)) < .2 && (o.scale.set(1e-10, 1e-10, 1e-10), o.visible = !1)) : this.mode === "rotate" && (F8e.copy(r), Bp.copy(this.eye).applyQuaternion(af.copy(r).invert()), o.name.search("E") !== -1 && o.quaternion.setFromRotationMatrix(Ren.lookAt(this.eye, Pen, $V)), o.name === "X" && (af.setFromAxisAngle(R0e, Math.atan2(-Bp.y, Bp.z)), af.multiplyQuaternions(F8e, af), o.quaternion.copy(af)), o.name === "Y" && (af.setFromAxisAngle($V, Math.atan2(Bp.x, Bp.z)), af.multiplyQuaternions(F8e, af), o.quaternion.copy(af)), o.name === "Z" && (af.setFromAxisAngle(N0e, Math.atan2(Bp.y, Bp.x)), af.multiplyQuaternions(F8e, af), o.quaternion.copy(af))), o.visible = o.visible && (o.name.indexOf("X") === -1 || this.showX), o.visible = o.visible && (o.name.indexOf("Y") === -1 || this.showY), o.visible = o.visible && (o.name.indexOf("Z") === -1 || this.showZ), o.visible = o.visible && (o.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), o.material._color = o.material._color || o.material.color.clone(), o.material._opacity = o.material._opacity || o.material.opacity, o.material.color.copy(o.material._color), o.material.opacity = o.material._opacity, this.enabled && this.axis && (o.name === this.axis ? (o.material.color.copy(this.materialLib.active.color), o.material.opacity = 1) : this.axis.split("").some(function (l) {
        return o.name === l;
      }) && (o.material.color.copy(this.materialLib.active.color), o.material.opacity = 1));
    }
    super.updateMatrixWorld(t);
  }
}

class D3a extends di {
  constructor() {
    super(new W5(1e5, 1e5, 2, 2), new uu({
      visible: !1,
      wireframe: !0,
      side: _y,
      transparent: !0,
      opacity: .1,
      toneMapped: !1
    })), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(t) {
    let n = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (n = "local"), z8e.copy(R0e).applyQuaternion(n === "local" ? this.worldQuaternion : NNe), Bme.copy($V).applyQuaternion(n === "local" ? this.worldQuaternion : NNe), Fme.copy(N0e).applyQuaternion(n === "local" ? this.worldQuaternion : NNe), Bp.copy(Bme), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            Bp.copy(this.eye).cross(z8e), u8.copy(z8e).cross(Bp);
            break;
          case "Y":
            Bp.copy(this.eye).cross(Bme), u8.copy(Bme).cross(Bp);
            break;
          case "Z":
            Bp.copy(this.eye).cross(Fme), u8.copy(Fme).cross(Bp);
            break;
          case "XY":
            u8.copy(Fme);
            break;
          case "YZ":
            u8.copy(z8e);
            break;
          case "XZ":
            Bp.copy(Fme), u8.copy(Bme);
            break;
          case "XYZ":
          case "E":
            u8.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        u8.set(0, 0, 0);
    }
    u8.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (Nen.lookAt(Bw.set(0, 0, 0), u8, Bp), this.quaternion.setFromRotationMatrix(Nen)), super.updateMatrixWorld(t);
  }
}

wo.line = {
  worldUnits: {
    value: 1
  },
  linewidth: {
    value: 1
  },
  resolution: {
    value: new Qi(1, 1)
  },
  dashOffset: {
    value: 0
  },
  dashScale: {
    value: 1
  },
  dashSize: {
    value: 1
  },
  gapSize: {
    value: 1
  }
};

uk.line = {
  uniforms: iDt.merge([wo.common, wo.fog, wo.line]),
  vertexShader: `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,
  fragmentShader: `
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
};

class pDt extends Mx {
  constructor(t) {
    super({
      type: "LineMaterial",
      uniforms: iDt.clone(uk.line.uniforms),
      vertexShader: uk.line.vertexShader,
      fragmentShader: uk.line.fragmentShader,
      clipping: !0
    }), this.isLineMaterial = !0, this.setValues(t);
  }
  get color() {
    return this.uniforms.diffuse.value;
  }
  set color(t) {
    this.uniforms.diffuse.value = t;
  }
  get worldUnits() {
    return "WORLD_UNITS" in this.defines;
  }
  set worldUnits(t) {
    t === !0 !== this.worldUnits && (this.needsUpdate = !0), t === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
  }
  get linewidth() {
    return this.uniforms.linewidth.value;
  }
  set linewidth(t) {
    this.uniforms.linewidth && (this.uniforms.linewidth.value = t);
  }
  get dashed() {
    return "USE_DASH" in this.defines;
  }
  set dashed(t) {
    t === !0 !== this.dashed && (this.needsUpdate = !0), t === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
  }
  get dashScale() {
    return this.uniforms.dashScale.value;
  }
  set dashScale(t) {
    this.uniforms.dashScale.value = t;
  }
  get dashSize() {
    return this.uniforms.dashSize.value;
  }
  set dashSize(t) {
    this.uniforms.dashSize.value = t;
  }
  get dashOffset() {
    return this.uniforms.dashOffset.value;
  }
  set dashOffset(t) {
    this.uniforms.dashOffset.value = t;
  }
  get gapSize() {
    return this.uniforms.gapSize.value;
  }
  set gapSize(t) {
    this.uniforms.gapSize.value = t;
  }
  get opacity() {
    return this.uniforms.opacity.value;
  }
  set opacity(t) {
    this.uniforms && (this.uniforms.opacity.value = t);
  }
  get resolution() {
    return this.uniforms.resolution.value;
  }
  set resolution(t) {
    this.uniforms.resolution.value.copy(t);
  }
  get alphaToCoverage() {
    return "USE_ALPHA_TO_COVERAGE" in this.defines;
  }
  set alphaToCoverage(t) {
    this.defines && (t === !0 !== this.alphaToCoverage && (this.needsUpdate = !0), t === !0 ? this.defines.USE_ALPHA_TO_COVERAGE = "" : delete this.defines.USE_ALPHA_TO_COVERAGE);
  }
}

const jen = new j0(),
  U8e = new dr();

class mDt extends n2a {
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const t = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0],
      n = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2],
      r = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(r), this.setAttribute("position", new Al(t, 3)), this.setAttribute("uv", new Al(n, 2));
  }
  applyMatrix4(t) {
    const n = this.attributes.instanceStart,
      r = this.attributes.instanceEnd;
    return n !== void 0 && (n.applyMatrix4(t), r.applyMatrix4(t), n.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  setPositions(t) {
    let n;
    t instanceof Float32Array ? n = t : Array.isArray(t) && (n = new Float32Array(t));
    const r = new Avt(n, 6, 1);
    return this.setAttribute("instanceStart", new mE(r, 3, 0)), this.setAttribute("instanceEnd", new mE(r, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
  }
  setColors(t) {
    let n;
    t instanceof Float32Array ? n = t : Array.isArray(t) && (n = new Float32Array(t));
    const r = new Avt(n, 6, 1);
    return this.setAttribute("instanceColorStart", new mE(r, 3, 0)), this.setAttribute("instanceColorEnd", new mE(r, 3, 3)), this;
  }
  fromWireframeGeometry(t) {
    return this.setPositions(t.attributes.position.array), this;
  }
  fromEdgesGeometry(t) {
    return this.setPositions(t.attributes.position.array), this;
  }
  fromMesh(t) {
    return this.fromWireframeGeometry(new Rxa(t.geometry)), this;
  }
  fromLineSegments(t) {
    const n = t.geometry;
    return this.setPositions(n.attributes.position.array), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new j0());
    const t = this.attributes.instanceStart,
      n = this.attributes.instanceEnd;
    t !== void 0 && n !== void 0 && (this.boundingBox.setFromBufferAttribute(t), jen.setFromBufferAttribute(n), this.boundingBox.union(jen));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new mI()), this.boundingBox === null && this.computeBoundingBox();
    const t = this.attributes.instanceStart,
      n = this.attributes.instanceEnd;
    if (t !== void 0 && n !== void 0) {
      const r = this.boundingSphere.center;
      this.boundingBox.getCenter(r);
      let a = 0;
      for (let i = 0, o = t.count; i < o; i++) U8e.fromBufferAttribute(t, i), a = Math.max(a, r.distanceToSquared(U8e)), U8e.fromBufferAttribute(n, i), a = Math.max(a, r.distanceToSquared(U8e));
      this.boundingSphere.radius = Math.sqrt(a), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {}
}

const Brt = new Vd(),
  Den = new dr(),
  Len = new dr(),
  c1 = new Vd(),
  d1 = new Vd(),
  h8 = new Vd(),
  Frt = new dr(),
  zrt = new bo(),
  x1 = new w2a(),
  Oen = new dr(),
  $8e = new j0(),
  G8e = new mI(),
  p8 = new Vd();

let J6, AQ;

function Ben(e, t, n) {
  return p8.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), p8.multiplyScalar(1 / p8.w), p8.x = AQ / n.width, p8.y = AQ / n.height, p8.applyMatrix4(e.projectionMatrixInverse), p8.multiplyScalar(1 / p8.w), Math.abs(Math.max(p8.x, p8.y));
}

function L3a(e, t) {
  const n = e.matrixWorld,
    r = e.geometry,
    a = r.attributes.instanceStart,
    i = r.attributes.instanceEnd,
    o = Math.min(r.instanceCount, a.count);
  for (let s = 0, l = o; s < l; s++) {
    x1.start.fromBufferAttribute(a, s), x1.end.fromBufferAttribute(i, s), x1.applyMatrix4(n);
    const d = new dr(),
      u = new dr();
    J6.distanceSqToSegment(x1.start, x1.end, u, d), u.distanceTo(d) < AQ * .5 && t.push({
      point: u,
      pointOnLine: d,
      distance: J6.origin.distanceTo(u),
      object: e,
      face: null,
      faceIndex: s,
      uv: null,
      uv1: null
    });
  }
}

function O3a(e, t, n) {
  const r = t.projectionMatrix,
    i = e.material.resolution,
    o = e.matrixWorld,
    s = e.geometry,
    l = s.attributes.instanceStart,
    d = s.attributes.instanceEnd,
    u = Math.min(s.instanceCount, l.count),
    h = -t.near;
  J6.at(1, h8), h8.w = 1, h8.applyMatrix4(t.matrixWorldInverse), h8.applyMatrix4(r), h8.multiplyScalar(1 / h8.w), h8.x *= i.x / 2, h8.y *= i.y / 2, h8.z = 0, Frt.copy(h8), zrt.multiplyMatrices(t.matrixWorldInverse, o);
  for (let p = 0, m = u; p < m; p++) {
    if (c1.fromBufferAttribute(l, p), d1.fromBufferAttribute(d, p), c1.w = 1, d1.w = 1, c1.applyMatrix4(zrt), d1.applyMatrix4(zrt), c1.z > h && d1.z > h) continue;
    if (c1.z > h) {
      const w = c1.z - d1.z,
        k = (c1.z - h) / w;
      c1.lerp(d1, k);
    } else if (d1.z > h) {
      const w = d1.z - c1.z,
        k = (d1.z - h) / w;
      d1.lerp(c1, k);
    }
    c1.applyMatrix4(r), d1.applyMatrix4(r), c1.multiplyScalar(1 / c1.w), d1.multiplyScalar(1 / d1.w), c1.x *= i.x / 2, c1.y *= i.y / 2, d1.x *= i.x / 2, d1.y *= i.y / 2, x1.start.copy(c1), x1.start.z = 0, x1.end.copy(d1), x1.end.z = 0;
    const y = x1.closestPointToPointParameter(Frt, !0);
    x1.at(y, Oen);
    const b = Mo.lerp(c1.z, d1.z, y),
      v = b >= -1 && b <= 1,
      _ = Frt.distanceTo(Oen) < AQ * .5;
    if (v && _) {
      x1.start.fromBufferAttribute(l, p), x1.end.fromBufferAttribute(d, p), x1.start.applyMatrix4(o), x1.end.applyMatrix4(o);
      const w = new dr(),
        k = new dr();
      J6.distanceSqToSegment(x1.start, x1.end, k, w), n.push({
        point: k,
        pointOnLine: w,
        distance: J6.origin.distanceTo(k),
        object: e,
        face: null,
        faceIndex: p,
        uv: null,
        uv1: null
      });
    }
  }
}

class gKn extends di {
  constructor(t = new mDt(), n = new pDt({
    color: Math.random() * 16777215
  })) {
    super(t, n), this.isLineSegments2 = !0, this.type = "LineSegments2";
  }
  computeLineDistances() {
    const t = this.geometry,
      n = t.attributes.instanceStart,
      r = t.attributes.instanceEnd,
      a = new Float32Array(2 * n.count);
    for (let o = 0, s = 0, l = n.count; o < l; o++, s += 2) Den.fromBufferAttribute(n, o), Len.fromBufferAttribute(r, o), a[s] = s === 0 ? 0 : a[s - 1], a[s + 1] = a[s] + Den.distanceTo(Len);
    const i = new Avt(a, 2, 1);
    return t.setAttribute("instanceDistanceStart", new mE(i, 1, 0)), t.setAttribute("instanceDistanceEnd", new mE(i, 1, 1)), this;
  }
  raycast(t, n) {
    const r = this.material.worldUnits,
      a = t.camera;
    a === null && !r && console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
    const i = t.params.Line2 !== void 0 && t.params.Line2.threshold || 0;
    J6 = t.ray;
    const o = this.matrixWorld,
      s = this.geometry,
      l = this.material;
    AQ = l.linewidth + i, s.boundingSphere === null && s.computeBoundingSphere(), G8e.copy(s.boundingSphere).applyMatrix4(o);
    let d;
    if (r) d = AQ * .5;else {
      const h = Math.max(a.near, G8e.distanceToPoint(J6.origin));
      d = Ben(a, h, l.resolution);
    }
    if (G8e.radius += d, J6.intersectsSphere(G8e) === !1) return;
    s.boundingBox === null && s.computeBoundingBox(), $8e.copy(s.boundingBox).applyMatrix4(o);
    let u;
    if (r) u = AQ * .5;else {
      const h = Math.max(a.near, $8e.distanceToPoint(J6.origin));
      u = Ben(a, h, l.resolution);
    }
    $8e.expandByScalar(u), J6.intersectsBox($8e) !== !1 && (r ? L3a(this, n) : O3a(this, a, n));
  }
  onBeforeRender(t) {
    const n = this.material.uniforms;
    n && n.resolution && (t.getViewport(Brt), this.material.uniforms.resolution.value.set(Brt.z, Brt.w));
  }
}

const zme = {
    X: 16726832,
    Y: 2282287,
    Z: 3108351
  },
  B3a = 15777927,
  F3a = 16052454,
  Fen = .88,
  Xee = .46,
  zen = .018,
  Ume = .11,
  z3a = .045,
  ize = .2,
  j0e = .15,
  oze = .66,
  U3a = .014,
  yKn = Mo.degToRad(12),
  Evt = Math.PI / 2 - yKn,
  Tvt = yKn / 2,
  Urt = .84,
  $3a = .048,
  G3a = .99,
  V3a = .2,
  H3a = .2,
  Uen = .05,
  W3a = .05,
  q3a = 10.5,
  K3a = 8,
  Q3a = 11,
  Y3a = 4,
  $en = 24,
  SQ = 1e-6,
  X3a = new dr(0, 1, 0),
  th = {
    X: new dr(1, 0, 0),
    Y: new dr(0, 1, 0),
    Z: new dr(0, 0, 1)
  },
  J3a = {
    X: ["Y", "Z"],
    Y: ["Z", "X"],
    Z: ["X", "Y"]
  },
  Gen = new hl(),
  Ven = new bo(),
  V8e = new j0(),
  Hen = new j0(),
  vL = new dr(),
  $me = new dr(),
  m8 = new dr(),
  $I = new hl(),
  Z3a = new hl(),
  FG = new dr(),
  zG = new dr(),
  Wen = new Qi(),
  qen = new Qi(),
  Jee = new dr(),
  Gme = new dr(),
  e4a = new dr(),
  t4a = new dr(),
  n4a = new dr(),
  Ken = new dr(),
  Vme = new dr(),
  r4a = new dr(),
  a4a = new bo(),
  Zee = new bo(),
  Qen = new bo(),
  Hme = new dr(1, 1, 1),
  Yen = {
    X: new hl().setFromRotationMatrix(new bo().makeBasis(th.Y, th.Z, th.X)),
    Y: new hl().setFromRotationMatrix(new bo().makeBasis(th.Z, th.X, th.Y)),
    Z: new hl()
  },
  Wme = (e, t = .94) => new uu({
    color: e,
    depthTest: !1,
    depthWrite: !1,
    fog: !1,
    toneMapped: !1,
    transparent: !0,
    opacity: t,
    side: _y
  }),
  i4a = () => new uu({
    color: 16777215,
    depthTest: !1,
    depthWrite: !1,
    transparent: !0,
    opacity: 0,
    fog: !1,
    toneMapped: !1,
    side: _y
  }),
  ete = e => {
    for (const t of [...e.children]) e.remove(t);
  },
  o4a = (e, t) => {
    e.userData.gizmoPickable = t, e.traverse(n => {
      n.userData.gizmoPickable = t;
    });
  },
  $rt = (e, t, n) => {
    e.quaternion.setFromUnitVectors(X3a, th[t]), e.position.copy(th[t]).multiplyScalar(n);
  },
  s4a = (e, t, n) => ({
    kind: "polyline",
    points: [new dr(), th[e].clone().multiplyScalar(t)],
    radiusPx: n
  }),
  l4a = () => ({
    kind: "polyline",
    points: Array.from({
      length: $en + 1
    }, (e, t) => {
      const n = Tvt + Evt * (t / $en);
      return new dr(Math.cos(n) * oze, Math.sin(n) * oze, 0);
    }),
    radiusPx: K3a
  }),
  c4a = (e, t) => {
    const n = th[e].clone().multiplyScalar(ize).addScaledVector(th[t], ize),
      r = j0e / 2;
    return {
      kind: "polygon",
      paddingPx: Y3a,
      points: [n.clone().addScaledVector(th[e], -r).addScaledVector(th[t], -r), n.clone().addScaledVector(th[e], r).addScaledVector(th[t], -r), n.clone().addScaledVector(th[e], r).addScaledVector(th[t], r), n.clone().addScaledVector(th[e], -r).addScaledVector(th[t], r)]
    };
  },
  d4a = e => {
    ete(e.gizmo.translate), ete(e.picker.translate), ete(e.gizmo.rotate), ete(e.picker.rotate), ete(e.gizmo.scale), ete(e.picker.scale);
    const t = [],
      n = i4a();
    ["X", "Y", "Z"].forEach(l => {
      const d = Wme(zme[l], .94),
        u = new hc();
      u.name = l;
      const h = new di(new lm(zen, zen, Xee, 8), d);
      $rt(h, l, Xee / 2), h.renderOrder = 740;
      const p = new di(new FP(z3a, Ume, 12), d);
      $rt(p, l, Xee + Ume / 2), p.renderOrder = 740, u.add(h, p), e.gizmo.translate.add(u);
      const m = new hc();
      m.name = l;
      const f = new di(new lm(.07, .07, Xee + Ume, 8), n.clone());
      $rt(f, l, (Xee + Ume) / 2), m.add(f), e.picker.translate.add(m), t.push({
        kind: "translate-axis",
        mode: "translate",
        name: l,
        axis: l,
        group: u,
        picker: m,
        materials: [d],
        baseColor: d.color.clone(),
        baseOpacity: d.opacity,
        hitTarget: s4a(l, Xee + Ume, q3a)
      });
    });
    const r = [{
      name: "XY",
      axisA: "X",
      axisB: "Y"
    }, {
      name: "YZ",
      axisA: "Y",
      axisB: "Z"
    }, {
      name: "XZ",
      axisA: "Z",
      axisB: "X"
    }];
    for (const {
      name: l,
      axisA: d,
      axisB: u
    } of r) {
      const h = new so(zme[d]).lerp(new so(zme[u]), .5),
        p = Wme(h.getHex(), .32),
        m = new bo().makeBasis(th[d], th[u], new dr().crossVectors(th[d], th[u]));
      m.setPosition(th[d].clone().multiplyScalar(ize).addScaledVector(th[u], ize));
      const f = new hc();
      f.name = l;
      const y = new di(new W5(j0e, j0e), p);
      y.matrixAutoUpdate = !1, y.matrix.copy(m), y.renderOrder = 740, f.add(y), e.gizmo.translate.add(f);
      const b = new hc();
      b.name = l;
      const v = new di(new W5(j0e + .08, j0e + .08), n.clone());
      v.matrixAutoUpdate = !1, v.matrix.copy(m), b.add(v), e.picker.translate.add(b), t.push({
        kind: "translate-plane",
        mode: "translate",
        name: l,
        axes: [d, u],
        group: f,
        picker: b,
        materials: [p],
        baseColor: p.color.clone(),
        baseOpacity: p.opacity,
        hitTarget: c4a(d, u)
      });
    }
    const a = Wme(F3a, .96),
      i = new hc();
    i.name = "XYZ";
    const o = new di(new dl(.07, .07, .07), a);
    o.renderOrder = 741, i.add(o), e.gizmo.translate.add(i);
    const s = new hc();
    return s.name = "XYZ", s.add(new di(new dl(.16, .16, .16), n.clone())), e.picker.translate.add(s), t.push({
      kind: "translate-xyz",
      mode: "translate",
      name: "XYZ",
      group: i,
      picker: s,
      materials: [a],
      baseColor: a.color.clone(),
      baseOpacity: a.opacity,
      hitTarget: {
        kind: "point",
        points: [new dr()],
        radiusPx: 12
      }
    }), ["X", "Y", "Z"].forEach(l => {
      const d = Wme(zme[l], .82),
        u = new hc();
      u.name = l;
      const h = new di(new xS(oze, U3a, 8, 48, Evt), d);
      h.rotation.z = Tvt, h.renderOrder = 740, u.add(h), e.gizmo.rotate.add(u);
      const p = new hc();
      p.name = l;
      const m = new di(new xS(oze, .07, 6, 24, Evt), n.clone());
      m.rotation.z = Tvt, p.add(m), e.picker.rotate.add(p), t.push({
        kind: "rotate-axis",
        mode: "rotate",
        name: l,
        axis: l,
        group: u,
        picker: p,
        materials: [d],
        baseColor: d.color.clone(),
        baseOpacity: d.opacity,
        hitTarget: l4a()
      });
    }), ["X", "Y", "Z"].forEach(l => {
      const d = Wme(zme[l], .92),
        u = new hc();
      u.name = l;
      const h = new di(new qp($3a, 16, 12), d);
      h.position.copy(th[l]).multiplyScalar(Urt), h.renderOrder = 740, u.add(h), e.gizmo.scale.add(u);
      const p = new hc();
      p.name = l;
      const m = new di(new qp(.14, 8, 8), n.clone());
      m.position.copy(th[l]).multiplyScalar(Urt), p.add(m), e.picker.scale.add(p), t.push({
        kind: "scale-axis",
        mode: "scale",
        name: l,
        axis: l,
        group: u,
        picker: p,
        materials: [d],
        baseColor: d.color.clone(),
        baseOpacity: d.opacity,
        hitTarget: {
          kind: "point",
          points: [th[l].clone().multiplyScalar(Urt)],
          radiusPx: Q3a
        }
      });
    }), t;
  },
  u4a = e => {
    const t = e;
    return !!(e.userData.captureExcluded || e.userData.isHelper || e.userData.isOutline || e.userData.isCharacterLabel || t.isLine || t.isLineSegments || t.isLine2 || t.isLineSegments2);
  },
  h4a = (e, t) => {
    e.updateWorldMatrix(!0, !0), Ven.copy(e.matrixWorld).invert(), V8e.makeEmpty();
    let n = e;
    return e.traverse(r => {
      r.userData.gizmoPivotRoot && (n = r);
    }), n.traverse(r => {
      if (!r.visible || !(r instanceof di) || !r.geometry || u4a(r)) return;
      const a = r.geometry;
      a.boundingBox || a.computeBoundingBox(), a.boundingBox && (Hen.copy(a.boundingBox).applyMatrix4(r.matrixWorld).applyMatrix4(Ven), V8e.union(Hen));
    }), V8e.isEmpty() ? t.set(0, 0, 0) : V8e.getCenter(t);
  },
  p4a = (e, t, n) => {
    if (e.isOrthographicCamera) {
      const i = e;
      return (i.top - i.bottom) / i.zoom * n / 4;
    }
    const r = e;
    return t.distanceTo(new dr().setFromMatrixPosition(e.matrixWorld)) * Math.min(1.9 * Math.tan(Math.PI * r.fov / 360) / r.zoom, 7) * n / 4;
  },
  Grt = (e, t, n) => n ? e > Uen ? 1 : e < -Uen ? -1 : t : e < 0 ? -1 : 1,
  m4a = (e, t) => {
    if (e.kind === "translate-axis" || e.kind === "scale-axis") return Math.abs(t[e.axis === "X" ? "x" : e.axis === "Y" ? "y" : "z"]) <= G3a;
    if (e.kind === "translate-plane" && e.axes) {
      const n = e.axes[0] !== "X" && e.axes[1] !== "X" ? "x" : e.axes[0] !== "Y" && e.axes[1] !== "Y" ? "y" : "z";
      return Math.abs(t[n]) >= V3a;
    }
    return e.kind === "rotate-axis" && e.axis ? Math.abs(t[e.axis === "X" ? "x" : e.axis === "Y" ? "y" : "z"]) >= H3a : !0;
  },
  f4a = (e, t, n) => {
    if (FG.set(n, n, n), (e.kind === "translate-axis" || e.kind === "scale-axis") && e.axis) FG[e.axis === "X" ? "x" : e.axis === "Y" ? "y" : "z"] = n * (e.axis === "X" ? t.x : e.axis === "Y" ? t.y : t.z);else if (e.kind === "translate-plane" && e.axes) for (const r of e.axes) FG[r === "X" ? "x" : r === "Y" ? "y" : "z"] = n * (r === "X" ? t.x : r === "Y" ? t.y : t.z);else if (e.kind === "rotate-axis" && e.axis) {
      const [r, a] = J3a[e.axis];
      FG.x = n * (r === "X" ? t.x : r === "Y" ? t.y : t.z), FG.y = n * (a === "X" ? t.x : a === "Y" ? t.y : t.z);
    }
    e.group.scale.copy(FG), e.picker.scale.copy(FG);
  },
  g4a = (e, t, n) => {
    const r = n.x - t.x,
      a = n.y - t.y,
      i = r * r + a * a;
    if (i <= SQ) return e.distanceToSquared(t);
    const o = Mo.clamp(((e.x - t.x) * r + (e.y - t.y) * a) / i, 0, 1),
      s = e.x - (t.x + r * o),
      l = e.y - (t.y + a * o);
    return s * s + l * l;
  },
  y4a = (e, t) => {
    let n = !1;
    for (let r = 0, a = t.length - 1; r < t.length; a = r++) {
      const i = t[r],
        o = t[a];
      i.y > e.y != o.y > e.y && e.x < (o.x - i.x) * (e.y - i.y) / (o.y - i.y) + i.x && (n = !n);
    }
    return n;
  },
  b4a = (e, t, n, r, a) => (zG.copy(e).applyMatrix4(t.matrixWorld).project(n), !Number.isFinite(zG.x) || !Number.isFinite(zG.y) || zG.z < -1 || zG.z > 1 ? !1 : (a.set(r.left + (zG.x + 1) / 2 * r.width, r.top + (1 - zG.y) / 2 * r.height), !0)),
  v4a = (e, t, n, r, a) => {
    const {
      hitTarget: i
    } = e;
    for (let h = 0; h < i.points.length; h += 1) {
      const p = a[h] ?? new Qi();
      if (a[h] = p, !b4a(i.points[h], e.group, n, r, p)) return Number.POSITIVE_INFINITY;
    }
    if (i.kind === "point") {
      const h = t.distanceTo(a[0]);
      return h <= i.radiusPx ? h / i.radiusPx : Number.POSITIVE_INFINITY;
    }
    const o = i.kind === "polygon",
      s = i.points.length,
      l = o ? s : s - 1;
    let d = Number.POSITIVE_INFINITY;
    for (let h = 0; h < l; h += 1) d = Math.min(d, g4a(t, a[h], a[(h + 1) % s]));
    const u = Math.sqrt(d);
    return i.kind === "polyline" ? u <= i.radiusPx ? u / i.radiusPx : Number.POSITIVE_INFINITY : y4a(t, a.slice(0, s)) ? 0 : u <= i.paddingPx ? 1 + u / i.paddingPx : Number.POSITIVE_INFINITY;
  },
  w4a = (e, t, n) => {
    const r = n instanceof uG ? n.getWorldDirection(new dr()).negate() : new dr().setFromMatrixPosition(n.matrixWorld).sub(t);
    r.lengthSq() <= SQ ? n.getWorldDirection(r).negate() : r.normalize();
    const a = r.addScaledVector(e, -r.dot(e));
    if (a.lengthSq() > SQ) return a.normalize();
    const i = new dr(0, 1, 0).applyQuaternion(n.quaternion);
    if (a.copy(i).addScaledVector(e, -i.dot(e)), a.lengthSq() > SQ) return a.normalize();
    const o = Math.abs(e.x) < .9 ? new dr(1, 0, 0) : new dr(0, 1, 0);
    return o.addScaledVector(e, -o.dot(e)).normalize();
  },
  x4a = (e, t, n, r, a) => {
    let i;
    return e.kind === "translate-plane" && n ? i = new dr().crossVectors(n[0], n[1]).normalize() : e.kind === "rotate-axis" && t ? i = t.clone() : t ? i = w4a(t, r, a) : i = a instanceof uG ? a.getWorldDirection(new dr()).negate() : new dr().setFromMatrixPosition(a.matrixWorld).sub(r).normalize(), new D1().setFromNormalAndCoplanarPoint(i, r);
  },
  _4a = (e, t) => {
    const n = e.parent;
    n ? (n.updateMatrixWorld(!0), Qen.copy(n.matrixWorld).invert().multiply(t), Qen.decompose(e.position, e.quaternion, e.scale)) : t.decompose(e.position, e.quaternion, e.scale);
  },
  k4a = (e, t, n) => new bo().makeTranslation(e.x, e.y, e.z).multiply(new bo().makeRotationAxis(t, n)).multiply(new bo().makeTranslation(-e.x, -e.y, -e.z)),
  A4a = (e, t, n) => (Hme.set(1, 1, 1), Hme[t === "X" ? "x" : t === "Y" ? "y" : "z"] = n, e.clone().multiply(new bo().makeScale(Hme.x, Hme.y, Hme.z)).multiply(e.clone().invert())),
  S4a = e => {
    const t = e,
      n = t._gizmo;
    let r = !0,
      a = "world",
      i = "world";
    const o = new tJ(),
      s = d4a(n),
      l = [],
      d = {
        x: 1,
        y: 1,
        z: 1
      };
    let u = !1,
      h = new dr(),
      p = null,
      m = null;
    t.setSize(Fen);
    const f = () => s.filter(A => r || A.mode !== "scale"),
      y = (A, S) => {
        const C = S ? B3a : A.baseColor.getHex(),
          I = S ? 1 : A.baseOpacity;
        for (const E of A.materials) E.color.setHex(C), E.opacity = I;
      },
      b = A => {
        (p !== A || !m) && (h4a(A, h), p = A);
      };
    n.updateMatrixWorld = function (S) {
      try {
        const C = t.object,
          I = t.camera;
        if (!C || !I) {
          Zc.prototype.updateMatrixWorld.call(this, S);
          return;
        }
        b(C), C.updateWorldMatrix(!0, !0), I.updateMatrixWorld(!0), vL.copy(h).applyMatrix4(C.matrixWorld), $me.copy(vL), i === "local" || a === "local" ? C.getWorldQuaternion($I) : $I.copy(Gen), I instanceof uG ? I.getWorldDirection(m8).negate() : (m8.setFromMatrixPosition(I.matrixWorld).sub($me), m8.lengthSq() <= SQ ? I.getWorldDirection(m8).negate() : m8.normalize()), m8.applyQuaternion(Z3a.copy($I).invert()), m || (d.x = Grt(m8.x, d.x, u), d.y = Grt(m8.y, d.y, u), d.z = Grt(m8.z, d.z, u), u = !0);
        const M = p4a(I, $me, Fen),
          T = (m == null ? void 0 : m.handle) ?? null;
        for (const P of s) {
          const j = (r || P.mode !== "scale") && (T ? P === T : m4a(P, m8));
          P.group.position.copy($me), P.picker.position.copy($me), P.group.quaternion.copy($I), P.picker.quaternion.copy($I), P.kind === "rotate-axis" && P.axis && (P.group.quaternion.multiply(Yen[P.axis]), P.picker.quaternion.multiply(Yen[P.axis])), f4a(P, d, j ? M : 1e-10), P.group.visible = j, P.picker.visible = !1, o4a(P.picker, j), y(P, T === P || !m && t.axis === P.name && t.mode === P.mode);
        }
        this.gizmo.translate.visible = !0, this.gizmo.rotate.visible = !0, this.gizmo.scale.visible = r, this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1, this.helper.translate.visible = !1, this.helper.rotate.visible = !1, this.helper.scale.visible = !1, Zc.prototype.updateMatrixWorld.call(this, S);
      } catch (C) {
        console.warn("[combinedTransformGizmo] update failed", C), Zc.prototype.updateMatrixWorld.call(this, S);
      }
    };
    const v = A => {
        const S = t.object,
          C = t.camera,
          I = t.domElement;
        if (!S || !C || !I || !A) return null;
        n.updateMatrixWorld(!0);
        const E = I.getBoundingClientRect();
        qen.set(E.left + (A.x + 1) / 2 * E.width, E.top + (1 - A.y) / 2 * E.height);
        let M = null,
          T = Number.POSITIVE_INFINITY;
        for (const P of f()) {
          if (!P.group.visible) continue;
          const R = v4a(P, qen, C, E, l);
          R < T - SQ && (M = P, T = R);
        }
        return M;
      },
      _ = A => (Wen.set(A.x, A.y), o.setFromCamera(Wen, t.camera), o.ray);
    t.pointerHover = function (S) {
      if (this.object === void 0 || this.dragging === !0) return;
      const C = v(S);
      C ? (this.mode = C.mode, this.axis = C.name, this.space = C.mode === "scale" ? "local" : C.mode === "rotate" ? a : i) : this.axis = null;
    };
    const w = t.pointerDown.bind(t);
    t.pointerDown = function (S) {
      if (m = null, this.object && S && this.axis == null) {
        const F = v(S);
        F && (this.mode = F.mode, this.axis = F.name, this.space = F.mode === "scale" ? "local" : F.mode === "rotate" ? a : i);
      }
      w(S);
      const C = this.object,
        I = f().find(F => F.mode === this.mode && F.name === this.axis);
      if (!this.dragging || !C || !I || !S) return;
      b(C), C.updateWorldMatrix(!0, !0), vL.copy(h).applyMatrix4(C.matrixWorld), this.space === "local" ? C.getWorldQuaternion($I) : $I.copy(Gen);
      let M = null,
        T = null;
      I.axis && (M = e4a.copy(th[I.axis]).applyQuaternion($I).normalize().clone()), I.axes && (T = [t4a.copy(th[I.axes[0]]).applyQuaternion($I).normalize().clone(), n4a.copy(th[I.axes[1]]).applyQuaternion($I).normalize().clone()]);
      const P = x4a(I, M, T, vL.clone(), this.camera),
        R = _(S).intersectPlane(P, Ken);
      if (!R) {
        this.dragging = !1, this.axis = null;
        return;
      }
      const j = M ? R.clone().sub(vL).dot(M) : 0;
      if (I.kind === "scale-axis" && Math.abs(j) < SQ) {
        this.dragging = !1, this.axis = null;
        return;
      }
      const B = I.kind === "rotate-axis" ? R.clone().sub(vL).normalize() : null;
      if (I.kind === "rotate-axis" && B && B.lengthSq() === 0) {
        this.dragging = !1, this.axis = null;
        return;
      }
      m = {
        handle: I,
        plane: P,
        axisWorld: M,
        planeAxesWorld: T,
        pivotPosition: vL.clone(),
        pivotBasis: new bo().compose(vL, $I, new dr(1, 1, 1)),
        startIntersection: R.clone(),
        startProjection: j,
        startTargetWorldMatrix: C.matrixWorld.clone(),
        previousRotationVector: B,
        accumulatedAngle: 0
      };
    }, t.pointerMove = function (S) {
      const C = this.object,
        I = m;
      if (!C || !I || this.dragging === !1 || !S) return;
      const E = _(S).intersectPlane(I.plane, Ken);
      if (E) {
        if (I.handle.kind === "translate-axis" && I.axisWorld) {
          const M = E.clone().sub(I.startIntersection).dot(I.axisWorld);
          Zee.makeTranslation(I.axisWorld.x * M, I.axisWorld.y * M, I.axisWorld.z * M);
        } else if (I.handle.kind === "translate-plane" && I.planeAxesWorld) {
          Jee.copy(E).sub(I.startIntersection), Gme.set(0, 0, 0);
          for (const M of I.planeAxesWorld) Gme.addScaledVector(M, Jee.dot(M));
          Zee.makeTranslation(Gme.x, Gme.y, Gme.z);
        } else if (I.handle.kind === "translate-xyz") Jee.copy(E).sub(I.startIntersection), Zee.makeTranslation(Jee.x, Jee.y, Jee.z);else if (I.handle.kind === "rotate-axis" && I.axisWorld && I.previousRotationVector) {
          if (Vme.copy(E).sub(I.pivotPosition).normalize(), Vme.lengthSq() === 0) return;
          let M = Math.atan2(I.axisWorld.dot(r4a.crossVectors(I.previousRotationVector, Vme)), Mo.clamp(I.previousRotationVector.dot(Vme), -1, 1));
          I.accumulatedAngle += M, I.previousRotationVector.copy(Vme), M = I.accumulatedAngle, this.rotationSnap && (M = Math.round(M / this.rotationSnap) * this.rotationSnap), Zee.copy(k4a(I.pivotPosition, I.axisWorld, M));
        } else if (I.handle.kind === "scale-axis" && I.axisWorld && I.handle.axis) {
          const M = E.clone().sub(I.pivotPosition).dot(I.axisWorld);
          let T = Math.max(W3a, M / I.startProjection);
          this.scaleSnap && (T = Math.max(this.scaleSnap, Math.round(T / this.scaleSnap) * this.scaleSnap)), Zee.copy(A4a(I.pivotBasis, I.handle.axis, T));
        } else return;
        _4a(C, a4a.copy(Zee).multiply(I.startTargetWorldMatrix)), this.dispatchEvent({
          type: "change"
        }), this.dispatchEvent({
          type: "objectChange"
        });
      }
    };
    const k = t.pointerUp.bind(t);
    return t.pointerUp = function (S) {
      k(S), m = null, p = null;
    }, {
      setScaleEnabled: A => {
        r = A, !A && t.mode === "scale" && (t.mode = "translate");
      },
      setRotateSpace: A => {
        a = A, t.mode === "rotate" && (t.space = A);
      },
      setSpace: A => {
        i = A, a = A, t.mode !== "scale" && (t.space = A);
      }
    };
  };

/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var y5 = Uint8Array,
  Cre = Uint16Array,
  I4a = Int32Array,
  bKn = new y5([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
  vKn = new y5([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
  C4a = new y5([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  wKn = function (e, t) {
    for (var n = new Cre(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
    for (var a = new I4a(n[30]), r = 1; r < 30; ++r) for (var i = n[r]; i < n[r + 1]; ++i) a[i] = i - n[r] << 5 | r;
    return {
      b: n,
      r: a
    };
  },
  xKn = wKn(bKn, 2),
  _Kn = xKn.b,
  E4a = xKn.r;

_Kn[28] = 258, E4a[258] = 28;

var T4a = wKn(vKn, 0),
  M4a = T4a.b,
  Mvt = new Cre(32768);

for (var zm = 0; zm < 32768; ++zm) {
  var wL = (zm & 43690) >> 1 | (zm & 21845) << 1;
  wL = (wL & 52428) >> 2 | (wL & 13107) << 2, wL = (wL & 61680) >> 4 | (wL & 3855) << 4, Mvt[zm] = ((wL & 65280) >> 8 | (wL & 255) << 8) >> 1;
}

var Uve = (function (e, t, n) {
    for (var r = e.length, a = 0, i = new Cre(t); a < r; ++a) e[a] && ++i[e[a] - 1];
    var o = new Cre(t);
    for (a = 1; a < t; ++a) o[a] = o[a - 1] + i[a - 1] << 1;
    var s;
    if (n) {
      s = new Cre(1 << t);
      var l = 15 - t;
      for (a = 0; a < r; ++a) if (e[a]) for (var d = a << 4 | e[a], u = t - e[a], h = o[e[a] - 1]++ << u, p = h | (1 << u) - 1; h <= p; ++h) s[Mvt[h] >> l] = d;
    } else for (s = new Cre(r), a = 0; a < r; ++a) e[a] && (s[a] = Mvt[o[e[a] - 1]++] >> 15 - e[a]);
    return s;
  }),
  oCe = new y5(288);

for (var zm = 0; zm < 144; ++zm) oCe[zm] = 8;

for (var zm = 144; zm < 256; ++zm) oCe[zm] = 9;

for (var zm = 256; zm < 280; ++zm) oCe[zm] = 7;

for (var zm = 280; zm < 288; ++zm) oCe[zm] = 8;

var kKn = new y5(32);

for (var zm = 0; zm < 32; ++zm) kKn[zm] = 5;

var P4a = Uve(oCe, 9, 1),
  R4a = Uve(kKn, 5, 1),
  Vrt = function (e) {
    for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
    return t;
  },
  GI = function (e, t, n) {
    var r = t / 8 | 0;
    return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
  },
  Hrt = function (e, t) {
    var n = t / 8 | 0;
    return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
  },
  N4a = function (e) {
    return (e + 7) / 8 | 0;
  },
  j4a = function (e, t, n) {
    return (n == null || n > e.length) && (n = e.length), new y5(e.subarray(t, n));
  },
  D4a = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler",, "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"],
  gC = function (e, t, n) {
    var r = new Error(t || D4a[e]);
    if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, gC), !n) throw r;
    return r;
  },
  L4a = function (e, t, n, r) {
    var a = e.length,
      i = 0;
    if (!a || t.f && !t.l) return n || new y5(0);
    var o = !n,
      s = o || t.i != 2,
      l = t.i;
    o && (n = new y5(a * 3));
    var d = function (ne) {
        var de = n.length;
        if (ne > de) {
          var le = new y5(Math.max(de * 2, ne));
          le.set(n), n = le;
        }
      },
      u = t.f || 0,
      h = t.p || 0,
      p = t.b || 0,
      m = t.l,
      f = t.d,
      y = t.m,
      b = t.n,
      v = a * 8;
    do {
      if (!m) {
        u = GI(e, h, 1);
        var _ = GI(e, h + 1, 3);
        if (h += 3, _) {
          if (_ == 1) m = P4a, f = R4a, y = 9, b = 5;else if (_ == 2) {
            var S = GI(e, h, 31) + 257,
              C = GI(e, h + 10, 15) + 4,
              I = S + GI(e, h + 5, 31) + 1;
            h += 14;
            for (var E = new y5(I), M = new y5(19), T = 0; T < C; ++T) M[C4a[T]] = GI(e, h + T * 3, 7);
            h += C * 3;
            for (var P = Vrt(M), R = (1 << P) - 1, j = Uve(M, P, 1), T = 0; T < I;) {
              var B = j[GI(e, h, R)];
              h += B & 15;
              var w = B >> 4;
              if (w < 16) E[T++] = w;else {
                var F = 0,
                  N = 0;
                for (w == 16 ? (N = 3 + GI(e, h, 3), h += 2, F = E[T - 1]) : w == 17 ? (N = 3 + GI(e, h, 7), h += 3) : w == 18 && (N = 11 + GI(e, h, 127), h += 7); N--;) E[T++] = F;
              }
            }
            var G = E.subarray(0, S),
              z = E.subarray(S);
            y = Vrt(G), b = Vrt(z), m = Uve(G, y, 1), f = Uve(z, b, 1);
          } else gC(1);
        } else {
          var w = N4a(h) + 4,
            k = e[w - 4] | e[w - 3] << 8,
            A = w + k;
          if (A > a) {
            l && gC(0);
            break;
          }
          s && d(p + k), n.set(e.subarray(w, A), p), t.b = p += k, t.p = h = A * 8, t.f = u;
          continue;
        }
        if (h > v) {
          l && gC(0);
          break;
        }
      }
      s && d(p + 131072);
      for (var V = (1 << y) - 1, O = (1 << b) - 1, L = h;; L = h) {
        var F = m[Hrt(e, h) & V],
          D = F >> 4;
        if (h += F & 15, h > v) {
          l && gC(0);
          break;
        }
        if (F || gC(2), D < 256) n[p++] = D;else if (D == 256) {
          L = h, m = null;
          break;
        } else {
          var U = D - 254;
          if (D > 264) {
            var T = D - 257,
              H = bKn[T];
            U = GI(e, h, (1 << H) - 1) + _Kn[T], h += H;
          }
          var Y = f[Hrt(e, h) & O],
            K = Y >> 4;
          Y || gC(3), h += Y & 15;
          var z = M4a[K];
          if (K > 3) {
            var H = vKn[K];
            z += Hrt(e, h) & (1 << H) - 1, h += H;
          }
          if (h > v) {
            l && gC(0);
            break;
          }
          s && d(p + 131072);
          var W = p + U;
          if (p < z) {
            var Q = i - z,
              q = Math.min(z, W);
            for (Q + p < 0 && gC(3); p < q; ++p) n[p] = r[Q + p];
          }
          for (; p < W; ++p) n[p] = n[p - z];
        }
      }
      t.l = m, t.p = L, t.b = p, t.f = u, m && (u = 1, t.m = y, t.d = f, t.n = b);
    } while (!u);
    return p != n.length && o ? j4a(n, 0, p) : n.subarray(0, p);
  },
  O4a = new y5(0),
  B4a = function (e, t) {
    return ((e[0] & 15) != 8 || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31) && gC(6, "invalid zlib data"), (e[1] >> 5 & 1) == 1 && gC(6, "invalid zlib data: " + (e[1] & 32 ? "need" : "unexpected") + " dictionary"), (e[1] >> 3 & 4) + 2;
  };

function F4a(e, t) {
  return L4a(e.subarray(B4a(e), -4), {
    i: 2
  }, t, t);
}

var z4a = typeof TextDecoder < "u" && new TextDecoder(),
  U4a = 0;

try {
  z4a.decode(O4a, {
    stream: !0
  }), U4a = 1;
} catch {}

function AKn(e, t, n) {
  const r = n.length - e - 1;
  if (t >= n[r]) return r - 1;
  if (t <= n[e]) return e;
  let a = e,
    i = r,
    o = Math.floor((a + i) / 2);
  for (; t < n[o] || t >= n[o + 1];) t < n[o] ? i = o : a = o, o = Math.floor((a + i) / 2);
  return o;
}

function $4a(e, t, n, r) {
  const a = [],
    i = [],
    o = [];
  a[0] = 1;
  for (let s = 1; s <= n; ++s) {
    i[s] = t - r[e + 1 - s], o[s] = r[e + s] - t;
    let l = 0;
    for (let d = 0; d < s; ++d) {
      const u = o[d + 1],
        h = i[s - d],
        p = a[d] / (u + h);
      a[d] = l + u * p, l = h * p;
    }
    a[s] = l;
  }
  return a;
}

function G4a(e, t, n, r) {
  const a = AKn(e, r, t),
    i = $4a(a, r, e, t),
    o = new Vd(0, 0, 0, 0);
  for (let s = 0; s <= e; ++s) {
    const l = n[a - e + s],
      d = i[s],
      u = l.w * d;
    o.x += l.x * u, o.y += l.y * u, o.z += l.z * u, o.w += l.w * d;
  }
  return o;
}

function V4a(e, t, n, r, a) {
  const i = [];
  for (let h = 0; h <= n; ++h) i[h] = 0;
  const o = [];
  for (let h = 0; h <= r; ++h) o[h] = i.slice(0);
  const s = [];
  for (let h = 0; h <= n; ++h) s[h] = i.slice(0);
  s[0][0] = 1;
  const l = i.slice(0),
    d = i.slice(0);
  for (let h = 1; h <= n; ++h) {
    l[h] = t - a[e + 1 - h], d[h] = a[e + h] - t;
    let p = 0;
    for (let m = 0; m < h; ++m) {
      const f = d[m + 1],
        y = l[h - m];
      s[h][m] = f + y;
      const b = s[m][h - 1] / s[h][m];
      s[m][h] = p + f * b, p = y * b;
    }
    s[h][h] = p;
  }
  for (let h = 0; h <= n; ++h) o[0][h] = s[h][n];
  for (let h = 0; h <= n; ++h) {
    let p = 0,
      m = 1;
    const f = [];
    for (let y = 0; y <= n; ++y) f[y] = i.slice(0);
    f[0][0] = 1;
    for (let y = 1; y <= r; ++y) {
      let b = 0;
      const v = h - y,
        _ = n - y;
      h >= y && (f[m][0] = f[p][0] / s[_ + 1][v], b = f[m][0] * s[v][_]);
      const w = v >= -1 ? 1 : -v,
        k = h - 1 <= _ ? y - 1 : n - h;
      for (let S = w; S <= k; ++S) f[m][S] = (f[p][S] - f[p][S - 1]) / s[_ + 1][v + S], b += f[m][S] * s[v + S][_];
      h <= _ && (f[m][y] = -f[p][y - 1] / s[_ + 1][h], b += f[m][y] * s[h][_]), o[y][h] = b;
      const A = p;
      p = m, m = A;
    }
  }
  let u = n;
  for (let h = 1; h <= r; ++h) {
    for (let p = 0; p <= n; ++p) o[h][p] *= u;
    u *= n - h;
  }
  return o;
}

function H4a(e, t, n, r, a) {
  const i = a < e ? a : e,
    o = [],
    s = AKn(e, r, t),
    l = V4a(s, r, e, i, t),
    d = [];
  for (let u = 0; u < n.length; ++u) {
    const h = n[u].clone(),
      p = h.w;
    h.x *= p, h.y *= p, h.z *= p, d[u] = h;
  }
  for (let u = 0; u <= i; ++u) {
    const h = d[s - e].clone().multiplyScalar(l[u][0]);
    for (let p = 1; p <= e; ++p) h.add(d[s - e + p].clone().multiplyScalar(l[u][p]));
    o[u] = h;
  }
  for (let u = i + 1; u <= a + 1; ++u) o[u] = new Vd(0, 0, 0);
  return o;
}

function W4a(e, t) {
  let n = 1;
  for (let a = 2; a <= e; ++a) n *= a;
  let r = 1;
  for (let a = 2; a <= t; ++a) r *= a;
  for (let a = 2; a <= e - t; ++a) r *= a;
  return n / r;
}

function q4a(e) {
  const t = e.length,
    n = [],
    r = [];
  for (let i = 0; i < t; ++i) {
    const o = e[i];
    n[i] = new dr(o.x, o.y, o.z), r[i] = o.w;
  }
  const a = [];
  for (let i = 0; i < t; ++i) {
    const o = n[i].clone();
    for (let s = 1; s <= i; ++s) o.sub(a[i - s].clone().multiplyScalar(W4a(i, s) * r[s]));
    a[i] = o.divideScalar(r[0]);
  }
  return a;
}

function K4a(e, t, n, r, a) {
  const i = H4a(e, t, n, r, a);
  return q4a(i);
}

class Q4a extends RT {
  constructor(t, n, r, a, i) {
    super();
    const o = n ? n.length - 1 : 0,
      s = r ? r.length : 0;
    this.degree = t, this.knots = n, this.controlPoints = [], this.startKnot = a || 0, this.endKnot = i || o;
    for (let l = 0; l < s; ++l) {
      const d = r[l];
      this.controlPoints[l] = new Vd(d.x, d.y, d.z, d.w);
    }
  }
  getPoint(t, n = new dr()) {
    const r = n,
      a = this.knots[this.startKnot] + t * (this.knots[this.endKnot] - this.knots[this.startKnot]),
      i = G4a(this.degree, this.knots, this.controlPoints, a);
    return i.w !== 1 && i.divideScalar(i.w), r.set(i.x, i.y, i.z);
  }
  getTangent(t, n = new dr()) {
    const r = n,
      a = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0]),
      i = K4a(this.degree, this.knots, this.controlPoints, a, 1);
    return r.copy(i[1]).normalize(), r;
  }
  toJSON() {
    const t = super.toJSON();
    return t.degree = this.degree, t.knots = [...this.knots], t.controlPoints = this.controlPoints.map(n => n.toArray()), t.startKnot = this.startKnot, t.endKnot = this.endKnot, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.degree = t.degree, this.knots = [...t.knots], this.controlPoints = t.controlPoints.map(n => new Vd(n[0], n[1], n[2], n[3])), this.startKnot = t.startKnot, this.endKnot = t.endKnot, this;
  }
}

let rd, v0, a2;

class SKn extends oD {
  constructor(t) {
    super(t);
  }
  load(t, n, r, a) {
    const i = this,
      o = i.path === "" ? Tie.extractUrlBase(t) : i.path,
      s = new oDt(this.manager);
    s.setPath(i.path), s.setResponseType("arraybuffer"), s.setRequestHeader(i.requestHeader), s.setWithCredentials(i.withCredentials), s.load(t, function (l) {
      try {
        n(i.parse(l, o));
      } catch (d) {
        a ? a(d) : console.error(d), i.manager.itemError(t);
      }
    }, r, a);
  }
  parse(t, n) {
    if (t5a(t)) rd = new e5a().parse(t);else {
      const a = EKn(t);
      if (!n5a(a)) throw new Error("THREE.FBXLoader: Unknown format.");
      if (Jen(a) < 7e3) throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + Jen(a));
      rd = new Z4a().parse(a);
    }
    const r = new sD(this.manager).setPath(this.resourcePath || n).setCrossOrigin(this.crossOrigin);
    return new Y4a(r, this.manager).parse(rd);
  }
}

class Y4a {
  constructor(t, n) {
    this.textureLoader = t, this.manager = n;
  }
  parse() {
    v0 = this.parseConnections();
    const t = this.parseImages(),
      n = this.parseTextures(t),
      r = this.parseMaterials(n),
      a = this.parseDeformers(),
      i = new X4a().parse(a);
    return this.parseScene(a, i, r), a2;
  }
  parseConnections() {
    const t = new Map();
    return "Connections" in rd && rd.Connections.connections.forEach(function (r) {
      const a = r[0],
        i = r[1],
        o = r[2];
      t.has(a) || t.set(a, {
        parents: [],
        children: []
      });
      const s = {
        ID: i,
        relationship: o
      };
      t.get(a).parents.push(s), t.has(i) || t.set(i, {
        parents: [],
        children: []
      });
      const l = {
        ID: a,
        relationship: o
      };
      t.get(i).children.push(l);
    }), t;
  }
  parseImages() {
    const t = {},
      n = {};
    if ("Video" in rd.Objects) {
      const r = rd.Objects.Video;
      for (const a in r) {
        const i = r[a],
          o = parseInt(a);
        if (t[o] = i.RelativeFilename || i.Filename, "Content" in i) {
          const s = i.Content instanceof ArrayBuffer && i.Content.byteLength > 0,
            l = typeof i.Content == "string" && i.Content !== "";
          if (s || l) {
            const d = this.parseImage(r[a]);
            n[i.RelativeFilename || i.Filename] = d;
          }
        }
      }
    }
    for (const r in t) {
      const a = t[r];
      n[a] !== void 0 ? t[r] = n[a] : t[r] = t[r].split("\\").pop();
    }
    return t;
  }
  parseImage(t) {
    const n = t.Content,
      r = t.RelativeFilename || t.Filename,
      a = r.slice(r.lastIndexOf(".") + 1).toLowerCase();
    let i;
    switch (a) {
      case "bmp":
        i = "image/bmp";
        break;
      case "jpg":
      case "jpeg":
        i = "image/jpeg";
        break;
      case "png":
        i = "image/png";
        break;
      case "tif":
        i = "image/tiff";
        break;
      case "tga":
        this.manager.getHandler(".tga") === null && console.warn("FBXLoader: TGA loader not found, skipping ", r), i = "image/tga";
        break;
      case "webp":
        i = "image/webp";
        break;
      default:
        console.warn('FBXLoader: Image type "' + a + '" is not supported.');
        return;
    }
    if (typeof n == "string") return "data:" + i + ";base64," + n;
    {
      const o = new Uint8Array(n);
      return window.URL.createObjectURL(new Blob([o], {
        type: i
      }));
    }
  }
  parseTextures(t) {
    const n = new Map();
    if ("Texture" in rd.Objects) {
      const r = rd.Objects.Texture;
      for (const a in r) {
        const i = this.parseTexture(r[a], t);
        n.set(parseInt(a), i);
      }
    }
    return n;
  }
  parseTexture(t, n) {
    const r = this.loadTexture(t, n);
    r.ID = t.id, r.name = t.attrName;
    const a = t.WrapModeU,
      i = t.WrapModeV,
      o = a !== void 0 ? a.value : 0,
      s = i !== void 0 ? i.value : 0;
    if (r.wrapS = o === 0 ? e$ : hy, r.wrapT = s === 0 ? e$ : hy, "Scaling" in t) {
      const l = t.Scaling.value;
      r.repeat.x = l[0], r.repeat.y = l[1];
    }
    if ("Translation" in t) {
      const l = t.Translation.value;
      r.offset.x = l[0], r.offset.y = l[1];
    }
    return r;
  }
  loadTexture(t, n) {
    const r = t.FileName.split(".").pop().toLowerCase();
    let a = this.manager.getHandler(`.${r}`);
    a === null && (a = this.textureLoader);
    const i = a.path;
    i || a.setPath(this.textureLoader.path);
    const o = v0.get(t.id).children;
    let s;
    if (o !== void 0 && o.length > 0 && n[o[0].ID] !== void 0 && (s = n[o[0].ID], (s.indexOf("blob:") === 0 || s.indexOf("data:") === 0) && a.setPath(void 0)), s === void 0) return console.warn("FBXLoader: Undefined filename, creating placeholder texture."), new N0();
    const l = a.load(s);
    return a.setPath(i), l;
  }
  parseMaterials(t) {
    const n = new Map();
    if ("Material" in rd.Objects) {
      const r = rd.Objects.Material;
      for (const a in r) {
        const i = this.parseMaterial(r[a], t);
        i !== null && n.set(parseInt(a), i);
      }
    }
    return n;
  }
  parseMaterial(t, n) {
    const r = t.id,
      a = t.attrName;
    let i = t.ShadingModel;
    if (typeof i == "object" && (i = i.value), !v0.has(r)) return null;
    const o = this.parseParameters(t, n, r);
    let s;
    switch (i.toLowerCase()) {
      case "phong":
        s = new M8e();
        break;
      case "lambert":
        s = new Bxa();
        break;
      default:
        console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', i), s = new M8e();
        break;
    }
    return s.setValues(o), s.name = a, s;
  }
  parseParameters(t, n, r) {
    const a = {};
    t.BumpFactor && (a.bumpScale = t.BumpFactor.value), t.Diffuse ? a.color = vc.colorSpaceToWorking(new so().fromArray(t.Diffuse.value), Nl) : t.DiffuseColor && (t.DiffuseColor.type === "Color" || t.DiffuseColor.type === "ColorRGB") && (a.color = vc.colorSpaceToWorking(new so().fromArray(t.DiffuseColor.value), Nl)), t.DisplacementFactor && (a.displacementScale = t.DisplacementFactor.value), t.Emissive ? a.emissive = vc.colorSpaceToWorking(new so().fromArray(t.Emissive.value), Nl) : t.EmissiveColor && (t.EmissiveColor.type === "Color" || t.EmissiveColor.type === "ColorRGB") && (a.emissive = vc.colorSpaceToWorking(new so().fromArray(t.EmissiveColor.value), Nl)), t.EmissiveFactor && (a.emissiveIntensity = parseFloat(t.EmissiveFactor.value)), a.opacity = 1 - (t.TransparencyFactor ? parseFloat(t.TransparencyFactor.value) : 0), (a.opacity === 1 || a.opacity === 0) && (a.opacity = t.Opacity ? parseFloat(t.Opacity.value) : null, a.opacity === null && (a.opacity = 1 - (t.TransparentColor ? parseFloat(t.TransparentColor.value[0]) : 0))), a.opacity < 1 && (a.transparent = !0), t.ReflectionFactor && (a.reflectivity = t.ReflectionFactor.value), t.Shininess && (a.shininess = t.Shininess.value), t.Specular ? a.specular = vc.colorSpaceToWorking(new so().fromArray(t.Specular.value), Nl) : t.SpecularColor && t.SpecularColor.type === "Color" && (a.specular = vc.colorSpaceToWorking(new so().fromArray(t.SpecularColor.value), Nl));
    const i = this;
    return v0.get(r).children.forEach(function (o) {
      const s = o.relationship;
      switch (s) {
        case "Bump":
          a.bumpMap = i.getTexture(n, o.ID);
          break;
        case "Maya|TEX_ao_map":
          a.aoMap = i.getTexture(n, o.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          a.map = i.getTexture(n, o.ID), a.map !== void 0 && (a.map.colorSpace = Nl);
          break;
        case "DisplacementColor":
          a.displacementMap = i.getTexture(n, o.ID);
          break;
        case "EmissiveColor":
          a.emissiveMap = i.getTexture(n, o.ID), a.emissiveMap !== void 0 && (a.emissiveMap.colorSpace = Nl);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          a.normalMap = i.getTexture(n, o.ID);
          break;
        case "ReflectionColor":
          a.envMap = i.getTexture(n, o.ID), a.envMap !== void 0 && (a.envMap.mapping = Dve, a.envMap.colorSpace = Nl);
          break;
        case "SpecularColor":
          a.specularMap = i.getTexture(n, o.ID), a.specularMap !== void 0 && (a.specularMap.colorSpace = Nl);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          a.alphaMap = i.getTexture(n, o.ID), a.transparent = !0;
          break;
        case "AmbientColor":
        case "ShininessExponent":
        case "SpecularFactor":
        case "VectorDisplacementColor":
        default:
          console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", s);
          break;
      }
    }), a;
  }
  getTexture(t, n) {
    return "LayeredTexture" in rd.Objects && n in rd.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), n = v0.get(n).children[0].ID), t.get(n);
  }
  parseDeformers() {
    const t = {},
      n = {};
    if ("Deformer" in rd.Objects) {
      const r = rd.Objects.Deformer;
      for (const a in r) {
        const i = r[a],
          o = v0.get(parseInt(a));
        if (i.attrType === "Skin") {
          const s = this.parseSkeleton(o, r);
          s.ID = a, o.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), s.geometryID = o.parents[0].ID, t[a] = s;
        } else if (i.attrType === "BlendShape") {
          const s = {
            id: a
          };
          s.rawTargets = this.parseMorphTargets(o, r), s.id = a, o.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), n[a] = s;
        }
      }
    }
    return {
      skeletons: t,
      morphTargets: n
    };
  }
  parseSkeleton(t, n) {
    const r = [];
    return t.children.forEach(function (a) {
      const i = n[a.ID];
      if (i.attrType !== "Cluster") return;
      const o = {
        ID: a.ID,
        indices: [],
        weights: [],
        transformLink: new bo().fromArray(i.TransformLink.a)
      };
      "Indexes" in i && (o.indices = i.Indexes.a, o.weights = i.Weights.a), r.push(o);
    }), {
      rawBones: r,
      bones: []
    };
  }
  parseMorphTargets(t, n) {
    const r = [];
    for (let a = 0; a < t.children.length; a++) {
      const i = t.children[a],
        o = n[i.ID],
        s = {
          name: o.attrName,
          initialWeight: o.DeformPercent,
          id: o.id,
          fullWeights: o.FullWeights.a
        };
      if (o.attrType !== "BlendShapeChannel") return;
      s.geoID = v0.get(parseInt(i.ID)).children.filter(function (l) {
        return l.relationship === void 0;
      })[0].ID, r.push(s);
    }
    return r;
  }
  parseScene(t, n, r) {
    a2 = new hc();
    const a = this.parseModels(t.skeletons, n, r),
      i = rd.Objects.Model,
      o = this;
    a.forEach(function (l) {
      const d = i[l.ID];
      o.setLookAtProperties(l, d), v0.get(l.ID).parents.forEach(function (h) {
        const p = a.get(h.ID);
        p !== void 0 && p.add(l);
      }), l.parent === null && a2.add(l);
    }), this.bindSkeleton(t.skeletons, n, a), this.addGlobalSceneSettings(), a2.traverse(function (l) {
      if (l.userData.transformData) {
        l.parent && (l.userData.transformData.parentMatrix = l.parent.matrix, l.userData.transformData.parentMatrixWorld = l.parent.matrixWorld);
        const d = CKn(l.userData.transformData);
        l.applyMatrix4(d), l.updateWorldMatrix();
      }
    });
    const s = new J4a().parse();
    a2.children.length === 1 && a2.children[0].isGroup && (a2.children[0].animations = s, a2 = a2.children[0]), a2.animations = s;
  }
  parseModels(t, n, r) {
    const a = new Map(),
      i = rd.Objects.Model;
    for (const o in i) {
      const s = parseInt(o),
        l = i[o],
        d = v0.get(s);
      let u = this.buildSkeleton(d, t, s, l.attrName);
      if (!u) {
        switch (l.attrType) {
          case "Camera":
            u = this.createCamera(d);
            break;
          case "Light":
            u = this.createLight(d);
            break;
          case "Mesh":
            u = this.createMesh(d, n, r);
            break;
          case "NurbsCurve":
            u = this.createCurve(d, n);
            break;
          case "LimbNode":
          case "Root":
            u = new tze();
            break;
          case "Null":
          default:
            u = new hc();
            break;
        }
        u.name = l.attrName ? au.sanitizeNodeName(l.attrName) : "", u.userData.originalName = l.attrName, u.ID = s;
      }
      this.getTransformData(u, l), a.set(s, u);
    }
    return a;
  }
  buildSkeleton(t, n, r, a) {
    let i = null;
    return t.parents.forEach(function (o) {
      for (const s in n) {
        const l = n[s];
        l.rawBones.forEach(function (d, u) {
          if (d.ID === o.ID) {
            const h = i;
            i = new tze(), i.matrixWorld.copy(d.transformLink), i.name = a ? au.sanitizeNodeName(a) : "", i.userData.originalName = a, i.ID = r, l.bones[u] = i, h !== null && i.add(h);
          }
        });
      }
    }), i;
  }
  createCamera(t) {
    let n, r;
    if (t.children.forEach(function (a) {
      const i = rd.Objects.NodeAttribute[a.ID];
      i !== void 0 && (r = i);
    }), r === void 0) n = new Zc();else {
      let a = 0;
      r.CameraProjectionType !== void 0 && r.CameraProjectionType.value === 1 && (a = 1);
      let i = 1;
      r.NearPlane !== void 0 && (i = r.NearPlane.value / 1e3);
      let o = 1e3;
      r.FarPlane !== void 0 && (o = r.FarPlane.value / 1e3);
      let s = window.innerWidth,
        l = window.innerHeight;
      r.AspectWidth !== void 0 && r.AspectHeight !== void 0 && (s = r.AspectWidth.value, l = r.AspectHeight.value);
      const d = s / l;
      let u = 45;
      r.FieldOfView !== void 0 && (u = r.FieldOfView.value);
      const h = r.FocalLength ? r.FocalLength.value : null;
      switch (a) {
        case 0:
          n = new lu(u, d, i, o), h !== null && n.setFocalLength(h);
          break;
        case 1:
          console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."), n = new Zc();
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown camera type " + a + "."), n = new Zc();
          break;
      }
    }
    return n;
  }
  createLight(t) {
    let n, r;
    if (t.children.forEach(function (a) {
      const i = rd.Objects.NodeAttribute[a.ID];
      i !== void 0 && (r = i);
    }), r === void 0) n = new Zc();else {
      let a;
      r.LightType === void 0 ? a = 0 : a = r.LightType.value;
      let i = 16777215;
      r.Color !== void 0 && (i = vc.colorSpaceToWorking(new so().fromArray(r.Color.value), Nl));
      let o = r.Intensity === void 0 ? 1 : r.Intensity.value / 100;
      r.CastLightOnObject !== void 0 && r.CastLightOnObject.value === 0 && (o = 0);
      let s = 0;
      r.FarAttenuationEnd !== void 0 && (r.EnableFarAttenuation !== void 0 && r.EnableFarAttenuation.value === 0 ? s = 0 : s = r.FarAttenuationEnd.value);
      const l = 1;
      switch (a) {
        case 0:
          n = new sde(i, o, s, l);
          break;
        case 1:
          n = new pT(i, o);
          break;
        case 2:
          let d = Math.PI / 3;
          r.InnerAngle !== void 0 && (d = Mo.degToRad(r.InnerAngle.value));
          let u = 0;
          r.OuterAngle !== void 0 && (u = Mo.degToRad(r.OuterAngle.value), u = Math.max(u, 1)), n = new lDt(i, o, s, d, u, l);
          break;
        default:
          console.warn("THREE.FBXLoader: Unknown light type " + r.LightType.value + ", defaulting to a PointLight."), n = new sde(i, o);
          break;
      }
      r.CastShadows !== void 0 && r.CastShadows.value === 1 && (n.castShadow = !0);
    }
    return n;
  }
  createMesh(t, n, r) {
    let a,
      i = null,
      o = null;
    const s = [];
    if (t.children.forEach(function (l) {
      n.has(l.ID) && (i = n.get(l.ID)), r.has(l.ID) && s.push(r.get(l.ID));
    }), s.length > 1 ? o = s : s.length > 0 ? o = s[0] : (o = new M8e({
      name: oD.DEFAULT_MATERIAL_NAME,
      color: 13421772
    }), s.push(o)), "color" in i.attributes && s.forEach(function (l) {
      l.vertexColors = !0;
    }), i.groups.length > 0) {
      let l = !1;
      for (let d = 0, u = i.groups.length; d < u; d++) {
        const h = i.groups[d];
        (h.materialIndex < 0 || h.materialIndex >= s.length) && (h.materialIndex = s.length, l = !0);
      }
      if (l) {
        const d = new M8e();
        s.push(d);
      }
    }
    return i.FBX_Deformer ? (a = new Fqn(i, o), a.normalizeSkinWeights()) : a = new di(i, o), a;
  }
  createCurve(t, n) {
    const r = t.children.reduce(function (i, o) {
        return n.has(o.ID) && (i = n.get(o.ID)), i;
      }, null),
      a = new BD({
        name: oD.DEFAULT_MATERIAL_NAME,
        color: 3342591,
        linewidth: 1
      });
    return new Qw(r, a);
  }
  getTransformData(t, n) {
    const r = {};
    "InheritType" in n && (r.inheritType = parseInt(n.InheritType.value)), "RotationOrder" in n ? r.eulerOrder = O_e(n.RotationOrder.value) : r.eulerOrder = O_e(0), "Lcl_Translation" in n && (r.translation = n.Lcl_Translation.value), "PreRotation" in n && (r.preRotation = n.PreRotation.value), "Lcl_Rotation" in n && (r.rotation = n.Lcl_Rotation.value), "PostRotation" in n && (r.postRotation = n.PostRotation.value), "Lcl_Scaling" in n && (r.scale = n.Lcl_Scaling.value), "ScalingOffset" in n && (r.scalingOffset = n.ScalingOffset.value), "ScalingPivot" in n && (r.scalingPivot = n.ScalingPivot.value), "RotationOffset" in n && (r.rotationOffset = n.RotationOffset.value), "RotationPivot" in n && (r.rotationPivot = n.RotationPivot.value), t.userData.transformData = r;
  }
  setLookAtProperties(t, n) {
    "LookAtProperty" in n && v0.get(t.ID).children.forEach(function (a) {
      if (a.relationship === "LookAtProperty") {
        const i = rd.Objects.Model[a.ID];
        if ("Lcl_Translation" in i) {
          const o = i.Lcl_Translation.value;
          t.target !== void 0 ? (t.target.position.fromArray(o), a2.add(t.target)) : t.lookAt(new dr().fromArray(o));
        }
      }
    });
  }
  bindSkeleton(t, n, r) {
    const a = this.parsePoseNodes();
    for (const i in t) {
      const o = t[i];
      v0.get(parseInt(o.ID)).parents.forEach(function (l) {
        if (n.has(l.ID)) {
          const d = l.ID;
          v0.get(d).parents.forEach(function (h) {
            r.has(h.ID) && r.get(h.ID).bind(new WYe(o.bones), a[h.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const t = {};
    if ("Pose" in rd.Objects) {
      const n = rd.Objects.Pose;
      for (const r in n) if (n[r].attrType === "BindPose" && n[r].NbPoseNodes > 0) {
        const a = n[r].PoseNode;
        Array.isArray(a) ? a.forEach(function (i) {
          t[i.Node] = new bo().fromArray(i.Matrix.a);
        }) : t[a.Node] = new bo().fromArray(a.Matrix.a);
      }
    }
    return t;
  }
  addGlobalSceneSettings() {
    if ("GlobalSettings" in rd) {
      if ("AmbientColor" in rd.GlobalSettings) {
        const t = rd.GlobalSettings.AmbientColor.value,
          n = t[0],
          r = t[1],
          a = t[2];
        if (n !== 0 || r !== 0 || a !== 0) {
          const i = new so().setRGB(n, r, a, Nl);
          a2.add(new ope(i, 1));
        }
      }
      "UnitScaleFactor" in rd.GlobalSettings && (a2.userData.unitScaleFactor = rd.GlobalSettings.UnitScaleFactor.value);
    }
  }
}

class X4a {
  constructor() {
    this.negativeMaterialIndices = !1;
  }
  parse(t) {
    const n = new Map();
    if ("Geometry" in rd.Objects) {
      const r = rd.Objects.Geometry;
      for (const a in r) {
        const i = v0.get(parseInt(a)),
          o = this.parseGeometry(i, r[a], t);
        n.set(parseInt(a), o);
      }
    }
    return this.negativeMaterialIndices === !0 && console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."), n;
  }
  parseGeometry(t, n, r) {
    switch (n.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(t, n, r);
      case "NurbsCurve":
        return this.parseNurbsGeometry(n);
    }
  }
  parseMeshGeometry(t, n, r) {
    const a = r.skeletons,
      i = [],
      o = t.parents.map(function (h) {
        return rd.Objects.Model[h.ID];
      });
    if (o.length === 0) return;
    const s = t.children.reduce(function (h, p) {
      return a[p.ID] !== void 0 && (h = a[p.ID]), h;
    }, null);
    t.children.forEach(function (h) {
      r.morphTargets[h.ID] !== void 0 && i.push(r.morphTargets[h.ID]);
    });
    const l = o[0],
      d = {};
    "RotationOrder" in l && (d.eulerOrder = O_e(l.RotationOrder.value)), "InheritType" in l && (d.inheritType = parseInt(l.InheritType.value)), "GeometricTranslation" in l && (d.translation = l.GeometricTranslation.value), "GeometricRotation" in l && (d.rotation = l.GeometricRotation.value), "GeometricScaling" in l && (d.scale = l.GeometricScaling.value);
    const u = CKn(d);
    return this.genGeometry(n, s, i, u);
  }
  genGeometry(t, n, r, a) {
    const i = new Fd();
    t.attrName && (i.name = t.attrName);
    const o = this.parseGeoNode(t, n),
      s = this.genBuffers(o),
      l = new Al(s.vertex, 3);
    if (l.applyMatrix4(a), i.setAttribute("position", l), s.colors.length > 0 && i.setAttribute("color", new Al(s.colors, 3)), n && (i.setAttribute("skinIndex", new Qjt(s.weightsIndices, 4)), i.setAttribute("skinWeight", new Al(s.vertexWeights, 4)), i.FBX_Deformer = n), s.normal.length > 0) {
      const d = new Tc().getNormalMatrix(a),
        u = new Al(s.normal, 3);
      u.applyNormalMatrix(d), i.setAttribute("normal", u);
    }
    if (s.uvs.forEach(function (d, u) {
      const h = u === 0 ? "uv" : `uv${u}`;
      i.setAttribute(h, new Al(s.uvs[u], 2));
    }), o.material && o.material.mappingType !== "AllSame") {
      let d = s.materialIndex[0],
        u = 0;
      if (s.materialIndex.forEach(function (h, p) {
        h !== d && (i.addGroup(u, p - u, d), d = h, u = p);
      }), i.groups.length > 0) {
        const h = i.groups[i.groups.length - 1],
          p = h.start + h.count;
        p !== s.materialIndex.length && i.addGroup(p, s.materialIndex.length - p, d);
      }
      i.groups.length === 0 && i.addGroup(0, s.materialIndex.length, s.materialIndex[0]);
    }
    return this.addMorphTargets(i, t, r, a), i;
  }
  parseGeoNode(t, n) {
    const r = {};
    if (r.vertexPositions = t.Vertices !== void 0 ? t.Vertices.a : [], r.vertexIndices = t.PolygonVertexIndex !== void 0 ? t.PolygonVertexIndex.a : [], t.LayerElementColor && t.LayerElementColor[0].Colors && (r.color = this.parseVertexColors(t.LayerElementColor[0])), t.LayerElementMaterial && (r.material = this.parseMaterialIndices(t.LayerElementMaterial[0])), t.LayerElementNormal && (r.normal = this.parseNormals(t.LayerElementNormal[0])), t.LayerElementUV) {
      r.uv = [];
      let a = 0;
      for (; t.LayerElementUV[a];) t.LayerElementUV[a].UV && r.uv.push(this.parseUVs(t.LayerElementUV[a])), a++;
    }
    return r.weightTable = {}, n !== null && (r.skeleton = n, n.rawBones.forEach(function (a, i) {
      a.indices.forEach(function (o, s) {
        r.weightTable[o] === void 0 && (r.weightTable[o] = []), r.weightTable[o].push({
          id: i,
          weight: a.weights[s]
        });
      });
    })), r;
  }
  genBuffers(t) {
    const n = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let r = 0,
      a = 0,
      i = !1,
      o = [],
      s = [],
      l = [],
      d = [],
      u = [],
      h = [];
    const p = this;
    return t.vertexIndices.forEach(function (m, f) {
      let y,
        b = !1;
      m < 0 && (m = m ^ -1, b = !0);
      let v = [],
        _ = [];
      if (o.push(m * 3, m * 3 + 1, m * 3 + 2), t.color) {
        const w = H8e(f, r, m, t.color);
        l.push(w[0], w[1], w[2]);
      }
      if (t.skeleton) {
        if (t.weightTable[m] !== void 0 && t.weightTable[m].forEach(function (w) {
          _.push(w.weight), v.push(w.id);
        }), _.length > 4) {
          i || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), i = !0);
          const w = [0, 0, 0, 0],
            k = [0, 0, 0, 0];
          _.forEach(function (A, S) {
            let C = A,
              I = v[S];
            k.forEach(function (E, M, T) {
              if (C > E) {
                T[M] = C, C = E;
                const P = w[M];
                w[M] = I, I = P;
              }
            });
          }), v = w, _ = k;
        }
        for (; _.length < 4;) _.push(0), v.push(0);
        for (let w = 0; w < 4; ++w) u.push(_[w]), h.push(v[w]);
      }
      if (t.normal) {
        const w = H8e(f, r, m, t.normal);
        s.push(w[0], w[1], w[2]);
      }
      t.material && t.material.mappingType !== "AllSame" && (y = H8e(f, r, m, t.material)[0], y < 0 && (p.negativeMaterialIndices = !0, y = 0)), t.uv && t.uv.forEach(function (w, k) {
        const A = H8e(f, r, m, w);
        d[k] === void 0 && (d[k] = []), d[k].push(A[0]), d[k].push(A[1]);
      }), a++, b && (p.genFace(n, t, o, y, s, l, d, u, h, a), r++, a = 0, o = [], s = [], l = [], d = [], u = [], h = []);
    }), n;
  }
  getNormalNewell(t) {
    const n = new dr(0, 0, 0);
    for (let r = 0; r < t.length; r++) {
      const a = t[r],
        i = t[(r + 1) % t.length];
      n.x += (a.y - i.y) * (a.z + i.z), n.y += (a.z - i.z) * (a.x + i.x), n.z += (a.x - i.x) * (a.y + i.y);
    }
    return n.normalize(), n;
  }
  getNormalTangentAndBitangent(t) {
    const n = this.getNormalNewell(t),
      a = (Math.abs(n.z) > .5 ? new dr(0, 1, 0) : new dr(0, 0, 1)).cross(n).normalize(),
      i = n.clone().cross(a).normalize();
    return {
      normal: n,
      tangent: a,
      bitangent: i
    };
  }
  flattenVertex(t, n, r) {
    return new Qi(t.dot(n), t.dot(r));
  }
  genFace(t, n, r, a, i, o, s, l, d, u) {
    let h;
    if (u > 3) {
      const p = [],
        m = n.baseVertexPositions || n.vertexPositions;
      for (let v = 0; v < r.length; v += 3) p.push(new dr(m[r[v]], m[r[v + 1]], m[r[v + 2]]));
      const {
          tangent: f,
          bitangent: y
        } = this.getNormalTangentAndBitangent(p),
        b = [];
      for (const v of p) b.push(this.flattenVertex(v, f, y));
      h = Eie.triangulateShape(b, []);
    } else h = [[0, 1, 2]];
    for (const [p, m, f] of h) t.vertex.push(n.vertexPositions[r[p * 3]]), t.vertex.push(n.vertexPositions[r[p * 3 + 1]]), t.vertex.push(n.vertexPositions[r[p * 3 + 2]]), t.vertex.push(n.vertexPositions[r[m * 3]]), t.vertex.push(n.vertexPositions[r[m * 3 + 1]]), t.vertex.push(n.vertexPositions[r[m * 3 + 2]]), t.vertex.push(n.vertexPositions[r[f * 3]]), t.vertex.push(n.vertexPositions[r[f * 3 + 1]]), t.vertex.push(n.vertexPositions[r[f * 3 + 2]]), n.skeleton && (t.vertexWeights.push(l[p * 4]), t.vertexWeights.push(l[p * 4 + 1]), t.vertexWeights.push(l[p * 4 + 2]), t.vertexWeights.push(l[p * 4 + 3]), t.vertexWeights.push(l[m * 4]), t.vertexWeights.push(l[m * 4 + 1]), t.vertexWeights.push(l[m * 4 + 2]), t.vertexWeights.push(l[m * 4 + 3]), t.vertexWeights.push(l[f * 4]), t.vertexWeights.push(l[f * 4 + 1]), t.vertexWeights.push(l[f * 4 + 2]), t.vertexWeights.push(l[f * 4 + 3]), t.weightsIndices.push(d[p * 4]), t.weightsIndices.push(d[p * 4 + 1]), t.weightsIndices.push(d[p * 4 + 2]), t.weightsIndices.push(d[p * 4 + 3]), t.weightsIndices.push(d[m * 4]), t.weightsIndices.push(d[m * 4 + 1]), t.weightsIndices.push(d[m * 4 + 2]), t.weightsIndices.push(d[m * 4 + 3]), t.weightsIndices.push(d[f * 4]), t.weightsIndices.push(d[f * 4 + 1]), t.weightsIndices.push(d[f * 4 + 2]), t.weightsIndices.push(d[f * 4 + 3])), n.color && (t.colors.push(o[p * 3]), t.colors.push(o[p * 3 + 1]), t.colors.push(o[p * 3 + 2]), t.colors.push(o[m * 3]), t.colors.push(o[m * 3 + 1]), t.colors.push(o[m * 3 + 2]), t.colors.push(o[f * 3]), t.colors.push(o[f * 3 + 1]), t.colors.push(o[f * 3 + 2])), n.material && n.material.mappingType !== "AllSame" && (t.materialIndex.push(a), t.materialIndex.push(a), t.materialIndex.push(a)), n.normal && (t.normal.push(i[p * 3]), t.normal.push(i[p * 3 + 1]), t.normal.push(i[p * 3 + 2]), t.normal.push(i[m * 3]), t.normal.push(i[m * 3 + 1]), t.normal.push(i[m * 3 + 2]), t.normal.push(i[f * 3]), t.normal.push(i[f * 3 + 1]), t.normal.push(i[f * 3 + 2])), n.uv && n.uv.forEach(function (y, b) {
      t.uvs[b] === void 0 && (t.uvs[b] = []), t.uvs[b].push(s[b][p * 2]), t.uvs[b].push(s[b][p * 2 + 1]), t.uvs[b].push(s[b][m * 2]), t.uvs[b].push(s[b][m * 2 + 1]), t.uvs[b].push(s[b][f * 2]), t.uvs[b].push(s[b][f * 2 + 1]);
    });
  }
  addMorphTargets(t, n, r, a) {
    if (r.length === 0) return;
    t.morphTargetsRelative = !0, t.morphAttributes.position = [];
    const i = this;
    r.forEach(function (o) {
      o.rawTargets.forEach(function (s) {
        const l = rd.Objects.Geometry[s.geoID];
        l !== void 0 && i.genMorphGeometry(t, n, l, a, s.name);
      });
    });
  }
  genMorphGeometry(t, n, r, a, i) {
    const o = n.Vertices !== void 0 ? n.Vertices.a : [],
      s = n.PolygonVertexIndex !== void 0 ? n.PolygonVertexIndex.a : [],
      l = r.Vertices !== void 0 ? r.Vertices.a : [],
      d = r.Indexes !== void 0 ? r.Indexes.a : [],
      u = t.attributes.position.count * 3,
      h = new Float32Array(u);
    for (let y = 0; y < d.length; y++) {
      const b = d[y] * 3;
      h[b] = l[y * 3], h[b + 1] = l[y * 3 + 1], h[b + 2] = l[y * 3 + 2];
    }
    const p = {
        vertexIndices: s,
        vertexPositions: h,
        baseVertexPositions: o
      },
      m = this.genBuffers(p),
      f = new Al(m.vertex, 3);
    f.name = i || r.attrName, f.applyMatrix4(a), t.morphAttributes.position.push(f);
  }
  parseNormals(t) {
    const n = t.MappingInformationType,
      r = t.ReferenceInformationType,
      a = t.Normals.a;
    let i = [];
    return r === "IndexToDirect" && ("NormalIndex" in t ? i = t.NormalIndex.a : "NormalsIndex" in t && (i = t.NormalsIndex.a)), {
      dataSize: 3,
      buffer: a,
      indices: i,
      mappingType: n,
      referenceType: r
    };
  }
  parseUVs(t) {
    const n = t.MappingInformationType,
      r = t.ReferenceInformationType,
      a = t.UV.a;
    let i = [];
    return r === "IndexToDirect" && (i = t.UVIndex.a), {
      dataSize: 2,
      buffer: a,
      indices: i,
      mappingType: n,
      referenceType: r
    };
  }
  parseVertexColors(t) {
    const n = t.MappingInformationType,
      r = t.ReferenceInformationType,
      a = t.Colors.a;
    let i = [];
    r === "IndexToDirect" && (i = t.ColorIndex.a);
    for (let o = 0, s = new so(); o < a.length; o += 4) s.fromArray(a, o), vc.colorSpaceToWorking(s, Nl), s.toArray(a, o);
    return {
      dataSize: 4,
      buffer: a,
      indices: i,
      mappingType: n,
      referenceType: r
    };
  }
  parseMaterialIndices(t) {
    const n = t.MappingInformationType,
      r = t.ReferenceInformationType;
    if (n === "NoMappingInformation") return {
      dataSize: 1,
      buffer: [0],
      indices: [0],
      mappingType: "AllSame",
      referenceType: r
    };
    const a = t.Materials.a,
      i = [];
    for (let o = 0; o < a.length; ++o) i.push(o);
    return {
      dataSize: 1,
      buffer: a,
      indices: i,
      mappingType: n,
      referenceType: r
    };
  }
  parseNurbsGeometry(t) {
    const n = parseInt(t.Order);
    if (isNaN(n)) return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", t.Order, t.id), new Fd();
    const r = n - 1,
      a = t.KnotVector.a,
      i = [],
      o = t.Points.a;
    for (let h = 0, p = o.length; h < p; h += 4) i.push(new Vd().fromArray(o, h));
    let s, l;
    if (t.Form === "Closed") i.push(i[0]);else if (t.Form === "Periodic") {
      s = r, l = a.length - 1 - s;
      for (let h = 0; h < r; ++h) i.push(i[h]);
    }
    const u = new Q4a(r, a, i, s, l).getPoints(i.length * 12);
    return new Fd().setFromPoints(u);
  }
}

class J4a {
  parse() {
    const t = [],
      n = this.parseClips();
    if (n !== void 0) for (const r in n) {
      const a = n[r],
        i = this.addClip(a);
      t.push(i);
    }
    return t;
  }
  parseClips() {
    if (rd.Objects.AnimationCurve === void 0) return;
    const t = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(t);
    const n = this.parseAnimationLayers(t);
    return this.parseAnimStacks(n);
  }
  parseAnimationCurveNodes() {
    const t = rd.Objects.AnimationCurveNode,
      n = new Map();
    for (const r in t) {
      const a = t[r];
      if (a.attrName.match(/S|R|T|DeformPercent/) !== null) {
        const i = {
          id: a.id,
          attr: a.attrName,
          curves: {}
        };
        n.set(i.id, i);
      }
    }
    return n;
  }
  parseAnimationCurves(t) {
    const n = rd.Objects.AnimationCurve;
    for (const r in n) {
      const a = {
          id: n[r].id,
          times: n[r].KeyTime.a.map(r5a),
          values: n[r].KeyValueFloat.a
        },
        i = v0.get(a.id);
      if (i !== void 0) {
        const o = i.parents[0].ID,
          s = i.parents[0].relationship;
        s.match(/X/) ? t.get(o).curves.x = a : s.match(/Y/) ? t.get(o).curves.y = a : s.match(/Z/) ? t.get(o).curves.z = a : s.match(/DeformPercent/) && t.has(o) && (t.get(o).curves.morph = a);
      }
    }
  }
  parseAnimationLayers(t) {
    const n = rd.Objects.AnimationLayer,
      r = new Map();
    for (const a in n) {
      const i = [],
        o = v0.get(parseInt(a));
      o !== void 0 && (o.children.forEach(function (l, d) {
        if (t.has(l.ID)) {
          const u = t.get(l.ID);
          if (u.curves.x !== void 0 || u.curves.y !== void 0 || u.curves.z !== void 0) {
            if (i[d] === void 0) {
              const h = v0.get(l.ID).parents.filter(function (p) {
                return p.relationship !== void 0;
              })[0].ID;
              if (h !== void 0) {
                const p = rd.Objects.Model[h.toString()];
                if (p === void 0) {
                  console.warn("THREE.FBXLoader: Encountered a unused curve.", l);
                  return;
                }
                const m = {
                  modelName: p.attrName ? au.sanitizeNodeName(p.attrName) : "",
                  ID: p.id,
                  initialPosition: [0, 0, 0],
                  initialRotation: [0, 0, 0],
                  initialScale: [1, 1, 1]
                };
                a2.traverse(function (f) {
                  f.ID === p.id && (m.transform = f.matrix, f.userData.transformData && (m.eulerOrder = f.userData.transformData.eulerOrder));
                }), m.transform || (m.transform = new bo()), "PreRotation" in p && (m.preRotation = p.PreRotation.value), "PostRotation" in p && (m.postRotation = p.PostRotation.value), i[d] = m;
              }
            }
            i[d] && (i[d][u.attr] = u);
          } else if (u.curves.morph !== void 0) {
            if (i[d] === void 0) {
              const h = v0.get(l.ID).parents.filter(function (v) {
                  return v.relationship !== void 0;
                })[0].ID,
                p = v0.get(h).parents[0].ID,
                m = v0.get(p).parents[0].ID,
                f = v0.get(m).parents[0].ID,
                y = rd.Objects.Model[f],
                b = {
                  modelName: y.attrName ? au.sanitizeNodeName(y.attrName) : "",
                  morphName: rd.Objects.Deformer[h].attrName
                };
              i[d] = b;
            }
            i[d][u.attr] = u;
          }
        }
      }), r.set(parseInt(a), i));
    }
    return r;
  }
  parseAnimStacks(t) {
    const n = rd.Objects.AnimationStack,
      r = {};
    for (const a in n) {
      const i = v0.get(parseInt(a)).children;
      i.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
      const o = t.get(i[0].ID);
      r[a] = {
        name: n[a].attrName,
        layer: o
      };
    }
    return r;
  }
  addClip(t) {
    let n = [];
    const r = this;
    return t.layer.forEach(function (a) {
      n = n.concat(r.generateTracks(a));
    }), new aze(t.name, -1, n);
  }
  generateTracks(t) {
    const n = [];
    let r = new dr(),
      a = new dr();
    if (t.transform && t.transform.decompose(r, new hl(), a), r = r.toArray(), a = a.toArray(), t.T !== void 0 && Object.keys(t.T.curves).length > 0) {
      const i = this.generateVectorTrack(t.modelName, t.T.curves, r, "position");
      i !== void 0 && n.push(i);
    }
    if (t.R !== void 0 && Object.keys(t.R.curves).length > 0) {
      const i = this.generateRotationTrack(t.modelName, t.R.curves, t.preRotation, t.postRotation, t.eulerOrder);
      i !== void 0 && n.push(i);
    }
    if (t.S !== void 0 && Object.keys(t.S.curves).length > 0) {
      const i = this.generateVectorTrack(t.modelName, t.S.curves, a, "scale");
      i !== void 0 && n.push(i);
    }
    if (t.DeformPercent !== void 0) {
      const i = this.generateMorphTrack(t);
      i !== void 0 && n.push(i);
    }
    return n;
  }
  generateVectorTrack(t, n, r, a) {
    const i = this.getTimesForAllAxes(n),
      o = this.getKeyframeTrackValues(i, n, r);
    return new eJ(t + "." + a, i, o);
  }
  generateRotationTrack(t, n, r, a, i) {
    let o, s;
    if (n.x !== void 0 && n.y !== void 0 && n.z !== void 0) {
      const p = this.interpolateRotations(n.x, n.y, n.z, i);
      o = p[0], s = p[1];
    }
    const l = O_e(0);
    r !== void 0 && (r = r.map(Mo.degToRad), r.push(l), r = new xp().fromArray(r), r = new hl().setFromEuler(r)), a !== void 0 && (a = a.map(Mo.degToRad), a.push(l), a = new xp().fromArray(a), a = new hl().setFromEuler(a).invert());
    const d = new hl(),
      u = new xp(),
      h = [];
    if (!s || !o) return new n$(t + ".quaternion", [0], [0]);
    for (let p = 0; p < s.length; p += 3) u.set(s[p], s[p + 1], s[p + 2], i), d.setFromEuler(u), r !== void 0 && d.premultiply(r), a !== void 0 && d.multiply(a), p > 2 && new hl().fromArray(h, (p - 3) / 3 * 4).dot(d) < 0 && d.set(-d.x, -d.y, -d.z, -d.w), d.toArray(h, p / 3 * 4);
    return new n$(t + ".quaternion", o, h);
  }
  generateMorphTrack(t) {
    const n = t.DeformPercent.curves.morph,
      r = n.values.map(function (i) {
        return i / 100;
      }),
      a = a2.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];
    return new ZX(t.modelName + ".morphTargetInfluences[" + a + "]", n.times, r);
  }
  getTimesForAllAxes(t) {
    let n = [];
    if (t.x !== void 0 && (n = n.concat(t.x.times)), t.y !== void 0 && (n = n.concat(t.y.times)), t.z !== void 0 && (n = n.concat(t.z.times)), n = n.sort(function (r, a) {
      return r - a;
    }), n.length > 1) {
      let r = 1,
        a = n[0];
      for (let i = 1; i < n.length; i++) {
        const o = n[i];
        o !== a && (n[r] = o, a = o, r++);
      }
      n = n.slice(0, r);
    }
    return n;
  }
  getKeyframeTrackValues(t, n, r) {
    const a = r,
      i = [];
    let o = -1,
      s = -1,
      l = -1;
    return t.forEach(function (d) {
      if (n.x && (o = n.x.times.indexOf(d)), n.y && (s = n.y.times.indexOf(d)), n.z && (l = n.z.times.indexOf(d)), o !== -1) {
        const u = n.x.values[o];
        i.push(u), a[0] = u;
      } else i.push(a[0]);
      if (s !== -1) {
        const u = n.y.values[s];
        i.push(u), a[1] = u;
      } else i.push(a[1]);
      if (l !== -1) {
        const u = n.z.values[l];
        i.push(u), a[2] = u;
      } else i.push(a[2]);
    }), i;
  }
  interpolateRotations(t, n, r, a) {
    const i = [],
      o = [];
    i.push(t.times[0]), o.push(Mo.degToRad(t.values[0])), o.push(Mo.degToRad(n.values[0])), o.push(Mo.degToRad(r.values[0]));
    for (let s = 1; s < t.values.length; s++) {
      const l = [t.values[s - 1], n.values[s - 1], r.values[s - 1]];
      if (isNaN(l[0]) || isNaN(l[1]) || isNaN(l[2])) continue;
      const d = l.map(Mo.degToRad),
        u = [t.values[s], n.values[s], r.values[s]];
      if (isNaN(u[0]) || isNaN(u[1]) || isNaN(u[2])) continue;
      const h = u.map(Mo.degToRad),
        p = [u[0] - l[0], u[1] - l[1], u[2] - l[2]],
        m = [Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])];
      if (m[0] >= 180 || m[1] >= 180 || m[2] >= 180) {
        const y = Math.max(...m) / 180,
          b = new xp(...d, a),
          v = new xp(...h, a),
          _ = new hl().setFromEuler(b),
          w = new hl().setFromEuler(v);
        _.dot(w) && w.set(-w.x, -w.y, -w.z, -w.w);
        const k = t.times[s - 1],
          A = t.times[s] - k,
          S = new hl(),
          C = new xp();
        for (let I = 0; I < 1; I += 1 / y) S.copy(_.clone().slerp(w.clone(), I)), i.push(k + I * A), C.setFromQuaternion(S, a), o.push(C.x), o.push(C.y), o.push(C.z);
      } else i.push(t.times[s]), o.push(Mo.degToRad(t.values[s])), o.push(Mo.degToRad(n.values[s])), o.push(Mo.degToRad(r.values[s]));
    }
    return [i, o];
  }
}

class Z4a {
  getPrevNode() {
    return this.nodeStack[this.currentIndent - 2];
  }
  getCurrentNode() {
    return this.nodeStack[this.currentIndent - 1];
  }
  getCurrentProp() {
    return this.currentProp;
  }
  pushStack(t) {
    this.nodeStack.push(t), this.currentIndent += 1;
  }
  popStack() {
    this.nodeStack.pop(), this.currentIndent -= 1;
  }
  setCurrentProp(t, n) {
    this.currentProp = t, this.currentPropName = n;
  }
  parse(t) {
    this.currentIndent = 0, this.allNodes = new IKn(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const n = this,
      r = t.split(/[\r\n]+/);
    return r.forEach(function (a, i) {
      const o = a.match(/^[\s\t]*;/),
        s = a.match(/^[\s\t]*$/);
      if (o || s) return;
      const l = a.match("^\\t{" + n.currentIndent + "}(\\w+):(.*){", ""),
        d = a.match("^\\t{" + n.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"),
        u = a.match("^\\t{" + (n.currentIndent - 1) + "}}");
      l ? n.parseNodeBegin(a, l) : d ? n.parseNodeProperty(a, d, r[++i]) : u ? n.popStack() : a.match(/^[^\s\t}]/) && n.parseNodePropertyContinued(a);
    }), this.allNodes;
  }
  parseNodeBegin(t, n) {
    const r = n[1].trim().replace(/^"/, "").replace(/"$/, ""),
      a = n[2].split(",").map(function (l) {
        return l.trim().replace(/^"/, "").replace(/"$/, "");
      }),
      i = {
        name: r
      },
      o = this.parseNodeAttr(a),
      s = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(r, i) : r in s ? (r === "PoseNode" ? s.PoseNode.push(i) : s[r].id !== void 0 && (s[r] = {}, s[r][s[r].id] = s[r]), o.id !== "" && (s[r][o.id] = i)) : typeof o.id == "number" ? (s[r] = {}, s[r][o.id] = i) : r !== "Properties70" && (r === "PoseNode" ? s[r] = [i] : s[r] = i), typeof o.id == "number" && (i.id = o.id), o.name !== "" && (i.attrName = o.name), o.type !== "" && (i.attrType = o.type), this.pushStack(i);
  }
  parseNodeAttr(t) {
    let n = t[0];
    t[0] !== "" && (n = parseInt(t[0]), isNaN(n) && (n = t[0]));
    let r = "",
      a = "";
    return t.length > 1 && (r = t[1].replace(/^(\w+)::/, ""), a = t[2]), {
      id: n,
      name: r,
      type: a
    };
  }
  parseNodeProperty(t, n, r) {
    let a = n[1].replace(/^"/, "").replace(/"$/, "").trim(),
      i = n[2].replace(/^"/, "").replace(/"$/, "").trim();
    a === "Content" && i === "," && (i = r.replace(/"/g, "").replace(/,$/, "").trim());
    const o = this.getCurrentNode();
    if (o.name === "Properties70") {
      this.parseNodeSpecialProperty(t, a, i);
      return;
    }
    if (a === "C") {
      const l = i.split(",").slice(1),
        d = parseInt(l[0]),
        u = parseInt(l[1]);
      let h = i.split(",").slice(3);
      h = h.map(function (p) {
        return p.trim().replace(/^"/, "");
      }), a = "connections", i = [d, u], i5a(i, h), o[a] === void 0 && (o[a] = []);
    }
    a === "Node" && (o.id = i), a in o && Array.isArray(o[a]) ? o[a].push(i) : a !== "a" ? o[a] = i : o.a = i, this.setCurrentProp(o, a), a === "a" && i.slice(-1) !== "," && (o.a = qrt(i));
  }
  parseNodePropertyContinued(t) {
    const n = this.getCurrentNode();
    n.a += t, t.slice(-1) !== "," && (n.a = qrt(n.a));
  }
  parseNodeSpecialProperty(t, n, r) {
    const a = r.split('",').map(function (u) {
        return u.trim().replace(/^\"/, "").replace(/\s/, "_");
      }),
      i = a[0],
      o = a[1],
      s = a[2],
      l = a[3];
    let d = a[4];
    switch (o) {
      case "int":
      case "enum":
      case "bool":
      case "ULongLong":
      case "double":
      case "Number":
      case "FieldOfView":
        d = parseFloat(d);
        break;
      case "Color":
      case "ColorRGB":
      case "Vector3D":
      case "Lcl_Translation":
      case "Lcl_Rotation":
      case "Lcl_Scaling":
        d = qrt(d);
        break;
    }
    this.getPrevNode()[i] = {
      type: o,
      type2: s,
      flag: l,
      value: d
    }, this.setCurrentProp(this.getPrevNode(), i);
  }
}

class e5a {
  parse(t) {
    const n = new Xen(t);
    n.skip(23);
    const r = n.getUint32();
    if (r < 6400) throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + r);
    const a = new IKn();
    for (; !this.endOfContent(n);) {
      const i = this.parseNode(n, r);
      i !== null && a.add(i.name, i);
    }
    return a;
  }
  endOfContent(t) {
    return t.size() % 16 === 0 ? (t.getOffset() + 160 + 16 & -16) >= t.size() : t.getOffset() + 160 + 16 >= t.size();
  }
  parseNode(t, n) {
    const r = {},
      a = n >= 7500 ? t.getUint64() : t.getUint32(),
      i = n >= 7500 ? t.getUint64() : t.getUint32();
    n >= 7500 ? t.getUint64() : t.getUint32();
    const o = t.getUint8(),
      s = t.getString(o);
    if (a === 0) return null;
    const l = [];
    for (let p = 0; p < i; p++) l.push(this.parseProperty(t));
    const d = l.length > 0 ? l[0] : "",
      u = l.length > 1 ? l[1] : "",
      h = l.length > 2 ? l[2] : "";
    for (r.singleProperty = i === 1 && t.getOffset() === a; a > t.getOffset();) {
      const p = this.parseNode(t, n);
      p !== null && this.parseSubNode(s, r, p);
    }
    return r.propertyList = l, typeof d == "number" && (r.id = d), u !== "" && (r.attrName = u), h !== "" && (r.attrType = h), s !== "" && (r.name = s), r;
  }
  parseSubNode(t, n, r) {
    if (r.singleProperty === !0) {
      const a = r.propertyList[0];
      Array.isArray(a) ? (n[r.name] = r, r.a = a) : n[r.name] = a;
    } else if (t === "Connections" && r.name === "C") {
      const a = [];
      r.propertyList.forEach(function (i, o) {
        o !== 0 && a.push(i);
      }), n.connections === void 0 && (n.connections = []), n.connections.push(a);
    } else if (r.name === "Properties70") Object.keys(r).forEach(function (i) {
      n[i] = r[i];
    });else if (t === "Properties70" && r.name === "P") {
      let a = r.propertyList[0],
        i = r.propertyList[1];
      const o = r.propertyList[2],
        s = r.propertyList[3];
      let l;
      a.indexOf("Lcl ") === 0 && (a = a.replace("Lcl ", "Lcl_")), i.indexOf("Lcl ") === 0 && (i = i.replace("Lcl ", "Lcl_")), i === "Color" || i === "ColorRGB" || i === "Vector" || i === "Vector3D" || i.indexOf("Lcl_") === 0 ? l = [r.propertyList[4], r.propertyList[5], r.propertyList[6]] : l = r.propertyList[4], n[a] = {
        type: i,
        type2: o,
        flag: s,
        value: l
      };
    } else n[r.name] === void 0 ? typeof r.id == "number" ? (n[r.name] = {}, n[r.name][r.id] = r) : n[r.name] = r : r.name === "PoseNode" ? (Array.isArray(n[r.name]) || (n[r.name] = [n[r.name]]), n[r.name].push(r)) : n[r.name][r.id] === void 0 && (n[r.name][r.id] = r);
  }
  parseProperty(t) {
    const n = t.getString(1);
    let r;
    switch (n) {
      case "C":
        return t.getBoolean();
      case "D":
        return t.getFloat64();
      case "F":
        return t.getFloat32();
      case "I":
        return t.getInt32();
      case "L":
        return t.getInt64();
      case "R":
        return r = t.getUint32(), t.getArrayBuffer(r);
      case "S":
        return r = t.getUint32(), t.getString(r);
      case "Y":
        return t.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const a = t.getUint32(),
          i = t.getUint32(),
          o = t.getUint32();
        if (i === 0) switch (n) {
          case "b":
          case "c":
            return t.getBooleanArray(a);
          case "d":
            return t.getFloat64Array(a);
          case "f":
            return t.getFloat32Array(a);
          case "i":
            return t.getInt32Array(a);
          case "l":
            return t.getInt64Array(a);
        }
        const s = F4a(new Uint8Array(t.getArrayBuffer(o))),
          l = new Xen(s.buffer);
        switch (n) {
          case "b":
          case "c":
            return l.getBooleanArray(a);
          case "d":
            return l.getFloat64Array(a);
          case "f":
            return l.getFloat32Array(a);
          case "i":
            return l.getInt32Array(a);
          case "l":
            return l.getInt64Array(a);
        }
        break;
      default:
        throw new Error("THREE.FBXLoader: Unknown property type " + n);
    }
  }
}

class Xen {
  constructor(t, n) {
    this.dv = new DataView(t), this.offset = 0, this.littleEndian = n !== void 0 ? n : !0, this._textDecoder = new TextDecoder();
  }
  getOffset() {
    return this.offset;
  }
  size() {
    return this.dv.buffer.byteLength;
  }
  skip(t) {
    this.offset += t;
  }
  getBoolean() {
    return (this.getUint8() & 1) === 1;
  }
  getBooleanArray(t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(this.getBoolean());
    return n;
  }
  getUint8() {
    const t = this.dv.getUint8(this.offset);
    return this.offset += 1, t;
  }
  getInt16() {
    const t = this.dv.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, t;
  }
  getInt32() {
    const t = this.dv.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  getInt32Array(t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(this.getInt32());
    return n;
  }
  getUint32() {
    const t = this.dv.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  getInt64() {
    let t, n;
    return this.littleEndian ? (t = this.getUint32(), n = this.getUint32()) : (n = this.getUint32(), t = this.getUint32()), n & 2147483648 ? (n = ~n & 4294967295, t = ~t & 4294967295, t === 4294967295 && (n = n + 1 & 4294967295), t = t + 1 & 4294967295, -(n * 4294967296 + t)) : n * 4294967296 + t;
  }
  getInt64Array(t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(this.getInt64());
    return n;
  }
  getUint64() {
    let t, n;
    return this.littleEndian ? (t = this.getUint32(), n = this.getUint32()) : (n = this.getUint32(), t = this.getUint32()), n * 4294967296 + t;
  }
  getFloat32() {
    const t = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  getFloat32Array(t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(this.getFloat32());
    return n;
  }
  getFloat64() {
    const t = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, t;
  }
  getFloat64Array(t) {
    const n = [];
    for (let r = 0; r < t; r++) n.push(this.getFloat64());
    return n;
  }
  getArrayBuffer(t) {
    const n = this.dv.buffer.slice(this.offset, this.offset + t);
    return this.offset += t, n;
  }
  getString(t) {
    const n = this.offset;
    let r = new Uint8Array(this.dv.buffer, n, t);
    this.skip(t);
    const a = r.indexOf(0);
    return a >= 0 && (r = new Uint8Array(this.dv.buffer, n, a)), this._textDecoder.decode(r);
  }
}

class IKn {
  add(t, n) {
    this[t] = n;
  }
}

function t5a(e) {
  const t = "Kaydara FBX Binary  \0";
  return e.byteLength >= t.length && t === EKn(e, 0, t.length);
}

function n5a(e) {
  const t = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
  let n = 0;
  function r(a) {
    const i = e[a - 1];
    return e = e.slice(n + a), n++, i;
  }
  for (let a = 0; a < t.length; ++a) if (r(1) === t[a]) return !1;
  return !0;
}

function Jen(e) {
  const t = /FBXVersion: (\d+)/,
    n = e.match(t);
  if (n) return parseInt(n[1]);
  throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}

function r5a(e) {
  return e / 46186158e3;
}

const a5a = [];

function H8e(e, t, n, r) {
  let a;
  switch (r.mappingType) {
    case "ByPolygonVertex":
      a = e;
      break;
    case "ByPolygon":
      a = t;
      break;
    case "ByVertice":
      a = n;
      break;
    case "AllSame":
      a = r.indices[0];
      break;
    default:
      console.warn("THREE.FBXLoader: unknown attribute mapping type " + r.mappingType);
  }
  r.referenceType === "IndexToDirect" && (a = r.indices[a]);
  const i = a * r.dataSize,
    o = i + r.dataSize;
  return o5a(a5a, r.buffer, i, o);
}

const Wrt = new xp(),
  tte = new dr();

function CKn(e) {
  const t = new bo(),
    n = new bo(),
    r = new bo(),
    a = new bo(),
    i = new bo(),
    o = new bo(),
    s = new bo(),
    l = new bo(),
    d = new bo(),
    u = new bo(),
    h = new bo(),
    p = new bo(),
    m = e.inheritType ? e.inheritType : 0;
  e.translation && t.setPosition(tte.fromArray(e.translation));
  const f = O_e(0);
  if (e.preRotation) {
    const T = e.preRotation.map(Mo.degToRad);
    T.push(f), n.makeRotationFromEuler(Wrt.fromArray(T));
  }
  if (e.rotation) {
    const T = e.rotation.map(Mo.degToRad);
    T.push(e.eulerOrder || f), r.makeRotationFromEuler(Wrt.fromArray(T));
  }
  if (e.postRotation) {
    const T = e.postRotation.map(Mo.degToRad);
    T.push(f), a.makeRotationFromEuler(Wrt.fromArray(T)), a.invert();
  }
  e.scale && i.scale(tte.fromArray(e.scale)), e.scalingOffset && s.setPosition(tte.fromArray(e.scalingOffset)), e.scalingPivot && o.setPosition(tte.fromArray(e.scalingPivot)), e.rotationOffset && l.setPosition(tte.fromArray(e.rotationOffset)), e.rotationPivot && d.setPosition(tte.fromArray(e.rotationPivot)), e.parentMatrixWorld && (h.copy(e.parentMatrix), u.copy(e.parentMatrixWorld));
  const y = n.clone().multiply(r).multiply(a),
    b = new bo();
  b.extractRotation(u);
  const v = new bo();
  v.copyPosition(u);
  const _ = v.clone().invert().multiply(u),
    w = b.clone().invert().multiply(_),
    k = i,
    A = new bo();
  if (m === 0) A.copy(b).multiply(y).multiply(w).multiply(k);else if (m === 1) A.copy(b).multiply(w).multiply(y).multiply(k);else {
    const P = new bo().scale(new dr().setFromMatrixScale(h)).clone().invert(),
      R = w.clone().multiply(P);
    A.copy(b).multiply(y).multiply(R).multiply(k);
  }
  const S = d.clone().invert(),
    C = o.clone().invert();
  let I = t.clone().multiply(l).multiply(d).multiply(n).multiply(r).multiply(a).multiply(S).multiply(s).multiply(o).multiply(i).multiply(C);
  const E = new bo().copyPosition(I),
    M = u.clone().multiply(E);
  return p.copyPosition(M), I = p.clone().multiply(A), I.premultiply(u.invert()), I;
}

function O_e(e) {
  e = e || 0;
  const t = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"];
  return e === 6 ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), t[0]) : t[e];
}

function qrt(e) {
  return e.split(",").map(function (n) {
    return parseFloat(n);
  });
}

function EKn(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = e.byteLength), new TextDecoder().decode(new Uint8Array(e, t, n));
}

function i5a(e, t) {
  for (let n = 0, r = e.length, a = t.length; n < a; n++, r++) e[r] = t[n];
}

function o5a(e, t, n, r) {
  for (let a = n, i = 0; a < r; a++, i++) e[i] = t[a];
  return e;
}

function Zen(e, t) {
  if (t === Y1a) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
  if (t === yvt || t === Nqn) {
    let n = e.getIndex();
    if (n === null) {
      const o = [],
        s = e.getAttribute("position");
      if (s !== void 0) {
        for (let l = 0; l < s.count; l++) o.push(l);
        e.setIndex(o), n = e.getIndex();
      } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
    }
    const r = n.count - 2,
      a = [];
    if (t === yvt) for (let o = 1; o <= r; o++) a.push(n.getX(0)), a.push(n.getX(o)), a.push(n.getX(o + 1));else for (let o = 0; o < r; o++) o % 2 === 0 ? (a.push(n.getX(o)), a.push(n.getX(o + 1)), a.push(n.getX(o + 2))) : (a.push(n.getX(o + 2)), a.push(n.getX(o + 1)), a.push(n.getX(o)));
    a.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = e.clone();
    return i.setIndex(a), i.clearGroups(), i;
  } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}

function YYe(e) {
  const t = new Map(),
    n = new Map(),
    r = e.clone();
  return TKn(e, r, function (a, i) {
    t.set(i, a), n.set(a, i);
  }), r.traverse(function (a) {
    if (!a.isSkinnedMesh) return;
    const i = a,
      o = t.get(a),
      s = o.skeleton.bones;
    i.skeleton = o.skeleton.clone(), i.bindMatrix.copy(o.bindMatrix), i.skeleton.bones = s.map(function (l) {
      return n.get(l);
    }), i.bind(i.skeleton, i.bindMatrix);
  }), r;
}

function TKn(e, t, n) {
  n(e, t);
  for (let r = 0; r < e.children.length; r++) TKn(e.children[r], t.children[r], n);
}

class fDt extends oD {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (n) {
      return new u5a(n);
    }), this.register(function (n) {
      return new h5a(n);
    }), this.register(function (n) {
      return new x5a(n);
    }), this.register(function (n) {
      return new _5a(n);
    }), this.register(function (n) {
      return new k5a(n);
    }), this.register(function (n) {
      return new m5a(n);
    }), this.register(function (n) {
      return new f5a(n);
    }), this.register(function (n) {
      return new g5a(n);
    }), this.register(function (n) {
      return new y5a(n);
    }), this.register(function (n) {
      return new d5a(n);
    }), this.register(function (n) {
      return new b5a(n);
    }), this.register(function (n) {
      return new p5a(n);
    }), this.register(function (n) {
      return new w5a(n);
    }), this.register(function (n) {
      return new v5a(n);
    }), this.register(function (n) {
      return new l5a(n);
    }), this.register(function (n) {
      return new etn(n, yd.EXT_MESHOPT_COMPRESSION);
    }), this.register(function (n) {
      return new etn(n, yd.KHR_MESHOPT_COMPRESSION);
    }), this.register(function (n) {
      return new A5a(n);
    });
  }
  load(t, n, r, a) {
    const i = this;
    let o;
    if (this.resourcePath !== "") o = this.resourcePath;else if (this.path !== "") {
      const d = Tie.extractUrlBase(t);
      o = Tie.resolveURL(d, this.path);
    } else o = Tie.extractUrlBase(t);
    this.manager.itemStart(t);
    const s = function (d) {
        a ? a(d) : console.error(d), i.manager.itemError(t), i.manager.itemEnd(t);
      },
      l = new oDt(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(t, function (d) {
      try {
        i.parse(d, o, function (u) {
          n(u), i.manager.itemEnd(t);
        }, s);
      } catch (u) {
        s(u);
      }
    }, r, s);
  }
  setDRACOLoader(t) {
    return this.dracoLoader = t, this;
  }
  setKTX2Loader(t) {
    return this.ktx2Loader = t, this;
  }
  setMeshoptDecoder(t) {
    return this.meshoptDecoder = t, this;
  }
  register(t) {
    return this.pluginCallbacks.indexOf(t) === -1 && this.pluginCallbacks.push(t), this;
  }
  unregister(t) {
    return this.pluginCallbacks.indexOf(t) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1), this;
  }
  parse(t, n, r, a) {
    let i;
    const o = {},
      s = {},
      l = new TextDecoder();
    if (typeof t == "string") i = JSON.parse(t);else if (t instanceof ArrayBuffer) {
      if (l.decode(new Uint8Array(t, 0, 4)) === MKn) {
        try {
          o[yd.KHR_BINARY_GLTF] = new S5a(t);
        } catch (h) {
          a && a(h);
          return;
        }
        i = JSON.parse(o[yd.KHR_BINARY_GLTF].content);
      } else i = JSON.parse(l.decode(t));
    } else i = t;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      a && a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const d = new B5a(i, {
      path: n || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    d.fileLoader.setRequestHeader(this.requestHeader);
    for (let u = 0; u < this.pluginCallbacks.length; u++) {
      const h = this.pluginCallbacks[u](d);
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), s[h.name] = h, o[h.name] = !0;
    }
    if (i.extensionsUsed) for (let u = 0; u < i.extensionsUsed.length; ++u) {
      const h = i.extensionsUsed[u],
        p = i.extensionsRequired || [];
      switch (h) {
        case yd.KHR_MATERIALS_UNLIT:
          o[h] = new c5a();
          break;
        case yd.KHR_DRACO_MESH_COMPRESSION:
          o[h] = new I5a(i, this.dracoLoader);
          break;
        case yd.KHR_TEXTURE_TRANSFORM:
          o[h] = new C5a();
          break;
        case yd.KHR_MESH_QUANTIZATION:
          o[h] = new E5a();
          break;
        default:
          p.indexOf(h) >= 0 && s[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
      }
    }
    d.setExtensions(o), d.setPlugins(s), d.parse(r, a);
  }
  parseAsync(t, n) {
    const r = this;
    return new Promise(function (a, i) {
      r.parse(t, n, a, i);
    });
  }
}

function s5a() {
  let e = {};
  return {
    get: function (t) {
      return e[t];
    },
    add: function (t, n) {
      e[t] = n;
    },
    remove: function (t) {
      delete e[t];
    },
    removeAll: function () {
      e = {};
    }
  };
}

function D0(e, t, n) {
  const r = e.json.materials[t];
  return r.extensions && r.extensions[n] ? r.extensions[n] : null;
}

const yd = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};

class l5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const t = this.parser,
      n = this.parser.json.nodes || [];
    for (let r = 0, a = n.length; r < a; r++) {
      const i = n[r];
      i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && t._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const n = this.parser,
      r = "light:" + t;
    let a = n.cache.get(r);
    if (a) return a;
    const i = n.json,
      l = ((i.extensions && i.extensions[this.name] || {}).lights || [])[t];
    let d;
    const u = new so(16777215);
    l.color !== void 0 && u.setRGB(l.color[0], l.color[1], l.color[2], l_);
    const h = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        d = new pT(u), d.target.position.set(0, 0, -1), d.add(d.target);
        break;
      case "point":
        d = new sde(u), d.distance = h;
        break;
      case "spot":
        d = new lDt(u), d.distance = h, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, d.angle = l.spot.outerConeAngle, d.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, d.target.position.set(0, 0, -1), d.add(d.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return d.position.set(0, 0, 0), D8(d, l), l.intensity !== void 0 && (d.intensity = l.intensity), d.name = n.createUniqueName(l.name || "light_" + t), a = Promise.resolve(d), n.cache.add(r, a), a;
  }
  getDependency(t, n) {
    if (t === "light") return this._loadLight(n);
  }
  createNodeAttachment(t) {
    const n = this,
      r = this.parser,
      i = r.json.nodes[t],
      s = (i.extensions && i.extensions[this.name] || {}).light;
    return s === void 0 ? null : this._loadLight(s).then(function (l) {
      return r._getNodeRef(n.cache, s, l);
    });
  }
}

class c5a {
  constructor() {
    this.name = yd.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return uu;
  }
  extendParams(t, n, r) {
    const a = [];
    t.color = new so(1, 1, 1), t.opacity = 1;
    const i = n.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const o = i.baseColorFactor;
        t.color.setRGB(o[0], o[1], o[2], l_), t.opacity = o[3];
      }
      i.baseColorTexture !== void 0 && a.push(r.assignTexture(t, "map", i.baseColorTexture, Nl));
    }
    return Promise.all(a);
  }
}

class d5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    return r === null || r.emissiveStrength !== void 0 && (n.emissiveIntensity = r.emissiveStrength), Promise.resolve();
  }
}

class u5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    if (r.clearcoatFactor !== void 0 && (n.clearcoat = r.clearcoatFactor), r.clearcoatTexture !== void 0 && a.push(this.parser.assignTexture(n, "clearcoatMap", r.clearcoatTexture)), r.clearcoatRoughnessFactor !== void 0 && (n.clearcoatRoughness = r.clearcoatRoughnessFactor), r.clearcoatRoughnessTexture !== void 0 && a.push(this.parser.assignTexture(n, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), r.clearcoatNormalTexture !== void 0 && (a.push(this.parser.assignTexture(n, "clearcoatNormalMap", r.clearcoatNormalTexture)), r.clearcoatNormalTexture.scale !== void 0)) {
      const i = r.clearcoatNormalTexture.scale;
      n.clearcoatNormalScale = new Qi(i, i);
    }
    return Promise.all(a);
  }
}

class h5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    return r === null || (n.dispersion = r.dispersion !== void 0 ? r.dispersion : 0), Promise.resolve();
  }
}

class p5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    return r.iridescenceFactor !== void 0 && (n.iridescence = r.iridescenceFactor), r.iridescenceTexture !== void 0 && a.push(this.parser.assignTexture(n, "iridescenceMap", r.iridescenceTexture)), r.iridescenceIor !== void 0 && (n.iridescenceIOR = r.iridescenceIor), n.iridescenceThicknessRange === void 0 && (n.iridescenceThicknessRange = [100, 400]), r.iridescenceThicknessMinimum !== void 0 && (n.iridescenceThicknessRange[0] = r.iridescenceThicknessMinimum), r.iridescenceThicknessMaximum !== void 0 && (n.iridescenceThicknessRange[1] = r.iridescenceThicknessMaximum), r.iridescenceThicknessTexture !== void 0 && a.push(this.parser.assignTexture(n, "iridescenceThicknessMap", r.iridescenceThicknessTexture)), Promise.all(a);
  }
}

class m5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    if (n.sheenColor = new so(0, 0, 0), n.sheenRoughness = 0, n.sheen = 1, r.sheenColorFactor !== void 0) {
      const i = r.sheenColorFactor;
      n.sheenColor.setRGB(i[0], i[1], i[2], l_);
    }
    return r.sheenRoughnessFactor !== void 0 && (n.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && a.push(this.parser.assignTexture(n, "sheenColorMap", r.sheenColorTexture, Nl)), r.sheenRoughnessTexture !== void 0 && a.push(this.parser.assignTexture(n, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(a);
  }
}

class f5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    return r.transmissionFactor !== void 0 && (n.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && a.push(this.parser.assignTexture(n, "transmissionMap", r.transmissionTexture)), Promise.all(a);
  }
}

class g5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    n.thickness = r.thicknessFactor !== void 0 ? r.thicknessFactor : 0, r.thicknessTexture !== void 0 && a.push(this.parser.assignTexture(n, "thicknessMap", r.thicknessTexture)), n.attenuationDistance = r.attenuationDistance || 1 / 0;
    const i = r.attenuationColor || [1, 1, 1];
    return n.attenuationColor = new so().setRGB(i[0], i[1], i[2], l_), Promise.all(a);
  }
}

class y5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    return r === null || (n.ior = r.ior !== void 0 ? r.ior : 1.5), Promise.resolve();
  }
}

class b5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    n.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && a.push(this.parser.assignTexture(n, "specularIntensityMap", r.specularTexture));
    const i = r.specularColorFactor || [1, 1, 1];
    return n.specularColor = new so().setRGB(i[0], i[1], i[2], l_), r.specularColorTexture !== void 0 && a.push(this.parser.assignTexture(n, "specularColorMap", r.specularColorTexture, Nl)), Promise.all(a);
  }
}

class v5a {
  constructor(t) {
    this.parser = t, this.name = yd.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    return n.bumpScale = r.bumpFactor !== void 0 ? r.bumpFactor : 1, r.bumpTexture !== void 0 && a.push(this.parser.assignTexture(n, "bumpMap", r.bumpTexture)), Promise.all(a);
  }
}

class w5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    return D0(this.parser, t, this.name) !== null ? NT : null;
  }
  extendMaterialParams(t, n) {
    const r = D0(this.parser, t, this.name);
    if (r === null) return Promise.resolve();
    const a = [];
    return r.anisotropyStrength !== void 0 && (n.anisotropy = r.anisotropyStrength), r.anisotropyRotation !== void 0 && (n.anisotropyRotation = r.anisotropyRotation), r.anisotropyTexture !== void 0 && a.push(this.parser.assignTexture(n, "anisotropyMap", r.anisotropyTexture)), Promise.all(a);
  }
}

class x5a {
  constructor(t) {
    this.parser = t, this.name = yd.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const n = this.parser,
      r = n.json,
      a = r.textures[t];
    if (!a.extensions || !a.extensions[this.name]) return null;
    const i = a.extensions[this.name],
      o = n.options.ktx2Loader;
    if (!o) {
      if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return n.loadTextureImage(t, i.source, o);
  }
}

class _5a {
  constructor(t) {
    this.parser = t, this.name = yd.EXT_TEXTURE_WEBP;
  }
  loadTexture(t) {
    const n = this.name,
      r = this.parser,
      a = r.json,
      i = a.textures[t];
    if (!i.extensions || !i.extensions[n]) return null;
    const o = i.extensions[n],
      s = a.images[o.source];
    let l = r.textureLoader;
    if (s.uri) {
      const d = r.options.manager.getHandler(s.uri);
      d !== null && (l = d);
    }
    return r.loadTextureImage(t, o.source, l);
  }
}

class k5a {
  constructor(t) {
    this.parser = t, this.name = yd.EXT_TEXTURE_AVIF;
  }
  loadTexture(t) {
    const n = this.name,
      r = this.parser,
      a = r.json,
      i = a.textures[t];
    if (!i.extensions || !i.extensions[n]) return null;
    const o = i.extensions[n],
      s = a.images[o.source];
    let l = r.textureLoader;
    if (s.uri) {
      const d = r.options.manager.getHandler(s.uri);
      d !== null && (l = d);
    }
    return r.loadTextureImage(t, o.source, l);
  }
}

class etn {
  constructor(t, n) {
    this.name = n, this.parser = t;
  }
  loadBufferView(t) {
    const n = this.parser.json,
      r = n.bufferViews[t];
    if (r.extensions && r.extensions[this.name]) {
      const a = r.extensions[this.name],
        i = this.parser.getDependency("buffer", a.buffer),
        o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return i.then(function (s) {
        const l = a.byteOffset || 0,
          d = a.byteLength || 0,
          u = a.count,
          h = a.byteStride,
          p = new Uint8Array(s, l, d);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(u, h, p, a.mode, a.filter).then(function (m) {
          return m.buffer;
        }) : o.ready.then(function () {
          const m = new ArrayBuffer(u * h);
          return o.decodeGltfBuffer(new Uint8Array(m), u, h, p, a.mode, a.filter), m;
        });
      });
    } else return null;
  }
}

class A5a {
  constructor(t) {
    this.name = yd.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const n = this.parser.json,
      r = n.nodes[t];
    if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0) return null;
    const a = n.meshes[r.mesh];
    for (const d of a.primitives) if (d.mode !== g4.TRIANGLES && d.mode !== g4.TRIANGLE_STRIP && d.mode !== g4.TRIANGLE_FAN && d.mode !== void 0) return null;
    const o = r.extensions[this.name].attributes,
      s = [],
      l = {};
    for (const d in o) s.push(this.parser.getDependency("accessor", o[d]).then(u => (l[d] = u, l[d])));
    return s.length < 1 ? null : (s.push(this.parser.createNodeMesh(t)), Promise.all(s).then(d => {
      const u = d.pop(),
        h = u.isGroup ? u.children : [u],
        p = d[0].count,
        m = [];
      for (const f of h) {
        const y = new bo(),
          b = new dr(),
          v = new hl(),
          _ = new dr(1, 1, 1),
          w = new zqn(f.geometry, f.material, p);
        for (let k = 0; k < p; k++) l.TRANSLATION && b.fromBufferAttribute(l.TRANSLATION, k), l.ROTATION && v.fromBufferAttribute(l.ROTATION, k), l.SCALE && _.fromBufferAttribute(l.SCALE, k), w.setMatrixAt(k, y.compose(b, v, _));
        for (const k in l) if (k === "_COLOR_0") {
          const A = l[k];
          w.instanceColor = new vvt(A.array, A.itemSize, A.normalized);
        } else k !== "TRANSLATION" && k !== "ROTATION" && k !== "SCALE" && f.geometry.setAttribute(k, l[k]);
        Zc.prototype.copy.call(w, f), this.parser.assignFinalMaterial(w), m.push(w);
      }
      return u.isGroup ? (u.clear(), u.add(...m), u) : m[0];
    }));
  }
}

const MKn = "glTF",
  qme = 12,
  ttn = {
    JSON: 1313821514,
    BIN: 5130562
  };

class S5a {
  constructor(t) {
    this.name = yd.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const n = new DataView(t, 0, qme),
      r = new TextDecoder();
    if (this.header = {
      magic: r.decode(new Uint8Array(t.slice(0, 4))),
      version: n.getUint32(4, !0),
      length: n.getUint32(8, !0)
    }, this.header.magic !== MKn) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const a = this.header.length - qme,
      i = new DataView(t, qme);
    let o = 0;
    for (; o < a;) {
      const s = i.getUint32(o, !0);
      o += 4;
      const l = i.getUint32(o, !0);
      if (o += 4, l === ttn.JSON) {
        const d = new Uint8Array(t, qme + o, s);
        this.content = r.decode(d);
      } else if (l === ttn.BIN) {
        const d = qme + o;
        this.body = t.slice(d, d + s);
      }
      o += s;
    }
    if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}

class I5a {
  constructor(t, n) {
    if (!n) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = yd.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = n, this.dracoLoader.preload();
  }
  decodePrimitive(t, n) {
    const r = this.json,
      a = this.dracoLoader,
      i = t.extensions[this.name].bufferView,
      o = t.extensions[this.name].attributes,
      s = {},
      l = {},
      d = {};
    for (const u in o) {
      const h = Pvt[u] || u.toLowerCase();
      s[h] = o[u];
    }
    for (const u in t.attributes) {
      const h = Pvt[u] || u.toLowerCase();
      if (o[u] !== void 0) {
        const p = r.accessors[t.attributes[u]],
          m = Mie[p.componentType];
        d[h] = m.name, l[h] = p.normalized === !0;
      }
    }
    return n.getDependency("bufferView", i).then(function (u) {
      return new Promise(function (h, p) {
        a.decodeDracoFile(u, function (m) {
          for (const f in m.attributes) {
            const y = m.attributes[f],
              b = l[f];
            b !== void 0 && (y.normalized = b);
          }
          h(m);
        }, s, d, l_, p);
      });
    });
  }
}

class C5a {
  constructor() {
    this.name = yd.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, n) {
    return (n.texCoord === void 0 || n.texCoord === t.channel) && n.offset === void 0 && n.rotation === void 0 && n.scale === void 0 || (t = t.clone(), n.texCoord !== void 0 && (t.channel = n.texCoord), n.offset !== void 0 && t.offset.fromArray(n.offset), n.rotation !== void 0 && (t.rotation = n.rotation), n.scale !== void 0 && t.repeat.fromArray(n.scale), t.needsUpdate = !0), t;
  }
}

class E5a {
  constructor() {
    this.name = yd.KHR_MESH_QUANTIZATION;
  }
}

class PKn extends npe {
  constructor(t, n, r, a) {
    super(t, n, r, a);
  }
  copySampleValue_(t) {
    const n = this.resultBuffer,
      r = this.sampleValues,
      a = this.valueSize,
      i = t * a * 3 + a;
    for (let o = 0; o !== a; o++) n[o] = r[i + o];
    return n;
  }
  interpolate_(t, n, r, a) {
    const i = this.resultBuffer,
      o = this.sampleValues,
      s = this.valueSize,
      l = s * 2,
      d = s * 3,
      u = a - n,
      h = (r - n) / u,
      p = h * h,
      m = p * h,
      f = t * d,
      y = f - d,
      b = -2 * m + 3 * p,
      v = m - p,
      _ = 1 - b,
      w = v - p + h;
    for (let k = 0; k !== s; k++) {
      const A = o[y + k + s],
        S = o[y + k + l] * u,
        C = o[f + k + s],
        I = o[f + k] * u;
      i[k] = _ * A + w * S + b * C + v * I;
    }
    return i;
  }
}

const T5a = new hl();

class M5a extends PKn {
  interpolate_(t, n, r, a) {
    const i = super.interpolate_(t, n, r, a);
    return T5a.fromArray(i).normalize().toArray(i), i;
  }
}

const g4 = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6
  },
  Mie = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
  },
  ntn = {
    9728: cg,
    9729: $m,
    9984: Iqn,
    9985: CNe,
    9986: T0e,
    9987: A7
  },
  rtn = {
    33071: hy,
    33648: QFe,
    10497: e$
  },
  Krt = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  },
  Pvt = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
  },
  xL = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
  },
  P5a = {
    CUBICSPLINE: void 0,
    LINEAR: T_e,
    STEP: E_e
  },
  Qrt = {
    OPAQUE: "OPAQUE",
    MASK: "MASK",
    BLEND: "BLEND"
  };

function R5a(e) {
  return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new ng({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: uT
  })), e.DefaultMaterial;
}

function UG(e, t, n) {
  for (const r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}

function D8(e, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}

function N5a(e, t, n) {
  let r = !1,
    a = !1,
    i = !1;
  for (let d = 0, u = t.length; d < u; d++) {
    const h = t[d];
    if (h.POSITION !== void 0 && (r = !0), h.NORMAL !== void 0 && (a = !0), h.COLOR_0 !== void 0 && (i = !0), r && a && i) break;
  }
  if (!r && !a && !i) return Promise.resolve(e);
  const o = [],
    s = [],
    l = [];
  for (let d = 0, u = t.length; d < u; d++) {
    const h = t[d];
    if (r) {
      const p = h.POSITION !== void 0 ? n.getDependency("accessor", h.POSITION) : e.attributes.position;
      o.push(p);
    }
    if (a) {
      const p = h.NORMAL !== void 0 ? n.getDependency("accessor", h.NORMAL) : e.attributes.normal;
      s.push(p);
    }
    if (i) {
      const p = h.COLOR_0 !== void 0 ? n.getDependency("accessor", h.COLOR_0) : e.attributes.color;
      l.push(p);
    }
  }
  return Promise.all([Promise.all(o), Promise.all(s), Promise.all(l)]).then(function (d) {
    const u = d[0],
      h = d[1],
      p = d[2];
    return r && (e.morphAttributes.position = u), a && (e.morphAttributes.normal = h), i && (e.morphAttributes.color = p), e.morphTargetsRelative = !0, e;
  });
}

function j5a(e, t) {
  if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const n = t.extras.targetNames;
    if (e.morphTargetInfluences.length === n.length) {
      e.morphTargetDictionary = {};
      for (let r = 0, a = n.length; r < a; r++) e.morphTargetDictionary[n[r]] = r;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}

function D5a(e) {
  let t;
  const n = e.extensions && e.extensions[yd.KHR_DRACO_MESH_COMPRESSION];
  if (n ? t = "draco:" + n.bufferView + ":" + n.indices + ":" + Yrt(n.attributes) : t = e.indices + ":" + Yrt(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let r = 0, a = e.targets.length; r < a; r++) t += ":" + Yrt(e.targets[r]);
  return t;
}

function Yrt(e) {
  let t = "";
  const n = Object.keys(e).sort();
  for (let r = 0, a = n.length; r < a; r++) t += n[r] + ":" + e[n[r]] + ";";
  return t;
}

function Rvt(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}

function L5a(e) {
  return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}

const O5a = new bo();

class B5a {
  constructor(t = {}, n = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = n, this.cache = new s5a(), this.associations = new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let r = !1,
      a = -1,
      i = !1,
      o = -1;
    if (typeof navigator < "u" && typeof navigator.userAgent < "u") {
      const s = navigator.userAgent;
      r = /^((?!chrome|android).)*safari/i.test(s) === !0;
      const l = s.match(/Version\/(\d+)/);
      a = r && l ? parseInt(l[1], 10) : -1, i = s.indexOf("Firefox") > -1, o = i ? s.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || r && a < 17 || i && o < 98 ? this.textureLoader = new sD(this.options.manager) : this.textureLoader = new r2a(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new oDt(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, n) {
    const r = this,
      a = this.json,
      i = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function (o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function () {
      return Promise.all([r.getDependencies("scene"), r.getDependencies("animation"), r.getDependencies("camera")]);
    }).then(function (o) {
      const s = {
        scene: o[0][a.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: a.asset,
        parser: r,
        userData: {}
      };
      return UG(i, s, a), D8(s, a), Promise.all(r._invokeAll(function (l) {
        return l.afterRoot && l.afterRoot(s);
      })).then(function () {
        for (const l of s.scenes) l.updateMatrixWorld();
        t(s);
      });
    }).catch(n);
  }
  _markDefs() {
    const t = this.json.nodes || [],
      n = this.json.skins || [],
      r = this.json.meshes || [];
    for (let a = 0, i = n.length; a < i; a++) {
      const o = n[a].joints;
      for (let s = 0, l = o.length; s < l; s++) t[o[s]].isBone = !0;
    }
    for (let a = 0, i = t.length; a < i; a++) {
      const o = t[a];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (r[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
    }
  }
  _addNodeRef(t, n) {
    n !== void 0 && (t.refs[n] === void 0 && (t.refs[n] = t.uses[n] = 0), t.refs[n]++);
  }
  _getNodeRef(t, n, r) {
    if (t.refs[n] <= 1) return r;
    const a = r.clone(),
      i = (o, s) => {
        const l = this.associations.get(o);
        l != null && this.associations.set(s, l);
        for (const [d, u] of o.children.entries()) i(u, s.children[d]);
      };
    return i(r, a), a.name += "_instance_" + t.uses[n]++, a;
  }
  _invokeOne(t) {
    const n = Object.values(this.plugins);
    n.push(this);
    for (let r = 0; r < n.length; r++) {
      const a = t(n[r]);
      if (a) return a;
    }
    return null;
  }
  _invokeAll(t) {
    const n = Object.values(this.plugins);
    n.unshift(this);
    const r = [];
    for (let a = 0; a < n.length; a++) {
      const i = t(n[a]);
      i && r.push(i);
    }
    return r;
  }
  getDependency(t, n) {
    const r = t + ":" + n;
    let a = this.cache.get(r);
    if (!a) {
      switch (t) {
        case "scene":
          a = this.loadScene(n);
          break;
        case "node":
          a = this._invokeOne(function (i) {
            return i.loadNode && i.loadNode(n);
          });
          break;
        case "mesh":
          a = this._invokeOne(function (i) {
            return i.loadMesh && i.loadMesh(n);
          });
          break;
        case "accessor":
          a = this.loadAccessor(n);
          break;
        case "bufferView":
          a = this._invokeOne(function (i) {
            return i.loadBufferView && i.loadBufferView(n);
          });
          break;
        case "buffer":
          a = this.loadBuffer(n);
          break;
        case "material":
          a = this._invokeOne(function (i) {
            return i.loadMaterial && i.loadMaterial(n);
          });
          break;
        case "texture":
          a = this._invokeOne(function (i) {
            return i.loadTexture && i.loadTexture(n);
          });
          break;
        case "skin":
          a = this.loadSkin(n);
          break;
        case "animation":
          a = this._invokeOne(function (i) {
            return i.loadAnimation && i.loadAnimation(n);
          });
          break;
        case "camera":
          a = this.loadCamera(n);
          break;
        default:
          if (a = this._invokeOne(function (i) {
            return i != this && i.getDependency && i.getDependency(t, n);
          }), !a) throw new Error("Unknown type: " + t);
          break;
      }
      this.cache.add(r, a);
    }
    return a;
  }
  getDependencies(t) {
    let n = this.cache.get(t);
    if (!n) {
      const r = this,
        a = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      n = Promise.all(a.map(function (i, o) {
        return r.getDependency(t, o);
      })), this.cache.add(t, n);
    }
    return n;
  }
  loadBuffer(t) {
    const n = this.json.buffers[t],
      r = this.fileLoader;
    if (n.type && n.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + n.type + " buffer type is not supported.");
    if (n.uri === void 0 && t === 0) return Promise.resolve(this.extensions[yd.KHR_BINARY_GLTF].body);
    const a = this.options;
    return new Promise(function (i, o) {
      r.load(Tie.resolveURL(n.uri, a.path), i, void 0, function () {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + n.uri + '".'));
      });
    });
  }
  loadBufferView(t) {
    const n = this.json.bufferViews[t];
    return this.getDependency("buffer", n.buffer).then(function (r) {
      const a = n.byteLength || 0,
        i = n.byteOffset || 0;
      return r.slice(i, i + a);
    });
  }
  loadAccessor(t) {
    const n = this,
      r = this.json,
      a = this.json.accessors[t];
    if (a.bufferView === void 0 && a.sparse === void 0) {
      const o = Krt[a.type],
        s = Mie[a.componentType],
        l = a.normalized === !0,
        d = new s(a.count * o);
      return Promise.resolve(new Z1(d, o, l));
    }
    const i = [];
    return a.bufferView !== void 0 ? i.push(this.getDependency("bufferView", a.bufferView)) : i.push(null), a.sparse !== void 0 && (i.push(this.getDependency("bufferView", a.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", a.sparse.values.bufferView))), Promise.all(i).then(function (o) {
      const s = o[0],
        l = Krt[a.type],
        d = Mie[a.componentType],
        u = d.BYTES_PER_ELEMENT,
        h = u * l,
        p = a.byteOffset || 0,
        m = a.bufferView !== void 0 ? r.bufferViews[a.bufferView].byteStride : void 0,
        f = a.normalized === !0;
      let y, b;
      if (m && m !== h) {
        const v = Math.floor(p / m),
          _ = "InterleavedBuffer:" + a.bufferView + ":" + a.componentType + ":" + v + ":" + a.count;
        let w = n.cache.get(_);
        w || (y = new d(s, v * m, a.count * m / u), w = new Yjt(y, m / u), n.cache.add(_, w)), b = new mE(w, l, p % m / u, f);
      } else s === null ? y = new d(a.count * l) : y = new d(s, p, a.count * l), b = new Z1(y, l, f);
      if (a.sparse !== void 0) {
        const v = Krt.SCALAR,
          _ = Mie[a.sparse.indices.componentType],
          w = a.sparse.indices.byteOffset || 0,
          k = a.sparse.values.byteOffset || 0,
          A = new _(o[1], w, a.sparse.count * v),
          S = new d(o[2], k, a.sparse.count * l);
        s !== null && (b = new Z1(b.array.slice(), b.itemSize, b.normalized)), b.normalized = !1;
        for (let C = 0, I = A.length; C < I; C++) {
          const E = A[C];
          if (b.setX(E, S[C * l]), l >= 2 && b.setY(E, S[C * l + 1]), l >= 3 && b.setZ(E, S[C * l + 2]), l >= 4 && b.setW(E, S[C * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        b.normalized = f;
      }
      return b;
    });
  }
  loadTexture(t) {
    const n = this.json,
      r = this.options,
      i = n.textures[t].source,
      o = n.images[i];
    let s = this.textureLoader;
    if (o.uri) {
      const l = r.manager.getHandler(o.uri);
      l !== null && (s = l);
    }
    return this.loadTextureImage(t, i, s);
  }
  loadTextureImage(t, n, r) {
    const a = this,
      i = this.json,
      o = i.textures[t],
      s = i.images[n],
      l = (s.uri || s.bufferView) + ":" + o.sampler;
    if (this.textureCache[l]) return this.textureCache[l];
    const d = this.loadImageSource(n, r).then(function (u) {
      u.flipY = !1, u.name = o.name || s.name || "", u.name === "" && typeof s.uri == "string" && s.uri.startsWith("data:image/") === !1 && (u.name = s.uri);
      const p = (i.samplers || {})[o.sampler] || {};
      return u.magFilter = ntn[p.magFilter] || $m, u.minFilter = ntn[p.minFilter] || A7, u.wrapS = rtn[p.wrapS] || e$, u.wrapT = rtn[p.wrapT] || e$, u.generateMipmaps = !u.isCompressedTexture && u.minFilter !== cg && u.minFilter !== $m, a.associations.set(u, {
        textures: t
      }), u;
    }).catch(function () {
      return null;
    });
    return this.textureCache[l] = d, d;
  }
  loadImageSource(t, n) {
    const r = this,
      a = this.json,
      i = this.options;
    if (this.sourceCache[t] !== void 0) return this.sourceCache[t].then(h => h.clone());
    const o = a.images[t],
      s = self.URL || self.webkitURL;
    let l = o.uri || "",
      d = !1;
    if (o.bufferView !== void 0) l = r.getDependency("bufferView", o.bufferView).then(function (h) {
      d = !0;
      const p = new Blob([h], {
        type: o.mimeType
      });
      return l = s.createObjectURL(p), l;
    });else if (o.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const u = Promise.resolve(l).then(function (h) {
      return new Promise(function (p, m) {
        let f = p;
        n.isImageBitmapLoader === !0 && (f = function (y) {
          const b = new N0(y);
          b.needsUpdate = !0, p(b);
        }), n.load(Tie.resolveURL(h, i.path), f, void 0, m);
      });
    }).then(function (h) {
      return d === !0 && s.revokeObjectURL(l), D8(h, o), h.userData.mimeType = o.mimeType || L5a(o.uri), h;
    }).catch(function (h) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", l), h;
    });
    return this.sourceCache[t] = u, u;
  }
  assignTexture(t, n, r, a) {
    const i = this;
    return this.getDependency("texture", r.index).then(function (o) {
      if (!o) return null;
      if (r.texCoord !== void 0 && r.texCoord > 0 && (o = o.clone(), o.channel = r.texCoord), i.extensions[yd.KHR_TEXTURE_TRANSFORM]) {
        const s = r.extensions !== void 0 ? r.extensions[yd.KHR_TEXTURE_TRANSFORM] : void 0;
        if (s) {
          const l = i.associations.get(o);
          o = i.extensions[yd.KHR_TEXTURE_TRANSFORM].extendTexture(o, s), i.associations.set(o, l);
        }
      }
      return a !== void 0 && (o.colorSpace = a), t[n] = o, o;
    });
  }
  assignFinalMaterial(t) {
    const n = t.geometry;
    let r = t.material;
    const a = n.attributes.tangent === void 0,
      i = n.attributes.color !== void 0,
      o = n.attributes.normal === void 0;
    if (t.isPoints) {
      const s = "PointsMaterial:" + r.uuid;
      let l = this.cache.get(s);
      l || (l = new Uqn(), Bk.prototype.copy.call(l, r), l.color.copy(r.color), l.map = r.map, l.sizeAttenuation = !1, this.cache.add(s, l)), r = l;
    } else if (t.isLine) {
      const s = "LineBasicMaterial:" + r.uuid;
      let l = this.cache.get(s);
      l || (l = new BD(), Bk.prototype.copy.call(l, r), l.color.copy(r.color), l.map = r.map, this.cache.add(s, l)), r = l;
    }
    if (a || i || o) {
      let s = "ClonedMaterial:" + r.uuid + ":";
      a && (s += "derivative-tangents:"), i && (s += "vertex-colors:"), o && (s += "flat-shading:");
      let l = this.cache.get(s);
      l || (l = r.clone(), i && (l.vertexColors = !0), o && (l.flatShading = !0), a && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(s, l), this.associations.set(l, this.associations.get(r))), r = l;
    }
    t.material = r;
  }
  getMaterialType() {
    return ng;
  }
  loadMaterial(t) {
    const n = this,
      r = this.json,
      a = this.extensions,
      i = r.materials[t];
    let o;
    const s = {},
      l = i.extensions || {},
      d = [];
    if (l[yd.KHR_MATERIALS_UNLIT]) {
      const h = a[yd.KHR_MATERIALS_UNLIT];
      o = h.getMaterialType(), d.push(h.extendParams(s, i, n));
    } else {
      const h = i.pbrMetallicRoughness || {};
      if (s.color = new so(1, 1, 1), s.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const p = h.baseColorFactor;
        s.color.setRGB(p[0], p[1], p[2], l_), s.opacity = p[3];
      }
      h.baseColorTexture !== void 0 && d.push(n.assignTexture(s, "map", h.baseColorTexture, Nl)), s.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, s.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (d.push(n.assignTexture(s, "metalnessMap", h.metallicRoughnessTexture)), d.push(n.assignTexture(s, "roughnessMap", h.metallicRoughnessTexture))), o = this._invokeOne(function (p) {
        return p.getMaterialType && p.getMaterialType(t);
      }), d.push(Promise.all(this._invokeAll(function (p) {
        return p.extendMaterialParams && p.extendMaterialParams(t, s);
      })));
    }
    i.doubleSided === !0 && (s.side = _y);
    const u = i.alphaMode || Qrt.OPAQUE;
    if (u === Qrt.BLEND ? (s.transparent = !0, s.depthWrite = !1) : (s.transparent = !1, u === Qrt.MASK && (s.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : .5)), i.normalTexture !== void 0 && o !== uu && (d.push(n.assignTexture(s, "normalMap", i.normalTexture)), s.normalScale = new Qi(1, 1), i.normalTexture.scale !== void 0)) {
      const h = i.normalTexture.scale;
      s.normalScale.set(h, h);
    }
    if (i.occlusionTexture !== void 0 && o !== uu && (d.push(n.assignTexture(s, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (s.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && o !== uu) {
      const h = i.emissiveFactor;
      s.emissive = new so().setRGB(h[0], h[1], h[2], l_);
    }
    return i.emissiveTexture !== void 0 && o !== uu && d.push(n.assignTexture(s, "emissiveMap", i.emissiveTexture, Nl)), Promise.all(d).then(function () {
      const h = new o(s);
      return i.name && (h.name = i.name), D8(h, i), n.associations.set(h, {
        materials: t
      }), i.extensions && UG(a, h, i), h;
    });
  }
  createUniqueName(t) {
    const n = au.sanitizeNodeName(t || "");
    return n in this.nodeNamesUsed ? n + "_" + ++this.nodeNamesUsed[n] : (this.nodeNamesUsed[n] = 0, n);
  }
  loadGeometries(t) {
    const n = this,
      r = this.extensions,
      a = this.primitiveCache;
    function i(s) {
      return r[yd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s, n).then(function (l) {
        return atn(l, s, n);
      });
    }
    const o = [];
    for (let s = 0, l = t.length; s < l; s++) {
      const d = t[s],
        u = D5a(d),
        h = a[u];
      if (h) o.push(h.promise);else {
        let p;
        d.extensions && d.extensions[yd.KHR_DRACO_MESH_COMPRESSION] ? p = i(d) : p = atn(new Fd(), d, n), a[u] = {
          primitive: d,
          promise: p
        }, o.push(p);
      }
    }
    return Promise.all(o);
  }
  loadMesh(t) {
    const n = this,
      r = this.json,
      a = this.extensions,
      i = r.meshes[t],
      o = i.primitives,
      s = [];
    for (let l = 0, d = o.length; l < d; l++) {
      const u = o[l].material === void 0 ? R5a(this.cache) : this.getDependency("material", o[l].material);
      s.push(u);
    }
    return s.push(n.loadGeometries(o)), Promise.all(s).then(function (l) {
      const d = l.slice(0, l.length - 1),
        u = l[l.length - 1],
        h = [];
      for (let m = 0, f = u.length; m < f; m++) {
        const y = u[m],
          b = o[m];
        let v;
        const _ = d[m];
        if (b.mode === g4.TRIANGLES || b.mode === g4.TRIANGLE_STRIP || b.mode === g4.TRIANGLE_FAN || b.mode === void 0) v = i.isSkinnedMesh === !0 ? new Fqn(y, _) : new di(y, _), v.isSkinnedMesh === !0 && v.normalizeSkinWeights(), b.mode === g4.TRIANGLE_STRIP ? v.geometry = Zen(v.geometry, Nqn) : b.mode === g4.TRIANGLE_FAN && (v.geometry = Zen(v.geometry, yvt));else if (b.mode === g4.LINES) v = new Zjt(y, _);else if (b.mode === g4.LINE_STRIP) v = new Qw(y, _);else if (b.mode === g4.LINE_LOOP) v = new Zwa(y, _);else if (b.mode === g4.POINTS) v = new exa(y, _);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + b.mode);
        Object.keys(v.geometry.morphAttributes).length > 0 && j5a(v, i), v.name = n.createUniqueName(i.name || "mesh_" + t), D8(v, i), b.extensions && UG(a, v, b), n.assignFinalMaterial(v), h.push(v);
      }
      for (let m = 0, f = h.length; m < f; m++) n.associations.set(h[m], {
        meshes: t,
        primitives: m
      });
      if (h.length === 1) return i.extensions && UG(a, h[0], i), h[0];
      const p = new hc();
      i.extensions && UG(a, p, i), n.associations.set(p, {
        meshes: t
      });
      for (let m = 0, f = h.length; m < f; m++) p.add(h[m]);
      return p;
    });
  }
  loadCamera(t) {
    let n;
    const r = this.json.cameras[t],
      a = r[r.type];
    if (!a) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return r.type === "perspective" ? n = new lu(Mo.radToDeg(a.yfov), a.aspectRatio || 1, a.znear || 1, a.zfar || 2e6) : r.type === "orthographic" && (n = new uG(-a.xmag, a.xmag, a.ymag, -a.ymag, a.znear, a.zfar)), r.name && (n.name = this.createUniqueName(r.name)), D8(n, r), Promise.resolve(n);
  }
  loadSkin(t) {
    const n = this.json.skins[t],
      r = [];
    for (let a = 0, i = n.joints.length; a < i; a++) r.push(this._loadNodeShallow(n.joints[a]));
    return n.inverseBindMatrices !== void 0 ? r.push(this.getDependency("accessor", n.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function (a) {
      const i = a.pop(),
        o = a,
        s = [],
        l = [];
      for (let d = 0, u = o.length; d < u; d++) {
        const h = o[d];
        if (h) {
          s.push(h);
          const p = new bo();
          i !== null && p.fromArray(i.array, d * 16), l.push(p);
        } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', n.joints[d]);
      }
      return new WYe(s, l);
    });
  }
  loadAnimation(t) {
    const n = this.json,
      r = this,
      a = n.animations[t],
      i = a.name ? a.name : "animation_" + t,
      o = [],
      s = [],
      l = [],
      d = [],
      u = [];
    for (let h = 0, p = a.channels.length; h < p; h++) {
      const m = a.channels[h],
        f = a.samplers[m.sampler],
        y = m.target,
        b = y.node,
        v = a.parameters !== void 0 ? a.parameters[f.input] : f.input,
        _ = a.parameters !== void 0 ? a.parameters[f.output] : f.output;
      y.node !== void 0 && (o.push(this.getDependency("node", b)), s.push(this.getDependency("accessor", v)), l.push(this.getDependency("accessor", _)), d.push(f), u.push(y));
    }
    return Promise.all([Promise.all(o), Promise.all(s), Promise.all(l), Promise.all(d), Promise.all(u)]).then(function (h) {
      const p = h[0],
        m = h[1],
        f = h[2],
        y = h[3],
        b = h[4],
        v = [];
      for (let w = 0, k = p.length; w < k; w++) {
        const A = p[w],
          S = m[w],
          C = f[w],
          I = y[w],
          E = b[w];
        if (A === void 0) continue;
        A.updateMatrix && A.updateMatrix();
        const M = r._createAnimationTracks(A, S, C, I, E);
        if (M) for (let T = 0; T < M.length; T++) v.push(M[T]);
      }
      const _ = new aze(i, void 0, v);
      return D8(_, a), _;
    });
  }
  createNodeMesh(t) {
    const n = this.json,
      r = this,
      a = n.nodes[t];
    return a.mesh === void 0 ? null : r.getDependency("mesh", a.mesh).then(function (i) {
      const o = r._getNodeRef(r.meshCache, a.mesh, i);
      return a.weights !== void 0 && o.traverse(function (s) {
        if (s.isMesh) for (let l = 0, d = a.weights.length; l < d; l++) s.morphTargetInfluences[l] = a.weights[l];
      }), o;
    });
  }
  loadNode(t) {
    const n = this.json,
      r = this,
      a = n.nodes[t],
      i = r._loadNodeShallow(t),
      o = [],
      s = a.children || [];
    for (let d = 0, u = s.length; d < u; d++) o.push(r.getDependency("node", s[d]));
    const l = a.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", a.skin);
    return Promise.all([i, Promise.all(o), l]).then(function (d) {
      const u = d[0],
        h = d[1],
        p = d[2];
      p !== null && u.traverse(function (m) {
        m.isSkinnedMesh && m.bind(p, O5a);
      });
      for (let m = 0, f = h.length; m < f; m++) u.add(h[m]);
      if (u.userData.pivot !== void 0 && h.length > 0) {
        const m = u.userData.pivot,
          f = h[0];
        u.pivot = new dr().fromArray(m), u.position.x -= m[0], u.position.y -= m[1], u.position.z -= m[2], f.position.set(0, 0, 0), delete u.userData.pivot;
      }
      return u;
    });
  }
  _loadNodeShallow(t) {
    const n = this.json,
      r = this.extensions,
      a = this;
    if (this.nodeCache[t] !== void 0) return this.nodeCache[t];
    const i = n.nodes[t],
      o = i.name ? a.createUniqueName(i.name) : "",
      s = [],
      l = a._invokeOne(function (d) {
        return d.createNodeMesh && d.createNodeMesh(t);
      });
    return l && s.push(l), i.camera !== void 0 && s.push(a.getDependency("camera", i.camera).then(function (d) {
      return a._getNodeRef(a.cameraCache, i.camera, d);
    })), a._invokeAll(function (d) {
      return d.createNodeAttachment && d.createNodeAttachment(t);
    }).forEach(function (d) {
      s.push(d);
    }), this.nodeCache[t] = Promise.all(s).then(function (d) {
      let u;
      if (i.isBone === !0 ? u = new tze() : d.length > 1 ? u = new hc() : d.length === 1 ? u = d[0] : u = new Zc(), u !== d[0]) for (let h = 0, p = d.length; h < p; h++) u.add(d[h]);
      if (i.name && (u.userData.name = i.name, u.name = o), D8(u, i), i.extensions && UG(r, u, i), i.matrix !== void 0) {
        const h = new bo();
        h.fromArray(i.matrix), u.applyMatrix4(h);
      } else i.translation !== void 0 && u.position.fromArray(i.translation), i.rotation !== void 0 && u.quaternion.fromArray(i.rotation), i.scale !== void 0 && u.scale.fromArray(i.scale);
      if (!a.associations.has(u)) a.associations.set(u, {});else if (i.mesh !== void 0 && a.meshCache.refs[i.mesh] > 1) {
        const h = a.associations.get(u);
        a.associations.set(u, {
          ...h
        });
      }
      return a.associations.get(u).nodes = t, u;
    }), this.nodeCache[t];
  }
  loadScene(t) {
    const n = this.extensions,
      r = this.json.scenes[t],
      a = this,
      i = new hc();
    r.name && (i.name = a.createUniqueName(r.name)), D8(i, r), r.extensions && UG(n, i, r);
    const o = r.nodes || [],
      s = [];
    for (let l = 0, d = o.length; l < d; l++) s.push(a.getDependency("node", o[l]));
    return Promise.all(s).then(function (l) {
      for (let u = 0, h = l.length; u < h; u++) {
        const p = l[u];
        p.parent !== null ? i.add(YYe(p)) : i.add(p);
      }
      const d = u => {
        const h = new Map();
        for (const [p, m] of a.associations) (p instanceof Bk || p instanceof N0) && h.set(p, m);
        return u.traverse(p => {
          const m = a.associations.get(p);
          m != null && h.set(p, m);
        }), h;
      };
      return a.associations = d(i), i;
    });
  }
  _createAnimationTracks(t, n, r, a, i) {
    const o = [],
      s = t.name ? t.name : t.uuid,
      l = [];
    xL[i.path] === xL.weights ? t.traverse(function (p) {
      p.morphTargetInfluences && l.push(p.name ? p.name : p.uuid);
    }) : l.push(s);
    let d;
    switch (xL[i.path]) {
      case xL.weights:
        d = ZX;
        break;
      case xL.rotation:
        d = n$;
        break;
      case xL.translation:
      case xL.scale:
        d = eJ;
        break;
      default:
        switch (r.itemSize) {
          case 1:
            d = ZX;
            break;
          case 2:
          case 3:
          default:
            d = eJ;
            break;
        }
        break;
    }
    const u = a.interpolation !== void 0 ? P5a[a.interpolation] : T_e,
      h = this._getArrayFromAccessor(r);
    for (let p = 0, m = l.length; p < m; p++) {
      const f = new d(l[p] + "." + xL[i.path], n.array, h, u);
      a.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(f), o.push(f);
    }
    return o;
  }
  _getArrayFromAccessor(t) {
    let n = t.array;
    if (t.normalized) {
      const r = Rvt(n.constructor),
        a = new Float32Array(n.length);
      for (let i = 0, o = n.length; i < o; i++) a[i] = n[i] * r;
      n = a;
    }
    return n;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function (r) {
      const a = this instanceof n$ ? M5a : PKn;
      return new a(this.times, this.values, this.getValueSize() / 3, r);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}

function F5a(e, t, n) {
  const r = t.attributes,
    a = new j0();
  if (r.POSITION !== void 0) {
    const s = n.json.accessors[r.POSITION],
      l = s.min,
      d = s.max;
    if (l !== void 0 && d !== void 0) {
      if (a.set(new dr(l[0], l[1], l[2]), new dr(d[0], d[1], d[2])), s.normalized) {
        const u = Rvt(Mie[s.componentType]);
        a.min.multiplyScalar(u), a.max.multiplyScalar(u);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else return;
  const i = t.targets;
  if (i !== void 0) {
    const s = new dr(),
      l = new dr();
    for (let d = 0, u = i.length; d < u; d++) {
      const h = i[d];
      if (h.POSITION !== void 0) {
        const p = n.json.accessors[h.POSITION],
          m = p.min,
          f = p.max;
        if (m !== void 0 && f !== void 0) {
          if (l.setX(Math.max(Math.abs(m[0]), Math.abs(f[0]))), l.setY(Math.max(Math.abs(m[1]), Math.abs(f[1]))), l.setZ(Math.max(Math.abs(m[2]), Math.abs(f[2]))), p.normalized) {
            const y = Rvt(Mie[p.componentType]);
            l.multiplyScalar(y);
          }
          s.max(l);
        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    a.expandByVector(s);
  }
  e.boundingBox = a;
  const o = new mI();
  a.getCenter(o.center), o.radius = a.min.distanceTo(a.max) / 2, e.boundingSphere = o;
}

function atn(e, t, n) {
  const r = t.attributes,
    a = [];
  function i(o, s) {
    return n.getDependency("accessor", o).then(function (l) {
      e.setAttribute(s, l);
    });
  }
  for (const o in r) {
    const s = Pvt[o] || o.toLowerCase();
    s in e.attributes || a.push(i(r[o], s));
  }
  if (t.indices !== void 0 && !e.index) {
    const o = n.getDependency("accessor", t.indices).then(function (s) {
      e.setIndex(s);
    });
    a.push(o);
  }
  return vc.workingColorSpace !== l_ && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${vc.workingColorSpace}" not supported.`), D8(e, t), F5a(e, t, n), Promise.all(a).then(function () {
    return t.targets !== void 0 ? N5a(e, t.targets, n) : e;
  });
}

const z5a = /hips\.position$/i,
  B_e = e => {
    const t = e.clone();
    return t.tracks = t.tracks.map(n => {
      if (!z5a.test(n.name)) return n;
      const r = n.clone(),
        a = r.values;
      for (let i = 0; i < a.length; i += 3) a[i] = 0, a[i + 2] = 0;
      return r;
    }), t;
  },
  Nvt = e => ((e == null ? void 0 : e.animations) ?? []).find(t => t.tracks.length > 0 && t.duration > .05) ?? null,
  U5a = (e, t, n) => {
    const r = Nvt(t);
    if (!r) return null;
    const a = B_e(r),
      i = a.clone();
    i.name = "locomotion-walk";
    const o = a.clone();
    o.name = "locomotion-run";
    const s = new uDt(e),
      l = s.clipAction(i),
      d = s.clipAction(o);
    l.setLoop(Iie, 1 / 0), d.setLoop(Iie, 1 / 0), l.timeScale = .58, d.timeScale = 1.12, l.enabled = !0, d.enabled = !0;
    const u = Nvt(n ?? null),
      h = u && u.duration > .35 ? s.clipAction(B_e(u)) : null;
    return h && (h.setLoop(Iie, 1 / 0), h.enabled = !0, h.play()), {
      mixer: s,
      idle: h,
      walk: l,
      run: d,
      crouch: null,
      crouchHoldTime: 0,
      current: "idle"
    };
  },
  itn = (e, t, n = .68) => {
    if (e.crouch) return !0;
    const r = (t.animations ?? []).find(o => o.tracks.length > 0 && o.duration > 0) ?? null;
    if (!r) return !1;
    const a = B_e(r);
    a.name = "locomotion-crouch";
    const i = e.mixer.clipAction(a);
    return i.enabled = !0, i.setLoop($jt, 1), i.clampWhenFinished = !0, i.paused = !0, e.crouch = i, e.crouchHoldTime = a.duration * n, !0;
  },
  $5a = (e, t) => {
    if (e.idle) return !0;
    const n = Nvt(t);
    if (!n || n.duration <= .35) return !1;
    const r = e.mixer.clipAction(B_e(n));
    return r.enabled = !0, r.setLoop(Iie, 1 / 0), e.idle = r, !0;
  },
  W8e = e => {
    var n;
    const t = e.crouch;
    return t ? (e.current !== "crouch" && (e.walk.stop(), e.run.stop(), (n = e.idle) == null || n.stop(), t.enabled = !0, t.reset(), t.paused = !0, t.setEffectiveWeight(1), t.time = e.crouchHoldTime, t.play(), e.current = "crouch"), e.mixer.update(0), !0) : !1;
  },
  q8e = (e, t, n = .16) => {
    const r = o => o === "idle" ? e.idle : o === "walk" ? e.walk : o === "run" ? e.run : e.crouch,
      a = r(t);
    if (e.current === t && (a != null && a.isRunning())) return;
    const i = r(e.current);
    i && i !== a && i.fadeOut(n), a && (a.isRunning() || a.reset(), a.paused = !1, a.fadeIn(n).play()), e.current = t;
  },
  nte = e => {
    e && (e.mixer.stopAllAction(), e.current = "idle");
  },
  G5a = e => String(Math.round(e * 100) / 100),
  rp = (e, t, n, r) => ({
    id: e,
    name: t,
    description: `${n} · ${G5a(r)} 秒`,
    url: `/models/director3d/animations/${e}.fbx`,
    durationSeconds: r
  }),
  RKn = [rp("breakdance-1990", "街舞 1990", "Breakdance", .5), rp("burpee-end", "波比收势", "Burpee End", 2.433333), rp("dancing-maraschino-step", "樱桃舞步", "Maraschino Step", 3.233333), rp("dancing-twerk", "电臀舞", "Twerk", 15.2), rp("death-from-right", "右侧倒下", "Death From Right", 3.3), rp("dive-roll", "鱼跃翻滚", "Dive Roll", 3.933333), rp("flying-bicycle-kick", "飞身倒钩", "Flying Bicycle Kick", .666667), rp("ginga-backward", "金加后移", "Ginga Backward", 1.133333), rp("ginga-sideways-to-au", "金加侧步接桥", "Ginga Sideways To Au", 3.766667), rp("goalkeeper-diving-save", "门将扑救", "Goalkeeper Diving Save", 3.233333), rp("guitar-playing", "弹吉他", "Guitar Playing", 4.766667), rp("injured-run", "受伤奔跑", "Injured Run", .633333), rp("jump-attack", "跳跃攻击", "Jump Attack", 3.8), rp("kip-up", "鲤鱼打挺", "Kip Up", 2.033333), rp("lead-jab", "前手直拳", "Lead Jab", 1.333333), rp("mma-kick", "MMA 踢击", "Mma Kick", 1.6), rp("pushing", "推人", "Pushing", 2.666667), rp("salsa-dancing", "萨尔萨舞", "Salsa Dancing", 11.966666), rp("sitting-disbelief", "坐地错愕", "Sitting Disbelief", 4.166667), rp("standing-clap", "站立鼓掌", "Standing Clap", 4.766667), rp("standing-taunt-battlecry", "战吼嘲讽", "Standing Taunt Battlecry", 2.833333), rp("standing-yell", "站立呐喊", "Standing Yell", 5.566667), rp("sword-and-shield-death", "剑盾死亡", "Sword And Shield Death", 2.3), rp("sword-and-shield-slash", "剑盾挥砍", "Sword And Shield Slash", 1.366667), rp("texting-and-walking", "边走边发短信", "Texting And Walking", 3.3), rp("victory", "胜利", "Victory", 8.533334), rp("zombie-crawl", "僵尸爬行", "Zombie Crawl", 5.133333), rp("zombie-walk", "僵尸行走", "Zombie Walk", 4.033333)],
  jvt = e => e ? RKn.find(t => t.id === e) ?? null : null,
  Dvt = e => {
    let t = ((e + 180) % 360 + 360) % 360 - 180;
    return t === -180 && (t = 180), t;
  },
  NKn = (e, t) => {
    const n = new lu();
    return n.position.set(e[0], e[1], e[2]), n.up.set(0, 1, 0), n.lookAt(t[0], t[1], t[2]), n.updateMatrixWorld(!0), n;
  },
  V5a = (e, t, n) => {
    const a = NKn(e, t).quaternion.clone().invert().multiply(n),
      i = new xp().setFromQuaternion(a, "XYZ");
    return Dvt(Mo.radToDeg(i.z));
  },
  gDt = e => {
    const t = Dvt(e);
    return Math.abs(t) > 135 ? Dvt(t - Math.sign(t) * 180) : t;
  },
  K8e = (e, t, n) => {
    const r = NKn(e, t),
      a = new xp().setFromQuaternion(r.quaternion, "XYZ");
    return [Number(Mo.radToDeg(a.x).toFixed(2)), Number(Mo.radToDeg(a.y).toFixed(2)), Number(gDt(V5a(e, t, n)).toFixed(2))];
  },
  otn = (e, t, n) => {
    const r = Math.max(.35, Math.hypot(n[0] - e[0], n[1] - e[1], n[2] - e[2])),
      a = new Zc();
    a.position.set(e[0], e[1], e[2]), a.rotation.set(Mo.degToRad(t[0]), Mo.degToRad(t[1]), Mo.degToRad(t[2])), a.updateMatrixWorld(!0);
    const i = new dr(0, 0, -1).applyQuaternion(a.quaternion).multiplyScalar(r);
    return [e[0] + i.x, e[1] + i.y, e[2] + i.z];
  },
  stn = 15769344,
  ltn = 14240341,
  ctn = [8160247, 4367861, 2533018, 11225020, 15684432, 16754470, 6732650, 15483002],
  H5a = e => {
    let t = 2166136261;
    for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
    return t >>> 0;
  },
  dtn = (e, t, n) => {
    if (n) {
      const r = n.trim().replace("#", "");
      if (/^[0-9a-fA-F]{6}$/.test(r)) return Number.parseInt(r, 16);
    }
    return ctn[H5a(t) % ctn.length];
  },
  Xrt = e => {
    const t = [];
    for (const n of e) {
      const r = t[t.length - 1];
      (!r || Math.hypot(n[0] - r[0], n[1] - r[1], n[2] - r[2]) > .002) && t.push(n);
    }
    return t;
  },
  W5a = e => {
    var a, i, o;
    const t = [];
    return new Set(e.cameraKeyframes.map(s => s.cameraId)).forEach(s => {
      const l = e.cameraKeyframes.filter(h => h.cameraId === s).sort((h, p) => h.frame - p.frame),
        d = Xrt(l.map(h => h.position)),
        u = Xrt(l.map(h => h.lookAt));
      d.length >= 2 && t.push({
        id: `${s}:position`,
        kind: "camera-position",
        subjectId: s,
        points: d,
        color: stn
      }), u.length >= 2 && t.push({
        id: `${s}:target`,
        kind: "camera-target",
        subjectId: s,
        points: u,
        color: ltn
      });
    }), new Set((e.objectKeyframes ?? []).map(s => s.objectId)).forEach(s => {
      const l = (e.objectKeyframes ?? []).filter(h => h.objectId === s).sort((h, p) => h.frame - p.frame),
        d = Xrt(l.map(h => h.position));
      if (d.length < 2) return;
      const u = e.objects.find(h => h.id === s);
      t.push({
        id: `${s}:move`,
        kind: "object-move",
        subjectId: s,
        points: d,
        color: dtn("object-move", s, (u == null ? void 0 : u.labelColor) ?? (u == null ? void 0 : u.color))
      });
    }), (a = e.draft) != null && a.cameraPoints && e.draft.cameraPoints.length >= 1 && t.push({
      id: "draft:camera",
      kind: "camera-position",
      subjectId: "draft",
      points: e.draft.cameraPoints,
      color: stn
    }), (i = e.draft) != null && i.targetPoints && e.draft.targetPoints.length >= 1 && t.push({
      id: "draft:target",
      kind: "camera-target",
      subjectId: "draft",
      points: e.draft.targetPoints,
      color: ltn
    }), (o = e.draft) != null && o.objectPoints && e.draft.objectPoints.length >= 1 && t.push({
      id: "draft:object",
      kind: "object-move",
      subjectId: "draft",
      points: e.draft.objectPoints,
      color: dtn("object-move", "draft")
    }), t;
  },
  lde = 1,
  utn = 2,
  Lvt = 3,
  jKn = new qp(1, 10, 8),
  Q8e = (e, t, n = !1) => {
    e.layers.enable(0), !n && t.showMotionPaths !== !1 ? e.layers.enable(lde) : e.layers.disable(lde), !n && t.showLabels ? e.layers.enable(utn) : e.layers.disable(utn), !n && t.showHeightLines ? e.layers.enable(Lvt) : e.layers.disable(Lvt);
  },
  q5a = e => {
    e.traverse(t => {
      const n = t;
      n.geometry && n.geometry !== jKn && n.geometry.dispose();
      const r = t.material;
      Array.isArray(r) ? r.forEach(a => a.dispose()) : r && r.dispose();
    });
  },
  DKn = e => {
    [...e.children].forEach(t => {
      e.remove(t), q5a(t);
    });
  },
  K5a = (e, t, n) => {
    const r = t.points;
    if (r.length === 0) return;
    const a = new so(t.color);
    if (r.length >= 2) {
      const s = new Fd().setFromPoints(r.map(d => new dr(...d))),
        l = new Qw(s, new BD({
          color: a,
          transparent: !0,
          opacity: .92,
          depthTest: !1
        }));
      l.layers.set(lde), l.frustumCulled = !1, l.renderOrder = 8, e.add(l);
    }
    const i = new zqn(jKn, new uu({
      color: a,
      depthTest: !1
    }), r.length);
    i.layers.set(lde), i.frustumCulled = !1, i.renderOrder = 9, i.userData.directorStagePathMarkerRadiusPx = 5;
    const o = new Zc();
    r.forEach((s, l) => {
      o.position.set(...s), o.scale.setScalar(.055), o.updateMatrix(), i.setMatrixAt(l, o.matrix);
    }), i.instanceMatrix.needsUpdate = !0, e.add(i);
  },
  Q5a = (e, t, n) => {
    DKn(e), t.forEach(r => K5a(e, r));
  },
  Y5a = (e, t, n) => {
    if (DKn(e), !t) return;
    const r = new dr(t[0], t[1], t[2]),
      a = new dr(t[0], n, t[2]),
      i = new Fd().setFromPoints([a, r]),
      o = new Qw(i, new Uxa({
        color: 11188479,
        dashSize: .12,
        gapSize: .08,
        depthTest: !1
      }));
    o.computeLineDistances(), o.layers.set(Lvt), o.frustumCulled = !1, o.renderOrder = 7, e.add(o);
  },
  X5a = (e, t) => {
    const n = new Zc();
    e.traverse(r => {
      const a = r;
      if (!a.userData.directorStagePathMarkerRadiusPx || !a.isInstancedMesh) return;
      const o = a.count;
      for (let s = 0; s < o; s += 1) {
        a.getMatrixAt(s, n.matrix), n.matrix.decompose(n.position, n.quaternion, n.scale);
        const l = n.position.distanceTo(t.position),
          d = Math.max(.03, Math.min(.16, l * .012));
        n.scale.setScalar(d), n.updateMatrix(), a.setMatrixAt(s, n.matrix);
      }
      a.instanceMatrix.needsUpdate = !0;
    });
  },
  Jrt = new dr(),
  $G = new dr(),
  J5a = e => e.kind === "character" ? "person" : e.kind === "geometry" || e.kind === "prop" ? "object" : e.kind === "light" ? "light" : e.kind === "camera" ? "camera" : null,
  Z5a = e => e === "person" ? df.kindFallback.person : e === "light" ? df.kindFallback.light : e === "camera" ? df.kindFallback.camera : df.kindFallback.object,
  eIa = (e, t, n) => {
    t.kind === "camera" && e.traverse(r => {
      if (r.userData.isTopViewPickTarget) {
        r.visible = !0;
        return;
      }
      r !== e && (r.visible = !n);
    });
  },
  tIa = (e, t, n, r) => ($G.copy(e).project(t), $G.z < -1 || $G.z > 1 || Math.abs($G.x) > 1.12 || Math.abs($G.y) > 1.12 ? null : {
    x: ($G.x * .5 + .5) * n,
    y: (-$G.y * .5 + .5) * r
  }),
  nIa = e => {
    if (e.kind === "camera") {
      const t = e.lookAt[0] - e.position[0],
        n = e.lookAt[2] - e.position[2];
      return Math.hypot(t, n) < .001 ? 0 : Mo.radToDeg(Math.atan2(-t, -n));
    }
    return e.rotation[1] ?? 0;
  },
  rIa = (e, t, n, r, a, i) => {
    const o = [];
    for (const s of e) {
      const l = J5a(s);
      if (!l || s.kind === "crowd") continue;
      const d = t.get(s.id);
      if (!d || !d.visible) continue;
      d.getWorldPosition(Jrt), s.kind === "camera" && (Jrt.y = .04);
      const u = tIa(Jrt, n, r, a);
      if (!u) continue;
      const h = s.kind === "camera" ? df.kindFallback.camera : "color" in s && s.color ? s.color : Z5a(l);
      o.push({
        id: s.id,
        kind: l,
        name: s.name,
        x: u.x,
        y: u.y,
        yawDeg: nIa(s),
        selected: s.id === i,
        color: h,
        fov: s.kind === "camera" ? s.fov : void 0
      });
    }
    return o;
  },
  ou = e => e.map(t => Mo.degToRad(t)),
  aIa = e => e.map(t => Number(Mo.radToDeg(t).toFixed(2))),
  Y8e = (e, t) => Math.round(e / t) * t,
  Kme = e => [Number(e.position.x.toFixed(2)), Number(e.position.y.toFixed(2)), Number(e.position.z.toFixed(2))],
  Zrt = [8.2, 2.6, 9.4],
  eat = [0, .8, 0],
  Qme = 20,
  htn = .5,
  ptn = 2,
  iIa = .002,
  oIa = .001,
  sIa = 10132120,
  lIa = 15066603,
  cIa = e => Math.abs(e / ptn - Math.round(e / ptn)) < 1e-5,
  mtn = (e, t, n, r, a, i, o) => {
    e.push(t, n, r, a, i, o);
  },
  ftn = (e, t, n, r) => {
    const a = new Fd();
    a.setAttribute("position", new Al(t, 3));
    const i = new BD({
        color: n,
        transparent: !0,
        opacity: r,
        depthWrite: !1,
        toneMapped: !1
      }),
      o = new Zjt(a, i);
    return o.name = e, o.renderOrder = 1, o.frustumCulled = !1, o;
  },
  dIa = (e, t) => {
    const n = [],
      r = [],
      a = e / 2,
      i = Math.round(e / htn);
    for (let s = 0; s <= i; s += 1) {
      const l = -a + s * htn,
        d = cIa(l) ? r : n;
      mtn(d, -a, t, l, a, t, l), mtn(d, l, t, -a, l, t, a);
    }
    const o = new hc();
    return o.name = "director-stage-grid", o.position.y = iIa, n.length && o.add(ftn("stage-grid-minor", n, sIa, .28)), r.length && o.add(ftn("stage-grid-major", r, lIa, .52)), o.userData.isDirectorGizmo = !0, o.userData.disposeOnRemove = !0, o;
  },
  WF = 11.5,
  X8e = 30,
  tat = (e, t, n) => {
    const r = t / Math.max(n, 1);
    e.left = -WF * r, e.right = WF * r, e.top = WF, e.bottom = -WF, e.updateProjectionMatrix();
  },
  uIa = "/models/director3d/female-standing-pose.fbx",
  hIa = "/models/director3d/female-standing-pose-1.fbx",
  LKn = "/models/director3d/drunk-run-forward.fbx",
  pIa = "/models/director3d/unarmed-idle-looking.fbx",
  mIa = "/models/director3d/female-crouch-pose.fbx",
  fIa = "/models/director3d/female-sitting-pose.fbx",
  gIa = "/models/director3d/female-action-pose.fbx",
  yIa = "/models/director3d/military-signaling.fbx",
  bIa = "/models/director3d/kneeling-idle.fbx",
  vIa = "/models/director3d/thinking.fbx",
  wIa = "/models/director3d/female-akimbo-pose.fbx",
  xIa = "/models/director3d/hand-raising.fbx",
  _Ia = "/models/director3d/x-bot.fbx",
  Ovt = 1.35,
  kIa = 1.85,
  AIa = 4.6,
  SIa = .95,
  IIa = 4.55,
  CIa = 14.5,
  EIa = 1.28,
  TIa = {
    "16:9": 16 / 9,
    "9:16": 9 / 16,
    "1:1": 1,
    "4:3": 4 / 3,
    "3:4": 3 / 4,
    "2.39:1": 2.39
  },
  J8e = e => {
    if (!e.userData.disposeOnRemove) return;
    const t = !!e.userData.preserveTexture;
    e.traverse(n => {
      var i, o;
      const r = n;
      (o = (i = r.geometry) == null ? void 0 : i.dispose) == null || o.call(i), (Array.isArray(r.material) ? r.material : r.material ? [r.material] : []).forEach(s => {
        var d, u;
        t || (u = (d = s.map) == null ? void 0 : d.dispose) == null || u.call(d), s.dispose();
      });
    });
  },
  gtn = e => {
    e.traverse(t => {
      var r, a, i, o, s;
      const n = t;
      if (n.isMesh || n.isLineSegments || n.isLine) (Array.isArray(n.material) ? n.material : n.material ? [n.material] : []).forEach(d => {
        var u, h;
        e.userData.ownsTextures && ((h = (u = d.map) == null ? void 0 : u.dispose) == null || h.call(u)), d.dispose();
      }), e.userData.ownsGeometries && ((a = (r = n.geometry) == null ? void 0 : r.dispose) == null || a.call(r));else if (t.isSprite) {
        const d = t.material;
        (o = (i = d == null ? void 0 : d.map) == null ? void 0 : i.dispose) == null || o.call(i), (s = d == null ? void 0 : d.dispose) == null || s.call(d);
      }
    });
  },
  MIa = (e, t, n, r, a, i) => {
    const o = `${e.kind}:${e.id}`;
    switch (e.kind) {
      case "character":
        return `${o}:ch:${e.name}:${e.fbxUrl ? `custom:${a ?? "pending"}` : a ?? "none"}:${n ? 1 : 0}:${e.fbxUrl ?? ""}`;
      case "geometry":
        return `${o}:geo:${e.geometry}:${e.color}`;
      case "prop":
        return `${o}:prop:${e.prop}:${e.modelId ?? "proc"}:${e.modelUrl ?? ""}:${e.color}:${r ?? "none"}`;
      case "camera":
        return `${o}:cam:${e.name}:${e.color}:${e.id === t ? 1 : 0}:${e.fov}:${i}`;
      case "light":
        return `${o}:lit:${e.light}`;
      default:
        return "";
    }
  },
  OKn = (e, t) => {
    const n = new lu();
    n.position.set(...t.position), n.lookAt(new dr(...t.lookAt)), e.position.copy(n.position), e.quaternion.copy(n.quaternion);
    const r = Mo.degToRad(gDt(t.rotation[2] ?? 0));
    Math.abs(r) > 1e-4 && e.rotateZ(r);
  },
  BKn = (e, t) => {
    OKn(e, t);
  },
  Z8e = (e, t) => {
    if (t.kind === "camera") {
      e.userData.isTopViewCameraRepresentation ? WKn(e, t) : BKn(e, t);
      return;
    }
    if (e.position.set(...t.position), e.rotation.set(...ou(t.rotation)), t.kind === "geometry" || t.kind === "prop") e.scale.set(...t.scale);else if (t.kind === "character") {
      const n = t.scale ?? [1, 1, 1];
      e.scale.set(n[0], n[1], n[2]);
    }
  },
  Yme = (e, t, n) => {
    if (n === "auto" || e <= 0 || t <= 0) return null;
    const r = TIa[n],
      a = Math.min(e * .82, t * .78 * r),
      i = Math.min(t * .78, a / r),
      o = (e - a) / 2,
      s = (t - i) / 2;
    return {
      x: o,
      y: s,
      width: a,
      height: i,
      aspect: a / i
    };
  },
  PIa = (e, t) => ({
    x: Math.round(e.x),
    y: Math.round(t - e.y - e.height),
    width: Math.round(e.width),
    height: Math.round(e.height)
  }),
  IR = (e, t, n) => {
    e.fov = t.fov, e.aspect = n, e.near = .1, e.far = 80, OKn(e, t), e.updateProjectionMatrix(), e.updateMatrixWorld(!0);
  },
  RIa = (e, t, n) => {
    const r = Math.round(t.x * n),
      a = Math.round(t.y * n),
      i = Math.round(t.width * n),
      o = Math.round(t.height * n),
      s = document.createElement("canvas");
    s.width = i, s.height = o;
    const l = s.getContext("2d");
    return l ? (l.drawImage(e, r, a, i, o, 0, 0, i, o), s.toDataURL("image/png")) : null;
  },
  NIa = (e, t, n, r) => {
    const a = Math.round(t * r),
      i = Math.round(n * r);
    (e.width !== a || e.height !== i) && (e.width = a, e.height = i), e.style.width = `${t}px`, e.style.height = `${n}px`;
  },
  jIa = e => {
    const t = e.getContext("2d");
    t && t.clearRect(0, 0, e.width, e.height);
  },
  FKn = (e, t, n, r, a, i, o) => {
    i !== "off" && (e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = o, e.beginPath(), i === "thirds" ? (e.moveTo(t + r / 3, n), e.lineTo(t + r / 3, n + a), e.moveTo(t + 2 * r / 3, n), e.lineTo(t + 2 * r / 3, n + a), e.moveTo(t, n + a / 3), e.lineTo(t + r, n + a / 3), e.moveTo(t, n + 2 * a / 3), e.lineTo(t + r, n + 2 * a / 3)) : (e.moveTo(t + r / 2, n), e.lineTo(t + r / 2, n + a), e.moveTo(t, n + a / 2), e.lineTo(t + r, n + a / 2)), e.stroke(), e.restore());
  },
  DIa = (e, t, n, r, a = "off", i = !0) => {
    const o = t.getContext("2d");
    if (!o) return;
    const s = t.width,
      l = t.height;
    o.clearRect(0, 0, s, l);
    const d = n.x * r,
      u = n.y * r,
      h = n.width * r,
      p = n.height * r,
      m = u + p,
      f = d + h,
      y = 12 * r,
      b = Math.max(10, 16 * r);
    o.filter = `blur(${b}px)`, o.drawImage(e, 0, 0, s, l), o.filter = "none", o.fillStyle = "rgba(0, 0, 0, 0.42)", u > 0 && o.fillRect(0, 0, s, u), m < l && o.fillRect(0, m, s, l - m), d > 0 && o.fillRect(0, u, d, p), f < s && o.fillRect(f, u, s - f, p), o.drawImage(e, d, u, h, p, d, u, h, p), i && (o.strokeStyle = "rgba(77, 196, 232, 0.58)", o.lineWidth = r, o.shadowColor = "rgba(32, 188, 230, 0.18)", o.shadowBlur = 10 * r, o.beginPath(), o.roundRect(d, u, h, p, y), o.stroke(), o.shadowColor = "transparent", o.shadowBlur = 0, o.strokeStyle = "rgba(255, 255, 255, 0.08)", o.lineWidth = r, o.beginPath(), o.roundRect(d, u, h, p, y), o.stroke()), FKn(o, d, u, h, p, a, r);
  },
  sze = (e, t, n) => {
    e.fov = t.fov, e.aspect = n, e.near = .1, e.far = 80, e.updateProjectionMatrix();
  },
  ytn = (e, t, n, r, a, i, o, s, l, d = !1, u = null) => {
    d ? sze(n, r, i / o) : IR(n, r, i / o), e.setScissorTest(!1), e.setViewport(0, 0, i, o);
    const h = s == null ? void 0 : s.userData.characterLabels;
    h && h.forEach(m => {
      m.visible = !1;
    }), e.render(t, n), d ? sze(n, r, a.aspect) : IR(n, r, a.aspect);
    const p = PIa(a, o);
    e.setScissorTest(!0), e.setScissor(p.x, p.y, p.width, p.height), e.setViewport(p.x, p.y, p.width, p.height), l && s && yR(s, n, !0, u), e.render(t, n), e.setScissorTest(!1), e.setViewport(0, 0, i, o);
  },
  LIa = {
    run: LKn,
    squat: mIa,
    sit: fIa,
    reach: gIa,
    "single-knee": yIa,
    "double-knee": bIa,
    think: vIa,
    akimbo: wIa,
    wave: xIa,
    t: _Ia
  },
  _L = (e, t, n) => {
    new SKn().load(e, t, void 0, n);
  },
  yDt = 14210252,
  OIa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5W+aUAAAAASUVORK5CYII=",
  zKn = (e = yDt) => new ng({
    color: e,
    roughness: .88,
    metalness: .02,
    flatShading: !1
  }),
  BIa = (e, t = yDt) => {
    e.traverse(n => {
      const r = n;
      if (!r.isMesh) return;
      r.castShadow = !0, r.receiveShadow = !0;
      const a = r.material,
        i = s => {
          var d, u, h, p, m, f, y, b, v, _, w, k;
          const l = s;
          (u = (d = l.map) == null ? void 0 : d.dispose) == null || u.call(d), (p = (h = l.normalMap) == null ? void 0 : h.dispose) == null || p.call(h), (f = (m = l.roughnessMap) == null ? void 0 : m.dispose) == null || f.call(m), (b = (y = l.metalnessMap) == null ? void 0 : y.dispose) == null || b.call(y), (_ = (v = l.aoMap) == null ? void 0 : v.dispose) == null || _.call(v), (k = (w = l.emissiveMap) == null ? void 0 : w.dispose) == null || k.call(w), s.dispose();
        };
      Array.isArray(a) ? a.forEach(i) : a && i(a);
      const o = zKn(t);
      o.userData.tinted = !0, r.material = o;
    });
  },
  FIa = (e, t, n) => {
    const r = new aKn();
    r.setURLModifier(a => !a.startsWith("data:") && !a.startsWith("blob:") && /\.(png|jpe?g|webp|gif|tga|ktx2|basis)(\?|#|$)/i.test(a) ? OIa : a), new fDt(r).load(e, a => {
      BIa(a.scene, yDt), t(a.scene);
    }, void 0, n);
  },
  zIa = (e, t, n) => {
    const r = new fDt();
    r.setCrossOrigin("anonymous"), r.load(e, a => t(a.scene), void 0, n);
  },
  UIa = e => e.scale ?? [1, 1, 1],
  bDt = (e, t) => {
    e.position.set(...t.position), e.rotation.set(...ou(t.rotation));
    const n = UIa(t);
    e.scale.set(n[0], n[1], n[2]);
  },
  f9 = (e, t) => {
    e.userData.objectId = t, e.traverse(n => {
      n.userData.objectId = t;
    });
  },
  vDt = {
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
  p4 = (e, t) => [e[0] + ((t == null ? void 0 : t[0]) ?? 0), e[1] + ((t == null ? void 0 : t[1]) ?? 0), e[2] + ((t == null ? void 0 : t[2]) ?? 0)],
  UKn = e => {
    const t = i1a[e.pose],
      n = e.poseAdjust ?? vDt;
    return {
      body: p4(p4(t.body, ou(n.body)), ou(n.torso ?? [0, 0, 0])),
      head: p4(t.head, ou(n.head)),
      leftArm: p4(t.leftArm, ou(n.leftArm)),
      rightArm: p4(t.rightArm, ou(n.rightArm)),
      leftForearm: p4(t.leftForearm, ou(n.leftForearm)),
      rightForearm: p4(t.rightForearm, ou(n.rightForearm)),
      leftLeg: p4(t.leftLeg, ou(n.leftLeg)),
      rightLeg: p4(t.rightLeg, ou(n.rightLeg)),
      leftShin: p4(t.leftShin, ou(n.leftShin)),
      rightShin: p4(t.rightShin, ou(n.rightShin))
    };
  },
  lze = (e, t = 1) => new ng({
    color: e,
    roughness: .58,
    metalness: .08,
    transparent: t < 1,
    opacity: t
  }),
  jNe = [1.12, .32],
  $Ia = 8.5,
  GIa = .12,
  Bvt = Ovt + .34,
  wDt = e => {
    e.updateMatrixWorld(!0);
    const t = new j0();
    for (const i of e.children) {
      if (i.userData.isCharacterLabel) continue;
      const o = new j0().setFromObject(i);
      o.isEmpty() || t.union(o);
    }
    if (t.isEmpty()) return Bvt;
    const a = new dr(t.max.x, t.max.y, t.max.z).applyMatrix4(e.matrixWorld.clone().invert()).y + GIa;
    return Number.isFinite(a) ? a : Bvt;
  },
  xDt = (e, t) => {
    const n = document.createElement("canvas"),
      r = 3;
    n.width = 256 * r, n.height = 72 * r;
    const a = n.getContext("2d");
    a && (a.fillStyle = "rgba(0,0,0,0.68)", a.strokeStyle = "rgba(96,165,250,0.65)", a.lineWidth = 2 * r, a.roundRect(8 * r, 8 * r, 240 * r, 48 * r, 16 * r), a.fill(), a.stroke(), a.font = `600 ${24 * r}px ui-sans-serif, system-ui, sans-serif`, a.fillStyle = "#e5e7eb", a.textAlign = "center", a.textBaseline = "middle", a.fillText(e, 128 * r, 32 * r, 220 * r));
    const i = new R_e(n);
    i.colorSpace = Nl;
    const o = new Xjt(new HYe({
      map: i,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1
    }));
    o.userData.isCharacterLabel = !0, o.userData.baseScale = [...jNe];
    const s = Number.isFinite(t) ? t : Bvt;
    return o.userData.baseY = s, o.scale.set(jNe[0], jNe[1], 1), o.position.set(0, s, 0), o.renderOrder = 10, o;
  },
  VIa = e => {
    const t = new Xjt(new HYe({
      transparent: !0,
      opacity: 0,
      depthTest: !1,
      depthWrite: !1
    }));
    return t.name = "top-view-pick-target", t.scale.set(1.6, 1.6, 1), t.userData.objectId = e, t.userData.isTopViewPickTarget = !0, t.layers.set(2), t;
  },
  $Kn = e => {
    const t = [];
    return e.traverse(n => {
      n.isSprite && n.userData.isCharacterLabel && t.push(n);
    }), t;
  },
  yR = (e, t, n = !0, r = null) => {
    const i = e.userData.characterLabels ?? $Kn(e);
    if (i.length === 0) return;
    const o = new dr();
    i.forEach(s => {
      const l = !!r && s.userData.objectId === r;
      if (s.visible = n && l, !s.visible) return;
      const d = s.userData.baseY ?? s.position.y;
      s.position.y = d, s.getWorldPosition(o);
      const u = t.position.distanceTo(o),
        h = Mo.clamp(u / $Ia, .38, 2.4),
        p = s.userData.baseScale ?? jNe;
      s.scale.set(p[0] * h, p[1] * h, 1);
    });
  },
  kL = (e, t, n, r, a) => {
    const i = new di(new t$(e, t, 8, 16), n);
    return i.position.set(...r), i.rotation.set(...a), i.castShadow = !0, i;
  },
  HIa = (e, t, n) => {
    const r = new hc(),
      a = lze(e.color, t);
    a.userData.tinted = !0;
    const i = lze("#2a1717", t);
    i.userData.tinted = !1;
    const o = UKn(e),
      s = new di(new qp(.36, 24, 16), i);
    s.scale.set(1, .72, .85), s.position.set(0, .9, 0), s.castShadow = !0;
    const l = new di(new t$(.38, .55, 12, 24), a);
    l.position.set(0, 1.45, 0), l.rotation.set(...o.body), l.scale.set(1.08, 1, .72), l.castShadow = !0;
    const d = new di(new qp(.28, 32, 24), a);
    d.position.set(0, 2.1, 0), d.scale.set(.86, 1.16, .9), d.rotation.set(...o.head), d.castShadow = !0;
    const u = new di(new t$(.12, .08, 8, 8), i);
    return u.position.set(0, 1.83, 0), r.add(s, l, u, d), r.add(kL(.105, .45, a, [-.42, 1.55, 0], o.leftArm)), r.add(kL(.105, .45, a, [.42, 1.55, 0], o.rightArm)), r.add(kL(.085, .42, a, [-.58, 1.18, 0], o.leftForearm)), r.add(kL(.085, .42, a, [.58, 1.18, 0], o.rightForearm)), r.add(kL(.13, .5, a, [-.18, .62, 0], o.leftLeg)), r.add(kL(.13, .5, a, [.18, .62, 0], o.rightLeg)), r.add(kL(.11, .5, a, [-.18, .18, 0], o.leftShin)), r.add(kL(.11, .5, a, [.18, .18, 0], o.rightShin)), n && r.add(xDt(e.name, wDt(r))), bDt(r, e), f9(r, e.id), r;
  },
  WIa = (e, t) => {
    const n = new hc(),
      r = lze(e.color, 1);
    r.userData.tinted = !0;
    const a = new di(new t$(.32, 1.05, 8, 16), r);
    a.position.set(0, 1.05, 0), a.castShadow = !0;
    const i = new di(new qp(.26, 20, 16), r);
    return i.position.set(0, 1.82, 0), i.castShadow = !0, n.add(a, i), t && n.add(xDt(e.name, wDt(n))), bDt(n, e), f9(n, e.id), n;
  },
  Fvt = e => e.toLowerCase().replace(/^mixamorig[:_]?/i, "").replace(/[^a-z0-9]/g, ""),
  gW = e => {
    const t = new Map();
    return e.traverse(n => {
      if (n.isBone) {
        const r = Fvt(n.name),
          a = t.get(r) ?? [];
        a.push(n), t.set(r, a);
      }
    }), t;
  },
  dy = (e, t, n, r = 1) => {
    const a = t.flatMap(o => e.get(o) ?? []);
    if (a.length === 0) return;
    const i = new hl().setFromEuler(new xp(n[0] * r, n[1] * r, n[2] * r, "XYZ"));
    a.forEach(o => {
      o.quaternion.multiply(i), o.updateMatrixWorld(!0);
    });
  },
  HC = e => {
    e.updateMatrixWorld(!0), e.traverse(t => {
      const n = t;
      n.isSkinnedMesh && n.skeleton.update();
    });
  },
  Fw = "#f5c400",
  GV = {
    handL: {
      bones: ["leftshoulder", "leftarm", "leftforearm"],
      effector: "lefthand",
      color: Fw
    },
    handR: {
      bones: ["rightshoulder", "rightarm", "rightforearm"],
      effector: "righthand",
      color: Fw
    },
    footL: {
      bones: ["leftupleg", "leftleg"],
      effector: "leftfoot",
      color: Fw
    },
    footR: {
      bones: ["rightupleg", "rightleg"],
      effector: "rightfoot",
      color: Fw
    }
  },
  yne = [{
    id: "head",
    bones: ["head"],
    color: Fw
  }, {
    id: "waist",
    bones: ["spine2", "spine1", "spine", "chest", "upperchest"],
    color: Fw
  }, {
    id: "elbowL",
    bones: ["leftforearm", "leftlowerarm", "leftelbow"],
    color: Fw
  }, {
    id: "elbowR",
    bones: ["rightforearm", "rightlowerarm", "rightelbow"],
    color: Fw
  }, {
    id: "hipL",
    bones: ["leftupleg", "leftupperleg", "leftthigh"],
    color: Fw
  }, {
    id: "hipR",
    bones: ["rightupleg", "rightupperleg", "rightthigh"],
    color: Fw
  }, {
    id: "kneeL",
    bones: ["leftleg", "leftlowerleg", "leftcalf", "leftshin"],
    color: Fw
  }, {
    id: "kneeR",
    bones: ["rightleg", "rightlowerleg", "rightcalf", "rightshin"],
    color: Fw
  }, {
    id: "wristL",
    bones: ["lefthand"],
    displayBone: "lefthandindex1",
    color: Fw
  }, {
    id: "wristR",
    bones: ["righthand"],
    displayBone: "righthandindex1",
    color: Fw
  }, {
    id: "ankleL",
    bones: ["leftfoot"],
    displayBone: "lefttoeend",
    color: Fw
  }, {
    id: "ankleR",
    bones: ["rightfoot"],
    displayBone: "righttoeend",
    color: Fw
  }],
  nS = (e, t) => {
    var n;
    return (n = e.get(t)) == null ? void 0 : n[0];
  },
  btn = (e, t) => {
    e && e.children.forEach(n => {
      const r = n.userData.ikHandle,
        a = n.userData.ikBone;
      if (r) {
        const i = nS(t, GV[r].effector);
        i && n.position.copy(i.getWorldPosition(new dr()));
      } else if (a) {
        const i = yne.find(l => l.id === a),
          s = (i != null && i.displayBone ? nS(t, i.displayBone) : void 0) ?? (i == null ? void 0 : i.bones.map(l => nS(t, l)).find(l => !!l));
        s && n.position.copy(s.getWorldPosition(new dr()));
      }
    });
  },
  qIa = (e, t, n, r, a = 14) => {
    const i = new dr(),
      o = new dr(),
      s = new dr(),
      l = new dr(),
      d = new hl(),
      u = new hl(),
      h = new hl();
    for (let p = 0; p < a; p++) for (let m = e.length - 1; m >= 0; m--) {
      const f = e[m];
      if (f.updateWorldMatrix(!0, !1), i.setFromMatrixPosition(f.matrixWorld), t.getWorldPosition(o), i.distanceTo(o) < 1e-4 || (s.copy(o).sub(i), l.copy(n).sub(i), s.lengthSq() < 1e-6 || l.lengthSq() < 1e-6)) continue;
      s.normalize(), l.normalize();
      const y = new hl().setFromUnitVectors(s, l);
      f.getWorldQuaternion(d), f.parent && f.parent.getWorldQuaternion(u), u.invert(), h.copy(u).multiply(y).multiply(d), f.quaternion.copy(h), f.updateWorldMatrix(!0, !1);
    }
    HC(r);
  },
  nat = (e, t, n) => {
    if (Math.abs(n) < 1e-4) return;
    const r = e.getWorldQuaternion(new hl()),
      a = new hl().setFromAxisAngle(t, n).multiply(r),
      i = e.parent ? e.parent.getWorldQuaternion(new hl()).invert() : new hl();
    e.quaternion.copy(i.multiply(a)), e.updateWorldMatrix(!0, !1);
  },
  KIa = e => {
    const t = {};
    e.traverse(n => {
      n.isBone && (t[n.uuid] = {
        quaternion: n.quaternion.toArray(),
        position: n.position.toArray()
      });
    }), e.userData.restBonePose = t;
  },
  Ere = e => {
    const t = e.userData.restBonePose;
    t && e.traverse(n => {
      if (!n.isBone) return;
      const r = t[n.uuid];
      r && (n.quaternion.fromArray(r.quaternion), n.position.fromArray(r.position));
    });
  },
  VV = (e, t) => {
    if (!t) return;
    const n = gW(e);
    let r = !1;
    Object.entries(t).forEach(([a, i]) => {
      const o = nS(n, a);
      o && (o.quaternion.fromArray(i), r = !0);
    }), r && HC(e);
  },
  bne = (e, t) => {
    Ere(e);
    const n = UKn(t),
      r = gW(e);
    return r.size === 0 ? !1 : (dy(r, ["spine2", "spine1", "spine", "chest", "upperchest"], n.body, .8), dy(r, ["head", "neck"], n.head, 1), dy(r, ["leftarm", "leftuparm", "leftupperarm", "leftshoulder"], n.leftArm, 1.15), dy(r, ["rightarm", "rightuparm", "rightupperarm", "rightshoulder"], n.rightArm, 1.15), dy(r, ["leftforearm", "leftlowerarm", "leftelbow"], n.leftForearm, 1.2), dy(r, ["rightforearm", "rightlowerarm", "rightelbow"], n.rightForearm, 1.2), dy(r, ["leftupleg", "leftupperleg", "leftthigh"], n.leftLeg, 1.05), dy(r, ["rightupleg", "rightupperleg", "rightthigh"], n.rightLeg, 1.05), dy(r, ["leftleg", "leftlowerleg", "leftcalf", "leftshin"], n.leftShin, 1.1), dy(r, ["rightleg", "rightlowerleg", "rightcalf", "rightshin"], n.rightShin, 1.1), HC(e), !0);
  },
  QIa = e => 1 - (1 - e) ** 3,
  vtn = (e, t, n = .2) => {
    if (n <= 0) {
      t(), e.userData.poseBlend = void 0;
      return;
    }
    const r = [];
    if (e.traverse(o => {
      o.isBone && r.push(o);
    }), r.length === 0) {
      t();
      return;
    }
    const a = r.map(o => o.quaternion.clone());
    t();
    const i = r.map(o => o.quaternion.clone());
    r.forEach((o, s) => o.quaternion.copy(a[s])), e.userData.poseBlend = {
      bones: r,
      from: a,
      to: i,
      elapsed: 0,
      duration: n
    };
  },
  YIa = (e, t) => {
    const n = e.userData.poseBlend;
    if (!n) return !1;
    n.elapsed += t;
    const r = QIa(Math.min(1, n.elapsed / Math.max(.001, n.duration)));
    return n.bones.forEach((a, i) => {
      a.quaternion.slerpQuaternions(n.from[i], n.to[i], r);
    }), HC(e), r >= 1 ? (e.userData.poseBlend = void 0, !1) : !0;
  },
  rat = (e, t) => {
    Ere(e);
    const n = t.poseAdjust ?? vDt,
      r = gW(e);
    return r.size === 0 ? !1 : (dy(r, ["spine2", "spine1", "spine", "chest", "upperchest"], p4(ou(n.body), ou(n.torso ?? [0, 0, 0])), .8), dy(r, ["head", "neck"], ou(n.head), 1), dy(r, ["leftarm", "leftuparm", "leftupperarm", "leftshoulder"], ou(n.leftArm), 1.15), dy(r, ["rightarm", "rightuparm", "rightupperarm", "rightshoulder"], ou(n.rightArm), 1.15), dy(r, ["leftforearm", "leftlowerarm", "leftelbow"], ou(n.leftForearm), 1.2), dy(r, ["rightforearm", "rightlowerarm", "rightelbow"], ou(n.rightForearm), 1.2), dy(r, ["leftupleg", "leftupperleg", "leftthigh"], ou(n.leftLeg), 1.05), dy(r, ["rightupleg", "rightupperleg", "rightthigh"], ou(n.rightLeg), 1.05), dy(r, ["leftleg", "leftlowerleg", "leftcalf", "leftshin"], ou(n.leftShin), 1.1), dy(r, ["rightleg", "rightlowerleg", "rightcalf", "rightshin"], ou(n.rightShin), 1.1), HC(e), !0);
  },
  wtn = (e, t, n) => {
    const r = new hc(),
      a = YYe(t),
      i = (t.animations ?? []).find(p => p.tracks.length > 0 && p.duration > 0);
    if (i) {
      const p = new uDt(a),
        m = p.clipAction(i);
      m.reset(), m.play(), p.setTime(0), p.update(0), m.paused = !0;
    }
    KIa(a);
    const o = Aie(e.pose) ? {
      ...e,
      pose: "stand"
    } : e;
    bne(a, o), a.traverse(p => {
      const m = p;
      if (!m.isMesh) return;
      m.castShadow = !0, m.receiveShadow = !0;
      const f = y => {
        "color" in y && (y.color = new so(e.color)), y.transparent = !1, y.opacity = 1;
      };
      Array.isArray(m.material) ? (m.material = m.material.map(y => y.clone()), m.material.forEach(f)) : m.material && (m.material = m.material.clone(), f(m.material));
    });
    const s = new j0().setFromObject(a),
      l = new dr(),
      d = new dr();
    s.getSize(l), s.getCenter(d);
    const u = Math.max(l.y, .001),
      h = Ovt / u;
    return a.scale.setScalar(h), a.position.sub(d.multiplyScalar(h)), a.position.y += Ovt / 2, r.add(a), n && r.add(xDt(e.name, wDt(r))), VV(a, e.bonePoses), r.userData.characterModel = a, bDt(r, e), f9(r, e.id), r;
  },
  aat = (e, t) => {
    const n = new so(t);
    e.traverse(r => {
      if (r.userData.isOutline) return;
      const a = r;
      if (!a.isMesh) return;
      const i = Array.isArray(a.material) ? a.material : a.material ? [a.material] : [];
      for (const o of i) !o || !("color" in o) || o.userData.tinted && o.color.copy(n);
    }), e.userData.appliedColor = t;
  },
  GG = (e, t) => {
    const n = Mo.clamp(t, 0, 1);
    e.traverse(r => {
      if (r.userData.isOutline) return;
      const i = r.material;
      (Array.isArray(i) ? i : i ? [i] : []).forEach(s => {
        s.userData.directorBaseOpacity == null && (s.userData.directorBaseOpacity = s.opacity, s.userData.directorBaseTransparent = s.transparent, s.userData.directorBaseDepthWrite = s.depthWrite);
        const l = Number(s.userData.directorBaseOpacity ?? 1),
          d = !!s.userData.directorBaseTransparent || n < .999 || l < .999;
        s.transparent !== d && (s.needsUpdate = !0), s.transparent = d, s.opacity = l * n, s.depthWrite = n < .999 ? !1 : !!s.userData.directorBaseDepthWrite;
      });
    }), e.userData.appliedOpacity = n;
  },
  iat = e => {
    var n;
    if (!e) return;
    const t = [];
    e.traverse(r => {
      r.userData.isOutline && t.push(r);
    });
    for (const r of t) {
      (n = r.parent) == null || n.remove(r);
      const a = r;
      (Array.isArray(a.material) ? a.material : a.material ? [a.material] : []).forEach(o => o.dispose());
    }
  },
  XIa = e => {
    const t = e.geometry === "sphere" ? new qp(.55, 32, 24) : e.geometry === "cylinder" ? new lm(.5, .5, 1, 32) : e.geometry === "ring" ? new xS(.5, .16, 16, 48) : e.geometry === "cone" ? new FP(.55, 1.15, 32) : e.geometry === "prism" ? new FP(.58, 1.15, 5) : e.geometry === "empty" ? new fW(.18, 0) : new dl(1, 1, 1),
      n = new di(t, lze(e.color, 1));
    return n.position.set(...e.position), n.rotation.set(...ou(e.rotation)), n.scale.set(...e.scale), n.castShadow = !0, n.receiveShadow = !0, f9(n, e.id), n;
  },
  JIa = e => {
    const t = new hc(),
      n = new so(e.color);
    let r;
    if (e.light === "point") r = new sde(n, e.intensity, e.distance ?? 14, e.decay ?? 2);else if (e.light === "spot") {
      const s = new lDt(n, e.intensity, e.distance ?? 16, Mo.degToRad(e.angle ?? 35), e.penumbra ?? .25, e.decay ?? 2),
        l = new Zc();
      l.position.set(0, 0, -1), t.add(l), s.target = l, r = s;
    } else {
      const s = new pT(n, e.intensity),
        l = new Zc();
      l.position.set(0, 0, -1), t.add(l), s.target = l, r = s;
    }
    r.userData.isDirectorLight = !0, t.add(r);
    const a = new hc();
    a.userData.isDirectorGizmo = !0, a.userData.isLightHelper = !0;
    const i = new uu({
        color: n,
        depthTest: !1,
        transparent: !0,
        opacity: .92
      }),
      o = new di(new qp(.16, 16, 12), i);
    if (a.add(o), e.light !== "point") {
      const s = new di(new lm(.018, .018, .72, 8), i);
      s.rotation.x = Math.PI / 2, s.position.z = -.36, a.add(s);
    }
    if (e.light === "spot") {
      const s = new di(new FP(.28, .55, 16, 1, !0), new uu({
        color: n,
        wireframe: !0,
        depthTest: !1
      }));
      s.rotation.x = Math.PI / 2, s.position.z = -.62, a.add(s);
    }
    return t.add(a), t.position.set(...e.position), t.rotation.set(...ou(e.rotation)), f9(t, e.id), t;
  },
  ZIa = (e, t) => {
    e.traverse(n => {
      var i, o;
      const r = n;
      if (r.userData.isDirectorLight && (r.color.set(t.color), r.intensity = t.intensity, r.isPointLight && (r.distance = t.distance ?? 14, r.decay = t.decay ?? 2), r.isSpotLight)) {
        const s = r;
        s.distance = t.distance ?? 16, s.decay = t.decay ?? 2, s.angle = Mo.degToRad(t.angle ?? 35), s.penumbra = t.penumbra ?? .25;
      }
      const a = n;
      a.isMesh && (n.userData.isLightHelper || (i = n.parent) != null && i.userData.isLightHelper) && ((o = a.material.color) == null || o.set(t.color));
    });
  },
  eCa = (e, t) => {
    const n = new hc(),
      r = YYe(t);
    r.traverse(d => {
      const u = d;
      u.isMesh && (u.castShadow = !0, u.receiveShadow = !0);
    });
    const a = new j0().setFromObject(r),
      i = new dr(),
      o = new dr();
    a.getSize(i), a.getCenter(o);
    const l = 1.6 / Math.max(i.x, i.y, i.z, .001);
    return r.scale.setScalar(l), r.position.x -= o.x * l, r.position.z -= o.z * l, r.position.y -= a.min.y * l, n.add(r), n.position.set(...e.position), n.rotation.set(...ou(e.rotation)), n.scale.set(...e.scale), f9(n, e.id), n;
  },
  tCa = (e, t) => {
    const n = new hc(),
      r = YYe(t),
      a = e.color || "#d8d4cc";
    r.traverse(h => {
      const p = h;
      if (!p.isMesh) return;
      p.castShadow = !0, p.receiveShadow = !0;
      const m = f => {
        const y = f.clone();
        return "color" in y && y.color.set(a), "map" in y && (y.map = null), "vertexColors" in y && (y.vertexColors = !1), y.userData.tinted = !0, y;
      };
      Array.isArray(p.material) ? p.material = p.material.map(m) : p.material ? p.material = m(p.material) : (p.material = zKn(a), p.material.userData.tinted = !0);
    });
    const i = Ejt(e.modelId),
      o = new j0().setFromObject(r),
      s = new dr(),
      l = new dr();
    o.getSize(s), o.getCenter(l);
    const d = i == null ? void 0 : i.targetWidth,
      u = d ? d / Math.max(s.x, s.z, .001) : ((i == null ? void 0 : i.targetHeight) ?? 1) / Math.max(s.y, .001);
    return r.scale.setScalar(u), r.position.x -= l.x * u, r.position.z -= l.z * u, r.position.y -= o.min.y * u, n.add(r), n.position.set(...e.position), n.rotation.set(...ou(e.rotation)), n.scale.set(...e.scale), f9(n, e.id), n;
  },
  nCa = (e, t) => {
    if (t && e.modelUrl) return eCa(e, t);
    if (t) return tCa(e, t);
    const n = new hc(),
      r = new ng({
        color: e.color,
        roughness: .7,
        metalness: .1
      }),
      a = new ng({
        color: new so(e.color).multiplyScalar(.55),
        roughness: .75,
        metalness: .05
      }),
      i = (o, s, l = r) => {
        const d = new di(o, l);
        return d.position.set(...s), d.castShadow = !0, d.receiveShadow = !0, n.add(d), d;
      };
    switch (e.prop) {
      case "chair":
        i(new dl(.5, .08, .5), [0, .45, 0]), i(new dl(.5, .6, .08), [0, .8, -.22]), [[-.2, -.2], [.2, -.2], [-.2, .22], [.2, .22]].forEach(([o, s]) => i(new dl(.06, .45, .06), [o, .22, s], a));
        break;
      case "table":
        i(new dl(1.2, .08, .8), [0, .72, 0]), [[-.52, -.32], [.52, -.32], [-.52, .32], [.52, .32]].forEach(([o, s]) => i(new dl(.08, .7, .08), [o, .35, s], a));
        break;
      case "sofa":
        i(new dl(1.4, .3, .7), [0, .35, 0]), i(new dl(1.4, .55, .18), [0, .62, -.35]), i(new dl(.2, .5, .7), [-.72, .42, 0]), i(new dl(.2, .5, .7), [.72, .42, 0]);
        break;
      case "arch":
        i(new dl(.3, 2.2, .3), [-.9, 1.1, 0]), i(new dl(.3, 2.2, .3), [.9, 1.1, 0]), i(new dl(2.1, .3, .3), [0, 2.2, 0]);
        break;
      case "stairs":
        for (let o = 0; o < 5; o++) i(new dl(.9, .2, .35), [0, .1 + o * .2, .8 - o * .35]);
        break;
      case "door":
        i(new dl(.12, 2, .9), [0, 1, 0]), i(new dl(.2, .1, 1), [0, 2.05, 0]);
        break;
      case "window":
        i(new dl(.1, 1.1, 1.4), [0, 1.4, 0]), i(new dl(.06, 1, 1.3), [0, 1.4, 0], new ng({
          color: "#bfe3f0",
          transparent: !0,
          opacity: .45,
          roughness: .2,
          metalness: .1
        }));
        break;
      case "tree":
        i(new lm(.14, .2, 1.2, 12), [0, .6, 0], a), i(new qp(.75, 18, 14), [0, 1.6, 0]), i(new qp(.5, 16, 12), [.35, 2.1, .1]);
        break;
      case "car":
        i(new dl(1.9, .5, .9), [0, .55, 0]), i(new dl(.9, .4, .8), [-.2, .95, 0], new ng({
          color: "#2c3e50",
          roughness: .35,
          metalness: .4
        })), [[-.6, -.42], [.6, -.42], [-.6, .42], [.6, .42]].forEach(([o, s]) => i(new lm(.22, .22, .12, 18), [o, .22, s], a).rotation.x = Math.PI / 2);
        break;
      case "plant":
        i(new lm(.22, .16, .4, 14), [0, .2, 0], a), i(new qp(.45, 16, 12), [0, .75, 0]), i(new FP(.3, .6, 12), [.2, 1.15, .1]);
        break;
      case "building":
        i(new dl(2.2, 3.2, 1.8), [0, 1.6, 0]), i(new dl(2.4, .2, 2), [0, 3.3, 0], a);
        break;
      case "road":
        i(new dl(4, .08, 2), [0, .04, 0], a), i(new dl(.12, .02, 1.6), [0, .09, 0]);
        break;
    }
    return n.position.set(...e.position), n.rotation.set(...ou(e.rotation)), n.scale.set(...e.scale), f9(n, e.id), n;
  },
  Xme = .1,
  Jme = .85,
  xtn = 16 / 9,
  zvt = "#EFD77A",
  GKn = "#B7A66A",
  VKn = 2.5,
  oat = (e, t, n) => {
    const r = new lu();
    r.position.set(...t), r.lookAt(new dr(...n)), e.position.copy(r.position), e.quaternion.copy(r.quaternion);
  },
  rCa = (e, t) => {
    const n = Mo.degToRad(e),
      r = Math.tan(n * .5),
      a = Xme * r,
      i = a * xtn,
      o = Jme * r,
      s = o * xtn,
      l = [new dr(-i, a, -Xme), new dr(i, a, -Xme), new dr(i, -a, -Xme), new dr(-i, -a, -Xme)],
      d = [new dr(-s, o, -Jme), new dr(s, o, -Jme), new dr(s, -o, -Jme), new dr(-s, -o, -Jme)],
      u = new dr(0, 0, 0),
      h = [l[0], l[1], l[1], l[2], l[2], l[3], l[3], l[0], d[0], d[1], d[1], d[2], d[2], d[3], d[3], d[0], l[0], d[0], l[1], d[1], l[2], d[2], l[3], d[3], u, d[0], u, d[1], u, d[2], u, d[3]],
      p = new mDt();
    p.setPositions(h.flatMap(f => f.toArray()));
    const m = new pDt({
      color: t ? zvt : GKn,
      linewidth: VKn,
      transparent: !0,
      opacity: t ? .1 : .62,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    });
    return new gKn(p, m);
  },
  DNe = 9.2,
  aCa = 1.25,
  $ve = .04,
  iCa = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" stroke="#f4f4f5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M24.5 16a8.5 8.5 0 1 0-2.4 5.9"/><path d="M24.5 11.2V16h-4.8"/><path d="M7.5 16a8.5 8.5 0 0 0 2.4 5.9"/><path d="M7.5 20.8V16H12.3"/></g><circle cx="16" cy="16" r="1.6" fill="#f4f4f5"/></svg>')}") 16 16, grab`,
  sat = e => e === "rotate" ? iCa : "ew-resize",
  HKn = e => {
    const t = e.lookAt[0] - e.position[0],
      n = e.lookAt[2] - e.position[2];
    return Math.hypot(t, n) < .001 ? 0 : Math.atan2(-t, -n);
  },
  WKn = (e, t) => {
    e.position.set(t.position[0], $ve, t.position[2]), e.rotation.set(0, HKn(t), 0);
  },
  LNe = (e, t, n) => {
    const r = HKn(e),
      a = Math.cos(r),
      i = Math.sin(r);
    return new dr(e.position[0] + a * t + i * n, $ve + .04, e.position[2] - i * t + a * n);
  },
  oCa = e => {
    const t = Math.tan(Mo.degToRad(e.fov * .5)) * DNe,
      n = .38;
    return {
      rotate: LNe(e, 0, -.33),
      left: LNe(e, -t * n, -DNe * n),
      right: LNe(e, t * n, -DNe * n)
    };
  },
  sCa = (e, t, n, r, a = .09) => {
    const i = new Fd();
    return i.setAttribute("position", new Al([-e * .5, a, n, e * .5, a, n, t * .5, a, r, -t * .5, a, r], 3)), i.setIndex([0, 1, 2, 0, 2, 3]), i.computeVertexNormals(), i;
  },
  lCa = (e, t, n, r = .095) => {
    const a = new Fd();
    return a.setAttribute("position", new Al([-e * .5, r, t, e * .5, r, t, 0, r, n], 3)), a.setIndex([0, 1, 2]), a.computeVertexNormals(), a;
  },
  cCa = (e, t, n, r = .02) => {
    const a = new Qqn(),
      i = e * .5,
      o = t * .5,
      s = Math.min(n, i, o);
    a.moveTo(-i + s, -o), a.lineTo(i - s, -o), a.quadraticCurveTo(i, -o, i, -o + s), a.lineTo(i, o - s), a.quadraticCurveTo(i, o, i - s, o), a.lineTo(-i + s, o), a.quadraticCurveTo(-i, o, -i, o - s), a.lineTo(-i, -o + s), a.quadraticCurveTo(-i, -o, -i + s, -o);
    const l = new aDt(a);
    return l.rotateX(-Math.PI / 2), l.translate(0, r, 0), l;
  },
  dCa = (e, t) => {
    const n = new hc();
    n.userData.isTopViewCameraRepresentation = !0;
    const r = new so(t ? "#EFD77A" : "#B7A66A"),
      a = new so(t ? "#F6E4A2" : "#C4B07A"),
      i = new so(t ? "#EFD77A" : "#A8945C"),
      o = new uu({
        color: r,
        transparent: !0,
        opacity: t ? .92 : .78,
        depthWrite: !1,
        side: _y
      }),
      s = new uu({
        color: a,
        transparent: !0,
        opacity: t ? .95 : .82,
        depthWrite: !1,
        side: _y
      }),
      l = new di(cCa(.52, .4, .08, .02), o);
    l.position.set(0, 0, .28), l.renderOrder = 21, n.add(l);
    const d = new di(sCa(.34, .42, .08, -.16, .022), s);
    d.renderOrder = 22, n.add(d);
    const u = new di(lCa(.28, -.18, -.48, .028), new uu({
      color: i,
      transparent: !0,
      opacity: t ? .98 : .9,
      depthTest: !1,
      depthWrite: !1,
      side: _y
    }));
    u.renderOrder = 23, u.userData.topCameraControl = "rotate", n.add(u);
    const h = t ? DNe : aCa,
      p = Math.tan(Mo.degToRad(e.fov * .5)) * h,
      m = -.48,
      f = new Fd();
    f.setAttribute("position", new Al([0, .018, m, -p, .018, -h, p, .018, -h], 3)), f.setIndex([0, 1, 2]), f.computeVertexNormals();
    const y = new so(t ? zvt : GKn),
      b = new di(f, new Mx({
        uniforms: {
          tint: {
            value: y
          },
          nearOpacity: {
            value: t ? .22 : .12
          },
          farOpacity: {
            value: t ? .04 : .02
          },
          apexZ: {
            value: m
          },
          endZ: {
            value: -h
          }
        },
        vertexShader: `
            varying float vFade;
            uniform float apexZ;
            uniform float endZ;
            void main() {
                vFade = clamp((position.z - apexZ) / (endZ - apexZ), 0.0, 1.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying float vFade;
            uniform vec3 tint;
            uniform float nearOpacity;
            uniform float farOpacity;
            void main() {
                float eased = smoothstep(0.0, 1.0, vFade);
                gl_FragColor = vec4(tint, mix(nearOpacity, farOpacity, eased));
            }
        `,
        transparent: !0,
        side: _y,
        depthTest: !0,
        depthWrite: !1,
        toneMapped: !1
      }));
    b.renderOrder = 8, n.add(b);
    const v = [new dr(0, .03, m), new dr(-p, .03, -h), new dr(0, .03, m), new dr(p, .03, -h)],
      _ = new mDt();
    _.setPositions(v.flatMap(S => S.toArray()));
    const w = y.clone().offsetHSL(0, 0, .1),
      k = y.clone().multiplyScalar(.45);
    _.setColors([w.r, w.g, w.b, k.r, k.g, k.b, w.r, w.g, w.b, k.r, k.g, k.b]);
    const A = new gKn(_, new pDt({
      vertexColors: !0,
      linewidth: VKn,
      transparent: !0,
      opacity: t ? .72 : .42,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }));
    if (A.renderOrder = 12, n.add(A), t) {
      const S = new uu({
          color: zvt,
          depthTest: !1,
          depthWrite: !1
        }),
        C = new uu({
          color: "#2a2618",
          depthTest: !1,
          depthWrite: !1
        }),
        I = .38,
        E = new dr(0, 1, 0),
        M = (T, P) => {
          const R = new hc();
          R.position.set(P * I, .06, -h * I);
          const j = new dr(P, 0, -h).normalize();
          R.quaternion.setFromUnitVectors(E, j);
          const B = new di(new t$(.075, .25, 5, 10), S);
          B.renderOrder = 25;
          const F = new di(new t$(.042, .19, 5, 10), C);
          F.position.y = -.006, F.renderOrder = 26, R.userData.topCameraControl = T === "left" ? "fov-left" : "fov-right", R.add(B, F), n.add(R);
        };
      M("left", -p), M("right", p);
    }
    return WKn(n, e), f9(n, e.id), n;
  },
  uCa = (e, t, n = !1) => {
    if (n) return dCa(e, t);
    const r = new hc(),
      a = t ? "#38bdf8" : e.color,
      i = new ng({
        color: a,
        roughness: .5,
        metalness: .25
      }),
      o = new ng({
        color: "#23272f",
        roughness: .4,
        metalness: .6
      }),
      s = new ng({
        color: "#0b0e13",
        roughness: .25,
        metalness: .7
      }),
      l = .6,
      d = new hc(),
      u = new di(new dl(.4, .28, .52), i);
    u.position.set(0, .05, .2), u.castShadow = !0, d.add(u);
    const h = new di(new lm(.1, .115, .3, 20), s);
    h.rotation.x = Math.PI / 2, h.position.set(0, .05, -.12), h.castShadow = !0, d.add(h);
    const p = new di(new xS(.1, .018, 12, 24), o);
    p.position.set(0, .05, -.27), d.add(p);
    const m = new di(new dl(.16, .1, .16), o);
    m.position.set(0, .24, .16), m.castShadow = !0, d.add(m);
    const f = new di(new dl(.12, .07, .28), i);
    f.position.set(0, .33, .02), d.add(f), d.scale.setScalar(l), d.userData.gizmoPivotRoot = !0;
    const y = rCa(e.fov, t);
    return y.userData.isHelper = !0, r.add(d, y), BKn(r, e), f9(r, e.id), r;
  },
  qKn = g.forwardRef(({
    objects: e,
    selectedId: t,
    settings: n,
    viewMode: r,
    tool: a,
    aspectRatio: i,
    playing: o = !1,
    playheadFrame: s = 0,
    totalFrames: l = 1,
    timelineCameraId: d = null,
    onSelect: u,
    onObjectTransform: h,
    onBlankClick: p,
    onStandingReady: m,
    livePreviewCameraId: f = null,
    pipPreviewCanvasRef: y,
    panelPreviewCanvasRef: b,
    lockCameraToView: v = !1,
    transformSpace: _ = "world",
    isolatedId: w = null,
    hideChrome: k = !1,
    controlCharacterId: A = null,
    characterAnimationId: S = null,
    onControlTick: C,
    cameraKeyframes: I = [],
    objectKeyframes: E = [],
    pathDraft: M = null,
    onPathGesture: T,
    objectPathDraft: P = null,
    onObjectPathGesture: R,
    onPathFinish: j,
    previewSize: B
  }, F) => {
    const N = g.useRef(null),
      G = g.useRef(null),
      z = g.useRef(null),
      V = g.useRef(null),
      O = g.useRef(null),
      L = g.useRef(null),
      D = g.useRef(null),
      U = g.useRef(null),
      H = g.useRef(null),
      Y = g.useRef(null),
      K = g.useRef(null),
      W = g.useRef(!1),
      Q = g.useRef(null),
      q = g.useRef(null),
      ne = g.useRef(null),
      de = g.useRef(null),
      le = g.useRef(null),
      J = g.useRef([]),
      pe = g.useRef(null),
      ce = g.useRef({}),
      we = g.useRef(new Map()),
      X = g.useRef(new Set()),
      Z = g.useRef(new Map()),
      re = g.useRef(new Set()),
      fe = g.useRef(new Map()),
      ye = g.useRef(new Set()),
      ie = g.useRef(null),
      ae = g.useRef(new Set()),
      be = g.useRef(null),
      Ee = g.useRef(!1),
      xe = g.useRef(!1),
      he = g.useRef(0),
      ue = g.useRef(!1),
      ge = g.useRef(null),
      _e = g.useRef(null),
      ke = g.useRef(!1),
      ve = g.useRef(null),
      Te = g.useRef(!1),
      Ne = g.useRef(new Map()),
      me = g.useRef(new Set()),
      Ae = g.useRef(null),
      Fe = g.useRef(null),
      Me = g.useRef(null),
      Re = g.useRef(() => null),
      $e = g.useRef(!1),
      rt = g.useRef(null),
      nt = g.useRef(new Set()),
      ze = g.useRef(!1),
      Le = g.useRef(new Map()),
      Ke = g.useRef(0),
      Xe = g.useRef(new Map()),
      De = g.useRef(null),
      Ye = g.useRef(null),
      Ce = g.useRef(null),
      He = g.useRef(null),
      Ve = g.useRef(null),
      it = g.useRef(null),
      It = g.useRef(null),
      Ft = g.useRef(null),
      We = g.useRef(null),
      Ze = g.useRef(null),
      Ge = g.useRef(null),
      Oe = g.useRef(null),
      st = g.useRef(a),
      vt = g.useRef(null),
      Ht = g.useRef(null),
      nn = g.useRef(null),
      pt = g.useRef(null),
      lt = g.useRef(0),
      gt = g.useRef({
        x: 0,
        y: 0
      }),
      Ut = g.useRef(null),
      _t = g.useRef(null),
      At = g.useRef(null),
      Yt = g.useRef(null),
      qe = g.useRef(new Map()),
      [kt, St] = g.useState(0),
      [hn, Qt] = g.useState(0),
      Ot = g.useRef(t),
      ln = g.useRef(e),
      Pn = g.useRef(r),
      rn = g.useRef(i),
      Yn = g.useRef(n),
      Ct = g.useRef(d),
      Cn = g.useRef(o),
      un = g.useRef(v),
      Jn = g.useRef(w),
      Kn = g.useRef(k),
      en = g.useRef(A),
      Vn = g.useRef(S),
      Tt = g.useRef(h),
      Ue = g.useRef(C),
      et = g.useRef(null),
      ft = g.useRef(null),
      ht = g.useRef(f),
      wt = g.useRef(M),
      jt = g.useRef(T),
      bt = g.useRef(P),
      Bt = g.useRef(R),
      wn = g.useRef(j),
      at = g.useRef(null),
      Pt = g.useRef(null),
      dt = g.useRef({
        w: 320,
        h: 180
      });
    Ot.current = t, ln.current = e, Pn.current = r, rn.current = i, st.current = a, Yn.current = n, Ct.current = d, Cn.current = o, un.current = v, Jn.current = w, Kn.current = k, en.current = A, Vn.current = S, Tt.current = h, Ue.current = C;
    const xt = () => !!Yn.current.showLabels,
      yn = g.useRef(y),
      gn = g.useRef(b);
    ht.current = f, wt.current = M, jt.current = T, bt.current = P, Bt.current = R, wn.current = j, dt.current = B ?? {
      w: 320,
      h: 180
    }, yn.current = y, gn.current = b, g.useEffect(() => {
      var _n;
      const jn = (_n = V.current) == null ? void 0 : _n.domElement;
      jn && (jn.style.cursor = r === "top" ? "grab" : "");
    }, [r]), g.useEffect(() => {
      var _n;
      let jn = !1;
      return (_n = ie.current) == null || _n.dispose(), ie.current = null, n.panoramaImageUrl ? (new sD().load(n.panoramaImageUrl, ar => {
        if (jn) {
          ar.dispose();
          return;
        }
        ar.colorSpace = Nl, ie.current = ar, Qt(Vt => Vt + 1);
      }, void 0, () => {
        jn || Qt(ar => ar + 1);
      }), () => {
        jn = !0;
      }) : (Qt(ar => ar + 1), () => {
        jn = !0;
      });
    }, [n.panoramaImageUrl]), g.useEffect(() => {
      var _n;
      let jn = !1;
      return (_n = Ft.current) == null || _n.dispose(), Ft.current = null, n.referenceImageUrl ? (new sD().load(n.referenceImageUrl, ar => {
        if (jn) {
          ar.dispose();
          return;
        }
        ar.colorSpace = Nl, Ft.current = ar, Qt(Vt => Vt + 1);
      }, void 0, () => {
        jn || Qt(ar => ar + 1);
      }), () => {
        jn = !0;
      }) : (Qt(ar => ar + 1), () => {
        jn = !0;
      });
    }, [n.referenceImageUrl]);
    const mt = () => {
      const jn = Yn.current,
        _n = Ze.current,
        ar = Ge.current,
        Vt = Oe.current,
        vn = V.current;
      if (!(!_n || !vn)) {
        if (_n.color.set(jn.ambientColor ?? "#ffffff"), _n.intensity = jn.ambientIntensity ?? .58, ar) {
          ar.color.set(jn.keyColor ?? "#ffffff"), ar.intensity = jn.keyIntensity ?? 1.4;
          const An = Mo.degToRad(jn.keyAzimuth ?? 39),
            ur = Mo.degToRad(jn.keyElevation ?? 51);
          ar.position.set(Math.cos(An) * Math.cos(ur) * 10, Math.sin(ur) * 10, Math.sin(An) * Math.cos(ur) * 10);
        }
        Vt && (Vt.color.set(jn.fillColor ?? "#a9c2c6"), Vt.intensity = jn.fillIntensity ?? .5), vn.toneMappingExposure = jn.exposure ?? 1;
      }
    };
    g.useEffect(() => () => {
      var jn, _n;
      (jn = ie.current) == null || jn.dispose(), ie.current = null, (_n = Ft.current) == null || _n.dispose(), Ft.current = null, We.current = null;
    }, []);
    const Xt = () => {
        const jn = be.current;
        jn && (be.current = null, Tt.current(jn.id, jn.patch, !1));
      },
      Gn = () => {
        const jn = new Map(ln.current.map(An => [An.id, An])),
          _n = An => An.kind === "camera" && JTe(An, jn),
          ar = Yt.current;
        if (ar) {
          const An = ln.current.find(ur => ur.id === ar.cameraId && _n(ur));
          if (An) return {
            ...An,
            position: [...ar.position],
            lookAt: [...ar.lookAt],
            fov: ar.fov
          };
        }
        const Vt = Ct.current;
        if (Vt) {
          const An = ln.current.find(ur => ur.id === Vt && _n(ur));
          if (An) return An;
        }
        return Cn.current ? ln.current.find(_n) : ln.current.find(An => An.id === Ot.current && _n(An)) ?? ln.current.find(_n);
      },
      rr = () => {
        $e.current || rt.current === null && (rt.current = window.setTimeout(() => {
          rt.current = null, !$e.current && St(jn => jn + 1);
        }, 100));
      },
      qn = jn => {
        if (ce.current[jn] || nt.current.has(jn)) return;
        const _n = LIa[jn];
        nt.current.add(jn), _L(_n, ar => {
          ce.current[jn] = ar, nt.current.delete(jn), rr();
        }, () => {
          nt.current.delete(jn);
        });
      },
      Dn = () => {
        _e.current || ke.current || (ke.current = !0, _L(LKn, jn => {
          _e.current = jn;
        }, () => {
          ke.current = !1;
        }));
      },
      Ar = () => {
        ve.current || Te.current || (Te.current = !0, _L(pIa, jn => {
          ve.current = jn;
        }, () => {
          Te.current = !1;
        }));
      },
      _r = jn => {
        const _n = jn.userData.locomotion,
          ar = ve.current;
        if (_n) return !_n.idle && ar && $5a(_n, ar) && _n.current === "idle" && q8e(_n, "idle"), _n;
        const Vt = jn.userData.characterModel,
          vn = _e.current;
        if (!Vt || !vn) return Dn(), Ar(), null;
        Ar();
        const An = U5a(Vt, vn, ar);
        if (An) {
          const ur = ce.current.squat;
          ur && itn(An, ur, .92), jn.userData.locomotion = An;
        }
        return An;
      };
    Re.current = _r;
    const Pa = (jn = !0) => {
        const _n = Ae.current;
        if (!_n || (_n.action.stop(), _n.mixer.stopAllAction(), _n.mixer.uncacheRoot(_n.model), Ae.current = null, !jn)) return;
        const ar = ln.current.find(An => An.id === _n.characterId),
          Vt = Le.current.get(_n.characterId),
          vn = Vt == null ? void 0 : Vt.userData.characterModel;
        !vn || (ar == null ? void 0 : ar.kind) !== "character" || (Ere(vn), vn.userData.sampledPose ? rat(vn, ar) : bne(vn, ar), VV(vn, ar.bonePoses), HC(vn));
      },
      fa = (jn, _n, ar, Vt = "loop", vn = !1) => {
        const An = Le.current.get(jn),
          ur = An == null ? void 0 : An.userData.characterModel,
          zr = (ar.animations ?? []).find(pa => pa.tracks.length > 0 && pa.duration > .05);
        if (!An || !ur || !zr) return !1;
        const Dr = Ae.current;
        if ((Dr == null ? void 0 : Dr.characterId) === jn && Dr.animationId === _n && Dr.model === ur && Dr.mode === Vt) return Dr.timelineDriven = vn, !0;
        Pa(!0);
        const Wr = An.userData.locomotion;
        nte(Wr), An.userData.locomotion = void 0, Ere(ur);
        const gr = B_e(zr);
        gr.name = `director-library-${_n}`;
        const jr = new uDt(ur),
          ea = jr.clipAction(gr);
        return ea.enabled = !0, ea.clampWhenFinished = Vt === "once", ea.setLoop(Vt === "loop" ? Iie : $jt, Vt === "loop" ? 1 / 0 : 1), ea.reset().play(), jr.update(0), Ae.current = {
          characterId: jn,
          animationId: _n,
          model: ur,
          mixer: jr,
          action: ea,
          mode: Vt,
          timelineDriven: vn
        }, !0;
      },
      Ca = (jn, _n) => {
        if (Fe.current !== _n || !fa(_n.characterId, _n.animationId, jn, _n.mode, !0)) return;
        const ar = Ae.current;
        !ar || ar.characterId !== _n.characterId || ar.animationId !== _n.animationId || (ar.mixer.setTime(Math.max(0, _n.timeSeconds)), HC(ar.model));
      };
    g.useEffect(() => {
      var ur;
      let jn = !1;
      const _n = A,
        ar = jvt(S);
      if (!_n || !ar) return (ur = Ae.current) != null && ur.timelineDriven || Pa(!0), () => {
        jn = !0;
      };
      const Vt = Ae.current;
      Vt && (Vt.characterId !== _n || Vt.animationId !== ar.id) && Pa(!0);
      const vn = zr => {
          jn || en.current !== _n || Vn.current !== ar.id || fa(_n, ar.id, zr);
        },
        An = Ne.current.get(ar.id);
      return An ? (vn(An), () => {
        jn = !0;
      }) : (me.current.has(ar.id) || (me.current.add(ar.id), _L(ar.url, zr => {
        me.current.delete(ar.id), Ne.current.set(ar.id, zr);
        const Dr = Fe.current;
        (Dr == null ? void 0 : Dr.animationId) === ar.id && Ca(zr, Dr), vn(zr), St(Wr => Wr + 1);
      }, () => {
        me.current.delete(ar.id);
      })), () => {
        jn = !0;
      });
    }, [S, A, kt]), g.useEffect(() => () => {
      Pa(!1), Fe.current = null, Ne.current.clear(), me.current.clear();
    }, []), g.useEffect(() => {
      var _n;
      const jn = Me.current;
      if (jn && jn !== A) {
        ((_n = Ae.current) == null ? void 0 : _n.characterId) === jn && !Ae.current.timelineDriven && Pa(!1);
        const ar = Le.current.get(jn),
          Vt = et.current;
        Vt && (et.current = null, Tt.current(Vt.id, {
          position: Vt.position,
          ...(Vt.rotation ? {
            rotation: Vt.rotation
          } : {}),
          ...(Vt.pose ? {
            pose: Vt.pose
          } : {})
        }, !1));
        const vn = ge.current;
        vn && ar && (ar.position.y = vn.groundY), ge.current = null, xe.current = !1, he.current = 0, ue.current = !1, ft.current = null;
        const An = ar == null ? void 0 : ar.userData.locomotion;
        nte(An);
        const ur = ar == null ? void 0 : ar.userData.characterModel,
          zr = ln.current.find(Dr => Dr.id === jn);
        ur && (zr == null ? void 0 : zr.kind) === "character" && (Ere(ur), bne(ur, {
          ...zr,
          pose: "stand"
        }), VV(ur, zr.bonePoses), HC(ur)), ar && (ar.userData.locomotion = void 0);
      }
      Me.current = A, A && (Dn(), Ar(), qn("squat"));
    }, [A]);
    const $n = jn => {
        !jn || fe.current.has(jn) || ye.current.has(jn) || (ye.current.add(jn), _L(jn, _n => {
          fe.current.set(jn, _n), ye.current.delete(jn), rr();
        }, () => {
          ye.current.delete(jn);
        }));
      },
      yr = jn => {
        if (!jn || we.current.has(jn) || X.current.has(jn)) return;
        const _n = Ejt(jn);
        _n && (X.current.add(jn), FIa(Zva(_n.file), ar => {
          we.current.set(jn, ar), X.current.delete(jn), rr();
        }, () => {
          X.current.delete(jn);
        }));
      },
      Ir = jn => {
        const _n = String(jn || "").trim();
        !_n || Z.current.has(_n) || re.current.has(_n) || (re.current.add(_n), zIa(_n, ar => {
          Z.current.set(_n, ar), re.current.delete(_n), rr();
        }, () => {
          re.current.delete(_n);
        }));
      },
      Gr = jn => {
        var Vt;
        const _n = Pn.current === "camera";
        (Vt = le.current) == null || Vt.traverse(vn => {
          if (vn.userData.isDirectorGizmo) {
            if (!jn) {
              vn.visible = !1;
              return;
            }
            if (_n) {
              if (vn === Ve.current) {
                vn.visible = !1;
                return;
              }
              if (vn.userData.isLightHelper) {
                vn.visible = !1;
                return;
              }
              const An = vn.userData.objectId;
              if (An) {
                const ur = ln.current.find(zr => zr.id === An);
                if ((ur == null ? void 0 : ur.kind) === "camera") {
                  vn.visible = !1;
                  return;
                }
              }
            }
            vn.visible = !0;
          }
        });
        const ar = ne.current;
        if (ar) {
          const vn = jn && Pn.current === "director" && !Cn.current && !!ar.object && st.current !== "pose" && !en.current;
          ar.getHelper().visible = vn;
        }
        vt.current && (vt.current.visible = jn && nn.current !== null && !en.current);
      },
      Zr = (jn, _n, ar, Vt) => {
        const vn = G.current,
          An = V.current;
        if (!vn || !An) return;
        NIa(vn, _n, ar, Vt);
        const ur = Yn.current.compositionGuides ?? "off",
          zr = Yn.current.showCanvasMask === !1 ? null : jn;
        if (!zr) {
          if (ur === "off" || Pn.current !== "camera") {
            jIa(vn);
            return;
          }
          const Dr = vn.getContext("2d");
          if (!Dr) return;
          Dr.clearRect(0, 0, vn.width, vn.height), FKn(Dr, 0, 0, vn.width, vn.height, ur, Vt);
          return;
        }
        DIa(An.domElement, vn, zr, Vt, ur, !Kn.current);
      },
      La = () => {
        const jn = N.current,
          _n = V.current,
          ar = O.current,
          Vt = le.current;
        if (!jn || !_n || !ar) return {
          frame: null
        };
        const vn = jn.clientWidth,
          An = Math.max(jn.clientHeight, 1),
          ur = DEr();
        _n.setPixelRatio(ur), _n.shadowMap.needsUpdate = !0, _n.setSize(vn, An, !1), _n.setClearColor(new so(Yn.current.skyColor)), Gr(!1);
        const zr = jr => jr.layers.disable(lde);
        if (L.current && zr(L.current), D.current && zr(D.current), U.current && zr(U.current), Pn.current === "top") {
          const jr = D.current;
          if (!jr) return {
            frame: null
          };
          _n.setClearColor(new so("#030507")), tat(jr, vn, An), _n.setScissorTest(!1), _n.setViewport(0, 0, vn, An);
          const ea = ar.fog;
          return ar.fog = null, Vt && yR(Vt, jr, xt(), Ot.current), _n.render(ar, jr), ar.fog = ea, {
            frame: null
          };
        }
        if (Pn.current !== "camera") {
          const jr = L.current;
          return jr ? (jr.aspect = vn / An, jr.updateProjectionMatrix(), _n.setScissorTest(!1), _n.setViewport(0, 0, vn, An), Vt && yR(Vt, jr, xt(), Ot.current), _n.render(ar, jr), {
            frame: Yme(vn, An, rn.current)
          }) : {
            frame: null
          };
        }
        const Dr = Gn();
        if (!Dr) {
          const jr = L.current;
          return jr ? (jr.aspect = vn / An, jr.updateProjectionMatrix(), _n.setScissorTest(!1), _n.setViewport(0, 0, vn, An), Vt && yR(Vt, jr, xt(), Ot.current), _n.render(ar, jr), {
            frame: null
          }) : {
            frame: null
          };
        }
        U.current || (U.current = new lu(50, vn / An, .1, 80));
        const Wr = U.current,
          gr = Yme(vn, An, rn.current);
        return gr ? (ytn(_n, ar, Wr, Dr, gr, vn, An, Vt, xt(), !1, Ot.current), {
          frame: gr
        }) : (IR(Wr, Dr, vn / An), _n.setScissorTest(!1), _n.setViewport(0, 0, vn, An), Vt && yR(Vt, Wr, xt(), Ot.current), _n.render(ar, Wr), {
          frame: null
        });
      },
      sa = () => {
        var ea;
        const jn = N.current,
          _n = V.current,
          ar = O.current,
          Vt = L.current,
          vn = le.current;
        if (!jn || !_n || !ar || !Vt) return {
          camera: Vt,
          frame: null
        };
        const An = jn.clientWidth,
          ur = Math.max(jn.clientHeight, 1),
          zr = 1;
        if (_n.getPixelRatio() !== zr && _n.setPixelRatio(zr), (_n.domElement.width !== An || _n.domElement.height !== ur) && _n.setSize(An, ur, !1), _n.shadowMap.needsUpdate = !0, _n.setClearColor(new so(Yn.current.skyColor)), Q8e(Vt, Yn.current, Cn.current), D.current && Q8e(D.current, Yn.current, Cn.current), U.current && Q8e(U.current, Yn.current, Cn.current), (ea = U.current) == null || ea.layers.disable(lde), at.current && X5a(at.current, Vt), Pn.current === "camera" && (Le.current.forEach((pa, Br) => {
          const tn = ln.current.find(Lr => Lr.id === Br);
          (tn == null ? void 0 : tn.kind) === "camera" && (pa.visible = !1);
        }), Ve.current && (Ve.current.visible = !1)), Pn.current === "top") {
          const pa = D.current;
          if (!pa) return {
            camera: Vt,
            frame: null
          };
          tat(pa, An, ur), _n.setScissorTest(!1), _n.setViewport(0, 0, An, ur), H.current = null;
          const Br = ar.fog;
          return ar.fog = null, vn && yR(vn, pa, xt(), Ot.current), _n.render(ar, pa), ar.fog = Br, Zr(null, An, ur, zr), {
            camera: pa,
            frame: null
          };
        }
        if (Pn.current !== "camera") {
          Vt.aspect = An / ur, Vt.updateProjectionMatrix(), _n.setScissorTest(!1), _n.setViewport(0, 0, An, ur), H.current = null, vn && yR(vn, Vt, xt(), Ot.current), _n.render(ar, Vt);
          const pa = Yme(An, ur, rn.current);
          return Zr(pa, An, ur, zr), {
            camera: Vt,
            frame: null
          };
        }
        const Dr = Gn();
        if (!Dr) return H.current = null, Vt.aspect = An / ur, Vt.updateProjectionMatrix(), _n.setScissorTest(!1), _n.setViewport(0, 0, An, ur), _n.render(ar, Vt), Zr(null, An, ur, zr), {
          camera: Vt,
          frame: null
        };
        U.current || (U.current = new lu(50, An / ur, .1, 80));
        const Wr = U.current,
          gr = Yme(An, ur, rn.current);
        H.current = gr;
        const jr = !!(W.current || be.current);
        return gr ? (ytn(_n, ar, Wr, Dr, gr, An, ur, vn, xt(), jr, Ot.current), Zr(gr, An, ur, zr), {
          camera: Wr,
          frame: gr
        }) : (jr ? sze(Wr, Dr, An / ur) : IR(Wr, Dr, An / ur), _n.setScissorTest(!1), _n.setViewport(0, 0, An, ur), vn && yR(vn, Wr, xt(), Ot.current), _n.render(ar, Wr), Zr(null, An, ur, zr), {
          camera: Wr,
          frame: null
        });
      },
      Ea = () => {
        const jn = L.current;
        if (Pn.current === "top") return D.current ?? jn;
        if (Pn.current !== "camera") return jn;
        const _n = Gn();
        if (!_n) return jn;
        const ar = N.current;
        if (!ar) return jn;
        const Vt = ar.clientWidth,
          vn = Math.max(ar.clientHeight, 1);
        U.current || (U.current = new lu(50, Vt / vn, .1, 80));
        const An = U.current,
          ur = Yme(Vt, vn, rn.current),
          zr = (ur == null ? void 0 : ur.aspect) ?? Vt / vn;
        return W.current || be.current ? sze(An, _n, zr) : IR(An, _n, zr), An;
      };
    g.useImperativeHandle(F, () => ({
      getPlanViewZoom: () => {
        var jn;
        return ((jn = D.current) == null ? void 0 : jn.zoom) ?? 1;
      },
      rotatePlanView: jn => ki(jn),
      zoomPlanView: jn => Wn(jn),
      resetPlanView: () => wr(),
      capture: () => {
        const jn = V.current;
        if (!jn) return null;
        try {
          const {
            frame: _n
          } = La();
          return _n ? RIa(jn.domElement, _n, jn.getPixelRatio()) : jn.domElement.toDataURL("image/png");
        } finally {
          Gr(!0), sa();
        }
      },
      resetView: () => {
        if (Pn.current === "top") {
          const ar = D.current,
            Vt = q.current;
          if (!ar || !Vt) return;
          ar.position.set(0, X8e, 0), ar.zoom = 1, Vt.target.set(0, 0, 0), ar.updateProjectionMatrix(), Vt.update();
          return;
        }
        const jn = L.current,
          _n = Y.current;
        !jn || !_n || (jn.position.set(...Zrt), _n.target.set(...eat), _n.update());
      },
      focusObject: jn => {
        const _n = ln.current.find(ur => ur.id === jn);
        if (!_n) return;
        if (Pn.current === "top") {
          const ur = D.current,
            zr = q.current;
          if (!ur || !zr) return;
          const Dr = ur.position.x - zr.target.x,
            Wr = ur.position.z - zr.target.z;
          zr.target.set(_n.position[0], 0, _n.position[2]), ur.position.set(_n.position[0] + Dr, X8e, _n.position[2] + Wr), zr.update();
          return;
        }
        const ar = L.current,
          Vt = Y.current;
        if (!ar || !Vt) return;
        const vn = new dr(..._n.position);
        Vt.target.copy(vn);
        const An = ar.position.clone().sub(vn);
        An.lengthSq() < 1e-4 && An.set(0, 0, 1), An.normalize(), ar.position.copy(vn.clone().add(An.multiplyScalar(6))), Vt.update();
      },
      captureCameraPreview: jn => {
        const _n = V.current,
          ar = O.current,
          Vt = le.current,
          vn = ln.current.find(pa => pa.kind === "camera" && pa.id === jn);
        if (!_n || !ar || !vn) return null;
        U.current || (U.current = new lu(50, 16 / 9, .1, 80));
        const An = U.current,
          ur = N.current;
        if (!ur) return null;
        const zr = Math.max(1, ur.clientWidth),
          Dr = Math.max(1, ur.clientHeight);
        Gr(!1), IR(An, vn, 16 / 9), _n.setScissorTest(!0);
        const Wr = Math.max(0, Dr - 270);
        _n.setScissor(0, Wr, 480, 270), _n.setViewport(0, Wr, 480, 270), Vt && yR(Vt, An, xt(), Ot.current), _n.render(ar, An);
        const gr = document.createElement("canvas");
        gr.width = 480, gr.height = 270;
        const jr = gr.getContext("2d");
        jr == null || jr.drawImage(_n.domElement, 0, 0, 480, 270, 0, 0, 480, 270);
        const ea = jr ? gr.toDataURL("image/jpeg", .82) : null;
        return _n.setScissorTest(!1), _n.setViewport(0, 0, zr, Dr), Gr(!0), sa(), ea;
      },
      applyPlaybackFrame: (jn, _n, ar, Vt) => {
        var Dr, Wr;
        const vn = Yt.current;
        if (vn && vn.cameraId !== jn) {
          const gr = ln.current.find(ea => ea.id === vn.cameraId && ea.kind === "camera"),
            jr = Le.current.get(vn.cameraId);
          gr && jr && Z8e(jr, gr);
        }
        Yt.current = {
          cameraId: jn,
          position: [..._n],
          lookAt: [...ar],
          fov: Vt
        };
        const An = Le.current.get(jn);
        An && oat(An, _n, ar);
        const ur = U.current,
          zr = ln.current.find(gr => gr.kind === "camera" && gr.id === jn);
        if (ur && zr) {
          const gr = N.current,
            jr = gr ? gr.clientWidth / Math.max(gr.clientHeight, 1) : 16 / 9;
          IR(ur, {
            ...zr,
            position: [..._n],
            lookAt: [...ar],
            fov: Vt
          }, jr), (Dr = K.current) == null || Dr.target.set(...ar), (Wr = K.current) == null || Wr.update();
        }
      },
      clearPlayback: () => {
        const jn = Yt.current;
        if (Yt.current = null, jn) {
          const _n = ln.current.find(Vt => Vt.id === jn.cameraId && Vt.kind === "camera"),
            ar = Le.current.get(jn.cameraId);
          _n && ar && Z8e(ar, _n);
        }
      },
      applyObjectPlayback: (jn, _n, ar, Vt, vn = 1) => {
        qe.current.set(jn, {
          position: [..._n],
          rotation: [...ar],
          scale: [...Vt],
          opacity: vn
        });
        const An = Le.current.get(jn);
        An && (An.position.set(..._n), An.rotation.set(...ou(ar)), An.scale.set(...Vt), GG(An, vn));
      },
      applyAuthoredTransform: (jn, _n, ar, Vt, vn = 1) => {
        qe.current.delete(jn);
        const An = Le.current.get(jn);
        An && (An.position.set(..._n), An.rotation.set(...ou(ar)), An.scale.set(...Vt), GG(An, vn));
      },
      clearObjectPlayback: jn => {
        qe.current.delete(jn);
        const _n = ln.current.find(Vt => Vt.id === jn),
          ar = Le.current.get(jn);
        _n && ar && (Z8e(ar, _n), GG(ar, _n.opacity ?? 1));
      },
      applyCharacterAnimationFrame: (jn, _n, ar, Vt) => {
        const vn = jvt(_n);
        if (!vn) return;
        const An = {
          characterId: jn,
          animationId: _n,
          timeSeconds: ar,
          mode: Vt
        };
        Fe.current = An;
        const ur = Ne.current.get(_n);
        if (ur) {
          Ca(ur, An);
          return;
        }
        me.current.has(_n) || (me.current.add(_n), _L(vn.url, zr => {
          me.current.delete(_n), Ne.current.set(_n, zr);
          const Dr = Fe.current;
          (Dr == null ? void 0 : Dr.animationId) === _n && Ca(zr, Dr), St(Wr => Wr + 1);
        }, () => me.current.delete(_n)));
      },
      clearCharacterAnimation: jn => {
        const _n = Fe.current;
        (!jn || (_n == null ? void 0 : _n.characterId) === jn) && (Fe.current = null);
        const ar = Ae.current;
        ar && (!jn || ar.characterId === jn) && Pa(!0);
      },
      applyCharacterPose: (jn, _n, ar, Vt) => {
        const vn = Le.current.get(jn),
          An = vn == null ? void 0 : vn.userData.characterModel,
          ur = ln.current.find(Wr => Wr.id === jn);
        if (!vn || !An || (ur == null ? void 0 : ur.kind) !== "character" || en.current === jn && !Cn.current) return;
        if (Aie(_n)) {
          Dn();
          const Wr = _r(vn);
          if (Wr) {
            vn.userData.playbackGait = _n, vn.userData.appliedPresetKey = `${_n}:0`, _n === "squat" ? W8e(Wr) : (q8e(Wr, _n === "run" ? "run" : "walk"), Cn.current || Wr.mixer.update(0));
            return;
          }
        }
        (vn.userData.playbackGait || vn.userData.locomotion) && (nte(vn.userData.locomotion), vn.userData.playbackGait = void 0);
        const zr = {
            ...ur,
            pose: _n,
            poseAdjust: ar ?? vDt
          },
          Dr = () => {
            An.userData.sampledPose ? rat(An, zr) : bne(An, zr), VV(An, Vt);
          };
        vn.userData.appliedPresetKey = `${_n}:${ur.poseRevision ?? 0}`, vn.userData.appliedAdjustKey = JSON.stringify(zr.poseAdjust ?? null), Cn.current ? Dr() : vtn(An, Dr, .18);
      },
      clearCharacterPose: jn => {
        const _n = Le.current.get(jn),
          ar = _n == null ? void 0 : _n.userData.characterModel,
          Vt = ln.current.find(vn => vn.id === jn);
        !ar || (Vt == null ? void 0 : Vt.kind) !== "character" || (_n && (nte(_n.userData.locomotion), _n.userData.playbackGait = void 0), ar.userData.sampledPose ? rat(ar, Vt) : bne(ar, Vt), VV(ar, Vt.bonePoses), HC(ar));
      },
      isGizmoDragging: () => {
        var jn;
        return !!((jn = ne.current) != null && jn.dragging || W.current || be.current);
      },
      getCanvas: () => {
        var jn;
        return ((jn = V.current) == null ? void 0 : jn.domElement) ?? null;
      },
      frameAll: () => {
        const jn = new j0();
        if (Le.current.forEach(An => {
          An.visible && jn.expandByObject(An);
        }), jn.isEmpty()) {
          const An = L.current,
            ur = Y.current;
          if (!An || !ur) return;
          An.position.set(...Zrt), ur.target.set(...eat), ur.update();
          return;
        }
        const _n = jn.getCenter(new dr()),
          ar = Math.max(4, jn.getSize(new dr()).length() * .55);
        if (Pn.current === "top") {
          const An = D.current,
            ur = q.current;
          if (!An || !ur) return;
          ur.target.set(_n.x, 0, _n.z), An.position.set(_n.x, X8e, _n.z), An.zoom = Math.max(.45, Math.min(3.2, 14 / ar)), An.updateProjectionMatrix(), ur.update();
          return;
        }
        const Vt = L.current,
          vn = Y.current;
        !Vt || !vn || (vn.target.copy(_n), Vt.position.copy(_n).add(new dr(1, .55, 1.15).normalize().multiplyScalar(ar)), vn.update());
      },
      alignViewAxis: jn => {
        const _n = L.current,
          ar = Y.current;
        if (!_n || !ar) return;
        const Vt = ar.target.clone(),
          vn = Math.max(4, _n.position.distanceTo(Vt));
        _n.up.set(0, 1, 0), jn === "x" ? _n.position.set(Vt.x + vn, Vt.y, Vt.z) : _n.position.set(Vt.x, Vt.y, Vt.z + vn), _n.lookAt(Vt), ar.update();
      },
      setMovementKey: (jn, _n) => {
        const ar = jn.toLowerCase();
        if (["w", "a", "s", "d", "q", "e"].includes(ar) && (_n ? ae.current.add(ar) : ae.current.delete(ar), !_n && ae.current.size === 0)) {
          Xt();
          const Vt = et.current;
          Vt && (et.current = null, Tt.current(Vt.id, {
            position: Vt.position,
            rotation: Vt.rotation,
            pose: ft.current === "squat" ? "squat" : "stand"
          }, !1), ft.current = ft.current === "squat" ? "squat" : "stand");
        }
      },
      getDirectorCamera: () => {
        const jn = L.current,
          _n = Y.current;
        return !jn || !_n ? null : {
          position: Kme(jn),
          lookAt: [Number(_n.target.x.toFixed(2)), Number(_n.target.y.toFixed(2)), Number(_n.target.z.toFixed(2))],
          fov: Number(jn.fov.toFixed(1))
        };
      }
    })), g.useEffect(() => {
      const jn = N.current;
      if (!jn) return;
      const _n = new OD();
      _n.background = new so(n.skyColor), _n.fog = new eze(n.skyColor, 18, 55);
      const ar = new FD({
        antialias: !0,
        powerPreference: "high-performance"
      });
      ar.setPixelRatio(1), ar.setSize(jn.clientWidth, jn.clientHeight), ar.shadowMap.enabled = !0, ar.shadowMap.autoUpdate = !1, ar.outputColorSpace = Nl, ar.toneMapping = epe, jn.appendChild(ar.domElement);
      const Vt = new lu(50, jn.clientWidth / Math.max(jn.clientHeight, 1), .1, 100);
      Vt.position.set(...Zrt);
      const vn = new zve(Vt, ar.domElement);
      vn.target.set(...eat), vn.enableDamping = !0, vn.enableZoom = !0, vn.enableRotate = !0, vn.zoomSpeed = 1.05, vn.update();
      const An = new lu(50, jn.clientWidth / Math.max(jn.clientHeight, 1), .1, 80);
      U.current = An;
      const ur = new zve(An, ar.domElement);
      ur.enableDamping = !0, ur.enableZoom = !0, ur.enableRotate = !0, ur.zoomSpeed = 1.05, ur.enabled = !1, K.current = ur;
      const zr = () => {
        const Wt = Gn();
        if (!Wt || Cn.current) return;
        const Jt = An.position.toArray(),
          Nn = ur.target.toArray();
        be.current = {
          id: Wt.id,
          patch: {
            position: Jt,
            lookAt: Nn,
            rotation: K8e(Jt, Nn, An.quaternion)
          }
        };
      };
      ur.addEventListener("start", () => {
        Xt(), W.current = !0;
      }), ur.addEventListener("end", () => {
        zr(), W.current = !1, Xt();
      }), ur.addEventListener("change", () => {
        W.current && zr();
      });
      const Dr = new uG(-WF, WF, WF, -WF, .1, 100);
      Dr.position.set(0, X8e, 0), Dr.up.set(0, 0, -1), Dr.lookAt(0, 0, 0), Dr.updateProjectionMatrix();
      const Wr = new zve(Dr, ar.domElement);
      Wr.target.set(0, 0, 0), Wr.enableDamping = !0, Wr.dampingFactor = .1, Wr.enableRotate = !1, Wr.enablePan = !0, Wr.enableZoom = !0, Wr.screenSpacePanning = !0, Wr.zoomSpeed = .9, Wr.minZoom = .35, Wr.maxZoom = 8, Wr.mouseButtons.LEFT = tj.PAN, Wr.mouseButtons.MIDDLE = tj.DOLLY, Wr.mouseButtons.RIGHT = tj.PAN, Wr.enabled = !1, Wr.update();
      const gr = new C3a(Vt, ar.domElement),
        jr = gr.getHelper();
      try {
        de.current = S4a(gr);
      } catch (Wt) {
        console.warn("[Viewport3D] gizmo setup failed", Wt), de.current = null;
      }
      gr.addEventListener("dragging-changed", Wt => {
        if (vn.enabled = !Wt.value && Pn.current === "director" && !Ht.current, Wt.value) {
          const Jt = gr.object;
          _t.current = Jt ? [Jt.scale.x, Jt.scale.y, Jt.scale.z] : null;
          const Nn = Jt == null ? void 0 : Jt.userData.objectId,
            En = Nn ? ln.current.find(Zn => Zn.id === Nn) : null;
          if (Jt && (En == null ? void 0 : En.kind) === "camera") {
            const Zn = En,
              Sr = new dr(...Zn.lookAt);
            At.current = {
              pivot: Sr,
              offset: Jt.position.clone().sub(Sr),
              startQuat: Jt.quaternion.clone()
            };
          } else At.current = null;
        } else {
          const Jt = Ut.current;
          Jt && h(Jt.id, Jt.patch, !1), Ut.current = null, _t.current = null, At.current = null, Qt(Nn => Nn + 1);
        }
      }), gr.addEventListener("objectChange", () => {
        const Wt = gr.object,
          Jt = Wt == null ? void 0 : Wt.userData.objectId,
          Nn = ln.current.find(Et => Et.id === Jt);
        if (!Wt || !Jt || !Nn) return;
        const En = Kme(Wt),
          Zn = Yn.current.gridSnap ? En.map(Et => Y8e(Et, .5)) : En,
          Sr = gr.mode === "translate" && (gr.axis === "X" || gr.axis === "Z");
        Yn.current.gaussianGroundSnap && Nn.kind === "character" && Sr ? (Zn[1] = Yn.current.groundHeight, Wt.position.y = Zn[1]) : Yn.current.gridSnap && Wt.position.set(...Zn);
        const Bn = {
          position: Zn,
          rotation: aIa([Wt.rotation.x, Wt.rotation.y, Wt.rotation.z])
        };
        if (Nn.kind === "camera") {
          const Et = Nn,
            zn = Et.lookAtMode === "target" || !!Et.followTargetId,
            Mn = At.current;
          if (zn && gr.mode === "rotate" && Mn) {
            const or = Wt.quaternion.clone().multiply(Mn.startQuat.clone().invert()),
              mr = Mn.offset.clone().applyQuaternion(or),
              Yr = Mn.pivot.clone().add(mr);
            Wt.position.copy(Yr);
            const aa = Yn.current.gridSnap ? Kme(Wt).map(xa => Y8e(xa, .5)) : Kme(Wt);
            Yn.current.gridSnap && Wt.position.set(...aa), Bn.position = aa;
            const wa = [Number(Mn.pivot.x.toFixed(2)), Number(Mn.pivot.y.toFixed(2)), Number(Mn.pivot.z.toFixed(2))];
            Bn.lookAt = wa, oat(Wt, aa, wa), Bn.rotation = K8e(aa, wa, Wt.quaternion);
          } else if (zn && gr.mode === "translate") Bn.lookAt = [...Et.lookAt], oat(Wt, Zn, Et.lookAt), Bn.rotation = K8e(Zn, Et.lookAt, Wt.quaternion);else {
            const or = new dr(...Et.lookAt).sub(new dr(...Et.position)).length(),
              mr = new dr(0, 0, -1).applyQuaternion(Wt.quaternion).normalize(),
              Yr = Wt.position.clone().add(mr.multiplyScalar(or > .1 ? or : 3)),
              aa = [Number(Yr.x.toFixed(2)), Number(Yr.y.toFixed(2)), Number(Yr.z.toFixed(2))];
            Bn.lookAt = aa, Bn.rotation = K8e(Zn, aa, Wt.quaternion);
          }
        }
        if (Nn.kind === "geometry" || Nn.kind === "character" || Nn.kind === "prop") {
          const Et = Yr => Math.max(.05, Number(Yr.toFixed(2)));
          let zn = Et(Wt.scale.x),
            Mn = Et(Wt.scale.y),
            or = Et(Wt.scale.z);
          if (Nn.uniformScale !== !1) {
            const Yr = _t.current ?? Nn.scale ?? [1, 1, 1],
              aa = gr.axis;
            zn = Mn = or = aa === "X" ? zn : aa === "Y" ? Mn : aa === "Z" ? or : Math.abs(zn - Yr[0]) >= Math.abs(Mn - Yr[1]) && Math.abs(zn - Yr[0]) >= Math.abs(or - Yr[2]) ? zn : Math.abs(Mn - Yr[1]) >= Math.abs(or - Yr[2]) ? Mn : or;
          }
          const mr = [zn, Mn, or];
          Wt.scale.set(mr[0], mr[1], mr[2]), Bn.scale = mr;
        }
        h(Jt, Bn, !0), Ut.current = {
          id: Jt,
          patch: Bn
        };
      }), _n.add(jr);
      const ea = new hc();
      _n.add(ea);
      const pa = new ope(16777215, .58),
        Br = new pT(16777215, 1.4);
      Br.position.set(5, 8, 4), Br.castShadow = !0, Br.shadow.mapSize.set(2048, 2048), Br.shadow.bias = -1e-4, Br.shadow.normalBias = .02, Br.shadow.radius = 0;
      const tn = new pT(11125446, .5);
      tn.position.set(-6, 4, -4), _n.add(pa, Br, tn), Ze.current = pa, Ge.current = Br, Oe.current = tn, mt(), V.current = ar, O.current = _n, L.current = Vt, D.current = Dr, Y.current = vn, q.current = Wr, ne.current = gr, le.current = ea;
      const Lr = new hc();
      Lr.name = "directorSpatialPaths", ea.add(Lr), at.current = Lr;
      const br = new hc();
      br.name = "directorHeightLine", ea.add(br), Pt.current = br;
      const Jr = new hc(),
        Kr = (Wt, Jt, Nn) => {
          var Mn;
          const En = new hc(),
            Zn = (Wt.ikHandle ? GV[Wt.ikHandle].color : (Mn = yne.find(or => or.id === Wt.ikBone)) == null ? void 0 : Mn.color) ?? "#fff",
            Sr = new uu({
              color: Zn,
              transparent: !0,
              opacity: .9,
              depthTest: !1
            }),
            Bn = new di(new qp(Jt, 14, 10), Sr);
          En.add(Bn);
          const Et = new uu({
              transparent: !0,
              opacity: 0,
              depthWrite: !1
            }),
            zn = new di(new qp(Nn, 8, 6), Et);
          En.add(zn), Object.assign(En.userData, Wt), En.visible = !1, Jr.add(En);
        };
      Object.keys(GV).forEach(Wt => {
        Kr({
          ikHandle: Wt
        }, .024, .08);
      }), yne.forEach(Wt => {
        Kr({
          ikBone: Wt.id
        }, .014, .06);
      }), Jr.visible = !1, _n.add(Jr), vt.current = Jr, $e.current = !1, _L(uIa, Wt => {
        pe.current = Wt, rr();
      }, () => {
        pe.current = null;
      }), _L(hIa, Wt => {
        ce.current.stand = Wt, rr();
      }, () => {
        delete ce.current.stand;
      });
      const ir = new tJ(),
        Hr = new Qi();
      let ha = null,
        Ga = null;
      const Za = Wt => {
          const Jt = ar.domElement.getBoundingClientRect(),
            Nn = H.current,
            En = Wt.clientX - Jt.left,
            Zn = Wt.clientY - Jt.top;
          Nn ? (Hr.x = (En - Nn.x) / Nn.width * 2 - 1, Hr.y = -((Zn - Nn.y) / Nn.height) * 2 + 1) : (Hr.x = En / Jt.width * 2 - 1, Hr.y = -(Zn / Jt.height) * 2 + 1);
        },
        va = Wt => {
          const Jt = gr.getHelper();
          if (!Jt.visible || !gr.object) return !1;
          Za(Wt), ir.setFromCamera(Hr, Ea());
          const Nn = gr._gizmo,
            En = Nn ? [Nn.picker.translate, Nn.picker.rotate, Nn.picker.scale].filter(Boolean) : [Jt],
            Zn = [];
          for (const Bn of En) Bn.traverse(Et => {
            Et.userData.gizmoPickable !== !1 && (Zn.push({
              object: Et,
              visible: Et.visible
            }), Et.visible = !0);
          });
          let Sr = !1;
          for (const Bn of En) if (ir.intersectObject(Bn, !0).some(zn => zn.object.userData.gizmoPickable !== !1)) {
            Sr = !0;
            break;
          }
          for (const Bn of Zn) Bn.object.visible = Bn.visible;
          return Sr;
        },
        Kt = Wt => {
          if (Wt.length === 0) return null;
          const Jt = Ot.current;
          if (Jt) {
            const Nn = Wt[0].distance,
              En = Wt.find(Zn => Zn.object.userData.objectId === Jt);
            if (En && En.distance - Nn < 2.5) return Jt;
          }
          return Wt[0].object.userData.objectId ?? null;
        },
        Pr = (Wt, Jt) => {
          const Nn = ar.domElement.getBoundingClientRect(),
            En = Wt.clientX - Nn.left,
            Zn = Wt.clientY - Nn.top,
            Sr = Ot.current;
          let Bn = null,
            Et = Number.POSITIVE_INFINITY;
          return Le.current.forEach((zn, Mn) => {
            if (!zn.visible) return;
            const or = zn.getWorldPosition(new dr()).project(Dr);
            if (or.z < -1 || or.z > 1) return;
            const mr = (or.x * .5 + .5) * Nn.width,
              Yr = (-or.y * .5 + .5) * Nn.height,
              aa = En - mr,
              wa = Zn - Yr,
              xa = aa * aa + wa * wa,
              Aa = Mn === Sr ? 44 : 34;
            xa <= Aa * Aa && xa < Et && (Bn = Mn, Et = xa);
          }), Bn ?? Jt;
        },
        kr = Wt => {
          if (Pn.current !== "top") return null;
          const Jt = Ot.current,
            Nn = ln.current.find(Mn => Mn.kind === "camera" && Mn.id === Jt && !Mn.locked);
          if (!Nn) return null;
          const En = ar.domElement.getBoundingClientRect(),
            Zn = Wt.clientX - En.left,
            Sr = Wt.clientY - En.top,
            Bn = oCa(Nn),
            Et = [{
              kind: "rotate",
              point: Bn.rotate,
              radius: 30
            }, {
              kind: "fov-left",
              point: Bn.left,
              radius: 24
            }, {
              kind: "fov-right",
              point: Bn.right,
              radius: 24
            }];
          let zn = null;
          for (const Mn of Et) {
            const or = Mn.point.clone().project(Dr),
              mr = (or.x * .5 + .5) * En.width,
              Yr = (-or.y * .5 + .5) * En.height,
              aa = Zn - mr,
              wa = Sr - Yr,
              xa = aa * aa + wa * wa;
            xa <= Mn.radius * Mn.radius && (!zn || xa < zn.distanceSq) && (zn = {
              kind: Mn.kind,
              distanceSq: xa
            });
          }
          return zn ? {
            id: Nn.id,
            kind: zn.kind
          } : null;
        },
        Mr = Wt => {
          const Jt = ar.domElement.getBoundingClientRect();
          Hr.x = (Wt.clientX - Jt.left) / Jt.width * 2 - 1, Hr.y = -((Wt.clientY - Jt.top) / Jt.height) * 2 + 1, ir.setFromCamera(Hr, Ea());
          const Nn = Yn.current.groundHeight ?? 0;
          ea.updateMatrixWorld(!0);
          const En = new dr(0, 1, 0).transformDirection(ea.matrixWorld),
            Zn = new dr(0, Nn, 0).applyMatrix4(ea.matrixWorld),
            Sr = new D1().setFromNormalAndCoplanarPoint(En, Zn),
            Bn = new dr();
          return ir.ray.intersectPlane(Sr, Bn) ? (ea.worldToLocal(Bn), [Number(Bn.x.toFixed(3)), Number(Bn.y.toFixed(3)), Number(Bn.z.toFixed(3))]) : null;
        };
      let Hn = null;
      const $t = () => !!(wt.current || bt.current),
        je = (Wt, Jt, Nn) => {
          var Sr, Bn;
          const En = Hn ?? {
              ground: Nn,
              clientY: Jt.clientY
            },
            Zn = {
              type: Wt,
              ground: En.ground,
              clientY: Jt.clientY,
              startClientY: En.clientY
            };
          bt.current ? (Sr = Bt.current) == null || Sr.call(Bt, Zn) : (Bn = jt.current) == null || Bn.call(jt, Zn);
        },
        Qe = Wt => {
          var Mn, or, mr, Yr, aa, wa, xa, Aa;
          if ($t() && Wt.button === 0 && !Cn.current) {
            if (Wt.detail >= 2) {
              (Mn = wn.current) == null || Mn.call(wn), Wt.preventDefault(), Wt.stopImmediatePropagation();
              return;
            }
            const pn = Mr(Wt);
            if (pn) {
              Hn = {
                ground: pn,
                clientY: Wt.clientY
              }, je("down", Wt, pn), vn.enabled = !1, (mr = (or = ar.domElement).setPointerCapture) == null || mr.call(or, Wt.pointerId), Wt.preventDefault(), Wt.stopImmediatePropagation();
              return;
            }
          }
          if (gr.dragging || va(Wt)) return;
          if (Pn.current === "top" && Wt.button === 0 && !Cn.current && st.current !== "pose") {
            const pn = kr(Wt);
            if (pn) {
              const Fa = ln.current.find(Ra => Ra.kind === "camera" && Ra.id === pn.id);
              if (Fa) {
                Ga = {
                  pointerId: Wt.pointerId,
                  id: Fa.id,
                  kind: pn.kind,
                  plane: new D1().setFromNormalAndCoplanarPoint(new dr(0, 1, 0), new dr(Fa.position[0], $ve, Fa.position[2])),
                  startCamera: structuredClone(Fa),
                  lastPatch: null
                }, Wr.enabled = !1, ar.domElement.style.cursor = sat(pn.kind), (aa = (Yr = ar.domElement).setPointerCapture) == null || aa.call(Yr, Wt.pointerId), Wt.preventDefault(), Wt.stopImmediatePropagation();
                return;
              }
            }
            Za(Wt), ir.setFromCamera(Hr, Dr), ir.layers.enable(2);
            const xr = ir.intersectObjects(J.current, !0);
            ir.layers.disable(2);
            const Nr = Pr(Wt, Kt(xr)),
              qr = ln.current.find(Fa => Fa.id === Nr),
              Oa = Nr ? Le.current.get(Nr) : void 0;
            if (Nr && qr && Oa && !qr.locked) {
              const Fa = qr.kind === "camera" ? $ve : Oa.position.y,
                Ra = new D1().setFromNormalAndCoplanarPoint(new dr(0, 1, 0), new dr(Oa.position.x, Fa, Oa.position.z)),
                ui = new dr();
              if (ir.ray.intersectPlane(Ra, ui)) {
                ha = {
                  pointerId: Wt.pointerId,
                  id: Nr,
                  mesh: Oa,
                  plane: Ra,
                  offset: Oa.position.clone().sub(ui),
                  startPosition: [...qr.position],
                  startLookAt: qr.kind === "camera" ? [...qr.lookAt] : void 0,
                  lastPatch: null
                }, u(Nr), Wr.enabled = !1, ar.domElement.style.cursor = "grabbing", (xa = (wa = ar.domElement).setPointerCapture) == null || xa.call(wa, Wt.pointerId), Wt.preventDefault(), Wt.stopImmediatePropagation();
                return;
              }
            }
          }
          if (st.current === "pose") {
            const pn = vt.current;
            if (pn && pn.visible) {
              const xr = ar.domElement.getBoundingClientRect();
              Hr.x = (Wt.clientX - xr.left) / xr.width * 2 - 1, Hr.y = -((Wt.clientY - xr.top) / xr.height) * 2 + 1, ir.setFromCamera(Hr, Ea());
              const Nr = ir.intersectObjects(pn.children, !0)[0],
                qr = (Nr == null ? void 0 : Nr.object.userData) ?? {},
                Oa = ((Aa = Nr == null ? void 0 : Nr.object.parent) == null ? void 0 : Aa.userData) ?? {},
                Fa = qr.ikHandle ?? Oa.ikHandle,
                Ra = qr.ikBone ?? Oa.ikBone;
              if (Fa || Ra) {
                const ui = Ot.current,
                  pr = ui ? Le.current.get(ui) : void 0,
                  In = pr == null ? void 0 : pr.userData.characterModel;
                if (ui && In) {
                  if (Wt.stopImmediatePropagation(), Fa) {
                    const fr = gW(In),
                      na = GV[Fa],
                      Ba = nS(fr, na.effector);
                    if (Ba) {
                      const ai = Ba.getWorldPosition(new dr()),
                        vi = Ea().getWorldDirection(new dr());
                      pt.current = new D1().setFromNormalAndCoplanarPoint(vi, ai), lt.current = ai.y, Ht.current = {
                        id: Fa,
                        kind: "ik",
                        characterId: ui
                      };
                    }
                  } else Ra && (Ht.current = {
                    id: Ra,
                    kind: "bone",
                    characterId: ui
                  }, gt.current = {
                    x: Wt.clientX,
                    y: Wt.clientY
                  });
                  nn.current = ui;
                }
                return;
              }
            }
            return;
          }
          const Nn = ar.domElement.getBoundingClientRect(),
            En = H.current,
            Zn = Wt.clientX - Nn.left,
            Sr = Wt.clientY - Nn.top;
          if (En) {
            if (Zn < En.x || Zn > En.x + En.width || Sr < En.y || Sr > En.y + En.height) {
              u(null), p == null || p();
              return;
            }
            Hr.x = (Zn - En.x) / En.width * 2 - 1, Hr.y = -((Sr - En.y) / En.height) * 2 + 1;
          } else Hr.x = Zn / Nn.width * 2 - 1, Hr.y = -(Sr / Nn.height) * 2 + 1;
          ir.setFromCamera(Hr, Ea()), Pn.current === "top" && ir.layers.enable(2);
          const Bn = ir.intersectObjects(J.current, !0);
          ir.layers.disable(2);
          const Et = Kt(Bn),
            zn = Pn.current === "top" ? Pr(Wt, Et) : Et;
          if (Wt.altKey && Wt.button === 0 && Pn.current === "director") {
            const pn = Y.current;
            if (pn) {
              if (zn) {
                const xr = ln.current.find(Nr => Nr.id === zn);
                xr && pn.target.set(...xr.position);
              } else {
                const xr = new D1(new dr(0, 1, 0), -(Yn.current.groundHeight ?? 0)),
                  Nr = new dr();
                ir.ray.intersectPlane(xr, Nr) && pn.target.copy(Nr);
              }
              pn.update(), Wt.preventDefault();
              return;
            }
          }
          u(zn), zn || p == null || p();
        },
        Mt = Wt => {
          if (Wt.buttons !== 0 || gr.dragging || Ht.current) return;
          const Jt = ar.domElement.getBoundingClientRect(),
            Nn = H.current,
            En = Wt.clientX - Jt.left,
            Zn = Wt.clientY - Jt.top;
          Nn ? (Hr.x = (En - Nn.x) / Nn.width * 2 - 1, Hr.y = -((Zn - Nn.y) / Nn.height) * 2 + 1) : (Hr.x = En / Jt.width * 2 - 1, Hr.y = -(Zn / Jt.height) * 2 + 1), ir.setFromCamera(Hr, Ea());
          const Sr = ir.intersectObjects(J.current, !0),
            Bn = Kt(Sr);
          if (Pn.current === "top") {
            const Et = kr(Wt);
            if (Et) {
              ar.domElement.style.cursor = sat(Et.kind);
              return;
            }
            const zn = ln.current.find(Mn => Mn.id === Bn);
            ar.domElement.style.cursor = Bn && !(zn != null && zn.locked) ? "move" : "grab";
          }
          Bn !== Ce.current && (Ce.current = Bn, Ye.current && iat(Ye.current), Ye.current = null);
        };
      ar.domElement.addEventListener("pointerdown", Qe, !0), ar.domElement.addEventListener("pointermove", Mt);
      const cn = Wt => {
          !Hn || !$t() || (je("move", Wt, Hn.ground), Wt.preventDefault());
        },
        Qn = Wt => {
          !Hn || !$t() || (je("up", Wt, Hn.ground), Hn = null, Wt.preventDefault());
        };
      window.addEventListener("pointermove", cn, !0), window.addEventListener("pointerup", Qn, !0), window.addEventListener("pointercancel", Qn, !0);
      const Lt = Wt => {
          const Jt = Ga;
          if (!Jt || Wt.pointerId !== Jt.pointerId) return;
          Za(Wt), ir.setFromCamera(Hr, Dr);
          const Nn = new dr();
          if (!ir.ray.intersectPlane(Jt.plane, Nn)) return;
          const En = Jt.startCamera,
            Zn = new dr(...En.position),
            Sr = Nn.clone().sub(Zn);
          if (Sr.y = 0, Sr.lengthSq() < .0025) return;
          let Bn;
          if (Jt.kind === "rotate") {
            const Et = Math.max(.5, Math.hypot(En.lookAt[0] - En.position[0], En.lookAt[2] - En.position[2])),
              zn = Sr.normalize();
            Bn = {
              lookAt: [Number((En.position[0] + zn.x * Et).toFixed(2)), En.lookAt[1], Number((En.position[2] + zn.z * Et).toFixed(2))],
              rotation: [0, 0, 0]
            };
          } else {
            const Et = new dr(En.lookAt[0] - En.position[0], 0, En.lookAt[2] - En.position[2]);
            Et.lengthSq() < .0025 && Et.set(0, 0, -1), Et.normalize();
            const zn = Sr.normalize(),
              Mn = Math.acos(Mo.clamp(Et.dot(zn), -1, 1)),
              or = Mo.clamp(Mo.radToDeg(Mn) * 2, 12, 120);
            Bn = {
              fov: Number(or.toFixed(1))
            };
          }
          ar.domElement.style.cursor = sat(Jt.kind), Jt.lastPatch = Bn, h(Jt.id, Bn, !0), Wt.preventDefault(), Wt.stopImmediatePropagation();
        },
        ct = Wt => {
          var Nn, En;
          const Jt = Ga;
          !Jt || Wt.pointerId !== Jt.pointerId || (Jt.lastPatch && h(Jt.id, Jt.lastPatch, !1), Ga = null, (En = (Nn = ar.domElement).releasePointerCapture) == null || En.call(Nn, Wt.pointerId), ar.domElement.style.cursor = Pn.current === "top" ? "grab" : "", Qt(Zn => Zn + 1), Wt.preventDefault(), Wt.stopImmediatePropagation());
        };
      window.addEventListener("pointermove", Lt, !0), window.addEventListener("pointerup", ct, !0), window.addEventListener("pointercancel", ct, !0);
      const Dt = Wt => {
          const Jt = ha;
          if (!Jt || Wt.pointerId !== Jt.pointerId) return;
          Za(Wt), ir.setFromCamera(Hr, Dr);
          const Nn = new dr();
          if (!ir.ray.intersectPlane(Jt.plane, Nn)) return;
          let En = Nn.x + Jt.offset.x,
            Zn = Nn.z + Jt.offset.z;
          Yn.current.gridSnap && (En = Y8e(En, .5), Zn = Y8e(Zn, .5));
          const Sr = [Number(En.toFixed(2)), Jt.startPosition[1], Number(Zn.toFixed(2))];
          Jt.mesh.userData.isTopViewCameraRepresentation ? Jt.mesh.position.set(Sr[0], $ve, Sr[2]) : Jt.mesh.position.set(...Sr);
          const Bn = {
            position: Sr
          };
          Jt.startLookAt && (Bn.lookAt = [Number((Jt.startLookAt[0] + Sr[0] - Jt.startPosition[0]).toFixed(2)), Jt.startLookAt[1], Number((Jt.startLookAt[2] + Sr[2] - Jt.startPosition[2]).toFixed(2))]), Jt.lastPatch = Bn, h(Jt.id, Bn, !0), ar.domElement.style.cursor = "grabbing", Wt.preventDefault(), Wt.stopImmediatePropagation();
        },
        bn = Wt => {
          var Nn, En;
          const Jt = ha;
          !Jt || Wt.pointerId !== Jt.pointerId || (Jt.lastPatch && h(Jt.id, Jt.lastPatch, !1), ha = null, (En = (Nn = ar.domElement).releasePointerCapture) == null || En.call(Nn, Wt.pointerId), ar.domElement.style.cursor = Pn.current === "top" ? "grab" : "", Qt(Zn => Zn + 1), Wt.preventDefault(), Wt.stopImmediatePropagation());
        };
      window.addEventListener("pointermove", Dt, !0), window.addEventListener("pointerup", bn, !0), window.addEventListener("pointercancel", bn, !0);
      const Rt = Wt => {
          const Jt = Ht.current;
          if (!Jt) return;
          const Nn = Le.current.get(Jt.characterId),
            En = Nn == null ? void 0 : Nn.userData.characterModel;
          if (!En) return;
          const Zn = gW(En);
          if (Jt.kind === "ik") {
            const Sr = Ea(),
              Bn = pt.current;
            if (!Sr || !Bn) return;
            const Et = ar.domElement.getBoundingClientRect();
            Hr.x = (Wt.clientX - Et.left) / Et.width * 2 - 1, Hr.y = -((Wt.clientY - Et.top) / Et.height) * 2 + 1, ir.setFromCamera(Hr, Sr);
            const zn = new dr();
            if (!ir.ray.intersectPlane(Bn, zn)) return;
            Yn.current.footLock && (Jt.id === "footL" || Jt.id === "footR") && (zn.y = lt.current);
            const Mn = GV[Jt.id],
              or = Mn.bones.map(Yr => nS(Zn, Yr)).filter(Yr => !!Yr),
              mr = nS(Zn, Mn.effector);
            if (!mr || or.length === 0) return;
            qIa(or, mr, zn, En, 14), btn(vt.current, Zn);
          } else if (Jt.kind === "bone") {
            const Sr = yne.find(or => or.id === Jt.id);
            if (!Sr) return;
            const Bn = Sr.bones.map(or => nS(Zn, or)).find(or => !!or);
            if (!Bn) return;
            const Et = gt.current,
              zn = Wt.clientX - Et.x,
              Mn = Wt.clientY - Et.y;
            if (gt.current = {
              x: Wt.clientX,
              y: Wt.clientY
            }, zn || Mn) {
              if (Wt.shiftKey) {
                const or = new dr(0, 1, 0).applyQuaternion(Bn.getWorldQuaternion(new hl()));
                nat(Bn, or, zn * .008);
              } else {
                const or = new dr(0, 1, 0),
                  mr = new dr().setFromMatrixColumn(Ea().matrixWorld, 0);
                zn && nat(Bn, or, zn * .008), Mn && nat(Bn, mr, Mn * .008);
              }
              HC(En), btn(vt.current, Zn);
            }
          }
        },
        fn = () => {
          const Wt = Ht.current;
          if (!Wt) return;
          Ht.current = null;
          const Jt = Le.current.get(Wt.characterId),
            Nn = Jt == null ? void 0 : Jt.userData.characterModel;
          if (!Nn) return;
          const En = gW(Nn),
            Zn = {};
          if (Wt.kind === "ik") GV[Wt.id].bones.map(Et => nS(En, Et)).filter(Et => !!Et).forEach(Et => {
            Zn[Fvt(Et.name)] = Et.quaternion.toArray();
          });else {
            const Sr = yne.find(Et => Et.id === Wt.id),
              Bn = Sr == null ? void 0 : Sr.bones.map(Et => nS(En, Et)).find(Et => !!Et);
            Bn && (Zn[Fvt(Bn.name)] = Bn.quaternion.toArray());
          }
          if (Object.keys(Zn).length) {
            const Sr = ln.current.find(Et => Et.id === Wt.characterId),
              Bn = Sr && "bonePoses" in Sr ? Sr.bonePoses ?? {} : {};
            h(Wt.characterId, {
              bonePoses: {
                ...Bn,
                ...Zn
              }
            }, !1);
          }
        };
      window.addEventListener("pointermove", Rt), window.addEventListener("pointerup", fn);
      const Zt = Wt => {
          const Jt = Wt.target;
          if (Jt != null && Jt.matches('input, textarea, select, [contenteditable="true"]')) return;
          const Nn = !!en.current && !Cn.current;
          if (Wt.key === "Shift") {
            Ee.current = !0;
            return;
          }
          if (Wt.key === "Control" || Wt.code === "ControlLeft" || Wt.code === "ControlRight") {
            Nn && (xe.current = !0, Wt.preventDefault());
            return;
          }
          if (Nn && (Wt.ctrlKey || Wt.metaKey)) {
            Wt.preventDefault(), Wt.stopImmediatePropagation();
            const Zn = Wt.key.toLowerCase();
            ["w", "a", "s", "d", "q", "e"].includes(Zn) && ae.current.add(Zn);
            return;
          }
          if (Wt.code === "Space") {
            if (!Nn || (Wt.preventDefault(), Wt.stopImmediatePropagation(), Wt.repeat || ge.current)) return;
            const Zn = Le.current.get(en.current);
            Zn && (ge.current = {
              vy: IIa,
              groundY: Zn.position.y
            });
            return;
          }
          const En = Wt.key.toLowerCase();
          ["w", "a", "s", "d", "q", "e"].includes(En) && (!Nn && (Wt.ctrlKey || Wt.metaKey || Wt.altKey) || (ae.current.add(En), Wt.preventDefault(), Nn && Wt.stopImmediatePropagation()));
        },
        Ln = Wt => {
          if (Wt.key === "Shift" && (Ee.current = !1), (Wt.key === "Control" || Wt.code === "ControlLeft" || Wt.code === "ControlRight") && (xe.current = !1), ae.current.delete(Wt.key.toLowerCase()), ae.current.size === 0) {
            ue.current = !1;
            const Jt = et.current;
            if (Jt) {
              const Nn = xe.current ? "squat" : "stand";
              ft.current = Nn, et.current = null, Tt.current(Jt.id, {
                position: Jt.position,
                ...(Jt.rotation ? {
                  rotation: Jt.rotation
                } : {}),
                pose: Nn
              }, !1);
            }
            Xt();
          }
        },
        tt = () => {
          Xt(), ae.current.clear(), Ee.current = !1, xe.current = !1, ue.current = !1;
        };
      window.addEventListener("keydown", Zt, !0), window.addEventListener("keyup", Ln), window.addEventListener("blur", tt);
      const zt = () => {
          const Wt = jn.clientWidth,
            Jt = Math.max(jn.clientHeight, 1);
          ar.setPixelRatio(1), ar.setSize(Wt, Jt), Vt.aspect = Wt / Math.max(Jt, 1), Vt.updateProjectionMatrix(), tat(Dr, Wt, Jt);
        },
        an = new ResizeObserver(zt);
      an.observe(jn);
      const Rn = {
          w: 320,
          h: 180,
          pixels: new Uint8Array(320 * 180 * 4),
          image: new ImageData(320, 180)
        },
        Un = new FE(Rn.w, Rn.h, {
          minFilter: $m,
          magFilter: $m,
          format: W1,
          type: bk
        });
      Un.texture.colorSpace = Nl;
      const er = new lu(50, Rn.w / Rn.h, .1, 80);
      let Cr = -1 / 0;
      const tr = Wt => {
          var mr, Yr, aa, wa;
          if (Wt - Cr < 50) return;
          const Jt = ht.current,
            Nn = [(mr = yn.current) == null ? void 0 : mr.current, (Yr = gn.current) == null ? void 0 : Yr.current].filter(xa => xa != null && xa.clientWidth > 0 && xa.clientHeight > 0);
          if (!Jt || Nn.length === 0) return;
          const En = ln.current.find(xa => xa.kind === "camera" && xa.id === Jt);
          if (!En) return;
          Cr = Wt;
          const Zn = Math.max(160, Math.min(1280, Math.round(dt.current.w))),
            Sr = Math.max(90, Math.min(720, Math.round(dt.current.h)));
          (Zn !== Rn.w || Sr !== Rn.h) && (Rn.w = Zn, Rn.h = Sr, Rn.pixels = new Uint8Array(Zn * Sr * 4), Rn.image = new ImageData(Zn, Sr), Un.setSize(Zn, Sr));
          const Bn = Le.current.get(Jt);
          er.fov = En.fov, er.aspect = Rn.w / Rn.h, er.near = .1, er.far = 80, Q8e(er, Yn.current, !0);
          const Et = U.current;
          Pn.current === "camera" && (W.current || be.current) && Et && ((aa = Gn()) == null ? void 0 : aa.id) === Jt ? (er.position.copy(Et.position), er.quaternion.copy(Et.quaternion), er.fov = Et.fov) : IR(er, En, Rn.w / Rn.h), er.updateProjectionMatrix(), er.updateMatrixWorld(!0);
          const zn = Bn == null ? void 0 : Bn.visible;
          Bn && (Bn.visible = !1), Gr(!1);
          const Mn = ar.getRenderTarget();
          ar.setRenderTarget(Un), ar.render(_n, er), ar.setRenderTarget(Mn), Bn && (Bn.visible = zn ?? !1), Gr(!0), ar.readRenderTargetPixels(Un, 0, 0, Rn.w, Rn.h, Rn.pixels);
          const or = Rn.image.data;
          for (let xa = 0; xa < Rn.h; xa += 1) {
            const Aa = (Rn.h - 1 - xa) * Rn.w * 4;
            or.set(Rn.pixels.subarray(Aa, Aa + Rn.w * 4), xa * Rn.w * 4);
          }
          for (const xa of Nn) xa.width !== Rn.w && (xa.width = Rn.w), xa.height !== Rn.h && (xa.height = Rn.h), (wa = xa.getContext("2d")) == null || wa.putImageData(Rn.image, 0, 0);
        },
        kn = () => {
          const Wt = z.current;
          if (!Wt) return;
          const Jt = Pn.current === "top" ? ln.current.find(Zn => Zn.kind === "camera" && Zn.id === Ot.current) : null;
          if (!Jt) {
            Wt.style.display = "none";
            return;
          }
          const Nn = ar.domElement.getBoundingClientRect(),
            En = (Zn, Sr) => {
              const Bn = Sr.project(Dr);
              if (Bn.z < -1 || Bn.z > 1 || Math.abs(Bn.x) > 1.06 || Math.abs(Bn.y) > 1.06) {
                Zn.style.display = "none";
                return;
              }
              Zn.style.display = "block", Zn.style.left = `${Math.round((Bn.x * .5 + .5) * Nn.width)}px`, Zn.style.top = `${Math.round((-Bn.y * .5 + .5) * Nn.height)}px`;
            };
          Wt.textContent = Jt.name, En(Wt, LNe(Jt, 0, .86));
        };
      let xn = 0,
        Fn = performance.now();
      const cr = (Wt = performance.now()) => {
          var Bn, Et, zn;
          document.hidden ? xn = 0 : xn = requestAnimationFrame(cr);
          const Jt = Math.min(.05, Math.max(0, (Wt - Fn) / 1e3));
          Fn = Wt;
          const Nn = (Mn, or) => {
              const mr = or.target.clone().sub(Mn.position);
              mr.y = 0, mr.lengthSq() < 1e-4 && mr.set(0, 0, -1), mr.normalize();
              const Yr = mr.clone().cross(new dr(0, 1, 0)).normalize(),
                aa = new dr();
              ae.current.has("w") && aa.add(mr), ae.current.has("s") && aa.sub(mr), ae.current.has("d") && aa.add(Yr), ae.current.has("a") && aa.sub(Yr), aa.lengthSq() > 0 && (aa.normalize().multiplyScalar(3.4 * Jt), Mn.position.add(aa), or.target.add(aa));
              const wa = (ae.current.has("q") ? 1 : 0) - (ae.current.has("e") ? 1 : 0);
              if (wa !== 0) {
                const xa = 3.4 * Jt * wa;
                Mn.position.y += xa, or.target.y += xa;
              }
            },
            En = en.current,
            Zn = !!En && !Cn.current && !gr.dragging;
          if (Zn && En) {
            const Mn = ln.current.find(Aa => Aa.id === En),
              or = Le.current.get(En),
              mr = Pn.current === "camera" ? An : Pn.current === "top" ? Dr : Vt,
              Yr = ae.current,
              aa = Yr.has("w") || Yr.has("a") || Yr.has("s") || Yr.has("d"),
              wa = xe.current;
            he.current += ((wa ? 1 : 0) - he.current) * Math.min(1, Jt * 12);
            const xa = aa ? !wa && Ee.current ? "run" : "walk" : "idle";
            if ((Bn = Ue.current) == null || Bn.call(Ue, Jt, aa || wa || !!ge.current || xa !== "idle"), (Mn == null ? void 0 : Mn.kind) === "character" && !Mn.locked && or) {
              const Aa = or.userData.characterModel,
                pn = Ae.current,
                xr = !!(pn && pn.characterId === En && pn.animationId === Vn.current && pn.model === Aa);
              let Nr = null,
                qr = !1;
              if (xr && pn) pn.mixer.update(Jt);else {
                if (Nr = Re.current(or), Nr && !Nr.crouch) {
                  const fr = ce.current.squat;
                  fr && itn(Nr, fr, .92);
                }
                qr = wa && !!(Nr != null && Nr.crouch), qr && Nr ? W8e(Nr) : Nr && (Nr.current === "crouch" && ((Et = Nr.crouch) == null || Et.stop()), xa === "idle" && !Nr.idle ? (Nr.walk.stop(), Nr.run.stop(), Nr.current = "idle", Aa && (Ere(Aa), HC(Aa))) : (q8e(Nr, xa), Nr.mixer.update(Jt)));
              }
              const Oa = ge.current,
                Fa = !!Oa;
              let Ra = !1;
              if (mr && (aa || !Fa && (Yr.has("q") || Yr.has("e")))) {
                const fr = new dr();
                mr.getWorldDirection(fr), Pn.current === "top" && fr.set(0, 0, -1), fr.y = 0, fr.lengthSq() < 1e-4 && fr.set(0, 0, -1), fr.normalize();
                const na = fr.clone().cross(new dr(0, 1, 0)).normalize(),
                  Ba = new dr();
                Yr.has("w") && Ba.add(fr), Yr.has("s") && Ba.sub(fr), Yr.has("d") && Ba.add(na), Yr.has("a") && Ba.sub(na);
                const ai = wa ? SIa : xa === "run" ? AIa : kIa,
                  vi = Fa && aa ? EIa : 1;
                if (Ba.lengthSq() > 0 && (Ba.normalize().multiplyScalar(ai * vi * Jt), or.position.add(Ba), or.rotation.y = Math.atan2(Ba.x, Ba.z), Ra = !0), !Fa) {
                  const Vi = (Yr.has("q") ? 1 : 0) - (Yr.has("e") ? 1 : 0);
                  Vi !== 0 && (or.position.y += 3.4 * Jt * Vi, Ra = !0);
                }
              }
              Oa && (Oa.vy -= CIa * Jt, or.position.y += Oa.vy * Jt, or.position.y <= Oa.groundY && (or.position.y = Oa.groundY, ge.current = null), Ra = !0), or.userData.playbackGait = void 0;
              const ui = xr ? Mn.pose : qr ? "squat" : xa === "run" ? "run" : xa === "walk" ? "walk" : "stand",
                pr = ft.current,
                In = !xr && pr !== ui && !(pr == null && ui === "stand");
              if ((pr == null || pr !== ui) && (ft.current = ui), Ra || In) {
                const fr = Fa && !ge.current,
                  na = !ue.current;
                ue.current = !0;
                const Ba = Kme(or),
                  ai = [Mn.rotation[0], Number(Mo.radToDeg(or.rotation.y).toFixed(2)), Mn.rotation[2]],
                  vi = na || fr || In;
                et.current = vi ? null : {
                  id: En,
                  position: Ba,
                  rotation: ai,
                  pose: ui
                }, Tt.current(En, {
                  position: Ba,
                  rotation: ai,
                  pose: ui
                }, !vi);
              }
            }
          } else Pn.current === "director" && ae.current.size > 0 && !gr.dragging && Nn(Vt, vn);
          Le.current.forEach((Mn, or) => {
            const mr = Mn.userData.characterModel;
            if (mr && YIa(mr, Jt), or === en.current) return;
            const Yr = Mn.userData.playbackGait,
              aa = Mn.userData.locomotion;
            !aa || !Yr || (Yr === "squat" ? W8e(aa) : aa.mixer.update(Jt));
          });
          const Sr = Pn.current === "camera" && !Cn.current && !gr.dragging && !Ht.current;
          if (be.current && (!Sr || Zn || be.current.id !== ((zn = Gn()) == null ? void 0 : zn.id)) && Xt(), !Zn && Sr && ae.current.size > 0 && (Nn(An, ur), zr()), vn.enabled = Pn.current === "director" && !gr.dragging && !Ht.current && !gr.axis && !wt.current, ur.enabled = Sr, Wr.enabled = Pn.current === "top" && !ha && !Ga && !gr.dragging && !Ht.current && !gr.axis, vn.update(), ur.update(), Wr.update(), Pn.current === "top") {
            const Mn = Ke.current;
            Dr.up.set(-Math.sin(Mn), 0, -Math.cos(Mn)), Dr.lookAt(Wr.target);
          }
          sa(), kn(), tr(Wt);
        },
        vr = () => {
          document.hidden ? (tt(), xn && cancelAnimationFrame(xn), xn = 0) : xn === 0 && (xn = requestAnimationFrame(cr));
        };
      return document.addEventListener("visibilitychange", vr), cr(), () => {
        var Wt;
        $e.current = !0, document.removeEventListener("visibilitychange", vr), rt.current !== null && (window.clearTimeout(rt.current), rt.current = null), nt.current.clear();
        for (const Jt of Le.current.values()) gtn(Jt);
        Le.current.clear(), Xe.current.clear(), He.current = null, Ve.current = null, it.current = null, It.current = null, cancelAnimationFrame(xn), an.disconnect(), ar.domElement.removeEventListener("pointerdown", Qe, !0), ar.domElement.removeEventListener("pointermove", Mt), window.removeEventListener("pointermove", cn, !0), window.removeEventListener("pointerup", Qn, !0), window.removeEventListener("pointercancel", Qn, !0), window.removeEventListener("pointermove", Lt, !0), window.removeEventListener("pointerup", ct, !0), window.removeEventListener("pointercancel", ct, !0), window.removeEventListener("pointermove", Dt, !0), window.removeEventListener("pointerup", bn, !0), window.removeEventListener("pointercancel", bn, !0), window.removeEventListener("pointermove", Rt), window.removeEventListener("pointerup", fn), window.removeEventListener("keydown", Zt, !0), window.removeEventListener("keyup", Ln), window.removeEventListener("blur", tt), ae.current.clear(), ha = null, Ht.current = null, nn.current = null, vt.current = null, de.current = null, gr.dispose(), vn.dispose(), ur.dispose(), Wr.dispose(), D.current = null, q.current = null, Un.dispose(), (Wt = ar.forceContextLoss) == null || Wt.call(ar), ar.dispose(), ar.domElement.remove();
      };
    }, []), g.useEffect(() => {
      const jn = ne.current;
      if (jn) if (o) jn.enabled = !1, jn.getHelper().visible = !1, Gr(!1);else {
        Gr(!0), jn._gizmo && (jn._gizmo.visible = !0);
        const _n = Pn.current === "director" && !!jn.object && st.current !== "pose" && !en.current;
        jn.enabled = _n, jn.getHelper().visible = _n;
      }
    }, [o]), g.useEffect(() => {
      mt();
    }, [n.ambientIntensity, n.keyIntensity, n.fillIntensity, n.keyAzimuth, n.keyElevation, n.exposure, n.ambientColor, n.keyColor, n.fillColor]), g.useEffect(() => {
      if (r !== "camera" || o) {
        Q.current = null;
        return;
      }
      const jn = Gn(),
        _n = U.current,
        ar = K.current,
        Vt = N.current;
      if (!jn || !_n || !ar || W.current || be.current) return;
      const vn = Vt ? Vt.clientWidth / Math.max(Vt.clientHeight, 1) : 16 / 9;
      IR(_n, jn, vn), ar.target.set(...jn.lookAt), ar.update(), Q.current = jn.id;
    }, [r, o, t, d, e]), g.useEffect(() => {
      const jn = at.current,
        _n = Pt.current;
      if (!jn || !_n) return;
      const ar = (M == null ? void 0 : M.hoverPoint) ?? (P == null ? void 0 : P.hoverPoint) ?? null,
        Vt = (M == null ? void 0 : M.step) === "draw_camera" || (M == null ? void 0 : M.step) === "place" && M.mode === "fixed_camera",
        vn = P ? ar ? [...P.points, ar] : P.points : void 0,
        An = W5a({
          cameraKeyframes: I,
          objectKeyframes: E,
          objects: e,
          draft: M || P ? {
            cameraPoints: M ? ar && Vt ? [...M.cameraPoints, ar] : M.cameraPoints : void 0,
            targetPoints: M ? ar && !Vt ? [...M.targetPoints, ar] : M.targetPoints : void 0,
            objectPoints: vn
          } : null
        });
      Q5a(jn, An);
      const ur = e.find(zr => zr.id === t);
      Y5a(_n, ur && ur.kind !== "crowd" ? ur.position : null, n.groundHeight ?? 0);
    }, [I, E, e, M, P, t, n.groundHeight]), g.useEffect(() => {
      var _n;
      const jn = (_n = V.current) == null ? void 0 : _n.domElement;
      if (jn) return jn.style.cursor = M || P ? "crosshair" : "", () => {
        jn.style.cursor = "";
      };
    }, [M, P]), g.useEffect(() => {
      var Lr, br, Jr, Kr;
      const jn = O.current,
        _n = le.current,
        ar = ne.current;
      if (!jn || !_n || !ar || ar.dragging) return;
      jn.background = new so(n.skyColor), jn.fog = new eze(n.skyColor, 18, 55), _n.position.set(...n.position), _n.rotation.set(...ou(n.rotation)), _n.scale.setScalar(n.scale);
      const Vt = [n.groundHeight, n.showGround, n.showGrid !== !1, n.skyColor, n.opacity, n.panoramaImageUrl ?? "", n.panoramaRadius, n.panoramaRotation, ((Lr = ie.current) == null ? void 0 : Lr.uuid) ?? "", n.referenceImageUrl ?? "", n.referenceOpacity ?? .5, n.referenceScale ?? 3, n.referenceRotation ?? 0, ((br = Ft.current) == null ? void 0 : br.uuid) ?? ""].join("|");
      if (Vt !== He.current) {
        if (He.current = Vt, Ve.current && (J8e(Ve.current), _n.remove(Ve.current), Ve.current = null), it.current && (J8e(it.current), _n.remove(it.current), it.current = null), It.current && (J8e(It.current), _n.remove(It.current), It.current = null), We.current && (J8e(We.current), _n.remove(We.current), We.current = null), n.showGrid !== !1) {
          const ir = dIa(Qme, n.groundHeight);
          Ve.current = ir, _n.add(ir);
        }
        if (ie.current) {
          const ir = new di(new qp(n.panoramaRadius, 48, 24), new uu({
            map: ie.current,
            side: xx,
            fog: !1
          }));
          ir.rotation.y = Mo.degToRad(n.panoramaRotation), ir.userData.disposeOnRemove = !0, ir.userData.preserveTexture = !0, it.current = ir, _n.add(ir);
        }
        if (n.showGround) {
          const ir = new hc();
          ir.name = "director-stage-ground";
          const Hr = new di(new W5(1, 1), new uu({
            color: n.skyColor,
            transparent: n.opacity < 1,
            opacity: n.opacity,
            depthWrite: !1,
            toneMapped: !1
          }));
          Hr.name = "director-stage-ground-fill", Hr.rotation.x = -Math.PI / 2, Hr.position.y = n.groundHeight - oIa, Hr.scale.set(Qme, Qme, 1);
          const ha = new di(new W5(Qme, Qme), new Nxa({
            color: 0,
            opacity: .32,
            depthWrite: !1,
            polygonOffset: !0,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
          }));
          ha.name = "director-stage-ground-shadow", ha.rotation.x = -Math.PI / 2, ha.position.y = n.groundHeight, ha.receiveShadow = !0, ir.add(Hr, ha), ir.userData.disposeOnRemove = !0, It.current = ir, _n.add(ir);
        }
        if (Ft.current && n.referenceImageUrl) {
          const ir = n.referenceScale ?? 3,
            Hr = new di(new W5(ir, ir), new uu({
              map: Ft.current,
              transparent: !0,
              opacity: n.referenceOpacity ?? .5,
              side: _y,
              depthWrite: !1
            }));
          Hr.rotation.x = Mo.degToRad(n.referenceRotation ?? 0), Hr.position.set(0, ir / 2, 0), Hr.userData.disposeOnRemove = !0, Hr.userData.preserveTexture = !0, We.current = Hr, _n.add(Hr);
        }
      }
      Ve.current && (Ve.current.visible = r !== "camera");
      const vn = new Map(e.map(ir => [ir.id, ir])),
        An = ir => {
          var ha, Ga;
          const Hr = Le.current.get(ir);
          Hr && (((ha = Ae.current) == null ? void 0 : ha.characterId) === ir && Pa(!1), ar.object === Hr && ar.detach(), Le.current.forEach((Za, va) => {
            va !== ir && Za.parent === Hr && _n.add(Za);
          }), nte(Hr.userData.locomotion), Hr.userData.locomotion = void 0, gtn(Hr), (Ga = Hr.parent) == null || Ga.remove(Hr), Le.current.delete(ir), Xe.current.delete(ir));
        },
        ur = ir => {
          if (ir.kind === "character") {
            let Hr;
            const ha = ir.fbxUrl ? fe.current.get(ir.fbxUrl) : void 0;
            return n.exportAbstractCharacters ? (Hr = WIa(ir, n.showLabels), Hr.userData.ownsGeometries = !0, Hr.userData.ownsTextures = !0) : ha ? Hr = wtn(ir, ha, n.showLabels) : pe.current ? Hr = wtn(ir, pe.current, n.showLabels) : (Hr = HIa(ir, 1, n.showLabels), Hr.userData.ownsGeometries = !0, Hr.userData.ownsTextures = !0), ir.fbxUrl && $n(ir.fbxUrl), Hr.userData.appliedPresetKey = Aie(ir.pose) ? `stand:${ir.poseRevision ?? 0}` : `${ir.pose}:${ir.poseRevision ?? 0}`, Hr.userData.appliedAdjustKey = JSON.stringify(ir.poseAdjust ?? null), Hr;
          }
          if (ir.kind === "geometry") {
            const Hr = XIa(ir);
            return Hr.userData.ownsGeometries = !0, Hr.userData.ownsTextures = !0, Hr;
          }
          if (ir.kind === "prop") {
            const Hr = ir.modelUrl ? Z.current.get(ir.modelUrl) : void 0,
              ha = ir.modelId ? we.current.get(ir.modelId) : void 0,
              Ga = Hr || ha,
              Za = nCa(ir, Ga);
            return Za.userData.ownsGeometries = !Ga, Za.userData.ownsTextures = !Ga, ir.modelUrl ? Ir(ir.modelUrl) : yr(ir.modelId), Za;
          }
          if (ir.kind === "camera") {
            const Hr = uCa(ir, ir.id === t, r === "top");
            return Hr.userData.isDirectorGizmo = !0, Hr.userData.ownsGeometries = !0, Hr.userData.ownsTextures = !0, Hr;
          }
          if (ir.kind === "light") {
            const Hr = JIa(ir);
            return Hr.userData.ownsGeometries = !0, Hr.userData.ownsTextures = !0, Hr;
          }
          return null;
        },
        zr = [],
        Dr = new Set();
      e.forEach(ir => {
        var Mr, Hn;
        if (ir.kind === "crowd") return;
        Dr.add(ir.id);
        const Hr = JTe(ir, vn) && Tbt(ir, s, l) && HJt(ir, w, vn),
          ha = ir.kind === "camera" && (r === "camera" || o);
        if (!Hr || ha) {
          const $t = Le.current.get(ir.id);
          $t && ($t.visible = !1);
          return;
        }
        const Ga = ir.kind === "character" ? ce.current[ir.pose] : void 0,
          Za = ir.kind === "prop" ? ir.modelUrl ? Z.current.get(ir.modelUrl) : ir.modelId ? we.current.get(ir.modelId) : void 0 : void 0,
          va = `${MIa(ir, t, n.showLabels, ir.kind === "prop" ? Za == null ? void 0 : Za.uuid : Ga == null ? void 0 : Ga.uuid, ir.kind === "character" && ir.fbxUrl ? ((Mr = fe.current.get(ir.fbxUrl)) == null ? void 0 : Mr.uuid) ?? "pending" : ((Hn = pe.current) == null ? void 0 : Hn.uuid) ?? null, r)}:${n.exportAbstractCharacters ? "abs" : "full"}`,
          Kt = Le.current.get(ir.id),
          Pr = Xe.current.get(ir.id);
        if (Kt && Pr === va) {
          if (o) {
            const $t = qe.current.get(ir.id);
            $t && (Kt.position.set(...$t.position), Kt.rotation.set(...ou($t.rotation)), Kt.scale.set(...$t.scale), GG(Kt, $t.opacity)), ir.kind === "character" && Kt.userData.appliedColor !== ir.color && aat(Kt, ir.color);
          } else {
            const $t = qe.current.get(ir.id),
              je = ir.kind === "character" && A === ir.id,
              Qe = ir.kind === "character" && !!Kt.userData.locomotion && (je || !!Kt.userData.playbackGait);
            if (ir.kind === "character" && !je) {
              const Mt = Kt.userData.characterModel,
                cn = `${ir.pose}:${ir.poseRevision ?? 0}`,
                Qn = JSON.stringify(ir.poseAdjust ?? null),
                Lt = Kt.userData.appliedPresetKey !== cn,
                ct = Kt.userData.appliedAdjustKey !== Qn;
              if (Mt && (Lt || ct)) {
                if (Kt.userData.appliedPresetKey = cn, Kt.userData.appliedAdjustKey = Qn, Aie(ir.pose)) {
                  Mt.userData.poseBlend = void 0;
                  const Dt = _r(Kt);
                  Dt && (Kt.userData.playbackGait = ir.pose, ir.pose === "squat" ? W8e(Dt) : q8e(Dt, ir.pose === "run" ? "run" : "walk"));
                } else (Kt.userData.playbackGait || Kt.userData.locomotion) && (nte(Kt.userData.locomotion), Kt.userData.playbackGait = void 0), vtn(Mt, () => {
                  bne(Mt, ir), VV(Mt, ir.bonePoses);
                }, Lt ? .2 : 0);
              } else Mt && !Mt.userData.poseBlend && !Qe && VV(Mt, ir.bonePoses);
              Kt.userData.appliedColor !== ir.color && aat(Kt, ir.color);
            } else ir.kind === "character" && Kt.userData.appliedColor !== ir.color && aat(Kt, ir.color);
            !Qe && !je && ($t ? (Kt.position.set(...$t.position), Kt.rotation.set(...ou($t.rotation)), Kt.scale.set(...$t.scale), GG(Kt, $t.opacity)) : (Z8e(Kt, ir), GG(Kt, ir.opacity ?? 1)));
          }
          ir.kind === "light" && (ZIa(Kt, ir), Kt.traverse($t => {
            $t.userData.isLightHelper && ($t.visible = !o && r !== "camera");
          })), zr.push(Kt);
          return;
        }
        Kt && An(ir.id);
        const kr = ur(ir);
        if (!kr) {
          Xe.current.delete(ir.id);
          return;
        }
        if (kr.add(VIa(ir.id)), kr.userData.isDirectorObjectRoot = !0, GG(kr, ir.opacity ?? 1), Le.current.set(ir.id, kr), Xe.current.set(ir.id, va), ("color" in kr.userData || "color" in ir) && (kr.userData.appliedColor = ir.color), _n.add(kr), ir.kind === "light" && (o || r === "camera") && kr.traverse($t => {
          $t.userData.isLightHelper && ($t.visible = !1);
        }), ir.kind === "character" && ir.id === A && S) {
          const $t = Ne.current.get(S);
          $t && fa(ir.id, S, $t);
        }
        zr.push(kr);
      }), Le.current.forEach((ir, Hr) => {
        const ha = vn.get(Hr);
        if (!ha) return;
        const Ga = ha.kind === "camera" && r === "camera";
        ir.visible = !Ga && JTe(ha, vn) && Tbt(ha, s, l) && HJt(ha, w, vn);
      });
      for (const ir of [...Le.current.keys()]) Dr.has(ir) || An(ir);
      e.forEach(ir => {
        if (ir.kind === "crowd") return;
        const Hr = Le.current.get(ir.id);
        if (!Hr) return;
        const ha = ir.parentId ? Le.current.get(ir.parentId) : null,
          Ga = ha && ha !== Hr ? ha : _n;
        Hr.parent !== Ga && Ga.add(Hr);
      }), _n.updateMatrixWorld(!0), J.current = zr.filter(ir => ir.visible), _n.userData.characterLabels = $Kn(_n), Le.current.forEach((ir, Hr) => {
        const ha = vn.get(Hr);
        ha && eIa(ir, ha, r === "top");
      }), ze.current || e.some(Hr => Hr.kind === "character" && (!!ce.current[Hr.pose] || !!pe.current)) && (ze.current = !0, m == null || m());
      const Wr = zr.find(ir => ir.userData.objectId === t),
        gr = e.find(ir => ir.id === t),
        jr = gr ? JTe(gr, vn) : !1,
        ea = (gr == null ? void 0 : gr.kind) === "character" || (gr == null ? void 0 : gr.kind) === "geometry" || (gr == null ? void 0 : gr.kind) === "prop",
        pa = a === "pose" && (gr == null ? void 0 : gr.kind) === "character" && !!t && !A;
      nn.current = pa ? t : null;
      const Br = vt.current;
      if (Br) {
        if (pa && (gr == null ? void 0 : gr.kind) === "character") {
          const ir = Le.current.get(t),
            Hr = ir == null ? void 0 : ir.userData.characterModel;
          if (Hr) {
            const ha = gW(Hr);
            Br.children.forEach(Ga => {
              const Za = Ga.userData.ikHandle,
                va = Ga.userData.ikBone;
              if (Za) {
                const Kt = nS(ha, GV[Za].effector);
                Ga.visible = !!Kt, Kt && Ga.position.copy(Kt.getWorldPosition(new dr()));
              } else if (va) {
                const Kt = yne.find(Mr => Mr.id === va),
                  kr = (Kt != null && Kt.displayBone ? nS(ha, Kt.displayBone) : void 0) ?? (Kt == null ? void 0 : Kt.bones.map(Mr => nS(ha, Mr)).find(Mr => !!Mr));
                Ga.visible = !!kr, kr && Ga.position.copy(kr.getWorldPosition(new dr()));
              }
            });
          }
        } else Br.children.forEach(ir => {
          ir.visible = !1;
        });
        Br.visible = pa;
      }
      if (Wr && jr && !o && !(gr != null && gr.locked) && a !== "pose" && gr && !A) {
        ar.object !== Wr && ar.attach(Wr);
        const ir = (gr == null ? void 0 : gr.kind) === "camera";
        (Jr = de.current) == null || Jr.setScaleEnabled(ea), (Kr = de.current) == null || Kr.setSpace(_), ar.setTranslationSnap(n.gridSnap ? .5 : null), ar.setRotationSnap(n.gridSnap && !ir ? Mo.degToRad(15) : null), ar.setScaleSnap(n.gridSnap ? .05 : null);
        const Hr = r === "director";
        ar.enabled = Hr, ar.getHelper().visible = Hr;
        const ha = ar._gizmo;
        ha && (ha.visible = !0);
      } else (ar.object || o) && (ar.detach(), ar.getHelper().visible = !1);
      const tn = Wr ?? null;
      De.current !== tn && (iat(De.current), De.current = tn), Ye.current && (iat(Ye.current), Ye.current = null, Ce.current = null);
    }, [e, t, n, a, r, kt, hn, o, s, l, d, w, _, A, S]);
    const ba = g.useCallback(() => {
        const jn = D.current,
          _n = V.current;
        if (!jn || !_n) return {
          zoom: 1,
          markers: []
        };
        const ar = _n.domElement.getBoundingClientRect();
        return {
          zoom: jn.zoom,
          markers: rIa(ln.current, Le.current, jn, ar.width, ar.height, Ot.current)
        };
      }, []),
      ga = g.useCallback((jn, _n) => {
        const ar = D.current,
          Vt = V.current;
        if (!ar || !Vt) return null;
        const vn = Vt.domElement.getBoundingClientRect(),
          An = new Qi((jn - vn.left) / vn.width * 2 - 1, -((_n - vn.top) / vn.height) * 2 + 1),
          ur = new tJ();
        ur.setFromCamera(An, ar);
        const zr = new dr(),
          Dr = new D1(new dr(0, 1, 0), 0);
        return ur.ray.intersectPlane(Dr, zr) ? {
          x: zr.x,
          z: zr.z
        } : null;
      }, []),
      _a = g.useRef(null),
      $a = g.useCallback((jn, _n, ar) => {
        const Vt = ln.current.find(zr => zr.kind === "camera" && zr.id === jn);
        if (!Vt) return;
        (!_a.current || _a.current.id !== jn) && (_a.current = {
          id: jn,
          position: [...Vt.position],
          lookAt: [...Vt.lookAt],
          ground: _n
        });
        const vn = _a.current,
          An = Number((vn.position[0] + _n.x - vn.ground.x).toFixed(2)),
          ur = Number((vn.position[2] + _n.z - vn.ground.z).toFixed(2));
        h(jn, {
          position: [An, vn.position[1], ur],
          lookAt: [Number((vn.lookAt[0] + An - vn.position[0]).toFixed(2)), vn.lookAt[1], Number((vn.lookAt[2] + ur - vn.position[2]).toFixed(2))]
        }, ar), ar || (_a.current = null);
      }, [h]),
      Ya = g.useCallback((jn, _n, ar) => {
        const Vt = ln.current.find(Dr => Dr.kind === "camera" && Dr.id === jn);
        if (!Vt) return;
        const vn = _n.x - Vt.position[0],
          An = _n.z - Vt.position[2];
        if (vn * vn + An * An < .0025) return;
        const ur = Math.max(.5, Math.hypot(Vt.lookAt[0] - Vt.position[0], Vt.lookAt[2] - Vt.position[2])),
          zr = Math.hypot(vn, An);
        h(jn, {
          lookAt: [Number((Vt.position[0] + vn / zr * ur).toFixed(2)), Vt.lookAt[1], Number((Vt.position[2] + An / zr * ur).toFixed(2))],
          rotation: [0, 0, 0]
        }, ar);
      }, [h]),
      ta = g.useCallback((jn, _n, ar) => {
        h(jn, {
          fov: Number(_n.toFixed(1))
        }, ar);
      }, [h]),
      ki = g.useCallback(jn => {
        Ke.current += jn * .035;
      }, []),
      Wn = g.useCallback(jn => {
        const _n = D.current,
          ar = q.current;
        !_n || !ar || (_n.zoom = Mo.clamp(_n.zoom * (jn > 0 ? 1.12 : 1 / 1.12), .35, 8), _n.updateProjectionMatrix(), ar.update());
      }, []),
      wr = g.useCallback(() => {
        const jn = D.current,
          _n = q.current;
        !jn || !_n || (Ke.current = 0, jn.up.set(0, 0, -1), jn.position.set(0, jn.position.y, 0), jn.zoom = 1, jn.updateProjectionMatrix(), _n.target.set(0, 0, 0), _n.update());
      }, []);
    return c.jsxs("div", {
      className: `relative h-full min-h-0 flex-1 overflow-hidden ${r === "top" ? "bg-[#030507]" : "bg-[#050508]"}`,
      children: [c.jsx("div", {
        ref: N,
        className: "h-full w-full"
      }), c.jsx("canvas", {
        ref: G,
        className: "pointer-events-none absolute inset-0 z-10 h-full w-full",
        "aria-hidden": !0
      }), c.jsx(k1a, {
        enabled: r === "top",
        getSnapshot: ba,
        screenToGround: ga,
        onSelect: u,
        onCameraMove: $a,
        onCameraLook: Ya,
        onCameraFov: ta
      })]
    });
  });

qKn.displayName = "Viewport3D";

const Pie = e => Number(e.toFixed(4)),
  lat = e => [Pie(e.x), Pie(e.y), Pie(e.z)],
  hCa = e => "scale" in e && e.scale ? e.scale : [1, 1, 1],
  pCa = e => {
    if (e.kind === "camera") {
      const t = new lu();
      return t.position.set(...e.position), t.lookAt(new dr(...e.lookAt)), Math.abs(e.rotation[2] ?? 0) > 1e-4 && t.rotateZ(Mo.degToRad(e.rotation[2])), t.quaternion.clone();
    }
    return new hl().setFromEuler(new xp(Mo.degToRad(e.rotation[0]), Mo.degToRad(e.rotation[1]), Mo.degToRad(e.rotation[2]), "XYZ"));
  },
  mCa = e => new bo().compose(new dr(...e.position), pCa(e), new dr(...hCa(e))),
  cat = (e, t) => {
    const n = new Map(e.map(o => [o.id, o])),
      r = [],
      a = new Set();
    let i = n.get(t);
    for (; i && !a.has(i.id);) r.unshift(i), a.add(i.id), i = i.parentId ? n.get(i.parentId) : void 0;
    return r.reduce((o, s) => o.multiply(mCa(s)), new bo());
  },
  _Dt = (e, t, n) => {
    if (!n) return !1;
    if (n === t) return !0;
    const r = new Map(e.map(o => [o.id, o])),
      a = new Set();
    let i = r.get(n);
    for (; i && !a.has(i.id);) {
      if (i.id === t) return !0;
      a.add(i.id), i = i.parentId ? r.get(i.parentId) : void 0;
    }
    return !1;
  },
  kDt = (e, t, n) => {
    const r = e.find(f => f.id === t),
      a = n || null;
    if (!r || r.parentId === a || a && !e.some(f => f.id === a) || _Dt(e, t, a)) return e;
    const i = cat(e, t),
      o = r.parentId ? cat(e, r.parentId) : new bo(),
      s = a ? cat(e, a) : new bo(),
      l = new bo().copy(s).invert().multiply(i),
      d = new dr(),
      u = new hl(),
      h = new dr();
    l.decompose(d, u, h);
    const p = new xp().setFromQuaternion(u, "XYZ"),
      m = {
        parentId: a,
        position: lat(d),
        rotation: [Pie(Mo.radToDeg(p.x)), Pie(Mo.radToDeg(p.y)), Pie(Mo.radToDeg(p.z))]
      };
    if ("scale" in r && (m.scale = lat(h)), r.kind === "camera") {
      const f = new dr(...r.lookAt).applyMatrix4(o);
      m.lookAt = lat(f.applyMatrix4(s.clone().invert()));
    }
    return e.map(f => f.id === t ? {
      ...f,
      ...m
    } : f);
  },
  fCa = (e, t) => {
    let n = e;
    return e.forEach(r => {
      !t.has(r.id) && r.parentId && t.has(r.parentId) && (n = kDt(n, r.id, null));
    }), n;
  },
  gCa = e => {
    const t = new Set(e.map(r => r.id));
    let n = e.map(r => r.parentId && (r.parentId === r.id || !t.has(r.parentId)) ? {
      ...r,
      parentId: null
    } : r);
    return n.forEach(r => {
      r.parentId && _Dt(n, r.id, r.parentId) && (n = n.map(a => a.id === r.id ? {
        ...a,
        parentId: null
      } : a));
    }), n;
  },
  yCa = ["position", "lookAt", "fov"],
  Dz = e => e.channels ? e.channels : yCa,
  Lz = e => {
    if (e.channels) return e.channels;
    const t = ["position", "rotation", "scale"];
    return (e.pose || e.poseAdjust || e.bonePoses) && t.push("pose"), t;
  },
  C6 = (e, t, n) => (e.keyframes ?? []).some(r => r.cameraId === t && Dz(r).includes(n)),
  G4 = (e, t, n) => (e.objectKeyframes ?? []).some(r => r.objectId === t && Lz(r).includes(n)),
  Rie = (e, t) => t === "smooth" ? e * e * (3 - 2 * e) : t === "hold" ? 0 : e,
  KKn = Math.PI / 180,
  Gve = (e, t, n) => [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n, e[2] + (t[2] - e[2]) * n],
  Uvt = (e, t) => [e[0] + t[0], e[1] + t[1], e[2] + t[2]],
  cze = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
  bCa = e => Math.hypot(e[0], e[1], e[2]),
  QKn = (e, t) => {
    const n = Math.cos(t),
      r = Math.sin(t);
    return [e[0] * n + e[2] * r, e[1], -e[0] * r + e[2] * n];
  },
  $vt = (e, t) => QKn(e, -t * KKn),
  Gvt = (e, t) => QKn(e, t * KKn),
  _tn = (e, t) => {
    const n = cze(e, t),
      r = bCa(n);
    return r < 1e-6 ? {
      radius: 0,
      yaw: 0,
      pitch: 0
    } : {
      radius: r,
      yaw: Math.atan2(n[0], n[2]),
      pitch: Math.asin(Math.max(-1, Math.min(1, n[1] / r)))
    };
  },
  vCa = (e, t) => {
    const n = Math.cos(e.pitch);
    return [t[0] + e.radius * Math.sin(e.yaw) * n, t[1] + e.radius * Math.sin(e.pitch), t[2] + e.radius * Math.cos(e.yaw) * n];
  },
  wCa = (e, t, n) => {
    let r = (t - e) % (Math.PI * 2);
    return r > Math.PI && (r -= Math.PI * 2), r < -Math.PI && (r += Math.PI * 2), e + r * n;
  },
  xCa = (e, t, n, r, a) => {
    const i = Gve(n, r, a),
      o = _tn(e, n),
      s = _tn(t, r);
    return o.radius < 1e-4 || s.radius < 1e-4 || Math.abs(o.pitch) > 1.35 && Math.abs(s.pitch) > 1.35 ? Gve(e, t, a) : vCa({
      radius: o.radius + (s.radius - o.radius) * a,
      yaw: wCa(o.yaw, s.yaw, a),
      pitch: o.pitch + (s.pitch - o.pitch) * a
    }, i);
  },
  Nie = (e, t) => {
    if (e.length === 0) return null;
    const n = [...e].sort((i, o) => i.frame - o.frame),
      r = n.filter(i => i.frame <= t),
      a = n.filter(i => i.frame >= t);
    return {
      prev: r[r.length - 1],
      next: a[0]
    };
  },
  _Ca = (e, t, n) => {
    const r = (e.keyframes ?? []).filter(u => u.cameraId === t);
    if (r.length === 0) return null;
    const a = e.interpolation,
      i = () => {
        const u = r.filter(y => Dz(y).includes("lookAt")),
          h = Nie(u, n);
        if (!(h != null && h.prev) && !(h != null && h.next)) return null;
        const p = h.prev ?? h.next,
          m = h.next ?? h.prev;
        if (p.id === m.id || a === "hold" || p.frame === m.frame) return [...p.lookAt];
        const f = Rie((n - p.frame) / (m.frame - p.frame), a);
        return Gve(p.lookAt, m.lookAt, f);
      },
      o = () => {
        const u = r.filter(y => Dz(y).includes("position")),
          h = Nie(u, n);
        if (!(h != null && h.prev) && !(h != null && h.next)) return null;
        const p = h.prev ?? h.next,
          m = h.next ?? h.prev;
        if (p.id === m.id || a === "hold" || p.frame === m.frame) return [...p.position];
        const f = Rie((n - p.frame) / (m.frame - p.frame), a);
        return xCa(p.position, m.position, p.lookAt, m.lookAt, f);
      },
      s = r.filter(u => Dz(u).includes("fov")),
      l = Nie(s, n);
    let d = null;
    if (l != null && l.prev || l != null && l.next) {
      const u = l.prev ?? l.next,
        h = l.next ?? l.prev;
      if (u.id === h.id || a === "hold" || u.frame === h.frame) d = u.fov;else {
        const p = Rie((n - u.frame) / (h.frame - u.frame), a);
        d = u.fov + (h.fov - u.fov) * p;
      }
    }
    return {
      position: C6(e, t, "position") ? o() : null,
      lookAt: C6(e, t, "lookAt") ? i() : null,
      fov: C6(e, t, "fov") ? d : null
    };
  },
  dze = (e, t, n, r) => {
    const a = t.find(o => o.id === n),
      i = ADt(e, n, r);
    return {
      position: (i == null ? void 0 : i.position) ?? (a == null ? void 0 : a.position) ?? [0, 0, 0],
      rotation: (i == null ? void 0 : i.rotation) ?? (a == null ? void 0 : a.rotation) ?? [0, 0, 0]
    };
  },
  YKn = (e, t) => {
    const n = (e.keyframes ?? []).filter(r => r.cameraId === t).map(r => r.frame);
    return n.length ? Math.min(...n) : 0;
  },
  kCa = (e, t, n, r, a, i, o) => {
    const s = dze(e, n, a, r),
      l = dze(e, n, a, YKn(e, t.id)),
      d = $vt(cze(i, l.position), l.rotation[1]),
      u = $vt(cze(o, l.position), l.rotation[1]);
    return {
      position: Uvt(s.position, Gvt(d, s.rotation[1])),
      lookAt: Uvt(s.position, Gvt(u, s.rotation[1]))
    };
  },
  ACa = (e, t, n, r) => {
    const a = _Ca(e, t.id, r);
    let i = (a == null ? void 0 : a.position) ?? t.position,
      o = (a == null ? void 0 : a.lookAt) ?? t.lookAt;
    const s = (a == null ? void 0 : a.fov) ?? t.fov,
      l = t.followTargetId || null,
      d = t.lookAtMode === "target" && t.lookAtTargetId || null;
    if (l && n.some(u => u.id === l)) {
      const u = kCa(e, t, n, r, l, i, o);
      i = u.position, o = u.lookAt;
    }
    if (d && d !== l && n.some(u => u.id === d)) {
      const u = dze(e, n, d, r),
        h = dze(e, n, d, YKn(e, t.id)),
        p = $vt(cze(o, h.position), h.rotation[1]);
      o = Uvt(u.position, Gvt(p, u.rotation[1]));
    }
    return {
      position: i,
      lookAt: o,
      fov: s
    };
  },
  SCa = (e, t, n = 0) => {
    if (!e && !t) return;
    if (!t || n <= 0) return e ? {
      ...e
    } : void 0;
    if (!e || n >= 1) return {
      ...t
    };
    const r = {
      ...e
    };
    return new Set([...Object.keys(e), ...Object.keys(t)]).forEach(i => {
      const o = e[i] ?? t[i],
        s = t[i] ?? e[i];
      if (!o || !s) return;
      const l = o[0],
        d = o[1],
        u = o[2],
        h = o[3];
      let p = s[0],
        m = s[1],
        f = s[2],
        y = s[3],
        b = l * p + d * m + u * f + h * y;
      if (b < 0 && (p = -p, m = -m, f = -f, y = -y, b = -b), b > .9995) {
        r[i] = [l + (p - l) * n, d + (m - d) * n, u + (f - u) * n, h + (y - h) * n];
        return;
      }
      const v = Math.acos(Math.min(1, b)),
        _ = Math.sin(v),
        w = Math.sin((1 - n) * v) / _,
        k = Math.sin(n * v) / _;
      r[i] = [l * w + p * k, d * w + m * k, u * w + f * k, h * w + y * k];
    }), r;
  },
  ADt = (e, t, n) => {
    const r = (e.objectKeyframes ?? []).filter(h => h.objectId === t);
    if (r.length === 0) return null;
    const a = e.interpolation,
      i = (h, p) => {
        const m = r.filter(_ => Lz(_).includes(h)),
          f = Nie(m, n);
        if (!(f != null && f.prev) && !(f != null && f.next)) return null;
        const y = f.prev ?? f.next,
          b = f.next ?? f.prev;
        if (y.id === b.id || a === "hold" || y.frame === b.frame) return [...p(y)];
        const v = Rie((n - y.frame) / (b.frame - y.frame), a);
        return Gve(p(y), p(b), v);
      },
      o = r.filter(h => Lz(h).includes("pose")),
      s = Nie(o, n);
    let l, d, u;
    if (s != null && s.prev || s != null && s.next) {
      const h = s.prev ?? s.next,
        p = s.next ?? s.prev;
      if (h.id === p.id || a === "hold" || h.frame === p.frame || Aie(h.pose) || Aie(p.pose)) l = h.pose, d = h.poseAdjust, u = h.bonePoses;else {
        const f = Rie((n - h.frame) / (p.frame - h.frame), a);
        l = f < .5 ? h.pose : p.pose, d = f < .5 ? h.poseAdjust : p.poseAdjust, u = SCa(h.bonePoses, p.bonePoses, f);
      }
    }
    return {
      position: G4(e, t, "position") ? i("position", h => h.position) : null,
      rotation: G4(e, t, "rotation") ? i("rotation", h => h.rotation) : null,
      scale: G4(e, t, "scale") ? i("scale", h => h.scale) : null,
      opacity: (() => {
        if (!G4(e, t, "opacity")) return null;
        const h = Nie(r.filter(b => Lz(b).includes("opacity")), n);
        if (!(h != null && h.prev) && !(h != null && h.next)) return null;
        const p = h.prev ?? h.next,
          m = h.next ?? h.prev,
          f = p.opacity ?? 1,
          y = m.opacity ?? 1;
        return p.id === m.id || a === "hold" || p.frame === m.frame ? f : f + (y - f) * Rie((n - p.frame) / (m.frame - p.frame), a);
      })(),
      pose: G4(e, t, "pose") ? l : void 0,
      poseAdjust: G4(e, t, "pose") ? d : void 0,
      bonePoses: G4(e, t, "pose") ? u : void 0,
      hasPose: G4(e, t, "pose")
    };
  },
  XKn = (e, t) => [...new Set([...(e ?? []), ...(t ?? [])])],
  dat = (e, t, n, r) => {
    const a = "scale" in e && e.scale ? e.scale : [1, 1, 1],
      i = e.kind === "character" ? e : null;
    return {
      id: (r == null ? void 0 : r.id) ?? `ok-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      frame: t,
      objectId: e.id,
      position: [...e.position],
      rotation: [...e.rotation],
      scale: [...a],
      opacity: Math.max(0, Math.min(1, e.opacity ?? 1)),
      pose: (i == null ? void 0 : i.pose) ?? (r == null ? void 0 : r.pose),
      poseAdjust: i != null && i.poseAdjust ? JSON.parse(JSON.stringify(i.poseAdjust)) : r == null ? void 0 : r.poseAdjust,
      bonePoses: i != null && i.bonePoses ? {
        ...i.bonePoses
      } : r == null ? void 0 : r.bonePoses,
      channels: XKn((r == null ? void 0 : r.channels) ?? (r ? Lz(r) : []), n)
    };
  },
  uat = (e, t, n, r) => ({
    id: (r == null ? void 0 : r.id) ?? `kf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    frame: t,
    cameraId: e.id,
    position: [...e.position],
    lookAt: [...e.lookAt],
    fov: e.fov,
    channels: XKn((r == null ? void 0 : r.channels) ?? (r ? Dz(r) : []), n)
  }),
  ICa = (e, t, n) => ({
    ...e,
    keyframes: e.keyframes.map(r => r.cameraId !== t ? r : {
      ...r,
      channels: Dz(r).filter(a => a !== n)
    }).filter(r => r.cameraId !== t || Dz(r).length > 0)
  }),
  CCa = (e, t, n) => ({
    ...e,
    objectKeyframes: (e.objectKeyframes ?? []).map(r => r.objectId !== t ? r : {
      ...r,
      channels: Lz(r).filter(a => a !== n)
    }).filter(r => r.objectId !== t || Lz(r).length > 0)
  }),
  D0e = 268,
  vne = 128,
  VI = D0e + vne,
  ECa = 4,
  TCa = 36,
  MCa = 26,
  PCa = 30,
  e6e = 32,
  ktn = 10,
  Atn = 7,
  RCa = e => {
    if (/^#[0-9a-fA-F]{6}$/.test(e)) return e;
    if (/^#[0-9a-fA-F]{3}$/.test(e)) {
      const t = e[1],
        n = e[2],
        r = e[3];
      return `#${t}${t}${n}${n}${r}${r}`;
    }
    return "#6e7cf0";
  },
  NCa = ({
    color: e,
    onLive: t,
    onCommit: n
  }) => (on(), c.jsx("label", {
    className: "relative grid h-3.5 w-3.5 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[3px] ring-1 ring-black/50 hover:ring-white/50",
    style: {
      background: e
    },
    title: x("修改图层颜色"),
    onClick: r => r.stopPropagation(),
    onPointerDown: r => r.stopPropagation(),
    children: c.jsx("input", {
      type: "color",
      value: RCa(e),
      className: "absolute -inset-1 h-5 w-5 cursor-pointer opacity-0",
      onClick: r => r.stopPropagation(),
      onPointerDown: r => r.stopPropagation(),
      onInput: r => t(r.target.value),
      onChange: r => n(r.target.value)
    })
  })),
  Stn = [5, 10, 15, 30, 45, 60, 90, 120, 180, 300],
  hat = ({
    value: e,
    options: t,
    onChange: n,
    width: r,
    menuWidth: a,
    title: i,
    leading: o,
    custom: s
  }) => {
    on();
    const [l, d] = g.useState(!1),
      [u, h] = g.useState(e),
      p = g.useRef(null),
      m = g.useRef(null),
      f = t.find(b => b.value === e) ?? t[0];
    g.useEffect(() => d(!1), [e]), g.useEffect(() => {
      l && h(e);
    }, [l, e]), g.useEffect(() => {
      if (!l) return;
      const b = _ => {
          var k;
          const w = _.target;
          w != null && w.closest('[data-gen-node-portal-dropdown="true"]') || (k = p.current) != null && k.contains(w) || d(!1);
        },
        v = _ => {
          _.key === "Escape" && d(!1);
        };
      return document.addEventListener("mousedown", b), document.addEventListener("keydown", v), () => {
        document.removeEventListener("mousedown", b), document.removeEventListener("keydown", v);
      };
    }, [l]);
    const y = () => {
      if (!s) return;
      const b = Number(u);
      if (!Number.isFinite(b)) return;
      const v = Math.max(s.min, Math.min(s.max, b));
      n(String(v)), d(!1);
    };
    return c.jsxs("div", {
      ref: p,
      className: "relative shrink-0",
      style: {
        width: r
      },
      onClick: b => b.stopPropagation(),
      children: [c.jsxs("button", {
        ref: m,
        type: "button",
        title: i,
        "aria-haspopup": "listbox",
        "aria-expanded": l,
        onClick: () => d(b => !b),
        className: `flex h-5 w-full items-center gap-1 rounded border px-1.5 text-[9px] font-medium outline-none transition-colors ${l ? "border-[#4db4ff]/60 bg-[#292929] text-white" : "border-white/[0.08] bg-[#1b1b1b] text-zinc-200 hover:border-white/20 hover:bg-[#292929]"}`,
        children: [o ?? (f == null ? void 0 : f.icon), c.jsx("span", {
          className: "min-w-0 flex-1 truncate text-left tabular-nums",
          children: (f == null ? void 0 : f.label) ?? e
        }), c.jsx(Mi, {
          size: 9,
          className: `shrink-0 text-zinc-500 transition-transform ${l ? "rotate-180" : ""}`
        })]
      }), c.jsxs(Tv, {
        open: l,
        anchorRef: m,
        isDark: !0,
        menuWidth: a,
        minWidth: Math.max(r, 96),
        maxHeight: s ? 320 : 260,
        placement: "auto",
        scrollToSelectedKey: e,
        children: [t.map(b => {
          const v = b.value === e;
          return c.jsxs("button", {
            type: "button",
            role: "option",
            "aria-selected": v,
            [Md]: v ? "true" : "false",
            [qk]: b.value,
            onClick: _ => {
              _.stopPropagation(), n(b.value), d(!1);
            },
            className: `flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-[10px] font-medium transition-colors hover:bg-zinc-800 ${v ? "bg-zinc-800 text-white" : "text-zinc-300"}`,
            children: [b.icon, c.jsx("span", {
              className: "min-w-0 flex-1 truncate",
              children: x(b.label)
            })]
          }, b.value);
        }), s && c.jsxs("div", {
          className: "mt-0.5 border-t border-white/[0.08] px-1.5 pb-1.5 pt-1.5",
          onMouseDown: b => b.stopPropagation(),
          children: [c.jsxs("div", {
            className: "mb-1 text-[9px] text-zinc-500",
            children: [x("自定义"), s.suffix ? `（${s.suffix}）` : ""]
          }), c.jsxs("form", {
            className: "flex items-center gap-1",
            onSubmit: b => {
              b.preventDefault(), y();
            },
            children: [c.jsx("input", {
              type: "number",
              min: s.min,
              max: s.max,
              step: s.step,
              value: u,
              placeholder: s.placeholder,
              onChange: b => h(b.target.value),
              onKeyDown: b => b.stopPropagation(),
              className: "h-6 min-w-0 flex-1 rounded border border-white/[0.1] bg-[#1b1b1b] px-1.5 text-[10px] tabular-nums text-zinc-100 outline-none [appearance:textfield] focus:border-[#4db4ff]/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            }), c.jsx("button", {
              type: "submit",
              className: "h-6 shrink-0 rounded bg-white/[0.08] px-1.5 text-[9px] text-zinc-200 hover:bg-white/[0.14] hover:text-white",
              children: x("确定")
            })]
          })]
        })]
      })]
    });
  },
  rte = e => e.map(t => Number.isFinite(t) ? t.toFixed(1) : "0.0").join(", "),
  Itn = (e, t) => {
    const n = Math.max(1, t),
      r = Math.max(0, Math.floor(e)),
      a = Math.floor(r / (n * 3600)),
      i = Math.floor(r / (n * 60)) % 60,
      o = Math.floor(r / n) % 60,
      s = r % n;
    return `${a}:${String(i).padStart(2, "0")}:${String(o).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  },
  jCa = (e, t, n) => (e - t) / Math.max(1, n - t) * 100,
  ate = e => Math.max(0, Math.min(100, e)),
  DCa = (e, t, n) => {
    if (n < 1) {
      const r = Math.floor(e),
        a = Math.max(0, Math.round((e - r) * t));
      return `${String(r).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
    }
    return e >= 60 ? `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}` : `${Math.round(e)}s`;
  },
  JKn = g.memo(({
    timeline: e,
    frame: t,
    totalFrames: n,
    playing: r,
    objects: a,
    selectedObjectId: i,
    height: o,
    collapsed: s = !1,
    onToggleCollapsed: l,
    onFrame: d,
    onTogglePlay: u,
    onMoveKeyframe: h,
    onDeleteKeyframe: p,
    onDeleteKeyframes: m,
    onToggleChannel: f,
    onUpdateObject: y,
    onSetParent: b,
    onUpdateAnimationClip: v,
    onDeleteAnimationClip: _,
    selectedAnimationClipId: w,
    onSelectAnimationClip: k,
    onResizeHeight: A,
    onSelectObject: S,
    onToggleVisible: C,
    onSetLayerSpan: I,
    onExportFrames: E,
    onExportVideo: M,
    exporting: T,
    exportAbstractCharacters: P,
    onToggleExportAbstract: R,
    onCopyKeyframes: j,
    onPasteKeyframes: B,
    onJumpKeyframe: F,
    onChange: N,
    autoKeyframe: G = !1,
    onToggleAutoKeyframe: z
  }) => {
    var ft;
    on();
    const V = g.useRef(null),
      O = g.useRef(null),
      L = g.useRef(!1),
      D = g.useRef(null),
      U = g.useRef(0),
      H = g.useRef(null),
      Y = g.useRef(new Set()),
      K = g.useRef(null),
      W = g.useRef(null),
      [Q, q] = g.useState(null),
      ne = g.useRef(Q);
    ne.current = Q;
    const de = g.useRef(null),
      [le, J] = g.useState(null),
      pe = g.useRef(le);
    pe.current = le;
    const [ce, we] = g.useState(t),
      [X, Z] = g.useState(0),
      [re, fe] = g.useState(new Set()),
      [ye, ie] = g.useState(null),
      [ae, be] = g.useState({}),
      [Ee, xe] = g.useState({}),
      [he, ue] = g.useState(null);
    Y.current = re;
    const ge = e.fps ?? 24,
      _e = e.durationSeconds ?? 15,
      ke = Math.max(0, n - 1),
      [ve, Te] = g.useState(1),
      [Ne, me] = g.useState(0),
      [Ae, Fe] = g.useState(900),
      Me = g.useRef(ve),
      Re = g.useRef(Ne),
      $e = Math.max(6, Math.round(ge * .5)),
      rt = Math.max(1, Math.min(Math.max(1, ke), Math.max($e, Math.max(1, ke) / ve))),
      nt = Math.max(0, Math.min(Math.max(0, ke - rt), Ne)),
      ze = Math.min(ke, nt + rt),
      Le = Math.max(1, ze - nt),
      Ke = ht => jCa(ht, nt, ze);
    Me.current = ve, Re.current = nt;
    const Xe = g.useRef(null),
      [De, Ye] = g.useState(null),
      Ce = g.useRef(De);
    Ce.current = De;
    const He = Math.max(0, Math.min(ke, Math.round((De == null ? void 0 : De.start) ?? e.workAreaStart ?? 0))),
      Ve = Math.max(He, Math.min(ke, Math.round((De == null ? void 0 : De.end) ?? e.workAreaEnd ?? ke)));
    g.useEffect(() => {
      L.current || we(t);
    }, [t]), g.useEffect(() => {
      const ht = V.current;
      if (!ht || typeof ResizeObserver > "u") return;
      const wt = new ResizeObserver(() => {
        Fe(Math.max(120, ht.getBoundingClientRect().width - VI));
      });
      return wt.observe(ht), Fe(Math.max(120, ht.getBoundingClientRect().width - VI)), () => wt.disconnect();
    }, []), g.useEffect(() => {
      const ht = Math.max(0, ke - rt);
      Re.current > ht && me(ht);
    }, [ke, rt]), g.useEffect(() => {
      L.current || ve <= 1 || (t < nt || t > ze) && me(Math.max(0, Math.min(ke - rt, t - rt / 2)));
    }, [t, ke, ve, ze, nt, rt]), g.useEffect(() => {
      const ht = new Set((e.characterAnimationClips ?? []).map(wt => wt.objectId));
      ht.size && be(wt => {
        let jt = !1;
        const bt = {
          ...wt
        };
        return ht.forEach(Bt => {
          bt[Bt] || (bt[Bt] = !0, jt = !0);
        }), jt ? bt : wt;
      });
    }, [e.characterAnimationClips]);
    const it = ht => {
        const wt = ht > 0 ? 1.5 : .6666666666666666,
          jt = Math.max(1, Math.min(64, Me.current * wt));
        if (Math.abs(jt - Me.current) < .001) return;
        const bt = Math.max(1, Math.min(Math.max(1, ke), Math.max($e, Math.max(1, ke) / jt))),
          Bt = Math.max(0, Math.min(Math.max(0, ke - bt), ce - bt / 2));
        Me.current = jt, Re.current = Bt, Te(jt), me(Bt);
      },
      It = ht => {
        var Bt;
        const wt = (Bt = V.current) == null ? void 0 : Bt.getBoundingClientRect();
        if (!wt) return 0;
        const jt = wt.width - VI;
        if (jt <= 0) return 0;
        const bt = (ht - wt.left - VI) / jt;
        return Math.max(0, Math.min(n - 1, Math.round(nt + bt * Le)));
      },
      Ft = (ht, wt, jt) => {
        if (ht.button !== 0) return;
        ht.preventDefault(), ht.stopPropagation(), ue(null), k == null || k(wt.id), S == null || S(wt.objectId), ht.currentTarget.setPointerCapture(ht.pointerId), de.current = {
          id: wt.id,
          mode: jt,
          pointerId: ht.pointerId,
          startX: ht.clientX,
          startFrame: wt.startFrame,
          durationFrames: wt.durationFrames
        };
        const bt = {
          id: wt.id,
          startFrame: wt.startFrame,
          durationFrames: wt.durationFrames
        };
        J(bt), pe.current = bt, S == null || S(wt.objectId);
      },
      We = ht => {
        const wt = de.current;
        if (!wt || wt.pointerId !== ht.pointerId) return;
        ht.preventDefault(), ht.stopPropagation();
        const jt = Math.round((ht.clientX - wt.startX) / Math.max(1, Ae) * Le);
        let bt = wt.startFrame,
          Bt = wt.durationFrames;
        if (wt.mode === "move") bt = Math.max(0, Math.min(Math.max(0, n - Bt), wt.startFrame + jt));else if (wt.mode === "start") {
          const at = Math.min(n, wt.startFrame + wt.durationFrames);
          bt = Math.max(0, Math.min(at - 1, wt.startFrame + jt)), Bt = Math.max(1, at - bt);
        } else Bt = Math.max(1, Math.min(n - wt.startFrame, wt.durationFrames + jt));
        const wn = {
          id: wt.id,
          startFrame: bt,
          durationFrames: Bt
        };
        J(wn), pe.current = wn;
      },
      Ze = ht => {
        const wt = de.current;
        if (!wt || wt.pointerId !== ht.pointerId) return;
        ht.preventDefault(), ht.stopPropagation();
        const jt = pe.current;
        de.current = null, J(null), pe.current = null, jt && (v == null || v(jt.id, {
          startFrame: jt.startFrame,
          durationFrames: jt.durationFrames
        })), ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId);
      },
      Ge = ht => {
        we(ht), D.current = ht, !U.current && (U.current = requestAnimationFrame(() => {
          U.current = 0;
          const wt = D.current;
          wt != null && d(wt);
        }));
      },
      Oe = ht => {
        ht.button === 0 && (ht.preventDefault(), ht.stopPropagation(), ht.currentTarget.setPointerCapture(ht.pointerId), L.current = !0, Ge(It(ht.clientX)));
      },
      st = ht => {
        L.current && Ge(It(ht.clientX));
      },
      vt = ht => {
        L.current && (L.current = !1, Ge(It(ht.clientX)), ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId));
      },
      Ht = (ht, wt) => {
        const jt = Math.max(0, Math.min(ke, Math.round(ht))),
          bt = Math.max(jt, Math.min(ke, Math.round(wt)));
        Ye({
          start: jt,
          end: bt
        }), Ce.current = {
          start: jt,
          end: bt
        };
      },
      nn = ht => wt => {
        wt.button === 0 && (wt.preventDefault(), wt.stopPropagation(), wt.currentTarget.setPointerCapture(wt.pointerId), Xe.current = {
          mode: ht,
          startX: wt.clientX,
          start: He,
          end: Ve
        });
      },
      pt = ht => {
        const wt = Xe.current;
        if (!wt) return;
        const jt = It(ht.clientX) - It(wt.startX);
        if (wt.mode === "start") Ht(Math.min(wt.start + jt, wt.end), wt.end);else if (wt.mode === "end") Ht(wt.start, Math.max(wt.end + jt, wt.start));else {
          const bt = wt.end - wt.start,
            Bt = Math.max(0, Math.min(ke - bt, wt.start + jt));
          Ht(Bt, Bt + bt);
        }
      },
      lt = ht => {
        const wt = Ce.current;
        Xe.current = null, Ye(null), Ce.current = null, wt && N({
          workAreaStart: wt.start,
          workAreaEnd: wt.end
        }), ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId);
      },
      gt = (ht, wt, jt, bt) => {
        var dt, xt;
        if (ht.button !== 0) return;
        ht.preventDefault(), ht.stopPropagation(), k == null || k(null), S == null || S(wt.id);
        const Bt = ht.currentTarget.getBoundingClientRect(),
          wn = ht.clientX - Bt.left,
          at = wn <= Atn ? "in" : wn >= Bt.width - Atn ? "out" : "move",
          Pt = bt.findIndex(yn => yn.id === jt.id);
        W.current = {
          id: wt.id,
          clipId: jt.id,
          mode: at,
          startX: ht.clientX,
          inFrame: jt.inFrame,
          outFrame: jt.outFrame,
          prevOut: ((dt = bt[Pt - 1]) == null ? void 0 : dt.outFrame) ?? 0,
          nextIn: ((xt = bt[Pt + 1]) == null ? void 0 : xt.inFrame) ?? n,
          multiClip: bt.length > 1,
          moved: !1
        }, ht.currentTarget.setPointerCapture(ht.pointerId);
      },
      Ut = (ht, wt, jt, bt) => {
        const Bt = Math.max(0, Math.min(ke, Math.round(jt))),
          wn = Math.max(Bt + 1, Math.min(n, Math.round(bt))),
          at = {
            id: ht,
            clipId: wt,
            inFrame: Bt,
            outFrame: wn
          };
        q(at), ne.current = at;
      },
      _t = ht => {
        const wt = W.current;
        if (!wt) return;
        const jt = It(ht.clientX) - It(wt.startX);
        if (jt !== 0 && (wt.moved = !0), wt.mode === "in") Ut(wt.id, wt.clipId, Math.min(Math.max(wt.inFrame + jt, wt.prevOut), wt.outFrame - 1), wt.outFrame);else if (wt.mode === "out") Ut(wt.id, wt.clipId, wt.inFrame, Math.max(Math.min(wt.outFrame + jt, wt.nextIn), wt.inFrame + 1));else {
          const bt = wt.outFrame - wt.inFrame,
            Bt = Math.max(wt.prevOut, Math.min(wt.nextIn - bt, wt.inFrame + jt));
          Ut(wt.id, wt.clipId, Bt, Bt + bt);
        }
      },
      At = ht => {
        const wt = W.current,
          jt = ne.current;
        if (W.current = null, q(null), ne.current = null, wt != null && wt.moved && jt && jt.id === wt.id && jt.clipId === wt.clipId) {
          const bt = wt.mode === "move" && !wt.multiClip ? jt.inFrame - wt.inFrame : 0;
          I(wt.id, jt.inFrame, jt.outFrame, bt, wt.clipId);
        }
        ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId);
      },
      Yt = ht => {
        ht.button === 0 && (ht.preventDefault(), ht.stopPropagation(), K.current = {
          y: ht.clientY,
          height: o
        }, ht.currentTarget.setPointerCapture(ht.pointerId));
      },
      qe = ht => {
        if (!K.current) return;
        const wt = K.current.height - (ht.clientY - K.current.y),
          jt = ht.currentTarget.closest("[data-director3d-workbench]"),
          bt = jt instanceof HTMLElement ? Math.round(jt.clientHeight * .62) : Math.round(window.innerHeight * .72);
        A(Math.max(148, Math.min(bt, wt)));
      },
      kt = ht => {
        K.current = null, ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId);
      },
      St = ht => {
        if (ht.button !== 0 || ht.target.closest("[data-kf], [data-layer-clip]")) return;
        ht.preventDefault(), ht.stopPropagation(), ht.currentTarget.setPointerCapture(ht.pointerId);
        const wt = {
          x0: ht.clientX,
          y0: ht.clientY,
          x1: ht.clientX,
          y1: ht.clientY,
          additive: ht.shiftKey
        };
        H.current = wt, ie(wt);
      },
      hn = ht => {
        H.current && (H.current = {
          ...H.current,
          x1: ht.clientX,
          y1: ht.clientY
        }, ie(H.current));
      },
      Qt = ht => {
        const wt = H.current;
        if (H.current = null, ie(null), ht.currentTarget.hasPointerCapture(ht.pointerId) && ht.currentTarget.releasePointerCapture(ht.pointerId), !wt || !V.current) return;
        const jt = Math.min(wt.x0, wt.x1),
          bt = Math.max(wt.x0, wt.x1),
          Bt = Math.min(wt.y0, wt.y1),
          wn = Math.max(wt.y0, wt.y1);
        if (bt - jt < 4 && wn - Bt < 4) {
          wt.additive || fe(new Set()), Ge(It(ht.clientX));
          return;
        }
        const at = wt.additive ? new Set(Y.current) : new Set();
        V.current.querySelectorAll("[data-kf]").forEach(Pt => {
          const dt = Pt.getBoundingClientRect(),
            xt = dt.left + dt.width / 2,
            yn = dt.top + dt.height / 2;
          xt >= jt && xt <= bt && yn >= Bt && yn <= wn && at.add(Pt.dataset.kf ?? "");
        }), at.delete(""), fe(at);
      };
    g.useEffect(() => () => {
      U.current && cancelAnimationFrame(U.current);
    }, []);
    const Ot = g.useMemo(() => {
        const ht = e.keyframes ?? [],
          wt = e.objectKeyframes ?? [],
          jt = a.filter(dt => dt.kind === "camera"),
          bt = a.filter(dt => dt.kind !== "camera" && dt.kind !== "crowd" && !(dt.kind === "character" && dt.parentCrowdId)),
          Bt = new Set(wt.map(dt => dt.objectId)),
          wn = new Set(bt.map(dt => dt.id)),
          at = [...Bt].filter(dt => !wn.has(dt)).map(dt => a.find(xt => xt.id === dt)).filter(dt => !!dt);
        return [...jt, ...bt, ...at].map(dt => {
          const xt = dt.kind === "camera" ? "camera" : "object",
            yn = xt === "camera" ? ht.filter(mt => mt.cameraId === dt.id).sort((mt, Xt) => mt.frame - Xt.frame) : wt.filter(mt => mt.objectId === dt.id).sort((mt, Xt) => mt.frame - Xt.frame),
            gn = xt === "camera" ? [{
              id: "position",
              channelId: "position",
              label: "位置",
              value: rte(dt.position)
            }, {
              id: "rotation",
              channelId: "lookAt",
              label: "旋转",
              value: rte(dt.rotation)
            }, {
              id: "lookAt",
              channelId: "lookAt",
              label: "朝向",
              value: rte(dt.lookAt)
            }, {
              id: "fov",
              channelId: "fov",
              label: "FOV",
              value: `${Math.round(dt.fov)}°`
            }] : [{
              id: "position",
              channelId: "position",
              label: "位置",
              value: rte(dt.position)
            }, {
              id: "rotation",
              channelId: "rotation",
              label: "旋转",
              value: rte(dt.rotation)
            }, {
              id: "scale",
              channelId: "scale",
              label: "缩放",
              value: rte("scale" in dt && dt.scale ? dt.scale : [1, 1, 1])
            }, {
              id: "opacity",
              channelId: "opacity",
              label: "透明度",
              value: `${Math.round((dt.opacity ?? 1) * 100)}%`
            }, ...(dt.kind === "character" ? [{
              id: "pose",
              channelId: "pose",
              label: "姿势",
              value: (() => {
                var Xt;
                const mt = ((Xt = ADt(e, dt.id, t)) == null ? void 0 : Xt.pose) ?? dt.pose;
                return Mjt[mt] ?? mt;
              })()
            }] : [])];
          return {
            id: dt.id,
            kind: xt,
            label: dt.name,
            color: dt.labelColor ?? dt.color ?? "#6e7cf0",
            object: dt,
            dots: yn,
            properties: gn
          };
        });
      }, [a, e.keyframes, e.objectKeyframes, e.interpolation, t]),
      ln = g.useMemo(() => {
        const ht = new Map();
        return Ot.forEach(wt => wt.dots.forEach(jt => ht.set(jt.id, wt.kind))), ht;
      }, [Ot]);
    g.useEffect(() => {
      be(ht => {
        const wt = {
          ...ht
        };
        for (const jt of Ot) wt[jt.id] === void 0 && (wt[jt.id] = jt.dots.length > 0);
        return wt;
      });
    }, [Ot]), g.useEffect(() => {
      const ht = () => {
          const jt = [];
          return Ot.forEach(bt => {
            bt.dots.forEach(Bt => {
              Y.current.has(Bt.id) && jt.push({
                kind: bt.kind,
                keyframe: Bt
              });
            });
          }), jt;
        },
        wt = jt => {
          const bt = jt.target;
          if (bt != null && bt.matches('input, textarea, select, [contenteditable="true"]')) return;
          const Bt = jt.ctrlKey || jt.metaKey,
            wn = jt.key === "+" || jt.key === "=" || jt.code === "NumpadAdd",
            at = jt.key === "-" || jt.key === "_" || jt.code === "NumpadSubtract";
          if (!Bt && !jt.altKey && (wn || at)) {
            jt.preventDefault(), jt.stopImmediatePropagation(), it(wn ? 1 : -1);
            return;
          }
          const Pt = {
              p: "position",
              s: "scale",
              t: "opacity",
              r: "rotation"
            },
            dt = !Bt && !jt.altKey ? Pt[jt.key.toLowerCase()] : void 0;
          if (dt && i && document.body.dataset.director3dControl !== "1") {
            const yn = Ot.find(mt => mt.id === i),
              gn = yn == null ? void 0 : yn.properties.find(mt => mt.id === dt);
            if (yn && gn) {
              jt.preventDefault(), jt.stopImmediatePropagation(), be(mt => ({
                ...mt,
                [yn.id]: !0
              })), xe(mt => {
                const Xt = mt[yn.id] ?? [],
                  Gn = jt.shiftKey ? [...new Set([...Xt, dt])] : [dt];
                return {
                  ...mt,
                  [yn.id]: Gn
                };
              }), ue({
                layerId: yn.id,
                propId: dt
              });
              return;
            }
          }
          if (Bt && jt.key.toLowerCase() === "c") {
            const yn = ht();
            if (!yn.length) return;
            jt.preventDefault(), jt.stopImmediatePropagation(), j(yn);
            return;
          }
          if (Bt && jt.key.toLowerCase() === "v") {
            jt.preventDefault(), jt.stopImmediatePropagation(), B();
            return;
          }
          if (jt.key !== "Delete" && jt.key !== "Backspace" || Y.current.size === 0) return;
          jt.preventDefault(), jt.stopImmediatePropagation();
          const xt = [...Y.current].map(yn => ({
            id: yn,
            kind: ln.get(yn)
          })).filter(yn => !!yn.kind);
          xt.length && m(xt), fe(new Set());
        };
      return window.addEventListener("keydown", wt, !0), () => window.removeEventListener("keydown", wt, !0);
    }, [ln, Ot, j, m, B, i, it]);
    const Pn = (ht, wt, jt) => {
      ht.preventDefault(), ht.stopPropagation();
      const bt = new Set(Y.current);
      ht.shiftKey ? bt.has(jt.id) ? bt.delete(jt.id) : bt.add(jt.id) : bt.has(jt.id) || (bt.clear(), bt.add(jt.id)), fe(bt);
      const Bt = {};
      Ot.forEach(wn => {
        wn.dots.forEach(at => {
          bt.has(at.id) && (Bt[at.id] = {
            kind: wn.kind,
            frame: at.frame
          });
        });
      }), Bt[jt.id] || (Bt[jt.id] = {
        kind: wt,
        frame: jt.frame
      }), O.current = {
        startX: ht.clientX,
        startFrame: jt.frame,
        moved: !1,
        offset: 0,
        orig: Bt
      }, Z(0);
    };
    g.useEffect(() => {
      const ht = jt => {
          const bt = O.current;
          if (!bt) return;
          const Bt = It(jt.clientX);
          Math.abs(jt.clientX - bt.startX) > ECa && (bt.moved = !0), bt.offset = Bt - bt.startFrame, Z(bt.offset);
        },
        wt = () => {
          const jt = O.current;
          O.current = null, Z(0), jt != null && jt.moved && Object.entries(jt.orig).forEach(([bt, Bt]) => {
            h(Bt.kind, bt, Math.max(0, Math.min(n - 1, Bt.frame + jt.offset)));
          });
        };
      return window.addEventListener("pointermove", ht), window.addEventListener("pointerup", wt), () => {
        window.removeEventListener("pointermove", ht), window.removeEventListener("pointerup", wt);
      };
    }, [h, n]);
    const rn = Ke(ce),
      Yn = g.useMemo(() => {
        const wt = Math.max(1 / ge, Le / ge) / Math.max(120, Ae) * 86,
          jt = [1 / ge, 2 / ge, 4 / ge, .25, .5, 1, 2, 5, 10, 15, 30, 60, 120],
          bt = jt.find(yn => yn >= wt) ?? jt[jt.length - 1],
          Bt = Math.max(1 / ge, bt / (bt >= 1 ? 4 : 2)),
          wn = nt / ge,
          at = ze / ge,
          Pt = Math.ceil((wn - 1e-6) / Bt),
          dt = Math.floor((at + 1e-6) / Bt),
          xt = new Map();
        for (let yn = Pt; yn <= dt; yn += 1) {
          const gn = yn * Bt,
            mt = Math.round(gn * ge),
            Xt = gn / bt,
            Gn = Math.abs(Xt - Math.round(Xt)) < .001;
          xt.set(mt, {
            frame: mt,
            major: Gn,
            label: Gn ? DCa(gn, ge, bt) : ""
          });
        }
        return [...xt.values()];
      }, [ge, Ae, ze, Le, nt]),
      Ct = (ht, wt) => {
        var wn;
        const jt = re.has(wt.id) || (wn = O.current) != null && wn.orig[wt.id] ? X : 0,
          bt = Ke(wt.frame + jt);
        if (bt < -1 || bt > 101) return null;
        const Bt = re.has(wt.id) || wt.frame === ce;
        return c.jsx("button", {
          type: "button",
          "data-kf": wt.id,
          onPointerDown: at => Pn(at, ht.kind, wt),
          onContextMenu: at => {
            at.preventDefault(), at.stopPropagation(), p(ht.kind, wt.id), fe(Pt => {
              const dt = new Set(Pt);
              return dt.delete(wt.id), dt;
            });
          },
          className: `absolute top-1/2 z-20 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 cursor-grab touch-none border ${Bt ? "border-black/30 bg-cyan-300" : "border-black/40 bg-zinc-100"}`,
          style: {
            left: `${bt}%`
          },
          title: x("第 {0} 帧 · 拖动改时间 · Del 删除", wt.frame)
        }, wt.id);
      },
      Cn = (ht, wt, jt, bt) => {
        y(ht, {
          [wt]: jt
        }, bt);
      },
      un = ht => ht ? "cursor-pointer bg-[#3a3a3a] text-white hover:bg-[#454545]" : "cursor-pointer bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]",
      Jn = Ke(He),
      Kn = Ke(Ve),
      en = ate(Jn),
      Vn = ate(Kn),
      Tt = Math.max(0, Vn - en),
      Ue = (ft = V.current) == null ? void 0 : ft.getBoundingClientRect(),
      et = ye && Ue ? {
        left: Math.min(ye.x0, ye.x1) - Ue.left,
        top: Math.min(ye.y0, ye.y1) - Ue.top,
        width: Math.abs(ye.x1 - ye.x0),
        height: Math.abs(ye.y1 - ye.y0)
      } : null;
    return c.jsxs("div", {
      "data-director-timeline": !0,
      "data-collapsed": s,
      className: "pointer-events-auto absolute inset-x-0 bottom-0 z-30 flex flex-col overflow-hidden border-t border-black/40 bg-[#1b1b1b] text-zinc-300",
      style: {
        height: o
      },
      children: [!s && c.jsx("div", {
        className: "absolute inset-x-0 top-0 z-50 h-1.5 cursor-ns-resize touch-none hover:bg-[#4db4ff]/40",
        onPointerDown: Yt,
        onPointerMove: qe,
        onPointerUp: kt,
        onPointerCancel: kt,
        title: x("拖动调整时间轴高度")
      }), c.jsxs("div", {
        className: "flex h-9 shrink-0 items-center gap-1.5 border-b border-white/[0.06] bg-[#232323] px-2",
        children: [c.jsxs("div", {
          className: "flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none]",
          children: [c.jsx("button", {
            onClick: u,
            className: "grid h-6 w-6 shrink-0 place-items-center rounded text-zinc-100 outline-none hover:bg-white/[0.08] focus:outline-none",
            title: x(r ? "暂停 (空格)" : "播放 (空格)"),
            children: r ? c.jsx(d3, {
              size: 13
            }) : c.jsx(Ol, {
              size: 13
            })
          }), c.jsx("button", {
            type: "button",
            onClick: () => F(-1),
            className: "grid h-6 w-6 shrink-0 place-items-center rounded text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-100",
            title: x("上一关键帧 (,)"),
            children: "‹"
          }), c.jsx("button", {
            type: "button",
            onClick: () => F(1),
            className: "grid h-6 w-6 shrink-0 place-items-center rounded text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-100",
            title: x("下一关键帧 (.)"),
            children: "›"
          }), c.jsx("span", {
            className: "w-[88px] shrink-0 text-[11px] font-semibold tabular-nums text-[#4db4ff]",
            children: Itn(ce, ge)
          }), c.jsx("div", {
            className: "mx-1 h-4 w-px bg-white/[0.08]"
          }), [["linear", "线性"], ["smooth", "平滑"], ["hold", "保持"]].map(([ht, wt]) => c.jsx("button", {
            title: x(ht === "hold" ? "保持到下一关键帧" : "机位在注视点周围环绕插值"),
            onClick: () => N({
              interpolation: ht
            }),
            className: `h-6 shrink-0 rounded px-1.5 text-[9px] ${(e.interpolation ?? "linear") === ht ? "text-[#7ec8ff]" : "text-zinc-500 hover:text-zinc-200"}`,
            children: wt
          }, ht)), c.jsx("div", {
            className: "mx-1 h-4 w-px bg-white/[0.08]"
          }), c.jsxs("button", {
            type: "button",
            disabled: T,
            onClick: M,
            className: "flex h-6 shrink-0 items-center gap-1 rounded px-1.5 text-[9px] text-zinc-400 hover:text-purple-300 disabled:opacity-40",
            title: x("导出工作区域内的视频"),
            children: [c.jsx(ws, {
              size: 11
            }), x(T ? "导出中" : "视频")]
          }), c.jsx("button", {
            type: "button",
            onClick: R,
            className: `h-6 shrink-0 rounded px-1.5 text-[9px] ${P ? "text-cyan-200" : "text-zinc-500 hover:text-zinc-200"}`,
            title: x("用胶囊人体替代精细角色，适合给视频生成做构图走位参考"),
            children: x("精简人体")
          }), c.jsx("div", {
            className: "mx-1 h-4 w-px bg-white/[0.08]"
          }), c.jsxs("div", {
            className: "flex h-6 shrink-0 items-center gap-1 rounded px-1.5 text-[9px] text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
            title: x("时间轴帧率"),
            children: [c.jsx("span", {
              children: "FPS"
            }), c.jsx(hat, {
              value: String(ge),
              width: 46,
              menuWidth: 88,
              title: x("选择时间轴帧率"),
              options: [...([12, 15, 24, 25, 30, 48, 50, 60].includes(ge) ? [] : [ge]), 12, 15, 24, 25, 30, 48, 50, 60].map(ht => ({
                value: String(ht),
                label: String(ht)
              })),
              onChange: ht => N({
                fps: Number(ht)
              })
            })]
          }), c.jsxs("div", {
            className: "flex h-6 shrink-0 items-center gap-1 rounded px-1.5 text-[9px] text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
            title: x("时间轴总时长（秒）"),
            children: [c.jsx("span", {
              children: x("时长")
            }), c.jsx(hat, {
              value: String(_e),
              width: 54,
              menuWidth: 128,
              title: x("选择或自定义时间轴时长"),
              options: [...(Stn.includes(_e) ? [] : [_e]), ...Stn].map(ht => ({
                value: String(ht),
                label: `${ht}s`
              })),
              custom: {
                min: .5,
                max: 600,
                step: .5,
                suffix: "秒",
                placeholder: "秒"
              },
              onChange: ht => {
                const wt = Number(ht);
                Number.isFinite(wt) && wt > 0 && N({
                  durationSeconds: Math.max(.5, Math.min(600, wt))
                });
              }
            })]
          }), c.jsx("div", {
            className: "mx-1 h-4 w-px bg-white/[0.08]"
          }), z && c.jsxs("button", {
            type: "button",
            title: x(G ? "自动关键帧（开）：导演/机位视角移动、摆姿、角色操控会自动打 K；走/跑/蹲记入姿势通道" : "自动关键帧（关）：仅手动 K"),
            onClick: z,
            className: `ml-0.5 flex h-6 shrink-0 items-center gap-1 rounded px-1.5 text-[9px] ${G ? "bg-cyan-400/15 text-cyan-200" : "text-zinc-500 hover:text-zinc-200"}`,
            children: [c.jsx(zRr, {
              size: 11,
              className: G ? "fill-cyan-300 text-cyan-300" : ""
            }), x("自动K")]
          }), c.jsxs("span", {
            className: "ml-auto shrink-0 text-[9px] tabular-nums text-zinc-500",
            children: [ce, " / ", Math.max(0, n - 1)]
          }), c.jsxs("div", {
            className: "ml-1 flex h-6 shrink-0 items-center rounded border border-white/[0.08] bg-black/20",
            children: [c.jsx("button", {
              type: "button",
              onClick: () => it(-1),
              className: "grid h-5 w-5 place-items-center text-zinc-500 hover:text-zinc-100",
              title: x("缩小时间轴 (-)"),
              children: c.jsx(AS, {
                size: 10
              })
            }), c.jsxs("span", {
              className: "w-9 text-center text-[8px] tabular-nums text-zinc-500",
              children: [Math.round(ve * 100), "%"]
            }), c.jsx("button", {
              type: "button",
              onClick: () => it(1),
              className: "grid h-5 w-5 place-items-center text-zinc-500 hover:text-zinc-100",
              title: x("放大时间轴 (+)"),
              children: c.jsx(eo, {
                size: 10
              })
            })]
          })]
        }), l && c.jsx("button", {
          type: "button",
          onClick: l,
          "aria-expanded": !s,
          "aria-label": x(s ? "展开时间轴" : "收起时间轴"),
          title: x(s ? "展开时间轴" : "收起时间轴"),
          className: "grid h-6 w-6 shrink-0 place-items-center rounded text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-cyan-300/60",
          children: s ? c.jsx(j2, {
            size: 14
          }) : c.jsx(Mi, {
            size: 14
          })
        })]
      }), c.jsxs("div", {
        ref: V,
        style: s ? {
          display: "none"
        } : void 0,
        className: "relative flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        children: [c.jsxs("div", {
          className: "sticky top-0 z-30 flex shrink-0 border-b border-black/50 bg-[#2a2a2a]",
          style: {
            height: e6e
          },
          children: [c.jsxs("div", {
            className: "flex shrink-0 border-r border-black/50",
            style: {
              width: VI
            },
            children: [c.jsxs("div", {
              className: "flex items-center justify-between border-r border-black/40 px-2",
              style: {
                width: D0e
              },
              children: [c.jsx("span", {
                className: "text-[10px] font-semibold tabular-nums text-[#4db4ff]",
                children: Itn(ce, ge)
              }), c.jsx("span", {
                className: "text-[9px] text-zinc-500",
                children: x("图层")
              })]
            }), c.jsxs("div", {
              className: "flex items-center justify-center gap-1 text-[9px] text-zinc-500",
              style: {
                width: vne
              },
              children: [c.jsx(wz, {
                size: 10
              }), x("父级和链接")]
            })]
          }), c.jsxs("div", {
            className: "relative min-w-0 flex-1 touch-none overflow-hidden",
            children: [c.jsx("div", {
              className: "absolute inset-x-0 top-0 cursor-ew-resize",
              style: {
                height: e6e - ktn
              },
              onPointerDown: Oe,
              onPointerMove: st,
              onPointerUp: vt,
              onPointerCancel: vt,
              children: Yn.map(ht => c.jsx("span", {
                className: `pointer-events-none absolute bottom-0 border-l ${ht.major ? "h-[15px] border-white/35" : "h-[7px] border-white/20"}`,
                style: {
                  left: `${Ke(ht.frame)}%`
                },
                children: ht.major && c.jsx("span", {
                  className: "absolute -top-[5px] left-1 whitespace-nowrap text-[9px] tabular-nums text-zinc-400",
                  children: ht.label
                })
              }, ht.frame))
            }), c.jsxs("div", {
              className: "absolute inset-x-0 bottom-0",
              style: {
                height: ktn
              },
              children: [c.jsx("div", {
                className: "absolute inset-y-0 left-0 bg-[#121212]",
                style: {
                  width: `${en}%`
                }
              }), c.jsx("div", {
                className: "absolute inset-y-0 bg-[#4a4a4a]",
                style: {
                  left: `${en}%`,
                  width: `${Tt}%`
                }
              }), c.jsx("div", {
                className: "absolute inset-y-0 right-0 bg-[#121212]",
                style: {
                  width: `${100 - Vn}%`
                }
              }), c.jsx("div", {
                className: "absolute inset-y-[2px] cursor-grab rounded-[1px] bg-[#d2d2d2] hover:bg-[#ececec]",
                style: {
                  left: `${en}%`,
                  width: `${Tt}%`
                },
                onPointerDown: nn("move"),
                onPointerMove: pt,
                onPointerUp: lt,
                onPointerCancel: lt,
                title: x("工作区域")
              }), c.jsx("button", {
                type: "button",
                title: x("工作区域开始"),
                className: "absolute top-0 z-10 h-full w-1.5 -translate-x-1/2 cursor-ew-resize bg-[#4db4ff]",
                style: {
                  left: `${en}%`,
                  display: Jn >= 0 && Jn <= 100 ? void 0 : "none"
                },
                onPointerDown: nn("start"),
                onPointerMove: pt,
                onPointerUp: lt,
                onPointerCancel: lt
              }), c.jsx("button", {
                type: "button",
                title: x("工作区域结尾"),
                className: "absolute top-0 z-10 h-full w-1.5 -translate-x-1/2 cursor-ew-resize bg-[#4db4ff]",
                style: {
                  left: `${Vn}%`,
                  display: Kn >= 0 && Kn <= 100 ? void 0 : "none"
                },
                onPointerDown: nn("end"),
                onPointerMove: pt,
                onPointerUp: lt,
                onPointerCancel: lt
              })]
            }), c.jsx("span", {
              className: "pointer-events-none absolute top-0 z-20 -translate-x-1/2",
              style: {
                left: `${rn}%`
              },
              children: c.jsx("span", {
                className: "block h-0 w-0 border-x-[6px] border-t-[9px] border-x-transparent border-t-[#4db4ff]"
              })
            })]
          })]
        }), Ot.length === 0 && c.jsx("div", {
          className: "grid h-16 place-items-center text-[10px] text-zinc-600",
          children: x("场景里还没有可显示的图层")
        }), Ot.map((ht, wt) => {
          var mt;
          const jt = ht.id === i,
            bt = !jt,
            Bt = !!ae[ht.id],
            wn = ((mt = ht.object) == null ? void 0 : mt.visible) !== !1,
            at = ht.dots.length > 0,
            Pt = ht.object,
            dt = Pt ? Tjt(Pt, n) : [],
            xt = Ee[ht.id],
            yn = xt != null && xt.length ? ht.properties.filter(Xt => xt.includes(Xt.id)) : ht.properties,
            gn = (Pt == null ? void 0 : Pt.kind) === "character" ? (e.characterAnimationClips ?? []).filter(Xt => Xt.objectId === Pt.id).sort((Xt, Gn) => Xt.startFrame - Gn.startFrame) : [];
          return c.jsxs("div", {
            "data-layer-row": ht.id,
            className: "shrink-0",
            children: [c.jsxs("div", {
              className: `flex border-b border-black/40 ${un(jt)}`,
              style: {
                height: TCa
              },
              onClick: () => {
                ue(null), k == null || k(null), S == null || S(ht.id);
              },
              children: [c.jsxs("div", {
                className: "flex shrink-0 border-r border-black/40",
                style: {
                  width: VI
                },
                children: [c.jsxs("div", {
                  className: "flex items-center gap-1 border-r border-black/30 px-1.5",
                  style: {
                    width: D0e
                  },
                  children: [c.jsx("button", {
                    type: "button",
                    className: "grid h-4 w-4 place-items-center text-white/80 hover:text-white",
                    onClick: Xt => {
                      Xt.stopPropagation(), be(Gn => ({
                        ...Gn,
                        [ht.id]: !Bt
                      })), Bt || xe(Gn => ({
                        ...Gn,
                        [ht.id]: void 0
                      }));
                    },
                    children: Bt ? c.jsx(Mi, {
                      size: 11
                    }) : c.jsx(ss, {
                      size: 11
                    })
                  }), c.jsx("button", {
                    type: "button",
                    className: "grid h-4 w-4 place-items-center text-white/80 hover:text-white",
                    onClick: Xt => {
                      Xt.stopPropagation(), C == null || C(ht.id);
                    },
                    title: x(wn ? "隐藏" : "显示"),
                    children: wn ? c.jsx(ul, {
                      size: 11
                    }) : c.jsx($d, {
                      size: 11
                    })
                  }), c.jsx("span", {
                    className: "w-3 text-center text-[9px] tabular-nums text-white/70",
                    children: wt + 1
                  }), c.jsx(NCa, {
                    color: ht.color,
                    onLive: Xt => y(ht.id, {
                      labelColor: Xt
                    }, !0),
                    onCommit: Xt => y(ht.id, {
                      labelColor: Xt
                    }, !1)
                  }), ht.kind === "camera" ? c.jsx(Kh, {
                    size: 11,
                    className: "shrink-0 text-white"
                  }) : c.jsx(kU, {
                    size: 11,
                    className: "shrink-0 text-white"
                  }), c.jsx("button", {
                    type: "button",
                    className: "min-w-0 flex-1 truncate text-left text-[11px] font-medium text-white",
                    onClick: Xt => {
                      Xt.stopPropagation(), ue(null), k == null || k(null), S == null || S(ht.id);
                    },
                    children: ht.label
                  }), c.jsx(cxe, {
                    size: 11,
                    className: at ? "shrink-0 text-[#4db4ff]" : "shrink-0 text-white/45"
                  })]
                }), c.jsx("div", {
                  className: "flex items-center justify-center px-1",
                  style: {
                    width: vne
                  },
                  children: Pt && b && c.jsx(hat, {
                    value: Pt.parentId ?? "",
                    width: vne - 8,
                    menuWidth: 190,
                    title: x("选择父级；子级会继承父级的移动、旋转和缩放"),
                    leading: c.jsx(wz, {
                      size: 10,
                      className: Pt.parentId ? "text-[#7ec8ff]" : "text-zinc-600"
                    }),
                    options: [{
                      value: "",
                      label: "无"
                    }, ...Ot.filter(Xt => Xt.id !== ht.id && !_Dt(a, ht.id, Xt.id)).map((Xt, Gn) => ({
                      value: Xt.id,
                      label: `${Gn + 1}. ${Xt.label}`,
                      icon: Xt.kind === "camera" ? c.jsx(Kh, {
                        size: 10
                      }) : c.jsx(kU, {
                        size: 10
                      })
                    }))],
                    onChange: Xt => b(ht.id, Xt || null)
                  })
                })]
              }), c.jsx("div", {
                className: "relative min-w-0 flex-1 cursor-crosshair touch-none overflow-hidden",
                onPointerDown: Xt => {
                  k == null || k(null), S == null || S(ht.id), St(Xt);
                },
                onPointerMove: hn,
                onPointerUp: Qt,
                onPointerCancel: Qt,
                children: dt.map(Xt => {
                  const Gn = (Q == null ? void 0 : Q.id) === ht.id && Q.clipId === Xt.id ? Q : null,
                    rr = (Gn == null ? void 0 : Gn.inFrame) ?? Xt.inFrame,
                    qn = (Gn == null ? void 0 : Gn.outFrame) ?? Xt.outFrame,
                    Dn = Ke(rr),
                    Ar = Ke(qn);
                  if (Ar < 0 || Dn > 100) return null;
                  const _r = ate(Dn),
                    Pa = ate(Ar);
                  return c.jsxs("div", {
                    "data-layer-clip": Xt.id,
                    className: "absolute inset-y-[7px] cursor-grab rounded-[4px] active:cursor-grabbing",
                    style: {
                      background: ht.color,
                      opacity: jt ? 1 : bt ? .38 : .9,
                      filter: bt ? "grayscale(0.55) brightness(0.72)" : void 0,
                      left: `${_r}%`,
                      width: `${Math.max(1.2, Pa - _r)}%`
                    },
                    title: x("拖动边缘裁剪，拖动色块移动"),
                    onPointerDown: fa => gt(fa, ht, Xt, dt),
                    onPointerMove: _t,
                    onPointerUp: At,
                    onPointerCancel: At,
                    children: [c.jsx("span", {
                      className: "absolute inset-y-0 left-0 z-10 w-1.5 cursor-ew-resize rounded-l-[3px] hover:bg-white/40"
                    }), c.jsx("span", {
                      className: "absolute inset-y-0 right-0 z-10 w-1.5 cursor-ew-resize rounded-r-[3px] hover:bg-white/40"
                    })]
                  }, Xt.id);
                })
              })]
            }), Bt && Pt && yn.map(Xt => {
              const Gn = Xt.channelId ?? Xt.id,
                rr = ht.kind === "camera" ? C6(e, ht.id, Gn) : G4(e, ht.id, Gn),
                qn = ht.dots.filter(Ar => ht.kind === "camera" ? Dz(Ar).includes(Gn) : Lz(Ar).includes(Gn)),
                Dn = (he == null ? void 0 : he.layerId) === ht.id && he.propId === Xt.id;
              return c.jsxs("div", {
                className: `flex cursor-pointer border-b border-black/30 ${Dn ? "bg-[#3a3a3a] text-white" : "bg-[#242424] text-white hover:bg-[#333333]"}`,
                style: {
                  height: MCa
                },
                onClick: Ar => {
                  Ar.stopPropagation(), ue({
                    layerId: ht.id,
                    propId: Xt.id
                  }), k == null || k(null), S == null || S(ht.id);
                },
                children: [c.jsxs("div", {
                  className: "flex shrink-0 border-r border-black/40",
                  style: {
                    width: VI
                  },
                  children: [c.jsxs("div", {
                    className: "flex items-center gap-1.5 border-r border-black/30 pl-9 pr-2",
                    style: {
                      width: D0e
                    },
                    children: [c.jsx("button", {
                      type: "button",
                      title: x(rr ? "关闭动画（删除该属性全部关键帧）" : "启用动画并在当前时间打关键帧"),
                      onClick: () => f(ht.id, ht.kind, Gn),
                      className: `grid h-4 w-4 place-items-center ${rr ? "text-[#4db4ff]" : "text-white/40 hover:text-white"}`,
                      children: c.jsx(cxe, {
                        size: 10
                      })
                    }), c.jsx("span", {
                      className: "w-10 shrink-0 text-[10px] text-white",
                      children: x(Xt.label)
                    }), Xt.id === "scale" && "scale" in Pt && c.jsx("button", {
                      type: "button",
                      title: Pt.uniformScale !== !1 ? x("等比缩放（开）") : x("等比缩放（关）"),
                      onClick: Ar => {
                        Ar.stopPropagation();
                        const _r = Pt.uniformScale === !1,
                          Pa = {
                            uniformScale: _r
                          };
                        if (_r && Pt.scale) {
                          const fa = Number(((Pt.scale[0] + Pt.scale[1] + Pt.scale[2]) / 3 || 1).toFixed(2));
                          Pa.scale = [fa, fa, fa];
                        }
                        y(Pt.id, Pa, !1);
                      },
                      className: `mr-0.5 grid h-4 w-4 shrink-0 place-items-center rounded ${Pt.uniformScale !== !1 ? "text-[#7ec8ff]" : "text-zinc-600 hover:text-zinc-300"}`,
                      children: c.jsx(wz, {
                        size: 10
                      })
                    }), Xt.id === "fov" && Pt.kind === "camera" ? c.jsx("span", {
                      className: "min-w-0 flex-1 truncate text-right text-[10px] tabular-nums text-[#7ec8ff]",
                      children: c.jsx(A_e, {
                        value: Pt.fov,
                        suffix: "°",
                        step: .2,
                        onLive: Ar => y(Pt.id, {
                          fov: Ar
                        }, !0),
                        onCommit: Ar => y(Pt.id, {
                          fov: Math.max(10, Math.min(120, Ar))
                        }, !1)
                      })
                    }) : Xt.id === "opacity" ? c.jsx("span", {
                      className: "min-w-0 flex-1 truncate text-right text-[10px] tabular-nums text-[#7ec8ff]",
                      children: c.jsx(A_e, {
                        value: (Pt.opacity ?? 1) * 100,
                        suffix: "%",
                        step: 1,
                        onLive: Ar => y(Pt.id, {
                          opacity: Math.max(0, Math.min(100, Ar)) / 100
                        }, !0),
                        onCommit: Ar => y(Pt.id, {
                          opacity: Math.max(0, Math.min(100, Ar)) / 100
                        }, !1)
                      })
                    }) : Xt.id === "pose" ? c.jsx("span", {
                      className: "min-w-0 flex-1 truncate text-right text-[10px] tabular-nums text-[#7ec8ff]",
                      children: Xt.value
                    }) : c.jsx("span", {
                      className: "min-w-0 flex-1",
                      children: c.jsx(l1a, {
                        value: Xt.id === "lookAt" && Pt.kind === "camera" ? Pt.lookAt : Xt.id === "scale" && "scale" in Pt && Pt.scale ? Pt.scale : Xt.id === "rotation" ? Pt.rotation : Pt.position,
                        uniform: Xt.id === "scale" && Pt.uniformScale !== !1,
                        onLive: Ar => Cn(Pt.id, Xt.id, Ar, !0),
                        onCommit: Ar => Cn(Pt.id, Xt.id, Ar, !1)
                      })
                    })]
                  }), c.jsx("div", {
                    className: "shrink-0",
                    style: {
                      width: vne
                    }
                  })]
                }), c.jsx("div", {
                  className: "relative min-w-0 flex-1 cursor-crosshair touch-none overflow-hidden",
                  onPointerDown: Ar => {
                    k == null || k(null), S == null || S(ht.id), St(Ar);
                  },
                  onPointerMove: hn,
                  onPointerUp: Qt,
                  onPointerCancel: Qt,
                  children: qn.map(Ar => Ct(ht, Ar))
                })]
              }, Xt.id);
            }), Bt && (Pt == null ? void 0 : Pt.kind) === "character" && gn.map(Xt => {
              const Gn = (le == null ? void 0 : le.id) === Xt.id ? le : null,
                rr = (Gn == null ? void 0 : Gn.startFrame) ?? Xt.startFrame,
                qn = (Gn == null ? void 0 : Gn.durationFrames) ?? Xt.durationFrames,
                Dn = Ke(rr),
                Ar = Ke(rr + qn),
                _r = ate(Dn),
                Pa = ate(Ar),
                Ca = Math.max(1, Xt.sourceDurationSeconds * ge) / Math.max(1, qn),
                $n = w === Xt.id;
              return c.jsxs("div", {
                className: `flex cursor-pointer border-b border-black/30 ${$n ? "bg-[#3a3a3a] text-white" : "bg-[#242424] text-white hover:bg-[#333333]"}`,
                style: {
                  height: PCa
                },
                onClick: yr => {
                  yr.stopPropagation(), ue(null), k == null || k(Xt.id), S == null || S(ht.id);
                },
                children: [c.jsxs("div", {
                  className: "flex shrink-0 border-r border-black/40",
                  style: {
                    width: VI
                  },
                  children: [c.jsxs("div", {
                    className: "flex min-w-0 items-center gap-1.5 border-r border-black/30 pl-9 pr-2",
                    style: {
                      width: D0e
                    },
                    children: [c.jsx(uZ, {
                      size: 11,
                      className: "shrink-0 text-[#a79cff]"
                    }), c.jsx("span", {
                      className: "shrink-0 text-[9px] text-zinc-500",
                      children: x("动画")
                    }), c.jsx("span", {
                      className: "min-w-0 flex-1 truncate text-[10px] font-medium text-zinc-100",
                      title: Xt.name,
                      children: Xt.name
                    }), c.jsxs("span", {
                      className: "flex shrink-0 items-center gap-0.5 rounded bg-[#7164d8]/20 px-1 py-0.5 text-[8px] text-[#bdb5ff]",
                      children: [Xt.mode === "loop" ? c.jsx(vTn, {
                        size: 8
                      }) : c.jsx(Ol, {
                        size: 8
                      }), Xt.mode === "loop" ? x("循环") : x("单次")]
                    })]
                  }), c.jsx("div", {
                    className: "shrink-0",
                    style: {
                      width: vne
                    }
                  })]
                }), c.jsx("div", {
                  className: "relative min-w-0 flex-1 overflow-hidden bg-[#1d1d22]",
                  children: Ar >= 0 && Dn <= 100 && c.jsxs("div", {
                    className: "absolute inset-y-[4px] z-10 cursor-grab select-none overflow-hidden rounded-[3px] border border-[#b8b0ff]/45 bg-[#7367d8] shadow-[0_1px_5px_rgba(0,0,0,0.35)] active:cursor-grabbing",
                    style: {
                      left: `${_r}%`,
                      width: `${Math.max(1.4, Pa - _r)}%`
                    },
                    title: x(`{0} · {1} · {2}×
拖动片段移动；拖动两端改变动画速度；右键删除`, Xt.name, Xt.mode === "loop" ? "循环播放" : "单次播放", Ca.toFixed(2)),
                    onPointerDown: yr => Ft(yr, Xt, "move"),
                    onPointerMove: We,
                    onPointerUp: Ze,
                    onPointerCancel: Ze,
                    onContextMenu: yr => {
                      yr.preventDefault(), yr.stopPropagation(), _ == null || _(Xt.id);
                    },
                    children: [c.jsx("span", {
                      className: "absolute inset-y-0 left-0 z-20 w-2 cursor-ew-resize border-l-2 border-[#ddd9ff] bg-white/5 hover:bg-white/25",
                      onPointerDown: yr => Ft(yr, Xt, "start"),
                      onPointerMove: We,
                      onPointerUp: Ze,
                      onPointerCancel: Ze
                    }), c.jsxs("span", {
                      className: "pointer-events-none absolute inset-x-2 top-0 flex h-full min-w-0 items-center gap-1 px-1 text-[9px] text-white",
                      children: [c.jsx("span", {
                        className: "min-w-0 flex-1 truncate font-medium",
                        children: Xt.name
                      }), c.jsxs("span", {
                        className: "shrink-0 tabular-nums text-white/75",
                        children: [Ca.toFixed(2), "×"]
                      })]
                    }), c.jsx("span", {
                      className: "absolute inset-y-0 right-0 z-20 w-2 cursor-ew-resize border-r-2 border-[#ddd9ff] bg-white/5 hover:bg-white/25",
                      onPointerDown: yr => Ft(yr, Xt, "end"),
                      onPointerMove: We,
                      onPointerUp: Ze,
                      onPointerCancel: Ze
                    })]
                  })
                })]
              }, Xt.id);
            })]
          }, ht.id);
        }), c.jsx("div", {
          className: "min-h-12 flex-1",
          onPointerDown: () => {
            k == null || k(null), S == null || S(null);
          }
        }), c.jsxs("div", {
          className: "pointer-events-none absolute z-[12] overflow-hidden",
          style: {
            left: VI,
            right: 0,
            top: e6e,
            bottom: 0
          },
          children: [c.jsx("div", {
            className: "absolute inset-y-0 left-0 bg-[#0a0a0a]/72",
            style: {
              width: `${en}%`
            }
          }), c.jsx("div", {
            className: "absolute inset-y-0 bg-white/[0.06]",
            style: {
              left: `${en}%`,
              width: `${Tt}%`
            }
          }), c.jsx("div", {
            className: "absolute inset-y-0 right-0 bg-[#0a0a0a]/72",
            style: {
              width: `${100 - Vn}%`
            }
          })]
        }), c.jsx("div", {
          className: "pointer-events-none absolute z-40 w-px bg-[#4db4ff]",
          style: {
            left: `calc(${VI}px + (100% - ${VI}px) * ${rn / 100})`,
            top: e6e,
            bottom: 0
          }
        }), et && c.jsx("div", {
          className: "pointer-events-none absolute z-50 border border-white/80 bg-white/[0.08]",
          style: et
        })]
      })]
    });
  });

JKn.displayName = "TimelineBar";

const ZKn = ["box", "sphere", "cylinder", "ring", "cone", "prism"],
  eQn = `
用户要求运镜时必须返回cameraPlans数组，最多6个机位。每项：
{"name":"环绕长镜头","sourceCameraId":"已有机位id，可省略使用当前机位","copyKeyframes":false,"segments":[{"kind":"orbit","durationSeconds":12,"degrees":360,"direction":"clockwise"}]}
新建场景时省略sourceCameraId。仅复制机位及其关键帧时，设置copyKeyframes:true且不提供segments；不能同时复制与重新编排。
segments最多8段，每段durationSeconds为1到60秒，总时长不超过180秒。多个生成机位按数组顺序接续播放；复制机位保留原关键帧时间。
kind支持orbit（绕当前注视点，degrees为15到720度，direction为clockwise/counterclockwise）、dolly_in、dolly_out、crane_up、crane_down、hold、path。
path使用cameraPoints和targetPoints两个坐标数组（各2到24点），cameraPoints首点必须等于上一段机位终点，targetPoints首点等于上一段注视点。也可以用position、lookAt、fov在plan层设置这个新机位的初始状态。
一镜到底必须用同一个plan的连续segments实现，不要切换多个机位。前一段终点就是后一段起点。完整环绕用orbit+360，不要只给相同的首尾坐标。未要求时长默认12秒。只生成静态场景时可以省略cameraPlans。
summary字段放在JSON最前面，用简短中文说明布景/运镜方案（120字以内），不包含内部推理。`,
  LCa = `你是3D镜头编排师。根据用户指令和当前场景信息，新增可播放的机位和关键帧，保留现有场景。只输出完整JSON：{"summary":"运镜方案","cameraPlans":[...]}。Y轴向上，单位米，fov为角度。不要输出代码、外部资源或修改场景物体。${eQn}`,
  tQn = `你是3D场景搭建师。把用户描述变成画布中可编辑的预演布景，只返回一个完整JSON，不要代码或说明。
使用米为单位，Y轴向上，地面Y=0，旋转为角度。角色与道具的position为脚底，基础几何体position为中心。
注意真实尺寸、物体间距、朝向、地面接触、前中后景。目标是能辨认的粗模，不是精细自定义模型。
最多80个物体。必须有主体，并设置能看清主体的机位。室内可省略挡住镜头的前墙。无人物要求时不添加人物。
格式：{"summary":"简短搭建方案","objects":[{"kind":"geometry","geometry":"box","name":"主体·底座","position":[0,0.2,0],"rotation":[0,0,0],"scale":[4,0.4,3],"color":"#8d99a8"}],"camera":{"position":[6,4,8],"lookAt":[0,1,0],"fov":45},"environment":{"skyColor":"#181b24","ambientIntensity":0.6,"keyIntensity":1.4,"keyColor":"#fff0da"}}
基础物体：
geometry: geometry可选${ZKn.join("/")}。scale是局部XYZ缩放倍率，先缩放再按XYZ欧拉角旋转，最后平移。
box尺寸[1,1,1]；sphere半径0.55（直径1.1）；cylinder半径0.5、高1，轴沿Y；cone半径0.55、高1.15，尖端朝+Y；prism实际是五棱锥，半径0.58、高1.15，不能当作三角翼；ring是XY平面圆环，主半径0.5、管半径0.16。
例如长6米、直径1米且朝-Z的圆柱，scale=[1,6,1]、rotation=[-90,0,0]，不是scale=[1,1,6]。圆锥尖端朝-Z也用rotation=[-90,0,0]。
light: light可选point/directional/spot，intensity范围0到20，可选distance范围0到200。
所有物体必须有kind、name、position；坐标范围-200到200，rotation默认[0,0,0]，scale默认[1,1,1]且每轴0.01到100，color为六位十六进制颜色。
camera必须有position、lookAt，fov范围15到100。不要输出URL、代码、父子关系或外部资产。
组合主体的规则：
先确定主体的轮廓、长宽高比例和辨识部件，再输出部件的世界坐标。单个主体通常12–28个几何部件；多主体时减少细节，优先保证每个主体可辨认，不用装饰耗尽物体预算。
默认主体前方为-Z，左右为X，向上为Y。相连部件略微相交避免缝隙，左右部件镜像对称；机身/车体、机翼/履带等分别命名为“主体名·部件名”。主体用2–4种色块，环境简洁，禁止用名字掩饰不匹配的形状。
飞机：细长机身、圆锥机鼻、左右主翼、水平尾翼、垂直尾翼、座舱和发动机；按用户要求区分客机、运输机与战机的翼展、机身比例和尾翼数量。
战机：突出尖机鼻、后掠主翼、座舱和尾喷口，需要双垂尾就搭左右两个。机翼可用薄box后掠摆放，三角翼可用cone压薄后旋转成水平三角轮廓；不要用圆柱充当机翼。
坦克：低矮宽车体、左右两条履带、上方炮塔和前伸炮管。履带可由深色长box与少量侧面圆柱轮组合；炮管沿前方伸出炮塔，不要套用汽车代替坦克。只表现外形，不添加内部机械结构。
其他主体也按辨识部件组合，不局限于上述例子。不要添加用户未要求的武器、角色或繁杂背景。
提交前检查部件连接、左右对称、接地与朝向；主机位从前侧斜上方看完整主体，lookAt对准主体中心，按整体尺寸后退并保留画面边距，不能裁掉翼尖或炮管。
${eQn}`,
  OCa = `${tQn}
当前方式：自动布景。目录内形状、用途都匹配的道具可以直接使用；目录缺少或轮廓不符的主体，必须用多个geometry组合。尤其飞机、战机、坦克，不得用名字近似的汽车、房屋等道具凑数。
还支持prop：modelId必须来自下方目录，scale为相对原尺寸的倍率；character：pose可选${Pjt.join("/")}，原身高约1.8米，scale通常[1,1,1]。
道具目录（id/名称/原尺寸）：
${BYe.map(e => `${e.id}/${e.label}/${e.targetWidth ? `宽${e.targetWidth}` : `高${e.targetHeight}`}米`).join(`
`)}`,
  BCa = `${tQn}
当前方式：几何雏形。直接根据用户描述拆分并组合主体，objects只允许geometry和light，禁止prop、modelId和character。不查找、不替换成内置素材。人物若被要求，只用简单几何体表达体块。
重点是轮廓、比例、部件关系可辨认，少量部件即可，不制作螺丝、面板缝、内部构造或写实纹理。每个部件都将成为画布中可编辑的物体。`;

function yW(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("场景数据格式不正确，请重新搭建");
  return e;
}

function Z6(e, t, n) {
  if (typeof e != "number" || !Number.isFinite(e) || e < t || e > n) throw new Error("场景包含无效的坐标、尺寸或灯光参数，请重新搭建");
  return e;
}

function eM(e, t = -200, n = 200) {
  if (!Array.isArray(e) || e.length !== 3) throw new Error("场景坐标必须包含三个数值");
  return e.map(r => Z6(r, t, n));
}

function pat(e, t) {
  if (e === void 0) return t;
  if (typeof e != "string" || !/^#[\da-f]{6}$/i.test(e)) throw new Error("场景颜色格式不正确");
  return e;
}

function FCa(e, t, n = "scene", r = "auto") {
  var f;
  if (e.length > 16e4) throw new Error("场景内容过大，请简化描述");
  const a = e.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  let i;
  try {
    i = yW(JSON.parse(a));
  } catch {
    throw new Error("模型未返回完整的场景数据，请重新搭建");
  }
  if (n === "camera") return Ctn(i.cameraPlans, t);
  if (!Array.isArray(i.objects) || i.objects.length < 1 || i.objects.length > 80) throw new Error("场景需要包含 1–80 个物体，请调整描述后重试");
  const o = `build-${crypto.randomUUID()}`,
    s = i.objects.map((y, b) => {
      const v = yW(y);
      if (r === "blockout" && v.kind !== "geometry" && v.kind !== "light") throw new Error("几何雏形需要由基础形体组合，模型返回了预设素材，请重新生成");
      const _ = {
          id: `${o}-${b}`,
          name: typeof v.name == "string" ? v.name.trim().slice(0, 60) || `物体 ${b + 1}` : `物体 ${b + 1}`,
          position: eM(v.position),
          rotation: eM(v.rotation ?? [0, 0, 0], -3600, 3600),
          color: pat(v.color, "#b8b4ac")
        },
        w = eM(v.scale ?? [1, 1, 1], .01, 100);
      switch (v.kind) {
        case "prop":
          {
            const k = BYe.find(A => A.id === v.modelId);
            if (!k) throw new Error("模型使用了不存在的道具，请重新搭建");
            return {
              ..._,
              kind: "prop",
              prop: k.kind,
              modelId: k.id,
              scale: w
            };
          }
        case "geometry":
          {
            if (!ZKn.includes(v.geometry)) throw new Error("模型使用了不支持的几何体");
            return {
              ..._,
              kind: "geometry",
              geometry: v.geometry,
              scale: w
            };
          }
        case "character":
          {
            const k = v.pose ?? "stand";
            if (!Pjt.includes(k)) throw new Error("模型使用了不支持的角色姿势");
            return {
              ..._,
              kind: "character",
              pose: k,
              scale: w
            };
          }
        case "light":
          {
            const k = v.light;
            if (k !== "point" && k !== "directional" && k !== "spot") throw new Error("灯光类型不正确");
            return {
              ..._,
              kind: "light",
              light: k,
              intensity: Z6(v.intensity ?? 2, 0, 20),
              distance: Z6(v.distance ?? 20, 0, 200)
            };
          }
        default:
          throw new Error("模型使用了不支持的场景物体");
      }
    });
  if (s.every(y => y.kind === "light")) throw new Error("场景缺少主体，请重新搭建");
  const l = yW(i.camera),
    d = {
      id: `${o}-camera`,
      kind: "camera",
      name: "主机位",
      position: eM(l.position),
      rotation: [0, 0, 0],
      color: "#60a5fa",
      lookAt: eM(l.lookAt),
      fov: Z6(l.fov ?? 45, 15, 100),
      screenshots: [],
      lookAtMode: "coordinate"
    };
  if (Math.hypot(...d.position.map((y, b) => y - d.lookAt[b])) < .1) throw new Error("机位与注视点过近，请重新搭建");
  const u = yW(i.environment ?? {}),
    h = `${o}-shot`,
    p = {
      version: 1,
      settings: {
        ...t.settings,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1,
        groundHeight: 0,
        panoramaImageUrl: void 0,
        referenceImageUrl: void 0,
        showGround: !0,
        showGrid: !1,
        skyColor: pat(u.skyColor, "#181b24"),
        ambientIntensity: Z6(u.ambientIntensity ?? .6, 0, 5),
        keyIntensity: Z6(u.keyIntensity ?? 1.4, 0, 10),
        keyColor: pat(u.keyColor, "#ffffff")
      },
      objects: [d, ...s],
      selectedId: null,
      viewMode: "camera",
      aspectRatio: "16:9",
      tool: "select",
      shots: [{
        id: h,
        cameraId: d.id,
        name: d.name,
        aspectRatio: "16:9"
      }],
      activeShotId: h,
      timeline: {
        fps: 24,
        durationSeconds: 15,
        loop: !1,
        interpolation: "linear",
        keyframes: [],
        objectKeyframes: [],
        characterAnimationClips: []
      }
    };
  if (!i.cameraPlans) return p;
  const m = Ctn(i.cameraPlans, {
    ...p,
    timeline: {
      ...p.timeline,
      durationSeconds: 0
    }
  });
  return {
    ...m,
    objects: m.objects.filter(y => y.id !== d.id),
    shots: (f = m.shots) == null ? void 0 : f.filter(y => y.cameraId !== d.id)
  };
}

function Ctn(e, t) {
  var p, m;
  if (!Array.isArray(e) || e.length < 1 || e.length > 6) throw new Error("需要 1–6 个有效的镜头方案");
  const n = t.objects.filter(f => f.kind === "camera"),
    r = (m = (p = t.shots) == null ? void 0 : p.find(f => f.id === t.activeShotId)) == null ? void 0 : m.cameraId,
    a = n.find(f => f.id === t.selectedId) ?? n.find(f => f.id === r) ?? n[0];
  if (!a) throw new Error("请先添加一个机位，再编排镜头");
  const i = t.timeline ?? {
      fps: 24,
      durationSeconds: 15,
      loop: !1,
      interpolation: "linear",
      keyframes: []
    },
    o = Z6(i.fps, 1, 120),
    s = [],
    l = [];
  let d = i.durationSeconds,
    u = 0;
  for (const f of e) {
    const y = yW(f),
      b = y.sourceCameraId === void 0 ? a : n.find(w => w.id === y.sourceCameraId);
    if (!b) throw new Error("镜头方案引用了不存在的机位");
    const v = {
      ...b,
      id: `camera-${crypto.randomUUID()}`,
      name: typeof y.name == "string" && y.name.trim().slice(0, 60) || "智能机位",
      screenshots: []
    };
    let _;
    if (y.copyKeyframes === !0) {
      if (y.segments !== void 0 || y.position !== void 0 || y.lookAt !== void 0 || y.fov !== void 0) throw new Error("复制关键帧不能同时重新编排运镜");
      if (_ = i.keyframes.filter(w => w.cameraId === b.id).map(w => ({
        ...w,
        id: `kf-${crypto.randomUUID()}`,
        cameraId: v.id
      })), !_.length) throw new Error("源机位没有可复制的关键帧，请改为生成运镜");
    } else {
      const w = kDt(t.objects, b.id, null).find(S => S.id === b.id);
      if (v.position = eM(y.position ?? w.position), v.lookAt = eM(y.lookAt ?? w.lookAt), v.fov = Z6(y.fov ?? b.fov, 15, 100), v.parentId = null, v.followTargetId = null, v.lookAtTargetId = null, v.lookAtMode = "coordinate", v.visible = !0, v.locked = !1, v.inFrame = 0, v.outFrame = void 0, v.clips = void 0, Math.hypot(...v.position.map((S, C) => S - v.lookAt[C])) < .1) throw new Error("机位与注视点过近");
      if (!Array.isArray(y.segments) || !y.segments.length || y.segments.length > 8) throw new Error("运镜需要 1–8 个连续片段");
      _ = [];
      let k = u;
      v.inFrame = Math.round(k * o);
      let A = v;
      y.segments.forEach((S, C, I) => {
        const E = yW(S),
          M = Math.round(k * o);
        if (k += Z6(E.durationSeconds ?? 12, 1, 60), k - u > 180) throw new Error("单个镜头的总时长不能超过 180 秒");
        const T = Math.round(k * o) - (C === I.length - 1 ? 1 : 0);
        if (T <= M) throw new Error("运镜时长过短，请增加时长或提高帧率");
        let P;
        if (E.kind === "orbit") {
          const j = Z6(E.degrees ?? 360, 15, 720);
          if (E.direction !== void 0 && E.direction !== "clockwise" && E.direction !== "counterclockwise") throw new Error("环绕方向无效");
          const B = A.position.map((N, G) => N - A.lookAt[G]);
          if (Math.hypot(B[0], B[2]) < .1) throw new Error("环绕机位需要与主体保持水平距离");
          const F = Math.min(Math.ceil(j / 22.5) + 1, T - M + 1);
          if (j / (F - 1) >= 180) throw new Error("环绕时长过短，请增加时长或提高帧率");
          P = Array.from({
            length: F
          }, (N, G) => {
            const z = j * Math.PI / 180 * G / (F - 1) * (E.direction === "counterclockwise" ? 1 : -1);
            return {
              id: `kf-${crypto.randomUUID()}`,
              cameraId: v.id,
              frame: Math.round(M + (T - M) * G / (F - 1)),
              position: [A.lookAt[0] + B[0] * Math.cos(z) + B[2] * Math.sin(z), A.position[1], A.lookAt[2] - B[0] * Math.sin(z) + B[2] * Math.cos(z)],
              lookAt: A.lookAt,
              fov: A.fov,
              channels: ["position", "lookAt", "fov"]
            };
          });
        } else if (E.kind === "path" || E.kind === "hold") {
          const j = (B, F) => {
            if (E.kind === "hold") return [F, F];
            if (!Array.isArray(B) || B.length < 2 || B.length > 24) throw new Error("连续路径需要 2–24 个坐标点");
            const N = B.map(G => eM(G));
            return [F, ...N.slice(1)];
          };
          P = uqn({
            cameraId: v.id,
            fov: A.fov,
            startFrame: M,
            endFrame: T,
            cameraPoints: j(E.cameraPoints, A.position),
            targetPoints: j(E.targetPoints, A.lookAt),
            fallbackPosition: A.position,
            fallbackLookAt: A.lookAt
          });
        } else {
          if (!["dolly_in", "dolly_out", "crane_up", "crane_down"].includes(String(E.kind))) throw new Error("不支持的运镜类型");
          P = dqn({
            camera: A,
            kind: E.kind,
            lookAt: A.lookAt,
            startFrame: M,
            endFrame: T
          });
        }
        P = P.filter((j, B) => B === P.length - 1 || j.frame !== P[B + 1].frame), P.forEach(j => {
          if (eM(j.position), eM(j.lookAt), Math.hypot(...j.position.map((B, F) => B - j.lookAt[F])) < .1) throw new Error("运镜路径穿过注视点，请重新规划");
        }), _.length && _.pop(), _.push(...P.map(j => ({
          ...j,
          channels: ["position", "lookAt", "fov"]
        })));
        const R = P[P.length - 1];
        A = {
          ...v,
          position: R.position,
          lookAt: R.lookAt,
          fov: R.fov
        };
      }), d = Math.max(d, k), v.outFrame = Math.round(k * o), u = k;
    }
    s.push(v), l.push(..._);
  }
  const h = s.map(f => ({
    id: `shot-${f.id}`,
    name: f.name,
    cameraId: f.id,
    aspectRatio: t.aspectRatio
  }));
  return {
    ...t,
    objects: [...s, ...t.objects],
    shots: [...(t.shots ?? []), ...h],
    activeShotId: h[0].id,
    selectedId: s[0].id,
    viewMode: "camera",
    timeline: {
      ...i,
      durationSeconds: d,
      interpolation: e.some(f => yW(f).copyKeyframes !== !0) ? "linear" : i.interpolation,
      keyframes: [...i.keyframes, ...l],
      workAreaStart: Math.min(...l.map(f => f.frame)),
      workAreaEnd: Math.max(...l.map(f => f.frame))
    }
  };
}

async function zCa(e, t, n, r, a = {}) {
  var v, _, w;
  r.throwIfAborted();
  const i = k => {
      var A;
      r.aborted || (A = a.onProgress) == null || A.call(a, k);
    },
    o = k => {
      const A = k.match(/"summary"\s*:\s*("(?:[^"\\]|\\.)*")/);
      let S;
      if (A) try {
        S = String(JSON.parse(A[1])).slice(0, 500);
      } catch {}
      i({
        stage: "generating",
        receivedChars: k.length,
        ...(S ? {
          summary: S
        } : {})
      });
    };
  i({
    stage: "connecting"
  });
  const s = a.mode === "camera" && a.scene ? `
当前场景：` + JSON.stringify({
      selectedId: a.scene.selectedId,
      activeShotId: a.scene.activeShotId,
      shots: (v = a.scene.shots) == null ? void 0 : v.map(k => ({
        id: k.id,
        name: k.name,
        cameraId: k.cameraId
      })),
      fps: (_ = a.scene.timeline) == null ? void 0 : _.fps,
      durationSeconds: (w = a.scene.timeline) == null ? void 0 : w.durationSeconds,
      objects: a.scene.objects.slice(0, 120).map(k => {
        var A, S;
        return {
          id: k.id,
          kind: k.kind,
          name: k.name,
          position: k.position,
          rotation: k.rotation,
          ...(k.kind === "camera" ? {
            lookAt: k.lookAt,
            fov: k.fov,
            keyframeCount: ((S = (A = a.scene) == null ? void 0 : A.timeline) == null ? void 0 : S.keyframes.filter(C => C.cameraId === k.id).length) ?? 0
          } : {})
        };
      })
    }) : "",
    l = [{
      role: "system",
      content: a.mode === "camera" ? LCa : a.style === "blockout" ? BCa : OCa
    }, {
      role: "user",
      content: t.trim() + s
    }],
    d = F2(e.id, hRt(), e.modelName);
  if (Mu(e.id)) {
    const {
      completeCodexAgentTurn: k
    } = await Ie(async () => {
      const {
        completeCodexAgentTurn: C
      } = await Promise.resolve().then(() => ara);
      return {
        completeCodexAgentTurn: C
      };
    }, void 0, import.meta.url);
    let A = "";
    const S = await k({
      modelName: e.id,
      messages: l,
      tools: [],
      toolChoice: "none",
      webSearchEnabled: !1,
      signal: r,
      reasoningEffort: d,
      onStreamDelta: C => {
        C.reasoning && (A = (C.reasoningMode === "delta" ? A + C.reasoning : C.reasoning).slice(-16e3), i({
          stage: "thinking",
          reasoning: A
        })), C.content && o(C.content);
      }
    });
    return r.throwIfAborted(), i({
      stage: "validating"
    }), S.message.content;
  }
  const u = Qa.getResolvedModelBaseUrl(e.id) || e.url,
    h = cu(e.key, n, e.savedApiKeyId, {
      platformGroup: a.platformGroup,
      modelName: e.modelName,
      modelId: e.id,
      baseUrl: u,
      modelSavedApiKeyId: e.savedApiKeyId
    });
  if (!h) throw new Error("请先在 API 设置中为所选模型配置 Key");
  const p = e.nativeChat ? "chat" : cft(e, jhe()),
    m = !e.nativeChat && /generativelanguage\.googleapis\.com/i.test(u) ? "gemini-official" : "openai",
    f = await mx({
      format: m,
      apiProtocol: p,
      baseUrl: u,
      apiKey: h,
      modelId: e.id,
      modelName: e.modelName || e.id,
      messages: l,
      signal: r,
      stream: !0,
      maxTokens: 16e3,
      temperature: .35,
      reasoningEffort: d
    });
  if (!f.ok) throw new Error(Sv(f.status));
  let y = !1;
  const b = await qS({
    response: f,
    format: m === "openai" && p === "responses" ? "openai-responses" : m,
    onDelta: o,
    onTruncated: k => {
      y = k;
    },
    onReasoning: () => i({
      stage: "thinking"
    }),
    onReasoningText: k => i({
      stage: "thinking",
      reasoning: k.slice(-16e3)
    })
  });
  if (r.throwIfAborted(), y) throw new Error("场景数据未生成完整，请简化描述后重试");
  return i({
    stage: "validating"
  }), b;
}

const UCa = [{
    label: "产品展台",
    prompt: "为画布搭建一个产品镜头预演：圆形矮展台上放一只由简单几何体组成的香水瓶，深灰背景，左侧暖光、右侧冷色轮廓光，无人物。8秒缓慢环绕，完整展示瓶身。"
  }, {
    label: "对话走位",
    prompt: "搭建双人对话的分镜空间：两人隔着一张桌子相对而坐，侧边留出机位通道，背景只放矮墙和门框。使用全景机位交代人物关系，布景保持简洁。"
  }, {
    label: "悬浮小岛",
    prompt: "搭建一座悬浮小岛的概念预演，用几何体组合倒锥形岩石和扁平草地，上方放一棵树和一座小型拱门。无人物，12秒从远景推进，随后绕到侧面，保持一镜到底。"
  }],
  $Ca = [{
    label: "双发飞机",
    prompt: "用基础几何体搭一架双发运输机雏形：细长机身、圆锥机鼻、左右宽主翼、两台翼下发动机、水平尾翼和单垂尾，机头朝前。保留约12米机长与16米翼展的比例，灰白色机身，背景简洁，从前侧斜上方看完整轮廓。"
  }, {
    label: "双垂尾战机",
    prompt: "组合一架双垂尾战机的粗模：尖机鼻、扁长机身、深色座舱、左右后掠主翼、水平尾翼、两片外倾垂尾和两个尾喷口。优先轮廓与左右对称，不做细小零件，不挂武器。12秒从前侧环绕一周，完整展示雏形。"
  }, {
    label: "履带坦克",
    prompt: "用简单形体搭一辆坦克雏形：低矮宽车体、左右两条深色履带、每侧少量轮子、上方炮塔和向前伸出的长炮管。橄榄绿色，部件连接自然，只表现外轮廓，无内部构造，无人物和复杂背景，从前侧斜上方看完整主体。"
  }],
  GCa = [{
    label: "360° 环绕",
    prompt: "以当前机位为起点，围绕主体顺时针环绕一周，12秒一镜到底，自动生成镜头关键帧。"
  }, {
    label: "一镜到底",
    prompt: "以当前机位为起点，先推进4秒，再环绕主体8秒，最后拉远4秒，连续一镜到底。"
  }, {
    label: "复制机位与 K 帧",
    prompt: "复制当前机位及其全部关键帧，保留原机位，命名为镜头副本。"
  }],
  VCa = {
    auto: ["搭一个产品展台，让镜头绕过主体，试试轮廓光…", "摆好两个人的对话位置，留出镜头移动的空间…", "把悬浮小岛搭成粗略布景，再做一段推进镜头…"],
    blockout: ["用简单形体搭一架双发飞机，先看机身与翼展比例…", "搭一架双垂尾战机：尖机鼻、后掠翼、深色座舱…", "组合一辆履带坦克，车体低一些，炮塔轮廓清楚…"],
    camera: ["从当前机位出发，先推进，再绕到主体侧面…", "绕主体一周，用 12 秒看看各个角度的构图…", "复制当前机位和 K 帧，留一版镜头做对比…"]
  },
  HCa = {
    connecting: "正在连接模型",
    thinking: "模型正在思考",
    generating: "正在生成方案",
    validating: "正在校验场景与关键帧"
  };

function WCa({
  apiConfigs: e,
  chatModel: t,
  globalApiKey: n,
  scene: r,
  onApply: a,
  onClose: i
}) {
  on();
  const o = VU(e.filter(D => D.type === "Chat" && D.enabled !== !1)),
    [s, l] = g.useState(() => {
      var U;
      const D = If(t).id;
      return o.some(H => H.id === D) ? D : ((U = o[0]) == null ? void 0 : U.id) ?? "";
    }),
    [d, u] = g.useState(() => {
      var D;
      return ((D = zs(s)) == null ? void 0 : D.platformGroup) || ko;
    }),
    h = o.find(D => D.id === s),
    p = !!h && !Mu(h.id) && od(h, Qa.getGlobalBaseUrl()),
    [m, f] = g.useState(""),
    [y, b] = g.useState("scene"),
    [v, _] = g.useState("auto"),
    [w, k] = g.useState(null),
    [A, S] = g.useState({
      stage: "connecting"
    }),
    [C, I] = g.useState(0),
    [E, M] = g.useState(0),
    T = g.useRef(0),
    P = g.useRef(0),
    [R, j] = g.useState(!1),
    [B, F] = g.useState(""),
    N = g.useRef(null),
    G = g.useRef(null),
    z = g.useRef(null),
    V = g.useRef(null),
    O = () => {
      var D;
      (D = N.current) == null || D.abort(), i();
    };
  g.useEffect(() => {
    var U;
    const D = document.activeElement;
    return (U = z.current) == null || U.focus(), () => {
      var H;
      (H = N.current) == null || H.abort(), D == null || D.focus();
    };
  }, []), g.useEffect(() => {
    var D;
    R && ((D = V.current) == null || D.focus());
  }, [R]), g.useEffect(() => {
    if (!R) return;
    const D = window.setInterval(() => {
      I(Math.floor((Date.now() - T.current) / 1e3)), M(Math.floor((Date.now() - P.current) / 1e3));
    }, 1e3);
    return () => window.clearInterval(D);
  }, [R]);
  const L = async () => {
    if (N.current || !m.trim()) return;
    const D = h;
    if (!D) {
      F("请选择已配置的 LLM 模型");
      return;
    }
    const U = new AbortController();
    N.current = U, T.current = P.current = Date.now(), I(0), M(0), S({
      stage: "connecting"
    }), k(null), j(!0), F("");
    try {
      const H = await zCa(D, m, n, U.signal, {
        mode: y,
        style: v,
        scene: r,
        platformGroup: p ? d : Hg,
        onProgress: Y => {
          N.current !== U || U.signal.aborted || (P.current = Date.now(), M(0), S(K => ({
            ...K,
            ...Y
          })));
        }
      });
      if (U.signal.aborted) return;
      a(FCa(H, r, y, v)), i();
    } catch (H) {
      U.signal.aborted || F(H instanceof Error ? H.message : "搭建失败，请重试");
    } finally {
      N.current === U && (N.current = null), U.signal.aborted || j(!1);
    }
  };
  return c.jsx("div", {
    className: "director-smart-build-overlay",
    onPointerDown: D => D.stopPropagation(),
    onWheel: D => D.stopPropagation(),
    onKeyDown: D => {
      var U, H;
      if (D.stopPropagation(), D.key === "Escape" && (D.preventDefault(), w ? k(null) : O()), D.key === "Tab") {
        const Y = [...Array.from(((U = G.current) == null ? void 0 : U.querySelectorAll("button:not(:disabled), textarea:not(:disabled), summary")) ?? []), ...Array.from(document.querySelectorAll(".smart-build-model-menu button:not(:disabled), [data-platform-group-picker-menu] button:not(:disabled)"))],
          K = Y.indexOf(document.activeElement);
        D.preventDefault(), (H = Y[(K + (D.shiftKey ? -1 : 1) + Y.length) % Y.length]) == null || H.focus();
      }
    },
    children: c.jsxs("div", {
      ref: G,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "smart-build-title",
      className: "director-smart-build",
      children: [c.jsxs("div", {
        className: "director-smart-build-heading",
        children: [c.jsx("span", {
          className: "director-smart-build-orb",
          "aria-hidden": "true"
        }), c.jsx("h2", {
          id: "smart-build-title",
          children: x("智能搭建")
        }), c.jsx("button", {
          type: "button",
          onClick: O,
          "aria-label": x("关闭智能搭建"),
          className: "director-smart-build-close",
          children: c.jsx(Na, {
            size: 18
          })
        })]
      }), c.jsx("p", {
        className: "director-smart-build-subtitle",
        children: x("把创意搭成可编辑的空间、主体和镜头。")
      }), c.jsxs("div", {
        className: "director-smart-build-composer",
        children: [c.jsxs("div", {
          className: "relative",
          children: [c.jsx("textarea", {
            ref: z,
            "aria-label": x("场景描述"),
            "aria-describedby": "smart-build-hint",
            value: m,
            disabled: R,
            maxLength: 3e3,
            onChange: D => f(D.target.value),
            onKeyDown: D => {
              D.key === "Enter" && (D.ctrlKey || D.metaKey) && !D.nativeEvent.isComposing && (D.preventDefault(), L());
            },
            className: "director-smart-build-input"
          }), !m && !R && c.jsx("div", {
            "aria-hidden": !0,
            className: "pointer-events-none absolute inset-x-0 top-0 text-[13px] leading-6 text-zinc-500",
            children: c.jsx(qVn, {
              text: VCa[y === "camera" ? y : v]
            }, y === "camera" ? y : v)
          })]
        }), c.jsxs("div", {
          className: "director-smart-build-actions",
          children: [c.jsx(Th, {
            scopeId: "smart-build",
            value: s,
            models: o,
            isDark: !0,
            showChannelBar: !0,
            activeDropdown: w,
            setActiveDropdown: k,
            onSelect: D => {
              var U;
              l(D), u(((U = zs(D)) == null ? void 0 : U.platformGroup) || ko);
            },
            disabled: R,
            buttonTitle: "选择搭建模型",
            buttonVariant: "bare",
            menuPlacement: "above",
            menuMaxHeight: 360,
            menuZIndex: 100100,
            menuClassName: "smart-build-model-menu",
            className: "!flex-none !overflow-visible min-w-0 max-w-[48%]"
          }), p && h ? c.jsx(Ku, {
            nodeId: "smart-build",
            platformGroup: d,
            modelName: h.modelName || h.id,
            modelId: h.id,
            modelConfigId: h.id,
            isDark: !0,
            compact: !0,
            buttonVariant: "bare",
            menuPlacement: "above",
            menuClassName: "smart-build-model-menu",
            className: `max-w-[38%] ${R ? "pointer-events-none opacity-50" : ""}`,
            onGroupChange: u
          }) : null, R ? c.jsx("button", {
            ref: V,
            type: "button",
            onClick: () => {
              var D;
              (D = N.current) == null || D.abort(), N.current = null, j(!1);
            },
            className: "director-smart-build-send is-busy",
            "aria-label": x("停止"),
            title: x("停止"),
            children: c.jsx(Ua, {
              size: 16,
              className: "animate-spin"
            })
          }) : c.jsx("button", {
            type: "button",
            disabled: !m.trim() || !s,
            onClick: () => void L(),
            className: "director-smart-build-send",
            "aria-label": x(y === "camera" ? "生成运镜" : v === "blockout" ? "生成雏形" : "开始搭建"),
            title: x(y === "camera" ? "生成运镜" : v === "blockout" ? "生成雏形" : "开始搭建"),
            children: c.jsx(Gc, {
              size: 18
            })
          })]
        })]
      }), c.jsxs("div", {
        className: "director-smart-build-dock",
        children: [c.jsx("div", {
          role: "group",
          "aria-label": x("搭建方式"),
          className: "flex flex-wrap gap-1",
          children: ["scene", "camera"].map(D => c.jsx("button", {
            type: "button",
            disabled: R,
            "aria-pressed": y === D,
            onClick: () => {
              b(D), F("");
            },
            className: `rounded-md px-3 py-1.5 text-xs transition ${y === D ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"} disabled:opacity-50`,
            children: x(D === "scene" ? "搭建场景" : "编排镜头")
          }, D))
        }), y === "scene" && c.jsx("div", {
          role: "group",
          "aria-label": x("场景生成方式"),
          className: "flex gap-1",
          children: ["auto", "blockout"].map(D => c.jsx("button", {
            type: "button",
            disabled: R,
            "aria-pressed": v === D,
            onClick: () => {
              _(D), F("");
            },
            className: `rounded-md px-2 py-1.5 text-[11px] transition ${v === D ? "bg-white/[0.06] text-zinc-200" : "text-zinc-500 hover:text-zinc-300"} disabled:opacity-50`,
            children: x(D === "auto" ? "自动布景" : "几何雏形")
          }, D))
        })]
      }), c.jsx("p", {
        id: "smart-build-hint",
        className: "director-smart-build-hint",
        children: x(y === "camera" ? "描述镜头如何移动，自动落到时间线。" : v === "blockout" ? "由模型拆分形体，先搭出轮廓和比例。" : "用素材布置空间，缺少的主体由几何体搭建。")
      }), c.jsx("div", {
        className: "mt-3 flex flex-wrap justify-center gap-2",
        children: (y === "camera" ? GCa : v === "blockout" ? $Ca : UCa).map(D => c.jsx("button", {
          type: "button",
          disabled: R,
          onClick: () => {
            var U;
            f(D.prompt), (U = z.current) == null || U.focus();
          },
          className: "rounded-full border border-white/[0.08] px-3 py-1 text-[11px] text-zinc-400 hover:bg-white/5 disabled:opacity-40",
          children: x(D.label)
        }, x(D.label)))
      }), B && c.jsx("p", {
        role: "alert",
        className: "mt-3 text-xs leading-5 text-red-300",
        children: B
      }), R && c.jsxs("div", {
        role: "status",
        "aria-live": "polite",
        className: "mt-4 rounded-xl border border-white/[0.08] bg-black/10 p-3",
        children: [c.jsxs("div", {
          className: "flex items-center justify-between gap-3 text-xs text-zinc-300",
          children: [c.jsxs("span", {
            className: "flex items-center gap-2",
            children: [c.jsx(Ua, {
              size: 13,
              className: "animate-spin"
            }), x(HCa[A.stage])]
          }), c.jsxs("span", {
            className: "tabular-nums text-zinc-500",
            children: [x("已用 "), C, x(" 秒")]
          })]
        }), c.jsxs("p", {
          className: "mt-2 text-[11px] leading-5 text-zinc-500",
          children: [A.receivedChars ? x("已接收 {0} 字 · 完整校验后写入{1}", A.receivedChars.toLocaleString(), y === "camera" ? "机位和关键帧" : "场景") : A.reasoning ? x("正在接收模型思考内容，完成后生成可编辑方案。") : x("等待模型返回内容，部分渠道会在思考结束后统一返回。"), E >= 20 && x(" 已有 {0} 秒未收到新内容，可继续等待或停止重试。", E)]
        }), A.summary && c.jsx("p", {
          className: "mt-2 text-xs leading-5 text-zinc-300",
          children: A.summary
        }), A.reasoning && c.jsxs("details", {
          open: !0,
          className: "mt-2 text-[11px] text-zinc-400",
          children: [c.jsx("summary", {
            className: "cursor-pointer",
            children: x("模型返回的思考")
          }), c.jsx("pre", {
            className: "mt-2 max-h-28 overflow-y-auto whitespace-pre-wrap break-words font-sans leading-5",
            children: A.reasoning.slice(-6e3)
          })]
        })]
      }), c.jsx("p", {
        className: "mt-4 text-center text-[10px] leading-4 text-zinc-500",
        children: x(y === "scene" ? v === "blockout" ? "生成可编辑的几何部件与运镜，替换当前布景，可撤销。" : "生成可编辑场景与运镜，替换当前布景，可撤销。" : "新增机位并自动生成或复制 K 帧，保留原有布景，可撤销。")
      })]
    })
  });
}

const t6e = e => `absolute grid place-items-center rounded-full text-[9px] font-semibold leading-none transition ${e ? "ring-1 ring-white/70" : "hover:ring-1 hover:ring-white/35"}`,
  nQn = g.memo(({
    onAlign: e,
    onReset: t,
    onFrameAll: n,
    activeAxis: r
  }) => (on(), c.jsxs("div", {
    className: "pointer-events-auto absolute right-5 top-4 z-20 flex flex-col items-center gap-1.5",
    children: [c.jsxs("div", {
      className: "relative h-16 w-16 rounded-full bg-[#191b20]/90 ring-1 ring-white/[0.05]",
      children: [c.jsx("span", {
        className: "pointer-events-none absolute left-1/2 top-2 h-12 w-px -translate-x-1/2 bg-blue-400/60"
      }), c.jsx("span", {
        className: "pointer-events-none absolute left-2 top-1/2 h-px w-12 -translate-y-1/2 bg-red-400/60"
      }), c.jsx("button", {
        type: "button",
        title: x("侧面（X）"),
        onClick: () => e("x"),
        className: `${t6e(r === "x")} right-1 top-[24px] h-4 w-4 bg-red-400 text-black`,
        children: "X"
      }), c.jsx("button", {
        type: "button",
        title: x("俯视（Y）"),
        onClick: () => e("y"),
        className: `${t6e(r === "y")} left-[24px] top-1 h-4 w-4 bg-emerald-400 text-black`,
        children: "Y"
      }), c.jsx("button", {
        type: "button",
        title: x("正面（Z）"),
        onClick: () => e("z"),
        className: `${t6e(r === "z")} bottom-1 left-[24px] h-4 w-4 bg-blue-400 text-black`,
        children: "Z"
      }), c.jsx("button", {
        type: "button",
        title: x("透视"),
        onClick: () => e("perspective"),
        className: `${t6e(r === "perspective")} left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-zinc-200`
      })]
    }), c.jsxs("div", {
      className: "flex gap-1",
      children: [c.jsxs("button", {
        onClick: t,
        className: "flex h-5 items-center gap-1 rounded bg-[#242424]/95 px-2 text-[9px] text-zinc-500 hover:text-zinc-100",
        title: x("重置视角"),
        children: [c.jsx(vd, {
          size: 9
        }), x("重置")]
      }), c.jsxs("button", {
        onClick: n,
        className: "flex h-5 items-center gap-1 rounded bg-[#242424]/95 px-2 text-[9px] text-zinc-500 hover:text-zinc-100",
        title: x("框住全部 (Home)"),
        children: [c.jsx(Wm, {
          size: 9
        }), x("全场")]
      })]
    })]
  })));

nQn.displayName = "AxisGizmo";

