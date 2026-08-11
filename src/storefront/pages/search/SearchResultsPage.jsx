import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import { useSearch } from '../../../admin/context/SearchContext';
import ProductCard from '../../components/product/ProductCard';

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const { searchProducts, facets } = useSearch();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState({ items: [], total: 0, facets: [] });
  const [activeFilters, setActiveFilters] = useState({});
  const [sort, setSort] = useState('Relevance');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const res = searchProducts(query, activeFilters, sort);
    setResults(res);
  }, [query, activeFilters, sort]);

  const handleFilterChange = (facetName, option, isChecked) => {
    setActiveFilters(prev => {
      const current = prev[facetName] || [];
      if (isChecked) {
        return { ...prev, [facetName]: [...current, option] };
      } else {
        const next = current.filter(o => o !== option);
        if (next.length === 0) {
          const { [facetName]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [facetName]: next };
      }
    });
  };
  
  const clearFilters = () => setActiveFilters({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        <p className="text-gray-500 mt-2">
          {results.total} {results.total === 1 ? 'result' : 'results'} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <h2 className="text-lg font-bold font-serif">Filters</h2>
              {Object.keys(activeFilters).length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-black underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {results.facets.map((facet, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wider">{facet.name}</h3>
                <div className="space-y-2">
                  {facet.options.map((option, optIdx) => (
                    <label key={optIdx} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <input 
                          type="checkbox"
                          className="peer sr-only"
                          checked={activeFilters[facet.name]?.includes(option) || false}
                          onChange={(e) => handleFilterChange(facet.name, option, e.target.checked)}
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded-sm bg-white peer-checked:bg-black peer-checked:border-black transition-colors"></div>
                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
            <button 
              className="lg:hidden flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <FiFilter />
              Filters {Object.keys(activeFilters).length > 0 && `(${Object.keys(activeFilters).length})`}
            </button>
            <div className="hidden lg:block text-sm text-gray-500">
              Showing {results.items.length} of {results.total} results
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Newest">Newest Arrivals</option>
                  <option value="Price Low to High">Price: Low to High</option>
                  <option value="Price High to Low">Price: High to Low</option>
                  <option value="Rating">Top Rated</option>
                </select>
                <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {results.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-gray-400 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-serif mb-2">No Results Found</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                We couldn't find any products matching your current search criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => { setQuery(''); clearFilters(); }}
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
