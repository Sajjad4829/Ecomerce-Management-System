import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FilterContent({ filters, activeFilters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = React.useState(
    filters.map(f => f.id)
  );

  const toggleSection = (id) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (filterId, optionValue) => {
    onFilterChange(filterId, optionValue);
  };

  return (
    <div className="flex flex-col gap-6">
      {filters.map((filterGroup) => {
        const isExpanded = expandedSections.includes(filterGroup.id);
        return (
          <div key={filterGroup.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <button
              onClick={() => toggleSection(filterGroup.id)}
              className="flex items-center justify-between w-full text-left py-2 mb-2 group"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-gray-900 group-hover:text-gray-500 transition-colors">
                {filterGroup.name}
              </span>
              {isExpanded ? (
                <FiChevronUp className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              ) : (
                <FiChevronDown className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              )}
            </button>
            
            {isExpanded && (
              <div className="flex flex-col gap-3 mt-4">
                {filterGroup.options.map((option) => {
                  const isActive = activeFilters[filterGroup.id]?.includes(option.value);
                  return (
                    <label 
                      key={option.value} 
                      className="flex items-center group cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center w-4 h-4 mr-3 border border-gray-300 bg-white group-hover:border-gray-900 transition-colors">
                        <input
                          type="checkbox"
                          className="opacity-0 absolute inset-0 cursor-pointer"
                          checked={isActive || false}
                          onChange={() => handleCheckboxChange(filterGroup.id, option.value)}
                        />
                        {isActive && (
                          <div className="w-2 h-2 bg-gray-900"></div>
                        )}
                      </div>
                      <span className={`text-sm ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
