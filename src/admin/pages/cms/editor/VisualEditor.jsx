import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMonitor, FiTablet, FiSmartphone, FiRotateCcw, FiRotateCw, FiExternalLink } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useParams } from 'react-router-dom';
import { useCMS } from '../../../context/cms/CMSContext';
import { useToast } from '../../../../components/ui/Toast/ToastContext';
import EditorToolbar from '../../../components/cms/editor/EditorToolbar';
import SectionList from '../../../components/cms/editor/SectionList';
import PropertyPanel from '../../../components/cms/editor/PropertyPanel';
import PreviewCanvas from '../../../components/cms/editor/PreviewCanvas';
import PageSettingsDrawer from '../../../components/cms/editor/PageSettingsDrawer';
import AddSectionDrawer from '../../../components/cms/editor/AddSectionDrawer';
import SaveBlockModal from '../../../components/cms/blocks/SaveBlockModal';
import HeroEditorModal from '../../../components/cms/editor/HeroEditorModal';
import FeaturedShowcaseEditorModal from '../../../components/cms/editor/FeaturedShowcaseEditorModal';

export default function VisualEditor() {
  const { pageId } = useParams();
  const { getDraftSections, saveDraftSections, publishPageSections, getPage, loadPageSections } = useCMS();
  const { addToast } = useToast();
  const page = getPage(pageId) || { title: 'Unknown Page', status: 'Draft' };

  const [device, setDevice] = useState('desktop');
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [blockToSave, setBlockToSave] = useState(null);
  const [isHeroEditorOpen, setIsHeroEditorOpen] = useState(false);
  const [isFeaturedEditorOpen, setIsFeaturedEditorOpen] = useState(false);
  const [sections, setSections] = useState(() => getDraftSections(pageId));
  const [isLoading, setIsLoading] = useState(true);
  const isRouting = useRef(true); // Start true to prevent initial mount autosave

  const prevPageId = useRef(pageId);
  
  // Load sections from DB on mount and when pageId changes
  useEffect(() => {
    let isMounted = true;
    
    const fetchSections = async () => {
      setIsLoading(true);
      const data = await loadPageSections(pageId);
      if (isMounted && data) {
        const draft = data.sectionsDraft || [];
        const published = data.sectionsPublished || [];
        // If draft was accidentally wiped but published exists, restore from published
        if (draft.length === 0 && published.length > 0) {
          setSections(published);
        } else {
          setSections(draft);
        }
      }
      if (isMounted) setIsLoading(false);
    };

    if (prevPageId.current !== pageId) {
      isRouting.current = true;
      setActiveSectionId(null);
      prevPageId.current = pageId;
    }
    
    fetchSections();
    
    return () => { isMounted = false; };
  }, [pageId, loadPageSections]);

  // Auto-save drafts when sections change
  useEffect(() => {
    if (isLoading) return; // Do not auto-save while fetching
    if (isRouting.current) {
      isRouting.current = false;
      return; // Skip saving on initial mount or route change to prevent overwriting
    }
    saveDraftSections(pageId, sections);
  }, [sections, pageId, saveDraftSections, isLoading]);

  const handlePublish = () => {
    publishPageSections(pageId, sections);
    addToast({ type: 'success', message: 'Page published successfully' });
  };

  // Handlers
  const handleAddSection = (sectionTemplate) => {
    const newSection = {
      id: `sec-${Date.now()}`,
      name: sectionTemplate.name,
      type: sectionTemplate.type,
      category: sectionTemplate.category,
      icon: sectionTemplate.icon,
      isHidden: false,
      content: sectionTemplate.content || sectionTemplate.defaultContent || {},
      settings: sectionTemplate.settings || sectionTemplate.defaultSettings || {}
    };
    setSections([...sections, newSection]);
    setActiveSectionId(newSection.id);
    setIsLibraryOpen(false);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    if (activeSectionId === id) setActiveSectionId(null);
  };

  const handleDuplicateSection = (id) => {
    const sectionIndex = sections.findIndex(s => s.id === id);
    if (sectionIndex === -1) return;

    const newSection = {
      ...sections[sectionIndex],
      id: `section-${Date.now()}`
    };

    const newSections = [...sections];
    newSections.splice(sectionIndex + 1, 0, newSection);
    setSections(newSections);
    setActiveSectionId(newSection.id);
  };

  const handleUpdateSection = (id, updates) => {
    setSections(prevSections => prevSections.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...updates,
          content: { ...(s.content || {}), ...(updates.content || {}) },
          settings: { ...(s.settings || {}), ...(updates.settings || {}) },
          responsive: {
            desktop: { ...(s.responsive?.desktop || {}), ...(updates.responsive?.desktop || {}) },
            tablet: { ...(s.responsive?.tablet || {}), ...(updates.responsive?.tablet || {}) },
            mobile: { ...(s.responsive?.mobile || {}), ...(updates.responsive?.mobile || {}) }
          }
        };
      }
      return s;
    }));
  };

  const handleToggleHide = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, isHidden: !s.isHidden } : s));
  };

  const handleMoveUp = (id) => {
    const index = sections.findIndex(s => s.id === id);
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections);
    }
  };

  const handleMoveDown = (id) => {
    const index = sections.findIndex(s => s.id === id);
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      setSections(newSections);
    }
  };

  const handleSaveGlobalBlock = (id) => {
    const sectionToSave = sections.find(s => s.id === id);
    if (sectionToSave) setBlockToSave(sectionToSave);
  };

  return (
    <div className="h-[calc(100vh-10rem)] w-full flex flex-col overflow-hidden font-sans">
      <EditorToolbar
        device={device}
        setDevice={setDevice}
        onOpenSettings={() => setIsSettingsOpen(true)}
        page={page}
        onSaveDraft={() => saveDraftSections(pageId, sections)}
        onPublish={handlePublish}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel: Structure */}
        <SectionList
          sections={sections}
          onReorder={setSections}
          activeSectionId={activeSectionId}
          onSelectSection={setActiveSectionId}
          onAddSection={() => setIsLibraryOpen(true)}
          onDeleteSection={handleDeleteSection}
          onDuplicateSection={handleDuplicateSection}
          onToggleHide={handleToggleHide}
        />

        {/* Center Panel: Preview Canvas & Toolbar */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f9fafb] relative">

          {/* Canvas Top Toolbar */}
          <div className="h-14 flex items-center justify-between shrink-0 px-6 mt-1 mb-1">
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button onClick={() => setDevice('desktop')} className={cn("p-1.5 rounded-md transition-colors", device === 'desktop' ? "bg-gray-100 text-[#635BFF]" : "text-gray-400 hover:text-gray-600")}><FiMonitor size={16} /></button>
              <button onClick={() => setDevice('tablet')} className={cn("p-1.5 rounded-md transition-colors", device === 'tablet' ? "bg-gray-100 text-[#635BFF]" : "text-gray-400 hover:text-gray-600")}><FiTablet size={16} /></button>
              <button onClick={() => setDevice('mobile')} className={cn("p-1.5 rounded-md transition-colors", device === 'mobile' ? "bg-gray-100 text-[#635BFF]" : "text-gray-400 hover:text-gray-600")}><FiSmartphone size={16} /></button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 shadow-sm transition-colors"><FiRotateCcw size={16} /></button>
              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 shadow-sm transition-colors"><FiRotateCw size={16} /></button>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 text-xs font-medium hover:bg-gray-50 shadow-sm transition-colors">
              <FiExternalLink size={14} /> View Site
            </button>
          </div>

          <PreviewCanvas
            device={device}
            sections={sections}
            activeSectionId={activeSectionId}
            onSelectSection={setActiveSectionId}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDeleteSection}
            onDuplicate={handleDuplicateSection}
            onAddSection={() => setIsLibraryOpen(true)}
            onSaveGlobalBlock={handleSaveGlobalBlock}
          />
        </div>

        {/* Right Panel: Properties */}
        <PropertyPanel
          activeSectionId={activeSectionId}
          sections={sections}
          onUpdateSection={handleUpdateSection}
          device={device}
          setDevice={setDevice}
          onOpenHeroEditor={() => setIsHeroEditorOpen(true)}
          onOpenFeaturedEditor={() => setIsFeaturedEditorOpen(true)}
        />
      </div>

      {/* Drawers */}
      <PageSettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <AddSectionDrawer
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onAdd={handleAddSection}
        currentPageSections={sections}
      />

      {/* Modals */}
      <SaveBlockModal
        isOpen={!!blockToSave}
        onClose={() => setBlockToSave(null)}
        section={blockToSave}
        onSave={(data) => {
          console.log('Saved block:', data);
          setBlockToSave(null);
        }}
      />
      {isHeroEditorOpen && (
        <HeroEditorModal 
          section={sections.find(s => s.id === activeSectionId)}
          onUpdate={handleUpdateSection}
          onClose={() => setIsHeroEditorOpen(false)}
        />
      )}
      {isFeaturedEditorOpen && (
        <FeaturedShowcaseEditorModal 
          section={sections.find(s => s.id === activeSectionId)}
          onUpdate={handleUpdateSection}
          onClose={() => setIsFeaturedEditorOpen(false)}
        />
      )}
    </div>
  );
}
