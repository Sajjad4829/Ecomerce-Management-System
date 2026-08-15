import React from 'react';
import { useGlobalMarketingAnalytics } from '../../context/marketing/MarketingContext';
import { Megaphone, Target, Users, TrendingUp, Tag, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketingDashboard = () => {
  const analytics = useGlobalMarketingAnalytics();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Marketing Overview</h1>
          <p className="text-sm text-neutral-500 mt-1">Enterprise campaign performance and metrics.</p>
        </div>
        <Link to="/admin/marketing/campaigns/create" className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm">
          Create Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">All Time</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">{analytics.activeCampaigns}</div>
            <div className="text-sm text-neutral-500 font-medium">Active Campaigns</div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-xs text-neutral-500">
            <span>{analytics.scheduledCampaigns} Scheduled</span>
            <span>{analytics.completedCampaigns} Completed</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">
              ${analytics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-neutral-500 font-medium">Campaign Revenue</div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-xs text-neutral-500">
            <span>{analytics.totalOrders} Orders Generated</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">
              ${analytics.totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-neutral-500 font-medium">Discount Given</div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-xs text-neutral-500">
            <span>Across all campaigns</span>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">{analytics.totalCustomers.toLocaleString()}</div>
            <div className="text-sm text-neutral-500 font-medium">Customers Reached</div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-xs text-neutral-500">
            <span>Unique participating customers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-6">Campaign Performance Quick View</h3>
          <div className="flex flex-col items-center justify-center py-12 text-neutral-400 space-y-4">
            <Target className="w-12 h-12 stroke-1 text-neutral-300" />
            <p className="text-sm">Connect a charting library to visualize campaign ROI</p>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
              <div>
                <p className="text-sm text-neutral-900"><strong>Summer Sale 2024</strong> started generating revenue.</p>
                <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="text-sm text-neutral-900"><strong>VIP Early Access</strong> scheduled for Nov 15.</p>
                <p className="text-xs text-neutral-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
