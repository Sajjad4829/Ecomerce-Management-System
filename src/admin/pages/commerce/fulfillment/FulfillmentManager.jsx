import React, { useState } from 'react';
import { FiSearch, FiFilter, FiBox, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOrders } from '../../../context/OrderContext';

export default function FulfillmentManager() {
  const { orders } = useOrders();
  const [statusFilter, setStatusFilter] = useState('Unfulfilled');
  
  // Filter for orders that require fulfillment actions
  const fulfillableOrders = orders.filter(o => o.status !== 'Cancelled' && o.status !== 'On Hold');

  const filteredOrders = fulfillableOrders.filter(order => {
    if (statusFilter === 'All') return true;
    return order.fulfillmentStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fulfillment</h1>
          <p className="text-sm text-text-muted mt-1">Manage picking, packing, and shipping operations.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setStatusFilter('Unfulfilled')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors \${statusFilter === 'Unfulfilled' ? 'bg-[#1A1A1A] text-white' : 'text-text-secondary hover:bg-gray-100'}`}
            >
              Unfulfilled
            </button>
            <button 
              onClick={() => setStatusFilter('Processing')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors \${statusFilter === 'Processing' ? 'bg-[#1A1A1A] text-white' : 'text-text-secondary hover:bg-gray-100'}`}
            >
              Processing
            </button>
             <button 
              onClick={() => setStatusFilter('All')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors \${statusFilter === 'All' ? 'bg-[#1A1A1A] text-white' : 'text-text-secondary hover:bg-gray-100'}`}
            >
              All
            </button>
          </div>
           <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Shipping Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                    No orders require fulfillment matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-background">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/orders/\${order.id}`} className="font-medium text-text-primary hover:text-primary">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      {order.shippingMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full \${
                        order.fulfillmentStatus === 'Fulfilled' ? 'bg-success-soft text-green-800' :
                        order.fulfillmentStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.fulfillmentStatus === 'Unfulfilled' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/fulfillment/\${order.id}`} className="text-primary hover:text-indigo-900 flex items-center justify-end gap-1">
                         {order.fulfillmentStatus === 'Unfulfilled' ? (
                           <><FiBox size={16}/> Start Fulfillment</>
                         ) : (
                           <><FiTruck size={16}/> Manage</>
                         )}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
