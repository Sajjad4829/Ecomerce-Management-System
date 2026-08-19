import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
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
          <p className="text-text-muted text-sm mt-1">Customer performance and segment analysis</p>
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
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '300px' }}>
          <div className="p-6 border-b border-black/5">
            <h3 className="text-lg font-medium">Segment Performance</h3>
          </div>
          <DataTable 
            data={data.bySegment} 
            columns={[
              { key: 'name', label: 'Segment' },
              { key: 'customers', label: 'Customers' },
              { key: 'revenue', label: 'Revenue', render: (val) => service.formatCurrency(val) },
            ]}
          />
        </div>
        
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col justify-center p-8">
          <h3 className="text-lg font-medium mb-6">Key Insights</h3>
          <ul className="space-y-4">
             <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-sm text-text-primary">Top 10% of customers generated the majority of revenue</span>
             </li>
             <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-text-primary">{data.returningCustomers} returning customers purchased this period</span>
             </li>
             <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-sm text-text-primary">Average Order Value (AOV) is higher among VIP Segments</span>
             </li>
          </ul>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8 flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Top Customers by Revenue</h3>
        </div>
        <DataTable 
          data={data.topCustomers} 
          columns={[
            { key: 'name', label: 'Customer' },
            { key: 'orders', label: 'Orders' },
            { key: 'units', label: 'Units' },
            { key: 'grossSales', label: 'Gross Sales', render: (val) => service.formatCurrency(val) },
            { key: 'discount', label: 'Discount', render: (val) => service.formatCurrency(val) },
            { key: 'refund', label: 'Refund', render: (val) => service.formatCurrency(val) },
            { key: 'netRevenue', label: 'Net Revenue', render: (val) => service.formatCurrency(val) },
            { key: 'aov', label: 'AOV', render: (val) => service.formatCurrency(val) },
          ]}
          searchPlaceholder="Search customers..."
        />
      </div>
    </div>
  );
}
