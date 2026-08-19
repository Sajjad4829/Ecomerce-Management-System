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
          <h2 className="text-2xl font-bold text-text-primary mb-1">SEO Analytics</h2>
          <p className="text-sm text-text-muted">View organic search performance (Requires Search Console Integration).</p>
        </div>
      </div>

      <div className="bg-warning-soft border border-amber-200 rounded-xl p-5 flex items-start gap-4">
        <FiBarChart2 className="text-warning mt-1" size={24} />
        <div>
          <h4 className="font-bold text-amber-900">Placeholder Data</h4>
          <p className="text-sm text-warning mt-1">These metrics are placeholders. Connect Google Search Console to view real data.</p>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="text-sm text-text-muted mb-1">Organic Traffic</div>
            <div className="text-3xl font-bold text-text-primary">{data.organicTraffic}</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="text-sm text-text-muted mb-1">Impressions</div>
            <div className="text-3xl font-bold text-text-primary">{data.impressions}</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="text-sm text-text-muted mb-1">Avg CTR</div>
            <div className="text-3xl font-bold text-text-primary">{data.ctr}</div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="text-sm text-text-muted mb-1">Avg Position</div>
            <div className="text-3xl font-bold text-text-primary">{data.avgPosition}</div>
          </div>
        </div>
      )}
    </div>
  );
}
