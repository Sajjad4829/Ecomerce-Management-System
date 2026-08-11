import React from 'react';
import { FiMapPin, FiCheckCircle, FiTruck, FiBox, FiAlertCircle } from 'react-icons/fi';

export default function TrackingTimeline({ events }) {
  // Sort events newest first for timeline display if needed, but usually it's oldest first.
  // We'll display oldest first (top down) and highlight the last one.
  const sortedEvents = [...events].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const getIcon = (status) => {
    switch (status) {
      case 'Draft': case 'Label Created': case 'Ready to Ship': return <FiBox size={14} />;
      case 'Shipped': case 'In Transit': case 'Out for Delivery': return <FiTruck size={14} />;
      case 'Delivered': return <FiCheckCircle size={14} />;
      case 'Delayed': case 'Failed Delivery': return <FiAlertCircle size={14} />;
      default: return <FiMapPin size={14} />;
    }
  };

  const getColor = (status, isLast) => {
    if (!isLast) return 'text-gray-400 bg-gray-100 border-gray-200';
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100 border-green-200';
      case 'Delayed': case 'Failed Delivery': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {sortedEvents.map((ev, i) => {
        const isLast = i === sortedEvents.length - 1;
        const colorClasses = getColor(ev.status, isLast);

        return (
          <div key={ev.id} className="relative pl-8">
            {/* Connecting Line */}
            {i !== sortedEvents.length - 1 && (
              <div className="absolute top-8 left-[15px] bottom-[-24px] w-0.5 bg-gray-200" />
            )}
            
            {/* Icon Node */}
            <div className={`absolute top-1 left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${colorClasses}`}>
              {getIcon(ev.status)}
            </div>
            
            {/* Content */}
            <div>
              <p className={`text-sm font-bold ${isLast ? 'text-gray-900' : 'text-gray-600'}`}>
                {ev.status}
              </p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{ev.location}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(ev.timestamp).toLocaleString()}</p>
              <p className="text-sm text-gray-700 mt-2">{ev.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
