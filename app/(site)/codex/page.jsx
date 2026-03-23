import { getInitialBlogEntries } from '@/lib/blog';
import CodexPageClient from './CodexPageClient';
import {
  normalizePostFromBlogEntry,
  sortPosts,
} from '@/lib/codex/selectors';

export const metadata = {
  title: 'Codex',
  description:
    'Developer notes, projects, and community thoughts — digital codex.',
};

export default async function CodexPage() {
  let initialPosts = [];
  if (process.env.NOTION_BLOG_DB_ID) {
    try {
      const entries = await getInitialBlogEntries(200);
      initialPosts = sortPosts(entries.map(normalizePostFromBlogEntry));
    } catch {
      initialPosts = [];
    }
  }

  return <CodexPageClient initialPosts={initialPosts} />;
}
