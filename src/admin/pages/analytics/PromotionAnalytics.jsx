import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function PromotionAnalytics() {
  return <PlaceholderAnalytics title="Promotion Analytics" description="Discount and promotion impact" metrics={[{label: 'Active Promotions'}, {label: 'Promotion Usage'}, {label: 'Discount Amount', format: 'currency'}, {label: 'Revenue Impact', format: 'currency'}]} />;
}
