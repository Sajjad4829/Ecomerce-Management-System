import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import CartItem from '../../components/cart/CartItem';
import CartTotals from '../../components/cart/CartTotals';
import CartValidation from '../../components/cart/CartValidation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, cartSubtotal } = useCommerce();

  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-in fade-in duration-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-0">
        
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shopping Cart</h1>
          <Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2">
            Continue Shopping <FiArrowRight size={14} />
          </Link>
        </div>

        <CartValidation />

        {cartItems.length === 0 ? (
          <div className="text-center py-32 border border-black/5 rounded-2xl bg-[#F7F5F2]">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <FiShoppingBag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Discover something beautiful for your space.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white text-sm font-bold tracking-widest uppercase rounded hover:bg-black transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-black/10 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-8">Product</div>
                <div className="col-span-4 text-right">Total</div>
              </div>
              <div className="divide-y divide-black/5">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 xl:col-span-4">
              <CartTotals />
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Checkout Bar */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.1)] lg:hidden flex flex-col gap-3 safe-area-pb"
          >
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total</span>
              <span className="text-xl font-bold text-gray-900">${cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <Link 
              to="/checkout"
              className="w-full h-14 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <FiArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
