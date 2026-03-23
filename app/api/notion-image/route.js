import { Client } from '@notionhq/client';
import { createRateLimit } from '@/utils/rateLimit';
import { verifyNotionImageRefreshToken } from '@/lib/notion/imageTokens';
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';
import { logError, logSecurityEvent } from '@/lib/observability/logger';

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

function json(body, init = {}) {
  const headers = {
    ...jsonSecurityHeaders(),
    ...(init.headers || {}),
  };
  return Response.json(body, { ...init, headers });
}

export async function GET(request) {
  if (!isAllowedRequestOrigin(request)) {
    logSecurityEvent('notion_image_forbidden_origin', { route: '/api/notion-image' });
    return json({ error: 'Forbidden' }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }

  const rateLimitResult = await rateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    logSecurityEvent('notion_image_missing_token', { route: '/api/notion-image' });
    return json({ error: 'Bad request' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const blockId = verifyNotionImageRefreshToken(token);
  if (!blockId) {
    logSecurityEvent('notion_image_invalid_token', { route: '/api/notion-image' });
    return json({ error: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!process.env.NOTION_API_KEY) {
    logError('notion_image_not_configured', { route: '/api/notion-image' });
    return json({ error: 'Internal server error' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const block = await notion.blocks.retrieve({ block_id: normalizeNotionId(blockId) });

    if (block.type !== 'image') {
      return json({ error: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    const img = block.image;
    const url =
      img.type === 'external'
        ? img.external?.url
        : img.type === 'file'
          ? img.file?.url
          : null;

    if (!url) {
      return json({ error: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    return json(
      { url },
      {
        headers: {
          ...jsonSecurityHeaders(),
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (err) {
    const status = Number(err?.status);
    const responseStatus = status >= 400 && status < 500 ? 404 : 503;
    logError('notion_image_fetch_failed', {
      route: '/api/notion-image',
      status: Number.isFinite(status) ? status : undefined,
      cause: err?.message,
    });
    return json(
      { error: responseStatus === 404 ? 'Not found' : 'Service unavailable' },
      { status: responseStatus, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
