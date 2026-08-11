import React from 'react';
import { FiSettings, FiActivity } from 'react-icons/fi';
import { useNotification } from '../../../context/NotificationContext';

export default function NotificationEvents() {
  const { events } = useNotification();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Events</h1>
          <p className="text-sm text-gray-500 mt-1">Configure system events and default channels.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Channels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(ev => (
              <tr key={ev.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                     <FiActivity className="text-gray-400" />
                     <span className="font-mono text-sm font-bold text-gray-900">{ev.id}</span>
                  </div>
                  <p className="text-xs text-gray-500">{ev.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ev.module}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex gap-1">
                     {ev.defaultChannels.map(ch => (
                       <span key={ch} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-600 border border-gray-200">
                         {ch}
                       </span>
                     ))}
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ev.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ev.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-gray-400 hover:text-blue-600"><FiSettings size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
