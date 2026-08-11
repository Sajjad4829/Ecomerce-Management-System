import React from 'react';
import { useReviews } from '../../../context/reviews/ReviewContext';
import { Check, X, EyeOff, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReviewModerationCenter() {
  const { reviews, approveReview, rejectReview, hideReview } = useReviews();
  const pendingReviews = reviews.filter(r => r.status === 'Pending' || r.status === 'Reported');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Moderation Queue</h1>
          <p className="text-sm text-neutral-500 mt-1">Review pending and reported content</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-medium">Review</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {pendingReviews.map(review => (
              <tr key={review.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{review.title}</div>
                  <div className="text-neutral-500 text-xs mt-1 line-clamp-1">{review.content}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${review.status === 'Reported' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'}`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => approveReview(review.id)} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Approve"><Check className="w-4 h-4" /></button>
                    <button onClick={() => rejectReview(review.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Reject"><X className="w-4 h-4" /></button>
                    {review.status === 'Reported' && (
                      <button onClick={() => hideReview(review.id)} className="p-1 text-neutral-600 hover:bg-neutral-100 rounded" title="Hide"><EyeOff className="w-4 h-4" /></button>
                    )}
                    <Link to={`/admin/reviews/${review.id}`} className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded ml-2">
                      <MoreVertical className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {pendingReviews.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-neutral-500">
                  Moderation queue is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
