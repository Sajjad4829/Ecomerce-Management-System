import React from 'react';
import { FiStar, FiMessageSquare, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useReviews } from '../../../context/ReviewContext';

export default function ReviewsDashboard() {
  const { reviews, reports } = useReviews();

  const totalReviews = reviews.length;
  const published = reviews.filter(r => r.status === 'Published').length;
  const pendingModeration = reviews.filter(r => r.status === 'Pending Moderation').length;
  const reportedCount = reports.filter(r => r.status === 'Open' || r.status === 'Under Review').length;
  const verifiedCount = reviews.filter(r => r.isVerifiedPurchase).length;

  let totalRating = 0;
  reviews.forEach(r => totalRating += r.rating);
  const avgRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer feedback, moderation, and product ratings.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/reviews/all" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Manage Reviews
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FiMessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiStar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Moderation</p>
            <p className="text-2xl font-bold text-gray-900">{pendingModeration}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Reports</p>
            <p className="text-2xl font-bold text-gray-900">{reportedCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Reviews */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
             <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
             <Link to="/admin/reviews/all" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {reviews.slice(0, 5).map(rev => (
               <div key={rev.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-gray-50">
                 <div>
                   <Link to={`/admin/reviews/${rev.id}`} className="font-medium text-gray-900 hover:text-blue-600 block">{rev.title || 'Untitled Review'}</Link>
                   <div className="flex items-center gap-2 mt-1">
                     <span className="flex text-yellow-400 text-sm">
                       {[...Array(5)].map((_, i) => (
                         <FiStar key={i} className={i < rev.rating ? 'fill-current' : 'text-gray-300'} />
                       ))}
                     </span>
                     <span className="text-sm text-gray-500">• {rev.productName}</span>
                   </div>
                   <p className="text-sm text-gray-500 mt-1 line-clamp-1">{rev.content}</p>
                 </div>
                 <div className="sm:text-right shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      rev.status === 'Published' ? 'bg-green-100 text-green-800' :
                      rev.status === 'Pending Moderation' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rev.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(rev.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Review Workspaces</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link to="/admin/reviews/reports" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-red-100 text-red-600 rounded-lg"><FiAlertTriangle /></div>
                   <h3 className="font-medium text-gray-900 group-hover:text-blue-700">Review Reports</h3>
                 </div>
                 <p className="text-sm text-gray-500">Manage community-reported reviews.</p>
               </Link>
               <Link to="/admin/settings/reviews" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><FiCheckCircle /></div>
                   <h3 className="font-medium text-gray-900 group-hover:text-blue-700">Moderation Settings</h3>
                 </div>
                 <p className="text-sm text-gray-500">Configure auto-publish rules & reasons.</p>
               </Link>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-900">Rating Distribution</h2>
             </div>
             <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">Chart: 5-Star Distribution Analytics Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
