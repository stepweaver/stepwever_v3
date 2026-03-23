import { NextResponse } from 'next/server';
import { createRateLimit } from '@/utils/rateLimit';
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyjvVhJ9UzjPHErwZ7tju4rSzBj7zeegW6HAnBdGNAafiUuWPFKDUysD3jnUFBtMZdQ3A/exec';

const getRateLimit = createRateLimit({
  keyPrefix: 'book-shower-get',
  maxRequests: 30,
  windowMs: 60 * 1000,
  message: 'Too many requests. Please try again shortly.',
  requireDistributedStoreInProduction: true,
});

const postRateLimit = createRateLimit({
  keyPrefix: 'book-shower-post',
  maxRequests: 10,
  windowMs: 60 * 1000,
  message: 'Too many requests. Please try again shortly.',
  requireDistributedStoreInProduction: true,
});

function json(body, status = 200) {
  return NextResponse.json(body, { status, headers: jsonSecurityHeaders() });
}

export async function GET(request) {
  try {
    if (!isAllowedRequestOrigin(request)) {
      return json({ error: 'Forbidden' }, 403);
    }

    const rateLimitResult = await getRateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = queryString ? `${GOOGLE_SCRIPT_URL}?${queryString}` : GOOGLE_SCRIPT_URL;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookShower/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Script: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    }

    return NextResponse.json(data, { headers: jsonSecurityHeaders() });
  } catch (error) {
    console.error('Error fetching book shower data:', error);
    return json({ error: 'Failed to fetch book shower data' }, 500);
  }
}

export async function POST(request) {
  try {
    if (!isAllowedRequestOrigin(request)) {
      return json({ error: 'Forbidden' }, 403);
    }

    const rateLimitResult = await postRateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const body = await request.json().catch(() => ({}));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; BookShower/1.0)',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Script: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    }

    return NextResponse.json(data, { headers: jsonSecurityHeaders() });
  } catch (error) {
    console.error('Error fetching book shower data:', error);
    return json({ error: 'Failed to fetch book shower data' }, 500);
  }
}
