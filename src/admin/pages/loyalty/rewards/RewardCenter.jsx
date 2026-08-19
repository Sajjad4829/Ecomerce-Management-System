import React from 'react';
import { useLoyalty } from '../../../context/loyalty/LoyaltyContext';
import { Plus, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RewardCenter() {
  const { rewards } = useLoyalty();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Reward Catalog</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage rewards available for point redemption</p>
        </div>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Reward
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Reward</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Points Cost</th>
              <th className="px-6 py-4 font-medium">Eligible Tier</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rewards.map(reward => (
              <tr key={reward.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{reward.name}</td>
                <td className="px-6 py-4 text-neutral-600">{reward.type}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{reward.cost}</td>
                <td className="px-6 py-4 text-neutral-600">{reward.tier}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-soft text-green-800">
                    {reward.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded inline-block">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
