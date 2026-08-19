import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EditorToolbar from '../../../components/cms/editor/EditorToolbar';
import SectionList from '../../../components/cms/editor/SectionList';
import PropertyPanel from '../../../components/cms/editor/PropertyPanel';
import PreviewCanvas from '../../../components/cms/editor/PreviewCanvas';
import PageSettingsDrawer from '../../../components/cms/editor/PageSettingsDrawer';
import AddSectionDrawer from '../../../components/cms/editor/AddSectionDrawer';
import SaveBlockModal from '../../../components/cms/blocks/SaveBlockModal';

const INITIAL_SECTIONS = [
  { id: 'sec-1', name: 'Main Hero', type: 'hero' },
  { id: 'sec-2', name: 'Features', type: 'features' },
  { id: 'sec-3', name: 'Featured Category', type: 'category' },
  { id: 'sec-4', name: 'New Arrivals', type: 'grid' },
  { id: 'sec-5', name: 'Customer Reviews', type: 'testimonials' },
  { id: 'sec-6', name: 'Frequently Asked Questions', type: 'faq' },
  { id: 'sec-7', name: 'Newsletter', type: 'banner' },
  { id: 'sec-8', name: 'Footer', type: 'footer' },
];

export default function VisualEditor() {
  const [device, setDevice] = useState('desktop');
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [blockToSave, setBlockToSave] = useState(null);
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  // Handlers
  const handleAddSection = (sectionTemplate) => {
    const newSection = {
      id: `sec-${Date.now()}`,
      name: sectionTemplate.name,
      type: sectionTemplate.type,
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
    const sectionToDup = sections.find(s => s.id === id);
    if (!sectionToDup) return;
    const index = sections.findIndex(s => s.id === id);
    const newSection = {
      ...sectionToDup,
      id: `sec-${Date.now()}`,
      name: `${sectionToDup.name} (Copy)`
    };
    const newSections = [...sections];
    newSections.splice(index + 1, 0, newSection);
    setSections(newSections);
    setActiveSectionId(newSection.id);
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
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden font-sans fixed inset-0 z-50">
      <EditorToolbar 
        device={device} 
        setDevice={setDevice} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
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
        />

        {/* Center Panel: Preview Canvas */}
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

        {/* Right Panel: Properties */}
        <PropertyPanel 
          activeSectionId={activeSectionId}
          sections={sections}
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
    </div>
  );
}
