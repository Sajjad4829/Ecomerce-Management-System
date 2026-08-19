import { motion } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

export default function PageSettingsDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
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
        className="fixed inset-y-0 right-0 w-96 bg-surface shadow-2xl z-50 flex flex-col border-l border-black/10"
      >
        <div className="h-16 border-b border-black/10 flex items-center justify-between px-6 shrink-0 bg-background">
          <h2 className="text-sm font-bold font-serif text-text-primary">Page Settings</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-text-muted transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* General */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">General</h3>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Page Title</label>
              <input type="text" defaultValue="Home Page V2" className="w-full px-3 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Slug (URL)</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-background border border-r-0 border-black/10 rounded-l-lg text-xs text-text-muted">/</span>
                <input type="text" defaultValue="" placeholder="e.g. home-v2" className="w-full px-3 py-2 bg-surface border border-black/10 rounded-r-lg text-sm focus:outline-none focus:border-black/30 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Template</label>
              <select className="w-full px-3 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors">
                <option>Default Template</option>
                <option>Landing Page</option>
                <option>Blank Canvas</option>
              </select>
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">SEO & Meta</h3>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Meta Title</label>
              <input type="text" placeholder="Optimal length: 50-60 characters" className="w-full px-3 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Meta Description</label>
              <textarea rows={3} placeholder="Optimal length: 150-160 characters" className="w-full px-3 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">Canonical URL</label>
              <input type="text" placeholder="https://..." className="w-full px-3 py-2 bg-surface border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>
          </div>
          
          {/* Visibility */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Visibility</h3>
            <div className="flex items-center gap-3">
               <input type="checkbox" id="indexing" defaultChecked className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <label htmlFor="indexing" className="text-xs text-text-primary">Allow Search Engines to index this page</label>
            </div>
            <div className="flex items-center gap-3">
               <input type="checkbox" id="private" className="rounded border-border-hover text-text-primary focus:ring-[#1A1A1A]" />
               <label htmlFor="private" className="text-xs text-text-primary">Make this page private (requires login)</label>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-black/10 bg-background flex items-center justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-black/5 rounded-lg transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-sm flex items-center gap-2">
            <FiCheck /> Apply Changes
          </button>
        </div>
      </motion.div>
    </>
  );
}
