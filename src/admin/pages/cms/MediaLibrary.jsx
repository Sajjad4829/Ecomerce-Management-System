import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiVideo, FiFileText, FiHardDrive, FiPlus, FiFolderPlus, FiLayers } from 'react-icons/fi';
import FolderSidebar from '../../components/cms/media/FolderSidebar';
import MediaToolbar from '../../components/cms/media/MediaToolbar';
import MediaGrid from '../../components/cms/media/MediaGrid';
import MediaPreviewDrawer from '../../components/cms/media/MediaPreviewDrawer';
import UploadZoneModal from '../../components/cms/media/UploadZoneModal';
import MediaPickerModal from '../../components/cms/media/MediaPickerModal';

// High Quality Furniture eCommerce Mock Media Assets
const INITIAL_ASSETS = [
  {
    id: 'a1',
    title: 'Aurelian Modular Velvet Sofa - Cream',
    fileName: 'aurelian_velvet_sofa_cream_4k.webp',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'webp',
    size: '3.4 MB',
    dimensions: '3840x2160',
    folder: 'Sofas',
    favorite: true,
    createdAt: '2 hours ago',
    alt: 'Cream modular velvet sofa in luxury living room setting',
    caption: 'Hero asset for Living Room 2025 Campaign',
    tags: ['sofa', 'velvet', 'living-room', 'cream', 'luxury'],
    usageLocations: ['Homepage Hero', 'Living Room Lookbook', 'PDP Aurelian Sofa']
  },
  {
    id: 'a2',
    title: 'Nordic Oak Dining Table & Chairs',
    fileName: 'nordic_oak_dining_table_set.webp',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'webp',
    size: '2.8 MB',
    dimensions: '3840x2560',
    folder: 'Tables',
    favorite: false,
    createdAt: '1 day ago',
    alt: 'Scandinavian dining table with six matching chairs',
    caption: 'Dining Room centerpiece catalog feature',
    tags: ['dining', 'table', 'oak', 'scandi'],
    usageLocations: ['Dining Collection Page']
  },
  {
    id: 'a3',
    title: 'Aurelian Marble & Brass Coffee Table',
    fileName: 'marble_coffee_table_brass.webp',
    url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'webp',
    size: '1.9 MB',
    dimensions: '2560x1440',
    folder: 'Tables',
    favorite: true,
    createdAt: '3 days ago',
    alt: 'Italian Calacatta marble coffee table with brushed brass legs',
    caption: 'Featured in Summer Architectural Digest edition',
    tags: ['marble', 'coffee-table', 'brass', 'luxury'],
    usageLocations: ['Homepage Featured Grid', 'Product Details Page']
  },
  {
    id: 'a4',
    title: 'Minimalist Bouclé Accent Chair',
    fileName: 'boucle_accent_chair_white.jpg',
    url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'jpg',
    size: '1.5 MB',
    dimensions: '1920x1080',
    folder: 'Chairs',
    favorite: false,
    createdAt: '4 days ago',
    alt: 'White bouclé fabric accent arm chair with minimalist silhouette',
    caption: 'Best selling accent seating option',
    tags: ['chair', 'boucle', 'accent', 'white'],
    usageLocations: ['Living Room Collection']
  },
  {
    id: 'a5',
    title: 'Aurelian Luxury Penthouse Interior Reel',
    fileName: 'aurelian_penthouse_showcase_4k.mp4',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    format: 'mp4',
    size: '28.4 MB',
    dimensions: '3840x2160',
    folder: 'Banners',
    favorite: true,
    createdAt: '1 week ago',
    alt: 'Full penthouse video showcase featuring complete Aurelian line',
    caption: 'Hero background video for luxury splash campaign',
    tags: ['video', 'hero', 'penthouse', 'showcase'],
    usageLocations: ['Homepage Top Hero Banner']
  },
  {
    id: 'a6',
    title: 'Enterprise Furniture Care & Warranty Guide 2025',
    fileName: 'aurelian_furniture_care_guide_2025.pdf',
    url: '',
    type: 'document',
    format: 'pdf',
    size: '4.2 MB',
    dimensions: 'A4 Document',
    folder: 'Brand',
    favorite: false,
    createdAt: '2 weeks ago',
    alt: 'Official care instructions and warranty coverage PDF',
    caption: 'Downloadable care guide attached to customer orders',
    tags: ['pdf', 'care-guide', 'warranty', 'support'],
    usageLocations: ['Customer Care Portal', 'Product Download Tab']
  },
  {
    id: 'a7',
    title: 'Walnut Wood Platform Bed Frame',
    fileName: 'walnut_platform_bed_king.webp',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'webp',
    size: '3.1 MB',
    dimensions: '3840x2560',
    folder: 'Beds',
    favorite: false,
    createdAt: '2 weeks ago',
    alt: 'King size solid American walnut platform bed frame',
    caption: 'Bedroom Collection flagship piece',
    tags: ['bed', 'walnut', 'bedroom', 'king'],
    usageLocations: ['Bedroom Category Header']
  },
  {
    id: 'a8',
    title: 'Scandi Minimalist Living Room Setup',
    fileName: 'scandi_living_room_lookbook_full.webp',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    format: 'webp',
    size: '2.2 MB',
    dimensions: '2560x1440',
    folder: 'Collections',
    favorite: true,
    createdAt: '3 weeks ago',
    alt: 'Bright Scandinavian interior design lookbook photograph',
    caption: 'Hero image for Editorial Scandinavian post',
    tags: ['lookbook', 'scandinavian', 'editorial'],
    usageLocations: ['Blog Post: Scandinavian Design Trends']
  }
];

