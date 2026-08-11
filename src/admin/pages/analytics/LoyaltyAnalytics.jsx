import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function LoyaltyAnalytics() {
  return <PlaceholderAnalytics title="Loyalty Analytics" description="Loyalty program performance" metrics={[{label: 'Members'}, {label: 'Points Issued'}, {label: 'Points Redeemed'}, {label: 'VIP Customer Count'}]} />;
}
