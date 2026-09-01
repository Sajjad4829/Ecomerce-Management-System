import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBox, FiCheck, FiChevronRight, FiEdit2, FiImage, FiInfo, FiPlus, FiSave, FiSearch, FiSettings, FiTag, FiUploadCloud, FiX, FiDollarSign, FiAlignLeft, FiEye, FiMonitor, FiTablet, FiSmartphone, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import MediaUploader from './components/MediaUploader';
import { Rocket } from 'lucide-react';
import ProductStatusBadge from '../../../components/commerce/products/ProductStatusBadge';
import VariantManager from '../../../components/commerce/products/variants/VariantManager';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import { useCategories } from '../../../context/commerce/CategoryContext';

import {
  ProductGallery,
  ProductInfo,
  ProductVariantSelector,
  ProductActions,
  ProductDetailsAccordion,
  ProductCard
} from '../../../../components/commerce/products/presentation';

const STEPS = [
  { id: 'basic', label: 'Basic Info', number: '1', icon: FiInfo },
  { id: 'media', label: 'Media & Gallery', number: '2', icon: FiImage },
  { id: 'variants', label: 'Variants', number: '3', icon: FiBox },
  { id: 'pricing', label: 'Pricing & Stock', number: '4', icon: FiDollarSign },
  { id: 'seo', label: 'SEO & Publishing', number: '5', icon: FiSearch }
];

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [previewLayout, setPreviewLayout] = useState('page');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { addToast } = useToast();
  const { categories } = useCategories();
  
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
      categoryId: '',
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
      dimensions: { width: '', height: '', depth: '', seatHeight: '', weight: '' },
      materials: { frameMaterial: '', woodType: '', woodFinish: '', upholsteryMaterial: '', fabric: '', leather: '', color: '' },
      specifications: { assemblyRequired: 'No', roomType: '', seatingCapacity: '' },
      care: { furniture: '', upholstery: '' },
      warranty: { duration: '', description: '', returnPolicy: '' },
      story: ''
    },
    seo: {
      slug: '', metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', openGraphImage: ''
    },
    reviews: {
      averageRating: 0, reviewCount: 0, published: [], pending: []
    }
  });

  const [activePreviewVariant, setActivePreviewVariant] = useState(null);

  useEffect(() => {
    if (!isNew) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${id}`);
          if (res.ok) {
            const data = await res.json();
            setFormData(data);
            if (data.variants && data.variants.length > 0) setActivePreviewVariant(data.variants[0]);
          } else {
            addToast({ type: 'error', message: 'Failed to load product' });
          }
        } catch (err) {
          addToast({ type: 'error', message: 'Error loading product' });
        }
      };
      fetchProduct();
    }
  }, [id, isNew, addToast]);

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

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status: 'draft' }));
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast({ type: 'success', message: 'Product saved as draft' });
    }, 800);
  };

  const handlePublish = () => {
    const { basicInfo, media, pricing, organization } = formData;
    const errors = [];
    if (!basicInfo.name.trim()) errors.push('Product Name is required');
    if (!basicInfo.sku.trim()) errors.push('SKU is required');
    if (!media.primaryImage && media.gallery.length === 0) errors.push('Primary Image is required');
    if (!organization.categoryId) errors.push('Category is required');
    if (!pricing.regularPrice && !pricing.salePrice) errors.push('Price is required');
    
    if (errors.length > 0) {
      errors.forEach(err => addToast({ type: 'error', message: err }));
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status: 'published' }));
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast({ type: 'success', message: 'Product published successfully' });
      navigate('/admin/catalog/products');
    }, 1000);
  };

  const updateVariants = (updateFn) => {
    setFormData(prev => {
      const currentFlat = { variants: prev.variants };
      const nextFlat = updateFn(currentFlat);
      setHasUnsavedChanges(true);
      return { ...prev, variants: nextFlat.variants };
    });
  };

  return (
    <div className="min-h-screen h-screen bg-background font-sans text-text-primary overflow-hidden flex flex-col relative">
      
      {/* Top Header */}
      <header className="px-8 py-6 shrink-0 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/products')}
            className="mt-1 p-2 bg-surface text-text-muted hover:text-text-primary transition-colors rounded-xl border border-border shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
              Product Management
            </p>
            <div className="flex items-center gap-3">
               <h1 className="font-serif text-3xl font-bold text-text-primary">
                 {isNew ? 'Create New Product' : formData.basicInfo.name || 'Untitled'}
               </h1>
               {!isNew && <ProductStatusBadge status={formData.status} />}
               {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning bg-warning-soft border border-amber-200 px-2 py-1 rounded-full">
                    <FiAlertCircle /> Unsaved Changes
                  </span>
               )}
            </div>
            <p className="text-sm text-text-muted mt-1">
              Add product details and publish to your store
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-primary/30 text-primary font-semibold text-sm rounded-xl hover:bg-primary-soft transition-colors shadow-sm"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <FiSave size={18} />}
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4F46FF] to-[#6D63FF] text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(79,70,255,0.3)] disabled:opacity-50"
          >
            <Rocket size={18} />
            Publish Product
          </button>
        </div>
      </header>

      {/* Step Navigation */}
      <div className="px-8 pb-6 shrink-0 border-b border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          {STEPS.map(step => {
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  isActive 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-surface border-border text-text-primary hover:bg-primary-soft/50'
                }`}
              >
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                  isActive ? 'bg-surface text-primary' : 'bg-background text-text-muted'
                }`}>
                  {step.number}
                </span>
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Two-Column */}
      <div className="flex-1 overflow-hidden flex">
        
        {/* LEFT COLUMN: Form Cards (55%) */}
        <div className="w-[55%] h-full overflow-y-auto px-8 py-6 no-scrollbar pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === 'basic' && (
                <>
                  <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiInfo size={16} /></div>
                      <h2 className="text-lg font-bold text-text-primary">Basic Information</h2>
                    </div>
                    <p className="text-sm text-text-muted mb-6 ml-11">Enter the essential details about your product</p>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Product Name <span className="text-[#FF4D4F]">*</span></label>
                        <input 
                          type="text" 
                          value={formData.basicInfo.name}
                          onChange={(e) => handleChange('basicInfo', 'name', e.target.value)}
                          placeholder="e.g. Modern Sofa Chair"
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Product Badge</label>
                          <input 
                            type="text" 
                            value={formData.basicInfo.badge || ''}
                            onChange={(e) => handleChange('basicInfo', 'badge', e.target.value)}
                            placeholder="e.g. New Arrival"
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">SKU <span className="text-[#FF4D4F]">*</span></label>
                          <input 
                            type="text" 
                            value={formData.basicInfo.sku}
                            onChange={(e) => handleChange('basicInfo', 'sku', e.target.value)}
                            placeholder="e.g. DF-SF-001"
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Short Description <span className="text-[#FF4D4F]">*</span></label>
                        <textarea 
                          rows={2}
                          value={formData.basicInfo.shortDescription}
                          onChange={(e) => handleChange('basicInfo', 'shortDescription', e.target.value)}
                          placeholder="Write a short description for product..."
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] resize-none"
                        />
                        <div className="text-right text-[10px] text-text-muted mt-1">{formData.basicInfo.shortDescription.length}/160</div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Full Description <span className="text-[#FF4D4F]">*</span></label>
                        <div className="border border-border rounded-xl overflow-hidden bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-[#4F46FF] transition-all">
                          <div className="flex items-center gap-4 px-4 py-2.5 bg-background border-b border-border text-text-muted">
                            <span className="text-xs font-bold text-text-primary cursor-pointer">Paragraph ▾</span>
                            <span className="font-serif font-bold text-black cursor-pointer">B</span>
                            <span className="font-serif italic text-black cursor-pointer">I</span>
                            <span className="cursor-pointer">≡</span>
                            <span className="cursor-pointer">=</span>
                            <span className="cursor-pointer">&gt;</span>
                            <span className="cursor-pointer">🔗</span>
                            <span className="cursor-pointer">🖼</span>
                          </div>
                          <textarea 
                            rows={6}
                            value={formData.basicInfo.description}
                            onChange={(e) => handleChange('basicInfo', 'description', e.target.value)}
                            placeholder="Write full product description..."
                            className="w-full px-4 py-4 border-none focus:outline-none focus:ring-0 text-sm text-text-primary placeholder-[#7C849F] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                    <h2 className="text-lg font-bold text-text-primary mb-6">Organization</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Category <span className="text-[#FF4D4F]">*</span></label>
                        <select 
                          value={formData.organization.categoryId}
                          onChange={(e) => handleChange('organization', 'categoryId', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        >
                          <option value="">Select a category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                    <h2 className="text-lg font-bold text-text-primary mb-6">Furniture Details & Dimensions</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-text-primary mb-3">Dimensions</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {['width', 'height', 'depth', 'seatHeight'].map(dim => (
                          <div key={dim}>
                            <label className="block text-xs font-bold text-text-primary mb-1.5 capitalize">{dim.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <input type="text" value={formData.furnitureDetails.dimensions[dim] || ''} onChange={(e) => {
                              handleChange('furnitureDetails', 'dimensions', { ...formData.furnitureDetails.dimensions, [dim]: e.target.value });
                            }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-text-primary mb-3">Materials</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {['frameMaterial', 'woodType', 'woodFinish', 'upholsteryMaterial'].map(mat => (
                          <div key={mat}>
                            <label className="block text-xs font-bold text-text-primary mb-1.5 capitalize">{mat.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <input type="text" value={formData.furnitureDetails.materials[mat] || ''} onChange={(e) => {
                              handleChange('furnitureDetails', 'materials', { ...formData.furnitureDetails.materials, [mat]: e.target.value });
                            }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-text-primary mb-3">Care Instructions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Furniture Care</label>
                          <textarea value={formData.furnitureDetails.care?.furniture || ''} onChange={(e) => {
                            handleChange('furnitureDetails', 'care', { ...formData.furnitureDetails.care, furniture: e.target.value });
                          }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary resize-none" rows="3" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Upholstery Care</label>
                          <textarea value={formData.furnitureDetails.care?.upholstery || ''} onChange={(e) => {
                            handleChange('furnitureDetails', 'care', { ...formData.furnitureDetails.care, upholstery: e.target.value });
                          }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary resize-none" rows="3" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-text-primary mb-3">Warranty & Story</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Warranty Duration</label>
                          <input type="text" value={formData.furnitureDetails.warranty?.duration || ''} onChange={(e) => {
                            handleChange('furnitureDetails', 'warranty', { ...formData.furnitureDetails.warranty, duration: e.target.value });
                          }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Return Policy</label>
                          <input type="text" value={formData.furnitureDetails.warranty?.returnPolicy || ''} onChange={(e) => {
                            handleChange('furnitureDetails', 'warranty', { ...formData.furnitureDetails.warranty, returnPolicy: e.target.value });
                          }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Product Story</label>
                        <textarea value={formData.furnitureDetails.story || ''} onChange={(e) => {
                          handleChange('furnitureDetails', 'story', e.target.value);
                        }} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary resize-none" rows="3" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'media' && (
                <MediaUploader media={formData.media} onChange={(field, value) => handleChange('media', field, value)} />
              )}

              {activeTab === 'variants' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiBox size={16} /></div>
                      <h2 className="text-lg font-bold text-text-primary">Product Variants</h2>
                   </div>
                   <VariantManager productData={{ variants: formData.variants }} setProductData={updateVariants} />
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiDollarSign size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Pricing & Stock</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Manage product pricing and availability</p>
                  
                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Regular Price ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="number" 
                            value={formData.pricing.regularPrice}
                            onChange={(e) => handleChange('pricing', 'regularPrice', Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-semibold text-text-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Sale Price ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="number" 
                            value={formData.pricing.salePrice || ''}
                            onChange={(e) => handleChange('pricing', 'salePrice', Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-semibold text-text-primary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">EMI ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                          <input 
                            type="number" 
                            value={formData.pricing.emi || ''}
                            onChange={(e) => handleChange('pricing', 'emi', Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-semibold text-text-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Stock Quantity</label>
                        <input 
                          type="number" 
                          value={formData.inventory.totalStock || ''}
                          onChange={(e) => handleChange('inventory', 'totalStock', Number(e.target.value))}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-semibold text-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiSearch size={16} /></div>
                      <h2 className="text-lg font-bold text-text-primary">SEO & Publishing</h2>
                    </div>
                    <p className="text-sm text-text-muted mb-6 ml-11">Optimize how this product appears in search engines</p>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">SEO Title</label>
                        <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleChange('seo', 'metaTitle', e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Meta Description</label>
                        <textarea rows={3} value={formData.seo.metaDescription} onChange={(e) => handleChange('seo', 'metaDescription', e.target.value)} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary resize-none" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                    <h2 className="text-lg font-bold text-text-primary mb-6">Organization</h2>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Main Category</label>
                        <input type="text" value={formData.organization.mainCategory} onChange={(e) => handleChange('organization', 'mainCategory', e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Collection</label>
                        <input type="text" value={formData.organization.collection} onChange={(e) => handleChange('organization', 'collection', e.target.value)} className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Live Preview (45%) */}
        <div className="w-[45%] h-full flex flex-col relative pr-8 pb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46FF]/5 to-[#6D63FF]/5 rounded-[24px] pointer-events-none blur-3xl opacity-50" />
          
          <div className="relative flex-1 bg-surface rounded-[24px] shadow-[0_8px_32px_rgba(17,26,74,0.06)] border border-border flex flex-col overflow-hidden">
            
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface shrink-0 z-20">
               <div className="flex items-center gap-2.5 px-3 py-1.5 bg-success-soft rounded-full">
                 <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                 <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Live Preview</span>
               </div>
               
               <div className="flex items-center gap-1 bg-background p-1 rounded-lg">
                 <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Desktop View"><FiMonitor size={14} /></button>
                 <button onClick={() => setPreviewMode('tablet')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Tablet View"><FiTablet size={14} /></button>
                 <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-muted hover:text-text-primary'}`} title="Mobile View"><FiSmartphone size={14} /></button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-stone-100 flex justify-center no-scrollbar items-start pt-4 pb-12">
              <div className={`bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out border border-border overflow-hidden ${
                previewMode === 'mobile' ? 'w-[375px] rounded-[32px] min-h-[812px]' : 
                previewMode === 'tablet' ? 'w-[768px] rounded-2xl min-h-[1024px]' : 
                'w-full h-full border-t-0 border-b-0 border-r-0'
              }`}>
                <div className="bg-[#F4F6FB] font-sans h-full overflow-y-auto min-h-full no-scrollbar p-4 md:p-6">
                  <div className="bg-surface rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden pb-8">
                    {previewLayout === 'card' ? (
                      <div className="flex items-center justify-center min-h-[500px]">
                        <ProductCard product={formData} />
                      </div>
                    ) : (
                      <>
                        <div className={`flex flex-col gap-6 mb-8`}>
                          <div className={`w-full p-3`}>
                            <ProductGallery product={formData} activeVariant={activePreviewVariant} previewMode="mobile" />
                          </div>
                          <div className={`w-full flex flex-col space-y-6 px-6 md:px-8`}>
                            <ProductInfo product={formData} activeVariant={activePreviewVariant} />
                            <ProductVariantSelector 
                              product={formData} 
                              activeVariant={activePreviewVariant} 
                              onVariantChange={setActivePreviewVariant} 
                            />
                            <ProductActions product={formData} activeVariant={activePreviewVariant} />
                          </div>
                        </div>
                        
                        <div className="px-6 md:px-8">
                          <ProductDetailsAccordion product={formData} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Controls (Still accessible for switching modes logically if needed) */}
            <div className="absolute top-20 right-4 flex bg-surface rounded-lg p-1 shadow-md border border-border z-30 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setPreviewLayout('page')}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors ${previewLayout === 'page' ? 'bg-[#111A4A] text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  Page
                </button>
                <button 
                  onClick={() => setPreviewLayout('card')}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors ${previewLayout === 'card' ? 'bg-[#111A4A] text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  Card
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
