import { getNotion } from "./notion/client";
import { paginate } from "./notion/paginate";

/**
 * Fetch all blocks for a Notion page (supports pagination).
 * @param {string} pageId - Notion page ID
 * @param {number} maxPages - Max number of pages to fetch (100 blocks per page)
 * @returns {Promise<Array>} Raw Notion block objects
 */
export async function getPageBlocks(pageId, maxPages = 5) {
  if (!pageId) return [];
  try {
    const notion = getNotion();
    return await paginate(
      (cursor) =>
        notion.blocks.children.list({
          block_id: pageId,
          page_size: 100,
          ...(cursor && { start_cursor: cursor }),
        }),
      { limit: maxPages * 100 }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getPageBlocks]", err);
    return [];
  }
}
