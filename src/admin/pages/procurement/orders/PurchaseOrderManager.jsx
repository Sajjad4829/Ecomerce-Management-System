import React, { useState } from 'react';
import { useProcurement } from '../../../context/procurement/ProcurementContext';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ExternalLink } from 'lucide-react';

export const PurchaseOrderManager = () => {
  const { purchaseOrders, suppliers } = useProcurement();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = purchaseOrders.filter(po => 
    po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    po.supplierId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSupplierName = (id) => suppliers.find(s => s.id === id)?.name || id;

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Draft': return 'bg-neutral-100 text-neutral-600';
      case 'Pending Approval': return 'bg-amber-100 text-amber-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Sent': 
      case 'Acknowledged': return 'bg-blue-100 text-blue-800';
      case 'Partially Received': return 'bg-indigo-100 text-indigo-800';
      case 'Received':
      case 'Closed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Purchase Orders</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage purchasing lifecycle and approvals</p>
        </div>
        <button className="px-4 py-2 text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create PO
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PO number or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <button className="px-3 py-2 border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">PO Number</th>
                <th className="px-6 py-4 font-medium">Supplier</th>
                <th className="px-6 py-4 font-medium">Expected</th>
                <th className="px-6 py-4 font-medium text-right">Total*</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredOrders.map((po) => (
                <tr key={po.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {po.poNumber}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {getSupplierName(po.supplierId)}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {po.expectedDate}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-900">
                    ${po.totalAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/admin/procurement/purchase-orders/${po.id}`)}
                      className="inline-flex items-center justify-center p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            No purchase orders found.
          </div>
        )}
      </div>
      <p className="text-xs text-neutral-400 text-right">*Financial totals are backend-dependent placeholders</p>
    </div>
  );
};
