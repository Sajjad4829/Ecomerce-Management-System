import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCampaignAnalytics } from '../../../context/marketing/MarketingContext';
import { usePromotion } from '../../../context/PromotionContext';
import { ArrowLeft, TrendingUp, Users, Target, Activity, Calendar, Download, Edit2 } from 'lucide-react';

export const CampaignDetail = () => {
  const { campaignId } = useParams();
  const analytics = useCampaignAnalytics(campaignId);
  const { promotions, coupons } = usePromotion();
  const [dateRange, setDateRange] = useState('All Time');

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-xl font-medium text-neutral-900 mb-2">Campaign Not Found</div>
        <Link to="/admin/marketing/campaigns" className="text-primary hover:underline">Return to Campaigns</Link>
      </div>
    );
  }

  const { campaign, metrics, orders } = analytics;

  const linkedPromotions = promotions.filter(p => campaign.promotionIds.includes(p.id));
  const linkedCoupons = coupons.filter(c => campaign.couponCodes.includes(c.code));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <Link to="/admin/marketing/campaigns" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600 flex-shrink-0 self-start">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-serif text-neutral-900">{campaign.name}</h1>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-neutral-100 text-neutral-800'
              }`}>
                {campaign.status}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">{campaign.type} • {campaign.objective}</p>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
            <button className="p-2 border border-neutral-300 text-neutral-700 bg-white rounded-md hover:bg-neutral-50">
              <Download className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 border border-neutral-300 text-neutral-700 bg-white rounded-md text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2 font-medium">Net Revenue</div>
          <div className="text-3xl font-bold text-neutral-900">
            ${metrics.netRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-neutral-400 mt-2 flex justify-between">
            <span>Gross: ${metrics.grossRevenue.toLocaleString()}</span>
            <span className="text-error">Refunds: ${metrics.totalRefunds.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2 font-medium">Orders Generated</div>
          <div className="text-3xl font-bold text-neutral-900">{metrics.totalOrders}</div>
          <div className="text-xs text-neutral-400 mt-2">
            Average Order Value: ${metrics.aov.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2 font-medium">Discount Given</div>
          <div className="text-3xl font-bold text-neutral-900">
            ${metrics.discountGiven.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {metrics.couponUsage} Coupon Uses
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 mb-2 font-medium">Customers Converted</div>
          <div className="text-3xl font-bold text-neutral-900">{metrics.customers}</div>
          <div className="text-xs text-neutral-400 mt-2">Unique purchasing customers</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-medium text-neutral-900">Revenue Trend</h3>
            </div>
            <div className="h-72 bg-neutral-50 flex items-center justify-center">
              <span className="text-neutral-400 text-sm">Revenue Chart Visualization</span>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-100">
              <h3 className="font-medium text-neutral-900">Recent Campaign Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {orders.length > 0 ? orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-3 font-medium text-neutral-900">{o.id}</td>
                      <td className="px-6 py-3 text-neutral-600">{o.customerName}</td>
                      <td className="px-6 py-3 text-neutral-600">{new Date(o.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3">
                        <span className="capitalize px-2 py-0.5 bg-neutral-100 rounded text-xs">{o.status}</span>
                      </td>
                      <td className="px-6 py-3 text-right font-medium">${o.total.toFixed(2)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-neutral-500">No orders attributed to this campaign yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {orders.length > 5 && (
                <div className="p-3 border-t border-neutral-200 bg-neutral-50 text-center">
                  <Link to="/admin/orders" className="text-sm font-medium text-primary hover:underline">View all orders</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3 border-b border-neutral-100 pb-2">Campaign Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Schedule</span>
                  <span className="font-medium text-neutral-900 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    {campaign.startDate} to {campaign.endDate || 'Ongoing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Budget</span>
                  <span className="font-medium text-neutral-900">${campaign.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ROI</span>
                  <span className={`font-medium ${metrics.roi && metrics.roi > 0 ? 'text-success' : 'text-neutral-900'}`}>
                    {metrics.roi !== null ? `${metrics.roi.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3 border-b border-neutral-100 pb-2">Linked Promotions</h3>
              {linkedPromotions.length > 0 ? (
                <div className="space-y-2">
                  {linkedPromotions.map(p => (
                    <div key={p.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="font-medium text-neutral-900 text-sm">{p.name}</div>
                      <div className="text-xs text-neutral-500 mt-1">{p.type} • {p.status}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-neutral-500">No promotions linked.</div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3 border-b border-neutral-100 pb-2">Linked Coupons</h3>
              {linkedCoupons.length > 0 ? (
                <div className="space-y-2">
                  {linkedCoupons.map(c => (
                    <div key={c.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-neutral-900 text-sm">{c.code}</div>
                        <div className="text-xs text-neutral-500 mt-1">{c.type}</div>
                      </div>
                      <div className="text-xs font-medium px-2 py-1 bg-white border border-neutral-200 rounded">
                        {c.usedCount} Uses
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-neutral-500">No coupons linked.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
