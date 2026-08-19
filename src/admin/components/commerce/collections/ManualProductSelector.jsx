import { useState } from 'react';
import { useProducts } from '../../../context/commerce/ProductContext';
import { FiSearch, FiCheck, FiPlus, FiX } from 'react-icons/fi';

export default function ManualProductSelector({ selectedProductIds, onChange }) {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleProduct = (id) => {
    if (selectedProductIds.includes(id)) {
      onChange(selectedProductIds.filter(pid => pid !== id));
    } else {
      onChange([...selectedProductIds, id]);
    }
  };

  const selectedProducts = products.filter(p => selectedProductIds.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input 
          type="text"
          placeholder="Search products by name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Products */}
        <div className="border border-border rounded-xl bg-surface overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3 border-b border-border bg-background">
            <h3 className="font-bold text-text-primary text-sm">Available Products</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredProducts.map(product => {
              const isSelected = selectedProductIds.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-warning-soft border border-amber-200' : 'hover:bg-background border border-transparent'
                  }`}
                >
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                    <p className="text-xs text-text-muted font-mono truncate">{product.sku}</p>
                  </div>
                  {isSelected ? (
                    <FiCheck className="text-warning mr-2" />
                  ) : (
                    <FiPlus className="text-text-muted mr-2" />
                  )}
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-text-muted text-sm">No products found.</div>
            )}
          </div>
        </div>

        {/* Selected Products */}
        <div className="border border-border rounded-xl bg-surface overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3 border-b border-border bg-background flex justify-between items-center">
            <h3 className="font-bold text-text-primary text-sm">Selected Products</h3>
            <span className="text-xs font-mono bg-stone-200 px-2 py-0.5 rounded text-text-secondary">
              {selectedProducts.length} Items
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {selectedProducts.map(product => (
              <div 
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-background border border-border"
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                  <p className="text-xs text-text-muted font-mono truncate">{product.sku}</p>
                </div>
                <button 
                  onClick={() => toggleProduct(product.id)}
                  className="p-1.5 text-text-muted hover:text-danger hover:bg-danger-soft rounded transition-colors mr-1"
                >
                  <FiX />
                </button>
              </div>
            ))}
            {selectedProducts.length === 0 && (
              <div className="p-8 text-center text-text-muted text-sm">No products selected.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
