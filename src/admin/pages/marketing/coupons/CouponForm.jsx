import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CouponForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/coupons')}
            className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Create Coupon</h1>
            <p className="text-sm text-neutral-500 mt-1">Generate a new discount code</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Coupon
        </button>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">Coupon Code <span className="text-red-500">*</span></label>
            <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono uppercase" placeholder="e.g. SAVE20" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">Link to Promotion <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="">Select a promotion...</option>
              <option>15% Off Summer Collection</option>
              <option>Free White-Glove Delivery</option>
            </select>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">Total Usage Limit</label>
            <input type="number" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Unlimited if blank" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">Limit Per Customer</label>
            <input type="number" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Unlimited if blank" />
          </div>
        </div>
      </div>
    </div>
  );
};
