import React from 'react';
import { useAfterSales } from '../../../context/after-sales/AfterSalesContext';
import { MoreVertical, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReturnCenter() {
  const { returns } = useAfterSales();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'bg-success-soft text-green-800';
      case 'Requested': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-danger-soft text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Returns Center</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage customer return requests and processing</p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search returns..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <button className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Return ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {returns.map(ret => (
              <tr key={ret.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{ret.id}</td>
                <td className="px-6 py-4 text-neutral-600">{ret.customerName}</td>
                <td className="px-6 py-4 text-neutral-600">{ret.productName}</td>
                <td className="px-6 py-4 text-neutral-600">{ret.reason}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(ret.status)}`}>
                    {ret.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(ret.requestedDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded inline-block">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
