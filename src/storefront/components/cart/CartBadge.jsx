import { useCommerce } from '../../context/CommerceContext';

export default function CartBadge() {
  const { cartTotalItems } = useCommerce();
  
  if (cartTotalItems === 0) return null;

  return (
    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
      {cartTotalItems}
    </span>
  );
}
