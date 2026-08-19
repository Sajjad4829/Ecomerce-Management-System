import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock } from 'react-icons/fi';
import { useSearch } from '../../../admin/context/SearchContext';

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const { getSuggestions, saveSearch } = useSearch();
  
  const suggestions = getSuggestions(query);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleSuggestionClick = (term) => {
    saveSearch(term);
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSearch} className="relative flex items-center p-4 border-b border-gray-100">
          <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for furniture, collections, or styles..."
            className="w-full px-4 py-2 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400"
            autoFocus
          />
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </form>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!query && suggestions.recent.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.recent.map((recent) => (
                  <button
                    key={recent.id}
                    onClick={() => handleSuggestionClick(recent.query)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    <FiClock className="w-3 h-3 text-gray-400" />
                    {recent.query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Suggestions */}
              {suggestions.categories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {suggestions.categories.map((cat, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSuggestionClick(cat)}
                          className="text-left w-full px-2 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Suggestions */}
              <div className="md:col-span-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Products</h3>
                {suggestions.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suggestions.products.map(product => (
                      <a 
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                          <p className="text-sm font-medium text-black mt-1">৳{product.price.toLocaleString()}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No products found matching "{query}"</p>
                )}
              </div>
            </div>
          )}
          
          {!query && suggestions.recent.length === 0 && (
             <div className="text-center py-8 text-gray-500 text-sm">
                Start typing to discover products, categories, and collections.
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
