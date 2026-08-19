import { FiStar, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_REVIEWS = [
  { id: '1', product: 'Oasis Lounge Chair', rating: 5, status: 'Published', date: '2026-08-05', verified: true },
  { id: '2', product: 'Ceramic Table Lamp', rating: 4, status: 'Published', date: '2026-06-12', verified: true },
];

export default function CustomerReviewHistory() {
  return (
    <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <FiStar className="text-text-muted" /> Review History
        </h3>
        <Link to="/admin/marketing/reviews" className="text-xs text-primary hover:text-blue-800 font-medium">
          Manage Reviews
        </Link>
      </div>

      <div className="divide-y divide-black/5">
        {MOCK_REVIEWS.map(review => (
          <div key={review.id} className="p-6 hover:bg-background transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-text-primary">{review.product}</h4>
              <span className="text-xs text-text-muted">{review.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                ))}
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                review.status === 'Published' ? 'bg-success-soft text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {review.status}
              </span>
              {review.verified && (
                <span className="text-xs text-success flex items-center gap-1 font-medium">
                  <FiCheckCircle size={12} /> Verified Buyer
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
