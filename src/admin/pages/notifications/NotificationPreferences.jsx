import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiSave } from 'react-icons/fi';

export default function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotification();
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const handleToggle = (categoryIndex, channel) => {
    const newPrefs = [...localPrefs];
    newPrefs[categoryIndex].channels[channel] = !newPrefs[categoryIndex].channels[channel];
    setLocalPrefs(newPrefs);
  };

  const handleSave = () => {
    updatePreferences(localPrefs);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Notification Preferences</h1>
          <p className="text-sm text-stone-500 mt-1">Configure default notification channels for system modules.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium">
          <FiSave /> Save Preferences
        </button>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-sm">
        <strong>Provider Limitations:</strong> Email, SMS, and Push notifications require respective backend infrastructure integration to function.
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-3">Module / Category</th>
              <th className="px-6 py-3 text-center">In-App</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">SMS</th>
              <th className="px-6 py-3 text-center">Push</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {localPrefs.map((pref, i) => (
              <tr key={pref.category} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900">{pref.category}</td>
                {['In-App', 'Email', 'SMS', 'Push'].map(channel => (
                  <td key={channel} className="px-6 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={pref.channels[channel]}
                        onChange={() => handleToggle(i, channel)}
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-stone-900"></div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
