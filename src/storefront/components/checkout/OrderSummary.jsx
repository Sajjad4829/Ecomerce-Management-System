import { useCommerce } from '../../context/CommerceContext';
import { useCheckout } from '../../context/CheckoutContext';
import CouponInput from '../cart/CouponInput';

export default function OrderSummary() {
  const { cartItems } = useCommerce();
  const { totals } = useCheckout();

  return (
    <div className="sticky top-8">
      {/* Items */}
      <div className="space-y-4 mb-8">
        {cartItems.map(item => {
          const imageUrl = item.variant?.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';
          
          return (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 bg-white border border-black/10 rounded-lg overflow-hidden shrink-0">
                <img src={imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-black/60 backdrop-blur text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-bold text-[#1A1A1A]">{item.product.name}</p>
                {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                  <p className="text-gray-500 text-xs mt-0.5">
                    {Object.entries(item.selectedVariants).map(([k, v]) => `${v}`).join(' / ')}
                  </p>
                )}
                {!item.selectedVariants && item.variant && (
                  <p className="text-gray-500 text-xs mt-0.5">{item.variant.title}</p>
                )}
              </div>
              <div className="text-sm font-bold text-[#1A1A1A]">
                ${(item.unitPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <CouponInput />
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-black/10 text-sm">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-[#1A1A1A]">${totals.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        
        {totals.discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount</span>
            <span>-${totals.discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-[#1A1A1A]">
            {totals.shipping === 0 ? 'Calculated at next step' : `$${totals.shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-gray-600">
          <span>Estimated Taxes</span>
          <span className="font-medium text-[#1A1A1A]">${totals.tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <span className="text-base font-bold text-[#1A1A1A]">Total</span>
        <div className="text-right">
          <span className="text-sm text-gray-500 mr-2">USD</span>
          <span className="text-3xl font-bold text-[#1A1A1A]">${totals.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
