import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function NotificationSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure global notification preferences and providers.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Global Configuration</h2>
          <p className="text-sm text-gray-500">Master switches for communication channels.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium text-gray-900">Enable Email Notifications</p>
               <p className="text-sm text-gray-500">Allow the system to send outbound emails.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" value="" className="sr-only peer" defaultChecked />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
          
          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium text-gray-900">Enable SMS Notifications</p>
               <p className="text-sm text-gray-500">Allow the system to send outbound text messages.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" value="" className="sr-only peer" />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
          
          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium text-gray-900">Enable In-App Notifications</p>
               <p className="text-sm text-gray-500">Show notifications in the customer portal.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" value="" className="sr-only peer" defaultChecked />
               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Delivery Rules</h2>
          <p className="text-sm text-gray-500">Configure retry limits and administrative alerts.</p>
        </div>
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Retries</label>
                <input type="number" defaultValue={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-gray-500 mt-1">Number of times to retry a failed notification.</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
