import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiPlus, FiGlobe, FiLayout } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const LIBRARY_SECTIONS = [
  { type: 'hero', name: 'Main Hero', category: 'Hero Sections', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { type: 'grid', name: 'Product Grid', category: 'Commerce', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
  { type: 'banner', name: 'Newsletter Signup', category: 'Conversion', image: '' },
  { type: 'features', name: 'Features List', category: 'Content', image: '' },
  { type: 'category', name: 'Category Grid', category: 'Commerce', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
  { type: 'testimonials', name: 'Customer Reviews', category: 'Social Proof', image: '' },
  { type: 'faq', name: 'FAQ Accordion', category: 'Content', image: '' },
  { type: 'footer', name: 'Standard Footer', category: 'Global', image: '' },
];

const GLOBAL_BLOCKS = [
  { type: 'banner', name: 'Summer Sale Promo Banner', category: 'Banners', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' },
  { type: 'footer', name: 'Standard Footer - 2024', category: 'Footers', image: '' },
  { type: 'grid', name: 'Featured Products Grid - Homepage', category: 'Product Grids', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
];

export default function AddSectionDrawer({ isOpen, onClose, onAdd }) {
  const [activeTab, setActiveTab] = useState('sections');
  
  if (!isOpen) return null;

  const currentList = activeTab === 'sections' ? LIBRARY_SECTIONS : GLOBAL_BLOCKS;

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
        className="fixed inset-y-0 left-0 w-96 bg-surface shadow-2xl z-[70] flex flex-col border-r border-black/10"
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
            <input type="text" placeholder={`Search ${activeTab === 'sections' ? 'sections' : 'blocks'}...`} className="w-full pl-9 pr-3 py-2 bg-background border border-black/5 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/20" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
           {currentList.map((sec, idx) => (
             <div key={idx} className="border border-black/10 rounded-xl overflow-hidden group hover:border-black/30 transition-colors bg-surface hover:shadow-md">
                <div className="h-36 bg-gray-100 relative">
                  {sec.image ? (
                    <img src={sec.image} alt={sec.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-background">
                      <span className="text-xs font-bold uppercase tracking-widest">{sec.category}</span>
                      <span className="text-[10px] mt-1">Preview</span>
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
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{sec.category}</div>
                    {activeTab === 'blocks' && (
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-primary">Global</span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-text-primary font-serif">{sec.name}</h3>
                </div>
             </div>
           ))}
        </div>
      </motion.div>
    </>
  );
}
