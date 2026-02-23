'use client';

import { useState } from 'react';
import FieldNoteEntry from './FieldNoteEntry';
import FieldNotesSelector from './FieldNotesSelector';
import { HUDPanel } from '@/components/ui/HUDPanel';

export default function FieldNotesDisplay({ notesWithBlocks }) {
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
      {notesWithBlocks.length > 1 && (
        <div className="mb-4">
          <FieldNotesSelector
            notes={notesWithBlocks}
            selectedNoteId={selectedNoteId}
            onNoteChange={handleNoteChange}
          />
        </div>
      )}

      <div className="min-h-[14rem] overflow-x-auto log-entry-content">
        <FieldNoteEntry
          note={selectedNote}
          blocks={selectedNote.filteredBlocks || selectedNote.blocks}
          isExpanded={true}
        />
      </div>
    </HUDPanel>
  );
}
