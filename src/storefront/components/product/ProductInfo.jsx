import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function ProductInfo({ product, ratingData, selectedVariants, activePrice, activeComparePrice }) {
  if (!product) return null;

  const isSale = activeComparePrice > activePrice;
  const discountPercent = isSale 
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100) 
    : 0;

  return (
    <div className="flex flex-col pb-4 mb-2">
      
      {/* Name, SKU, and Price combined block */}
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[28px] font-sans font-semibold text-gray-800 tracking-tight leading-tight mb-1">
          {product.name}
        </h1>
        <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wide mb-3">
          {selectedVariants?.size?.sku || selectedVariants?.color?.sku || product.sku}
        </p>
        <div className="flex items-end gap-3">
          <span className="text-xl font-bold text-gray-800">
            {activePrice.toLocaleString('en-US', { minimumFractionDigits: 0 })} BDT
          </span>
          {isSale && (
            <>
              <span className="text-sm text-gray-400 line-through mb-0.5">
                {activeComparePrice.toLocaleString('en-US', { minimumFractionDigits: 0 })} BDT
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-sm tracking-wide uppercase">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      {/* Short Description */}
      <p className="text-base text-gray-600 leading-relaxed">
        {product.description ? product.description.substring(0, 150) + '...' : ''}
      </p>
    </div>
  );
}
