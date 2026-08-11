import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiImage, FiDollarSign, 
  FiBox, FiTag, FiSearch, FiMessageCircle,
  FiMonitor, FiTablet, FiSmartphone, FiAlertCircle,
  FiStar, FiMaximize2, FiMinimize2, FiCheckCircle
} from 'react-icons/fi';
import ProductStatusBadge from '../../../components/commerce/products/ProductStatusBadge';
import VariantManager from '../../../components/commerce/products/variants/VariantManager';

import {
  ProductGallery,
  ProductInfo,
  ProductVariantSelector,
  ProductActions,
  ProductDetailsAccordion,
  ProductCard
} from '../../../../components/commerce/products/presentation';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FiInfo },
  { id: 'media', label: 'Media & 360°', icon: FiImage },
  { id: 'variants', label: 'Variants', icon: FiBox },
  { id: 'pricing', label: 'Pricing', icon: FiDollarSign },
  { id: 'details', label: 'Furniture Details', icon: FiBox },
  { id: 'organization', label: 'Organization', icon: FiTag },
  { id: 'reviews', label: 'Reviews', icon: FiStar },
  { id: 'seo', label: 'SEO', icon: FiSearch }
];

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [previewLayout, setPreviewLayout] = useState('page'); // page, card
  const [isFullPreview, setIsFullPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [formData, setFormData] = useState({
    status: 'draft',
    basicInfo: {
      name: '',
      badge: '',
      sku: '',
      brand: 'AURA',
      shortDescription: '',
      description: ''
    },
    organization: {
      mainCategory: '',
      subCategory: '',
      childCategory: '',
      collection: '',
      tags: []
    },
    media: {
      primaryImage: '',
      gallery: [],
      view360: {
        enabled: false,
        frames: [],
        autoRotate: true,
        speed: 100
      }
    },
    variants: [],
    pricing: {
      regularPrice: 0,
      salePrice: 0,
      emi: 0,
      cost: 0,
      currency: 'USD'
    },
    inventory: {
      totalStock: 0,
      status: 'Out of Stock'
    },
    furnitureDetails: {
      dimensions: {
        width: '',
        height: '',
        depth: '',
        seatHeight: '',
        weight: ''
      },
      materials: {
        frameMaterial: '',
        woodType: '',
        woodFinish: '',
        upholsteryMaterial: '',
        fabric: '',
        leather: '',
        color: ''
      },
      specifications: {
        assemblyRequired: 'No',
        roomType: '',
        seatingCapacity: ''
      },
      care: { furniture: '', upholstery: '' },
      warranty: { duration: '', description: '', returnPolicy: '' },
      story: ''
    },
    seo: {
      slug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
      openGraphImage: ''
    },
    reviews: {
      averageRating: 0,
      reviewCount: 0,
      published: [],
      pending: []
    }
  });

  const [activePreviewVariant, setActivePreviewVariant] = useState(null);

  useEffect(() => {
    if (!isNew) {
      // Mock fetch based on unified state
      const initialData = {
        status: 'published',
        basicInfo: {
          name: 'The Sovereign Curved Sofa',
          badge: 'NEW ARRIVAL',
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
          emi: 50,
          cost: 6000,
          currency: 'USD'
        },
        inventory: {
          totalStock: 5,
          status: 'In Stock'
        },
        furnitureDetails: {
          dimensions: {
            width: '96"',
            height: '30"',
            depth: '42"',
            seatHeight: '18"',
            weight: '185 lbs'
          },
          materials: {
            frameMaterial: 'Kiln-dried hardwood',
            woodType: 'Ash',
            woodFinish: 'Natural',
            upholsteryMaterial: 'Bouclé',
            fabric: 'Premium Italian Bouclé',
            leather: '',
            color: 'Alabaster'
          },
          specifications: {
            assemblyRequired: 'No',
            roomType: 'Living Room',
            seatingCapacity: '3'
          },
          care: {
            furniture: 'Keep away from direct sunlight.',
            upholstery: 'Vacuum regularly with a soft brush attachment. For spills, blot immediately.'
          },
          warranty: {
            duration: '10-Year Limited Warranty',
            description: 'Covers the frame and spring system.',
            returnPolicy: 'Custom or made-to-order items are non-returnable. White Glove Delivery included.'
          },
          story: 'Meticulously crafted by master artisans over 40 hours.'
        },
        seo: {
          slug: 'sovereign-curved-sofa',
          metaTitle: 'The Sovereign Curved Sofa | Aurelia Furniture',
          metaDescription: 'Discover the Sovereign Curved Sofa. Premium bespoke seating.',
          metaKeywords: 'curved sofa, luxury sofa, boucle, modern seating',
          canonicalUrl: 'https://aurelia.com/products/sovereign-curved-sofa',
          openGraphImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'
        },
        reviews: {
          averageRating: 4.8,
          reviewCount: 12,
          published: [
            { id: 1, rating: 5, author: 'Jane D.', text: 'Absolutely stunning and comfortable.', date: '2023-10-12' },
            { id: 2, rating: 4, author: 'Michael R.', text: 'Beautiful piece, but delivery took longer than expected.', date: '2023-09-28' }
          ],
          pending: []
        }
      };
      setFormData(initialData);
      if (initialData.variants.length > 0) setActivePreviewVariant(initialData.variants[0]);
    }
  }, [id, isNew]);

  const handleChange = (section, field, value) => {
    setFormData(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [field]: value
        };
      }
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 800);
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': default: return 'w-full';
    }
  };

  // Convert old VariantManager data structure to match our new unified state
  // VariantManager expects a flat productData structure for its own internals but we can pass variants directly.
  // Wait, VariantManager currently reads `productData.variants` and expects `setProductData` to accept a callback.
  // We'll wrap it to map properly.
  const updateVariants = (updateFn) => {
    setFormData(prev => {
      // Create a mock flat structure for VariantManager
      const mockFlat = { variants: prev.variants };
      const nextFlat = updateFn(mockFlat);
      setHasUnsavedChanges(true);
      return { ...prev, variants: nextFlat.variants };
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#F7F5F2]">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/products')}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-50"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-xl text-stone-900">
                {isNew ? 'Create New Product' : formData.basicInfo.name || 'Untitled'}
              </h1>
              {!isNew && <ProductStatusBadge status={formData.status} />}
              {hasUnsavedChanges && (
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  <FiAlertCircle /> Unsaved Changes
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-mono mt-1">
              {isNew ? 'Unsaved Draft' : `SKU: ${formData.basicInfo.sku}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullPreview(!isFullPreview)}
            className="flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-semibold border border-stone-200 rounded-lg hover:bg-stone-50"
          >
            {isFullPreview ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
            {isFullPreview ? 'Close Preview' : 'Open Full Preview'}
          </button>
          
          <div className="w-px h-6 bg-stone-200 mx-1"></div>

          <select 
            value={formData.status}
            onChange={(e) => handleChange(null, 'status', e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
              isSaving || !hasUnsavedChanges 
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed' 
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-stone-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSave size={16} />
            )}
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Publish
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Product Editor Form */}
        {!isFullPreview && (
          <div className="w-1/2 flex flex-col border-r border-stone-200 bg-white z-10 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Editor Tabs */}
          <div className="flex overflow-x-auto border-b border-stone-200 shrink-0 px-2 no-scrollbar">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                    isActive 
                      ? 'border-stone-900 text-stone-900' 
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-stone-900' : 'text-stone-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <main className="flex-1 overflow-y-auto p-6 bg-[#FDFDFC]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Product Name</label>
                        <input 
                          type="text" 
                          value={formData.basicInfo.name}
                          onChange={(e) => handleChange('basicInfo', 'name', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Product Badge</label>
                          <input 
                            type="text" 
                            value={formData.basicInfo.badge || ''}
                            onChange={(e) => handleChange('basicInfo', 'badge', e.target.value)}
                            placeholder="e.g. NEW ARRIVAL"
                            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">SKU</label>
                          <input 
                            type="text" 
                            value={formData.basicInfo.sku}
                            onChange={(e) => handleChange('basicInfo', 'sku', e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-stone-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Short Description</label>
                        <textarea 
                          rows={2}
                          value={formData.basicInfo.shortDescription}
                          onChange={(e) => handleChange('basicInfo', 'shortDescription', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Full Description</label>
                        <textarea 
                          rows={6}
                          value={formData.basicInfo.description}
                          onChange={(e) => handleChange('basicInfo', 'description', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 leading-relaxed resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Regular Price ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input 
                            type="number" 
                            value={formData.pricing.regularPrice}
                            onChange={(e) => handleChange('pricing', 'regularPrice', Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Sale Price ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input 
                            type="number" 
                            value={formData.pricing.salePrice || ''}
                            onChange={(e) => handleChange('pricing', 'salePrice', Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">EMI ($)</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input 
                          type="number" 
                          value={formData.pricing.emi || ''}
                          onChange={(e) => handleChange('pricing', 'emi', Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Primary Image URL</label>
                      <input 
                        type="text" 
                        value={formData.media.primaryImage}
                        onChange={(e) => handleChange('media', 'primaryImage', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Gallery Images (1 URL per line)</label>
                      <textarea 
                        rows={3}
                        value={formData.media.gallery.join('\n')}
                        onChange={(e) => handleChange('media', 'gallery', e.target.value.split('\n').filter(Boolean))}
                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 whitespace-pre-wrap"
                      />
                    </div>

                    <div className="pt-6 border-t border-stone-200">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase">360° Viewer Settings</label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={formData.media.view360.enabled}
                            onChange={(e) => {
                              const new360 = { ...formData.media.view360, enabled: e.target.checked };
                              handleChange('media', 'view360', new360);
                            }}
                            className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900" 
                          />
                          <span className="text-sm font-medium text-stone-900">Enable 360° Viewer</span>
                        </label>
                      </div>

                      {formData.media.view360.enabled && (
                        <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">360° Frames (1 URL per line)</label>
                            <textarea 
                              rows={4}
                              value={formData.media.view360.frames.join('\n')}
                              onChange={(e) => {
                                const new360 = { ...formData.media.view360, frames: e.target.value.split('\n').filter(Boolean) };
                                handleChange('media', 'view360', new360);
                              }}
                              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 whitespace-pre-wrap"
                              placeholder="Add sequence of images for 360 rotation..."
                            />
                            <p className="text-xs text-stone-400 mt-2">Currently: {formData.media.view360.frames.length} frames</p>
                          </div>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={formData.media.view360.autoRotate}
                                onChange={(e) => {
                                  const new360 = { ...formData.media.view360, autoRotate: e.target.checked };
                                  handleChange('media', 'view360', new360);
                                }}
                                className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900" 
                              />
                              <span className="text-sm font-medium text-stone-700">Auto Rotate</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'variants' && (
                  <VariantManager productData={{ variants: formData.variants }} setProductData={updateVariants} />
                )}

                {activeTab === 'details' && (
                  <div className="space-y-8">
                     <div>
                       <h3 className="text-sm font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">Dimensions</h3>
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Width</label>
                            <input type="text" value={formData.furnitureDetails.dimensions.width} onChange={(e) => {
                              const newDims = { ...formData.furnitureDetails.dimensions, width: e.target.value };
                              handleChange('furnitureDetails', 'dimensions', newDims);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Height</label>
                            <input type="text" value={formData.furnitureDetails.dimensions.height} onChange={(e) => {
                              const newDims = { ...formData.furnitureDetails.dimensions, height: e.target.value };
                              handleChange('furnitureDetails', 'dimensions', newDims);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Depth</label>
                            <input type="text" value={formData.furnitureDetails.dimensions.depth} onChange={(e) => {
                              const newDims = { ...formData.furnitureDetails.dimensions, depth: e.target.value };
                              handleChange('furnitureDetails', 'dimensions', newDims);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Weight</label>
                            <input type="text" value={formData.furnitureDetails.dimensions.weight} onChange={(e) => {
                              const newDims = { ...formData.furnitureDetails.dimensions, weight: e.target.value };
                              handleChange('furnitureDetails', 'dimensions', newDims);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                       </div>
                     </div>
                     <div>
                       <h3 className="text-sm font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">Materials & Care</h3>
                       <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Frame Material</label>
                            <input type="text" value={formData.furnitureDetails.materials.frameMaterial} onChange={(e) => {
                              const newMats = { ...formData.furnitureDetails.materials, frameMaterial: e.target.value };
                              handleChange('furnitureDetails', 'materials', newMats);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Upholstery / Fabric</label>
                            <input type="text" value={formData.furnitureDetails.materials.fabric} onChange={(e) => {
                              const newMats = { ...formData.furnitureDetails.materials, fabric: e.target.value };
                              handleChange('furnitureDetails', 'materials', newMats);
                            }} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                       </div>
                       <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Care Instructions</label>
                            <textarea rows={3} value={formData.furnitureDetails.care.upholstery} onChange={(e) => {
                              const newCare = { ...formData.furnitureDetails.care, upholstery: e.target.value };
                              handleChange('furnitureDetails', 'care', newCare);
                            }} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                          </div>
                       </div>
                     </div>
                     <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Product Story</label>
                        <textarea 
                          rows={4}
                          value={formData.furnitureDetails.story}
                          onChange={(e) => handleChange('furnitureDetails', 'story', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900"
                        />
                     </div>
                  </div>
                )}

                {activeTab === 'organization' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Main Category</label>
                        <input type="text" value={formData.organization.mainCategory} onChange={(e) => handleChange('organization', 'mainCategory', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Sub Category</label>
                        <input type="text" value={formData.organization.subCategory} onChange={(e) => handleChange('organization', 'subCategory', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Collection</label>
                        <input type="text" value={formData.organization.collection} onChange={(e) => handleChange('organization', 'collection', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Tags (comma separated)</label>
                        <input type="text" value={formData.organization.tags.join(', ')} onChange={(e) => handleChange('organization', 'tags', e.target.value.split(',').map(t => t.trim()))} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">SEO Title</label>
                      <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleChange('seo', 'metaTitle', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Meta Description</label>
                      <textarea rows={3} value={formData.seo.metaDescription} onChange={(e) => handleChange('seo', 'metaDescription', e.target.value)} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Canonical URL</label>
                      <input type="text" value={formData.seo.canonicalUrl} onChange={(e) => handleChange('seo', 'canonicalUrl', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900" />
                    </div>
                    
                    <div className="mt-8 p-6 bg-white border border-stone-200 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 rounded bg-stone-200" />
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Google Search Preview</p>
                      </div>
                      <div className="text-xl text-[#1a0dab] truncate cursor-pointer hover:underline mb-1">{formData.seo.metaTitle || 'Page Title'}</div>
                      <div className="text-sm text-[#006621] truncate mb-1">{formData.seo.canonicalUrl || 'https://yoursite.com/page'}</div>
                      <div className="text-sm text-[#545454] line-clamp-2">{formData.seo.metaDescription || 'Page description...'}</div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl flex-1 text-center">
                        <p className="text-xs text-stone-500 uppercase font-bold mb-2">Average Rating</p>
                        <p className="text-4xl font-serif text-stone-900">{formData.reviews.averageRating}</p>
                      </div>
                      <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl flex-1 text-center">
                        <p className="text-xs text-stone-500 uppercase font-bold mb-2">Total Reviews</p>
                        <p className="text-4xl font-serif text-stone-900">{formData.reviews.reviewCount}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">Recent Reviews</h3>
                      <div className="space-y-4">
                        {formData.reviews.published.map(review => (
                          <div key={review.id} className="p-4 bg-white border border-stone-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-stone-900">{review.author}</span>
                                <div className="flex text-amber-400 text-xs">
                                  {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                                </div>
                              </div>
                              <span className="text-xs text-stone-400">{review.date}</span>
                            </div>
                            <p className="text-sm text-stone-600">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        )}

        {/* Right: Real-time Live Preview */}
        <div className={`${isFullPreview ? 'w-full' : 'w-1/2'} flex flex-col bg-[#EFECE7] relative transition-all duration-300`}>
          
          {/* Preview Controls */}
          <div className="h-14 shrink-0 bg-[#EFECE7] border-b border-stone-300 flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-4 text-sm font-bold text-stone-500 tracking-wider uppercase">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Preview
            </div>
            
            <div className="flex gap-4">
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-stone-200">
                <button 
                  onClick={() => setPreviewLayout('page')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-colors ${previewLayout === 'page' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  Page
                </button>
                <button 
                  onClick={() => setPreviewLayout('card')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-colors ${previewLayout === 'card' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  Card
                </button>
              </div>

              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-stone-200">
              <button 
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <FiSmartphone size={16} />
              </button>
              <button 
                onClick={() => setPreviewMode('tablet')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <FiTablet size={16} />
              </button>
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <FiMonitor size={16} />
              </button>
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex-1 overflow-y-auto flex justify-center bg-stone-200/50 p-4 sm:p-8">
            <div className={`bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${getPreviewWidth()} ${previewMode === 'mobile' ? 'rounded-[2rem] border-8 border-stone-800' : 'rounded-lg border border-stone-200'}`}>
              
              {/* Actual Frontend Components rendered with formData */}
              <div className="bg-[#F7F5F2] font-sans h-full overflow-y-auto">
                <div className="px-4 py-8 md:p-8">
                  {previewLayout === 'card' ? (
                    <div className="flex items-center justify-center min-h-[500px]">
                      <ProductCard product={formData} />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col xl:flex-row gap-8 mb-12">
                        <div className="xl:w-1/2">
                          <ProductGallery product={formData} activeVariant={activePreviewVariant} />
                        </div>
                        <div className="xl:w-1/2 flex flex-col space-y-6">
                          <ProductInfo product={formData} activeVariant={activePreviewVariant} />
                          <ProductVariantSelector 
                            product={formData} 
                            activeVariant={activePreviewVariant} 
                            onVariantChange={setActivePreviewVariant} 
                          />
                          <ProductActions product={formData} activeVariant={activePreviewVariant} />
                        </div>
                      </div>
                      
                      <ProductDetailsAccordion product={formData} />
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
