import React, { useState } from 'react';
import { FiLink, FiGlobe, FiSmartphone, FiMonitor } from 'react-icons/fi';
import { generateSlug, validateSlug, analyzeSEOContent } from '../../services/seo/SEOValidation';

export const SEOFieldGroup = ({ label, description, children }) => (
  <div className="mb-6 last:mb-0">
    <label className="block text-sm font-bold text-stone-900 mb-1">{label}</label>
    {description && <p className="text-xs text-stone-500 mb-3">{description}</p>}
    {children}
  </div>
);

export const SlugField = ({ value, onChange, resourceName }) => {
  const [error, setError] = useState(null);

  const handleGenerate = () => {
    if (resourceName) {
      const slug = generateSlug(resourceName);
      onChange(slug);
      const val = validateSlug(slug);
      setError(val.error || null);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    const validation = validateSlug(val);
    setError(validation.error || null);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLink className="text-stone-400" />
          </div>
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder="e.g. modern-sofa"
            className={`w-full pl-10 pr-4 py-2 bg-stone-50 border ${error ? 'border-red-300' : 'border-stone-200'} rounded-lg text-sm focus:outline-none focus:border-stone-400`}
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="px-4 py-2 bg-stone-100 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors whitespace-nowrap"
        >
          Auto-generate
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const CanonicalUrlField = ({ value, onChange, defaultUrl }) => (
  <div className="space-y-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <input 
        type="radio" 
        name="canonical_type" 
        checked={!value || value === defaultUrl} 
        onChange={() => onChange(null)} 
        className="text-stone-900 focus:ring-stone-900"
      />
      <span className="text-sm text-stone-900 font-medium">Automatic ({defaultUrl || 'default path'})</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <input 
        type="radio" 
        name="canonical_type" 
        checked={!!value && value !== defaultUrl} 
        onChange={() => onChange(value || 'https://')} 
        className="text-stone-900 focus:ring-stone-900"
      />
      <span className="text-sm text-stone-900 font-medium">Custom URL</span>
    </label>
    {!!value && value !== defaultUrl && (
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://aurorafurniture.com/custom-path"
        className="w-full mt-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
      />
    )}
  </div>
);

export const RobotsDirectiveSelector = ({ value, onChange }) => (
  <select
    value={value || 'index, follow'}
    onChange={(e) => onChange(e.target.value)}
    className="w-full max-w-md p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
  >
    <option value="index, follow">Index, Follow (Default)</option>
    <option value="index, nofollow">Index, NoFollow</option>
    <option value="noindex, follow">NoIndex, Follow</option>
    <option value="noindex, nofollow">NoIndex, NoFollow</option>
  </select>
);

export const SEOPreview = ({ title, description, url }) => (
  <div className="bg-white border border-stone-200 rounded-lg p-5 max-w-2xl">
    <div className="flex items-center gap-2 text-sm text-[#202124] mb-1">
      <FiGlobe className="text-stone-400" />
      <span className="truncate">{url || 'https://aurorafurniture.com/...'}</span>
    </div>
    <div className="text-[20px] text-[#1a0dab] font-medium leading-tight mb-1 hover:underline cursor-pointer truncate">
      {title || 'Page Title - Aurora Furniture'}
    </div>
    <div className="text-[14px] text-[#4d5156] leading-snug line-clamp-2">
      {description || 'Provide a compelling description for this page to encourage users to click.'}
    </div>
  </div>
);

export const SocialPreview = ({ title, description, image, platform = 'og' }) => (
  <div className="bg-white border border-stone-200 rounded-lg overflow-hidden max-w-[500px] shadow-sm">
    <div className="aspect-[1.91/1] bg-stone-100 flex items-center justify-center relative border-b border-stone-200">
      {image ? (
        <img src={image} alt="Social Preview" className="w-full h-full object-cover" />
      ) : (
        <span className="text-stone-400 text-sm font-medium">No Image Selected</span>
      )}
    </div>
    <div className="p-4 bg-[#f2f3f5]">
      <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">aurorafurniture.com</div>
      <div className="text-base font-bold text-[#1d2129] line-clamp-1 mb-1">{title || 'Page Title'}</div>
      <div className="text-sm text-[#606770] line-clamp-2">{description || 'Page description goes here.'}</div>
    </div>
  </div>
);

export const SEOContentOptimizer = ({ seoData, content }) => {
  const analysis = analyzeSEOContent(seoData || {}, content);
  
  return (
    <div className="bg-stone-50 rounded-lg p-5 border border-stone-200">
      <h4 className="font-bold text-stone-900 mb-4 text-sm">Content Optimization Guide</h4>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600 font-medium">Title Length</span>
            <span className={analysis.titleScore > 80 ? 'text-green-600' : 'text-amber-500'}>{seoData?.title?.length || 0}/60</span>
          </div>
          <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
             <div className={`h-full ${analysis.titleScore > 80 ? 'bg-green-500' : 'bg-amber-400'}`} style={{ width: `${Math.min(100, ((seoData?.title?.length || 0)/60)*100)}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600 font-medium">Description Length</span>
            <span className={analysis.descriptionScore > 80 ? 'text-green-600' : 'text-amber-500'}>{seoData?.description?.length || 0}/160</span>
          </div>
          <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
             <div className={`h-full ${analysis.descriptionScore > 80 ? 'bg-green-500' : 'bg-amber-400'}`} style={{ width: `${Math.min(100, ((seoData?.description?.length || 0)/160)*100)}%` }}></div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <h5 className="text-xs font-bold text-stone-900 mb-2">Recommendations</h5>
          <ul className="text-xs text-stone-600 space-y-2">
            <li>• {analysis.keywordGuidance}</li>
            {analysis.recommendations.map((rec, i) => (
              <li key={i}>• {rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
