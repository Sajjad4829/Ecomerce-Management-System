import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function ReturnAnalytics() {
  return <PlaceholderAnalytics title="Return Analytics" description="Return requests and reasons" metrics={[{label: 'Return Requests'}, {label: 'Approved Returns'}, {label: 'Return Rate', format: 'percent'}, {label: 'Refund Amount', format: 'currency'}]} />;
}
