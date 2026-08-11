import { useState } from 'react';
import { FiSettings, FiCheck, FiImage, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function SEOSettings() {
  const [formData, setFormData] = useState({
    siteName: 'Aurelian Furniture',
    siteDescription: 'Premium modern furniture designed for the enterprise workspace and luxury homes.',
    defaultProductTitle: '{productName} | {brandName} | {siteName}',
    defaultCategoryTitle: '{categoryName} | {siteName}',
    defaultRobots: 'index, follow'
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/seo" className="text-sm font-medium text-gray-500 hover:text-black">SEO Engine</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">SEO Settings</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Configure global site identity, fallback metadata, and SEO title templates.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm">
            <FiCheck size={16} /> Save Settings
          </button>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Site Identity */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiGlobe className="text-gray-400" size={24} />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Site Identity</h2>
              <p className="text-sm text-gray-500">How your store is represented globally.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Site Name</label>
              <input 
                type="text" 
                value={formData.siteName}
                onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
              />
              <p className="text-xs text-gray-500 mt-2">Used as the {'{siteName}'} variable in templates.</p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Default Meta Description</label>
              <textarea 
                value={formData.siteDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-medium text-[#1A1A1A]"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">Fallback description if an entity does not have one.</p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Default Social Image (OG Image)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-[#F7F5F2]">
                <FiImage size={24} className="text-gray-400 mb-2" />
                <p className="text-sm font-bold text-[#1A1A1A]">Select Default Image</p>
                <p className="text-xs text-gray-500 mt-1">Used when sharing a page without its own image.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Title Templates */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiSettings className="text-gray-400" size={24} />
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">Title Templates</h2>
              <p className="text-sm text-gray-500">Automate SEO titles using variables.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#F7F5F2] p-4 rounded-lg text-sm text-gray-700 font-mono mb-4">
              Variables: {'{siteName}'}, {'{productName}'}, {'{categoryName}'}, {'{brandName}'}, {'{currentYear}'}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Product Pages</label>
              <input 
                type="text" 
                value={formData.defaultProductTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, defaultProductTitle: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-mono text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Category Pages</label>
              <input 
                type="text" 
                value={formData.defaultCategoryTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, defaultCategoryTitle: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-mono text-[#1A1A1A]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
