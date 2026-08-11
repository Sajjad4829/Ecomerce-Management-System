import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiClock, FiXCircle } from 'react-icons/fi';

export default function ScheduledCommunications() {
  const { scheduledMessages } = useNotification();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Scheduled Communications</h1>
        <p className="text-sm text-text-muted mt-1">Review and manage messages queued for future delivery.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Message / Campaign</th>
              <th className="px-6 py-3">Audience</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Scheduled For</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {scheduledMessages.map(msg => (
              <tr key={msg.id} className="hover:bg-background">
                <td className="px-6 py-4 font-medium text-text-primary">{msg.message}</td>
                <td className="px-6 py-4 text-text-secondary">{msg.audience}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-text-secondary rounded text-xs font-medium border border-border">
                    {msg.channel}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary font-mono text-xs flex items-center gap-2">
                  <FiClock className="text-text-muted" /> {new Date(msg.schedule).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {msg.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-danger hover:text-red-800 font-medium flex items-center justify-end gap-1 w-full" title="Cancel">
                    <FiXCircle /> Cancel
                  </button>
                </td>
              </tr>
            ))}
            {scheduledMessages.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                  No scheduled messages.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
