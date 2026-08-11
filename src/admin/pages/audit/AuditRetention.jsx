import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function AuditRetention() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Audit Retention</h1>
          <p className="text-sm text-stone-500 mt-1">Configure log storage, archival, and legal hold policies</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium">
          <FiSave /> Save Policies
        </button>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Note:</strong> Automatic deletion, real legal holds, and immutable storage require a backend infrastructure phase.
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
        <h3 className="font-serif font-bold text-lg text-stone-900">Data Lifecycle</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Active Retention Period</label>
            <select className="w-full md:w-1/2 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
              <option>30 Days</option>
              <option>90 Days</option>
              <option>1 Year</option>
              <option>Indefinite</option>
            </select>
            <p className="text-xs text-stone-500 mt-1">Duration logs are kept readily searchable in the main database.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Archival Policy</label>
            <select className="w-full md:w-1/2 px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
              <option>Move to Cold Storage (e.g. S3 Glacier)</option>
              <option>Permanent Deletion</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
        <h3 className="font-serif font-bold text-lg text-stone-900">Legal Holds</h3>
        <p className="text-sm text-stone-600">Prevent selected records from being modified or deleted during an active investigation or litigation.</p>
        
        <div className="border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
              <tr>
                <th className="px-6 py-3">Hold Name</th>
                <th className="px-6 py-3">Scope</th>
                <th className="px-6 py-3">Applied</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-stone-500">
                  No active legal holds. (Placeholder functionality)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="text-stone-900 font-medium text-sm hover:underline">Create Legal Hold</button>
      </div>
    </div>
  );
}
