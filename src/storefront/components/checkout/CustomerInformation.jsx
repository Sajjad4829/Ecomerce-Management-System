import { useCheckout } from '../../context/CheckoutContext';
import { FiArrowRight } from 'react-icons/fi';
import AddressForm from './AddressForm';

export default function CustomerInformation() {
  const { 
    contactInfo, setContactInfo, 
    shippingAddress, setShippingAddress, 
    nextStep 
  } = useCheckout();

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Contact Information</h2>
          <span className="text-sm text-gray-500">
            Already have an account? <button className="text-black underline font-medium hover:text-gray-700">Log in</button>
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactChange}
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={contactInfo.firstName}
              onChange={handleContactChange}
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={contactInfo.lastName}
              onChange={handleContactChange}
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactChange}
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm transition-colors"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-4">Shipping Address</h2>
        <AddressForm address={shippingAddress} setAddress={setShippingAddress} />
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-black/10 z-50 lg:static lg:bg-transparent lg:border-t-0 lg:p-0 lg:pt-6 flex flex-col sm:flex-row items-center justify-end">
        <button 
          onClick={nextStep}
          className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10"
        >
          Continue to Delivery <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
