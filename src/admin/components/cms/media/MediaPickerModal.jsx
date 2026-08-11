import { useState } from 'react';
import { FiX, FiSearch, FiCheck, FiImage, FiGrid, FiFolder } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

// Sample media dataset for the picker modal
const SAMPLE_PICKER_ASSETS = [
  { id: 'm1', title: 'Velvet Sofa Cream HD', fileName: 'velvet_sofa_cream.webp', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', size: '2.4 MB', dimensions: '3840x2160', format: 'webp', type: 'image', folder: 'Sofas' },
  { id: 'm2', title: 'Aurelian Marble Coffee Table', fileName: 'marble_coffee_table.webp', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', size: '1.8 MB', dimensions: '2560x1440', format: 'webp', type: 'image', folder: 'Tables' },
  { id: 'm3', title: 'Scandinavian Oak Chair', fileName: 'scandi_oak_chair.jpg', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', size: '1.2 MB', dimensions: '1920x1080', format: 'jpg', type: 'image', folder: 'Chairs' },
  { id: 'm4', title: 'Minimalist Dining Set Lookbook', fileName: 'dining_set_lookbook.webp', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', size: '3.1 MB', dimensions: '3840x2560', format: 'webp', type: 'image', folder: 'Collections' },
  { id: 'm5', title: 'Aurelian Luxury Living Hero', fileName: 'hero_living_room_lux.webp', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', size: '4.2 MB', dimensions: '4096x2304', format: 'webp', type: 'image', folder: 'Banners' },
  { id: 'm6', title: 'Nordic Walnut Bed Frame', fileName: 'walnut_bed_frame.jpg', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', size: '2.9 MB', dimensions: '2560x1440', format: 'jpg', type: 'image', folder: 'Beds' }
];

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

  if (!isOpen) return null;

  const filteredAssets = SAMPLE_PICKER_ASSETS.filter(a => {
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
    const selectedAssets = SAMPLE_PICKER_ASSETS.filter(a => selectedItemIds.includes(a.id));
    if (allowMultiple) {
      onSelectMedia(selectedAssets);
    } else {
      onSelectMedia(selectedAssets[0] || null);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">{title}</h3>
            <p className="text-xs text-gray-500">
              {allowMultiple ? "Select one or more assets for your component." : "Select a single media asset."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-black/5 rounded-lg transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Toolbar Filter Line */}
        <div className="p-3 border-b border-black/5 bg-white flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-black/30"
            />
          </div>

          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold text-gray-700"
          >
            <option value="all">All Folders</option>
            <option value="Sofas">Sofas</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Collections">Collections</option>
            <option value="Banners">Banners</option>
          </select>
        </div>

        {/* Media Assets Picker Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50/40">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => {
              const isSelected = selectedItemIds.includes(asset.id);
              return (
                <div
                  key={asset.id}
                  onClick={() => toggleSelect(asset.id)}
                  className={cn(
                    "group relative bg-white border border-black/5 rounded-xl overflow-hidden shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col",
                    isSelected && "ring-2 ring-black border-transparent"
                  )}
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                    
                    {/* Check badge */}
                    <div className={cn(
                      "absolute top-2 left-2 w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      isSelected ? "bg-[#1A1A1A] border-[#1A1A1A] text-white" : "bg-white/80 border-black/20 text-transparent"
                    )}>
                      <FiCheck size={12} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{asset.title}</h4>
                    <span className="text-[10px] font-mono text-gray-400">{asset.dimensions}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Confirmation Bar */}
        <div className="p-4 border-t border-black/5 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500 font-medium">
            {selectedItemIds.length} asset(s) selected
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
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
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
