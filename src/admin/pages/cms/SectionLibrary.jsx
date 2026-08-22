import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiLayout } from 'react-icons/fi';
import { useCMS } from '../../context/cms/CMSContext';
import SectionToolbar from '../../components/cms/sections/SectionToolbar';
import CategorySidebar from '../../components/cms/sections/CategorySidebar';
import SectionGrid from '../../components/cms/sections/SectionGrid';
import PreviewDrawer from '../../components/cms/sections/PreviewDrawer';
import EmptyState from '../../components/cms/sections/EmptyState';

export default function SectionLibrary() {
  const { sections } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All Sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');
  const [previewSection, setPreviewSection] = useState(null);

  // Derive categories dynamically from the loaded sections
  const dynamicCategories = useMemo(() => {
    const counts = { 'All Sections': sections.length };
    sections.forEach(s => {
      const cat = s.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    
    const cats = Object.keys(counts).filter(k => k !== 'All Sections').map(cat => ({
      id: cat,
      name: `${cat} (${counts[cat]})`
    }));

    return [
      { id: 'All Sections', name: `All Sections (${counts['All Sections']})` },
      ...cats.sort((a,b) => a.name.localeCompare(b.name))
    ];
  }, [sections]);

  // Filter Logic
  const filteredSections = useMemo(() => {
    return sections.filter(section => {
      const matchesCategory = 
        activeCategory === 'All Sections' || 
        (activeCategory === 'Favorites' && section.isFavorite) ||
        section.category === activeCategory;
        
      const matchesSearch = 
        section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (section.tags && section.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [sections, activeCategory, searchQuery]);

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
            <span className="text-text-primary font-semibold">Library</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">Section Library</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
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
          categories={dynamicCategories}
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
