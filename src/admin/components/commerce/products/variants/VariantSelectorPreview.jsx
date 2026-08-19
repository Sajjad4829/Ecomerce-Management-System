import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

export default function VariantSelectorPreview({ variants, attributes }) {
  // If we don't have enough data, return a placeholder
  if (!variants || variants.length === 0 || !attributes || attributes.length === 0) {
    return (
      <div className="p-6 border border-border rounded-xl bg-background text-center">
        <p className="text-sm text-text-muted">Preview will appear here once variants are generated.</p>
      </div>
    );
  }

  // Find unique values for each attribute from the available variants
  const availableOptions = {};
  attributes.forEach(attr => {
    availableOptions[attr.id] = [...new Set(
      variants.map(v => {
        const option = v.attributes.find(a => a.attrId === attr.id);
        return option ? option.valueLabel : null;
      }).filter(Boolean)
    )];
  });

  // State to hold the selected values for each attribute
  const [selections, setSelections] = useState(() => {
    const initial = {};
    attributes.forEach(attr => {
      initial[attr.id] = availableOptions[attr.id][0]; // Select the first available by default
    });
    return initial;
  });

  // Find the variant that matches current selections
  const selectedVariant = variants.find(v => {
    return attributes.every(attr => {
      const vAttr = v.attributes.find(a => a.attrId === attr.id);
      return vAttr && vAttr.valueLabel === selections[attr.id];
    });
  });

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm max-w-sm">
      <h3 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-widest">Storefront Preview</h3>
      
      <div className="space-y-6">
        {attributes.map(attr => (
          <div key={attr.id}>
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-bold text-text-primary">{attr.name}</label>
              <span className="text-xs text-text-muted">{selections[attr.id]}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {availableOptions[attr.id].map(val => {
                const isSelected = selections[attr.id] === val;
                
                // If it's Color, we might render a swatch (mocking a swatch)
                if (attr.name.toLowerCase() === 'color') {
                  const colorMap = {
                    'Black': '#1A1A1A',
                    'Brown': '#5D4037',
                    'White': '#F5F5F5',
                    'Navy': '#1A237E'
                  };
                  return (
                    <button
                      key={val}
                      onClick={() => setSelections({ ...selections, [attr.id]: val })}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-stone-900 shadow-md' : 'border-transparent hover:border-border-hover'
                      }`}
                      style={{ backgroundColor: colorMap[val] || '#E0E0E0' }}
                      title={val}
                    >
                      {isSelected && <FiCheck className={val === 'White' ? 'text-text-primary' : 'text-white'} size={16} />}
                    </button>
                  );
                }

                // Default text button
                return (
                  <button
                    key={val}
                    onClick={() => setSelections({ ...selections, [attr.id]: val })}
                    className={`px-4 py-2 rounded text-sm transition-all border ${
                      isSelected 
                        ? 'border-stone-900 bg-primary text-white font-medium shadow-md' 
                        : 'border-border bg-surface text-text-secondary hover:border-stone-400'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        {selectedVariant ? (
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-serif font-bold text-text-primary">${selectedVariant.price.toLocaleString()}</p>
                <p className="text-xs font-mono text-text-muted mt-1">SKU: {selectedVariant.sku}</p>
              </div>
              <div>
                {selectedVariant.stock > 0 ? (
                  <span className="text-xs font-bold text-success bg-success-soft px-2 py-1 rounded">In Stock</span>
                ) : (
                  <span className="text-xs font-bold text-text-secondary bg-stone-100 px-2 py-1 rounded">Made to Order</span>
                )}
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white font-bold text-sm rounded hover:bg-primary-hover transition-colors uppercase tracking-widest">
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="py-4 text-center bg-background rounded border border-border">
            <p className="text-sm text-text-muted font-medium">Combination Unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
}
