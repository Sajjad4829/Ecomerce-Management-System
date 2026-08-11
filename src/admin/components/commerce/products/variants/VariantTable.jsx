import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCopy, FiImage, FiMoreVertical } from 'react-icons/fi';
import ProductStatusBadge from '../ProductStatusBadge';
import BulkVariantBar from './BulkVariantBar';

export default function VariantTable({ variants, setVariants, onEdit, attributes }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(variants.map(v => v.id));
    else setSelectedIds([]);
  };

  const handleSelect = (id, checked) => {
    if (checked) setSelectedIds(prev => [...prev, id]);
    else setSelectedIds(prev => prev.filter(v => v !== id));
  };

  const handleDelete = (id) => {
    setVariants(variants.filter(v => v.id !== id));
    setSelectedIds(prev => prev.filter(vId => vId !== id));
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 w-10 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={variants.length > 0 && selectedIds.length === variants.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                  />
                </th>
                <th className="p-4 w-16"></th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Variant</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">SKU</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Price</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Stock</th>
                <th className="p-4 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 w-16 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {variants.map(variant => {
                const name = variant.attributes.map(a => a.valueLabel).join(' / ');
                const isSelected = selectedIds.includes(variant.id);
                
                return (
                  <tr key={variant.id} className={`hover:bg-background transition-colors group ${isSelected ? 'bg-background' : ''}`}>
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={(e) => handleSelect(variant.id, e.target.checked)}
                        className="w-4 h-4 rounded border-border-hover text-text-primary focus:ring-stone-900"
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-10 h-10 rounded border border-border bg-stone-100 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onEdit(variant)}>
                        {variant.image ? (
                          <img src={variant.image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                          <FiImage className="text-stone-300" size={16} />
                        )}
                      </div>
                    </td>
                    <td className="p-4 cursor-pointer" onClick={() => onEdit(variant)}>
                      <span className="text-sm font-medium text-text-primary group-hover:text-warning transition-colors">{name}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs text-text-muted bg-surface border border-border px-2 py-1 rounded">{variant.sku}</span>
                    </td>
                    <td className="p-4 text-sm text-text-primary text-right font-medium">
                      ${variant.price.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-text-secondary text-right">
                      {variant.stock === 0 ? (
                        <span className="text-danger font-medium">Out of stock</span>
                      ) : (
                        <span>{variant.stock} available</span>
                      )}
                    </td>
                    <td className="p-4">
                      <ProductStatusBadge status={variant.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(variant)} className="p-1.5 text-text-muted hover:text-text-primary hover:bg-stone-200 rounded transition-colors">
                          <FiEdit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(variant.id)} className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <BulkVariantBar 
        selectedCount={selectedIds.length} 
        onClear={() => setSelectedIds([])} 
      />
    </div>
  );
}
