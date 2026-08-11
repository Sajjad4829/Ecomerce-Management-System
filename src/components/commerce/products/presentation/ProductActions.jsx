import React, { useState } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShare2, FiShoppingBag } from 'react-icons/fi';

export default function ProductActions({ product, activeVariant }) {
  const [quantity, setQuantity] = useState(1);
  
  const inventory = product?.inventory || {};
  const stock = activeVariant ? activeVariant.stock : inventory.totalStock;
  const isOutOfStock = stock <= 0;

  return (
    <div className="pt-2 space-y-4">
      <div className="flex gap-3 h-[52px]">
        {/* Quantity Selector */}
        <div className="flex items-center bg-white border border-[#E5E7F2] rounded-[12px] h-full w-[130px] shrink-0 overflow-hidden shadow-sm">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-[#4F46FF] hover:bg-[#F0EFFF] transition-colors"
          >
            <FiMinus size={16} />
          </button>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-center text-[15px] font-bold text-[#111A4A] bg-transparent focus:outline-none appearance-none"
            min="1"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-[#4F46FF] hover:bg-[#F0EFFF] transition-colors"
          >
            <FiPlus size={16} />
          </button>
        </div>

        {/* Add to Cart / Sold Out */}
        <button 
          disabled={isOutOfStock}
          className={`flex-1 h-full font-bold text-[13px] tracking-widest uppercase transition-all rounded-[12px] text-white shadow-md ${
            isOutOfStock 
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]'
              : 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>

      <div className="flex gap-3 h-[52px]">
        <button 
          disabled={isOutOfStock}
          className={`flex-1 h-full flex items-center justify-center gap-2 font-bold text-[13px] tracking-widest uppercase transition-all rounded-[12px] text-white shadow-md ${
            isOutOfStock 
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] opacity-90'
              : 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          <FiShoppingBag size={18} />
          Buy Now
        </button>
        
        <button className="h-full w-[52px] shrink-0 border border-[#E5E7F2] text-[#6366F1] shadow-sm hover:bg-[#F0EFFF] rounded-[12px] transition-all flex items-center justify-center bg-white">
          <FiHeart size={20} />
        </button>
        <button className="h-full w-[52px] shrink-0 border border-[#E5E7F2] text-[#6366F1] shadow-sm hover:bg-[#F0EFFF] rounded-[12px] transition-all flex items-center justify-center bg-white">
          <FiShare2 size={20} />
        </button>
      </div>
    </div>
  );
}
