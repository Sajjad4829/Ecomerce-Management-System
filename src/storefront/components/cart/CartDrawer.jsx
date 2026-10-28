import { formatCurrency } from '../../utils/formatCurrency';
import { Fragment } from 'react';
import { FiX, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
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
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 shrink-0">
          <h2 className="text-[20px] font-normal text-[#1A1A1A]">
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={closeCartDrawer}
            className="w-8 h-8 bg-[#ED1C24] hover:bg-[#D3161D] text-white flex items-center justify-center transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FiShoppingBag size={28} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your Cart is Empty</h3>
              <Link 
                to="/shop"
                onClick={closeCartDrawer}
                className="px-6 py-2.5 bg-[#ED1C24] text-white text-sm font-medium hover:bg-[#D3161D] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white shrink-0 border-t border-gray-200">
            <div className="mb-4">
              <p className="text-center text-[16px] font-bold text-[#1A1A1A]">
                Total: {formatCurrency(cartSubtotal)}
              </p>
            </div>
            
            <Link 
              to="/cart"
              onClick={closeCartDrawer}
              className="w-full py-2.5 bg-white border border-[#ED1C24] text-[#ED1C24] text-[15px] font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              View Cart <FiShoppingCart size={18} />
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}
