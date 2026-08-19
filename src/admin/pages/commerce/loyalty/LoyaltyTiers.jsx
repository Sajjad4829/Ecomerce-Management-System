import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useLoyalty } from '../../../context/LoyaltyContext';

export default function LoyaltyTiers() {
  const { tiers } = useLoyalty();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Loyalty Tiers</h1>
          <p className="text-sm text-text-muted mt-1">Configure VIP levels and benefits for customers.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Create Tier
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Tier Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Requirements</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Benefits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {tiers.map((tier) => (
              <tr key={tier.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">#{tier.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{tier.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{tier.requirements}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{tier.benefits}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tier.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tier.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   <button className="text-text-muted hover:text-primary"><FiEdit2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
