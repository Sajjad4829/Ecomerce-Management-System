import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Package, ExternalLink } from 'lucide-react';

export function CustomerOrders() {
  const { customer } = useOutletContext();

  const mockOrders = [
    { id: '10042', date: '2024-05-12T14:30:00Z', status: 'delivered', items: 2, total: 3450.00, payment: 'paid' },
    { id: '10021', date: '2023-11-20T08:15:00Z', status: 'delivered', items: 1, total: 890.00, payment: 'paid' },
    { id: '09854', date: '2023-06-15T11:45:00Z', status: 'returned', items: 1, total: 450.00, payment: 'refunded' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Order History</h3>
        <span className="text-sm text-neutral-500">Total Spent: ${customer.lifetimeValue.toFixed(2)}</span>
      </div>

      <div className="border border-neutral-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 font-medium uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-neutral-200">
            {mockOrders.map(order => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="p-4 font-medium text-neutral-900">#{order.id}</td>
                <td className="p-4 text-neutral-600">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-success-soft text-green-800' : 
                    order.status === 'returned' ? 'bg-danger-soft text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.payment === 'paid' ? 'bg-success-soft text-green-800' : 
                    order.payment === 'refunded' ? 'bg-neutral-200 text-neutral-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.payment}
                  </span>
                </td>
                <td className="p-4 text-neutral-600">{order.items}</td>
                <td className="p-4 font-medium text-neutral-900">${order.total.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <Link to={`/admin/orders/${order.id}`} className="text-primary hover:text-indigo-900 inline-flex items-center">
                    View <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
