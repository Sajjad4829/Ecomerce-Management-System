import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiMapPin, FiBox, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_WAREHOUSES = [
  { id: '1', name: 'Main Hub - LA', code: 'WH-LAX', location: 'Los Angeles, CA, USA', skus: 1245, units: 14200, status: 'active', isDefault: true },
  { id: '2', name: 'East Coast Center', code: 'WH-EWR', location: 'Newark, NJ, USA', skus: 890, units: 3500, status: 'active', isDefault: false },
  { id: '3', name: 'EU Distribution Hub', code: 'WH-AMS', location: 'Amsterdam, NL', skus: 450, units: 545, status: 'active', isDefault: false },
  { id: '4', name: 'New York Retail', code: 'RT-NYC', location: 'New York, NY, USA', skus: 120, units: 0, status: 'inactive', isDefault: false }
];

export default function WarehouseManager() {
  const [searchQuery, setSearchQuery] = useState('');

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
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Warehouses & Locations</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage your physical fulfillment centers, retail stores, and stock locations.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/admin/catalog/warehouses/new"
            className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
          >
            <FiPlus size={16} /> Add Warehouse
          </Link>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search locations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 w-full md:w-80"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {MOCK_WAREHOUSES.map(warehouse => (
            <Link 
              key={warehouse.id} 
              to={`/admin/catalog/warehouses/${warehouse.id}`}
              className="block bg-surface border border-black/10 rounded-xl p-6 hover:border-black/30 hover:shadow-md transition-all group relative overflow-hidden"
            >
              {warehouse.isDefault && (
                <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-bl-lg">
                  Default
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {warehouse.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-text-secondary border border-border">
                      {warehouse.code}
                    </span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${warehouse.status === 'active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-text-muted group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                  <FiArrowRight size={20} />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                <FiMapPin className="text-text-muted" />
                {warehouse.location}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                <div>
                  <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Active SKUs</p>
                  <p className="text-lg font-bold text-text-primary mt-1">{warehouse.skus.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-text-muted uppercase">Total Units</p>
                  <p className="text-lg font-bold text-text-primary mt-1">{warehouse.units.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
