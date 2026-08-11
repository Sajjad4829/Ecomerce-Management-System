import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../../context/inventory/InventoryContext';
import { Plus, Building2, MapPin, Edit3 } from 'lucide-react';

export default function WarehouseCenter() {
  const { warehouses } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Warehouse Center</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage warehouse locations and capacity</p>
        </div>
        <button 
          onClick={() => navigate('/admin/inventory/warehouses/new')}
          className="px-4 py-2 text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-surface p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neutral-50 text-neutral-600 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                warehouse.status === 'active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
              }`}>
                {warehouse.status}
              </span>
            </div>
            
            <h3 className="text-lg font-medium text-neutral-900">{warehouse.name}</h3>
            <p className="text-sm text-neutral-500 mt-1 mb-4 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {warehouse.location}
            </p>
            
            <div className="mt-auto space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-500">Capacity Used</span>
                  <span className="font-medium text-neutral-900">
                    {Math.round((warehouse.used / warehouse.capacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${Math.min(100, (warehouse.used / warehouse.capacity) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-right">
                  {warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()} units
                </p>
              </div>
              
              <div className="pt-4 border-t border-neutral-100 flex gap-2">
                <button 
                  onClick={() => navigate(`/admin/inventory/warehouses/${warehouse.id}`)}
                  className="flex-1 py-2 text-sm text-neutral-900 border border-neutral-200 rounded hover:bg-neutral-50 transition-colors"
                >
                  View Detail
                </button>
                <button 
                  onClick={() => navigate(`/admin/inventory/warehouses/${warehouse.id}/edit`)}
                  className="p-2 text-neutral-500 border border-neutral-200 rounded hover:text-primary hover:bg-primary-soft transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
