import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductRatingSummary from '../../components/reviews/ProductRatingSummary';
import ReviewList from '../../components/reviews/ReviewList';
import RelatedProducts from '../../components/discovery/RelatedProducts';
import SimilarProducts from '../../components/discovery/SimilarProducts';

import {
  ProductGallery,
  ProductInfo,
  ProductVariantSelector,
  ProductActions,
  ProductDetailsAccordion
} from '../../../components/commerce/products/presentation';

export default function ProductDetailPage() {
  const { id } = useParams();
  
  // Mock unified product data structure
  const product = {
    status: 'published',
    basicInfo: {
      name: 'The Sovereign Curved Sofa',
      sku: 'AUR-SOF-001',
      brand: 'AURA',
      shortDescription: 'A masterclass in modern seating, featuring a sweeping curved silhouette and premium upholstery designed for both striking aesthetic impact and enveloping comfort.',
      description: 'The Sovereign Curved Sofa challenges the conventional with its organic, sweeping lines and sculptural presence. Inspired by natural forms, this masterwork anchors any room with a feeling of fluidity and grace. Every curve is meticulously engineered to provide ergonomic support, ensuring that this piece is as exceptionally comfortable as it is visually arresting.'
    },
    organization: {
      mainCategory: 'Living Room',
      subCategory: 'Sofas & Sectionals',
      childCategory: 'Curved Sofas',
      collection: 'The Sanctuary',
      tags: ['curved', 'luxury', 'boucle']
    },
    media: {
      primaryImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&q=80&w=800'
      ],
      view360: {
        enabled: true,
        autoRotate: true,
        speed: 50,
        frames: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&q=80&w=800'
        ]
      }
    },
    variants: [
      { id: 'v1', name: 'Alabaster Bouclé', sku: 'AUR-SOF-001-ALB', price: 12850, stock: 3, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', color: 'White' },
      { id: 'v2', name: 'Charcoal Velvet', sku: 'AUR-SOF-001-CHA', price: 13200, stock: 2, image: 'https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&q=80&w=800', color: 'DarkGray' }
    ],
    pricing: {
      regularPrice: 14000,
      salePrice: 12850,
      cost: 6000,
      currency: 'USD'
    },
    inventory: {
      totalStock: 5,
      status: 'In Stock'
    },
    furnitureDetails: {
      dimensions: {
        'Overall': '96"W x 42"D x 30"H',
        'Seat Height': '18"',
        'Seat Depth': '26"',
        'Weight': '185 lbs'
      },
      materials: {
        frameMaterial: 'Kiln-dried hardwood',
        upholstery: 'Premium Italian Bouclé'
      },
      care: {
        furniture: 'Keep away from direct sunlight.',
        upholstery: 'Vacuum regularly with a soft brush attachment. For spills, blot immediately.'
      },
      warranty: {
        duration: '10-Year Limited Warranty',
        description: 'Covers the frame and spring system.'
      },
      returns: {
        exchange: 'Custom or made-to-order items are non-returnable.',
        returnPolicy: 'White Glove Delivery included on orders over $5,000.'
      },
      story: 'Meticulously crafted by master artisans over 40 hours.'
    },
    seo: {
      slug: 'sovereign-curved-sofa',
      metaTitle: 'The Sovereign Curved Sofa | Aurelia Furniture',
      metaDescription: 'Discover the Sovereign Curved Sofa. Premium bespoke seating.'
    }
  };

  const [activeVariant, setActiveVariant] = useState(product.variants[0]);

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-24">
      <header className="px-8 py-6 bg-white border-b border-black/5 sticky top-0 z-10 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-stone-900">
          AURA
        </Link>
        <Link to="/products" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
          <FiArrowLeft /> Back to Catalog
        </Link>
      </header>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col xl:flex-row gap-12 mb-24">
          <div className="xl:w-[55%]">
             <ProductGallery product={product} activeVariant={activeVariant} />
          </div>
          <div className="xl:w-[45%] flex flex-col space-y-8 py-4">
             <ProductInfo product={product} activeVariant={activeVariant} />
             <ProductVariantSelector product={product} activeVariant={activeVariant} onVariantChange={setActiveVariant} />
             <ProductActions product={product} activeVariant={activeVariant} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex justify-center mb-24">
           <ProductDetailsAccordion product={product} />
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
             <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Customer Reviews</h2>
          </div>
          
          <ProductRatingSummary productId={id} />
          
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 md:p-8">
             <ReviewList productId={id} />
          </div>
        </div>

        {/* Discovery Sections */}
        <div className="mt-24 space-y-24">
          <SimilarProducts productId={id} />
          <RelatedProducts productId={id} />
        </div>
      </div>
    </div>
  );
}
