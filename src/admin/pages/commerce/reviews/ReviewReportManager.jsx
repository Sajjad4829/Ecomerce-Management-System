import React from 'react';
import { useReviews } from '../../../context/ReviewContext';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

export default function ReviewReportManager() {
  const { reports } = useReviews();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Manage community-reported reviews and content flags.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {reports.length === 0 ? (
           <div className="p-8 text-center text-gray-500">
             No reports found.
           </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map(rep => (
                <tr key={rep.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{rep.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <Link to={`/admin/reviews/${rep.reviewId}`}>{rep.reviewId}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rep.reporterName}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {rep.reason}
                    <p className="text-xs text-gray-500 font-normal mt-1">{rep.content}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center w-fit gap-1 ${
                       rep.status === 'Open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                     }`}>
                       {rep.status === 'Open' ? <FiAlertTriangle size={12}/> : <FiCheckCircle size={12}/>}
                       {rep.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                     <button className="text-blue-600 hover:underline">Review Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
