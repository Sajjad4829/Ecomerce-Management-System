import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiPlus, FiTrash2, FiInfo, FiPercent, FiDollarSign } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function PricingRuleBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetType: 'customer_group', // 'customer_group', 'catalog', 'quantity'
    adjustmentType: 'percentage_decrease', // 'percentage_decrease', 'fixed_decrease', 'fixed_price'
    adjustmentValue: '',
    status: 'draft',
    conditions: [
      { id: '1', field: 'customer_group', operator: 'equals', value: '' }
    ]
  });

  const handleSave = () => {
    navigate('/admin/catalog/pricing');
  };

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, { id: Date.now().toString(), field: 'category', operator: 'equals', value: '' }]
    }));
  };

  const removeCondition = (id) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#F7F5F2] pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/catalog/pricing" className="p-2 bg-white border border-black/10 rounded-lg text-gray-500 hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#1A1A1A]">
              {formData.name || 'New Pricing Rule'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Price Rules Engine</p>
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
            <FiCheck size={16} /> Save Rule
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-8 space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Rule Information</h2>
          <p className="text-sm text-gray-500 mb-6">Internal name and description for this rule.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Rule Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. VIP Tier Pricing"
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-white transition-all text-sm font-medium text-[#1A1A1A]"
              />
            </div>
          </div>
        </div>

        {/* Conditions Engine */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Conditions</h2>
              <p className="text-sm text-gray-500">Determine when this rule applies.</p>
            </div>
            <button 
              onClick={addCondition}
              className="px-3 py-1.5 bg-gray-100 text-[#1A1A1A] rounded text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FiPlus size={14} /> Add Condition
            </button>
          </div>

          <div className="space-y-4">
            {formData.conditions.map((condition, index) => (
              <div key={condition.id} className="flex items-center gap-4 bg-[#F7F5F2] p-4 rounded-xl border border-black/5">
                {index > 0 && <span className="text-xs font-bold text-gray-400 uppercase w-8 text-center shrink-0">AND</span>}
                {index === 0 && <span className="w-8 shrink-0"></span>}
                
                <select className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20">
                  <option value="customer_group">Customer Group</option>
                  <option value="category">Category</option>
                  <option value="collection">Collection</option>
                  <option value="product">Product</option>
                  <option value="brand">Brand</option>
                </select>

                <select className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20">
                  <option value="equals">Is exactly</option>
                  <option value="not_equals">Is not</option>
                  <option value="contains">Contains</option>
                </select>

                <input 
                  type="text" 
                  placeholder="Value..."
                  className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                />

                <button 
                  onClick={() => removeCondition(condition.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Engine */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Price Adjustment</h2>
          <p className="text-sm text-gray-500 mb-6">How the price is modified when conditions are met.</p>

          <div className="flex items-center gap-6 p-6 bg-[#F7F5F2] rounded-xl border border-black/5">
            <span className="text-sm font-bold text-[#1A1A1A]">THEN</span>
            
            <select 
              value={formData.adjustmentType}
              onChange={(e) => setFormData(prev => ({ ...prev, adjustmentType: e.target.value }))}
              className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="percentage_decrease">Decrease by Percentage</option>
              <option value="fixed_decrease">Decrease by Amount</option>
              <option value="fixed_price">Set Fixed Price</option>
            </select>

            <div className="relative flex-1">
              {formData.adjustmentType !== 'percentage_decrease' && (
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <input 
                type="number" 
                value={formData.adjustmentValue}
                onChange={(e) => setFormData(prev => ({ ...prev, adjustmentValue: e.target.value }))}
                placeholder="0.00"
                className={`w-full py-2 bg-white border border-black/10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/20 ${
                  formData.adjustmentType !== 'percentage_decrease' ? 'pl-8 pr-3' : 'pl-3 pr-8'
                }`}
              />
              {formData.adjustmentType === 'percentage_decrease' && (
                <FiPercent className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
