import { formatCurrency } from '../../utils/formatCurrency';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiHeart, FiMinus, FiPlus, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductActions({ product, selectedVariants, activePrice }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCommerce();
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  // ── Real-time available stock from inventory API ──────────────────────────
  // product.stock is a stale denormalized field that is NOT updated when
  // warehouse inventory is adjusted. We fetch live available stock here so
  // the quantity selector always reflects the true warehouse quantity.
  const [inventoryStock, setInventoryStock] = useState(null); // null = loading

  const fetchInventoryStock = useCallback(async () => {
    if (!product?.id) return;
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        const rows = Array.isArray(data) ? data : (data.inventory || data.items || []);
        // Sum available quantity across all warehouses for this product
        const totalAvailable = rows
          .filter(row => String(row.productId) === String(product.id))
          .reduce((sum, row) => sum + Math.max(0, row.availableQuantity ?? row.available ?? 0), 0);
        setInventoryStock(totalAvailable);
      } else {
        // API unavailable — fall back to product.stock
        setInventoryStock(null);
      }
    } catch {
      // Network error — fall back to product.stock
      setInventoryStock(null);
    }
  }, [product?.id]);

  useEffect(() => { fetchInventoryStock(); }, [fetchInventoryStock]);

  // Use live inventory stock when available; fall back to product.stock field
  const stock = inventoryStock !== null ? inventoryStock : (product.stock ?? 0);
  const isOutOfStock = stock <= 0;
  
  // No need for local isWishlisted state since we have isInWishlist
  const isWishlisted = isInWishlist(product.id);

  // Clamp quantity down if real stock turns out to be lower than selected
  useEffect(() => {
    if (stock > 0 && quantity > stock) {
      setQuantity(stock);
    }
  }, [stock]);


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

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const showToastNotification = (name) => {
    setToast(name);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 1500);
  };

  const handleQuantityChange = (delta) => {
    if (isOutOfStock) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Block if stock is 0, negative, null, or undefined
    if (!product || stock < 1) return;
    addToCart(product, selectedVariants, quantity);
    showToastNotification(product.name);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedVariants, quantity);
    // User requested Buy Now to just prepare cart for now. We can simulate a fast-track.
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const formattedPrice = formatCurrency(activePrice);

  return (
    <>
      {/* Add-to-Cart Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="cart-toast"
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-4 right-4 z-[9999] flex items-center gap-2.5 bg-white border border-gray-200 shadow-lg rounded-full pl-3 pr-5 py-2.5 max-w-xs"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 flex-shrink-0">
              <FiCheckCircle size={13} className="text-white" />
            </span>
            <span className="text-[13px] text-gray-800 truncate">
              <span className="font-semibold text-gray-900">{toast}</span>
              <span className="text-gray-500"> added to cart</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center gap-6 mb-2">
          <span className="text-[15px] text-gray-700 font-medium">Quantity</span>
          {isOutOfStock ? (
            /* Show badge when stock is 0 or negative */
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[12px] font-semibold text-red-600 tracking-wide">Out of Stock</span>
            </span>
          ) : (
            <div className="flex items-center border border-gray-200 h-10 w-32 bg-white">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors w-10 h-full flex justify-center items-center"
              >
                <FiMinus size={14} />
              </button>
              <span className="flex-1 text-[14px] font-medium text-gray-800 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors w-10 h-full flex justify-center items-center"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full flex h-[56px] rounded-lg overflow-hidden cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          {/* Left Side: Price */}
          <div className={`w-[45%] flex flex-col items-center justify-center p-2 border-r transition-colors ${
            isOutOfStock
              ? 'bg-gray-300 border-gray-300'
              : 'bg-[#D3161D] border-[#E61B23]'
          } text-white`}>
            <span className="text-[16px] font-bold leading-tight">{formattedPrice}</span>
            <span className="text-[11px] font-normal opacity-80">
              {isOutOfStock ? 'Unavailable' : `${formattedPrice} x ${quantity}`}
            </span>
          </div>
          {/* Right Side: Action */}
          <div className={`w-[55%] flex items-center justify-center gap-2 p-2 text-white transition-colors ${
            isOutOfStock
              ? 'bg-gray-400'
              : 'bg-[#ED1C24] hover:bg-[#D3161D]'
          }`}>
            <FiShoppingCart size={18} />
            <span className="text-[15px] font-medium">
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </span>
          </div>
        </button>

        {/* EMI Button */}
        <button className="w-full h-[50px] bg-[#FDEAEB] text-[#ED1C24] font-bold text-[15px] rounded-lg hover:bg-[#F9D6D6] transition-colors">
          EMI {formatCurrency(Math.round(activePrice / 12))}
        </button>

        {/* Small Accordions */}
        <div className="flex flex-col border border-gray-100 mt-4">
          <button className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="text-[14px] font-normal text-gray-500">Packaging Information</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-[14px] font-normal text-gray-500">Need Help?</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[14px] font-normal text-gray-500">12 Months warranty</span>
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
