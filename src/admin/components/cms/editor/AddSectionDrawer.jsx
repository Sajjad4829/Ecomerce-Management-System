/**
 * AddSectionDrawer.jsx
 * --------------------
 * The "Add Section" drawer inside the Visual Editor (Page Builder).
 *
 * CHANGED: Section card thumbnails now use the same generic preview system
 * as the standalone Section Library page:
 *   - resolveSectionPreview(section, sectionPreviewMap) for data priority
 *   - SectionLibraryPreview for the live scaled thumbnail
 *
 * Removed: Hero-specific fallback to activeTheme?.heroSlides (was a
 * type-specific workaround that violated the generic architecture).
 *
 * The thumbnail now works for every section type — current and future —
 * without any type-specific if/else logic in this file.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiPlus, FiGlobe, FiLock, FiNavigation, FiExternalLink, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { cn } from '../../../../utils/cn';
import { useCMS } from '../../../context/cms/CMSContext';
import { resolveSectionPreview } from '../../cms/sections/sectionPreviewResolver';
import SectionLibraryPreview from '../../cms/sections/SectionLibraryPreview';

export default function AddSectionDrawer({ isOpen, onClose, onAdd, currentPageSections = [] }) {
  const { 
    sections, blocks, 
    pageSectionsDraft,
    navbarGlobalSection,
    sectionPreviewMap,
    libraryConfigurations
  } = useCMS();
  const [activeTab, setActiveTab] = useState('sections');
  const [searchQuery, setSearchQuery] = useState('');

  const getUsageCount = (templateType) => {
    let count = 0;
    if (!pageSectionsDraft) return count;
    Object.values(pageSectionsDraft).forEach(pageSections => {
      if (Array.isArray(pageSections) && pageSections.some(instance => instance.type === templateType)) {
        count++;
      }
    });
    return count;
  };

  // Check if navbar is already placed on this page
  const isNavbarOnPage = currentPageSections.some(s => s.type === 'NAVBAR');

  if (!isOpen) return null;

  const currentList = activeTab === 'sections'
    ? sections.filter(s => {
        const isCustom = s.id?.startsWith('lib-custom-');
        const hasConfig = !!libraryConfigurations[s.type];
        const keep = s.status === 'Active' && (isCustom || hasConfig);
        console.log(`AddSectionDrawer checking section: ${s.name} (type: ${s.type}) - isCustom: ${isCustom}, hasConfig: ${hasConfig}, keep: ${keep}`);
        return keep;
      })
    : blocks.filter(b => b.status === 'Active');

  console.log("AddSectionDrawer currentList:", currentList.map(s => s.name));
  
  const filteredList = currentList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedSections = activeTab === 'sections' ? filteredList.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {}) : { 'GLOBAL BLOCKS': filteredList };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-x-32 lg:inset-y-12 bg-[#F9FAFB] shadow-2xl z-[70] flex flex-col rounded-2xl border border-black/10 overflow-hidden"
          >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-8 shrink-0 border-b border-gray-200/50 bg-white relative">
              <h2 className="text-2xl font-serif text-[#1A1A1A]">Section Library</h2>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold rounded-md hover:bg-black/80 transition-colors">
                  Create Section Template
                </button>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-text-muted transition-colors absolute top-4 right-4">
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Toolbar (Tabs & Search) */}
            <div className="px-8 py-4 bg-white border-b border-gray-200/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
                <button
                  onClick={() => setActiveTab('sections')}
                  className={cn(
                    "px-6 py-1.5 text-xs font-semibold rounded-md transition-all",
                    activeTab === 'sections' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  Sections
                </button>
                <button
                  onClick={() => setActiveTab('blocks')}
                  className={cn(
                    "px-6 py-1.5 text-xs font-semibold rounded-md transition-all",
                    activeTab === 'blocks' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  Global Blocks
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'sections' ? 'sections' : 'blocks'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

              {/* ── GLOBAL SECTIONS (Navbar) ── shown only on Sections tab ── */}
              {activeTab === 'sections' && navbarGlobalSection && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-6 pl-1">
                    <FiGlobe size={12} className="text-[#5946ff]" />
                    <h3 className="text-xs font-bold text-[#5946ff] uppercase tracking-wider">Global Sections</h3>
                    <span className="text-[10px] text-gray-400 font-medium normal-case tracking-normal">— Shared across all pages, configured globally</span>
                  </div>

                  {/* Navbar Global Section Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
                    <div className="group bg-white rounded-2xl border border-[#5946ff]/20 shadow-sm overflow-hidden flex flex-col transition-all duration-300 relative hover:shadow-xl hover:shadow-[#5946ff]/10 hover:-translate-y-1">
                      {/* Lock badge top-right */}
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-[#5946ff]/10 text-[#5946ff] text-[10px] font-bold px-2 py-1 rounded-full">
                        <FiLock size={10} />
                        Global
                      </div>

                      {/* Add overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none backdrop-blur-[2px]">
                        {isNavbarOnPage ? (
                          <span className="px-5 py-2.5 bg-white/80 text-gray-500 text-sm font-semibold rounded-lg flex items-center gap-2 cursor-not-allowed select-none">
                            <FiLock size={14} /> Already Added
                          </span>
                        ) : (
                          <button
                            onClick={() => { onAdd(navbarGlobalSection); onClose(); }}
                            className="px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl pointer-events-auto hover:bg-[#5946ff] hover:text-white"
                          >
                            <FiPlus size={16} /> Add to Page
                          </button>
                        )}
                        <Link
                          to="/admin/cms/header"
                          onClick={onClose}
                          className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium transition-colors pointer-events-auto"
                        >
                          <FiExternalLink size={12} /> Edit in Header Config
                        </Link>
                      </div>

                      {/* Thumbnail — navbar preview illustration */}
                      <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Simulated navbar bar */}
                        <div className="w-[80%] bg-white rounded-lg shadow-md px-4 py-3 flex items-center justify-between border border-gray-200/80">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#5946ff] rounded" />
                            <div className="h-2 w-16 bg-gray-300 rounded-full" />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
                            <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
                            <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-5 bg-gray-200 rounded-full" />
                            <div className="h-1.5 w-5 bg-gray-200 rounded-full" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 flex items-center gap-1.5 text-[10px] text-gray-400">
                          <FiNavigation size={10} />
                          <span>Navbar Preview</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-1 flex flex-col bg-white">
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="font-bold text-[15px] text-gray-900 tracking-tight truncate pr-4">
                            {navbarGlobalSection.name}
                          </h3>
                          <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase bg-[#5946ff]/10 text-[#5946ff] px-2.5 py-1 rounded-full">
                            GLOBAL
                          </span>
                        </div>
                        <div className="text-xs font-mono text-gray-500 mb-3 truncate opacity-80">TYPE: {navbarGlobalSection.type}</div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">
                          {navbarGlobalSection.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5946ff] animate-pulse" />
                            {isNavbarOnPage ? (
                              <span className="text-[#5946ff]">Added to this page</span>
                            ) : (
                              <span>Used in {getUsageCount('NAVBAR')} pages</span>
                            )}
                          </div>
                          <Link
                            to="/admin/cms/header"
                            onClick={onClose}
                            className="flex items-center gap-1 text-[10px] text-[#5946ff] hover:underline font-semibold"
                          >
                            <FiSettings size={10} /> Configure
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Regular section groups ── */}
              {Object.keys(groupedSections).length === 0 && activeTab === 'sections' && (
                <div className="text-center py-20 text-gray-500">No sections found matching your criteria.</div>
              )}
              {Object.keys(groupedSections).length === 0 && activeTab === 'blocks' && (
                <div className="text-center py-20 text-gray-500">No blocks found matching your criteria.</div>
              )}

              {Object.entries(groupedSections).map(([category, secs]) => (
                <div key={category} className="mb-10 last:mb-0">
                  {activeTab === 'sections' && (
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 pl-1">{category}</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {secs.map((sec, idx) => {
                      // Generic data priority resolution — no type-specific if/else needed.
                      // Works for every current and future section type automatically.
                      const resolvedSection = resolveSectionPreview(sec, sectionPreviewMap);
                      const fromMongo = resolvedSection._previewSource === 'mongodb';

                      return (
                        <div key={idx} className="group bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:shadow-[#5946ff]/10 hover:border-[#5946ff]/40 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 relative">
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                            <button
                              onClick={() => onAdd(resolvedSection)}
                              className="px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl pointer-events-auto hover:bg-[#5946ff] hover:text-white"
                            >
                              <FiPlus size={16} /> Add to Page
                            </button>
                          </div>

                          {/* Thumbnail — generic live preview for all section types */}
                          <div className="h-44 border-b border-gray-100 relative overflow-hidden bg-gray-50">
                            <SectionLibraryPreview section={resolvedSection} scale={0.25} />

                            {/* MongoDB saved data indicator */}
                            {fromMongo && (
                              <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-emerald-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                <span className="w-1 h-1 rounded-full bg-white inline-block" />
                                Saved
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-5 flex-1 flex flex-col relative bg-white">
                            <div className="flex justify-between items-start mb-1.5">
                              <h3 className="font-bold text-[15px] text-gray-900 tracking-tight truncate pr-4">{sec.name}</h3>
                              <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase bg-[#5946ff]/10 text-[#5946ff] px-2.5 py-1 rounded-full">
                                {sec.category || (activeTab === 'blocks' ? 'GLOBAL' : 'SECTION')}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-gray-500 mb-6 truncate opacity-80">TYPE: {sec.type}</div>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Used in <span className="text-gray-900">{getUsageCount(sec.type)}</span> pages
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
