import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOrders } from '../../../context/OrderContext';
import OrderTable from '../../../components/orders/OrderTable';

export default function OrderManager() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
          <p className="text-sm text-text-muted mt-1">Manage and process customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2">
            <FiDownload size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FiFilter className="text-text-muted" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <OrderTable orders={filteredOrders} />
      </div>
    </div>
  );
}
