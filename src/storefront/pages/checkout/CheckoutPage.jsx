import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCommerce } from '../../context/CommerceContext';
import { CheckoutProvider, useCheckout } from '../../context/CheckoutContext';
import { PaymentProvider } from '../../context/PaymentContext';
import { FiChevronLeft, FiLock, FiAlertCircle } from 'react-icons/fi';
import CustomerInformation from '../../components/checkout/CustomerInformation';
import DeliveryStep from '../../components/checkout/DeliveryStep';
import PaymentStep from '../../components/checkout/PaymentStep';
import ReviewStep from '../../components/checkout/ReviewStep';
import OrderSummary from '../../components/checkout/OrderSummary';
import CheckoutProgress from '../../components/checkout/CheckoutProgress';

function CheckoutContent() {
  const { cartItems } = useCommerce();
  const navigate = useNavigate();
  const { currentStep, validationErrors } = useCheckout();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] flex flex-col lg:flex-row">
      {/* Left Column - Main Form */}
      <div className="flex-1 lg:w-[55%] xl:w-[60%] border-r border-black/5 bg-white relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight text-[#1A1A1A]">
              AURA
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-black/5">
              <FiLock size={14} className="text-green-600" />
              Secure Checkout
            </div>
          </div>

          <CheckoutProgress />

          {validationErrors.length > 0 && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-800 text-sm">
              <FiAlertCircle className="shrink-0 mt-0.5 text-red-500" />
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 'information' && <CustomerInformation />}
            {currentStep === 'delivery' && <DeliveryStep />}
            {currentStep === 'payment' && <PaymentStep />}
            {currentStep === 'review' && <ReviewStep />}
          </div>

        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#F9F8F6] border-t lg:border-t-0 border-black/5 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0">
        <div className="max-w-xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <PaymentProvider>
      <CheckoutProvider>
        <CheckoutContent />
      </CheckoutProvider>
    </PaymentProvider>
  );
}
