import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function CMSAnalytics() {
  return <PlaceholderAnalytics title="CMS Analytics" description="Content and page performance" metrics={[{label: 'Page Views'}, {label: 'Section Engagement', format: 'percent'}, {label: 'Landing Page Performance', format: 'percent'}, {label: 'Content Performance', format: 'percent'}]} />;
}
