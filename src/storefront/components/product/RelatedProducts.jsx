import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../../admin/context/commerce/ProductContext';

export default function RelatedProducts({ currentProduct }) {
  const { products } = useProducts();

  const relatedProducts = useMemo(() => {
    if (!currentProduct || !products) return [];

    let related = products.filter(p => p.id !== currentProduct.id && p.status === 'published');

    // Priority 1: Same category (Subcategory)
    let recommendations = related.filter(p => p.categoryId === currentProduct.categoryId);

    // Priority 2: If we don't have enough, fill with products from same parent category
    if (recommendations.length < 4) {
      // Find parent category ID of current product (we assume categoryId structure or we can just fetch all and match roughly)
      // Since we don't have access to CategoryContext here without adding it, we can just do a broad fallback.
      // But let's check if they share a common prefix in categoryId (like cat-1-1 and cat-1-2)
      const parentPrefix = currentProduct.categoryId.split('-').slice(0, 2).join('-');
      
      const sameParent = related.filter(p => 
        p.categoryId !== currentProduct.categoryId && 
        p.categoryId.startsWith(parentPrefix)
      );
      
      recommendations = [...recommendations, ...sameParent];
    }

    // Priority 3: Fill with any other products
    if (recommendations.length < 4) {
      const others = related.filter(p => !recommendations.some(r => r.id === p.id));
      recommendations = [...recommendations, ...others];
    }

    return recommendations.slice(0, 4);
  }, [currentProduct, products]);

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-gray-100 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mb-8 sm:mb-12 text-center">
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
