/**
 * @jest-environment node
 */
import {
  mintNotionImageRefreshToken,
  verifyNotionImageRefreshToken,
} from '@/lib/notion/imageTokens';

describe('notion image tokens', () => {
  const prev = process.env.NOTION_IMAGE_TOKEN_SECRET;

  afterEach(() => {
    process.env.NOTION_IMAGE_TOKEN_SECRET = prev;
  });

  it('mints and verifies a token for a valid block id', () => {
    process.env.NOTION_IMAGE_TOKEN_SECRET = 'test-secret-key-for-hmac-only';
    const id = 'a1b2c3d4e5f6789012345678abcdef12';
    const token = mintNotionImageRefreshToken(id);
    expect(token).toBeTruthy();
    const normalized = verifyNotionImageRefreshToken(token);
    expect(normalized).toBe(
      'a1b2c3d4-e5f6-7890-1234-5678abcdef12'
    );
  });

  it('rejects tampered token', () => {
    process.env.NOTION_IMAGE_TOKEN_SECRET = 'test-secret-key-for-hmac-only';
    const id = 'a1b2c3d4e5f6789012345678abcdef12';
    const token = mintNotionImageRefreshToken(id);
    expect(verifyNotionImageRefreshToken(`${token}x`)).toBeNull();
  });
});
