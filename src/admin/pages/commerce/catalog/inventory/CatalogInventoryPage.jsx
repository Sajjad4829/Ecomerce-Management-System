import React, { useState } from 'react';
import { useInventory } from '../../../../context/inventory/InventoryContext';
import { Search, Filter, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CatalogInventoryPage() {
  const { inventory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-success-soft text-green-800';
      case 'Low Stock': return 'bg-warning-soft text-amber-800';
      case 'Out of Stock': return 'bg-danger-soft text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center">
          <Link to="/admin/catalog" className="hover:text-primary transition-colors">Catalog</Link> 
          <span className="mx-2 text-neutral-300">&gt;</span> 
          <span className="text-neutral-600">Inventory</span>
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Catalog Inventory</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage product stock and availability directly from the catalog workspace.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <p className="text-sm text-text-secondary mb-1">Catalog Items Tracked</p>
          <p className="text-2xl font-serif text-text-primary">{inventory.length}</p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <p className="text-sm text-text-secondary mb-1">Total Available Units</p>
          <p className="text-2xl font-serif text-text-primary">
            {inventory.reduce((sum, item) => sum + item.available, 0)}
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <p className="text-sm text-text-secondary mb-1">Items Needing Attention</p>
          <p className="text-2xl font-serif text-warning">
            {inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface p-4 rounded-xl border border-black/5 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-2 pr-8 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-surface text-sm text-text-primary"
            >
              <option value="all">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50/50 border-b border-black/5 text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Product / SKU</th>
                <th className="px-6 py-4 font-medium">Warehouse</th>
                <th className="px-6 py-4 font-medium text-right">Available</th>
                <th className="px-6 py-4 font-medium text-right">Reserved</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{item.productName}</div>
                    <div className="text-xs text-text-secondary">{item.sku}</div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {item.warehouseName}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-text-primary">
                    {item.available}
                  </td>
                  <td className="px-6 py-4 text-right text-text-secondary">
                    {item.reserved}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Link 
                        to={`/admin/catalog/products/${item.productId}`}
                        className="text-primary hover:text-primary-dark font-medium text-xs"
                      >
                        View Product
                      </Link>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-secondary">
                    <Box className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                    <p>No catalog inventory records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
