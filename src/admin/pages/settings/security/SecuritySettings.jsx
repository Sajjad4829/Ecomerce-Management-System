import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function SecuritySettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Security Policies</h1>
          <p className="text-text-muted text-sm mt-1">Configure enterprise security and authentication rules</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FiSave /> Save Policies
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Authentication</h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 text-black focus:ring-black" defaultChecked />
              <div>
                <div className="font-medium">Require Multi-Factor Authentication (MFA)</div>
                <div className="text-sm text-text-muted">Enforce MFA for all staff accounts</div>
              </div>
            </label>
            <div className="pt-4 border-t border-black/10">
              <label className="block text-sm font-medium text-text-secondary mb-2">Password Expiration</label>
              <select className="w-full md:w-1/2 px-4 py-2 border border-border-hover rounded-lg">
                <option>90 Days</option>
                <option>60 Days</option>
                <option>30 Days</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Session Management</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Idle Session Timeout</label>
              <select className="w-full md:w-1/2 px-4 py-2 border border-border-hover rounded-lg">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>4 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Maximum Concurrent Sessions</label>
              <select className="w-full md:w-1/2 px-4 py-2 border border-border-hover rounded-lg">
                <option>1 Session</option>
                <option>3 Sessions</option>
                <option>Unlimited</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 text-yellow-800">
           <h3 className="font-medium mb-2">Note on Security Features</h3>
           <p className="text-sm">These settings represent the frontend configuration interface. Real enforcement requires integration with the backend authentication provider or identity service (e.g. Auth0, Okta, Firebase Auth) in the next phase.</p>
        </div>
      </div>
    </div>
  );
}
