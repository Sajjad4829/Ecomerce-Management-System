import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataTable from '../../components/analytics/DataTable';
import MetricCard from '../../components/analytics/MetricCard';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function InventoryAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getInventoryMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Inventory Insights</h1>
          <p className="text-text-muted text-sm mt-1">Stock levels and sales velocity</p>
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
        <MetricCard title="Total Items in Stock" value={data.totalItems} />
        <MetricCard title="Low Stock Items" value={data.lowStock} />
        <MetricCard title="Out of Stock" value={data.outOfStock} />
        <MetricCard title="Total Inventory Value" value={data.inventoryValue} format="currency" />
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Inventory vs Sales Velocity</h3>
        </div>
        <DataTable 
          data={data.items} 
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'category', label: 'Category' },
            { key: 'status', label: 'Status', render: (val) => (
               <span className={`px-2 py-1 text-xs rounded-full font-medium ${val === 'In Stock' ? 'bg-green-100 text-green-800' : val === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                  {val}
               </span>
            ) },
            { key: 'stock', label: 'Current Stock' },
            { key: 'unitsSold', label: 'Units Sold (Period)' },
            { key: 'velocity', label: 'Sales Velocity', render: (val) => `${val}/day` },
            { key: 'value', label: 'Inventory Value', render: (val) => service.formatCurrency(val) },
          ]}
          searchPlaceholder="Search inventory..."
        />
      </div>
    </div>
  );
}
