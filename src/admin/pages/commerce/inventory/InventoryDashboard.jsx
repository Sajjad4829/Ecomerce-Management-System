import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiBox, FiAlertCircle, FiArrowRight, FiDownload, FiMapPin, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import InventoryStatusBadge from '../../../components/commerce/inventory/InventoryStatusBadge';
import StockAdjustmentModal from '../../../components/commerce/inventory/StockAdjustmentModal';
import StockTransferModal from '../../../components/commerce/inventory/StockTransferModal';

const MOCK_INVENTORY = [
  { id: '1', product: 'Oasis Lounge Chair', variant: 'Black / Leather', sku: 'OAS-LC-BLK-LTH', warehouse: 'Main Hub - LA', onHand: 45, reserved: 5, incoming: 20, threshold: 10, status: 'in-stock', updated: '2h ago' },
  { id: '2', product: 'Oasis Lounge Chair', variant: 'Tan / Leather', sku: 'OAS-LC-TAN-LTH', warehouse: 'Main Hub - LA', onHand: 8, reserved: 2, incoming: 0, threshold: 10, status: 'low-stock', updated: '1d ago' },
  { id: '3', product: 'Meridian Dining Table', variant: 'Walnut / 8 Seater', sku: 'MER-DT-WAL-8', warehouse: 'East Coast Center', onHand: 0, reserved: 0, incoming: 15, threshold: 5, status: 'out-of-stock', updated: '3d ago' },
  { id: '4', product: 'Horizon Bookshelf', variant: 'Oak', sku: 'HOR-BS-OAK', warehouse: 'Main Hub - LA', onHand: 120, reserved: 15, incoming: 0, threshold: 20, status: 'in-stock', updated: '5h ago' },
  { id: '5', product: 'Apex Standing Desk', variant: 'White / 60"', sku: 'APX-SD-WHT-60', warehouse: 'East Coast Center', onHand: 12, reserved: 10, incoming: 50, threshold: 15, status: 'low-stock', updated: '10m ago' }
];

export default function InventoryDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAdjustClick = (item) => {
    setSelectedItem(item);
    setAdjustModalOpen(true);
  };

  const handleTransferClick = (item) => {
    setSelectedItem(item);
    setTransferModalOpen(true);
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
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Inventory Management</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Track stock levels, manage reservations, and coordinate warehouse transfers across your catalog.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/admin/catalog/inventory/movements"
            className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2"
          >
            <FiArrowRight size={16} /> Activity
          </Link>
          <Link 
            to="/admin/catalog/inventory/low-stock"
            className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2"
          >
            <FiAlertCircle size={16} /> Alerts
          </Link>
          <Link 
            to="/admin/catalog/warehouses"
            className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2"
          >
            <FiMapPin size={16} /> Warehouses
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Stock Units', value: '18,245', icon: FiBox, color: 'text-text-primary', bg: 'bg-gray-100' },
          { label: 'Available Units', value: '16,500', icon: FiArrowRight, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Reserved Units', value: '1,745', icon: FiTruck, color: 'text-primary', bg: 'bg-blue-50' },
          { label: 'Low/Out of Stock', value: '24', icon: FiAlertCircle, color: 'text-danger', bg: 'bg-danger-soft' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-black/5 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
              <stat.icon className={`${stat.color}`} size={20} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {['all', 'in-stock', 'low-stock', 'out-of-stock'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize whitespace-nowrap ${
                  activeTab === tab ? 'bg-background text-text-primary' : 'text-text-muted hover:bg-background'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search SKU or product..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-64"
              />
            </div>
            <button className="px-4 py-2 bg-background text-text-primary rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
              <FiFilter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-black/5">
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Product / Variant</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">SKU</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Warehouse</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Available</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Reserved</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">On Hand</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {MOCK_INVENTORY.map(item => (
                <tr key={item.id} className="hover:bg-background transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-text-primary">{item.product}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.variant}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-text-secondary border border-border">
                      {item.sku}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-text-muted" size={14} />
                      <span className="text-sm text-text-secondary">{item.warehouse}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-bold text-text-primary">{item.onHand - item.reserved}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-text-muted">{item.reserved}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-text-primary">{item.onHand}</span>
                  </td>
                  <td className="p-4">
                    <InventoryStatusBadge status={item.status} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleAdjustClick(item)}
                        className="text-xs font-medium text-primary hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md"
                      >
                        Adjust
                      </button>
                      <button 
                        onClick={() => handleTransferClick(item)}
                        className="text-xs font-medium text-text-secondary hover:text-text-primary bg-gray-100 px-3 py-1.5 rounded-md"
                      >
                        Transfer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {adjustModalOpen && (
        <StockAdjustmentModal 
          isOpen={adjustModalOpen} 
          onClose={() => setAdjustModalOpen(false)} 
          item={selectedItem} 
        />
      )}
      
      {transferModalOpen && (
        <StockTransferModal 
          isOpen={transferModalOpen} 
          onClose={() => setTransferModalOpen(false)} 
          item={selectedItem} 
        />
      )}
    </div>
  );
}
