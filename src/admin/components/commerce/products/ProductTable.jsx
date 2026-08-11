import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiCopy, FiTrash2, FiMoreVertical, FiEye } from 'react-icons/fi';
import ProductStatusBadge from './ProductStatusBadge';
import { useState } from 'react';

export default function ProductTable({ 
  products, 
  viewMode, 
  selectedProducts, 
  onSelectAll, 
  onSelectOne,
  onEdit,
  onPreview,
  onDuplicate,
  onDelete
}) {
  const [activeMenu, setActiveMenu] = useState(null);

  const allSelected = products.length > 0 && selectedProducts.length === products.length;
  const someSelected = selectedProducts.length > 0 && !allSelected;

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const ActionMenu = ({ p }) => (
    <AnimatePresence>
      {activeMenu === p.id && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute right-0 top-full mt-1 w-40 bg-white border border-stone-200 rounded-lg shadow-xl z-10 py-1"
        >
          <PermissionGuard permission="products.edit">
            <PermissionGuard permission="products.delete">
            <button 
            onClick={() => { onEdit(p.id); setActiveMenu(null); }}
            className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
          >
            <FiEdit2 size={12} /> Edit
          </button>
          </PermissionGuard>
          <button 
            onClick={() => { onPreview(p); setActiveMenu(null); }}
            className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
          >
            <FiEye size={12} /> Preview
          </button>
          <button 
            onClick={() => { onDuplicate(p); setActiveMenu(null); }}
            className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
          >
            <FiCopy size={12} /> Duplicate
          </button>
          <div className="h-px bg-stone-100 my-1" />
          <button 
            onClick={() => { onDelete(p.id); setActiveMenu(null); }}
            className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <FiTrash2 size={12} /> Delete
          </button>
          </PermissionGuard>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow relative group">
            <div className="absolute top-2 left-2 z-10">
              <input 
                type="checkbox" 
                checked={selectedProducts.includes(p.id)}
                onChange={(e) => onSelectOne(p.id, e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 shadow-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button 
                  onClick={(e) => toggleMenu(p.id, e)}
                  className="p-1 bg-white/90 backdrop-blur rounded shadow-sm text-stone-600 hover:text-stone-900"
                >
                  <FiMoreVertical size={16} />
                </button>
                <ActionMenu p={p} />
              </div>

              <div className="aspect-[4/3] bg-stone-100 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <ProductStatusBadge status={p.status} />
                  {p.stock <= 0 && <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] uppercase font-bold border border-red-200">Out of Stock</span>}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2 cursor-pointer" onClick={() => onEdit(p.id)}>
              <div>
                <p className="text-[10px] font-mono text-stone-500 uppercase">{p.sku}</p>
                <h3 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">{p.name}</h3>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">{p.category}</span>
                <span className="font-medium text-stone-900">${p.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table View
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="p-4 w-10">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  ref={input => { if (input) input.indeterminate = someSelected; }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
              </th>
              <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">SKU</th>
              <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Price</th>
              <th className="p-4 text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">Inventory</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map(p => (
              <tr 
                key={p.id} 
                className={`hover:bg-stone-50 transition-colors group cursor-pointer ${selectedProducts.includes(p.id) ? 'bg-stone-50' : ''}`}
                onClick={(e) => {
                  if (e.target.type !== 'checkbox' && !e.target.closest('button')) {
                    onEdit(p.id);
                  }
                }}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox"
                    checked={selectedProducts.includes(p.id)}
                    onChange={(e) => onSelectOne(p.id, e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">{p.name}</p>
                      <p className="text-xs text-stone-500">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-xs text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">{p.sku}</span>
                </td>
                <td className="p-4">
                  <ProductStatusBadge status={p.status} />
                </td>
                <td className="p-4 text-sm font-medium text-stone-900">
                  ${p.price.toLocaleString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-stone-600">{p.stock} in stock</span>
                  </div>
                </td>
                <td className="p-4 relative">
                  <button 
                    onClick={(e) => toggleMenu(p.id, e)}
                    className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
                  >
                    <FiMoreVertical size={16} />
                  </button>
                  <ActionMenu p={p} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-stone-500 text-sm">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
