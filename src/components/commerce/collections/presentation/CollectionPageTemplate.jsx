import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CollectionPageTemplate({ collection }) {
  if (!collection) return null;

  const products = collection.resolvedProducts || [];

  return (
    <div className="bg-white min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[60vh] bg-stone-900 flex items-center justify-center overflow-hidden">
        {collection.bannerImage || collection.image ? (
          <img 
            src={collection.bannerImage || collection.image} 
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : null}
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <span className="text-amber-400 font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
            {collection.type === 'automatic' ? 'Curated Collection' : 'Featured Collection'}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            {collection.name}
          </h1>
          <p className="text-stone-300 text-lg md:text-xl font-light">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl font-serif text-stone-900">Discover the Collection</h2>
            <p className="text-stone-500 mt-2">{products.length} Products</p>
          </div>
          {/* Mock filters or sort dropdown could go here */}
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center border-t border-stone-200">
            <p className="text-stone-500 text-lg">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
                <div className="relative bg-stone-100 aspect-square overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-stone-900">
                      {product.badge}
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-white">
                      Sold Out
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">
                        {product.brand || product.category}
                      </span>
                      <h3 className="font-serif text-lg text-stone-900 mt-1">{product.name}</h3>
                    </div>
                    <span className="font-mono text-stone-900">${product.price?.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
