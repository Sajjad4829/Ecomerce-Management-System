import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBox } from 'react-icons/fi';
import BlockToolbar from '../../components/cms/blocks/BlockToolbar';
import BlockCategorySidebar from '../../components/cms/blocks/BlockCategorySidebar';
import BlockGrid from '../../components/cms/blocks/BlockGrid';
import BlockPreviewDrawer from '../../components/cms/blocks/BlockPreviewDrawer';
import EmptyState from '../../components/cms/sections/EmptyState'; // Reusing from sections

// Mock Data for Global Blocks
const MOCK_BLOCKS = [
  {
    id: 'block-1',
    name: 'Summer Sale Promo Banner',
    category: 'Banners',
    description: 'Global promotional banner for the Summer Sale. Used across all category pages.',
    version: '1.2',
    tags: ['Promo', 'Summer', 'Sale'],
    status: 'published',
    usageCount: 14,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'block-2',
    name: 'Standard Footer - 2024',
    category: 'Footers',
    description: 'The main global footer containing newsletter signup, links, and copyright.',
    version: '3.0',
    tags: ['Footer', 'Global', 'Navigation'],
    status: 'published',
    usageCount: 42,
    image: ''
  },
  {
    id: 'block-3',
    name: 'Newsletter CTA - Inline',
    category: 'Newsletters',
    description: 'Inline newsletter signup block intended for use within blog posts or long-form content.',
    version: '1.0',
    tags: ['Newsletter', 'Conversion'],
    status: 'draft',
    usageCount: 0,
    image: ''
  },
  {
    id: 'block-4',
    name: 'Featured Products Grid - Homepage',
    category: 'Product Grids',
    description: 'A curated 4-column grid of top-selling products.',
    version: '2.1',
    tags: ['Products', 'Homepage', 'Bestsellers'],
    status: 'published',
    usageCount: 1,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800'
  }
];

export default function GlobalBlocks() {
  const [activeCategory, setActiveCategory] = useState('All Blocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');
  const [previewBlock, setPreviewBlock] = useState(null);

  // Filter Logic
  const filteredBlocks = useMemo(() => {
    return MOCK_BLOCKS.filter(block => {
      const matchesCategory = 
        activeCategory === 'All Blocks' || 
        block.category === activeCategory;
        
      const matchesSearch = 
        block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
