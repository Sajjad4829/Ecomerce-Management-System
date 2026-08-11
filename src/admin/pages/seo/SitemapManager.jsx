import React, { useState } from 'react';
import { FiSave, FiMap, FiCheckCircle } from 'react-icons/fi';

export function SitemapManager() {
  const [config, setConfig] = useState({
    products: true,
    categories: true,
    collections: true,
    cmsPages: true,
    blog: true,
  });

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">XML Sitemap</h2>
          <p className="text-sm text-text-muted">Control which content types are included in your automatically generated sitemap.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiSave /> Save Configuration
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 mb-6">
        <FiMap className="text-primary mt-1" size={24} />
        <div>
          <h4 className="font-bold text-blue-900">Sitemap Status: Active</h4>
          <p className="text-sm text-blue-700 mt-1">Your sitemap is available at <a href="#" className="font-medium hover:underline">/sitemap.xml</a> (Placeholder). It includes approximately 2,341 URLs.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-background">
          <h3 className="font-bold text-text-primary">Included Content Types</h3>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries({
            products: 'Products',
            categories: 'Categories',
            collections: 'Collections',
            cmsPages: 'CMS Pages',
            blog: 'Blog Posts'
          }).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer p-4 border border-stone-100 rounded-lg hover:bg-background transition-colors">
              <div>
                <div className="font-bold text-text-primary">{label}</div>
                <div className="text-sm text-text-muted mt-1">Include active {label.toLowerCase()} in the sitemap.</div>
              </div>
              <div className="relative flex items-center h-5">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={config[key]} 
                  onChange={e => setConfig({...config, [key]: e.target.checked})} 
                />
                <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border-hover after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          ))}
        </div>
        <div className="px-6 py-4 bg-background border-t border-border text-sm text-text-muted">
          Note: System pages like Cart, Checkout, and Customer Accounts are automatically excluded from the sitemap.
        </div>
      </div>
    </div>
  );
}
