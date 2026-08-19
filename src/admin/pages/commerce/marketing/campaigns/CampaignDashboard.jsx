import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiPieChart, FiCalendar, FiTag, FiClock, FiCheckCircle } from 'react-icons/fi';
import { usePromotion } from '../../../../context/PromotionContext';

export default function CampaignDashboard() {
  const { campaigns } = usePromotion();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Campaigns</h1>
          <p className="text-sm text-text-muted mt-1">Manage marketing campaigns, seasonal events, and coordinated promotions.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/marketing/campaigns/analytics" className="px-4 py-2 bg-surface border border-black/10 text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors shadow-sm flex items-center gap-2">
            <FiPieChart /> Analytics
          </Link>
          <Link to="/admin/marketing/campaigns/new" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiPlus /> Create Campaign
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <FiCalendar />
            </div>
            <h3 className="font-medium text-text-primary">Total Campaigns</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{campaigns.length}</p>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center">
              <FiCheckCircle />
            </div>
            <h3 className="font-medium text-text-primary">Active</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{campaigns.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
              <FiClock />
            </div>
            <h3 className="font-medium text-text-primary">Scheduled</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{campaigns.filter(c => c.status === 'Scheduled').length}</p>
        </div>
        <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FiTag />
            </div>
            <h3 className="font-medium text-text-primary">Coupon Usage</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">2,451</p>
          <p className="text-xs text-text-muted mt-1">Mock metric</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
          <h2 className="font-bold text-text-primary">All Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background border-b border-border text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-background">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{campaign.name}</div>
                    <div className="text-xs text-text-muted mt-0.5">{campaign.promotions?.length || 0} Promotions</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Active' ? 'bg-success-soft text-success' :
                      campaign.status === 'Scheduled' ? 'bg-warning-soft text-warning' :
                      'bg-gray-100 text-text-secondary'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{campaign.type}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    {campaign.startDate} to {campaign.endDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/marketing/campaigns/${campaign.id}`} className="text-primary hover:text-blue-800 font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-text-muted">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
