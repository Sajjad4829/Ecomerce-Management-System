import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReviews } from '../../../context/reviews/ReviewContext';
import { Star, CheckCircle2, ArrowLeft, Send, Check, X, EyeOff } from 'lucide-react';

export default function ReviewDetail() {
  const { reviewId } = useParams();
  const { reviews, approveReview, rejectReview, hideReview, respondToReview } = useReviews();
  const review = reviews.find(r => r.id === reviewId);
  const [response, setResponse] = useState('');

  if (!review) return <div className="p-8">Review not found.</div>;

  const handleRespond = () => {
    if (response.trim()) {
      respondToReview(review.id, response);
      setResponse('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/admin/reviews/all" className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-neutral-900">Review {review.id}</h1>
          <p className="text-sm text-neutral-500 mt-1">{review.productName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-neutral-200'}`} />
                ))}
              </div>
              <span className="text-sm text-neutral-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            
            <h3 className="text-lg font-medium text-neutral-900 mb-2">{review.title}</h3>
            <p className="text-neutral-700 whitespace-pre-wrap">{review.content}</p>

            {review.mediaIds && review.mediaIds.length > 0 && (
              <div className="mt-6 flex gap-2">
                {review.mediaIds.map((id, index) => (
                  <div key={id} className="w-20 h-20 bg-neutral-100 rounded-md border border-neutral-200 flex items-center justify-center text-xs text-neutral-400">
                    Media {index + 1}
                  </div>
                ))}
              </div>
            )}

            {review.storeResponse && (
              <div className="mt-6 bg-neutral-50 p-4 rounded-md border border-neutral-200">
                <div className="text-sm font-medium text-neutral-900 mb-1">Official Store Response</div>
                <p className="text-sm text-neutral-700">{review.storeResponse}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Respond to Customer</h3>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write an official response (publicly visible)..."
              className="w-full h-32 p-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleRespond} className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm">
                <Send className="w-4 h-4" /> Publish Response
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Moderation Action</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-neutral-500">Current Status:</span>
                <span className="font-medium">{review.status}</span>
              </div>
              
              <button onClick={() => approveReview(review.id)} className="w-full px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Check className="w-4 h-4" /> Approve
              </button>
              <button onClick={() => hideReview(review.id)} className="w-full px-4 py-2 bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <EyeOff className="w-4 h-4" /> Hide
              </button>
              <button onClick={() => rejectReview(review.id)} className="w-full px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <X className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">Customer Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-neutral-500">Name</div>
                <div className="font-medium">{review.customerName}</div>
              </div>
              <div>
                <div className="text-neutral-500">Verification</div>
                {review.verifiedPurchase ? (
                  <div className="flex items-center gap-1 text-green-600 mt-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Verified Purchase
                  </div>
                ) : (
                  <div className="text-neutral-900 mt-1">Unverified</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
