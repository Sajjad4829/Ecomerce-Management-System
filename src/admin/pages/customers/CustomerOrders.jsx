import React, { useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useOrders } from '../../context/orders/OrderContext';

export function CustomerOrders() {
  const { customer } = useOutletContext();
  const { orders } = useOrders();

  const customerOrders = useMemo(() => {
    if (!customer) return [];
    return orders.filter(o => o.customerId === customer.id || o.customer?.email === customer.email);
  }, [customer, orders]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-neutral-900">Order History</h3>
        <span className="text-sm text-neutral-500">
          Total Orders: {customerOrders.length}
        </span>
      </div>

      <div className="border border-neutral-200 rounded-md overflow-hidden bg-white">
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
            {customerOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-neutral-500">
                  No orders found for this customer.
                </td>
              </tr>
            ) : (
              customerOrders.map(order => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-900">{order.orderNumber || order.id}</td>
                  <td className="p-4 text-neutral-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' || order.status === 'Completed' ? 'bg-success-soft text-green-800' : 
                      order.status === 'Cancelled' ? 'bg-error-soft text-error' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'Paid' ? 'bg-success-soft text-green-800' : 
                      order.paymentStatus === 'Refunded' ? 'bg-neutral-200 text-neutral-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">{order.items ? order.items.length : 0}</td>
                  <td className="p-4 font-medium text-neutral-900">৳{order.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/orders/${order.id}`} className="text-primary hover:text-indigo-900 inline-flex items-center">
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
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
