import { useState } from 'react';
import { FiX, FiCheck, FiSearch, FiGlobe, FiShare2, FiCode, FiSliders, FiAward, FiSave } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import SERPPreview from './SERPPreview';
import SocialPreview from './SocialPreview';
import SEOScoreCard from './SEOScoreCard';
import SchemaBuilder from './SchemaBuilder';
import RobotsCanonicalEditor from './RobotsCanonicalEditor';

export default function SEOEditorModal({
  isOpen,
  onClose,
  resource = null, // { id, type: 'products', title, slug, seoTitle, metaDesc, focusKeyword, ogImage, canonicalUrl }
  onSave,
  onSelectMediaClick
}) {
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'social' | 'schema' | 'robots' | 'audit'

  // Editable Form State initialized from resource
  const [formData, setFormData] = useState({
    title: resource?.seoTitle || resource?.title || "Aurelian Modular Velvet Sofa | Luxury Living Room",
    metaDesc: resource?.metaDesc || "Discover the Aurelian modular velvet sofa in cream. Hand-crafted in Italy with sustainable solid oak frame.",
    focusKeyword: resource?.focusKeyword || "velvet sofa",
    slug: resource?.slug || "aurelian-modular-velvet-sofa",
    ogTitle: resource?.ogTitle || resource?.seoTitle || resource?.title || "",
    ogDesc: resource?.ogDesc || resource?.metaDesc || "",
    ogImage: resource?.ogImage || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: resource?.canonicalUrl || "",
    isNoIndex: resource?.isNoIndex || false,
    isNoFollow: resource?.isNoFollow || false
  });

  if (!isOpen || !resource) return null;

  const handleSave = () => {
    onSave({
      ...resource,
      seoTitle: formData.title,
      metaDesc: formData.metaDesc,
      focusKeyword: formData.focusKeyword,
      slug: formData.slug,
      ogTitle: formData.ogTitle,
      ogDesc: formData.ogDesc,
      ogImage: formData.ogImage,
      canonicalUrl: formData.canonicalUrl,
      isNoIndex: formData.isNoIndex,
      isNoFollow: formData.isNoFollow
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Overlay Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Drawer Panel */}
      <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col border-l border-black/10 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono font-bold uppercase text-gray-600">
                {resource.type || 'Page'}
              </span>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] truncate max-w-sm">
                SEO Configuration — {resource.title}
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Target route: <code className="font-mono text-black">/{resource.type || 'pages'}/{formData.slug}</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded-lg transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-black/5 px-6 bg-white shrink-0 text-xs font-bold text-gray-500 overflow-x-auto">
          {[
            { id: 'basic', label: 'Basic SEO & SERP', icon: FiSearch },
            { id: 'social', label: 'Social & OpenGraph', icon: FiShare2 },
            { id: 'schema', label: 'Structured Data', icon: FiCode },
            { id: 'robots', label: 'Robots & Canonical', icon: FiSliders },
            { id: 'audit', label: 'Audit Score', icon: FiAward }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-3 border-b-2 font-serif transition-all mr-6 flex items-center gap-2 whitespace-nowrap cursor-pointer",
                  activeTab === tab.id
                    ? "border-[#1A1A1A] text-[#1A1A1A] font-bold"
                    : "border-transparent hover:text-[#1A1A1A]"
                )}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Workspace */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50/30">
          
          {/* TAB 1: Basic SEO */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              
              {/* Form Input Fields */}
              <div className="bg-white p-5 border border-black/10 rounded-xl shadow-2xs space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                    <span>SEO Title Tag</span>
                    <span className="text-[10px] text-gray-400 font-mono">{formData.title.length} / 60 chars</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:border-black/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Meta Description</span>
                    <span className="text-[10px] text-gray-400 font-mono">{formData.metaDesc.length} / 160 chars</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.metaDesc}
                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-black/30 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Focus Target Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. velvet sofa"
                      value={formData.focusKeyword}
                      onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SERP Search Preview Component */}
              <SERPPreview
                title={formData.title}
                description={formData.metaDesc}
                slug={formData.slug}
                resourceType={resource.type || 'products'}
              />
            </div>
          )}

          {/* TAB 2: Social & OpenGraph */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="bg-white p-5 border border-black/10 rounded-xl shadow-2xs space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Social Title (OG Title)
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle || formData.title}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Social Description (OG Description)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.ogDesc || formData.metaDesc}
                    onChange={(e) => setFormData({ ...formData, ogDesc: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none resize-none"
                  />
                </div>
              </div>

              <SocialPreview
                ogTitle={formData.ogTitle || formData.title}
                ogDescription={formData.ogDesc || formData.metaDesc}
                ogImage={formData.ogImage}
                slug={formData.slug}
                onSelectImageClick={onSelectMediaClick}
              />
            </div>
          )}

          {/* TAB 3: Schema Markup */}
          {activeTab === 'schema' && (
            <SchemaBuilder
              initialType={resource.type === 'products' ? 'Product' : 'WebPage'}
              resourceData={resource}
            />
          )}

          {/* TAB 4: Robots & Canonical */}
          {activeTab === 'robots' && (
            <RobotsCanonicalEditor
              indexStatus={formData.isNoIndex ? 'noindex' : 'index'}
              followStatus={formData.isNoFollow ? 'nofollow' : 'follow'}
              customCanonical={formData.canonicalUrl}
              slug={formData.slug}
              onChangeRobots={(r) => setFormData({ ...formData, isNoIndex: r.noindex, isNoFollow: r.nofollow })}
            />
          )}

          {/* TAB 5: Audit Score */}
          {activeTab === 'audit' && (
            <SEOScoreCard
              title={formData.title}
              description={formData.metaDesc}
              focusKeyword={formData.focusKeyword}
              slug={formData.slug}
              canonicalUrl={formData.canonicalUrl}
              ogImage={formData.ogImage}
              hasSchema={true}
            />
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-black/5 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-400">All changes ready for deployment</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <FiSave size={14} />
              <span>Save SEO Settings</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
