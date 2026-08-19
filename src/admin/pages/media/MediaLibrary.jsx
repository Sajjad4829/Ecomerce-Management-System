import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFolderPlus, FiSearch, FiFilter, FiGrid, FiList, FiImage, FiVideo, FiFileText, FiMoreVertical, FiStar, FiClock, FiTrash2 } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';
import MediaUploader from '../../components/media/MediaUploader';

export default function MediaLibrary() {
  const { assets, folders, viewMode, setViewMode, toggleFavorite, archiveAsset } = useMedia();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('all');
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const navigate = useNavigate();

  const filteredAssets = assets.filter(a => {
    if (a.status !== 'Active') return false;
    if (activeFolder !== 'all' && a.folderId !== activeFolder) return false;
    if (searchQuery && !a.filename.toLowerCase().includes(searchQuery.toLowerCase()) && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Image': return <FiImage className="text-blue-500" />;
      case 'Video': return <FiVideo className="text-purple-500" />;
      case 'Document': return <FiFileText className="text-orange-500" />;
      default: return <FiFileText className="text-text-muted" />;
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-text-primary tracking-wide mb-1">Media Library</h1>
          <p className="text-sm text-text-muted">Centralized Digital Asset Management for all platform content.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/media/folders')} className="px-4 py-2 bg-surface border border-border text-text-secondary text-sm font-medium rounded-lg hover:bg-background transition-colors flex items-center gap-2">
            <FiFolderPlus /> New Folder
          </button>
          <button onClick={() => setIsUploaderOpen(true)} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
            <FiUpload /> Upload Media
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-3 px-2">Folders</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveFolder('all')} 
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFolder === 'all' ? 'bg-stone-100 text-text-primary' : 'text-text-secondary hover:bg-background'}`}
              >
                All Media
              </button>
              {folders.map(f => (
                <button 
                  key={f.id}
                  onClick={() => setActiveFolder(f.id)} 
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFolder === f.id ? 'bg-stone-100 text-text-primary' : 'text-text-secondary hover:bg-background'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-3 px-2">Quick Views</h3>
            <div className="space-y-1">
              <button onClick={() => navigate('/admin/media/collections')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                <FiGrid /> Collections
              </button>
              <button onClick={() => navigate('/admin/media/favorites')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                <FiStar /> Favorites
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                <FiClock /> Recent
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors">
                <FiTrash2 /> Archived
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          <div className="bg-surface p-2 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center bg-background rounded-lg px-3 py-2 border border-border">
              <FiSearch className="text-text-muted mr-2" />
              <input 
                type="text" 
                placeholder="Search files, tags, or metadata..." 
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-text-muted hover:bg-stone-100 rounded-lg transition-colors" title="Filter">
                <FiFilter />
              </button>
              <div className="h-6 w-px bg-stone-200 mx-1"></div>
              <button onClick={() => setViewMode('Grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'Grid' ? 'bg-stone-100 text-text-primary' : 'text-text-muted hover:bg-background'}`}>
                <FiGrid />
              </button>
              <button onClick={() => setViewMode('List')} className={`p-2 rounded-lg transition-colors ${viewMode === 'List' ? 'bg-stone-100 text-text-primary' : 'text-text-muted hover:bg-background'}`}>
                <FiList />
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm border border-stone-100 min-h-[500px] p-6">
            {filteredAssets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-muted py-20">
                <FiImage size={48} className="text-stone-300 mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No assets found</h3>
                <p className="text-sm max-w-sm text-center">Try adjusting your filters, searching for something else, or uploading new media.</p>
              </div>
            ) : viewMode === 'Grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAssets.map(asset => (
                  <div key={asset.id} className="group relative">
                    <div 
                      onClick={() => navigate(`/admin/media/${asset.id}`)}
                      className="aspect-square bg-stone-100 rounded-xl overflow-hidden border border-border cursor-pointer mb-2 relative"
                    >
                      {asset.type === 'Image' || asset.type === 'Video' ? (
                        <img src={asset.url} alt={asset.altText || asset.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-background">
                          {getIcon(asset.type)}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                        <div className="flex justify-end">
                          <button onClick={(e) => { e.stopPropagation(); toggleFavorite(asset.id); }} className="p-1.5 bg-surface/20 hover:bg-surface/40 backdrop-blur-md rounded-lg text-white transition-colors">
                            <FiStar className={asset.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''} />
                          </button>
                        </div>
                        <div className="text-white text-xs font-medium truncate drop-shadow-md">
                          {asset.filename}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-2 px-1">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-text-primary truncate" title={asset.title}>{asset.title}</div>
                        <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          {getIcon(asset.type)} {formatSize(asset.size)}
                        </div>
                      </div>
                      <button className="p-1 text-text-muted hover:text-text-primary rounded transition-colors">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-100 text-xs font-bold text-text-muted uppercase tracking-widest">
                    <th className="pb-3 pl-2">File</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">Uploaded</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-background transition-colors group cursor-pointer" onClick={() => navigate(`/admin/media/${asset.id}`)}>
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 border border-border shrink-0">
                            {asset.type === 'Image' || asset.type === 'Video' ? (
                              <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {getIcon(asset.type)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-text-primary truncate">{asset.title}</div>
                            <div className="text-xs text-text-muted truncate">{asset.filename}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-stone-100 text-xs font-medium text-text-secondary">
                          {getIcon(asset.type)} {asset.type}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-text-secondary">{formatSize(asset.size)}</td>
                      <td className="py-3 text-sm text-text-secondary">{new Date(asset.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 text-right pr-2">
                        <button onClick={(e) => { e.stopPropagation(); archiveAsset(asset.id); }} className="p-2 text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isUploaderOpen && <MediaUploader onClose={() => setIsUploaderOpen(false)} />}
    </div>
  );
}
