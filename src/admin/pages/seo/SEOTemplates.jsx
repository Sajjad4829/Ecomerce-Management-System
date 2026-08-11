import React, { useEffect } from 'react';
import { useSEO } from '../../context/seo/SEOContext';
import { FiEdit2, FiCode, FiPlus } from 'react-icons/fi';

export function SEOTemplates() {
  const { templates, loadTemplates, loading } = useSEO();

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">SEO Templates</h2>
          <p className="text-sm text-stone-500">Configure default SEO generation patterns for resource types.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
          <FiPlus /> Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
           <div className="text-stone-500">Loading templates...</div>
        ) : templates.map(tpl => (
          <div key={tpl.id} className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-stone-900 flex items-center gap-2">{tpl.name}</h3>
                <p className="text-xs text-stone-500 mt-1">Applies to: {tpl.resourceType}s</p>
              </div>
              <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-50 rounded-lg"><FiEdit2 /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Title Pattern</div>
                <div className="text-sm text-stone-900 font-mono bg-stone-50 p-2 rounded border border-stone-100">{tpl.titleTemplate}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Description Pattern</div>
                <div className="text-sm text-stone-900 font-mono bg-stone-50 p-2 rounded border border-stone-100">{tpl.descriptionTemplate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
