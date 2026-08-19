import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReviews } from '../../../../admin/context/ReviewContext';
import { FiArrowLeft, FiStar, FiCheckCircle } from 'react-icons/fi';

export default function CustomerReviewDetail() {
  const { id } = useParams();
  const { getReview } = useReviews();
  const rev = getReview(id);

  if (!rev) {
    return <div className="p-8 text-center text-gray-500">Review not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/account/reviews" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] mb-4 transition-colors">
          <FiArrowLeft /> Back to My Reviews
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">{rev.productName}</h2>
            <p className="text-sm text-gray-500 mt-1">Reviewed on {new Date(rev.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase ${
            rev.status === 'Published' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {rev.status}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <span className="flex text-yellow-400 text-xl">
               {[...Array(5)].map((_, i) => (
                 <FiStar key={i} className={i < rev.rating ? 'fill-current' : 'text-gray-200'} />
               ))}
             </span>
             {rev.isVerifiedPurchase && (
               <span className="flex items-center gap-1 text-sm text-green-700 font-semibold bg-green-50 px-2 py-1 rounded">
                 <FiCheckCircle size={14} /> Verified Purchase
               </span>
             )}
           </div>
           {rev.status === 'Published' && (
              <button className="text-sm text-blue-600 hover:underline font-medium">Edit Review</button>
           )}
        </div>

        <div>
          {rev.title && <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{rev.title}</h3>}
          <p className="text-gray-700 whitespace-pre-wrap">{rev.content}</p>
        </div>

        {rev.media && rev.media.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Attached Photos</h4>
            <div className="flex flex-wrap gap-4">
              {rev.media.map((img, i) => (
                <img key={i} src={img.url} alt={`Review media ${i}`} className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>
          </div>
        )}

        {rev.adminReply && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
            <p className="font-bold text-[#1A1A1A] mb-2">Response from Elegance</p>
            <p className="text-sm text-gray-700">{rev.adminReply.content}</p>
          </div>
        )}

      </div>
    </div>
  );
}
