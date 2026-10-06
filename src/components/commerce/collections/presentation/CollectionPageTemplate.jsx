import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CollectionPageTemplate({ collection }) {
  if (!collection) return null;

  const products = collection.resolvedProducts || [];

  return (
    <div className="bg-white py-12 w-full">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 px-4">
          <svg className="w-12 h-6 text-stone-700" fill="none" viewBox="0 0 36 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12h32m0 0l-6-6m6 6l-6 6" />
          </svg>
          <div className="flex items-baseline gap-3">
            <h2 className="text-[24px] font-medium text-[#1c2b39] tracking-tight">{collection.name}</h2>
            <span className="text-[20px] text-gray-400/80 font-normal">What's Trending</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border-t border-stone-100">
            <p className="text-stone-500">No products found in this collection.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-2 md:grid-cols-3 ${
            products.length === 1 ? 'lg:grid-cols-1' :
            products.length === 2 ? 'lg:grid-cols-2' :
            products.length === 3 ? 'lg:grid-cols-3' :
            products.length === 4 ? 'lg:grid-cols-4' :
            'lg:grid-cols-5'
          } gap-4 px-4`}>
            {products.map(product => (
              <Link to={`/product/${product.slug}`} key={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative bg-stone-100 aspect-square overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase text-stone-900">
                      {product.badge}
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-stone-900/90 px-2 py-1 text-[10px] font-bold uppercase text-white">
                      Sold Out
                    </div>
                  )}
                </div>
                <div className="text-center px-2">
                  <h3 className="text-[15px] text-stone-700 font-medium">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
