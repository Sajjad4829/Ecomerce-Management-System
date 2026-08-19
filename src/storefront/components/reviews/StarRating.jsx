import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function StarRating({ rating, className = "" }) {
  return (
    <div className={`flex text-yellow-400 ${className}`}>
      {[1, 2, 3, 4, 5].map(star => {
        // Handle half stars if needed (simple approximation)
        const isFull = rating >= star;
        const isHalf = !isFull && rating >= star - 0.5;
        
        return (
          <span key={star} className="relative inline-block">
             <FiStar className="text-gray-200" />
             {(isFull || isHalf) && (
               <FiStar 
                 className={`absolute top-0 left-0 fill-current overflow-hidden`} 
                 style={{ width: isFull ? '100%' : '50%' }}
               />
             )}
          </span>
        );
      })}
    </div>
  );
}
