import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function CategoryAnalytics() {
  return <PlaceholderAnalytics title="Category Analytics" description="Category performance and revenue" metrics={[{label: 'Category Revenue', format: 'currency'}, {label: 'Units Sold'}, {label: 'Orders'}, {label: 'Product Count'}]} />;
}
