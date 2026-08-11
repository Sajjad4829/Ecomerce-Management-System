import React from 'react';

export default function ProductVariantSelector({ product, activeVariant, onVariantChange }) {
  const variants = product?.variants || [];
  
  if (variants.length <= 1) return null;

  // In a real advanced app, we might group variants by options (Color, Size).
  // Here we just map over the flat variants array for simplicity.
  return (
    <div className="pt-6 border-t border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-stone-900">Select Option</h3>
        <span className="text-sm text-stone-500">{activeVariant?.name}</span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onVariantChange(v)}
            disabled={v.stock <= 0}
            className={`
              relative px-4 py-2.5 rounded-lg border text-sm font-medium transition-all
              ${activeVariant?.id === v.id 
                ? 'border-stone-900 bg-stone-900 text-white shadow-md' 
                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
              }
              ${v.stock <= 0 ? 'opacity-50 cursor-not-allowed overflow-hidden' : ''}
            `}
          >
            {v.name}
            {v.stock <= 0 && (
               <div className="absolute top-1/2 left-0 w-full h-px bg-stone-300 -rotate-12"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
