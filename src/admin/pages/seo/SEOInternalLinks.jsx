import React from 'react';
import { FiLink, FiSearch } from 'react-icons/fi';

export function SEOInternalLinks() {
  const links = [
    { id: 1, source: '/blog/modern-living-room', target: '/collections/living-room', anchorText: 'modern living room furniture', status: 'Active' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Internal Links Foundation</h2>
          <p className="text-sm text-text-muted">Manage curated internal linking strategies.</p>
        </div>
      </div>
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background border-b border-border text-xs font-bold text-text-muted uppercase tracking-widest">
              <th className="px-6 py-4">Source Page</th>
              <th className="px-6 py-4">Target Resource</th>
              <th className="px-6 py-4">Anchor Text</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {links.map(l => (
              <tr key={l.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-text-primary">{l.source}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{l.target}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">"{l.anchorText}"</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-md bg-success-soft text-success">{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
