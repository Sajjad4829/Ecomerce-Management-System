import { useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiDownload, FiArrowRight } from 'react-icons/fi';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId } = useParams();
  const order = location.state?.order;

  // Fallback if accessed directly without state
  if (!order) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">Order Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find the order details for {orderId}.</p>
        <Link to="/" className="px-6 py-3 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Order Confirmed</p>
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Thank you for your purchase!</h1>
          <p className="text-lg text-gray-500">
            Order <span className="font-bold text-[#1A1A1A]">{order.id}</span>
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
          <h2 className="text-xl font-serif font-bold mb-6 pb-6 border-b border-black/10">Order Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pb-8 border-b border-black/10">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Customer</h3>
              <p className="text-[#1A1A1A]">{order.customer.firstName} {order.customer.lastName}</p>
              <p className="text-gray-600">{order.customer.email}</p>
              <p className="text-gray-600">{order.customer.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Shipping Address</h3>
              <p className="text-[#1A1A1A]">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-gray-600">{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && <p className="text-gray-600">{order.shippingAddress.address2}</p>}
              <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Shipping Method</h3>
              <p className="text-[#1A1A1A] flex items-center gap-2"><FiPackage /> {order.shippingMethod.name}</p>
              <p className="text-gray-600 text-sm mt-1">{order.shippingMethod.estimatedDelivery}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Payment</h3>
              <p className="text-green-600 font-semibold">{order.paymentStatus}</p>
              <p className="text-gray-600 text-sm mt-1 uppercase">
                {order.transaction ? `${order.transaction.method.replace('_', ' ')}` : 'Credit Card ending in 4242'}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Items</h3>
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 bg-white border border-black/10 rounded-lg overflow-hidden shrink-0">
                  <img src={item.variant?.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400'} alt={item.product.name} className="w-full h-full object-cover" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-black/60 backdrop-blur text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-bold text-[#1A1A1A]">{item.product.name}</p>
                  {item.variant && <p className="text-gray-500">{item.variant.title}</p>}
                </div>
                <div className="text-sm font-bold text-[#1A1A1A]">
                  ${(item.unitPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-black/5 rounded-xl p-6 text-sm">
            <div className="space-y-3 mb-4 pb-4 border-b border-black/5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.totals.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${order.totals.shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>${order.totals.tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-[#1A1A1A]">Total</span>
              <span className="text-2xl font-bold text-[#1A1A1A]">${order.totals.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm">
            Continue Shopping <FiArrowRight size={16} />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border border-black/10 text-[#1A1A1A] text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <FiDownload size={16} /> Download Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
