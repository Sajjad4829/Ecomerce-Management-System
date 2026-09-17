import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiLayout, 
  FiAlertCircle, FiMonitor, FiTablet, FiSmartphone, FiPlus, FiMinus
} from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import { useCategories } from '../../../context/commerce/CategoryContext';
import SearchableSelect from '../../../../components/ui/SearchableSelect';
import { generateSlug } from '../../../context/commerce/CategoryContext';
import { useCMS } from '../../../context/cms/CMSContext';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';

const defaultCategories = [
  { id: 1, name: 'Living Room', status: 'published', count: 120, hasChildren: true },
  { id: 2, name: 'Sofa Set', status: 'published', count: 45, parent: 'Living Room' },
  { id: 3, name: 'TV Cabinet', status: 'published', count: 28, parent: 'Living Room' },
  { id: 4, name: 'Bedroom', status: 'draft', count: 0, hasChildren: false },
];

const formatDimension = (val, fallback) => {
  if (!val) return fallback;
  const cleaned = val.toString().trim().replace(/\s+px$/i, 'px');
  if (/^\d+$/.test(cleaned)) return `${cleaned}px`;
  return cleaned;
};

const DimensionInput = ({ label, value, onChange, placeholder }) => {
  const numValue = value ? value.toString().replace(/[^0-9.]/g, '') : '';
  const unit = value && value.toString().includes('%') ? '%' : (value && value.toString().includes('vh') ? 'vh' : 'px');
  
  const handleNumChange = (e) => {
    const v = e.target.value;
    if (!v) onChange('');
    else onChange(`${v}${unit}`);
  };

  const handleUnitChange = (e) => {
    const u = e.target.value;
    if (numValue) onChange(`${numValue}${u}`);
    // If no numValue yet, we can't really set a valid dimension string, but let's just do it so the unit sticks if they type later.
    // Wait, if we just store the unit, we'd need to store it as "u" which is invalid. So just do nothing or set it.
    // Actually, setting "px" or "%" as the whole string is fine, the numeric extraction will yield '' and we can handle it.
    else onChange(`0${u}`); 
  };

  return (
    <div>
      <label className="block text-xs font-bold text-text-primary mb-1.5">{label}</label>
      <div className="flex rounded-xl overflow-hidden border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-surface">
        <input 
          type="number"
          placeholder={placeholder || 'e.g. 500'}
          value={numValue}
          onChange={handleNumChange}
          className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-sm text-text-primary appearance-none"
        />
        <select 
          value={unit}
          onChange={handleUnitChange}
          className="px-3 py-2.5 bg-gray-50 border-l border-border text-sm text-gray-600 focus:outline-none appearance-none"
        >
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="vh">vh</option>
        </select>
      </div>
    </div>
  );
};

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
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
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
    cardGap: '0',
    image: '',
    bannerImage: '',
    icon: '',
    seoTitle: '',
    seoDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    robots: 'index,follow',
    showBanner: false,
    bannerHeight: '',
    bannerWidth: '',
    imageWidth: '',
    imageHeight: '',
    titleWidth: '',
    descriptionWidth: '',
    bannerAlignment: 'center',
    heroTitle: '',
    titleFontFamily: '',
    titleFontSize: '',
    descriptionFontFamily: '',
    descriptionFontSize: '',
    textAlignment: 'text-left'
  });

  const { menus, headerConfig } = useCMS();
  const primaryMenuId = headerConfig?.primaryMenuId || 'MNU-001';
  const globalMenu = menus?.find(m => m.id === primaryMenuId);
  const navItems = globalMenu?.items || [];

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
          cardGap: cat.cardGap !== undefined ? cat.cardGap : '0',
          parentId: cat.parentId || '',
          navMenuId: cat.navMenuId || '',
          image: cat.image || '',
          bannerImage: cat.bannerImage || '',
          icon: cat.icon || '',
          seoTitle: cat.seo?.metaTitle || '',
          seoDescription: cat.seo?.metaDescription || '',
          metaKeywords: cat.seo?.metaKeywords || '',
          canonicalUrl: cat.seo?.canonicalUrl || '',
          robots: cat.seo?.robots || 'index,follow',
          showBanner: cat.showBanner !== undefined ? cat.showBanner : false,
          bannerHeight: cat.bannerHeight || '',
          bannerWidth: cat.bannerWidth || '',
          imageWidth: cat.imageWidth || '',
          imageHeight: cat.imageHeight || '',
          titleWidth: cat.titleWidth || '',
          descriptionWidth: cat.descriptionWidth || '',
          bannerAlignment: cat.bannerAlignment || 'center',
          heroTitle: cat.heroTitle || '',
          titleFontFamily: cat.titleFontFamily || '',
          titleFontSize: cat.titleFontSize || '',
          descriptionFontFamily: cat.descriptionFontFamily || '',
          descriptionFontSize: cat.descriptionFontSize || '',
          textAlignment: cat.textAlignment || 'text-left'
        });
      }
    }
  }, [id, isNew, getCategoryById]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'navMenuId' && value) {
        next.parentId = 'none';
      }
      return next;
    });
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

  const handleSaveDraft = async () => {
    if (!isNew && !hasUnsavedChanges) {
      addToast({ type: 'info', message: 'No changes detected' });
      return;
    }
    
    try {
      await handleSave('draft');
      addToast({ 
        type: 'success', 
        message: isNew ? 'Category saved as draft' : 'Category updated successfully' 
      });
    } catch (error) {
      addToast({ type: 'error', message: error.message || 'Failed to save draft' });
    }
  };

  const handlePublish = async () => {
    if (!formData.name.trim()) {
      addToast({ type: 'error', message: 'Category Name is required' });
      return;
    }
    
    if (!isNew && !hasUnsavedChanges) {
      addToast({ type: 'info', message: 'No changes detected' });
      return;
    }
    
    try {
      const savedCat = await handleSave('published');
      addToast({ 
        type: 'success', 
        message: isNew ? 'Category published successfully' : 'Category updated successfully' 
      });
      
      // If it was a new category, redirect to the edit page of the newly created category
      if (isNew && savedCat && savedCat.id) {
        navigate(`/admin/catalog/categories/${savedCat.id}`);
      }
    } catch (error) {
      addToast({ type: 'error', message: error.message || 'Failed to publish category' });
    }
  };

  const handleSave = async (forceStatus = null) => {
    setIsSaving(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        parentId: formData.parentId === 'none' ? null : (formData.parentId || null),
        navMenuId: formData.navMenuId || null,
        status: typeof forceStatus === 'string' ? forceStatus : formData.status,
        featured: formData.featured,
        sortOrder: Number(formData.sortOrder) || 1,
        cardGap: formData.cardGap,
        image: formData.image,
        bannerImage: formData.bannerImage,
        icon: formData.icon,
        seo: {
          metaTitle: formData.seoTitle,
          metaDescription: formData.seoDescription,
          metaKeywords: formData.metaKeywords,
          canonicalUrl: formData.canonicalUrl,
          robots: formData.robots
        },
        showBanner: formData.showBanner,
        bannerHeight: formData.bannerHeight,
        bannerWidth: formData.bannerWidth,
        imageWidth: formData.imageWidth,
        imageHeight: formData.imageHeight,
        titleWidth: formData.titleWidth,
        descriptionWidth: formData.descriptionWidth,
        bannerAlignment: formData.bannerAlignment,
        heroTitle: formData.heroTitle,
        titleFontFamily: formData.titleFontFamily,
        titleFontSize: formData.titleFontSize,
        descriptionFontFamily: formData.descriptionFontFamily,
        descriptionFontSize: formData.descriptionFontSize,
        textAlignment: formData.textAlignment
      };

      let result;
      if (isNew) {
        result = await addCategory(payload);
      } else {
        result = await updateCategory(id, payload);
      }
      
      setFormData(prev => ({ ...prev, status: typeof forceStatus === 'string' ? forceStatus : prev.status }));
      setHasUnsavedChanges(false);
      return result;
    } finally {
      setIsSaving(false);
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
            {isNew ? 'Publish Category' : 'Update Category'}
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
      <div className="flex-1 overflow-hidden flex bg-gradient-to-br from-[#4F46FF]/10 via-[#4F46FF]/5 to-white">
        
        {/* LEFT COLUMN: Form Cards (55%) */}
        <div className="w-[55%] h-full overflow-y-auto px-8 py-6 pb-32 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
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
                        placeholder="Category Name"
                        className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">URL Slug</label>
                      <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        placeholder="Slug"
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
                          <option key={item.id} value={item.id}>{item.title || item.label}</option>
                        ))}
                      </select>
                    </div>

                    {!formData.navMenuId && (
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Parent Category Group <span className="text-[#FF4D4F]">*</span></label>
                        <SearchableSelect 
                          value={formData.parentId || ''}
                          onChange={(val) => handleChange('parentId', val)}
                          options={[
                            { value: 'none', label: 'None (Top Level)' },
                            ...categories
                              .filter(c => c.id !== id)
                              .filter(c => !!c.navMenuId)
                              .map(c => ({ value: c.id, label: c.name }))
                          ]}
                          placeholder="Select a Group"
                          searchPlaceholder="Search categories..."
                          className="w-full"
                          required={!formData.navMenuId}
                        />
                      </div>
                    )}



                    <div>
                      <div className="mb-6">
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Hero Title (Optional)</label>
                        <input 
                          type="text" 
                          value={formData.heroTitle}
                          onChange={(e) => handleChange('heroTitle', e.target.value)}
                          placeholder="Leave blank to use Category Name"
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                        />
                      </div>

                      <label className="block text-xs font-bold text-text-primary mb-1.5">Description</label>
                      <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Write a description for this category..."
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] resize-none mb-4"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Title Font Family</label>
                          <select 
                            value={formData.titleFontFamily}
                            onChange={(e) => handleChange('titleFontFamily', e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary appearance-none"
                          >
                            <option value="">Default (Sans)</option>
                            <option value="font-sans">Sans Serif</option>
                            <option value="font-serif">Serif</option>
                            <option value="font-mono">Monospace</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Title Font Size</label>
                          <input 
                            type="text"
                            value={formData.titleFontSize}
                            onChange={(e) => handleChange('titleFontSize', e.target.value)}
                            placeholder="e.g. 24px, 2rem"
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Description Font Family</label>
                          <select 
                            value={formData.descriptionFontFamily}
                            onChange={(e) => handleChange('descriptionFontFamily', e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary appearance-none"
                          >
                            <option value="">Default (Sans)</option>
                            <option value="font-sans">Sans Serif</option>
                            <option value="font-serif">Serif</option>
                            <option value="font-mono">Monospace</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Description Font Size</label>
                          <input 
                            type="text"
                            value={formData.descriptionFontSize}
                            onChange={(e) => handleChange('descriptionFontSize', e.target.value)}
                            placeholder="e.g. 16px, 1rem"
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label className="block text-xs font-bold text-text-primary mb-1.5">Text Alignment</label>
                          <select 
                            value={formData.textAlignment}
                            onChange={(e) => handleChange('textAlignment', e.target.value)}
                            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary appearance-none"
                          >
                            <option value="text-left">Left</option>
                            <option value="text-center">Center</option>
                            <option value="text-right">Right</option>
                          </select>
                        </div>
                      </div>

                      {/* Text Container Dimensions */}
                      <div className="pt-6 mt-6 border-t border-border/50">
                        <h3 className="text-sm font-bold text-text-primary mb-4">Text Elements Width</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <DimensionInput 
                            label="Title Width"
                            placeholder="e.g. 100"
                            value={formData.titleWidth}
                            onChange={(val) => handleChange('titleWidth', val)}
                          />
                          <DimensionInput 
                            label="Description Width"
                            placeholder="e.g. 100"
                            value={formData.descriptionWidth}
                            onChange={(val) => handleChange('descriptionWidth', val)}
                          />
                        </div>
                      </div>

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
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-text-primary">Category Banner (Hero)</label>
                        {formData.bannerImage && (
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); handleChange('bannerImage', ''); }}
                            className="text-xs text-[#FF4D4F] hover:text-[#FF4D4F]/80 font-semibold transition-colors"
                          >
                            Remove Banner
                          </button>
                        )}
                      </div>
                      <label className="border-2 border-dashed border-border rounded-xl bg-background flex flex-col items-center justify-center text-center hover:bg-primary-soft transition-all cursor-pointer min-h-[200px] overflow-hidden relative group">
                        {isUploadingBanner ? (
                          <div className="p-12 flex flex-col items-center justify-center w-full h-full">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <h3 className="text-sm font-bold text-text-primary">Uploading...</h3>
                          </div>
                        ) : formData.bannerImage ? (
                          <>
                            <img src={formData.bannerImage} alt="Banner" className="w-full h-auto object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-semibold text-sm flex items-center gap-2"><FiImage /> Change Banner</span>
                            </div>
                          </>
                        ) : (
                          <div className="p-12 flex flex-col items-center justify-center w-full h-full">
                            <FiImage size={32} className="text-text-muted mb-4" />
                            <h3 className="text-sm font-bold text-text-primary">Upload Banner Image</h3>
                            <p className="text-xs text-text-muted mt-1">Recommended: 2400x1000px</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setIsUploadingBanner(true);
                              const uploadData = new FormData();
                              uploadData.append('file', file);
                              try {
                                const response = await fetch('/api/upload', {
                                  method: 'POST',
                                  body: uploadData,
                                });
                                if (response.ok) {
                                  const data = await response.json();
                                  handleChange('bannerImage', data.url);
                                } else {
                                  addToast({ type: 'error', message: 'Failed to upload image' });
                                }
                              } catch (error) {
                                console.error("Upload error:", error);
                                addToast({ type: 'error', message: 'Failed to upload image' });
                              } finally {
                                setIsUploadingBanner(false);
                                e.target.value = ''; // Reset input so same file can be selected again
                              }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5 w-64">
                        <label className="block text-xs font-bold text-text-primary">Category Icon Image</label>
                        {formData.image && (
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); handleChange('image', ''); }}
                            className="text-xs text-[#FF4D4F] hover:text-[#FF4D4F]/80 font-semibold transition-colors"
                          >
                            Remove Icon
                          </button>
                        )}
                      </div>
                      <label className="border-2 border-dashed border-border rounded-xl bg-background flex flex-col items-center justify-center text-center hover:bg-primary-soft transition-all cursor-pointer w-64 aspect-square overflow-hidden relative group">
                        {isUploadingIcon ? (
                          <div className="p-8 flex flex-col items-center justify-center w-full h-full">
                            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                            <h3 className="text-xs font-bold text-text-primary">Uploading...</h3>
                          </div>
                        ) : formData.image ? (
                          <>
                            <img src={formData.image} alt="Category Icon" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-semibold text-sm flex items-center gap-2"><FiImage /> Change</span>
                            </div>
                          </>
                        ) : (
                          <div className="p-8 flex flex-col items-center justify-center w-full h-full">
                            <FiImage size={24} className="text-text-muted mb-2" />
                            <h3 className="text-sm font-bold text-text-primary">Upload Icon Image</h3>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setIsUploadingIcon(true);
                              const uploadData = new FormData();
                              uploadData.append('file', file);
                              try {
                                const response = await fetch('/api/upload', {
                                  method: 'POST',
                                  body: uploadData,
                                });
                                if (response.ok) {
                                  const data = await response.json();
                                  handleChange('image', data.url);
                                } else {
                                  addToast({ type: 'error', message: 'Failed to upload thumbnail' });
                                }
                              } catch (error) {
                                console.error("Upload error:", error);
                                addToast({ type: 'error', message: 'Failed to upload thumbnail' });
                              } finally {
                                setIsUploadingIcon(false);
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Hero Banner Layout Settings */}
                  <div className="pt-6 mt-6 border-t border-border/50">
                    <h3 className="text-sm font-bold text-text-primary mb-4">Hero Banner Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
                        <div>
                          <label className="block text-sm font-bold text-text-primary mb-1">Show Banner on Frontend</label>
                          <p className="text-xs text-text-muted">If disabled, the hero banner will not be displayed on the category page.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.showBanner || false}
                            onChange={(e) => handleChange('showBanner', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <DimensionInput 
                        label="Banner Height"
                        placeholder="e.g. 400"
                        value={formData.bannerHeight}
                        onChange={(val) => handleChange('bannerHeight', val)}
                      />
                      <DimensionInput 
                        label="Banner Width"
                        placeholder="e.g. 100"
                        value={formData.bannerWidth}
                        onChange={(val) => handleChange('bannerWidth', val)}
                      />
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Banner Alignment</label>
                        <select
                          value={formData.bannerAlignment}
                          onChange={(e) => handleChange('bannerAlignment', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <DimensionInput 
                        label="Image Width"
                        placeholder="e.g. 55"
                        value={formData.imageWidth}
                        onChange={(val) => handleChange('imageWidth', val)}
                      />
                      <DimensionInput 
                        label="Image Height"
                        placeholder="e.g. 100"
                        value={formData.imageHeight}
                        onChange={(val) => handleChange('imageHeight', val)}
                      />
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

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Card Gap</label>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => handleChange('cardGap', Math.max(0, (formData.cardGap === '' || formData.cardGap === undefined ? 0 : Number(formData.cardGap)) - 1).toString())}
                          className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-xl text-text-muted hover:text-text-primary hover:bg-primary-soft transition-colors shadow-sm"
                        >
                          <FiMinus size={16} />
                        </button>
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={formData.cardGap === '' || formData.cardGap === undefined ? 0 : Number(formData.cardGap)}
                          onChange={(e) => handleChange('cardGap', e.target.value)}
                          className="w-20 px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-center text-text-primary font-bold shadow-inner"
                        />
                        <button 
                          type="button"
                          onClick={() => handleChange('cardGap', Math.min(100, (formData.cardGap === '' || formData.cardGap === undefined ? 0 : Number(formData.cardGap)) + 1).toString())}
                          className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-xl text-text-muted hover:text-text-primary hover:bg-primary-soft transition-colors shadow-sm"
                        >
                          <FiPlus size={16} />
                        </button>
                        <div className="text-xs text-text-muted bg-background px-3 py-2 rounded-lg border border-border/50">
                          <span className="font-mono">{formData.cardGap === '' || formData.cardGap === undefined ? 0 : Number(formData.cardGap)}px</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-text-muted mt-2">Adjust the spacing between product cards in grids in pixels.</p>
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
        {/* RIGHT COLUMN: Live Preview (45%) */}
        <div className="w-[45%] h-full flex flex-col relative bg-transparent border-l border-border/50">
          
          {/* Top Toolbar */}
          <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shrink-0 z-20">
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2.5 px-4 py-2 bg-white/80 shadow-sm rounded-full">
                 <div className="w-2 h-2 rounded-full bg-[#00a859]" />
                 <span className="text-[11px] font-bold text-[#00a859] uppercase tracking-wider">Live Preview</span>
               </div>
               <div className="w-px h-6 bg-gray-200/50"></div>
             </div>
             
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-[#111A4A]">
                 {previewMode === 'desktop' && <><FiMonitor size={16} /><span className="text-sm font-semibold">Desktop <span className="text-gray-500 font-normal">(1920px)</span></span></>}
                 {previewMode === 'tablet' && <><FiTablet size={16} /><span className="text-sm font-semibold">Tablet <span className="text-gray-500 font-normal">(768px)</span></span></>}
                 {previewMode === 'mobile' && <><FiSmartphone size={16} /><span className="text-sm font-semibold">Mobile <span className="text-gray-500 font-normal">(375px)</span></span></>}
               </div>
               <div className="flex items-center gap-1 bg-white/50 p-1.5 rounded-2xl border border-gray-200/50">
                 <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-xl transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm text-[#4F46FF]' : 'text-gray-500 hover:text-[#4F46FF]'}`}><FiMonitor size={18} /></button>
                 <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-xl transition-colors ${previewMode === 'tablet' ? 'bg-white shadow-sm text-[#4F46FF]' : 'text-gray-500 hover:text-[#4F46FF]'}`}><FiTablet size={18} /></button>
                 <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-xl transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm text-[#4F46FF]' : 'text-gray-500 hover:text-[#4F46FF]'}`}><FiSmartphone size={18} /></button>
               </div>
             </div>
          </div>
          
          {/* Preview Container */}
          <div className="flex-1 bg-white/95 backdrop-blur-2xl flex flex-col overflow-y-auto relative hide-scrollbar">
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            {previewMode === 'desktop' && (
              <div className="flex flex-col min-h-full fade-in py-8">
                <div className="px-8 flex flex-col flex-1">
                  
                  {formData.name && (
                    <div className={`flex flex-col pb-4 w-full ${formData.bannerAlignment === 'left' ? 'mr-auto' : formData.bannerAlignment === 'right' ? 'ml-auto' : 'mx-auto'}`} style={{ maxWidth: formatDimension(formData.bannerWidth, '100%') }}>
                      <div className="font-serif font-bold text-2xl tracking-widest uppercase text-[#111A4A]">
                        {formData.name}
                      </div>
                    </div>
                  )}

                  <div 
                    className={`w-full bg-white flex flex-row ${formData.bannerAlignment === 'left' ? 'mr-auto' : formData.bannerAlignment === 'right' ? 'ml-auto' : 'mx-auto'}`}
                    style={{
                      minHeight: formatDimension(formData.bannerHeight, '350px'),
                      maxWidth: formatDimension(formData.bannerWidth, '100%')
                    }}
                  >
                    <div className="relative shrink-0 bg-gray-50 overflow-hidden w-full">
                      {formData.bannerImage ? (
                        <img src={formData.bannerImage} alt="Banner Preview" className={`absolute inset-0 w-full h-full object-cover block z-0 ${formData.bannerAlignment === 'left' ? 'object-left' : formData.bannerAlignment === 'right' ? 'object-right' : 'object-center'}`} style={{ height: formData.imageHeight || '100%' }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <FiImage size={48} className="opacity-50" />
                        </div>
                      )}
                    </div>


                  </div>

                </div>
              </div>
            )}

            {previewMode === 'tablet' && (
              <div className="flex flex-col min-h-full fade-in py-8">
                <div className="px-8 flex-1 flex justify-center">
                  <div className="w-[768px] max-w-full flex flex-col h-full">
                    {formData.name && (
                      <div 
                        className={`flex flex-col pb-3 shrink-0 ${formData.textAlignment || 'text-left'}`}
                        style={{ 
                          height: formatDimension(formData.textHeight, undefined)
                        }}
                      >
                        <div className="font-serif font-bold text-lg tracking-widest uppercase text-[#111A4A] whitespace-nowrap">
                          {formData.name}
                        </div>
                      </div>
                    )}
                    <div 
                      className="w-full bg-gray-50 overflow-hidden flex flex-col justify-center relative mx-auto shrink-0 transition-all duration-300"
                      style={{ 
                        maxWidth: formatDimension(formData.bannerWidth, '100%'),
                        height: formatDimension(formData.bannerHeight, '300px')
                      }}
                    >
                       {formData.bannerImage ? (
                         <img src={formData.bannerImage} alt="Banner Preview" className={`absolute inset-0 w-full h-full object-cover block z-0 ${formData.bannerAlignment === 'left' ? 'object-left' : formData.bannerAlignment === 'right' ? 'object-right' : 'object-center'}`} style={{ height: formData.imageHeight || '100%' }} />
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <FiImage size={32} className="opacity-50" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewMode === 'mobile' && (
              <div className="flex flex-col min-h-full fade-in py-8">
                <div className="px-8 flex-1 flex justify-center">
                  <div className="w-[375px] max-w-full border-x border-gray-100 px-4 flex flex-col h-full">
                    {formData.name && (
                      <div className={`flex flex-col pb-3 shrink-0 ${formData.textAlignment || 'text-left'}`}>
                        <div className="font-serif font-bold text-base tracking-widest uppercase text-[#111A4A] whitespace-nowrap">
                          {formData.name}
                        </div>
                      </div>
                    )}
                    <div 
                      className="w-full bg-gray-50 overflow-hidden flex flex-col justify-center relative mx-auto shrink-0 transition-all duration-300"
                      style={{ 
                        maxWidth: formatDimension(formData.bannerWidth, '100%'),
                        height: formatDimension(formData.bannerHeight, '200px')
                      }}
                    >
                       {formData.bannerImage ? (
                         <img src={formData.bannerImage} alt="Banner Preview" className={`absolute inset-0 w-full h-full object-cover block z-0 ${formData.bannerAlignment === 'left' ? 'object-left' : formData.bannerAlignment === 'right' ? 'object-right' : 'object-center'}`} style={{ height: formData.imageHeight || '100%' }} />
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <FiImage size={24} className="opacity-50" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
