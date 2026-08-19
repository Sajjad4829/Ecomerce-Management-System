import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function SearchAnalytics() {
  return <PlaceholderAnalytics title="Search Analytics" description="Search performance and queries" metrics={[{label: 'Total Searches'}, {label: 'Unique Queries'}, {label: 'Zero Result Rate', format: 'percent'}, {label: 'Search Conversion', format: 'percent'}]} />;
}
