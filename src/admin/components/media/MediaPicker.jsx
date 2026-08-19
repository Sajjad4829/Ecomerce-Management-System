import React, { useState, useEffect } from 'react';
import { FiX, FiSearch, FiGrid, FiList, FiImage, FiVideo, FiFileText, FiCheck } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';
import MediaUploader from './MediaUploader';

export default function MediaPicker({ onSelect, onClose, multiSelect = false, typeFilter = null }) {
  const { assets, folders } = useMedia();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const filteredAssets = assets.filter(a => {
    if (a.status !== 'Active') return false;
    if (typeFilter && a.type !== typeFilter) return false;
    if (activeFolder !== 'all' && a.folderId !== activeFolder) return false;
    if (searchQuery && !a.filename.toLowerCase().includes(searchQuery.toLowerCase()) && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSelect = (asset) => {
    if (multiSelect) {
      if (selectedIds.includes(asset.id)) {
        setSelectedIds(selectedIds.filter(id => id !== asset.id));
      } else {
        setSelectedIds([...selectedIds, asset.id]);
      }
    } else {
      setSelectedIds([asset.id]);
    }
  };

  const handleConfirm = () => {
    if (multiSelect) {
      const selectedAssets = assets.filter(a => selectedIds.includes(a.id));
      onSelect(selectedAssets);
    } else {
      const selectedAsset = assets.find(a => a.id === selectedIds[0]);
      if (selectedAsset) onSelect(selectedAsset);
    }
    onClose();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Image': return <FiImage className="text-text-muted" />;
      case 'Video': return <FiVideo className="text-text-muted" />;
      default: return <FiFileText className="text-text-muted" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Select Media</h2>
            <p className="text-xs text-text-muted">Choose {multiSelect ? 'assets' : 'an asset'} from your library.</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-stone-100 p-4 overflow-y-auto shrink-0 bg-background/50 hidden md:block">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-3 px-2">Folders</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveFolder('all')} 
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFolder === 'all' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:bg-surface/50'}`}
              >
                All Media
              </button>
              {folders.map(f => (
                <button 
                  key={f.id}
                  onClick={() => setActiveFolder(f.id)} 
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFolder === f.id ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:bg-surface/50'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
            
            <div className="mt-8 px-2">
              <button onClick={() => setIsUploaderOpen(true)} className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors">
                Upload New
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 flex flex-col min-w-0 bg-surface">
            <div className="p-4 border-b border-stone-100 flex items-center gap-4 shrink-0">
              <div className="flex-1 flex items-center bg-background rounded-lg px-3 py-2 border border-border">
                <FiSearch className="text-text-muted mr-2" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
               {filteredAssets.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted">
                  <FiImage size={40} className="text-stone-300 mb-3" />
                  <p className="text-sm">No assets found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredAssets.map(asset => {
                    const isSelected = selectedIds.includes(asset.id);
                    return (
                      <div 
                        key={asset.id} 
                        onClick={() => handleSelect(asset)}
                        className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-stone-900 shadow-md scale-[0.98]' : 'border-transparent bg-stone-100 hover:border-border-hover'
                        }`}
                      >
                        {asset.type === 'Image' || asset.type === 'Video' ? (
                          <img src={asset.url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {getIcon(asset.type)}
                            <span className="text-[10px] text-text-muted mt-2 truncate w-3/4 text-center">{asset.filename}</span>
                          </div>
                        )}
                        
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                            <FiCheck size={14} />
                          </div>
                        )}
                        
                        {!isSelected && (
                          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-[10px] text-white font-medium truncate">{asset.filename}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-stone-100 bg-background flex items-center justify-between shrink-0">
          <div className="text-sm font-medium text-text-secondary">
            {selectedIds.length} {selectedIds.length === 1 ? 'asset' : 'assets'} selected
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-text-secondary font-medium text-sm hover:text-text-primary">
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={selectedIds.length === 0}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIds.length === 0 ? 'bg-stone-200 text-text-muted cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-hover'
              }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>

      {isUploaderOpen && <MediaUploader onClose={() => setIsUploaderOpen(false)} />}
    </div>
  );
}
