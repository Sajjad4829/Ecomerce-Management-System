import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

export default function StaffNotifications() {
  const staff = [
    { id: 1, name: 'Jane Smith', role: 'Inventory Manager', unread: 5, lastNotified: '2026-08-09T08:00:00Z' },
    { id: 2, name: 'John Doe', role: 'System Admin', unread: 0, lastNotified: '2026-08-08T15:00:00Z' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Staff Notifications</h1>
        <p className="text-sm text-stone-500 mt-1">Review internal staff notification status and history.</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Staff Member</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Unread Count</th>
              <th className="px-6 py-3">Last Notified</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {staff.map(s => (
              <tr key={s.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900">{s.name}</td>
                <td className="px-6 py-4 text-stone-600">{s.role}</td>
                <td className="px-6 py-4">
                  {s.unread > 0 ? (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">{s.unread} Unread</span>
                  ) : (
                    <span className="text-stone-400">0</span>
                  )}
                </td>
                <td className="px-6 py-4 text-stone-500 text-xs">{new Date(s.lastNotified).toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-stone-600 hover:text-stone-900 font-medium flex items-center justify-end gap-2 w-full">
                    <FiMessageSquare size={14} /> Send Manual Alert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
