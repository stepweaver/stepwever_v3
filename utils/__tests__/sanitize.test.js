import { sanitizeHTML, sanitizeText, sanitizeFormData } from '../sanitize';

describe('sanitizeHTML', () => {
  test('should sanitize HTML content and remove dangerous tags', () => {
    const maliciousHTML = '<p>Hello</p><script>alert("xss")</script><div>World</div>';
    const result = sanitizeHTML(maliciousHTML);

    expect(result).toContain('<p>Hello</p>');
    expect(result).toContain('<div>World</div>');
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert("xss")');
  });

  test('should allow safe HTML tags', () => {
    const safeHTML = '<p>Hello <strong>world</strong></p><h1>Title</h1>';
    const result = sanitizeHTML(safeHTML);

    expect(result).toContain('<p>Hello <strong>world</strong></p>');
    expect(result).toContain('<h1>Title</h1>');
  });

  test('should remove dangerous attributes', () => {
    const dangerousHTML = '<p onclick="alert(\'xss\')" class="safe">Hello</p>';
    const result = sanitizeHTML(dangerousHTML);

    expect(result).toContain('<p class="safe">Hello</p>');
    expect(result).not.toContain('onclick');
  });

  test('should handle empty or null input', () => {
    expect(sanitizeHTML('')).toBe('');
    expect(sanitizeHTML(null)).toBe('');
    expect(sanitizeHTML(undefined)).toBe('');
  });
});

describe('sanitizeText', () => {
  test('should remove HTML tags and encode special characters', () => {
    const textWithHTML = '<p>Hello & <script>alert("xss")</script> world</p>';
    const result = sanitizeText(textWithHTML);

    expect(result).toBe('Hello &amp; alert(&quot;xss&quot;) world');
    expect(result).not.toContain('<p>');
    expect(result).not.toContain('<script>');
  });

  test('should encode special characters', () => {
    const text = 'Hello <world> & "quotes" \'apostrophes\'';
    const result = sanitizeText(text);

    expect(result).toBe('Hello &amp; &quot;quotes&quot; &#x27;apostrophes&#x27;');
  });

  test('should handle empty or null input', () => {
    expect(sanitizeText('')).toBe('');
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
  });

  test('should trim whitespace', () => {
    const text = '  Hello world  ';
    const result = sanitizeText(text);

    expect(result).toBe('Hello world');
  });
});

describe('sanitizeFormData', () => {
  test('should sanitize string values in form data', () => {
    const formData = {
      name: 'John <script>alert("xss")</script>',
      email: 'john@example.com',
      message: '<p>Hello & world</p>'
    };

    const result = sanitizeFormData(formData);

    expect(result.name).toBe('John alert(&quot;xss&quot;)');
    expect(result.email).toBe('john@example.com');
    expect(result.message).toBe('Hello &amp; world');
  });

  test('should handle nested objects', () => {
    const formData = {
      user: {
        name: '<script>alert("xss")</script>John',
        email: 'john@example.com'
      },
      message: 'Hello world'
    };

    const result = sanitizeFormData(formData);

    expect(result.user.name).toBe('alert(&quot;xss&quot;)John');
    expect(result.user.email).toBe('john@example.com');
    expect(result.message).toBe('Hello world');
  });

  test('should preserve non-string values', () => {
    const formData = {
      name: 'John',
      age: 30,
      active: true,
      tags: ['tag1', 'tag2']
    };

    const result = sanitizeFormData(formData);

    expect(result.name).toBe('John');
    expect(result.age).toBe(30);
    expect(result.active).toBe(true);
    expect(result.tags).toEqual(['tag1', 'tag2']);
  });

  test('should handle empty or null input', () => {
    expect(sanitizeFormData({})).toEqual({});
    expect(sanitizeFormData(null)).toEqual({});
    expect(sanitizeFormData(undefined)).toEqual({});
  });
}); 