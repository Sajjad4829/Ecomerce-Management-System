import React from 'react';
import { FiSave } from 'react-icons/fi';

export default function SupportSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure service level agreements, tags, and categories.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Service Level Agreements (SLA)</h2>
          <p className="text-sm text-gray-500">Define expected response and resolution times based on priority.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgent Priority (Hours)</label>
              <input type="number" defaultValue={1} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">High Priority (Hours)</label>
              <input type="number" defaultValue={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Normal Priority (Hours)</label>
              <input type="number" defaultValue={24} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Ticket Categories</h2>
          <p className="text-sm text-gray-500">Manage categories available for customers and agents.</p>
        </div>
        <div className="p-6">
           <textarea 
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
             defaultValue={"Order Issue\nProduct Question\nPayment Issue\nShipping Issue\nDelivery Issue\nReturn Request\nRefund Issue\nExchange Issue\nWarranty\nProduct Damage\nInstallation\nGeneral Inquiry\nOther"}
           />
           <p className="text-xs text-gray-500 mt-2">Enter one category per line.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Ticket Tags</h2>
          <p className="text-sm text-gray-500">Manage internal tags for classifying tickets.</p>
        </div>
        <div className="p-6">
           <textarea 
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
             defaultValue={"VIP\nDelivery\nDamaged\nPayment\nUrgent\nRefund\nExchange\nInstallation\nFollow-up"}
           />
           <p className="text-xs text-gray-500 mt-2">Enter one tag per line.</p>
        </div>
      </div>

    </div>
  );
}
