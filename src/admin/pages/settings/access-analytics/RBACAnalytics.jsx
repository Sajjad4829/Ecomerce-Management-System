import React from 'react';
import { FiUsers, FiShield, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function RBACAnalytics() {
  const stats = [
    { label: 'Total Staff', value: '42', icon: FiUsers, color: 'blue' },
    { label: 'Active Roles', value: '8', icon: FiShield, color: 'purple' },
    { label: 'High Risk Users', value: '3', icon: FiAlertCircle, color: 'red' },
    { label: 'Total Permissions', value: '156', icon: FiLock, color: 'green' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Access Analytics</h1>
          <p className="text-text-muted text-sm mt-1">System-wide access overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-2">
                <div className={`w-10 h-10 rounded-full bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                  <Icon />
                </div>
                <h3 className="font-medium text-text-muted">{stat.label}</h3>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm h-64 flex items-center justify-center text-text-muted">
          Staff by Department Chart Placeholder
        </div>
        <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm h-64 flex items-center justify-center text-text-muted">
          Role Distribution Chart Placeholder
        </div>
      </div>
    </div>
  );
}
