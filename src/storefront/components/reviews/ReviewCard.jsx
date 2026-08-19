import React from 'react';
import StarRating from './StarRating';
import { FiCheckCircle, FiThumbsUp } from 'react-icons/fi';

export default function ReviewCard({ review }) {
  return (
    <div className="py-8 border-b border-gray-100 last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Customer Info */}
        <div className="md:col-span-1">
          <p className="font-bold text-[#1A1A1A]">{review.customerName}</p>
          {review.isVerifiedPurchase && (
            <p className="flex items-center gap-1 text-xs text-green-700 font-semibold mt-1">
              <FiCheckCircle size={12} /> Verified Buyer
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
        
        {/* Review Content */}
        <div className="md:col-span-3 space-y-4">
          <StarRating rating={review.rating} />
          
          <div>
            {review.title && <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">{review.title}</h4>}
            <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
          </div>

          {review.media && review.media.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {review.media.map((img, i) => (
                <img key={i} src={img.url} alt={`Review media ${i}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90" />
              ))}
            </div>
          )}

          {review.adminReply && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-4">
              <p className="font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">Response from Elegance</p>
              <p className="text-sm text-gray-700">{review.adminReply.content}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(review.adminReply.createdAt).toLocaleDateString()}</p>
            </div>
          )}
          
          <div className="flex items-center gap-4 pt-4 text-sm text-gray-500">
             <button className="flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors">
               <FiThumbsUp /> Helpful ({review.helpfulCount})
             </button>
             <button className="hover:text-[#1A1A1A] transition-colors ml-auto">
               Report
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
