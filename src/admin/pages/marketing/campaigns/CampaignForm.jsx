import React from 'react';
import { ArrowLeft, Save, Calendar, Tag, Image, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CampaignForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/campaigns')}
            className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Create Campaign</h1>
            <p className="text-sm text-neutral-500 mt-1">Configure a new marketing campaign</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-200 text-neutral-700 bg-surface rounded-md hover:bg-neutral-50 font-medium">
            Save as Draft
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save & Schedule
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Campaign Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Campaign Name <span className="text-danger">*</span></label>
              <input type="text" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Summer Furniture Sale" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Campaign Type</label>
              <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-surface">
                <option>Seasonal</option>
                <option>Product Promotion</option>
                <option>Collection Promotion</option>
                <option>Customer Retention</option>
                <option>Flash Sale</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-neutral-700">Internal Notes</label>
              <textarea className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24" placeholder="Brief description of the campaign goals..."></textarea>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-neutral-400"/> Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Start Date</label>
              <input type="date" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">End Date</label>
              <input type="date" className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-neutral-400"/> Audience & Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Target Audience</label>
              <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-surface">
                <option>All Customers</option>
                <option>VIP Customers Segment</option>
                <option>Cart Abandoners</option>
                <option>New Customers</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">Channels</label>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2 text-sm text-neutral-700"><input type="checkbox" className="rounded text-primary focus:ring-primary"/> Website</label>
                <label className="flex items-center gap-2 text-sm text-neutral-700"><input type="checkbox" className="rounded text-primary focus:ring-primary"/> Email</label>
                <label className="flex items-center gap-2 text-sm text-neutral-700"><input type="checkbox" className="rounded text-primary focus:ring-primary"/> Push Notification</label>
                <label className="flex items-center gap-2 text-sm text-neutral-700"><input type="checkbox" className="rounded text-primary focus:ring-primary"/> SMS</label>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2"><Tag className="w-5 h-5 text-neutral-400"/> Promotions & Assets</h3>
          <div className="space-y-4">
             <button className="w-full py-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-500 hover:border-indigo-500 hover:text-primary transition-colors font-medium">
               + Link Existing Promotion
             </button>
             <button className="w-full py-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-500 hover:border-indigo-500 hover:text-primary transition-colors font-medium">
               + Assign Banner/Creative
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
