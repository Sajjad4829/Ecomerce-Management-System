import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiCheck, FiPlay } from 'react-icons/fi';

export default function CommunicationCampaignBuilder() {
  const navigate = useNavigate();

  const handleSave = () => navigate('/admin/communications/campaigns');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <Link to="/admin/communications/campaigns" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <FiArrowLeft /> Back
        </Link>
        <div className="flex gap-2">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 border border-border bg-surface text-text-secondary rounded-lg hover:bg-background font-medium">
            <FiSave /> Save Draft
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
            <FiPlay /> Schedule Campaign
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-text-primary">Campaign Builder</h1>
        <p className="text-sm text-text-muted mt-1">Configure bulk message delivery.</p>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Campaign Name</label>
            <input type="text" className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900" placeholder="e.g. Winter Promo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Marketing Reference (Optional)</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900">
              <option>None</option>
              <option>Winter Collection 2026</option>
            </select>
          </div>
        </div>
        
        <div className="p-6 border-b border-border grid grid-cols-2 gap-6 bg-background">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Target Audience Segment</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900">
              <option>All Customers</option>
              <option>VIP Customers</option>
              <option>Newsletter Subscribers</option>
            </select>
            <p className="text-xs text-text-muted mt-2">Segments are managed in the Marketing module.</p>
          </div>
        </div>

        <div className="p-6 border-b border-border space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Channel</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900">
                <option>Email</option>
                <option>SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Message Template</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900">
                <option>Summer Sale Promo</option>
                <option>Autumn Preview</option>
              </select>
            </div>
          </div>
          <div className="bg-surface border border-border rounded p-4 text-sm text-text-muted">
            Preview of selected template will render here.
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6 bg-background">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Schedule Delivery</label>
            <input type="datetime-local" className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
