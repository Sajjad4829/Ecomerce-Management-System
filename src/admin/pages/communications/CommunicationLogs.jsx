import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function CommunicationLogs() {
  const { communicationLogs } = useNotification();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Communication Logs</h1>
          <p className="text-sm text-stone-500 mt-1">Audit trail of all outbound system communications.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search recipient..." 
              className="pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none w-64"
            />
          </div>
          <button className="px-3 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-600 flex items-center gap-2 text-sm">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Recipient</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Template / Event</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {communicationLogs.map(log => (
              <tr key={log.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-mono text-xs text-stone-500">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 font-medium text-stone-900">{log.recipient}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs font-medium border border-stone-200">
                    {log.channel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-stone-900">{log.template}</div>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">{log.event}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.status === 'Sent' || log.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/communications/logs/${log.id}`} className="text-stone-600 hover:text-stone-900 font-medium text-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
