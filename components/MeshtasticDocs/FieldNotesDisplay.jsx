'use client';

import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import FieldNoteEntry from './FieldNoteEntry';
import FieldNotesSelector from './FieldNotesSelector';

export default function FieldNotesDisplay({ notesWithBlocks }) {
  const [selectedNoteId, setSelectedNoteId] = useState(
    notesWithBlocks.length > 0 ? notesWithBlocks[0].id : null
  );

  const selectedNote =
    notesWithBlocks.find((n) => n.id === selectedNoteId) || notesWithBlocks[0];

  if (!selectedNote) return null;

  const logId =
    selectedNote.title
      .replace(/[\[\]]/g, '')
      .replace(/-/g, '')
      .substring(0, 8)
      .toUpperCase() || 'NOTE';

  return (
    <article className='rounded-sm overflow-hidden border border-neon/15 bg-panel/20'>
      {/* Chrome header */}
      <div className='bg-panel/50 border-b border-neon/20 px-5 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <ClipboardList className='w-3 h-3 text-neon/40' />
          <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
            Field notes
          </span>
        </div>
        <span className='font-ocr text-[10px] text-text/20'>
          LOG-{logId}
        </span>
      </div>

      <div className='px-5 sm:px-6 lg:px-8 py-5'>
        {notesWithBlocks.length > 1 && (
          <div className='mb-4'>
            <FieldNotesSelector
              notes={notesWithBlocks}
              selectedNoteId={selectedNoteId}
              onNoteChange={setSelectedNoteId}
            />
          </div>
        )}

        <div className='min-h-[14rem] overflow-x-auto log-entry-content'>
          <FieldNoteEntry
            note={selectedNote}
            blocks={selectedNote.filteredBlocks || selectedNote.blocks}
            isExpanded={true}
          />
        </div>
      </div>
    </article>
  );
}
