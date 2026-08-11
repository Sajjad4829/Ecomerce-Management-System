import React, { useState } from 'react';
import { useOrders } from '../../context/orders/OrderContext';
import OrderTable from '../../components/orders/OrderTable';
import { Search, Filter, Download } from 'lucide-react';

export default function OrderDashboard() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Orders</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage and fulfill customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-neutral-600 bg-surface border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Total Orders</p>
          <p className="text-2xl font-serif text-neutral-900">{orders.length}</p>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Processing</p>
          <p className="text-2xl font-serif text-primary">
            {orders.filter(o => o.status === 'processing').length}
          </p>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Ready to Fulfill</p>
          <p className="text-2xl font-serif text-warning">
            {orders.filter(o => o.fulfillmentStatus === 'unfulfilled' && o.status !== 'cancelled').length}
          </p>
        </div>
        <div className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Revenue Placeholder</p>
          <p className="text-2xl font-serif text-success">
            ${orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-2 pr-8 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-surface"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <OrderTable orders={filteredOrders} />
    </div>
  );
}
