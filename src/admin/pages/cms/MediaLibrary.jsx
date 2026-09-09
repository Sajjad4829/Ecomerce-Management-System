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
export const INITIAL_ASSETS = [];

import { useMedia } from '../../context/media/MediaContext';

export default function MediaLibrary() {
  const { assets, addAsset, deleteAsset, updateAsset } = useMedia();
  
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
    const asset = assets.find(a => a.id === id);
    if (asset) updateAsset(id, { favorite: !asset.favorite });
    if (previewAsset && previewAsset.id === id) {
      setPreviewAsset(prev => ({ ...prev, favorite: !prev.favorite }));
    }
  };

  const handleSaveMetadata = (updatedAsset) => {
    updateAsset(updatedAsset.id, updatedAsset);
    setPreviewAsset(null);
  };

  const handleDeleteAsset = (id) => {
    deleteAsset(id);
    setSelectedIds(prev => prev.filter(i => i !== id));
    if (previewAsset?.id === id) setPreviewAsset(null);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteAsset(id));
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
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">Media Asset Manager</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Digital Asset Manager (DAM)</h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl leading-relaxed">
            Centralized media library for high-resolution furniture imagery, promotional videos, and brand collateral.
          </p>
        </div>

        {/* Action button to test standalone picker integration */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPickerTesterOpen(true)}
            className="px-4 py-2.5 border border-black/10 bg-surface rounded-lg text-xs font-semibold text-text-secondary hover:bg-background transition-all shadow-2xs flex items-center gap-2"
          >
            <FiLayers size={14} />
            <span>Test Media Picker Component</span>
          </button>
        </div>
      </motion.div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-text-primary">
            <FiImage size={20} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider block">Images</span>
            <span className="text-lg font-serif font-bold text-text-primary">720 files</span>
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <FiVideo size={20} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider block">Videos</span>
            <span className="text-lg font-serif font-bold text-text-primary">48 files</span>
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <FiFileText size={20} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider block">Documents</span>
            <span className="text-lg font-serif font-bold text-text-primary">124 files</span>
          </div>
        </div>

        <div className="bg-surface border border-black/5 rounded-xl p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
            <FiHardDrive size={20} />
          </div>
          <div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider block">Total Usage</span>
            <span className="text-lg font-serif font-bold text-text-primary">42.8 GB</span>
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
        onUploadComplete={(newAssets) => {
          if (newAssets && newAssets.length > 0) {
            newAssets.forEach(addAsset);
          }
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
