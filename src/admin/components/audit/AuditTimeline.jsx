import React from 'react';
import { FiClock, FiUser, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function AuditTimeline({ events = [] }) {
  if (!events.length) return <div className="text-stone-500 text-sm">No activity found.</div>;

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4">
          {index !== events.length - 1 && (
            <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-stone-200"></div>
          )}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
            event.severity === 'Critical' ? 'bg-red-100 text-red-600' :
            event.severity === 'High' ? 'bg-orange-100 text-orange-600' :
            event.severity === 'Medium' ? 'bg-blue-100 text-blue-600' :
            'bg-stone-100 text-stone-500'
          }`}>
            <FiActivity size={16} />
          </div>
          <div className="pt-2 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-stone-900 text-sm">{event.action}</span>
              <span className="text-xs text-stone-500 px-2 py-0.5 bg-stone-100 rounded-full">{event.status}</span>
            </div>
            <p className="text-sm text-stone-600">
              <span className="font-medium text-stone-900">{event.actor}</span> on {event.resourceType} <span className="font-mono text-xs bg-stone-100 px-1 rounded">{event.resourceName}</span>
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-stone-500">
              <div className="flex items-center gap-1">
                <FiClock size={12} /> {new Date(event.timestamp).toLocaleString()}
              </div>
              <Link to={`/admin/audit/logs/${event.id}`} className="text-stone-900 hover:underline">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
