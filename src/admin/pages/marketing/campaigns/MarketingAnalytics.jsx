import React, { useState } from 'react';
import { useMarketing, useGlobalMarketingAnalytics } from '../../context/marketing/MarketingContext';
import { useOrders } from '../../context/orders/OrderContext';
import { useFinance } from '../../context/finance/FinanceContext';
import { BarChart3, Download, Filter } from 'lucide-react';

export const MarketingAnalytics = () => {
  const { campaigns } = useMarketing();
  const { orders } = useOrders();
  const { transactions } = useFinance();
  const globalAnalytics = useGlobalMarketingAnalytics();

  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Dynamically calculate metrics for all campaigns for the table
  const campaignMetrics = campaigns.map(campaign => {
    const campaignOrders = orders.filter(o => o.campaignId === campaign.id);
    let gross = 0;
    let discounts = 0;
    let refunds = 0;

    campaignOrders.forEach(o => {
      gross += (o.total + (o.discountAmount || 0));
      discounts += (o.discountAmount || 0);
      
      const orderTxns = transactions.filter(t => t.orderId === o.id && t.status === 'Completed');
      orderTxns.forEach(txn => {
        if (txn.type === 'Refund') refunds += txn.amount;
      });
    });

    const net = gross - discounts - refunds;
    const customers = new Set(campaignOrders.map(o => o.customerId)).size;

    return {
      id: campaign.id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      orders: campaignOrders.length,
      customers,
      gross,
      discounts,
      net
    };
  }).sort((a, b) => b.net - a.net); // Sort by net revenue desc

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Campaign Analytics</h1>
          <p className="text-sm text-neutral-500 mt-1">Compare campaign performance across your marketing initiatives.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
          <button className="px-4 py-2 border border-neutral-300 text-neutral-700 bg-white rounded-md text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-neutral-400" />
            Campaign Comparison
          </h3>
          <button className="p-2 border border-neutral-300 text-neutral-700 bg-white rounded-md hover:bg-neutral-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium text-right">Orders</th>
                <th className="px-6 py-4 font-medium text-right">Customers</th>
                <th className="px-6 py-4 font-medium text-right">Gross Revenue</th>
                <th className="px-6 py-4 font-medium text-right">Discounts</th>
                <th className="px-6 py-4 font-medium text-right text-neutral-900">Net Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {campaignMetrics.length > 0 ? campaignMetrics.map(metrics => (
                <tr key={metrics.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{metrics.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{metrics.type}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{metrics.orders}</td>
                  <td className="px-6 py-4 text-right font-medium">{metrics.customers}</td>
                  <td className="px-6 py-4 text-right text-neutral-600">${metrics.gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-right text-amber-600">-${metrics.discounts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900">
                    ${metrics.net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    No active campaigns to compare in this period.
                  </td>
                </tr>
              )}
            </tbody>
            {campaignMetrics.length > 0 && (
              <tfoot className="bg-neutral-50 border-t border-neutral-200">
                <tr>
                  <td className="px-6 py-4 font-bold text-neutral-900">Totals</td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900">{globalAnalytics.totalOrders}</td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900">{globalAnalytics.totalCustomers}</td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900">
                    ${(globalAnalytics.totalRevenue + globalAnalytics.totalDiscount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-amber-600">
                    -${globalAnalytics.totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900">
                    ${globalAnalytics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-4">Top Performing Campaigns (By Revenue)</h3>
          <div className="space-y-4">
            {campaignMetrics.slice(0, 3).map((m, idx) => (
              <div key={m.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' : 
                    idx === 1 ? 'bg-neutral-200 text-neutral-700' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{m.name}</div>
                    <div className="text-xs text-neutral-500">{m.orders} Orders</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-neutral-900">${m.net.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm p-6">
          <h3 className="font-medium text-neutral-900 mb-4">Needs Attention</h3>
          <div className="space-y-4">
            {campaignMetrics.slice(-3).reverse().map((m, idx) => (
              m.net < 1000 ? (
              <div key={m.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{m.name}</div>
                    <div className="text-xs text-neutral-500">{m.status}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-neutral-600">Low Revenue</div>
              </div>
              ) : null
            ))}
            {campaignMetrics.every(m => m.net >= 1000) && (
               <div className="text-sm text-neutral-500">All campaigns are performing well.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingAnalytics;
