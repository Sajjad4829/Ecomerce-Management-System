import React, { useState } from 'react';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Edit3, ArrowRightLeft } from 'lucide-react';

export default function StockMovementHistory() {
  const { movements, warehouses } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMovements = movements.filter(m => {
    const matchesSearch = m.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getMovementIcon = (type, quantity) => {
    if (type === 'Transfer In' || quantity > 0) return <ArrowUpRight className="w-5 h-5 text-success" />;
    if (type === 'Transfer Out' || quantity < 0) return <ArrowDownRight className="w-5 h-5 text-danger" />;
    if (type === 'Adjustment') return <Edit3 className="w-5 h-5 text-primary" />;
    return <ArrowRightLeft className="w-5 h-5 text-neutral-600" />;
  };

  const getWarehouseName = (id) => warehouses.find(w => w.id === id)?.name || id;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Stock Movements</h1>
          <p className="text-sm text-neutral-500 mt-1">Audit log of all inventory changes</p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search movements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-2 pr-8 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-surface"
          >
            <option value="all">All Types</option>
            <option value="Purchase">Purchase</option>
            <option value="Sale">Sale</option>
            <option value="Adjustment">Adjustment</option>
            <option value="Transfer In">Transfer In</option>
            <option value="Transfer Out">Transfer Out</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Product / SKU</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-right">Quantity</th>
                <th className="px-6 py-4 font-medium">User & Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-neutral-500 whitespace-nowrap">
                    {formatDate(movement.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getMovementIcon(movement.type, movement.quantity)}
                      <span className="font-medium text-neutral-900">{movement.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{movement.productName}</div>
                    <div className="text-xs text-neutral-500">{movement.sku}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {getWarehouseName(movement.warehouseId)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-medium ${movement.quantity > 0 ? 'text-success' : movement.quantity < 0 ? 'text-danger' : 'text-neutral-900'}`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">{movement.reason}</div>
                    <div className="text-xs text-neutral-500">by {movement.user}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMovements.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            No stock movements found.
          </div>
        )}
      </div>
    </div>
  );
}
