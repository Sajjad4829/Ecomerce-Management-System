import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { FiSave, FiEye, FiArrowLeft } from 'react-icons/fi';

export default function ReportBuilder() {
  const navigate = useNavigate();
  const { saveReport } = useAnalytics();
  
  const [config, setConfig] = useState({
    name: 'Untitled Report',
    source: 'Orders',
    metric: 'Revenue',
    dimension: 'Date',
    visualization: 'Line Chart'
  });

  const handleSave = () => {
    saveReport(config);
    navigate('/admin/analytics/reports');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/analytics/reports')} className="text-gray-400 hover:text-black">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="text-2xl font-serif font-bold text-[#1A1A1A] border-none focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg hover:bg-gray-50">
            <FiEye /> Preview
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <FiSave /> Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6 mb-8">
        <h3 className="text-lg font-medium mb-6">Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
            <select 
              value={config.source}
              onChange={(e) => setConfig({ ...config, source: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            >
              <option>Orders</option>
              <option>Customers</option>
              <option>Products</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
            <select 
              value={config.metric}
              onChange={(e) => setConfig({ ...config, metric: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            >
              <option>Revenue</option>
              <option>Orders</option>
              <option>Units</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimension</label>
            <select 
              value={config.dimension}
              onChange={(e) => setConfig({ ...config, dimension: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            >
              <option>Date</option>
              <option>Product</option>
              <option>Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visualization Type</label>
            <select 
              value={config.visualization}
              onChange={(e) => setConfig({ ...config, visualization: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            >
              <option>Line Chart</option>
              <option>Bar Chart</option>
              <option>Data Table</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl border border-black/5 shadow-sm p-12 text-center text-gray-500">
        <p>Preview Placeholder (Backend Required)</p>
      </div>
    </div>
  );
}
