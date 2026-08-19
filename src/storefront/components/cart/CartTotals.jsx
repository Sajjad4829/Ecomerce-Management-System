import { useCommerce } from '../../context/CommerceContext';
import CouponInput from './CouponInput';
import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

export default function CartTotals() {
  const { cartSubtotal } = useCommerce();

  // Placeholder calculations
  const discount = 0; // Prepare for real discount calculation
  const shipping = cartSubtotal > 5000 ? 0 : 150; // $150 flat shipping under $5k
  const tax = cartSubtotal * 0.08; // 8% placeholder tax
  const total = cartSubtotal - discount + shipping + tax;

  return (
    <div className="bg-[#F7F5F2] rounded-xl p-8 sticky top-28">
      <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-6">Order Summary</h3>
      
      <div className="mb-6">
        <CouponInput />
      </div>

      <div className="space-y-4 mb-6 pb-6 border-b border-black/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-[#1A1A1A]">${cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-sm text-green-600">
            <span>Discount</span>
            <span>-${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-[#1A1A1A]">
            {shipping === 0 ? 'Free' : `$${shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium text-[#1A1A1A]">${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8">
        <span className="text-base font-bold text-[#1A1A1A]">Total</span>
        <span className="text-3xl font-bold text-[#1A1A1A]">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>

      <Link to="/checkout" className="w-full h-14 bg-[#1A1A1A] text-white text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10">
        Proceed to Checkout <FiArrowRight size={16} />
      </Link>

      <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
        <span className="text-xs font-medium uppercase tracking-widest">Secure Checkout</span>
      </div>
    </div>
  );
}
