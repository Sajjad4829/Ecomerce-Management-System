import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiPlus, FiEdit2, FiCopy } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotificationRules() {
  const { rules } = useNotification();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Notification Rules</h1>
          <p className="text-sm text-stone-500 mt-1">Define conditions that trigger automated notifications.</p>
        </div>
        <Link to="/admin/notifications/rules/new" className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium">
          <FiPlus /> New Rule
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Rule Name</th>
              <th className="px-6 py-3">Event</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Audience</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {rules.map(rule => (
              <tr key={rule.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900">{rule.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-stone-600">{rule.event}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs font-medium border border-stone-200">
                    {rule.channel}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-600">{rule.audience}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rule.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {rule.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-stone-400 hover:text-stone-900" title="Duplicate">
                      <FiCopy />
                    </button>
                    <button className="p-1.5 text-stone-400 hover:text-stone-900" title="Edit">
                      <FiEdit2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rules.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-stone-500">
                  No rules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
