import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { useLoyalty } from '../../../context/LoyaltyContext';

export default function LoyaltyReferrals() {
  const { referrals } = useLoyalty();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Referral Program</h1>
          <p className="text-sm text-text-muted mt-1">Monitor and manage refer-a-friend activities.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Referrer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Referred Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Reward</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {referrals.map((ref) => (
              <tr key={ref.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap">
                   <div className="flex items-center gap-2">
                      <FiUsers className="text-text-muted" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{ref.referrerName}</p>
                        <p className="text-xs text-text-muted">{ref.referrerId}</p>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{ref.referredEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ref.status === 'Qualified' ? 'bg-success-soft text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ref.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{ref.reward}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-muted">
                  {new Date(ref.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
