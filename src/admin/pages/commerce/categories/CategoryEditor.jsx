import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiLayout, 
  FiAlertCircle, FiMonitor, FiTablet, FiSmartphone 
} from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import { useCategories, generateSlug } from '../../../context/commerce/CategoryContext';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';

const STEPS = [
  { id: 'basic', label: 'Basic Info', number: '1', icon: FiInfo },
  { id: 'media', label: 'Media & Banner', number: '2', icon: FiImage },
  { id: 'display', label: 'Display Settings', number: '3', icon: FiLayout },
  { id: 'seo', label: 'SEO & Publishing', number: '4', icon: FiSearch }
];

export default function CategoryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    navMenuId: '',
    status: 'draft',
    featured: false,
    sortOrder: 1,
    image: '',
    bannerImage: '',
    icon: '',
    seoTitle: '',
    seoDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    robots: 'index,follow'
  });

  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    fetch('/api/navbar')
      .then(res => res.json())
      .then(data => {
        if (data.navItems) {
          setNavItems(data.navItems);
        }
      })
      .catch(err => console.error('Failed to load navbar from API:', err));
  }, []);

  const { categories, getCategoryById, addCategory, updateCategory } = useCategories();

  useEffect(() => {
    if (!isNew) {
      const cat = getCategoryById(id);
      if (cat) {
        setFormData({
          name: cat.name || '',
          slug: cat.slug || '',
          description: cat.description || '',
          status: cat.status || 'draft',
          featured: cat.featured || false,
          sortOrder: cat.sortOrder || 1,
          parentId: cat.parentId || '',
          navMenuId: cat.navMenuId || '',
          image: cat.image || '',
          icon: cat.icon || '',
          seoTitle: cat.seo?.metaTitle || '',
          seoDescription: cat.seo?.metaDescription || '',
          metaKeywords: cat.seo?.metaKeywords || '',
          canonicalUrl: cat.seo?.canonicalUrl || '',
          robots: cat.seo?.robots || 'index,follow'
        });
      }
    }
  }, [id, isNew, getCategoryById]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: newName,
      slug: isNew ? generateSlug(newName) : prev.slug // auto-generate slug only if new
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status: 'draft' }));
      handleSave('draft');
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast({ type: 'success', message: 'Category saved as draft' });
    }, 800);
  };

  const handlePublish = () => {
    if (!formData.name.trim()) {
      addToast({ type: 'error', message: 'Category Name is required' });
      return;
    }
    
    
    
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status: 'published' }));
      handleSave('published');
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast({ type: 'success', message: 'Category published successfully' });
      navigate('/admin/catalog/categories');
    }, 1000);
  };

  const handleSave = async (forceStatus = null) => {
    setIsSaving(true);
    const payload = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      description: formData.description,
      parentId: formData.parentId === 'none' ? null : (formData.parentId || null),
      navMenuId: formData.navMenuId || null,
      status: typeof forceStatus === 'string' ? forceStatus : formData.status,
      featured: formData.featured,
      sortOrder: Number(formData.sortOrder) || 1,
      image: formData.image,
      bannerImage: formData.bannerImage,
      icon: formData.icon,
      seo: {
        metaTitle: formData.seoTitle,
        metaDescription: formData.seoDescription,
        metaKeywords: formData.metaKeywords,
        canonicalUrl: formData.canonicalUrl,
        robots: formData.robots
      }
    };

    if (isNew) {
      await addCategory(payload);
    } else {
      await updateCategory(id, payload);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-background font-sans text-text-primary overflow-hidden flex flex-col relative">
      
      {/* Top Header */}
      <header className="px-8 py-6 shrink-0 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/categories')}
            className="mt-1 p-2 bg-surface text-text-muted hover:text-text-primary transition-colors rounded-xl border border-border shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
              Category Management
            </p>
            <div className="flex items-center gap-3">
               <h1 className="font-serif text-3xl font-bold text-text-primary">
                 {isNew ? 'Create New Category' : formData.name || 'Untitled'}
               </h1>
               {!isNew && <CatalogStatusBadge status={formData.status} />}
               {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning bg-warning-soft border border-amber-200 px-2 py-1 rounded-full">
                    <FiAlertCircle /> Unsaved Changes
                  </span>
               )}
            </div>
            <p className="text-sm text-text-muted mt-1">
              Add category details and organize your store taxonomy
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
            Publish Category
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
        <div className="w-[55%] h-full overflow-y-auto px-8 py-6 pb-32 custom-scrollbar">
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
                  <p className="text-sm text-text-muted mb-6 ml-11">Core details used for the category hierarchy.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Category Name <span className="text-[#FF4D4F]">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="e.g. Living Room"
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">URL Slug</label>
                      <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        placeholder="e.g. living-room"
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Parent Within Field</label>
                      <select 
                        value={formData.navMenuId || ''}
                        onChange={(e) => handleChange('navMenuId', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                      >
                        <option value="">None</option>
                        {navItems.map(item => (
                          <option key={item.id} value={item.id}>{item.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Parent Category Group <span className="text-[#FF4D4F]">*</span></label>
                      <select 
                        value={formData.parentId || ''}
                        onChange={(e) => handleChange('parentId', e.target.value)}
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        required
                      >
                        <option value="">Select a Group</option>
                        <option value="none">None (Top Level)</option>
                        {categories
                          .filter(c => c.id !== id)
                          .filter(c => !formData.navMenuId || c.navMenuId === formData.navMenuId)
                          .map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>



                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Description</label>
                      <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Write a description for this category..."
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] resize-none"
                      />
                    </div>

                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiImage size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Category Media</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Visual assets used in grids and headers.</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Category Banner (Hero)</label>
                      <div className="border-2 border-dashed border-border rounded-xl bg-background p-12 flex flex-col items-center justify-center text-center hover:bg-primary-soft transition-all cursor-pointer aspect-[21/9]">
                        <FiImage size={32} className="text-text-muted mb-4" />
                        <h3 className="text-sm font-bold text-text-primary">Upload Banner Image</h3>
                        <p className="text-xs text-text-muted mt-1">Recommended: 2400x1000px</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Thumbnail (Grid)</label>
                      <div className="border-2 border-dashed border-border rounded-xl bg-background p-8 flex flex-col items-center justify-center text-center hover:bg-primary-soft transition-all cursor-pointer w-64 aspect-square">
                        <FiImage size={24} className="text-text-muted mb-2" />
                        <h3 className="text-sm font-bold text-text-primary">Upload Thumbnail</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'display' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiLayout size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Display Settings</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Control how this category is presented on the storefront.</p>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                      <div>
                        <h3 className="text-sm font-bold text-text-primary">Featured Category</h3>
                        <p className="text-xs text-text-muted mt-1">Show this category in prominent navigation menus and homepage grids.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={formData.featured}
                          onChange={(e) => handleChange('featured', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-[#E5E7F2] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Sort Order</label>
                      <input 
                        type="number" 
                        value={formData.sortOrder}
                        onChange={(e) => handleChange('sortOrder', e.target.value)}
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
                    <h2 className="text-lg font-bold text-text-primary">SEO & Publishing</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Optimize how this category appears in search engines.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">SEO Title</label>
                      <input 
                        type="text" 
                        value={formData.seoTitle} 
                        onChange={(e) => handleChange('seoTitle', e.target.value)} 
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Meta Description</label>
                      <textarea 
                        rows={3} 
                        value={formData.seoDescription} 
                        onChange={(e) => handleChange('seoDescription', e.target.value)} 
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary resize-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Meta Keywords</label>
                      <input 
                        type="text" 
                        value={formData.metaKeywords} 
                        onChange={(e) => handleChange('metaKeywords', e.target.value)} 
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-text-primary" 
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
              <div className={`bg-surface shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out border border-border overflow-hidden relative ${
                previewMode === 'mobile' ? 'w-[375px] rounded-[32px] min-h-[812px]' : 
                previewMode === 'tablet' ? 'w-[768px] rounded-2xl min-h-[1024px]' : 
                'w-full h-full border-t-0 border-b-0 border-r-0'
              }`}>
                {/* Storefront Mock Header */}
                <div className="h-16 bg-surface border-b border-gray-100 flex items-center justify-between px-6">
                  <div className="font-serif font-bold text-lg tracking-widest">AURELIA</div>
                  <div className="flex gap-4">
                     <div className="w-16 h-2 bg-gray-100 rounded-full"></div>
                     <div className="w-16 h-2 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
                
                {/* Category Hero Preview */}
                <div className="bg-[#111A4A] text-white py-16 px-8 text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 z-10" />
                   <div className="relative z-20">
                     <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-white/70">Shop Category</p>
                     <h1 className="font-serif text-4xl mb-4">{formData.name || 'Category Name'}</h1>
                     <p className="max-w-xl mx-auto text-sm text-white/80">{formData.description || 'Category description will appear here on the storefront.'}</p>
                   </div>
                </div>

                {/* Mock Product Grid */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-32 h-4 bg-gray-100 rounded"></div>
                    <div className="w-24 h-8 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="aspect-[4/5] bg-gray-100 rounded-lg"></div>
                        <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                        <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
