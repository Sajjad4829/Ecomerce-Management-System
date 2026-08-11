import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function ProductInfo({ product, activeVariant }) {
  const basicInfo = product?.basicInfo || {};
  const pricing = product?.pricing || {};
  const inventory = product?.inventory || {};
  
  const title = basicInfo.name || 'Untitled Product';
  const sku = activeVariant?.sku || basicInfo.sku || 'N/A';
  
  const price = activeVariant?.price || pricing.regularPrice || 0;
  const currency = pricing.currency || 'USD';
  
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };
  
  const stock = activeVariant ? activeVariant.stock : inventory.totalStock;
  const isOutOfStock = stock <= 0;

  return (
    <div className="flex flex-col font-sans">
      
      {/* 1. Product Name */}
      <h1 className="text-[32px] font-serif font-bold text-[#111A4A] leading-tight mb-2">
        {title}
      </h1>
      
      {/* 2. Subtitle / Brand & SKU */}
      <div className="flex items-center gap-2 text-[12px] font-bold text-[#7C849F] uppercase tracking-wider mb-3">
        {basicInfo.brand ? <span>{basicInfo.brand}</span> : <span>AURA</span>}
        <span className="w-1 h-1 rounded-full bg-[#E5E7F2]"></span>
        <span>SKU: {sku}</span>
      </div>
      
      {/* 3. Reviews */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-[#F59E0B]">
          <FiStar size={16} fill="currentColor" />
          <FiStar size={16} fill="currentColor" />
          <FiStar size={16} fill="currentColor" />
          <FiStar size={16} fill="currentColor" />
          <FiStar size={16} fill="currentColor" />
        </div>
        <span className="text-[13px] font-bold text-[#7C849F] tracking-wide">(0 reviews)</span>
      </div>
      
      {/* 4. Price */}
      <div className="text-[32px] font-bold text-[#111A4A] leading-none mb-4">
        {formatPrice(price)}
      </div>

      {/* 5. Out of Stock Status */}
      {isOutOfStock && (
         <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#FFF1F2] text-[#E11D48] text-[11px] font-bold uppercase tracking-wider self-start">
           <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48]"></div>
           OUT OF STOCK
         </div>
      )}
      
    </div>
  );
}
