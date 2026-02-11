import { Client } from '@notionhq/client';

// Validate and sanitize Notion page ID format
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

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return Response.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return Response.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const { pageId } = body;

    if (!pageId || !process.env.NOTION_API_KEY) {
      return Response.json({ error: 'Missing page ID or API key' }, { status: 400 });
    }

    if (!isValidNotionId(pageId)) {
      return Response.json({ error: 'Invalid page ID format' }, { status: 400 });
    }

    const normalizedId = normalizeNotionId(pageId);

    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const response = await notion.blocks.children.list({
      block_id: normalizedId,
      page_size: 100,
    });

    return Response.json(
      response.results,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    );
  } catch (error) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (error.name === 'APIResponseError' || error.code === 'object_not_found') {
      return Response.json(
        { error: 'Notion page not found' },
        { status: 404 }
      );
    }

    if (error.name === 'ClientError' || error.status === 401) {
      return Response.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    return Response.json(
      {
        error: isDevelopment ? error.message : 'Failed to fetch blocks'
      },
      {
        status: error.status || 500
      }
    );
  }
}
