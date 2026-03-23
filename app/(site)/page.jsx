import Link from 'next/link';
import { headers } from 'next/headers';
import generateStructuredData from '../structured-data';
import HomePageContent from '../HomePageContent';

export default async function HomePage() {
  const structuredData = generateStructuredData();
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      {/* JSON-LD structured data for SEO - server-rendered, nonce-protected */}
      <script
        nonce={nonce}
        suppressHydrationWarning
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
      />
      <script
        nonce={nonce}
        suppressHydrationWarning
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }}
      />

      <HomePageContent />

      {/* Recent Intel - server-rendered, no client JS needed */}
      <section className='relative z-30 py-8'>
        <div className='w-full px-2 sm:px-4 md:px-3 lg:px-4 max-w-none text-center'>
          <p className='text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2'>RECENT INTEL</p>
          <Link
            href='/codex'
            className='text-neon hover:text-accent transition-colors font-ibm text-lg underline'
          >
            View Codex →
          </Link>
        </div>
      </section>
    </>
  );
}
