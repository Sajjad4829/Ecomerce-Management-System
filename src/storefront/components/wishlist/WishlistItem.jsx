import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import { Link } from 'react-router-dom';

export default function WishlistItem({ item }) {
  const { removeFromWishlist, moveToCart } = useCommerce();
  const { product, variant, addedAt } = item;

  const imageUrl = variant?.image || product?.images?.[0] || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';
  const price = variant ? variant.price : product?.price || 0;

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="w-full sm:w-40 h-48 sm:h-40 shrink-0 bg-gray-100 rounded-xl overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div>
              <Link to={`/product/${product.slug}`} className="text-lg font-bold text-[#1A1A1A] hover:underline hover:underline-offset-2">
                {product.name}
              </Link>
              {variant && (
                <p className="text-sm text-gray-500 mt-1">
                  {variant.title}
                </p>
              )}
            </div>
            <p className="text-lg font-bold text-[#1A1A1A]">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Added on {new Date(addedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5">
          <button 
            onClick={() => removeFromWishlist(item.id)}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2"
          >
            <FiTrash2 size={16} /> Remove
          </button>

          <button 
            onClick={() => moveToCart(item)}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-semibold rounded hover:bg-black transition-colors flex items-center gap-2"
          >
            <FiShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
