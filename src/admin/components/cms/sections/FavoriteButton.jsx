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
          ? "bg-danger-soft text-danger border-red-100 hover:bg-danger-soft" 
          : "bg-surface text-text-muted border-black/10 hover:border-black/20 hover:text-text-primary hover:bg-background"
      )}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <FiHeart size={14} className={cn(isFavorite && "fill-current")} />
    </button>
  );
}
