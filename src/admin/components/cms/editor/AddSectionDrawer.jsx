import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiPlus, FiGlobe, FiLayout } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { useCMS } from '../../../context/cms/CMSContext';

export default function AddSectionDrawer({ isOpen, onClose, onAdd }) {
  const { sections, blocks } = useCMS();
  const [activeTab, setActiveTab] = useState('sections');
  const [searchQuery, setSearchQuery] = useState('');
  
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
                       <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all flex flex-col relative group">
                          {/* Overlay for Adding */}
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
                             <button 
                               onClick={() => onAdd(sec)} 
                               className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl pointer-events-auto"
                             >
                               <FiPlus size={16} /> Add to Page
                             </button>
                          </div>

                          {/* Thumbnail */}
                          <div className="h-48 bg-[#F9FAFB] flex items-center justify-center border-b border-gray-100 p-4">
                             {sec.image ? (
                               <img src={sec.image} alt={sec.name} className="w-full h-full object-contain mix-blend-multiply" />
                             ) : (
                               <span className="text-gray-400 font-medium text-sm tracking-wide">[Preview Thumbnail]</span>
                             )}
                          </div>

                          {/* Details */}
                          <div className="p-5 flex-1 flex flex-col">
                             <div className="flex justify-between items-start mb-2">
                                <h3 className="text-[15px] font-bold text-gray-900 truncate pr-4">{sec.name}</h3>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
                                  {sec.category || (activeTab === 'blocks' ? 'GLOBAL' : 'SECTION')}
                                </span>
                             </div>
                             <p className="text-xs text-gray-500 mb-6 font-mono tracking-tight">Type: {sec.type}</p>
                             
                             <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                                <span className="text-xs text-gray-400 font-medium">Used in 0 pages</span>
                                <div className="flex gap-4">
                                   <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
                                   <button className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors">Duplicate</button>
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
