import { useCommerce } from '../../context/CommerceContext';
import WishlistButton from '../wishlist/WishlistButton';
import { FiShoppingCart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useReviews } from '../../../admin/context/ReviewContext';
import { FiStar } from 'react-icons/fi';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCommerce();
  const { getProductRating } = useReviews();
  const { activeTheme } = useStorefrontTheme();
  const navigate = useNavigate();
  const price = product.price;
  const ratingData = getProductRating(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) {
      navigate(`/product/${product.slug}`);
    } else {
      addToCart(product, null, 1);
    }
  };

  return (
    <div className={`group relative flex flex-col h-full ${activeTheme.tokens.productCard.surface} ${activeTheme.tokens.productCard.radius} ${activeTheme.tokens.productCard.shadow} transition-all duration-300`}>
      <div className={`relative w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 ${activeTheme.tokens.productCard.radius}`}>
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400'} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        
        <div className="absolute top-4 right-4 z-10">
          <WishlistButton product={product} />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.badge && (
            <span className="bg-black text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
              {product.badge}
            </span>
          )}
          {product.compareAtPrice > product.price && !product.badge && (
            <span className="bg-[#B91C1C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
              SALE
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleQuickAdd}
            className={`w-full py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTheme.tokens.productCard.button}`}
          >
            <FiShoppingCart size={16} /> <span className="hidden sm:inline">Quick Add</span>
          </button>
        </div>
      </div>

      <div className="px-1 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/product/${product.slug}`} className="block flex-1">
            <h3 className={`text-sm sm:text-base font-bold group-hover:underline line-clamp-2 ${activeTheme.tokens.text.primary}`}>{product.name}</h3>
          </Link>
          {ratingData.count > 0 && (
            <div className="flex items-center gap-1 text-sm shrink-0">
              <FiStar className="fill-yellow-400 text-yellow-400" size={14} />
              <span className={`font-semibold ${activeTheme.tokens.text.primary}`}>{ratingData.average}</span>
              <span className={activeTheme.tokens.text.secondary}>({ratingData.count})</span>
            </div>
          )}
        </div>
        <p className={`text-sm mt-1 ${activeTheme.tokens.text.secondary}`}>{product.category || 'Furniture'}</p>
        <div className="flex items-center gap-2 mt-2">
          {product.compareAtPrice > product.price ? (
            <>
              <p className={`text-sm line-through ${activeTheme.tokens.text.muted}`}>
                ${product.compareAtPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-base font-medium text-[#B91C1C]">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </>
          ) : (
            <p className={`text-base font-medium ${activeTheme.tokens.text.primary}`}>
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
