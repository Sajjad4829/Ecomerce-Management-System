import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import AreaChart from '../../components/charts/AreaChart';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function SalesAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getSalesMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Sales Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Detailed revenue and sales performance</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Gross Sales" value={data.grossSales} format="currency" />
        <MetricCard title="Discounts" value={data.discounts} format="currency" prefix="-" />
        <MetricCard title="Refunds" value={data.refunds} format="currency" prefix="-" />
        <MetricCard title="Net Sales" value={data.netSales} format="currency" />
      </div>

      <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm mb-8">
        <h3 className="text-lg font-medium mb-6">Sales Trend</h3>
        <AreaChart 
          data={data.trend} 
          xAxisKey="date" 
          areas={[
            { key: 'revenue', name: 'Revenue', color: '#1A1A1A' }
          ]} 
        />
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Sales by Date</h3>
        </div>
        <DataTable 
          data={data.trend} 
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'orders', label: 'Orders' },
            { key: 'revenue', label: 'Revenue', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
          ]}
        />
      </div>
    </div>
  );
}
