// lib/notion/blog.repo.js – Blog DB (NOTION_BLOG_DB_ID)
import { getNotion } from "./client";
import { paginate } from "./paginate";

function getBlogDbId() {
  const id = process.env.NOTION_BLOG_DB_ID;
  if (!id) return null;
  const clean = id.replace(/-/g, "");
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

function slugify(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

function getPropertyValue(property, type) {
  if (!property || !property[type]) return null;
  switch (type) {
    case "title":
      return property.title?.[0]?.plain_text ?? "";
    case "date":
      return property.date?.start ?? null;
    case "url":
      return property.url ?? null;
    case "rich_text":
      return property.rich_text?.[0]?.plain_text ?? "";
    case "multi_select":
      return property.multi_select?.map((x) => x.name) ?? [];
    default:
      return null;
  }
}

/** Find first property of a given type (Notion API keys can vary) */
function getPropertyByType(properties, type) {
  if (!properties || typeof properties !== "object") return null;
  for (const key of Object.keys(properties)) {
    const prop = properties[key];
    if (prop?.type === type) return prop;
  }
  return null;
}

function toCalendarDateOnly(value) {
  if (value == null || value === "") return null;
  const s = String(value).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function formatBlogEntry(page) {
  const p = page.properties;
  const title = getPropertyValue(p.Title || p.Name, "title");
  const dateProp = getPropertyByType(p, "date") || p.Date || p.date;
  const dateValue = dateProp ? getPropertyValue(dateProp, "date") : null;
  const dateOnly = toCalendarDateOnly(dateValue);
  const fallbackDate = toCalendarDateOnly(page.created_time);
  const lastEdited = toCalendarDateOnly(page.last_edited_time);
  const description =
    getPropertyValue(p.Excerpt || p.Description || p["Excerpt"] || p["Description"], "rich_text") ||
    getPropertyValue(p.excerpt || p.description, "rich_text") ||
    "";
  const tags = getPropertyValue(p.Tags || p.tags, "multi_select") || [];
  return {
    id: page.id,
    title,
    slug: slugify(title),
    date: dateOnly ?? fallbackDate ?? dateValue,
    updated: lastEdited || (dateOnly ?? fallbackDate ?? dateValue),
    description: description || "",
    hashtags: tags,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
  };
}

/**
 * Fetch blog entries (Status = Published only). Returns [] if NOTION_BLOG_DB_ID is not set.
 */
export async function getBlogEntries(options = {}) {
  const dbId = getBlogDbId();
  if (!dbId) return [];

  try {
    const { limit, cursor, pageSize = 100 } = options;
    const baseQuery = {
      database_id: dbId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    };

    if (cursor) {
      const res = await getNotion().databases.query({
        ...baseQuery,
        start_cursor: cursor,
        page_size: Math.min(pageSize, 100),
      });
      return {
        items: (res.results ?? []).map(formatBlogEntry),
        hasMore: !!res.has_more,
        nextCursor: res.next_cursor ?? null,
      };
    }

    if (pageSize && pageSize !== 100 && limit == null) {
      const res = await getNotion().databases.query({
        ...baseQuery,
        page_size: Math.min(pageSize, 100),
      });
      return {
        items: (res.results ?? []).map(formatBlogEntry),
        hasMore: !!res.has_more,
        nextCursor: res.next_cursor ?? null,
      };
    }

    if (limit && limit <= 100) {
      const res = await getNotion().databases.query({
        ...baseQuery,
        page_size: Math.min(limit, 100),
      });
      return (res.results ?? []).map(formatBlogEntry);
    }

    if (limit) {
      const pages = await paginate(
        (cursor) =>
          getNotion().databases.query({
            ...baseQuery,
            start_cursor: cursor,
            page_size: 100,
          }),
        { limit }
      );
      return pages.map(formatBlogEntry);
    }

    const pages = await paginate((cursor) =>
      getNotion().databases.query({
        ...baseQuery,
        start_cursor: cursor,
        page_size: 100,
      })
    );
    return pages.map(formatBlogEntry);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getBlogEntries]", err);
    return [];
  }
}
