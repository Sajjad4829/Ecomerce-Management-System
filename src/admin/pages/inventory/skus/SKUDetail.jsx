import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../../context/InventoryContext';
import { FiArrowLeft, FiEdit2, FiMove } from 'react-icons/fi';
import DataTable from '../../../../components/cms/DataTable';

export default function SKUDetail() {
  const { skuId } = useParams();
  const navigate = useNavigate();
  const { service } = useInventory();
  const [sku, setSku] = useState(null);

  useEffect(() => {
    const found = service.getSKUs().find(s => s.id === skuId);
    setSku(found);
  }, [skuId, service]);

  if (!sku) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/inventory/skus')} className="text-gray-400 hover:text-black">
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{sku.id}</h1>
          <p className="text-gray-500 text-sm mt-1">{sku.product} - {sku.variant}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button onClick={() => navigate('/admin/inventory/transfers')} className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiMove /> Transfer
          </button>
          <button onClick={() => navigate('/admin/inventory/adjustments')} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiEdit2 /> Adjust Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="font-medium text-gray-500 mb-2">Available</h3>
          <p className="text-3xl font-bold">{sku.available}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="font-medium text-gray-500 mb-2">Reserved</h3>
          <p className="text-3xl font-bold">{sku.reserved}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="font-medium text-gray-500 mb-2">Incoming</h3>
          <p className="text-3xl font-bold">{sku.incoming}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="font-medium text-gray-500 mb-2">Reorder Level</h3>
          <p className="text-3xl font-bold">{sku.reorderLevel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/5">
            <h3 className="font-medium text-lg">Recent Movements</h3>
          </div>
          <DataTable 
            data={service.getMovements().filter(m => m.sku === skuId)}
            columns={[
              { key: 'type', label: 'Type' },
              { key: 'quantity', label: 'Qty', render: (val) => <span className={val > 0 ? 'text-green-600' : 'text-red-600'}>{val > 0 ? `+${val}` : val}</span> },
              { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
            ]}
          />
        </div>

        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
          <h3 className="font-medium text-lg mb-4">Warehouse Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-black/10 rounded-lg">
              <div>
                <h4 className="font-medium">West Coast Distribution Center</h4>
                <p className="text-sm text-gray-500">Available: {sku.available}</p>
              </div>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
