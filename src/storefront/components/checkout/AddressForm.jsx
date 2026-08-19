export default function AddressForm({ address, setAddress, disabled }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={address.firstName}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={address.lastName}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Address</label>
        <input
          type="text"
          name="address1"
          value={address.address1}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Area / Locality</label>
        <input
          type="text"
          name="area"
          value={address.area}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">District</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Division</label>
        <select
          name="state"
          value={address.state}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm bg-white disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        >
          <option value="">Select Division</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Khulna">Khulna</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">ZIP / Postal Code</label>
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
      </div>
    </div>
  );
}
