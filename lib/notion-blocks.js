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
    const blocks = await paginate(
      (cursor) =>
        notion.blocks.children.list({
          block_id: pageId,
          page_size: 100,
          ...(cursor && { start_cursor: cursor }),
        }),
      { limit: maxPages * 100 }
    );

    // Eagerly load table rows so table blocks can render with their contents.
    const tableBlocks = blocks.filter(
      (block) => block.type === "table" && block.has_children
    );

    if (!tableBlocks.length) return blocks;

    const tablesWithRows = await Promise.all(
      tableBlocks.map(async (table) => {
        try {
          const rows = await paginate((cursor) =>
            notion.blocks.children.list({
              block_id: table.id,
              page_size: 100,
              ...(cursor && { start_cursor: cursor }),
            })
          );
          return { id: table.id, rows };
        } catch {
          return { id: table.id, rows: [] };
        }
      })
    );

    const tableRowMap = new Map(
      tablesWithRows.map((t) => [t.id, t.rows])
    );

    return blocks.map((block) =>
      block.type === "table"
        ? {
            ...block,
            children: tableRowMap.get(block.id) ?? [],
          }
        : block
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[getPageBlocks]", err);
    return [];
  }
}
