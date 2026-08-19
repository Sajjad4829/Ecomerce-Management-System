import { FiStar } from 'react-icons/fi';

export default function RatingBreakdown({ distribution, totalReviews, averageRating }) {
  // distribution = { 5: 120, 4: 45, 3: 12, 2: 4, 1: 8 }
  
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center bg-surface p-6 border border-black/5 rounded-xl shadow-sm">
      <div className="text-center md:text-left flex flex-col items-center md:items-start shrink-0">
        <h3 className="text-sm font-bold text-text-primary mb-2">Customer Reviews</h3>
        <div className="text-5xl font-serif font-bold text-text-primary mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex items-center gap-1 mb-2 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={18}
              className={star <= Math.round(averageRating) ? 'fill-current' : 'fill-transparent text-gray-300'}
            />
          ))}
        </div>
        <p className="text-xs text-text-muted font-medium">Based on {totalReviews} reviews</p>
      </div>

      <div className="flex-1 w-full space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = distribution[stars] || 0;
          const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
          
          return (
            <div key={stars} className="flex items-center gap-3 text-sm">
              <span className="w-12 font-medium text-text-secondary flex items-center justify-end gap-1 shrink-0">
                {stars} <FiStar size={12} className="fill-current text-text-muted" />
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-right font-medium text-text-primary shrink-0">{percentage}%</span>
              <span className="w-12 text-right text-xs text-text-muted shrink-0">({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
