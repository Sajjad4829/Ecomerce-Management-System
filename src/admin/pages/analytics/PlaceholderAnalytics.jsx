import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import MetricCard from '../../components/analytics/MetricCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';
import DataStatusIndicator from '../../components/analytics/DataStatusIndicator';
import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';
import { FiDownload } from 'react-icons/fi';

export default function PlaceholderAnalytics({ title, description, metrics }) {
  const { dateRange } = useAnalytics();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <DataStatusIndicator status="unavailable" message="Pending Backend Integration" />
          <DateRangeSelector />
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiDownload /> Export
          </button>
        </div>
      </div>
      <AnalyticsTabs />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <MetricCard 
            key={idx}
            title={metric.label}
            value={0}
            format={metric.format || 'number'}
            info="Pending backend implementation"
          />
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-xl border border-black/5 shadow-sm p-12 text-center text-gray-500">
        <p>Visualization Placeholder (Backend Required)</p>
      </div>
    </div>
  );
}
