import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function PromotionBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaignId');
  
  const { campaigns, promotions, createPromotion, updatePromotion } = usePromotion();
  
  const isEditing = !!id;
  const existingPromo = isEditing ? promotions.find(p => p.id === id) : null;

  const [formData, setFormData] = useState(existingPromo || {
    name: '',
    campaignId: campaignIdFromQuery || '',
    type: 'Percentage Discount',
    discountValue: 0,
    target: 'All Products',
    targetValue: '',
    status: 'Draft',
    priority: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      updatePromotion(id, formData);
    } else {
      createPromotion(formData);
    }
    navigate('/admin/marketing/promotions');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Promotion' : 'Create Promotion'}</h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiSave /> {isEditing ? 'Save Changes' : 'Create Promotion'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-900 mb-4">Promotion Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                placeholder="e.g. 20% Off Sofas"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                >
                  <option value="Percentage Discount">Percentage Discount</option>
                  <option value="Fixed Amount Discount">Fixed Amount Discount</option>
                  <option value="Free Shipping">Free Shipping</option>
                  <option value="Buy X Get Y">Buy X Get Y (Mock)</option>
                </select>
              </div>
              {formData.type !== 'Free Shipping' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Value {formData.type === 'Percentage Discount' ? '(%)' : '(৳)'}
                  </label>
                  <input 
                    type="number" 
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                    min="0"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-900 mb-4">Eligibility Rules</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <select 
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                >
                  <option value="All Products">All Products</option>
                  <option value="Category">Specific Category</option>
                  <option value="Collection">Specific Collection</option>
                  <option value="Specific Product">Specific Product</option>
                  <option value="Cart">Cart Total</option>
                </select>
              </div>
              {formData.target !== 'All Products' && formData.target !== 'Cart' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                  <input 
                    type="text" 
                    name="targetValue"
                    value={formData.targetValue || ''}
                    onChange={handleChange}
                    placeholder={`Enter ${formData.target} Name/ID`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
               <p className="text-sm font-medium text-gray-700 mb-2">Customer Eligibility (Mock)</p>
               <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]">
                  <option>Everyone</option>
                  <option>VIP Members</option>
                  <option>New Customers</option>
                  <option>Specific Segment...</option>
               </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-900 mb-4">Settings</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign (Optional)</label>
              <select 
                name="campaignId"
                value={formData.campaignId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
              >
                <option value="">None (Standalone)</option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority (1 = Highest)</label>
              <input 
                type="number" 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                min="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
