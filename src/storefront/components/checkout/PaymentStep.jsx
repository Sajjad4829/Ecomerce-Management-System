import { useCheckout } from '../../context/CheckoutContext';
import { usePayment } from '../../context/PaymentContext';
import { FiArrowRight, FiArrowLeft, FiCreditCard, FiSmartphone, FiBriefcase, FiDollarSign } from 'react-icons/fi';

const METHOD_ICONS = {
  online: <FiCreditCard size={20} className="text-gray-600" />,
  mfs: <FiSmartphone size={20} className="text-gray-600" />,
  bank_transfer: <FiBriefcase size={20} className="text-gray-600" />,
  cod: <FiDollarSign size={20} className="text-gray-600" />
};

export default function PaymentStep() {
  const { contactInfo, shippingAddress, prevStep, nextStep } = useCheckout();
  const { availableMethods, selectedMethod, selectPaymentMethod } = usePayment();

  return (
    <div className="space-y-10">
      
      {/* Review Information Block */}
      <div className="border border-black/10 rounded-xl divide-y divide-black/5 text-sm">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-16">Contact</span>
            <span className="text-[#1A1A1A]">{contactInfo.email}</span>
          </div>
          <button onClick={() => { prevStep(); prevStep(); }} className="text-xs font-semibold text-black underline">Change</button>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-16">Ship to</span>
            <span className="text-[#1A1A1A]">
              {shippingAddress.address1}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </span>
          </div>
          <button onClick={() => { prevStep(); prevStep(); }} className="text-xs font-semibold text-black underline">Change</button>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-4">Payment Method</h2>
        <p className="text-sm text-gray-500 mb-6">All transactions are secure and encrypted.</p>

        <div className="border border-black/10 rounded-xl divide-y divide-black/5">
          {availableMethods.map(method => (
            <div key={method.id}>
              <label className={`flex items-start p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedMethod?.id === method.id ? 'bg-gray-50' : ''}`}>
                <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 mr-4">
                  <input 
                    type="radio" 
                    name="payment_method"
                    checked={selectedMethod?.id === method.id}
                    onChange={() => selectPaymentMethod(method)}
                    className="peer appearance-none w-5 h-5 border border-black/20 rounded-full checked:border-black transition-colors cursor-pointer"
                  />
                  <div className="absolute w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block text-sm font-semibold text-[#1A1A1A]">{method.name}</span>
                    {METHOD_ICONS[method.id]}
                  </div>
                  <span className="block text-xs text-gray-500 mt-1">{method.description}</span>
                </div>
              </label>

              {selectedMethod?.id === method.id && (
                <div className="p-4 bg-gray-50 border-t border-black/5 text-sm text-gray-600">
                  {method.id === 'online' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <FiCreditCard size={32} className="text-gray-400 mb-3" />
                      <p>After clicking "Pay Now", you will be redirected to complete your purchase securely.</p>
                    </div>
                  )}
                  {method.id === 'mfs' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <FiSmartphone size={32} className="text-gray-400 mb-3" />
                      <p>After clicking "Pay Now", you will be redirected to your mobile payment provider.</p>
                    </div>
                  )}
                  {method.id === 'bank_transfer' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <FiBriefcase size={32} className="text-gray-400 mb-3" />
                      <p>Please transfer the amount to Account Number: 123-456-789. Use your Order ID as reference.</p>
                    </div>
                  )}
                  {method.id === 'cod' && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <FiDollarSign size={32} className="text-gray-400 mb-3" />
                      <p>You will pay for your order upon delivery.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-black/10 z-50 lg:static lg:bg-transparent lg:border-t-0 lg:p-0 lg:pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={prevStep}
          className="w-full sm:w-auto py-4 text-sm font-medium text-gray-500 hover:text-black flex items-center justify-center gap-2"
        >
          <FiArrowLeft size={16} /> Return to delivery
        </button>
        <button 
          onClick={nextStep}
          className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10"
        >
          Continue to Review <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
