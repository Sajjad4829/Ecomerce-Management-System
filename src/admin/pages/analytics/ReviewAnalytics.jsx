import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function ReviewAnalytics() {
  return <PlaceholderAnalytics title="Review Analytics" description="Product reviews and ratings" metrics={[{label: 'Total Reviews'}, {label: 'Approved'}, {label: 'Pending'}, {label: 'Average Rating'}]} />;
}
