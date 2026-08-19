import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function ProductInfo({ product, ratingData, selectedVariants, activePrice, activeComparePrice }) {
  if (!product) return null;

  const isSale = activeComparePrice > activePrice;
  const discountPercent = isSale 
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100) 
    : 0;

  return (
    <div className="flex flex-col border-b border-gray-100 pb-8 mb-8">
      
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.badge && (
          <span className="bg-black text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
            {product.badge}
          </span>
        )}
        {isSale && !product.badge && (
          <span className="bg-[#B91C1C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
            SALE
          </span>
        )}
      </div>

      {/* Name and SKU */}
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-2">
          {product.name}
        </h1>
        <p className="text-sm font-medium text-gray-400">
          SKU: {selectedVariants?.size?.sku || selectedVariants?.color?.sku || product.sku}
        </p>
      </div>

      {/* Rating */}
      {ratingData && ratingData.count > 0 && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={i < Math.round(ratingData.average) ? 'fill-current' : ''} size={16} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">{ratingData.average}</span>
          <span className="text-sm text-gray-500 underline cursor-pointer">({ratingData.count} Reviews)</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-end gap-3 mb-4">
        <span className="text-2xl font-medium text-gray-900">
          ${activePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        {isSale && (
          <>
            <span className="text-lg text-gray-400 line-through decoration-1">
              ${activeComparePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-sm tracking-wide uppercase">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Short Description */}
      <p className="text-base text-gray-600 leading-relaxed">
        {product.description ? product.description.substring(0, 150) + '...' : ''}
      </p>
    </div>
  );
}
