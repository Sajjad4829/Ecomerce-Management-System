import React from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { Users, Plus, Edit } from 'lucide-react';

export const SegmentCenter = () => {
  const { segments } = useMarketing();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Customer Segments</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage target audiences for campaigns</p>
        </div>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" /> Create Segment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {segments.map(seg => (
          <div key={seg.id} className="bg-surface rounded-lg border border-neutral-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {seg.status}
                </span>
              </div>
              <h3 className="text-lg font-medium text-neutral-900">{seg.name}</h3>
              <p className="text-2xl font-serif text-neutral-900 mt-2">{seg.customers} <span className="text-sm font-sans text-neutral-500 font-normal">customers</span></p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Updated: {seg.lastUpdated}</span>
              <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                <Edit className="w-3 h-3" /> Edit Rules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
