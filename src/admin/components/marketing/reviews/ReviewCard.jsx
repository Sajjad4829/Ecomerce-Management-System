import { FiMessageCircle } from 'react-icons/fi';
import RatingStars from './RatingStars';
import VerifiedBadge from './VerifiedBadge';

export default function ReviewCard({ review }) {
  // review = { id, reviewer, avatar, rating, title, content, pros, cons, variant, verified, media: [], date, helpful, merchantReply: { text, date } }

  return (
    <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            {review.avatar ? (
              <img src={review.avatar} alt={review.reviewer} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-sm font-bold text-text-muted">{review.reviewer.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">{review.reviewer}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <VerifiedBadge status={review.verified} />
              <span className="text-xs text-text-muted">{review.date}</span>
            </div>
          </div>
        </div>
        
        <RatingStars rating={review.rating} />
      </div>

      <div className="mb-4">
        <h4 className="text-base font-bold text-text-primary mb-2">{review.title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{review.content}</p>
      </div>

      {(review.pros || review.cons) && (
        <div className="flex flex-col gap-2 mb-4 bg-background p-4 rounded-lg">
          {review.pros && (
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-success shrink-0">Pros:</span>
              <span className="text-text-secondary">{review.pros}</span>
            </div>
          )}
          {review.cons && (
            <div className="flex gap-2 text-sm">
              <span className="font-bold text-red-700 shrink-0">Cons:</span>
              <span className="text-text-secondary">{review.cons}</span>
            </div>
          )}
        </div>
      )}

      {review.media && review.media.length > 0 && (
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 hide-scrollbar">
          {review.media.map((img, idx) => (
            <div key={idx} className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden border border-black/5">
              <img src={img} alt="Review Media" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {review.variant && (
        <div className="text-xs text-text-muted font-medium mb-4">
          Purchased: <span className="text-text-primary">{review.variant}</span>
        </div>
      )}

      {review.merchantReply && (
        <div className="mt-4 pl-4 border-l-2 border-black/10">
          <div className="flex items-center gap-2 mb-1">
            <FiMessageCircle size={14} className="text-text-muted" />
            <span className="text-xs font-bold text-text-primary">Merchant Response</span>
            <span className="text-xs text-text-muted ml-auto">{review.merchantReply.date}</span>
          </div>
          <p className="text-sm text-text-secondary">{review.merchantReply.text}</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center">
        <span className="text-xs text-text-muted">
          {review.helpful || 0} people found this helpful
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium border border-black/10 rounded-md text-text-secondary hover:bg-background transition-colors">
            Helpful
          </button>
        </div>
      </div>
    </div>
  );
}
