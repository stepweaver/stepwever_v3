import { getBlogEntries as repoGetBlogEntries } from "./notion/blog.repo";

export async function getAllBlogEntries() {
  const entries = await repoGetBlogEntries();
  return Array.isArray(entries) ? entries : [];
}

export async function getInitialBlogEntries(limit = 100) {
  const result = await repoGetBlogEntries({ pageSize: limit });
  if (result?.items) return result.items;
  return Array.isArray(result) ? result : [];
}

export async function getBlogEntryById(entryId) {
  const entries = await repoGetBlogEntries();
  const list = Array.isArray(entries) ? entries : [];
  return list.find((e) => e.id === entryId) ?? null;
}

export async function getBlogEntryBySlug(slug) {
  const entries = await repoGetBlogEntries();
  const list = Array.isArray(entries) ? entries : entries?.items ?? [];
  return list.find((e) => e.slug === slug) ?? null;
}

export async function getRecentBlogEntries(limit = 10) {
  const entries = await repoGetBlogEntries({ limit });
  return Array.isArray(entries) ? entries : [];
}
