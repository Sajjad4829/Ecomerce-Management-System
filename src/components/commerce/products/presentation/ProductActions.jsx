import React, { useState } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi';

export default function ProductActions({ product, activeVariant }) {
  const [quantity, setQuantity] = useState(1);
  
  const inventory = product?.inventory || {};
  const stock = activeVariant ? activeVariant.stock : inventory.totalStock;
  const isOutOfStock = stock <= 0;

  return (
    <div className="pt-6 space-y-4">
      <div className="flex gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-stone-200 bg-white h-12 w-32 shrink-0">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-center text-sm font-semibold text-stone-900 bg-transparent focus:outline-none appearance-none"
            min="1"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* Add to Cart */}
        <button 
          disabled={isOutOfStock}
          className={`flex-1 h-12 font-bold text-sm tracking-widest uppercase transition-all ${
            isOutOfStock 
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-stone-900'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button 
          disabled={isOutOfStock}
          className={`flex-1 h-12 font-bold text-sm tracking-widest uppercase transition-all border ${
            isOutOfStock 
              ? 'border-stone-200 text-stone-400 cursor-not-allowed'
              : 'border-black text-black hover:bg-stone-50'
          }`}
        >
          Buy Now
        </button>
        
        <button className="h-12 w-12 border border-stone-200 text-stone-600 hover:text-black hover:border-black transition-all flex items-center justify-center bg-white">
          <FiHeart size={20} strokeWidth={1.5} />
        </button>
        <button className="h-12 w-12 border border-stone-200 text-stone-600 hover:text-black hover:border-black transition-all flex items-center justify-center bg-white">
          <FiShare2 size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
