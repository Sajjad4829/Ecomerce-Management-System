import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataStatusIndicator from '../../components/analytics/DataStatusIndicator';
import AreaChart from '../../components/charts/AreaChart';
import BarChart from '../../components/charts/BarChart';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload, FiFilter } from 'react-icons/fi';

export default function AnalyticsDashboard() {
  const { service, dateRange } = useAnalytics();
  const [metrics, setMetrics] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setMetrics(service.getOverviewMetrics());
      setSalesData(service.getSalesMetrics());
      setLoading(false);
    }, 500);
  }, [service, dateRange]);

  if (loading || !metrics || !salesData) {
    return <div className="p-8">Loading analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Executive Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Enterprise Analytics Overview</p>
        </div>
        <div className="flex items-center gap-4">
          <DataStatusIndicator status="mock" message="Mock Data (Backend Pending)" />
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiFilter /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

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
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-medium mb-6">Revenue Trend</h3>
          <AreaChart 
            data={salesData.trend} 
            xAxisKey="date" 
            areas={[
              { key: 'revenue', name: 'Gross Revenue', color: '#1A1A1A' }
            ]} 
          />
        </div>
        <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-medium mb-6">Order Volume</h3>
          <BarChart 
            data={salesData.trend} 
            xAxisKey="date" 
            bars={[
              { key: 'orders', name: 'Orders', color: '#8B8B8B' }
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
          title="Returning Customer Rate"
          value={metrics.returningRate.current}
          previousValue={metrics.returningRate.previous}
          trend={metrics.returningRate.trend}
          format="percent"
        />
        <MetricCard 
          title="Conversion Rate"
          value={metrics.conversionRate.current}
          previousValue={metrics.conversionRate.previous}
          trend={metrics.conversionRate.trend}
          format="percent"
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
