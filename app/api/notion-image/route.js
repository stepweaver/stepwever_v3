import { Client } from '@notionhq/client';
import { createRateLimit } from '@/utils/rateLimit';

function isValidNotionId(id) {
  if (!id || typeof id !== 'string') return false;
  const clean = id.replace(/-/g, '');
  return /^[0-9a-f]{32}$/i.test(clean);
}

function normalizeNotionId(id) {
  const clean = id.replace(/-/g, '');
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

const rateLimit = createRateLimit({
  maxRequests: 60,
  windowMs: 60 * 1000,
  message: 'Too many image requests. Please try again shortly.',
});

export async function GET(request) {
  const rateLimitResult = await rateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  const { searchParams } = new URL(request.url);
  const blockId = searchParams.get('blockId');

  if (!blockId || !isValidNotionId(blockId)) {
    return Response.json({ error: 'Invalid block ID' }, { status: 400 });
  }

  if (!process.env.NOTION_API_KEY) {
    return Response.json({ error: 'Not configured' }, { status: 500 });
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const block = await notion.blocks.retrieve({ block_id: normalizeNotionId(blockId) });

    if (block.type !== 'image') {
      return Response.json({ error: 'Block is not an image' }, { status: 400 });
    }

    const img = block.image;
    const url =
      img.type === 'external'
        ? img.external?.url
        : img.type === 'file'
          ? img.file?.url
          : null;

    if (!url) {
      return Response.json({ error: 'No image URL found' }, { status: 404 });
    }

    return Response.json(
      { url },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (err) {
    const status = err.status || 500;
    const message =
      process.env.NODE_ENV === 'development' ? err.message : 'Failed to fetch image';
    return Response.json({ error: message }, { status });
  }
}
