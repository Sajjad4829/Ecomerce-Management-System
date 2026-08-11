import { Link } from 'react-router-dom';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import WishlistItem from '../../components/wishlist/WishlistItem';

export default function WishlistPage() {
  const { wishlistItems } = useCommerce();

  return (
    <div className="bg-[#F7F5F2] min-h-screen py-16 md:py-24 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-2">Your Wishlist</h1>
            <p className="text-gray-500">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-gray-600 transition-colors bg-white px-6 py-3 border border-black/10 rounded-full shadow-sm hover:shadow-md">
            Explore Collection <FiArrowRight size={16} />
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-black/5">
            <div className="w-24 h-24 bg-[#F7F5F2] rounded-full flex items-center justify-center mx-auto mb-8">
              <FiHeart size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">No items saved yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Found something you love? Save it here by clicking the heart icon on any product.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white text-sm font-semibold rounded hover:bg-black transition-colors"
            >
              Start Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {wishlistItems.map(item => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
