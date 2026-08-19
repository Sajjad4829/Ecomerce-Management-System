import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiDownload, FiArrowUpRight, FiArrowDownRight, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

const MOCK_MOVEMENTS = [
  { id: 'TRX-9821', date: '2026-08-08 09:14 AM', product: 'Oasis Lounge Chair', variant: 'Black / Leather', sku: 'OAS-LC-BLK-LTH', type: 'transfer', quantity: -5, warehouse: 'Main Hub - LA', reference: 'TRF-LA-EC-001', user: 'System', status: 'in-transit' },
  { id: 'TRX-9820', date: '2026-08-07 16:30 PM', product: 'Meridian Dining Table', variant: 'Walnut / 8 Seater', sku: 'MER-DT-WAL-8', type: 'reservation', quantity: -1, warehouse: 'East Coast Center', reference: 'ORD-55492', user: 'API', status: 'completed' },
  { id: 'TRX-9819', date: '2026-08-07 14:15 PM', product: 'Horizon Bookshelf', variant: 'Oak', sku: 'HOR-BS-OAK', type: 'stock-in', quantity: +50, warehouse: 'Main Hub - LA', reference: 'PO-2026-08-A', user: 'Sarah J.', status: 'completed' },
  { id: 'TRX-9818', date: '2026-08-06 11:20 AM', product: 'Apex Standing Desk', variant: 'White / 60"', sku: 'APX-SD-WHT-60', type: 'adjustment', quantity: -2, warehouse: 'East Coast Center', reference: 'Damaged during forklift', user: 'Mike R.', status: 'completed' },
];

export default function StockMovements() {
  const [searchQuery, setSearchQuery] = useState('');

  const getMovementIcon = (type, quantity) => {
    switch (type) {
      case 'stock-in': return <FiArrowDownRight className="text-success" />;
      case 'stock-out': return <FiArrowUpRight className="text-danger" />;
      case 'transfer': return <FiRefreshCw className="text-primary" />;
      case 'reservation': return <FiArrowUpRight className="text-purple-600" />;
      case 'adjustment': return quantity > 0 ? <FiArrowDownRight className="text-success" /> : <FiAlertTriangle className="text-warning" />;
      default: return <FiRefreshCw className="text-text-muted" />;
    }
  };

  const getMovementLabel = (type) => {
    switch (type) {
      case 'stock-in': return 'Received';
      case 'stock-out': return 'Fulfilled';
      case 'transfer': return 'Transfer';
      case 'reservation': return 'Reserved';
      case 'adjustment': return 'Adjustment';
      default: return type;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-warning-soft text-amber-900 font-mono text-[10px] uppercase font-bold">
              Commerce Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Stock Movements</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Immutable audit log of all inventory changes, transfers, and reservations.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2">
            <FiDownload size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search SKU, reference, or user..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-80"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-background text-text-primary rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
            <FiFilter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Transaction</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Product & SKU</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Warehouse</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Qty Change</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Reference & User</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_MOVEMENTS.map(movement => (
                <tr key={movement.id} className="hover:bg-background transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        movement.type === 'stock-in' ? 'bg-success-soft' :
                        movement.type === 'stock-out' ? 'bg-danger-soft' :
                        movement.type === 'transfer' ? 'bg-blue-50' :
                        movement.type === 'reservation' ? 'bg-purple-50' :
                        'bg-warning-soft'
                      }`}>
                        {getMovementIcon(movement.type, movement.quantity)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{getMovementLabel(movement.type)}</p>
                        <p className="text-xs text-text-muted font-mono mt-0.5">{movement.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-text-primary">{movement.product}</p>
                    <p className="text-xs text-text-muted font-mono mt-0.5">{movement.sku}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text-secondary">{movement.warehouse}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${movement.quantity > 0 ? 'text-success' : 'text-text-primary'}`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-text-primary">{movement.reference}</p>
                    <p className="text-xs text-text-muted mt-0.5">{movement.user} • {movement.date}</p>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      movement.status === 'completed' ? 'bg-success-soft text-green-800' :
                      movement.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {movement.status.replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
