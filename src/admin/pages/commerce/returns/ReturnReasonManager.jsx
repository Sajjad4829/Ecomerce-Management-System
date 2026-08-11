import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useReturns } from '../../../context/ReturnContext';

export default function ReturnReasonManager() {
  const { returnReasons } = useReturns();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Return Reasons</h1>
          <p className="text-sm text-text-muted mt-1">Manage standard reasons customers can select during return requests.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Add Reason
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Reason Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Visibility</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {returnReasons.sort((a, b) => a.sortOrder - b.sortOrder).map(reason => (
              <tr key={reason.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{reason.name}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{reason.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reason.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {reason.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <label className="flex items-center gap-2 text-sm text-text-secondary">
                     <input type="checkbox" checked={reason.customerVisible} readOnly className="rounded border-border-hover text-text-primary" />
                     Customer Visible
                   </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-text-muted hover:text-primary">
                     <FiEdit2 size={16} />
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
