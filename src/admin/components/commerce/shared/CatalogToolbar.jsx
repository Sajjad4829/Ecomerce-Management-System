import { FiSearch, FiFilter, FiPlus, FiGrid, FiList, FiDownload, FiUpload } from 'react-icons/fi';

export default function CatalogToolbar({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  onToggleFilters, 
  onCreate,
  createLabel = "Create",
  showFilters 
}) {
  return (
    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-surface transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-border hover:bg-background text-text-secondary rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <FiDownload size={14} /> Export
          </button>
          <div className="w-px h-6 bg-stone-200 hidden sm:block mx-1" />
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
          >
            <FiPlus size={16} />
            {createLabel}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        <button
          onClick={onToggleFilters}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            showFilters 
              ? 'bg-stone-200 text-text-primary' 
              : 'bg-background border border-border text-text-secondary hover:bg-stone-100'
          }`}
        >
          <FiFilter size={14} /> 
          Filters
        </button>

        {setViewMode && (
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              title="Grid View"
            >
              <FiGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              title="List View"
            >
              <FiList size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
