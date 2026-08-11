import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export default function CommunicationLogDetail() {
  const { messageId } = useParams();
  const { communicationLogs } = useNotification();
  const log = communicationLogs.find(l => l.id === messageId);

  if (!log) return <div className="p-12 text-center text-text-muted">Log not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div>
        <Link to="/admin/communications/logs" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <FiArrowLeft /> Back to Logs
        </Link>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-start">
          <div>
            <h1 className="text-xl font-serif font-bold text-text-primary mb-1">{log.template}</h1>
            <p className="text-sm font-mono text-text-muted">{log.id} • {new Date(log.createdAt).toLocaleString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            log.status === 'Sent' || log.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-danger-soft text-red-700'
          }`}>
            {log.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 divide-x border-b border-border">
          <div className="p-6 space-y-4">
             <div>
               <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Recipient</div>
               <div className="font-medium text-text-primary">{log.recipient}</div>
             </div>
             <div>
               <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Channel</div>
               <div className="inline-block px-2 py-1 bg-stone-100 text-text-secondary rounded text-xs font-medium border border-border">
                 {log.channel}
               </div>
             </div>
          </div>
          <div className="p-6 space-y-4">
             <div>
               <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Source Event</div>
               <div className="font-mono text-sm text-text-secondary">{log.event}</div>
             </div>
             <div>
               <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Triggered By</div>
               <div className="text-sm text-text-secondary">{log.source}</div>
             </div>
          </div>
        </div>

        <div className="p-6 bg-background">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Payload Preview</div>
          <div className="bg-surface border border-border rounded p-4 text-sm font-serif whitespace-pre-wrap text-text-secondary shadow-sm">
            {log.channel === 'Email' && (
              <div className="border-b border-stone-100 pb-2 mb-2 font-medium">
                Subject: {log.subject}
              </div>
            )}
            {log.message}
          </div>
        </div>
      </div>
    </div>
  );
}
