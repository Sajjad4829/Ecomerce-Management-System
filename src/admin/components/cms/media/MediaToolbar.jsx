import { FiSearch, FiFilter, FiGrid, FiList, FiUpload, FiTrash2, FiFolder, FiTag } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function MediaToolbar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedCount,
  onUploadClick,
  onBulkDelete,
  onBulkTag
}) {
  return (
    <div className="bg-surface border border-black/5 rounded-xl p-3 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
      
      {/* Left: Search & Type Filter */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-1">
        
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={15} />
          <input
            type="text"
            placeholder="Search assets by title, alt text, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-background/80 border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30 transition-all placeholder:text-text-muted"
          />
        </div>

        {/* Asset Type Filter Pills */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-black/5 text-xs font-semibold">
          {['all', 'image', 'video', 'document'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-3 py-1 rounded-md capitalize transition-all",
                selectedType === type
                  ? "bg-surface text-text-primary shadow-xs font-bold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Right Controls: Sort, View Toggle, Bulk Actions, Upload */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
        
        {/* Bulk Actions Indicator if any items checked */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold animate-in fade-in">
            <span>{selectedCount} selected</span>
            <button 
              onClick={onBulkTag}
              className="p-1 hover:bg-blue-100 rounded text-blue-700" 
              title="Bulk Add Tag"
            >
              <FiTag size={13} />
            </button>
            <button 
              onClick={onBulkDelete}
              className="p-1 hover:bg-danger-soft rounded text-danger" 
              title="Bulk Delete"
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        )}

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 bg-background border border-black/10 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary">
          <FiFilter size={13} className="text-text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent focus:outline-none text-xs font-semibold text-text-primary cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="size_desc">Largest Size</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-black/5">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === 'grid' ? "bg-surface text-text-primary shadow-xs" : "text-text-muted hover:text-text-secondary"
            )}
            title="Grid View"
          >
            <FiGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === 'list' ? "bg-surface text-text-primary shadow-xs" : "text-text-muted hover:text-text-secondary"
            )}
            title="List View"
          >
            <FiList size={15} />
          </button>
        </div>

        {/* Upload Action */}
        <button
          onClick={onUploadClick}
          className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <FiUpload size={14} />
          <span>Upload Asset</span>
        </button>
      </div>

    </div>
  );
}
