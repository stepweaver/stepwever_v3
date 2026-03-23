/**
 * Shared Codex / blog list normalization (API, web page, terminal).
 */

export function safeParseCodexDate(dateStr) {
  if (!dateStr) return new Date(0);
  try {
    const [year, month, day] = String(dateStr).split('-').map(Number);
    if (!year || !month || !day) return new Date(0);
    return new Date(Date.UTC(year, month - 1, day));
  } catch {
    return new Date(0);
  }
}

export function normalizeTag(tag) {
  return String(tag || '')
    .trim()
    .toLowerCase()
    .replace(/^#+/, '');
}

export function normalizePostFromBlogEntry(entry) {
  const hashtags = Array.from(
    new Set((entry.hashtags || []).map(normalizeTag).filter(Boolean))
  );
  return {
    title: entry.title || 'Untitled',
    slug: entry.slug,
    date: entry.date || '',
    updated: entry.updated || null,
    description: entry.description || '',
    hashtags,
  };
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    const dateA = a.updated ? safeParseCodexDate(a.updated) : safeParseCodexDate(a.date);
    const dateB = b.updated ? safeParseCodexDate(b.updated) : safeParseCodexDate(b.date);
    return dateB - dateA;
  });
}

export function extractUniqueTags(posts) {
  const tags = new Set();
  posts.forEach((p) => (p.hashtags || []).forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function filterPostsByTags(posts, activeTags) {
  if (!activeTags.length) return posts;
  const normalizedActive = activeTags.map(normalizeTag);
  return posts.filter((post) => {
    const postTags = post.hashtags || [];
    return normalizedActive.some((tag) => postTags.includes(tag));
  });
}

/** Bracketed YYYY-MM-DD for terminal + codex UI (UTC). */
export function formatCodexDate(dateStr) {
  if (!dateStr) return '';
  try {
    const s = String(dateStr).trim();
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `[${m[1]}-${m[2]}-${m[3]}]`;
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `[${year}-${month}-${day}]`;
  } catch {
    return dateStr;
  }
}
