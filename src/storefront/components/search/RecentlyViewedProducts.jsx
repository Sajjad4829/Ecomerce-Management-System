import React from 'react';
import { FiClock, FiSearch } from 'react-icons/fi';
import { useSearch } from '../../../admin/context/SearchContext';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

export default function RecentlyViewedProducts() {
  const { recentlyViewed, searchProducts } = useSearch();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  // In a real app, this would fetch full product details based on IDs
  // For the mock, we'll just get the first few products
  const products = searchProducts('').items.slice(0, 4);

  return (
    <div className="py-16 border-t border-black/5 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-3">
          <FiClock className="text-gray-400" />
          Recently Viewed
        </h2>
        <Link to="/account/search-history" className="text-sm font-medium text-gray-500 hover:text-black underline transition-colors">
          View History
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
