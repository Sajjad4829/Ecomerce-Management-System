import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiSearch, FiFilter, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_LOW_STOCK = [
  { id: '1', product: 'Meridian Dining Table', variant: 'Walnut / 8 Seater', sku: 'MER-DT-WAL-8', warehouse: 'East Coast Center', onHand: 0, incoming: 15, threshold: 5, status: 'out-of-stock' },
  { id: '2', product: 'Oasis Lounge Chair', variant: 'Tan / Leather', sku: 'OAS-LC-TAN-LTH', warehouse: 'Main Hub - LA', onHand: 8, incoming: 0, threshold: 10, status: 'low-stock' },
  { id: '3', product: 'Apex Standing Desk', variant: 'White / 60"', sku: 'APX-SD-WHT-60', warehouse: 'East Coast Center', onHand: 12, incoming: 50, threshold: 15, status: 'low-stock' }
];

export default function LowStockManager() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-mono text-[10px] uppercase font-bold flex items-center gap-1">
              <FiAlertTriangle size={10} /> Action Required
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">Low Stock Alerts</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Review items that have fallen below their minimum stock thresholds or are completely out of stock.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search SKU or product..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#F7F5F2] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-80"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-[#F7F5F2] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
            <FiFilter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Product & SKU</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider text-right">Current Stock</th>
                <th className="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider text-right">Incoming</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_LOW_STOCK.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    {item.status === 'out-of-stock' ? (
                      <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs font-bold rounded">
                        Critical
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded">
                        Warning
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-[#1A1A1A]">{item.product}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{item.variant}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">
                        {item.sku}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-600">{item.warehouse}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-xl font-bold ${item.onHand === 0 ? 'text-red-600' : 'text-[#1A1A1A]'}`}>
                        {item.onHand}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                        Threshold: {item.threshold}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-bold text-blue-600">{item.incoming > 0 ? `+${item.incoming}` : '-'}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-1">
                        View <FiArrowRight size={12} />
                      </button>
                    </div>
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
