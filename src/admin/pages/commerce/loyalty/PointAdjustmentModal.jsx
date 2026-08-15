import React, { useState } from 'react';
import { FiX, FiCheck, FiInfo } from 'react-icons/fi';
import { useLoyalty } from '../../../context/LoyaltyContext';
import { useCustomers } from '../../../context/customers/CustomerContext';

export default function PointAdjustmentModal({ isOpen, onClose }) {
  const { adjustPoints } = useLoyalty();
  const { customers } = useCustomers();
  
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Add');
  const [reason, setReason] = useState('');
  const [adminNote, setAdminNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || !amount || !reason) return;
    
    const parsedAmount = parseInt(amount, 10);
    const finalAmount = type === 'Deduct' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);
    
    adjustPoints(customerId, finalAmount, 'Manual Adjustment', `${reason} - ${adminNote}`);
    
    // Reset and close
    setCustomerId('');
    setAmount('');
    setType('Add');
    setReason('');
    setAdminNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-serif text-text-primary">Adjust Customer Points</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg flex items-start gap-3">
             <FiInfo className="text-blue-600 mt-0.5 shrink-0" />
             <p className="text-xs text-blue-800 leading-relaxed">
               Manual adjustments directly impact the customer's available points and loyalty tier calculations. All actions are logged.
             </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Customer</label>
            <select 
              value={customerId} 
              onChange={e => setCustomerId(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              required
            >
              <option value="">Select Customer...</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.email})</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Action</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="Add">Add Points</option>
                <option value="Deduct">Deduct Points</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Amount</label>
              <input 
                type="number" 
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g. 500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Reason Code</label>
            <select 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              required
            >
              <option value="">Select Reason...</option>
              <option value="Customer Service Resolution">Customer Service Resolution</option>
              <option value="System Error Correction">System Error Correction</option>
              <option value="Special Promotion">Special Promotion</option>
              <option value="Points Expiration">Points Expiration</option>
              <option value="Other">Other (Specify in notes)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Admin Notes (Required)</label>
            <textarea 
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border-hover rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Detailed reason for the adjustment..."
              rows={2}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2"
            >
              <FiCheck /> Confirm Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
