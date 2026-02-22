'use client';

import { useState } from 'react';
import FieldNoteEntry from './FieldNoteEntry';
import FieldNotesSelector from './FieldNotesSelector';
import { HUDPanel } from '@/components/ui/HUDPanel';

export default function FieldNotesDisplay({ notesWithBlocks }) {
  // Most recent note (index 0) is selected by default
  const [selectedNoteId, setSelectedNoteId] = useState(
    notesWithBlocks.length > 0 ? notesWithBlocks[0].id : null
  );

  const selectedNote = notesWithBlocks.find(n => n.id === selectedNoteId) || notesWithBlocks[0];

  const handleNoteChange = (noteId) => {
    setSelectedNoteId(noteId);
  };

  if (!selectedNote) return null;

  const logId = selectedNote.title.replace(/[\[\]]/g, '').replace(/-/g, '').substring(0, 8).toUpperCase() || 'NOTE';

  return (
    <HUDPanel title="Field Notes" id={`LOG-${logId}`} className="p-6 md:p-8 lg:p-10">
      {/* Log toolbar: tail prompt + date selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-sm">
        <span className="text-neon/90">
          &gt; tail -f field_notes.{logId.toLowerCase()}.log
        </span>
        {notesWithBlocks.length > 1 && (
          <FieldNotesSelector
            notes={notesWithBlocks}
            selectedNoteId={selectedNoteId}
            onNoteChange={handleNoteChange}
          />
        )}
      </div>

      {/* Log output: generous padding and line spacing */}
      <div className="min-h-[14rem] overflow-x-auto font-mono text-sm md:text-base leading-relaxed">
        <FieldNoteEntry
          note={selectedNote}
          blocks={selectedNote.filteredBlocks || selectedNote.blocks}
          isExpanded={true}
        />
      </div>
    </HUDPanel>
  );
}
