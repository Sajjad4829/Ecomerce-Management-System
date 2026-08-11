import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function InventoryAnalytics() {
  return <PlaceholderAnalytics title="Inventory Analytics" description="Stock levels and value" metrics={[{label: 'Total Inventory'}, {label: 'Low Stock'}, {label: 'Out of Stock'}, {label: 'Inventory Value', format: 'currency'}]} />;
}
