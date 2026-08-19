import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCustomers } from '../../context/customers/CustomerContext';
import { Plus } from 'lucide-react';

export function CustomerNotes() {
  const { customer } = useOutletContext();
  const { getCustomerNotes, addNote } = useCustomers();
  const notes = getCustomerNotes(customer.id);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(customer.id, newNote);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Internal Notes</h3>
        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">Not visible to customer</span>
      </div>

      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <form onSubmit={handleAddNote}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new internal note about this customer..."
            className="w-full h-24 p-3 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="flex items-center px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center p-8 text-neutral-500 border border-dashed border-neutral-200 rounded-lg">
            No internal notes found for this customer.
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="p-4 border border-neutral-200 rounded-lg bg-surface">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">Admin</span>
                <span className="text-xs text-neutral-500">{new Date(note.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
