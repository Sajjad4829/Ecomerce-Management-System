import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function CollectionAnalytics() {
  return <PlaceholderAnalytics title="Collection Analytics" description="Collection performance and revenue" metrics={[{label: 'Collection Revenue', format: 'currency'}, {label: 'Orders'}, {label: 'Units Sold'}, {label: 'Product Count'}]} />;
}
