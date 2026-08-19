import React from 'react';
import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50/50 rounded-2xl w-full border border-gray-100">
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        <FiInbox size={32} className="text-gray-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        We couldn't find any items matching your current filters. Try adjusting them or clear all filters to start over.
      </p>
      <button
        onClick={onClearFilters}
        className="px-8 py-3 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
