import React, { useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ExternalLink, CornerUpLeft } from 'lucide-react';
import { useReturns } from '../../context/ReturnContext';

export function CustomerReturns() {
  const { customer } = useOutletContext();
  const { returns } = useReturns();

  const customerReturns = useMemo(() => {
    if (!customer) return [];
    return returns.filter(r => r.customer?.email === customer.email || r.orderId === `ORD-${customer.id}`);
  }, [customer, returns]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Return History</h3>
        <span className="text-sm text-neutral-500">
          Total Returns: {customerReturns.length}
        </span>
      </div>

      <div className="border border-neutral-200 rounded-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 font-medium uppercase tracking-wider">
              <th className="p-4">Return ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4">Refund Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-neutral-200">
            {customerReturns.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-500">
                  No returns found for this customer.
                </td>
              </tr>
            ) : (
              customerReturns.map(ret => (
                <tr key={ret.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-900">
                    <div className="flex items-center">
                      <CornerUpLeft className="w-4 h-4 mr-2 text-neutral-400" />
                      {ret.id}
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600">{new Date(ret.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <Link to={`/admin/orders/${ret.orderId}`} className="text-primary hover:underline">
                      {ret.orderId}
                    </Link>
                  </td>
                  <td className="p-4 text-neutral-600">
                    {ret.items?.[0]?.reason || 'Unknown'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      ret.status === 'Completed' || ret.status === 'Received' ? 'bg-success-soft text-green-800' : 
                      ret.status === 'Requested' ? 'bg-indigo-100 text-indigo-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      ret.refundStatus === 'Completed' ? 'bg-success-soft text-green-800' : 
                      ret.refundStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {ret.refundStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
