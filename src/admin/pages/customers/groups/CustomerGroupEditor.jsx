import { useState } from 'react';
import { FiArrowLeft, FiCheck, FiInfo } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function CustomerGroupEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;

  const [formData, setFormData] = useState({
    name: isNew ? '' : 'VIP',
    description: isNew ? '' : 'Customers with over $2000 total spend.',
    status: 'Active',
    pricingRuleId: isNew ? '' : '10-off-all'
  });

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Group name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/admin/customers/groups');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      <div className="sticky top-0 z-20 bg-[#F7F5F2] pt-4 pb-4 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/customers/groups" className="p-2 bg-white border border-black/10 rounded-lg text-gray-500 hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">
              {isNew ? 'Create Customer Group' : `Edit Group: ${formData.name}`}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/admin/customers/groups" className="px-4 py-2 text-gray-600 hover:text-black text-sm font-medium transition-colors">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2"
          >
            <FiCheck size={16} /> Save Group
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-6">Group Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Group Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    setErrors(prev => ({ ...prev, name: null }));
                  }}
                  placeholder="e.g. Wholesale Level 1"
                  className={`w-full px-4 py-2.5 bg-[#F7F5F2] border ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Internal description for this group."
                  className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-6">Commerce & Pricing</h2>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 mb-6">
              <FiInfo className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800">
                You can link this customer group to a specific pricing rule created in the Pricing Engine. Members of this group will automatically see the adjusted prices when logged in.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Assigned Pricing Rule</label>
              <select 
                value={formData.pricingRuleId}
                onChange={(e) => setFormData(prev => ({ ...prev, pricingRuleId: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              >
                <option value="">No special pricing (Retail)</option>
                <option value="10-off-all">VIP - 10% Off All Items</option>
                <option value="trade-tier-1">Trade Tier 1 - 15% Off</option>
                <option value="wholesale-a">Wholesale Volume Pricing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4">Status</h3>
            <select 
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Disabled groups will not apply any pricing rules, and new customers cannot be added to them.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
