'use client';

import NotionBlockBody from '@/components/NotionBlockBody';

export default function FieldNoteEntry({ note, blocks, isExpanded = true }) {
  return (
    <div id={`note-${note.id}`}>
      {blocks && blocks.length > 0 ? (
        <div className="prose prose-invert max-w-none">
          <NotionBlockBody blocks={blocks} />
        </div>
      ) : (
        <p className="text-text/70 font-ocr">No content yet.</p>
      )}
    </div>
  );
}
