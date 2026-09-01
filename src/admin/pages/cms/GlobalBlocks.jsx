import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBox } from 'react-icons/fi';
import BlockToolbar from '../../components/cms/blocks/BlockToolbar';
import BlockCategorySidebar from '../../components/cms/blocks/BlockCategorySidebar';
import BlockGrid from '../../components/cms/blocks/BlockGrid';
import BlockPreviewDrawer from '../../components/cms/blocks/BlockPreviewDrawer';
import EmptyState from '../../components/cms/sections/EmptyState'; // Reusing from sections

import { useCMS } from '../../context/cms/CMSContext';

export default function GlobalBlocks() {
  const { blocks } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All Blocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');
  const [previewBlock, setPreviewBlock] = useState(null);

  // Filter Logic
  const filteredBlocks = useMemo(() => {
    return blocks.filter(block => {
      const matchesCategory = 
        activeCategory === 'All Blocks' || 
        block.category === activeCategory;
        
      const matchesSearch = 
        block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [blocks, activeCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-text-muted">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-text-primary font-semibold">Global Blocks</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Global Blocks</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage reusable content blocks that synchronize across your website. Update once, see changes everywhere.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2">
            <FiPlus size={16} /> Create Block
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex gap-8 relative">
        {/* Sidebar */}
        <BlockCategorySidebar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          <BlockToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            view={view}
            setView={setView}
          />

          {filteredBlocks.length > 0 ? (
            <BlockGrid 
              blocks={filteredBlocks}
              view={view}
              onPreview={setPreviewBlock}
            />
          ) : (
            <EmptyState 
              title="No Blocks Found"
              message={`We couldn't find any blocks in "${activeCategory}" matching your search criteria.`}
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery('');
                setActiveCategory('All Blocks');
              }}
            />
          )}
        </div>
      </div>

      {/* Preview Drawer */}
      <BlockPreviewDrawer 
        isOpen={!!previewBlock}
        block={previewBlock}
        onClose={() => setPreviewBlock(null)}
      />
    </div>
  );
}
