import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiPlus } from 'react-icons/fi';
import { useCMS } from '../../context/cms/CMSContext';
import SectionToolbar from '../../components/cms/sections/SectionToolbar';
import CategorySidebar from '../../components/cms/sections/CategorySidebar';
import SectionGrid from '../../components/cms/sections/SectionGrid';
import PreviewDrawer from '../../components/cms/sections/PreviewDrawer';
import EmptyState from '../../components/cms/sections/EmptyState';
import SectionEditorModal from '../../components/cms/sections/SectionEditorModal';
import HeroEditorModal from '../../components/cms/editor/HeroEditorModal';
import { resolveSectionPreview } from '../../components/cms/sections/sectionPreviewResolver';
import { useToast } from '../../../components/ui/Toast/ToastContext';
import CreateSectionModal from '../../components/cms/sections/CreateSectionModal';
import FeaturedShowcaseEditorModal from '../../components/cms/editor/FeaturedShowcaseEditorModal';

export default function SectionLibrary() {
  // sectionPreviewMap: { [sectionType] → real saved section instance from MongoDB }
  // sectionPreviewLoading: true while /api/cms/sections/preview-map is in-flight
  const { 
    sections, setSections, 
    sectionPreviewMap, sectionPreviewLoading, 
    saveLibraryConfiguration, libraryConfigurations,
    fetchLibraryConfigurations
  } = useCMS();

  useEffect(() => {
    fetchLibraryConfigurations();
  }, [fetchLibraryConfigurations]);

  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All Sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');
  const [previewSection, setPreviewSection] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Derive categories dynamically from the loaded sections
  const dynamicCategories = useMemo(() => {
    const realSections = sections.filter(section => section.id?.startsWith('lib-custom-') || libraryConfigurations[section.type]);
    
    const counts = { 'All Sections': realSections.length };
    realSections.forEach(s => {
      const cat = s.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const cats = Object.keys(counts).filter(k => k !== 'All Sections').map(cat => ({
      id: cat,
      name: `${cat} (${counts[cat]})`
    }));

    return [
      { id: 'All Sections', name: `All Sections (${counts['All Sections']})` },
      ...cats.sort((a, b) => a.name.localeCompare(b.name))
    ];
  }, [sections, libraryConfigurations]);

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

      const isRealSection = section.id?.startsWith('lib-custom-') || libraryConfigurations[section.type];
      
      return matchesCategory && matchesSearch && isRealSection;
    });
  }, [sections, activeCategory, searchQuery, libraryConfigurations]);

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

        {/* Preview data loading indicator */}
        {sectionPreviewLoading && (
          <div className="flex items-center gap-2 text-xs text-text-muted bg-background px-3 py-2 rounded-lg border border-black/5">
            <FiLoader size={12} className="animate-spin" />
            Loading saved previews…
          </div>
        )}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => addToast('Import Section is coming soon!', 'info')}
            className="flex items-center gap-2 px-4 py-2 border border-black/10 text-text-primary text-sm font-semibold rounded-lg hover:bg-black/5 transition-colors"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import Section
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <FiPlus size={16} />
            Add New Section
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full space-y-6">
        <SectionToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          view={view}
          setView={setView}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={dynamicCategories}
        />

        {filteredSections.length > 0 ? (
          <SectionGrid
            sections={filteredSections}
            view={view}
            onPreview={setPreviewSection}
            onEdit={setEditSection}
            sectionPreviewMap={sectionPreviewMap}
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

      {/* Preview Drawer */}
      <PreviewDrawer
        isOpen={!!previewSection}
        section={previewSection}
        sectionPreviewMap={sectionPreviewMap}
        onClose={() => setPreviewSection(null)}
      />

      {/* Editor Modal */}
      {editSection && (
        editSection.type.includes('HERO') ? (
          <HeroEditorModal
            section={resolveSectionPreview(editSection, sectionPreviewMap) || editSection}
            onUpdate={(id, updates) => saveLibraryConfiguration(editSection.type, updates)}
            onClose={() => setEditSection(null)}
          />
        ) : editSection.type === 'HERO_BANNER' ? (
          <HeroEditorModal
            section={editSection}
            onUpdate={async (id, updates) => {
              // Map the updates to the expected API format
              await saveLibraryConfiguration(editSection.type, {
                content: updates.content,
                settings: updates.settings
              });
            }}
            onClose={() => setEditSection(null)}
          />
        ) : editSection.type.includes('FEATURED_SHOWCASE') || editSection.baseType === 'FEATURED_SHOWCASE' ? (
          <FeaturedShowcaseEditorModal
            section={resolveSectionPreview(editSection, sectionPreviewMap) || editSection}
            onUpdate={async (id, updates) => {
              await saveLibraryConfiguration(editSection.type, {
                content: updates.content,
                settings: updates.settings || (resolveSectionPreview(editSection, sectionPreviewMap) || editSection).settings || {}
              });
            }}
            onClose={() => setEditSection(null)}
          />
        ) : (
          <SectionEditorModal
            sectionType={editSection.type}
            onClose={() => setEditSection(null)}
          />
        )
      )}

      {/* Create Section Modal */}
      <CreateSectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(newSection) => {
          setSections([...sections, newSection]);
          setIsCreateModalOpen(false);
          addToast(`Created new section "${newSection.name}"`, 'success');
        }}
      />
    </div>
  );
}
