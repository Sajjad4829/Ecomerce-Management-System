import { FiStar, FiImage, FiCheckCircle } from 'react-icons/fi';
import RatingBreakdown from './RatingBreakdown';

export default function ProductReviewSummary({ 
  averageRating = 4.8, 
  totalReviews = 124,
  distribution = { 5: 85, 4: 25, 3: 8, 2: 4, 1: 2 },
  verifiedPercentage = 92,
  mediaCount = 45 
}) {
  return (
    <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Top Level Summary */}
        <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-black/5 pb-6 md:pb-0 md:pr-8 shrink-0 text-center md:text-left">
          <div className="text-5xl font-serif font-bold text-text-primary mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={20}
                className={star <= Math.round(averageRating) ? 'fill-current' : 'fill-transparent text-gray-300'}
              />
            ))}
          </div>
          <p className="text-sm text-text-muted font-medium mb-4">Based on {totalReviews} reviews</p>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-text-secondary justify-center md:justify-start">
              <FiCheckCircle className="text-success" />
              <span className="font-bold text-text-primary">{verifiedPercentage}%</span> Verified Buyers
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary justify-center md:justify-start">
              <FiImage className="text-primary" />
              <span className="font-bold text-text-primary">{mediaCount}</span> Review Photos
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1">
          <div className="space-y-3">
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
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
