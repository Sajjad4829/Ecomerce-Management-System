import React from 'react';
import { FiRefreshCw, FiDollarSign, FiRepeat, FiTruck, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useReturns } from '../../../context/ReturnContext';

export default function ReturnsDashboard() {
  const { returns, refunds } = useReturns();

  const totalReturns = returns.length;
  const pendingReview = returns.filter(r => r.status === 'Requested' || r.status === 'Under Review').length;
  const inspectionPending = returns.filter(r => r.status === 'Inspection Pending').length;
  const pendingRefunds = refunds.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
          <p className="text-sm text-gray-500 mt-1">Manage reverse logistics, inspections, and customer resolutions.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/returns" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            View All Returns
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FiRefreshCw size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Returns</p>
            <p className="text-2xl font-bold text-gray-900">{totalReturns}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">{pendingReview}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FiTruck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Inspection Pending</p>
            <p className="text-2xl font-bold text-gray-900">{inspectionPending}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Refunds</p>
            <p className="text-2xl font-bold text-gray-900">{pendingRefunds}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Returns */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
             <h2 className="text-lg font-bold text-gray-900">Recent Return Requests</h2>
             <Link to="/admin/returns" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {returns.slice(0, 5).map(ret => (
               <div key={ret.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                 <div>
                   <Link to={`/admin/returns/${ret.id}`} className="font-medium text-gray-900 hover:text-blue-600 block">{ret.id}</Link>
                   <p className="text-sm text-gray-500">{ret.customer.name} • {ret.items.length} Item(s)</p>
                 </div>
                 <div className="text-right">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      ret.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      ret.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ret.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(ret.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        {/* Workspaces & Analytics */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Resolution Workspaces</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link to="/admin/refunds" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-green-100 text-green-600 rounded-lg"><FiDollarSign /></div>
                   <h3 className="font-medium text-gray-900 group-hover:text-blue-700">Refunds</h3>
                 </div>
                 <p className="text-sm text-gray-500">Process and manage financial returns.</p>
               </Link>
               <Link to="/admin/exchanges" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><FiRepeat /></div>
                   <h3 className="font-medium text-gray-900 group-hover:text-blue-700">Exchanges</h3>
                 </div>
                 <p className="text-sm text-gray-500">Manage replacements and product swaps.</p>
               </Link>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-900">Return Analytics</h2>
               <Link to="/admin/settings/returns" className="text-sm text-gray-500 hover:text-blue-600">Settings</Link>
             </div>
             <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">Return Reason Distribution Chart Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
