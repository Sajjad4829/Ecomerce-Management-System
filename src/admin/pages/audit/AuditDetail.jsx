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

  if (!event) return <div className="p-8 text-center text-text-muted">Loading event details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Link to="/admin/audit/logs" className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-stone-100 transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Event Details</h1>
          <p className="text-sm text-text-muted mt-1 font-mono">{event.id}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.severity === 'Critical' ? 'bg-danger-soft text-red-700 border border-red-200' :
              event.severity === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
              'bg-stone-200 text-text-secondary border border-border-hover'
            }`}>
              {event.severity} Severity
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              event.status === 'Success' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
              'bg-danger-soft text-red-700 border border-red-200'
            }`}>
              {event.status}
            </span>
          </div>
          <h2 className="text-xl font-medium text-text-primary mb-1">{event.action}</h2>
          <p className="text-sm text-text-muted">{new Date(event.timestamp).toLocaleString()}</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Actor</h3>
              <div className="bg-background p-3 rounded-lg border border-border">
                <div className="font-medium text-text-primary">{event.actor}</div>
                <div className="text-sm text-text-muted">{event.actorRole}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Source Context</h3>
              <div className="bg-background p-3 rounded-lg border border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Module</span>
                  <span className="font-medium">{event.module}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Source</span>
                  <span className="font-medium">{event.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">IP Address</span>
                  <span className="font-mono">{event.metadata?.ipPlaceholder || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Resource Affected</h3>
              <div className="bg-background p-3 rounded-lg border border-border">
                <div className="font-medium text-text-primary">{event.resourceName}</div>
                <div className="text-sm text-text-muted">Type: {event.resourceType}</div>
                <div className="text-xs text-text-muted font-mono mt-1">ID: {event.resourceId}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Metadata & Changes</h3>
          {event.metadata?.oldValue || event.metadata?.newValue ? (
            <ChangeHistory oldValue={event.metadata.oldValue} newValue={event.metadata.newValue} />
          ) : (
            <div className="bg-background p-4 rounded-lg border border-border font-mono text-xs overflow-x-auto">
              <pre className="text-text-secondary">{JSON.stringify(event.metadata, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
