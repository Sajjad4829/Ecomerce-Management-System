import React from 'react';
import { SEOHealthCard } from '../../components/seo/SEOHealthCard';
import { FiExternalLink, FiBarChart2 } from 'react-icons/fi';

export function SEODashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-1">SEO Overview</h2>
        <p className="text-sm text-stone-500">Monitor your store's search engine optimization health and visibility.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="text-sm font-medium text-stone-500 mb-1">SEO Health Score (Placeholder)</div>
          <div className="text-3xl font-bold text-stone-900">85<span className="text-sm font-normal text-stone-500">/100</span></div>
        </div>
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="text-sm font-medium text-stone-500 mb-1">Indexed Pages (Placeholder)</div>
          <div className="text-3xl font-bold text-stone-900">2,341</div>
        </div>
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="text-sm font-medium text-stone-500 mb-1">Organic Traffic (Placeholder)</div>
          <div className="text-3xl font-bold text-stone-900">12.5k</div>
        </div>
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="text-sm font-medium text-stone-500 mb-1">Active Redirects</div>
          <div className="text-3xl font-bold text-stone-900">42</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-stone-900 mb-4">Health Checks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SEOHealthCard 
            title="Metadata" 
            score={75} 
            issues={['12 products missing meta descriptions', '4 duplicate titles detected']} 
            good={[]} 
          />
          <SEOHealthCard 
            title="URLs & Links" 
            score={95} 
            issues={[]} 
            good={['No broken internal links found', 'All canonical tags valid']} 
          />
          <SEOHealthCard 
            title="Content Optimization" 
            score={60} 
            issues={['25 pages have low word count', '8 pages missing H1 tag']} 
            good={[]} 
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4">
        <FiBarChart2 className="text-blue-600 mt-1" size={24} />
        <div>
          <h4 className="font-bold text-blue-900">Search Console Integration Required</h4>
          <p className="text-sm text-blue-700 mt-1">To see real organic traffic, impressions, and exact indexation data, please connect your Google Search Console account.</p>
          <button className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
            Connect Search Console <FiExternalLink />
          </button>
        </div>
      </div>
    </div>
  );
}
