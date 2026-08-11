import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMonitor, FiTablet, FiSmartphone, FiPlus, FiInfo, FiLayers } from 'react-icons/fi';
import TagBadge from './TagBadge';

export default function PreviewDrawer({ isOpen, section, onClose }) {
  if (!isOpen || !section) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-[800px] max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col border-l border-black/10"
      >
        {/* Header */}
        <div className="h-16 border-b border-black/10 flex items-center justify-between px-6 shrink-0 bg-[#F7F5F2]">
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">
              {section.category}
            </div>
            <h2 className="text-lg font-bold font-serif text-[#1A1A1A]">{section.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-sm flex items-center gap-2">
              <FiPlus /> Add to Page
            </button>
            <div className="w-px h-6 bg-black/10"></div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-gray-500 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-gray-50">
          
          {/* Main Preview Area */}
          <div className="p-8 border-b border-black/5 flex-1 flex flex-col">
             <div className="flex justify-center gap-2 mb-6">
               <button className="p-2 bg-white rounded-lg border border-black/10 text-[#1A1A1A] shadow-sm"><FiMonitor size={18}/></button>
               <button className="p-2 text-gray-400 hover:text-[#1A1A1A]"><FiTablet size={18}/></button>
               <button className="p-2 text-gray-400 hover:text-[#1A1A1A]"><FiSmartphone size={18}/></button>
             </div>
             
             <div className="flex-1 bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center relative">
               {section.image ? (
                 <img src={section.image} alt={section.name} className="w-full h-full object-cover object-top" />
               ) : (
                 <div className="text-center text-gray-400">
                    <FiLayers size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm font-medium">Interactive preview not available in library mode.</p>
                 </div>
               )}
             </div>
          </div>

          {/* Details Panel */}
          <div className="p-8 bg-white grid grid-cols-3 gap-12">
            <div className="col-span-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiInfo className="text-gray-400" /> Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.description || "A clean, modern section designed to highlight key content. Fully responsive and customizable to match your brand's aesthetic."}
                </p>
              </div>
              <div>
                 <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {section.tags?.map(tag => (
                    <TagBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
               <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Version</h3>
                  <p className="text-sm font-mono text-[#1A1A1A]">{section.version || '1.0.0'}</p>
               </div>
               <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Dependencies</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>None</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Usage Count</h3>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Active on 4 pages</p>
               </div>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
