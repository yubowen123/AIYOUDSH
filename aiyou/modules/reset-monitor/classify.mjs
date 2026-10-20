/**
 * Local announcement classification — L0 port of upstream `reset-classifier.mjs`.
 *
 * Sources are translated where upstream's sources are translated; the RULES are
 * upstream's, and so is the conservatism: a question, a wish, a joke or a quotation
 * must not be promoted to an announcement, and an unrecognised phrasing stays a
 * history signal only. Nothing here calls a model — upstream is explicit that
 * classification is local and free, and that the evidence score measures SOURCE
 * QUALITY, not the probability that a reset happens.
 */

const HOUR = 3_600_000;
const NUMBERS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, twelve: 12, twentyfour: 24,
};
const OFFSETS = { UTC: 0, GMT: 0, PST: -8, PDT: -7, EST: -5, EDT: -4, CST: -6, CDT: -5 };

const number = (value) => (/^\d+$/u.test(value) ? Number(value) : NUMBERS[String(value).toLowerCase()]);
const excerpt = (text) => String(text).trim().split(/\s+/u).slice(0, 25).join(' ').slice(0, 240);

/**
 * Ported from upstream `extractResetTime`.
 * Recognises only unambiguous forms: an explicit timezone clock, "tomorrow" + a
 * 12-hour clock + timezone, an explicit relative hour count, or a dated zoned
 * timestamp. Anything else yields null — upstream's rule is that an unreliable time
 * must not become a countdown.
 */
export function extractResetTime(text, publishedAt) {
  const source = String(text ?? '');
  const base = Number.isFinite(publishedAt) ? publishedAt : Date.now();

  const zoned = /\b(?:at|around|by)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(UTC|GMT|PST|PDT|EST|EDT|CST|CDT)\b/iu.exec(source);
  if (zoned) {
    const hour12 = Number(zoned[1]);
    const minute = Number(zoned[2] ?? 0);
    const meridiem = zoned[3]?.toLowerCase();
    let hours = hour12 % 12;
    if (meridiem === 'pm') hours += 12;
    if (!meridiem && hour12 <= 12 && hour12 >= 1 && /tomorrow/iu.test(source)) hours = hour12 + (hour12 === 12 ? 0 : 12);
    const offset = OFFSETS[zoned[4].toUpperCase()] ?? 0;
    const at = new Date(base);
    at.setUTCHours(hours - offset, minute, 0, 0);
    if (/tomorrow/iu.test(source) && at.getTime() <= base) return { targetAt: at.getTime() + 24 * HOUR, precision: 'exact', basis: 'tomorrow + 12h clock + timezone' };
    return { targetAt: at.getTime() > base ? at.getTime() : at.getTime() + 24 * HOUR, precision: 'exact', basis: 'zoned clock time' };
  }

  const relative = /\bin\s+(\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|twelve|twentyfour)\s*(?:hours?|hrs?)\b/iu.exec(source);
  if (relative) {
    const hours = number(relative[1]);
    if (Number.isFinite(hours)) return { targetAt: base + hours * HOUR, precision: 'exact', basis: 'explicit relative hours' };
  }

  const dated = /\b(\d{4})-(\d{2})-(\d{2})[T ](\d{1,2})(?::(\d{2}))?\s*(UTC|GMT|PST|PDT|EST|EDT|CST|CDT)\b/iu.exec(source);
  if (dated) {
    const offset = OFFSETS[dated[6].toUpperCase()] ?? 0;
    const at = Date.UTC(Number(dated[1]), Number(dated[2]) - 1, Number(dated[3]), Number(dated[4]) - offset, Number(dated[5] ?? 0));
    return { targetAt: at, precision: 'exact', basis: 'dated zoned timestamp' };
  }

  const windowed = /\bwithin\s+(?:the\s+)?next\s+(\d{1,2})\s*hours?\b/iu.exec(source);
  if (windowed) {
    const hours = Number(windowed[1]);
    if (hours <= 24) return { targetAt: base + hours * HOUR, precision: 'window', basis: '<=24h window' };
  }

  return null;
}

