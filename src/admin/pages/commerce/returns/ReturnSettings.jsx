import React from 'react';
import { useReturns } from '../../../context/ReturnContext';
import { FiSave, FiSettings, FiList, FiAlertTriangle } from 'react-icons/fi';

export default function ReturnSettings() {
  const { returnReasons } = useReturns();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Return Settings</h1>
          <p className="text-sm text-text-muted mt-1">Configure return policies, windows, and reasons.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Policies */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiSettings /> Global Policies</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Standard Return Window (Days)</label>
                <input type="number" defaultValue={30} className="w-full px-3 py-2 border border-border-hover rounded-lg text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Exchange Window (Days)</label>
                <input type="number" defaultValue={45} className="w-full px-3 py-2 border border-border-hover rounded-lg text-sm focus:ring-[#1A1A1A] focus:border-[#1A1A1A]" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
               <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-text-primary">Auto-approve eligible returns</p>
                   <p className="text-xs text-text-muted mt-0.5">Automatically moves returns to 'Approved' if within window and valid category.</p>
                 </div>
               </label>
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiList /> Return Reasons</h2>
            <button className="text-sm text-primary font-medium hover:underline">+ Add Reason</button>
          </div>
          <div className="divide-y divide-gray-100">
             {returnReasons.map(reason => (
               <div key={reason.id} className="p-4 flex justify-between items-center hover:bg-background">
                 <div>
                   <p className="font-medium text-text-primary">{reason.name}</p>
                   <p className="text-sm text-text-muted">{reason.description}</p>
                 </div>
                 <div className="flex items-center gap-4">
                   <label className="flex items-center gap-2 text-sm text-text-secondary">
                     <input type="checkbox" checked={reason.customerVisible} readOnly className="rounded border-border-hover text-text-primary" />
                     Customer Visible
                   </label>
                   <button className="text-text-muted hover:text-primary text-sm">Edit</button>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Furniture Specific */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden border-l-4 border-l-[#1A1A1A]">
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiAlertTriangle /> Furniture Specific Rules</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-text-primary">Require Damage Photos for Furniture</p>
                   <p className="text-xs text-text-muted mt-0.5">Customers must upload at least 2 photos if returning furniture items for 'Damaged' reasons.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-text-primary">Require White-Glove Return Pickup</p>
                   <p className="text-xs text-text-muted mt-0.5">Force scheduling of specialized freight pickup for oversized items.</p>
                 </div>
             </label>
          </div>
        </section>

      </div>
    </div>
  );
}
