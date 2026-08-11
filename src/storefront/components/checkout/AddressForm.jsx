export default function AddressForm({ address, setAddress, disabled }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          name="firstName"
          value={address.firstName}
          onChange={handleChange}
          disabled={disabled}
          placeholder="First name"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          value={address.lastName}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Last name"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div className="sm:col-span-2">
        <input
          type="text"
          name="company"
          value={address.company}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Company (optional)"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div className="sm:col-span-2">
        <input
          type="text"
          name="address1"
          value={address.address1}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Address"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div className="sm:col-span-2">
        <input
          type="text"
          name="address2"
          value={address.address2}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div className="sm:col-span-2">
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          disabled={disabled}
          placeholder="City"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
      <div>
        <select
          name="state"
          value={address.state}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm bg-white disabled:opacity-50 disabled:bg-gray-50"
        >
          <option value="">State / Province</option>
          <option value="CA">California</option>
          <option value="NY">New York</option>
          <option value="TX">Texas</option>
          <option value="FL">Florida</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          disabled={disabled}
          placeholder="ZIP / Postal code"
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>
    </div>
  );
}
