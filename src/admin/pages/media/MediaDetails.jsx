import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiDownload, FiCopy, FiImage, FiVideo, FiFileText, FiInfo, FiTag, FiFolder } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';

export default function MediaDetails() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { assets, updateAsset, archiveAsset } = useMedia();
  const [asset, setAsset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const found = assets.find(a => a.id === assetId);
    if (found) {
      setAsset(found);
      setFormData({
        title: found.title || '',
        altText: found.altText || '',
        caption: found.caption || '',
        description: found.description || ''
      });
    }
  }, [assetId, assets]);

  if (!asset) return <div className="p-8 text-center text-stone-500">Asset not found.</div>;

  const handleSave = () => {
    updateAsset(assetId, formData);
    setIsEditing(false);
  };

  const handleArchive = () => {
    if(window.confirm('Are you sure you want to archive this asset?')) {
      archiveAsset(assetId);
      navigate('/admin/media');
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(asset.url);
    alert('URL copied to clipboard!'); // Placeholder for actual toast
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/admin/media')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
          <FiArrowLeft /> Back to Library
        </button>
        <div className="flex items-center gap-3">
          <button onClick={copyUrl} className="px-3 py-1.5 bg-white border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 text-sm font-medium flex items-center gap-2">
            <FiCopy /> Copy URL
          </button>
          <button className="px-3 py-1.5 bg-white border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 text-sm font-medium flex items-center gap-2">
            <FiDownload /> Download
          </button>
          <button onClick={handleArchive} className="px-3 py-1.5 bg-white border border-stone-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center gap-2">
            <FiTrash2 /> Archive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-center overflow-hidden min-h-[400px]">
            {asset.type === 'Image' ? (
              <img src={asset.url} alt={asset.altText} className="max-w-full max-h-[600px] object-contain" />
            ) : asset.type === 'Video' ? (
              <video src={asset.url} controls className="max-w-full max-h-[600px]" />
            ) : (
              <div className="text-stone-400 flex flex-col items-center">
                <FiFileText size={64} className="mb-4" />
                <span className="text-lg font-medium text-stone-600">Document Preview</span>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FiInfo /> File Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-xs text-stone-500 mb-1">File Name</div>
                <div className="text-sm font-medium text-stone-900 truncate" title={asset.filename}>{asset.filename}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Type</div>
                <div className="text-sm font-medium text-stone-900">{asset.mimeType}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Size</div>
                <div className="text-sm font-medium text-stone-900">{formatSize(asset.size)}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Dimensions</div>
                <div className="text-sm font-medium text-stone-900">{asset.width && asset.height ? `${asset.width} x ${asset.height}` : 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Uploaded On</div>
                <div className="text-sm font-medium text-stone-900">{new Date(asset.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Last Modified</div>
                <div className="text-sm font-medium text-stone-900">{new Date(asset.updatedAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-xs text-stone-500 mb-1">Status</div>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">{asset.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Metadata</h3>
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-xs font-medium text-stone-500 hover:text-stone-900">Cancel</button>
                  <button onClick={handleSave} className="text-xs font-bold text-stone-900 hover:underline">Save</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg transition-colors">
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">Title</label>
                {isEditing ? (
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" />
                ) : (
                  <div className="text-sm font-medium text-stone-900">{asset.title || '—'}</div>
                )}
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">Alt Text (Accessibility & SEO)</label>
                {isEditing ? (
                  <input type="text" value={formData.altText} onChange={e => setFormData({...formData, altText: e.target.value})} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" placeholder="Describe the image..." />
                ) : (
                  <div className="text-sm text-stone-900">{asset.altText || <span className="text-stone-400 italic">No alt text provided</span>}</div>
                )}
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">Caption</label>
                {isEditing ? (
                  <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" />
                ) : (
                  <div className="text-sm text-stone-900">{asset.caption || '—'}</div>
                )}
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">Description</label>
                {isEditing ? (
                  <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400" />
                ) : (
                  <div className="text-sm text-stone-900">{asset.description || '—'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-6">
             <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiFolder /> Organization
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Folder</span>
                  <span className="font-medium text-stone-900">{asset.folderId === 'all' ? 'Root' : 'Products'}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-stone-500">Collections</span>
                  <span className="font-medium text-stone-900">{asset.collectionIds?.length || 0} collections</span>
                </div>
             </div>

             <div className="border-t border-stone-100 pt-6">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiTag /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {asset.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-lg">
                      {tag}
                    </span>
                  ))}
                  {(!asset.tags || asset.tags.length === 0) && (
                    <span className="text-sm text-stone-400 italic">No tags</span>
                  )}
                  {isEditing && (
                    <button className="px-2 py-1 border border-dashed border-stone-300 text-stone-500 text-xs font-medium rounded-lg hover:border-stone-400 hover:text-stone-700">
                      + Add
                    </button>
                  )}
                </div>
             </div>
          </div>

          <button onClick={() => navigate(`/admin/media/${assetId}/usage`)} className="w-full py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-900 hover:bg-stone-50 transition-colors shadow-sm">
            View Usage Across Platform
          </button>

        </div>
      </div>
    </div>
  );
}
