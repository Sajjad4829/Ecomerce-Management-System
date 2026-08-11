import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiSave, FiInfo, FiImage, FiSearch, FiLayers, FiCalendar 
} from 'react-icons/fi';
import CatalogStatusBadge from '../../../components/commerce/shared/CatalogStatusBadge';
import CollectionRuleBuilder from '../../../components/commerce/collections/CollectionRuleBuilder';

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

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
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
    seoDescription: ''
  });

  useEffect(() => {
    if (!isNew) {
      setFormData({
        name: 'The Sanctuary Collection',
        slug: 'the-sanctuary',
        description: 'A curated selection of minimalist, calming furniture for the modern home.',
        type: 'automatic',
        status: 'published',
        featured: true,
        startDate: '2026-01-01',
        endDate: '',
        seoTitle: 'The Sanctuary Collection | Aurelia',
        seoDescription: 'Discover the Sanctuary Collection. Minimalist premium furniture.'
      });
    }
  }, [id, isNew]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/catalog/collections');
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#F7F5F2]">
      <header className="shrink-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/catalog/collections')}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-50"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-xl text-stone-900">
                {isNew ? 'Create Collection' : formData.name}
              </h1>
              {!isNew && <CatalogStatusBadge status={formData.status} />}
            </div>
            <p className="text-xs text-stone-500 font-mono mt-1">
              {isNew ? 'New Collection' : `Slug: /${formData.slug}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm disabled:opacity-50"
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
        <nav className="w-64 shrink-0 bg-white border-r border-stone-200 overflow-y-auto py-6">
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
                        ? 'bg-amber-50 text-amber-900' 
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-amber-600' : 'text-stone-400'} />
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
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-8"
              >
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Basic Information</h2>
                      <p className="text-sm text-stone-500">Core details used for the collection.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Collection Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">URL Slug</label>
                        <input 
                          type="text" 
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-mono text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Description</label>
                        <textarea 
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 resize-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-stone-900">Featured Collection</p>
                          <p className="text-xs text-stone-500">Highlight this collection on the homepage or special menus.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-stone-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-900"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Collection Media</h2>
                      <p className="text-sm text-stone-500">Visual assets used in grids and headers.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Hero Image (Desktop)</label>
                        <div className="border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 p-12 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-all cursor-pointer aspect-[21/9]">
                          <FiImage size={32} className="text-stone-400 mb-4" />
                          <h3 className="text-sm font-bold text-stone-900">Upload Hero Image</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Hero Image (Mobile)</label>
                          <div className="border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 p-8 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-all cursor-pointer aspect-[3/4]">
                            <FiImage size={24} className="text-stone-400 mb-2" />
                            <h3 className="text-sm font-bold text-stone-900">Upload Mobile</h3>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Thumbnail</label>
                          <div className="border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 p-8 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-all cursor-pointer aspect-square">
                            <FiImage size={24} className="text-stone-400 mb-2" />
                            <h3 className="text-sm font-bold text-stone-900">Upload Thumbnail</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Products & Rules</h2>
                      <p className="text-sm text-stone-500">Define how products are added to this collection.</p>
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
                          <div className="p-4 rounded-xl border-2 peer-checked:border-stone-900 peer-checked:bg-stone-50 border-stone-200 hover:border-stone-300 transition-all text-center">
                            <h3 className="font-bold text-stone-900 mb-1">Manual</h3>
                            <p className="text-xs text-stone-500">Handpick products one by one.</p>
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
                          <div className="p-4 rounded-xl border-2 peer-checked:border-stone-900 peer-checked:bg-stone-50 border-stone-200 hover:border-stone-300 transition-all text-center">
                            <h3 className="font-bold text-stone-900 mb-1">Automatic</h3>
                            <p className="text-xs text-stone-500">Create rules to populate products.</p>
                          </div>
                        </label>
                      </div>

                      <div className="pt-6">
                        {formData.type === 'automatic' ? (
                          <CollectionRuleBuilder />
                        ) : (
                          <div className="border border-stone-200 rounded-xl p-8 text-center bg-stone-50">
                            <h3 className="font-bold text-stone-900 mb-2">Manual Selection</h3>
                            <p className="text-sm text-stone-500 mb-4">Search and add products to this collection.</p>
                            <button className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors">
                              Browse Products
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">Scheduling</h2>
                      <p className="text-sm text-stone-500">Control when this collection is visible to customers.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Publish Date</label>
                        <input 
                          type="datetime-local" 
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">End Date (Optional)</label>
                        <input 
                          type="datetime-local" 
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-stone-900 mb-1">SEO Settings</h2>
                      <p className="text-sm text-stone-500">Configure search engine visibility.</p>
                    </div>

                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg mb-6">
                      <p className="text-xs text-blue-800 mb-1 font-medium">{`https://aurelia.com/collections/${formData.slug}`}</p>
                      <p className="text-lg text-blue-600 font-semibold mb-1">{formData.seoTitle || formData.name}</p>
                      <p className="text-sm text-stone-600 line-clamp-2">{formData.seoDescription || formData.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">SEO Title</label>
                        <input 
                          type="text" 
                          value={formData.seoTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-medium text-stone-900"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">SEO Description</label>
                        <textarea 
                          rows={3}
                          value={formData.seoDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm text-stone-900 resize-none"
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
