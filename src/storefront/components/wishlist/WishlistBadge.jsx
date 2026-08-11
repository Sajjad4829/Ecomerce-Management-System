import { useCommerce } from '../../context/CommerceContext';

export default function WishlistBadge() {
  const { wishlistTotalItems } = useCommerce();
  
  if (wishlistTotalItems === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
      {wishlistTotalItems}
    </span>
  );
}
