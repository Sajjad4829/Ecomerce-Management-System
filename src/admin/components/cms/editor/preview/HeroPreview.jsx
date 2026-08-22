import React from 'react';

export default function HeroPreview({ section = {} }) {
  const content = section.content || section.defaultContent || {};
  const title = content.title || 'Discover Products That Inspire';
  const subtitle = content.subtitle || 'Premium quality products with modern designs crafted for your lifestyle.';
  const ctaText = content.ctaText || 'Shop Now';
  const secondaryCtaText = content.secondaryCtaText || 'Explore Categories';
  const image = content.image || section.image || 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="w-full bg-[#fcfdff] pt-20 pb-16 px-12 flex items-center justify-between overflow-hidden relative">
      {/* Left Text Content */}
      <div className="w-1/2 pr-8 z-10">
        <div className="inline-block px-3 py-1 bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
          {section.category || 'HERO'}
        </div>
        <h1 className="text-5xl font-extrabold text-[#1a1a1a] leading-[1.1] mb-6 font-sans">
          {title}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md whitespace-pre-wrap">
          {subtitle}
        </p>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3.5 bg-[#635BFF] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#635BFF]/30 hover:bg-[#524be0] transition-colors">
            {ctaText}
          </button>
          {secondaryCtaText && (
            <button className="px-8 py-3.5 bg-white text-gray-800 text-sm font-bold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
              {secondaryCtaText}
            </button>
          )}
        </div>
      </div>

      {/* Right Image Content */}
      <div className="w-1/2 relative h-[400px] flex items-center justify-center">
        {/* Background Circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f0effb] rounded-full z-0"></div>
        {/* Main Image */}
        <div className="relative z-10 w-full h-full">
          <img 
            src={image} 
            alt="Hero Banner" 
            className="w-full h-full object-contain object-right drop-shadow-2xl mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
