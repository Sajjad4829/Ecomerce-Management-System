import { FiHeart } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className={cn(
        "p-2 rounded-full transition-all border",
        isFavorite 
          ? "bg-red-50 text-red-500 border-red-100 hover:bg-red-100" 
          : "bg-white text-gray-400 border-black/10 hover:border-black/20 hover:text-[#1A1A1A] hover:bg-gray-50"
      )}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <FiHeart size={14} className={cn(isFavorite && "fill-current")} />
    </button>
  );
}
