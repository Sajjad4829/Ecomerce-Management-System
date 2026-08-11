import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { useLoyalty } from '../../../context/LoyaltyContext';

export default function EarningRules() {
  const { earningRules } = useLoyalty();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Earning Rules</h1>
          <p className="text-sm text-text-muted mt-1">Configure how customers earn points (events, multipliers, etc.).</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiPlus /> Create Rule
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Rule Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Trigger Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Points Awarded</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Conditions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {earningRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-background">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">{rule.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text-secondary">{rule.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-bold">{rule.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{rule.conditions}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rule.status === 'Active' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rule.status}
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
