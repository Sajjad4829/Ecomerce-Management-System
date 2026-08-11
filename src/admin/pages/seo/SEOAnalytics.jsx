import React, { useEffect, useState } from 'react';
import { SEOService } from '../../services/seo/SEOService';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

export function SEOAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    SEOService.getSEOAnalytics().then(setData);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">SEO Analytics</h2>
          <p className="text-sm text-stone-500">View organic search performance (Requires Search Console Integration).</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
        <FiBarChart2 className="text-amber-600 mt-1" size={24} />
        <div>
          <h4 className="font-bold text-amber-900">Placeholder Data</h4>
          <p className="text-sm text-amber-700 mt-1">These metrics are placeholders. Connect Google Search Console to view real data.</p>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-stone-500 mb-1">Organic Traffic</div>
            <div className="text-3xl font-bold text-stone-900">{data.organicTraffic}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-stone-500 mb-1">Impressions</div>
            <div className="text-3xl font-bold text-stone-900">{data.impressions}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-stone-500 mb-1">Avg CTR</div>
            <div className="text-3xl font-bold text-stone-900">{data.ctr}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-stone-500 mb-1">Avg Position</div>
            <div className="text-3xl font-bold text-stone-900">{data.avgPosition}</div>
          </div>
        </div>
      )}
    </div>
  );
}
