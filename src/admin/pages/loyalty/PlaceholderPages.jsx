import React from 'react';
import { Users, Award, Gift, Star, Clock, Activity, Target, Settings, BarChart2 } from 'lucide-react';

export const LoyaltyDashboard = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Loyalty Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of customer loyalty and retention</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Total Members</div><div className="text-2xl font-serif text-neutral-900 mt-1">1,245</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Active VIPs</div><div className="text-2xl font-serif text-neutral-900 mt-1">42</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Points Issued</div><div className="text-2xl font-serif text-neutral-900 mt-1">45,000</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Rewards Redeemed</div><div className="text-2xl font-serif text-neutral-900 mt-1">124</div></div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Membership Growth Placeholder</h3>
      <p className="text-sm mt-1">Visual representation of membership activity.</p>
    </div>
  </div>
);

export const CustomerRetention = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Customer Retention</h1>
        <p className="text-sm text-neutral-500 mt-1">Analyze repeat purchases and retention metrics</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Activity className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Retention Dashboard</h3>
      <p className="text-sm mt-1">Placeholder for customer retention metrics.</p>
    </div>
  </div>
);

export const LoyaltyAnalytics = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">Loyalty Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Metrics and trends for loyalty programs</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 h-96 flex items-center justify-center text-center text-neutral-500">
      <div>
        <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
        <h3 className="font-medium text-neutral-900">Analytics Dashboard</h3>
        <p className="text-sm mt-1">Detailed charts for loyalty activity.</p>
      </div>
    </div>
  </div>
);
