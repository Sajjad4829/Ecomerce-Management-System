import { FiSearch, FiFilter, FiPlus, FiGrid, FiList, FiDownload, FiUpload } from 'react-icons/fi';
import { PermissionGuard } from '../../rbac/Guards';

export default function ProductToolbar({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  onToggleFilters, 
  onCreate,
  showFilters 
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, SKU..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <PermissionGuard permission="products.export">
            <button 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <FiDownload size={14} /> Export
            </button>
          </PermissionGuard>
          <button 
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <FiUpload size={14} /> Import
          </button>
          <div className="w-px h-6 bg-stone-200 hidden sm:block mx-1" />
          <PermissionGuard permission="products.create">
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <FiPlus size={16} />
              Create Product
            </button>
          </PermissionGuard>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <button
          onClick={onToggleFilters}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            showFilters 
              ? 'bg-stone-200 text-stone-900' 
              : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          <FiFilter size={14} /> 
          Filters
        </button>

        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title="Grid View"
          >
            <FiGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'list'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title="List View"
          >
            <FiList size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
