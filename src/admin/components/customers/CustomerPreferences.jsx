import { useState } from 'react';
import { FiSliders } from 'react-icons/fi';

export default function CustomerPreferences() {
  const [preferences, setPreferences] = useState({
    emailMarketing: true,
    smsMarketing: false,
    orderNotifications: true,
    promotionalNotifications: true
  });

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiSliders className="text-gray-400" />
        <h3 className="text-sm font-bold text-[#1A1A1A]">Communication Preferences</h3>
      </div>

      <div className="space-y-4">
        <ToggleRow 
          label="Email Marketing" 
          description="Send marketing emails and newsletters."
          checked={preferences.emailMarketing}
          onChange={() => togglePref('emailMarketing')}
        />
        <ToggleRow 
          label="SMS Marketing" 
          description="Send promotional text messages."
          checked={preferences.smsMarketing}
          onChange={() => togglePref('smsMarketing')}
        />
        <ToggleRow 
          label="Order Notifications" 
          description="Send transactional order updates."
          checked={preferences.orderNotifications}
          onChange={() => togglePref('orderNotifications')}
        />
        <ToggleRow 
          label="Promotional Notifications" 
          description="Send app/browser notifications for sales."
          checked={preferences.promotionalNotifications}
          onChange={() => togglePref('promotionalNotifications')}
        />
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <span className="text-sm font-bold text-[#1A1A1A] block">{label}</span>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
      <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-4.5' : 'translate-x-1'}`} />
      </div>
    </label>
  );
}
