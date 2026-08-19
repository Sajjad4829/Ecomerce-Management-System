import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function PaymentAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getPaymentMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Payment Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Transaction success rates and methods</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <h3 className="text-lg font-medium">Payment Methods</h3>
        </div>
        <DataTable 
          data={data.all} 
          columns={[
            { key: 'method', label: 'Payment Method' },
            { key: 'transactions', label: 'Transactions' },
            { key: 'successRate', label: 'Success Rate', render: (val) => `${val.toFixed(1)}%` },
            { key: 'refunds', label: 'Refunds', render: (val) => service.formatCurrency(val) },
            { key: 'amount', label: 'Total Volume', render: (val) => service.formatCurrency(val) },
          ]}
          searchPlaceholder="Search methods..."
        />
      </div>
    </div>
  );
}
