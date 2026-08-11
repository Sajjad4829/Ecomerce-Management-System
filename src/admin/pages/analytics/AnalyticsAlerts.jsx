import React from 'react';
import { FiBell, FiPlus } from 'react-icons/fi';

export default function AnalyticsAlerts() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Analytics Alerts</h1>
          <p className="text-gray-500 text-sm mt-1">Configure automated anomaly detection</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FiPlus /> New Alert
        </button>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm p-12 text-center text-gray-500">
        <FiBell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No active alerts</h3>
        <p>Alerts engine requires backend integration.</p>
      </div>
    </div>
  );
}