export default function MediaLibrary() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'favorites' | 'recent'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'image' | 'video' | 'document'
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [previewAsset, setPreviewAsset] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPickerTesterOpen, setIsPickerTesterOpen] = useState(false);

  // Filter and Search Logic
  const filteredAssets = assets.filter(asset => {
    // Folder filter
    if (selectedFolder) {
      if (asset.folder.toLowerCase() !== selectedFolder.toLowerCase()) return false;
    }

    // Quick System View filter
    if (activeFilter === 'favorites' && !asset.favorite) return false;

    // Type Filter
    if (selectedType !== 'all' && asset.type !== selectedType) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asset.title.toLowerCase().includes(q);
      const matchFile = asset.fileName.toLowerCase().includes(q);
      const matchAlt = asset.alt?.toLowerCase().includes(q);
      const matchTag = asset.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchFile && !matchAlt && !matchTag) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'name_asc') return a.title.localeCompare(b.title);
    if (sortBy === 'name_desc') return b.title.localeCompare(a.title);
    return 0; // Default order
  });

  // Handlers
  const handleSelectAsset = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredAssets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAssets.map(a => a.id));
    }
  };

  const handleToggleFavorite = (id) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, favorite: !a.favorite } : a));
    if (previewAsset && previewAsset.id === id) {
      setPreviewAsset(prev => ({ ...prev, favorite: !prev.favorite }));
    }
  };

  const handleSaveMetadata = (updatedAsset) => {
    setAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
    setPreviewAsset(null);
  };

  const handleDeleteAsset = (id) => {
    setAssets(prev => prev.filter(a => a.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
    if (previewAsset?.id === id) setPreviewAsset(null);
  };

  const handleBulkDelete = () => {
    setAssets(prev => prev.filter(a => !selectedIds.includes(a.id)));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1A1A] font-semibold">Media Asset Manager</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Digital Asset Manager (DAM)</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl leading-relaxed">
            Centralized media library for high-resolution furniture imagery, promotional videos, and brand collateral.
          </p>
        </div>

        {/* Action button to test standalone picker integration */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPickerTesterOpen(true)}
            className="px-4 py-2.5 border border-black/10 bg-white rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-2xs flex items-center gap-2"
          >
            <FiLayers size={14} />
            <span>Test Media Picker Component</span>
          </button>
        </div>
      </motion.div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
            <FiImage size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Images</span>
            <span className="text-lg font-serif font-bold text-[#1A1A1A]">720 files</span>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <FiVideo size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Videos</span>
            <span className="text-lg font-serif font-bold text-[#1A1A1A]">48 files</span>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <FiFileText size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Documents</span>
            <span className="text-lg font-serif font-bold text-[#1A1A1A]">124 files</span>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <FiHardDrive size={20} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Total Usage</span>
            <span className="text-lg font-serif font-bold text-[#1A1A1A]">42.8 GB</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex items-start">
        
        {/* Left Folder Directory Tree */}
        <FolderSidebar
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Right Asset Explorer Area */}
        <div className="flex-1 min-w-0">
          <MediaToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedCount={selectedIds.length}
            onUploadClick={() => setIsUploadOpen(true)}
            onBulkDelete={handleBulkDelete}
            onBulkTag={() => alert("Bulk tagging applied")}
          />

          <MediaGrid
            assets={filteredAssets}
            selectedIds={selectedIds}
            onSelectAsset={handleSelectAsset}
            onSelectAll={handleSelectAll}
            onPreviewAsset={(asset) => setPreviewAsset(asset)}
            onToggleFavorite={handleToggleFavorite}
            viewMode={viewMode}
          />
        </div>

      </div>

      {/* Slide-over Preview & Metadata Drawer */}
      <MediaPreviewDrawer
        asset={previewAsset}
        onClose={() => setPreviewAsset(null)}
        onSaveMetadata={handleSaveMetadata}
        onDeleteAsset={handleDeleteAsset}
      />

      {/* Upload Zone Modal */}
      <UploadZoneModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={() => {
          // Re-trigger asset refresh simulation
        }}
        currentFolder={selectedFolder}
      />

      {/* Standalone Reusable Media Picker Component Tester Modal */}
      <MediaPickerModal
        isOpen={isPickerTesterOpen}
        onClose={() => setIsPickerTesterOpen(false)}
        onSelectMedia={(selected) => {
          alert(`Selected asset: ${Array.isArray(selected) ? selected.map(s => s.title).join(', ') : selected?.title}`);
        }}
        allowMultiple={true}
        title="Visual Page Builder — Select Media Asset"
      />

    </div>
  );
}
