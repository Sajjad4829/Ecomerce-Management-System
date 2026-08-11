import React, { useEffect, useState } from 'react';
import { FiShield, FiAlertTriangle } from 'react-icons/fi';
import { auditService } from '../../services/audit/AuditService';
import AuditTimeline from '../../components/audit/AuditTimeline';

export default function SecurityEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await auditService.getSecurityEvents();
      setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Security Events</h1>
        <p className="text-sm text-stone-500 mt-1">High-risk actions, failed authentications, and policy changes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-3 text-red-600 mb-2">
            <FiAlertTriangle />
            <h3 className="font-medium text-sm">Critical Security Alerts</h3>
          </div>
          <p className="text-2xl font-bold text-red-900">{events.filter(e => e.severity === 'Critical').length}</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <div className="flex items-center gap-3 text-orange-600 mb-2">
            <FiShield />
            <h3 className="font-medium text-sm">High Risk Access Changes</h3>
          </div>
          <p className="text-2xl font-bold text-orange-900">{events.filter(e => e.severity === 'High').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-6">Event Timeline</h3>
        {loading ? (
          <div className="animate-pulse h-40 bg-stone-100 rounded-lg"></div>
        ) : (
          <AuditTimeline events={events} />
        )}
      </div>
    </div>
  );
}
