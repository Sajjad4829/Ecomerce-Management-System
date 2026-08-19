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

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 h-14">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between border border-gray-200 h-full w-32 px-4">
            <button 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || isOutOfStock}
              className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} />
            </button>
            <span className="text-base font-medium text-gray-900 w-8 text-center">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock || isOutOfStock}
              className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus size={16} />
            </button>
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleToggleWishlist}
            className={`w-14 h-14 shrink-0 flex items-center justify-center border rounded-lg transition-colors
              ${isWishlisted ? 'border-black text-black' : 'border-black/20 text-gray-400 hover:border-black hover:text-black'}`}
            aria-label="Wishlist"
          >
            <FiHeart size={20} className={isWishlisted ? 'fill-black' : ''} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 flex items-center justify-center gap-2 h-14 bg-white border border-gray-900 text-gray-900 font-bold tracking-widest uppercase hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiShoppingCart size={18} />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="flex-1 h-14 bg-gray-900 text-white font-bold tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Buy It Now
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
              <span className="text-lg font-bold text-gray-900">${activePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 h-12 bg-white border border-gray-900 text-gray-900 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 h-12 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
