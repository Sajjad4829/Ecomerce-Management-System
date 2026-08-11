import React, { useEffect, useState } from 'react';
import { auditService } from '../../services/audit/AuditService';
import AuditTimeline from '../../components/audit/AuditTimeline';

export default function ExportActivity() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    async function load() {
      const data = await auditService.getExportActivity();
      setEvents(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Export Activity</h1>
        <p className="text-sm text-stone-500 mt-1">Track data extraction operations across the system</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        {events.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            No export activity recorded.
          </div>
        ) : (
          <AuditTimeline events={events} />
        )}
      </div>
    </div>
  );
}
