import React from 'react';
import { FiDownload, FiDatabase } from 'react-icons/fi';

export default function AuditArchive() {
  const archives = [
    { id: 'arc-2025', name: '2025 Complete Audit Log', size: '2.4 GB', date: '2026-01-01T00:00:00Z', status: 'Available' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Audit Archive</h1>
        <p className="text-sm text-text-muted mt-1">Access cold storage logs for historical compliance</p>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background border-b border-border text-text-secondary font-medium">
            <tr>
              <th className="px-6 py-3">Archive Name</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Created Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {archives.map(archive => (
              <tr key={archive.id} className="hover:bg-background">
                <td className="px-6 py-4">
                  <div className="font-medium text-text-primary flex items-center gap-2">
                    <FiDatabase className="text-text-muted" /> {archive.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary font-mono">{archive.size}</td>
                <td className="px-6 py-4 text-text-muted text-xs">
                  {new Date(archive.date).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {archive.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-text-secondary hover:text-text-primary font-medium flex items-center justify-end gap-1 w-full">
                    <FiDownload size={14} /> Request Restore
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
