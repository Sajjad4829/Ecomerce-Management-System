import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

export default function ReviewTable({ reviews }) {
  if (reviews.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No reviews found matching the criteria.
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Pending Moderation': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': case 'Hidden': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((rev) => (
            <tr key={rev.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/admin/reviews/${rev.id}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {rev.id}
                </Link>
                <div className="text-xs text-gray-500 mt-1">{new Date(rev.createdAt).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rev.customerName}
                {rev.isVerifiedPurchase && <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-semibold uppercase tracking-wider">Verified</span>}
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{rev.productName}</p>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">{rev.title}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < rev.rating ? 'fill-current' : 'text-gray-300'} />
                  ))}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(rev.status)}`}>
                  {rev.status}
                </span>
                {rev.reports.length > 0 && (
                   <span className="ml-2 text-xs font-semibold text-red-600 uppercase">Reported</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/admin/reviews/${rev.id}`} className="text-indigo-600 hover:text-indigo-900">
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
