import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPieChart, FiTrendingUp, FiActivity, FiDollarSign } from 'react-icons/fi';

export default function CampaignAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/marketing/campaigns')}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Campaign Analytics</h1>
          <p className="text-sm text-text-muted mt-1">Mock performance data for marketing campaigns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-secondary">Total Revenue Impact</h3>
            <FiDollarSign className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-text-primary">৳24.5M</p>
          <p className="text-sm text-success flex items-center gap-1 mt-2">
            <FiTrendingUp /> +15.2% vs last month
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-secondary">Orders Influenced</h3>
            <FiActivity className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-text-primary">4,285</p>
          <p className="text-sm text-success flex items-center gap-1 mt-2">
            <FiTrendingUp /> +8.1% vs last month
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-secondary">Avg. Discount</h3>
            <FiPieChart className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-text-primary">12.4%</p>
          <p className="text-sm text-text-muted mt-2">Target &lt; 15%</p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-secondary">Coupon Usage</h3>
            <FiActivity className="text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-text-primary">1,204</p>
          <p className="text-sm text-success flex items-center gap-1 mt-2">
            <FiTrendingUp /> +2.4% vs last month
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden p-8 text-center text-text-muted">
        <FiPieChart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
        <p className="font-medium text-text-primary mb-1">Detailed Analytics Placeholder</p>
        <p className="text-sm">Charts and conversion funnels will be implemented during the analytics phase.</p>
      </div>
    </div>
  );
}
