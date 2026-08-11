import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useReturns } from '../../../context/ReturnContext';
import ReturnTable from '../../../components/returns/ReturnTable';

export default function ReturnManager() {
  const { returns } = useReturns();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = 
      ret.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ret.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ret.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Returns</h1>
          <p className="text-sm text-text-muted mt-1">Manage customer return requests and reverse logistics.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by Return ID, Order, or Customer..." 
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
              <option value="Requested">Requested</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Inspection Pending">Inspection Pending</option>
              <option value="Inspection Completed">Inspection Completed</option>
              <option value="Resolution Pending">Resolution Pending</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <ReturnTable returns={filteredReturns} />
      </div>
    </div>
  );
}
