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
          <p className="text-text-muted text-sm mt-1">Product performance, units sold, and revenue</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Product Performance</h3>
        </div>
        <DataTable 
          data={data.all} 
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'category', label: 'Category' },
            { key: 'orders', label: 'Orders' },
            { key: 'units', label: 'Units Sold' },
            { key: 'returns', label: 'Returns' },
            { key: 'returnRate', label: 'Return Rate', render: (val) => `${val.toFixed(1)}%` },
            { key: 'revenue', label: 'Revenue', render: (val) => service.formatCurrency(val) },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
               <h3 className="text-lg font-medium">Needs Attention</h3>
               <span className="text-xs font-medium px-2 py-1 bg-red-50 text-red-600 rounded">High Return / Low Sales</span>
            </div>
            <DataTable 
               data={data.needsAttention} 
               columns={[
                  { key: 'name', label: 'Product Name' },
                  { key: 'returnRate', label: 'Return Rate', render: (val) => <span className={val > 10 ? 'text-red-600 font-medium' : ''}>{val.toFixed(1)}%</span> },
                  { key: 'stock', label: 'Stock' },
               ]}
               searchPlaceholder="Search products..."
            />
         </div>
         <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
               <h3 className="text-lg font-medium">Top Units Sold</h3>
            </div>
            <DataTable 
               data={data.bestSellersUnits} 
               columns={[
                  { key: 'name', label: 'Product Name' },
                  { key: 'units', label: 'Units Sold' },
                  { key: 'revenue', label: 'Revenue', render: (val) => service.formatCurrency(val) },
               ]}
               searchPlaceholder="Search products..."
            />
         </div>
      </div>
    </div>
  );
}
