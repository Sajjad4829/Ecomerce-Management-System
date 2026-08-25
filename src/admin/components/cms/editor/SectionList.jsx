import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import SectionItem from './SectionItem';

export default function SectionList({
  sections,
  onReorder,
  activeSectionId,
  onSelectSection,
  onAddSection,
  onDeleteSection,
  onDuplicateSection,
  onToggleHide
}) {
  return (
    <div className="w-[260px] shrink-0 h-full bg-gray-50 flex flex-col border-r border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
        <h2 className="text-sm font-bold text-gray-900">Sections</h2>
          <button
            onClick={onAddSection}
            className="text-xs font-semibold text-[#635BFF] hover:bg-[#635BFF]/10 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FiPlus size={14} /> Add Section
          </button>
        </div>

        {/* List */}
        <div className="p-4 bg-gray-50 flex-1 overflow-y-auto custom-scrollbar">
          <Reorder.Group axis="y" values={sections} onReorder={onReorder} className="space-y-2">
            <AnimatePresence>
              {sections.map((section) => (
                <Reorder.Item
                  key={section.id}
                  value={section}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <SectionItem
                    section={section}
                    isActive={activeSectionId === section.id}
                    onClick={() => onSelectSection(section.id)}
                    onDelete={() => onDeleteSection(section.id)}
                    onDuplicate={() => onDuplicateSection(section.id)}
                    onToggleHide={() => onToggleHide(section.id)}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          <div 
            onClick={onAddSection}
            className="mt-6 border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-gray-400 bg-white cursor-pointer hover:border-[#635BFF]/50 hover:bg-[#635BFF]/5 transition-all group"
          >
            <div className="w-8 h-8 bg-gray-50 group-hover:bg-[#635BFF]/10 group-hover:text-[#635BFF] flex items-center justify-center mb-2 border border-gray-100 group-hover:border-[#635BFF]/20 transition-colors">
              <FiPlus size={16} />
            </div>
            <span className="text-xs font-medium text-gray-600 group-hover:text-[#635BFF] transition-colors">Drag & Drop Sections Here</span>
            <span className="text-[10px] text-gray-400 mt-1">Reorder to customize your page</span>
          </div>
        </div>
    </div>
  );
}
