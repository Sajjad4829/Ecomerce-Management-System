import React from 'react';
import { FiPlus, FiEdit2, FiCode } from 'react-icons/fi';
import { useNotification } from '../../../context/NotificationContext';

export default function NotificationTemplates() {
  const { templates } = useNotification();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notification Templates</h1>
          <p className="text-sm text-text-muted mt-1">Design email, SMS, and in-app content.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> New Template
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {templates.map(tpl => (
              <tr key={tpl.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{tpl.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-secondary">{tpl.eventId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{tpl.channel}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tpl.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tpl.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-text-muted hover:text-primary mr-3"><FiCode size={16} /></button>
                   <button className="text-text-muted hover:text-primary"><FiEdit2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
