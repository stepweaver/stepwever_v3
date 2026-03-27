export default function robots() {
  return {
    rules: [
      // Opt out of known training/grounding crawlers (guidance only; not access control)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },

      // Allow search / user-directed retrieval crawlers
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },

      // Default allow for normal indexing/discovery
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://stepweaver.dev/sitemap.xml',
  };
}

