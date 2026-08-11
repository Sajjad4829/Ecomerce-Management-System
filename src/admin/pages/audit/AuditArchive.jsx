import React from 'react';
import { FiDownload, FiDatabase } from 'react-icons/fi';

export default function AuditArchive() {
  const archives = [
    { id: 'arc-2025', name: '2025 Complete Audit Log', size: '2.4 GB', date: '2026-01-01T00:00:00Z', status: 'Available' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Audit Archive</h1>
        <p className="text-sm text-stone-500 mt-1">Access cold storage logs for historical compliance</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
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
              <tr key={archive.id} className="hover:bg-stone-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-stone-900 flex items-center gap-2">
                    <FiDatabase className="text-stone-400" /> {archive.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-stone-600 font-mono">{archive.size}</td>
                <td className="px-6 py-4 text-stone-500 text-xs">
                  {new Date(archive.date).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {archive.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-stone-600 hover:text-stone-900 font-medium flex items-center justify-end gap-1 w-full">
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
