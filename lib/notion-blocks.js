import { getNotion } from "./notion/client";

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
    const blocks = [];
    let cursor = undefined;
    let pageCount = 0;
    while (pageCount < maxPages) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        ...(cursor && { start_cursor: cursor }),
      });
      const results = response.results ?? [];
      blocks.push(...results);
      if (!response.has_more || !response.next_cursor) break;
      cursor = response.next_cursor;
      pageCount += 1;
    }
    return blocks;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getPageBlocks]", err);
    return [];
  }
}
