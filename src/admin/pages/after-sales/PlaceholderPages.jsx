import React from 'react';
import { RotateCcw, ClipboardList, PenTool, BarChart2 } from 'lucide-react';

export const AfterSalesDashboard = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">After-Sales Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Overview of returns, warranties, and repairs</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Open Returns</div><div className="text-2xl font-serif text-neutral-900 mt-1">12</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Pending RMAs</div><div className="text-2xl font-serif text-neutral-900 mt-1">5</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Active Repairs</div><div className="text-2xl font-serif text-neutral-900 mt-1">8</div></div>
      <div className="bg-surface p-5 rounded-lg border border-neutral-200 shadow-sm"><div className="text-sm text-neutral-500">Warranty Claims</div><div className="text-2xl font-serif text-neutral-900 mt-1">3</div></div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <Activity className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Resolution Rate Placeholder</h3>
      <p className="text-sm mt-1">Metrics depend on backend analytics engine.</p>
    </div>
  </div>
);
const Activity = BarChart2; // Alias for simplicity

export const AfterSalesAnalytics = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-serif text-neutral-900">After-Sales Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Key performance metrics and trends</p>
      </div>
    </div>
    <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 p-8 text-center text-neutral-500">
      <BarChart2 className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
      <h3 className="font-medium text-neutral-900">Analytics Dashboard</h3>
      <p className="text-sm mt-1">Visualizations for return rates, warranty claims, and repair times.</p>
    </div>
  </div>
);
