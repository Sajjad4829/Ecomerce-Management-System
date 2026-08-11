import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export default function CommunicationLogDetail() {
  const { messageId } = useParams();
  const { communicationLogs } = useNotification();
  const log = communicationLogs.find(l => l.id === messageId);

  if (!log) return <div className="p-12 text-center text-stone-500">Log not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div>
        <Link to="/admin/communications/logs" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
          <FiArrowLeft /> Back to Logs
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-serif font-bold text-stone-900 mb-1">{log.template}</h1>
            <p className="text-sm font-mono text-stone-500">{log.id} • {new Date(log.createdAt).toLocaleString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            log.status === 'Sent' || log.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {log.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 divide-x border-b border-stone-200">
          <div className="p-6 space-y-4">
             <div>
               <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Recipient</div>
               <div className="font-medium text-stone-900">{log.recipient}</div>
             </div>
             <div>
               <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Channel</div>
               <div className="inline-block px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs font-medium border border-stone-200">
                 {log.channel}
               </div>
             </div>
          </div>
          <div className="p-6 space-y-4">
             <div>
               <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Source Event</div>
               <div className="font-mono text-sm text-stone-700">{log.event}</div>
             </div>
             <div>
               <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Triggered By</div>
               <div className="text-sm text-stone-700">{log.source}</div>
             </div>
          </div>
        </div>

        <div className="p-6 bg-stone-50">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Payload Preview</div>
          <div className="bg-white border border-stone-200 rounded p-4 text-sm font-serif whitespace-pre-wrap text-stone-700 shadow-sm">
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
