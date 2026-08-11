import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useOrders } from '../../../admin/context/OrderContext';

export default function OrderHistory() {
  const { orders } = useOrders();

  // For frontend mock, filter orders belonging to the logged-in customer.
  // We'll mock that the current customer is 'CUST-001'
  const customerOrders = orders.filter(o => o.customer.id === 'CUST-001');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Order History</h1>
        <p className="text-sm text-gray-500 mt-1">View and track your previous orders.</p>
      </div>

      <div className="space-y-6">
        {customerOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/10 p-12 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <FiShoppingBag size={24} className="text-gray-400" />
             </div>
             <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">No orders yet</h2>
             <p className="text-sm text-gray-500 mb-6">When you place an order, it will appear here.</p>
             <Link to="/products" className="px-6 py-3 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition-colors inline-block">
               Start Shopping
             </Link>
          </div>
        ) : (
          customerOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-black/10 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Number</p>
                    <p className="font-medium text-[#1A1A1A]">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Placed</p>
                    <p className="font-medium text-[#1A1A1A]">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                   <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</p>
                    <p className="font-medium text-[#1A1A1A]">${order.totals.grandTotal.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider \${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <Link to="#" className="font-medium text-[#1A1A1A] hover:underline">{item.product}</Link>
                        <p className="text-sm text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                         <p className="font-medium text-[#1A1A1A]">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
