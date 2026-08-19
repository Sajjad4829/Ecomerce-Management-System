import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../../admin/context/commerce/ProductContext';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';
import { useReviews } from '../../../admin/context/ReviewContext';
import ProductBreadcrumb from '../../components/product/ProductBreadcrumb';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import ProductVariants from '../../components/product/ProductVariants';
import ProductActions from '../../components/product/ProductActions';
import ProductHighlights from '../../components/product/ProductHighlights';
import ProductDescription from '../../components/product/ProductDescription';
import ProductSpecifications from '../../components/product/ProductSpecifications';
import ProductDelivery from '../../components/product/ProductDelivery';
import ProductReviews from '../../components/product/ProductReviews';
import RelatedProducts from '../../components/product/RelatedProducts';
import { motion } from 'framer-motion';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { getProductBySlug } = useProducts();
  const { getCategoryById } = useCategories();
  const { getProductReviews } = useReviews();
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { activeTheme } = useStorefrontTheme();

  useEffect(() => {
    // Scroll to top when slug changes
    window.scrollTo(0, 0);
    setIsLoading(true);

    const foundProduct = getProductBySlug(slug);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setCategory(getCategoryById(foundProduct.categoryId));
      
      const reviews = getProductReviews(foundProduct.id) || [];
      const average = reviews.length > 0 
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : 0;
      setRatingData({ average: Number(average), count: reviews.length });

      // Initialize default variants
      const initialVariants = {};
      if (foundProduct.variants) {
        foundProduct.variants.forEach(vg => {
          if (vg.options && vg.options.length > 0) {
            initialVariants[vg.type] = vg.options[0];
          }
        });
      }
      setSelectedVariants(initialVariants);

      // Track recently viewed products in localStorage
      try {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        const updatedViewed = [foundProduct.id, ...viewed.filter(id => id !== foundProduct.id)].slice(0, 4);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
      } catch (e) {
        // Ignore localStorage errors
      }
    } else {
      setProduct(null);
    }
    
    setIsLoading(false);
  }, [slug, getProductBySlug, getCategoryById, getProductReviews]);

  const handleVariantChange = (type, option) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: option
    }));
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${activeTheme.tokens.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
           <div className="animate-pulse flex flex-col lg:flex-row gap-12 lg:gap-16">
             <div className="w-full lg:w-3/5 aspect-[4/5] bg-gray-100 rounded-xl"></div>
             <div className="w-full lg:w-2/5 flex flex-col gap-4">
               <div className="h-10 bg-gray-100 w-3/4 rounded"></div>
               <div className="h-6 bg-gray-100 w-1/4 rounded mb-8"></div>
               <div className="h-14 bg-gray-100 w-full rounded"></div>
               <div className="h-14 bg-gray-100 w-full rounded mt-4"></div>
             </div>
           </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center text-center px-4 ${activeTheme.tokens.background}`}>
        <h1 className={`text-4xl font-serif font-bold mb-4 ${activeTheme.tokens.text.primary}`}>Product Not Found</h1>
        <p className={`mb-8 max-w-md ${activeTheme.tokens.text.secondary}`}>We couldn't find the product you're looking for. It may have been removed or the link might be broken.</p>
        <Link to="/shop" className="px-8 py-3 bg-gray-900 text-white font-bold tracking-widest uppercase text-sm hover:bg-gray-800 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Determine active price based on variants
  let activePrice = product?.price || 0;
  let activeComparePrice = product?.compareAtPrice || null;

  if (product && selectedVariants && Object.keys(selectedVariants).length > 0) {
    Object.values(selectedVariants).forEach(option => {
      if (option && option.price) {
        activePrice = option.price;
        activeComparePrice = null; 
      } else if (option && option.priceModifier) {
        activePrice += option.priceModifier;
      }
    });
  }

  const galleryImages = product?.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product?.image];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${activeTheme.tokens.background} min-h-screen`}
    >
      <ProductBreadcrumb product={product} category={category} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Gallery */}
          <div className="w-full lg:w-3/5">
            <div className="sticky top-28">
              <ProductGallery images={galleryImages} selectedVariants={selectedVariants} />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <ProductInfo 
              product={product} 
              ratingData={ratingData} 
              selectedVariants={selectedVariants}
              activePrice={activePrice}
              activeComparePrice={activeComparePrice}
            />
            
            <ProductVariants 
              variants={product.variants} 
              selectedVariants={selectedVariants} 
              onVariantChange={handleVariantChange} 
            />
            
            <ProductActions 
              product={product} 
              selectedVariants={selectedVariants}
              activePrice={activePrice}
            />

            <div className="mt-12 flex flex-col">
              <ProductHighlights highlights={product.highlights} />
              <ProductDescription description={product.description} />
              <ProductDelivery product={product} />
              <ProductSpecifications specifications={product.specifications} />
            </div>
          </div>

        </div>
        
        {/* Full Width Reviews Section below Main content */}
        <ProductReviews product={product} />
        
      </main>

      <RelatedProducts currentProduct={product} />

    </motion.div>
  );
}
