import { useCheckout } from '../../context/CheckoutContext';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function DeliveryStep() {
  const { 
    shippingAddress, 
    contactInfo,
    shippingMethod, setShippingMethod,
    shippingMethods,
    orderNotes, setOrderNotes,
    nextStep, prevStep
  } = useCheckout();

  return (
    <div className="space-y-10">
      
      {/* Review Information Block */}
      <div className="border border-black/10 rounded-xl divide-y divide-black/5 text-sm">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-16">Contact</span>
            <span className="text-[#1A1A1A]">{contactInfo.email}</span>
          </div>
          <button onClick={prevStep} className="text-xs font-semibold text-black underline">Change</button>
        </div>
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-gray-500 w-16">Ship to</span>
            <span className="text-[#1A1A1A]">
              {shippingAddress.address1}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </span>
          </div>
          <button onClick={prevStep} className="text-xs font-semibold text-black underline">Change</button>
        </div>
      </div>

      {/* Shipping Methods */}
      <section>
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-4">Shipping method</h2>
        <div className="border border-black/10 rounded-xl divide-y divide-black/5">
          {shippingMethods.map(method => (
            <label key={method.id} className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50 ${shippingMethod?.id === method.id ? 'bg-gray-50' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input 
                    type="radio" 
                    name="shipping_method"
                    checked={shippingMethod?.id === method.id}
                    onChange={() => setShippingMethod(method)}
                    className="peer appearance-none w-5 h-5 border border-black/20 rounded-full checked:border-black transition-colors cursor-pointer"
                  />
                  <div className="absolute w-2.5 h-2.5 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-[#1A1A1A]">{method.name}</span>
                  <span className="block text-xs text-gray-500">{method.estimatedDelivery} &middot; {method.description}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#1A1A1A]">
                {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Order Notes */}
      <section>
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-4">Delivery Notes (Optional)</h2>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Special instructions for delivery (e.g. building access code, call before arrival)"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm h-32 resize-none"
        />
      </section>

      <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <button 
          onClick={prevStep}
          className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2"
        >
          <FiArrowLeft size={16} /> Return to information
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
