import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit3, ArrowRightLeft, History } from 'lucide-react';

export default function InventoryTable({ inventory }) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-success-soft text-green-800';
      case 'Low Stock': return 'bg-warning-soft text-amber-800';
      case 'Out of Stock': return 'bg-danger-soft text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Product / SKU</th>
              <th className="px-6 py-4 font-medium">Warehouse</th>
              <th className="px-6 py-4 font-medium text-right">Available</th>
              <th className="px-6 py-4 font-medium text-right">Reserved</th>
              <th className="px-6 py-4 font-medium text-right">Reorder Level</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{item.productName}</div>
                  <div className="text-xs text-neutral-500">{item.sku}</div>
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {item.warehouseName}
                </td>
                <td className="px-6 py-4 text-right font-medium text-neutral-900">
                  {item.available}
                </td>
                <td className="px-6 py-4 text-right text-neutral-500">
                  {item.reserved}
                </td>
                <td className="px-6 py-4 text-right text-neutral-500">
                  {item.reorderLevel}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/inventory/products/${item.productId}`)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded"
                      title="View Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => navigate(`/admin/inventory/adjustments?product=${item.productId}&warehouse=${item.warehouseId}`)}
                      className="p-1.5 text-neutral-500 hover:text-primary hover:bg-primary-soft rounded"
                      title="Adjust Stock"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => navigate(`/admin/inventory/transfers?product=${item.productId}`)}
                      className="p-1.5 text-neutral-500 hover:text-primary hover:bg-primary-soft rounded"
                      title="Transfer Stock"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => navigate(`/admin/inventory/movements?product=${item.productId}`)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded"
                      title="View History"
                    >
                      <History className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {inventory.length === 0 && (
        <div className="p-8 text-center text-neutral-500">
          No inventory items found.
        </div>
      )}
    </div>
  );
}
