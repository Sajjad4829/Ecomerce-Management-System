import { FiTrash2, FiHeart } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import QuantitySelector from './QuantitySelector';
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, saveForLater } = useCommerce();
  const { product, variant, quantity, unitPrice } = item;

  // Placeholder image if not provided
  const imageUrl = variant?.image || product?.images?.[0] || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';

  return (
    <div className="flex gap-4 py-6 border-b border-black/5 last:border-0 relative group">
      {/* Product Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product?.name || 'Product Image'} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <Link to={`/products/${product?.id || 'sample'}`} className="text-base font-bold text-[#1A1A1A] hover:underline hover:underline-offset-2">
              {product?.name || 'Premium Product'}
            </Link>
            {variant && (
              <p className="text-sm text-gray-500 mt-1">
                {variant.title || 'Standard Variant'}
              </p>
            )}
            
            {/* Availability Badge Placeholder */}
            <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {item.availability || 'In Stock'}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-base font-bold text-[#1A1A1A]">
              ${(unitPrice * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-gray-500 mt-1">
                ${unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} each
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <QuantitySelector 
            quantity={quantity} 
            onChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => saveForLater(item)}
              className="p-2 text-gray-400 hover:text-black transition-colors"
              title="Save for later"
            >
              <FiHeart size={18} />
            </button>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Remove from cart"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
