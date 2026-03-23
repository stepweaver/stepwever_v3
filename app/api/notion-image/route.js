import { Client } from '@notionhq/client';
import { createRateLimit } from '@/utils/rateLimit';
import { verifyNotionImageRefreshToken } from '@/lib/notion/imageTokens';
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';

const rateLimit = createRateLimit({
  keyPrefix: 'notion-image',
  maxRequests: 60,
  windowMs: 60 * 1000,
  message: 'Too many image requests. Please try again shortly.',
  requireDistributedStoreInProduction: true,
});

function normalizeNotionId(id) {
  const clean = id.replace(/-/g, '');
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

export async function GET(request) {
  if (!isAllowedRequestOrigin(request)) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403, headers: jsonSecurityHeaders() }
    );
  }

  const rateLimitResult = await rateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[notion-image] missing token');
    }
    return Response.json(
      { error: 'Missing token' },
      { status: 400, headers: jsonSecurityHeaders() }
    );
  }

  const blockId = verifyNotionImageRefreshToken(token);
  if (!blockId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[notion-image] invalid or expired token');
    }
    return Response.json(
      { error: 'Not found' },
      { status: 404, headers: jsonSecurityHeaders() }
    );
  }

  if (!process.env.NOTION_API_KEY) {
    return Response.json(
      { error: 'Not configured' },
      { status: 500, headers: jsonSecurityHeaders() }
    );
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const block = await notion.blocks.retrieve({ block_id: normalizeNotionId(blockId) });

    if (block.type !== 'image') {
      return Response.json(
        { error: 'Block is not an image' },
        { status: 400, headers: jsonSecurityHeaders() }
      );
    }

    const img = block.image;
    const url =
      img.type === 'external'
        ? img.external?.url
        : img.type === 'file'
          ? img.file?.url
          : null;

    if (!url) {
      return Response.json(
        { error: 'No image URL found' },
        { status: 404, headers: jsonSecurityHeaders() }
      );
    }

    return Response.json(
      { url },
      {
        headers: {
          ...jsonSecurityHeaders(),
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (err) {
    const status = err.status || 500;
    const message =
      process.env.NODE_ENV === 'development' ? err.message : 'Failed to fetch image';
    return Response.json(
      { error: message },
      { status, headers: jsonSecurityHeaders() }
    );
  }
}
