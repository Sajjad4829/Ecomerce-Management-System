import React, { useState } from 'react';
import { FiSave, FiGlobe } from 'react-icons/fi';
import { SEOFieldGroup } from '../../components/seo/SEOSharedComponents';

export function GlobalSettings() {
  const [settings, setSettings] = useState({
    siteTitle: 'Aurora Premium Furniture',
    separator: '|',
    defaultRobots: 'index, follow'
  });

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Global SEO Settings</h2>
          <p className="text-sm text-text-muted">Configure site-wide SEO defaults and fallbacks.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiSave /> Save Settings
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-6">
        <SEOFieldGroup label="Site Title" description="The base title of your website, often appended to page titles.">
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
            className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </SEOFieldGroup>

        <SEOFieldGroup label="Title Separator" description="Character used to separate the page title from the site title.">
          <select
            value={settings.separator}
            onChange={(e) => setSettings({...settings, separator: e.target.value})}
            className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          >
            <option value="|">| (Pipe)</option>
            <option value="-">- (Hyphen)</option>
            <option value="&ndash;">&ndash; (En Dash)</option>
            <option value="&mdash;">&mdash; (Em Dash)</option>
            <option value="&bull;">&bull; (Bullet)</option>
          </select>
        </SEOFieldGroup>

        <SEOFieldGroup label="Default Robots Directives" description="Applied to pages that do not have specific robots directives set.">
          <select
            value={settings.defaultRobots}
            onChange={(e) => setSettings({...settings, defaultRobots: e.target.value})}
            className="w-full max-w-md p-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          >
            <option value="index, follow">Index, Follow</option>
            <option value="noindex, follow">NoIndex, Follow</option>
          </select>
        </SEOFieldGroup>
        
        <div className="pt-4 border-t border-border">
           <h4 className="font-bold text-text-primary mb-4 text-sm">Example Preview</h4>
           <div className="text-[20px] text-[#1a0dab] font-medium hover:underline cursor-pointer">
              Modern Leather Sofa {settings.separator} {settings.siteTitle}
           </div>
        </div>
      </div>
    </div>
  );
}
