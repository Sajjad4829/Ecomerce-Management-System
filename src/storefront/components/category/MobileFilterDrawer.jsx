import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import FilterContent from './FilterContent';

export default function MobileFilterDrawer({ 
  isOpen, 
  onClose, 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearAll 
}) {
  const activeFilterCount = Object.values(activeFilters).flat().length;

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
            className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-sm"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl h-[85vh] lg:hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-base font-bold tracking-widest uppercase text-gray-900">Filters</h2>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterContent 
                filters={filters} 
                activeFilters={activeFilters} 
                onFilterChange={onFilterChange} 
              />
            </div>

            {/* Sticky Footer */}
            <div className="border-t border-gray-100 p-6 flex items-center justify-between bg-white">
              <button
                onClick={onClearAll}
                className={`text-sm font-bold uppercase tracking-widest transition-opacity ${activeFilterCount > 0 ? 'text-gray-900 hover:text-gray-500' : 'text-gray-300 pointer-events-none'}`}
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="bg-gray-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
