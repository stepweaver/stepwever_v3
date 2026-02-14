/**
 * Return a Tailwind indent class for a heading entry in the "On this page" TOC.
 * @param {number} level - heading level (1|2|3)
 * @param {boolean} isFirst - whether this is the first entry in the list
 */
export function headingIndentClass(level, isFirst) {
  if (isFirst || level === 1) return 'pl-0 font-medium';
  return level === 2 ? 'pl-4' : 'pl-6';
}

/**
 * Slugify heading text for use as HTML id (for "On this page" anchor links).
 */
export function slugifyHeading(text) {
  if (!text || typeof text !== "string") return "section";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    || "section";
}

/**
 * Extract heading entries from Notion blocks for table-of-contents.
 * Returns [{ level: 1|2|3, text, id }]. Ids are made unique by appending -1, -2 if needed.
 */
export function getHeadingsFromBlocks(blocks) {
  if (!blocks?.length) return [];
  const seen = new Map();
  const result = [];

  for (const block of blocks) {
    let level, text;
    if (block.type === "heading_1" && block.heading_1?.rich_text) {
      level = 1;
      text = block.heading_1.rich_text.map((t) => t.plain_text).join("");
    } else if (block.type === "heading_2" && block.heading_2?.rich_text) {
      level = 2;
      text = block.heading_2.rich_text.map((t) => t.plain_text).join("");
    } else if (block.type === "heading_3" && block.heading_3?.rich_text) {
      level = 3;
      text = block.heading_3.rich_text.map((t) => t.plain_text).join("");
    } else {
      continue;
    }
    if (!text.trim()) continue;
    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    result.push({ level, text, id });
  }
  return result;
}
