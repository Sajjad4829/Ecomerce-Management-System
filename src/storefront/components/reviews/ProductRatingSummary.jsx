import React from 'react';
import StarRating from './StarRating';
import { useReviews } from '../../../admin/context/ReviewContext';

export default function ProductRatingSummary({ productId }) {
  const { getProductRating } = useReviews();
  const ratingData = getProductRating(productId);

  if (ratingData.count === 0) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-gray-50 p-8 rounded-2xl border border-gray-100">
      
      {/* Average Score */}
      <div className="flex flex-col items-center justify-center shrink-0 w-40">
        <h3 className="text-5xl font-serif font-bold text-[#1A1A1A] mb-2">{ratingData.average}</h3>
        <StarRating rating={Number(ratingData.average)} className="text-xl mb-2" />
        <p className="text-sm text-gray-500">{ratingData.count} Reviews</p>
      </div>

      {/* Distribution */}
      <div className="flex-1 w-full space-y-2">
        {[5, 4, 3, 2, 1].map(star => {
          const count = ratingData.distribution[star] || 0;
          const percentage = ratingData.count > 0 ? (count / ratingData.count) * 100 : 0;
          
          return (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-12">{star} Stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
