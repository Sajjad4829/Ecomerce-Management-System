import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataTable from '../../components/analytics/DataTable';
import MetricCard from '../../components/analytics/MetricCard';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function AbandonedCartAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getAbandonedCartMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Abandoned Cart Recovery</h1>
          <p className="text-text-muted text-sm mt-1">Analytics for recovered and lost carts</p>
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
        <MetricCard title="Total Abandoned Carts" value={data.totalCarts} />
        <MetricCard title="Recovered Carts" value={data.recoveredCarts} />
        <MetricCard title="Recovery Rate" value={data.recoveryRate} format="percent" />
        <MetricCard title="Recovered Revenue" value={data.recoveredRevenue} format="currency" />
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <h3 className="text-lg font-medium">Abandoned Cart Records</h3>
          <span className="text-sm text-text-muted">Potential Revenue: {service.formatCurrency(data.potentialRevenue)}</span>
        </div>
        <DataTable 
          data={data.all} 
          columns={[
            { key: 'id', label: 'Cart ID' },
            { key: 'customerId', label: 'Customer ID' },
            { key: 'status', label: 'Status', render: (val) => (
               <span className={`px-2 py-1 text-xs rounded-full font-medium ${val === 'Recovered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {val}
               </span>
            ) },
            { key: 'total', label: 'Cart Value', render: (val) => service.formatCurrency(val) },
            { key: 'createdAt', label: 'Abandoned Date', render: (val) => new Date(val).toLocaleDateString() },
          ]}
          searchPlaceholder="Search carts..."
        />
      </div>
    </div>
  );
}
