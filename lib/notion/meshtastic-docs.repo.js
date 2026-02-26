// lib/notion/meshtastic-docs.repo.js – Meshtastic Docs DB (NOTION_MESHTASTIC_DOCS_DB_ID)
import { getNotion } from "./client";
import { paginate } from "./paginate";

function getDbId() {
  const id = process.env.NOTION_MESHTASTIC_DOCS_DB_ID;
  if (!id) return null;
  const clean = id.replace(/-/g, "");
  if (clean.length < 32) return null;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

function getPropertyValue(property, type) {
  if (!property || !property[type]) return null;
  switch (type) {
    case "title":
      return property.title?.[0]?.plain_text ?? "";
    case "rich_text":
      return property.rich_text?.[0]?.plain_text ?? "";
    case "number":
      return property.number;
    case "select":
      return property.select?.name ?? "";
    default:
      return null;
  }
}

function extractCoverUrl(page) {
  const cover = page.cover;
  if (!cover) return undefined;
  if (cover.type === "external") return cover.external?.url || undefined;
  if (cover.type === "file") return cover.file?.url || undefined;
  return undefined;
}

function formatDocPage(page) {
  const p = page.properties;
  const title = getPropertyValue(p.Title, "title") || "Untitled";
  const slug = getPropertyValue(p.Slug, "rich_text") || page.id.replace(/-/g, "");
  const section = getPropertyValue(p.Section, "select") || "Uncategorized";
  const orderVal = p.Order?.number;
  const order = typeof orderVal === "number" ? orderVal : 0;
  const status = getPropertyValue(p.Status, "select") || "Draft";
  const summary = getPropertyValue(p.Summary, "rich_text") || undefined;
  return {
    id: page.id,
    title,
    slug,
    section,
    order,
    status,
    summary,
    coverImage: extractCoverUrl(page),
    lastEditedTime: page.last_edited_time,
    createdTime: page.created_time,
  };
}

/**
 * List all published Meshtastic doc pages. Returns [] if NOTION_MESHTASTIC_DOCS_DB_ID is not set or API fails.
 */
export async function listPublishedDocs() {
  const dbId = getDbId();
  if (!dbId) return [];

  try {
    const pages = await paginate((cursor) =>
      getNotion().databases.query({
        database_id: dbId,
        filter: {
          and: [
            { property: "Status", select: { equals: "Published" } },
            { property: "Slug", rich_text: { does_not_equal: "field-notes" } },
          ],
        },
        sorts: [
          { property: "Section", direction: "ascending" },
          { property: "Order", direction: "ascending" },
          { timestamp: "last_edited_time", direction: "descending" },
        ],
        page_size: 100,
        ...(cursor && { start_cursor: cursor }),
      })
    );
    return pages.map(formatDocPage);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[listPublishedDocs]", err);
    return [];
  }
}

/**
 * Get a single published doc by slug. Returns null if not found or DB not configured.
 */
export async function getDocBySlug(slug) {
  const dbId = getDbId();
  if (!dbId || !slug) return null;

  try {
    const res = await getNotion().databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    });
    const page = res.results?.[0];
    if (!page) return null;
    return formatDocPage(page);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getDocBySlug]", err);
    return null;
  }
}

/** Stable section order for sidebar display. */
const SECTION_ORDER = ["About", "Overview", "Getting Started", "Hardware", "Field Notes"];

/**
 * Group doc metas by section, with stable ordering within each section.
 */
export function groupDocsBySection(docs) {
  const map = new Map();
  for (const d of docs) {
    const arr = map.get(d.section) ?? [];
    arr.push(d);
    map.set(d.section, arr);
  }
  const result = [];
  const processed = new Set();
  for (const section of SECTION_ORDER) {
    const arr = map.get(section);
    if (!arr?.length) continue;
    arr.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    result.push({ section, pages: arr });
    processed.add(section);
  }
  for (const [section, arr] of map.entries()) {
    if (processed.has(section)) continue;
    arr.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    result.push({ section, pages: arr });
  }
  return result;
}

/**
 * Flatten grouped sections into a single ordered list for prev/next navigation.
 * @param {Array<{ section: string, pages: Array }>} grouped - output of groupDocsBySection
 */
export function getFlatDocList(grouped) {
  if (!grouped?.length) return [];
  return grouped.flatMap(({ pages }) => pages);
}

/**
 * List all Field Notes entries. Field Notes are entries with slug "field-notes".
 * Returns [] if DB not configured or no field notes found.
 */
export async function listFieldNotes() {
  const dbId = getDbId();
  if (!dbId) return [];

  try {
    const pages = await paginate((cursor) =>
      getNotion().databases.query({
        database_id: dbId,
        filter: {
          and: [
            { property: "Status", select: { equals: "Published" } },
            { property: "Slug", rich_text: { equals: "field-notes" } },
          ],
        },
        sorts: [
          { timestamp: "last_edited_time", direction: "descending" },
        ],
        page_size: 100,
        ...(cursor && { start_cursor: cursor }),
      })
    );
    return pages.map(formatDocPage);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[listFieldNotes]", err);
    return [];
  }
}

/**
 * Get a single field note by title (date). Returns null if not found or DB not configured.
 */
export async function getFieldNoteByTitle(title) {
  const dbId = getDbId();
  if (!dbId || !title) return null;

  try {
    const res = await getNotion().databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Slug", rich_text: { equals: "field-notes" } },
          { property: "Title", title: { equals: title } },
        ],
      },
      page_size: 1,
    });
    const page = res.results?.[0];
    if (!page) return null;
    return formatDocPage(page);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getFieldNoteByTitle]", err);
    return null;
  }
}
