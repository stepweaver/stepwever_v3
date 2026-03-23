/**
 * @jest-environment node
 */
import { GET } from '@/app/api/notion-image/route';
import { mintNotionImageRefreshToken } from '@/lib/notion/imageTokens';

const retrieveMock = jest.fn();

jest.mock('@notionhq/client', () => ({
  Client: jest.fn().mockImplementation(() => ({
    blocks: {
      retrieve: retrieveMock,
    },
  })),
}));

describe('/api/notion-image route', () => {
  const env = { ...process.env };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...env,
      NODE_ENV: 'development',
      NOTION_IMAGE_TOKEN_SECRET: 'test-secret',
    };
  });

  afterAll(() => {
    process.env = env;
  });

  function req(url, origin = 'https://stepweaver.dev') {
    return new Request(url, {
      method: 'GET',
      headers: {
        origin,
        host: 'stepweaver.dev',
      },
    });
  }

  it('rejects disallowed origins', async () => {
    process.env.ALLOWED_ORIGINS = 'https://example.com';
    const res = await GET(req('https://stepweaver.dev/api/notion-image?token=x', 'https://evil.com'));
    expect(res.status).toBe(403);
  });

  it('requires token', async () => {
    const res = await GET(req('https://stepweaver.dev/api/notion-image'));
    expect(res.status).toBe(400);
  });

  it('rejects invalid token', async () => {
    const res = await GET(req('https://stepweaver.dev/api/notion-image?token=invalid'));
    expect(res.status).toBe(404);
  });

  it('returns 500 if Notion API key missing', async () => {
    const token = mintNotionImageRefreshToken('3f2504e0-4f89-41d3-9a0c-0305e82c3301');
    delete process.env.NOTION_API_KEY;
    const res = await GET(req(`https://stepweaver.dev/api/notion-image?token=${token}`));
    expect(res.status).toBe(500);
  });

  it('returns image URL for valid token and image block', async () => {
    process.env.NOTION_API_KEY = 'secret';
    retrieveMock.mockResolvedValueOnce({
      type: 'image',
      image: { type: 'external', external: { url: 'https://cdn.example.com/image.jpg' } },
    });
    const token = mintNotionImageRefreshToken('3f2504e0-4f89-41d3-9a0c-0305e82c3301');
    const res = await GET(req(`https://stepweaver.dev/api/notion-image?token=${token}`));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.url).toContain('https://cdn.example.com/image.jpg');
  });
});
