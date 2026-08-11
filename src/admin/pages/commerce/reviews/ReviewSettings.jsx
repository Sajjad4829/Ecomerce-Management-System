import React from 'react';
import { FiSave, FiSettings, FiImage } from 'react-icons/fi';

export default function ReviewSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure moderation rules, media uploads, and customer permissions.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="space-y-8">
        
        {/* General Policies */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiSettings /> General Policies</h2>
          </div>
          <div className="p-6 space-y-4">
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Auto-publish 4 and 5 star reviews</p>
                   <p className="text-xs text-gray-500 mt-0.5">Reviews rated 4+ will bypass the moderation queue unless they contain flagged keywords or media.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Require Verified Purchase</p>
                   <p className="text-xs text-gray-500 mt-0.5">Only customers who have a delivered order for the product can submit a review.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Allow customers to edit published reviews</p>
                   <p className="text-xs text-gray-500 mt-0.5">Edits will send the review back to the moderation queue.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Enable Helpful Voting</p>
                   <p className="text-xs text-gray-500 mt-0.5">Allow users to mark reviews as helpful.</p>
                 </div>
             </label>
          </div>
        </section>

        {/* Media Policies */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FiImage /> Media Capabilities</h2>
          </div>
          <div className="p-6 space-y-4">
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Allow Customer Photos</p>
                   <p className="text-xs text-gray-500 mt-0.5">Customers can upload up to 5 photos per review.</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Allow Customer Videos</p>
                   <p className="text-xs text-gray-500 mt-0.5">Customers can upload video clips (up to 30s).</p>
                 </div>
             </label>
             <label className="flex items-start gap-3">
                 <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Force manual moderation for ALL media</p>
                   <p className="text-xs text-gray-500 mt-0.5">Overrides auto-publish rules if media is attached.</p>
                 </div>
             </label>
          </div>
        </section>

      </div>
    </div>
  );
}
