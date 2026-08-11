import React from 'react';
import { useInventory } from '../../../context/InventoryContext';
import DataTable from '../../../../components/cms/DataTable';
import { useNavigate } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

export default function SKUManager() {
  const { service } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">SKU Management</h1>
          <p className="text-gray-500 text-sm mt-1">Enterprise stock keeping units</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
          <FiDownload /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <DataTable 
          data={service.getSKUs()}
          searchPlaceholder="Search SKUs, products..."
          columns={[
            { key: 'id', label: 'SKU' },
            { key: 'product', label: 'Product' },
            { key: 'variant', label: 'Variant' },
            { key: 'available', label: 'Available' },
            { key: 'reserved', label: 'Reserved' },
            { key: 'incoming', label: 'Incoming' },
            { key: 'status', label: 'Status', render: (val) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                val === 'In Stock' ? 'bg-green-100 text-green-800' :
                val === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {val}
              </span>
            )}
          ]}
          onRowClick={(row) => navigate(`/admin/inventory/skus/${row.id}`)}
        />
      </div>
    </div>
  );
}
