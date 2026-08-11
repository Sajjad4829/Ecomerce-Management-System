import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function MarketingAnalytics() {
  return <PlaceholderAnalytics title="Marketing Analytics" description="Campaign performance" metrics={[{label: 'Active Campaigns'}, {label: 'Audience Size'}, {label: 'Engagement', format: 'percent'}, {label: 'Conversion', format: 'percent'}]} />;
}
