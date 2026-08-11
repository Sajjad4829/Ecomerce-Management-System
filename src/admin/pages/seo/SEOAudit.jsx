import React, { useEffect } from 'react';
import { useSEO } from '../../context/seo/SEOContext';
import { FiShield, FiExternalLink } from 'react-icons/fi';

export function SEOAudit() {
  const { auditResults, runAudit, loading } = useSEO();

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">SEO Audit</h2>
          <p className="text-sm text-stone-500">Scan your content for SEO issues and optimization opportunities.</p>
        </div>
        <button 
          onClick={runAudit}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
        >
          <FiShield /> Run Audit
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest">
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4">Issue</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-stone-500">Running audit...</td></tr>
            ) : auditResults.map(res => (
              <tr key={res.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-900 text-sm">{res.resourceType} ({res.resourceId})</td>
                <td className="px-6 py-4 text-sm text-stone-600">{res.issue}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700">{res.severity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 text-amber-700">{res.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 ml-auto">
                    Fix <FiExternalLink />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
