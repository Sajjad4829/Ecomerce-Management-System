import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBox, FiLayers, FiFileText, FiTag } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';

export default function MediaUsage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { assets } = useMedia();

  const asset = assets.find(a => a.id === assetId);

  // Mock Usage Data
  const usageData = [
    { id: 'u-1', type: 'Product', name: 'Aurora Lounge Chair', field: 'Primary Image', url: '/admin/catalog/products/PRD-001' },
    { id: 'u-2', type: 'Product', name: 'Aurora Lounge Chair', field: 'Gallery', url: '/admin/catalog/products/PRD-001' },
    { id: 'u-3', type: 'CMS Page', name: 'Homepage', field: 'Hero Banner Section', url: '/admin/cms/pages/PAGE-01' },
    { id: 'u-4', type: 'Marketing', name: 'Summer Campaign', field: 'Cover Image', url: '/admin/communications/campaigns/CAMP-01' },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'Product': return <FiBox />;
      case 'CMS Page': return <FiFileText />;
      case 'Marketing': return <FiTag />;
      default: return <FiLayers />;
    }
  }

  if (!asset) return <div className="p-8 text-center">Asset not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <button onClick={() => navigate(`/admin/media/${assetId}`)} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
        <FiArrowLeft /> Back to Asset
      </button>

      <div>
        <h1 className="text-3xl font-light text-text-primary tracking-wide mb-2">Asset Usage</h1>
        <p className="text-sm text-text-muted">Track where <span className="font-bold text-text-primary">{asset.filename}</span> is used across the platform.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background border-b border-stone-100 text-xs font-bold text-text-muted uppercase tracking-widest">
              <th className="px-6 py-4">Resource Type</th>
              <th className="px-6 py-4">Resource Name</th>
              <th className="px-6 py-4">Field / Location</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {usageData.map(usage => (
              <tr key={usage.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <div className="text-text-muted">{getIcon(usage.type)}</div>
                    {usage.type}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary font-medium">
                  {usage.name}
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">
                  {usage.field}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => navigate(usage.url)} className="text-xs font-bold text-text-primary hover:underline">
                    View Resource
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
