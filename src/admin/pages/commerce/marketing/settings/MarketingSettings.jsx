import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function MarketingSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Marketing Settings</h1>
          <p className="text-sm text-text-muted mt-1">Configure global marketing rules and consent requirements.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/50">
          <h2 className="text-lg font-bold text-text-primary">Consent Management</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
             <div>
               <p className="font-medium text-text-primary">Require Explicit Marketing Consent</p>
               <p className="text-sm text-text-muted mt-1">Do not send marketing communications unless the customer explicitly opted in. Transactional messages (order updates, password resets) are always sent.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer ml-4">
               <input type="checkbox" className="sr-only peer" defaultChecked />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
          <div className="flex items-start justify-between border-t border-gray-100 pt-6">
             <div>
               <p className="font-medium text-text-primary">Double Opt-In</p>
               <p className="text-sm text-text-muted mt-1">Require customers to confirm their email address before receiving marketing campaigns.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer ml-4">
               <input type="checkbox" className="sr-only peer" />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/50">
          <h2 className="text-lg font-bold text-text-primary">Automation Defaults</h2>
        </div>
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Default Sending Channel</label>
                <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]">
                  <option>Email</option>
                  <option>SMS</option>
                  <option>In-App Notification</option>
                </select>
                <p className="text-xs text-text-muted mt-2">Fallback channel for automations if a specific action does not define one.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Quiet Hours Start</label>
                <input type="time" defaultValue="22:00" className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Quiet Hours End</label>
                <input type="time" defaultValue="08:00" className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
              </div>
              <p className="text-xs text-text-muted">Marketing automations triggered during quiet hours will be queued and sent after quiet hours end (in the customer's timezone).</p>
           </div>
        </div>
      </div>
      
    </div>
  );
}
