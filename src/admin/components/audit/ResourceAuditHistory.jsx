import React, { useEffect, useState } from 'react';
import { auditService } from '../../services/audit/AuditService';
import AuditTimeline from './AuditTimeline';

export default function ResourceAuditHistory({ resourceType, resourceId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await auditService.getResourceHistory(resourceType, resourceId);
      setEvents(data);
      setLoading(false);
    }
    load();
  }, [resourceType, resourceId]);

  if (loading) return <div className="animate-pulse h-20 bg-stone-100 rounded-lg"></div>;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <h3 className="font-serif font-bold text-lg text-stone-900 mb-6">Change History</h3>
      <AuditTimeline events={events} />
    </div>
  );
}
