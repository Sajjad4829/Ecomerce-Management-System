import { useState } from 'react';
import { FiArrowLeft, FiCheck, FiMapPin, FiInfo, FiSettings, FiPhone } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function WarehouseEditor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'active',
    description: '',
    address: '',
    city: '',
    country: '',
    contactPerson: '',
    phone: '',
    email: '',
    isDefault: false,
    allowFulfillment: true,
    allowTransfers: true
  });

  const handleSave = () => {
    navigate('/admin/catalog/warehouses');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#F7F5F2] pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/catalog/warehouses" className="p-2 bg-white border border-black/10 rounded-lg text-gray-500 hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">
              {formData.name || 'New Warehouse'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Location Manager</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 text-gray-600 hover:text-black text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Save Warehouse
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiInfo className="text-gray-400" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Basic Information</h2>
              <p className="text-sm text-gray-500">Identity and status of this location.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Warehouse Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Main Hub - LA"
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Warehouse Code</label>
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase().replace(/\\s/g, '') }))}
                placeholder="e.g. WH-LAX"
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-mono font-bold text-[#1A1A1A]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiMapPin className="text-gray-400" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Location & Contact</h2>
              <p className="text-sm text-gray-500">Physical address and primary contact details.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Street Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">City</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Country</label>
              <input 
                type="text" 
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div className="col-span-2 pt-4 mt-4 border-t border-black/5"></div>
            <div className="col-span-2">
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Contact Person</label>
              <input 
                type="text" 
                value={formData.contactPerson}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Phone</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
            </div>
          </div>
        </div>

        {/* Operational Settings */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiSettings className="text-gray-400" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Operational Settings</h2>
              <p className="text-sm text-gray-500">Configure how this warehouse behaves in the system.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[#F7F5F2] rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-[#1A1A1A] block">Default Warehouse</span>
                <span className="text-xs text-gray-500">Automatically assign new stock and fallback fulfillment to this location.</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.isDefault}
                onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#F7F5F2] rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-[#1A1A1A] block">Allow Fulfillment</span>
                <span className="text-xs text-gray-500">Orders can be shipped directly from this location to customers.</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.allowFulfillment}
                onChange={(e) => setFormData(prev => ({ ...prev, allowFulfillment: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#F7F5F2] rounded-xl border border-black/5 cursor-pointer hover:border-black/20 transition-colors">
              <div>
                <span className="text-sm font-bold text-[#1A1A1A] block">Allow Transfers</span>
                <span className="text-xs text-gray-500">Enable stock transfers to and from this location.</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.allowTransfers}
                onChange={(e) => setFormData(prev => ({ ...prev, allowTransfers: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
