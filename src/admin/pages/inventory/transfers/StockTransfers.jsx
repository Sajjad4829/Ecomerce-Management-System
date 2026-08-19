import React from 'react';
import { useInventory } from '../../../context/InventoryContext';
import DataTable from '../../../../components/cms/DataTable';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiDownload } from 'react-icons/fi';

export default function StockTransfers() {
  const { service } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Stock Transfers</h1>
          <p className="text-text-muted text-sm mt-1">Move inventory between warehouses</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiPlus /> New Transfer
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={service.getTransfers()}
          columns={[
            { key: 'id', label: 'Transfer ID' },
            { key: 'source', label: 'Source' },
            { key: 'destination', label: 'Destination' },
            { key: 'items', label: 'Items' },
            { key: 'quantities', label: 'Total Qty' },
            { key: 'status', label: 'Status', render: (val) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                val === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                val === 'Completed' ? 'bg-success-soft text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {val}
              </span>
            )},
            { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
          ]}
        />
      </div>
    </div>
  );
}
