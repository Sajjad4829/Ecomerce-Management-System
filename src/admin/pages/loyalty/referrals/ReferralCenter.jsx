import React from 'react';
import { useLoyalty } from '../../../context/loyalty/LoyaltyContext';
import { MoreVertical, Settings } from 'lucide-react';

export default function ReferralCenter() {
  const { referrals } = useLoyalty();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Referral Program</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage customer referrals and rewards</p>
        </div>
        <button className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Referrer</th>
              <th className="px-6 py-4 font-medium">Referred</th>
              <th className="px-6 py-4 font-medium">Reward</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {referrals.map(ref => (
              <tr key={ref.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">{ref.referrerName}</td>
                <td className="px-6 py-4 text-neutral-600">{ref.referredName}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{ref.reward}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${ref.status === 'Pending' ? 'bg-warning-soft text-amber-800' : 'bg-success-soft text-green-800'}`}>
                    {ref.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">{new Date(ref.date).toLocaleDateString()}</td>
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
