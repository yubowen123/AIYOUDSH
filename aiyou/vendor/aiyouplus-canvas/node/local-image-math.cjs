'use strict';

const SIZES = ['1x', '2x', '3x', '4x', '1MP', '2MP', '4MP', '8MP', '16MP', '24MP', '32MP'];
const WASH_STYLES = new Set(['natural', 'default', 'cinematic']);

function upscaleTarget(width, height, scale) {
  const pixels = width * height;
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0 || pixels > 16 * 1024 ** 2) {
    throw new Error('原图需为有效图片，且不超过 16MP');
  }
  if (!SIZES.includes(scale)) throw new Error('放大尺寸无效');
  let w;
  let h;
  if (String(scale).endsWith('MP')) {
    const budget = parseInt(scale, 10) * 1024 ** 2;
    const aligned = (n) => Math.max(8, Math.round(n / 8) * 8);
    let lo = 0;
    let hi = Math.sqrt(budget / pixels) * 2;
    for (let i = 0; i < 40; i += 1) {
      const mid = (lo + hi) / 2;
      if (aligned(width * mid) * aligned(height * mid) <= budget) lo = mid;
      else hi = mid;
    }
    w = aligned(width * lo);
    h = aligned(height * lo);
  } else {
    const factor = parseInt(scale, 10);
    w = width * factor;
    h = height * factor;
  }
  if (w * h > 32 * 1024 ** 2 || w > 8192 || h > 8192) {
    throw new Error('当前档位超过 32MP 或单边 8192 像素，请选择较小的尺寸');
  }
  return { width: w, height: h };
}

function clampByte(value) {
  if (value <= 0) return 0;
  if (value >= 255) return 255;
  return Math.round(value);
}

function resizeBgra(src, sw, sh, dw, dh) {
  if (sw === dw && sh === dh) return Buffer.from(src);
  const dst = Buffer.alloc(dw * dh * 4);
  const xRatio = sw / dw;
  const yRatio = sh / dh;
  for (let y = 0; y < dh; y += 1) {
    const sy = (y + 0.5) * yRatio - 0.5;
    const y0 = Math.max(0, Math.floor(sy));
    const y1 = Math.min(sh - 1, y0 + 1);
    const fy = Math.min(1, Math.max(0, sy - y0));
    for (let x = 0; x < dw; x += 1) {
      const sx = (x + 0.5) * xRatio - 0.5;
      const x0 = Math.max(0, Math.floor(sx));
      const x1 = Math.min(sw - 1, x0 + 1);
      const fx = Math.min(1, Math.max(0, sx - x0));
      const i00 = (y0 * sw + x0) * 4;
      const i10 = (y0 * sw + x1) * 4;
      const i01 = (y1 * sw + x0) * 4;
      const i11 = (y1 * sw + x1) * 4;
      const di = (y * dw + x) * 4;
      for (let c = 0; c < 4; c += 1) {
        const v = src[i00 + c] * (1 - fx) * (1 - fy)
          + src[i10 + c] * fx * (1 - fy)
          + src[i01 + c] * (1 - fx) * fy
          + src[i11 + c] * fx * fy;
        dst[di + c] = clampByte(v);
      }
    }
  }
  return dst;
}

function boxBlur(src, width, height, radius) {
  const tmp = new Float32Array(src.length);
  const dst = new Float32Array(src.length);
  const win = radius * 2 + 1;
  for (let y = 0; y < height; y += 1) {
    const row = y * width;
    let sum = 0;
    for (let k = -radius; k <= radius; k += 1) sum += src[row + Math.min(width - 1, Math.max(0, k))];
    for (let x = 0; x < width; x += 1) {
      tmp[row + x] = sum / win;
      sum -= src[row + Math.max(0, x - radius)];
      sum += src[row + Math.min(width - 1, x + radius + 1)];
    }
  }
  for (let x = 0; x < width; x += 1) {
    let sum = 0;
    for (let k = -radius; k <= radius; k += 1) sum += tmp[Math.min(height - 1, Math.max(0, k)) * width + x];
    for (let y = 0; y < height; y += 1) {
      dst[y * width + x] = sum / win;
      sum -= tmp[Math.max(0, y - radius) * width + x];
      sum += tmp[Math.min(height - 1, y + radius + 1) * width + x];
    }
  }
  return dst;
}

