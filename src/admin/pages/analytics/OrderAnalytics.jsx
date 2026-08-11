import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DonutChart from '../../components/charts/DonutChart';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function OrderAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getOrderMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Order Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Order volume and fulfillment status</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Orders" value={data.totalOrders} />
        <MetricCard title="Cancelled Orders" value={data.cancelled} />
        <MetricCard title="Returned Orders" value={data.returned} />
      </div>
      <AnalyticsTabs />

      <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
        <h3 className="text-lg font-medium mb-6">Order Status Distribution</h3>
        <DonutChart data={data.statusDistribution} />
      </div>
    </div>
  );
}
