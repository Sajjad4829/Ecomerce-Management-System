import { FiX } from 'react-icons/fi';

export default function CatalogFilters({ onClose }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm space-y-6 animate-in slide-in-from-left-4 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <h3 className="font-serif font-bold text-stone-900 text-sm">Filters</h3>
        <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 lg:hidden">
          <FiX size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-stone-500 uppercase">Status</label>
          <div className="space-y-1.5">
            {['Published', 'Draft', 'Archived'].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input type="checkbox" className="rounded border-stone-300 text-stone-900 focus:ring-stone-900" />
                {s}
              </label>
            ))}
          </div>
        </div>
        
        {/* Featured */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-stone-500 uppercase">Featured</label>
          <div className="space-y-1.5">
            {['Is Featured', 'Not Featured'].map(s => (
              <label key={s} className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input type="checkbox" className="rounded border-stone-300 text-stone-900 focus:ring-stone-900" />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 flex gap-2">
        <button className="flex-1 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors">
          Apply
        </button>
        <button className="px-3 py-2 border border-stone-200 text-stone-600 text-xs font-semibold rounded-lg hover:bg-stone-50 transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
