import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function MobileFilterDrawer({ 
  isOpen, 
  onClose, 
  onClearAll,
  sortOption,
  onSortChange
}) {
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(399999);

  const SORT_OPTIONS = [
    { label: 'Default List', value: 'featured' },
    { label: 'Recently Added', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Right Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-2xl text-gray-900">Filters</h2>
              <button 
                onClick={onClose}
                className="bg-[#EE2737] text-white p-1 hover:bg-red-700 transition-colors"
                aria-label="Close filters"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-lg text-gray-800 mb-6">Price Range</h3>
                <div className="text-center text-sm font-medium text-gray-900 mb-4">
                  {minPrice} BDT - {maxPrice} BDT
                </div>
                
                {/* Mocked Dual Thumb Slider */}
                <div className="relative w-full h-1 bg-gray-200 rounded-full mb-8">
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#EE2737] rounded-full"></div>
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white border-4 border-[#EE2737] rounded-full -translate-y-1/2 cursor-pointer"></div>
                  <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white border-4 border-[#EE2737] rounded-full -translate-y-1/2 cursor-pointer"></div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-gray-200 mb-6"></div>

              {/* Sorting Options */}
              <div className="flex flex-col gap-4">
                {SORT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer group">
                    <div className={`flex items-center justify-center w-5 h-5 mr-3 border rounded-sm transition-colors ${sortOption === option.value ? 'bg-[#EE2737] border-[#EE2737]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                      {sortOption === option.value && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="sortOption" 
                      value={option.value}
                      checked={sortOption === option.value}
                      onChange={() => onSortChange(option.value)}
                    />
                  </label>
                ))}
              </div>

            </div>

            {/* Sticky Footer */}
            <div className="p-6 bg-white border-t border-gray-100 flex justify-center">
              <button
                onClick={onClearAll}
                className="w-full border border-[#EE2737] text-[#EE2737] py-3 text-lg hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
