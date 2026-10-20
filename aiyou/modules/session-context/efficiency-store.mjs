/**
 * Minimal stand-in for upstream's `efficiency-store.mjs`.
 *
 * `context-draft.mjs` imports exactly two helpers from it, and both are pure
 * validation with no Codex coupling. The rest of that module deals with
 * AIYOUcodex's own efficiency-state paths, which have no meaning here — so rather
 * than drag in the whole file (and its path/shortcut dependencies) this shim
 * re-implements those two helpers with the same contracts.
 *
 * Ported verbatim from upstream:
 *   validateEfficiencyThreadId  — id regex + forbidden-key rejection
 *   normalizeEfficiencyContext  — key allow-list + per-field length clamps
 * with `object` / `keys` / `text` and FORBIDDEN_KEYS copied from the original.
 */

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${label} must be an object`);
  for (const key of Object.keys(value)) if (FORBIDDEN_KEYS.has(key)) throw new TypeError(`${label} contains a forbidden key`);
  return value;
}

function keys(value, allowed, label) {
  object(value, label);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw new TypeError(`${label}.${key} is not supported`);
}

function text(value, maximum, label) {
  if (typeof value !== 'string' || value.length > maximum || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) {
    throw new TypeError(`${label} must be text of at most ${maximum} characters`);
  }
  return value.trim();
}

export function validateEfficiencyThreadId(value) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/u.test(value) || FORBIDDEN_KEYS.has(value)) {
    throw new TypeError('Invalid threadId');
  }
  return value;
}

export function normalizeEfficiencyContext(value) {
  keys(value, ['goal', 'progress', 'nextStep', 'agreements', 'references'], 'context');
  const result = { goal: '', progress: '', nextStep: '', agreements: [], references: [] };
  for (const [key, maximum] of [['goal', 600], ['progress', 1200], ['nextStep', 600]]) {
    if (value[key] !== undefined) result[key] = text(value[key], maximum, key);
  }
  for (const [key, maximum] of [['agreements', 300], ['references', 500]]) {
    if (value[key] === undefined) continue;
    if (!Array.isArray(value[key]) || value[key].length > 12) throw new TypeError(`${key} supports at most 12 entries`);
    result[key] = value[key].map((item) => text(item, maximum, key)).filter(Boolean);
  }
  if (JSON.stringify(result).length > 8192) throw new TypeError('Context exceeds 8192 characters');
  return result;
}
