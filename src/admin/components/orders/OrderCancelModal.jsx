import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function OrderCancelModal({ isOpen, onClose, onConfirm, orderId }) {
  const [reason, setReason] = useState('Customer Request');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Cancel Order #{orderId}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors">
            <FiX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-danger font-medium">Warning: This action cannot be undone. Refunds must be processed separately.</p>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Cancellation Reason</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
            >
              <option value="Customer Request">Customer Request</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Address Issue">Address Issue</option>
              <option value="Duplicate Order">Duplicate Order</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Internal Note (Required)</label>
            <textarea
              required
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm resize-none"
              placeholder="Explain why this order is being cancelled..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background rounded-lg transition-colors border border-border">
              Go Back
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Cancel Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
