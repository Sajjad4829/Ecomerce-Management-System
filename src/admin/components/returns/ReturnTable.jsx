import React from 'react';
import { Link } from 'react-router-dom';

export default function ReturnTable({ returns }) {
  if (returns.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        No returns found matching the criteria.
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Requested': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Inspection Pending': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-success-soft text-green-800';
      case 'Rejected': return 'bg-danger-soft text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-background">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Return ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Product Info</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-gray-200">
          {returns.map((ret) => (
            <tr key={ret.id} className="hover:bg-background">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/admin/returns/${ret.id}`} className="font-medium text-text-primary hover:text-primary transition-colors">
                  {ret.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/admin/orders/${ret.orderId}`} className="text-sm text-primary hover:underline">
                  {ret.orderId}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {new Date(ret.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                {ret.customer.name}
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-text-primary truncate max-w-[200px]">{ret.items[0].name}</p>
                <p className="text-xs text-text-muted">{ret.items.length > 1 ? `+${ret.items.length - 1} more items` : ret.items[0].reason}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ret.status)}`}>
                  {ret.status}
                </span>
                {ret.resolution && (
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">{ret.resolution}</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/admin/returns/${ret.id}`} className="text-primary hover:text-indigo-900">
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
