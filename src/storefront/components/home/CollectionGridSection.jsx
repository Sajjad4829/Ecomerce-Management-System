import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function CollectionGridSection({ title, subtitle, linkTo, products }) {
  if (!products || products.length === 0) return null;

  // Limit to 5 products to match the requested layout style
  const displayProducts = products.slice(0, 5);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <h2 className="text-[22px] md:text-[28px] text-[#1c2b39] font-normal flex items-center tracking-tight">
            {title}
            {linkTo && (
              <Link to={linkTo} className="ml-3 text-gray-400 hover:text-gray-900 transition-colors">
                <FiArrowRight size={22} className="stroke-1" />
              </Link>
            )}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {displayProducts.map(product => (
            <Link key={product.id} to={`/product/${product.slug}`} className="group flex flex-col">
              <div className="w-full aspect-square bg-[#f8f8f8] overflow-hidden mb-3 relative">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-center text-[#334155] text-[14px] sm:text-[15px] font-normal group-hover:text-black transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
