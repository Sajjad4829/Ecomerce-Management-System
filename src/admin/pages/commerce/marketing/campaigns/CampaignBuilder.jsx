import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CampaignBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { campaigns, createCampaign, updateCampaign } = usePromotion();
  
  const isEditing = !!id;
  const existingCampaign = isEditing ? campaigns.find(c => c.id === id) : null;

  const [formData, setFormData] = useState(existingCampaign || {
    name: '',
    description: '',
    type: 'Seasonal',
    status: 'Draft',
    startDate: '',
    endDate: '',
    priority: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      updateCampaign(id, formData);
    } else {
      createCampaign(formData);
    }
    navigate('/admin/marketing/campaigns');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/marketing/campaigns')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{isEditing ? 'Edit Campaign' : 'Create Campaign'}</h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiSave /> {isEditing ? 'Save Changes' : 'Create Campaign'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-primary mb-4">Campaign Information</h2>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Campaign Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                placeholder="e.g. Summer Clearance 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Internal Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                placeholder="Optional description for internal use"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Campaign Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                >
                  <option value="Seasonal">Seasonal</option>
                  <option value="Flash Sale">Flash Sale</option>
                  <option value="VIP">VIP Exclusive</option>
                  <option value="Clearance">Clearance</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Priority (1 = Highest)</label>
                <input 
                  type="number" 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
             <h2 className="font-bold text-text-primary mb-4">Promotions</h2>
             <p className="text-sm text-text-muted">You can add promotions and discount rules to this campaign after it has been created.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-text-primary mb-4">Schedule</h2>
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
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
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
  );
}
