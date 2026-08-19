import React, { useState } from 'react';
import { FiSave, FiPlay } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ComplianceReportBuilder() {
  const navigate = useNavigate();
  const [reportName, setReportName] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Build Report</h1>
          <p className="text-sm text-text-muted mt-1">Configure criteria for a custom compliance report</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-surface text-text-secondary rounded-lg hover:bg-background font-medium">
            <FiPlay /> Preview
          </button>
          <button onClick={() => navigate('/admin/compliance/reports')} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium">
            <FiSave /> Save Report
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Report Name</label>
          <input 
            type="text" 
            placeholder="e.g. Q3 Access Reviews"
            value={reportName}
            onChange={e => setReportName(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Event Types</label>
            <div className="space-y-2">
              {['Access Review', 'Permission Change', 'Inventory Adjustment', 'Order Change', 'Data Export', 'Security Event'].map(type => (
                <label key={type} className="flex items-center gap-2 text-sm text-text-secondary">
                  <input type="checkbox" className="rounded border-border-hover text-text-primary focus:ring-stone-900" />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Date Range</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none mb-4">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>

            <label className="block text-sm font-medium text-text-secondary mb-2">Target Modules</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-stone-900 focus:outline-none">
              <option>All Modules</option>
              <option>RBAC & Security</option>
              <option>Inventory & Commerce</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
