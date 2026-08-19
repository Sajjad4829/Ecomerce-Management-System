import { FiX } from 'react-icons/fi';

export default function CatalogFilters({ onClose }) {
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
        
        {/* Featured */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-text-muted uppercase">Featured</label>
          <div className="space-y-1.5">
            {['Is Featured', 'Not Featured'].map(s => (
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
