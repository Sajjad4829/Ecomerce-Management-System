import React from 'react';
import { Target } from 'lucide-react';

export default function LoyaltyCampaignCenter() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Loyalty Campaigns</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage point multiplier and bonus campaigns</p>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
        <Target className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
        <h3 className="font-medium text-neutral-900">Campaigns Placeholder</h3>
        <p className="text-sm mt-1">List of active bonus point campaigns.</p>
      </div>
    </div>
  );
}
