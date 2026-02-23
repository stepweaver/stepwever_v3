'use client';

export default function FieldNotesSelector({ notes, selectedNoteId, onNoteChange }) {
  const handleChange = (e) => {
    const noteId = e.target.value;
    if (onNoteChange) {
      onNoteChange(noteId);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <label htmlFor="field-notes-selector" className="text-neon/50 shrink-0 font-mono text-xs">
        $
      </label>
      <select
        id="field-notes-selector"
        value={selectedNoteId || ''}
        className="field-notes-select bg-panel/90 border border-neon/30 text-neon font-mono text-xs py-1.5 px-2 rounded-sm focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/30 cursor-pointer hover:border-neon/50 transition-colors min-w-0"
        onChange={handleChange}
        aria-label="Select log date"
      >
        {notes.map((note) => (
          <option
            key={note.id}
            value={note.id}
            style={{ backgroundColor: '#0e1218', color: '#00ff41' }}
          >
            {note.title}
          </option>
        ))}
      </select>
    </div>
  );
}
