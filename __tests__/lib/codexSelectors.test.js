import {
  sortPosts,
  normalizeTag,
  extractUniqueTags,
  filterPostsByTags,
  formatCodexDate,
} from '@/lib/codex/selectors';

describe('codex selectors', () => {
  it('sortPosts orders by date desc', () => {
    const posts = [
      { title: 'a', date: '2020-01-01', hashtags: [] },
      { title: 'b', date: '2024-06-01', hashtags: [] },
    ];
    const s = sortPosts(posts);
    expect(s[0].title).toBe('b');
  });

  it('normalizeTag lowercases and strips hash', () => {
    expect(normalizeTag('#Foo')).toBe('foo');
  });

  it('extractUniqueTags dedupes', () => {
    const posts = [{ hashtags: ['foo'] }, { hashtags: ['bar', 'foo'] }];
    expect(extractUniqueTags(posts)).toEqual(['bar', 'foo']);
  });

  it('filterPostsByTags', () => {
    const posts = [{ hashtags: ['nextjs'] }, { hashtags: ['rust'] }];
    expect(filterPostsByTags(posts, ['NextJS']).length).toBe(1);
  });

  it('formatCodexDate brackets YYYY-MM-DD', () => {
    expect(formatCodexDate('2024-03-01')).toBe('[2024-03-01]');
  });
});
