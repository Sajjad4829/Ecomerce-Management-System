import React, { useState, useMemo } from 'react';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Edit3, ArrowRightLeft, PackagePlus, PackageMinus, Download } from 'lucide-react';

export default function StockMovementHistory() {
  const { movements, warehouses } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMovements = useMemo(() => {
    return movements.filter(m => {
      const matchesSearch = 
        (m.productName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
        (m.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (m.reason?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || m.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [movements, searchTerm, typeFilter]);

  const getMovementIcon = (type, quantity) => {
    if (type === 'Transfer In' || (type === 'Adjustment' && quantity > 0) || type === 'Purchase') {
      return <ArrowUpRight className="w-5 h-5 text-success" />;
    }
    if (type === 'Transfer Out' || (type === 'Adjustment' && quantity < 0) || type === 'Sale' || type === 'Damage') {
      return <ArrowDownRight className="w-5 h-5 text-danger" />;
    }
    if (type === 'Opening Stock') return <PackagePlus className="w-5 h-5 text-primary" />;
    return <ArrowRightLeft className="w-5 h-5 text-neutral-600" />;
  };

  const getMovementColor = (quantity) => {
    if (quantity > 0) return 'text-success bg-success/10 border-success/20';
    if (quantity < 0) return 'text-danger bg-danger/10 border-danger/20';
    return 'text-neutral-600 bg-neutral-100 border-neutral-200';
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Stock Movement Ledger</h1>
          <p className="text-sm text-neutral-500 mt-1">Comprehensive audit trail of all inventory changes</p>
        </div>
        <button className="px-4 py-2 bg-surface text-neutral-600 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
          <Download className="w-4 h-4" /> Export Ledger
        </button>
      </div>

      <div className="bg-surface p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product, SKU, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-neutral-500 hidden sm:block" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-sm"
          >
            <option value="all">All Movement Types</option>
            <option value="Purchase">Purchase</option>
            <option value="Sale">Sale</option>
            <option value="Increase">Adjustment (Increase)</option>
            <option value="Decrease">Adjustment (Decrease)</option>
            <option value="Damage">Damage</option>
            <option value="Transfer In">Transfer In</option>
            <option value="Transfer Out">Transfer Out</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Product Details</th>
                <th className="px-6 py-4 font-medium">Warehouse Location</th>
                <th className="px-6 py-4 font-medium text-right">Quantity</th>
                <th className="px-6 py-4 font-medium">Reason & User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    <p className="text-base font-medium text-neutral-900">No movements found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                  </td>
                </tr>
              ) : (
                filteredMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4 text-neutral-600">
                      {formatDate(movement.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-neutral-100">
                          {getMovementIcon(movement.type, movement.quantity)}
                        </div>
                        <span className="font-medium text-neutral-900">{movement.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{movement.productName}</div>
                      <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-2">
                        <span>{movement.sku}</span>
                        {movement.variant && (
                          <>
                            <span>&bull;</span>
                            <span>{movement.variant}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200/60">
                        {getWarehouseName(movement.warehouseId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border font-medium ${getMovementColor(movement.quantity)}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-900">{movement.reason || '-'}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">by {movement.user || 'System'}</div>
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
