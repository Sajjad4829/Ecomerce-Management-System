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
        <h1 className="text-2xl font-serif font-bold text-text-primary">Staff Notifications</h1>
        <p className="text-sm text-text-muted mt-1">Review internal staff notification status and history.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
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
              <tr key={s.id} className="hover:bg-background">
                <td className="px-6 py-4 font-medium text-text-primary">{s.name}</td>
                <td className="px-6 py-4 text-text-secondary">{s.role}</td>
                <td className="px-6 py-4">
                  {s.unread > 0 ? (
                    <span className="bg-danger-soft text-red-700 px-2 py-1 rounded-full text-xs font-bold">{s.unread} Unread</span>
                  ) : (
                    <span className="text-text-muted">0</span>
                  )}
                </td>
                <td className="px-6 py-4 text-text-muted text-xs">{new Date(s.lastNotified).toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-secondary hover:text-text-primary font-medium flex items-center justify-end gap-2 w-full">
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
