import React from 'react';
import { useInventory } from '../../../context/InventoryContext';
import DataTable from '../../../../components/cms/DataTable';
import { useNavigate } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

export default function StockMovements() {
  const { service } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Stock Movements</h1>
          <p className="text-text-muted text-sm mt-1">Audit trail of all inventory changes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
          <FiDownload /> Export
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={service.getMovements()}
          searchPlaceholder="Search reference, SKU..."
          columns={[
            { key: 'id', label: 'Movement ID' },
            { key: 'sku', label: 'SKU' },
            { key: 'warehouse', label: 'Warehouse' },
            { key: 'type', label: 'Type' },
            { key: 'quantity', label: 'Qty', render: (val) => <span className={val > 0 ? 'text-success' : 'text-danger'}>{val > 0 ? `+${val}` : val}</span> },
            { key: 'reference', label: 'Reference' },
            { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
          ]}
        />
      </div>
    </div>
  );
}
