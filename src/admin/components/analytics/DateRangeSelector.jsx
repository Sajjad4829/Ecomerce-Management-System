import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';

export default function DateRangeSelector() {
  const { dateRange, setDateRange } = useAnalytics();
  
  return (
    <select 
      value={dateRange}
      onChange={(e) => setDateRange(e.target.value)}
      className="px-4 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
    >
      <option value="Today">Today</option>
      <option value="Yesterday">Yesterday</option>
      <option value="Last 7 Days">Last 7 Days</option>
      <option value="Last 30 Days">Last 30 Days</option>
      <option value="Last 90 Days">Last 90 Days</option>
      <option value="This Month">This Month</option>
      <option value="Previous Month">Previous Month</option>
      <option value="This Year">This Year</option>
      <option value="Custom Range">Custom Range</option>
    </select>
  );
}
