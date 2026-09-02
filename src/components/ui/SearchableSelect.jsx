import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';

export default function SearchableSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  className = '',
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      {/* Hidden select for form validation if required */}
      {required && (
        <select 
          value={value || ''} 
          onChange={() => {}} 
          className="absolute opacity-0 w-full h-full -z-10"
          required
        >
          <option value="">{placeholder}</option>
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      )}

      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl cursor-pointer flex items-center justify-between text-sm text-text-primary hover:border-primary transition-colors"
      >
        <span className={selectedOption ? '' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col max-h-64">
          <div className="p-2 border-b border-gray-100 shrink-0 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between ${value === opt.value ? 'bg-blue-50/50 text-[#635BFF] font-medium' : 'text-gray-700'}`}
                >
                  {opt.label}
                  {value === opt.value && <FiCheck className="text-[#635BFF]" size={14} />}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
