'use client';

import FieldNoteLogBody from './FieldNoteLogBody';

export default function FieldNoteEntry({ note, blocks, isExpanded = true }) {
  return (
    <div id={`note-${note.id}`} className="field-note-log-entry">
      {blocks && blocks.length > 0 ? (
        <FieldNoteLogBody blocks={blocks} noteTitle={note.title} />
      ) : (
        <div className="font-mono text-sm text-text/70">
          <span className="text-neon/70">[—]</span> No content yet.
        </div>
      )}
    </div>
  );
}
