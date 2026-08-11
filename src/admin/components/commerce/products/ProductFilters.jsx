import { FiX, FiCheck } from 'react-icons/fi';

export default function ProductFilters({ onClose }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm space-y-6 animate-in slide-in-from-left-4 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <h3 className="font-serif font-bold text-text-primary text-sm">Filters</h3>
        <button onClick={onClose} className="p-1 text-text-muted hover:text-text-primary lg:hidden">
          <FiX size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-text-muted uppercase">Status</label>
          <div className="space-y-1.5">
            {['Published', 'Draft', 'Archived'].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-stone-900" />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-text-muted uppercase">Category</label>
          <select className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary focus:ring-2 focus:ring-stone-900">
            <option>All Categories</option>
            <option>Seating</option>
            <option>Tables</option>
            <option>Storage</option>
            <option>Beds</option>
          </select>
        </div>

        {/* Product Type */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-text-muted uppercase">Product Type</label>
          <div className="space-y-1.5">
            {['Standard Furniture', 'Made-to-Order', 'Bundle'].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-stone-900" />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-text-muted uppercase">Inventory</label>
          <div className="space-y-1.5">
            {['In Stock', 'Low Stock', 'Out of Stock'].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-stone-900" />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button className="flex-1 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors">
          Apply
        </button>
        <button className="px-3 py-2 border border-border text-text-secondary text-xs font-semibold rounded-lg hover:bg-background transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
