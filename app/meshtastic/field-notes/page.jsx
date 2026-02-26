import { cache } from 'react';
import { listFieldNotes } from '@/lib/notion/meshtastic-docs.repo';
import { getPageBlocks } from '@/lib/notion-blocks';
import { listPublishedDocs } from '@/lib/notion/meshtastic-docs.repo';
import { groupDocsBySection } from '@/lib/notion/meshtastic-docs.repo';
import MeshtasticDocsLayout from '@/components/MeshtasticDocs/MeshtasticDocsLayout';
import MeshtasticDocsMobileNav from '@/components/MeshtasticDocs/MeshtasticDocsMobileNav';
import FieldNotesDisplay from '@/components/MeshtasticDocs/FieldNotesDisplay';
import {
  AffiliateDisclosure,
  AffiliateGearSection,
} from '@/components/MeshtasticDocs/Affiliate';
import {
  getConfiguredAffiliateLinks,
  getPrimaryAffiliateUrl,
} from '@/components/MeshtasticDocs/Affiliate/affiliateConfig';

const getCachedFieldNotes = cache(async () => {
  return await listFieldNotes();
});

export const revalidate = 60;

export async function generateMetadata() {
  let notes = [];
  try {
    notes = await getCachedFieldNotes();
  } catch {
    /* fall through to defaults */
  }

  const noteCount = notes.length;
  const title = 'Field Notes | Meshtastic';
  const description =
    noteCount > 0
      ? `${noteCount} field note${noteCount === 1 ? '' : 's'} from real-world Meshtastic mesh networking tests — signal reports, range logs, and hardware observations.`
      : 'Live notes and experiences from Meshtastic exploration and testing.';
  const absoluteImageUrl = 'https://stepweaver.dev/images/lambda_preview.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: 'https://stepweaver.dev/meshtastic/field-notes',
      images: [
        { url: absoluteImageUrl, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

function getBlockText(block) {
  if (!block) return '';

  if (block.type === 'paragraph' && block.paragraph?.rich_text) {
    return block.paragraph.rich_text.map((t) => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_1' && block.heading_1?.rich_text) {
    return block.heading_1.rich_text.map((t) => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_2' && block.heading_2?.rich_text) {
    return block.heading_2.rich_text.map((t) => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_3' && block.heading_3?.rich_text) {
    return block.heading_3.rich_text.map((t) => t.plain_text).join('').trim();
  }
  return '';
}

function filterTitleBlocks(blocks, title) {
  if (!blocks?.length || !title) return blocks;

  const normalizedTitle = title.trim();
  const titleWithoutBrackets = normalizedTitle.replace(/[\[\]]/g, '').trim();

  return blocks.filter((block) => {
    const text = getBlockText(block);
    const normalizedText = text.trim();

    if (normalizedText === normalizedTitle) return false;
    if (
      normalizedText === `[${titleWithoutBrackets}]` ||
      normalizedText === titleWithoutBrackets
    )
      return false;
    if (
      normalizedText.startsWith(normalizedTitle + ' ') ||
      normalizedText.startsWith(normalizedTitle + '\n') ||
      normalizedText.startsWith(`[${titleWithoutBrackets}] `)
    ) {
      return false;
    }

    if (
      block.type === 'heading_1' ||
      block.type === 'heading_2' ||
      block.type === 'heading_3'
    ) {
      if (
        normalizedText === normalizedTitle ||
        normalizedText === `[${titleWithoutBrackets}]` ||
        normalizedText === titleWithoutBrackets
      ) {
        return false;
      }
    }

    return true;
  });
}

export default async function FieldNotesPage() {
  const [fieldNotes, docs] = await Promise.all([
    getCachedFieldNotes(),
    listPublishedDocs(),
  ]);

  const grouped = groupDocsBySection(docs);
  const hasFieldNotes = fieldNotes && fieldNotes.length > 0;

  const affiliateLinks = getConfiguredAffiliateLinks();
  const primaryAffiliateUrl = getPrimaryAffiliateUrl(
    process.env.NEXT_PUBLIC_ATLAVOX_AFFILIATE_URL
  );
  const affiliateGearLinks =
    affiliateLinks.length > 0
      ? affiliateLinks
      : primaryAffiliateUrl
        ? [{ url: primaryAffiliateUrl, label: 'Atlavox Radios & Accessories' }]
        : [];
  const hasAffiliate = affiliateGearLinks.length > 0;

  const sortedNotes = [...(fieldNotes || [])].sort((a, b) => {
    const dateA = a.title.replace(/[\[\]]/g, '');
    const dateB = b.title.replace(/[\[\]]/g, '');
    return dateB.localeCompare(dateA);
  });

  if (!fieldNotes || sortedNotes.length === 0) {
    return (
      <MeshtasticDocsLayout
        grouped={grouped}
        currentSlug='field-notes'
        currentSection={null}
        hasFieldNotes={hasFieldNotes}
      >
        <div className='flex flex-col xl:flex-row xl:gap-8 w-full px-4 sm:px-6 lg:px-8 pb-16'>
          <div className='flex-1 min-w-0'>
            <article className='rounded-sm overflow-hidden border border-neon/15 bg-panel/20'>
              <div className='bg-panel/50 border-b border-neon/20 px-5 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between'>
                <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
                  Field notes
                </span>
                <span className='font-ocr text-[10px] text-text/20'>
                  LOG-EMPTY
                </span>
              </div>
              <header className='px-5 sm:px-6 lg:px-8 py-6'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-text font-ibm'>
                  Field Notes
                </h1>
                <p className='mt-2 text-text/60 font-ocr text-sm'>
                  No field notes yet.
                </p>
              </header>
            </article>
          </div>
          <div className='mt-6 max-w-3xl'>
            <AffiliateDisclosure show={hasAffiliate} />
            <AffiliateGearSection links={affiliateGearLinks} />
          </div>
        </div>
      </MeshtasticDocsLayout>
    );
  }

  const notesWithBlocks = await Promise.all(
    sortedNotes.map(async (note) => {
      const blocks = await getPageBlocks(note.id, 10);
      return {
        ...note,
        blocks,
      };
    })
  );

  return (
    <MeshtasticDocsLayout
      grouped={grouped}
      currentSlug='field-notes'
      currentSection={null}
      hasFieldNotes={hasFieldNotes}
    >
      <div className='flex flex-col xl:flex-row xl:gap-8 w-full px-4 sm:px-6 lg:px-8 pb-16'>
        {/* Mobile nav */}
        <div className='xl:hidden space-y-3 mb-6 mt-4'>
          <MeshtasticDocsMobileNav
            grouped={grouped}
            currentSlug='field-notes'
            currentSection={null}
            hasFieldNotes={hasFieldNotes}
          />
        </div>

        {/* Main content */}
        <div className='flex-1 min-w-0'>
          <FieldNotesDisplay
            notesWithBlocks={notesWithBlocks.map((note) => ({
              ...note,
              filteredBlocks: filterTitleBlocks(
                note.blocks || [],
                note.title
              ),
            }))}
          />
          <div className='mt-6 max-w-3xl'>
            <AffiliateDisclosure show={hasAffiliate} />
            <AffiliateGearSection links={affiliateGearLinks} />
          </div>
        </div>
      </div>
    </MeshtasticDocsLayout>
  );
}
