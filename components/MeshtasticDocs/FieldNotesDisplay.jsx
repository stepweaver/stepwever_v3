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

  // Generate ID from selected note date
  const noteId = selectedNote.title.replace(/[\[\]]/g, '').replace(/-/g, '').substring(0, 8).toUpperCase() || 'NOTE-00';

  return (
    <HUDPanel title="Field Notes" id={noteId} className="p-6">
      {/* Note selector dropdown */}
      {notesWithBlocks.length > 1 && (
        <div className="mb-6">
          <FieldNotesSelector 
            notes={notesWithBlocks} 
            selectedNoteId={selectedNoteId}
            onNoteChange={handleNoteChange}
          />
        </div>
      )}

      {/* Display only the selected note */}
      <FieldNoteEntry
        note={selectedNote}
        blocks={selectedNote.filteredBlocks || selectedNote.blocks}
        isExpanded={true}
      />
    </HUDPanel>
  );
}
