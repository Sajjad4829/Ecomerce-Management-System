import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiTruck, FiSearch } from 'react-icons/fi';

export default function ReturnTimeline({ events }) {
  const sortedEvents = [...events].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const getIcon = (status) => {
    switch (status) {
      case 'Requested': return <FiClock size={14} />;
      case 'Approved': case 'Completed': return <FiCheckCircle size={14} />;
      case 'Rejected': case 'Cancelled': return <FiXCircle size={14} />;
      case 'Pickup Scheduled': case 'In Transit': case 'Received': return <FiTruck size={14} />;
      case 'Inspection Pending': case 'Inspection Completed': return <FiSearch size={14} />;
      default: return <FiClock size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {sortedEvents.map((ev, i) => {
        const isLast = i === sortedEvents.length - 1;
        return (
          <div key={ev.id} className="relative pl-8">
            {i !== sortedEvents.length - 1 && (
              <div className="absolute top-8 left-[15px] bottom-[-24px] w-0.5 bg-gray-200" />
            )}
            
            <div className={`absolute top-1 left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
               isLast ? 'border-blue-600 bg-blue-50 text-primary' : 'border-border-hover bg-surface text-text-muted'
            }`}>
              {getIcon(ev.status)}
            </div>
            
            <div>
              <p className={`text-sm font-bold ${isLast ? 'text-text-primary' : 'text-text-secondary'}`}>
                {ev.status}
              </p>
              <p className="text-xs text-text-muted font-medium mt-0.5">{ev.actor}</p>
              <p className="text-xs text-text-muted mt-1">{new Date(ev.timestamp).toLocaleString()}</p>
              <p className="text-sm text-text-secondary mt-2">{ev.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
