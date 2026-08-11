import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useReviews } from '../../../context/ReviewContext';

export default function ReviewReasonManager() {
  const { moderationReasons } = useReviews();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moderation Reasons</h1>
          <p className="text-sm text-gray-500 mt-1">Manage categories for reporting and rejecting reviews.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Add Reason
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {moderationReasons.sort((a, b) => a.sortOrder - b.sortOrder).map(reason => (
              <tr key={reason.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{reason.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{reason.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reason.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {reason.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <label className="flex items-center gap-2 text-sm text-gray-700">
                     <input type="checkbox" checked={reason.customerVisible} readOnly className="rounded border-gray-300 text-[#1A1A1A]" />
                     Customer Visible
                   </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-gray-400 hover:text-blue-600">
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
