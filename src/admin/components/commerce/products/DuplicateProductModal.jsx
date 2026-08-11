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
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                  <FiCopy className="text-stone-400" /> Duplicate Product
                </div>
                <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors p-1">
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-stone-600 mb-6">
                  This will create a draft copy of the selected product, including its media, options, and specifications. You can modify it before publishing.
                </p>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50 rounded-lg transition-colors border border-transparent"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => onConfirm()}
                    className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
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
