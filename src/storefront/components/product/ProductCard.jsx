import { useCommerce } from '../../context/CommerceContext';
import WishlistButton from '../wishlist/WishlistButton';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useReviews } from '../../../admin/context/ReviewContext';
import { FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCommerce();
  const { getProductRating } = useReviews();
  const price = product.price;
  const ratingData = getProductRating(product.id);

  return (
    <div className="group relative">
      <div className="relative w-full h-80 bg-gray-100 rounded-2xl overflow-hidden mb-4">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute top-4 right-4 z-10">
          <WishlistButton product={product} />
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => addToCart(product, null, 1)}
            className="w-full py-3 bg-white/90 backdrop-blur text-[#1A1A1A] text-sm font-semibold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <FiShoppingCart size={16} /> Quick Add
          </button>
        </div>
      </div>

      <div className="px-1">
        <div className="flex justify-between items-start">
          <Link to={`/products/${product.id}`} className="block flex-1 pr-2">
            <h3 className="text-base font-bold text-[#1A1A1A] group-hover:underline">{product.name}</h3>
          </Link>
          {ratingData.count > 0 && (
            <div className="flex items-center gap-1 text-sm shrink-0">
              <FiStar className="fill-yellow-400 text-yellow-400" size={14} />
              <span className="font-semibold text-[#1A1A1A]">{ratingData.average}</span>
              <span className="text-gray-400">({ratingData.count})</span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{product.category || 'Furniture'}</p>
        <p className="text-base font-medium text-[#1A1A1A] mt-2">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}
