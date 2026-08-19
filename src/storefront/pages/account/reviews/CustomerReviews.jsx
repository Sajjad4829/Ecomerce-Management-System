import React from 'react';
import { Link } from 'react-router-dom';
import { useReviews } from '../../../../admin/context/ReviewContext';
import { FiStar, FiChevronRight, FiEdit3 } from 'react-icons/fi';

export default function CustomerReviews() {
  const { reviews } = useReviews();
  // Assume logged in as Sarah Jenkins for preview purposes
  const myReviews = reviews.filter(r => r.customerName === 'Sarah Jenkins');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">My Reviews</h2>
        <Link to="/account/reviews/new" className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors flex items-center gap-2">
          <FiEdit3 size={16} /> Write a Review
        </Link>
      </div>

      {myReviews.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-black/5 text-center shadow-sm">
          <FiStar className="mx-auto text-gray-300 mb-4" size={32} />
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No reviews yet</h3>
          <p className="text-gray-500 mb-6">You haven't reviewed any products yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
          <div className="divide-y divide-black/5">
            {myReviews.map((rev) => (
              <div key={rev.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Link to={`/account/reviews/${rev.id}`} className="font-bold text-[#1A1A1A] hover:underline">
                      {rev.productName}
                    </Link>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      rev.status === 'Published' ? 'bg-green-100 text-green-800' :
                      rev.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rev.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < rev.rating ? 'fill-current' : 'text-gray-300'} />
                      ))}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                  {rev.title && <p className="text-sm font-medium text-gray-900">{rev.title}</p>}
                </div>
                <div>
                  <Link to={`/account/reviews/${rev.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                    View / Edit <FiChevronRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
