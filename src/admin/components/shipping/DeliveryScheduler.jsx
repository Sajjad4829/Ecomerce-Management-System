import React, { useState } from 'react';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';
import { useShipping } from '../../context/ShippingContext';

export default function DeliveryScheduler({ isOpen, onClose, shipment }) {
  const { scheduleDelivery } = useShipping();
  const [date, setDate] = useState(shipment.scheduledDelivery?.date || '');
  const [slot, setSlot] = useState(shipment.scheduledDelivery?.slot || 'Morning (09:00 - 12:00)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleDelivery(shipment.id, date, slot);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Schedule Delivery</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors">
            <FiX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-2">
              <FiCalendar /> Delivery Date
            </label>
            <input 
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-2">
              <FiClock /> Time Slot
            </label>
            <select 
              value={slot} 
              onChange={(e) => setSlot(e.target.value)}
              className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
            >
              <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
              <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 - 15:00)</option>
              <option value="Evening (15:00 - 18:00)">Evening (15:00 - 18:00)</option>
              <option value="Flexible (Anytime)">Flexible (Anytime)</option>
            </select>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background rounded-lg transition-colors border border-border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-black rounded-lg transition-colors">
              Confirm Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
