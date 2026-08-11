import React, { useState } from 'react';
import { useOrders } from '../../context/orders/OrderContext';

export default function OrderNotes({ orderId }) {
  const { addOrderNote } = useOrders();
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 'note-1', content: 'Customer requested delayed shipping.', author: 'Admin User', date: new Date().toISOString() }
  ]);

  const handleAddNote = () => {
    if (!note.trim()) return;
    const newNote = { id: `note-${Date.now()}`, content: note, author: 'Current User', date: new Date().toISOString() };
    setNotes([newNote, ...notes]);
    addOrderNote(orderId, note);
    setNote('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <h3 className="text-lg font-serif text-neutral-900 mb-2">Order Notes</h3>
      <p className="text-sm text-neutral-500 mb-6">Internal notes, not visible to customers.</p>
      
      <div className="space-y-4 mb-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add an internal note..."
          className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[100px] text-sm"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map(n => (
          <div key={n.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-sm">
            <p className="text-neutral-900 mb-2">{n.content}</p>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>{n.author}</span>
              <span>{new Date(n.date).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
