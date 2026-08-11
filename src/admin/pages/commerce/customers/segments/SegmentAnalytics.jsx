import React from 'react';
import { FiTrendingUp, FiArrowLeft, FiActivity, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function SegmentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/customers/segments" className="text-text-muted hover:text-text-primary">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Segment Analytics</h1>
          <p className="text-sm text-text-muted mt-1">Insights and growth metrics across all customer segments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
               <FiTrendingUp size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Segmented Customers</p>
           </div>
           <div className="flex items-end gap-2 mt-4">
             <p className="text-3xl font-bold text-text-primary">85%</p>
             <p className="text-sm font-medium text-success mb-1">+2.4% vs last month</p>
           </div>
           <p className="text-xs text-text-muted mt-1">Percentage of total customers in at least one active segment.</p>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
               <FiActivity size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Fastest Growing</p>
           </div>
           <div className="mt-4">
             <p className="text-xl font-bold text-text-primary">VIP Customers</p>
             <p className="text-sm font-medium text-success mt-1">+14% (120 members)</p>
           </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-danger-soft flex items-center justify-center text-danger">
               <FiUsers size={20} />
             </div>
             <p className="text-sm font-medium text-text-muted">Highest Churn Risk</p>
           </div>
           <div className="mt-4">
             <p className="text-xl font-bold text-text-primary">At Risk</p>
             <p className="text-sm font-medium text-danger mt-1">450 members</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
           <h2 className="text-lg font-bold text-text-primary mb-4">Lifecycle Distribution</h2>
           <div className="space-y-4 mt-6">
             {/* Mock Chart bars */}
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-medium text-text-secondary">New Customers</span>
                 <span className="text-text-muted">24%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-medium text-text-secondary">Returning Customers</span>
                 <span className="text-text-muted">45%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-success-soft0 h-2 rounded-full" style={{ width: '45%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-medium text-text-secondary">Loyal/VIP</span>
                 <span className="text-text-muted">18%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-medium text-text-secondary">At Risk/Inactive</span>
                 <span className="text-text-muted">13%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-danger-soft0 h-2 rounded-full" style={{ width: '13%' }}></div>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
           <h2 className="text-lg font-bold text-text-primary mb-4">Top Segments by Conversion</h2>
           <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-text-muted uppercase pb-3">Segment Name</th>
                    <th className="text-right text-xs font-medium text-text-muted uppercase pb-3">Conversion Rate</th>
                    <th className="text-right text-xs font-medium text-text-muted uppercase pb-3">Avg Order Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 text-sm font-medium text-text-primary">VIP Customers</td>
                    <td className="py-3 text-sm text-text-muted text-right">12.4%</td>
                    <td className="py-3 text-sm text-text-primary font-bold text-right">$4,250</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-medium text-text-primary">Recent Purchasers</td>
                    <td className="py-3 text-sm text-text-muted text-right">8.2%</td>
                    <td className="py-3 text-sm text-text-primary font-bold text-right">$1,120</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-medium text-text-primary">Summer Sale Participants</td>
                    <td className="py-3 text-sm text-text-muted text-right">5.1%</td>
                    <td className="py-3 text-sm text-text-primary font-bold text-right">$850</td>
                  </tr>
                </tbody>
              </table>
           </div>
           <div className="mt-4 text-center">
             <p className="text-xs text-text-muted italic">Analytics data is simulated for preview.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
