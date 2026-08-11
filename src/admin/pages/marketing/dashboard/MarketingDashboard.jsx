import React from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { Megaphone, Tag, Ticket, Users, TrendingUp, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MarketingDashboard = () => {
  const { campaigns, promotions, coupons, segments } = useMarketing();
  const navigate = useNavigate();

  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const activePromotions = promotions.filter(p => p.status === 'Active').length;
  const activeCoupons = coupons.filter(c => c.status === 'Active').length;
  const totalSegments = segments.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Marketing Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">Overview of campaigns, promotions, and engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-indigo-500">
            <Megaphone className="w-4 h-4" />
            <span className="text-sm font-medium">Active Campaigns</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{activeCampaigns}</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-emerald-500">
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">Active Promotions</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{activePromotions}</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-blue-500">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">Active Coupons</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{activeCoupons}</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-amber-500">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Customer Segments</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">{totalSegments}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-neutral-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Campaign Revenue</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">$24,500 <span className="text-xs text-neutral-400 font-sans ml-1">(Placeholder)</span></div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-neutral-500">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">Abandoned Cart Recovery</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">12.4% <span className="text-xs text-neutral-400 font-sans ml-1">(Placeholder)</span></div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-neutral-500">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">Coupon Usage</span>
          </div>
          <div className="text-2xl font-serif text-neutral-900">1,035 <span className="text-xs text-neutral-400 font-sans ml-1">(Placeholder)</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Campaigns</h2>
            <button onClick={() => navigate('/admin/marketing/campaigns')} className="text-sm text-indigo-600 font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {campaigns.slice(0, 5).map(campaign => (
              <div key={campaign.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900">{campaign.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{campaign.type} • {campaign.startDate} to {campaign.endDate}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                    campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Active Promotions</h2>
            <button onClick={() => navigate('/admin/marketing/promotions')} className="text-sm text-indigo-600 font-medium">View All</button>
          </div>
          <div className="divide-y divide-neutral-200">
            {promotions.filter(p => p.status === 'Active').map(promo => (
              <div key={promo.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                <div>
                  <div className="font-medium text-neutral-900">{promo.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{promo.type} • {promo.value}</div>
                </div>
                <div className="text-right text-sm font-medium text-neutral-900">
                  {promo.status}
                </div>
              </div>
            ))}
            {promotions.filter(p => p.status === 'Active').length === 0 && (
              <div className="p-6 text-center text-sm text-neutral-500">No active promotions.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
