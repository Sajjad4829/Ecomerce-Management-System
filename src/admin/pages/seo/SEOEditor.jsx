import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiSave, FiAlertCircle, FiSettings, FiImage, FiShare2, FiMonitor } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import SERPPreview from '../../components/seo/SERPPreview';

export default function SEOEditor() {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: 'Oasis Lounge Chair | Aurelian',
    description: 'Experience premium comfort with the Oasis Lounge Chair. Upholstered in full-grain Italian leather with a solid walnut frame.',
    slug: 'oasis-lounge-chair',
    canonical: 'https://aurelian.com/products/oasis-lounge-chair',
    focusKeyword: 'leather lounge chair',
    index: true,
    follow: true
  });

  const [activeTab, setActiveTab] = useState('basic');

  const getTitleColor = () => {
    const len = formData.title.length;
    if (len === 0) return 'text-danger';
    if (len < 30) return 'text-amber-500';
    if (len > 60) return 'text-danger';
    return 'text-success';
  };

  const getDescriptionColor = () => {
    const len = formData.description.length;
    if (len === 0) return 'text-danger';
    if (len < 50) return 'text-amber-500';
    if (len > 160) return 'text-danger';
    return 'text-success';
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-24">
      <div className="sticky top-0 z-20 bg-background pt-4 pb-4 border-b border-black/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/seo/entities" className="p-2 bg-surface border border-black/10 rounded-lg text-text-muted hover:text-black hover:border-black/20 transition-all shadow-sm">
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-gray-200 text-text-secondary text-[10px] font-bold uppercase tracking-wider rounded">Product</span>
            </div>
            <h1 className="text-xl font-serif font-bold text-text-primary mt-0.5">
              Oasis Lounge Chair
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-text-secondary hover:text-black text-sm font-medium transition-colors">
            Discard
          </button>
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <FiCheck size={16} /> Save SEO Settings
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-surface rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="flex border-b border-black/5">
              {[
                { id: 'basic', label: 'Basic SEO', icon: FiMonitor },
                { id: 'advanced', label: 'Advanced', icon: FiSettings },
                { id: 'social', label: 'Social (OG)', icon: FiShare2 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? 'text-text-primary border-b-2 border-[#1A1A1A]' : 'text-text-muted hover:bg-background'
                  }`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase">SEO Title</label>
                      <span className={`text-xs font-mono font-bold ${getTitleColor()}`}>
                        {formData.title.length} / 60
                      </span>
                    </div>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                    />
                    <p className="text-xs text-text-muted mt-2">Optimal length is 50-60 characters.</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase">Meta Description</label>
                      <span className={`text-xs font-mono font-bold ${getDescriptionColor()}`}>
                        {formData.description.length} / 160
                      </span>
                    </div>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                      rows={3}
                    />
                    <p className="text-xs text-text-muted mt-2">Optimal length is 150-160 characters.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">URL Slug</label>
                    <div className="flex items-center">
                      <span className="px-4 py-2.5 bg-gray-100 border border-transparent rounded-l-lg text-sm text-text-muted shrink-0">
                        aurelian.com/products/
                      </span>
                      <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-background border-transparent rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Focus Keyword</label>
                    <input 
                      type="text" 
                      value={formData.focusKeyword}
                      onChange={(e) => setFormData(prev => ({ ...prev, focusKeyword: e.target.value }))}
                      placeholder="e.g. leather lounge chair"
                      className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">Canonical URL</label>
                    <input 
                      type="text" 
                      value={formData.canonical}
                      onChange={(e) => setFormData(prev => ({ ...prev, canonical: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                    />
                    <p className="text-xs text-text-muted mt-2">Leave blank to default to the current URL.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer">
                      <div>
                        <span className="text-sm font-bold text-text-primary block">Index</span>
                        <span className="text-xs text-text-muted">Allow search engines to index this page.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.index}
                        onChange={(e) => setFormData(prev => ({ ...prev, index: e.target.checked }))}
                        className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-background rounded-xl border border-black/5 cursor-pointer">
                      <div>
                        <span className="text-sm font-bold text-text-primary block">Follow</span>
                        <span className="text-xs text-text-muted">Allow search engines to follow links.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.follow}
                        onChange={(e) => setFormData(prev => ({ ...prev, follow: e.target.checked }))}
                        className="w-5 h-5 rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" 
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div className="bg-warning-soft border border-amber-100 p-4 rounded-lg flex items-start gap-3">
                    <FiAlertCircle className="text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      These settings control how this page appears when shared on social media platforms like Facebook, Twitter, and LinkedIn. If left blank, they will default to the basic SEO settings.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">OG Title</label>
                    <input 
                      type="text" 
                      placeholder={formData.title}
                      className="w-full px-4 py-2.5 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">OG Description</label>
                    <textarea 
                      placeholder={formData.description}
                      className="w-full px-4 py-3 bg-background border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-text-primary"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase mb-2">OG Image</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-background transition-colors cursor-pointer bg-background">
                      <FiImage size={24} className="text-text-muted mb-2" />
                      <p className="text-sm font-bold text-text-primary">Select Social Image</p>
                      <p className="text-xs text-text-muted mt-1">Recommended: 1200x630px</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Column: Previews & Analysis */}
        <div className="space-y-6">
          <SERPPreview 
            title={formData.title}
            description={formData.description}
            url={`aurelian.com/products/${formData.slug}`}
          />

          <div className="bg-surface rounded-xl border border-black/5 shadow-sm p-6">
            <h3 className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider mb-4">SEO Score</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-xl font-bold text-text-primary">85</span>
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Good</p>
                <p className="text-xs text-text-muted">Your SEO is well optimized.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <FiCheck className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-text-secondary">Title length is optimal.</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <FiCheck className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-text-secondary">Description length is optimal.</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <FiCheck className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-text-secondary">Focus keyword appears in title.</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-text-secondary">Focus keyword not in slug.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
