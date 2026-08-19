import React, { useState } from 'react';
import { useInventory } from '../../../../context/inventory/InventoryContext';
import DataTable from '../../../../../components/cms/DataTable';
import { Search, MapPin, Box } from 'lucide-react';

export default function CatalogWarehousesPage() {
  const { service } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch from the operational data layer
  const warehouses = service?.getWarehouses ? service.getWarehouses() : [];

  const filteredWarehouses = warehouses.filter(wh => 
    wh.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    wh.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wh.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header aligned with CatalogContext styling */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted font-medium text-sm">Catalog</span>
            <span className="text-text-muted text-sm">/</span>
            <span className="text-text-primary font-medium text-sm">Warehouses</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Catalog Warehouses</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            View distribution centers and physical stock hubs available for catalog items.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search warehouses by name, code, or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border-transparent rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20 focus:ring-1 focus:ring-black/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
           {/* Catalog context does not create new warehouses, operational inventory module does that */}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={filteredWarehouses}
          columns={[
            { 
              key: 'name', 
              label: 'Warehouse',
              render: (val, row) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center text-black/40">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{val}</div>
                    <div className="text-xs text-text-muted mt-0.5">{row.code}</div>
                  </div>
                </div>
              )
            },
            { 
              key: 'location', 
              label: 'Location',
              render: (val) => (
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  {val}
                </div>
              )
            },
            { 
              key: 'skuCount', 
              label: 'Assigned SKUs',
              render: (val) => <span className="font-medium text-text-primary">{val}</span>
            },
            { 
              key: 'stock', 
              label: 'Total Stock Volume', 
              render: (val) => <span className="text-text-secondary">{val?.toLocaleString()} units</span>
            },
            { 
              key: 'status', 
              label: 'Status', 
              render: (val) => (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  val === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {val}
                </span>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}
