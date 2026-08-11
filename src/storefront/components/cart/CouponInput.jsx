import { useState } from 'react';
import { FiTag, FiX } from 'react-icons/fi';

export default function CouponInput() {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState(null);

  const handleApply = (e) => {
    e.preventDefault();
    setError(null);
    if (!couponCode.trim()) return;

    // Placeholder logic for coupon validation
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discountPercent: 10 });
      setCouponCode('');
    } else {
      setError('Invalid or expired coupon code.');
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setError(null);
  };

  if (appliedCoupon) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
            <FiTag size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-green-800">{appliedCoupon.code}</p>
            <p className="text-xs text-green-600">{appliedCoupon.discountPercent}% off applied</p>
          </div>
        </div>
        <button 
          onClick={handleRemove}
          className="p-2 text-green-700 hover:bg-green-100 rounded-full transition-colors"
          title="Remove Coupon"
        >
          <FiX size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleApply} className="flex gap-2">
        <input 
          type="text" 
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Promo code" 
          className="flex-1 px-4 py-2 bg-white border border-black/10 rounded focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 text-sm font-medium uppercase"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-[#1A1A1A] text-white text-sm font-semibold rounded hover:bg-black transition-colors"
        >
          Apply
        </button>
      </form>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
