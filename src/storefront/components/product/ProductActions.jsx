import React, { useState, useEffect } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductActions({ product, selectedVariants, activePrice }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCommerce();
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);

  const isOutOfStock = product.stock <= 0;
  
  // No need for local isWishlisted state since we have isInWishlist
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA on mobile when scrolling past the main actions
      if (window.innerWidth < 1024) {
        setShowSticky(window.scrollY > 800); 
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedVariants, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedVariants, quantity);
    // User requested Buy Now to just prepare cart for now. We can simulate a fast-track.
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const formattedPrice = activePrice.toLocaleString('en-US', { minimumFractionDigits: 0 }) + ' BDT';

  return (
    <>
      <div className="flex flex-col gap-4 mt-6">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between h-[60px] mb-6 mt-2 border-b border-gray-200 pb-8">
          <span className="text-[17px] font-normal text-slate-700 tracking-wide">Quantity</span>
          <div className="flex items-center justify-between border border-gray-100 h-[60px] w-[220px] rounded-xl bg-white">
            <button 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || isOutOfStock}
              className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors w-[60px] h-full flex justify-center items-center"
              aria-label="Decrease quantity"
            >
              <svg className="w-[14px] h-[2px]" fill="currentColor" viewBox="0 0 14 2">
                <rect width="14" height="2" />
              </svg>
            </button>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <span className="flex-1 text-[17px] font-normal text-slate-700 text-center">{quantity}</span>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <button 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock || isOutOfStock}
              className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors w-[60px] h-full flex justify-center items-center"
              aria-label="Increase quantity"
            >
              <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 14 14">
                <polygon points="14,6 8,6 8,0 6,0 6,6 0,6 0,8 6,8 6,14 8,14 8,8 14,8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full flex h-[60px] bg-[#EE2737] rounded-[24px] overflow-hidden hover:bg-[#D6222E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {/* Left Side: Price */}
          <div className="flex-1 flex flex-col items-center justify-center text-white p-2">
            <span className="text-[18px] font-bold leading-tight tracking-wide">{formattedPrice}</span>
            <span className="text-[12px] font-normal opacity-90 tracking-wide">{formattedPrice}x{quantity}</span>
          </div>
          <div className="w-[1.5px] h-10 bg-white/90 my-auto rounded-full"></div>
          {/* Right Side: Action */}
          <div className="flex-1 flex items-center justify-center gap-2 text-white p-2">
            <FiShoppingCart size={20} strokeWidth={2.5} />
            <span className="text-[16px] font-medium tracking-wide">{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </div>
        </button>

        {/* EMI Button */}
        <button className="w-full h-[52px] bg-[#FCE8E8] text-[#EE2737] font-bold text-[16px] rounded-[24px] hover:bg-[#F9D6D6] transition-colors mb-6 tracking-wide shadow-sm">
          EMI 956 BDT
        </button>

        {/* Small Accordions */}
        <div className="flex flex-col bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100 mb-8">
          <button className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="text-[15px] font-normal text-gray-400 tracking-wide">Packaging Information</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-[15px] font-normal text-gray-400 tracking-wide">Need Help?</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[15px] font-normal text-gray-400 tracking-wide">12 Months warranty</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.1)] lg:hidden flex flex-col gap-3 safe-area-pb"
          >
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-medium text-gray-500">{product.name}</span>
              <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-[#EE2737] hover:bg-[#D6222E] text-white text-sm font-bold tracking-widest uppercase disabled:opacity-50 transition-colors rounded-lg"
              >
                <FiShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
