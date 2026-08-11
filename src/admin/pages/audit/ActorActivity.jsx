import React from 'react';
import { FiUsers, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ActorActivity() {
  const actors = [
    { id: 'admin@aurora.com', name: 'System Admin', role: 'Super Admin', events: 142, highRisk: 5, lastActive: '2026-08-09T09:15:00Z' },
    { id: 'manager@aurora.com', name: 'Jane Smith', role: 'Inventory Manager', events: 86, highRisk: 1, lastActive: '2026-08-08T16:30:00Z' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Actor Activity</h1>
        <p className="text-sm text-stone-500 mt-1">Monitor staff actions and behavior patterns</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Actor</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Total Events</th>
              <th className="px-6 py-3">High Risk</th>
              <th className="px-6 py-3">Last Active</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {actors.map(actor => (
              <tr key={actor.id} className="hover:bg-stone-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-stone-900">{actor.name}</div>
                  <div className="text-xs text-stone-500">{actor.id}</div>
                </td>
                <td className="px-6 py-4 text-stone-600">{actor.role}</td>
                <td className="px-6 py-4 font-mono text-stone-900">{actor.events}</td>
                <td className="px-6 py-4">
                  {actor.highRisk > 0 ? (
                    <span className="inline-flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                      <FiAlertCircle size={12} /> {actor.highRisk}
                    </span>
                  ) : (
                    <span className="text-stone-400">0</span>
                  )}
                </td>
                <td className="px-6 py-4 text-stone-500 text-xs">
                  {new Date(actor.lastActive).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/audit/actors/${encodeURIComponent(actor.id)}`} className="text-stone-600 hover:text-stone-900 font-medium">
                    View Activity
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
