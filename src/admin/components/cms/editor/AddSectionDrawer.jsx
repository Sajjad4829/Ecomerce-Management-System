import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiPlus, FiGlobe, FiLayout } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useCMS } from '../../../context/cms/CMSContext';
import { useStorefrontTheme } from '../../../../storefront/context/StorefrontThemeContext';

export default function AddSectionDrawer({ isOpen, onClose, onAdd }) {
  const { sections, blocks, pageSectionsDraft } = useCMS();
  const { activeTheme } = useStorefrontTheme();
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
  
  if (!isOpen) return null;

  const currentList = activeTab === 'sections' 
    ? sections.filter(s => s.status === 'Active')
    : blocks.filter(b => b.status === 'Active');
    
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
               {Object.keys(groupedSections).length === 0 && (
                 <div className="text-center py-20 text-gray-500">No sections found matching your criteria.</div>
               )}

               {Object.entries(groupedSections).map(([category, sections]) => (
                 <div key={category} className="mb-10 last:mb-0">
                   {activeTab === 'sections' && (
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 pl-1">{category}</h3>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {sections.map((sec, idx) => (
                       <div key={idx} className="group bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-xl hover:shadow-[#5946ff]/10 hover:border-[#5946ff]/40 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 relative">
                          {/* Overlay for Adding */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                             <button 
                               onClick={() => onAdd(sec)} 
                               className="px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl pointer-events-auto hover:bg-[#5946ff] hover:text-white"
                             >
                               <FiPlus size={16} /> Add to Page
                             </button>
                          </div>

                          {/* Thumbnail */}
                          <div className="h-44 bg-gray-50 border-b border-gray-100 flex items-center justify-center text-gray-400 text-sm overflow-hidden relative">
                             {(() => {
                               let previewImg = 
                                 (sec.content?.slides && sec.content.slides.length > 0 && sec.content.slides[0].image) ||
                                 (sec.content?.items && sec.content.items.length > 0 && sec.content.items[0].imageUrl) ||
                                 sec.image;
                               
                               // Fallbacks for hero banners from active theme
                               if (!previewImg && sec.type === 'HERO_BANNER') {
                                 previewImg = activeTheme?.heroSlides?.[0]?.image;
                               }
                               if (!previewImg && sec.type === 'SPLIT_HERO') {
                                 previewImg = activeTheme?.heroSlides?.[1]?.image || activeTheme?.heroSlides?.[0]?.image;
                               }
                               if (!previewImg && sec.type === 'PROMO_HERO') {
                                 previewImg = activeTheme?.promoBanners?.[0]?.image || activeTheme?.heroSlides?.[0]?.image;
                               }
                                 
                               return previewImg ? (
                                 <img src={previewImg} alt={sec.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                               ) : (
                                 <span className="font-medium tracking-wide">[Preview Thumbnail]</span>
                               );
                             })()}
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
                                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                   Used in <span className="text-gray-900">{getUsageCount(sec.type)}</span> pages
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
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
