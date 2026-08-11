import React from 'react';

export function CustomerSegments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Customer Segments</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage rules-based customer groups</p>
        </div>
        <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors">
          Create Segment
        </button>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        Segment list and builder mock placeholder.
      </div>
    </div>
  );
}

export function CustomerLoyaltyManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Loyalty Program</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage loyalty tiers and point rules</p>
        </div>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        Loyalty program settings mock placeholder.
      </div>
    </div>
  );
}

export function CustomerImport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Import Customers</h2>
          <p className="text-sm text-neutral-500 mt-1">Bulk import customer profiles via CSV</p>
        </div>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        CSV upload interface mock placeholder.
      </div>
    </div>
  );
}

export function CustomerAnalyticsInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Customer Analytics</h2>
          <p className="text-sm text-neutral-500 mt-1">Insights on customer growth and engagement</p>
        </div>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        Customer analytics dashboard mock placeholder.
      </div>
    </div>
  );
}

export function CustomerExport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Export Customers</h2>
          <p className="text-sm text-neutral-500 mt-1">Export customer data to CSV or Excel</p>
        </div>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        Export configuration and history placeholder.
      </div>
    </div>
  );
}

export function CustomerMergeManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-neutral-900">Merge Customers</h2>
          <p className="text-sm text-neutral-500 mt-1">Identify and merge duplicate customer profiles</p>
        </div>
      </div>
      <div className="bg-surface p-8 text-center text-neutral-500 rounded-lg shadow-sm border border-neutral-200">
        Duplicate detection and merge resolution interface placeholder.
      </div>
    </div>
  );
}
