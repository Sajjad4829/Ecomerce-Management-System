import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import AreaChart from '../../components/charts/AreaChart';
import BarChart from '../../components/charts/BarChart';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload, FiFilter, FiAlertCircle, FiTrendingUp, FiInfo } from 'react-icons/fi';

export default function AnalyticsDashboard() {
  const { service, dateRange } = useAnalytics();
  const [metrics, setMetrics] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay for UX
    setTimeout(() => {
      setMetrics(service.getOverviewMetrics());
      setSalesData(service.getSalesMetrics());
      setInsights(service.getBusinessInsights());
      setLoading(false);
    }, 300);
  }, [service, dateRange]);

  if (loading || !metrics || !salesData) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-64 bg-black/5 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
           <div className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
           <div className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
           <div className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const getInsightIcon = (type) => {
     if (type === 'Positive') return <FiTrendingUp className="text-green-600" />;
     if (type === 'Needs Attention') return <FiAlertCircle className="text-red-600" />;
     return <FiInfo className="text-blue-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Executive Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Enterprise Analytics Overview</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiFilter /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      {/* Business Insights */}
      {insights.length > 0 && (
         <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
               <div key={idx} className="flex items-start gap-3 p-4 bg-surface rounded-xl border border-black/5 shadow-sm">
                  <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                  <div>
                     <p className="text-sm font-medium text-text-primary">{insight.type}</p>
                     <p className="text-sm text-text-muted">{insight.text}</p>
                  </div>
               </div>
            ))}
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Gross Revenue"
          value={metrics.revenue.current}
          previousValue={metrics.revenue.previous}
          trend={metrics.revenue.trend}
          format="currency"
        />
        <MetricCard 
          title="Net Revenue"
          value={metrics.netRevenue.current}
          previousValue={metrics.netRevenue.previous}
          trend={metrics.netRevenue.trend}
          format="currency"
        />
        <MetricCard 
          title="Total Orders"
          value={metrics.orders.current}
          previousValue={metrics.orders.previous}
          trend={metrics.orders.trend}
        />
        <MetricCard 
          title="Average Order Value"
          value={metrics.aov.current}
          previousValue={metrics.aov.previous}
          trend={metrics.aov.trend}
          format="currency"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-medium mb-6">Revenue Trend</h3>
          <AreaChart 
            data={salesData.trend} 
            xAxisKey="date" 
            areas={[
              { key: 'revenue', name: 'Gross Revenue', color: 'currentColor' }
            ]} 
          />
        </div>
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-medium mb-6">Order Volume</h3>
          <BarChart 
            data={salesData.trend} 
            xAxisKey="date" 
            bars={[
              { key: 'orders', name: 'Orders', color: 'currentColor' }
            ]} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="New Customers"
          value={metrics.customers.current}
          previousValue={metrics.customers.previous}
          trend={metrics.customers.trend}
        />
        <MetricCard 
          title="Units Sold"
          value={metrics.unitsSold.current}
          previousValue={metrics.unitsSold.previous}
          trend={metrics.unitsSold.trend}
        />
        <MetricCard 
          title="Discounts"
          value={metrics.discounts.current}
          previousValue={metrics.discounts.previous}
          trend={metrics.discounts.trend}
          format="currency"
        />
        <MetricCard 
          title="Returns"
          value={metrics.returns.current}
          previousValue={metrics.returns.previous}
          trend={metrics.returns.trend}
        />
      </div>
    </div>
  );
}
