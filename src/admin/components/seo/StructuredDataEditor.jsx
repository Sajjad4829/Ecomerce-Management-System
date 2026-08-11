import React from 'react';
import { SEOFieldGroup } from './SEOSharedComponents';
import { FiCode } from 'react-icons/fi';

export function StructuredDataEditor({ seoData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4">
        <FiCode className="text-blue-600 mt-1" size={24} />
        <div>
          <h4 className="font-bold text-blue-900">Structured Data (Schema.org)</h4>
          <p className="text-sm text-blue-700 mt-1">Aurora automatically generates essential structured data for Products, Categories, and Articles based on your content. Use this section to add custom schema if necessary.</p>
        </div>
      </div>

      <SEOFieldGroup label="Custom JSON-LD (Advanced)" description="Add custom structured data to override or append to the default schema.">
        <textarea
          value={seoData?.structuredData || ''}
          onChange={(e) => onChange({ ...seoData, structuredData: e.target.value })}
          placeholder='{\n  "@context": "https://schema.org/",\n  "@type": "Product",\n  "name": "Modern Sofa"\n}'
          rows={8}
          className="w-full font-mono text-sm p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
        />
      </SEOFieldGroup>
    </div>
  );
}
