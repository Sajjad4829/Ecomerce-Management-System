import { useState } from 'react';
import { FiFilter, FiSave, FiUsers, FiShoppingBag, FiCalendar, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CustomerSegmentation() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/customers" className="text-sm font-medium text-text-muted hover:text-black">Customers</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-text-primary">Segments</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Customer Segmentation</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Build dynamic segments based on behavior, purchase history, and demographics.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm">
            <FiSave size={16} /> Save Segment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-6">
              <FiFilter className="text-text-muted" /> Segment Rules
            </h3>

            <div className="space-y-6">
              <FilterSection title="Purchase Behavior" icon={FiShoppingBag}>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">Has placed an order</span>
                </label>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">Total spent &gt; $1,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">Abandoned cart (30d)</span>
                </label>
              </FilterSection>

              <FilterSection title="Demographics" icon={FiUsers}>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">Is VIP Group</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">Is B2B / Wholesale</span>
                </label>
              </FilterSection>

              <FilterSection title="Location" icon={FiMapPin}>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">United States</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
                  <span className="text-sm text-text-secondary">International</span>
                </label>
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5 bg-background">
              <h2 className="text-lg font-serif font-bold text-text-primary">Preview Segment</h2>
              <p className="text-sm text-text-muted mt-1">1,402 customers match your criteria.</p>
            </div>
            
            <div className="p-8 text-center text-text-muted">
              <FiUsers size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-base font-bold text-text-primary mb-1">Customer list placeholder</h3>
              <p className="text-sm">The matching customers will appear here when rules are applied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, icon: Icon, children }) {
  return (
    <div>
      <h4 className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 mb-3">
        <Icon /> {title}
      </h4>
      <div className="pl-6">
        {children}
      </div>
    </div>
  );
}
