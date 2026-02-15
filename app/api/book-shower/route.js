import { NextResponse } from 'next/server';
import { createRateLimit } from '@/utils/rateLimit';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjvVhJ9UzjPHErwZ7tju4rSzBj7zeegW6HAnBdGNAafiUuWPFKDUysD3jnUFBtMZdQ3A/exec';

export async function GET(request) {
  try {
    // Rate limit: 30 requests per minute
    const rateLimit = createRateLimit({
      maxRequests: 30,
      windowMs: 60 * 1000,
      message: 'Too many requests. Please try again shortly.'
    });
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const { searchParams } = new URL(request.url);
    
    // Build query string from search params if any
    const queryString = searchParams.toString();
    const url = queryString 
      ? `${GOOGLE_SCRIPT_URL}?${queryString}`
      : GOOGLE_SCRIPT_URL;

    // Fetch data from Google Apps Script
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookShower/1.0)',
      },
      // Google Apps Script web apps may require no-cors mode
      // but we'll try with cors first
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Script: ${response.status}`);
    }

    // Try to parse as JSON, fallback to text if needed
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching book shower data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book shower data', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Rate limit: 10 POST requests per minute
    const rateLimit = createRateLimit({
      maxRequests: 10,
      windowMs: 60 * 1000,
      message: 'Too many requests. Please try again shortly.'
    });
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    const body = await request.json().catch(() => ({}));
    
    // Fetch data from Google Apps Script with POST
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

    // Try to parse as JSON, fallback to text if needed
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching book shower data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book shower data', details: error.message },
      { status: 500 }
    );
  }
}

