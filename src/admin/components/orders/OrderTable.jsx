import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Package, XCircle } from 'lucide-react';

export default function OrderTable({ orders }) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getPaymentStyle = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-neutral-100 text-neutral-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 font-medium">Fulfillment</th>
              <th className="px-6 py-4 font-medium text-right">Total</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="text-neutral-900">{order.customerName}</div>
                  <div className="text-neutral-500 text-xs">{order.email}</div>
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${getPaymentStyle(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500 capitalize">
                  {order.fulfillmentStatus}
                </td>
                <td className="px-6 py-4 text-right font-medium text-neutral-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1.5 text-neutral-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                      title="Fulfillment"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                    {order.status !== 'cancelled' && (
                      <button 
                        className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Cancel Order"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <div className="p-8 text-center text-neutral-500">
          No orders found.
        </div>
      )}
    </div>
  );
}
