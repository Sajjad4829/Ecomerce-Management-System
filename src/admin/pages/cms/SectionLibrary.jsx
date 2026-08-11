import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiLayout } from 'react-icons/fi';
import SectionToolbar from '../../components/cms/sections/SectionToolbar';
import CategorySidebar from '../../components/cms/sections/CategorySidebar';
import SectionGrid from '../../components/cms/sections/SectionGrid';
import PreviewDrawer from '../../components/cms/sections/PreviewDrawer';
import EmptyState from '../../components/cms/sections/EmptyState';

// Mock Data for the Section Library
const MOCK_SECTIONS = [
  {
    id: 'sec-1',
    name: 'Modern Split Hero',
    category: 'Hero Sections',
    description: 'A split-screen hero section with large typography on the left and a featured image on the right. Ideal for homepage introductions.',
    version: '2.1',
    tags: ['Hero', 'Split', 'Image', 'Dark Mode'],
    isFavorite: true,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sec-2',
    name: 'Minimal Product Grid',
    category: 'Product Grids',
    description: 'A clean 3-column or 4-column product grid with subtle hover effects and quick-add functionality.',
    version: '1.4',
    tags: ['Grid', 'Products', 'Commerce'],
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sec-3',
    name: 'Brand Story Banner',
    category: 'Banners',
    description: 'Full-width image banner with centered text overlay. Perfect for telling your brand story or highlighting collections.',
    version: '1.0',
    tags: ['Banner', 'Story', 'Full Width'],
    isFavorite: true,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sec-4',
    name: 'Newsletter Signup Strip',
    category: 'Newsletters',
    description: 'A high-converting newsletter signup bar that fits seamlessly between content sections.',
    version: '1.1',
    tags: ['Newsletter', 'Form', 'Conversion'],
    isFavorite: false,
    image: '' // Will use placeholder
  },
  {
    id: 'sec-5',
    name: 'Customer Testimonial Slider',
    category: 'Testimonials',
    description: 'An elegant auto-playing slider featuring customer reviews, star ratings, and optional photos.',
    version: '3.0',
    tags: ['Reviews', 'Slider', 'Social Proof'],
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sec-6',
    name: 'Category Bento Grid',
    category: 'Categories',
    description: 'A modern, asymmetric bento-box style grid to showcase up to 5 different product categories.',
    version: '1.2',
    tags: ['Bento', 'Grid', 'Categories'],
    isFavorite: true,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sec-7',
    name: 'Standard Footer V1',
    category: 'Footers',
    description: 'A comprehensive 4-column footer with newsletter signup, social links, and legal text.',
    version: '1.0',
    tags: ['Footer', 'Navigation', 'Global'],
    isFavorite: false,
    image: ''
  },
  {
    id: 'sec-8',
    name: 'Accordion FAQ',
    category: 'FAQs',
    description: 'A sleek, animated accordion for frequently asked questions. Supports rich text inside answers.',
    version: '2.0',
    tags: ['FAQ', 'Accordion', 'Text'],
    isFavorite: false,
    image: ''
  }
];

export default function SectionLibrary() {
  const [activeCategory, setActiveCategory] = useState('All Sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');
  const [previewSection, setPreviewSection] = useState(null);

  // Filter Logic
  const filteredSections = useMemo(() => {
    return MOCK_SECTIONS.filter(section => {
      const matchesCategory = 
        activeCategory === 'All Sections' || 
        (activeCategory === 'Favorites' && section.isFavorite) ||
        section.category === activeCategory;
        
      const matchesSearch = 
        section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

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
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span>CMS</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1A1A] font-semibold">Library</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Section Library</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Browse, manage, and discover reusable layout sections. Add them directly to your pages in the Visual Editor.
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex gap-8 relative">
        {/* Sidebar */}
        <CategorySidebar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          <SectionToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            view={view}
            setView={setView}
          />

          {filteredSections.length > 0 ? (
            <SectionGrid 
              sections={filteredSections}
              view={view}
              onPreview={setPreviewSection}
            />
          ) : (
            <EmptyState 
              title="No Sections Found"
              message={`We couldn't find any sections in "${activeCategory}" matching your search criteria.`}
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery('');
                setActiveCategory('All Sections');
              }}
            />
          )}
        </div>
      </div>

      {/* Preview Drawer */}
      <PreviewDrawer 
        isOpen={!!previewSection}
        section={previewSection}
        onClose={() => setPreviewSection(null)}
      />
    </div>
  );
}
