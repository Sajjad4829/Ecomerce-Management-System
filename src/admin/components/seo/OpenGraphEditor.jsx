import React from 'react';
import { SEOFieldGroup, SocialPreview } from './SEOSharedComponents';
import { FiImage } from 'react-icons/fi';

export function OpenGraphEditor({ seoData, onChange }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <SEOFieldGroup label="Open Graph Title" description="The title used when this page is shared on social networks.">
          <input
            type="text"
            value={seoData?.ogTitle || ''}
            onChange={(e) => onChange({ ...seoData, ogTitle: e.target.value })}
            placeholder={seoData?.title || "e.g. Modern Sofa - Aurora Furniture"}
            className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </SEOFieldGroup>

        <SEOFieldGroup label="Open Graph Description" description="The description used for social sharing.">
          <textarea
            value={seoData?.ogDescription || ''}
            onChange={(e) => onChange({ ...seoData, ogDescription: e.target.value })}
            placeholder={seoData?.description || "Description..."}
            rows={3}
            className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </SEOFieldGroup>

        <SEOFieldGroup label="Open Graph Image" description="Recommended size: 1200x630 pixels.">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-stone-100 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors flex items-center gap-2">
                <FiImage /> Select from Media
              </button>
              {seoData?.ogImage && (
                 <button onClick={() => onChange({ ...seoData, ogImage: null })} className="px-4 py-2 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                  Remove
                </button>
              )}
            </div>
            {seoData?.ogImage && (
              <div className="w-32 h-20 bg-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                <img src={seoData.ogImage} alt="OG" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </SEOFieldGroup>
      </div>

      <div>
        <h4 className="font-bold text-stone-900 mb-4 text-sm">Social Preview</h4>
        <SocialPreview 
          title={seoData?.ogTitle || seoData?.title} 
          description={seoData?.ogDescription || seoData?.description} 
          image={seoData?.ogImage} 
        />
      </div>
    </div>
  );
}
