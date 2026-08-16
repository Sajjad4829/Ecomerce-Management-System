import React from 'react';
import { useMarketing } from '../../../context/marketing/MarketingContext';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';

export const CampaignCenter = () => {
  const { campaigns } = useMarketing();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success-soft text-green-800 border border-green-200';
      case 'Scheduled': return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'Draft': return 'bg-neutral-100 text-neutral-800 border border-neutral-200';
      case 'Completed': return 'bg-neutral-100 text-neutral-500 border border-neutral-200';
      case 'Paused': return 'bg-warning-soft text-amber-800 border border-amber-200';
      case 'Cancelled': return 'bg-error-soft text-red-800 border border-red-200';
      default: return 'bg-neutral-100 text-neutral-800 border border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Campaigns</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage marketing campaigns, audiences, and promotions.</p>
        </div>
        <Link to="/admin/marketing/campaigns/create" className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Campaign
        </Link>
      </div>

      <div className="bg-surface rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Objective</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {campaigns.length > 0 ? campaigns.map(c => (
                <tr key={c.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900">{c.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{c.id}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{c.type}</td>
                  <td className="px-6 py-4 text-neutral-600">{c.objective}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    <div>{c.startDate}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">to {c.endDate || 'Ongoing'}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/marketing/campaigns/${c.id}`} className="text-sm font-medium text-primary hover:text-indigo-900">
                        Analytics
                      </Link>
                      <button className="p-1 text-neutral-400 hover:text-neutral-900 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                        <Megaphone className="w-6 h-6 text-neutral-400" />
                      </div>
                      <p className="font-medium text-neutral-900">No campaigns found</p>
                      <p className="text-sm mt-1">Get started by creating your first marketing campaign.</p>
                      <Link to="/admin/marketing/campaigns/create" className="mt-4 px-4 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                        Create Campaign
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {campaigns.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Showing 1 to {campaigns.length} of {campaigns.length} campaigns</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-neutral-200 rounded text-neutral-600 bg-white hover:bg-neutral-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-neutral-200 rounded text-neutral-600 bg-white hover:bg-neutral-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCenter;
