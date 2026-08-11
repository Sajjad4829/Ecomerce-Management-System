import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { auditService } from '../../services/audit/AuditService';
import ChangeHistory from '../../components/audit/ChangeHistory';

export default function AuditDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await auditService.getEvent(eventId);
      setEvent(data);
    }
    load();
  }, [eventId]);

  if (!event) return <div className="p-8 text-center text-stone-500">Loading event details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Link to="/admin/audit/logs" className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Event Details</h1>
          <p className="text-sm text-stone-500 mt-1 font-mono">{event.id}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.severity === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
              event.severity === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
              'bg-stone-200 text-stone-700 border border-stone-300'
            }`}>
              {event.severity} Severity
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.status === 'Success' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
              'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {event.status}
            </span>
          </div>
          <h2 className="text-xl font-medium text-stone-900 mb-1">{event.action}</h2>
          <p className="text-sm text-stone-500">{new Date(event.timestamp).toLocaleString()}</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Actor</h3>
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <div className="font-medium text-stone-900">{event.actor}</div>
                <div className="text-sm text-stone-500">{event.actorRole}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Source Context</h3>
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Module</span>
                  <span className="font-medium">{event.module}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Source</span>
                  <span className="font-medium">{event.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">IP Address</span>
                  <span className="font-mono">{event.metadata?.ipPlaceholder || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Resource Affected</h3>
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <div className="font-medium text-stone-900">{event.resourceName}</div>
                <div className="text-sm text-stone-500">Type: {event.resourceType}</div>
                <div className="text-xs text-stone-400 font-mono mt-1">ID: {event.resourceId}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-stone-200">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Metadata & Changes</h3>
          {event.metadata?.oldValue || event.metadata?.newValue ? (
            <ChangeHistory oldValue={event.metadata.oldValue} newValue={event.metadata.newValue} />
          ) : (
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 font-mono text-xs overflow-x-auto">
              <pre className="text-stone-700">{JSON.stringify(event.metadata, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
