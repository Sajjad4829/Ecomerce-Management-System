import React from 'react';
import ProductCard from '../product/ProductCard';
import EmptyState from './EmptyState';
import { FiSliders } from 'react-icons/fi';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function ResponsiveProductGrid({ products, onOpenMobileFilters, isLoading, sortOption, onSortChange }) {
  const { productPageLayout = 'top', productGridLayout = 'style-2' } = useStorefrontTheme();

  const isHorizontal = ['left', 'right', 'left-thumbs-bottom'].includes(productPageLayout);
  
  let maxCols = 4;
  if (productGridLayout === 'style-1') maxCols = 3;
  if (productGridLayout === 'style-3') maxCols = 5;

  // Dynamically reduce columns if we have fewer products than maxCols
  const actualCols = products ? Math.min(maxCols, products.length) : maxCols;

  let gridColsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"; 
  if (actualCols === 1) gridColsClass = "grid-cols-1 md:grid-cols-1 lg:grid-cols-1";
  else if (actualCols === 2) gridColsClass = "grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
  else if (actualCols === 3) gridColsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
  else {
    // 4 or more
    if (maxCols === 3) gridColsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
    else if (maxCols === 4) gridColsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    else if (maxCols === 5) gridColsClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
  
  // Use fewer columns for horizontal layouts to give them more room
  const gridClasses = isHorizontal 
    ? "grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8"
    : `grid ${gridColsClass} gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-12`;

  if (isLoading) {
    return (
      <div className="flex-1 w-full">
        <div className={gridClasses}>
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
        <div className={gridClasses}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
