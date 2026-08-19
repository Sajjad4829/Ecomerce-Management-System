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
          <h1 className="text-2xl font-bold text-text-primary">Review Reports</h1>
          <p className="text-sm text-text-muted mt-1">Manage community-reported reviews and content flags.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        {reports.length === 0 ? (
           <div className="p-8 text-center text-text-muted">
             No reports found.
           </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Review Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Reporter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {reports.map(rep => (
                <tr key={rep.id} className="hover:bg-background">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">{rep.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:underline">
                    <Link to={`/admin/reviews/${rep.reviewId}`}>{rep.reviewId}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{rep.reporterName}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {rep.reason}
                    <p className="text-xs text-text-muted font-normal mt-1">{rep.content}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center w-fit gap-1 ${
                       rep.status === 'Open' ? 'bg-danger-soft text-red-800' : 'bg-success-soft text-green-800'
                     }`}>
                       {rep.status === 'Open' ? <FiAlertTriangle size={12}/> : <FiCheckCircle size={12}/>}
                       {rep.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                     <button className="text-primary hover:underline">Review Details</button>
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
