import { useCheckout } from '../../context/CheckoutContext';
import { usePayment } from '../../context/PaymentContext';
import { FiArrowLeft, FiCreditCard, FiSmartphone, FiBriefcase, FiDollarSign, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import AddressForm from './AddressForm';
import { useNavigate } from 'react-router-dom';
import { useCommerce } from '../../context/CommerceContext';
import { useToast } from '../../../components/ui/Toast/ToastContext';
import PaymentSimulatorModal from './PaymentSimulatorModal';

const METHOD_ICONS = {
  online: <FiCreditCard size={16} className="text-gray-500" />,
  mfs: <FiSmartphone size={16} className="text-gray-500" />,
  bank_transfer: <FiBriefcase size={16} className="text-gray-500" />,
  cod: <FiDollarSign size={16} className="text-gray-500" />
};

export default function ReviewStep() {
  const { 
    contactInfo, 
    shippingAddress, 
    shippingMethod,
    billingSameAsShipping, setBillingSameAsShipping,
    billingAddress, setBillingAddress,
    prevStep, createOrder, isProcessing
  } = useCheckout();

  const { selectedMethod, processPaymentPlaceholder, paymentStatus, retryPayment } = usePayment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayload, setCurrentPayload] = useState(null);
  const navigate = useNavigate();
  const { clearCart } = useCommerce();
  const { addToast } = useToast();

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    const payload = createOrderPayload();
    setCurrentPayload(payload);

    if (selectedMethod?.id === 'cod') {
      // Simulate COD processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      clearCart();
      navigate('/order/success', { state: { payload } });
    } else {
      // Show online payment simulator
      setIsProcessing(false);
      setIsModalOpen(true);
    }
  };

  const handleSimulateSuccess = () => {
    setIsModalOpen(false);
    setIsProcessing(true);
    
    // Create transaction record
    const txn = {
      id: `TXN-${Date.now()}`,
      provider: selectedMethod.provider,
      method: selectedMethod.id,
      amount: currentPayload.totals.grandTotal, 
      status: 'Succeeded',
      reference: 'SIMULATED_SUCCESS',
      createdAt: new Date().toISOString()
    };
    
    // Update payload
    const updatedPayload = {
      ...currentPayload,
      paymentStatus: 'Paid',
      transaction: txn
    };

    setIsProcessing(false);
    clearCart();
    navigate('/order/success', { state: { payload: updatedPayload } });
  };

  const handleSimulateFailure = () => {
    setIsModalOpen(false);
    addToast('Payment failed. Please try again.', 'error');
  };

  const isActuallyProcessing = isProcessing;

  return (
    <div className="space-y-10">
      
      {/* Review Information Block */}
      <div className="border border-black/10 rounded-xl divide-y divide-black/5 text-sm">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-24">Contact</span>
            <span className="text-[#1A1A1A]">{contactInfo.email}</span>
          </div>
          <button onClick={() => { prevStep(); prevStep(); prevStep(); }} className="text-xs font-semibold text-black underline" disabled={isActuallyProcessing}>Change</button>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-24">Ship to</span>
            <span className="text-[#1A1A1A]">
              {shippingAddress.address1}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </span>
          </div>
          <button onClick={() => { prevStep(); prevStep(); }} className="text-xs font-semibold text-black underline" disabled={isActuallyProcessing}>Change</button>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-24">Method</span>
            <span className="text-[#1A1A1A]">
              {shippingMethod?.name} &middot; {shippingMethod?.price === 0 ? 'Free' : `$${shippingMethod?.price.toFixed(2)}`}
            </span>
          </div>
          <button onClick={() => prevStep()} className="text-xs font-semibold text-black underline" disabled={isActuallyProcessing}>Change</button>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
            <span className="text-gray-500 w-24">Payment</span>
            <span className="text-[#1A1A1A] flex items-center gap-2">
              {selectedMethod ? METHOD_ICONS[selectedMethod.id] : null}
              {selectedMethod?.name || 'Not selected'}
            </span>
          </div>
          <button onClick={prevStep} className="text-xs font-semibold text-black underline" disabled={isActuallyProcessing}>Change</button>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Billing address</h3>
        <div className="border border-black/10 rounded-xl divide-y divide-black/5">
          <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="relative flex items-center justify-center w-5 h-5 mr-3">
              <input 
                type="radio" 
                checked={billingSameAsShipping}
                onChange={() => setBillingSameAsShipping(true)}
                disabled={isActuallyProcessing}
                className="peer appearance-none w-5 h-5 border border-black/20 rounded-full checked:border-black transition-colors cursor-pointer disabled:opacity-50"
              />
              <div className="absolute w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A]">Same as shipping address</span>
          </label>
          <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="relative flex items-center justify-center w-5 h-5 mr-3">
              <input 
                type="radio" 
                checked={!billingSameAsShipping}
                onChange={() => setBillingSameAsShipping(false)}
                disabled={isActuallyProcessing}
                className="peer appearance-none w-5 h-5 border border-black/20 rounded-full checked:border-black transition-colors cursor-pointer disabled:opacity-50"
              />
              <div className="absolute w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            </div>
            <span className="text-sm font-semibold text-[#1A1A1A]">Use a different billing address</span>
          </label>
        </div>

        {!billingSameAsShipping && (
          <div className="mt-4 p-4 border border-black/10 rounded-xl bg-gray-50">
            <AddressForm address={billingAddress} setAddress={setBillingAddress} disabled={isActuallyProcessing} />
          </div>
        )}
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-black/10 z-50 lg:static lg:bg-transparent lg:border-t-0 lg:p-0 lg:pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={prevStep}
          className="w-full sm:w-auto py-4 text-sm font-medium text-gray-500 hover:text-black flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isActuallyProcessing}
        >
          <FiArrowLeft size={16} /> Return to payment
        </button>
        <button 
          onClick={handlePlaceOrder}
          disabled={isActuallyProcessing}
          className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10 disabled:opacity-70"
        >
          {isActuallyProcessing ? 'Processing Payment...' : 'Place Order'}
        </button>
      </div>

      <PaymentSimulatorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSimulateSuccess}
        onFailure={handleSimulateFailure}
        payload={currentPayload}
        selectedMethod={selectedMethod}
      />
    </div>
  );
}
