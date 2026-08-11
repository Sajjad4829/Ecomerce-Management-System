import React from 'react';

export default function ProductInfo({ product, activeVariant }) {
  const basicInfo = product?.basicInfo || {};
  const pricing = product?.pricing || {};
  const inventory = product?.inventory || {};
  
  const title = basicInfo.name || 'Untitled Product';
  const badge = basicInfo.badge || '';
  const sku = activeVariant?.sku || basicInfo.sku || 'N/A';
  
  const price = activeVariant?.price || pricing.regularPrice || 0;
  const salePrice = pricing.salePrice;
  const emi = pricing.emi || 0;
  // Use BDT format if the text references it, but we can stick to currency variable
  const currency = pricing.currency || 'USD';
  
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };
  
  const stock = activeVariant ? activeVariant.stock : inventory.totalStock;
  const isOutOfStock = stock <= 0;

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. Product Badge */}
      {badge && (
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest">
            {badge}
          </span>
        </div>
      )}
      
      {/* 2. Product Name */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
        {title}
      </h1>
      
      {/* Optional: Brand and SKU can be subtle here or removed, keeping them subtle to not break hierarchy */}
      <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
        {basicInfo.brand && <span className="uppercase tracking-widest">{basicInfo.brand}</span>}
        <span>SKU: {sku}</span>
      </div>
      
      {/* 3. Starting Price / Current Price */}
      <div className="flex items-end gap-4 mt-6">
        {salePrice ? (
          <div className="flex flex-col">
            <span className="text-stone-400 line-through text-sm mb-1">{formatPrice(price)}</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-semibold text-rose-600">{formatPrice(salePrice)}</span>
              <span className="px-2 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded">
                Save {Math.round(((price - salePrice) / price) * 100)}%
              </span>
            </div>
          </div>
        ) : (
          <span className="text-2xl md:text-3xl font-semibold text-stone-900">
            {formatPrice(price)}
          </span>
        )}
      </div>

      {/* 4. EMI / Payment Info */}
      {emi > 0 && (
        <div className="text-sm font-medium text-stone-500 mt-2">
          EMI {formatPrice(emi)}
        </div>
      )}

      {/* Out of Stock Status */}
      <div className="pt-2">
        {isOutOfStock && (
           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 text-stone-500 text-xs font-semibold uppercase tracking-wider">
             <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div> Out of Stock
           </div>
        )}
      </div>
      
      {basicInfo.shortDescription && (
        <p className="text-stone-600 leading-relaxed pt-2">
          {basicInfo.shortDescription}
        </p>
      )}
    </div>
  );
}
