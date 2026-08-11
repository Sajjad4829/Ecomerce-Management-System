import React from 'react';
import { FiSave, FiSettings, FiTruck, FiBox, FiClock } from 'react-icons/fi';

export default function ShippingSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Shipping Settings</h1>
          <p className="text-sm text-text-muted mt-1">Configure global shipping, delivery, and tracking rules.</p>
        </div>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Core Settings */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiSettings /> General Preferences</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Default Shipping Origin</label>
                <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface">
                  <option>Primary Warehouse (New York)</option>
                  <option>West Coast Distribution (California)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Weight Unit</label>
                <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface">
                  <option>Pounds (lb)</option>
                  <option>Kilograms (kg)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Dimensions Unit</label>
                <select className="w-full px-3 py-2 border border-border-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] text-sm bg-surface">
                  <option>Inches (in)</option>
                  <option>Centimeters (cm)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Furniture Specific Delivery Rules */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiBox /> Furniture Delivery Rules</h2>
          </div>
          <div className="p-6 space-y-4">
             <label className="flex items-start gap-3">
               <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <div>
                 <p className="text-sm font-medium text-text-primary">Require "White-Glove Delivery" for Oversized Items</p>
                 <p className="text-xs text-text-muted mt-0.5">Automatically forces white-glove selection if cart contains oversized furniture.</p>
               </div>
             </label>
             <label className="flex items-start gap-3">
               <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <div>
                 <p className="text-sm font-medium text-text-primary">Enable Delivery Instructions at Checkout</p>
                 <p className="text-xs text-text-muted mt-0.5">Allow customers to provide gate codes, floor numbers, and parking info.</p>
               </div>
             </label>
             <label className="flex items-start gap-3">
               <input type="checkbox" className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <div>
                 <p className="text-sm font-medium text-text-primary">Enable Store Pickup</p>
                 <p className="text-xs text-text-muted mt-0.5">Allow customers to collect items directly from warehouse locations.</p>
               </div>
             </label>
          </div>
        </section>

        {/* Delivery Scheduling */}
        <section className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FiClock /> Delivery Scheduling</h2>
          </div>
          <div className="p-6 space-y-6">
            <label className="flex items-start gap-3 mb-4">
               <input type="checkbox" defaultChecked className="mt-1 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <div>
                 <p className="text-sm font-medium text-text-primary">Enable Customer Scheduling</p>
                 <p className="text-xs text-text-muted mt-0.5">Allow customers to pick their preferred delivery date post-purchase.</p>
               </div>
             </label>
             
             <div>
               <p className="text-sm font-medium text-text-secondary mb-2">Available Delivery Slots (Placeholder)</p>
               <div className="space-y-2">
                 <div className="flex gap-2 items-center">
                   <input type="text" defaultValue="Morning (09:00 - 12:00)" className="flex-1 px-3 py-2 border border-border-hover rounded-lg text-sm" disabled />
                   <button className="text-danger text-sm hover:underline">Remove</button>
                 </div>
                 <div className="flex gap-2 items-center">
                   <input type="text" defaultValue="Afternoon (12:00 - 15:00)" className="flex-1 px-3 py-2 border border-border-hover rounded-lg text-sm" disabled />
                   <button className="text-danger text-sm hover:underline">Remove</button>
                 </div>
                 <div className="flex gap-2 items-center">
                   <input type="text" defaultValue="Evening (15:00 - 18:00)" className="flex-1 px-3 py-2 border border-border-hover rounded-lg text-sm" disabled />
                   <button className="text-danger text-sm hover:underline">Remove</button>
                 </div>
                 <button className="text-primary text-sm font-medium hover:underline mt-2">+ Add Slot</button>
               </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
