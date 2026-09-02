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
