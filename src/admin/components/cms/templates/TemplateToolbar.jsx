import { 
  FiSearch, FiFilter, FiPlus, FiGrid, FiList, 
  FiSliders, FiCheckCircle, FiArchive
} from 'react-icons/fi';

export default function TemplateToolbar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  viewMode,
  setViewMode,
  onCreateClick,
  onAssignClick
}) {
  const types = [
    { id: 'all', label: 'All Templates' },
    { id: 'Commerce', label: 'Commerce' },
    { id: 'Page', label: 'Standard Pages' },
    { id: 'Content', label: 'Editorial / Content' }
  ];

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'published', label: 'Published' },
    { id: 'draft', label: 'Draft' },
    { id: 'archived', label: 'Archived' }
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates by name, assigned pages, or tags..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
          />
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAssignClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <FiSliders size={15} />
            Template Assignments
          </button>

          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            Create Template Blueprint
          </button>
        </div>
      </div>

      {/* Filters & View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter Pills */}
          <div className="flex items-center bg-stone-100 p-1 rounded-lg text-xs">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  selectedType === type.id
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            {statuses.map((st) => (
              <option key={st.id} value={st.id}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
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
