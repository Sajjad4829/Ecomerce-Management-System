import React from 'react';
import { FiLink, FiEdit2, FiSearch } from 'react-icons/fi';

export function SEOUrls() {
  const urls = [
    { id: 1, resource: 'Modern Sofa', slug: 'modern-sofa', currentUrl: '/products/modern-sofa', canonical: 'Automatic', status: 'Active' },
    { id: 2, resource: 'Summer Collection', slug: 'summer-collection', currentUrl: '/collections/summer-collection', canonical: 'Automatic', status: 'Active' },
    { id: 3, resource: 'About Us', slug: 'about-us', currentUrl: '/pages/about-us', canonical: 'https://aurorafurniture.com/about', status: 'Active' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">URL & Slugs</h2>
          <p className="text-sm text-text-muted">Manage URL paths and canonical links for your store.</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search URLs..." 
            className="w-64 pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background border-b border-border text-xs font-bold text-text-muted uppercase tracking-widest">
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">URL Path</th>
              <th className="px-6 py-4">Canonical</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {urls.map(url => (
              <tr key={url.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">{url.resource}</td>
                <td className="px-6 py-4 text-sm text-text-secondary flex items-center gap-2">
                  <FiLink className="text-text-muted" />
                  {url.currentUrl}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {url.canonical === 'Automatic' ? (
                    <span className="text-text-muted">Automatic</span>
                  ) : (
                    <span className="truncate max-w-[200px] block">{url.canonical}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                   <span className="px-2 py-1 text-xs font-medium rounded-md bg-success-soft text-success">
                    {url.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-text-muted hover:text-text-primary transition-colors" title="Edit Slug"><FiEdit2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
