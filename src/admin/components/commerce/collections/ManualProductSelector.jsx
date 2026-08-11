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
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input 
          type="text"
          placeholder="Search products by name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Products */}
        <div className="border border-stone-200 rounded-xl bg-white overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3 border-b border-stone-200 bg-stone-50">
            <h3 className="font-bold text-stone-900 text-sm">Available Products</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredProducts.map(product => {
              const isSelected = selectedProductIds.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-50 border border-amber-200' : 'hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-stone-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                    <p className="text-xs text-stone-500 font-mono truncate">{product.sku}</p>
                  </div>
                  {isSelected ? (
                    <FiCheck className="text-amber-600 mr-2" />
                  ) : (
                    <FiPlus className="text-stone-400 mr-2" />
                  )}
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-stone-500 text-sm">No products found.</div>
            )}
          </div>
        </div>

        {/* Selected Products */}
        <div className="border border-stone-200 rounded-xl bg-white overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
            <h3 className="font-bold text-stone-900 text-sm">Selected Products</h3>
            <span className="text-xs font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-700">
              {selectedProducts.length} Items
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {selectedProducts.map(product => (
              <div 
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-stone-50 border border-stone-200"
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-stone-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                  <p className="text-xs text-stone-500 font-mono truncate">{product.sku}</p>
                </div>
                <button 
                  onClick={() => toggleProduct(product.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors mr-1"
                >
                  <FiX />
                </button>
              </div>
            ))}
            {selectedProducts.length === 0 && (
              <div className="p-8 text-center text-stone-500 text-sm">No products selected.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
