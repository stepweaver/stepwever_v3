'use client';

export default function FieldNotesSelector({ notes, selectedNoteId, onNoteChange }) {
  const handleChange = (e) => {
    const noteId = e.target.value;
    if (onNoteChange) {
      onNoteChange(noteId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="field-notes-selector" className="text-neon/60 shrink-0 font-mono">
        $
      </label>
      <select
        id="field-notes-selector"
        value={selectedNoteId || ''}
        className="field-notes-select bg-[#0e1218] border border-neon/50 text-[#00ff41] font-mono text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/40 cursor-pointer hover:border-neon transition-colors min-w-[10rem]"
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
