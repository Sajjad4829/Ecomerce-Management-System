import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { useReviews } from '../../../admin/context/ReviewContext';

export default function ReviewList({ productId }) {
  const { reviews } = useReviews();
  const [filter, setFilter] = useState('All');
  
  const productReviews = reviews.filter(r => r.productId === productId && r.status === 'Published');
  
  const filteredReviews = productReviews.filter(r => {
    if (filter === 'With Photos') return r.media && r.media.length > 0;
    if (filter === 'Verified Only') return r.isVerifiedPurchase;
    if (filter.includes('Star')) return r.rating === parseInt(filter[0]);
    return true; // 'All'
  });

  if (productReviews.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#1A1A1A]">{productReviews.length} Reviews</h3>
        
        <div className="flex flex-wrap gap-2">
          {['All', 'With Photos', 'Verified Only', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === f 
                  ? 'bg-[#1A1A1A] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredReviews.length === 0 ? (
           <div className="py-8 text-center text-gray-500">
             No reviews match this filter.
           </div>
        ) : (
          filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}
