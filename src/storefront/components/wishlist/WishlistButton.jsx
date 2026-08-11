import { FiHeart } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';

export default function WishlistButton({ product, variant = null, className = '' }) {
  const { isInWishlist, toggleWishlist } = useCommerce();
  
  const inWishlist = isInWishlist(product.id, variant?.id);

  return (
    <button 
      onClick={(e) => {
        e.preventDefault(); // In case it's inside a Link
        e.stopPropagation();
        toggleWishlist(product, variant);
      }}
      className={`p-3 rounded-full flex items-center justify-center transition-all ${
        inWishlist 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-white text-gray-400 hover:text-black hover:bg-gray-50 border border-black/5 shadow-sm'
      } ${className}`}
      title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <FiHeart size={18} className={inWishlist ? 'fill-current' : ''} />
    </button>
  );
}
