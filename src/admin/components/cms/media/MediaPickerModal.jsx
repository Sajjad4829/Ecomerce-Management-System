import { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch, FiCheck, FiImage, FiGrid, FiFolder, FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

// Empty array for initial picker assets so only uploaded images exist
const SAMPLE_PICKER_ASSETS = [];

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectMedia,
  allowMultiple = false,
  title = "Select Media Asset"
}) {
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [assets, setAssets] = useState(SAMPLE_PICKER_ASSETS);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('cms_custom_assets');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Purge any old mock data (ids starting with 'm')
          const onlyUploads = parsed.filter(asset => asset.id.startsWith('upload_'));
          setAssets(onlyUploads);
          if (parsed.length !== onlyUploads.length) {
            localStorage.setItem('cms_custom_assets', JSON.stringify(onlyUploads));
          }
        } catch (e) {}
      } else {
        localStorage.setItem('cms_custom_assets', JSON.stringify(SAMPLE_PICKER_ASSETS));
        setAssets(SAMPLE_PICKER_ASSETS);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveAssets = (newAssets) => {
    setAssets(newAssets);
    localStorage.setItem('cms_custom_assets', JSON.stringify(newAssets));
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || a.folder === selectedFolder;
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
    const selectedAssets = assets.filter(a => selectedItemIds.includes(a.id));
    if (allowMultiple) {
      onSelectMedia(selectedAssets);
    } else {
      onSelectMedia(selectedAssets[0] || null);
    }
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAsset = {
          id: `upload_${Date.now()}`,
          title: file.name,
          fileName: file.name,
          url: reader.result,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dimensions: 'Original',
          format: file.name.split('.').pop(),
          type: 'image',
          folder: 'Uploads'
        };
        const newAssets = [newAsset, ...assets];
        saveAssets(newAssets);
        // Automatically select it
        if (!allowMultiple) setSelectedItemIds([newAsset.id]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const newAssets = assets.filter(a => a.id !== id);
    saveAssets(newAssets);
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
            className="px-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-semibold text-text-secondary"
          >
            <option value="all">All Folders</option>
            <option value="Uploads">Uploads</option>
            <option value="Sofas">Sofas</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Collections">Collections</option>
            <option value="Banners">Banners</option>
          </select>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold hover:bg-black/80 transition-colors"
          >
            <FiUploadCloud size={14} />
            Upload
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
              return (
                <div
                  key={asset.id}
                  onClick={() => toggleSelect(asset.id)}
                  className={cn(
                    "group relative bg-surface border border-black/5 rounded-xl overflow-hidden shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col",
                    isSelected && "ring-2 ring-black border-transparent"
                  )}
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                    
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
                      <h4 className="text-xs font-bold text-text-primary truncate">{asset.title}</h4>
                      <span className="text-[10px] font-mono text-text-muted">{asset.dimensions}</span>
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
