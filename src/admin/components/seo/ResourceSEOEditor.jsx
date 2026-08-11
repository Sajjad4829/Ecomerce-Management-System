import React, { useState } from 'react';
import { FiSave, FiAlertCircle, FiSettings, FiShare2, FiCode } from 'react-icons/fi';
import { SEOFieldGroup, SlugField, CanonicalUrlField, RobotsDirectiveSelector, SEOPreview, SEOContentOptimizer } from './SEOSharedComponents';
import { OpenGraphEditor } from './OpenGraphEditor';
import { StructuredDataEditor } from './StructuredDataEditor';

export function ResourceSEOEditor({ resourceType, resourceName, initialData, onSave }) {
  const [seoData, setSeoData] = useState(initialData || {});
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (field, value) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General SEO', icon: FiSettings },
    { id: 'social', label: 'Social (OG)', icon: FiShare2 },
    { id: 'schema', label: 'Structured Data', icon: FiCode }
  ];

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
        <div>
          <h3 className="font-bold text-text-primary">{resourceType} SEO Configuration</h3>
          <p className="text-xs text-text-muted mt-0.5">Editing SEO for: {resourceName}</p>
        </div>
        <button 
          onClick={() => onSave(seoData)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <FiSave /> Save SEO
        </button>
      </div>

      <div className="flex border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id ? 'border-stone-900 text-text-primary' : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SEOFieldGroup label="SEO Title" description="The main title displayed in search engine results. Keep it between 50-60 characters.">
                <input
                  type="text"
                  value={seoData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Modern Leather Sofa | Aurora Furniture"
                  className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </SEOFieldGroup>

              <SEOFieldGroup label="Meta Description" description="A summary of the page content. Keep it between 120-160 characters.">
                <textarea
                  value={seoData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Discover our premium modern leather sofa..."
                  rows={3}
                  className="w-full p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </SEOFieldGroup>

              <SEOFieldGroup label="URL Slug" description="The URL path for this resource.">
                <SlugField 
                  value={seoData.slug} 
                  onChange={(val) => handleChange('slug', val)} 
                  resourceName={resourceName} 
                />
              </SEOFieldGroup>

              <SEOFieldGroup label="Canonical URL" description="Specify the preferred version of a web page to prevent duplicate content issues.">
                <CanonicalUrlField 
                  value={seoData.canonical} 
                  onChange={(val) => handleChange('canonical', val)} 
                  defaultUrl={`https://aurorafurniture.com/${seoData.slug || ''}`}
                />
              </SEOFieldGroup>

              <SEOFieldGroup label="Robots Directives" description="Control how search engines crawl and index this page.">
                <RobotsDirectiveSelector 
                  value={seoData.robots} 
                  onChange={(val) => handleChange('robots', val)} 
                />
              </SEOFieldGroup>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-text-primary mb-4 text-sm">Search Result Preview</h4>
                <SEOPreview 
                  title={seoData.title} 
                  description={seoData.description} 
                  url={`https://aurorafurniture.com/${seoData.slug || ''}`} 
                />
              </div>

              <SEOContentOptimizer seoData={seoData} content={resourceName} />
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <OpenGraphEditor seoData={seoData} onChange={setSeoData} />
        )}

        {activeTab === 'schema' && (
          <StructuredDataEditor seoData={seoData} onChange={setSeoData} />
        )}
      </div>
    </div>
  );
}
