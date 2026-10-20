/**
 * Theme contract — L0 port of upstream's `themeContrastRatio` plus a DSH-shaped
 * validator.
 *
 * WHY THIS EXISTS, AND WHY IT IS THE POINT.
 * My first attempt at this suite's card styling was measured as "applied" and was
 * nevertheless invisible: the card background resolved to #fff on a #fff sidebar
 * behind a 10%-black hairline. Every automated check passed because I measured
 * whether the rule applied, not whether anyone could see it.
 *
 * Upstream ships the check I was missing. `themeContrastRatio` is ported verbatim,
 * and so is the discipline around it: a palette is not valid because it is
 * complete, it is valid when every text/background PAIR clears a stated minimum —
 * 7:1 for body text, 4.5:1 for everything else. A theme that fails is rejected with
 * the measured ratio, not silently accepted.
 *
 * Adapted (L2): upstream enumerates 19 Codex UI contexts (Dot, Claude, arena,
 * taskboard…). DSH has no such contexts, so the pairs are expressed against the
 * DSH alias tokens this suite actually overrides.
 */

/** Ported verbatim from upstream `themeContrastRatio`. */
export function themeContrastRatio(foreground, background) {
  const luminance = (hex) => {
    if (!/^#[a-f0-9]{6}$/iu.test(hex || '')) throw new Error('Theme colors must be opaque six-digit hex');
    const values = [1, 3, 5]
      .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/**
 * Upstream's own thresholds. Body text is held to AAA (7:1) and secondary text to
 * AA (4.5:1); the numbers are upstream's, and `body`/`panel-body` really are the
 * two it holds higher.
 */
export const MINIMUM = Object.freeze({ body: 7, secondary: 4.5, other: 4.5 });

/**
 * Which DSH alias tokens must be readable on which surface. Each entry names the
 * roles this suite renders with, so a theme cannot ship unreadable text even if its
 * palette looks tidy.
 */
export const PAIRS = Object.freeze([
  { role: 'body', text: '--dsw-alias-label-primary', surface: '--dsw-alias-bg-base', minimum: MINIMUM.body },
  { role: 'body', text: '--dsw-alias-label-primary', surface: '--dsw-alias-bg-layer-1', minimum: MINIMUM.body },
  { role: 'body', text: '--dsw-alias-label-primary', surface: '--dsw-alias-bg-layer-2', minimum: MINIMUM.body },
  { role: 'secondary', text: '--dsw-alias-label-secondary', surface: '--dsw-alias-bg-layer-1', minimum: MINIMUM.secondary },
  { role: 'secondary', text: '--dsw-alias-label-tertiary', surface: '--dsw-alias-bg-base', minimum: MINIMUM.secondary },
  { role: 'link', text: '--dsw-alias-link', surface: '--dsw-alias-bg-base', minimum: MINIMUM.other },
  { role: 'accent-button', text: '--dsw-alias-label-primary-foreground', surface: '--dsw-alias-button-primary-fill', minimum: MINIMUM.other },
  { role: 'success', text: '--dsw-alias-state-success-primary', surface: '--dsw-alias-bg-layer-1', minimum: MINIMUM.other },
  { role: 'error', text: '--dsw-alias-state-error-primary', surface: '--dsw-alias-bg-layer-1', minimum: MINIMUM.other },
  { role: 'warning', text: '--dsw-alias-state-warn-primary', surface: '--dsw-alias-bg-layer-1', minimum: MINIMUM.other },
]);

const HEX = /^#[a-f0-9]{6}$/iu;

/**
 * Validate a DSH theme. Returns the measured ratio for every pair, or throws with
 * the offending pair and its measured ratio — the same shape of failure upstream
 * produces ("Insufficient theme contrast: body 3.11").
 */
export function validateTheme(theme) {
  if (!theme || typeof theme !== 'object') throw new Error('主题必须是一个对象');
  if (theme.schemaVersion !== 1) throw new Error('缺少或不支持的 schemaVersion（应为 1）');
  if (!['dark', 'light'].includes(theme.mode)) throw new Error('mode 必须是 dark 或 light');
  if (typeof theme.id !== 'string' || !/^[a-z][a-z0-9-]{1,60}$/u.test(theme.id)) {
    throw new Error('id 必须是 2–61 位小写字母/数字/连字符，且以字母开头');
  }
  if (typeof theme.label !== 'string' || !theme.label.trim()) throw new Error('缺少 label');

  const primitives = theme.primitives ?? {};
  if (Object.keys(primitives).length === 0) throw new Error('缺少 primitives');
  for (const [name, color] of Object.entries(primitives)) {
    if (!/^[a-z][a-z0-9-]*$/u.test(name)) throw new Error(`primitives 键名不合法：${name}`);
    if (!HEX.test(color)) throw new Error(`primitives.${name} 必须是六位不透明十六进制色（收到 ${JSON.stringify(color)}）`);
  }
  const semantic = theme.semantic ?? {};
  for (const [name, reference] of Object.entries(semantic)) {
    if (!/^[a-z][a-z0-9-]*$/u.test(name)) throw new Error(`semantic 键名不合法：${name}`);
    if (!primitives[reference]) throw new Error(`semantic.${name} 引用了不存在的 primitive：${reference}`);
  }

  const resolve = (reference) => {
    if (HEX.test(reference)) return reference;
    const primitiveName = semantic[reference] ?? reference;
    if (primitives[primitiveName]) return primitives[primitiveName];
    throw new Error(`无法解析的颜色引用：${reference}`);
  };

  // The palette must declare the pairs it is being judged on; a theme cannot pass
  // by simply omitting the hard ones.
  const declared = new Set((theme.pairs ?? []).map((pair) => pair.role));
  for (const pair of PAIRS) {
    if (!declared.has(pair.role)) throw new Error(`缺少对比度声明：${pair.role}`);
  }

  const report = [];
  for (const pair of PAIRS) {
    const entry = theme.pairs.find((candidate) => candidate.role === pair.role);
    const required = Math.max(pair.minimum, Number(entry.minimum ?? 0) || 0);
    const foreground = resolve(entry.foreground ?? pair.text);
    const background = resolve(entry.background ?? pair.surface);
    const ratio = themeContrastRatio(foreground, background);
    if (ratio < required) {
      throw new Error(`对比度不足：${pair.role} ${ratio.toFixed(2)} < ${required}（${foreground} on ${background}）`);
    }
    report.push({ role: pair.role, ratio: Number(ratio.toFixed(2)), minimum: required, foreground, background });
  }

  return report;
}

/**
 * A starter theme in the exact shape `validateTheme` accepts.
 *
 * The pairs are pre-filled from one palette so an author edits colours rather than
 * inventing structure — and, more importantly, so the contrast check runs against
 * declared pairs instead of being skipped.
 */
export function scaffoldTheme({ id, label, mode = 'dark' } = {}) {
  const dark = mode === 'dark';
  const primitives = dark
    ? {
        'graphite-950': '#0c151e',
        'graphite-900': '#131f2b',
        'graphite-800': '#1b2a38',
        'white-100': '#edf4fa',
        'gray-400': '#a9becf',
        'blue-400': '#49adff',
        'green-400': '#52dba0',
        'red-400': '#ff716d',
        'amber-400': '#ffa932',
        'steel-500': '#58748b',
      }
    : {
        'cream-50': '#f7f4ee',
        'cream-75': '#fffdf8',
        'paper-25': '#f2efe7',
        'ink-900': '#17202b',
        'ink-650': '#415064',
        'blue-700': '#1d4f7c',
        'green-700': '#2f5f4a',
        'red-700': '#8f3239',
        'amber-700': '#8a5a12',
        'shell-300': '#c9c2b6',
      };
  const semantic = dark
    ? {
        bg: 'graphite-950', surface: 'graphite-900', elevated: 'graphite-800',
        text: 'white-100', muted: 'gray-400', border: 'steel-500',
        accent: 'amber-400',
        // The amber accent is BRIGHT in dark mode, so its own text must be dark.
        // The first version reused the light-mode foreground here and the contract
        // rejected it at 1.72:1 — white on amber is unreadable, and the check is what
        // caught it.
        bright: 'white-100', 'on-accent': 'graphite-950',
        running: 'blue-400', complete: 'green-400', error: 'red-400', warn: 'amber-400', link: 'blue-400',
      }
    : {
        bg: 'cream-50', surface: 'cream-75', elevated: 'paper-25',
        text: 'ink-900', muted: 'ink-650', border: 'shell-300',
        accent: 'amber-700', bright: 'cream-75', 'on-accent': 'cream-75',
        running: 'blue-700', complete: 'green-700', error: 'red-700', warn: 'amber-700', link: 'blue-700',
      };
  const pairs = [
    { role: 'body', foreground: 'text', background: 'bg' },
    { role: 'body', foreground: 'text', background: 'surface' },
    { role: 'body', foreground: 'text', background: 'elevated' },
    { role: 'secondary', foreground: 'muted', background: 'surface' },
    { role: 'secondary', foreground: 'muted', background: 'bg' },
    { role: 'link', foreground: 'link', background: 'bg' },
    { role: 'accent-button', foreground: 'on-accent', background: 'accent' },
    { role: 'success', foreground: 'complete', background: 'surface' },
    { role: 'error', foreground: 'error', background: 'surface' },
    { role: 'warning', foreground: 'warn', background: 'surface' },
  ];
  return {
    schemaVersion: 1,
    id: id ?? 'my-theme',
    label: label ?? '我的主题',
    mode,
    primitives,
    semantic,
    pairs,
  };
}
