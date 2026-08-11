import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function AuditRetention() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Audit Retention</h1>
          <p className="text-sm text-text-muted mt-1">Configure log storage, archival, and legal hold policies</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
          <FiSave /> Save Policies
        </button>
      </div>

      <div className="bg-warning-soft p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Note:</strong> Automatic deletion, real legal holds, and immutable storage require a backend infrastructure phase.
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
        <h3 className="font-serif font-bold text-lg text-text-primary">Data Lifecycle</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Active Retention Period</label>
            <select className="w-full md:w-1/2 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
              <option>30 Days</option>
              <option>90 Days</option>
              <option>1 Year</option>
              <option>Indefinite</option>
            </select>
            <p className="text-xs text-text-muted mt-1">Duration logs are kept readily searchable in the main database.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Archival Policy</label>
            <select className="w-full md:w-1/2 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
              <option>Move to Cold Storage (e.g. S3 Glacier)</option>
              <option>Permanent Deletion</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
        <h3 className="font-serif font-bold text-lg text-text-primary">Legal Holds</h3>
        <p className="text-sm text-text-secondary">Prevent selected records from being modified or deleted during an active investigation or litigation.</p>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background border-b border-border text-text-secondary font-medium">
              <tr>
                <th className="px-6 py-3">Hold Name</th>
                <th className="px-6 py-3">Scope</th>
                <th className="px-6 py-3">Applied</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                  No active legal holds. (Placeholder functionality)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="text-text-primary font-medium text-sm hover:underline">Create Legal Hold</button>
      </div>
    </div>
  );
}
