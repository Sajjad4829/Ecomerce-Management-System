import { useState } from 'react';
import { FiMapPin, FiPlus, FiMoreVertical, FiCheck } from 'react-icons/fi';

const MOCK_ADDRESSES = [
  { id: '1', type: 'Shipping & Billing', name: 'Eleanor Vance', line1: '123 Enterprise Way', line2: 'Suite 400', city: 'San Francisco', state: 'CA', postal: '94105', country: 'United States', phone: '+1 (555) 123-4567', isDefault: true },
  { id: '2', type: 'Shipping', name: 'Eleanor Vance (Office)', line1: '456 Business Blvd', line2: '', city: 'San Jose', state: 'CA', postal: '95110', country: 'United States', phone: '+1 (555) 987-6543', isDefault: false },
];

export default function AddressManager() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
          <FiMapPin className="text-gray-400" /> Saved Addresses
        </h3>
        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
          <FiPlus size={14} /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(address => (
          <div key={address.id} className={`p-4 rounded-xl border ${address.isDefault ? 'border-black bg-gray-50' : 'border-black/10'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <FiCheck size={10} /> Default
                  </span>
                )}
              </div>
              <button className="text-gray-400 hover:text-black">
                <FiMoreVertical size={16} />
              </button>
            </div>
            
            <p className="text-sm font-bold text-[#1A1A1A] mb-1">{address.name}</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {address.line1}<br />
              {address.line2 && <>{address.line2}<br /></>}
              {address.city}, {address.state} {address.postal}<br />
              {address.country}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Phone: {address.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
