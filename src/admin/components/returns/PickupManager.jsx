import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiTruck } from 'react-icons/fi';
import { useReturns } from '../../context/ReturnContext';

export default function PickupManager({ returnReq }) {
  const { schedulePickup } = useReturns();
  const [address, setAddress] = useState(returnReq.pickup?.address || '');
  const [date, setDate] = useState(returnReq.pickup?.scheduledDate || '');

  const handleSchedule = (e) => {
    e.preventDefault();
    schedulePickup(returnReq.id, {
      status: 'Scheduled',
      address,
      scheduledDate: date,
      trackingNumber: `TRK-RET-${Date.now()}`
    });
  };

  if (returnReq.pickup) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Pickup Status</p>
            <p className="font-bold text-gray-900 mt-1">{returnReq.pickup.status}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-semibold">Tracking Number</p>
            <p className="font-mono text-gray-900 mt-1">{returnReq.pickup.trackingNumber}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"><FiMapPin /> Pickup Location</p>
            <p className="text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded-lg">{returnReq.pickup.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"><FiCalendar /> Scheduled Date</p>
            <p className="text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded-lg">{new Date(returnReq.pickup.scheduledDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSchedule} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
        <textarea 
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
          rows="2"
          placeholder="Enter the address for pickup..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
        <input 
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm"
        />
      </div>
      <div className="pt-2">
        <button type="submit" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
          Schedule Pickup Placeholder
        </button>
      </div>
    </form>
  );
}
