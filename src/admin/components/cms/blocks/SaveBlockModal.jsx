import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

export default function SaveBlockModal({ isOpen, onClose, onSave, section }) {
  const [name, setName] = useState(section?.name || 'My Custom Block');
  const [category, setCategory] = useState('Promotional');
  const [description, setDescription] = useState('');
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-black/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/5 bg-background">
            <div>
              <h2 className="text-xl font-serif font-bold text-text-primary">Save as Global Block</h2>
              <p className="text-xs text-text-muted mt-1">Make this section reusable across multiple pages.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-text-muted transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-widest mb-2">Block Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-all"
                placeholder="e.g. Summer Sale Banner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-widest mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-all appearance-none"
              >
                <option value="Headers">Headers</option>
                <option value="Hero Sections">Hero Sections</option>
                <option value="Banners">Banners</option>
                <option value="Product Showcases">Product Showcases</option>
                <option value="Call to Actions">Call to Actions</option>
                <option value="Promotional">Promotional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-widest mb-2">Description <span className="text-text-muted font-normal normal-case tracking-normal">(Optional)</span></label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 bg-background border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-surface focus:border-black/30 transition-all resize-none"
                placeholder="Describe when and where to use this block..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-black/5 bg-background flex items-center justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onSave({ name, category, description });
                onClose();
              }}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2"
            >
              <FiCheck size={16} /> Save Block
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
