import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../admin/context/SearchContext';
import ProductCard from '../../components/product/ProductCard';

export default function SimilarProducts({ productId }) {
  const { getSimilarProducts } = useSearch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productId) {
      setProducts(getSimilarProducts(productId));
    }
  }, [productId, getSimilarProducts]);

  if (!products || products.length === 0) return null;

  return (
    <div className="py-16 border-t border-black/5 mt-16">
      <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-8">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
