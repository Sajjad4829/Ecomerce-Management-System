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
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ x: '-100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '-100%' }} 
        transition={{ type: "spring", damping: 25, stiffness: 200 }} 
        className="fixed inset-y-0 left-0 w-[400px] bg-surface shadow-2xl z-[70] flex flex-col border-r border-black/10"
      >
        <div className="h-16 border-b border-black/10 flex items-center justify-between px-6 shrink-0 bg-background">
          <h2 className="text-sm font-bold font-serif text-text-primary">Section Library</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-text-muted transition-colors">
            <FiX size={18} />
          </button>
        </div>
        
        <div className="p-4 border-b border-black/5 bg-surface space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('sections')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTab === 'sections' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
              )}
            >
              <FiLayout size={14} /> Sections
            </button>
            <button
              onClick={() => setActiveTab('blocks')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTab === 'blocks' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
              )}
            >
              <FiGlobe size={14} /> Global Blocks
            </button>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'sections' ? 'sections' : 'blocks'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20" 
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
           {Object.keys(groupedSections).length === 0 && (
             <div className="text-center py-10 text-text-muted text-sm">No sections found.</div>
           )}

           {Object.entries(groupedSections).map(([category, sections]) => (
             <div key={category} className="space-y-4">
               <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{category}</h3>
               <div className="grid grid-cols-1 gap-4">
                 {sections.map((sec, idx) => {
                   const IconComponent = Icons[sec.icon] || Icons.FiLayout;
                   return (
                     <div key={idx} className="border border-black/10 rounded-xl overflow-hidden group hover:border-black/30 transition-colors bg-surface hover:shadow-md flex flex-col">
                        <div className="h-32 bg-gray-100 relative shrink-0 border-b border-black/5">
                          {sec.image ? (
                            <img src={sec.image} alt={sec.name} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-background/50">
                              <IconComponent size={24} className="mb-2 opacity-50" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">{sec.category} Preview</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => onAdd(sec)} 
                              className="px-5 py-2.5 bg-surface text-text-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl"
                            >
                              <FiPlus size={16} /> Add to Page
                            </button>
                          </div>
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                               <IconComponent size={10} /> {sec.type}
                            </div>
                            {activeTab === 'blocks' && (
                              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-primary">Global</span>
                            )}
                          </div>
                          <h3 className="text-sm font-bold text-text-primary font-serif mb-1">{sec.name}</h3>
                          {sec.description && (
                            <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{sec.description}</p>
                          )}
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
  );
}
