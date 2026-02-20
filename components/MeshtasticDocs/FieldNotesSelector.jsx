'use client';

export default function FieldNotesSelector({ notes, selectedNoteId, onNoteChange }) {
  const handleChange = (e) => {
    const noteId = e.target.value;
    if (onNoteChange) {
      onNoteChange(noteId);
    }
  };

  return (
    <div>
      <label htmlFor="field-notes-selector" className="sr-only">
        Select field note date
      </label>
      <select
        id="field-notes-selector"
        value={selectedNoteId || ''}
        className="bg-panel border-2 border-neon/50 text-neon font-ocr text-sm font-semibold px-4 py-2 rounded-sm focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/50 cursor-pointer hover:border-neon/70 transition-all w-full max-w-xs"
        style={{
          color: 'rgb(90, 255, 140)',
          backgroundColor: 'rgba(14, 18, 28, 0.95)',
        }}
        onChange={handleChange}
      >
        {notes.map((note) => (
          <option 
            key={note.id} 
            value={note.id}
            style={{
              backgroundColor: 'rgb(14, 18, 28)',
              color: 'rgb(90, 255, 140)',
            }}
          >
            {note.title}
          </option>
        ))}
      </select>
    </div>
  );
}
