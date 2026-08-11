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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <input
              type="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="firstName"
              value={contactInfo.firstName}
              onChange={handleContactChange}
              placeholder="First name (optional for guest)"
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={contactInfo.lastName}
              onChange={handleContactChange}
              placeholder="Last name (optional for guest)"
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="tel"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactChange}
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mb-4">Shipping Address</h2>
        <AddressForm address={shippingAddress} setAddress={setShippingAddress} />
      </section>

      <div className="pt-6">
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
