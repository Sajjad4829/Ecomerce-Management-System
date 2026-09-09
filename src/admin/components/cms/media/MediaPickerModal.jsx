import { useState, useRef, useEffect } from 'react';
import { FiX, FiSearch, FiCheck, FiImage, FiGrid, FiFolder, FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useMedia } from '../../../context/media/MediaContext';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectMedia,
  allowMultiple = false,
  title = "Select Media Asset",
  uploadContext = null
}) {
  const { assets: contextAssets, addAsset: addContextAsset, deleteAsset: deleteContextAsset, folders: contextFolders } = useMedia();
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedItemIds([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredAssets = contextAssets.filter(a => {
    // Removed context-based filtering so all media uploaded anywhere is visible everywhere.

    const q = search.toLowerCase();
    const matchesSearch = !q ||
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.fileName && a.fileName.toLowerCase().includes(q)) ||
      (a.name && a.name.toLowerCase().includes(q));
    
    // Support both local folder strings and global folderIds
    const matchesFolder = selectedFolder === 'all' || a.folder === selectedFolder || a.folderId === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const toggleSelect = (id) => {
    if (allowMultiple) {
      setSelectedItemIds(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setSelectedItemIds([id]);
    }
  };

  const handleConfirm = () => {
    const selectedAssets = contextAssets.filter(a => selectedItemIds.includes(a.id));
    if (allowMultiple) {
      onSelectMedia(selectedAssets);
    } else {
      onSelectMedia(selectedAssets[0] || null);
    }
    onClose();
  };


  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const newAsset = {
        id: `upload_${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ''),
        fileName: file.name,
        url: reader.result,
        src: reader.result,
        type: file.type.startsWith('video') ? 'video' : 'image',
        format: file.name.split('.').pop()?.toLowerCase() || 'jpg',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dimensions: 'Original',
        folder: 'Uploads',
        favorite: false,
        createdAt: 'Just now',
        tags: [],
        usageLocations: [],
        ...(uploadContext ? { context: uploadContext } : {}),
      };

      addContextAsset(newAsset);

      // Also persist to localStorage so it survives page refresh
      const stored = localStorage.getItem('cms_custom_assets');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('cms_custom_assets', JSON.stringify([...existing, newAsset]));

      if (!allowMultiple) {
        setSelectedItemIds([newAsset.id]);
      } else {
        setSelectedItemIds(prev => [...prev, newAsset.id]);
      }

      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onerror = () => {
      alert('Failed to read file. Please try again.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteContextAsset(id);
    
    // Clean up local storage assets just in case it was a legacy upload
    if (id.startsWith('upload_')) {
      const newLocalAssets = localAssets.filter(a => a.id !== id);
      saveLocalAssets(newLocalAssets);
    }
    
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter(i => i !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="bg-surface rounded-2xl border border-black/10 shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-background/50 shrink-0">
          <div>
            <h3 className="font-serif font-bold text-base text-text-primary">{title}</h3>
            <p className="text-xs text-text-muted">
              {allowMultiple ? "Select one or more assets for your component." : "Select a single media asset."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded-lg transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Toolbar Filter Line */}
        <div className="p-3 border-b border-black/5 bg-surface flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none focus:border-black/30"
            />
          </div>

          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-semibold text-text-secondary max-w-[200px]"
          >
            <option value="all">All Folders</option>
            <option value="Uploads">Uploads</option>
            {contextFolders && contextFolders.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiUploadCloud size={14} />
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Media Assets Picker Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-background/40">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => {
              const isSelected = selectedItemIds.includes(asset.id);
              const assetTitle = asset.title || asset.name || asset.fileName || "Untitled Asset";
              const assetUrl = asset.url || asset.src || asset.image || "";
              
              return (
                <div
                  key={asset.id}
                  onClick={() => toggleSelect(asset.id)}
                  className={cn(
                    "group relative bg-surface border border-black/5 rounded-xl overflow-hidden shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col",
                    isSelected && "ring-2 ring-black border-transparent"
                  )}
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative flex items-center justify-center">
                    {assetUrl ? (
                      <img src={assetUrl} alt={assetTitle} className="w-full h-full object-cover" />
                    ) : (
                      <FiImage size={24} className="text-gray-300" />
                    )}
                    
                    {/* Check badge */}
                    <div className={cn(
                      "absolute top-2 left-2 w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      isSelected ? "bg-[#1A1A1A] border-[#1A1A1A] text-white" : "bg-surface/80 border-black/20 text-transparent"
                    )}>
                      <FiCheck size={12} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="p-2.5 flex items-center justify-between">
                    <div className="overflow-hidden pr-2">
                      <h4 className="text-xs font-bold text-text-primary truncate">{assetTitle}</h4>
                      <span className="text-[10px] font-mono text-text-muted">{asset.dimensions || 'Original'}</span>
                    </div>
                    
                    <button
                      onClick={(e) => handleDelete(e, asset.id)}
                      className="p-1.5 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Asset"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {filteredAssets.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <FiImage size={24} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">No media found</h3>
                <p className="text-xs text-gray-500 max-w-sm">
                  We couldn't find any images matching your search or filter criteria.
                  Upload a new one to get started.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Confirmation Bar */}
        <div className="p-4 border-t border-black/5 bg-surface flex items-center justify-between shrink-0">
          <span className="text-xs text-text-muted font-medium">
            {selectedItemIds.length} asset(s) selected
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedItemIds.length === 0}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md",
                selectedItemIds.length > 0
                  ? "bg-[#1A1A1A] text-white hover:bg-black/80 cursor-pointer"
                  : "bg-gray-200 text-text-muted cursor-not-allowed"
              )}
            >
              Confirm Selection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
