import { formatCurrency } from '../../utils/formatCurrency';
import { FiTrash2 } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { removeFromCart } = useCommerce();
  const { product, selectedVariants, variantImage, quantity, unitPrice } = item;

  const imageUrl = variantImage || product?.gallery?.[0] || product?.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0 relative items-start">
      {/* Product Image */}
      <div className="w-20 h-20 shrink-0 bg-gray-100 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product?.name || 'Product Image'} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 pr-10 relative">
        <Link to={`/product/${product?.slug || product?.id}`} className="text-[14px] font-bold text-[#1A1A1A] hover:text-[#ED1C24] transition-colors leading-snug">
          {product?.name || 'Premium Product'}
        </Link>
        
        <p className="text-[14px] text-gray-700 mt-2">
          {formatCurrency(unitPrice)} x {quantity}
        </p>

        {/* Delete button positioned top right */}
        <button 
          onClick={() => removeFromCart(item.id)}
          className="absolute top-0 -right-2 p-2 bg-gray-50 hover:bg-gray-100 text-[#ED1C24] transition-colors"
          title="Remove from cart"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
