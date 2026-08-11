import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiGlobe 
} from 'react-icons/fi';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FiInfo },
  { id: 'media', label: 'Brand Identity', icon: FiImage },
  { id: 'info', label: 'Brand Details', icon: FiGlobe },
  { id: 'seo', label: 'SEO', icon: FiSearch }
];

export default function BrandEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'draft',
    featured: false,
    website: '',
    country: '',
    foundedYear: '',
    brandStory: '',
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    if (!isNew) {
      setFormData({
        name: 'Aurelia Signature',
        slug: 'aurelia-signature',
        description: 'Our in-house premium collection featuring the finest materials.',
        status: 'published',
        featured: true,
        website: 'https://aurelia.com',
        country: 'Italy',
        foundedYear: '2015',
        brandStory: 'Born from a desire to create uncompromising luxury furniture...',
        seoTitle: 'Aurelia Signature | Premium Furniture',
        seoDescription: 'Discover Aurelia Signature.'
      });
    }
  }, [id, isNew]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/catalog/brands');
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      <header className="shrink-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/brands')}
            className="p-2 -ml-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-background"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-xl text-text-primary">
                {isNew ? 'Create Brand' : formData.name}
              </h1>
              {!isNew && <CatalogStatusBadge status={formData.status} />}
            </div>
            <p className="text-xs text-text-muted font-mono mt-1">
              {isNew ? 'New Brand' : `Slug: /${formData.slug}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold text-text-secondary focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
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
            {isSaving ? 'Saving...' : 'Save Brand'}
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
                      <p className="text-sm text-text-muted">Core details for this brand.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Brand Name</label>
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
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Short Description</label>
                        <textarea 
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-text-primary resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-text-primary">Featured Brand</p>
                          <p className="text-xs text-text-muted">Highlight this brand on the homepage.</p>
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
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Brand Identity</h2>
                      <p className="text-sm text-text-muted">Visual assets used for the brand.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex gap-6 items-start">
                        <div className="w-1/3">
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Brand Logo</label>
                          <div className="border-2 border-dashed border-border-hover rounded-xl bg-background p-6 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-all cursor-pointer aspect-square">
                            <FiImage size={24} className="text-text-muted mb-2" />
                            <h3 className="text-sm font-bold text-text-primary">Upload Logo</h3>
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Brand Banner</label>
                          <div className="border-2 border-dashed border-border-hover rounded-xl bg-background p-6 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-all cursor-pointer h-full min-h-[160px]">
                            <FiImage size={24} className="text-text-muted mb-2" />
                            <h3 className="text-sm font-bold text-text-primary">Upload Banner</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-text-primary mb-1">Brand Details</h2>
                      <p className="text-sm text-text-muted">Additional info and brand story.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Website</label>
                          <input 
                            type="text" 
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                            placeholder="https://"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Country of Origin</label>
                          <input 
                            type="text" 
                            value={formData.country}
                            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Founded Year</label>
                          <input 
                            type="text" 
                            value={formData.foundedYear}
                            onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-text-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Brand Story</label>
                        <textarea 
                          rows={6}
                          value={formData.brandStory}
                          onChange={(e) => setFormData(prev => ({ ...prev, brandStory: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-text-primary resize-none"
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
                      <p className="text-xs text-blue-800 mb-1 font-medium">{`https://aurelia.com/brands/${formData.slug}`}</p>
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
    </div>
  );
}
