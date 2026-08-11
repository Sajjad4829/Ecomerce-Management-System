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
          <Link to="/admin/customers/segments" className="text-gray-500 hover:text-gray-900">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{segment.name}</h1>
              <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded ${
                segment.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {segment.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{segment.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiDownload /> Export CSV
          </button>
          <Link to={`/admin/customers/segments/${segment.id}/edit`} className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <FiEdit2 /> Edit Rules
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Segment Summary</h2>
             <dl className="space-y-4">
               <div>
                 <dt className="text-sm text-gray-500">Type</dt>
                 <dd className="text-sm font-medium text-gray-900">{segment.type}</dd>
               </div>
               <div>
                 <dt className="text-sm text-gray-500">Total Customers</dt>
                 <dd className="text-2xl font-bold text-gray-900 mt-1">{segment.customerCount.toLocaleString()}</dd>
               </div>
               <div>
                 <dt className="text-sm text-gray-500">Created At</dt>
                 <dd className="text-sm font-medium text-gray-900">{new Date(segment.createdAt).toLocaleDateString()}</dd>
               </div>
               <div>
                 <dt className="text-sm text-gray-500">Last Updated</dt>
                 <dd className="text-sm font-medium text-gray-900">{new Date(segment.updatedAt).toLocaleDateString()}</dd>
               </div>
             </dl>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Rules Summary</h2>
             {segment.type === 'Static' ? (
                <p className="text-sm text-gray-500">Manual list. No dynamic rules.</p>
             ) : (
                <div className="space-y-3">
                  {segment.rules.map(rule => (
                    <div key={rule.id} className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-100">
                      <span className="font-mono text-xs text-blue-600 block mb-1">{rule.attribute}</span>
                      <span className="text-gray-600 font-medium">{rule.operator.replace(/_/g, ' ')}</span>
                      <span className="font-bold ml-1 text-gray-900">
                         {Array.isArray(rule.value) ? rule.value.join(', ') : rule.value}
                      </span>
                    </div>
                  ))}
                </div>
             )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
             <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
               <h2 className="font-bold text-gray-900">Segment Members</h2>
               <div className="text-sm text-gray-500">Showing top 50 matches</div>
             </div>
             
             {/* Mock Table */}
             <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">SJ</div>
                           <div>
                             <p className="text-sm font-medium text-gray-900">Sarah Jenkins</p>
                             <p className="text-xs text-gray-500">sarah.j@example.com</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link to={`/admin/customers/cust_1`} className="text-blue-600 hover:text-blue-900">View</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">MC</div>
                           <div>
                             <p className="text-sm font-medium text-gray-900">Michael Chang</p>
                             <p className="text-xs text-gray-500">m.chang@example.com</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 week ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link to={`/admin/customers/cust_2`} className="text-blue-600 hover:text-blue-900">View</Link>
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
