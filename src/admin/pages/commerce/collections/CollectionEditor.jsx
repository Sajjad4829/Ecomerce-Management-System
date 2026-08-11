import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiLayers, FiCalendar, FiEye } from 'react-icons/fi';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import CollectionRuleBuilder from '../../../components/commerce/collections/CollectionRuleBuilder';
import ManualProductSelector from '../../../components/commerce/collections/ManualProductSelector';
import { useCollections, generateSlug } from '../../../context/commerce/CollectionContext';
import CollectionPreview from '../../../components/commerce/collections/CollectionPreview';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FiInfo },
  { id: 'media', label: 'Media & Banner', icon: FiImage },
  { id: 'products', label: 'Products & Rules', icon: FiLayers },
  { id: 'schedule', label: 'Scheduling', icon: FiCalendar },
  { id: 'seo', label: 'SEO', icon: FiSearch }
];

export default function CollectionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const { collections, updateCollection, addCollection } = useCollections();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        type: formData.type,
        status: formData.status,
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
      setIsSaving(false);
      navigate('/admin/catalog/collections');
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      <header className="shrink-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/collections')}
            className="p-2 -ml-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-background"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-xl text-text-primary">
                {isNew ? 'Create Collection' : formData.name}
              </h1>
              {!isNew && <CatalogStatusBadge status={formData.status} />}
            </div>
            <p className="text-xs text-text-muted font-mono mt-1">
              {isNew ? 'New Collection' : `Slug: /${formData.slug}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-secondary rounded-lg text-sm font-semibold hover:bg-background transition-colors shadow-sm"
          >
            <FiEye size={16} /> Live Preview
          </button>
          <select 
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold text-text-secondary focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FiSave size={16} />
            )}
            {isSaving ? 'Saving...' : 'Save Collection'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 shrink-0 bg-surface border-r border-border overflow-y-auto py-6">
          <ul className="space-y-1 px-4">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-warning-soft text-amber-900' 
                        : 'text-text-secondary hover:bg-background hover:text-text-primary'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-warning' : 'text-text-muted'} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface rounded-xl border border-border shadow-sm p-8"
              >
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Basic Information</h2>
                      <p className="text-sm text-text-muted">Core details used for the collection.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Collection Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">URL Slug</label>
                        <input 
                          type="text" 
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-text-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Description</label>
                        <textarea 
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-text-primary resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-text-primary">Featured Collection</p>
                          <p className="text-xs text-text-muted">Highlight this collection on the homepage or special menus.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Collection Media</h2>
                      <p className="text-sm text-text-muted">Visual assets used in grids and headers.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Hero / Banner Image URL</label>
                        <div className="flex items-center gap-4">
                          {formData.bannerImage ? (
                            <img src={formData.bannerImage} alt="Banner" className="w-32 h-20 object-cover rounded-lg border border-border" />
                          ) : (
                            <div className="w-32 h-20 bg-stone-100 rounded-lg border border-border flex items-center justify-center">
                              <FiImage className="text-text-muted" />
                            </div>
                          )}
                          <input 
                            type="text" 
                            value={formData.bannerImage}
                            onChange={(e) => setFormData(prev => ({ ...prev, bannerImage: e.target.value }))}
                            placeholder="https://images.unsplash.com/..."
                            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Thumbnail / Cover Image URL</label>
                        <div className="flex items-center gap-4">
                          {formData.image ? (
                            <img src={formData.image} alt="Cover" className="w-20 h-20 object-cover rounded-lg border border-border" />
                          ) : (
                            <div className="w-20 h-20 bg-stone-100 rounded-lg border border-border flex items-center justify-center">
                              <FiImage className="text-text-muted" />
                            </div>
                          )}
                          <input 
                            type="text" 
                            value={formData.image}
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://images.unsplash.com/..."
                            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Products & Rules</h2>
                      <p className="text-sm text-text-muted">Define how products are added to this collection.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="radio" 
                            name="collectionType" 
                            className="sr-only peer"
                            checked={formData.type === 'manual'}
                            onChange={() => setFormData(prev => ({ ...prev, type: 'manual' }))}
                          />
                          <div className="p-4 rounded-xl border-2 peer-checked:border-stone-900 peer-checked:bg-background border-border hover:border-border-hover transition-all text-center">
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
                            onChange={() => setFormData(prev => ({ ...prev, type: 'automatic' }))}
                          />
                          <div className="p-4 rounded-xl border-2 peer-checked:border-stone-900 peer-checked:bg-background border-border hover:border-border-hover transition-all text-center">
                            <h3 className="font-bold text-text-primary mb-1">Automatic</h3>
                            <p className="text-xs text-text-muted">Create rules to populate products.</p>
                          </div>
                        </label>
                      </div>

                      <div className="pt-6">
                        {formData.type === 'automatic' ? (
                          <CollectionRuleBuilder 
                            rules={formData.rules}
                            onChangeRules={(rules) => setFormData(prev => ({ ...prev, rules }))}
                            matchMode={formData.matchMode}
                            onChangeMatchMode={(matchMode) => setFormData(prev => ({ ...prev, matchMode }))}
                          />
                        ) : (
                          <ManualProductSelector 
                            selectedProductIds={formData.productIds}
                            onChange={(productIds) => setFormData(prev => ({ ...prev, productIds }))}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Scheduling</h2>
                      <p className="text-sm text-text-muted">Control when this collection is visible to customers.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Publish Date</label>
                        <input 
                          type="datetime-local" 
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">End Date (Optional)</label>
                        <input 
                          type="datetime-local" 
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">SEO Settings</h2>
                      <p className="text-sm text-text-muted">Configure search engine visibility.</p>
                    </div>

                    <div className="p-4 bg-background border border-border rounded-lg mb-6">
                      <p className="text-xs text-blue-800 mb-1 font-medium">{`https://aurelia.com/collections/${formData.slug}`}</p>
                      <p className="text-lg text-primary font-semibold mb-1">{formData.seoTitle || formData.name}</p>
                      <p className="text-sm text-text-secondary line-clamp-2">{formData.seoDescription || formData.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">SEO Title</label>
                        <input 
                          type="text" 
                          value={formData.seoTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">SEO Description</label>
                        <textarea 
                          rows={3}
                          value={formData.seoDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-text-primary resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <CollectionPreview 
        collection={{ ...formData, id: isNew ? 'preview' : id }}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}
