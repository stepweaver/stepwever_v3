import { listPublishedDocs } from '@/lib/notion/meshtastic-docs.repo';

export default async function sitemap() {
  const baseUrl = 'https://stepweaver.dev';

  const staticEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/codex`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terminal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  let meshtasticEntries = [];
  if (process.env.NOTION_MESHTASTIC_DOCS_DB_ID) {
    try {
      const docs = await listPublishedDocs();
      meshtasticEntries = [
        {
          url: `${baseUrl}/meshtastic`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        },
        ...docs.map((d) => ({
          url: `${baseUrl}/meshtastic/${d.slug}`,
          lastModified: d.lastEditedTime ? new Date(d.lastEditedTime) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })),
      ];
    } catch {
      // no-op: sitemap still returns static entries
    }
  }

  return [...staticEntries, ...meshtasticEntries];
}
