import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function ProductAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getProductMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Product Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Product performance and revenue</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Top Performing Products</h3>
        </div>
        <DataTable 
          data={data.bestSellers} 
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'units', label: 'Units Sold' },
            { key: 'revenue', label: 'Revenue', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
          ]}
        />
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <h3 className="text-lg font-medium">Needs Attention (Low Performing)</h3>
          <span className="text-xs font-medium px-2 py-1 bg-red-50 text-red-600 rounded">Lowest Revenue</span>
        </div>
        <DataTable 
          data={data.lowPerforming} 
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'units', label: 'Units Sold' },
            { key: 'revenue', label: 'Revenue', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
          ]}
        />
      </div>
    </div>
  );
}
