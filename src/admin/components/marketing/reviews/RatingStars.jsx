import { FiStar } from 'react-icons/fi';

export default function RatingStars({ rating, size = 16, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={size}
          className={`${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : star - rating <= 0.5 && star - rating > 0
              ? 'fill-amber-400 text-amber-400 opacity-50' // Half star approximation
              : 'fill-transparent text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
