import React, { useState } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShare2, FiShoppingBag } from 'react-icons/fi';
import { useInventory } from '../../../../admin/context/inventory/InventoryContext';
import { useCommerce } from '../../../../storefront/context/CommerceContext';
import { useNavigate } from 'react-router-dom';

export default function ProductActions({ product, activeVariant }) {
  const [quantity, setQuantity] = useState(1);
  const { getProductInventory } = useInventory();
  const { addToCart } = useCommerce();
  const navigate = useNavigate();
  
  // Calculate true available stock across all warehouses
  const productInventory = getProductInventory(product.id);
  const totalAvailableStock = productInventory.reduce((sum, item) => sum + item.available, 0);

  const fallbackStock = activeVariant ? activeVariant.stock : (product?.inventory?.totalStock || 0);
  const stock = totalAvailableStock !== undefined && productInventory.length > 0 ? totalAvailableStock : fallbackStock;
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.basicInfo?.name || product.name,
      price: activeVariant ? activeVariant.price : product.price,
      quantity: quantity,
      sku: activeVariant ? activeVariant.sku : product.sku,
      image: activeVariant?.image || product.media?.primaryImage
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="pt-2">
      <div className="flex flex-wrap items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center bg-white border border-[#E5E7F2] rounded-md h-9 w-[100px] shrink-0 overflow-hidden shadow-sm">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-full flex items-center justify-center text-[#4F46FF] hover:bg-[#F0EFFF] transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-center text-xs font-semibold text-[#111A4A] bg-transparent focus:outline-none appearance-none"
            min="1"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-full flex items-center justify-center text-[#4F46FF] hover:bg-[#F0EFFF] transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* Add to Cart / Sold Out */}
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`h-9 px-6 font-medium text-sm transition-all rounded-md text-white shadow-sm ${
            isOutOfStock 
              ? 'bg-[#8B5CF6]'
              : 'bg-[#8B5CF6] hover:bg-[#7C3AED] hover:shadow'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>

        <button 
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`h-9 px-6 flex items-center justify-center gap-2 font-medium text-sm transition-all rounded-md text-white shadow-sm ${
            isOutOfStock 
              ? 'bg-[#8B5CF6] opacity-90'
              : 'bg-[#8B5CF6] hover:bg-[#7C3AED] hover:shadow'
          }`}
        >
          <FiShoppingBag size={14} />
          Buy Now
        </button>
        
        <button className="h-9 w-9 shrink-0 border border-[#E5E7F2] text-[#8B5CF6] shadow-sm hover:bg-[#F0EFFF] rounded-md transition-all flex items-center justify-center bg-white">
          <FiHeart size={14} />
        </button>
        <button className="h-9 w-9 shrink-0 border border-[#E5E7F2] text-[#8B5CF6] shadow-sm hover:bg-[#F0EFFF] rounded-md transition-all flex items-center justify-center bg-white">
          <FiShare2 size={14} />
        </button>
      </div>
    </div>
  );
}
