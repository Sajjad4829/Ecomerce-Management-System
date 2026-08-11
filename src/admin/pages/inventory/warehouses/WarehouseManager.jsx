import React from 'react';
import { useInventory } from '../../../context/InventoryContext';
import DataTable from '../../../../components/cms/DataTable';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiDownload } from 'react-icons/fi';

export default function WarehouseManager() {
  const { service } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Warehouses</h1>
          <p className="text-text-muted text-sm mt-1">Manage locations and stock distribution</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
          <button onClick={() => navigate('/admin/inventory/warehouses/new')} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiPlus /> New Warehouse
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={service.getWarehouses()}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'code', label: 'Code' },
            { key: 'location', label: 'Location' },
            { key: 'skuCount', label: 'SKUs' },
            { key: 'stock', label: 'Total Stock', render: (val) => val.toLocaleString() },
            { key: 'status', label: 'Status', render: (val) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                val === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {val}
              </span>
            )}
          ]}
          onRowClick={(row) => navigate(`/admin/inventory/warehouses/${row.id}`)}
        />
      </div>
    </div>
  );
}
