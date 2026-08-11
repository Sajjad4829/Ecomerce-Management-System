import React from 'react';

export default function ProductCard({ product }) {
  const basicInfo = product?.basicInfo || {};
  const media = product?.media || {};
  const pricing = product?.pricing || {};

  const title = basicInfo.name || 'Untitled Product';
  const badge = basicInfo.badge || '';
  const primaryImage = media.primaryImage || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
  
  const price = pricing.salePrice || pricing.regularPrice || 0;
  const emi = pricing.emi || 0;
  
  // Use generic number formatting without fixed currency symbol to match "1,800 BDT"
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white border border-stone-100 shadow-sm relative group font-sans">
      
      {/* Media Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-50">
        <img 
          src={primaryImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-0 left-0 z-10 bg-[#e62e2d] text-white px-3 py-1.5 text-sm font-medium">
            {badge}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6 text-center bg-white flex flex-col items-center">
        <h3 className="text-2xl text-[#333] font-medium mb-3">
          {title}
        </h3>
        
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#333] text-[17px]">
            Starts from {formattedPrice} BDT
          </span>
          {emi > 0 && (
            <span className="bg-[#e62e2d] text-white px-2 py-[2px] text-[13px] font-medium">
              EMI {emi} BDT
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}
