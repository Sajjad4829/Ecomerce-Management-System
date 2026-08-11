import React, { useState } from 'react';
import { useInventory } from '../../context/inventory/InventoryContext';
import InventoryTable from '../../components/inventory/InventoryTable';
import { Search, Filter, Download } from 'lucide-react';

export default function InventoryDashboard() {
  const { inventory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAvailable = inventory.reduce((sum, item) => sum + item.available, 0);
  const totalReserved = inventory.reduce((sum, item) => sum + item.reserved, 0);
  const lowStockCount = inventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter(item => item.status === 'Out of Stock').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Inventory Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage stock across all locations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-neutral-600 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Available Stock Units</p>
          <p className="text-2xl font-serif text-neutral-900">{totalAvailable}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Reserved Stock Units</p>
          <p className="text-2xl font-serif text-blue-600">{totalReserved}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Low Stock Items</p>
          <p className="text-2xl font-serif text-amber-600">{lowStockCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Out of Stock Items</p>
          <p className="text-2xl font-serif text-red-600">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
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
              className="pl-2 pr-8 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <InventoryTable inventory={filteredInventory} />
    </div>
  );
}
