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
          <h1 className="text-2xl font-bold text-text-primary">Reviews & Ratings</h1>
          <p className="text-sm text-text-muted mt-1">Manage customer feedback, moderation, and product ratings.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/reviews/all" className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Manage Reviews
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
            <FiMessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Total Reviews</p>
            <p className="text-2xl font-bold text-text-primary">{totalReviews}</p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
            <FiStar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Average Rating</p>
            <p className="text-2xl font-bold text-text-primary">{avgRating}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Pending Moderation</p>
            <p className="text-2xl font-bold text-text-primary">{pendingModeration}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-danger-soft flex items-center justify-center text-danger">
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted">Active Reports</p>
            <p className="text-2xl font-bold text-text-primary">{reportedCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Reviews */}
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
             <h2 className="text-lg font-bold text-text-primary">Recent Reviews</h2>
             <Link to="/admin/reviews/all" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
             {reviews.slice(0, 5).map(rev => (
               <div key={rev.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-background">
                 <div>
                   <Link to={`/admin/reviews/${rev.id}`} className="font-medium text-text-primary hover:text-primary block">{rev.title || 'Untitled Review'}</Link>
                   <div className="flex items-center gap-2 mt-1">
                     <span className="flex text-yellow-400 text-sm">
                       {[...Array(5)].map((_, i) => (
                         <FiStar key={i} className={i < rev.rating ? 'fill-current' : 'text-gray-300'} />
                       ))}
                     </span>
                     <span className="text-sm text-text-muted">• {rev.productName}</span>
                   </div>
                   <p className="text-sm text-text-muted mt-1 line-clamp-1">{rev.content}</p>
                 </div>
                 <div className="sm:text-right shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      rev.status === 'Published' ? 'bg-success-soft text-green-800' :
                      rev.status === 'Pending Moderation' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rev.status}
                    </span>
                    <p className="text-xs text-text-muted mt-1">{new Date(rev.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-4">Review Workspaces</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link to="/admin/reviews/reports" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-danger-soft text-danger rounded-lg"><FiAlertTriangle /></div>
                   <h3 className="font-medium text-text-primary group-hover:text-blue-700">Review Reports</h3>
                 </div>
                 <p className="text-sm text-text-muted">Manage community-reported reviews.</p>
               </Link>
               <Link to="/admin/settings/reviews" className="p-4 border border-border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-gray-100 text-text-secondary rounded-lg"><FiCheckCircle /></div>
                   <h3 className="font-medium text-text-primary group-hover:text-blue-700">Moderation Settings</h3>
                 </div>
                 <p className="text-sm text-text-muted">Configure auto-publish rules & reasons.</p>
               </Link>
             </div>
          </div>
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-text-primary">Rating Distribution</h2>
             </div>
             <div className="h-48 bg-background rounded-lg flex items-center justify-center border border-dashed border-border">
                <p className="text-sm text-text-muted">Chart: 5-Star Distribution Analytics Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
