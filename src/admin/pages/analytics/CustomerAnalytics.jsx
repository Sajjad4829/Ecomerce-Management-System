import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import AreaChart from '../../components/charts/AreaChart';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function CustomerAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getCustomerMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Customer Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Customer growth and lifetime value</p>
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
        <MetricCard title="Total Customers" value={data.totalCustomers} />
        <MetricCard title="New Customers" value={data.newCustomers} />
        <MetricCard title="Returning Customers" value={data.returningCustomers} />
        <MetricCard title="Active Customers" value={data.activeCustomers} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-medium mb-6">Customer Growth</h3>
          <AreaChart 
            data={data.growth} 
            xAxisKey="date" 
            areas={[
              { key: 'new', name: 'New Customers', color: '#1A1A1A' },
              { key: 'returning', name: 'Returning Customers', color: '#8B8B8B' }
            ]} 
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <MetricCard title="At Risk Customers" value={data.atRiskCustomers} />
          <MetricCard title="VIP Customers" value={data.vipCustomers} />
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8 flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Customer Performance</h3>
        </div>
        <DataTable 
          data={data.topCustomers} 
          columns={[
            { key: 'name', label: 'Customer' },
            { key: 'orders', label: 'Orders' },
            { key: 'units', label: 'Units' },
            { key: 'grossSales', label: 'Gross Sales', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
            { key: 'discount', label: 'Discount', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
            { key: 'refund', label: 'Refund', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
            { key: 'netRevenue', label: 'Net Revenue', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
            { key: 'aov', label: 'AOV', render: (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val) },
          ]}
        />
      </div>
    </div>
  );
}
