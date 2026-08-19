import React from 'react';
import FilterContent from './FilterContent';

export default function FilterSidebar({ filters, activeFilters, onFilterChange, onClearAll }) {
  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-8 scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button 
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <FilterContent 
        filters={filters} 
        activeFilters={activeFilters} 
        onFilterChange={onFilterChange} 
      />
    </aside>
  );
}
