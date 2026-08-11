import { useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Reorder, AnimatePresence } from 'framer-motion';
import SectionItem from './SectionItem';

export default function SectionList({ 
  sections, 
  onReorder,
  activeSectionId, 
  onSelectSection, 
  onAddSection,
  onDeleteSection,
  onDuplicateSection 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.length > 0;
  const filteredSections = isSearching 
    ? sections.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections;

  return (
    <div className="w-80 bg-white border-r border-black/10 flex flex-col h-[calc(100vh-4rem)] shrink-0 z-10 overflow-hidden shadow-xl shadow-black/5">
      {/* Header */}
      <div className="p-4 border-b border-black/5 shrink-0 bg-[#F7F5F2]">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">Content Structure</h2>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3.5" />
          <input 
            type="text" 
            placeholder="Search sections..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-black/10 rounded-lg text-xs focus:outline-none focus:border-black/30 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {isSearching ? (
          <div className="space-y-2">
            {filteredSections.map((section, index) => (
              <SectionItem 
                key={section.id} 
                section={section} 
                isActive={activeSectionId === section.id}
                onClick={() => onSelectSection(section.id)}
                onDelete={() => onDeleteSection(section.id)}
                onDuplicate={() => onDuplicateSection(section.id)}
              />
            ))}
          </div>
        ) : (
          <Reorder.Group axis="y" values={sections} onReorder={onReorder} className="space-y-2">
            <AnimatePresence>
              {sections.map((section) => (
                <Reorder.Item 
                  key={section.id} 
                  value={section} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-lg"
                >
                  <SectionItem 
                    section={section} 
                    isActive={activeSectionId === section.id}
                    onClick={() => onSelectSection(section.id)}
                    onDelete={() => onDeleteSection(section.id)}
                    onDuplicate={() => onDuplicateSection(section.id)}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}

        {filteredSections.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-xs">
            No sections found.
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-black/5 shrink-0 bg-gray-50/50">
        <button 
          onClick={onAddSection}
          className="w-full py-2.5 bg-white border border-black/10 border-dashed rounded-lg text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:bg-gray-50 hover:border-black/20 hover:shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <FiPlus /> Add Section
        </button>
      </div>
    </div>
  );
}
