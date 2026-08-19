import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiX } from 'react-icons/fi';

export default function DuplicateProductModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-surface rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-primary font-serif font-bold text-lg">
                  <FiCopy className="text-text-muted" /> Duplicate Product
                </div>
                <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors p-1">
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-text-secondary mb-6">
                  This will create a draft copy of the selected product, including its media, options, and specifications. You can modify it before publishing.
                </p>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-background rounded-lg transition-colors border border-transparent"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => onConfirm()}
                    className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Duplicate Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
