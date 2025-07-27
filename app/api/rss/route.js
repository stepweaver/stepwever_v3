import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');

  if (!source) {
    return NextResponse.json(
      { error: 'Source parameter is required' },
      { status: 400 }
    );
  }

  try {
    let feedUrl;

    // Define RSS feed URLs
    switch (source) {
      case 'syntaxfm':
        feedUrl = 'https://feed.syntax.fm/rss';
        break;
      case 'itjungle':
        feedUrl = 'https://www.itjungle.com/feed/';
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown source' },
          { status: 400 }
        );
    }

    // Fetch the RSS feed
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse the XML (simple parsing for now)
    const items = parseRSSFeed(xmlText);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}

function parseRSSFeed(xmlText) {
  const items = [];

  try {
    // Simple regex-based parsing for RSS items
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];

      const title = extractTag(itemXml, 'title');
      const link = extractTag(itemXml, 'link');
      const description = extractTag(itemXml, 'description');
      const pubDate = extractTag(itemXml, 'pubDate');
      const guid = extractTag(itemXml, 'guid');
      const duration = extractTag(itemXml, 'itunes:duration') || extractTag(itemXml, 'duration');

      if (title && link) {
        items.push({
          title: decodeXMLEntities(title),
          link: decodeXMLEntities(link),
          description: description ? decodeXMLEntities(description) : '',
          pubDate: pubDate ? decodeXMLEntities(pubDate) : '',
          guid: guid ? decodeXMLEntities(guid) : '',
          duration: duration ? decodeXMLEntities(duration) : '',
        });
      }
    }
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
  }

  return items.slice(0, 20); // Limit to 20 items
}

function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function decodeXMLEntities(text) {
  if (!text) return '';

  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=');
} 