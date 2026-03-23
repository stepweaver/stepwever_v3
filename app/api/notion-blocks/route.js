import { Client } from '@notionhq/client';
import { createRateLimit } from '@/utils/rateLimit';
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';
import { logSecurityEvent } from '@/lib/observability/logger';

function isValidNotionId(id) {
  if (!id || typeof id !== 'string') return false;
  const cleanId = id.replace(/-/g, '');
  return /^[0-9a-f]{32}$/i.test(cleanId);
}

function normalizeNotionId(id) {
  if (!id) return null;
  const clean = id.replace(/-/g, '');
  if (clean.length !== 32) return null;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

function normalizeIdKey(id) {
  return id.replace(/-/g, '').toLowerCase();
}

function getAllowedPageIdSet() {
  const raw = (process.env.NOTION_BLOCKS_ALLOWED_PAGE_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set(raw.map(normalizeIdKey));
}

const rateLimit = createRateLimit({
  keyPrefix: 'notion-blocks',
  maxRequests: 30,
  windowMs: 60 * 1000,
  message: 'Too many requests. Please try again shortly.',
  requireDistributedStoreInProduction: true,
});

export async function POST(request) {
  try {
    if (!isAllowedRequestOrigin(request)) {
      return Response.json(
        { error: 'Forbidden' },
        { status: 403, headers: jsonSecurityHeaders() }
      );
    }

    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const allowed = getAllowedPageIdSet();
    if (allowed.size === 0) {
      logSecurityEvent('notion_blocks_disabled', { reason: 'empty_allowlist' });
      return Response.json(
        { error: 'Not available' },
        { status: 403, headers: jsonSecurityHeaders() }
      );
    }

    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return Response.json(
        { error: 'Invalid content type' },
        { status: 400, headers: jsonSecurityHeaders() }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: 'Invalid JSON' },
        { status: 400, headers: jsonSecurityHeaders() }
      );
    }

    const { pageId } = body;

    if (!pageId || !process.env.NOTION_API_KEY) {
      return Response.json(
        { error: 'Missing page ID or API key' },
        { status: 400, headers: jsonSecurityHeaders() }
      );
    }

    if (!isValidNotionId(pageId)) {
      return Response.json(
        { error: 'Invalid page ID format' },
        { status: 400, headers: jsonSecurityHeaders() }
      );
    }

    const normalizedId = normalizeNotionId(pageId);
    if (!allowed.has(normalizeIdKey(normalizedId))) {
      logSecurityEvent('notion_blocks_rejected_page', {});
      return Response.json(
        { error: 'Not found' },
        { status: 404, headers: jsonSecurityHeaders() }
      );
    }

    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const response = await notion.blocks.children.list({
      block_id: normalizedId,
      page_size: 100,
    });

    return Response.json(response.results, {
      headers: {
        ...jsonSecurityHeaders(),
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (error.name === 'APIResponseError' || error.code === 'object_not_found') {
      return Response.json(
        { error: 'Notion page not found' },
        { status: 404, headers: jsonSecurityHeaders() }
      );
    }

    if (error.name === 'ClientError' || error.status === 401) {
      return Response.json(
        { error: 'Authentication failed' },
        { status: 401, headers: jsonSecurityHeaders() }
      );
    }

    return Response.json(
      {
        error: isDevelopment ? error.message : 'Failed to fetch blocks',
      },
      {
        status: error.status || 500,
        headers: jsonSecurityHeaders(),
      }
    );
  }
}
