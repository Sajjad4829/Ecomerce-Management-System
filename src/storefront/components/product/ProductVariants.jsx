import React from 'react';

export default function ProductVariants({ variants, selectedVariants, onVariantChange }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mb-8 border-b border-gray-100 pb-8">
      {variants.map((variantGroup) => (
        <div key={variantGroup.type}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900">
              {variantGroup.type}
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              {selectedVariants[variantGroup.type]?.label || 'Select'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {variantGroup.options.map((option) => {
              const isSelected = selectedVariants[variantGroup.type]?.id === option.id;

              // Color Swatch style
              if (option.colorCode) {
                return (
                  <button
                    key={option.id}
                    onClick={() => onVariantChange(variantGroup.type, option)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-gray-900 ring-offset-2' : 'ring-1 ring-gray-200 hover:ring-gray-400'
                    }`}
                    style={{ backgroundColor: option.colorCode }}
                    aria-label={`Select ${option.label}`}
                    title={option.label}
                  />
                );
              }

              // Standard Pill style
              return (
                <button
                  key={option.id}
                  onClick={() => onVariantChange(variantGroup.type, option)}
                  className={`px-5 py-3 text-sm font-medium border transition-colors ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-700 hover:border-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
