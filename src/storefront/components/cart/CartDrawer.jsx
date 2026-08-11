import { Fragment } from 'react';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cartItems, cartSubtotal } = useCommerce();

  if (!isCartDrawerOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-black/5 shrink-0">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <FiShoppingBag /> Your Cart
          </h2>
          <button 
            onClick={closeCartDrawer}
            className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#F7F5F2] rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
                Discover our latest collections and find something perfect for your space.
              </p>
              <button 
                onClick={closeCartDrawer}
                className="px-8 py-3 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="py-2">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-black/5 p-6 bg-[#F7F5F2] shrink-0">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                ${cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="grid gap-3">
              <Link 
                to="/checkout"
                onClick={closeCartDrawer}
                className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                Checkout <FiArrowRight size={16} />
              </Link>
              
              <Link 
                to="/cart"
                onClick={closeCartDrawer}
                className="w-full py-3 bg-white border border-black/10 text-[#1A1A1A] text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
