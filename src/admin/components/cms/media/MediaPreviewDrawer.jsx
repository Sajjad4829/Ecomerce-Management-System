import { useState } from 'react';
import { FiX, FiCopy, FiCheck, FiDownload, FiTrash2, FiTag, FiFileText, FiLayers, FiExternalLink, FiInfo, FiCrosshair } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function MediaPreviewDrawer({ asset, onClose, onSaveMetadata, onDeleteAsset }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('metadata'); // 'metadata' | 'usage' | 'focal'
  const [formData, setFormData] = useState({
    title: asset?.title || '',
    alt: asset?.alt || '',
    caption: asset?.caption || '',
    tags: asset?.tags ? asset.tags.join(', ') : '',
    seoDesc: asset?.seoDesc || ''
  });

  if (!asset) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(asset.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveMetadata({
      ...asset,
      title: formData.title,
      alt: formData.alt,
      caption: formData.caption,
      seoDesc: formData.seoDesc,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Overlay backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Drawer Panel */}
      <div className="w-full max-w-2xl bg-surface h-full shadow-2xl flex flex-col border-l border-black/10 animate-in slide-in-from-right duration-300">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-background/50 shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="font-serif font-bold text-base text-text-primary truncate max-w-xs">
              {asset.title}
            </h3>
            <span className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono font-bold uppercase text-text-secondary">
              {asset.format}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyUrl}
              className="px-3 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <FiCheck size={14} className="text-success" /> : <FiCopy size={14} />}
              <span>{copied ? "Copied" : "Copy URL"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded-lg transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Tab Header Navigation */}
        <div className="flex items-center border-b border-black/5 px-6 bg-surface shrink-0 text-xs font-bold text-text-muted">
          <button
            onClick={() => setActiveTab('metadata')}
            className={cn(
              "py-3 border-b-2 font-serif transition-all mr-6 flex items-center gap-2",
              activeTab === 'metadata'
                ? "border-[#1A1A1A] text-text-primary"
                : "border-transparent hover:text-text-primary"
            )}
          >
            <FiInfo size={14} />
            <span>Asset Metadata</span>
          </button>

          <button
            onClick={() => setActiveTab('usage')}
            className={cn(
              "py-3 border-b-2 font-serif transition-all mr-6 flex items-center gap-2",
              activeTab === 'usage'
                ? "border-[#1A1A1A] text-text-primary"
                : "border-transparent hover:text-text-primary"
            )}
          >
            <FiLayers size={14} />
            <span>Used In Pages ({asset.usageLocations ? asset.usageLocations.length : 3})</span>
          </button>

          <button
            onClick={() => setActiveTab('focal')}
            className={cn(
              "py-3 border-b-2 font-serif transition-all flex items-center gap-2",
              activeTab === 'focal'
                ? "border-[#1A1A1A] text-text-primary"
                : "border-transparent hover:text-text-primary"
            )}
          >
            <FiCrosshair size={14} />
            <span>Focal Point & Crop</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-background/30">
          
          {/* Top Asset Preview Window */}
          <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs flex flex-col items-center">
            <div className="max-h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden relative">
              {asset.type === 'document' ? (
                <div className="p-12 text-center text-text-muted flex flex-col items-center gap-2">
                  <FiFileText size={48} />
                  <span className="text-xs font-mono font-bold uppercase">{asset.fileName}</span>
                </div>
              ) : (
                <img 
                  src={asset.url} 
                  alt={asset.alt || asset.title}
                  className="max-h-64 object-contain rounded"
                />
              )}
            </div>

            {/* Quick File Tech Specs Bar */}
            <div className="grid grid-cols-4 gap-2 w-full mt-4 pt-3 border-t border-black/5 text-center font-mono text-[11px]">
              <div>
                <span className="text-text-muted block text-[9px] uppercase font-sans">Resolution</span>
                <span className="font-bold text-gray-800">{asset.dimensions || 'Vector/PDF'}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[9px] uppercase font-sans">Size</span>
                <span className="font-bold text-gray-800">{asset.size}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[9px] uppercase font-sans">Format</span>
                <span className="font-bold text-gray-800 uppercase">{asset.format}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[9px] uppercase font-sans">Folder</span>
                <span className="font-bold text-gray-800 truncate block">{asset.folder}</span>
              </div>
            </div>
          </div>

          {/* TAB 1: Metadata Edit Form */}
          {activeTab === 'metadata' && (
            <div className="space-y-4 bg-surface p-5 border border-black/5 rounded-xl shadow-2xs">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Asset Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center justify-between">
                  <span>Alt Text (Accessibility & SEO)</span>
                  <span className="text-[10px] text-text-muted font-normal">Separated from title</span>
                </label>
                <input
                  type="text"
                  placeholder="Describe image for screen readers e.g. Minimalist Velvet Sofa in Cream"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Caption / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Public caption to render under full-width hero blocks..."
                  className="w-full px-3 py-2 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="furniture, sofa, living-room, luxury"
                  className="w-full px-3 py-2 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30 font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Usage Locations */}
          {activeTab === 'usage' && (
            <div className="bg-surface p-5 border border-black/5 rounded-xl shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                CMS Usage Locations
              </h4>
              <p className="text-xs text-text-muted">
                This asset is currently embedded in the following storefront routes:
              </p>

              <ul className="divide-y divide-black/5 border border-black/5 rounded-lg overflow-hidden">
                <li className="p-3 bg-background/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-text-primary">Homepage — Hero Section</div>
                    <div className="text-[10px] text-text-muted font-mono">/pages/home</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-success-soft text-success text-[10px] font-bold">Published</span>
                </li>
                <li className="p-3 bg-background/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-text-primary">Living Room Lookbook 2025</div>
                    <div className="text-[10px] text-text-muted font-mono">/collections/living-room</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-success-soft text-success text-[10px] font-bold">Published</span>
                </li>
                <li className="p-3 bg-background/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-text-primary">Aurelian Chair PDP Gallery</div>
                    <div className="text-[10px] text-text-muted font-mono">/products/aurelian-chair</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-warning-soft text-warning text-[10px] font-bold">Draft</span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 3: Focal Point Placeholder */}
          {activeTab === 'focal' && (
            <div className="bg-surface p-5 border border-black/5 rounded-xl shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Smart Focal Point</h4>
                  <p className="text-xs text-text-muted">Click image to set subject center for responsive cropping.</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-black/5 px-2 py-1 rounded">X: 50% | Y: 35%</span>
              </div>

              <div className="relative border border-black/10 rounded-lg overflow-hidden cursor-crosshair group max-h-56 flex items-center justify-center bg-black/5">
                <img src={asset.url} alt="Focal Point" className="max-h-56 object-contain" />
                <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow-lg bg-black/30 flex items-center justify-center text-white pointer-events-none">
                  <FiCrosshair size={16} />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-black/5 bg-surface flex items-center justify-between shrink-0">
          <button
            onClick={() => onDeleteAsset(asset.id)}
            className="px-4 py-2 border border-red-200 text-danger hover:bg-danger-soft rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FiTrash2 size={14} />
            <span>Delete Asset</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md"
            >
              Save Metadata
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
