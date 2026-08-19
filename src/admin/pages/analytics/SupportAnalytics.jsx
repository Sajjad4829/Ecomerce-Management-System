import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function SupportAnalytics() {
  return <PlaceholderAnalytics title="Support Analytics" description="Customer support performance" metrics={[{label: 'Open Tickets'}, {label: 'Resolved Tickets'}, {label: 'Resolution Time'}, {label: 'Customer Satisfaction', format: 'percent'}]} />;
}
