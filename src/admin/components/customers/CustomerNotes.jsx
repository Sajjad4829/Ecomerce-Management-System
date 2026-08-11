import { useState } from 'react';
import { FiMessageSquare, FiPlus, FiAlertCircle } from 'react-icons/fi';

const MOCK_NOTES = [
  { id: '1', text: 'Customer requested expedited shipping on next order.', author: 'Admin User', date: '2026-08-01', priority: 'Important' },
  { id: '2', text: 'Follow up regarding trade discount application.', author: 'Sales Team', date: '2026-07-28', priority: 'Normal' },
];

export default function CustomerNotes() {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [newNote, setNewNote] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([{
        id: Date.now().toString(),
        text: newNote,
        author: 'Current User',
        date: new Date().toISOString().split('T')[0],
        priority
      }, ...notes]);
      setNewNote('');
      setIsAdding(false);
      setPriority('Normal');
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <FiMessageSquare className="text-text-muted" /> Internal Notes
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs text-primary hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <FiPlus size={14} /> Add Note
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4 bg-background p-3 rounded-lg border border-black/5">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write an internal note..."
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black/20 mb-2"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="text-xs border-border rounded-md bg-surface px-2 py-1"
            >
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>
            <div className="flex gap-2">
              <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-text-secondary text-xs font-medium hover:bg-gray-100 rounded-md">Cancel</button>
              <button type="submit" className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded-md text-xs font-medium hover:bg-black">Save Note</button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {notes.map(note => (
          <div key={note.id} className={`p-3 rounded-lg border ${note.priority === 'Urgent' ? 'bg-danger-soft border-red-100' : note.priority === 'Important' ? 'bg-warning-soft border-amber-100' : 'bg-background border-black/5'}`}>
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold text-text-muted uppercase">{note.author} • {note.date}</span>
              {note.priority !== 'Normal' && (
                <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${note.priority === 'Urgent' ? 'text-danger' : 'text-warning'}`}>
                  <FiAlertCircle size={10} /> {note.priority}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-800">{note.text}</p>
          </div>
        ))}
        {notes.length === 0 && !isAdding && (
          <p className="text-sm text-text-muted text-center py-4">No internal notes yet.</p>
        )}
      </div>
    </div>
  );
}
