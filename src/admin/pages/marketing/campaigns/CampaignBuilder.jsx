import React, { useState } from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { usePromotion } from '../../../context/PromotionContext';
import { useCustomers } from '../../../context/customers/CustomerContext';
import { useLoyalty } from '../../../context/LoyaltyContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Play, Target, Tag, Ticket, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CampaignBuilder = () => {
  const navigate = useNavigate();
  const { createCampaign, campaignTypes } = useMarketing();
  const { promotions, coupons } = usePromotion();
  const { segments } = useCustomers();
  const { tiers } = useLoyalty();

  const [formData, setFormData] = useState({
    name: '',
    type: campaignTypes[0],
    objective: 'Increase Sales',
    status: 'Draft',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    targetSegments: [],
    targetLoyaltyTiers: [],
    promotionIds: [],
    couponCodes: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSave = (status) => {
    createCampaign({
      ...formData,
      status: status,
      budget: parseFloat(formData.budget) || 0
    });
    navigate('/admin/marketing/campaigns');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/marketing/campaigns" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Create Campaign</h1>
            <p className="text-sm text-neutral-500 mt-1">Configure marketing targeting and attribution.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSave('Draft')}
              className="px-4 py-2 border border-neutral-300 text-neutral-700 bg-white rounded-md text-sm font-medium hover:bg-neutral-50 shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button 
              onClick={() => handleSave(formData.startDate ? 'Scheduled' : 'Active')}
              className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {formData.startDate ? 'Schedule Campaign' : 'Activate Campaign'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
              <Settings className="w-4 h-4 text-neutral-400" />
              <h3 className="font-medium text-neutral-900">Campaign Details</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Campaign Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="e.g. Summer Luxury Sale 2025"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Campaign Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  {campaignTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Objective</label>
                <select 
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <option>Increase Sales</option>
                  <option>Acquire Customers</option>
                  <option>Retain Customers</option>
                  <option>Increase AOV</option>
                  <option>Clearance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description (Internal)</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                placeholder="Internal notes about the campaign strategy..."
              />
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
              <Target className="w-4 h-4 text-neutral-400" />
              <h3 className="font-medium text-neutral-900">Target Audience</h3>
            </div>
            <p className="text-sm text-neutral-500 mb-4">Select existing segments or loyalty tiers. Leave blank to target all customers.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Customer Segments</label>
                <div className="flex flex-wrap gap-2">
                  {segments?.map(seg => (
                    <button
                      key={seg.id}
                      onClick={() => handleMultiSelect('targetSegments', seg.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        formData.targetSegments.includes(seg.id) 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {seg.name}
                    </button>
                  ))}
                  {(!segments || segments.length === 0) && <span className="text-sm text-neutral-400">No segments available.</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Loyalty Tiers</label>
                <div className="flex flex-wrap gap-2">
                  {tiers?.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => handleMultiSelect('targetLoyaltyTiers', tier.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        formData.targetLoyaltyTiers.includes(tier.id) 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {tier.name}
                    </button>
                  ))}
                  {(!tiers || tiers.length === 0) && <span className="text-sm text-neutral-400">No loyalty tiers available.</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Promotions & Coupons */}
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
              <Tag className="w-4 h-4 text-neutral-400" />
              <h3 className="font-medium text-neutral-900">Promotions & Attribution</h3>
            </div>
            <p className="text-sm text-neutral-500 mb-4">Link existing promotions or coupons to track revenue attribution.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Linked Promotions</label>
                <div className="flex flex-col gap-2">
                  {promotions?.map(pro => (
                    <label key={pro.id} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.promotionIds.includes(pro.id)}
                        onChange={() => handleMultiSelect('promotionIds', pro.id)}
                        className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{pro.name}</div>
                        <div className="text-xs text-neutral-500">{pro.type} • {pro.discountValue}{pro.type.includes('Percentage') ? '%' : ' OFF'}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Linked Coupons</label>
                <div className="flex flex-col gap-2">
                  {coupons?.map(cpn => (
                    <label key={cpn.id} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.couponCodes.includes(cpn.code)}
                        onChange={() => handleMultiSelect('couponCodes', cpn.code)}
                        className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
                      />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{cpn.code}</div>
                        <div className="text-xs text-neutral-500">{cpn.type}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-medium text-neutral-900 border-b border-neutral-100 pb-2">Schedule & Budget</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">End Date (Optional)</label>
              <input 
                type="date" 
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Budget (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">$</span>
                <input 
                  type="number" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full pl-7 pr-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Used to calculate campaign ROI.</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Summary Preview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Name:</span>
                <span className="font-medium text-neutral-900">{formData.name || 'Untitled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Type:</span>
                <span className="font-medium text-neutral-900">{formData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Audience:</span>
                <span className="font-medium text-neutral-900">
                  {formData.targetSegments.length + formData.targetLoyaltyTiers.length > 0 
                    ? `${formData.targetSegments.length + formData.targetLoyaltyTiers.length} targets` 
                    : 'All Customers'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Promotions:</span>
                <span className="font-medium text-neutral-900">{formData.promotionIds.length} Linked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
