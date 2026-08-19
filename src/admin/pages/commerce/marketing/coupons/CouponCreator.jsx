import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiRefreshCw } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CouponCreator() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { coupons, promotions, createCoupon } = usePromotion();
  
  const isEditing = !!id;
  const existingCoupon = isEditing ? coupons.find(c => c.id === id) : null;

  const [formData, setFormData] = useState(existingCoupon || {
    code: '',
    promotionId: '',
    type: 'Percentage Discount',
    discountValue: 0,
    usageLimit: '',
    status: 'Draft',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCode = () => {
    const randomCode = 'AURUM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, code: randomCode }));
  };

  const handleSave = () => {
    if (isEditing) {
      // updateCoupon logic if we had it
    } else {
      createCoupon({ ...formData, usedCount: 0 });
    }
    navigate('/admin/marketing/coupons');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/coupons')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{isEditing ? 'Edit Coupon' : 'Create Coupon'}</h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiSave /> {isEditing ? 'Save Changes' : 'Create Coupon'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-primary mb-4">Coupon Code</h2>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-mono uppercase"
                  placeholder="e.g. SUMMER20"
                />
                <button 
                  onClick={generateCode}
                  className="px-4 py-2 bg-gray-100 text-text-secondary rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 border border-border"
                >
                  <FiRefreshCw /> Generate
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-primary mb-4">Discount Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Link to Promotion (Optional)</label>
              <select 
                name="promotionId"
                value={formData.promotionId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
              >
                <option value="">None (Standalone Coupon)</option>
                {promotions.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <p className="text-xs text-text-muted mt-1">If linked, the coupon applies the rules of the selected promotion.</p>
            </div>
            
            {!formData.promotionId && (
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Discount Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  >
                    <option value="Percentage Discount">Percentage Discount</option>
                    <option value="Fixed Amount Discount">Fixed Amount Discount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Value {formData.type === 'Percentage Discount' ? '(%)' : '(৳)'}
                  </label>
                  <input 
                    type="number" 
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-primary mb-4">Settings</h2>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Usage Limit</label>
              <input 
                type="number" 
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                placeholder="Leave blank for unlimited"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-100">
               <div>
                 <label className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
                 <input 
                   type="date" 
                   name="startDate"
                   value={formData.startDate}
                   onChange={handleChange}
                   className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] mb-3"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-text-secondary mb-1">End Date</label>
                 <input 
                   type="date" 
                   name="endDate"
                   value={formData.endDate}
                   onChange={handleChange}
                   className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                 />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
