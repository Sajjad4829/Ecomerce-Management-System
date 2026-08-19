import React from 'react';
import { FiBox, FiEdit2, FiEye } from 'react-icons/fi';

export default function CatalogInventoryTable({ data, onAdjustStock, onViewDetails }) {
  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-black/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 border-b border-black/5 text-xs font-semibold text-text-muted uppercase tracking-wider">
              <th className="p-4 pl-6">Product</th>
              <th className="p-4">SKU & Category</th>
              <th className="p-4">Stock Levels</th>
              <th className="p-4">Warehouse</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {data.length > 0 ? (
              data.map((item, index) => {
                const total = item.available + item.reserved;
                return (
                  <tr key={`${item.id}-${index}`} className="hover:bg-black/[0.02] transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-lg object-cover border border-black/5 shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                            <FiBox className="w-5 h-5 text-text-muted" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-text-primary group-hover:text-primary transition-colors cursor-pointer" onClick={() => onViewDetails(item)}>
                            {item.productName}
                          </div>
                          {item.variant && (
                            <div className="text-xs text-text-muted mt-0.5">{item.variant}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-mono text-text-secondary">{item.sku}</div>
                      <div className="text-xs text-text-muted mt-0.5">{item.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-text-muted text-xs block mb-0.5">Avail</span>
                          <span className="font-semibold text-text-primary">{item.available}</span>
                        </div>
                        <div>
                          <span className="text-text-muted text-xs block mb-0.5">Rsvd</span>
                          <span className="font-medium text-text-secondary">{item.reserved}</span>
                        </div>
                        <div>
                          <span className="text-text-muted text-xs block mb-0.5">Total</span>
                          <span className="font-medium text-text-secondary">{total}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-text-secondary">{item.warehouseName}</div>
                    </td>
                    <td className="p-4">
                      {item.status === 'In Stock' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-600">In Stock</span>
                      )}
                      {item.status === 'Low Stock' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-600">Low Stock</span>
                      )}
                      {item.status === 'Out of Stock' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-500/10 text-red-600">Out of Stock</span>
                      )}
                      {item.status === 'Pre-Order' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-600">Pre-Order</span>
                      )}
                      {!['In Stock', 'Low Stock', 'Out of Stock', 'Pre-Order'].includes(item.status) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/5 text-text-secondary">{item.status}</span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onViewDetails(item)}
                          className="p-1.5 text-text-muted hover:text-primary hover:bg-primary/5 rounded transition-colors tooltip-trigger"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAdjustStock(item)}
                          className="p-1.5 text-text-muted hover:text-primary hover:bg-primary/5 rounded transition-colors tooltip-trigger"
                          title="Adjust Stock"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-text-muted">
                  <div className="flex flex-col items-center justify-center">
                    <FiBox className="w-8 h-8 mb-3 opacity-20" />
                    <p>No inventory records found matching your filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
