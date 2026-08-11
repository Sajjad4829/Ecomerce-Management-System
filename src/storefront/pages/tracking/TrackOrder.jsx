import React, { useState } from 'react';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import { useShipping } from '../../../admin/context/ShippingContext';

export default function TrackOrder() {
  const { getTrackingInfo } = useShipping();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    const result = getTrackingInfo(trackingNumber.trim());
    setHasSearched(true);
    
    if (result) {
      setTrackingResult(result);
      setError('');
    } else {
      setTrackingResult(null);
      setError('Tracking number not found. Please check and try again.');
    }
  };

  return (
    <div className="bg-[#F7F5F2] min-h-[70vh] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number to see the latest updates on your delivery.</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="e.g. TRK-2026-000001" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-lg"
              />
            </div>
            <button type="submit" className="px-8 py-4 bg-[#1A1A1A] text-white font-semibold rounded-xl hover:bg-black transition-colors whitespace-nowrap">
              Track Order
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        </div>

        {hasSearched && trackingResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
               <div>
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tracking Number</p>
                 <p className="text-xl font-bold text-[#1A1A1A] mt-1">{trackingResult.trackingNumber}</p>
               </div>
               <div className="text-left md:text-right">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Current Status</p>
                  <span className={`inline-flex px-3 py-1 mt-1 rounded-full text-sm font-bold uppercase tracking-wider ${
                      trackingResult.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      trackingResult.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trackingResult.status}
                    </span>
               </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              
              {/* ETA */}
              {trackingResult.status !== 'Delivered' && trackingResult.status !== 'Cancelled' && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                  <FiTruck size={24} className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-blue-900">Estimated Delivery</h3>
                    <p className="text-blue-800 mt-1 font-medium">{new Date(trackingResult.estimatedDelivery).toLocaleDateString()}</p>
                    {trackingResult.scheduledDelivery && (
                       <p className="text-sm text-blue-700 mt-2">Scheduled: {trackingResult.scheduledDelivery.slot}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Tracking History</h3>
                <div className="space-y-6">
                  {/* Sort events newest first for customer view */}
                  {[...trackingResult.timeline].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((ev, i) => {
                    const isLatest = i === 0;
                    return (
                       <div key={ev.id} className="relative pl-8">
                          {i !== trackingResult.timeline.length - 1 && (
                            <div className="absolute top-8 left-[15px] bottom-[-24px] w-0.5 bg-gray-200" />
                          )}
                          
                          <div className={`absolute top-1 left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                             isLatest ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 bg-white text-gray-400'
                          }`}>
                            {ev.status === 'Delivered' ? <FiCheckCircle size={14} /> : 
                             ev.status === 'In Transit' || ev.status === 'Out for Delivery' ? <FiTruck size={14} /> : 
                             <FiPackage size={14} />}
                          </div>
                          
                          <div>
                            <p className={`font-bold ${isLatest ? 'text-[#1A1A1A]' : 'text-gray-600'}`}>
                              {ev.status}
                            </p>
                            <p className="text-sm text-gray-500 font-medium mt-0.5">{ev.location}</p>
                            <p className="text-sm text-gray-500 mt-1">{new Date(ev.timestamp).toLocaleString()}</p>
                            {ev.description && <p className="text-sm text-gray-700 mt-2">{ev.description}</p>}
                          </div>
                       </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
