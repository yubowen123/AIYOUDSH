/**
 * Output-policy store: schema, inheritance resolution, and the model instruction.
 *
 * L0 PORT — `normalizePolicy` is upstream's `normalizeEfficiencyPolicy` with the
 * same validation: mode ∈ {smart, concise, detailed}, contextBudget 512..2400,
 * at most 8 default skills, skill identity is (source, id) so two skills with the
 * same name from different sources stay distinct.
 *
 * INHERITANCE (upstream: 全局默认 → 项目设置 → 当前对话设置 → 用户本轮明确要求):
 *   A layer stores a PARTIAL patch. A key the layer contains overrides the layer
 *   below; a key it does not contain inherits. This is why `defaultSkills: []` means
 *   "this layer explicitly chooses no skills" rather than "inherit" — presence of
 *   the key is the override, not its emptiness. A `null` value clears the layer's
 *   override for that key, restoring the upper layer.
 */

export const DEFAULT_POLICY = Object.freeze({
  enabled: true,
  mode: 'smart',
  defaultSkills: [],
  contextBudget: 1400,
});

export const MODES = Object.freeze(['smart', 'concise', 'detailed']);

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function keys(value, allowed, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`${label} must be an object`);
  for (const key of Object.keys(value)) {
    if (FORBIDDEN_KEYS.has(key)) throw new TypeError(`${label} contains a forbidden key`);
    if (!allowed.includes(key)) throw new TypeError(`${label}.${key} is not supported`);
  }
}

function text(value, maximum, label) {
  if (typeof value !== 'string' || value.length > maximum || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) {
    throw new TypeError(`${label} must be text of at most ${maximum} characters`);
  }
  return value.trim();
}

/** Ported from upstream `normalizeEfficiencyPolicy`. Throws on any invalid field. */
export function normalizePolicy(patch) {
  keys(patch, ['enabled', 'mode', 'defaultSkills', 'contextBudget'], 'policy');
  const result = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) {
      result[key] = null;
      continue;
    }
    if (key === 'mode') {
      if (!MODES.includes(value)) throw new TypeError('Unknown output mode');
    } else if (key === 'enabled') {
      if (typeof value !== 'boolean') throw new TypeError('enabled must be boolean');
    } else if (key === 'contextBudget') {
      if (!Number.isInteger(value) || value < 512 || value > 2400) throw new TypeError('contextBudget must be 512..2400 characters');
    } else {
      if (!Array.isArray(value) || value.length > 8) throw new TypeError('defaultSkills supports at most 8 skills');
      const seen = new Set();
      result[key] = value.map((skill) => {
        keys(skill, ['id', 'source'], 'skill');
        const id = text(skill.id, 128, 'skill.id');
        if (!id || !/^[a-zA-Z0-9][a-zA-Z0-9._:/-]*$/u.test(id)) throw new TypeError('Invalid skill identity');
        const source = skill.source === undefined ? '' : text(skill.source, 200, 'skill.source');
        const identity = `${source}\u0000${id}`;
        if (seen.has(identity)) throw new TypeError('Duplicate default skill');
        seen.add(identity);
        return { id, ...(source ? { source } : {}) };
      });
      continue;
    }
    result[key] = value;
  }
  return result;
}

/**
 * Resolve a scope by folding layers in order; later layers win per key, keys a
 * layer omits are inherited, and `null` removes an override.
 */
export function resolvePolicy(layers) {
  const resolved = { ...DEFAULT_POLICY };
  const applied = {};
  for (const [layerName, patch] of layers) {
    if (!patch || typeof patch !== 'object') continue;
    for (const [key, value] of Object.entries(patch)) {
      if (!(key in DEFAULT_POLICY)) continue;
      if (value === null || value === undefined) continue;
      resolved[key] = value;
      applied[key] = layerName;
    }
  }
  return { policy: resolved, appliedBy: applied };
}

/** The scope keys a client may address. Project scope is a directory path. */
export function scopeKey(scope, id) {
  if (scope === 'global') return 'global';
  if (scope === 'project') return `project:${String(id ?? '')}`;
  if (scope === 'session') return `session:${String(id ?? '')}`;
  return null;
}

const MODE_INSTRUCTION = {
  smart: [
    'Default mode: report operational work briefly. Expand when the task is analytical or a decision needs justification.',
  ],
  concise: [
    'Result first. Cut pleasantries, restated context, and step-by-step narration.',
    'Prefer the shortest form that still carries the substance; bullets over paragraphs when listing.',
  ],
  detailed: [
    'Give full explanations, the reasoning behind decisions, and worked examples where they help.',
    'Where a tradeoff exists, state both sides rather than only the chosen one.',
  ],
};

/**
 * The text injected into the system prompt.
 *
 * The invariants come straight from upstream's own doc: every mode must still
 * surface risks, failures, blockers, necessary progress and unverified items, and
 * a request for a complete deliverable must not be truncated. Stated explicitly
 * because a brevity instruction without them is an instruction to hide problems.
 */
export function buildInstruction(policy) {
  if (!policy?.enabled) return '';
  const lines = ['## Output preference'];
  lines.push(`Mode: ${policy.mode}`);
  lines.push(...(MODE_INSTRUCTION[policy.mode] ?? MODE_INSTRUCTION.smart));
  lines.push('');
  lines.push('Invariants that hold in every mode: never drop or soften risks, failures, blockers, needed progress, or unverified claims; never truncate code, scripts, prompts or reports the user asked to be delivered in full; say plainly when something is unknown rather than filling the gap.');
  if (Array.isArray(policy.defaultSkills) && policy.defaultSkills.length > 0) {
    const names = policy.defaultSkills.map((skill) => (skill.source ? `${skill.source}:${skill.id}` : skill.id));
    lines.push('');
    lines.push(`Skills this session should consult when relevant: ${names.join(', ')}. Naming them is a preference, not a claim that they were read or run; the usual skill-trigger rules still apply.`);
  }
  if (Number.isInteger(policy.contextBudget)) {
    lines.push(`Context budget for this preference block: ${policy.contextBudget} characters.`);
  }
  return lines.join('\n');
}
