import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../../../context/AnalyticsContext';
import DataTable from '../../../../components/cms/DataTable';
import { FiPlus } from 'react-icons/fi';
import AnalyticsTabs from '../../../components/analytics/AnalyticsTabs';

export default function ReportManager() {
  const navigate = useNavigate();
  const { reports } = useAnalytics();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-text-primary">Report Builder</h1>
          <p className="text-text-muted text-sm mt-1">Custom analytics and exports</p>
        </div>
        <button 
          onClick={() => navigate('/admin/analytics/reports/new')}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          <FiPlus /> Create Report
        </button>
      </div>
      <AnalyticsTabs />

      <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Saved Reports</h3>
        </div>
        <DataTable 
          data={reports} 
          columns={[
            { key: 'name', label: 'Report Name' },
            { key: 'source', label: 'Data Source' },
            { key: 'visualization', label: 'Type' },
          ]}
          searchPlaceholder="Search reports..."
        />
      </div>
    </div>
  );
}
