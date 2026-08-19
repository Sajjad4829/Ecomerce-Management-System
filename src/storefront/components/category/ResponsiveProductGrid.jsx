import React from 'react';
import ProductCard from '../product/ProductCard';
import EmptyState from './EmptyState';
import { FiSliders } from 'react-icons/fi';

export default function ResponsiveProductGrid({ products, onOpenMobileFilters, isLoading, sortOption, onSortChange }) {
  if (isLoading) {
    return (
      <div className="flex-1 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse flex flex-col h-full">
              <div className="w-full aspect-[4/5] bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      {/* Mobile Filter Toggle & Sort Header (Visible on Mobile/Tablet) */}
      <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <button 
          onClick={onOpenMobileFilters}
          className="flex items-center text-sm font-bold tracking-widest uppercase text-gray-900 bg-gray-50 px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          <FiSliders className="mr-2" /> Filter
        </button>

        <select 
          value={sortOption}
          onChange={onSortChange}
          className="text-sm font-medium text-gray-900 bg-transparent outline-none border-none pr-4 cursor-pointer"
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </div>

      {/* Desktop Sort Header (Hidden on Mobile) */}
      <div className="hidden lg:flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <p className="text-sm text-gray-500">Showing {products.length} products</p>
        <select 
          value={sortOption}
          onChange={onSortChange}
          className="text-sm font-medium text-gray-900 bg-transparent outline-none pb-1 cursor-pointer hover:border-gray-900 transition-colors"
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </div>

      {products.length === 0 ? (
        <EmptyState onClearFilters={() => window.location.reload()} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
