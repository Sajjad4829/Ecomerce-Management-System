import React, { useState } from 'react';
import { useReviews } from '../../../context/reviews/ReviewContext';
import { Search, Filter, MoreVertical, Check, X, EyeOff, Flag, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReviewCenter() {
  const { reviews, approveReview, rejectReview, hideReview } = useReviews();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(r => 
    r.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Published': return 'bg-success-soft text-green-800';
      case 'Pending': return 'bg-warning-soft text-amber-800';
      case 'Rejected': return 'bg-danger-soft text-red-800';
      case 'Hidden': return 'bg-neutral-100 text-neutral-800';
      case 'Reported': return 'bg-orange-100 text-orange-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Review Center</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage all customer reviews and ratings</p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <button className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Review / Product</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredReviews.map(review => (
              <tr key={review.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900 line-clamp-1">{review.title}</div>
                  <div className="text-neutral-500 text-xs mt-1">{review.productName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-neutral-900">{review.customerName}</div>
                  {review.verifiedPurchase && (
                    <div className="flex items-center gap-1 text-xs text-success mt-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {review.rating} <Star className="w-4 h-4 fill-current" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(review.status)}`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {review.status === 'Pending' && (
                      <>
                        <button onClick={() => approveReview(review.id)} className="p-1 text-success hover:bg-success-soft rounded" title="Approve"><Check className="w-4 h-4" /></button>
                        <button onClick={() => rejectReview(review.id)} className="p-1 text-danger hover:bg-danger-soft rounded" title="Reject"><X className="w-4 h-4" /></button>
                      </>
                    )}
                    {review.status === 'Published' && (
                      <button onClick={() => hideReview(review.id)} className="p-1 text-neutral-600 hover:bg-neutral-100 rounded" title="Hide"><EyeOff className="w-4 h-4" /></button>
                    )}
                    <Link to={`/admin/reviews/${review.id}`} className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded ml-2">
                      <MoreVertical className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {filteredReviews.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                  No reviews found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
