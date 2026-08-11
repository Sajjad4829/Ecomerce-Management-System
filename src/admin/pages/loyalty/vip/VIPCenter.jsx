import React from 'react';
import { Star } from 'lucide-react';

export default function VIPCenter() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">VIP Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage and monitor high-value customers</p>
        </div>
      </div>
      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
        <Star className="w-12 h-12 mx-auto text-amber-400 mb-3" />
        <h3 className="font-medium text-neutral-900">VIP Center</h3>
        <p className="text-sm mt-1">List of top tier members will appear here.</p>
      </div>
    </div>
  );
}
