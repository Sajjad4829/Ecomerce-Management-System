import React from 'react';
import PlaceholderAnalytics from './PlaceholderAnalytics';
export default function CouponAnalytics() {
  return <PlaceholderAnalytics title="Coupon Analytics" description="Coupon usage and impact" metrics={[{label: 'Total Coupons'}, {label: 'Active Coupons'}, {label: 'Redemptions'}, {label: 'Discount Value', format: 'currency'}]} />;
}
