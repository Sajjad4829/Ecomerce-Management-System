import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useReviews } from '../../../admin/context/ReviewContext';

export default function ProductReviews({ product }) {
  const { getProductReviews, getProductRating } = useReviews();
  const [showAll, setShowAll] = useState(false);

  if (!product) return null;

  const reviews = getProductReviews(product.id) || [];
  const ratingData = getProductRating(product.id);

  if (reviews.length === 0) {
    return (
      <div className="py-12 border-b border-gray-100">
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Customer Reviews</h2>
        <p className="text-gray-500">No reviews yet for this product.</p>
      </div>
    );
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="py-12 border-b border-gray-100">
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-8">Customer Reviews</h2>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Review Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-serif font-bold text-gray-900 mb-2">{ratingData.average}</span>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.round(ratingData.average) ? 'fill-current' : ''} size={20} />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-500">Based on {ratingData.count} reviews</p>
          </div>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = ratingData.distribution[stars] || 0;
              const percentage = ratingData.count > 0 ? (count / ratingData.count) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600 w-8">
                    <span>{stars}</span>
                    <FiStar size={12} className="fill-gray-400 text-gray-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 w-6 text-right">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {displayedReviews.map(review => (
            <div key={review.id} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < review.rating ? 'fill-current' : ''} size={14} />
                    ))}
                  </div>
                  <h4 className="font-bold text-gray-900">{review.title}</h4>
                </div>
                <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700">{review.customerName}</span>
                {review.isVerifiedPurchase && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Verified Buyer</span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">{review.content}</p>

              {review.media && review.media.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.media.map((m, i) => (
                    <img key={i} src={m.url} alt="Review attachment" className="w-16 h-16 object-cover rounded bg-gray-100" />
                  ))}
                </div>
              )}

              {review.adminReply && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-gray-900 mb-1">Store Response</p>
                  <p className="text-sm text-gray-600">{review.adminReply.content}</p>
                </div>
              )}
            </div>
          ))}

          {reviews.length > 3 && !showAll && (
            <button 
              onClick={() => setShowAll(true)}
              className="mt-4 px-6 py-3 border border-gray-900 text-gray-900 font-bold tracking-widest uppercase text-sm hover:bg-gray-50 transition-colors self-start"
            >
              Read All {reviews.length} Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
