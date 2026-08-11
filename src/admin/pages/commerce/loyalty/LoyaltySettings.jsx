import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function LoyaltySettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Program Settings</h1>
          <p className="text-sm text-text-muted mt-1">Configure global loyalty preferences and expiration rules.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/50">
          <h2 className="text-lg font-bold text-text-primary">General Configuration</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium text-text-primary">Enable Loyalty Program</p>
               <p className="text-sm text-text-muted">Allow customers to earn and redeem points.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" value="" className="sr-only peer" defaultChecked />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-text-secondary mb-1">Currency to Points Ratio</label>
               <div className="flex items-center gap-2">
                 <span className="text-sm text-text-muted">$1 = </span>
                 <input type="number" defaultValue={1} className="w-24 px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 <span className="text-sm text-text-muted">Points</span>
               </div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/50">
          <h2 className="text-lg font-bold text-text-primary">Expiration Rules</h2>
        </div>
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Points Expiration (Months)</label>
                <input type="number" defaultValue={12} className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-text-muted mt-1">Number of months before unused points expire.</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
