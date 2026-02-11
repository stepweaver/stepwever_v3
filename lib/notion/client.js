// lib/notion/client.js
import { Client } from "@notionhq/client";

let _notion = null;

/**
 * Lazy Notion client. Throws only when called without NOTION_API_KEY.
 * Allows app to build/run when Notion is not configured (blog returns []).
 */
export function getNotion() {
  if (!process.env.NOTION_API_KEY) throw new Error("Missing env var: NOTION_API_KEY");
  if (!_notion) _notion = new Client({ auth: process.env.NOTION_API_KEY });
  return _notion;
}

// Optional: Blog database (when set, blog posts are sourced from Notion)
export const NOTION_BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID || null;
