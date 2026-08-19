import React from 'react';

export default function CustomerNotificationPreferences() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
        <p className="text-sm text-gray-500 mt-1">Manage how and when you receive updates.</p>
      </div>

      <div className="space-y-6">
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-gray-900">Order Updates (Transactional)</h2>
            <p className="text-sm text-gray-500">Notifications about your purchases and shipments.</p>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">Order Confirmations</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked disabled className="rounded border-gray-300 text-[#1A1A1A]" />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#1A1A1A]" />
                    SMS
                  </label>
                </div>
             </div>
             
             <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">Shipping Updates</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked disabled className="rounded border-gray-300 text-[#1A1A1A]" />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#1A1A1A]" />
                    SMS
                  </label>
                </div>
             </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-gray-900">Marketing & Promotions</h2>
            <p className="text-sm text-gray-500">Optional updates about sales and new products.</p>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">Exclusive Offers</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#1A1A1A]" />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300 text-[#1A1A1A]" />
                    SMS
                  </label>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end">
           <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-black transition-colors">
             Save Preferences
           </button>
        </div>

      </div>
    </div>
  );
}
