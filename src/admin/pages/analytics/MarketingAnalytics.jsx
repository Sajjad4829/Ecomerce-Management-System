import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataTable from '../../components/analytics/DataTable';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function MarketingAnalytics() {
  const { service, dateRange } = useAnalytics();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(service.getMarketingMetrics());
  }, [service, dateRange]);

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Marketing Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Campaign, Promotion, and Coupon Performance</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-background">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8 flex flex-col" style={{ minHeight: '350px' }}>
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Campaign Performance</h3>
        </div>
        <DataTable 
          data={data.campaigns} 
          columns={[
            { key: 'name', label: 'Campaign' },
            { key: 'orders', label: 'Orders' },
            { key: 'discount', label: 'Total Discount', render: (val) => service.formatCurrency(val) },
            { key: 'revenue', label: 'Revenue Generated', render: (val) => service.formatCurrency(val) },
          ]}
          searchPlaceholder="Search campaigns..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '350px' }}>
            <div className="p-6 border-b border-black/5">
            <h3 className="text-lg font-medium">Promotion Performance</h3>
            </div>
            <DataTable 
            data={data.promotions} 
            columns={[
               { key: 'name', label: 'Promotion' },
               { key: 'orders', label: 'Usage (Orders)' },
               { key: 'discount', label: 'Total Discount', render: (val) => service.formatCurrency(val) },
               { key: 'revenue', label: 'Revenue Generated', render: (val) => service.formatCurrency(val) },
            ]}
            searchPlaceholder="Search promotions..."
            />
         </div>

         <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '350px' }}>
            <div className="p-6 border-b border-black/5">
            <h3 className="text-lg font-medium">Coupon Performance</h3>
            </div>
            <DataTable 
            data={data.coupons} 
            columns={[
               { key: 'code', label: 'Coupon Code' },
               { key: 'orders', label: 'Usage (Orders)' },
               { key: 'discount', label: 'Total Discount', render: (val) => service.formatCurrency(val) },
               { key: 'revenue', label: 'Revenue Generated', render: (val) => service.formatCurrency(val) },
            ]}
            searchPlaceholder="Search coupons..."
            />
         </div>
      </div>
    </div>
  );
}
