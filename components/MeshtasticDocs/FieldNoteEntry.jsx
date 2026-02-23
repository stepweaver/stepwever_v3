'use client';

import NotionBlockBody from '@/components/NotionBlockBody';

function getBlockText(block) {
  if (!block?.type) return '';
  const rt =
    block.paragraph?.rich_text ??
    block.heading_1?.rich_text ??
    block.heading_2?.rich_text ??
    block.heading_3?.rich_text ??
    block.quote?.rich_text ??
    block.callout?.rich_text ??
    block.bulleted_list_item?.rich_text ??
    block.numbered_list_item?.rich_text ??
    block.code?.rich_text ??
    [];
  return rt.map((t) => t.plain_text).join('').trim();
}

/** Filter out empty paragraphs so we don't render blank lines. */
function filterBlankBlocks(blocks) {
  if (!blocks?.length) return blocks;
  return blocks.filter((block) => {
    if (block.type === 'paragraph' || block.type === 'quote' || block.type === 'callout') {
      return getBlockText(block).length > 0;
    }
    return true;
  });
}

export default function FieldNoteEntry({ note, blocks, isExpanded = true }) {
  const filtered = filterBlankBlocks(blocks);

  return (
    <div id={`note-${note.id}`} className="field-note-log-entry">
      {filtered && filtered.length > 0 ? (
        <div className="field-note-prose text-sm font-mono text-text/95 leading-snug">
          <NotionBlockBody blocks={filtered} />
        </div>
      ) : (
        <p className="text-text/70 font-mono text-sm italic">No log entry for this date.</p>
      )}
    </div>
  );
}
