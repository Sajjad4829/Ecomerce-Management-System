import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiMessageSquare } from 'react-icons/fi';

export default function CustomerCommunications() {
  const customers = [
    { id: 'CUST-101', name: 'Sarah Jenkins', email: 'sarah.jenkins@example.com', lastContact: '2026-08-09T08:15:00Z', channel: 'Email', status: 'Sent' },
    { id: 'CUST-102', name: 'Michael Chen', email: 'michael.chen@example.com', lastContact: '2026-08-08T14:00:00Z', channel: 'SMS', status: 'Delivered' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Customer Communications</h1>
          <p className="text-sm text-text-muted mt-1">Manage direct messaging and automated notifications sent to customers.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Last Contact</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-background">
                <td className="px-6 py-4">
                  <div className="font-medium text-text-primary">{c.name}</div>
                  <div className="text-xs text-text-muted font-mono mt-0.5">{c.id}</div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{c.email}</td>
                <td className="px-6 py-4 text-text-muted text-xs">{new Date(c.lastContact).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-text-secondary rounded text-xs font-medium border border-border">
                    {c.channel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    c.status === 'Sent' || c.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-text-muted'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/communications/customers/${c.id}/compose`} className="text-text-secondary hover:text-text-primary font-medium flex items-center justify-end gap-2">
                    <FiMail /> Compose
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
