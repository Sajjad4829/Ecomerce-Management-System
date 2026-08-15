import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function InventoryAnalytics() {
  const { service } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Inventory is point-in-time, doesn't really depend on dateRange typically, but keeping effect structure
    setData(service.getInventoryMetrics());
  }, [service]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Inventory Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Stock levels and inventory value</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Units" value={data.totalItems} />
        <MetricCard title="Low Stock Products" value={data.lowStock} />
        <MetricCard title="Out of Stock Products" value={data.outOfStock} />
        <MetricCard title="Total Inventory Value" value={data.inventoryValue} format="currency" />
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8 flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Inventory Status</h3>
        </div>
        <DataTable 
          data={data.items} 
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'sku', label: 'SKU' },
            { key: 'category', label: 'Category' },
            { key: 'stock', label: 'Stock Level' },
            { 
              key: 'status', 
              label: 'Status',
              render: (val) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full \${
                  val === 'Out of Stock' ? 'bg-red-50 text-red-600' :
                  val === 'Low Stock' ? 'bg-orange-50 text-orange-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {val}
                </span>
              )
            },
            { key: 'value', label: 'Total Value', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
          ]}
        />
      </div>
    </div>
  );
}
