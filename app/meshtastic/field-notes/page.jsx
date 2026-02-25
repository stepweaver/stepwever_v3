import { cache } from 'react';
import dynamic from 'next/dynamic';
import { listFieldNotes } from '@/lib/notion/meshtastic-docs.repo';
import { getPageBlocks } from '@/lib/notion-blocks';
import { listPublishedDocs } from '@/lib/notion/meshtastic-docs.repo';
import { groupDocsBySection } from '@/lib/notion/meshtastic-docs.repo';
import MeshtasticDocsLayout from '@/components/MeshtasticDocs/MeshtasticDocsLayout';
import MeshtasticDocsMobileNav from '@/components/MeshtasticDocs/MeshtasticDocsMobileNav';
import FieldNotesDisplay from '@/components/MeshtasticDocs/FieldNotesDisplay';

const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);

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
      images: [{ url: absoluteImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

/**
 * Extract text from a Notion block
 */
function getBlockText(block) {
  if (!block) return '';
  
  if (block.type === 'paragraph' && block.paragraph?.rich_text) {
    return block.paragraph.rich_text.map(t => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_1' && block.heading_1?.rich_text) {
    return block.heading_1.rich_text.map(t => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_2' && block.heading_2?.rich_text) {
    return block.heading_2.rich_text.map(t => t.plain_text).join('').trim();
  }
  if (block.type === 'heading_3' && block.heading_3?.rich_text) {
    return block.heading_3.rich_text.map(t => t.plain_text).join('').trim();
  }
  return '';
}

/**
 * Filter out blocks that match the title/date pattern
 */
function filterTitleBlocks(blocks, title) {
  if (!blocks?.length || !title) return blocks;
  
  const normalizedTitle = title.trim();
  const titleWithoutBrackets = normalizedTitle.replace(/[\[\]]/g, '').trim();
  
  return blocks.filter(block => {
    const text = getBlockText(block);
    const normalizedText = text.trim();
    
    if (normalizedText === normalizedTitle) return false;
    if (normalizedText === `[${titleWithoutBrackets}]` || normalizedText === titleWithoutBrackets) return false;
    if (normalizedText.startsWith(normalizedTitle + ' ') || 
        normalizedText.startsWith(normalizedTitle + '\n') ||
        normalizedText.startsWith(`[${titleWithoutBrackets}] `)) {
      return false;
    }
    
    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
      if (normalizedText === normalizedTitle || 
          normalizedText === `[${titleWithoutBrackets}]` || 
          normalizedText === titleWithoutBrackets) {
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
  
  // Sort field notes by date descending (most recent first)
  const sortedNotes = [...(fieldNotes || [])].sort((a, b) => {
    const dateA = a.title.replace(/[\[\]]/g, '');
    const dateB = b.title.replace(/[\[\]]/g, '');
    return dateB.localeCompare(dateA);
  });

  if (!fieldNotes || sortedNotes.length === 0) {
    return (
      <div className="min-h-screen relative">
        <BackgroundCanvas />
        <div className="relative z-10">
          <MeshtasticDocsLayout
            grouped={grouped}
            currentSlug="field-notes"
            currentSection={null}
            hasFieldNotes={hasFieldNotes}
          >
            <div className="flex flex-col xl:flex-row xl:gap-12 w-full px-4 sm:px-6 lg:px-8 pb-16">
              <div className="flex-1 min-w-0">
                <article className="border-0 rounded-md bg-panel/40 overflow-hidden lg:border lg:border-neon/20">
                  <header className="border-b border-neon/10 lg:border-neon/20 px-5 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-text font-ibm">
                      Field Notes
                    </h1>
                    <p className="mt-2 text-text/80 font-ocr text-sm leading-relaxed">
                      No field notes yet.
                    </p>
                  </header>
                </article>
              </div>
            </div>
          </MeshtasticDocsLayout>
        </div>
      </div>
    );
  }

  // Fetch blocks for all field notes
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
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10">
        <MeshtasticDocsLayout
          grouped={grouped}
          currentSlug="field-notes"
          currentSection={null}
          hasFieldNotes={hasFieldNotes}
        >
          <div className="flex flex-col xl:flex-row xl:gap-12 w-full px-4 sm:px-6 lg:px-8 pb-16">
            {/* Mobile: Docs menu */}
            <div className="xl:hidden space-y-3 mb-6 mt-4">
              <MeshtasticDocsMobileNav
                grouped={grouped}
                currentSlug="field-notes"
                currentSection={null}
                hasFieldNotes={hasFieldNotes}
              />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <FieldNotesDisplay 
                notesWithBlocks={notesWithBlocks.map(note => ({
                  ...note,
                  filteredBlocks: filterTitleBlocks(note.blocks || [], note.title),
                }))}
              />
            </div>
          </div>
        </MeshtasticDocsLayout>
      </div>
    </div>
  );
}