function washBgra(bgra, width, height, options) {
  const style = options && options.style ? String(options.style) : 'natural';
  const intensity = options && Number.isFinite(options.intensity) ? options.intensity : 0.5;
  if (!WASH_STYLES.has(style)) throw new Error('质感风格无效');
  if (!Number.isFinite(intensity) || intensity < 0 || intensity > 1) throw new Error('增强强度需在 0 到 1 之间');
  const src = Buffer.from(bgra);
  if (src.length !== width * height * 4) throw new Error('图片数据尺寸不一致');
  if (intensity === 0) return src;
  const gain = { natural: 0.55, default: 0.85, cinematic: 1.25 }[style];
  const sat = { natural: 0.08, default: 0.14, cinematic: 0.22 }[style];
  const radius = Math.max(1, Math.min(12, Math.round(Math.min(width, height) * (0.004 + 0.012 * intensity))));
  const count = width * height;
  const luma = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const p = i * 4;
    luma[i] = src[p + 2] * 0.2126 + src[p + 1] * 0.7152 + src[p] * 0.0722;
  }
  const mean = boxBlur(luma, width, height, radius);
  const contrast = 1 + gain * intensity;
  const saturation = sat * intensity;
  const out = Buffer.from(src);
  for (let i = 0; i < count; i += 1) {
    const p = i * 4;
    const base = luma[i];
    let next = mean[i] + (base - mean[i]) * contrast;
    if (style === 'cinematic') {
      const n = Math.min(1, Math.max(0, next / 255));
      const curved = n * n * (3 - 2 * n);
      next = next * (1 - 0.35 * intensity) + curved * 255 * 0.35 * intensity;
      if (base < 90) next = next * (1 - 0.08 * intensity) + 18 * intensity;
    }
    const delta = next - base;
    let b = src[p] + delta;
    let g = src[p + 1] + delta;
    let r = src[p + 2] + delta;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    b = y + (b - y) * (1 + saturation);
    g = y + (g - y) * (1 + saturation);
    r = y + (r - y) * (1 + saturation);
    if (style === 'cinematic') {
      if (base < 96) b += 12 * intensity;
      if (base > 160) r += 14 * intensity;
    } else if (style === 'natural') {
      r = src[p + 2] * 0.25 + r * 0.75;
      g = src[p + 1] * 0.25 + g * 0.75;
      b = src[p] * 0.25 + b * 0.75;
    }
    out[p] = clampByte(b);
    out[p + 1] = clampByte(g);
    out[p + 2] = clampByte(r);
    out[p + 3] = src[p + 3];
  }
  return out;
}

function finishUpscale(original, ow, oh, upscaled, uw, uh, options) {
  if (uw !== ow * 4 || uh !== oh * 4) throw new Error('Vulkan 输出尺寸异常，请更新驱动后重试。');
  const target = upscaleTarget(ow, oh, options.scale);
  const strength = Number(options.strength) * (options.optimization === 'fidelity' ? 0.75 : 1);
  const base = resizeBgra(original, ow, oh, target.width, target.height);
  const scaled = resizeBgra(upscaled, uw, uh, target.width, target.height);
  const mixed = Buffer.alloc(base.length);
  for (let i = 0; i < base.length; i += 4) {
    for (let c = 0; c < 3; c += 1) {
      mixed[i + c] = clampByte(base[i + c] * (1 - strength) + scaled[i + c] * strength);
    }
    mixed[i + 3] = base[i + 3];
  }
  const sharp = Number(options.detail) * 0.35 + (options.optimization === 'deblur' ? 0.15 : 0);
  if (!(sharp > 0) && options.optimization !== 'denoise') return { pngSize: target, bgra: mixed };
  const count = target.width * target.height;
  const luma = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const p = i * 4;
    luma[i] = mixed[p + 2] * 0.2126 + mixed[p + 1] * 0.7152 + mixed[p] * 0.0722;
  }
  const blur = boxBlur(luma, target.width, target.height, 1);
  for (let i = 0; i < count; i += 1) {
    const residual = Math.max(-20.4, Math.min(20.4, luma[i] - blur[i]));
    const denoise = options.optimization === 'denoise' ? Math.max(-5.1, Math.min(5.1, luma[i] - blur[i])) * 0.3 : 0;
    const delta = residual * sharp - denoise;
    const p = i * 4;
    mixed[p] = clampByte(mixed[p] + delta);
    mixed[p + 1] = clampByte(mixed[p + 1] + delta);
    mixed[p + 2] = clampByte(mixed[p + 2] + delta);
  }
  return { pngSize: target, bgra: mixed };
}

function parseGpuLog(log) {
  const devices = [];
  for (const line of String(log || '').split(/\r?\n/)) {
    const match = /^\[(\d+)\s+([^\]]+)\]/.exec(line.trim());
    if (!match) continue;
    const name = match[2].trim();
    const lower = name.toLowerCase();
    if (['llvmpipe', 'lavapipe', 'swiftshader', 'software'].some((word) => lower.includes(word))) continue;
    devices.push({ index: Number(match[1]), name });
  }
  const best = devices.find((device) => /apple|nvidia|amd|radeon|intel/i.test(device.name)) || devices[0];
  if (!best) throw new Error('Vulkan 未识别到可用显卡，请更新系统后重试。不会自动改用 CPU 推理。');
  return best;
}

module.exports = {
  upscaleTarget,
  resizeBgra,
  washBgra,
  finishUpscale,
  parseGpuLog,
};
