import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import CartItem from '../../components/cart/CartItem';
import CartTotals from '../../components/cart/CartTotals';
import CartValidation from '../../components/cart/CartValidation';

export default function CartPage() {
  const { cartItems } = useCommerce();

  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shopping Cart</h1>
          <Link to="/products" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2">
            Continue Shopping <FiArrowRight size={14} />
          </Link>
        </div>

        <CartValidation />

        {cartItems.length === 0 ? (
          <div className="text-center py-32 border border-black/5 rounded-2xl bg-[#F7F5F2]">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <FiShoppingBag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Before you proceed to checkout, you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded hover:bg-black transition-colors"
            >
              Return To Shop
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
    </div>
  );
}
