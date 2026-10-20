/**
 * Feed collection — L0 port of upstream `reset-rss.mjs`, GENERALISED to any feed.
 *
 * What is ported verbatim in spirit (the parts that are pure machinery):
 *   · RSS/Atom item parsing with CDATA, numeric/named entity decoding
 *   · 1 MiB response cap
 *   · at most 100 candidate posts per scan
 *   · dedupe by original post id + a body digest
 *   · a 7-day freshness window
 *   · conditional requests (If-None-Match / If-Modified-Since) and a 304 that
 *     downloads no body
 *   · an atomic cache write carrying etag / lastModified / digest
 *
 * What changed (L2 — the data source): upstream hardcodes `fxtwitter.com/
 * thsottiaux/feed.xml` and validates that every post URL belongs to that account,
 * so its monitor can only ever watch one X account. Here a feed is a configurable
 * {id, label, url}. The OpenAI reset feed is still the shipped default — it is
 * reachable and is the feature's original purpose — but nothing in the machinery
 * assumes it.
 */
import { createHash } from 'node:crypto';

const LIMIT = 1024 * 1024;
const MAX_ENTRIES = 100;
const FRESH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** Upstream's feed, kept as the shipped default. */
export const DEFAULT_FEEDS = Object.freeze([
  {
    id: 'codex-reset',
    label: 'Codex 额度重置公告（@thsottiaux 转发）',
    url: 'https://fxtwitter.com/thsottiaux/feed.xml?with_replies=true&count=100',
    kind: 'announcement',
  },
]);
// A second default feed was tried and REMOVED: a GitHub releases.atom URL for the
// harness returned a timeout during a live scan. Shipping a default that cannot be
// fetched would make every scan report a failure, so the catalogue ships one feed
// that is verified reachable and lets the user add others.

function decode(value) {
  return String(value ?? '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gu, '$1')
    .replace(/&#(x[0-9a-f]+|\d+);/giu, (_, code) => {
      const point = code[0].toLowerCase() === 'x' ? Number.parseInt(code.slice(1), 16) : Number(code);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : '';
    })
    .replace(/&(lt|gt|quot|apos|amp);/g, (_, name) => ({ lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' })[name]);
}

const stripTags = (html) => decode(String(html ?? '')
  .replace(/<blockquote\b[\s\S]*?<\/blockquote>/giu, '')
  .replace(/<[^>]*>/gu, ' '))
  .replace(/\s+/gu, ' ')
  .trim();

const field = (item, name) => decode(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'iu').exec(item)?.[1] ?? '').trim();

/** Ported from upstream `parseResetRss`, minus the account binding. */
export function parseFeed(xml, { now = Date.now(), feedId = '' } = {}) {
  const items = String(xml ?? '').match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/giu) ?? [];
  const posts = [];
  for (const item of items) {
    if (posts.length >= MAX_ENTRIES) break;
    const link = field(item, 'link') || (/<link[^>]*href="([^"]+)"/iu.exec(item)?.[1] ?? '');
    const guid = field(item, 'guid') || field(item, 'id') || link;
    const title = stripTags(field(item, 'title'));
    const body = stripTags(field(item, 'description') || field(item, 'content') || field(item, 'summary'));
    const publishedRaw = field(item, 'pubDate') || field(item, 'published') || field(item, 'updated');
    const publishedAt = Number.isFinite(Date.parse(publishedRaw)) ? Date.parse(publishedRaw) : null;
    if (publishedAt !== null && now - publishedAt > FRESH_WINDOW_MS) continue;
    const text = title && body ? `${title}\n${body}` : title || body;
    if (!text) continue;
    posts.push({
      feedId,
      id: String(guid).slice(0, 200),
      url: String(link).slice(0, 500),
      title,
      text: text.slice(0, 4000),
      publishedAt,
      digest: createHash('sha256').update(text.slice(0, 2000)).digest('hex').slice(0, 16),
    });
  }
  return posts;
}

function headerValue(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

/**
 * Fetch one feed, with conditional requests. Upstream's semantics: a 304 downloads
 * no body and is reported as `notModified` rather than as an empty scan, so the UI
 * can tell "nothing new" apart from "check failed".
 */
export async function collectFeed(feed, { fetchImpl = fetch, cache = null, now = Date.now() } = {}) {
  const headers = { 'user-agent': 'aiyoucodex-dsh-reset-monitor' };
  const prior = cache && cache.source === feed.url ? cache : null;
  if (headerValue(prior?.etag)) headers['if-none-match'] = prior.etag;
  if (headerValue(prior?.lastModified)) headers['if-modified-since'] = prior.lastModified;

  const response = await fetchImpl(feed.url, { headers, signal: AbortSignal.timeout(30000) });
  if (response.status === 304) {
    return { ok: true, notModified: true, posts: [], cache: prior, status: 304 };
  }
  if (!response.ok) {
    return { ok: false, notModified: false, posts: [], cache: prior, status: response.status, error: `HTTP ${response.status}` };
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > LIMIT) {
    return { ok: false, notModified: false, posts: [], cache: prior, status: response.status, error: `feed exceeds ${LIMIT} bytes` };
  }
  const xml = buffer.toString('utf8');
  const posts = parseFeed(xml, { now, feedId: feed.id });
  return {
    ok: true,
    notModified: false,
    posts,
    status: response.status,
    cache: {
      source: feed.url,
      etag: headerValue(response.headers.get('etag')),
      lastModified: headerValue(response.headers.get('last-modified')),
      digest: createHash('sha256').update(xml).digest('hex').slice(0, 16),
      at: now,
    },
  };
}

/** Dedupe across scans by (feedId, id), falling back to the body digest. */
export function dedupePosts(posts, seen) {
  const fresh = [];
  for (const post of posts) {
    const key = `${post.feedId}\u0000${post.id || post.digest}`;
    if (seen.has(key)) continue;
    seen.add(key);
    fresh.push({ ...post, key });
  }
  return fresh;
}
