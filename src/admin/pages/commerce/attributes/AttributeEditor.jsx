import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSave, FiInfo, FiSliders, FiList, FiLayout, FiMonitor, FiTablet, FiSmartphone, FiAlertCircle } from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import AttributeValueEditor from '../../../components/commerce/attributes/AttributeValueEditor';

const STEPS = [
  { id: 'basic', label: 'Basic Info', number: '1', icon: FiInfo },
  { id: 'behavior', label: 'Behavior & Usage', number: '2', icon: FiSliders },
  { id: 'values', label: 'Attribute Values', number: '3', icon: FiList },
  { id: 'display', label: 'Display Settings', number: '4', icon: FiLayout }
];

export default function AttributeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'select',
    group: 'General',
    status: 'draft',
    required: false,
    filterable: true,
    searchable: true,
    sortable: false,
    variantEnabled: false,
    visibleOnProduct: true,
    visibleInSpecs: true,
    visibleInCompare: true,
    useInCard: false,
    displayType: 'text',
    values: []
  });

  useEffect(() => {
    if (!isNew) {
      setFormData({
        name: 'Material',
        slug: 'material',
        description: 'Primary material used in the furniture piece.',
        type: 'select',
        group: 'Materials',
        status: 'published',
        required: true,
        filterable: true,
        searchable: true,
        sortable: false,
        variantEnabled: true,
        visibleOnProduct: true,
        visibleInSpecs: true,
        visibleInCompare: true,
        useInCard: false,
        displayType: 'text',
        values: [
          { id: 'v1', label: 'Solid Wood', slug: 'solid-wood', order: 0 },
          { id: 'v2', label: 'Engineered Wood', slug: 'engineered-wood', order: 1 },
          { id: 'v3', label: 'Metal', slug: 'metal', order: 2 },
          { id: 'v4', label: 'Glass', slug: 'glass', order: 3 },
          { id: 'v5', label: 'Fabric', slug: 'fabric', order: 4 },
          { id: 'v6', label: 'Leather', slug: 'leather', order: 5 }
        ]
      });
    }
  }, [id, isNew]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const saveAttribute = (status) => {
    setIsSaving(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, status }));
      setIsSaving(false);
      setHasUnsavedChanges(false);
      
      addToast({ type: 'success', message: `Attribute ${status === 'draft' ? 'saved as draft' : 'published'} successfully` });
      
      if (status === 'published') {
        navigate('/admin/catalog/attributes');
      }
    }, 800);
  };

  const handleSaveDraft = () => {
    saveAttribute('draft');
  };

  const handlePublish = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Attribute Name is required');
    
    if (errors.length > 0) {
      errors.forEach(err => addToast({ type: 'error', message: err }));
      return;
    }
    
    saveAttribute('published');
  };

  const hasValues = ['select', 'multi_select', 'radio', 'color', 'image_swatch'].includes(formData.type);

  return (
    <div className="min-h-screen h-screen bg-background font-sans text-text-primary overflow-hidden flex flex-col relative">
      
      <header className="px-8 py-6 shrink-0 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/attributes')}
            className="mt-1 p-2 bg-surface text-text-muted hover:text-text-primary transition-colors rounded-xl border border-border shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
              Attribute Management
            </p>
            <div className="flex items-center gap-3">
               <h1 className="font-serif text-3xl font-bold text-text-primary">
                 {isNew ? 'Create New Attribute' : formData.name || 'Untitled'}
               </h1>
               {!isNew && <CatalogStatusBadge status={formData.status} />}
               {hasUnsavedChanges && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning bg-warning-soft border border-amber-200 px-2 py-1 rounded-full">
                    <FiAlertCircle /> Unsaved Changes
                  </span>
               )}
            </div>
            <p className="text-sm text-text-muted mt-1">
              {isNew ? 'Create a new product attribute' : `Slug: /${formData.slug}`}
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
            Publish Attribute
          </button>
        </div>
      </header>

      <div className="px-8 pb-6 shrink-0 border-b border-border/50">
        <div className="flex flex-wrap items-center gap-3">
          {STEPS.map(step => {
            if (step.id === 'values' && !hasValues) return null;
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

      <div className="flex-1 overflow-hidden flex">
        
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
                  <p className="text-sm text-text-muted mb-6 ml-11">Core details for this product attribute.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Attribute Name <span className="text-[#FF4D4F]">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Material"
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

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Attribute Type</label>
                        <select 
                          value={formData.type}
                          onChange={(e) => handleChange('type', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        >
                          <option value="text">Text (Single Line)</option>
                          <option value="long_text">Text (Multi Line)</option>
                          <option value="number">Number</option>
                          <option value="decimal">Decimal</option>
                          <option value="boolean">Boolean (Yes/No)</option>
                          <option value="select">Select (Single)</option>
                          <option value="multi_select">Select (Multiple)</option>
                          <option value="radio">Radio Buttons</option>
                          <option value="color">Color Swatch</option>
                          <option value="image_swatch">Image Swatch</option>
                          <option value="measurement">Measurement (with units)</option>
                          <option value="date">Date</option>
                          <option value="range">Range</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary mb-1.5">Attribute Group</label>
                        <select 
                          value={formData.group}
                          onChange={(e) => handleChange('group', e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary"
                        >
                          <option value="General">General</option>
                          <option value="Materials">Materials</option>
                          <option value="Dimensions">Dimensions</option>
                          <option value="Finish">Finish</option>
                          <option value="Care">Care</option>
                          <option value="Warranty">Warranty</option>
                          <option value="Shipping">Shipping</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1.5">Description / Tooltip</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Optional help text to display next to the attribute."
                        className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-text-primary placeholder-[#7C849F] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'behavior' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiSliders size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Behavior & Usage</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Configure how this attribute operates within the catalog.</p>

                  <div className="space-y-1 divide-y divide-border">
                    {[
                      { key: 'required', label: 'Required Field', desc: 'Editors must provide a value when creating a product.' },
                      { key: 'variantEnabled', label: 'Variant Attribute', desc: 'Use this attribute to generate product variants (e.g., Size, Color).' },
                      { key: 'filterable', label: 'Filterable', desc: 'Allow customers to filter products by this attribute in the storefront.' },
                      { key: 'searchable', label: 'Searchable', desc: 'Include this attribute\'s values in global search results.' },
                      { key: 'sortable', label: 'Sortable', desc: 'Allow customers to sort product lists using this attribute.' },
                      { key: 'visibleOnProduct', label: 'Visible on Product Page', desc: 'Display this attribute in the product details section.' },
                      { key: 'visibleInSpecs', label: 'Visible in Specifications', desc: 'Include this in the technical specification table.' },
                      { key: 'visibleInCompare', label: 'Visible in Comparison', desc: 'Show this row when customers compare products side-by-side.' },
                      { key: 'useInCard', label: 'Use in Product Card', desc: 'Show a preview of this attribute on product grid cards (e.g., color swatches).' },
                    ].map((item) => (
                      <div key={item.key} className="py-4 flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData[item.key]}
                            onChange={(e) => handleChange(item.key, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiList size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Attribute Values</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Manage the predefined list of choices for this attribute.</p>

                  <AttributeValueEditor 
                    attributeType={formData.type} 
                    values={formData.values}
                    onChange={(newValues) => handleChange('values', newValues)}
                  />
                </div>
              )}

              {activeTab === 'display' && (
                <div className="bg-surface rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiLayout size={16} /></div>
                    <h2 className="text-lg font-bold text-text-primary">Display Settings</h2>
                  </div>
                  <p className="text-sm text-text-muted mb-6 ml-11">Configure how this attribute visually renders on the storefront.</p>

                  <div>
                    <label className="block text-xs font-bold text-text-primary mb-3">Storefront Representation</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'text', label: 'Plain Text' },
                        { id: 'badge', label: 'Badge / Pill' },
                        { id: 'swatch', label: 'Text Swatch' },
                        { id: 'color', label: 'Color Swatch' },
                        { id: 'image', label: 'Image Swatch' },
                        { id: 'progress', label: 'Progress Bar' }
                      ].map((type) => (
                        <label key={type.id} className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="displayType" 
                            className="sr-only peer"
                            checked={formData.displayType === type.id}
                            onChange={() => handleChange('displayType', type.id)}
                          />
                          <div className="px-4 py-3 rounded-xl border-2 peer-checked:border-primary peer-checked:bg-primary-soft/20 border-border hover:border-border-hover transition-all text-center">
                            <span className="text-sm font-semibold text-text-primary">{type.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

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
                <div className="h-full overflow-y-auto p-8 flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm bg-background border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-serif font-bold text-lg mb-2">{formData.name || 'Attribute Name'}</h3>
                    {formData.description && <p className="text-sm text-text-muted mb-4">{formData.description}</p>}
                    
                    {formData.displayType === 'text' && (
                      <p className="text-text-primary">Value 1, Value 2</p>
                    )}
                    {formData.displayType === 'badge' && (
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-stone-100 text-xs font-medium rounded">Value 1</span>
                        <span className="px-2 py-1 bg-stone-100 text-xs font-medium rounded">Value 2</span>
                      </div>
                    )}
                    {formData.displayType === 'color' && (
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-500 border border-border"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 border border-border"></div>
                      </div>
                    )}
                    {formData.displayType === 'swatch' && (
                      <div className="flex gap-2">
                        <div className="px-3 py-1 border border-border rounded hover:border-primary cursor-pointer text-sm font-medium">S</div>
                        <div className="px-3 py-1 border border-border rounded hover:border-primary cursor-pointer text-sm font-medium bg-primary text-white">M</div>
                        <div className="px-3 py-1 border border-border rounded hover:border-primary cursor-pointer text-sm font-medium">L</div>
                      </div>
                    )}
                    {formData.displayType === 'progress' && (
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    )}
                    {(formData.displayType === 'image' || !['text', 'badge', 'color', 'swatch', 'progress'].includes(formData.displayType)) && (
                      <div className="text-sm text-text-muted italic">Preview rendering for {formData.displayType}</div>
                    )}
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
