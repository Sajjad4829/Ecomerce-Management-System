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

import RelatedProducts from '../../components/product/RelatedProducts';
import ProductAccordions from '../../components/product/ProductAccordions';

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
  const { activeTheme, productPageLayout: _ignored, productGalleryLayout = 'vertical' } = useStorefrontTheme();
  const productPageLayout = 'left'; // User explicitly requested this layout to ALWAYS be the 1st option (Image Left)

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

  let galleryImages = product?.images && product.images.length > 0
    ? product.images.map(img => img.url)
    : (product?.gallery && product.gallery.length > 0 ? [...product.gallery] : (product?.image ? [product.image] : []));

  if (product && product.attributes) {
    Object.values(product.attributes).forEach(optionsArray => {
      if (Array.isArray(optionsArray)) {
        optionsArray.forEach(option => {
          const variantImages = option?.images || (option?.image ? [option.image] : []);
          variantImages.forEach(img => {
            if (img && !galleryImages.includes(img)) {
              galleryImages = [...galleryImages, img];
            }
          });
        });
      }
    });
  }

  const attributeGroups = product?.attributes && Object.keys(product.attributes).length > 0
    ? Object.keys(product.attributes).map(type => ({
        type,
        options: product.attributes[type].map(opt => typeof opt === 'string' ? { id: opt, label: opt } : opt)
      }))
    : [];

  const renderGallery = () => (
    <div className={`w-full ${productPageLayout === 'full' || productPageLayout === 'top' || productPageLayout === 'bottom' ? 'lg:w-full max-w-4xl mx-auto' : 'lg:w-[60%]'}`}>
      <div className="sticky top-28">
        <ProductGallery 
          images={galleryImages} 
          selectedVariants={selectedVariants} 
          note={product?.furnitureDetails?.note} 
          layout={productGalleryLayout}
        />
      </div>
    </div>
  );

  const renderInfo = () => (
    <div className={`w-full flex flex-col pt-2 ${productPageLayout === 'full' || productPageLayout === 'top' || productPageLayout === 'bottom' ? 'lg:w-full max-w-4xl mx-auto' : 'lg:w-[40%] bg-[#FAFAFA] p-6 lg:p-8 rounded-xl'}`}>
      <ProductInfo 
        product={product} 
        ratingData={ratingData} 
        selectedVariants={selectedVariants}
        activePrice={activePrice}
        activeComparePrice={activeComparePrice}
        hideTitleOnMobile={true}
        hideDescription={productPageLayout === 'left' || productPageLayout === 'right'}
      />
      
      <ProductVariants 
        variants={attributeGroups} 
        selectedVariants={selectedVariants} 
        onVariantChange={handleVariantChange} 
      />
      
      <ProductActions 
        product={product} 
        selectedVariants={selectedVariants}
        activePrice={activePrice}
      />
    </div>
  );

  return (
    <div className={`${activeTheme.tokens.background} min-h-screen`}>
      <ProductBreadcrumb product={product} category={category} />

      <main className="w-full max-w-[1600px] mx-auto pb-8 pt-0 sm:pb-12 sm:pt-0 px-4 lg:px-8">
        {/* MOBILE-ONLY TITLE & PRICE */}
        <div className="block md:hidden w-full mb-4 mt-2">
          <ProductInfo 
            product={product} 
            ratingData={ratingData} 
            selectedVariants={selectedVariants}
            activePrice={activePrice}
            activeComparePrice={activeComparePrice}
            hideDescription={true}
          />
        </div>

        <div className={`flex flex-col ${productPageLayout === 'right' ? 'md:flex-row-reverse' : (productPageLayout === 'top' || productPageLayout === 'full' || productPageLayout === 'bottom' ? 'flex-col' : 'md:flex-row')} gap-8 lg:gap-12 w-full`}>
          
          {productPageLayout === 'bottom' ? (
            <>
              {renderInfo()}
              {renderGallery()}
            </>
          ) : (
            <>
              {renderGallery()}
              {renderInfo()}
            </>
          )}

        </div>
        
        {/* Full Width Accordions */}
        <ProductAccordions product={product} />
        

        
      </main>

      <RelatedProducts currentProduct={product} />

    </div>
  );
}
