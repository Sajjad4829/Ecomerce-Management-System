import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiEyeOff, FiMessageSquare } from 'react-icons/fi';
import { useReviews } from '../../../context/ReviewContext';
import ReviewTimeline from '../../../components/reviews/ReviewTimeline';
import ReviewModeration from '../../../components/reviews/ReviewModeration';

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReview, updateReviewStatus } = useReviews();
  const review = getReview(id);

  if (!review) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">Review not found</h2>
        <button onClick={() => navigate('/admin/reviews/all')} className="text-primary hover:underline mt-2">Return to list</button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateReviewStatus(id, newStatus, `Status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/reviews/all" className="p-2 border border-border rounded-lg hover:bg-background transition-colors">
            <FiArrowLeft size={20} className="text-text-secondary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{review.id}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  review.status === 'Published' ? 'bg-success-soft text-green-800' :
                  review.status === 'Pending Moderation' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
              }`}>
                {review.status}
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">Product: {review.productName}</p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center flex-wrap">
          {review.status === 'Pending Moderation' && (
             <>
               <button onClick={() => handleStatusChange('Published')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"><FiCheckCircle/> Approve</button>
               <button onClick={() => handleStatusChange('Rejected')} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"><FiXCircle/> Reject</button>
             </>
          )}
          {review.status === 'Published' && (
             <button onClick={() => handleStatusChange('Hidden')} className="px-4 py-2 bg-gray-100 text-text-secondary border border-border-hover rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"><FiEyeOff/> Hide Review</button>
          )}
          {(review.status === 'Hidden' || review.status === 'Rejected') && (
             <button onClick={() => handleStatusChange('Published')} className="px-4 py-2 bg-gray-100 text-text-secondary border border-border-hover rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">Restore (Publish)</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
               <h2 className="text-lg font-bold text-text-primary">Review Content</h2>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-2 mb-4">
                 <span className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                 </span>
                 <span className="text-sm font-bold text-text-primary">{review.rating} out of 5</span>
               </div>
               {review.title && <h3 className="text-xl font-bold text-text-primary mb-2">{review.title}</h3>}
               <p className="text-text-secondary whitespace-pre-wrap">{review.content}</p>
               
               {review.media && review.media.length > 0 && (
                 <div className="mt-6">
                   <h4 className="text-sm font-semibold text-text-primary mb-3">Customer Photos</h4>
                   <div className="flex flex-wrap gap-4">
                     {review.media.map((img, i) => (
                       <img key={i} src={img.url} alt={`Review media ${i}`} className="w-32 h-32 object-cover rounded-lg border border-border" />
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </div>

          <ReviewModeration review={review} />

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">Customer Details</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-text-primary">{review.customerName}</p>
                {review.isVerifiedPurchase ? (
                  <p className="text-sm text-success font-semibold flex items-center gap-1 mt-1"><FiCheckCircle size={14}/> Verified Purchase</p>
                ) : (
                  <p className="text-sm text-text-muted mt-1">Unverified Buyer</p>
                )}
              </div>
              {review.orderId && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-text-muted uppercase font-semibold">Associated Order</p>
                  <p className="text-sm text-text-primary mt-1"><Link to={`/admin/orders/${review.orderId}`} className="text-primary hover:underline">{review.orderId}</Link></p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
             <h2 className="text-lg font-bold text-text-primary mb-6">Review Timeline</h2>
             <ReviewTimeline events={review.timeline} />
          </div>

        </div>

      </div>
    </div>
  );
}