const COMPLETED = /\b(?:i(?:'ve| have)?\s+(?:just\s+)?(?:reset|granted|given)|resets?\s+(?:are|have been)\s+(?:done|issued)|already\s+reset|完成重置|已经重置|已发放)\b/iu;
const CANCELLED = /\b(?:cancel(?:led|ing)?|not\s+happening|scrapped|取消|不发了)\b/iu;
const SCHEDULED = /\b(?:will|going to|plan to|expect to|tomorrow|scheduled|预计|将|明天)\b/iu;
const QUESTION = /\?\s*$|\b(?:should i|do you think|what if|would you)\b/iu;
const WISH = /\b(?:i wish|hopefully|i hope|fingers crossed|希望|但愿)\b/iu;

/**
 * Ported from upstream `classifyResetPost`, with the account binding removed.
 * The evidence score is upstream's idea: it measures how good the PROVENANCE is —
 * a first-person post read from the feed scores high, a repost or an unfollowed
 * hedge does not — and >=70 is the threshold to surface anything at all.
 */
export function classifyPost(post, { knownEvents = [], now = Date.now(), feedKind = 'announcement' } = {}) {
  const text = String(post?.text ?? '');
  if (!text.trim()) return null;

  const isReply = /^@\w+/u.test(text.trim());
  const firstPerson = /\b(?:i|i'm|i've|we|we're|we've)\b/iu.test(text) || /我|我们/u.test(text);

  let status = 'tentative';
  if (CANCELLED.test(text)) status = 'cancelled';
  else if (COMPLETED.test(text)) status = 'completed';
  else if (SCHEDULED.test(text)) status = 'scheduled';

  // A question or a wish is never an announcement — upstream is explicit.
  const speculative = QUESTION.test(text) || WISH.test(text);

  // Upstream distinguishes a direct reset from granted reset counts; both count as
  // a landing, and neither may be claimed until there is a verifiable increment.
  const resetType = /\b(?:banked|credits?|resets?\s+to\s+use|次数|额度次数)\b/iu.test(text) ? 'banked' : 'direct';

  const timing = extractResetTime(text, post?.publishedAt);

  let score = 0;
  if (firstPerson) score += 30;
  if (!isReply) score += 15;
  if (feedKind === 'announcement') score += 10;
  if (/\b(?:reset|resets|granted|credits?|额度|重置)\b/iu.test(text)) score += 15;
  if (timing) score += 20;
  if (status === 'completed' || status === 'scheduled') score += 10;
  if (speculative) score -= 40;
  if (status === 'tentative') score -= 10;
  const age = Number.isFinite(post?.publishedAt) ? now - post.publishedAt : 0;
  if (age <= 24 * HOUR) score += 10;
  else if (age > 72 * HOUR) score -= 10;
  const confidence = Math.max(0, Math.min(100, score));

  return {
    key: post.key,
    feedId: post.feedId,
    url: post.url,
    publishedAt: post.publishedAt,
    excerpt: excerpt(text),
    status,
    resetType,
    speculative,
    confidence,
    // Upstream's bands: >=90 red, 70-89 yellow, below 70 not surfaced at all.
    band: confidence >= 90 ? 'red' : confidence >= 70 ? 'yellow' : 'below-threshold',
    surfaced: confidence >= 70 && !speculative,
    timing,
    // Upstream: a countdown requires a verified exact time, and reaching it says
    // "已到时 · 待核验" — never that the account balance changed.
    countdownAt: timing && timing.precision === 'exact' ? timing.targetAt : null,
    deliveryStatus: 'unverified',
    deliveryNote: '到账需要可核验的重置次数增量；公告本身不能证明账号已到账。',
    known: knownEvents.includes(post.key),
  };
}
