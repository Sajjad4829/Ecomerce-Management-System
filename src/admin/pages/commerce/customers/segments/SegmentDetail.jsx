import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiUsers, FiMail, FiDownload } from 'react-icons/fi';
import { useMarketing } from '../../../../context/MarketingContext';

export default function SegmentDetail() {
  const { id } = useParams();
  const { getSegment } = useMarketing();
  const segment = getSegment(id) || getSegment('seg_1'); // Fallback for preview

  if (!segment) return <div>Segment not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/customers/segments" className="text-text-muted hover:text-text-primary">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{segment.name}</h1>
              <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded ${
                segment.status === 'Active' ? 'bg-success-soft text-success' : 'bg-gray-100 text-text-secondary'
              }`}>
                {segment.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">{segment.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border-hover text-text-secondary rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2">
            <FiDownload /> Export CSV
          </button>
          <Link to={`/admin/customers/segments/${segment.id}/edit`} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiEdit2 /> Edit Rules
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Segment Summary</h2>
             <dl className="space-y-4">
               <div>
                 <dt className="text-sm text-text-muted">Type</dt>
                 <dd className="text-sm font-medium text-text-primary">{segment.type}</dd>
               </div>
               <div>
                 <dt className="text-sm text-text-muted">Total Customers</dt>
                 <dd className="text-2xl font-bold text-text-primary mt-1">{segment.customerCount.toLocaleString()}</dd>
               </div>
               <div>
                 <dt className="text-sm text-text-muted">Created At</dt>
                 <dd className="text-sm font-medium text-text-primary">{new Date(segment.createdAt).toLocaleDateString()}</dd>
               </div>
               <div>
                 <dt className="text-sm text-text-muted">Last Updated</dt>
                 <dd className="text-sm font-medium text-text-primary">{new Date(segment.updatedAt).toLocaleDateString()}</dd>
               </div>
             </dl>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Rules Summary</h2>
             {segment.type === 'Static' ? (
                <p className="text-sm text-text-muted">Manual list. No dynamic rules.</p>
             ) : (
                <div className="space-y-3">
                  {segment.rules.map(rule => (
                    <div key={rule.id} className="bg-background p-3 rounded-lg text-sm border border-gray-100">
                      <span className="font-mono text-xs text-primary block mb-1">{rule.attribute}</span>
                      <span className="text-text-secondary font-medium">{rule.operator.replace(/_/g, ' ')}</span>
                      <span className="font-bold ml-1 text-text-primary">
                         {Array.isArray(rule.value) ? rule.value.join(', ') : rule.value}
                      </span>
                    </div>
                  ))}
                </div>
             )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden h-full flex flex-col">
             <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
               <h2 className="font-bold text-text-primary">Segment Members</h2>
               <div className="text-sm text-text-muted">Showing top 50 matches</div>
             </div>
             
             {/* Mock Table */}
             <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface divide-y divide-gray-200">
                    <tr className="hover:bg-background">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-xs">SJ</div>
                           <div>
                             <p className="text-sm font-medium text-text-primary">Sarah Jenkins</p>
                             <p className="text-xs text-text-muted">sarah.j@example.com</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">12</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">2 days ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link to={`/admin/customers/cust_1`} className="text-primary hover:text-blue-900">View</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-background">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">MC</div>
                           <div>
                             <p className="text-sm font-medium text-text-primary">Michael Chang</p>
                             <p className="text-xs text-text-muted">m.chang@example.com</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">8</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">1 week ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link to={`/admin/customers/cust_2`} className="text-primary hover:text-blue-900">View</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
