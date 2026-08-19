import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiLayers, FiCalendar, FiMonitor, FiTablet, FiSmartphone, FiAlertCircle } from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import CollectionRuleBuilder from '../../../components/commerce/collections/CollectionRuleBuilder';
import ManualProductSelector from '../../../components/commerce/collections/ManualProductSelector';
import { useCollections, generateSlug } from '../../../context/commerce/CollectionContext';
import CollectionPageTemplate from '../../../../components/commerce/collections/presentation/CollectionPageTemplate';
import { useToast } from '../../../../components/ui/Toast/ToastContext';

const STEPS = [
  { id: 'basic', label: 'Basic Info', number: '1', icon: FiInfo },
  { id: 'media', label: 'Media & Banner', number: '2', icon: FiImage },
  { id: 'products', label: 'Products & Rules', number: '3', icon: FiLayers },
  { id: 'schedule', label: 'Scheduling', number: '4', icon: FiCalendar },
  { id: 'seo', label: 'SEO & Publishing', number: '5', icon: FiSearch }
];

export default function CollectionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { collections, updateCollection, addCollection } = useCollections();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'manual', // manual or automatic
    status: 'draft',
    featured: false,
    startDate: '',
    endDate: '',
    seoTitle: '',
    seoDescription: '',
    productIds: [],
    rules: [],
    matchMode: 'all',
    image: '',
    bannerImage: ''
  });

  useEffect(() => {
    if (!isNew) {
      const existing = collections.find(c => c.id === id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          slug: existing.slug || '',
          description: existing.description || '',
          type: existing.type || 'manual',
          status: existing.status || 'draft',
          featured: existing.featured || false,
          startDate: existing.startAt || '',
          endDate: existing.endAt || '',
          seoTitle: existing.seo?.metaTitle || '',
          seoDescription: existing.seo?.metaDescription || '',
          productIds: existing.productIds || [],
          rules: existing.rules || [],
          matchMode: existing.matchMode || 'all',
          image: existing.image || '',
          bannerImage: existing.bannerImage || ''
        });
      }
    }
  }, [id, isNew, collections]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const saveCollection = (status) => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        type: formData.type,
        status: status,
        featured: formData.featured,
        startAt: formData.startDate,
        endAt: formData.endDate,
        productIds: formData.productIds,
        rules: formData.rules,
        matchMode: formData.matchMode,
        image: formData.image,
        bannerImage: formData.bannerImage,
        seo: {
          metaTitle: formData.seoTitle,
          metaDescription: formData.seoDescription
        }
      };

      if (isNew) {
        addCollection(dataToSave);
      } else {
        updateCollection(id, dataToSave);
      }
      
      setFormData(prev => ({ ...prev, status }));
      setIsSaving(false);
      setHasUnsavedChanges(false);
      
      addToast({ type: 'success', message: `Collection ${status === 'draft' ? 'saved as draft' : 'published'} successfully` });
      
      if (status === 'published') {
        navigate('/admin/catalog/collections');
      }
    }, 800);
  };

  const handleSaveDraft = () => {
    saveCollection('draft');
  };

  const handlePublish = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Collection Name is required');
    
    if (errors.length > 0) {
      errors.forEach(err => addToast({ type: 'error', message: err }));
      return;
    }
    
    saveCollection('published');
  };

  return (
    <div className="min-h-screen h-screen bg-background font-sans text-text-primary overflow-hidden flex flex-col relative">
      
      {/* Top Header */}
      <header className="px-8 py-6 shrink-0 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/collections')}
            className="mt-1 p-2 bg-surface text-text-muted hover:text-text-primary transition-colors rounded-xl border border-border shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
              Collection Management
            </p>
            <div className="flex items-center gap-3">
               <h1 className="font-serif text-3xl font-bold text-text-primary">
                 {isNew ? 'Create New Collection' : formData.name || 'Untitled'}
               </h1>
               {!isNew && <CatalogStatusBadge status={formData.status} />}
               {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning bg-warning-soft border border-amber-200 px-2 py-1 rounded-full">
                    <FiAlertCircle /> Unsaved Changes
                  </span>
               )}
            </div>
            <p className="text-sm text-text-muted mt-1">
              {isNew ? 'Create a new collection' : `Slug: /${formData.slug || generateSlug(formData.name)}`}
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
            Publish Collection
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
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiInfo size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Basic Information</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Core details used for the collection.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Collection Name <span className="text-[#FF4D4F]">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Summer Collection"
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">URL Slug</label>
                      <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        placeholder="Leave blank to auto-generate"
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Description</label>
                      <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Write a description for this collection..."
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-text-primary">Featured Collection</p>
                        <p className="text-xs text-text-muted">Highlight this collection on the homepage or special menus.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={formData.featured}
                          onChange={(e) => handleChange('featured', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiImage size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Collection Media</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Visual assets used in grids and headers.</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Hero / Banner Image URL</label>
                      <div className="flex items-center gap-4">
                        {formData.bannerImage ? (
                          <img src={formData.bannerImage} alt="Banner" className="w-32 h-20 object-cover rounded-xl border border-border" />
                        ) : (
                          <div className="w-32 h-20 bg-background rounded-xl border border-border flex items-center justify-center">
                            <FiImage className="text-text-muted" />
                          </div>
                        )}
                        <input 
                          type="text" 
                          value={formData.bannerImage}
                          onChange={(e) => handleChange('bannerImage', e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Thumbnail / Cover Image URL</label>
                      <div className="flex items-center gap-4">
                        {formData.image ? (
                          <img src={formData.image} alt="Cover" className="w-20 h-20 object-cover rounded-xl border border-border" />
                        ) : (
                          <div className="w-20 h-20 bg-background rounded-xl border border-border flex items-center justify-center">
                            <FiImage className="text-text-muted" />
                          </div>
                        )}
                        <input 
                          type="text" 
                          value={formData.image}
                          onChange={(e) => handleChange('image', e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiLayers size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Products & Rules</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Define how products are added to this collection.</p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          name="collectionType" 
                          className="sr-only peer"
                          checked={formData.type === 'manual'}
                          onChange={() => handleChange('type', 'manual')}
                        />
                        <div className="p-4 rounded-xl border-2 peer-checked:border-primary peer-checked:bg-primary-soft/10 border-border hover:border-primary/50 transition-all text-center">
                          <h3 className="font-bold text-text-primary mb-1">Manual</h3>
                          <p className="text-xs text-text-muted">Handpick products one by one.</p>
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          name="collectionType" 
                          className="sr-only peer"
                          checked={formData.type === 'automatic'}
                          onChange={() => handleChange('type', 'automatic')}
                        />
                        <div className="p-4 rounded-xl border-2 peer-checked:border-primary peer-checked:bg-primary-soft/10 border-border hover:border-primary/50 transition-all text-center">
                          <h3 className="font-bold text-text-primary mb-1">Automatic</h3>
                          <p className="text-xs text-text-muted">Create rules to populate products.</p>
                        </div>
                      </label>
                    </div>

                    <div className="pt-6">
                      {formData.type === 'automatic' ? (
                        <CollectionRuleBuilder 
                          rules={formData.rules}
                          onChangeRules={(rules) => handleChange('rules', rules)}
                          matchMode={formData.matchMode}
                          onChangeMatchMode={(matchMode) => handleChange('matchMode', matchMode)}
                        />
                      ) : (
                        <ManualProductSelector 
                          selectedProductIds={formData.productIds}
                          onChange={(productIds) => handleChange('productIds', productIds)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiCalendar size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Scheduling</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Control when this collection is visible to customers.</p>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Publish Date</label>
                      <input 
                        type="datetime-local" 
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">End Date (Optional)</label>
                      <input 
                        type="datetime-local" 
                        value={formData.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiSearch size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">SEO Settings</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Configure search engine visibility.</p>

                  <div className="p-4 bg-background border border-border rounded-xl mb-6">
                    <p className="text-xs text-blue-800 mb-1 font-medium">{`https://aurelia.com/collections/${formData.slug || generateSlug(formData.name)}`}</p>
                    <p className="text-lg text-primary font-semibold mb-1">{formData.seoTitle || formData.name || 'Collection Title'}</p>
                    <p className="text-sm text-text-secondary line-clamp-2">{formData.seoDescription || formData.description || 'Collection description will appear here in search engine results.'}</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">SEO Title</label>
                      <input 
                        type="text" 
                        value={formData.seoTitle}
                        onChange={(e) => handleChange('seoTitle', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">SEO Description</label>
                      <textarea 
                        rows={3}
                        value={formData.seoDescription}
                        onChange={(e) => handleChange('seoDescription', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary resize-none"
                      />
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
                <div className="h-full overflow-y-auto no-scrollbar pointer-events-none">
                  {/* We pass the formData as a collection to the template */}
                  <CollectionPageTemplate collection={{ ...formData, id: isNew ? 'preview' : id }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
