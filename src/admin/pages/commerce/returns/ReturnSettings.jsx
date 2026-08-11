import React from 'react';
import { useReturns } from '../../../context/ReturnContext';
import { FiSave, FiSettings, FiList, FiAlertTriangle } from 'react-icons/fi';

export default function ReturnSettings() {
  const { returnReasons } = useReturns();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Return Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure return policies, windows, and reasons.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Policies */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiSettings /> Global Policies</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard Return Window (Days)</label>
                <input type="number" defaultValue={30} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Window (Days)</label>
                <input type="number" defaultValue={45} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A]" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
               <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Auto-approve eligible returns</p>
                   <p className="text-xs text-gray-500 mt-0.5">Automatically moves returns to 'Approved' if within window and valid category.</p>
                 </div>
               </label>
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiList /> Return Reasons</h2>
            <button className="text-sm text-blue-600 font-medium hover:underline">+ Add Reason</button>
          </div>
          <div className="divide-y divide-gray-100">
             {returnReasons.map(reason => (
               <div key={reason.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                 <div>
                   <p className="font-medium text-gray-900">{reason.name}</p>
                   <p className="text-sm text-gray-500">{reason.description}</p>
                 </div>
                 <div className="flex items-center gap-4">
                   <label className="flex items-center gap-2 text-sm text-gray-700">
                     <input type="checkbox" checked={reason.customerVisible} readOnly className="rounded border-gray-300 text-[#1A1A1A]" />
                     Customer Visible
                   </label>
                   <button className="text-gray-400 hover:text-blue-600 text-sm">Edit</button>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Furniture Specific */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden border-l-4 border-l-[#1A1A1A]">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiAlertTriangle /> Furniture Specific Rules</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Require Damage Photos for Furniture</p>
                   <p className="text-xs text-gray-500 mt-0.5">Customers must upload at least 2 photos if returning furniture items for 'Damaged' reasons.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Require White-Glove Return Pickup</p>
                   <p className="text-xs text-gray-500 mt-0.5">Force scheduling of specialized freight pickup for oversized items.</p>
                 </div>
             </label>
          </div>
        </section>

      </div>
    </div>
  );
}
